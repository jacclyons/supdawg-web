import type { Product } from "./types";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "wassup-patch",
    name: "WASSUP! Iron-On Patch",
    description:
      "Hand-embroidered, iron-on, big mood. Slap it on a jean jacket and call it a day. 3\" wide, made with love and 100% chunky thread.",
    price_cents: 1800,
    category: "patches",
    image_url:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606293459339-29307f0e8e3b?q=80&w=1200&auto=format&fit=crop",
    ],
    active: true,
    badge: "BESTSELLER",
  },
  {
    id: "p2",
    slug: "hot-pink-hoop",
    name: "Hot Pink Daisy Hoop",
    description:
      "6-inch hoop art. One-of-one. Backed with felt, signed by Allie. Looks great on a gallery wall or a tiny shelf.",
    price_cents: 4800,
    category: "hoops",
    image_url:
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1200&auto=format&fit=crop",
    ],
    active: true,
    badge: "NEW",
  },
  {
    id: "p3",
    slug: "supdawg-tee",
    name: "SUPDAWG! Logo Tee",
    description:
      "Heavyweight cotton tee with the SUPDAWG! wordmark stitched front and center. Unisex. Runs true.",
    price_cents: 3500,
    category: "apparel",
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    ],
    active: true,
  },
  {
    id: "p4",
    slug: "lil-bag-charm",
    name: "Lil' Bag Charm",
    description:
      "Tiny embroidered charm with a sturdy clip. Perfect on a backpack, tote, or keys. Comes in 4 colors.",
    price_cents: 1200,
    category: "accessories",
    image_url:
      "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?q=80&w=1200&auto=format&fit=crop",
    ],
    active: true,
  },
  {
    id: "p5",
    slug: "smiley-patch-set",
    name: "Smiley Patch Set (3)",
    description: "Three little smileys. One pink, one purple, one cream. Iron-on. Stick 'em anywhere.",
    price_cents: 2400,
    category: "patches",
    image_url:
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop",
    ],
    active: true,
  },
  {
    id: "p6",
    slug: "mama-hoop",
    name: "\"MAMA\" Hoop",
    description: "8-inch hoop, hand-stitched MAMA in chunky letters. Comes ready to hang.",
    price_cents: 5800,
    category: "hoops",
    image_url:
      "https://images.unsplash.com/photo-1582719478173-de27d2c69b73?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582719478173-de27d2c69b73?q=80&w=1200&auto=format&fit=crop",
    ],
    active: true,
  },
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478173-de27d2c69b73?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606293459339-29307f0e8e3b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581557991964-7afa1bfe4f49?q=80&w=1200&auto=format&fit=crop",
];
