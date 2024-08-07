"use client";

import { TrendingUp, Sun, Lightbulb, LightbulbOff, Fan, Droplet, PowerOff, Power } from "lucide-react";
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
import { useEffect, useState } from "react";

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

const airQualitySensorChartConfig: ChartConfig = {
  value: {
    label: "Air Quality",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

const humiditySensorChartConfig: ChartConfig = {
  value: {
    label: "Humidity",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

const staticSensorData: Record<string, any> = {
  "Light sensor": {
    sensor: "Light sensor",
    title: "Light intensity",
    physical_quantity: "lux",
    suitable: "200",
    device: "Light bulb",
    maxValue: 200,
    sensor_icon: Sun,
    device_icon_on: Lightbulb,
    device_icon_off: LightbulbOff,
    chartConfig: lightSensorChartConfig,
  },
  "Temperature sensor": {
    sensor: "Temperature sensor",
    title: "Temperature",
    physical_quantity: "°C",
    suitable: "25",
    device: "Air conditioner",
    maxValue: 50,
    chartConfig: temperatureSensorChartConfig,
  },
  "Soil moisture sensor": {
    sensor: "Soil moisture sensor",
    title: "Soil moisture",
    physical_quantity: "%",
    suitable: "40",
    device: "Water Pump",
    maxValue: 100,
    sensor_icon: Droplet,
    device_icon_on: Power,
    device_icon_off: PowerOff,
    chartConfig: soilMoistureSensorChartConfig,
  },
  "Air quality sensor": {
    sensor: "Air quality sensor",
    title: "Air Quality",
    physical_quantity: "ppm",
    suitable: "75",
    device: "Fan",
    maxValue: 100,
    sensor_icon: Fan,
    device_icon_on: Power,
    device_icon_off: PowerOff,
    chartConfig: airQualitySensorChartConfig,
  },
  "Humidity sensor": {
    sensor: "Humidity sensor",
    title: "Humidity",
    physical_quantity: "%",
    suitable: "60",
    device: "Dehumidifier",
    maxValue: 100,
    chartConfig: humiditySensorChartConfig,
  },
};

interface DataChartProps {
  sensorType: string;
  dynamicData: any;
  onDeviceStatusChange: (sensorType: string, status: boolean) => void;
}

const calculateMaxAngle = (value: number, maxValue: number): number => {
  const angleRange = 360;
  return (value / maxValue) * angleRange;
};

export function DataChart({ sensorType, dynamicData, onDeviceStatusChange }: DataChartProps) {
  const staticData = staticSensorData[sensorType] || staticSensorData["Light sensor"];

  const {
    sensor,
    title,
    physical_quantity,
    suitable,
    device,
    maxValue,
    sensor_icon: SensorIcon,
    device_icon_on: DeviceIconOn,
    device_icon_off: DeviceIconOff,
    chartConfig,
  } = staticData;

  const {
    time,
    last_time_updated,
    device_status,
    chartData,
  } = dynamicData;

  const max_angle = calculateMaxAngle(chartData[0].value, maxValue);

  const [switchStatus, setSwitchStatus] = useState<boolean>(device_status === "On");

  useEffect(() => {
    setSwitchStatus(device_status === "On");
  }, [device_status]);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchStatus(checked);
    onDeviceStatusChange(sensorType, checked);
  };

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

      {sensor !== "Temperature sensor" && sensor !== "Humidity sensor" && (
        <div className="flex flex-col items-center gap-2 p-4 pb-7">
          <p className="p-2 pb-4 text-3xl font-semibold leading-none tracking-tight">{device}</p>
          <div className="flex items-center">
            <DeviceIconOff className="mr-4 h-10 w-10" />
            <Switch
              className="mx-6"
              switchSize="h-12 w-20"
              thumbSize="h-9 w-9"
              translateX={switchStatus ? "translate-x-10" : "translate-x-0"}
              checked={switchStatus}
              onCheckedChange={handleSwitchChange}
            />
            <DeviceIconOn className="ml-4 h-10 w-10" />
          </div>
        </div>
      )}

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {title} should be less than {suitable}{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Updated {last_time_updated} ago
                </div>
            </CardFooter>
        </Card>
    );
};
export default DataChart;
