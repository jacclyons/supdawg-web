"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/sample-data";

export function GalleryStrip() {
  const row = [...GALLERY_IMAGES, ...GALLERY_IMAGES];
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 mb-8">
        <p className="font-display uppercase text-sm tracking-widest text-brand-pink">
          From the studio
        </p>
        <h2 className="font-display text-4xl md:text-6xl mt-2 leading-none">
          Made by hand. <span className="text-brand-purple">Shared by joy.</span>
        </h2>
      </div>
      <div className="relative">
        <div className="flex gap-5 w-max animate-marquee will-change-transform">
          {row.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ rotate: -2, scale: 1.02 }}
              className="relative h-56 md:h-72 w-56 md:w-72 shrink-0 rounded-2xl overflow-hidden border-2 border-brand-dark shadow-[5px_5px_0_0_hsl(var(--brand-dark))] bg-brand-cream"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
