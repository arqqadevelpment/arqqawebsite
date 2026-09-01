import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

/**
 * The chrome every route shares: nav, the gradient backdrop field, the grid
 * texture over it, and the footer.
 *
 * This markup used to be copy-pasted into all 20 page files, which had already
 * drifted — three pages carried the pinned-grid fix below and the other
 * seventeen still shipped the version it replaced.
 */

/** The standard backdrop field. */
const GRADIENT_DEFAULT = `
  radial-gradient(46% 22% at 12% 0%, rgba(255,110,50,0.16) 0%, rgba(224,60,40,0.07) 38%, transparent 70%),
  radial-gradient(52% 26% at 88% 12%, rgba(40,90,255,0.22) 0%, rgba(20,50,160,0.09) 45%, transparent 72%),
  radial-gradient(60% 24% at 50% 55%, rgba(60,125,255,0.14) 0%, rgba(25,60,180,0.06) 45%, transparent 72%),
  radial-gradient(48% 22% at 6% 85%, rgba(255,110,50,0.09) 0%, rgba(224,60,40,0.04) 40%, transparent 70%),
  linear-gradient(180deg, #000005 0%, #030305 10%, #030305 100%)
`;

/** The homepage runs a denser field — it has more sections to carry. */
const GRADIENT_HOME = `
  radial-gradient(46% 22% at 12% 0%, rgba(255,110,50,0.18) 0%, rgba(224,60,40,0.08) 38%, transparent 70%),
  radial-gradient(52% 26% at 88% 9%, rgba(40,90,255,0.24) 0%, rgba(20,50,160,0.10) 45%, transparent 72%),
  radial-gradient(60% 24% at 50% 50%, rgba(60,125,255,0.16) 0%, rgba(25,60,180,0.07) 45%, transparent 72%),
  radial-gradient(48% 22% at 6% 72%, rgba(255,110,50,0.10) 0%, rgba(224,60,40,0.04) 40%, transparent 70%),
  radial-gradient(52% 24% at 90% 96%, rgba(40,90,255,0.16) 0%, rgba(20,50,160,0.07) 45%, transparent 72%),
  linear-gradient(180deg, #000005 0%, #030305 12%, #030305 100%)
`;

/** The Catalyst System page leads blue rather than orange. */
const GRADIENT_CATALYST = `
  radial-gradient(50% 30% at 82% 0%, rgba(40,90,255,0.2) 0%, rgba(20,50,160,0.08) 45%, transparent 72%),
  radial-gradient(46% 24% at 8% 30%, rgba(255,110,50,0.12) 0%, rgba(224,60,40,0.05) 42%, transparent 72%),
  radial-gradient(56% 26% at 50% 75%, rgba(60,125,255,0.13) 0%, rgba(25,60,180,0.05) 45%, transparent 72%),
  linear-gradient(180deg, #000005 0%, #030305 8%, #030305 100%)
`;

const GRADIENTS = {
  default: GRADIENT_DEFAULT,
  home: GRADIENT_HOME,
  catalyst: GRADIENT_CATALYST,
} as const;

export type BackdropVariant = keyof typeof GRADIENTS;

type PageShellProps = {
  children: ReactNode;
  /** Which backdrop field to paint. */
  variant?: BackdropVariant;
  /**
   * Rendered above the backdrop, outside its stacking context — the homepage
   * hero, which owns the full viewport and its own black background.
   */
  above?: ReactNode;
  /**
   * Fades the top of the backdrop into black. Without it the radial glows
   * start at full strength right at the hero boundary and read as a hard line.
   */
  seam?: boolean;
};

export function PageShell({
  children,
  variant = "default",
  above,
  seam = false,
}: PageShellProps) {
  return (
    <main style={{ backgroundColor: "#000005" }}>
      <Navbar />
      {above}
      <div className="relative" style={{ background: GRADIENTS[variant] }}>
        {/* One continuous grid texture across all sections.

            Pinned to the viewport (fixed) rather than spanning the full page
            height. As an absolutely-positioned element it was a masked layer of
            1px hairlines several thousand pixels tall that had to be
            re-rasterized on every scroll frame; with sub-pixel scroll deltas
            (trackpad momentum) those hairlines resampled slightly differently
            each frame, which reads as the whole page shimmering left-to-right.
            Fixed + viewport-sized means it never moves, so it rasterizes once.
            A uniform 2%-alpha grid looks the same either way. */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
            transform: "translateZ(0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
        {seam && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "560px",
              background: "linear-gradient(180deg, #000005 0%, transparent 100%)",
            }}
          />
        )}
        {children}
        <Footer />
      </div>
    </main>
  );
}
