"use client";

import React, { useState } from "react";
import { HistoryByDayChart } from "@/components/HistoryByDayChart";
import { SelectSensors } from "@/components/SelectSensors";

function HistoryPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("Light sensor");
    const [endDate, setEndDate] = useState<string>("08/24/2024");
    const [startDate, setStartDate] = useState<string>("08/20/2024");

    return (
        <div className="w-full h-full">
            <h1 className="text-3xl font-bold">History Data Chart</h1>
            <div className = "space-y-6 w-11/12 mx-auto pt-4">
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
            </div>
        </div>
    );
}

export default HistoryPage;
