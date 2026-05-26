export type ProductCategory = "patches" | "hoops" | "apparel" | "accessories" | "gifts";

export type Product = {
  id: string;
  stripe_product_id?: string | null;
  stripe_price_id?: string | null;
  name: string;
  description: string;
  price_cents: number;
  category: ProductCategory;
  image_url: string;
  gallery?: string[];
  slug: string;
  active: boolean;
  badge?: string | null;
};

export const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: "patches", label: "Patches" },
  { key: "hoops", label: "Hoop Art" },
  { key: "apparel", label: "Apparel" },
  { key: "accessories", label: "Accessories" },
  { key: "gifts", label: "Gifts" },
];

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
