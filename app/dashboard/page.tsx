"use client";

import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import { projectSensor } from "@/lib/data";
import { Sensor } from "@/lib/definitions";
import { requestData } from "../actions/mqttActions";
import { uploadSensorData } from "@/database/database";
import  GuideSlider  from "@/components/GuideSlider";

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("light");
    const [dynamicSensorData, setDynamicSensorData] = useState<Record<string, Sensor>>(projectSensor);

    console.log("Rebuilding...");

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

                // get current time with format: 2021-10-10 12:00:00 in Vietnam timezone 
                const currentTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
                console.log("Current time: ", currentTime);
                
                setDynamicSensorData((prevData) => {
                    for (const [key, sensorValue] of Object.entries(data)) {
                        let sensor: Sensor = prevData[key] || { value: { currentValue: 0 } };  // Default to a new Sensor object if undefined
                        sensor.value.currentValue = sensorValue as number;  // Update sensor value
                        sensor.last_time_updated = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
                        newSensorData[key] = sensor;  // Add updated sensor data to new state
                    }
                
                    return newSensorData;
                });
                
                // Get the data to be uploaded to the database
                const dataForUpload = Object.entries(newSensorData).map(([_, sensor]) => ({
                    sensorType: sensor.name,
                    value: sensor.value.currentValue,
                    controlDevice: sensor.control_device.name,
                    deviceStatus: sensor.control_device.status ? "ON" : "OFF",
                    timeReport: sensor.last_time_updated
                }));

                // Upload the new sensor data to the database
                await uploadSensorData(dataForUpload);
            } catch (e) {
                console.error("Error parsing response: ", e);  // Handle cases where response is not valid JSON
            }
        };

        fetchSensorData();  // Initial data fetch
        const interval = setInterval(fetchSensorData, 5000);  // Fetch data every 5 seconds

        return () => clearInterval(interval);  // Clear interval on component unmount
    }, []);

    return (
        <div className="space-y-6 w-11/12 mx-auto mb-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <DataChart 
                sensor={dynamicSensorData[selectedSensor]} 
                onDeviceStatusChange={handleDeviceStatusChange} 
            />
            <div className="flex gap-4 w-full">
                <DataBox
                    dynamicSensorData={dynamicSensorData}
                    onSelectSensor={setSelectedSensor}
                    selectedSensor = {selectedSensor}
                />
            </div>
            <h1 className="text-3xl font-bold">Progress Tracking</h1>
            <Slider />

            <h1 className="text-3xl font-bold">Guides</h1>
            <GuideSlider />

        </div>
    );
}

export default DashboardPage;
