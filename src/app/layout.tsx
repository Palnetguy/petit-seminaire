import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
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
      <body suppressHydrationWarning>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
