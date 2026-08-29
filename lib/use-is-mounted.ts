"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during SSR and the first client render, true afterwards.
 * Lets components render browser-only state (cart contents) without
 * a hydration mismatch, and without setting state inside an effect.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
