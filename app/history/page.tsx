"use client";

import React, { useState } from "react";
import { HistoryByDayChart } from "@/components/HistoryByDayChart";
import { SelectSensors } from "@/components/SelectSensors";
import MySwitch2 from "@/components/MySwitch2";

function HistoryPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("Light-Sensor");
    const [endDate, setEndDate] = useState<string>("8/1/2024");
    const [startDate, setStartDate] = useState<string>("15/1/2024");

    return (
        <div>
            <div>
                
                <HistoryByDayChart 
                    sensorType= {selectedSensor}
                    endDate = {endDate}
                    startDate = {startDate}
                />
            </div>

            <div className="flex pt-11 justify-center mx-auto">
                <SelectSensors setSelectedSensor={setSelectedSensor} />
            </div>
            <div>
                <MySwitch2 />
            </div>
        </div>
    );
}

export default HistoryPage;
