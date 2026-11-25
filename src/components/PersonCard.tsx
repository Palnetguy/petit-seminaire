import Image from "next/image";
import type { Person } from "@/content/school";
import { Reveal } from "./Reveal";
import { Crest } from "./Crest";

export function PersonCard({ person, delay = 0, size = "lg" }: { person: Person; delay?: number; size?: "lg" | "sm" }) {
  return (
    <Reveal delay={delay} className="group">
      <div className={`duotone relative aspect-[4/5] overflow-hidden ${size === "lg" ? "arch-sm" : "rounded-[22px]"}`}>
        {person.image ? (
          <Image src={person.image} alt={person.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-navy">
            <Crest mono ribbons={false} className="h-1/3 w-auto text-gold/30" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="eyebrow text-brick">{person.role}</p>
        <h3 className={`mt-1 font-semibold leading-tight text-ink ${size === "lg" ? "text-lg md:text-xl" : "text-base"}`}>
          {person.title && <span className="font-display font-normal italic text-muted">{person.title} </span>}
          {person.name}
        </h3>
      </div>
    </Reveal>
  );
}
