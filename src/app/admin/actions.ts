"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminPassword, requireSession } from "@/lib/cms/auth";
import { getCollection, type Meta } from "@/lib/cms/schema";
import { getStorage, type FileChange } from "@/lib/cms/storage";
import { SESSION_COOKIE, SESSION_DAYS, safeEqual, sessionSecret, signSession } from "@/lib/cms/session";
import { sanitize, slugify, type Errors } from "@/lib/cms/validate";

export type ActionResult = { ok: boolean; message: string; errors?: Errors; id?: string };

/* ── Login / logout ────────────────────────────────────────────────── */

// Basic brute-force protection (per server instance).
const attempts = new Map<string, { n: number; until: number }>();

export async function loginAction(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const a = attempts.get(ip);
  if (a && a.until > Date.now()) return { ok: false, message: "Too many attempts. Wait 5 minutes and try again." };

  const expected = adminPassword();
  if (!expected || !sessionSecret()) {
    return { ok: false, message: "The dashboard is not configured on this server (ADMIN_PASSWORD and SESSION_SECRET)." };
  }
  const name = String(form.get("name") ?? "").trim().slice(0, 60);
  const password = String(form.get("password") ?? "");
  if (!name) return { ok: false, message: "Enter your name so changes can be credited to you." };

  const enc = new TextEncoder();
  if (!safeEqual(enc.encode(password), enc.encode(expected))) {
    const n = (a?.n ?? 0) + 1;
    attempts.set(ip, { n, until: n >= 5 ? Date.now() + 5 * 60_000 : 0 });
    await new Promise((r) => setTimeout(r, 600));
    return { ok: false, message: "Wrong password." };
  }
  attempts.delete(ip);
  const next = String(form.get("next") ?? "");
  (await cookies()).set(SESSION_COOKIE, await signSession(name), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  // only follow a "next" link that stays inside the dashboard
  redirect(/^\/admin\/[a-z0-9/-]*$/.test(next) ? next : "/admin");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ── Helpers ───────────────────────────────────────────────────────── */

const READ_ONLY: ActionResult = {
  ok: false,
  message: "Editing is turned off on the live site. Run the site on a computer to edit, then push to GitHub.",
};

async function begin(key: string) {
  const session = await requireSession(); // every action re-checks the login
  const collection = getCollection(key);
  if (!collection) throw new Error("Unknown collection");
  const storage = await getStorage();
  return { session, collection, storage };
}

/** Write the collection, record who changed it, and refresh the site. */
async function commit(key: string, data: unknown, editor: string, extra: FileChange[] = []) {
  const storage = await getStorage();
  const meta = ((await storage.read<Meta>("_meta").catch(() => ({}))) ?? {}) as Meta;
  meta[key] = { updatedAt: new Date().toISOString(), updatedBy: editor };
  await storage.write([...extra, { kind: "json", collection: key, data }, { kind: "json", collection: "_meta", data: meta }]);
  revalidatePath("/", "layout");
}

const uploadsToChanges = (u: { path: string; bytes: Uint8Array }[]): FileChange[] =>
  u.map((x) => ({ kind: "upload", path: x.path, bytes: x.bytes }));

/* ── Lists: news, events, gallery, staff, milestones ───────────────── */

export async function saveItem(key: string, id: string | null, values: Record<string, unknown>): Promise<ActionResult> {
  const { session, collection, storage } = await begin(key);
  if (collection.kind !== "list") return { ok: false, message: "Wrong collection type." };
  if (!storage.canWrite) return READ_ONLY;

  const { data, errors, uploads } = sanitize(collection.fields, values);
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors };

  const items = await storage.read<Record<string, unknown>[]>(key);
  let itemId: string;
  if (id) {
    const i = items.findIndex((x) => x.id === id);
    if (i < 0) return { ok: false, message: "This item no longer exists. It may have been deleted." };
    items[i] = { ...items[i], ...data, id };
    itemId = id;
  } else {
    const base = slugify(String(data[collection.titleField] ?? collection.singular));
    itemId = items.some((x) => x.id === base) ? `${base}-${Date.now().toString(36)}` : base;
    // dated collections: newest first. Others: add at the end.
    if (collection.dateField) items.unshift({ id: itemId, ...data });
    else items.push({ id: itemId, ...data });
  }
  await commit(key, items, session.name, uploadsToChanges(uploads));
  return { ok: true, message: id ? "Saved." : `New ${collection.singular} added.`, id: itemId };
}

export async function deleteItem(key: string, id: string): Promise<ActionResult> {
  const { session, collection, storage } = await begin(key);
  if (collection.kind !== "list") return { ok: false, message: "Wrong collection type." };
  if (!storage.canWrite) return READ_ONLY;
  const items = await storage.read<Record<string, unknown>[]>(key);
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return { ok: false, message: "Item not found." };
  await commit(key, next, session.name);
  return { ok: true, message: `Deleted ${collection.singular}.` };
}

export async function reorderItems(key: string, ids: string[]): Promise<ActionResult> {
  const { session, collection, storage } = await begin(key);
  if (collection.kind !== "list" || !collection.sortable) return { ok: false, message: "This list cannot be reordered." };
  if (!storage.canWrite) return READ_ONLY;
  const items = await storage.read<Record<string, unknown>[]>(key);
  const byId = new Map(items.map((x) => [x.id as string, x]));
  if (ids.length !== items.length || ids.some((i) => !byId.has(i))) {
    return { ok: false, message: "The list changed in the meantime. Reload the page and try again." };
  }
  await commit(key, ids.map((i) => byId.get(i)), session.name);
  return { ok: true, message: "Order saved." };
}

export async function setPublished(key: string, id: string, published: boolean): Promise<ActionResult> {
  const { session, collection, storage } = await begin(key);
  if (collection.kind !== "list") return { ok: false, message: "Wrong collection type." };
  if (!storage.canWrite) return READ_ONLY;
  const items = await storage.read<Record<string, unknown>[]>(key);
  const item = items.find((x) => x.id === id);
  if (!item || !("published" in item)) return { ok: false, message: "Item not found." };
  item.published = published;
  await commit(key, items, session.name);
  return { ok: true, message: published ? "Now visible on the website." : "Hidden from the website." };
}

/* ── Single documents: settings, about, programs, rectors ──────────── */

export async function saveSingle(key: string, values: Record<string, unknown>): Promise<ActionResult> {
  const { session, collection, storage } = await begin(key);
  if (collection.kind !== "single") return { ok: false, message: "Wrong collection type." };
  if (!storage.canWrite) return READ_ONLY;
  const { data, errors, uploads } = sanitize(collection.fields, values);
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors };
  const current = await storage.read<Record<string, unknown>>(key);
  // keep keys that are not editable in the dashboard (e.g. founding year)
  await commit(key, { ...current, ...data }, session.name, uploadsToChanges(uploads));
  return { ok: true, message: "Saved." };
}
