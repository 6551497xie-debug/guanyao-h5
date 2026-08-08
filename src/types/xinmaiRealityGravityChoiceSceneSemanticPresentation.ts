import type {
  ChoiceActionRouteResolution,
} from "./xinmaiChoiceActionRoute";
import type {
  ChoicePresentationReadinessDecision,
} from "./xinmaiChoicePresentationReadiness";
import type {
  GravityObservationResumeDecision,
} from "./xinmaiGravityObservationContinuity";
import type {
  RealityPressureRecognitionReceiptLifecycle,
} from "./xinmaiRealityAdventureContinuity";
import type {
  RealityPressureSeedCaptureState,
} from "./realityPressureSeedCaptureContract";
import type {
  XinmaiContinuousSceneNearObjectKind,
} from "./xinmaiContinuousScenePresentation";

export const XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_VERSION =
  "XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_V1" as const;

export type XinmaiRealityGravityChoiceSceneSemanticStage =
  | "REALITY_APPROACHING"
  | "PRESSURE_RECOGNIZED"
  | "GRAVITY_OBSERVING"
  | "GRAVITY_RECOGNIZED"
  | "CHOICE_READY"
  | "CHOICE_COMMITTED";

export type XinmaiRealityGravityChoiceSceneSemanticSafeWithheldReason =
  | "PRESENTATION_PAUSED"
  | "CONSUMER_SURFACE_UNSUPPORTED"
  | "ROUTE_ADMISSION_NOT_CURRENT"
  | "SOURCE_OR_IDENTITY_MISMATCH"
  | "PRESSURE_RECOGNITION_PROOF_MISSING"
  | "PRESSURE_RECOGNITION_LINEAGE_MISMATCH"
  | "GRAVITY_ADMISSION_MISMATCH"
  | "OBSERVATION_PROOF_MISSING"
  | "OBSERVATION_LINEAGE_MISMATCH"
  | "CHOICE_READINESS_SAFE_WITHHELD"
  | "CHOICE_LINEAGE_MISMATCH"
  | "ACTION_ROUTE_MISSING_OR_MISMATCH"
  | "TERMINAL_GROWTH_OWNS_PRESENTATION";

export type XinmaiRealityGravityChoiceSceneLineage = Readonly<{
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  identityReferenceId: string | null;
  bodyReferenceId: string | null;
  routeAdmissionStatus: "CURRENT" | "PENDING" | "STALE" | "MISMATCH";
  routeAdmissionReferenceId: string;
  routeAdmissionRevision: number;
  sourceEncounterCycleId: string;
  gravityCycleId: string | null;
  gravityObservationReferenceId: string | null;
}>;

export type XinmaiRealitySceneSemanticFacts = Readonly<{
  consumerSurface: "REALITY";
  captureState: RealityPressureSeedCaptureState;
  selectedPressureSeedId: string | null;
  recognitionReceiptReferenceId: string | null;
  recognitionReceiptRevision: number | null;
  recognitionReceiptLifecycle:
    | RealityPressureRecognitionReceiptLifecycle
    | null;
  recognitionCanonicalRevision: number | null;
}>;

export type XinmaiGravityChoiceSceneSemanticFacts = Readonly<{
  consumerSurface: "GRAVITY_CHOICE";
  gravityAdmissionReferenceId: string;
  gravityAdmissionRevision: number;
  gravityCycleId: string;
  sourceEncounterCycleId: string;
  gravityObservationReferenceId: string;
  observationDecision: GravityObservationResumeDecision;
  choiceDecision: ChoicePresentationReadinessDecision;
  actionRouteResolution: ChoiceActionRouteResolution;
}>;

export type XinmaiRealityGravityChoiceSceneSemanticFacts =
  | XinmaiRealitySceneSemanticFacts
  | XinmaiGravityChoiceSceneSemanticFacts;

export type XinmaiRealityGravityChoiceSceneSemanticInput = Readonly<{
  schemaVersion:
    typeof XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_VERSION;
  lineage: XinmaiRealityGravityChoiceSceneLineage;
  facts: XinmaiRealityGravityChoiceSceneSemanticFacts;
}>;

export type XinmaiRealityGravityChoicePhysicalPlan = Readonly<{
  farFocus:
    | "QUIET_CONTINUITY"
    | "REALITY_APPROACH"
    | "GRAVITY_CONTRACTION"
    | "REAL_LIFE_OPENING";
  midResponse:
    | "SAME_LIFE_STABLE"
    | "VEIL_REVEALED"
    | "LOCAL_CONTRACTION"
    | "PROTECTIVE_PATH_VISIBLE"
    | "CHOICE_TRACE_HELD";
  nearEmphasis:
    | "NONE"
    | "PRESSURE_CANDIDATE"
    | "RECOGNIZED_PRESSURE"
    | "OBSERVATION_PATH"
    | "COMPARABLE_CHOICE_FIELD"
    | "COMMITTED_CHOICE_TRACE";
  forceField:
    | "NONE"
    | "OBSERVATION_ATTRACTOR"
    | "PROTECTION_BENEFIT_COST_BALANCE"
    | "COMMITTED_DIRECTION_WITHOUT_COMPLETION";
  transitionMeaning:
    | "NO_AUTHORITY_CHANGE"
    | "USER_RECOGNITION_REFLECTED"
    | "OBSERVATION_REFLECTED"
    | "CHOICE_AVAILABLE_NOT_SELECTED"
    | "CHOICE_COMMITTED_NOT_LIVED";
}>;

export type XinmaiRealityGravityChoiceSceneSemanticProjection =
  | Readonly<{
      status: "PRESENTABLE";
      semanticProjectionReferenceId: string;
      semanticStage: XinmaiRealityGravityChoiceSceneSemanticStage;
      lineage: XinmaiRealityGravityChoiceSceneLineage;
      nearObjectKind: XinmaiContinuousSceneNearObjectKind;
      nearObjectReferenceId: string | null;
      physicalPlan: XinmaiRealityGravityChoicePhysicalPlan;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      semanticProjectionReferenceId: string | null;
      consumerSurface: "REALITY" | "GRAVITY_CHOICE";
      reason: XinmaiRealityGravityChoiceSceneSemanticSafeWithheldReason;
    }>;

export const XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_BOUNDARY =
  Object.freeze({
    presentationOnly: true as const,
    pureResolverOnly: true as const,
    existingTypedFactsOnly: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noDomInput: true as const,
    noTimerInput: true as const,
    noAnimationAuthority: true as const,
    noControllerCall: true as const,
    noAuthorityWriteback: true as const,
    noNavigationMutation: true as const,
    noUserText: true as const,
  });
