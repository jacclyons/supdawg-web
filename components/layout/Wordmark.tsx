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
    <span
      className={cn(
        "relative inline-block group wordmark-pop align-middle",
        sizes[size],
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/supdawg-logo-noshadow.svg"
        alt="SUPDAWG!"
        className="block h-full w-auto transition-opacity duration-150 ease-out group-hover:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/supdawg-logo-noshadow-blue.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-auto opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
      />
    </span>
  );
}
