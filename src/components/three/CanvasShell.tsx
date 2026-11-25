"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts the WebGL canvas only when it approaches the viewport and stops the
 * render loop while it is off-screen. Falls back to `fallback` without WebGL.
 */
export function CanvasShell({
  children,
  className = "",
  camera,
  fallback = null,
}: {
  children: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
  fallback?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  // client-only component (loaded with ssr:false), so window is available here
  const [supported] = useState(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  });
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {!supported
        ? fallback
        : mounted && (
            <Canvas
              frameloop={visible ? (reduced ? "demand" : "always") : "never"}
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              camera={camera}
            >
              {children}
            </Canvas>
          )}
    </div>
  );
}
