"use client";

import { useEffect, useRef } from "react";

export function Counter({
  value,
  prefix = "",
  suffix = "",
  plain = false,
  duration = 2000,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  plain?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => (plain ? String(n) : n.toLocaleString("en-US"));
    const from = plain ? Math.max(0, value - 120) : 0;
    el.textContent = prefix + fmt(from) + suffix;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = prefix + fmt(Math.round(from + (value - from) * eased)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix, plain, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {plain ? value : value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
