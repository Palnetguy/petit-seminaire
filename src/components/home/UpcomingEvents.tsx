"use client";

import { useSyncExternalStore } from "react";
import type { EventItem } from "@/lib/cms/schema";
import { Reveal } from "@/components/Reveal";

const subscribe = () => () => {};

/** Upcoming events only. "Today" is read in the browser so a static page never shows past dates. */
export function UpcomingEvents({ events }: { events: EventItem[] }) {
  const today = useSyncExternalStore(subscribe, () => new Date().toISOString().slice(0, 10), () => "");
  const upcoming = today ? events.filter((e) => e.date >= today).slice(0, 4) : [];
  if (!upcoming.length) return null;
  return (
    <div className="mt-20">
      <div className="flex items-center gap-4">
        <span className="lozenge text-brick" />
        <span className="eyebrow text-brick">Kalendari · Coming up</span>
      </div>
      <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {upcoming.map((e, i) => {
          const d = new Date(e.date + "T12:00:00");
          return (
            <Reveal key={e.id} as="li" delay={i * 80} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-8">
              <p className="leading-none text-ink">
                <span className="display block text-4xl sm:text-5xl">{d.toLocaleDateString("en-GB", { day: "2-digit" })}</span>
                <span className="eyebrow text-brick">{d.toLocaleDateString("en-GB", { month: "long" })}</span>
              </p>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-ink">{e.title}</h3>
                {e.text && <p className="mt-1 text-charcoal/65">{e.text}</p>}
              </div>
              <p className="col-start-2 text-sm text-muted sm:col-start-3 sm:text-right">
                {[e.time, e.place].filter(Boolean).join(" · ")}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
