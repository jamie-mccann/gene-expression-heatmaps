import { ReactNode, useEffect, useRef } from "react";

import { useAppStore } from "../state/AppStore";

interface SvgCanvasProps {
  children?: ReactNode | ReactNode[];
}

const SvgCanvas = ({ children }: SvgCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const setSvgRef = useAppStore((state) => state.setSvgRef);
  const setDimensions = useAppStore((state) => state.setDimensions);

  const { svgWidth, svgHeight } = useAppStore((state) => ({
    svgWidth: state.width,
    svgHeight: state.height,
  }));


  const updateDimensions = () => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setDimensions(width, height);
      console.log(`width: ${width} height: ${height}`);
    }
  };

  useEffect(() => {
    setSvgRef(svgRef);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  }, []);

  return (
    <svg viewBox={`-0.5 -0.5 ${svgWidth} ${svgHeight}`} ref={svgRef} style={{ height: "100%", width: "100%" }}>
      {children}
    </svg>
  );
};

export default SvgCanvas;
