import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-pink disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-brand-dark active:translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-brand-pink text-white shadow-[4px_4px_0_0_hsl(var(--brand-dark))] hover:shadow-[2px_2px_0_0_hsl(var(--brand-dark))] hover:translate-y-0.5 hover:translate-x-0.5",
        secondary:
          "bg-brand-purple text-white shadow-[4px_4px_0_0_hsl(var(--brand-dark))] hover:shadow-[2px_2px_0_0_hsl(var(--brand-dark))] hover:translate-y-0.5 hover:translate-x-0.5",
        outline:
          "bg-brand-cream text-brand-dark shadow-[4px_4px_0_0_hsl(var(--brand-dark))] hover:bg-white hover:shadow-[2px_2px_0_0_hsl(var(--brand-dark))] hover:translate-y-0.5 hover:translate-x-0.5",
        ghost:
          "border-transparent hover:bg-brand-pink/10 text-brand-dark active:translate-y-0",
        destructive:
          "bg-destructive text-white shadow-[4px_4px_0_0_hsl(var(--brand-dark))] hover:shadow-[2px_2px_0_0_hsl(var(--brand-dark))] hover:translate-y-0.5 hover:translate-x-0.5",
        link: "border-transparent text-brand-pink underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
