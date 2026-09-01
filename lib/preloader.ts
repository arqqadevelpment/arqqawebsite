/**
 * The handshake between the homepage preloader and the hero.
 *
 * Two signals travel in opposite directions:
 *
 *   hero  --ready-->  preloader   "my intro frames are buffered, you can leave"
 *   preloader --gate--> hero      "I'm gone, start your intro now"
 *
 * The second direction is the one that is easy to miss. The hero's intro is
 * timed from the moment it mounts, so without a gate it would play out behind
 * the preloader and the visitor would never see it. The hero still *downloads*
 * its frames the whole time the preloader is up — it just holds the animation.
 */

/* ── hero → preloader ─────────────────────────────────────────────────── */

let heroReady = false;
const heroReadyWaiters = new Set<() => void>();

/** Called by the hero once its intro frames have finished loading. */
export function signalHeroReady() {
  if (heroReady) return;
  heroReady = true;
  heroReadyWaiters.forEach((cb) => cb());
  heroReadyWaiters.clear();
}

/** Resolves as soon as the hero is ready. Returns an unsubscribe function. */
export function onHeroReady(cb: () => void): () => void {
  if (heroReady) {
    cb();
    return () => {};
  }
  heroReadyWaiters.add(cb);
  return () => heroReadyWaiters.delete(cb);
}

/* ── preloader → hero ─────────────────────────────────────────────────── */

// `pending` is true only until a preloader has run (or declined to run) on
// this document load. Once it flips, every later client-side navigation back
// to the homepage finds the gate already open and the hero starts at once.
let pending = true;
let gateOpen = false;
const gateWaiters = new Set<() => void>();

/** True when nothing is covering the homepage. */
export function isGateOpen() {
  return gateOpen || !pending;
}

/** Called by the preloader once it has finished fading out. */
export function openPreloaderGate() {
  pending = false;
  if (gateOpen) return;
  gateOpen = true;
  gateWaiters.forEach((cb) => cb());
  gateWaiters.clear();
}

/** Runs `cb` once the homepage is uncovered. Returns an unsubscribe function. */
export function whenGateOpen(cb: () => void): () => void {
  if (isGateOpen()) {
    cb();
    return () => {};
  }
  gateWaiters.add(cb);
  return () => gateWaiters.delete(cb);
}

/**
 * Whether a preloader has already been shown during this document load.
 * Read through a lazy `useState` initializer so it is stable across the
 * server render and hydration, and only ever written from an effect.
 */
export function hasPreloaderRun() {
  return !pending;
}

export function markPreloaderRun() {
  pending = false;
}
