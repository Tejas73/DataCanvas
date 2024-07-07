import React, { useState } from 'react';
import * as d3 from 'd3';
import { useDataBar } from "../hook/useData";
import { BarAxisBottom } from "../utils/AxisBottom";
import { BarAxisLeft } from "../utils/AxisLeft";
import { BarMarks } from "../utils/Marks";
import DropMenu from '../utility/DropMenu';
import { CapAndReplace } from '../utility/CapAndReplace';

const Barchart: React.FC = () => {
  const [csvBar, setCsvBar] = useState("https://gist.githubusercontent.com/Tejas73/10d3a301f64ce908c818f76de91c6d15/raw/b7e9a043cda25cbea9788c967e6979b4f6924cf5/sales-trends.csv")
  const data = useDataBar(csvBar);

  const width = 960;
  const height = 500;
  const margin = { top: 100, right: 20, bottom: 50, left: 200 };
  const xAxisLabelOffset = 50;
  const SIformat = d3.format('.2s');
  const xAxisTickFormat = (tickValue: number) => SIformat(tickValue).replace('G', 'B');

  const initialXOption = { value: "choose x axis", label: 'Select x axis' };
  const [selectedXOption, setSelectedXOption] = useState<{ value: string, label: string }>(initialXOption);
  const xValue = (d: { [x: string]: any; }) => d[selectedXOption.value];
  const xAxisLabel = CapAndReplace(selectedXOption.label);

  const initialYOption = { value: "choose y axis", label: 'Select y axis' };
  const [selectedYOption, setSelectedYOption] = useState<{ value: string, label: string }>(initialYOption);
  const yValue = (d: { [x: string]: any; }) => d[selectedYOption.value];
  const yAxisLabel = CapAndReplace(selectedYOption.label);

  if (!data) {
    return <p>Loading...</p>;
  }

  const keys = Object.keys(data[0]);
  const options = keys.map(option => ({
    value: option,
    label: option
  }));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)!])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.1); 

  return (
    <div>

      <div>
        <h1>Barchart</h1>
      </div>

      <div>
        <input
          type="text"
          id='csvBar'
          value={csvBar}
          onChange={(e) => setCsvBar(e.target.value)}
          placeholder="Input your csv url"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-2/5 relative z-10 mt-4  bg-neutral-300 placeholder:text-neutral-700"
        />
      </div>

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

          <BarAxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <BarAxisLeft yScale={yScale} />
          <text
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
            fill="black"
            style={{ fontSize: 20, fill: "#635F5D" }}
          >
            {xAxisLabel}
          </text>
          <text
            textAnchor="middle"
            transform={`translate(${-margin.left + 20},${innerHeight / 2}) rotate(-90)`}
            style={{ fontSize: 20, fill: "#635F5D" }}
          >
            {yAxisLabel}
          </text>
          <BarMarks
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

export default Barchart;
