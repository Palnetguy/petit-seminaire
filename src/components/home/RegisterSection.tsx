"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RegisterField } from "@/components/three";

gsap.registerPlugin(ScrollTrigger);

const captions = [
  {
    k: "1912",
    title: "Seventeen boys.",
    text: "On 22 December 1912, the first seventeen seminarians are entered in the register of Saint Léon.",
  },
  {
    k: "Nº 5,154",
    title: "One register. Every name.",
    text: "Each point here is a name in that register, more than five thousand by the centenary. The gold one is Nº 81: Aloys Bigirumwami, Rwanda's first bishop.",
  },
  {
    k: "Vocation",
    title: "One calling.",
    text: "Priests, bishops, teachers, doctors, engineers, leaders. Many paths, all formed at the foot of the same cross.",
  },
];

export function RegisterSection() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress * 2.4; // 0 → cloud, 1 → ledger, 2 → cross
        progress.current = Math.min(2, p);
        setStep(p < 0.6 ? 0 : p < 1.55 ? 1 : 2);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={root} className="relative h-[320vh] bg-ink text-ivory">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,79,163,0.35),transparent_60%)]" />
        <RegisterField progress={progress} className="absolute inset-0" />

        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto flex max-w-[1320px] items-center justify-between px-5 pt-28 md:px-10">
          <span className="eyebrow text-gold">Igitabo cy&apos;abaseminari · The register</span>
          <span className="eyebrow text-ivory/40">{String(step + 1).padStart(2, "0")} / 03</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[1320px] px-5 pb-14 md:px-10 md:pb-20">
          <div className="relative h-[220px] md:h-[200px]">
            {captions.map((c, i) => (
              <div
                key={c.k}
                className={`absolute inset-0 grid gap-4 transition-all duration-700 md:grid-cols-12 md:items-end ${
                  step === i ? "translate-y-0 opacity-100" : step > i ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
                }`}
              >
                <div className="md:col-span-7">
                  <p className="font-mono text-sm text-gold">{c.k}</p>
                  <p className="display mt-2 text-[clamp(2.4rem,6vw,5.5rem)]">{c.title}</p>
                </div>
                <p className="max-w-md text-ivory/70 md:col-span-5 md:justify-self-end">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 h-px w-full bg-white/10">
            <div className="h-px bg-gold transition-all duration-500" style={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
