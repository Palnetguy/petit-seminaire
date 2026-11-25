import { Suspense } from "react";
import { Crest } from "@/components/Crest";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  const isDev = process.env.NODE_ENV !== "production" && !process.env.ADMIN_PASSWORD;
  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink p-12 text-ivory lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <Crest className="h-12 w-auto" />
          <div className="leading-tight">
            <p className="eyebrow text-gold" translate="no" lang="fr">Petit Séminaire</p>
            <p className="font-display text-lg" translate="no" lang="fr">Saint Léon Kabgayi</p>
          </div>
        </div>
        <div>
          <p className="display text-6xl">
            Ikaze.
            <br />
            <em className="text-gold">Welcome back.</em>
          </p>
          <p className="mt-6 max-w-sm text-ivory/60">Update news, events, photos, staff and school details. Changes appear on the website.</p>
        </div>
        <p className="text-sm text-ivory/40">Website dashboard</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <Crest className="h-10 w-auto" />
            <p className="font-display text-lg text-ink" translate="no" lang="fr">Petit Séminaire Saint Léon Kabgayi</p>
          </div>
          <h1 className="display text-4xl text-ink">Sign in</h1>
          <p className="mt-2 text-muted">to the website dashboard</p>
          <Suspense>
            <LoginForm />
          </Suspense>
          {isDev && (
            <p className="mt-6 rounded-xl bg-gold/20 px-4 py-3 text-sm text-ink">
              Development mode: the password is <code className="font-semibold">saintleon</code>. Set <code>ADMIN_PASSWORD</code> in <code>.env.local</code> to change it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
