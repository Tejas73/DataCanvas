import { line } from "d3";

export const BarMarks = ({ data, xScale, yScale, xValue, yValue, toolTipFormat }) =>
    data.map((d, i) =>
    (<rect
        style={{ fill: '#8E6C8A' }}
        key={i}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
    >
        <title>{toolTipFormat(xValue(d))}</title>
    </rect>
    ));

export const ScatterMarks = ({ data, xScale, yScale, xValue, yValue, toolTipFormat }) =>
    data.map((d, i) =>
    (<circle
        style={{ fill: '#8E6C8A' }}
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))} 
        r={9}
    >
        <title>{toolTipFormat(xValue(d))}</title>
    </circle>
    ))

    export const LineMarks = ({ data, xScale, yScale, xValue, yValue, toolTipFormat }) => (
        <>
            <path fill="none" stroke="black"
                d={line()
                    .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d)))
                    (data)
                } />
            {data.map((d, i) => (
                <circle
                    style={{ fill: '#8E6C8A' }}
                    key={i}
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={9}
                >
                    <title>{toolTipFormat(xValue(d))}</title>
                </circle>
            ))}
        </>
    )