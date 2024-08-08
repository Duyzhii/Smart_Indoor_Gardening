"use client";

import React, { useState, useEffect, useCallback } from "react";
import { publishMQTTMessage } from "@/app/actions/mqttActions";

import {
    TrendingUp,
    Sun,
    Lightbulb,
    LightbulbOff,
    Droplet,
    Power,
    PowerOff,
    Fan,
} from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Switch } from "@/components/ui/switch";
import { Sensor, ChartData } from "@/lib/definitions";


interface DataChartProps {
    sensor: Sensor;
    onDeviceStatusChange: (sensorType: string, status: boolean) => void;
}

const calculateAngle = (value: number, maxValue: number): number => {
    const angleRange = 360;
    return (value / maxValue) * angleRange;
};

const createChartConfig = (sensor: Sensor): ChartConfig => {
    const chartConfig = {
        value: {
            label: sensor.name,
        },
        safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
        },
    };

    return chartConfig;
}

// chartData: [{ browser: "safari", value: 150, fill: "var(--color-safari)" }],
const createChartData = (sensor: Sensor) : ChartData => {
    const chartData: ChartData = {
        browser: "safari",
        value: sensor.value.currentValue,
        fill: "var(--color-safari)",
    };

    return chartData;
}

export function DataChart({
    sensor,
    onDeviceStatusChange,
}: DataChartProps) {
    const topic = sensor.name;
    const [buttonStatus, setButtonStatus] = useState(false);
    const [status, setStatus] = useState("");
    
    const handlePublish = async (): Promise<void> => {
        try {
            const action = buttonStatus ? "OFF" : "ON";
            const result: string = await publishMQTTMessage(
                `${topic}_${action}`,
                topic
            );
            setButtonStatus(!buttonStatus);
            setStatus(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setStatus("Error: " + error.message);
            } else {
                setStatus("An unknown error occurred");
            }
        }
        console.log(status);
    };

    const max_angle = calculateAngle(sensor.value.currentValue, sensor.value.maxValue);

    const [switchStatus, setSwitchStatus] = useState<boolean>(
        sensor.control_device.status
    );

    useEffect(() => {
        setSwitchStatus(!sensor.control_device.status);
    }, [sensor.control_device.status]);

    const handleSwitchChange = (checked: boolean) => {
        setSwitchStatus(checked);
        onDeviceStatusChange(sensor.name, checked);
    };

    const dateTime = new Date().toLocaleTimeString() + " on " + new Date().toLocaleDateString();

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{sensor.name}</CardTitle>
                <CardDescription>{dateTime}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={createChartConfig(sensor)}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={[createChartData(sensor)]}
                        startAngle={0}
                        endAngle={max_angle}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar
                            dataKey="value"
                            background
                            cornerRadius={10}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {sensor.value.currentValue.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {sensor.unit_symbol}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>

            {sensor.control_device.name !== "" && (
                    <div className="flex flex-col items-center gap-2 p-4 pb-7">
                        <p className="p-2 pb-4 text-3xl font-semibold leading-none tracking-tight">
                            {sensor.control_device.name}
                        </p>
                        <div className="flex items-center">
                            {React.createElement(sensor.control_device.iconOn, { className: "mr-4 h-10 w-10" })}
                            <Switch
                                onClick={handlePublish}
                                className="mx-6"
                                switchSize="h-12 w-20"
                                thumbSize="h-9 w-9"
                                translateX={
                                    switchStatus
                                        ? "translate-x-10"
                                        : "translate-x-0"
                                }
                                checked={switchStatus}
                                onCheckedChange={handleSwitchChange}
                            />
                            {React.createElement(sensor.control_device.iconOff, { className: "mr-4 h-10 w-10" })}
                            </div>
                    </div>
                )}

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {sensor.unit_name} should be less than {sensor.value.normalValue}{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Updated {sensor.last_time_updated}
                </div>
            </CardFooter>
        </Card>
    );
}
export default DataChart;
