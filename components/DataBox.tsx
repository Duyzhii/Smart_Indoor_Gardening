"use client";

import { Sun, Thermometer, Droplets, Fan, Droplet } from "lucide-react";
import React from 'react';
import { buttonVariants } from './ui/button';
import { cn } from "@/lib/utils";

const links = [
  { name: "Light sensor", value: "100", unit: "lux", icon: "Sun", color: "yellow", device: "Light Bulb", status: "On" },
  { name: "Temperature sensor", value: "25", unit: "°C", icon: "Thermometer", color: "red", device: "Fan", status: "On" },
  { name: "Soil moisture sensor", value: "50", unit: "%", icon: "Droplets", color: "green", device: "Water Pump", status: "On" },
  { name: "Air quality sensor", value: "75", unit: "ppm", icon: "Fan", color: "blue", device: "Air Purifier", status: "On" },
  { name: "Humidity sensor", value: "60", unit: "%", icon: "Droplet", color: "blue", device: "Dehumidifier", status: "On" },
];

interface DataBoxProps {
  onSelectSensor: (sensorType: string) => void;
}

function DataBox({ onSelectSensor }: DataBoxProps) {
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {links.map((link) => (
        <div 
          key={link.name} 
          onClick={() => onSelectSensor(link.name)}
          className={cn(buttonVariants({
            variant: "outline",
            size: "lg",
          }), `!h-40 bg-${link.color}-100`)}
        >
          <div className='text-center justify-center'>
            <div className='flex justify-center mx-auto'>
              {link.icon === "Sun" && <Sun size={40} />}
              {link.icon === "Thermometer" && <Thermometer size={40} />}
              {link.icon === "Droplets" && <Droplets size={40} />}
              {link.icon === "Fan" && <Fan size={40} />}
              {link.icon === "Droplet" && <Droplet size={40} />}
            </div>
            <p>{link.name}</p>
            <p>{link.value} ({link.unit})</p>
            <p>{link.device}: {link.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DataBox;
