import React from "react";
import * as d3 from "d3";
import { useDataScatter } from "../hook/useData";
import { ScatterAxisBottom } from "../utils/AxisBottom";
import { ScatterAxisLeft } from "../utils/AxisLeft";
import { ScatterMarks } from "../utils/Marks";

const Scatterplot = () => {
  const data = useDataScatter();

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 65, left: 100 };

  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 50;

  const SIformat = d3.format(".2s");
  const xAxisTickFormat = (tickValue) => SIformat(tickValue).replace("G", "B");

  const xValue = (d) => d.sepal_length;
  const xAxisLabel = "Sepal Length";

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  if (!data) {
    return <p>Loading...</p>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <ScatterAxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <ScatterAxisLeft yScale={yScale} innerWidth={innerWidth} />

          <text
            textAnchor="middle"
            fill="black"
            transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
            style={{ fontSize: 30, fill: "#635F5D" }}
          >
            {yAxisLabel}
          </text>
          
          <text
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
            fill="black"
            style={{ fontSize: 30, fill: "#635F5D" }}
          >
            {xAxisLabel}
          </text>

          <ScatterMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            toolTipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  );
};

export default Scatterplot;
