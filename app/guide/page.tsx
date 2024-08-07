"use client";
import React, { useState, useEffect, useCallback } from "react";
import { requestData } from "../actions/mqttActions";

function GuidePage() {
    console.log("GuidePage rendered"); // Ensure this is logged
    const [sensorValue, setSensorValue] = useState("null");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestData();
                console.log("Response:", response);
                setSensorValue(response);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <h1>Sensor Dashboard</h1>
            <p>Current Sensor Value: {sensorValue}</p>
        </div>
    );
}

export default GuidePage;
