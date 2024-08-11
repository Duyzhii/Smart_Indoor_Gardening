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
    const [selectedSensor, setSelectedSensor] = useState<string>("light");
    const [dynamicSensorData, setDynamicSensorData] = useState<Record<string, DynamicSensorData>>({});
    const [currentTime, setCurrentTime] = useState<string>("");

    const handleDeviceStatusChange = (sensorType: string, newStatus: boolean) => {
        setDynamicSensorData((prevState) => ({
            ...prevState,
            [sensorType]: {
                ...prevState[sensorType],
                device_status: newStatus ? "On" : "Off",
            },
        }));
    };

     // useEffect(() => {
    //   let type = "";
    //   let message = "";

    //     const suitable = sensor.value.normalValue;
    //     const minimum = sensor.value.minValue;
    //     const device = sensor.control_device.name;
    //     const value = sensor.value.currentValue;
  
    //   if (value > suitable) {
    //     type = "Alert_Over_Suitable_Value";
    //     message = `The ${sensor} value is over the suitable value (${value} > ${suitable}) \n
    //     Please turn off the ${device} to avoid damage.
    //     `;
    //     send (type, message);
    //   }
  
    //   else if (value < minimum) {
    //     type = "Alert_Under_Suitable_Value";
    //     message = `The ${sensor} value is under the minimum value (${value} < ${minimum}) \n
    //     Please turn on the ${device} to avoid damage.
    //     `;
  
    //     send (type, message);
    //   }
      
    //   else return;
  
    // }, [sensor.value.currentValue]);
  
    const send = async (type: string, message: string) => {
      console.log('Sending email...');
      try {
        const response = await fetch('/api/sendMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: type,
            receiver: "duyzhii@gmail.com",
            receiver_name: "Duy",
            user_message: message,
          }),
        });
        
        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Failed to send email');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    
   
    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await requestData();  // Fetch data from server
                const data = JSON.parse(response);  // Parse the JSON response

                const newSensorData: Record<string, DynamicSensorData> = {};

                for (const [key, value] of Object.entries(data)) {
                    newSensorData[key] = {
                        time: currentTime,  // Use currentTime from state
                        last_time_updated: "2 minutes ago",  // Example: static string for last update time
                        device_status: dynamicSensorData[key]?.device_status || "Unknown",  // Handle undefined values
                        chartData: {
                            browser: "safari",  // Example data, replace as needed
                            value: value as number,
                            fill: "var(--color-safari)",  // Example style, replace as needed
                        },
                    };
                }

                console.log("New Sensor Data: ", newSensorData);

                setDynamicSensorData(newSensorData);  // Update state with new sensor data
            } catch (e) {
                console.error("Error parsing response: ", e);  // Handle cases where response is not valid JSON
            }
        };
       
        // checkAndSendAlerts();  // Check and send alerts

        // fetchSensorData();  // Initial data fetch
        const interval = setInterval(fetchSensorData, 5000);  // Fetch data every 5 seconds

        return () => clearInterval(interval);  // Clear interval on component unmount
    }, [currentTime]);

    useEffect(() => {
        const updateTime = () => setCurrentTime(new Date().toLocaleTimeString());
        updateTime();  // Set initial time
        const timeInterval = setInterval(updateTime, 1000);  // Update time every second

        return () => clearInterval(timeInterval);  // Clear interval on component unmount
    }, []);

    return (
        <div className="space-y-6 w-11/12 mx-auto">
            
            <Slider />

            <DataChart 
                sensor={projectSensor[selectedSensor]} 
                onDeviceStatusChange={handleDeviceStatusChange} 
                dateTime={currentTime}  // Pass currentTime to DataChart
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
