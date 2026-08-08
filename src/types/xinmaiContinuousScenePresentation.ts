import type {
  XinmaiSameLifeSurfaceCommitProof,
  XinmaiSameLifeSurfaceOutcome,
  XinmaiSameLifeSurfaceSelection,
} from "./xinmaiSameLifeSurfacePresentation";

export const XINMAI_CONTINUOUS_SCENE_PRESENTATION_VERSION =
  "XINMAI_CONTINUOUS_SCENE_PRESENTATION_V1" as const;

export type XinmaiContinuousSceneConsumerSurface =
  | "ENTRY_BIRTH"
  | "GENESIS"
  | "REALITY"
  | "GRAVITY_CHOICE"
  | "RETURNING_OWNERSHIP"
  | "ARCHIVE";

export type XinmaiContinuousSceneNativeMotionPreference =
  | "MOTION_ALLOWED"
  | "REDUCED_MOTION";

export type XinmaiContinuousSceneQualityTier =
  | "FULL"
  | "CONSERVE_DATA";

export type XinmaiContinuousSceneNearObjectKind =
  | "NONE"
  | "BIRTH_COORDINATE"
  | "LIFE_ORIGIN"
  | "REALITY_WEATHER_NODE"
  | "GRAVITY_OBSERVATION"
  | "CHOICE_ACTION"
  | "LIVED_RESPONSE"
  | "CRYSTAL_OWNERSHIP"
  | "ARCHIVE_IMPRINT";

export type XinmaiContinuousSceneRouteAdmissionEvidence = Readonly<{
  status: "CURRENT" | "PENDING" | "STALE" | "MISMATCH";
  admissionReferenceId: string;
  revision: number;
}>;

export type XinmaiContinuousSceneSameLifeInput = Readonly<{
  selection: XinmaiSameLifeSurfaceSelection;
  publicOutcome: XinmaiSameLifeSurfaceOutcome | null;
}>;

export type XinmaiContinuousSceneInput = Readonly<{
  schemaVersion: typeof XINMAI_CONTINUOUS_SCENE_PRESENTATION_VERSION;
  consumerSurface: XinmaiContinuousSceneConsumerSurface;
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  identityReferenceId: string | null;
  bodyReferenceId: string | null;
  routeAdmissionEvidence: XinmaiContinuousSceneRouteAdmissionEvidence;
  nearObjectKind: XinmaiContinuousSceneNearObjectKind;
  nearObjectReferenceId: string | null;
  nativeMotionPreference: XinmaiContinuousSceneNativeMotionPreference;
  qualityTier: XinmaiContinuousSceneQualityTier;
  sameLifeSurface: XinmaiContinuousSceneSameLifeInput | null;
}>;

export type XinmaiContinuousSceneDepthPlan = Readonly<{
  far: Readonly<{
    topologyReferenceId: string;
    qualityTier: XinmaiContinuousSceneQualityTier;
    environmentFocus: XinmaiContinuousSceneConsumerSurface;
  }>;
  mid: Readonly<{
    presenterRequirement:
      | "IDENTITY_BLIND_LIFE_FIELD"
      | "GENESIS_MANIFESTATION"
      | "SAME_LIFE_BODY";
    identityReferenceId: string | null;
    bodyReferenceId: string | null;
    imprintReferenceIds: readonly string[];
  }>;
  near: Readonly<{
    interactiveObjectKind: XinmaiContinuousSceneNearObjectKind;
    objectReferenceId: string | null;
    interactiveObjectCount: 0 | 1;
    hitRegionContract: "NATIVE_CONTROL" | "HOST_CANVAS_SINGLE_TARGET" | "NONE";
  }>;
}>;

export type XinmaiContinuousSceneSafeWithheldReason =
  | "PRESENTATION_PAUSED"
  | "ROUTE_ADMISSION_NOT_CURRENT"
  | "SOURCE_REFERENCE_MISSING"
  | "RENDER_PLAN_REFERENCE_MISSING"
  | "IDENTITY_REFERENCE_MISMATCH"
  | "SAME_LIFE_FACTS_UNAVAILABLE"
  | "SAME_LIFE_PROOF_UNAVAILABLE"
  | "PRESENTER_UNAVAILABLE"
  | "PRESENTER_COMMIT_MISMATCH"
  | "WEBGL_INITIALIZATION_FAILED"
  | "WEBGL_RUNTIME_FAILED";

export type XinmaiContinuousScenePlan =
  | Readonly<{
      status: "PRESENTABLE";
      scenePlanReferenceId: string;
      sourceReferenceId: string;
      sourceRenderPlanReferenceId: string;
      consumerSurface: XinmaiContinuousSceneConsumerSurface;
      presentationMode: "MOTION" | "STATIC";
      stableVisualSeed: number;
      depth: XinmaiContinuousSceneDepthPlan;
      sameLifeSurfaceSelection: XinmaiSameLifeSurfaceSelection | null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      scenePlanReferenceId: string | null;
      sourceReferenceId: string | null;
      sourceRenderPlanReferenceId: string | null;
      consumerSurface: XinmaiContinuousSceneConsumerSurface;
      reason: XinmaiContinuousSceneSafeWithheldReason;
    }>;

export type XinmaiContinuousScenePresenterCommitProof = Readonly<{
  presenter:
    | "WEBGL_CONTINUOUS_SCENE"
    | "CANVAS_2D_CONTINUOUS_SCENE"
    | "SEMANTIC_STATIC_CONTINUOUS_SCENE";
  scenePlanReferenceId: string;
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  sceneHostCount: 1;
  worldPresenterCount: 1;
  worldContextCount: 0 | 1;
  webglContextCount: 0 | 1;
  rafOwnerCount: 0 | 1;
  bodyPresenterCount: 0 | 1;
  interactiveNearObjectCount: 0 | 1;
  sameLifeSurfaceCommitProof: XinmaiSameLifeSurfaceCommitProof | null;
}>;

export type XinmaiContinuousSceneOutcome =
  | Readonly<{
      status:
        | "CONTINUOUS_SCENE_MOTION_PRESENTED"
        | "CONTINUOUS_SCENE_STATIC_PRESENTED";
      scenePlanReferenceId: string;
      sourceReferenceId: string;
      sourceRenderPlanReferenceId: string;
      consumerSurface: XinmaiContinuousSceneConsumerSurface;
      proof: XinmaiContinuousScenePresenterCommitProof;
      presentedAt: string;
    }>
  | Readonly<{
      status: "CONTINUOUS_SCENE_SAFE_WITHHELD";
      consumerSurface: XinmaiContinuousSceneConsumerSurface;
      scenePlanReferenceId: string | null;
      reason: XinmaiContinuousSceneSafeWithheldReason;
      proof: null;
      reportedAt: string;
    }>;

export type XinmaiContinuousSceneRendererFailure = Readonly<{
  status: "CONTINUOUS_SCENE_RENDERER_FAILED";
  stage: "INITIALIZATION" | "RUNTIME";
  reason: "WEBGL_UNAVAILABLE" | "CONTEXT_LOST" | "RENDER_FAILED";
  scenePlanReferenceId: string;
}>;

export type XinmaiContinuousSceneBoundary = Readonly<{
  presentationOnly: true;
  appShellHostOnly: true;
  routePublishesTypedFactsOnly: true;
  singleWorldCanvasOwner: true;
  singleRafOwner: true;
  singleResizeOwner: true;
  singleVisibilityOwner: true;
  singleCanvasPointerOwner: true;
  sameLifeAuthorityPreserved: true;
  noStorageRead: true;
  noStorageWrite: true;
  noAuthorityWriteback: true;
  noNavigationMutation: true;
  noDomSuccessAuthority: true;
  noTimerSuccessAuthority: true;
}>;

export const XINMAI_CONTINUOUS_SCENE_BOUNDARY:
  XinmaiContinuousSceneBoundary = Object.freeze({
    presentationOnly: true,
    appShellHostOnly: true,
    routePublishesTypedFactsOnly: true,
    singleWorldCanvasOwner: true,
    singleRafOwner: true,
    singleResizeOwner: true,
    singleVisibilityOwner: true,
    singleCanvasPointerOwner: true,
    sameLifeAuthorityPreserved: true,
    noStorageRead: true,
    noStorageWrite: true,
    noAuthorityWriteback: true,
    noNavigationMutation: true,
    noDomSuccessAuthority: true,
    noTimerSuccessAuthority: true,
  });
