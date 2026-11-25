import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Faith, study, sport and celebration: photographs of life at Saint Léon Kabgayi.",
};

export default function GalleryPage() {
  return (
    <div className="page-enter">
      <PageHero
        index="Nº 05"
        eyebrow="Gallery"
        rw="Amafoto"
        title={["Moments", <em key="o" className="text-gold">of our</em>, "life."]}
        intro="Liturgy and lessons, brass band and basketball: everyday life on the hill of Kabgayi."
        image="/img/life/brass-march.jpg"
        imageAlt="The brass band marching"
      />
      <section className="grain relative bg-ivory">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <GalleryGrid />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
