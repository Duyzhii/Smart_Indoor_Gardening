import { projectSensor } from "@/lib/data";

export async function sendMail(type: string, message: string) {
  console.log("Sending email...");
  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        receiver: "duyzhii@gmail.com",
        receiver_name: "Duy",
        user_message: message,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Failed to send email");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function sendWarning(sensorType: string) {
    let type = "";
      let message = "";
        const suitable = projectSensor[sensorType].value.normalValue;
        const minimum = projectSensor[sensorType].value.minValue;
        const device = projectSensor[sensorType].control_device.name;
        const value = projectSensor[sensorType].value.currentValue;
  
      if (value > suitable) {
        type = "Alert_Over_Suitable_Value";
        message = `The ${sensorType} value is over the suitable value (${value} > ${suitable}) \n
        Please turn off the ${device} to avoid damage.
        `;
        sendMail (type, message);
      }
  
      else if (value < minimum) {
        type = "Alert_Under_Suitable_Value";
        message = `The ${sensorType} value is under the minimum value (${value} < ${minimum}) \n
        Please turn on the ${device} to avoid damage.
        `;
        sendMail (type, message);
      }
}

