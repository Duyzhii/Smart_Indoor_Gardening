'use server';

import { sql } from '@vercel/postgres';

export async function initSensorTable() {
  try {
    await sql `CREATE TABLE IF NOT EXISTS SENSOR (
                id SERIAL PRIMARY KEY,
                sensorType VARCHAR(255),
                value FLOAT,
                timeReport TIMESTAMP
              );`;
    
    console.log("Table created successfully");
  }
  catch (error) {
    console.log("Error when creating table: ", error)
  }
}

export async function initControlDeviceTable() {
  try {
    await sql `CREATE TABLE IF NOT EXISTS CONTROL_DEVICE (
                id SERIAL PRIMARY KEY,
                deviceType VARCHAR(255),
                status INT,
                timeReport TIMESTAMP
              );`;
    
    console.log("Table created successfully");
  }
  catch (error) {
    console.log("Error when creating table: ", error)
  }
}

export async function uploadSensorData(sensorDataArray) {
  try {
    for (const sensorData of sensorDataArray) {
      const { sensorType, value, timeStamp } = sensorData;
      
      await sql`
        INSERT INTO SENSOR (sensortype, value, timereport)
        VALUES (${sensorType}, ${value}, ${timeStamp})
      `;
    }
    
    // console.log("Sensor data uploaded successfully");
  }
  catch (error) {
    console.error("Error when uploading data: ", error);
    throw error;  // Re-throw the error so it can be caught and handled in the client
  }
}

export async function getSensorData() {
  try {
    const { rows } = await sql `SELECT * FROM SENSOR ORDER BY id DESC`;

    // convert rows to DataHistory objects 
    const dataHistory = [];
    for (const row of rows) {
      const data = {
        id: row["id"],
        sensorType: row["sensortype"],
        value: row["value"],
        timeReport: row["timereport"]
      };
      
      dataHistory.push(data);
    }

    return dataHistory;
  }
  catch (error) {
    console.log("Error when getting SS data: ", error)
    return [];
  }
}

export async function uploadControlDeviceData(controlDeviceData) {
  try {
    for (const controlDevice of controlDeviceData) {
      const deviceType = controlDevice.deviceType.name;
      const status = controlDevice.status ? 1 : 0;
      const timeStamp = controlDevice.timeStamp;
      
      await sql`
        INSERT INTO CONTROL_DEVICE (devicetype, status, timereport)
        VALUES (${deviceType}, ${status}, ${timeStamp})
      `;
    }

    // console.log("Control device data uploaded successfully");
  }
  catch (error) {
    console.error("Error when uploading data: ", error);
    throw error;  // Re-throw the error so it can be caught and handled in the client
  }
}

export async function getControlDeviceData() {
  try {
    const { rows } = await sql `SELECT * FROM CONTROL_DEVICE ORDER BY id DESC`;

    // convert rows to DataHistory objects 
    const dataHistory = [];
    for (const row of rows) {
      const data = {
        id: row["id"],
        deviceType: row["devicetype"],
        status: row["status"],
        timeReport: row["timereport"]
      };
      
      dataHistory.push(data);
    }

    return dataHistory;
  }
  catch (error) {
    console.log("Error when getting data: ", error)
    return [];
  }
}

export async function getSensorValueByDate(sensorType, startDate, endDate) {
  try {
    // get average value of sensor data group by date between startDate and endDate, and group by sensor type
    const { rows } = await sql `
      SELECT sensortype, AVG(value) as value, EXTRACT(ISODOW FROM timereport) as date
      FROM SENSOR
      WHERE timereport >= ${startDate} AND timereport <= ${endDate} AND sensortype = ${sensorType}
      GROUP BY sensortype, date
      ORDER BY date ASC
    `;

    console.log("rows: ", rows);

    // match the day number to the day name
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // convert rows to DataHistory objects 
    const dataHistory = [];
    for (const row of rows) {
      const data = {
        day: dayName[row["date"]],
        data: row["value"]
      };
      
      dataHistory.push(data);
    }

    return dataHistory;
  }
  catch (error) {
    console.log("Error when getting data: ", error)
    return [];
  }
}
