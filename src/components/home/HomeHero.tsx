import Image from "next/image";
import Link from "next/link";
import { CrestScene } from "@/components/three";
import { MaskLines, Reveal } from "@/components/Reveal";
import { school } from "@/content/school";
import { Crest } from "@/components/Crest";
import { withSchoolName } from "@/components/SchoolName";

const ticker = [
  "Est. 22 December 1912",
  "Cradle of the priesthood in Rwanda",
  "Kabgayi · Muhanga",
  "Nº 1 → Nº 5,154",
  "Rwanda's first secondary school",
  "Faith · Knowledge · Service",
];

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-ivory">
      {/* Chapel photograph, duotoned into the night */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/campus/chapel-exterior.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_40%] opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(242,183,5,0.16),transparent_45%)]" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1320px] grid-cols-1 items-center px-5 pt-28 pb-28 md:px-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <Reveal className="flex items-center gap-4">
            <span className="lozenge text-gold" />
            <span className="eyebrow text-[1.05rem]! text-ivory/80">{withSchoolName(school.kinyarwandaName)}</span>
            <span className="hidden h-px w-16 bg-gradient-to-r from-gold/60 to-transparent sm:block" />
          </Reveal>

          <MaskLines
            as="h1"
            delay={150}
            stagger={110}
            className="display mt-6 text-[clamp(3.2rem,min(9vw,13svh),8.5rem)]"
            lines={[
              "Turerera",
              <span key="u" className="italic text-gold">u Rwanda</span>,
              "rwejo.",
            ]}
          />

          <Reveal delay={550} className="mt-6 max-w-xl lg:mt-8">
            <p className="text-lg leading-relaxed text-ivory/75 md:text-xl">
              <span className="text-ivory">We raise the Rwanda of tomorrow.</span> Since 1912, the minor
              seminary of Kabgayi has formed priests, bishops, scientists and leaders through faith,
              knowledge and discipline.
            </p>
          </Reveal>

          <Reveal delay={700} className="mt-8 flex flex-wrap items-center gap-4 lg:mt-10">
            <Link
              href="/history"
              className="group inline-flex items-center gap-3 rounded-full bg-gold py-3.5 pr-3.5 pl-7 font-semibold text-ink transition hover:bg-ivory"
            >
              Discover our story
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-gold transition-transform duration-500 group-hover:rotate-[-45deg]">
                →
              </span>
            </Link>
            <Link href="/contact#visit" className="link-gold py-3 text-ivory/80 hover:text-ivory">
              Admissions & visits
            </Link>
          </Reveal>
        </div>

        {/* 3D crest */}
        <div className="pointer-events-auto relative mx-auto mt-10 aspect-square w-full max-w-[min(560px,64svh)] lg:col-span-5 lg:mt-0">
          <div className="absolute inset-[12%] rounded-full bg-gold/10 blur-3xl" />
          <CrestScene className="absolute inset-0" />
          <noscript>
            <Crest className="absolute inset-[20%]" />
          </noscript>
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
            <span className="eyebrow text-ivory/40">Est. 1912</span>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-ink/60 py-4 backdrop-blur">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap [--speed:50s]">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="eyebrow flex items-center gap-12 text-ivory/60">
              {t}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
