import type { StarBeastPrototypeRenderProjection } from "./starBeastRendererPrototypeAdapter";

export type StarBeastPrototypeGeometryPoint = Readonly<{
  x: number;
  y: number;
}>;

export type StarBeastPrototypeCoreStar = StarBeastPrototypeGeometryPoint &
  Readonly<{
    nodeId: `CORE_${number}`;
    role: "ANCHOR" | "STAR_CORE" | "CRYSTAL_ANCHOR";
  }>;

export type StarBeastPrototypeGeometryPath = Readonly<{
  pathId: string;
  closed: boolean;
  points: readonly StarBeastPrototypeGeometryPoint[];
}>;

export type StarBeastPrototypeGeometryProfile = Readonly<{
  semanticRole: "STAR_BEAST_PROTOTYPE_GEOMETRY_PROFILE";
  prototypeGeometryId: "BAIHU_CONSTELLATION_V1";
  sourceProjectionReference: StarBeastPrototypeRenderProjection;
  coreStars: readonly StarBeastPrototypeCoreStar[];
  silhouettePaths: readonly StarBeastPrototypeGeometryPath[];
  crystalAnchorIndex: number;
  normalizedCoordinates: true;
  staticPrototypeGeometry: true;
  visualReferenceOnly: true;
  noStarBeastIdentityInference: true;
  noBusinessStateMutation: true;
  noAssetGeneration: true;
}>;
