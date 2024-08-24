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

//Date Picker
// import {DatePicker, DateRangePicker} from "@nextui-org/react";
// import {DateValue, parseDate, getLocalTimeZone, CalendarDate, today} from "@internationalized/date";
// import {useDateFormatter} from "@react-aria/i18n";
// import { useState } from "react";

interface SensorData {
    day: string;
    data: number;
}

interface SensorDataMap {
    [key: string]: SensorData[];
}

const sensorData: SensorDataMap = {
    "Light-Sensor": [
        { day: "Monday", data: 100 },
        { day: "Tuesday", data: 150 },
        { day: "Wednesday", data: 120 },
        { day: "Thursday", data: 180 },
        { day: "Friday", data: 130 },
        { day: "Saturday", data: 90 },
        { day: "Sunday", data: 110 },
    ],
    "Temperature-Sensor": [
        { day: "Monday", data: 80 },
        { day: "Tuesday", data: 90 },
        { day: "Wednesday", data: 85 },
        { day: "Thursday", data: 95 },
        { day: "Friday", data: 88 },
        { day: "Saturday", data: 82 },
        { day: "Sunday", data: 10 },
    ],
    "Soil-Moisture-Sensor": [
        { day: "Monday", data: 45 },
        { day: "Tuesday", data: 50 },
        { day: "Wednesday", data: 55 },
        { day: "Thursday", data: 60 },
        { day: "Friday", data: 65 },
        { day: "Saturday", data: 70 },
        { day: "Sunday", data: 75 },
    ],
    "Humidity-Sensor": [
        { day: "Monday", data: 60 },
        { day: "Tuesday", data: 62 },
        { day: "Wednesday", data: 64 },
        { day: "Thursday", data: 66 },
        { day: "Friday", data: 68 },
        { day: "Saturday", data: 70 },
        { day: "Sunday", data: 72 },
    ],
    "Air-Quality-Sensor": [
        { day: "Monday", data: 40 },
        { day: "Tuesday", data: 45 },
        { day: "Wednesday", data: 50 },
        { day: "Thursday", data: 55 },
        { day: "Friday", data: 60 },
        { day: "Saturday", data: 65 },
        { day: "Sunday", data: 70 },
    ],
};

const chartConfig = {
    data: {
        label: "Sensor Data",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

// Props
interface HistoryByDayChartProps {
    sensorType: string;
    startDate: string;
    endDate: string;
}

// export default function PickDate() {
//     const [to, setTo] = useState<DateValue>(parseDate("2024-04-04"));
//     const [from, setFrom] = useState<DateValue>(parseDate("2024-04-04"));

//     let formatter = useDateFormatter({dateStyle: "full"});
  
//     return (
//       <div className="flex flex-row gap-4">
//         <div className="w-full flex flex-col">
//           <DatePicker 
//             className="max-w-[284px] justify-center align-middle border-2 rounded-2xl" 
//             label="From"
//             value={from} 
//             onChange={setFrom}
//             defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })} 
//             maxValue={to}
//             isInvalid = {from > to}
//             errorMessage = "From date must be before To date"
//             variant = "faded"
//             isRequired
            
//         />
//         </div>
//         <DatePicker 
//             className="max-w-[300px] border-2 rounded-2xl"
//             label="To" 
//             value = {to} 
//             onChange={setTo}
//             maxValue = {today(getLocalTimeZone())}            
//             defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
//             isInvalid = {to < from || to > today(getLocalTimeZone())}
//             errorMessage ={(to < from) ? "To date must be after From date" : "To date must be before today"}
//             isRequired
//             calendarProps={{
//                 classNames: {
//                     base: "bg-background border-2 rounded-2xl",

//                 }
//             }}
//          />
//       </div>      
//     );

// }
  

export function HistoryByDayChart({ sensorType, startDate, endDate }: HistoryByDayChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="mx-auto pb-5 ">
                    {sensorType.replace(/-/g, " ")}
                </CardTitle>
                <CardDescription className = "w-3/5 mx-auto">
                    {/* <PickDate /> */}
                    {startDate} - {endDate}
                </CardDescription>
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
            </CardFooter>
        </Card>
    );
}