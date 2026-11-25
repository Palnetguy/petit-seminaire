"use client";

import { useRef, useState, type ReactNode } from "react";
import type { Field } from "@/lib/cms/schema";
import { resizeImage } from "./image";

type Obj = Record<string, unknown>;
type Errors = Record<string, string>;

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition focus:border-lapis focus:ring-4 focus:ring-lapis/10 disabled:bg-paper/60 disabled:text-muted";

function Label({ field, error, children, htmlFor }: { field: Field; error?: string; children: ReactNode; htmlFor?: string }) {
  const required = "required" in field && field.required;
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        <span>
          {field.label}
          {required && <span className="ml-1 text-imigongo">*</span>}
        </span>
      </label>
      {children}
      {error ? (
        <p className="text-sm font-medium text-imigongo" role="alert">{error}</p>
      ) : (
        field.help && <p className="text-[13px] text-muted">{field.help}</p>
      )}
    </div>
  );
}

/** Renders a list of fields bound to one object. */
export function FieldsEditor({
  fields,
  value,
  onChange,
  errors,
  prefix = "",
  disabled,
}: {
  fields: Field[];
  value: Obj;
  onChange: (next: Obj) => void;
  errors: Errors;
  prefix?: string;
  disabled?: boolean;
}) {
  const set = (name: string, v: unknown) => onChange({ ...value, [name]: v });
  return (
    <div className="space-y-6">
      {fields.map((f) => {
        const id = `f-${prefix}${f.name}`.replace(/[^a-zA-Z0-9-_]/g, "-");
        const err = errors[prefix + f.name];
        const v = value?.[f.name];
        switch (f.type) {
          case "group": {
            const flat = f.name.startsWith("_");
            return (
              <fieldset key={f.name} className="rounded-2xl border border-ink/10 bg-paper/40 p-5">
                <legend className="px-2 font-display text-lg text-ink">{f.label}</legend>
                <FieldsEditor
                  fields={f.fields}
                  value={flat ? value : ((v as Obj) ?? {})}
                  onChange={(next) => (flat ? onChange(next) : set(f.name, next))}
                  errors={errors}
                  prefix={flat ? prefix : `${prefix}${f.name}.`}
                  disabled={disabled}
                />
              </fieldset>
            );
          }
          case "list":
            return (
              <ListField key={f.name} field={f} value={(v as Obj[]) ?? []} onChange={(n) => set(f.name, n)} errors={errors} prefix={`${prefix}${f.name}.`} disabled={disabled} />
            );
          case "textarea":
            return (
              <Label key={f.name} field={f} error={err} htmlFor={id}>
                <textarea id={id} rows={f.rows ?? 4} className={`${inputCls} resize-y leading-relaxed`} value={String(v ?? "")} onChange={(e) => set(f.name, e.target.value)} disabled={disabled} />
                {f.max && <p className="text-right text-xs text-muted">{String(v ?? "").length} / {f.max}</p>}
              </Label>
            );
          case "boolean":
            return (
              <label key={f.name} className="flex cursor-pointer items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={!!v}
                  onClick={() => set(f.name, !v)}
                  disabled={disabled}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${v ? "bg-green" : "bg-ink/20"}`}
                >
                  <span className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${v ? "translate-x-5" : ""}`} />
                </button>
                <span className="text-sm font-semibold text-ink">{f.label}</span>
              </label>
            );
          case "select":
            return (
              <Label key={f.name} field={f} error={err} htmlFor={id}>
                <select id={id} className={inputCls} value={String(v ?? "")} onChange={(e) => set(f.name, e.target.value)} disabled={disabled}>
                  <option value="">Choose…</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Label>
            );
          case "image":
            return (
              <Label key={f.name} field={f} error={err}>
                <ImageField value={v} onChange={(n) => set(f.name, n)} disabled={disabled} />
              </Label>
            );
          case "tags":
            return (
              <Label key={f.name} field={f} error={err}>
                <TagsField value={(v as string[]) ?? []} onChange={(n) => set(f.name, n)} disabled={disabled} />
              </Label>
            );
          default:
            return (
              <Label key={f.name} field={f} error={err} htmlFor={id}>
                <input
                  id={id}
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "time" ? "time" : "text"}
                  step={f.type === "number" ? "any" : undefined}
                  className={inputCls}
                  placeholder={"placeholder" in f ? f.placeholder : undefined}
                  value={v === undefined || v === null ? "" : String(v)}
                  onChange={(e) => set(f.name, f.type === "number" && e.target.value !== "" ? Number(e.target.value) : e.target.value)}
                  disabled={disabled}
                />
              </Label>
            );
        }
      })}
    </div>
  );
}

/* ── Repeatable rows (visiting hours, stats, combinations…) ─────────── */

function ListField({
  field,
  value,
  onChange,
  errors,
  prefix,
  disabled,
}: {
  field: Extract<Field, { type: "list" }>;
  value: Obj[];
  onChange: (n: Obj[]) => void;
  errors: Errors;
  prefix: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const n = [...value];
    [n[i], n[j]] = [n[j], n[i]];
    onChange(n);
    setOpen(j);
  };
  const hasError = (i: number) => Object.keys(errors).some((k) => k.startsWith(`${prefix}${i}.`));
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-ink">{field.label}</p>
        <span className="text-xs text-muted">{value.length} {field.itemLabel}{value.length === 1 ? "" : "s"}</span>
      </div>
      {field.help && <p className="text-[13px] text-muted">{field.help}</p>}
      <ul className="space-y-2">
        {value.map((row, i) => {
          const title = String(row?.[field.titleField ?? field.fields[0].name] ?? "") || `New ${field.itemLabel}`;
          const isOpen = open === i;
          return (
            <li key={i} className={`overflow-hidden rounded-xl border bg-white ${hasError(i) ? "border-imigongo" : "border-ink/10"}`}>
              <div className="flex items-center gap-2 px-3 py-2">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left">
                  <span className={`text-xs text-muted transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
                  <span className="truncate text-[15px] text-ink">{title}</span>
                </button>
                {!disabled && (
                  <div className="flex shrink-0 items-center gap-1 text-muted">
                    <button type="button" onClick={() => move(i, -1)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-paper" aria-label="Move up">↑</button>
                    <button type="button" onClick={() => move(i, 1)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-paper" aria-label="Move down">↓</button>
                    <button
                      type="button"
                      onClick={() => confirm(`Remove “${title}”?`) && onChange(value.filter((_, j) => j !== i))}
                      className="grid h-8 w-8 place-items-center rounded-lg hover:bg-imigongo/10 hover:text-imigongo"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              {(isOpen || hasError(i)) && (
                <div className="border-t border-ink/10 bg-ivory/50 p-4">
                  <FieldsEditor fields={field.fields} value={row} onChange={(n) => onChange(value.map((r, j) => (j === i ? n : r)))} errors={errors} prefix={`${prefix}${i}.`} disabled={disabled} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {!disabled && (
        <button
          type="button"
          onClick={() => {
            onChange([...value, {}]);
            setOpen(value.length);
          }}
          className="w-full rounded-xl border border-dashed border-ink/25 py-2.5 text-sm font-semibold text-navy transition hover:border-navy hover:bg-white"
        >
          + Add {field.itemLabel}
        </button>
      )}
    </div>
  );
}

/* ── Photo picker with preview ──────────────────────────────────────── */

export function ImageField({ value, onChange, disabled }: { value: unknown; onChange: (v: unknown) => void; disabled?: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const src = typeof value === "string" ? value : (value as { upload?: string })?.upload;

  async function pick(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await resizeImage(file));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="flex items-center gap-4 rounded-xl border border-dashed border-ink/20 bg-white p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (!disabled) pick(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-paper">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- previews may be local data URLs
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-xs text-muted">No photo</span>
        )}
        {busy && <span className="absolute inset-0 grid place-items-center bg-white/70 text-xs font-semibold">Resizing…</span>}
      </div>
      <div className="min-w-0 space-y-2 text-sm">
        {!disabled && (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => input.current?.click()} className="rounded-lg bg-navy px-3 py-2 font-semibold text-ivory hover:bg-ink">
              {src ? "Replace photo" : "Choose photo"}
            </button>
            {src && (
              <button type="button" onClick={() => onChange("")} className="rounded-lg px-3 py-2 font-semibold text-imigongo hover:bg-imigongo/10">
                Remove
              </button>
            )}
          </div>
        )}
        <p className="text-xs text-muted">
          {typeof value === "object" && value ? "New photo: saved when you press Save." : disabled ? "" : "Or drag a photo here. It is resized automatically."}
        </p>
        {error && <p className="text-xs font-medium text-imigongo">{error}</p>}
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      </div>
    </div>
  );
}

/* ── Chips for short lists of words ─────────────────────────────────── */

function TagsField({ value, onChange, disabled }: { value: string[]; onChange: (v: string[]) => void; disabled?: boolean }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-2 py-2`}>
      {value.map((t, i) => (
        <span key={t + i} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-sm text-ink">
          {t}
          {!disabled && (
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-muted hover:text-imigongo" aria-label={`Remove ${t}`}>
              ✕
            </button>
          )}
        </span>
      ))}
      {!disabled && (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
          }}
          onBlur={add}
          placeholder="Type and press Enter"
          className="min-w-[10rem] flex-1 bg-transparent py-1 outline-none"
        />
      )}
    </div>
  );
}
