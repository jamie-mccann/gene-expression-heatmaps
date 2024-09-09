import { create } from "zustand";

import { GeneExpressionDataSlice, SvgCanvasSlice } from "./SliceTypes";
import {
  createGeneExpressionDataSlice,
  createSvgCanvasSlice,
} from "./SliceCreators";

export const useAppStore = create<SvgCanvasSlice & GeneExpressionDataSlice>()(
  (...storeArgs) => ({
    ...createSvgCanvasSlice(...storeArgs),
    ...createGeneExpressionDataSlice(...storeArgs),
  })
);
