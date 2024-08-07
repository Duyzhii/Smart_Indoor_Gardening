"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
const sensorData = {
    "light-sensor": [
        { day: "Monday", data: 100 },
        { day: "Tuesday", data: 150 },
        { day: "Wednesday", data: 120 },
        { day: "Thursday", data: 180 },
        { day: "Friday", data: 130 },
        { day: "Saturday", data: 90 },
        { day: "Sunday", data: 110 },
    ],
    "soil-sensor": [
        { day: "Monday", data: 80 },
        { day: "Tuesday", data: 90 },
        { day: "Wednesday", data: 85 },
        { day: "Thursday", data: 95 },
        { day: "Friday", data: 88 },
        { day: "Saturday", data: 82 },
        { day: "Sunday", data: 10 },
    ],
};

const chartConfig = {
    data: {
        label: "Sensor Data", // Adjust The label for sensor name
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

// Props
interface HistoryByDayChartProps {
    sensorType: string;
}

export function HistoryByDayChart({ sensorType }: HistoryByDayChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Week Data</CardTitle>
                {/* <-- Adjust the date range --> */}
                <CardDescription>1/1 - 8/1 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={sensorData[sensorType]}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="data"
                            fill="var(--color-data)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    The parameters of each sensor for each day of the week{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                {/* <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    );
}
