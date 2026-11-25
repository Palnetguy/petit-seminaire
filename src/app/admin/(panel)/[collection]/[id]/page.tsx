import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireSession } from "@/lib/cms/auth";
import { getCollection } from "@/lib/cms/schema";
import { getStorage } from "@/lib/cms/storage";
import { EntryForm } from "@/components/admin/EntryForm";
import { PageTitle } from "@/components/admin/PageTitle";

async function ItemView({ params }: { params: Promise<{ collection: string; id: string }> }) {
  await requireSession();
  const { collection: key, id } = await params;
  const collection = getCollection(key);
  if (!collection || collection.kind !== "list") notFound();
  const storage = await getStorage();
  const isNew = id === "new";

  let initial: Record<string, unknown>;
  if (isNew) {
    // sensible defaults for a new entry
    initial = {};
    for (const f of collection.fields) {
      if (f.type === "boolean" && f.name === "published") initial[f.name] = true;
      if (f.type === "date") initial[f.name] = new Date().toISOString().slice(0, 10);
    }
  } else {
    const item = (await storage.read<Record<string, unknown>[]>(key)).find((x) => x.id === id);
    if (!item) notFound();
    initial = item;
  }
  const title = isNew ? `New ${collection.singular}` : String(initial[collection.titleField] ?? collection.singular);

  return (
    <>
      <PageTitle rw={collection.rw} title={title} back={{ href: `/admin/${key}`, label: collection.label }} />
      <EntryForm key={id} collectionKey={key} id={isNew ? null : id} initial={initial} canWrite={storage.canWrite} />
    </>
  );
}

export default function ItemPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
  return (
    <Suspense fallback={<p className="text-muted">Loading…</p>}>
      <ItemView params={params} />
    </Suspense>
  );
}
