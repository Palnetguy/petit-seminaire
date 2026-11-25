import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MaskLines, Reveal } from "@/components/Reveal";
import { programs } from "@/content/school";

export const metadata: Metadata = {
  title: "Programs",
  description: "O-Level and A-Level science education, music, sport and service at Saint Léon Kabgayi.",
};

export default function ProgramsPage() {
  return (
    <div className="page-enter">
      <PageHero
        index="Nº 03"
        eyebrow="Our programs"
        rw="Amasomo"
        title={["Knowledge,", <em key="s" className="text-gold">skills</em>, "and values."]}
        intro="Rwanda's national curriculum taught with a seminary's rigour, from Senior 1 to Senior 6, with the formation that happens beyond the classroom."
        image="/img/academics/exam.jpg"
        imageAlt="Students writing an exam"
      />

      {/* Levels */}
      <section className="grain relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <Reveal className="flex items-center gap-4">
            <span className="lozenge text-brick" />
            <span className="eyebrow text-brick">Academic programs</span>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {programs.levels.map((l, i) => (
              <Reveal key={l.code} delay={i * 120} className="group relative overflow-hidden rounded-[32px] bg-ink p-10 text-ivory md:p-14">
                <span className="display pointer-events-none absolute -right-6 -bottom-16 text-[18rem] leading-none text-gold/10 transition-transform duration-1000 group-hover:-translate-y-4">
                  {l.code}
                </span>
                <p className="eyebrow text-gold">{l.years}</p>
                <h2 className="display mt-6 text-5xl md:text-6xl">{l.title}</h2>
                <p className="relative mt-6 max-w-md text-lg text-ivory/70">{l.text}</p>
              </Reveal>
            ))}
          </div>

          {/* Combinations */}
          <div className="mt-24 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <MaskLines className="display text-[clamp(2.2rem,4.4vw,4rem)] text-ink" lines={["A-Level", <em key="c" className="text-brick">combinations</em>]} />
              <Reveal delay={150} className="mt-6 text-charcoal/70">
                <p>Building on a tradition that ran from Latin sections to Maths–Physics and Biology–Chemistry, the seminary today focuses on the sciences.</p>
              </Reveal>
            </div>
            <div className="space-y-4 md:col-span-7 md:col-start-6">
              {programs.combinations.map((c, i) => (
                <Reveal key={c.code} delay={i * 120} className="group flex items-center gap-8 rounded-[24px] border border-ink/10 bg-paper/60 p-7 transition-colors duration-500 hover:bg-gold">
                  <span className="display w-28 shrink-0 text-5xl text-ink md:text-6xl">{c.code}</span>
                  <div>
                    <p className="text-lg font-semibold text-ink">{c.name}</p>
                    <p className="text-charcoal/60">{c.note}</p>
                  </div>
                  <span className="ml-auto hidden text-2xl text-ink/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-ink md:block">→</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <MaskLines className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["What we teach"]} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.subjects.map((s, i) => (
              <Reveal key={s.name} delay={i * 90} className="relative overflow-hidden rounded-[28px] bg-ivory p-8">
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: s.color }} />
                <h3 className="display text-3xl text-ink">{s.name}</h3>
                <ul className="mt-6 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-charcoal/75">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span className="lozenge text-gold" />
                <span className="eyebrow text-gold">Beyond the classroom</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.4rem,5.4vw,5rem)]" lines={["Discover your talent,", <em key="g" className="text-gold">grow in confidence.</em>]} />
            </div>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-6">
            {programs.coCurricular.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 90}
                className={`group relative overflow-hidden rounded-[28px] ${i < 2 ? "md:col-span-3 aspect-[16/11]" : "md:col-span-2 aspect-[4/5]"}`}
              >
                <Image src={c.image} alt={c.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="display text-3xl md:text-4xl">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-ivory/75">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold text-ink">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-center md:px-10">
          <p className="display text-[clamp(2rem,4.4vw,4rem)]">
            Discover your potential. <em>Lead with values.</em>
          </p>
          <Link href="/contact#visit" className="shrink-0 rounded-full bg-ink px-7 py-4 font-semibold text-ivory transition hover:bg-brick">
            Ask about admission →
          </Link>
        </div>
      </section>
    </div>
  );
}
