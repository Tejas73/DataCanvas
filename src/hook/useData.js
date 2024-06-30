import { useEffect } from "react";
import { useState } from "react";
import * as d3 from "d3";
import { feature, mesh, topology } from "topojson";

const csvUrlBar = "https://gist.githubusercontent.com/Tejas73/e417d317c2822a939e0ed1a2f9f14772/raw/d98ff4e78f6dcfe041b835ce2a4eedd44aabcabd/population.csv";

export const useDataBar = () => { 
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d.Population = parseFloat(d['Total Population (thousands)'] * 1000);
            return d; 
        }
        d3.csv(csvUrlBar, row).then(setData);

    }, []);
    return data;
}

const csvUrlScatter = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

export const useDataScatter = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = (d) => {
            d.sepal_length = parseFloat(d.sepal_length);
            d.sepal_width = parseFloat(d.sepal_width);
            d.petal_length = parseFloat(d.petal_length);
            d.petal_width = parseFloat(d.petal_width);
            return d;
        }
        d3.csv(csvUrlScatter, row).then(setData);

    }, []);
  console.log("data",data)

    return data;
}

const csvUrlScatterLine = "https://gist.githubusercontent.com/ny2cali/ae74ee9a6f73fbf6d48d0e9108296e97/raw/78375409c2428911c7bf1d6a1ac83318c5deaec1/week_temperature_sf.csv"

export const useDataLine = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d.timestamp = new Date(d.timestamp);
            d.temperature = parseFloat(d.temperature);
            return d;
        }
        d3.csv(csvUrlScatterLine, row).then(setData);
    }, [])

    return data;
}

const jsonUrlWorldmap = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useDataWorldmap = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        d3.json(jsonUrlWorldmap).then(topoJsonData => {
            const { countries } = topoJsonData.objects;
            setData({
                countries: feature(topoJsonData, countries),
                interiors: mesh(topoJsonData, countries, (a, b) => a !== b)
            });
        });
    }, []);

    return data;
};

