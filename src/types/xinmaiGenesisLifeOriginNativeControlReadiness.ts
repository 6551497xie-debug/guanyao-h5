import type { GenesisManifestationExperienceStateResult } from "./genesisManifestationExperienceState";
import type { GenesisProductionRecognitionRealityResult } from "./genesisProductionRecognitionRealityEntry";
import type { GenesisProductionRouteActivationAuthorization } from "./genesisProductionRouteAuthorization";
import type { GenesisProductionRuntimeConsumerResult } from "./genesisProductionRuntimeConsumer";
import type { GenesisVisualConsumerSourceResult } from "./genesisVisualConsumerSource";

export type XinmaiGenesisLifeOriginDiscoveryPhase =
  | "DORMANT"
  | "DISCOVERING"
  | "REVEALED";

export type XinmaiGenesisLifeOriginNativeControlPresentationPolicy =
  | "ENABLED"
  | "SAFE_WITHHELD";

export type XinmaiGenesisLifeOriginActivationRevalidation =
  | "CURRENT"
  | "SAFE_WITHHELD";

export type XinmaiGenesisLifeOriginNativeControlWaitingReason =
  | "GENESIS_COMPLETION_PENDING"
  | "MANIFESTATION_APPROACH_PENDING"
  | "RECOGNITION_SESSION_PENDING";

export type XinmaiGenesisLifeOriginNativeControlConsumedReason =
  | "DISCOVERY_IN_PROGRESS"
  | "DISCOVERY_REVEALED";

export type XinmaiGenesisLifeOriginNativeControlSafeWithheldReason =
  | "PRESENTATION_PAUSED"
  | "ACTIVATION_REVALIDATION_FAILED"
  | "ROUTE_ADMISSION_NOT_READY"
  | "SOURCE_REFERENCE_MISSING"
  | "SOURCE_REFERENCE_MISMATCH"
  | "RUNTIME_STATE_MISMATCH"
  | "MANIFESTATION_STATE_MISMATCH"
  | "RECOGNITION_SESSION_BLOCKED"
  | "RECOGNITION_STATE_MISMATCH"
  | "DISCOVERY_STATE_MISMATCH";

export type XinmaiGenesisLifeOriginNativeControlReadinessBoundary = Readonly<{
  presentationReadinessOnly: true;
  nativeButtonSingleOwner: true;
  sourceReferenceContinuityRequired: true;
  handlerRevalidationRequired: true;
  sceneNearObjectReadOnly: true;
  noStorageRead: true;
  noStorageWrite: true;
  noAuthorityWriteback: true;
  noRecognitionMutation: true;
  noNavigationMutation: true;
  noRendererInput: true;
  noSceneOutcomeInput: true;
  noDomInput: true;
  noCssInput: true;
  noTimerInput: true;
  noRafInput: true;
}>;

export type XinmaiGenesisLifeOriginNativeControlReadinessInput = Readonly<{
  policy: XinmaiGenesisLifeOriginNativeControlPresentationPolicy;
  routeAuthorization: GenesisProductionRouteActivationAuthorization;
  consumerSourceResult: GenesisVisualConsumerSourceResult | null;
  productionRuntimeResult: GenesisProductionRuntimeConsumerResult | null;
  manifestationExperienceResult:
    | GenesisManifestationExperienceStateResult
    | null;
  recognitionRealityResult:
    | GenesisProductionRecognitionRealityResult
    | null;
  discoveryPhase: XinmaiGenesisLifeOriginDiscoveryPhase;
  activationRevalidation:
    XinmaiGenesisLifeOriginActivationRevalidation;
}>;

type XinmaiGenesisLifeOriginNativeControlReadinessCommon = Readonly<{
  source: "xinmai_genesis_life_origin_native_control_readiness";
  controlOwner: "NATIVE_BUTTON" | "NONE";
  sceneNearObject: "LIFE_ORIGIN" | "NONE";
  sourceReferenceId: string | null;
  boundary: XinmaiGenesisLifeOriginNativeControlReadinessBoundary;
}>;

export type XinmaiGenesisLifeOriginNativeControlWaiting =
  XinmaiGenesisLifeOriginNativeControlReadinessCommon &
    Readonly<{
      status: "WAITING";
      controlOwner: "NONE";
      sceneNearObject: "NONE";
      reason: XinmaiGenesisLifeOriginNativeControlWaitingReason;
    }>;

export type XinmaiGenesisLifeOriginNativeControlReady =
  XinmaiGenesisLifeOriginNativeControlReadinessCommon &
    Readonly<{
      status: "READY";
      controlOwner: "NATIVE_BUTTON";
      sceneNearObject: "LIFE_ORIGIN";
      sourceReferenceId: string;
      reason: null;
    }>;

export type XinmaiGenesisLifeOriginNativeControlConsumed =
  XinmaiGenesisLifeOriginNativeControlReadinessCommon &
    Readonly<{
      status: "CONSUMED";
      controlOwner: "NONE";
      sceneNearObject: "NONE";
      sourceReferenceId: string;
      reason: XinmaiGenesisLifeOriginNativeControlConsumedReason;
    }>;

export type XinmaiGenesisLifeOriginNativeControlSafeWithheld =
  XinmaiGenesisLifeOriginNativeControlReadinessCommon &
    Readonly<{
      status: "SAFE_WITHHELD";
      controlOwner: "NONE";
      sceneNearObject: "NONE";
      reason: XinmaiGenesisLifeOriginNativeControlSafeWithheldReason;
    }>;

export type XinmaiGenesisLifeOriginNativeControlReadiness =
  | XinmaiGenesisLifeOriginNativeControlWaiting
  | XinmaiGenesisLifeOriginNativeControlReady
  | XinmaiGenesisLifeOriginNativeControlConsumed
  | XinmaiGenesisLifeOriginNativeControlSafeWithheld;
