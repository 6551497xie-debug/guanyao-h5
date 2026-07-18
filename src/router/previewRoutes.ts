import { createElement, lazy, Suspense } from "react";
import { LaunchLabPreview } from "../pages/LaunchLabPreview";
import { StarBeastGenesisPreview } from "../pages/StarBeastGenesisPreview";
import { StarBeastGenesisRendererSlicePreview } from "../pages/StarBeastGenesisRendererSlicePreview";

const PersonalStarBeastWebGLPrototypeHarness = import.meta.env.DEV
  ? lazy(() =>
      import("../pages/PersonalStarBeastWebGLPrototypeHarness").then(
        (module) => ({
          default: module.PersonalStarBeastWebGLPrototypeHarness,
        }),
      ),
    )
  : null;

export const LAUNCH_LAB_PREVIEW_ROUTE = "/launch-lab-preview";
export const STAR_BEAST_GENESIS_PREVIEW_ROUTE = "/starbeast-genesis-preview";
export const STAR_BEAST_GENESIS_RENDERER_SLICE_PREVIEW_ROUTE =
  "/starbeast-genesis-renderer-slice-preview";
export const PERSONAL_STAR_BEAST_WEBGL_PROTOTYPE_ROUTE =
  "/personal-star-beast-webgl-prototype";

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
  ...(PersonalStarBeastWebGLPrototypeHarness === null
    ? []
    : [
        {
          path: PERSONAL_STAR_BEAST_WEBGL_PROTOTYPE_ROUTE,
          element: createElement(
            Suspense,
            { fallback: null },
            createElement(PersonalStarBeastWebGLPrototypeHarness, {
              sourceExperienceMode: "FIXTURE_PREVIEW_ONLY",
            }),
          ),
        },
      ]),
];
