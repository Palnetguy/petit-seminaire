import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MaskLines, Reveal } from "@/components/Reveal";
import { PersonCard } from "@/components/PersonCard";
import { leadership, teachers } from "@/content/school";

export const metadata: Metadata = {
  title: "Staff",
  description: "The priests and teachers who form the students of Saint Léon Kabgayi.",
};

export default function StaffPage() {
  return (
    <div className="page-enter">
      <PageHero
        index="Nº 04"
        eyebrow="Our staff"
        rw="Abarezi bacu"
        title={["The people", <em key="w" className="text-gold">who form</em>, "our students."]}
        intro="Dedicated educators and support staff committed to nurturing excellence, faith and character in every student."
        image="/img/faith/bishop-procession.jpg"
        imageAlt="Clergy in procession at the seminary"
      />

      <section className="grain relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <Reveal className="flex items-center gap-4">
                <span className="lozenge text-brick" />
                <span className="eyebrow text-brick">Ubuyobozi · Leadership</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["Our leadership"]} />
            </div>
            <Reveal delay={150} className="text-charcoal/70 md:col-span-4 md:col-start-9">
              <p>The rector and his council guide the spiritual, academic and material life of the seminary.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
            {leadership.map((p, i) => (
              <PersonCard key={p.name} person={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal className="flex items-center gap-4">
                <span className="lozenge text-brick" />
                <span className="eyebrow text-brick">Abarimu · Teaching staff</span>
              </Reveal>
              <MaskLines className="display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] text-ink" lines={["Our teachers"]} />
            </div>
            <p className="eyebrow text-muted">Hover a portrait to see it in colour</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {teachers.map((p, i) => (
              <PersonCard key={p.name} person={p} delay={(i % 4) * 80} size="sm" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
