"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  const next = useSearchParams().get("next") ?? "";
  // controlled so the name survives a failed attempt (React resets uncontrolled form fields after an action)
  const [name, setName] = useState("");
  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-lapis focus:ring-4 focus:ring-lapis/10";
  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-ink">Your name</span>
        <input name="name" required autoComplete="name" placeholder="e.g. Abbé Pater" className={field} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-ink">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={field} />
      </label>
      {state && !state.ok && (
        <p role="alert" className="rounded-xl bg-imigongo/10 px-4 py-3 text-sm font-medium text-imigongo">{state.message}</p>
      )}
      <button disabled={pending} className="w-full rounded-xl bg-navy py-3 font-semibold text-ivory transition hover:bg-ink disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
