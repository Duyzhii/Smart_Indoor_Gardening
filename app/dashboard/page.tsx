"use client";
import DataBox from "@/components/DataBox";
import DataChart from "@/components/DataChart";
import { useState } from "react";

function DashboardPage() {
    const [selectedSensor, setSelectedSensor] =
        useState<string>("Light sensor");

    return (
        <div className="space-y-6">
            <DataChart sensorType={selectedSensor} />
            <div className="flex gap-4 w-full">
                <DataBox onSelectSensor={setSelectedSensor} />
            </div>
        </div>
    );
}

export default DashboardPage;
