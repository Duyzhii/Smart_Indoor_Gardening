export type ControlDevice = {
    name: string;
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
    sensorType: string;
    value: number;
    controlDevice: string;
    deviceStatus: boolean;
    timeReport: string;
}