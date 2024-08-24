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
import { getSensorValueByDate } from "@/database/database";
import { use, useEffect, useState } from "react";

//Date Picker
// import {DatePicker, DateRangePicker} from "@nextui-org/react";
// import {DateValue, parseDate, getLocalTimeZone, CalendarDate, today} from "@internationalized/date";
// import {useDateFormatter} from "@react-aria/i18n";
// import { useState } from "react";

interface SensorData {
    day: string;
    data: number;
}

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
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {   
        const fetchData = async () => {
            try {
                const data = await getSensorValueByDate(sensorType, startDate, endDate);
                setSensorData(data);
                console.log("Sensor data: ", data);
            }
            catch (err) {
                setError(err as string);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sensorType, startDate, endDate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                    <BarChart accessibilityLayer data={sensorData}>
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