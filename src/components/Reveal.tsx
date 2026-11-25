"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

/** Adds `.is-in` when the element enters the viewport. Works with [data-reveal] and .line-mask CSS. */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  mask = false,
  once = true,
  style,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  mask?: boolean;
  once?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          if (once) io.disconnect();
        } else if (!once) el.classList.remove("is-in");
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={className}
      {...(mask ? {} : { "data-reveal": "" })}
      style={{ ...style, ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Splits text into masked lines that slide up in sequence. Pass lines explicitly for control. */
export function MaskLines({
  lines,
  className = "",
  stagger = 90,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Reveal as={Tag} mask className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span style={{ ["--d" as string]: `${delay + i * stagger}ms` }}>{l}</span>
        </span>
      ))}
    </Reveal>
  );
}
