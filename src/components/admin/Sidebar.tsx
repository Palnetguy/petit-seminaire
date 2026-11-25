"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Crest } from "@/components/Crest";
import { logoutAction } from "@/app/admin/actions";

type Item = { key: string; label: string; rw: string; icon: string };

export function Sidebar({ items, editor, mode }: { items: Item[]; editor: string; mode: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lists = items.slice(0, 5);
  const pages = items.slice(5);

  const link = (href: string, label: string, icon: string, rw?: string) => {
    const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition ${active ? "bg-gold text-ink" : "text-ivory/75 hover:bg-white/10 hover:text-ivory"}`}
      >
        <span className="w-6 text-center" aria-hidden>{icon}</span>
        <span className="flex-1 font-medium">{label}</span>
        {rw && <span className={`eyebrow text-[11px]! ${active ? "text-ink/60" : "text-ivory/35"}`}>{rw}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-ink px-4 py-3 text-ivory lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Crest className="h-8 w-auto" />
          <span className="font-display">Dashboard</span>
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold" aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink text-ivory transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link href="/admin" className="flex items-center gap-3 px-5 pt-6 pb-5">
          <Crest className="h-11 w-auto" />
          <span className="leading-tight">
            <span className="eyebrow block text-[11px]! text-gold" translate="no" lang="fr">Petit Séminaire</span>
            <span className="block font-display text-[15px]" translate="no" lang="fr">Saint Léon Kabgayi</span>
          </span>
        </Link>
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
          <div className="space-y-1">{link("/admin", "Overview", "◆")}</div>
          <div className="space-y-1">
            <p className="eyebrow px-3 pb-1 text-ivory/40">Updates</p>
            {lists.map((i) => link(`/admin/${i.key}`, i.label, i.icon, i.rw))}
          </div>
          <div className="space-y-1">
            <p className="eyebrow px-3 pb-1 text-ivory/40">Pages</p>
            {pages.map((i) => link(`/admin/${i.key}`, i.label, i.icon))}
          </div>
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-semibold text-ink">{editor.slice(0, 1).toUpperCase()}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{editor}</p>
              <p className="text-xs text-ivory/45">{mode === "local" ? "Editing local files" : "Read-only"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="/" target="_blank" className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center text-sm font-semibold hover:bg-white/20">
              View site ↗
            </a>
            <form action={logoutAction}>
              <button className="rounded-lg px-3 py-2 text-sm font-semibold text-ivory/70 hover:bg-white/10 hover:text-ivory">Sign out</button>
            </form>
          </div>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}
