"use server";

import mqtt from "mqtt";
import { uploadHistoryData } from "@/database/database";

let latestMessage = {"light":0,"soil_moisture":0,"air_quality":0,"PIR":0,"humidity":0,"temperature":0};
let client = null;
let isConnected = false;

async function setupMQTTConnection() {
    if (client || isConnected) return;

    const protocol = "mqtts";
    const host = "c512a2ba643244358704db37382f01d2.s1.eu.hivemq.cloud";
    const port = "8883";
    const clientId = `mqtt_quan`;
    const topic = "DHT11";

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
        client.subscribe([topic], () => {
            // console.log(`Subscribe to topic '${topic}'`);
        });
        isConnected = true;
    });

    client.on("message", (topic, payload) => {
        const message = payload.toString();
        latestMessage = message;

        // get control devices data 

        // upload to database

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

export async function requestData() {
    await setupMQTTConnection();

    return new Promise((resolve, reject) => {
        if (latestMessage) {
            resolve(latestMessage);
            return;
        }

        reject(latestMessage);
    });
}
