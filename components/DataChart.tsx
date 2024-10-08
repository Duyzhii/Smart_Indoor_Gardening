"use client";

import {
    TrendingUp,
    Power,
    PowerOff,
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

import React, { useState, useEffect } from "react";
import { publishMQTTMessage } from "@/app/actions/mqttActions";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Switch } from "@/components/ui/switch";
import { Sensor, ChartData } from "@/lib/definitions";
import toast from "react-hot-toast";
import { projectSensor } from "@/lib/data";
import Particles from "@/components/magicui/particles";

interface DataChartProps {
    sensor: Sensor;
    onDeviceStatusChange: (sensorType: string, status: boolean) => void;
    manualMode: boolean;
}

const getSensorType = (name: string): string => {
    return Object.keys(projectSensor).find(
        (key) => projectSensor[key].name === name
    ) as string;
};

const calculateAngle = (value: number, maxValue: number): number => {
    const angleRange = 360;
    return (value / maxValue) * angleRange;
};

const createChartConfig = (sensor: Sensor): ChartConfig => {
    let new_color = getChartColor(sensor.value.currentValue, sensor.value.minValue, sensor.value.normalValue);

    const chartConfig = {
        value: {
            label: sensor.name,
        },
        safari: {
            label: "Safari",
            color: new_color,
        },
    };

    return chartConfig;
};

const createChartData = (sensor: Sensor): ChartData => {
    const chartData: ChartData = {
        browser: "safari",
        value: sensor.value.currentValue,
        fill: "var(--color-safari)",
    };

    return chartData;
};

const getChartColor = (value: number, minimum: number, suitable: number): string => {
    if (value < minimum) {
        return '#FFA500'; // Orange color for values less than minimum
    } else if (value >= minimum && value <= suitable) {
        return 'hsl(var(--chart-2))'; // Green color (custom property) for values between minimum and suitable
    } else {
        return '#FF0000'; // Red color for values greater than suitable
    }
};

const getSensorStatus = (value: number, minimum: number, suitable: number): string => {
    if (value < minimum) {
        return "LOW";
    } else if (value >= minimum && value <= suitable) {
        return "GOOD";
    } else {
        return "HIGH";
    }
};

export function DataChart({
    sensor,
    onDeviceStatusChange,
    manualMode,
}: DataChartProps) {
    const [buttonStatus, setButtonStatus] = useState<boolean>(sensor.control_device.status);

    useEffect(() => {
        setButtonStatus(sensor.control_device.status);
    }, [sensor.control_device.status]);

    const max_angle = calculateAngle(sensor.value.currentValue, sensor.value.maxValue);
    const sensor_status = getSensorStatus(sensor.value.currentValue, sensor.value.minValue, sensor.value.normalValue);

    const handleSwitchChange = (checked: boolean) => {
        const sensorType = getSensorType(sensor.name);
        onDeviceStatusChange(sensorType, checked);

        if (!manualMode) return;

        setButtonStatus(checked);
        // Publish MQTT message
        console.log("Publishing MQTT message...");
        publishMQTTMessage(checked ? "ON" : "OFF", sensor.control_device.name);

        // get current time with format: 12:00:00 in Vietnam timezone
        const dateTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}).split(", ")[1];

        if (checked) {
            toast.success(
                `The ${sensor.control_device.name} is now ${checked ? "ON" : "OFF"} 
                at ${dateTime}`,
                {
                    duration: 5000,
                }
            );
       }
       else {
            toast.error(
                `The ${sensor.control_device.name} is now ${checked ? "ON" : "OFF"} 
                at ${dateTime}`,
                {
                    duration: 5000,
                }
            );
       }
    };

    return (
        <Card className="relative flex flex-col border-2 rounded-2xl">
            <Particles
                className="absolute inset-0 pointer-events-none z-0"
                quantity={300}
                size = {0.7}
                staticity= {50}
            />
            <CardHeader className="relative z-10 items-center pb-0">
                <CardTitle>{sensor.name} ({sensor.unit_symbol})</CardTitle>
                <CardDescription className="text-center mx-auto max-w-full">{sensor.control_device.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 flex-1 pb-0">
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
                                                    y={(viewBox.cy || 0) - 5}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {sensor.value.currentValue?.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={(viewBox.cx || 0)}
                                                    y={(viewBox.cy || 0) + 25}
                                                    className="fill-muted-foreground text-lg"
                                                >
                                                    {sensor_status}
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
                <div className="relative z-10 flex flex-col items-center gap-2 pb-7">
                    <p className="pb-4 text-3xl font-semibold leading-none tracking-tight">
                        {sensor.control_device.name}
                    </p>
                    <div className="flex items-center">
                        <div className="mr-9">
                            {React.createElement(sensor.control_device.iconOn, { className: "h-10 w-10" })}
                        </div>
                        <Switch
                            className="mx-auto"
                            switchSize="h-12 w-20"
                            thumbSize="h-9 w-9"
                            translateX={
                                buttonStatus
                                    ? "translate-x-10"
                                    : "translate-x-0"
                            }
                            checked={buttonStatus}
                            onCheckedChange={handleSwitchChange}
                        />
                        <div className="ml-9">
                            {React.createElement(sensor.control_device.iconOff, { className: "h-10 w-10" })}
                        </div>
                    </div>
                </div>
            )}

            <CardFooter className="relative z-10 flex-col gap-2 text-sm">
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
