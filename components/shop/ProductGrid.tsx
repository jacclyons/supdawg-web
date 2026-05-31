"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { CATEGORIES, type Product, type ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [products, filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.key}
            active={filter === c.key}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </FilterChip>
        ))}
      </div>
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
      {filtered.length === 0 && (
        <p className="text-center py-16 text-brand-dark/60 font-display text-xl">
          Nothin&apos; here yet — check back soon!
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 h-10 rounded-full border-2 border-brand-dark font-display uppercase text-sm tracking-wide transition-all",
        active
          ? "bg-brand-pink text-white shadow-[3px_3px_0_0_hsl(var(--brand-dark))]"
          : "bg-transparent hover:bg-brand-pink/10 shadow-[2px_2px_0_0_hsl(var(--brand-dark))]"
      )}
    >
      {children}
    </button>
  );
}
