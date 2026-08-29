"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-brand-dark bg-brand-cream noise">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-brand-dark bg-transparent px-4 py-1.5 font-display uppercase text-sm tracking-wider shadow-[3px_3px_0_0_hsl(var(--brand-dark))]"
        >
          Handmade in Alabama, shipped everywhere
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.78, rotate: -3 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 11, mass: 0.9, delay: 0.15 }}
          className="mt-10 md:mt-14 mb-14 md:mb-20 mx-auto w-[88%] md:w-[78%] max-w-4xl"
          aria-label="SUPDAWG!"
        >
          <div className="relative group logo-shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/supdawg-logo.svg"
              alt="SUPDAWG!"
              className="block w-full h-auto transition-opacity duration-200 ease-out group-hover:opacity-0"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/supdawg-logo-alt.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-auto opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 md:mt-10 mx-auto max-w-2xl font-display text-2xl md:text-4xl text-brand-dark"
        >
          Handmade with spunk.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-3 mx-auto max-w-xl text-base md:text-lg text-brand-dark/80"
        >
          We make embroidered things: patches, hoops, apparel,
          and one-of-one custom orders with our own two hands and a lot of love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/gallery">
              See the Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
