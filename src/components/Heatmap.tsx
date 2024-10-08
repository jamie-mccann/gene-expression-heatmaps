import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { scaleLinear } from "d3-scale";
import { interpolateRdYlBu } from "d3-scale-chromatic";

import { useAppStore } from "../state/AppStore";
import { GeneExpressionData } from "../state/SliceTypes";

interface ChartDimensions {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  labelFontSize: number;
  labelPadding: number;
}

interface HeatMapProps {
  dimensions?: ChartDimensions;
  geneExpressionData: GeneExpressionData;
}

const defaultSettings = {
  marginTop: 30,
  marginRight: 30,
  marginBottom: 30,
  marginLeft: 30,
  labelFontSize: 10,
  labelPadding: 5,
};

const HeatMap = ({
  dimensions = defaultSettings,
  geneExpressionData,
}: HeatMapProps) => {
  const [xAxisLabelLength, setXAxisLabelLength] = useState<number>(0);
  const [yAxisLabelLength, setYAxisLabelLength] = useState<number>(0);

  const { svgWidth, svgHeight, svgRef } = useAppStore((state) => ({
    svgWidth: state.width,
    svgHeight: state.height,
    svgRef: state.svgRef,
  }));

  useEffect(() => {
    if (svgRef?.current) {
      const xTextLengths = geneExpressionData.samples.map((value) => {
        const textEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textEl.setAttribute("visibility", "hidden");
        textEl.setAttribute("font-size", `${dimensions.labelFontSize}`);
        textEl.textContent = value.id;
        svgRef.current?.appendChild(textEl);
        const length = textEl.getComputedTextLength();
        svgRef.current?.removeChild(textEl);
        return length;
      });

      setXAxisLabelLength(Math.max(...xTextLengths));

      const yTextLengths = geneExpressionData.genes.map((value) => {
        const textEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textEl.setAttribute("visibility", "hidden");
        textEl.setAttribute("font-size", `${dimensions.labelFontSize}`);
        textEl.textContent = value.id;
        svgRef.current?.appendChild(textEl);
        const length = textEl.getComputedTextLength();
        svgRef.current?.removeChild(textEl);
        return length;
      });

      setYAxisLabelLength(Math.max(...yTextLengths));
    }
  }, [svgHeight, svgWidth]);

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, geneExpressionData.nsamples])
        .range([
          dimensions.marginLeft,
          svgWidth -
            dimensions.marginRight -
            yAxisLabelLength -
            dimensions.labelPadding,
        ]),
    [svgWidth, yAxisLabelLength]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, geneExpressionData.ngenes])
        .range([
          dimensions.marginTop +
            xAxisLabelLength * Math.sin(Math.PI / 4) +
            dimensions.labelPadding,
          svgHeight - dimensions.marginBottom,
        ]),
    [svgHeight, xAxisLabelLength]
  );

  return (
    <>
      <g className="rectangles">
        {geneExpressionData.matrix.map((value, index) => (
          <motion.rect
            key={index}
            x={xScale(value.col)}
            y={yScale(value.row)}
            width={Math.abs(xScale(0) - xScale(1))}
            height={Math.abs(yScale(0) - yScale(1))}
            fill={interpolateRdYlBu(value.value)}
            stroke="white"
            strokeWidth={1}
            paintOrder="fill"
            opacity={1}
            whileHover={{
              transition: { duration: 0.5 },
              opacity: 0.6,
            }}
          >
            <title>{`Sample ID: ${
              geneExpressionData.samples[value.col].id
            } \u000ASample Desc: ${
              geneExpressionData.samples[value.col].desc
            }  \u000AGene ID: ${
              geneExpressionData.genes[value.row].id
            } \u000AValue: ${value.value}`}</title>
          </motion.rect>
        ))}
      </g>
      <g className="gene-labels">
        {geneExpressionData.genes.map((value, index) => (
          <motion.text
            key={index}
            transform={`translate(${
              svgWidth - dimensions.marginRight - yAxisLabelLength
            }, ${(yScale(index) + yScale(index + 1)) / 2})`}
            fontSize={dimensions.labelFontSize}
            textAnchor="left"
            dominantBaseline="middle"
            fontFamily="Arial"
            fontWeight="normal"
            whileHover={{
              transition: { duration: 0.7 },
              fontWeight: "bold",
            }}
          >
            {value.id}
            <title>{value.id}</title>
          </motion.text>
        ))}
      </g>
      <g className="sample-labels">
        {geneExpressionData.samples.map((value, index) => (
          <motion.text
            key={index}
            transform={`translate(${(xScale(index) + xScale(index + 1)) / 2},${
              dimensions.marginTop + xAxisLabelLength * Math.sin(Math.PI / 4)
            }) rotate(-45)`}
            fontSize={dimensions.labelFontSize}
            dominantBaseline="middle"
            textAnchor="left"
            fontFamily="Arial"
            fontWeight="normal"
            whileHover={{
              transition: { duration: 0.9 },
              fontWeight: "bold",
            }}
          >
            {value.id}
            <title>{value.desc}</title>
          </motion.text>
        ))}
      </g>
    </>
  );
};

export default HeatMap;
