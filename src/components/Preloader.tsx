"use client";

import { useEffect, useRef, useState } from "react";
import { Crest } from "./Crest";

/** First-visit intro: the register counts from 1912 to today, then the curtain lifts. */
export function Preloader() {
  const [state, setState] = useState<"run" | "leave" | "done">("run");
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("sl-intro") === "1";
      sessionStorage.setItem("sl-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setState("done"));
      return () => cancelAnimationFrame(id);
    }
    const end = new Date().getFullYear();
    const start = 1912;
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      if (yearRef.current) yearRef.current.textContent = String(Math.round(start + (end - start) * e));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setState("leave"), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (state !== "leave") return;
    const id = setTimeout(() => setState("done"), 1100);
    return () => clearTimeout(id);
  }, [state]);

  if (state === "done") return null;
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-ivory transition-[clip-path] duration-[1000ms] ease-[var(--ease-in-out-quart)] ${
        state === "leave" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      <Crest className="h-28 w-auto animate-[page-in_1s_var(--ease-out-expo)_both]" />
      <span ref={yearRef} className="display mt-8 text-7xl tabular-nums text-gold md:text-8xl">
        1912
      </span>
      <span className="eyebrow mt-4 text-ivory/50">Petit Séminaire Saint Léon · Kabgayi</span>
    </div>
  );
}
