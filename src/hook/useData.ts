import { useEffect, useState } from "react";
import * as d3 from "d3";
// import { feature, mesh, GeometryObject } from "topojson";

interface BarData {
    [key: string]: number | string;
}

interface ScatterData {
    [key: string]: number | string;
}

interface LineData {
    [key: string]: number | string;
}

// const csvUrlBar = "https://gist.githubusercontent.com/Tejas73/10d3a301f64ce908c818f76de91c6d15/raw/b7e9a043cda25cbea9788c967e6979b4f6924cf5/sales-trends.csv";
// const csvUrlBar = "https://gist.githubusercontent.com/Tejas73/e417d317c2822a939e0ed1a2f9f14772/raw/d98ff4e78f6dcfe041b835ce2a4eedd44aabcabd/population.csv";



export const useDataBar = (csvUrl: string): BarData[] | null => {
    const [data, setData] = useState<BarData[] | null>(null);

    useEffect(() => {
        if (!csvUrl) return;

        const row = (d: any): BarData => {
            Object.keys(d).forEach(key => {
                if (!isNaN(Number(d[key])) && isFinite(Number(d[key]))) {
                    d[key] = Number(d[key]);
                }
            });
            return d as BarData;
        };

        d3.csv(csvUrl, row).then(setData);

    }, [csvUrl]);

    return data;
};

// const csvUrlScatter = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/mpg.csv";
// const csvUrlScatter = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

export const useDataScatter = (csvScatter: string): ScatterData[] | null => {
    const [data, setData] = useState<ScatterData[] | null>(null);

    useEffect(() => {
        const row = (d: any): ScatterData => {
            Object.keys(d).forEach(key => {
                if (!isNaN(Number(d[key])) && isFinite(Number(d[key]))) {
                    d[key] = Number(d[key]);
                }
            });
            return d as ScatterData;
        };

        d3.csv(csvScatter, row).then(setData);

    }, [csvScatter]);

    return data;
};


// const csvUrlLine = "https://gist.githubusercontent.com/ny2cali/ae74ee9a6f73fbf6d48d0e9108296e97/raw/78375409c2428911c7bf1d6a1ac83318c5deaec1/week_temperature_sf.csv";

export const useDataLine = (csvLine: string): LineData[] | null => {
    const [data, setData] = useState<LineData[] | null>(null);
  
    useEffect(() => {
      if (!csvLine) return;
  
      const row = (d: any): LineData => {

        Object.keys(d).forEach(key => {
          if (!isNaN(Number(d[key])) && isFinite(Number(d[key]))) {
            d[key] = Number(d[key]);
          } else if (!isNaN(Date.parse(d[key]))) {
            d[key] = new Date(d[key]);
          }
        });
        
        return d as LineData;
      };
  
      d3.csv(csvLine, row).then(setData);
  
    }, [csvLine]);
  
    return data;
  };

// interface WorldmapData {
//     countries: GeometryObject;
//     interiors: GeometryObject;
// }

// const jsonUrlWorldmap = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

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

