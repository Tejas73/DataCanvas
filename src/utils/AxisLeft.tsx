import React from 'react';

interface BarAxisLeftProps {
    yScale: any; 
}

export const BarAxisLeft: React.FC<BarAxisLeftProps> = ({ yScale }) =>
    yScale.domain().map((tickValue: any, i: number) => (
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

interface ScatterAxisLeftProps {
    yScale: any;
    innerWidth: number;
}

export const ScatterAxisLeft: React.FC<ScatterAxisLeftProps> = ({ yScale, innerWidth }) =>
    yScale.ticks().map((tickValue: any, i: number) => (
        <g key={i} transform={`translate(0,${yScale(tickValue)})`}>
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
