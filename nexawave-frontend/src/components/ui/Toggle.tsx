import * as React from "react"
import { cn } from "@/utils/helpers"

interface ToggleProps {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass'
  size?: 'sm' | 'default' | 'lg'
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed, onPressedChange, children, className, variant = 'default', size = 'default' }, ref) => {
    const variants = {
      default: pressed 
        ? "bg-accent text-accent-foreground" 
        : "hover:bg-muted hover:text-muted-foreground",
      glass: pressed
        ? "backdrop-blur-md bg-white/30 border-white/40 text-white"
        : "backdrop-blur-sm bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
    }

    const sizes = {
      sm: "h-8 px-2 text-xs",
      default: "h-10 px-3 text-sm",
      lg: "h-11 px-4 text-base"
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        onClick={() => onPressedChange(!pressed)}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === 'glass' && "border",
          variants[variant],
          sizes[size],
          className
        )}
      >
        {children}
      </button>
    )
  }
)
Toggle.displayName = "Toggle"

export { Toggle }
