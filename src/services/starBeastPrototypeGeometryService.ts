import type {
  StarBeastPrototypeCoreStar,
  StarBeastPrototypeGeometryPath,
  StarBeastPrototypeGeometryPoint,
  StarBeastPrototypeGeometryProfile,
} from "../types/starBeastPrototypeGeometry";
import type { StarBeastPrototypeRenderProjection } from "../types/starBeastRendererPrototypeAdapter";

const point = (x: number, y: number): StarBeastPrototypeGeometryPoint =>
  Object.freeze({ x, y });

const coreStar = (
  nodeId: StarBeastPrototypeCoreStar["nodeId"],
  x: number,
  y: number,
  role: StarBeastPrototypeCoreStar["role"],
): StarBeastPrototypeCoreStar => Object.freeze({ nodeId, x, y, role });

const path = (
  pathId: string,
  closed: boolean,
  coordinates: readonly (readonly [number, number])[],
): StarBeastPrototypeGeometryPath =>
  Object.freeze({
    pathId,
    closed,
    points: Object.freeze(coordinates.map(([x, y]) => point(x, y))),
  });

const BAIHU_CORE_STARS: readonly StarBeastPrototypeCoreStar[] = Object.freeze([
  coreStar("CORE_01", 0.18, 0.42, "ANCHOR"),
  coreStar("CORE_02", 0.29, 0.38, "ANCHOR"),
  coreStar("CORE_03", 0.4, 0.44, "ANCHOR"),
  coreStar("CORE_04", 0.51, 0.39, "STAR_CORE"),
  coreStar("CORE_05", 0.62, 0.43, "CRYSTAL_ANCHOR"),
  coreStar("CORE_06", 0.73, 0.48, "ANCHOR"),
  coreStar("CORE_07", 0.85, 0.4, "ANCHOR"),
]);

const BAIHU_SILHOUETTE_PATHS: readonly StarBeastPrototypeGeometryPath[] =
  Object.freeze([
    path("body-boundary", true, [
      [0.17, 0.43],
      [0.13, 0.39],
      [0.14, 0.34],
      [0.19, 0.31],
      [0.24, 0.33],
      [0.28, 0.37],
      [0.37, 0.34],
      [0.51, 0.33],
      [0.64, 0.35],
      [0.73, 0.4],
      [0.77, 0.46],
      [0.72, 0.51],
      [0.64, 0.52],
      [0.59, 0.61],
      [0.55, 0.61],
      [0.54, 0.52],
      [0.43, 0.52],
      [0.38, 0.61],
      [0.34, 0.61],
      [0.34, 0.51],
      [0.27, 0.48],
      [0.23, 0.53],
      [0.18, 0.52],
      [0.19, 0.47],
    ]),
    path("head-crown", false, [
      [0.14, 0.37],
      [0.11, 0.33],
      [0.15, 0.34],
      [0.16, 0.29],
      [0.2, 0.33],
      [0.24, 0.3],
      [0.24, 0.35],
    ]),
    path("head-jaw", false, [
      [0.13, 0.4],
      [0.1, 0.43],
      [0.15, 0.45],
      [0.2, 0.43],
      [0.24, 0.46],
    ]),
    path("front-leg", false, [
      [0.31, 0.48],
      [0.29, 0.58],
      [0.25, 0.62],
      [0.32, 0.62],
    ]),
    path("hind-leg", false, [
      [0.67, 0.5],
      [0.7, 0.59],
      [0.75, 0.61],
      [0.68, 0.62],
    ]),
    path("tail-spiral", false, [
      [0.72, 0.4],
      [0.8, 0.34],
      [0.88, 0.35],
      [0.91, 0.41],
      [0.88, 0.47],
      [0.82, 0.48],
      [0.79, 0.44],
      [0.82, 0.4],
      [0.86, 0.41],
    ]),
    path("shoulder-mark", false, [
      [0.3, 0.38],
      [0.34, 0.43],
      [0.31, 0.48],
    ]),
    path("flank-mark", false, [
      [0.47, 0.35],
      [0.5, 0.43],
      [0.54, 0.51],
    ]),
    path("haunch-mark", false, [
      [0.6, 0.36],
      [0.62, 0.43],
      [0.67, 0.5],
    ]),
  ]);

export function resolveBaihuPrototypeGeometryProfile(
  projection: StarBeastPrototypeRenderProjection,
): StarBeastPrototypeGeometryProfile {
  return Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_GEOMETRY_PROFILE",
    prototypeGeometryId: "BAIHU_CONSTELLATION_V1",
    sourceProjectionReference: projection,
    coreStars: BAIHU_CORE_STARS,
    silhouettePaths: BAIHU_SILHOUETTE_PATHS,
    crystalAnchorIndex: 4,
    normalizedCoordinates: true,
    staticPrototypeGeometry: true,
    visualReferenceOnly: true,
    noStarBeastIdentityInference: true,
    noBusinessStateMutation: true,
    noAssetGeneration: true,
  });
}
