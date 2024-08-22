"use client";

import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import { projectSensor } from "@/lib/data";
import { Sensor } from "@/lib/definitions";
import { requestSensorData, requestControlDeviceData } from "../actions/mqttActions";
import { uploadControlDeviceData } from "@/database/database";
import  GuideSlider  from "@/components/GuideSlider";
import { ControlDeviceData } from "@/lib/definitions";
import { controlDeviceName } from "@/lib/data";
import { toast } from "react-hot-toast";

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("light");
    const [dynamicSensorData, setDynamicSensorData] = useState<Record<string, Sensor>>(projectSensor);
    const [controlMode, setControlMode] = useState<string>("manual");
    console.log("Rebuilding...");

    const handleDeviceStatusChange = (sensorType: string, newStatus: boolean) => {
        // Only allow changes in manual mode
        if (controlMode == "manual") {
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
    
                // Upload new control device status to database
                const controlDeviceData : ControlDeviceData[] = [{
                    id: 1,
                    deviceType: sensorType,
                    status: newStatus,
                    timeReport: new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}),
                }]
                uploadControlDeviceData(controlDeviceData);
    
                return newsensorStatus;
            })
        }
        else {
            // Create toast message
            toast.error("You cannot control the device while using the Automatic Mode");
            toast.error("Device status cannot be changed in automatic mode");
        }
    };

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                console.log("Fetching sensor data...");
                const sensorResponse = await requestSensorData();  // Fetch sensor data from server
                const controlDeviceResponse = await requestControlDeviceData();  // Fetch control device data from server

                console.log("Sensor response: ", sensorResponse);
                console.log("Control Device response: ", controlDeviceResponse);
                
                const sensorData = JSON.parse(sensorResponse);  // Parse the JSON response
                const controlDeviceData = JSON.parse(controlDeviceResponse);  // Parse the JSON response
                
                let newDynamicData: Record<string, Sensor> = {};

                // get current time with format: 2021-10-10 12:00:00 in Vietnam timezone 
                const currentTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
                console.log("Current time: ", currentTime);
                
                setDynamicSensorData((prevData) => {
                    for (const [key, sensorValue] of Object.entries(sensorData)) {
                        let sensor: Sensor = prevData[key] || { value: { currentValue: 0 } };  // Default to a new Sensor object if undefined
                        sensor.value.currentValue = sensorValue as number;  // Update sensor value
                        sensor.last_time_updated = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});

                        // get the sensor key of control device
                        for (const [cd_key, controlDeviceValue] of Object.entries(controlDeviceData)) {
                            if (controlDeviceName[cd_key].sensor == key) {
                                sensor.control_device.status = controlDeviceValue as boolean;
                            }
                        }
                        
                        newDynamicData[key] = sensor;  // Add updated sensor data to new state
                    }
                
                    return newDynamicData;
                });
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
