import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard" },
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] bg-ivory font-sans text-charcoal">{children}</div>;
}
