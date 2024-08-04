"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  switchSize?: string
  thumbSize?: string
  translateX?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      switchSize = "h-6 w-11",
      thumbSize = "h-5 w-5",
      translateX = "translate-x-5",
      ...props
    },
    ref
  ) => (
    <SwitchPrimitives.Root
      className={cn(
        `peer inline-flex ${switchSize} shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:switch-checked data-[state=unchecked]:bg-input`,
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          `pointer-events-none block ${thumbSize} rounded-full bg-background shadow-lg ring-0 transition-transform`,
          {
            "data-[state=checked]:translate-x-5": translateX === "translate-x-5",
            "data-[state=checked]:translate-x-10": translateX === "translate-x-10",
            "data-[state=unchecked]:translate-x-0": true,
          }
        )}
      />
    </SwitchPrimitives.Root>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
