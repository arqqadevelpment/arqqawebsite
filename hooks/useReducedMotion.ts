"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Reads the user's reduced-motion preference.
 *
 * `useSyncExternalStore` is the right primitive for a browser-owned value like
 * this: it reads the real preference on the first client render instead of
 * rendering `false` and then correcting it in an effect, which cost every
 * consumer an extra render pass (and briefly animated for people who had asked
 * us not to). The server snapshot is `false` because the preference is unknown
 * until the client mounts.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
