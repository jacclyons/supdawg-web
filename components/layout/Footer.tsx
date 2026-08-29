import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-brand-dark bg-brand-purple text-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <Wordmark size="md" />
          <p className="text-sm text-brand-cream/85 max-w-xs">
            Handmade with spunk by Allie Lyons. Patches, hoops, apparel, every
            stitch by hand.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/gallery" className="hover:underline">Gallery</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
        <div className="space-y-3">
          <p className="font-display uppercase tracking-wide text-sm">Stay loud</p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/supdawgcrafts"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="h-11 w-11 rounded-full bg-brand-cream text-brand-dark grid place-items-center border-2 border-brand-dark shadow-[3px_3px_0_0_hsl(var(--brand-dark))]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:hi@supdawg.shop"
              aria-label="Email"
              className="h-11 w-11 rounded-full bg-brand-cream text-brand-dark grid place-items-center border-2 border-brand-dark shadow-[3px_3px_0_0_hsl(var(--brand-dark))]"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-brand-dark/30 py-4 text-center text-xs text-brand-cream/75">
        © {new Date().getFullYear()} SUPDAWG! Made in Alabama with thread and love ♡.
      </div>
    </footer>
  );
}
