"use client"

import * as React from "react"
import { Button } from "@/Components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { Clock } from "lucide-react"

type TimePickerProps = {
  value?: Date
  onChange: (date?: Date) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  function updateTime(type: "h" | "m", val: number) {
    const date = value ? new Date(value) : new Date()

    if (type === "h") date.setHours(val)
    if (type === "m") date.setMinutes(val)

    onChange(date)
  }

  const format = (n: number) => n.toString().padStart(2, "0")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-empty={!value}
          className="w-full bg-stone-800 hover:bg-stone-950 p-5 border border-stone-500 font-normal data-[empty=true]:text-muted-foreground"
        >
          {value ? (
            `${format(value.getHours())}:${format(value.getMinutes())}`
          ) : (
            <span className="flex items-center gap-2">
              Pick time <Clock className="h-4 w-4" />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4 bg-stone-900 text-white border border-stone-500">
        <div className="flex gap-3">
          {/* HOURS */}
          <select
            className="bg-stone-800 border border-stone-600 rounded p-2"
            value={value?.getHours() ?? ""}
            onChange={(e) => updateTime("h", Number(e.target.value))}
          >
            <option value="" disabled>Hours</option>
            {hours.map(h => (
              <option key={h} value={h}>{format(h)}</option>
            ))}
          </select>

          {/* MINUTES */}
          <select
            className="bg-stone-800 border border-stone-600 rounded p-2"
            value={value?.getMinutes() ?? ""}
            onChange={(e) => updateTime("m", Number(e.target.value))}
          >
            <option value="" disabled>Minutes</option>
            {minutes.map(m => (
              <option key={m} value={m}>{format(m)}</option>
            ))}
          </select>

        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TimePicker;