"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, useTransition } from "react";
import { getCollection, type ListCollection } from "@/lib/cms/schema";
import { deleteItem, reorderItems, saveItem, setPublished } from "@/app/admin/actions";
import { resizeImage } from "./image";
import { Toast, useToast } from "./Toast";

export type Row = { id: string; title: string; subtitle: string; image?: string; published?: boolean; past?: boolean };

export function ItemList({ collectionKey, rows, canWrite }: { collectionKey: string; rows: Row[]; canWrite: boolean }) {
  // this component is only rendered for list collections
  const collection = getCollection(collectionKey) as ListCollection;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(rows);
  const [orderDirty, setOrderDirty] = useState(false);
  const [pending, start] = useTransition();
  const [progress, setProgress] = useState<string | null>(null);
  const dragFrom = useRef<number | null>(null);
  const bulkInput = useRef<HTMLInputElement>(null);
  const { toast, show } = useToast();

  // keep in sync when the server sends fresh rows
  const [lastRows, setLastRows] = useState(rows);
  if (rows !== lastRows) {
    setLastRows(rows);
    setOrder(rows);
    setOrderDirty(false);
  }

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => (q ? order.filter((r) => `${r.title} ${r.subtitle}`.toLowerCase().includes(q)) : order), [order, q]);
  const canReorder = canWrite && collection.sortable && !q;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;
    const n = [...order];
    const [x] = n.splice(from, 1);
    n.splice(to, 0, x);
    setOrder(n);
    setOrderDirty(true);
  };

  const saveOrder = () =>
    start(async () => {
      const r = await reorderItems(collectionKey, order.map((x) => x.id));
      show(r);
      if (r.ok) {
        setOrderDirty(false);
        router.refresh();
      }
    });

  const remove = (row: Row) => {
    if (!confirm(`Delete “${row.title}”? This cannot be undone.`)) return;
    start(async () => {
      const r = await deleteItem(collectionKey, row.id);
      show(r);
      if (r.ok) router.refresh();
    });
  };

  const togglePublish = (row: Row) =>
    start(async () => {
      const r = await setPublished(collectionKey, row.id, !row.published);
      show(r);
      if (r.ok) router.refresh();
    });

  /** Gallery: add many photos at once, one request per photo (keeps each upload small). */
  async function bulkUpload(files: FileList | null) {
    if (!files?.length || !collection.bulkImageField) return;
    const list = Array.from(files).slice(0, 30);
    let ok = 0;
    for (let i = 0; i < list.length; i++) {
      setProgress(`Uploading ${i + 1} of ${list.length}…`);
      try {
        const img = await resizeImage(list[i]);
        const caption = list[i].name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
        const r = await saveItem(collectionKey, null, { [collection.bulkImageField]: img, alt: caption, category: "Student life" });
        if (r.ok) ok++;
        else show(r);
      } catch (e) {
        show({ ok: false, message: (e as Error).message });
      }
    }
    setProgress(null);
    if (ok) show({ ok: true, message: `${ok} photo${ok === 1 ? "" : "s"} added. Edit captions and categories below.` });
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${collection.label.toLowerCase()}…`}
          className="w-full flex-1 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-lapis focus:ring-4 focus:ring-lapis/10"
        />
        {canWrite && (
          <div className="flex shrink-0 gap-2">
            {collection.bulkImageField && (
              <>
                <button
                  type="button"
                  onClick={() => bulkInput.current?.click()}
                  disabled={!!progress}
                  className="rounded-xl border border-navy px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-ivory disabled:opacity-50"
                >
                  {progress ?? "Upload photos"}
                </button>
                <input ref={bulkInput} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => bulkUpload(e.target.files)} />
              </>
            )}
            <Link href={`/admin/${collectionKey}/new`} className="rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-ivory hover:bg-ink">
              + New {collection.singular}
            </Link>
          </div>
        )}
      </div>

      {orderDirty && (
        <div className="page-enter mt-4 flex items-center justify-between gap-3 rounded-xl bg-gold/20 px-4 py-3 text-sm">
          <span className="font-semibold text-ink">The order changed.</span>
          <div className="flex gap-2">
            <button onClick={() => { setOrder(rows); setOrderDirty(false); }} className="rounded-lg px-3 py-1.5 font-semibold hover:bg-white/60">Undo</button>
            <button onClick={saveOrder} disabled={pending} className="rounded-lg bg-navy px-3 py-1.5 font-semibold text-ivory">Save order</button>
          </div>
        </div>
      )}

      <ul className="mt-5 divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-white">
        {visible.length === 0 && <li className="p-10 text-center text-muted">{q ? "Nothing matches your search." : `No ${collection.label.toLowerCase()} yet.`}</li>}
        {visible.map((row) => {
          const index = order.indexOf(row);
          return (
            <li
              key={row.id}
              draggable={canReorder}
              onDragStart={() => (dragFrom.current = index)}
              onDragOver={(e) => canReorder && e.preventDefault()}
              onDrop={() => {
                if (dragFrom.current !== null) move(dragFrom.current, index);
                dragFrom.current = null;
              }}
              className={`group flex items-center gap-3 px-3 py-3 transition hover:bg-ivory/70 sm:gap-4 sm:px-4 ${row.published === false || row.past ? "opacity-60" : ""}`}
            >
              {canReorder && <span className="hidden cursor-grab text-lg text-ink/25 select-none sm:block" aria-hidden>⋮⋮</span>}
              {collection.imageField && (
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small admin thumbnails */}
                  {row.image && <img src={row.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                </div>
              )}
              <Link href={`/admin/${collectionKey}/${row.id}`} className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink group-hover:text-lapis">{row.title || "(untitled)"}</p>
                <p className="truncate text-sm text-muted">
                  {row.subtitle}
                  {row.past && " · past"}
                </p>
              </Link>
              {row.published !== undefined && (
                <button
                  onClick={() => canWrite && togglePublish(row)}
                  disabled={!canWrite || pending}
                  className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold sm:block ${row.published ? "bg-green/15 text-green" : "bg-ink/10 text-muted"}`}
                  title={canWrite ? "Click to toggle" : undefined}
                >
                  {row.published ? "Published" : "Hidden"}
                </button>
              )}
              {canReorder && (
                <div className="flex shrink-0 flex-col text-xs text-muted">
                  <button onClick={() => move(index, index - 1)} className="rounded px-1.5 hover:bg-paper" aria-label="Move up">▲</button>
                  <button onClick={() => move(index, index + 1)} className="rounded px-1.5 hover:bg-paper" aria-label="Move down">▼</button>
                </div>
              )}
              {canWrite && (
                <button onClick={() => remove(row)} disabled={pending} className="shrink-0 rounded-lg p-2 text-muted opacity-60 hover:bg-imigongo/10 hover:text-imigongo group-hover:opacity-100" aria-label={`Delete ${row.title}`}>
                  ✕
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm text-muted">
        {order.length} {order.length === 1 ? collection.singular : collection.label.toLowerCase()}
        {canReorder && " · drag rows or use the arrows to change the order on the website"}
      </p>
      <Toast toast={toast} />
    </div>
  );
}
