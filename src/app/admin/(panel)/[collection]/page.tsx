import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireSession } from "@/lib/cms/auth";
import { getCollection } from "@/lib/cms/schema";
import { getStorage } from "@/lib/cms/storage";
import { EntryForm } from "@/components/admin/EntryForm";
import { ItemList, type Row } from "@/components/admin/ItemList";
import { PageTitle } from "@/components/admin/PageTitle";

async function CollectionView({ params }: { params: Promise<{ collection: string }> }) {
  await requireSession();
  const { collection: key } = await params;
  const collection = getCollection(key);
  if (!collection) notFound();
  const storage = await getStorage();
  const viewLink = (
    <a href={collection.publicPath} target="_blank" className="rounded-xl border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-white">
      View on website ↗
    </a>
  );

  if (collection.kind === "single") {
    const data = await storage.read<Record<string, unknown>>(key);
    return (
      <>
        <PageTitle rw={collection.rw} title={collection.label} description={collection.description} action={viewLink} />
        <EntryForm collectionKey={key} id="single" initial={data} canWrite={storage.canWrite} />
      </>
    );
  }

  const items = await storage.read<Record<string, unknown>[]>(key);
  const today = new Date().toISOString().slice(0, 10);
  const rows: Row[] = items.map((i) => ({
    id: String(i.id),
    title: String(i[collection.titleField] ?? ""),
    subtitle: collection.subtitle?.(i) ?? "",
    image: collection.imageField ? String(i[collection.imageField] ?? "") : undefined,
    published: "published" in i ? Boolean(i.published) : undefined,
    past: key === "events" && typeof i.date === "string" && i.date < today,
  }));
  return (
    <>
      <PageTitle rw={collection.rw} title={collection.label} description={collection.description} action={viewLink} />
      <ItemList collectionKey={key} rows={rows} canWrite={storage.canWrite} />
    </>
  );
}

export default function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  return (
    <Suspense fallback={<p className="text-muted">Loading…</p>}>
      <CollectionView params={params} />
    </Suspense>
  );
}
