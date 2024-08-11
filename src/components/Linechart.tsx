import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useDataLine } from "../hook/useData";
import { ScatterAxisBottom } from "../utils/AxisBottom";
import { ScatterAxisLeft } from "../utils/AxisLeft";
import { LineMarks } from "../utils/Marks";
import DropMenu from "../utils/DropMenu";
import { CapAndReplace } from "../utility/CapAndReplace";

const Linechart: React.FC = () => {
  const [csvLine, setCsvLine] = useState("https://gist.githubusercontent.com/ny2cali/ae74ee9a6f73fbf6d48d0e9108296e97/raw/78375409c2428911c7bf1d6a1ac83318c5deaec1/week_temperature_sf.csv")
  const data = useDataLine(csvLine);
  const [vizWidth, setVizWidth] = useState(960);
  const [vizHeight, setVizHeight] = useState(500);
  const [fontSizeText, setFontSizeText] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      // for small screens
      if (window.innerWidth < 450 && window.innerHeight < 1000) {
        setVizWidth(350);
        setVizHeight(300);
        setFontSizeText(12);
      }
      // for medium screens 
      else if (window.innerWidth < 1000 && window.innerHeight < 450) {
        setVizWidth(800);
        setVizHeight(350);
        setFontSizeText(16);
      }
      // for large screens 
      else {
        setVizWidth(960);
        setVizHeight(500);
        setFontSizeText(20);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const margin = { top: 20, right: 30, bottom: 65, left: 100 };

  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 50;

  const innerHeight = vizHeight - margin.top - margin.bottom;
  const innerWidth = vizWidth - margin.left - margin.right;

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
    <div className='p-3 xl:p-6'>
      {/* title */}
      <div className='sm:text-3xl lg:text-5xl font-medium'>
        Linechart
      </div>

      {/* input field  */}
      <div className='my-5'>
        <input
          type="text"
          id='csvBar'
          value={csvLine}
          onChange={(e) => setCsvLine(e.target.value)}
          placeholder="Input your csv url"
          className="sm:text-xs md:text-base lg:text-xl sm:leading-6 block w-2/5 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300"
        />
      </div>

      {/* menu  */}
      <div>
        <span className='text-2xl text-slate-700 mr-2'>X</span>
        <DropMenu
          options={options}
          selectedOption={selectedXOption}
          onSelectedOptionChange={setSelectedXOption}
        />
        <span className='text-2xl text-slate-700 mr-2 ml-6'>Y</span>
        <DropMenu
          options={options}
          selectedOption={selectedYOption}
          onSelectedOptionChange={setSelectedYOption}
        />
      </div>

      {/* visualization */}
      <div className='p-2 mt-2 border-2 border-border_gray w-fit'>

        <svg width={vizWidth} height={vizHeight}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <ScatterAxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              fontSizeText={fontSizeText}
            />
            <ScatterAxisLeft
              yScale={yScale}
              innerWidth={innerWidth}
              fontSizeText={fontSizeText}
            />

            <text
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
              style={{ fontSize: 25, fill: "#635F5D" }}
            >
              {yAxisLabel}
            </text>

            <text
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
              style={{ fontSize: 25, fill: "#635F5D" }}
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
    </div>
  );
}

export default Linechart;
