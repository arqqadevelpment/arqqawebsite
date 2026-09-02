"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  closeGate,
  heroProgress,
  isFirstLoad,
  isHeroPresent,
  isHeroReady,
  markOpened,
  openGate,
  subscribeHero,
} from "@/lib/preloader";

/**
 * Site-wide preloader: a full-screen sphere with a 0-100% counter, covering
 * the page when the site opens and on every route change.
 *
 * Mounted from app/template.tsx, which Next.js remounts on each navigation —
 * so one mount is one load cycle, and the incoming page renders underneath
 * this overlay rather than after it.
 *
 * The percentage is driven by real signals, never by a timer alone:
 *
 *   homepage    the hero's 50 intro frames — which is also what guarantees
 *               the frame sequence is revealed from its first frame rather
 *               than joining part-way through
 *   every page  webfonts, plus every <img> in the document
 *
 * It cannot reach 100% before those have genuinely settled. The clocks below
 * only stop it finishing too fast to read, and stop a stalled resource from
 * hiding the site forever.
 */

/** Fade-out duration. Matches the CSS transitions below. */
const FADE_MS = 520;

/**
 * Shortest time the counter may take to reach 100%, so it is legible instead
 * of snapping shut on a warm cache. Progress is still capped by real loading:
 * this can only make the count slower, never let it finish early.
 */
const MIN_VISIBLE_FIRST_MS = 5000;
const MIN_VISIBLE_NAV_MS = 900;

/**
 * Upper bound on one cycle, reached only if something never settles (a dead
 * image host, an offline frame request). Without it a single stalled resource
 * would hide the site indefinitely.
 */
const FAILSAFE_MS = 10000;

/** Beat at 100% before fading, so the number is readable at its end state. */
const HOLD_AT_FULL_MS = 260;

/* ── Sizing ────────────────────────────────────────────────────────────────
 * Everything is derived from one token so the sphere, the ring around it and
 * the counter inside it can never drift apart.
 *
 * The source video is 4:3 with the sphere occupying a measured 45% of its
 * width, centred on pure black. `object-fit: cover` would fill the frame but
 * crop the sphere on a tall phone, and `contain` would leave it small — so
 * instead the video is sized so the SPHERE lands at the size we want, and the
 * surrounding black is allowed to overflow and clip. Black on black: the
 * overflow is invisible and the sphere is never cropped at any aspect ratio.
 */

/** Rendered diameter of the sphere itself. */
const SPHERE = "min(34vmin, 230px)";

/** 1 / 0.445 — the video is this much wider than the sphere inside it. */
const MEDIA_WIDTH = `calc(${SPHERE} * 2.247)`;

/** The ring clears the sphere's edge by ~9% of its diameter on each side. */
const RING_SIZE = `calc(${SPHERE} * 1.18)`;

/** Counter scales with the sphere, with sane floors and ceilings. */
const COUNTER_SIZE = "clamp(1.25rem, 3.4vmin, 1.9rem)";

// Ring geometry in the SVG's own 120x120 user space.
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Progress from the images the first screen actually needs: 0-1, and 1 when
 * there are none.
 *
 * `loading="lazy"` images are excluded deliberately. The browser will not
 * fetch them until they scroll into view, and nothing can scroll while this
 * overlay is up — so waiting on them means waiting forever, and every
 * image-heavy page would sit until the failsafe fired. Lazy images are
 * deferred on purpose; holding the site for them would undo that.
 */
function imageProgress() {
  const imgs = Array.from(document.images).filter(
    (i) => i.loading !== "lazy" || i.complete
  );
  if (imgs.length === 0) return 1;
  return imgs.filter((i) => i.complete).length / imgs.length;
}

export function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const firstLoad = isFirstLoad();
    markOpened();
    const minVisible = firstLoad ? MIN_VISIBLE_FIRST_MS : MIN_VISIBLE_NAV_MS;
    const startedAt = performance.now();

    // Nothing behind this overlay is meant to be reachable yet.
    closeGate();
    const { body, documentElement: html } = document;
    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    // Releasing the lock has to be its own step, called when the overlay
    // actually goes away — NOT left to the effect cleanup. The overlay
    // disappears by rendering null while this component stays mounted, so the
    // cleanup does not run at that point and the lock would survive it,
    // leaving the whole site unscrollable. Idempotent, because both the end
    // of a normal cycle and an unmount mid-cycle call it.
    let unlocked = false;
    function unlockScroll() {
      if (unlocked) return;
      unlocked = true;
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    }

    let cancelled = false;
    let fontsDone = false;
    let bailOut = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    document.fonts?.ready.then(() => {
      fontsDone = true;
    });

    // Frames landing between animation frames still move the number.
    const unsubscribeHero = subscribeHero(() => {});

    timers.push(
      setTimeout(() => {
        bailOut = true;
      }, FAILSAFE_MS)
    );

    /** What has genuinely finished loading, 0-1. */
    function realProgress() {
      if (bailOut) return 1;
      const parts = [imageProgress(), fontsDone ? 1 : 0];
      // The hero is by far the heaviest thing on the homepage, so it counts
      // twice — otherwise the number would sit near 100% while the frame
      // sequence was still downloading.
      if (isHeroPresent()) parts.push(heroProgress(), heroProgress());
      return parts.reduce((a, b) => a + b, 0) / parts.length;
    }

    function ready() {
      if (bailOut) return true;
      if (!fontsDone) return false;
      if (imageProgress() < 1) return false;
      if (isHeroPresent() && !isHeroReady()) return false;
      return true;
    }

    function finish() {
      setPercent(100);
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setLeaving(true);
          timers.push(
            setTimeout(() => {
              if (cancelled) return;
              setVisible(false);
              // Hand the screen over only once we are actually invisible: give
              // scrolling back, then let the hero start its opening frame on
              // an uncovered page.
              unlockScroll();
              openGate();
            }, FADE_MS)
          );
        }, HOLD_AT_FULL_MS)
      );
    }

    function tick() {
      if (cancelled) return;
      const elapsed = performance.now() - startedAt;

      // Two independent ceilings: the real one keeps the number honest, the
      // time one keeps it watchable. The lower of the two wins, and the
      // number never goes backwards.
      const ceiling = Math.min(realProgress(), elapsed / minVisible);
      setPercent((shown) => Math.max(shown, Math.floor(ceiling * 100)));

      if (ready() && elapsed >= minVisible) {
        clearInterval(loop);
        finish();
      }
    }

    // An interval rather than requestAnimationFrame: rAF is suspended while
    // the tab is in the background, which would freeze the counter mid-count
    // and leave someone returning to the tab staring at a stalled overlay.
    // Intervals are throttled there but keep firing, so the cycle still
    // completes. 16ms is a frame at 60Hz; the counter is a number, not an
    // animation, so nothing needs finer resolution than that.
    const loop = setInterval(tick, 16);
    tick();

    return () => {
      cancelled = true;
      clearInterval(loop);
      timers.forEach(clearTimeout);
      unsubscribeHero();
      // Covers unmounting part-way through a cycle, before finish() ran.
      unlockScroll();
      // Never leave the hero waiting on a gate that will now never open.
      openGate();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        // Pure black rather than the site's #000005: the video's own
        // background is #000000, and any difference at all outlines the
        // video's rectangle around the sphere.
        background: "#000000",
        overflow: "hidden",
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element -- decorative still sized in viewport units; next/image cannot size off vmin
        <img src="/preloader-poster.webp" alt="" style={mediaStyle(leaving)} />
      ) : (
        <video
          src="/preloader.mp4"
          poster="/preloader-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={mediaStyle(leaving)}
        />
      )}

      {/* Progress ring — orbits the sphere rather than sitting under it.

          Concentric with the sphere and sized off the same token, so the two
          stay locked together at every viewport. Rotated -90deg so the arc
          starts at twelve o'clock and fills clockwise. */}
      <svg
        viewBox="0 0 120 120"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: RING_SIZE,
          height: RING_SIZE,
          transform: `translate(-50%, -50%) rotate(-90deg) scale(${leaving ? 0.94 : 1})`,
          transition: `transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          opacity: leaving ? 0 : 1,
          overflow: "visible",
        }}
      >
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          // Counts down from a full circumference to zero as percent climbs.
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - percent / 100)}
          style={{ transition: "stroke-dashoffset 180ms linear" }}
        />
      </svg>

      {/* The counter sits at the centre of the sphere, inside the ring. The
          middle of the sphere is the darkest, calmest part of the frame
          throughout the loop, so white type reads cleanly against it. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: leaving ? 0 : 1,
          transition: `opacity ${FADE_MS / 2}ms ease`,
          // Matches the site's own numerals (see FactsSection): same family as
          // the body, bold, tight tracking.
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#ffffff",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: COUNTER_SIZE,
            // Tabular figures stop the number jittering as digits change.
            fontVariantNumeric: "tabular-nums",
            // Holds the number legible over the brighter swirls that pass
            // through the middle of the sphere as the loop plays.
            textShadow: "0 2px 24px rgba(0,0,0,0.75)",
          }}
        >
          {percent}
          <span style={{ fontSize: "0.45em", marginLeft: "0.12em", opacity: 0.55 }}>
            %
          </span>
        </span>
      </div>
    </div>
  );
}

function mediaStyle(leaving: boolean): React.CSSProperties {
  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: MEDIA_WIDTH,
    height: "auto",
    maxWidth: "none",
    // Centred by transform, not grid or flex alignment: those silently fall
    // back to start-alignment for an item larger than its container, which
    // pins the sphere into a corner.
    transform: `translate(-50%, -50%) scale(${leaving ? 0.94 : 1})`,
    transition: `transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };
}
