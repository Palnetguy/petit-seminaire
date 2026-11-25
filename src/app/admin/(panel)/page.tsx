import Link from "next/link";
import { Suspense } from "react";
import { requireSession } from "@/lib/cms/auth";
import { collections, type EventItem, type Meta } from "@/lib/cms/schema";
import { getStorage } from "@/lib/cms/storage";
import { PageTitle } from "@/components/admin/PageTitle";

function ago(iso?: string) {
  if (!iso) return "never";
  const s = (Date.now() - Date.parse(iso)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  if (s < 86400 * 30) return `${Math.round(s / 86400)} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

async function Overview() {
  const session = await requireSession();
  const storage = await getStorage();
  const meta = await storage.read<Meta>("_meta").catch(() => ({}) as Meta);
  const counts: Record<string, number> = {};
  for (const c of collections) if (c.kind === "list") counts[c.key] = (await storage.read<unknown[]>(c.key)).length;

  const today = new Date().toISOString().slice(0, 10);
  const events = await storage.read<EventItem[]>("events");
  const upcoming = events.filter((e) => e.published && e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const recent = Object.entries(meta)
    .filter(([k]) => collections.some((c) => c.key === k))
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
    .slice(0, 5);

  return (
    <>
      <PageTitle rw="Murakaza neza" title={`Hello, ${session.name.split(" ")[0]}`} description="What would you like to update on the website today?" />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { href: "/admin/news/new", label: "Write a news item", icon: "📰" },
          { href: "/admin/events/new", label: "Add an event", icon: "📅" },
          { href: "/admin/gallery", label: "Upload photos", icon: "🖼️" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="group flex items-center gap-3 rounded-2xl bg-navy p-5 text-ivory transition hover:bg-ink">
            <span className="text-2xl" aria-hidden>{a.icon}</span>
            <span className="font-semibold">{a.label}</span>
            <span className="ml-auto text-gold transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 mb-4 font-display text-2xl text-ink">Website content</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {collections.map((c) => (
          <Link key={c.key} href={`/admin/${c.key}`} className="group rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-navy/40 hover:shadow-md">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden>{c.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold text-ink group-hover:text-lapis">{c.label}</p>
                  {c.key in counts && <span className="font-display text-xl text-ink">{counts[c.key]}</span>}
                </div>
                <p className="mt-1 text-sm text-muted">{c.description}</p>
                <p className="mt-3 text-xs text-muted">
                  Updated {ago(meta[c.key]?.updatedAt)}
                  {meta[c.key]?.updatedBy && ` by ${meta[c.key].updatedBy}`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-xl text-ink">Coming up</h2>
          {upcoming.length ? (
            <ul className="mt-4 space-y-3">
              {upcoming.slice(0, 4).map((e) => (
                <li key={e.id}>
                  <Link href={`/admin/events/${e.id}`} className="flex gap-3 hover:text-lapis">
                    <span className="w-16 shrink-0 font-display text-ink">
                      {new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </span>
                    <span className="text-sm">{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No upcoming events. <Link href="/admin/events/new" className="font-semibold text-lapis">Add one</Link>.
            </p>
          )}
        </section>
        <section className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-xl text-ink">Recent changes</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {recent.map(([k, m]) => (
              <li key={k} className="flex justify-between gap-3">
                <span className="text-ink">{collections.find((c) => c.key === k)?.label}</span>
                <span className="text-right text-muted">
                  {m.updatedBy} · {ago(m.updatedAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl bg-paper p-6 text-sm leading-relaxed text-charcoal/80">
        <h2 className="font-display text-xl text-ink">How saving works</h2>
        <p className="mt-2">{storage.description}</p>
        <p className="mt-2">
          All content lives in the <code className="rounded bg-white px-1.5">content/</code> folder as JSON files, one per section, so it can also be
          edited by hand.
        </p>
      </section>
    </>
  );
}

export default function AdminHome() {
  return (
    <Suspense fallback={<p className="text-muted">Loading…</p>}>
      <Overview />
    </Suspense>
  );
}
