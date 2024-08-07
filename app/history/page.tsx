"use client";

import React, { useState } from "react";
import { HistoryByDayChart } from "@/components/HistoryByDayChart";
import { SelectSensors } from "@/components/SelectSensors";
import MySwitch2 from "@/components/MySwitch2";

function HistoryPage() {
    let sensorType = "light-sensor";
    // get value from select sensor
    const [selectedSensor, setSelectedSensor] = useState(sensorType);

    return (
        <div>
            <div>
                <HistoryByDayChart sensorType={selectedSensor} />
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
