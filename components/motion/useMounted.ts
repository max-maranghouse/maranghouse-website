"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * True only once the component has mounted on the client. Every motion
 * primitive in this directory renders its plain, fully visible markup while
 * this is false (matching server output and any no-JS render) and only
 * swaps to its animated form afterwards — the mechanism that keeps content
 * visible before JavaScript runs. Built on `useSyncExternalStore` (React's
 * hydration-safe primitive for this exact "differs between server and
 * client" case) rather than a `useEffect` + `setState`, which
 * `react-hooks/set-state-in-effect` flags as an unnecessary render cascade.
 */
export function useMounted() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
