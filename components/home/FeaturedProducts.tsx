"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";

export function FeaturedProducts() {
  const featured = SAMPLE_PRODUCTS.slice(0, 4);
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-display uppercase text-sm tracking-widest text-brand-pink">
              Fresh from the hoop
            </p>
            <h2 className="font-display text-4xl md:text-6xl mt-2 leading-none">
              The Goods.
            </h2>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/shop">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 sm:hidden text-center">
          <Button asChild variant="outline">
            <Link href="/shop">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
