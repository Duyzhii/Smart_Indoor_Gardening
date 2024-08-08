import { spec } from "node:test/reporters";
import { 
    Leaf, 
    Sun, 
    Droplet, 
    Wheat, 
    ArrowDown01, 
    Ruler
} 
from "lucide-react";

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
            { Icon: Ruler, title: 'Height', value: '15cm - 60cm', color: '#14b8a6' },
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
            { Icon: Ruler, title: 'Height', value: '15cm - 60cm', color: '#14b8a6' },
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
            { Icon: Ruler, title: 'Height', value: '45cm - 60cm', color: '#14b8a6' },
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
            { Icon: Ruler, title: 'Height', value: '30cm - 60cm', color: '#14b8a6' },
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
            { Icon: Ruler, title: 'Height', value: '30cm - 60cm', color: '#14b8a6' },
        ]
    },
];


export default plantData;