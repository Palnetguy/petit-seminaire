import { Suspense } from "react";
import { requireSession } from "@/lib/cms/auth";
import { collections } from "@/lib/cms/schema";
import { getStorage } from "@/lib/cms/storage";
import { Sidebar } from "@/components/admin/Sidebar";

async function Shell({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const storage = await getStorage();
  const items = collections.map((c) => ({ key: c.key, label: c.label, rw: c.rw, icon: c.icon }));
  return (
    <>
      <Sidebar items={items} editor={session.name} mode={storage.mode} />
      <div className="lg:pl-72">
        {!storage.canWrite && (
          <div className="border-b border-gold/40 bg-gold/15 px-4 py-3 text-sm text-ink sm:px-8">
            <strong>Read-only.</strong> {storage.description}
          </div>
        )}
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </>
  );
}

/** Dashboard shell. Reads the session cookie, so it renders per request behind Suspense. */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="grid min-h-[100svh] place-items-center text-muted">Loading dashboard…</div>}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}
