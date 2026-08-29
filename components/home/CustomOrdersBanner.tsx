"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CustomOrdersBanner() {
  return (
    <section className="relative px-4 md:px-6 pt-12 md:pt-16 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl rounded-3xl border-2 border-brand-dark bg-brand-pink text-cream p-10 md:p-16 shadow-[10px_10px_0_0_hsl(var(--brand-dark))] noise relative overflow-hidden"
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <p className="font-display uppercase text-sm tracking-widest text-cream/80">
              Custom Orders
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
              Want something made just for you?
            </h2>
          </div>
          <Button asChild size="xl" variant="outline">
            <Link href="/contact">Start your order</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
