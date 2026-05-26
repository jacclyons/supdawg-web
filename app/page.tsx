import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { CustomOrdersBanner } from "@/components/home/CustomOrdersBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutTeaser />
      <GalleryStrip />
      <CustomOrdersBanner />
    </>
  );
}
