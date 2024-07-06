import React from 'react';

interface ColorLegendProps {
    colorScale: any; 
    tickSpacing: number;
    tickSize: number;
    tickTextOffset: number;
    onHover: (value: any) => void; 
    hoveredValue: any; 
}

const ColorLegend: React.FC<ColorLegendProps> = ({ colorScale, tickSpacing, tickSize, tickTextOffset, onHover, hoveredValue }) =>
    colorScale.domain().map((domainValue: any, i: number) =>
    (
        <g
            key={i}
            transform={`translate(0, ${i * tickSpacing})`}
            onMouseEnter={() => { onHover(domainValue) }}
            onMouseOut={() => { onHover(null) }}
            opacity={hoveredValue && domainValue !== hoveredValue ? 0.2 : 1}
        >

            <circle
                fill={colorScale(domainValue)}
                r={tickSize}
            />

            <text
                style={{ fill: '#635F5D', cursor: 'default' }}
                x={tickTextOffset}
                dy='.32rem'
            >
                {domainValue}
            </text>
        </g>
    )
    );

export default ColorLegend;
