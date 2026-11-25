import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { MaskLines, Reveal } from "@/components/Reveal";
import { ImigongoBand, ImigongoField } from "@/components/Imigongo";
import { Crest } from "@/components/Crest";
import { SchoolName, withSchoolName } from "@/components/SchoolName";
import { team } from "@/content/school";

// handwriting, used only for the team leader's signature
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "Built by students",
  description:
    "This website began as a class project by students of Petit Séminaire Saint Léon Kabgayi, guided by their mentor. Read a word from their team leader.",
};

const wireframes = [
  { src: "/img/wireframes/home.jpg", label: "Home", href: "/" },
  { src: "/img/wireframes/about.jpg", label: "About", href: "/about" },
  { src: "/img/wireframes/programs.jpg", label: "Programs", href: "/programs" },
  { src: "/img/wireframes/gallery.jpg", label: "Gallery", href: "/gallery" },
  { src: "/img/wireframes/contact.jpg", label: "Contact", href: "/contact" },
];

const roman = ["I", "II", "III", "IV", "V", "VI"];

export default function StudentsPage() {
  const paragraphs = team.message.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  // until a name is filled in, sign as "Team leader · Student Developers" (no repetition)
  const signedBy = team.leaderName || "Team leader";
  const roleLine = team.leaderName ? team.leaderRole : "Student Developers";

  return (
    <div className={`page-enter ${hand.variable}`}>
      {/* ── Hero: the team ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="mx-auto max-w-[1320px] px-5 pt-36 pb-16 md:px-10 md:pt-44">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow text-gold">Nº 07</span>
            <span className="lozenge text-gold" />
            <span className="eyebrow text-ivory/60">The student developers</span>
          </Reveal>
          <MaskLines
            as="h1"
            className="display mt-6 text-[clamp(3rem,8.5vw,8rem)]"
            lines={["This website", <em key="w" className="text-gold">was started</em>, "by students."]}
          />
          <Reveal delay={300} className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/70">
            <p>
              A class project by seminarians of <SchoolName /> who had never written code before, guided by their
              mentor, {team.mentorName}. Their wireframes, colours and words are the foundation of every page here.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[1320px] px-5 pb-24 md:px-10">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {team.members.map((s, i) => (
              <Reveal key={s.name + i} delay={(i % 7) * 60} className="group">
                <div className="duotone arch-sm relative aspect-[4/5] overflow-hidden">
                  {s.photo ? (
                    <Image src={s.photo} alt={s.name} fill sizes="(min-width: 768px) 14vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <Crest mono ribbons={false} className="h-1/3 w-auto text-gold/30" />
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold">
                  {s.name}
                  {team.leaderName && s.name === team.leaderName && <span className="eyebrow ml-1.5 text-[12px]! text-gold">leader</span>}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
        <ImigongoBand variant="navy" height={18} />
      </section>

      {/* ── How it began (compact) ─────────────────────────── */}
      <section className="grain relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
          <Reveal className="flex items-center gap-4">
            <span className="lozenge text-brick" />
            <span className="eyebrow text-brick">Uko byatangiye · How it began</span>
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {team.story.map((step, i) => (
              <Reveal as="li" key={step.title + i} delay={i * 90} className="flex flex-col bg-ivory p-7">
                <span className="display text-4xl text-gold">{roman[i] ?? i + 1}</span>
                <h2 className="display mt-5 text-2xl text-ink md:text-3xl">{step.title}</h2>
                <p className="mt-3 text-charcoal/70">{step.text}</p>
                {i === 2 && (
                  <div className="mt-auto pt-6">
                    <p className="eyebrow text-muted">Their original sketches</p>
                    <div className="mt-3 flex gap-2">
                      {wireframes.map((w) => (
                        <Link
                          key={w.label}
                          href={w.href}
                          title={`${w.label}: see it live`}
                          className="relative aspect-[3/4] flex-1 overflow-hidden rounded-md border border-ink/10 bg-paper transition hover:-translate-y-1 hover:shadow-lg"
                        >
                          <Image src={w.src} alt={`Student wireframe: ${w.label}`} fill sizes="80px" className="object-cover object-top" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── A word from the team leader ────────────────────── */}
      <section className="relative overflow-hidden bg-paper">
        <ImigongoField className="absolute inset-0 text-brick" opacity={0.05} />
        <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-16">
          {/* left: portrait + pull-quote */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal className="flex items-center gap-4">
                <span className="lozenge text-brick" />
                <span className="eyebrow text-brick">Ijambo ry&apos;umuyobozi w&apos;itsinda</span>
              </Reveal>
              <MaskLines className="display mt-5 text-[clamp(2.4rem,4.6vw,4.2rem)] text-ink" lines={["A word from", <em key="l" className="text-brick">the team leader</em>]} />

              <Reveal delay={150} className="mt-10 flex items-end gap-5">
                <div className="arch relative aspect-[4/5] w-32 shrink-0 overflow-hidden border-4 border-ivory bg-navy shadow-xl sm:w-40">
                  {team.leaderPhoto ? (
                    <Image src={team.leaderPhoto} alt={signedBy} fill sizes="160px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <Crest className="h-2/3 w-auto" />
                    </div>
                  )}
                </div>
                <div className="pb-2">
                  <p className="font-semibold text-ink">{signedBy}</p>
                  <p className="text-sm text-muted">{roleLine}</p>
                </div>
              </Reveal>

              {team.pullQuote && (
                <Reveal delay={250} className="mt-12 hidden border-l-2 border-gold pl-6 lg:block">
                  <p className="display text-[1.9rem] leading-[1.15] text-gold-deep italic">&ldquo;{team.pullQuote}&rdquo;</p>
                </Reveal>
              )}
            </div>
          </div>

          {/* right: the letter */}
          <Reveal delay={100} className="lg:col-span-8">
            <article className="relative rounded-[6px] bg-ivory px-6 py-10 shadow-[0_30px_80px_-40px_rgba(7,20,43,0.45)] sm:px-12 sm:py-14 md:px-16">
              {/* register-paper ruling */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[6px] opacity-60"
                style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 35px, rgba(156,74,42,0.09) 35px, rgba(156,74,42,0.09) 36px)" }}
              />
              <div aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-imigongo/20 sm:left-8" />
              <div className="relative space-y-6 font-display text-[1.12rem] leading-[1.85] text-charcoal/85 [font-variation-settings:'opsz'_14] sm:text-[1.2rem]">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-display first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-brick"
                        : ""
                    }
                  >
                    {withSchoolName(p)}
                  </p>
                ))}
              </div>

              {team.pullQuote && (
                <p className="display relative my-10 border-l-2 border-gold pl-5 text-2xl leading-snug text-gold-deep italic lg:hidden">
                  &ldquo;{team.pullQuote}&rdquo;
                </p>
              )}

              <footer className="relative mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-8">
                <div>
                  {team.signOff && <p className="text-[2.6rem] leading-none text-navy [font-family:var(--font-hand)]">{team.signOff}</p>}
                  <p className="mt-3 font-semibold text-ink">{signedBy}</p>
                  <p className="text-sm text-muted">{roleLine} · on behalf of the team</p>
                </div>
                <Crest className="h-16 w-auto opacity-80" />
              </footer>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── The mentor ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="md:col-span-4">
            <div className="duotone arch relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden border border-gold/30">
              {team.mentorPhoto && <Image src={team.mentorPhoto} alt={team.mentorName} fill sizes="320px" className="object-cover" />}
            </div>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal className="flex items-center gap-4">
              <span className="lozenge text-gold" />
              <span className="eyebrow text-gold">Umujyanama · The mentor</span>
            </Reveal>
            <MaskLines className="display mt-5 text-[clamp(2.6rem,5.4vw,5rem)]" lines={["Not only a teacher.", <em key="m" className="text-gold">A mentor.</em>]} />
            <Reveal delay={150}>
              <p className="mt-8 text-2xl font-semibold">{team.mentorName}</p>
              <p className="eyebrow mt-1 text-gold">{team.mentorTitle}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/70">{team.mentorText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The next version ───────────────────────────────── */}
      <section className="bg-gold text-ink">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-center md:px-10">
          <div>
            <p className="display text-[clamp(2.2rem,5vw,4.4rem)]">
              The next version <em>is yours.</em>
            </p>
            <p className="mt-3 max-w-xl text-ink/70">Interested in learning to build for the web? Ask {team.mentorName} about joining the student developers.</p>
          </div>
          <Link href="/contact" className="shrink-0 rounded-full bg-ink px-7 py-4 font-semibold text-ivory transition hover:bg-brick">
            Get in touch →
          </Link>
        </div>
      </section>
    </div>
  );
}
