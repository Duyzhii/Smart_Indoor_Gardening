"use client";

import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import { requestData } from "../actions/mqttActions";

interface DynamicSensorData {
    time: string;
    last_time_updated: string;
    device_status?: string;
    chartData: { browser: string; value: number; fill: string };
}

// {"light":384,"soil":371,"air":370,"PIR":0,"humidity":null,"temperature":null}

const initialDynamicSensorData = {
    light: {
        time: "4:20pm - 23/7/2024",
        last_time_updated: "2 minutes",
        device_status: "Off",
        chartData: {
            browser: "safari",
            value: 150,
            fill: "var(--color-safari)",
        },
    },
    temperature: {
        time: "4:20pm - 23/7/2024",
        last_time_updated: "2 minutes",
        chartData: {
            browser: "safari",
            value: 25,
            fill: "var(--color-safari)",
        },
    },
    soil: {
        time: "4:20pm - 23/7/2024",
        last_time_updated: "2 minutes",
        device_status: "On",
        chartData: {
            browser: "safari",
            value: 100,
            fill: "var(--color-safari)",
        },
    },
    air: {
        time: "4:20pm - 23/7/2024",
        last_time_updated: "2 minutes",
        device_status: "On",
        chartData: {
            browser: "safari",
            value: 75,
            fill: "var(--color-safari)",
        },
    },
    humidity: {
        time: "4:20pm - 23/7/2024",
        last_time_updated: "2 minutes",
        chartData: {
            browser: "safari",
            value: 60,
            fill: "var(--color-safari)",
        },
    },
};

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] =
        useState<string>("Light sensor");
    const [dynamicSensorData, setDynamicSensorData] = useState<
        Record<string, any>
    >(initialDynamicSensorData);

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
            console.log("Data: ", data);

            const newSensorData: Record<string, DynamicSensorData> = {};

            for (const [key, value] of Object.entries(data)) {
                newSensorData[key] = {
                    time: "4:20pm - 23/7/2024",
                    last_time_updated: "2 minutes",
                    device_status: "On",
                    chartData: {
                        browser: "safari",
                        value: value as number,
                        fill: "var(--color-safari)",
                    },
                };

                console.log("Key: ", key, " | Value: ", value);
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
