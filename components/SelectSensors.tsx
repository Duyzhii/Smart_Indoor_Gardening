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
                    <SelectItem value="Light sensor">
                        Light Sensor
                    </SelectItem>
                    <SelectItem value="Temperature sensor">
                        Temperature Sensor
                    </SelectItem>
                    <SelectItem value= "Soil moisture sensor">
                        Soil Moisture Sensor
                    </SelectItem>
                    <SelectItem value="Humidity sensor">
                        Humidity Sensor
                    </SelectItem>
                    <SelectItem value = "Air quality sensor">
                        Air Quality Sensor
                    </SelectItem>
                    <SelectItem value = "PIR sensor">
                        PIR Sensor
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
