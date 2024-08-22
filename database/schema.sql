-- create table for sensor data
CREATE TABLE SENSOR (
  sensorType VARCHAR(255) PRIMARY KEY,
  value FLOAT,
  timeReport TIMESTAMP
);

CREATE TABLE CONTROL_DEVICE (
  deviceType VARCHAR(255) PRIMARY KEY,
  status INT,
  timeReport TIMESTAMP
);