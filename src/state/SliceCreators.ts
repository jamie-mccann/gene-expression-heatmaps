import { StateCreator } from "zustand";

import { GeneExpressionData, GeneExpressionDataSlice, SvgCanvasSlice } from "./SliceTypes";

export const createSvgCanvasSlice: StateCreator<SvgCanvasSlice> = (set) => ({
  svgRef: null,
  setSvgRef: (ref) => set({ svgRef: ref }),
  height: 0,
  width: 0,
  setDimensions: (w, h) => set({ height: h, width: w }),
});

// export const createGeneExpressionDataSlice: StateCreator<
//   GeneExpressionDataSlice
// > = (set) => ({
//   datasetId: null,
//   setDatasetId: (id) => {
//     set({ datasetId: id });
//     fetchGeneExpressionData(id);
//   },
//   data: null,
//   setData: (data) => set({ data: data }),
// });

export const createGeneExpressionDataSlice: StateCreator<
  GeneExpressionDataSlice
> = (set, get) => {
  const datasetOptions = [
    "original_order_ge_data.json",
    "ordered_by_gene_cluster_ge_data.json",
    "ordered_by_gene_and_sample_cluster_ge_data.json",
  ];

  const fetchGeneExpressionData = async (
    datasetId: number,
    clusterId: number
  ) => {
    const rowLength = 3 // n different clustering types, i.e. none, gene, gene + sample
    const index = datasetId * rowLength + clusterId; // position in datasetOptions
    const response = await fetch(`/data/${datasetOptions[index]}`);
    const data = await response.json() as GeneExpressionData;
    set({ data });
    console.log(data);
  };

  return {
    datasetId: 0,
    clusterId: 0,
    data: null,
    setClusterId: (id) => {
      set({ clusterId: id });
      const { datasetId } = get();
      fetchGeneExpressionData(datasetId, id);
    },
    setDatasetId: (id) => {
      set({ datasetId: id });
      const { clusterId } = get();
      fetchGeneExpressionData(id, clusterId);
    },
    setData: (data) => set({ data: data }),
  };
};
