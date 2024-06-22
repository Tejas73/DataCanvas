// import * as d3 from "d3";
// import { useDataBar } from "../hook/useData";
// import { AxisBottom } from "../utils/AxisBottom";
// import { AxisLeft } from "../utils/AxisLeft";
// import { ScatterMarks } from "../utils/Marks";

// const Scatterplot = () => {
//     const data = useDataBar();

//     const width = 960;
//     const height = 500;
//     const margin = { top: 200, right: 20, bottom: 20, left: 10 };
//     const xAxisLabelOffeset = 50;

//     const SIformat = d3.format('.2s')
//     const xAxisTickFormat = tickValue => SIformat(tickValue).replace('G', 'B');

//     const xValue = d => d.sepal_length;
//     const yValue = d => d.sepal_width;

//     if (!data) {
//         return <p>Loading...</p>
//     }

//     const innerHeight = height - margin.top - margin.bottom;
//     const innerWidth = width - margin.left - margin.right;

//     const xScale = d3.scaleLinear()
//         .domain(d3.extent(data, xValue)) // instead of writing min and max, we simply used extent
//         .range([0, innerWidth]);

//     const yScale = d3.scaleLinear()
//         .domain(d3.extent(data, yValue))
//         .range([0, innerHeight]);


//     return (
//         <div>
//             <svg width={width} height={height}>
//                 <g transform={`translate(${margin.left, margin.top})`}>
//                     <AxisBottom
//                         xScale={xScale}
//                         innerHeight={innerHeight}
//                         tickFormat={xAxisTickFormat}
//                     />
//                     <AxisLeft yScale={yScale} />
//                     <text
//                         x={innerWidth / 2}
//                         y={innerHeight + xAxisLabelOffeset}
//                         textAnchor="end"
//                         fill="black"
//                         style={{ fontSize: 30, fill: "#635F5D" }}
//                     >
//                         Population
//                     </text>
//                     <ScatterMarks
//                         data={data}
//                         xScale={xScale}
//                         yScale={yScale}
//                         xValue={xValue}
//                         yValue={yValue}
//                         toolTipFormat={xAxisTickFormat}
//                     />
//                 </g>
//             </svg>
//         </div>
//     )

// };

// export default Scatterplot;