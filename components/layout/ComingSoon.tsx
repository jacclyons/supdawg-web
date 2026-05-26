import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-24 md:py-32 text-center">
      <p className="font-display uppercase text-sm tracking-widest text-brand-pink">
        Coming soon
      </p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl leading-none">{title}</h1>
      {description && (
        <p className="mt-6 text-lg text-brand-dark/80 max-w-prose mx-auto">
          {description}
        </p>
      )}
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/">Back to the noise</Link>
        </Button>
      </div>
    </div>
  );
}
