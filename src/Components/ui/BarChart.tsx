"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/Components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { month: "January", desktop: 13 },
  { month: "February", desktop: 3 },
  { month: "March", desktop: 20 },
  { month: "April", desktop: 23 },
  { month: "May", desktop: 15 },
  { month: "June", desktop: 4 },
  { month: "July", desktop: 34 }
]

const chartConfig = {
  desktop: {
    label: "Tasks",
    color: "oklch(38.1% 0.176 304.987)"
  },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card className="bg-stone-950 border-stone-800 border-4 divBorderHover text-white">
      <CardHeader>
        <CardTitle>Tasks Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none">
          Showing total amount of tasks done per month in current year
        </div>
      </CardFooter>
    </Card>
  )
}
