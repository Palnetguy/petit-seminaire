"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SchoolName } from "@/components/SchoolName";

gsap.registerPlugin(ScrollTrigger);

/** The chapel opens like a door: an arch window grows to fill the screen as you scroll. */
export function ChapelReveal() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const inside = useRef<HTMLDivElement>(null);
  const copyA = useRef<HTMLDivElement>(null);
  const copyB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", scrub: 1, pin: true, invalidateOnRefresh: true },
      });
      const w0 = () => Math.min(window.innerWidth * 0.62, 340);
      tl.fromTo(
        frame.current,
        { width: w0, height: () => w0() * 1.4, borderTopLeftRadius: () => w0() / 2, borderTopRightRadius: () => w0() / 2 },
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          ease: "power2.inOut",
          duration: 1,
        },
      )
        .fromTo(img.current, { scale: 1.35 }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
        .to(copyA.current, { opacity: 0, y: -40, duration: 0.3 }, 0.05)
        .fromTo(inside.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.05)
        .fromTo(copyB.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, 1.25)
        .to({}, { duration: 0.3 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-ivory">
      <div ref={copyA} className="pointer-events-none absolute inset-x-0 top-[12%] z-10 text-center">
        <p className="eyebrow text-brick">Shapel · The chapel</p>
        <p className="display mx-auto mt-4 max-w-3xl px-5 text-[clamp(2.2rem,5vw,4.5rem)] text-ink">
          Every morning begins <em className="text-brick">here.</em>
        </p>
      </div>

      <div className="absolute inset-0 flex items-end justify-center">
        <div
          ref={frame}
          className="relative overflow-hidden"
          style={{ width: "min(62vw, 340px)", height: "min(86.8vw, 476px)", borderRadius: "999px 999px 0 0" }}
        >
          <div ref={img} className="absolute inset-0">
            <Image src="/img/campus/chapel-exterior.jpg" alt="The seminary chapel of Saint Léon Kabgayi" fill sizes="100vw" className="object-cover" />
          </div>
          <div ref={inside} className="absolute inset-0 opacity-0">
            <Image src="/img/campus/chapel-interior.jpg" alt="The painted sanctuary inside the chapel" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/40" />
          </div>
        </div>
      </div>

      <div ref={copyB} className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1320px] px-5 pb-14 text-ivory opacity-0 md:px-10 md:pb-20">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <p className="display text-[clamp(2.4rem,6vw,5.5rem)] md:col-span-7">
            Built in the 1930s.
            <br />
            <em className="text-gold">Still full every day.</em>
          </p>
          <p className="max-w-md text-ivory/80 md:col-span-5 md:justify-self-end">
            Raised as the seminary celebrated its first 25 years, the chapel is the heart of <SchoolName />:
            daily Mass, sung liturgy, and the quiet where vocations are discerned.
          </p>
        </div>
      </div>
    </section>
  );
}
