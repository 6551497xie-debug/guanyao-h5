import { createElement } from "react";
import { LaunchLabPreview } from "../pages/LaunchLabPreview";

export const LAUNCH_LAB_PREVIEW_ROUTE = "/launch-lab-preview";

export const previewRoutes = [
  {
    path: LAUNCH_LAB_PREVIEW_ROUTE,
    element: createElement(LaunchLabPreview),
  },
];
