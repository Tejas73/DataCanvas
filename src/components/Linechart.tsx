import React, { useState } from "react";
import * as d3 from "d3";
import { useDataLine } from "../hook/useData";
import { ScatterAxisBottom } from "../utils/AxisBottom";
import { ScatterAxisLeft } from "../utils/AxisLeft";
import { LineMarks } from "../utils/Marks";
import DropMenu from "../utility/DropMenu";
import { CapAndReplace } from "../utility/CapAndReplace";

const Linechart: React.FC = () => {
  const data = useDataLine();

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 65, left: 100 };

  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 50;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = d3.timeFormat('%a');

  const initialXOption = { value: 'select x axis', label: 'Select X axis' };
  const [selectedXOption, setSelectedXOption] = useState<{ value: string, label: string }>(initialXOption);
  const xValue = (d: { [x: string]: any; }) => d[selectedXOption.value];
  const xAxisLabel = CapAndReplace(selectedXOption.label);

  const initialYOption = { value: 'select y axis', label: 'Select Y axis' };
  const [selectedYOption, setSelectedYOption] = useState<{ value: string, label: string }>(initialYOption);
  const yValue = (d: { [x: string]: any; }) => d[selectedYOption.value];
  const yAxisLabel = CapAndReplace(selectedYOption.label);

  if (!data) {
    return <h1>Loading...</h1>
  }

  const keys = Object.keys(data[0]);
  const options = keys.map(option => ({
    value: option,
    label: option
  }));

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue) as [number, number])
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue) as [number, number])
    .range([innerHeight, 0])
    .nice();

  return (
    <div>
      <div>
        <span style={{ fontSize: 25, color: "#635F5D" }}>X</span>
        <DropMenu
          options={options}
          selectedOption={selectedXOption}
          onSelectedOptionChange={setSelectedXOption}
        />
        <span style={{ fontSize: 25, color: "#635F5D" }}>Y</span>
        <DropMenu
          options={options}
          selectedOption={selectedYOption}
          onSelectedOptionChange={setSelectedYOption}
        />
      </div>

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
            transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
            style={{ fontSize: 30, fill: "#635F5D" }}
          >
            {yAxisLabel}
          </text>

          <text
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
            style={{ fontSize: 30, fill: "#635F5D" }}
          >
            {xAxisLabel}
          </text>

          <LineMarks
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
}

export default Linechart;
