import { ProductGrid } from "@/components/shop/ProductGrid";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";

export const metadata = {
  title: "Shop — SUPDAWG!",
  description: "Patches, hoops, apparel, and accessories — handmade with hype.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
      <div className="mb-10 md:mb-14">
        <h1 className="font-display text-5xl md:text-7xl mt-2 leading-none">
          Loud little things, <span className="text-brand-purple">for your life.</span>
        </h1>
      </div>
      <ProductGrid products={SAMPLE_PRODUCTS} />
    </div>
  );
}
