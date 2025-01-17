import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Loader } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  //[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        'outline-primary': 'border-[1.5px] border-primary-base/40 bg-primary-base/10 hover:bg-primary-base/20 text-primary-base',
        'primary': 'bg-primary-base text-white hover:bg-primary-base-hover',
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        'secondary-base': 'bg-secondary-base text-white hover:bg-secondary-base-hover',
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <div className="flex h-full w-full items-center justify-center">
          <Loader className="animate-spin w-5 h-5"/>
        </div> : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
