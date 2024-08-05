import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface SelectSensorsProps {
    setSelectedSensor: (value: string) => void;
}
export function SelectSensors({ setSelectedSensor }: SelectSensorsProps) {
    return (
        <Select onValueChange={(e) => setSelectedSensor(e)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a sensor" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sensors</SelectLabel>
                    <SelectItem value="light-sensor">Light Sensor</SelectItem>
                    <SelectItem value="soil-sensor">
                        Soil Moisture Sensor
                    </SelectItem>
                    <SelectItem value="air-quality-sensor">
                        Air Quality Sensor
                    </SelectItem>
                    <SelectItem value="temperature-sensor">
                        Temperature Sensor
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
