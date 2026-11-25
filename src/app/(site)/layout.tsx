import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";

/** Public website shell: header, footer, smooth scrolling and the 1912 intro. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
