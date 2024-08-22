export type ControlDevice = {
    name: string;
    description: string;
    status: boolean;
    iconOn: any;
    iconOff: any;
}

export type SensorValue = {
    currentValue: number;
    normalValue: number;
    maxValue: number;
    minValue: number;
}

export type Sensor = {
    name: string;
    unit_name: string;
    unit_symbol: string;
    value: SensorValue;
    icon: {
        icon: any;
        color: string;
    },
    last_time_updated: string;
    control_device: ControlDevice;
}

export type ChartData = { 
    browser: string; 
    value: number;
    fill: string
};

export type DynamicSensorData = {
    time: string;
    last_time_updated: string;
    device_status?: string;
    chartData: ChartData;
}

export type SensorData = {
    id: number;
    sensorType: string;
    value: number;
    timeReport: string;
}

export type ControlDeviceData = {
    id: number;
    deviceType: string;
    status: boolean;
    timeReport: string;
}

export type SensorControl = {
    name: string;
    sensor: string;
}