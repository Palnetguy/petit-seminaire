"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, school } from "@/content/school";
import { Crest } from "./Crest";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu when the route changes (derived during render, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* Floating pill — a refined take on the students' rounded fixed header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-700 ease-[var(--ease-out-expo)] md:pt-4 ${
          hidden && !open ? "-translate-y-[220%]" : ""
        }`}
      >
        <div
          className={`flex w-full max-w-[1320px] items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-700 md:px-4 ${
            scrolled || open
              ? "border-white/10 bg-ink/80 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-white/0 bg-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3 pl-1" aria-label="Home">
            <Crest className="h-10 w-auto transition-transform duration-700 group-hover:-rotate-6" />
            <span className="block leading-[1.1] text-ivory" translate="no" lang="fr">
              <span className="eyebrow block text-[11px]! text-gold sm:text-[12px]!">Petit Séminaire</span>
              <span className="block font-display text-[14px] tracking-tight sm:text-[15px]">Saint Léon Kabgayi</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.slice(1).map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`group relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                    active ? "text-ink" : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-gold transition-all duration-500 ${
                      active ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                  />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact#visit"
              className="hidden rounded-full bg-ivory px-5 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-gold md:inline-block"
            >
              Admissions
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-gold text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`absolute h-[2px] w-5 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-[2px] w-5 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink text-ivory transition-[clip-path] duration-[900ms] ease-[var(--ease-in-out-quart)] lg:hidden ${
          open ? "[clip-path:circle(150%_at_calc(100%-40px)_40px)]" : "pointer-events-none [clip-path:circle(0%_at_calc(100%-40px)_40px)]"
        }`}
      >
        <nav className="mt-28 flex flex-1 flex-col gap-1 px-6" aria-label="Mobile">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="group flex items-baseline justify-between border-b border-white/10 py-4"
              style={{ transitionDelay: `${open ? 200 + i * 50 : 0}ms` }}
            >
              <span className={`display text-[2.6rem] transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${pathname === n.href ? "text-gold" : ""}`}>
                {n.label}
              </span>
              <span className="eyebrow text-ivory/40">{n.rw}</span>
            </Link>
          ))}
        </nav>
        <div className="px-6 pb-10 text-sm text-ivory/60">
          <p className="font-display text-lg italic text-gold">{school.motto}</p>
          <p className="mt-1">{school.phone}</p>
        </div>
      </div>
    </>
  );
}
