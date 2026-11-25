"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { getCollection } from "@/lib/cms/schema";
import { deleteItem, saveItem, saveSingle } from "@/app/admin/actions";
import { FieldsEditor } from "./Fields";
import { Toast, useToast } from "./Toast";

type Obj = Record<string, unknown>;

/** Edit form for one list item (news, staff…) or a single document (settings…). */
export function EntryForm({
  collectionKey,
  id,
  initial,
  canWrite,
}: {
  collectionKey: string;
  id: string | null; // null = new item, "single" = single document
  initial: Obj;
  canWrite: boolean;
}) {
  const collection = getCollection(collectionKey)!;
  const router = useRouter();
  const [value, setValue] = useState<Obj>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();
  const { toast, show } = useToast();
  const dirty = useMemo(() => JSON.stringify(value) !== saved, [value, saved]);
  const isSingle = collection.kind === "single";

  // warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  /** Apply an edit and clear the error messages of whatever was just changed. */
  function update(next: Obj) {
    setValue(next);
    if (!Object.keys(errors).length) return;
    const changed = Object.keys(next).filter((k) => JSON.stringify(next[k]) !== JSON.stringify(value[k]));
    setErrors((errs) =>
      Object.fromEntries(Object.entries(errs).filter(([path]) => !changed.some((k) => path === k || path.startsWith(`${k}.`)))),
    );
  }

  function save() {
    start(async () => {
      const res = isSingle ? await saveSingle(collectionKey, value) : await saveItem(collectionKey, id, value);
      setErrors(res.errors ?? {});
      show(res);
      if (!res.ok) return;
      setSaved(JSON.stringify(value));
      if (!isSingle && !id && res.id) router.replace(`/admin/${collectionKey}/${res.id}`);
      else router.refresh();
    });
  }

  function remove() {
    if (!id || isSingle) return;
    if (!confirm(`Delete this ${collection.kind === "list" ? collection.singular : "item"}? This cannot be undone.`)) return;
    start(async () => {
      const res = await deleteItem(collectionKey, id);
      show(res);
      if (res.ok) {
        setSaved(JSON.stringify(value));
        router.push(`/admin/${collectionKey}`);
      }
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="pb-28"
    >
      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm sm:p-8">
        <FieldsEditor fields={collection.fields} value={value} onChange={update} errors={errors} disabled={!canWrite} />
      </div>

      {/* sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/90 backdrop-blur lg:left-72">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <div className="text-sm text-muted">
            {!canWrite ? "Read-only on the live site" : dirty ? <span className="font-semibold text-gold-deep">● Unsaved changes</span> : "All changes saved"}
          </div>
          <div className="flex items-center gap-2">
            {!isSingle && id && canWrite && (
              <button type="button" onClick={remove} disabled={pending} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-imigongo hover:bg-imigongo/10">
                Delete
              </button>
            )}
            <Link href={isSingle ? "/admin" : `/admin/${collectionKey}`} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ink hover:bg-paper">
              {dirty ? "Cancel" : "Back"}
            </Link>
            {canWrite && (
              <button
                type="submit"
                disabled={pending || (!dirty && !!id)}
                className="rounded-xl bg-navy px-6 py-2.5 text-sm font-semibold text-ivory shadow-sm transition hover:bg-ink disabled:opacity-50"
              >
                {pending ? "Saving…" : id === null ? "Create" : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Toast toast={toast} />
    </form>
  );
}
