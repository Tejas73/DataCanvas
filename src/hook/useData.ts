import { useEffect, useState } from "react";
import * as d3 from "d3";
import { feature, mesh, GeometryObject } from "topojson";

// Define types for your data structures as needed
interface BarData {
    // Define your data structure for bar chart data
    [key: string]: number | string; // Example, adjust based on your CSV structure
}

interface ScatterData {
    // Define your data structure for scatter plot data
    [key: string]: number | string; // Example, adjust based on your CSV structure
}

interface LineData {
    [key: string]: number | string; 
}

interface WorldmapData {
    countries: GeometryObject;
    interiors: GeometryObject;
}

const csvUrlBar = "https://gist.githubusercontent.com/Tejas73/10d3a301f64ce908c818f76de91c6d15/raw/b7e9a043cda25cbea9788c967e6979b4f6924cf5/sales-trends.csv";
// const csvUrlBar = "https://gist.githubusercontent.com/Tejas73/e417d317c2822a939e0ed1a2f9f14772/raw/d98ff4e78f6dcfe041b835ce2a4eedd44aabcabd/population.csv";
const csvUrlScatter = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/mpg.csv";
// const csvUrlScatter = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
const csvUrlScatterLine = "https://gist.githubusercontent.com/ny2cali/ae74ee9a6f73fbf6d48d0e9108296e97/raw/78375409c2428911c7bf1d6a1ac83318c5deaec1/week_temperature_sf.csv";
const jsonUrlWorldmap = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const csvUrlExample1 = "https://example.com/data1.csv";
const csvUrlExample2 = "https://example.com/data2.csv";

export const useDataBar = (): BarData[] | null => {
    const [data, setData] = useState<BarData[] | null>(null);

    useEffect(() => {
        const row = (d: any): BarData => {
            // Custom parsing of CSV rows, adjust as per your CSV structure
            Object.keys(d).forEach(key => {
                if (!isNaN(Number(d[key])) && isFinite(Number(d[key]))) {
                    d[key] = Number(d[key]);
                }
            });
            return d as BarData;
        };

        d3.csv(csvUrlBar, row).then(setData);

    }, []);

    return data;
};

export const useDataScatter = (): ScatterData[] | null => {
    const [data, setData] = useState<ScatterData[] | null>(null);

    useEffect(() => {
        const row = (d: any): ScatterData => {
            // Custom parsing of CSV rows, adjust as per your CSV structure
            Object.keys(d).forEach(key => {
                if (!isNaN(Number(d[key])) && isFinite(Number(d[key]))) {
                    d[key] = Number(d[key]);
                }
            });
            return d as ScatterData;
        };

        d3.csv(csvUrlScatter, row).then(setData);

    }, []);

    return data;
};

export const useDataLine = ()=> {
    const [data, setData] = useState<LineData[] | null>(null);

    useEffect(() => {
        const row = (d: any): LineData => {
            // Custom parsing of CSV rows, adjust as per your CSV structure
            d.timestamp = new Date(d.timestamp);
            d.temperature = parseFloat(d.temperature);
            return d as LineData;
        };

        d3.csv(csvUrlScatterLine, row).then(setData);

    }, []);

    return data;
};

// export const useDataWorldmap = (): WorldmapData | null => {
//     const [data, setData] = useState<WorldmapData | null>(null);

//     useEffect(() => {
//         d3.json(jsonUrlWorldmap).then(topoJsonData => {
//             const { countries } = topoJsonData.objects;
//             setData({
//                 countries: feature(topoJsonData, countries) as GeometryObject,
//                 interiors: mesh(topoJsonData, countries, (a, b) => a !== b) as GeometryObject
//             });
//         });

//     }, []);

//     return data;
// };

