import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { CustomOrdersBanner } from "@/components/home/CustomOrdersBanner";
import { ContactForm } from "@/components/contact/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutTeaser />
      <GalleryStrip />
      <CustomOrdersBanner />
      <section className="relative overflow-hidden bg-brand-cream noise">
        <div className="relative mx-auto max-w-2xl px-4 md:px-6 py-12 md:py-18">
          <div className="text-center">
            <h2 className="mt-3 font-display text-5xl md:text-7xl leading-none">
              Reach out!
            </h2>
          </div>

          <div className="mt-10 md:mt-14">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
