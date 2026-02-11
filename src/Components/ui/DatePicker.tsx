"use client"

import * as React from "react"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"

type DatePickerProps = {
  value?: Date
  onChange: (date?: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground font-normal w-full dark:text-white text-black
           hover:border-black bg-background dark:bg-stone-900 dark:hover:border-purple-950 rounded-md p-5 border-2"
        >
          {value ? format(value, "PPP") : (
            <span className="flex items-center gap-2">
              Pick a deadline <CalendarIcon />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;
