import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { ChapelReveal } from "@/components/home/ChapelReveal";
import { RegisterSection } from "@/components/home/RegisterSection";
import { MaskLines, Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ImigongoBand } from "@/components/Imigongo";
import { ImigongoWall } from "@/components/three";
import { events, gallery, news, pillars, programs, stats } from "@/content/school";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { SchoolName } from "@/components/SchoolName";

export default function Home() {
  return (
    <div className="page-enter">
      <HomeHero />

      {/* ── Statement + numbers ───────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-40">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow text-brick">01</span>
            <span className="lozenge text-brick" />
            <span className="eyebrow text-muted">Since 1912</span>
          </Reveal>
          <Reveal delay={100}>
            <p className="display mt-8 max-w-[18ch] text-[clamp(2.4rem,5.6vw,5.4rem)] text-ink">
              The <em className="text-brick">cradle</em> of the priesthood in Rwanda, and a school for the whole nation.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <Reveal delay={200} className="text-lg leading-relaxed text-charcoal/75 md:col-span-5 md:col-start-7">
              <p>
                Founded by Bishop Jean-Joseph Hirth of the Missionaries of Africa, <SchoolName /> opened its doors at
                Kabgayi on 4 October 1913. Until 1953 it was the only minor seminary in the country. Every
                other seminary in Rwanda grew from its model.
              </p>
              <Link href="/history" className="link-gold mt-6 inline-block font-semibold text-brick">
                Read the full history →
              </Link>
            </Reveal>
          </div>

          <div className="mt-24 grid grid-cols-2 border-t border-ink/15 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 100}
                className={`border-ink/15 py-10 pr-6 ${i % 2 === 0 ? "border-r" : ""} md:border-r ${i === 3 ? "md:border-r-0" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} ${i % 2 ? "pl-6" : ""} md:pl-6 md:first:pl-0`}
              >
                <p className="display text-[clamp(2.6rem,5vw,4.6rem)] text-ink">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} plain={s.plain} />
                </p>
                <p className="mt-3 font-semibold text-ink">{s.label}</p>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ChapelReveal />

      {/* ── Four pillars of formation ─────────────────────── */}
      <section className="relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span className="eyebrow text-brick">02</span>
                <span className="lozenge text-brick" />
                <span className="eyebrow text-muted">Formation</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)] text-ink" lines={["Four pillars,", <em key="o" className="text-brick">one person.</em>]} />
            </div>
            <Reveal delay={200} className="text-charcoal/70 md:col-span-4 md:col-start-9">
              <p>
                A seminary forms the whole person. At <SchoolName />, prayer, study, character and service are not
                separate subjects. They are one way of life.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 flex flex-col gap-3 md:h-[560px] md:flex-row">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group relative min-h-[340px] overflow-hidden rounded-[28px] bg-ink text-ivory transition-[flex] duration-700 ease-[var(--ease-out-expo)] md:min-h-0 md:flex-1 md:hover:flex-[2.4]"
              >
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-50 transition duration-1000 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <span className="display text-5xl text-gold">{p.n}</span>
                    <span className="eyebrow rounded-full border border-white/20 px-3 py-1.5 text-ivory/70">{p.rw}</span>
                  </div>
                  <div>
                    <h3 className="display text-4xl">{p.title}</h3>
                    <p className="mt-3 max-w-sm text-ivory/75 transition-all duration-700 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RegisterSection />

      {/* ── Programs teaser ────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal className="flex items-center gap-4">
                <span className="eyebrow text-brick">03</span>
                <span className="lozenge text-brick" />
                <span className="eyebrow text-muted">Amasomo · Programs</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.6rem,5.6vw,5rem)] text-ink" lines={["A science school", <em key="t" className="text-brick">with a soul.</em>]} />
              <Reveal delay={200} className="mt-6 text-charcoal/70">
                <p>From Senior 1 to Senior 6, on Rwanda&apos;s national curriculum, with the music, sport and service that make a seminary education complete.</p>
              </Reveal>
              <Reveal delay={300}>
                <Link href="/programs" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink py-3.5 pr-3.5 pl-7 font-semibold text-ivory transition hover:bg-brick">
                  Explore programs
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                </Link>
              </Reveal>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
              {programs.levels.map((l, i) => (
                <Reveal key={l.code} delay={i * 120} className="relative overflow-hidden rounded-[28px] bg-ivory p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                  <span className="display absolute -top-6 -right-2 text-[10rem] leading-none text-ink/[0.05]">{l.code}</span>
                  <p className="eyebrow text-brick">{l.years}</p>
                  <h3 className="display mt-4 text-4xl text-ink">{l.title}</h3>
                  <p className="mt-4 text-charcoal/70">{l.text}</p>
                </Reveal>
              ))}
              <Reveal delay={240} className="flex flex-wrap gap-2 sm:col-span-2">
                {programs.subjects.flatMap((s) =>
                  s.items.map((it) => (
                    <span key={it} className="rounded-full border border-ink/15 bg-ivory/60 px-4 py-2 text-sm text-ink">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
                      {it}
                    </span>
                  )),
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chronicle (news) ───────────────────────────────── */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal className="flex items-center gap-4">
                <span className="eyebrow text-brick">04</span>
                <span className="lozenge text-brick" />
                <span className="eyebrow text-muted">Amakuru · Chronicle</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.6rem,5.6vw,5rem)] text-ink" lines={[<span key="l">Life at <SchoolName>Petit Séminaire</SchoolName></span>, <em key="k" className="text-brick"><SchoolName>Saint Léon Kabgayi</SchoolName></em>]} />
            </div>
            <Link href="/gallery" className="link-gold font-semibold text-brick">View the gallery →</Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 120} as="article" className="group">
                <div className="arch-sm relative aspect-[4/5] overflow-hidden bg-ink">
                  <Image src={n.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                  <div className="absolute top-5 left-5 rounded-2xl bg-ivory px-3 py-2 text-center leading-none text-ink">
                    <span className="display block text-2xl">{n.date.split(" ")[0]}</span>
                    <span className="eyebrow text-[12px]!">{n.date.split(" ")[1]}</span>
                  </div>
                  <span className="eyebrow absolute top-6 right-5 rounded-full bg-ink/60 px-3 py-1.5 text-ivory backdrop-blur">{n.tag}</span>
                </div>
                <p className="mt-6 font-display text-sm italic text-brick">{n.rw}</p>
                <h3 className="mt-1 text-xl font-semibold leading-snug text-ink">{n.title}</h3>
                <p className="mt-2 text-charcoal/65">{n.text}</p>
              </Reveal>
            ))}
          </div>
          <UpcomingEvents events={events} />
        </div>
      </section>

      {/* ── Photo river ────────────────────────────────────── */}
      <section className="overflow-hidden bg-ivory pb-28">
        <div className="marquee-track flex w-max gap-4 [--speed:70s] hover:[animation-play-state:paused]">
          {[...gallery.slice(0, 10), ...gallery.slice(0, 10)].map((g, i) => (
            <div key={i} className={`relative shrink-0 overflow-hidden rounded-[24px] ${i % 3 === 1 ? "arch-sm h-[360px] w-[280px]" : "h-[300px] w-[420px]"}`}>
              <Image src={g.src} alt={g.alt} fill sizes="420px" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Join — living Imigongo wall ────────────────────── */}
      <section className="relative isolate h-[90svh] min-h-[620px] overflow-hidden bg-ink text-ivory">
        <ImigongoWall className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-20 md:px-10">
          <Reveal>
            <p className="eyebrow text-gold">Ikaze mu muryango · Welcome to the family</p>
          </Reveal>
          <MaskLines className="display mt-6 text-[clamp(3rem,8vw,8rem)]" lines={["Become part", <em key="f" className="text-gold">of our story.</em>]} />
          <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/contact#visit" className="group inline-flex items-center gap-3 rounded-full bg-gold py-3.5 pr-3.5 pl-7 font-semibold text-ink transition hover:bg-ivory">
              Admissions & visits
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-gold transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
            </Link>
            <p className="max-w-sm text-sm text-ivory/60">
              Move your cursor over the panel: it is drawn from <em>imigongo</em>, the geometric art of Rwanda.
            </p>
          </Reveal>
        </div>
      </section>
      <ImigongoBand variant="classic" height={14} />
    </div>
  );
}
