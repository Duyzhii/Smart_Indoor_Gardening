"use client";

import React, { useState } from "react";
import { PickDate, HistoryByDayChart } from "@/components/HistoryByDayChart";
import { SelectSensors } from "@/components/SelectSensors";
// Date Picker
import {DateValue, parseDate, getLocalTimeZone, CalendarDate, today} from "@internationalized/date";


function formatDate(date: DateValue): string {
    const day = String(date.day).padStart(2, '0');
    const month = String(date.month).padStart(2, '0');
    const year = date.year;

    return `${month}/${day}/${year}`;
}

function HistoryPage() {
    const [selectedSensor, setSelectedSensor] = useState<string>("Light sensor");
    const [startDate, setStartDate] = useState<DateValue>(parseDate("2024-04-01"));
    const [endDate, setEndDate] = useState<DateValue>(parseDate("2024-04-08"));

    console.log("Start date: ", formatDate(startDate));
    console.log("End date: ", formatDate(endDate));

    return (
        <div className="w-full h-full">
            <h1 className="text-3xl font-bold">History Data Chart</h1>
            <div className="space-y-6 w-11/12 mx-auto pt-4">
                <PickDate 
                    setStartDate={setStartDate} 
                    setEndDate={setEndDate} 
                />
                <div>
                    <HistoryByDayChart 
                        sensorType={selectedSensor}
                        startDate={formatDate(startDate)}
                        endDate={formatDate(endDate)}
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