export interface SvgCanvasSlice {
  svgRef: React.RefObject<SVGSVGElement> | null;
  setSvgRef: (ref: React.RefObject<SVGSVGElement>) => void;
  height: number;
  width: number;
  setDimensions: (w: number, h: number) => void;
}
