import Image from "next/image";
import type { ReactNode } from "react";
import { MaskLines, Reveal } from "./Reveal";
import { ImigongoBand } from "./Imigongo";
import { Parallax } from "./Parallax";

/** Inner-page hero: dark, editorial, with an arched photo window. */
export function PageHero({
  index,
  eyebrow,
  rw,
  title,
  intro,
  image,
  imageAlt = "",
}: {
  index: string;
  eyebrow: string;
  rw: string;
  title: ReactNode[];
  intro: string;
  image: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1320px] items-end gap-10 px-5 pt-36 pb-16 md:grid-cols-12 md:px-10 md:pt-44 md:pb-24">
        <div className="md:col-span-7">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow text-gold">{index}</span>
            <span className="lozenge text-gold" />
            <span className="eyebrow text-ivory/60">{eyebrow}</span>
          </Reveal>
          <MaskLines
            as="h1"
            lines={title}
            className="display mt-6 text-[clamp(3.2rem,9vw,8.5rem)]"
          />
          <Reveal delay={300} className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/70">
            <p>
              <span className="font-display italic text-gold">{rw}.</span> {intro}
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={200} className="arch relative ml-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-gold/30 p-2">
            <div className="arch relative h-full w-full overflow-hidden">
              <Parallax amount={60} className="absolute -inset-y-16 inset-x-0">
                <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 768px) 420px, 90vw" className="object-cover" />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
      <ImigongoBand variant="navy" height={18} />
    </section>
  );
}
