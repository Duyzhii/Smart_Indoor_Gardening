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
import { toast } from "react-hot-toast";

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
    suitable: 100,
    device: "Light bulb",
    maxValue: 200,
    minimum: 50,
    sensor_icon: Sun,
    device_icon_on: Lightbulb,
    device_icon_off: LightbulbOff,
    chartConfig: lightSensorChartConfig,
  },
  "Temperature sensor": {
    sensor: "Temperature sensor",
    title: "Temperature",
    physical_quantity: "°C",
    suitable: 25,
    device: "Air conditioner",
    maxValue: 50,
    minimum: 10,
    sensor_icon: undefined, 
    device_icon_on: undefined, 
    device_icon_off: undefined, 
    chartConfig: temperatureSensorChartConfig,
  },
  "Soil moisture sensor": {
    sensor: "Soil moisture sensor",
    title: "Soil moisture",
    physical_quantity: "%",
    suitable: 40,
    minimum: 10,
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
    suitable: 75,
    device: "Fan",
    minimum: 10,
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
    suitable: 60,
    minimum: 20,
    device: "Dehumidifier",
    maxValue: 100,
    sensor_icon: undefined, 
    device_icon_on: undefined, 
    device_icon_off: undefined, 
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

const getChartColor = (value: number, suitable: number, minimum: number): string => {
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
    return "LOW"
  } else if (value >= minimum && value <= suitable) {
    return "GOOD"
  } else {
    return "HIGH"
  }
}

const createNewChartConfig = (oldChartConfig: ChartConfig, value: number, suitable: number, minimum: number) => {
  const newChartConfig = { ...oldChartConfig };
  newChartConfig.safari.color = getChartColor(value, suitable, minimum);
  return newChartConfig;
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
    minimum,
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
  const sensor_status = getSensorStatus(chartData[0].value, minimum, suitable);

  const [switchStatus, setSwitchStatus] = useState<boolean>(device_status === "On");

  useEffect(() => {
    setSwitchStatus(device_status === "On");
  }, [device_status]);

  useEffect(() => {
    let type = "";
    let message = "";

    if (chartData[0].value > suitable) {
      type = "Alert_Over_Suitable_Value";
      message = `The ${sensor} value is over the suitable value (${chartData[0].value} > ${suitable}) \n
      Please turn off the ${device} to avoid damage.
      `;
      send (type, message);
    }

    else if (chartData[0].value < minimum) {
      type = "Alert_Under_Suitable_Value";
      message = `The ${sensor} value is under the minimum value (${chartData[0].value} < ${minimum}) \n
      Please turn on the ${device} to avoid damage.
      `;

      send (type, message);
    }
    
    else return;

  }, [chartData[0].value]);

  const send = async (type: string, message: string) => {
    console.log('Sending email...');
    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          receiver: "duyzhii@gmail.com",
          receiver_name: "Duy",
          user_message: message,
        }),
      });
      
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleSwitchChange = (checked: boolean) => {
    setSwitchStatus(checked);
    onDeviceStatusChange(sensorType, checked);

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString("vn-VN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    toast.success(
    `${device} - ${checked ? "ON" : "OFF"} 
    ${currentDate.toLocaleDateString()} - ${currentTime} `,
    {
      duration: 4000,
      icon: checked ? <Power /> : <PowerOff />,
    }
    );
  };

  const value = chartData[0].value;

  
  return (
    <Card className="flex flex-col rounded-2xl border-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>{sensor} ({physical_quantity})</CardTitle>
        <CardDescription>{time}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 m-3">
        <ChartContainer
          config={createNewChartConfig(chartConfig, value, suitable, minimum)}
          className="mx-auto aspect-square max-h-[200px]"
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
                      // <text
                      //   x={viewBox.cx}
                      //   y={viewBox.cy}
                      //   textAnchor="middle"
                      //   dominantBaseline="middle"                      >
                      //   <tspan
                      //     x={viewBox.cx}
                      //     y={viewBox.cy}
                      //     className = "fill-foreground text-4xl font-bold"
                      //   >
                      //     {chartData[0].value.toLocaleString()}
                      //   </tspan>
                      //   <tspan
                      //     x={(viewBox.cx || 0) + 40}
                      //     y={(viewBox.cy || 0) + 4}
                      //     className="fill-muted-foreground"
                      //   >
                      //     {physical_quantity}
                      //   </tspan>
                      // </text>
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {/* <tspan x={viewBox.cx} dy="0" className="fill-foreground text-4xl font-bold">
                          {chartData[0].value.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} dy="0" dx="3.5em" className="fill-muted-foreground">
                          {physical_quantity}
                        </tspan> */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 5}
                          className = "fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].value.toLocaleString()}
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

      {sensor !== "Temperature sensor" && sensor !== "Humidity sensor" && (
        <div className="flex flex-col items-center gap-2 pb-7">
          <p className="pb-4 text-2xl font-semibold leading-none tracking-tight">{device}</p>
          <div className="flex items-center">
            <DeviceIconOff className="mr-4 h-10 w-10" />
            <Switch
              className="mx-6"
              switchSize="h-12 w-20"
              thumbSize="h-9 w-9"
              translateX={switchStatus ? "translate-x-10" : "translate-x-0"}
              checked={switchStatus}
              onCheckedChange={
                handleSwitchChange
              }
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
