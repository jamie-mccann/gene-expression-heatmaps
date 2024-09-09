export interface SvgCanvasSlice {
  svgRef: React.RefObject<SVGSVGElement> | null;
  setSvgRef: (ref: React.RefObject<SVGSVGElement>) => void;
  height: number;
  width: number;
  setDimensions: (w: number, h: number) => void;
}

interface MatrixCell {
  row: number;
  col: number;
  value: number;
}

interface Sample {
  id: string;
  desc: string;
  index: number;
}

interface Gene {
  id: string;
  index: number;
}

export interface GeneExpressionData {
  nsamples: number;
  ngenes: number;
  matrix: MatrixCell[];
  samples: Sample[];
  genes: Gene[];
}

export interface GeneExpressionDataSlice {
  clusterId: number;
  datasetId: number;
  data: GeneExpressionData | null;
  setClusterId: (id: number) => void;
  setDatasetId: (id: number) => void;
  setData: (data: GeneExpressionData) => void;
}
