import { Fragment, type ReactNode } from "react";

export const SCHOOL_NAME = "Petit Séminaire Saint Léon Kabgayi";

/**
 * The school's name is a French proper noun. Marking it translate="no" stops
 * browser auto-translation from turning it into "Minor Seminary Saint Leon".
 */
export function SchoolName({ children = SCHOOL_NAME, className }: { children?: ReactNode; className?: string }) {
  return (
    <span translate="no" lang="fr" className={className}>
      {children}
    </span>
  );
}

/** Protect every occurrence of the name inside a plain-text string (e.g. from JSON content). */
export function withSchoolName(text: string): ReactNode {
  if (!text.includes(SCHOOL_NAME)) return text;
  const parts = text.split(SCHOOL_NAME);
  return parts.map((p, i) => (
    <Fragment key={i}>
      {p}
      {i < parts.length - 1 && <SchoolName />}
    </Fragment>
  ));
}
