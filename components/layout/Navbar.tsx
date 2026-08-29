"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { useCart, cartCount } from "@/lib/cart-store";
import { useIsMounted } from "@/lib/use-is-mounted";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const mounted = useIsMounted();
  const count = mounted ? cartCount(items) : 0;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-brand-dark bg-brand-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" aria-label="SUPDAWG home" className="shrink-0">
          <Wordmark size="md" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "px-4 py-2 rounded-full font-display uppercase text-md tracking-wide border-2 border-transparent transition-all",
                  active
                    ? "bg-brand-dark text-brand-cream"
                    : "hover:border-brand-dark"
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="relative h-11 w-11 rounded-full border-2 border-brand-dark bg-transparent grid place-items-center shadow-[3px_3px_0_0_hsl(var(--brand-dark))] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_0_hsl(var(--brand-dark))] transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-brand-pink border-2 border-brand-dark text-[10px] text-cream grid place-items-center px-1 font-bold">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="lg:hidden h-11 w-11 rounded-full border-2 border-brand-dark bg-transparent grid place-items-center shadow-[3px_3px_0_0_hsl(var(--brand-dark))]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t-2 border-brand-dark bg-brand-cream px-4 py-3 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg font-display uppercase text-sm tracking-wide border-2",
                pathname === n.href
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "border-transparent hover:border-brand-dark hover:bg-transparent"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
