import { createElement } from "react";
import { LaunchLabPreview } from "../pages/LaunchLabPreview";
import { StarBeastGenesisPreview } from "../pages/StarBeastGenesisPreview";
import { StarBeastGenesisRendererSlicePreview } from "../pages/StarBeastGenesisRendererSlicePreview";

export const LAUNCH_LAB_PREVIEW_ROUTE = "/launch-lab-preview";
export const STAR_BEAST_GENESIS_PREVIEW_ROUTE = "/starbeast-genesis-preview";
export const STAR_BEAST_GENESIS_RENDERER_SLICE_PREVIEW_ROUTE =
  "/starbeast-genesis-renderer-slice-preview";

export const previewRoutes = [
  {
    path: LAUNCH_LAB_PREVIEW_ROUTE,
    element: createElement(LaunchLabPreview),
  },
  {
    path: STAR_BEAST_GENESIS_PREVIEW_ROUTE,
    element: createElement(StarBeastGenesisPreview),
  },
  {
    path: STAR_BEAST_GENESIS_RENDERER_SLICE_PREVIEW_ROUTE,
    element: createElement(StarBeastGenesisRendererSlicePreview),
  },
];
