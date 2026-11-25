import Link from "next/link";

export function PageTitle({ title, rw, description, back, action }: { title: string; rw?: string; description?: string; back?: { href: string; label: string }; action?: React.ReactNode }) {
  return (
    <header className="mb-8">
      {back && (
        <Link href={back.href} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
          ← {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {rw && <p className="eyebrow text-brick">{rw}</p>}
          <h1 className="display mt-1 text-4xl text-ink sm:text-5xl">{title}</h1>
          {description && <p className="mt-3 max-w-xl text-muted">{description}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}
