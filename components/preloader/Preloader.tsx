"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  hasPreloaderRun,
  markPreloaderRun,
  onHeroReady,
  openPreloaderGate,
} from "@/lib/preloader";

/**
 * Homepage preloader — a looping sphere over black while the hero buffers its
 * frames behind it.
 *
 * It leaves when the hero says it is ready, not on a timer. The only clock in
 * here is FAILSAFE_MS, which exists so a failed frame download can never trap
 * a visitor behind an overlay forever.
 */

/** How long the fade-out takes. Must match the CSS transition below. */
const FADE_MS = 520;

/**
 * Upper bound on how long the overlay can stay up, in case the hero never
 * signals (every frame request failed, JS error, offline). Not a pacing
 * device — under normal conditions the hero is ready well before this.
 */
const FAILSAFE_MS = 10000;

/**
 * Floor on how long the overlay stays visible, by request: the preloader is
 * meant to be seen, not to flash past on a warm cache.
 *
 * This is a minimum, not a fixed duration — if the hero somehow needs longer
 * than this, the overlay waits for it rather than uncovering a half-drawn
 * page. In practice the hero is ready in well under a second, so this is the
 * number that decides what visitors actually experience.
 */
const MIN_VISIBLE_MS = 5000;

/**
 * Full-screen sizing, measured off the sphere rather than off the video frame.
 *
 * The source is 4:3 with the sphere occupying a measured 45% of its width,
 * centred, on pure black. `object-fit: cover` would fill the screen but crop
 * the sphere itself on a tall phone; `contain` would keep it whole but leave
 * it small. So the video is sized so the SPHERE lands at ~78% of the
 * viewport's smaller axis (78 / 0.45 ≈ 175vmin of video width) and the
 * surrounding black is allowed to overflow and clip. Black on black — the
 * overflow is invisible, and the sphere is never cropped at any aspect ratio.
 */
const MEDIA_WIDTH = "175vmin";

function mediaStyle(leaving: boolean): React.CSSProperties {
  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: MEDIA_WIDTH,
    height: "auto",
    maxWidth: "none",
    // The translate does the centring; the scale rides along on the way out so
    // the exit reads as one movement rather than a panel switching off.
    transform: `translate(-50%, -50%) scale(${leaving ? 0.94 : 1})`,
    transition: `transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };
}

export function Preloader() {
  // Decided once per mount, and only ever read here. On the server this is
  // always true (effects never run there), so the overlay is in the initial
  // HTML and there is no flash of an unstyled homepage. On a later
  // client-side navigation back to `/` it is false and this renders nothing.
  const [shouldRun] = useState(() => !hasPreloaderRun());

  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const mountedAt = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!shouldRun) return;
    markPreloaderRun();
    mountedAt.current = performance.now();

    let timers: ReturnType<typeof setTimeout>[] = [];
    let done = false;

    // The overlay owns the scroll lock while it is up. The hero takes over its
    // own lock when it starts, so there is no window where the page is
    // scrollable underneath.
    const { body, documentElement: html } = document;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    function leave() {
      if (done) return;
      done = true;
      const elapsed = performance.now() - mountedAt.current;
      const hold = Math.max(0, MIN_VISIBLE_MS - elapsed);

      timers.push(
        setTimeout(() => {
          setLeaving(true);
          timers.push(
            setTimeout(() => {
              setGone(true);
              // Hand control to the hero only once we are actually invisible,
              // so its intro starts on an uncovered screen.
              openPreloaderGate();
            }, FADE_MS)
          );
        }, hold)
      );
    }

    const unsubscribe = onHeroReady(leave);
    timers.push(setTimeout(leave, FAILSAFE_MS));

    return () => {
      unsubscribe();
      timers.forEach(clearTimeout);
      timers = [];
      body.style.overflow = "";
      html.style.overflow = "";
      // If this unmounts early (navigating away mid-preload), never leave the
      // hero waiting on a gate that will now never open.
      openPreloaderGate();
    };
  }, [shouldRun]);

  if (!shouldRun || gone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        // Pure black, not the site's #000005: the video's own background is
        // #000000, and any difference at all outlines the video's rectangle
        // around the sphere. The 5/255 gap against the page underneath is
        // imperceptible by comparison.
        background: "#000000",
        // The video is deliberately larger than the viewport (see below), so
        // it is centred by transform rather than by grid/flex alignment:
        // `place-items: center` silently falls back to start-alignment for an
        // item bigger than its container, which pins the sphere to the corner.
        overflow: "hidden",
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* Reduced motion gets the still frame instead: the rest of this site
          already honours that preference, and a looping video is motion the
          visitor asked not to see. */}
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element -- decorative still sized in viewport units; next/image can't size off vmin
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
    </div>
  );
}
