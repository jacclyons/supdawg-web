"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AboutTeaser() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-brand-purple text-brand-cream noise overflow-hidden">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl border-2 border-brand-dark overflow-hidden shadow-[10px_10px_0_0_hsl(var(--brand-dark))] bg-brand-cream">
            <Image
              src="/allie.jpeg"
              alt="Allie at her embroidery station"
              fill
              sizes="(min-width:768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -top-4 -right-4 rotate-6 bg-brand-pink text-cream px-4 py-2 rounded-full border-2 border-brand-dark font-display uppercase text-sm shadow-[4px_4px_0_0_hsl(var(--brand-dark))]">
            Hi, I&apos;m Allie!
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
            Every stitch by hand. <span className="text-brand-pink">No vibes harmed.</span>
          </h2>
          <p className="text-base md:text-lg text-brand-cream/90 max-w-prose">
            SUPDAWG! started as a sticker-pack-meets-sewing-circle side project and
            grew into a tiny studio of loud, lovable embroidery. Allie makes every
            piece herself. No factories, no shortcuts, just a chunky thread and a
            big mood.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Read the whole story</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
