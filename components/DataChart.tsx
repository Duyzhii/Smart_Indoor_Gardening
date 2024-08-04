"use client";

import { TrendingUp, Sun, Lightbulb, LightbulbOff } from "lucide-react";
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

const lightSensorChartData = [
  { browser: "safari", value: 150, fill: "var(--color-safari)" }, 
];

const temperatureSensorChartData = [
  { browser: "safari", value: 25, fill: "var(--color-safari)" }, 
];

const soilMoistureSensorChartData = [
  { browser: "safari", value: 100, fill: "var(--color-safari)" }, 
];

const lightSensorChartConfig: ChartConfig = {
  value: {
    label: "Light Intensity",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

const temperatureSensorChartConfig: ChartConfig = {
  value: {
    label: "Temperature",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

const soilMoistureSensorChartConfig: ChartConfig = {
  value: {
    label: "Soil Moisture",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

const sensorData: Record<string, any> = {
  "Light sensor": {
    sensor: "Light sensor",
    title: "Light intensity",
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    physical_quantity: "lux",
    suitable: "200",
    device: "Light bulb",
    device_status: "On",
    chartData: lightSensorChartData,
    chartConfig: lightSensorChartConfig,
    sensor_icon: Sun,
    max_angle: 200,
    device_icon_on: Lightbulb,
    device_icon_off: LightbulbOff,
  },
  "Temperature sensor": {
    sensor: "Temperature sensor",
    title: "Temperature",
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    physical_quantity: "°C",
    suitable: "25",
    device: "Air conditioner",
    device_status: "On",
    chartData: temperatureSensorChartData,
    chartConfig: temperatureSensorChartConfig,
    sensor_icon: Sun,
    max_angle: 200,
    device_icon_on: Lightbulb,
    device_icon_off: LightbulbOff,
  },
  "Soil moisture sensor": {
    sensor: "Soil moisture sensor",
    title: "Soil moisture",
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    physical_quantity: "%",
    suitable: "40",
    device: "Water pump",
    device_status: "On",
    max_angle: 200,
    chartData: soilMoistureSensorChartData,
    chartConfig: soilMoistureSensorChartConfig,
    sensor_icon: Sun,
    device_icon_on: Lightbulb,
    device_icon_off: LightbulbOff,
  },
};

interface DataChartProps {
  sensorType: string;
}

export function DataChart({ sensorType }: DataChartProps) {
  const data = sensorData[sensorType] || sensorData["Light sensor"]; // Default to "Light sensor" if sensorType is not found

  const {
    sensor,
    title,
    time,
    last_time_updated,
    physical_quantity,
    suitable,
    device,
    device_status,
    max_angle,
    chartData,
    chartConfig,
    sensor_icon: SensorIcon,
    device_icon_on: DeviceIconOn,
    device_icon_off: DeviceIconOff,
  } = data;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{sensor}</CardTitle>
        <CardDescription>{time}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
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
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          {chartData[0].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {physical_quantity}
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

      <div className="flex flex-col items-center gap-2 p-4 pb-7">
        <p className="p-2 pb-4 text-3xl font-semibold leading-none tracking-tight">{device}</p>
        <div className="flex items-center">
          <DeviceIconOff className="mr-4 h-10 w-10" />
          <Switch className="mx-6"
            switchSize="h-12 w-20"
            thumbSize="h-9 w-9"
            translateX="translate-x-10"
          />
          <DeviceIconOn className="ml-4 h-10 w-10" />
        </div>  
      </div>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {title} should be less than {suitable} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Updated {last_time_updated} ago
        </div>
      </CardFooter>
    </Card>
  );
}
