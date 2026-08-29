"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, type Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  return (
    <motion.div
      whileHover={{ y: -4, rotate: -0.5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <Card className="group bg-transparent">
          <div className="relative aspect-square bg-brand-cream overflow-hidden border-b-2 border-brand-dark">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-brand-pink border-2 border-brand-dark text-cream font-display tracking-wide rounded-full">
                {product.badge}
              </Badge>
            )}
          </div>
        <div className="p-4 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-lg leading-tight">
              {product.name}
            </span>
            <span className="font-display text-brand-pink text-lg shrink-0">
              {formatPrice(product.price_cents)}
            </span>
          </div>
          <Button
            size="sm"
            className="w-full hover:bg-brand-purple"
            onClick={() =>
              add({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price_cents: product.price_cents,
                image_url: product.image_url,
              })
            }
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
