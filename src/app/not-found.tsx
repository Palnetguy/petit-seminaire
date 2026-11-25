import Link from "next/link";
import { Crest } from "@/components/Crest";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-ink px-5 text-center text-ivory">
      <Crest className="h-24 w-auto" />
      <p className="display mt-10 text-[clamp(3rem,10vw,8rem)]">
        Nº <span className="text-gold">404</span>
      </p>
      <p className="mt-4 max-w-md text-ivory/70">This page is not in our register. Ntabwo twayibonye.</p>
      <Link href="/" className="mt-10 rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:bg-ivory">
        Return home
      </Link>
    </section>
  );
}
