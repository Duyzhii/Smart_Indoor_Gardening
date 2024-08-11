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
                    <SelectItem value="Light-Sensor">Light Sensor</SelectItem>
                    <SelectItem value="Temperature-Sensor">
                        Temperature Sensor
                    </SelectItem>
                    <SelectItem value= "Soil-Moisture-Sensor">
                        Soil Moisture Sensor
                    </SelectItem>
                    <SelectItem value="Humidity-Sensor">
                        Humidity Sensor
                    </SelectItem>
                    <SelectItem value = "Air-Quality-Sensor">
                        Air Quality Sensor
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
