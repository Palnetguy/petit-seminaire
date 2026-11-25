import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MaskLines, Reveal } from "@/components/Reveal";
import { PurposeTabs } from "@/components/about/PurposeTabs";
import { PersonCard } from "@/components/PersonCard";
import { leadership, values, whyUs } from "@/content/school";

export const metadata: Metadata = {
  title: "About",
  description: "Mission, vision, values and leadership of Petit Séminaire Saint Léon Kabgayi.",
};

export default function AboutPage() {
  return (
    <div className="page-enter">
      <PageHero
        index="Nº 01"
        eyebrow="About us"
        rw="Abo turi bo"
        title={["Rooted in faith,", <em key="e" className="text-gold">committed to</em>, "excellence."]}
        intro="A Catholic minor seminary of the Diocese of Kabgayi, forming young Rwandans in faith, knowledge and character since 1912."
        image="/img/faith/chapel-full.jpg"
        imageAlt="Students gathered in the chapel"
      />

      {/* Our story */}
      <section className="grain relative bg-ivory">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-28 md:grid-cols-12 md:px-10 md:py-36">
          <div className="md:col-span-6">
            <Reveal className="flex items-center gap-4">
              <span className="lozenge text-brick" />
              <span className="eyebrow text-brick">Our story</span>
            </Reveal>
            <MaskLines
              className="display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] text-ink"
              lines={["A holistic education,", <em key="g" className="text-brick">grounded in the Gospel.</em>]}
            />
            <Reveal delay={150} className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/75">
              <p>
                Petit Séminaire Saint Léon Kabgayi was founded to give young people an education grounded in
                Christian values, academic excellence and discipline.
              </p>
              <p>
                Inspired by the legacy of its founders, it nurtures young minds to become responsible,
                compassionate and faithful leaders, in the Church and in society.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <Link href="/history" className="link-gold mt-8 inline-block font-semibold text-brick">
                Our history since 1912 →
              </Link>
            </Reveal>
          </div>
          <div className="relative md:col-span-6">
            <Reveal className="arch relative ml-auto aspect-[4/5] w-[78%] overflow-hidden">
              <Image src="/img/academics/classroom.jpg" alt="Students in class" fill sizes="40vw" className="object-cover" />
            </Reveal>
            <Reveal delay={200} className="absolute bottom-[-6%] left-0 aspect-square w-[44%] overflow-hidden rounded-[28px] border-8 border-ivory">
              <Image src="/img/life/brass-band.jpg" alt="The brass band" fill sizes="25vw" className="object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / vision / values / community */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <Reveal className="flex items-center gap-4">
            <span className="lozenge text-gold" />
            <span className="eyebrow text-gold">What guides us</span>
          </Reveal>
          <PurposeTabs />
        </div>
      </section>

      {/* Values ribbon */}
      <section className="overflow-hidden border-y border-ink/10 bg-gold py-8 text-ink">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap [--speed:35s]">
          {[...values, ...values, ...values].map((v, i) => (
            <span key={i} className="display flex items-center gap-10 text-5xl md:text-7xl">
              {v}
              <span className="text-3xl text-ink/40">✚</span>
            </span>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <MaskLines className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["Why families", <em key="c" className="text-brick">choose Saint Léon</em>]} />
          <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="group grid items-baseline gap-4 py-8 md:grid-cols-12">
                <span className="font-mono text-sm text-brick md:col-span-1">0{i + 1}</span>
                <h3 className="display text-3xl text-ink transition-transform duration-700 group-hover:translate-x-3 md:col-span-6 md:text-5xl">{w.title}</h3>
                <p className="text-charcoal/65 md:col-span-5">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="grain relative bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <MaskLines className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["Leadership"]} />
            <Link href="/staff" className="link-gold font-semibold text-brick">All staff →</Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
            {leadership.map((p, i) => (
              <PersonCard key={p.name} person={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1100px] px-5 py-28 text-center md:py-40">
          <Reveal>
            <span className="display text-8xl leading-none text-gold">“</span>
            <p className="display -mt-6 text-[clamp(2.2rem,5vw,4.4rem)] text-ink">
              We educate minds, shape hearts, and build a <em className="text-brick">brighter future.</em>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
