import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import { school } from "@/content/school";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  title: {
    default: `${school.name} · Since 1912`,
    template: `%s · Petit Séminaire Saint Léon Kabgayi`,
  },
  description:
    "Petit Séminaire Saint Léon Kabgayi, founded in 1912 in Muhanga: the cradle of the priesthood in Rwanda and one of the country's oldest secondary schools. Turerera u Rwanda rwejo.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: school.name,
    description: "Forming the Rwanda of tomorrow since 1912.",
    images: ["/img/campus/chapel-exterior.jpg"],
    locale: "en_RW",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07142b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
