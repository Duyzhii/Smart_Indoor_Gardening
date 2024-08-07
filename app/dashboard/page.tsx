"use client";

import DataBox from "@/components/DataBox";
import { DataChart } from "@/components/DataChart";
import { useState } from "react";
import  Slider from "@/components/Slider";

const initialDynamicSensorData = {
  "Light sensor": {
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    device_status: "Off",
    chartData: [{ browser: "safari", value: 150, fill: "var(--color-safari)" }],
  },
  "Temperature sensor": {
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    chartData: [{ browser: "safari", value: 25, fill: "var(--color-safari)" }],
  },
  "Soil moisture sensor": {
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    device_status: "On",
    chartData: [{ browser: "safari", value: 100, fill: "var(--color-safari)" }],
  },
  "Air quality sensor": {
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    device_status: "On",
    chartData: [{ browser: "safari", value: 75, fill: "var(--color-safari)" }],
  },
  "Humidity sensor": {
    time: "4:20pm - 23/7/2024",
    last_time_updated: "2 minutes",
    chartData: [{ browser: "safari", value: 60, fill: "var(--color-safari)" }],
  },
};

function DashboardPage() {
  const [selectedSensor, setSelectedSensor] = useState<string>("Light sensor");
  const [dynamicSensorData, setDynamicSensorData] = useState<Record<string, any>>(initialDynamicSensorData);

  const handleDeviceStatusChange = (sensorType: string, newStatus: boolean) => {
    setDynamicSensorData(prevState => ({
      ...prevState,
      [sensorType]: {
        ...prevState[sensorType],
        Ưdevice_status: newStatus ? "On" : "Off"
      }
    }));
  };

  return (
    <div className="space-y-6 w-4/5 mx-auto">
      <Slider />
      <DataChart 
        sensorType={selectedSensor} 
        dynamicData={dynamicSensorData[selectedSensor]} 
        onDeviceStatusChange={handleDeviceStatusChange} 
      />
      <div className="flex gap-4 w-full">
        <DataBox 
          onSelectSensor={setSelectedSensor} 
          dynamicData={dynamicSensorData} 
        />
      </div>
    </div>
  );
}

export default DashboardPage;
