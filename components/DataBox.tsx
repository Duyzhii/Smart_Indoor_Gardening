"use client";

import { Sun, Thermometer, Droplets, Fan, Droplet } from "lucide-react";
import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const staticData: Record<string, any> = {
    light: {
        name: "Light sensor",
        unit: "lux",
        icon: Sun,
        color: "yellow",
        device: "Light Bulb",
    },
    temperature: {
        name: "Temperature sensor",
        unit: "°C",
        icon: Thermometer,
        color: "red",
        device: "",
    },
    soil_moisture: {
        name: "Soil moisture sensor",
        unit: "%",
        icon: Droplets,
        color: "green",
        device: "Water Pump",
    },
    humidity: {
        name: "Humidity sensor",
        unit: "%",
        icon: Droplet,
        color: "blue",
        device: "",
    },
    air_quality: {
        name: "Air quality sensor",
        unit: "ppm",
        icon: Fan,
        color: "blue",
        device: "Fan",
    },
};
interface DataBoxProps {
    onSelectSensor: (sensorType: string) => void;
    dynamicData: Record<string, any>;
}

const SensorCard: React.FC<{
    sensor: string;
    data: any;
    onSelectSensor: (sensorType: string) => void;
}> = ({ sensor, data, onSelectSensor }) => {
    const { icon: Icon, color, unit, device, name } = staticData[sensor];
    const value = data.chartData?.value || "N/A";
    const status = data.device_status || "";

    return (
        <div
            key={sensor}
            onClick={() => onSelectSensor(sensor)}
            className={cn(
                buttonVariants({
                    variant: "databox",
                    size: "lg",
                }),
                `!h-48 bg-${color}-100 flex flex-col justify-center items-center p-4 rounded-2xl solid-`
            )}
        >
            <div className="text-center leading-tight">
                <div className="flex justify-center mb-2">
                    <Icon size={40} />
                </div>
                <p className="font-bold text-lg mb-1 break-words text-center">
                    {name}
                </p>
                <p className="text-xl mb-1">
                    <span className="font-extrabold text-2xl">{value}</span>{" "}
                    <span className="text-base">({unit})</span>
                </p>
                {device && (
                    <div
                        className={`mt-2  rounded-2xl p-1 ${
                            status === "On" ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        <p className="text-xs text-white">
                            {device}: {status}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

function DataBox({ onSelectSensor, dynamicData }: DataBoxProps) {
    const topLinks = Object.keys(staticData).filter(
        (sensor) =>
            sensor !== "Temperature sensor" && sensor !== "Humidity sensor"
    );

    const bottomLinks = Object.keys(staticData).filter(
        (sensor) =>
            sensor === "Temperature sensor" || sensor === "Humidity sensor"
    );

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-4 mb-4">
                {topLinks.map((sensor) => (
                    <SensorCard
                        key={sensor}
                        sensor={sensor}
                        data={dynamicData[sensor] || {}}
                        onSelectSensor={onSelectSensor}
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 w-2/3 mx-auto mb-16">
                {bottomLinks.map((sensor) => (
                    <SensorCard
                        key={sensor}
                        sensor={sensor}
                        data={dynamicData[sensor] || {}}
                        onSelectSensor={onSelectSensor}
                    />
                ))}
            </div>
        </div>
    );
}

export default DataBox;
