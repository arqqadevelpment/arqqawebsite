"use client";

import { useRef, useEffect } from "react";
import { registerHero, reportHeroFrame, whenGateOpen } from "@/lib/preloader";

// Eight single-line headline beats, each synced to a distinct scene in the
// source video (see the timing table this was built from). Beat 0 plays
// during the autoplay intro; beats 1-7 are scroll-driven.
// All beats render uniformly: same font (inherited from the site's own
// stack), same bold weight, no italic, no case changes — one consistent look.
const SLIDES = [
  { lead: "Agencies Sell ", emphasis: "Creativity." },
  { lead: "We Deliver ", emphasis: "Certainty." },
  { lead: "They Pitch ", emphasis: "Ideas." },
  { lead: "We Engineer ", emphasis: "Infrastructure." },
  { lead: "We Don't Share ", emphasis: "Reports." },
  { lead: "We Prove ", emphasis: "Outcomes." },
  { lead: "One System. No ", emphasis: "Excuses." },
  { lead: "The Future is ", emphasis: "Trust." },
];

// Fade in / hold / fade out windows per beat, in 0-1 SCROLL progress
// (progress 0 = t=2s handoff, progress 1 = t=29.64s end of video — the
// newer video source extends the closing "knot" scene by ~3s over the old
// one, so beats 7-8 now hold longer over that extra runway). The video
// plays alone for the first 2s with no text, freezes, then beat 0 fades in
// right as scroll begins. Derived from the beat timestamps: prog(t) = (t-2)/27.64.
const WINDOWS = [
  { in: 0.0000, hold: 0.0000, out: 0.0724, gone: 0.0941 }, // Agencies Sell Creativity. (resolves to visible at handoff; CSS transition does the fade)
  { in: 0.0941, hold: 0.1085, out: 0.1447, gone: 0.1664 }, // We Deliver Certainty. (5-6s)
  { in: 0.1664, hold: 0.1809, out: 0.2533, gone: 0.2750 }, // They Pitch Ideas. (7-9s)
  { in: 0.2750, hold: 0.2894, out: 0.4342, gone: 0.4559 }, // We Engineer Infrastructure. (10-14s)
  { in: 0.4559, hold: 0.4703, out: 0.6151, gone: 0.6368 }, // We Don't Share Reports. (15-19s)
  { in: 0.6368, hold: 0.6512, out: 0.7598, gone: 0.7815 }, // We Prove Outcomes. (20-23s)
  { in: 0.7815, hold: 0.7959, out: 0.8683, gone: 0.8828 }, // One System. No Excuses. (24-26s)
  { in: 0.8828, hold: 0.8936, out: 1.0000, gone: 1.0000 }, // The Future is Trust. (26.4-29.64s, holds to end)
];

// The hero settles on this static frame as scroll reaches the very end,
// crossfading over the closing "knot" scene rather than freezing on a video frame.
const ENDING_FADE_FROM = 0.965;

// The closing frame starts drifting well before it crossfades in, so the
// parallax reads as a slow settle rather than a jolt in the last 3% of scroll.
const ENDING_PARALLAX_FROM = 0.82;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function slideOpacity(progress: number, w: (typeof WINDOWS)[0]): number {
  if (progress < w.in || progress > w.gone) return 0;
  if (progress < w.hold) return clamp((progress - w.in) / (w.hold - w.in), 0, 1);
  if (progress < w.out) return 1;
  if (w.gone <= w.out) return 1; // no fade-out window defined — hold at full opacity
  return clamp(1 - (progress - w.out) / (w.gone - w.out), 0, 1);
}

// Frame-sequence config — matches the extracted WebP frames in public/hero-frames.
// Source is 25fps/29.64s; the 2s intro (frames 0-49) keeps every real-time
// frame, the scroll-driven remainder is decimated 3:1 to cut payload with no
// visible loss.
const TOTAL_FRAMES  = 281;
const INTRO_FRAME   = 50;   // index where the intro hands off to scroll (t=2s)
const INTRO_MS      = 2000;
const LOAD_POOL     = 6;    // concurrent frame downloads per phase

function pad4(n: number) {
  return String(n).padStart(4, "0");
}

function idle(cb: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(cb, { timeout: 1200 });
  } else {
    setTimeout(cb, 300);
  }
}

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const slideRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const endingRef  = useRef<HTMLDivElement>(null);
  const hintRef    = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);

  /* ── Intro + Scroll → frame sequence + text ──────────────────────────── */
  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const variant  = isMobile ? "mobile" : "desktop";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function frameSrc(i: number) {
      return `/hero-frames/${variant}/frame_${pad4(i + 1)}.webp`;
    }

    const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const loading = new Set<number>();
    let desiredFrame = 0;
    let lastDrawn = -1;

    // The preloader holds the page until every intro frame is in memory, and
    // shows this count as its percentage. Errors count as settled too — a
    // missing frame must not stall the overlay, and drawIndex() already falls
    // back to the nearest neighbour it has.
    const unregisterHero = registerHero(INTRO_FRAME);
    function settleIntroFrame(i: number) {
      if (i >= INTRO_FRAME) return;
      reportHeroFrame();
      // Paint frame 0 the moment it exists. The reveal then lands on the true
      // opening frame instead of an empty canvas, so the sequence never looks
      // like it started part-way through.
      if (i === 0) drawIndex(0);
    }

    function ensureFrame(i: number, onLoad?: () => void) {
      if (i < 0 || i >= TOTAL_FRAMES || frames[i] || loading.has(i)) return;
      loading.add(i);
      const img = new Image();
      img.decoding = "async";
      // Intro frames are needed within ~4s of load; scroll frames can ride
      // behind critical page resources (JS/CSS/fonts) without users noticing.
      (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
        i < INTRO_FRAME ? "high" : "low";
      img.onload = () => {
        loading.delete(i);
        settleIntroFrame(i);
        if (destroyed) return;
        frames[i] = img;
        onLoad?.();
      };
      img.onerror = () => {
        loading.delete(i);
        settleIntroFrame(i);
      };
      img.src = frameSrc(i);
    }

    function drawToCanvas(img: HTMLImageElement) {
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas!.clientWidth;
      const ch = canvas!.clientHeight;
      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);
      if (canvas!.width !== targetW || canvas!.height !== targetH) {
        canvas!.width = targetW;
        canvas!.height = targetH;
      }
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let sx, sy, sw, sh;
      if (imgRatio > canvasRatio) {
        sh = ih;
        sw = ih * canvasRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        sw = iw;
        sh = iw / canvasRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }
      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = "high";
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(img, sx, sy, sw, sh, 0, 0, canvas!.width, canvas!.height);
    }

    // Draw the nearest already-loaded frame to `i` (prefers frames behind it)
    function drawIndex(i: number) {
      let img: HTMLImageElement | null = null;
      let found = i;
      for (let d = 0; d < 60; d++) {
        const idx = i - d;
        if (idx < 0) break;
        if (frames[idx]) {
          img = frames[idx];
          found = idx;
          break;
        }
      }
      if (!img) {
        for (let d = 1; d < 60; d++) {
          const idx = i + d;
          if (idx >= TOTAL_FRAMES) break;
          if (frames[idx]) {
            img = frames[idx];
            found = idx;
            break;
          }
        }
      }
      if (img && found !== lastDrawn) {
        drawToCanvas(img);
        lastDrawn = found;
      }
    }

    // ── Background loader pool ──────────────────────────────────────────
    // Phase A (immediate, high priority): the intro range — needed within 4s.
    // Phase B (deferred to idle time, low priority): the rest of the scroll
    // sequence — must not compete with critical page JS/CSS/fonts for
    // bandwidth on first load.
    function makePool(from: number, to: number) {
      let cursor = from;
      function worker() {
        if (destroyed) return;
        while (cursor < to && frames[cursor]) cursor++;
        if (cursor >= to) return;
        const i = cursor++;
        ensureFrame(i, () => {
          drawIndex(desiredFrame);
          worker();
        });
        if (loading.size < LOAD_POOL) worker();
      }
      for (let k = 0; k < LOAD_POOL; k++) worker();
    }

    makePool(0, INTRO_FRAME);
    idle(() => {
      if (!destroyed) makePool(INTRO_FRAME, TOTAL_FRAMES);
    });

    // ── Scroll lock helpers ──────────────────────────────────────────────
    function lockScroll() {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    function unlockScroll() {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    // ── Seek: maps scroll progress → [INTRO_FRAME, TOTAL_FRAMES-1] ───────
    let seekPending = false;

    function updateSlides(progress: number) {
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const opacity = slideOpacity(progress, WINDOWS[i]);
        el.style.opacity = String(opacity);
        const win = WINDOWS[i];
        let ty = 0;
        if (progress < win.hold) {
          ty = clamp(1 - (progress - win.in) / (win.hold - win.in), 0, 1) * 28;
        } else if (progress > win.out) {
          ty = clamp((progress - win.out) / (win.gone - win.out), 0, 1) * -28;
        }
        el.dataset.ty = String(ty);
        el.style.transform = `translateY(${ty}px)`;
      });

      // Closing scene: crossfade, plus a parallax settle. The frame eases out
      // of a slight zoom while the headline drifts the opposite way, so the
      // two layers move at different rates and the scene gains depth.
      const parallaxT = reduceMotion
        ? 1
        : clamp(
            (progress - ENDING_PARALLAX_FROM) / (1 - ENDING_PARALLAX_FROM),
            0,
            1
          );

      // Ease-out so the motion decelerates into its resting position.
      const ease = 1 - Math.pow(1 - parallaxT, 3);

      if (endingRef.current) {
        const endingOpacity = clamp(
          (progress - ENDING_FADE_FROM) / (1 - ENDING_FADE_FROM),
          0,
          1
        );
        endingRef.current.style.opacity = String(endingOpacity);
        endingRef.current.style.transform = `scale(${(1.14 - 0.14 * ease).toFixed(4)}) translate3d(0, ${((1 - ease) * -2.2).toFixed(3)}%, 0)`;
      }

      // Canvas sits behind the closing frame and drifts at a slower rate —
      // the depth cue that makes the parallax read.
      if (canvas) {
        canvas.style.transform = `scale(${(1.06 - 0.06 * ease).toFixed(4)}) translate3d(0, ${((1 - ease) * 1.1).toFixed(3)}%, 0)`;
      }

      // Headline settles upward against the frame's downward drift.
      const last = slideRefs.current[SLIDES.length - 1];
      if (last && !reduceMotion) {
        const baseTy = parseFloat(last.dataset.ty || "0");
        last.style.transform = `translateY(${(baseTy + (1 - ease) * 30).toFixed(2)}px)`;
      }

      // Scroll hint stays up for the whole sequence — there is still more to
      // scroll — and only clears as the closing scene resolves.
      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          clamp(1 - (progress - 0.86) / 0.09, 0, 1)
        );
      }
    }

    function seek() {
      seekPending = false;
      const scrollable = wrapper!.offsetHeight - window.innerHeight;
      const progress = clamp(window.scrollY / scrollable, 0, 1);

      // ── Hand-off parallax ──────────────────────────────────────────────
      // Past the hero's own range the panel is no longer sticky and travels
      // with the page at 1:1. Pushing it further up, scaling it down and
      // fading it makes it recede at a different rate from the section
      // arriving beneath — the depth cue that sells the transition.
      const exitPx = Math.max(0, window.scrollY - scrollable);
      const exitT = reduceMotion
        ? 0
        : clamp(exitPx / (window.innerHeight * 0.85), 0, 1);
      if (stickyRef.current) {
        if (exitT > 0) {
          const e = 1 - Math.pow(1 - exitT, 2); // ease-out
          stickyRef.current.style.transform = `translate3d(0, ${(-e * 26).toFixed(2)}vh, 0) scale(${(1 - e * 0.08).toFixed(4)})`;
          stickyRef.current.style.opacity = String((1 - e * 0.9).toFixed(3));
        } else {
          stickyRef.current.style.transform = "";
          stickyRef.current.style.opacity = "";
        }
      }

      desiredFrame = Math.round(
        INTRO_FRAME + progress * (TOTAL_FRAMES - 1 - INTRO_FRAME)
      );
      ensureFrame(desiredFrame, () => drawIndex(desiredFrame));
      drawIndex(desiredFrame);

      updateSlides(progress);
    }

    function onScroll() {
      if (seekPending) return;
      seekPending = true;
      requestAnimationFrame(seek);
    }

    // ── Hand-off: intro → scroll mode ───────────────────────────────────
    function activateScrollMode() {
      unlockScroll();
      seek();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // ── Resize: redraw current frame at the new canvas size ─────────────
    function onResize() {
      const idx = lastDrawn;
      lastDrawn = -1;
      if (idx >= 0 && frames[idx]) drawToCanvas(frames[idx]!);
      lastDrawn = idx;
    }
    window.addEventListener("resize", onResize);

    // ── Boot sequence ─────────────────────────────────────────────────────
    lockScroll();

    // Frames have been downloading since this effect began; the intro itself
    // waits until nothing is covering the page. Without this the two-second
    // intro would run out behind the preloader and never be seen. When no
    // preloader is up — every route change back to the homepage — the gate is
    // already open and this runs on the spot.
    const cancelGateWait = whenGateOpen(() => {
      if (destroyed) return;

      if (reduceMotion) {
        desiredFrame = INTRO_FRAME;
        ensureFrame(desiredFrame, () => drawIndex(desiredFrame));
        activateScrollMode();
        return;
      }

      const start = performance.now();
      function tick(now: number) {
        if (destroyed) return;
        const t = Math.min(1, (now - start) / INTRO_MS);
        desiredFrame = Math.round(t * INTRO_FRAME);
        ensureFrame(desiredFrame, () => drawIndex(desiredFrame));
        drawIndex(desiredFrame);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          activateScrollMode();
        }
      }
      requestAnimationFrame(tick);
    });

    return () => {
      destroyed = true;
      unregisterHero();
      cancelGateWait();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      unlockScroll();
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "500vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-black"
        style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
      >

        {/* ── Frame-sequence background ── */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "contents, transform", transformOrigin: "center center" }}
        />

        {/* ── Ending frame — crossfades in over the closing scene as scroll
              reaches the end, so the hero settles on a static beat rather
              than freezing mid-video ── */}
        <div
          ref={endingRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            opacity: 0,
            backgroundImage: "url(/hero-ending.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "opacity, transform",
            transformOrigin: "center center",
          }}
        />

        {/* ── Edge vignette for legibility ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 22%, transparent 74%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ── Slides ── */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
            style={{
              zIndex: 3,
              opacity: 0,  // nothing shows during the video-only intro; seek() fades beat 0 in once it hands off
              transition: i === 0 ? "opacity 0.5s ease" : undefined,
              willChange: "opacity, transform",
            }}
          >
            {/* Title — uniformly bold across every beat, same font inherited
                from the site's own stack (globals.css), no italic. */}
            <h1
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                textShadow: "0 2px 48px rgba(0,0,0,0.85)",
              }}
            >
              {slide.lead}
              {slide.emphasis}
            </h1>

            {/* Slide number — bottom right */}
            <span
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "2rem",
                fontSize: "0.625rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              0{i + 1} / 08
            </span>
          </div>
        ))}

        {/* ── Scroll hint (first beat only — fades out as the sequence
              starts). Mouse glyph with a travelling wheel dot. ── */}
        <style>{`
          @keyframes heroScrollWheel {
            0%   { transform: translateY(0);    opacity: 0; }
            22%  { opacity: 1; }
            72%  { transform: translateY(7px);  opacity: 1; }
            100% { transform: translateY(9px);  opacity: 0; }
          }
          @keyframes heroScrollNudge {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(4px); }
          }
          .hero-scroll-wheel {
            animation: heroScrollWheel 1.9s cubic-bezier(0.4,0,0.2,1) infinite;
          }
          .hero-scroll-cue { animation: heroScrollNudge 2.6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .hero-scroll-wheel, .hero-scroll-cue { animation: none !important; }
          }
        `}</style>
        <div
          ref={hintRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          style={{ zIndex: 4, transition: "opacity 0.4s ease" }}
          aria-hidden="true"
        >
          <div className="hero-scroll-cue">
            <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
              <rect
                x="1.1"
                y="1.1"
                width="19.8"
                height="31.8"
                rx="9.9"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
              />
              <circle className="hero-scroll-wheel" cx="11" cy="10" r="2.1" fill="#ffffff" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              textShadow: "0 2px 14px rgba(0,0,0,0.9)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "2.5rem",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
