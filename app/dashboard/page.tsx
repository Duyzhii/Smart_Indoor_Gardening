"use client";

import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import { requestData } from "../actions/mqttActions";
import { projectSensor } from "@/lib/data";
 
interface DynamicSensorData {
    time: string;
    last_time_updated: string;
    device_status?: string;
    chartData: { browser: string; value: number; fill: string };
}

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] =
        useState<string>("light");
    const [dynamicSensorData, setDynamicSensorData] = useState<
        Record<string, any>
    >({});

    const handleDeviceStatusChange = (
        sensorType: string,
        newStatus: boolean
    ) => {
        setDynamicSensorData((prevState) => ({
            ...prevState,
            [sensorType]: {
                ...prevState[sensorType],
                device_status: newStatus ? "On" : "Off",
            },
        }));
    };

    useEffect(() => {
        const fetchSensorData = async () => {
            const response = await requestData();

            // parse response data to DynamicSensorData
            const data = JSON.parse(response);

            const newSensorData: Record<string, DynamicSensorData> = {};

            for (const [key, value] of Object.entries(data)) {
                newSensorData[key] = {
                    // Get the current time and convert to string
                    time: new Date().toLocaleTimeString(),
                    last_time_updated: "2 minutes ago",
                    device_status: dynamicSensorData[key].device_status,
                    chartData: {
                        browser: "safari",
                        value: value as number,
                        fill: "var(--color-safari)",
                    },
                };
            }

            console.log("New Sensor Data: ", newSensorData);

            setDynamicSensorData(newSensorData);
        };

        fetchSensorData();
        const interval = setInterval(fetchSensorData, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 w-4/5 mx-auto">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <DataChart 
                sensor={projectSensor[selectedSensor]} 
                onDeviceStatusChange={handleDeviceStatusChange} 
            />
            <div className="flex gap-4 w-full">
                <DataBox
                    onSelectSensor={setSelectedSensor}
                />
            </div>
            <h1 className="text-3xl font-bold pt-5">Progress Tracking</h1>
            <Slider />
        </div>
    );
}

export default DashboardPage;
