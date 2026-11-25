"use client";

import { useState } from "react";
import { purpose } from "@/content/school";

const tabs = [
  { key: "mission", label: "Mission", rw: "Intego" },
  { key: "vision", label: "Vision", rw: "Icyerekezo" },
  { key: "values", label: "Values", rw: "Indangagaciro" },
  { key: "community", label: "Community", rw: "Umuryango" },
] as const;

/** The students' four "Learn more" modal cards, reworked as one editorial tab panel. */
export function PurposeTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("mission");
  const item = purpose[active];
  return (
    <div className="mt-10 grid gap-12 md:grid-cols-12">
      <div className="flex gap-2 overflow-x-auto md:col-span-4 md:flex-col md:overflow-visible" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`group flex shrink-0 items-baseline gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-500 md:border-0 md:border-b md:rounded-none md:px-0 md:py-6 ${
              active === t.key ? "border-gold text-ivory" : "border-white/10 text-ivory/40 hover:text-ivory/80"
            }`}
          >
            <span className="font-mono text-xs text-gold">0{i + 1}</span>
            <span className="display text-3xl md:text-5xl">{t.label}</span>
            <span className="eyebrow ml-auto hidden text-ivory/40 md:inline">{t.rw}</span>
          </button>
        ))}
      </div>
      <div key={active} className="page-enter md:col-span-7 md:col-start-6" role="tabpanel">
        <p className="display text-[clamp(1.9rem,3.6vw,3.2rem)] text-ivory">{item.short}</p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/65">{item.long}</p>
      </div>
    </div>
  );
}
