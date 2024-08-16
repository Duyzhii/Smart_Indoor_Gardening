import { 
    Leaf, 
    Sun, 
    Droplet, 
    Wheat, 
    ArrowDown01, 
    Ruler,
    Thermometer,
    Droplets,
    Fan,
    Bug,
    Lightbulb,
    LightbulbOff,
    Power,
    PowerOff,
} 
from "lucide-react";
import { Sensor } from "./definitions";

// Plant Specifications Data
const plantData = [
    {
        name: "Bok Choy",
        image: "https://www.washingtonpost.com/resizer/xJpo8VST05Rc11Qge8SlXMhKTbE=/arc-anglerfish-washpost-prod-washpost/public/YW5B6QTDRII6HKUB4HNLCNQDEM",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full, Partial', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '30-35 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '15 - 60cm', color: '#14b8a6' },
        ]
    },
    {
        name: "Morning Glory",
        image: "https://hoangdunggreen.com/wp-content/uploads/2023/01/5a53565d7d2133ab42a3087b54717239.jpg",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '60-90 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '2m - 3m', color: '#14b8a6' },
        ]
    },
    {
        name: "White Carrot Sprouts",
        image: "https://image.plo.vn/w1000/Uploaded/2024/bpcpcwvo/2014_12_29/rau_mam2_LQTJ.jpg.webp",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full, Partial', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '30-35 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '15 - 60cm', color: '#14b8a6' },
        ]
    },
    {
        name: "Tomato",
        image: "https://blog.lexmed.com/images/librariesprovider80/blog-post-featured-images/shutterstock_1896755260.jpg?sfvrsn=52546e0a_0",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '60-90 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '1m - 2m', color: '#14b8a6' },
        ]
    },
    {
        name: "Zucchini",
        image: "https://cdn.britannica.com/96/138896-050-A640EBE8/Zucchini-vines.jpg",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '60-90 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '45 - 60cm', color: '#14b8a6' },
        ]
    },
    {
        name: "Cucumber",
        image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/6/30/fresh-cucumbers-on-farm-ready-for-market.jpg.rend.hgtvcom.1280.960.suffix/1688137605714.jpeg",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '50-70 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '30 - 60cm', color: '#14b8a6' },
        ]
    },
    {
        name: "Bell Pepper",
        image: "https://draxe.com/wp-content/uploads/2017/01/DrAxeBellPeppers-Recovered_FB.jpg",
        specifications: [
            { Icon: Leaf, title: 'Type', value: 'Annuals', color: '#22c55e' },
            { Icon: Sun, title: 'Sun', value: 'Full', color: '#eab308' },
            { Icon: Droplet, title: 'Water', value: 'Average', color: '#3b82f6' },
            { Icon: Wheat, title: 'Harvest', value: '60-90 days', color: '#f97316' },
            { Icon: ArrowDown01, title: 'Soil pH', value: 'Neutral', color: '#a855f7' },
            { Icon: Ruler, title: 'Height', value: '30 - 60cm', color: '#14b8a6' },
        ]
    },
];

const sensorName = ["light", "temperature", "soil_moisture", "humidity", "air_quality", "pir"];

const projectSensor : Record<string, Sensor> = {
    light: {
        name: "Light sensor",
        value:{
            currentValue: 150, // Initial value
            normalValue: 200, // Normal value
            maxValue: 1000, // Max value
            minValue: 100, // Min value
        },
        unit_name: "Light intensity",
        unit_symbol: "lux",
        icon: {
            icon: Sun,
            color: "#f59e0b",
        },
        last_time_updated: "2 minutes",
        control_device: {
            name: "Light Bulb",
            status: false,
            iconOn: Lightbulb,
            iconOff: LightbulbOff
        },
    },
    temperature: {
        name: "Temperature sensor",
        value: {
            currentValue: 25, // Initial value
            normalValue: 30, // Normal value
            maxValue: 50, // Max value
            minValue: 10, // Min value
        },
        unit_name: "Temperature",
        unit_symbol: "°C",
        icon: {
            icon: Thermometer,
            color: "#F44336",
        },
        last_time_updated: "2 minutes",
        control_device: {
            name: "",
            status: false,
            iconOn: null,
            iconOff: null
        },
    },
    soil_moisture: {
        name: "Soil moisture sensor",
        value: {
            currentValue: 50, // Initial value
            normalValue: 70, // Normal value
            maxValue: 100, // Max value
            minValue: 60, // Min value
        },
        unit_name: "Soil moisture",
        unit_symbol: "%",
        icon: {
            icon: Droplets,
            color: "#9C27B0",
        },
        last_time_updated: "2 minutes",
        control_device: {
            name: "Water Pump",
            status: true,
            iconOn: Power,
            iconOff: PowerOff
        },
    },
    humidity: {
        name: "Humidity sensor",
        value: {
            currentValue: 60, // Initial value
            normalValue: 70, // Normal value
            maxValue: 100, // Max value
            minValue: 40, // Min value
        },
        unit_name: "Humidity",
        unit_symbol: "%",
        icon: {
            icon: Droplet,
            color: "#3b82f6",
        },
        last_time_updated: "2 minutes",
        control_device: {
            name: "",
            status: false,
            iconOn: null,
            iconOff: null
        },
    },
    air_quality: {
        name: "Air quality sensor",
        value: {
            currentValue: 75, // Initial value
            normalValue: 80, // Normal value
            maxValue: 100, // Max value
            minValue: 60, // Min value
        },
        unit_name: "Air quality",
        unit_symbol: "ppm",
        icon: {
            icon: Fan,
            color: "#4CAF50",
        },
        last_time_updated: "2 minutes",
        control_device: {
            name: "Fan",
            status: true,
            iconOn: Power,
            iconOff: PowerOff
        },
    },
    PIR: {
        name: "PIR sensor",
        value: {
            currentValue: 0, // Initial value
            normalValue: 0, // Normal value
            maxValue: 1, // Max value
            minValue: 0, // Min value
        },
        unit_name: "Bug(s)",
        unit_symbol: "bug detected",
        icon: {
            icon: Bug,
            color: "#f59e0b",
        },
        last_time_updated: "2 minutes",
        control_device: {
            name: "",
            status: false,
            iconOn: null,
            iconOff: null
        },
    },
};


export { plantData, projectSensor };