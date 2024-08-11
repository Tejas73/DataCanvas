import React from 'react';

interface BarAxisLeftProps {
    yScale: any;
    fontSizeText:number
}

export const BarAxisLeft: React.FC<BarAxisLeftProps> = ({ yScale, fontSizeText }) =>
    yScale.domain().map((tickValue: any, i: number) => (
        <g key={i}>
            <text
                style={{ textAnchor: 'end', fill: '#635F5D', fontSize: fontSizeText }}
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
    fontSizeText: number;
}

export const ScatterAxisLeft: React.FC<ScatterAxisLeftProps> = ({ yScale, innerWidth, fontSizeText }) =>
    yScale.ticks().map((tickValue: any, i: number) => (
        <g key={i} transform={`translate(0,${yScale(tickValue)})`}>
            <line x2={innerWidth} stroke="#C0C0BB"></line>
            <text
                style={{ textAnchor: 'end', fill: '#635F5D', fontSize: fontSizeText }}
                x={10}
                dy='.32rem'
            >
                {tickValue}
            </text>
        </g>
    ));
