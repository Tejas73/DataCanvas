export const BarAxisLeft = ({ yScale }) =>
    yScale.domain().map((tickValue, i) => (
        <g key={i}>
            <text
                style={{ textAnchor: 'end', fill: '#635F5D' }}
                x={-3}
                y={yScale(tickValue) + yScale.bandwidth() / 2}
                dy='.32rem' 
            >
                {tickValue} 
            </text> 
        </g>
    ));

export const ScatterAxisLeft = ({ yScale, innerWidth }) =>
    yScale.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(0,${yScale(tickValue)})`} >
            <line x2={innerWidth} stroke="#C0C0BB"></line>
            <text
                style={{ textAnchor: 'end', fill: '#635F5D' }}
                x={-3} 
                dy='.32rem'
            >
                {tickValue}
            </text>
        </g>
    ));