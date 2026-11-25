import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MaskLines, Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { school } from "@/content/school";
import { SchoolName } from "@/components/SchoolName";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit, call or write to Petit Séminaire Saint Léon Kabgayi, Muhanga, Rwanda.",
};

export default function ContactPage() {
  const { lat, lng } = school.map;
  return (
    <div className="page-enter">
      <PageHero
        index="Nº 06"
        eyebrow="Contact"
        rw="Twandikire"
        title={["Come and", <em key="s" className="text-gold">see.</em>]}
        intro={school.mottoLongEn}
        image="/img/campus/main-building-2.jpg"
        imageAlt="The main building framed by palm trees"
      />

      <section id="visit" className="grain relative scroll-mt-24 bg-ivory">
        <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-28 md:grid-cols-12 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <MaskLines className="display text-[clamp(2.4rem,5vw,4.4rem)] text-ink" lines={["Find us on", <em key="h" className="text-brick">the hill of Kabgayi</em>]} />
            <div className="mt-12 space-y-10">
              <Reveal delay={100}>
                <p className="eyebrow text-brick">Address</p>
                <p className="mt-3 text-lg text-ink">
                  <SchoolName />
                  {school.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="eyebrow text-brick">Call & write</p>
                <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="link-gold mt-3 block text-2xl text-ink">{school.phone}</a>
                <a href={`mailto:${school.email}`} className="link-gold mt-1 block text-lg text-ink">{school.email}</a>
              </Reveal>
              <Reveal delay={260}>
                <p className="eyebrow text-brick">Visiting hours</p>
                <dl className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
                  {school.hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between py-3 text-ink">
                      <dt>{d}</dt>
                      <dd className="font-mono text-sm">{h}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
          <Reveal delay={150} className="rounded-[32px] bg-paper p-8 md:col-span-6 md:col-start-7 md:p-12">
            <p className="eyebrow text-brick">Write to us</p>
            <p className="display mt-3 mb-10 text-4xl text-ink">How can we help?</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ink">
        <div className="relative h-[70svh] min-h-[420px] w-full overflow-hidden">
          <iframe
            title="Map to Petit Séminaire Saint Léon Kabgayi"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
            className="absolute inset-0 h-full w-full grayscale-[0.6] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute top-6 left-6 rounded-2xl bg-ink px-5 py-4 text-ivory shadow-xl md:top-10 md:left-10">
            <p className="eyebrow text-gold">{Math.abs(lat).toFixed(4)}° S · {lng.toFixed(4)}° E</p>
            <p className="display mt-1 text-2xl">Kabgayi, Muhanga</p>
          </div>
        </div>
      </section>
    </div>
  );
}
