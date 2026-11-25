"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "@/content/history";

gsap.registerPlugin(ScrollTrigger);

function highlight(text: string, q: string): ReactNode {
  if (!q) return text;
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="rounded bg-gold px-0.5 text-ink">
        {p}
      </mark>
    ) : (
      p
    ),
  );
}

/** Searchable chronology. Search was part of the students' original page; here it filters live. */
export function Timeline() {
  const [query, setQuery] = useState("");
  const q = query.trim();
  const spine = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const matches = useMemo(
    () =>
      milestones.map((m) =>
        !q ? true : [m.year, m.date, m.title, m.text, m.place].join(" ").toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );
  const count = matches.filter(Boolean).length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spine.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-ms]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div>
      {/* Archive search */}
      <div className="sticky top-24 z-20 mx-auto mb-20 max-w-xl">
        <label className="flex items-center gap-3 rounded-full border border-ink/15 bg-ivory/85 py-2 pr-2 pl-6 shadow-[0_20px_50px_-25px_rgba(7,20,43,0.5)] backdrop-blur-xl">
          <span className="eyebrow shrink-0 text-brick">Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hirth, Kabgayi, 1913, bishop…"
            className="min-w-0 flex-1 bg-transparent py-2 text-ink outline-none placeholder:text-muted/60"
            aria-label="Search the history"
          />
          {q ? (
            <button onClick={() => setQuery("")} className="rounded-full bg-ink px-4 py-2 text-sm text-ivory">
              {count} found · clear
            </button>
          ) : (
            <span className="rounded-full bg-ink px-4 py-2 font-mono text-xs text-gold">{milestones.length} entries</span>
          )}
        </label>
        {q && count === 0 && (
          <div className="page-enter mt-4 rounded-2xl border-l-4 border-imigongo bg-ivory p-5 text-ink shadow-lg">
            <p className="font-semibold">Word not found</p>
            <p className="text-sm text-muted">&ldquo;{q}&rdquo; does not appear in the chronology. Try a name, a place or a year.</p>
          </div>
        )}
      </div>

      <div ref={root} className="relative">
        {/* spine */}
        <div className="absolute top-0 bottom-0 left-[18px] w-px bg-ink/10 md:left-1/2" />
        <div ref={spine} className="absolute top-0 bottom-0 left-[18px] w-px origin-top bg-gold md:left-1/2" />

        <ol className="space-y-20 md:space-y-28">
          {milestones.map((m, i) => {
            const left = i % 2 === 0;
            const on = matches[i];
            return (
              <li
                key={`${m.year}-${m.title}`}
                data-ms
                className={`relative grid gap-6 pl-12 transition-opacity duration-500 md:grid-cols-2 md:gap-20 md:pl-0 ${on ? "" : "opacity-15"}`}
              >
                {/* node */}
                <span
                  className={`absolute top-3 left-[18px] z-10 -translate-x-1/2 rounded-full border-2 border-ivory md:left-1/2 ${
                    m.key ? "h-5 w-5 bg-gold shadow-[0_0_0_6px_rgba(242,183,5,0.2)]" : "h-3 w-3 bg-ink"
                  }`}
                />
                <div className={`${left ? "md:text-right" : "md:order-2"}`}>
                  <p className={`display leading-none text-ink ${m.key ? "text-[clamp(4rem,9vw,8rem)]" : "text-[clamp(3rem,6vw,5rem)] text-ink/80"}`}>
                    {m.year}
                  </p>
                  <p className="eyebrow mt-3 text-brick">
                    {[m.date, m.place].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className={`${left ? "" : "md:order-1 md:text-right"}`}>
                  <h3 className="display text-3xl text-ink md:text-4xl">{highlight(m.title, q)}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-charcoal/75">{highlight(m.text, q)}</p>
                  {m.image && (
                    <div className={`archival relative mt-6 aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-[18px] ${left ? "" : "md:ml-auto"}`}>
                      <Image src={m.image} alt={m.title} fill sizes="320px" className="object-cover" />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
