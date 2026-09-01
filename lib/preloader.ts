/**
 * State shared between the site-wide preloader and the homepage hero.
 *
 * Two things travel between them:
 *
 *   hero --progress/ready--> preloader   real loading progress to display, and
 *                                        "my intro frames are in, you can go"
 *   preloader --gate-------> hero        "I'm gone, start your intro now"
 *
 * The gate is the half that is easy to miss. The hero's intro is timed from
 * the moment it starts, so without a gate it would play out behind the
 * overlay and the opening of the sequence would be lost. The hero downloads
 * frames the whole time the overlay is up — it just holds the animation until
 * the screen is actually visible.
 *
 * This is module state rather than React state on purpose: the hero and the
 * preloader sit in different subtrees (the preloader lives in the root
 * layout so it survives navigation) and would otherwise need context
 * threaded through every page.
 */

type Listener = () => void;

function flush(set: Set<Listener>) {
  // Copy first: a listener may unsubscribe itself while we iterate.
  [...set].forEach((cb) => cb());
}

/* ── hero → preloader ─────────────────────────────────────────────────── */

let heroPresent = false;
let heroLoaded = 0;
let heroTotal = 0;
const heroListeners = new Set<Listener>();

/**
 * Called by the hero as it mounts, with how many frames it must buffer before
 * the page can be revealed. Returns an unregister function.
 */
export function registerHero(framesNeeded: number): () => void {
  heroPresent = true;
  heroLoaded = 0;
  heroTotal = framesNeeded;
  flush(heroListeners);
  return () => {
    heroPresent = false;
    heroLoaded = 0;
    heroTotal = 0;
    flush(heroListeners);
  };
}

/** Called once per intro frame that finishes loading (or fails). */
export function reportHeroFrame() {
  if (!heroPresent) return;
  heroLoaded = Math.min(heroLoaded + 1, heroTotal);
  flush(heroListeners);
}

/** 0-1. Only meaningful while a hero is registered. */
export function heroProgress() {
  if (!heroPresent || heroTotal === 0) return 0;
  return heroLoaded / heroTotal;
}

export function isHeroPresent() {
  return heroPresent;
}

export function isHeroReady() {
  return heroPresent && heroTotal > 0 && heroLoaded >= heroTotal;
}

export function subscribeHero(cb: Listener): () => void {
  heroListeners.add(cb);
  return () => heroListeners.delete(cb);
}

/* ── preloader → hero ─────────────────────────────────────────────────── */

// Starts closed. The preloader lives in the root layout, so it is always
// present to open it — and on a fresh document load the hero must not begin
// its intro before the overlay has cleared.
let gateOpen = false;
const gateListeners = new Set<Listener>();

export function isGateOpen() {
  return gateOpen;
}

/** Called by the preloader once it has finished fading out. */
export function openGate() {
  if (gateOpen) return;
  gateOpen = true;
  flush(gateListeners);
}

/** Called by the preloader when a new load cycle begins. */
export function closeGate() {
  gateOpen = false;
}

/** Runs `cb` once the page is uncovered. Returns an unsubscribe function. */
export function whenGateOpen(cb: Listener): () => void {
  if (gateOpen) {
    cb();
    return () => {};
  }
  gateListeners.add(cb);
  return () => gateListeners.delete(cb);
}

/* ── first load vs. navigation ────────────────────────────────────────── */

// The preloader remounts on every route change, so it cannot tell the two
// apart from its own state. This survives those remounts and dies with the
// document, which is exactly the distinction needed: a longer, deliberate
// hold when the site first opens, a brief one between pages.
let openedOnce = false;

export function isFirstLoad() {
  return !openedOnce;
}

export function markOpened() {
  openedOnce = true;
}
