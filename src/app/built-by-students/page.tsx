import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaskLines, Reveal } from "@/components/Reveal";
import { ImigongoBand } from "@/components/Imigongo";
import { studentDevelopers } from "@/content/school";

export const metadata: Metadata = {
  title: "Built by students",
  description: "This website began as a project by students of Petit Séminaire Saint Léon Kabgayi. Meet the team and see how their design grew.",
};

const wireframes = [
  { src: "/img/wireframes/home.jpg", label: "Home", becameHref: "/" },
  { src: "/img/wireframes/about.jpg", label: "About us", becameHref: "/about" },
  { src: "/img/wireframes/programs.jpg", label: "Programs", becameHref: "/programs" },
  { src: "/img/wireframes/gallery.jpg", label: "Gallery", becameHref: "/gallery" },
  { src: "/img/wireframes/contact.jpg", label: "Contact", becameHref: "/contact" },
];

const kept = [
  ["Navy & gold", "The students chose #002D62 and #FFC107. They remain the backbone of the palette."],
  ["The motto", "“Turerera u Rwanda rwejo” led their hero. It leads ours."],
  ["The history", "They transcribed the full history from the register. Every date on the History page is theirs."],
  ["Archive search", "Their history page had a word search with a ‘word not found’ card. It is now a live filter."],
  ["Floating header", "Their rounded, fixed navigation bar became the floating pill at the top of every page."],
  ["Page loader", "Their loader showed the crest while pages opened. It became the 1912 → today intro."],
  ["Gallery filters", "All / Academics / Faith / Student life / Events / Facilities. Same idea, now with a lightbox."],
  ["Mission cards", "Their four ‘Learn more’ modals became the Mission · Vision · Values · Community panel."],
];

const upgraded = [
  ["Bootstrap + HTML", "Next.js 16 + React + TypeScript"],
  ["Copied markup per page", "Shared components & one content file"],
  ["CSS keyframes", "GSAP scroll timelines + smooth scrolling"],
  ["Flat images", "Three.js: 3D crest, register particles, imigongo wall"],
  ["8 MB photos", "Optimised, responsive images"],
];

export default function StudentsPage() {
  return (
    <div className="page-enter">
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="mx-auto max-w-[1320px] px-5 pt-40 pb-20 md:px-10 md:pt-48">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow text-gold">Nº 07</span>
            <span className="lozenge text-gold" />
            <span className="eyebrow text-ivory/60">Developers</span>
          </Reveal>
          <MaskLines
            as="h1"
            className="display mt-6 text-[clamp(3.2rem,9vw,8.5rem)]"
            lines={["This website", <em key="w" className="text-gold">was started</em>, "by students."]}
          />
          <Reveal delay={300} className="mt-8 max-w-2xl text-lg text-ivory/70">
            <p>
              A team of seminarians from Petit Séminaire Saint Léon Kabgayi designed the first version: wireframes, colours, the history text, and six
              hand-coded pages. This site keeps their ideas and shows how far they can be taken. Every great product
              starts as a first draft.
            </p>
          </Reveal>
        </div>

        {/* Team */}
        <div className="mx-auto max-w-[1320px] px-5 pb-28 md:px-10">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {studentDevelopers.map((s, i) => (
              <Reveal key={s.name} delay={(i % 7) * 60} className="group">
                <div className="duotone arch-sm relative aspect-[4/5] overflow-hidden">
                  <Image src={s.image} alt={s.name} fill sizes="(min-width: 768px) 14vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-sm font-semibold">{s.name}</p>
              </Reveal>
            ))}
            <Reveal delay={400} className="flex aspect-[4/5] flex-col justify-end rounded-[22px] border border-dashed border-gold/40 p-4">
              <p className="display text-2xl text-gold">+ you?</p>
              <p className="mt-1 text-xs text-ivory/50">The next version is yours to build.</p>
            </Reveal>
          </div>
        </div>
        <ImigongoBand variant="navy" height={18} />
      </section>

      {/* Wireframes */}
      <section className="grain relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span className="lozenge text-brick" />
                <span className="eyebrow text-brick">From wireframe to web</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["Their sketches,", <em key="l" className="text-brick">now live.</em>]} />
            </div>
            <Reveal delay={150} className="text-charcoal/70 md:col-span-4 md:col-start-9">
              <p>These are the students&apos; original page designs. Tap any one to open the page it became.</p>
            </Reveal>
          </div>
        </div>
        <div className="flex snap-x gap-6 overflow-x-auto px-5 pb-28 md:px-10 [scrollbar-width:none]" data-lenis-prevent>
          {wireframes.map((w, i) => (
            <Link key={w.label} href={w.becameHref} className="group w-[78vw] max-w-[440px] shrink-0 snap-start">
              <Reveal delay={i * 80}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-ink/10 bg-paper">
                  <Image src={w.src} alt={`Student wireframe: ${w.label}`} fill sizes="440px" className="object-cover object-top transition-transform duration-[2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                  <span className="eyebrow absolute top-4 left-4 rounded-full bg-ink px-3 py-1.5 text-ivory">Student wireframe</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="display text-2xl text-ink">{w.label}</p>
                  <span className="text-brick transition-transform group-hover:translate-x-1">See it live →</span>
                </div>
              </Reveal>
            </Link>
          ))}
        </div>
      </section>

      {/* What we kept */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <MaskLines className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["What we kept"]} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {kept.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 4) * 80} className="bg-ivory p-7">
                <span className="font-mono text-xs text-brick">0{i + 1}</span>
                <h3 className="display mt-4 text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What changed */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <MaskLines className="display text-[clamp(2.4rem,5vw,4.6rem)]" lines={["What we", <em key="u" className="text-gold">took further</em>]} />
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {upgraded.map(([a, b], i) => (
              <Reveal key={a} delay={i * 70} className="grid items-center gap-3 py-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
                <p className="text-lg text-ivory/45 line-through decoration-gold/40">{a}</p>
                <span className="hidden text-gold md:block">→</span>
                <p className="display text-2xl md:text-3xl">{b}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <p className="max-w-2xl text-ivory/60">
              Want to learn how it works? The code is organised so that a student can read it: one file for all the school
              content, one folder per page, and the 3D scenes in their own folder.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
