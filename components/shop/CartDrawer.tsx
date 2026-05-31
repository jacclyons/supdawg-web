"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  Snail,
  Cat,
  Dog,
  Bird,
  Rabbit,
  Squirrel,
  Turtle,
  Worm,
  HandMetal,
  Heart,
  Flower,
  Trees,
  Haze,
} from "lucide-react";

const EMPTY_ICONS = [
  Snail,
  Cat,
  Dog,
  Bird,
  Rabbit,
  Squirrel,
  Turtle,
  Worm,
  HandMetal,
  Heart,
  Flower,
  Trees,
  Haze,
];
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, cartTotalCents } from "@/lib/cart-store";
import { formatPrice } from "@/lib/types";

export function CartDrawer() {
  const items = useCart((s) => s.items);
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [emptyIconIdx, setEmptyIconIdx] = useState(0);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (isOpen) setEmptyIconIdx(Math.floor(Math.random() * EMPTY_ICONS.length));
  }, [isOpen]);
  if (!mounted) return null;
  const EmptyIcon = EMPTY_ICONS[emptyIconIdx];

  const total = cartTotalCents(items);

  async function checkout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout isn't wired up yet — Stripe keys missing.");
      }
    } catch {
      alert("Couldn't start checkout. Try again in a sec.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (!o ? close() : null)}>
      <SheetContent className="bg-brand-cream border-l-2 border-brand-dark flex flex-col p-0 sm:max-w-md">
        <SheetHeader className="px-6 pt-6 pb-4 border-none">
          <SheetTitle className="font-display text-3xl">yo <span className="text-brand-pink">cart</span></SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-12">
              <EmptyIcon
              strokeWidth={1.25}
              className="h-12 w-12 mx-auto text-brand-pink" />
              <p className="mt-4 text-brand-dark/70">Empty... for now! mwhahaha</p>
            </div>
          )}
          {items.map((i) => (
            <div
              key={i.id}
              className="flex gap-3 p-3 rounded-xl border-2 border-brand-dark bg-transparent"
            >
              <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 border-brand-dark">
                <Image src={i.image_url} alt={i.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base leading-tight truncate">{i.name}</p>
                <p className="text-brand-pink font-display">{formatPrice(i.price_cents)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setQty(i.id, i.quantity - 1)}
                    aria-label="Decrease"
                    className="h-7 w-7 rounded-full border-2 border-brand-dark grid place-items-center bg-transparent hover:bg-brand-cream"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-display w-6 text-center">{i.quantity}</span>
                  <button
                    onClick={() => setQty(i.id, i.quantity + 1)}
                    aria-label="Increase"
                    className="h-7 w-7 rounded-full border-2 border-brand-dark grid place-items-center bg-transparent hover:bg-brand-cream"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => remove(i.id)}
                    aria-label="Remove"
                    className="ml-auto h-7 w-7 rounded-full border-2 border-brand-dark grid place-items-center bg-transparent hover:bg-brand-pink hover:text-cream"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t-2 border-brand-dark p-6 space-y-3 bg-transparent">
            <div className="flex justify-between font-display text-xl">
              <span>Total</span>
              <span className="text-brand-pink">{formatPrice(total)}</span>
            </div>
            <Button onClick={checkout} disabled={loading} className="w-full" size="lg">
              {loading ? "Hold on…" : "Checkout"}
            </Button>
            <p className="text-xs text-brand-dark/60 text-center">
              Secure checkout by Stripe. Shipping calculated next.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
