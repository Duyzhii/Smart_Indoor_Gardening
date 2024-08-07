"use server";

import mqtt from "mqtt";

let latestMessage = null;
let client = null;
let isConnecting = false;

async function setupMQTTConnection() {
    if (client || isConnecting) return;

    isConnecting = true;

    const protocol = "mqtts";
    const host = "c512a2ba643244358704db37382f01d2.s1.eu.hivemq.cloud";
    const port = "8883";
    const clientId = `mqtt_quan_${Math.random().toString(16).substr(2, 8)}`;
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
        console.log("Connected to MQTT broker");
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`);
        });
        isConnecting = false;
    });

    client.on("message", (topic, payload) => {
        const message = payload.toString();
        console.log("Message received: ", message);
        latestMessage = message;
    });

    client.on("error", (err) => {
        console.error("Connection error:", err);
        isConnecting = false;
    });
}

export async function publishMQTTMessage(msg, topic) {
    await setupMQTTConnection();

    return new Promise((resolve, reject) => {
        client.on("connect", () => {
            console.log("Connected to MQTT broker");

            client.publish(topic, msg, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.error("Publish error:", error);
                    reject(error);
                } else {
                    console.log("Message published successfully");
                    resolve("Message published successfully");
                }

                client.end();
            });
        });

        client.on("error", (err) => {
            console.error("Connection error:", err);
            reject(err);
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

        reject("No data available");
    });
}
