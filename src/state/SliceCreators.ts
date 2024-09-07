import { StateCreator } from "zustand";

import { SvgCanvasSlice } from "./SliceTypes";

export const createSvgCanvasSlice: StateCreator<SvgCanvasSlice> = (set) => ({
  svgRef: null,
  setSvgRef: (ref) => set({ svgRef: ref }),
  height: 0,
  width: 0,
  setDimensions: (w, h) => set({ height: h, width: w }),
});
