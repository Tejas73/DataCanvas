import React from 'react';

interface BarAxisBottomProps {
    xScale: any; // Replace with the actual type of your xScale
    innerHeight: number;
    tickFormat: (value: any) => string; // Replace `any` with the actual type of your tick values
}

export const BarAxisBottom: React.FC<BarAxisBottomProps> = ({ xScale, innerHeight, tickFormat }) =>
    xScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="#C0C0BB"></line>
            <text style={{ textAnchor: 'middle', fill: '#8E8883' }} dy='.71rem' y={innerHeight + 3}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));

interface ScatterAxisBottomProps {
    xScale: any; // Replace with the actual type of your xScale
    innerHeight: number;
    tickFormat: (value: any) => string; // Replace `any` with the actual type of your tick values
}

export const ScatterAxisBottom: React.FC<ScatterAxisBottomProps> = ({ xScale, innerHeight, tickFormat }) =>
    xScale.ticks().map(tickValue => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="#C0C0BB"></line>
            <text style={{ textAnchor: 'middle', fill: '#8E8883' }} dy='.71rem' y={innerHeight + 11}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));
