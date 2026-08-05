import type { XinmaiCanonicalBodyImprintDecision } from "./xinmaiCanonicalBodyImprint";

export const XINMAI_SAME_LIFE_SURFACE_PRESENTATION_VERSION =
  "XINMAI_SAME_LIFE_SURFACE_PRESENTATION_V1" as const;

export type XinmaiSameLifeSurfaceConsumer =
  | "REALITY"
  | "GRAVITY"
  | "RETURNING"
  | "ARCHIVE";

export type XinmaiSameLifeImprintRenderFact = Readonly<{
  imprintReferenceId: string;
  crystalReferenceId: string;
  bodyReferenceId: string;
  deterministicGeometryKey: string;
  stableNodeIndex: number;
  salience: "CURRENT_FORMATION_FOCUS" | "SETTLED_HISTORY";
}>;

export type XinmaiSameLifeSurfaceFacts = Readonly<{
  schemaVersion: typeof XINMAI_SAME_LIFE_SURFACE_PRESENTATION_VERSION;
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  bodyReferenceId: string;
  canonicalImprintStatus: XinmaiCanonicalBodyImprintDecision["status"];
  imprints: readonly XinmaiSameLifeImprintRenderFact[];
}>;

export type XinmaiSameLifeSurfaceSelection =
  | Readonly<{
      status: "MOTION_SELECTED";
      facts: XinmaiSameLifeSurfaceFacts;
      presenter: "WEBGL_SAME_LIFE_BODY";
      webglContextPolicy: "REQUIRED";
    }>
  | Readonly<{
      status: "STATIC_SELECTED";
      facts: XinmaiSameLifeSurfaceFacts;
      presenter: "SEMANTIC_STATIC_SAME_LIFE_BODY";
      webglContextPolicy: "FORBIDDEN";
      reason: "NATIVE_REDUCED_MOTION" | "WEBGL_UNAVAILABLE";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      facts: null;
      presenter: null;
      webglContextPolicy: "FORBIDDEN";
      reason:
        | "PRESENTATION_PAUSED"
        | "CANONICAL_FACTS_UNAVAILABLE"
        | "IDENTITY_MISMATCH"
        | "SOURCE_NOT_READY";
    }>;

export type XinmaiSameLifeSurfaceCommitProof = Readonly<{
  presenter:
    | "WEBGL_SAME_LIFE_BODY"
    | "SEMANTIC_STATIC_SAME_LIFE_BODY";
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  bodyReferenceId: string;
  imprintReferenceIds: readonly string[];
  bodyPresenterCount: 1;
  webglContextCount: 0 | 1;
}>;

export type XinmaiSameLifeSurfaceOutcome =
  | Readonly<{
      status: "MOTION_SAME_LIFE_SURFACE_PRESENTED";
      consumer: XinmaiSameLifeSurfaceConsumer;
      facts: XinmaiSameLifeSurfaceFacts;
      proof: XinmaiSameLifeSurfaceCommitProof;
      presentedAt: string;
    }>
  | Readonly<{
      status: "STATIC_SAME_LIFE_SURFACE_PRESENTED";
      consumer: XinmaiSameLifeSurfaceConsumer;
      facts: XinmaiSameLifeSurfaceFacts;
      proof: XinmaiSameLifeSurfaceCommitProof;
      presentedAt: string;
    }>
  | Readonly<{
      status: "SAME_LIFE_SURFACE_SAFE_WITHHELD";
      consumer: XinmaiSameLifeSurfaceConsumer;
      facts: null;
      proof: null;
      reason:
        | "PRESENTATION_PAUSED"
        | "CANONICAL_FACTS_UNAVAILABLE"
        | "IDENTITY_MISMATCH"
        | "SOURCE_NOT_READY"
        | "PRESENTER_COMMIT_MISMATCH";
      reportedAt: string;
    }>;
