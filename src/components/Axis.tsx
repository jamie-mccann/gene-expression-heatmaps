import { useMemo } from "react";
import { scaleLinear } from "d3-scale";

interface AxisProps {
  domain: number[];
  range: number[];
}

const Axis = ({ domain, range }: AxisProps) => {
  const ticks = useMemo(() => {
    const xScale = scaleLinear().domain(domain).range(range);

    const width = range[1] - range[0];
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    return xScale
      .ticks(numberOfTicksTarget)
      .map((value) => ({ value, xOffset: xScale(value) }));
  }, [domain.join("-"), range.join("-")]);

  const shiftY = 30;
  return (
    <>
      <path
        d={["M", range[0], 6 + shiftY, "v", -6, "H", range[1], "v", 6].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y1={shiftY} y2={shiftY+ 6} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(50px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default Axis;
