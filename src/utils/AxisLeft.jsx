  export const BarAxisLeft = ({ yScale }) =>
    yScale.domain().map((tickValue,i) => (
        <g key={i}>
            <text
                
                style={{ textAnchor: 'end', fill:'#635F5D' }}
                x={-3}
                y={yScale(tickValue) + yScale.bandwidth() / 2}
                dy='.32rem'
            >
                {tickValue}
            </text>
        </g>
    ));