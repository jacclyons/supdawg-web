"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AboutContent() {
  return (
    <div className="relative overflow-hidden bg-brand-cream noise">
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl pointer-events-none" />

      {/* Hero */}
      <section className="relative mx-auto max-w-3xl px-4 md:px-6 pt-14 md:pt-20 text-center">
        <p className="font-display uppercase text-sm tracking-widest text-brand-purple">
          Who am I?
        </p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl leading-none">
          Hi, I&apos;m <span className="text-brand-pink">Allie!</span>
        </h1>
        <p className="mt-5 text-lg text-brand-dark/80 max-w-prose mx-auto">
          The official owner of SUPDAWG! Based in the small town of Hartselle, Alabama.
        </p>
      </section>

      {/* Allie's story */}
      <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative md:sticky md:top-24"
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
            Tulip approved
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5 text-base md:text-lg text-brand-dark/85 leading-relaxed"
        >
          <p>
            My family consists of my pet bunny Tulip, my husband, and I. My husband, Jack,
            is my best friend and biggest supporter, and I thank the Lord for him every day!
          </p>
          <div className="relative">
            <p className="rounded-2xl border-2 border-brand-dark bg-brand-purple text-brand-cream px-5 py-4 pr-24 sm:pr-28 shadow-[6px_6px_0_0_hsl(var(--brand-dark))]">
              Tulip is our unofficial goobie of a mascot. She might not be a technical &ldquo;dawg,&rdquo;
              but she is in our hearts!
            </p>
            <div className="pointer-events-none absolute -top-8 -right-3 sm:-right-6 w-24 sm:w-28 -rotate-6">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/allieandtulip.png"
                  alt="Allie holding Tulip the bunny"
                  fill
                  sizes="120px"
                  className="object-contain drop-shadow-[3px_3px_0_hsl(var(--brand-dark))]"
                />
              </div>
            </div>
          </div>
          <p>
            As we have been navigating the life of newlyweds, I have wanted to put my love
            for creation to use. Some of my hobbies are baking, gaming, and crafting! My love
            for this type of crafting came from a gift of an embroidery machine that wasn&apos;t
            being used. After learning how to use this machine, I decided to pick up sewing
            as well! My husband started an LLC with some friends, and I jokingly said
            &ldquo;I can make some patches for y&apos;all!&rdquo; &hellip; Little did I know,
            that was the start of the idea to bring this business to life!
          </p>
          <p>
            When I am not crafting or keeping up with life at home, Jack and I are involved
            in our local church in Decatur, AL! We stand firm in our faith and love to share
            the Gospel with others when we can. My goal with this business is to share the
            love of Christ and the beauty of creation through my works.
          </p>
          <p>
            In no way will my products or service be perfect, but I strive to give this
            business my all. No human is perfect, but the One who saves is. I strive to show
            my customers the love that He shows me daily.
          </p>
        </motion.div>
      </section>

      {/* About Supdawg */}
      <section className="relative bg-brand-purple text-brand-cream noise border-y-2 border-brand-dark">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-14 md:py-20 space-y-5">
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
            What&apos;s up, <span className="text-brand-pink">dawg?</span>
          </h2>
          <p className="text-base md:text-lg text-brand-cream/90">
            SUPDAWG! is a small, home-based business based out of Hartselle, AL. Our business
            name comes from the phrase &ldquo;What&apos;s up, dawg?&rdquo;, a phrase that our
            owner, Allie, tends to say a lot!
          </p>
          <p className="text-base md:text-lg text-brand-cream/90">
            We share fun and meaningful creations that will bring our customers joy. We might
            be silly, but we aim to give our best attention to our customers and their needs.
            We work as effectively and diligently as possible and try to get orders out ASAP.
            We focus on quality rather than quantity, putting our best effort and love into
            our products.
          </p>
          <p className="text-base md:text-lg text-brand-cream/90">
            SUPDAWG! offers many sizes of creations, ranging from patches and pins, to bags
            and accessories, and even clothes! We want to offer products that appeal to
            everyone!
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-3xl px-4 md:px-6 py-14 md:py-20 text-center space-y-6">
        <h2 className="font-display text-3xl md:text-5xl leading-tight">
          Want to know more?
        </h2>
        <p className="text-base md:text-lg text-brand-dark/80 max-w-prose mx-auto">
          For more information about our business or services, reach out anytime at{" "}
          <a
            href="mailto:supdawgcrafts@gmail.com"
            className="font-semibold text-brand-purple underline underline-offset-4 decoration-2 hover:text-brand-pink"
          >
            supdawgcrafts@gmail.com
          </a>
          .
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/gallery">See the creations</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Say hi</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
