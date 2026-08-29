"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
  image_url: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** Bumped each time the drawer opens, so the empty-state icon changes. */
  openSeed: number;
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const nextSeed = () => Math.floor(Math.random() * 1_000_000);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openSeed: 0,
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
              ),
              isOpen: true,
              openSeed: nextSeed(),
            };
          }
          return {
            items: [...s.items, { ...item, quantity: qty }],
            isOpen: true,
            openSeed: nextSeed(),
          };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true, openSeed: nextSeed() }),
      close: () => set({ isOpen: false }),
      toggle: () =>
        set((s) =>
          s.isOpen ? { isOpen: false } : { isOpen: true, openSeed: nextSeed() }
        ),
    }),
    { name: "supdawg-cart" }
  )
);

export function cartTotalCents(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
