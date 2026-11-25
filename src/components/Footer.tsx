import Link from "next/link";
import { nav, school } from "@/content/school";
import { Crest } from "./Crest";
import { ImigongoBand } from "./Imigongo";
import { YearsSince } from "./YearsSince";
import { SchoolName, withSchoolName } from "@/components/SchoolName";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <ImigongoBand variant="gold" height={22} />
      <div className="mx-auto max-w-[1320px] px-5 pt-20 pb-10 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-gold">Intego yacu · Our motto</p>
            <p className="display mt-5 text-[clamp(2.6rem,7vw,6.5rem)] text-ivory">
              Turerera
              <br />
              <em className="text-gold">u Rwanda</em> rwejo.
            </p>
            <p className="mt-6 max-w-md text-ivory/60">{school.mottoLongEn}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="eyebrow mb-5 text-ivory/40">Explore</p>
              <ul className="space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-gold text-ivory/80 hover:text-ivory">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/built-by-students" className="link-gold text-gold">
                    Built by students
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-ivory/40">Visit</p>
              <address className="space-y-1 not-italic text-ivory/80">
                <p><SchoolName /></p>
                {school.addressLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </address>
              <a
                href={`https://www.google.com/maps?q=${school.map.lat},${school.map.lng}`}
                target="_blank"
                rel="noreferrer"
                className="link-gold mt-4 inline-block text-gold"
              >
                Directions ↗
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-5 text-ivory/40">Contact</p>
              <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="link-gold block whitespace-nowrap text-ivory/80">
                {school.phone}
              </a>
              <a href={`mailto:${school.email}`} className="link-gold mt-1 block text-ivory/80">
                {school.email}
              </a>
              <Link
                href="/contact#visit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-ivory"
              >
                Admissions <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="relative mt-24 flex items-end gap-6 border-t border-white/10 pt-10">
          <Crest className="h-24 w-auto shrink-0 md:h-32" />
          <p translate="no" lang="fr" className="display select-none text-[clamp(2.2rem,7.4vw,7.6rem)] leading-[0.86] text-ivory/[0.07]">
            Petit Séminaire
            <br />
            Saint Léon Kabgayi
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-ivory/40 md:flex-row">
          <p>
            © {withSchoolName(school.name)}. Forming Rwanda for <YearsSince /> years.
          </p>
          <p>
            Grown from a student project ·{" "}
            <Link href="/built-by-students" className="link-gold text-ivory/70">
              meet the team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
