"use client";

import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { projectSensor } from "@/lib/data";
import { Sensor } from "@/lib/definitions";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
interface DataBoxProps {
    onSelectSensor: (sensorType: string) => void;
}

const SensorCard: React.FC<{
    sensor: Sensor;
    onSelectSensor: (sensorType: string) => void;
}> = ({ sensor, onSelectSensor }) => {
    const color = sensor.icon.color;

    return (
        <div
            key={sensor.name}
            onClick={() => {
                // get the sensor key
                const sensorType = Object.keys(projectSensor).find(
                    (key) => projectSensor[key].name === sensor.name
                )?.toString() as string;
                onSelectSensor(sensorType);
            }}
            className={cn(
                buttonVariants({
                    variant: "databox",
                    size: "lg",
                }),
                `!h-48 bg-${sensor.icon.color}-100 flex flex-col justify-center items-center p-4 rounded-2xl solid-`
            )}
        >
            <div className="text-center leading-tight">
                <div className="flex justify-center mb-2">
                <div style={{ color }} className="text-4xl mr-4">
                    {React.createElement(sensor.icon.icon, {})}
                </div>
                </div>
                <p className="font-bold text-lg mb-1 break-words text-center">
                    {sensor.name}
                </p>
                <p className="text-xl mb-1">
                    <span className="font-extrabold text-2xl">{sensor.value.currentValue}</span>{" "}
                    <span className="text-base">({sensor.unit_symbol})</span>
                </p>
                {sensor.control_device.name && (
                    <div
                        className={`mt-2  rounded-2xl p-1 ${
                            sensor.control_device.status ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        <p className="text-xs text-white">
                            {sensor.control_device.name}: {sensor.control_device.status ? "On" : "Off"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const sensorWithoutControl = ["temperature", "humidity", "pir"];

function DataBox({ onSelectSensor }: DataBoxProps) {
    const topLinks = Object.keys(projectSensor).filter((s) => !sensorWithoutControl.includes(s));
    const bottomLinks = Object.keys(projectSensor).filter((s) => sensorWithoutControl.includes(s));

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-4 mb-4">
                {topLinks.map((s) => (
                    <SensorCard
                        key={s}
                        sensor={projectSensor[s]}
                        onSelectSensor={onSelectSensor}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {bottomLinks.map((s) => (
                    <SensorCard
                        key={s}
                        sensor={projectSensor[s]}
                        onSelectSensor={onSelectSensor}
                    />
                ))}
            </div>
        </div>
    );
}

export default DataBox;
