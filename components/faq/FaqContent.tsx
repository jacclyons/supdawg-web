"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type QA = { q: string; a: React.ReactNode };
type Group = { title: string; items: QA[] };

const email = (
  <a
    href="mailto:supdawgcrafts@gmail.com"
    className="font-semibold underline underline-offset-2 hover:text-brand-pink"
  >
    supdawgcrafts@gmail.com
  </a>
);

const groups: Group[] = [
  {
    title: "Custom orders",
    items: [
      {
        q: "Do you accept custom orders?",
        a: "Yes! Custom orders are our specialty. Reach out with your ideas and we'll work together to bring them to life!",
      },
      {
        q: "Can I provide my own design or logo for embroidery?",
        a: "Absolutely. You can send us your design or logo and we'll convert it into an embroidery file. The cleaner the file, the better the result!",
      },
      {
        q: "What file formats do you accept for custom designs?",
        a: "We accept PNG, JPG, SVG, and PDF files. Vector formats are preferred for the best results, but we can work with images as well!",
      },
      {
        q: "Can I see a proof or mockup before my order is made?",
        a: "Yes — we'll send a digital proof for your approval before we begin stitching.",
      },
      {
        q: "Can I request a specific font or lettering style?",
        a: "Yes! We have a wide range of fonts and lettering styles available. Describe what you're looking for or share a reference image and we'll match it as closely as possible.",
      },
      {
        q: "Can you recreate a design I found online?",
        a: "We can't directly copy designs without authorization. We can try to recreate it as closely as possible!",
      },
      {
        q: "Can I order matching items for a group?",
        a: <>As a new business, we&apos;re currently not taking group orders. For further questions, please contact me at {email}.</>,
      },
      {
        q: "Can I choose where the design is placed?",
        a: "Yes, placement is customizable! Just let us know your preference when you order.",
      },
    ],
  },
  {
    title: "Pricing & payment",
    items: [
      {
        q: "How is pricing determined for custom orders?",
        a: "Pricing is based on design complexity, stitch count, item type, and quantity. Every custom order is quoted individually — reach out with your details for an estimate!",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Venmo and credit/debit cards through Stripe. Payment details are shared at the time of invoicing.",
      },
    ],
  },
  {
    title: "Turnaround & shipping",
    items: [
      {
        q: "How long does it take to complete an order?",
        a: "Standard turnaround is 1–2 weeks. Custom orders depend on proof approval from the customer. Larger or more complex orders may take longer.",
      },
      {
        q: "Do you do local pickups?",
        a: "Yes! Local pickups are available in Hartselle, AL. Once an order is complete, we'll coordinate a pickup time.",
      },
      {
        q: "How are orders shipped out?",
        a: "Orders are mailed in poly mailer bags via USPS/UPS/FedEx. You'll receive a tracking number once your order is on the way!",
      },
    ],
  },
  {
    title: "Products & materials",
    items: [
      {
        q: "What types of items can you embroider or sew?",
        a: "We embroider a wide variety of items including shirts, bags, towels, blankets, baby items, and more. If you're not sure your item is suitable, just ask!",
      },
      {
        q: "Can I supply my own fabric or item to be embroidered?",
        a: "Yes! We accept customer-supplied items. Please note we can't be held responsible for damage to items that are difficult to embroider (very thin, delicate, or stretchy fabrics). We'll let you know if we have any concerns before starting.",
      },
      {
        q: "How do I care for my embroidered items?",
        a: "Turn the item inside out before washing. Use cold water on a gentle cycle and avoid bleach. Tumble dry on low or air dry. Avoid ironing directly over the embroidery — iron on the reverse side if needed.",
      },
      {
        q: "What sizes are available for embroidery designs?",
        a: "Design size depends on the item and placement area. We'll recommend the best size for your specific item and send you the proof before stitching.",
      },
    ],
  },
  {
    title: "Returns & issues",
    items: [
      {
        q: "What is your return policy?",
        a: "For custom-made orders, we don't accept returns for change of mind. However, if there's an error on our end, we'll make it right — please review your proof carefully before approving. For pre-established items, we accept returns within 14 days of receiving your order. Refunds go back to the card or Venmo used.",
      },
      {
        q: "What if my order arrives damaged or with an error?",
        a: "Please contact us within 7 days of receiving your order with a photo of the issue. If the error was on our end, we'll offer a replacement at no cost to you.",
      },
      {
        q: "Do you offer refunds on custom orders?",
        a: "Refunds are handled case-by-case. Custom orders that have been approved and completed are non-refundable unless there was an error on our part.",
      },
    ],
  },
  {
    title: "Special occasions",
    items: [
      {
        q: "Do you offer special packaging?",
        a: "Yes! We can do gift packaging inside our poly mailers. Let us know at checkout or when placing your order if you'd like it packaged for gifting.",
      },
      {
        q: "Can I include a message with my order?",
        a: "Absolutely. We can include a handwritten or printed note with your order. Just let us know what you'd like it to say!",
      },
      {
        q: "Do you make items for weddings, baby showers, or other events?",
        a: <>As a new business, we&apos;re currently not taking bigger orders. For related questions, please contact me at {email}.</>,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        q: "How will I be updated on my order status?",
        a: "We'll keep you in the loop via email or Instagram DM (your preferred method of contact) throughout the process.",
      },
      {
        q: "What happens if I want to make a change on my custom order?",
        a: "Changes can be made before you approve your proof at no charge. Once production has started, changes may not be possible or may incur an additional fee.",
      },
      {
        q: "How can I contact you with questions?",
        a: "You can reach us by email or Instagram DM. We try to respond to all questions within 24 hours.",
      },
      {
        q: "What are your business hours?",
        a: "Monday–Friday, 8–5. We don't work on holidays. We do our best to respond to messages outside those times as soon as possible.",
      },
    ],
  },
  {
    title: "About the business",
    items: [
      {
        q: "Are you a small/home-based business?",
        a: "Yes! We're a small, home-based business and we take pride in giving every order our attention and care. Thank you for supporting this small business!",
      },
      {
        q: "Do you take large quantity orders?",
        a: "Not currently, but we're working up to it! Since we're just starting out, we want to take it slow and work our way up. Be on the lookout for updates!",
      },
      {
        q: "Can I follow you on social media?",
        a: (
          <>
            We&apos;d love that! Find us{" "}
            <a
              href="https://instagram.com/supdawgcrafts"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-brand-pink"
            >
              @supdawgcrafts
            </a>{" "}
            on Instagram for our latest works, behind-the-scenes content, and updates!
          </>
        ),
      },
    ],
  },
];

function Item({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-brand-dark rounded-2xl bg-brand-cream overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg md:text-xl"
      >
        <span>{q}</span>
        <span
          className={`shrink-0 text-brand-pink text-2xl transition-transform ${open ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1 text-base text-brand-dark/85 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export function FaqContent() {
  return (
    <div className="relative overflow-hidden bg-brand-cream noise">
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl pointer-events-none" />

      <section className="relative mx-auto max-w-3xl px-4 md:px-6 pt-14 md:pt-20 text-center">
        <h1 className="mt-3 font-display text-5xl md:text-7xl leading-none">
          Frequently <span className="text-brand-pink">asked</span>
        </h1>
      </section>

      <div className="relative mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-16 space-y-12">
        {groups.map((group, gi) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.03 }}
          >
            <h2 className="font-display text-2xl md:text-3xl mb-4">{group.title}</h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <Item key={item.q} {...item} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <section className="relative mx-auto max-w-3xl px-4 md:px-6 pb-16 md:pb-24 text-center space-y-6">
        <h2 className="font-display text-3xl md:text-5xl leading-tight">
          Still have a question?
        </h2>
        <p className="text-base md:text-lg text-brand-dark/80 max-w-prose mx-auto">
          Reach out anytime at {email} and we&apos;ll get back to you within 24 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/custom-orders">Start a custom order</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
