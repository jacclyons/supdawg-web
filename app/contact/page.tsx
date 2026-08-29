import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = { title: "Contact | SUPDAWG!" };

export default function Page() {
  return (
    <section className="relative overflow-hidden bg-brand-cream noise">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-2xl px-4 md:px-6 py-12 md:py-18">
        <div className="text-center">
          <h1 className="mt-3 font-display text-5xl md:text-7xl leading-none">
            Reach out!
          </h1>
        </div>

        <div className="mt-10 md:mt-14">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
