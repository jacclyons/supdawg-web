import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "h-6",
    md: "h-8 md:h-11",
    lg: "h-14 md:h-20",
    xl: "h-20 md:h-28",
  };
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/supdawg-logo-noshadow.svg"
      alt="SUPDAWG!"
      className={cn("w-auto block", sizes[size], className)}
    />
  );
}
