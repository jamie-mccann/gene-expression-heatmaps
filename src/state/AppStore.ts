import { create } from "zustand";

import { SvgCanvasSlice } from "./SliceTypes";
import { createSvgCanvasSlice } from "./SliceCreators";

export const useAppStore = create<SvgCanvasSlice>()((...storeArgs) => ({
  ...createSvgCanvasSlice(...storeArgs),
}));
