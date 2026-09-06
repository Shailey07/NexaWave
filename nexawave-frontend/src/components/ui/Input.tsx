import * as React from "react"
import { cn } from "@/utils/helpers"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'search'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    // Sab variants strictly White Background aur Dark Text par set kar diye hain
    const variants = {
      default: "border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400",
      glass: "border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400",
      search: "border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm"
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }