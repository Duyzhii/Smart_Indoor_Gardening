"use client";

import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import { projectSensor } from "@/lib/data";
import { Sensor } from "@/lib/definitions";
import { requestData } from "../actions/mqttActions";

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("light");
    const [dynamicSensorData, setDynamicSensorData] = useState<Record<string, Sensor>>(projectSensor);
    const [currentTime, setCurrentTime] = useState<string>("");

    const handleDeviceStatusChange = (sensorType: string, newStatus: boolean) => {
        setDynamicSensorData((prevData) => {
            const newsensorStatus = {
                ...prevData,
                [sensorType]: {
                    ...prevData[sensorType],
                    control_device: {
                        ...prevData[sensorType].control_device,
                        status: newStatus,
                    },  
                },
            };

            console.log("New sensor data: ", newsensorStatus);

            return newsensorStatus;
        }
    )};
   
    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                console.log("Fetching sensor data...");
                const response = await requestData();  // Fetch data from server
                const data = JSON.parse(response);  // Parse the JSON response
                
                let newSensorData: Record<string, Sensor> = {};
                
                setDynamicSensorData((prevData) => {
                    for (const [key, sensorValue] of Object.entries(data)) {
                        // Ensure sensor is defined
                        let sensor: Sensor = prevData[key] || { value: { currentValue: 0 } };  // Default to a new Sensor object if undefined
                        sensor.value.currentValue = sensorValue as number;  // Update sensor value
                        newSensorData[key] = sensor;  // Add updated sensor data to new state
                    }
                
                    return newSensorData;
                });
                
                console.log("New data: ", data);
                // setDynamicSensorData(newSensorData);  // Update state with new sensor data
            } catch (e) {
                console.error("Error parsing response: ", e);  // Handle cases where response is not valid JSON
            }
        };

        fetchSensorData();  // Initial data fetch
        const interval = setInterval(fetchSensorData, 5000);  // Fetch data every 5 seconds

    //     return () => clearInterval(interval);  // Clear interval on component unmount
    // }, [currentTime]);

    useEffect(() => {
        const updateTime = () => setCurrentTime(new Date().toLocaleTimeString());
        updateTime();  // Set initial time
        const updateDuration = 5 * 60 * 1000;  // Update time every 5 minutes
        const timeInterval = setInterval(updateTime, updateDuration);  // Update time every second

        return () => clearInterval(timeInterval);  // Clear interval on component unmount
    }, []);

    return (
        <div className="space-y-6 w-11/12 mx-auto">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <DataChart 
                sensor={dynamicSensorData[selectedSensor]} 
                onDeviceStatusChange={handleDeviceStatusChange} 
                dateTime={currentTime}  // Pass currentTime to DataChart
            />
            <div className="flex gap-4 w-full">
                <DataBox
                    dynamicSensorData={dynamicSensorData}
                    onSelectSensor={setSelectedSensor}
                />
            </div>
            <h1 className="text-3xl font-bold">Progress Tracking</h1>
            <Slider />
        </div>
    );
}

export default DashboardPage;
