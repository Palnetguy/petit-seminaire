import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { MaskLines, Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/history/Timeline";
import { curriculum, rectors } from "@/content/history";
import { ImigongoField } from "@/components/Imigongo";
import { withSchoolName } from "@/components/SchoolName";

export const metadata: Metadata = {
  title: "History",
  description:
    "From 1912 to today: the history of Petit Séminaire Saint Léon Kabgayi, cradle of the priesthood in Rwanda.",
};

export default function HistoryPage() {
  return (
    <div className="page-enter">
      <PageHero
        index="Nº 02"
        eyebrow="Our history"
        rw="Amateka yacu"
        title={["Cradle of", <em key="p" className="text-gold">the priesthood</em>, "in Rwanda."]}
        intro="A brief history of Petit Séminaire Saint Léon Kabgayi, from a bishop's request in 1904 to more than five thousand names in the register."
        image="/img/campus/chapel-front.jpg"
        imageAlt="The chapel facade"
      />

      {/* Founders */}
      <section className="grain relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <Reveal className="flex items-center gap-4">
            <span className="lozenge text-brick" />
            <span className="eyebrow text-brick">The founders</span>
          </Reveal>
          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            {[
              {
                img: "/img/history/hirth.jpg",
                name: "Mgr Jean-Joseph Hirth",
                dates: "1854 – 1931",
                role: "Founder · Missionaries of Africa",
                text: "Vicar Apostolic of Kivu and a son of Cardinal Lavigerie's White Fathers. Hirth was convinced that the Church in Rwanda needed a well-formed native clergy, and founded the seminary to make it happen.",
              },
              {
                img: "/img/history/bigirumwami.jpg",
                name: "Mgr Aloys Bigirumwami",
                dates: "1904 – 1986",
                role: "Seminarian Nº 81 · First Rwandan bishop",
                text: "Entered Petit Séminaire Saint Léon Kabgayi in 1914, ordained in 1921 as the tenth Rwandan priest, and consecrated in 1952 as the first Rwandan bishop: the fruit the founders hoped for.",
              },
            ].map((f, i) => (
              <Reveal key={f.name} delay={i * 150} className="grid grid-cols-[120px_1fr] gap-6 md:grid-cols-[180px_1fr] md:gap-8">
                <div className="archival arch-sm relative aspect-[3/4] overflow-hidden border border-ink/10">
                  <Image src={f.img} alt={f.name} fill sizes="180px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-brick">{f.role}</p>
                  <h3 className="display mt-3 text-3xl text-ink md:text-4xl">{f.name}</h3>
                  <p className="font-mono text-sm text-muted">{f.dates}</p>
                  <p className="mt-4 leading-relaxed text-charcoal/75">{withSchoolName(f.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chronology */}
      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="mb-16 text-center">
            <p className="eyebrow text-brick">1904 — 2013</p>
            <MaskLines className="display mt-4 text-[clamp(2.6rem,6vw,5.6rem)] text-ink" lines={["A century, year by year"]} />
          </div>
          <Timeline />
        </div>
      </section>

      {/* Rectors */}
      <section className="relative overflow-hidden bg-ink text-ivory">
        <ImigongoField className="absolute inset-0" stroke="var(--gold)" opacity={0.05} />
        <div className="relative mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <Reveal className="flex items-center gap-4">
            <span className="lozenge text-gold" />
            <span className="eyebrow text-gold">Abayobozi · The rectors</span>
          </Reveal>
          <MaskLines className="display mt-6 text-[clamp(2.4rem,5.4vw,5rem)]" lines={["Those who", <em key="l" className="text-gold">led the house</em>]} />

          <div className="mt-16 grid gap-16 md:grid-cols-2">
            {[
              { title: "The White Fathers", sub: "Missionaries of Africa · 1912 – 1959", list: rectors.whiteFathers },
              { title: "Diocesan priests", sub: "Since 1959", list: rectors.diocesan },
            ].map((col, ci) => (
              <Reveal key={col.title} delay={ci * 150}>
                <h3 className="display text-3xl">{col.title}</h3>
                <p className="eyebrow mt-2 text-ivory/40">{col.sub}</p>
                <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {col.list.map((r, i) => (
                    <li key={`${r[0]}-${i}`} className="group flex items-baseline gap-4 py-3.5 transition-colors hover:text-gold">
                      <span className="w-7 font-mono text-xs text-ivory/30">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1">
                        {r[0]}
                        {r[2] && <span className="ml-2 text-sm italic text-ivory/40">{r[2]}</span>}
                      </span>
                      <span className={`font-mono text-sm ${r[1] === "Present" ? "text-gold" : "text-ivory/50"}`}>{r[1]}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-ivory/40">From the seminary register. Rectorates after 2013 to be completed by the administration.</p>
        </div>
      </section>

      {/* Curriculum through time */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <MaskLines className="display text-[clamp(2.4rem,5.4vw,5rem)] text-ink" lines={["From Latin & Greek", <em key="s" className="text-brick">to sciences</em>]} />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 md:grid-cols-4">
            {curriculum.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} className="bg-ivory p-8">
                <p className="font-mono text-sm text-brick">{c.era}</p>
                <h3 className="display mt-6 text-3xl text-ink">{c.title}</h3>
                <p className="mt-4 text-charcoal/70">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Centenary reflection */}
      <section className="relative overflow-hidden bg-brick text-ivory">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-28 md:grid-cols-12 md:px-10 md:py-36">
          <div className="md:col-span-7">
            <p className="eyebrow text-ivory/60">The centenary · 2013</p>
            <p className="display mt-6 text-[clamp(2rem,4.2vw,3.8rem)]">
              &ldquo;How not to marvel at the prophetic vision of the pioneers? It is our responsibility to carry their
              idea forward.&rdquo;
            </p>
          </div>
          <Reveal delay={150} className="space-y-5 text-ivory/80 md:col-span-4 md:col-start-9">
            <p>
              The jubilee of 100 years was an occasion for the whole Catholic Church in Rwanda to rejoice, and to think
              about its future.
            </p>
            <p>
              All who have benefited from the generosity, tenacity and sacrifice of the founders are called to ensure
              the Church receives priests and lay people animated by a deep love of God, for the integral
              development of Rwanda today.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
