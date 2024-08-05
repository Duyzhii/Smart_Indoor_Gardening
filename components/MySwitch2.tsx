"use client";

import React, { useState } from "react";
import { publishMQTTMessage } from "@/app/actions/mqttActions";

const MySwitch2: React.FC = () => {
    const msg: string = "FAN_ON";
    const topic: string = "FAN";
    const [status, setStatus] = useState<string>("");

    const handlePublish = async (): Promise<void> => {
        try {
            const result: string = await publishMQTTMessage(msg, topic);
            setStatus(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setStatus("Error: " + error.message);
            } else {
                setStatus("An unknown error occurred");
            }
        }
    };

    return (
        <div>
            <button onClick={handlePublish}>Publish MQTT Message</button>
            <p>Status: {status}</p>
        </div>
    );
};

export default MySwitch2;
