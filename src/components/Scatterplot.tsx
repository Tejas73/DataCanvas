import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useDataScatter } from "../hook/useData";
import { ScatterAxisBottom } from "../utils/AxisBottom";
import { ScatterAxisLeft } from "../utils/AxisLeft";
import { ScatterMarks } from "../utils/Marks";
import DropMenu from "../utils/DropMenu";
import ColorLegend from "../utils/ColorLegend";
import { CapAndReplace } from "../utility/CapAndReplace";

const Scatterplot: React.FC = () => {
  const [csvScatter, setCsvScatter] = useState("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/mpg.csv");
  const data = useDataScatter(csvScatter);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
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

  }, [])

  const initialXOption = { value: "choose x axis", label: 'Select x axis' }
  const [selectedXOption, setSelectedXOption] = useState<{ value: string, label: string }>(initialXOption);
  const xValue = (d) => (d[selectedXOption.value]);
  const xAxisLabel = CapAndReplace(selectedXOption.label);

  const initialYOption = { value: "choose y axis", label: 'Select y axis' }
  const [selectedYOption, setSelectedYOption] = useState<{ value: string, label: string }>(initialYOption);
  const yValue = (d) => (d[selectedYOption.value]);
  const yAxisLabel = CapAndReplace(selectedYOption.label);

  if (!data) {
    return <h1>Loading...</h1>
  }

  const categoricalColumn = Object.keys(data[0]).find(key => {
    const strValue = data[0][key];
    return (isNaN(Number(strValue)));
  }) || '';

  const colorValue = (d: { [x: string]: any; }) => String(d[categoricalColumn]);
  const colorLegendLabel = CapAndReplace(categoricalColumn);

  const keys = Object.keys(data[0]);
  const options = keys.map(option => ({
    value: option,
    label: option
  }));

  const margin = { top: 20, right: 200, bottom: 65, left: 80};

  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 50;

  const SIformat = d3.format(".1f");
  const xAxisTickFormat = (tickValue: number) => SIformat(tickValue).replace("G", "B");

  const innerHeight = vizHeight - margin.top - margin.bottom;
  const innerWidth = vizWidth - margin.left - margin.right;

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
    <div className='p-3 xl:p-6'>

      {/* title */}
      <div className='sm:text-3xl lg:text-5xl font-medium'>
        Scatterplot
      </div>

      {/* input field  */}
      <div className='my-5'>
        <input
          type="text"
          id='csvBar'
          value={csvScatter}
          onChange={(e) => setCsvScatter(e.target.value)}
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
      <div className='p-2 mt-2 border-2 border-border_gray w-fit '>

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

            {/* yAxisLabel */}
            <text
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
              style={{ fontSize: 25, fill: "#635F5D" }}
            >
              {yAxisLabel}
            </text>

            {/* xAxisLabel */}
            <text
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
              style={{ fontSize: 25, fill: "#635F5D" }}
            >
              {xAxisLabel}
            </text>

            {/* ColorLegend */}
            <g transform={`translate(${innerWidth + 70},35 )`}>

              {/* colorLegendLabel */}
              <text
                x={35}
                y={-25}
                textAnchor="middle"
                style={{ fontSize: 30, fill: "#635F5D" }}
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

            {/* ScatterMarks */}
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

    </div>
  );
};

export default Scatterplot;
