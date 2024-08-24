"use client";

import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { projectSensor } from "@/lib/data";
import { Sensor } from "@/lib/definitions";
import ShineBorder from "./magicui/shine-border";

interface DataBoxProps {
    dynamicSensorData: Record<string, Sensor>;
    onSelectSensor: (sensorType: string) => void;
    selectedSensor: string;
}

const SensorCard: React.FC<{
    sensor: Sensor;
    onSelectSensor: (sensorType: string) => void;
    isSelected: boolean;
}> = ({ sensor, onSelectSensor, isSelected }) => { 
    const color = sensor.icon.color;

    const sensorName = sensor.name.replace(" sensor", "")
    console.log(sensorName)
    
    
    const content = (
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
                `!h-48 bg-${sensor.icon.color}-100 flex flex-col justify-center items-center p-4`,
                {
                    "border-2 rounded-2xl": !isSelected,
                    "border-none": isSelected,
                }
            )}
        >
            <div className="text-center justify-center leading-tight">
                <div className="flex justify-center mb-2">
                    <div style={{ color, width: '32px', height: '32px'}} className="text-4xl">
                        {React.createElement(sensor.icon.icon, { className: "h-9 w-9" })}
                    </div>
                </div>
                <p className="font-bold text-lg mb-1 break-words text-center">
                    {sensorName}
                </p>
                <p className="text-xl mb-1">
                    <span className="font-extrabold text-2xl">{sensor.value.currentValue}</span> <span className="text-base">{sensor.unit_symbol}</span>
                </p>
                {sensor.control_device.name && (
                    <div
                        className={`inline-block mt-2 rounded-2xl p-2 px-4 ${
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

    return isSelected ? (
        // <div className = "!h48 flex flex-col justify-center items-center p-4">
            <ShineBorder
                borderRadius={16}
                borderWidth={3}
                duration={14}
                color={color}
                className="w-full !h-48 flex flex-col justify-center items-center p-4"
            >
                {content}
            </ShineBorder>
        // </div>
    ) : (
        content
    );
};


const sensorWithoutControl = ["temperature", "humidity", "PIR"];

function DataBox({ dynamicSensorData, onSelectSensor, selectedSensor }: DataBoxProps & { selectedSensor: string }) {
    const topLinks = Object.keys(projectSensor).filter((s) => !sensorWithoutControl.includes(s));
    const bottomLinks = Object.keys(projectSensor).filter((s) => sensorWithoutControl.includes(s));

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-4 mb-4">
                {topLinks.map((s) => (
                    <SensorCard
                        key={s}
                        sensor={dynamicSensorData[s]}
                        onSelectSensor={onSelectSensor}
                        isSelected={s === selectedSensor} 
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {bottomLinks.map((s) => (
                    <SensorCard
                        key={s}
                        sensor={dynamicSensorData[s]}
                        onSelectSensor={onSelectSensor}
                        isSelected={s === selectedSensor}
                    />
                ))}
            </div>
        </div>
    );
}

export default DataBox;