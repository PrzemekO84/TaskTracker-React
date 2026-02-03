import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number
  max?: number
}

function Progress({
  className,
  value = 0,
  max = 5,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-6 w-full overflow-hidden rounded-full mb-0.5 border-3 border-stone-800",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-purple-800 h-full w-full transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }