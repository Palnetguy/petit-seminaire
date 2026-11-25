import type { Field } from "./schema";

/** A photo picked in the dashboard, not yet saved: resized in the browser, sent as a data URL. */
export type PendingUpload = { upload: string; name: string };
export type Upload = { path: string; bytes: Uint8Array };
export type Errors = Record<string, string>;

const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
const MIME_EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export const isPendingUpload = (v: unknown): v is PendingUpload =>
  !!v && typeof v === "object" && typeof (v as PendingUpload).upload === "string";

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "item";

function decodeUpload(u: PendingUpload, folder: string): Upload | string {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(u.upload);
  if (!m) return "Only JPEG, PNG or WebP photos can be uploaded.";
  const bytes = Uint8Array.from(Buffer.from(m[2], "base64"));
  if (bytes.length > MAX_UPLOAD_BYTES) return "This photo is too large (max 3 MB after resizing).";
  const stamp = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  return { path: `uploads/${slugify(folder)}/${slugify(u.name.replace(/\.[^.]+$/, ""))}-${stamp}.${MIME_EXT[m[1]]}`, bytes };
}

const validImagePath = (s: string) => /^\/(img|uploads)\/[A-Za-z0-9_\-./]+$/.test(s) && !s.includes("..");

/**
 * Clean an object against its fields: coerce types, trim, enforce limits,
 * turn pending uploads into files. Unknown keys are dropped.
 */
export function sanitize(
  fields: Field[],
  input: Record<string, unknown>,
  prefix = "",
  out: { errors: Errors; uploads: Upload[] } = { errors: {}, uploads: [] },
): { data: Record<string, unknown>; errors: Errors; uploads: Upload[] } {
  const data: Record<string, unknown> = {};
  const err = (name: string, msg: string) => (out.errors[prefix + name] = msg);

  for (const f of fields) {
    const v = input?.[f.name];
    switch (f.type) {
      case "group": {
        // groups whose name starts with "_" are visual only: their fields live at this level
        if (f.name.startsWith("_")) Object.assign(data, sanitize(f.fields, input, prefix, out).data);
        else data[f.name] = sanitize(f.fields, (v as Record<string, unknown>) ?? {}, `${prefix}${f.name}.`, out).data;
        break;
      }
      case "list": {
        const arr = Array.isArray(v) ? v.slice(0, 300) : [];
        data[f.name] = arr.map((item, i) => sanitize(f.fields, item as Record<string, unknown>, `${prefix}${f.name}.${i}.`, out).data);
        break;
      }
      case "tags": {
        data[f.name] = (Array.isArray(v) ? v : [])
          .map((t) => String(t).trim().slice(0, 120))
          .filter(Boolean)
          .slice(0, 40);
        break;
      }
      case "boolean":
        data[f.name] = v === true || v === "true" || v === "on";
        break;
      case "number": {
        const n = typeof v === "number" ? v : Number(String(v ?? "").trim());
        if (v === "" || v === undefined || v === null) {
          if (f.required) err(f.name, "Required");
          data[f.name] = 0;
        } else if (!Number.isFinite(n)) err(f.name, "Must be a number");
        else data[f.name] = n;
        break;
      }
      case "date": {
        const s = String(v ?? "").trim();
        if (!s) { if (f.required) err(f.name, "Required"); data[f.name] = ""; }
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s))) err(f.name, "Use a valid date");
        else data[f.name] = s;
        break;
      }
      case "time": {
        const s = String(v ?? "").trim();
        if (s && !/^\d{2}:\d{2}$/.test(s)) err(f.name, "Use HH:MM");
        data[f.name] = s;
        break;
      }
      case "select": {
        const s = String(v ?? "");
        if (!s) { if (f.required) err(f.name, "Choose an option"); data[f.name] = ""; }
        else if (!f.options.includes(s)) err(f.name, "Choose one of the options");
        else data[f.name] = s;
        break;
      }
      case "image": {
        if (isPendingUpload(v)) {
          const r = decodeUpload(v, f.folder);
          if (typeof r === "string") err(f.name, r);
          else { out.uploads.push(r); data[f.name] = "/" + r.path; }
        } else {
          const s = String(v ?? "").trim();
          if (!s) { if (f.required) err(f.name, "Add a photo"); data[f.name] = ""; }
          else if (!validImagePath(s)) err(f.name, "Invalid image");
          else data[f.name] = s;
        }
        break;
      }
      case "text":
      case "textarea": {
        const max = f.max ?? (f.type === "text" ? 300 : 5000);
        const s = String(v ?? "").replace(/\r\n/g, "\n").trim();
        if (!s && f.required) err(f.name, "Required");
        else if (s.length > max) err(f.name, `Keep it under ${max} characters (now ${s.length})`);
        data[f.name] = s.slice(0, max);
        break;
      }
    }
  }
  return { data, errors: out.errors, uploads: out.uploads };
}
