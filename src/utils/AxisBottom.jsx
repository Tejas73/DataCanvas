export const BarAxisBottom = ({ xScale, innerHeight, tickFormat }) =>
    xScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`} >
            <line y2={innerHeight} stroke="#C0C0BB"></line>
            <text style={{ textAnchor: 'middle', fill: '#8E8883' }} dy='.71rem' y={innerHeight + 3} >
                {tickFormat(tickValue)}
            </text> 
        </g>
    )); 

export const ScatterAxisBottom = ({ xScale, innerHeight, tickFormat }) =>
    xScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`} >
            <line y2={innerHeight} stroke="#C0C0BB"></line>
            <text style={{ textAnchor: 'middle', fill: '#8E8883' }} dy='.71rem' y={innerHeight + 11} >
                {tickFormat(tickValue)}
            </text>
        </g>
    )); 