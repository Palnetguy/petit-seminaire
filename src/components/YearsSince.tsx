"use client";

import { useSyncExternalStore } from "react";

const FOUNDED = 1912;
const subscribe = () => () => {};

/** Years since foundation, computed on the client so static HTML never goes stale. */
export function YearsSince() {
  const years = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear() - FOUNDED,
    () => 114,
  );
  return <span suppressHydrationWarning>{years}</span>;
}
