-- create table for sensor data
CREATE TABLE SENSOR_DATA (
  sensorType VARCHAR(255) PRIMARY KEY,
  value FLOAT,
  controlDevice VARCHAR(255),
  deviceStatus BIT,
  timeReport TIMESTAMP
);