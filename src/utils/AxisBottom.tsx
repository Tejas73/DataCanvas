import React from 'react';

interface BarAxisBottomProps {
    xScale: any;
    innerHeight: number;
    tickFormat: (value: any) => string;
    fontSizeText: number;
}

export const BarAxisBottom: React.FC<BarAxisBottomProps> = ({ xScale, innerHeight, tickFormat, fontSizeText }) =>
    xScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="#C0C0BB"></line>
            <text style={{ textAnchor: 'middle', fill: '#8E8883', fontSize: fontSizeText }} dy='.71rem' y={innerHeight + 6}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));

interface ScatterAxisBottomProps {
    xScale: any;
    innerHeight: number;
    tickFormat: (value: any) => string;
    fontSizeText: number;
}

export const ScatterAxisBottom: React.FC<ScatterAxisBottomProps> = ({ xScale, innerHeight, tickFormat, fontSizeText }) =>
    xScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="#C0C0BB"></line>
            <text style={{ textAnchor: 'middle', fill: '#8E8883', fontSize: fontSizeText }} dy='.71rem' y={innerHeight + 11}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));
