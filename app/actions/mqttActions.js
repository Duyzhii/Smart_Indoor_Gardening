"use server";

import mqtt from "mqtt";

export async function publishMQTTMessage(msg, topic) {
    const protocol = "mqtts";
    const host = "c512a2ba643244358704db37382f01d2.s1.eu.hivemq.cloud";
    const port = "8883";
    const clientId = `mqtt_quan`;

    const connectUrl = `${protocol}://${host}:${port}`;

    return new Promise((resolve, reject) => {
        const client = mqtt.connect(connectUrl, {
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
