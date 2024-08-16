"use client";

import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import { plantData, projectSensor } from "@/lib/data";
import { Sensor } from "@/lib/definitions";
import { requestData } from "../actions/mqttActions";
import { getSensorData, uploadHistoryData, uploadSensorData } from "@/database/database";
import PlantCard from "@/components/PlantCard";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("light");
    const [dynamicSensorData, setDynamicSensorData] = useState<Record<string, Sensor>>(projectSensor);
    const [currentTime, setCurrentTime] = useState<string>("");
    const updateHistoryData = uploadHistoryData.bind(
        null,
        dynamicSensorData
    );

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
                
                setDynamicSensorData((prevData) => {
                    for (const [key, sensorValue] of Object.entries(data)) {
                        let sensor: Sensor = prevData[key] || { value: { currentValue: 0 } };  // Default to a new Sensor object if undefined
                        sensor.value.currentValue = sensorValue as number;  // Update sensor value
                        sensor.last_time_updated = new Date().toISOString();  // Add timestamp
                        newSensorData[key] = sensor;  // Add updated sensor data to new state
                    }
                
                    return newSensorData;
                });
                
                console.log("New data: ", data);

                const dataForUpload = Object.entries(newSensorData).map(([sensorType, sensor]) => ({
                    sensorType: sensor.name,
                    value: sensor.value.currentValue,
                    controlDevice: sensor.control_device.name,
                    deviceStatus: sensor.control_device.status ? "ON" : "OFF",
                    timeReport: sensor.last_time_updated
                }));

                // Upload the new sensor data to the database
                await uploadSensorData(dataForUpload);
                const historyData = await getSensorData();

                console.log("History data: ", historyData);

            } catch (e) {
                console.error("Error parsing response: ", e);  // Handle cases where response is not valid JSON
            }
        };

        fetchSensorData();  // Initial data fetch
        const interval = setInterval(fetchSensorData, 5000);  // Fetch data every 5 seconds

        return () => clearInterval(interval);  // Clear interval on component unmount
    }, [currentTime]);

    useEffect(() => {
        const updateTime = () => setCurrentTime(new Date().toLocaleTimeString());
        updateTime();  // Set initial time
        const updateDuration = 5 * 60 * 1000;  // Update time every 5 minutes
        const timeInterval = setInterval(updateTime, updateDuration);  // Update time every second

        return () => clearInterval(timeInterval);  // Clear interval on component unmount
    }, []);

    const plants = plantData.map((plant, index) => (
        <div className="carousel-item w-full" id={index.toString()} key={index}>
            <PlantCard
                key={index}
                name={plant.name}
                imageUrl={plant.image}
                specifications={plant.specifications}
            />
        </div>
    ));

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
            <h1 className="text-3xl font-bold">Plant Showcase</h1> 
            <div className="flex flex-col items-center justify-center h-full">
                <div className="carousel w-full">{plants}</div>
                <div className="flex w-full justify-center gap-2 py-2">
                    {plantData.map((_, index) => (
                        <a
                            href={`#${index.toString()}`}
                            key={index}
                            className="btn btn-xs"
                        >
                            {index + 1}
                        </a>
                    ))}
                </div>
            </div>
            <Carousel>
                {plantData.map((plant, index) => (
                    <CarouselContent key={index} id={index.toString()}>
                        <PlantCard
                            key={index}
                            name={plant.name}
                            imageUrl={plant.image}
                            specifications={plant.specifications}
                        />
                    </CarouselContent>
                ))}
            </Carousel>
        </div>
    );
}

export default DashboardPage;
