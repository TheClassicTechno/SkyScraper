"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, checked = false, onCheckedChange, className }, ref) => {
    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          checked && "bg-blue-600 border-blue-600",
          !checked && "bg-white border-gray-300",
          className
        )}
        data-state={checked ? "checked" : "unchecked"}
      >
        {checked && (
          <Check className="h-3 w-3 text-white" />
        )}
      </button>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox } 