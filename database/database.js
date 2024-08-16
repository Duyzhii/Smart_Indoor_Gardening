'use server';

import { sql } from '@vercel/postgres';
 
export async function initTable() {
  try {
    await sql `CREATE TABLE IF NOT EXISTS SENSOR_DATA (
                id SERIAL PRIMARY KEY,
                sensorType VARCHAR(255), 
                value FLOAT,
                controlDevice VARCHAR(255),
                deviceStatus BIT,
                timeReport TIMESTAMP
              );`;
    
    console.log("Table created successfully");
  }
  catch (error) {
    console.log("Error when creating table: ", error)
  }
}

export async function uploadHistoryData(dynamicSensorData) {
  try {
    for (sensorData of dynamicSensorData) {
      const sensorType = sensorData.name;
      const value = sensorData.value.currentValue;
      const controlDevice = sensorData.controlDevice.name;
      const deviceStatus = sensorData.controlDevice.status;
      const timeReport = sensorData.last_time_updated;

      await sql `INSERT INTO SENSOR_DATA (sensorType, value, controlDevice, deviceStatus, timeReport) VALUES (${sensorType}, ${value}, ${controlDevice}, ${deviceStatus}, ${timeReport});`;
    }
    
    console.log("Data uploaded successfully");
  }
  catch (error) {
    console.log("Error when uploading data: ", error)
  }
}

export async function uploadSensorData(sensorDataArray) {
  try {
    await sql `
      CREATE TABLE IF NOT EXISTS SENSOR_DATA (
      id SERIAL PRIMARY KEY,
      sensorType VARCHAR(255),
      value FLOAT,
      controlDevice VARCHAR(255),
      deviceStatus VARCHAR(5),
      timeReport TIMESTAMP
    );`;

    for (const sensorData of sensorDataArray) {
      const { sensorType, value, controlDevice, deviceStatus, timeReport } = sensorData;
      
      await sql`
        INSERT INTO SENSOR_DATA (sensorType, value, controlDevice, deviceStatus, timeReport) 
        VALUES (${sensorType}, ${value}, ${controlDevice}, ${deviceStatus}, ${timeReport})`;
    }
    
    console.log("Data uploaded successfully");
  }
  catch (error) {
    console.error("Error when uploading data: ", error);
    throw error;  // Re-throw the error so it can be caught and handled in the client
  }
}

export async function getSensorData() {
  try {
    const { rows } = await sql `SELECT * FROM SENSOR_DATA ORDER BY id DESC`;
    console.log("Data retrieved successfully");

    console.log("Rows: ", rows);

    // convert rows to DataHistory objects 
    const dataHistory = [];
    for (const row of rows) {
      const data = {
        sensorType: row["sensortype"],
        value: row["value"],
        controlDevice: row["controldevice"],
        deviceStatus: row["devicestatus"],
        timeReport: row["timereport"]
      };
      
      dataHistory.push(data);
    }

    console.log("Data: ", dataHistory);

    return dataHistory;
  }
  catch (error) {
    console.log("Error when getting data: ", error)
    return [];
  }
}
