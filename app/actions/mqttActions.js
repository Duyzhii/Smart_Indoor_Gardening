"use server";

import mqtt from "mqtt";
import { uploadSensorData, uploadControlDeviceData } from "@/database/database";
import { projectSensor } from "@/lib/data";
import { controlDeviceName } from "@/lib/data";

let latestSensorMessage = {"light":0,"soil_moisture":0,"air_quality":0,"PIR":0,"humidity":0,"temperature":0};
let latestControlDeviceMessage = {"Pump":0,"Fan":0,"Led":0};
let client = null;
let isConnected = false;

async function setupMQTTConnection() {
    if (client || isConnected) return;

    const protocol = "mqtts";
    const host = "c512a2ba643244358704db37382f01d2.s1.eu.hivemq.cloud";
    const port = "8883";
    const clientId = `mqtt_quan`;

    const connectUrl = `${protocol}://${host}:${port}`;

    client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: "hoangquan",
        password: "123456aA",
        reconnectPeriod: 1000,
        rejectUnauthorized: false,
    });

    client.on("connect", () => {
        // console.log("Connected to MQTT server:", connectUrl);
        client.subscribe(["SENSOR"], () => {
            // console.log(`Subscribe to topic '${topic}'`);
        });
        client.subscribe(["CONTROL_DEVICE"], () => {
            // console.log(`Subscribe to topic '${topic}'`);
        });
        isConnected = true;
    });

    client.on("message", async (topic, payload) => {
        const message = payload.toString();

        // get the sensor data object from the message
        const data = JSON.parse(message);
        if (topic == "SENSOR") {
            const sensorData = Object.entries(data).map(([key, value]) => ({
                sensorType: projectSensor[key].name,
                value: value,
                timeStamp: new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"})
            }));
    
            latestSensorMessage = message;

            // Upload the new sensor data to the database
            await uploadSensorData(sensorData);
        }
        else if (topic == "CONTROL_DEVICE") {
            const controlDeviceData = Object.entries(data).map(([key, value]) => ({
                deviceType: controlDeviceName[key],
                status: value,
                timeStamp: new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"})
            }));
    
            latestControlDeviceMessage = message    ;

            // Upload the new control device data to the database
            await uploadControlDeviceData(controlDeviceData);
        }
    });

    client.on("error", (err) => {
        console.error("Connection error:", err);
        isConnected = false;
    });
}

export async function publishMQTTMessage(msg, topic) {
    await setupMQTTConnection();

    console.log("Publishing message to topic:", topic, "with message", msg);

    return new Promise((resolve, reject) => {
        client.publish(topic, msg, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error("Publish error:", error);
                reject(error);
            } else {
                console.log(
                    "Message published successfully to topic:",
                    topic,
                    "with message",
                    msg
                );
                resolve("Message published successfully");
            }
        });
    });
}

export async function requestSensorData() {
    await setupMQTTConnection();

    return new Promise((resolve, reject) => {
        if (latestSensorMessage) {
            resolve(latestSensorMessage);
            return;
        }

        reject(latestSensorMessage);
    });
}

export async function requestControlDeviceData() {
    await setupMQTTConnection();

    return new Promise((resolve, reject) => {
        if (latestControlDeviceMessage) {
            resolve(latestControlDeviceMessage);
            return;
        }

        reject(latestControlDeviceMessage);
    });
}
