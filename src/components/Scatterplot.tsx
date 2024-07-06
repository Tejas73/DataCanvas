import React, { useState } from "react";
import * as d3 from "d3";
import { useDataScatter } from "../hook/useData";
import { ScatterAxisBottom } from "../utils/AxisBottom";
import { ScatterAxisLeft } from "../utils/AxisLeft";
import { ScatterMarks } from "../utils/Marks";
import DropMenu from "../utility/DropMenu";
import ColorLegend from "../utils/ColorLegend";
import { CapAndReplace } from "../utility/CapAndReplace";

// interface ScatterData {
//   // Define your data structure for scatter plot data
//   [key: string]: number | string; // Adjust based on your actual data structure
// }

const Scatterplot: React.FC = () => {
  const data = useDataScatter();
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const initialXOption = { value: "choose x axis", label: 'Select x axis' }
  const [selectedXOption, setSelectedXOption] = useState<{ value: string, label: string }>(initialXOption);
  const xValue = (d) => (d[selectedXOption.value]); // Adjust as per your data structure
  const xAxisLabel = CapAndReplace(selectedXOption.label);

  const initialYOption = { value: "choose y axis", label: 'Select y axis' }
  const [selectedYOption, setSelectedYOption] = useState<{ value: string, label: string }>(initialYOption);
  const yValue = (d) => (d[selectedYOption.value]); // Adjust as per your data structure
  const yAxisLabel = CapAndReplace(selectedYOption.label);

  if (!data) {
    return <h1>Loading...</h1>
  }

  const categoricalColumn = Object.keys(data[0]).find(key => {
    const strValue = data[0][key];
    return (isNaN(Number(strValue)));
  }) || '';

  const colorValue = (d: { [x: string]: any; }) => String(d[categoricalColumn]); // Adjust as per your data structure
  const colorLegendLabel = CapAndReplace(categoricalColumn);

  const keys = Object.keys(data[0]);
  const options = keys.map(option => ({
    value: option,
    label: option
  }));

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 200, bottom: 65, left: 100 };

  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 50;

  const SIformat = d3.format(".1f");
  const xAxisTickFormat = (tickValue: number) => SIformat(tickValue).replace("G", "B");

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue) as [number, number])
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue) as [number, number])
    .range([innerHeight, 0])
    .nice();

  const colorScale = d3.scaleOrdinal<string>()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A', '#9A3E25', '#5C8100', '#BD2D28', '#0F8C79', '#708259']);

  const filteredData = data.filter(d => hoveredValue === colorValue(d));

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
          <g transform={`translate(${innerWidth + 70},35 )`}>
            <text
              x={35}
              y={-25}
              textAnchor="middle"
              style={{ fontSize: 25, fill: "#635F5D" }}
            >
              {colorLegendLabel}
            </text>
            <ColorLegend
              tickSpacing={20}
              tickSize={9}
              tickTextOffset={20}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
            />
          </g>
          <g opacity={hoveredValue ? 0.2 : 1}>
            <ScatterMarks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              toolTipFormat={xAxisTickFormat}
            />
          </g>
          <ScatterMarks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            toolTipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  );
};

export default Scatterplot;
