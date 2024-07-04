import React from 'react';
import * as d3 from 'd3';
import { useDataBar } from "../hook/useData";
import { BarAxisBottom } from "../utils/AxisBottom";
import { BarAxisLeft } from "../utils/AxisLeft";
import { BarMarks } from "../utils/Marks";
// import DropMenu from '../utility/DropMenu';

const Barchart = () => {
  const data = useDataBar();
  // console.log("data", data);
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 100, left: 156 };

  const xAxisLabelOffset = 50;

  const SIformat = d3.format('.2s');
  const xAxisTickFormat = tickValue => SIformat(tickValue).replace('G', 'B');

  if (!data) {
    return <p>Loading...</p>;
  }
  // const initialXOption = {value: 'select x axis', label: 'Select X axis'}
  const xValue = d => d.Population;
  // const [selectedXOption, setSelectedXOption] = useState('Select X axis')
const xAxisLabel = 'Population';

  const yValue = d => d.Region;

  // const keys = Object.keys(data[0]);
  // const options = keys;
  // console.log("options: ", options)

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.1);


  return (
    <div>
      <svg width={width} height={height} >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* <DropMenu
            options={options}
            selectedOption={selectedXOption}
            onSelectedOptionChange={setSelectedXOption}
          />
          <DropMenu
            options={options}
            selectedOption={selectedYOption}
            onSelectedOptionChange={setSelectedYOption}
          /> */}
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
