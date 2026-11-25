"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { gallery, type GalleryItem } from "@/content/school";
import { getLenis } from "@/components/SmoothScroll";

const cats = ["All", "Faith", "Academics", "Student life", "Campus", "Events"] as const;

export function GalleryGrid() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items: GalleryItem[] = useMemo(() => (cat === "All" ? gallery : gallery.filter((g) => g.cat === cat)), [cat]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open, close, step]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter photos">
        {cats.map((c) => {
          const n = c === "All" ? gallery.length : gallery.filter((g) => g.cat === c).length;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
                cat === c ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink hover:border-ink"
              }`}
            >
              {c} <span className={`ml-1 font-mono text-xs ${cat === c ? "text-gold" : "text-muted"}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <div key={cat} className="page-enter mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setOpen(i)}
            className={`group relative block w-full break-inside-avoid overflow-hidden bg-ink text-left ${i % 5 === 0 ? "arch-sm" : "rounded-[22px]"}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={900}
              height={700}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-80"
            />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-between bg-gradient-to-t from-ink/90 to-transparent p-5 text-ivory transition-transform duration-500 group-hover:translate-y-0">
              <span className="text-sm">{g.alt}</span>
              <span className="eyebrow text-gold">{g.cat}</span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && items[open] && createPortal(
        <div className="fixed inset-0 z-[90] flex flex-col bg-ink/95 text-ivory backdrop-blur-xl" role="dialog" aria-modal="true" aria-label={items[open].alt}>
          <div className="flex items-center justify-between px-5 py-5 md:px-10">
            <span className="font-mono text-sm text-ivory/50">
              {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button onClick={close} className="rounded-full bg-ivory px-5 py-2 text-sm font-semibold text-ink" autoFocus>
              Close ✕
            </button>
          </div>
          <div className="relative flex-1" onClick={close}>
            <Image key={items[open].src} src={items[open].src} alt={items[open].alt} fill sizes="100vw" className="page-enter object-contain p-4 md:p-10" />
          </div>
          <div className="flex items-center justify-between gap-4 px-5 pb-6 md:px-10">
            <button onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 hover:bg-gold hover:text-ink" aria-label="Previous">←</button>
            <p className="text-center text-sm text-ivory/70">
              {items[open].alt} · <span className="text-gold">{items[open].cat}</span>
            </p>
            <button onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 hover:bg-gold hover:text-ink" aria-label="Next">→</button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
