import type { GenesisRealityPresenceContinuityContext } from "./genesisRealityPresenceContinuityBridge";
import type { RealLifeVisualSource } from "./realLifeVisualSourceAdapter";
import type { RealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityCoordinatePresenceVisualSourceProjectionInput = Readonly<{
  realUserGenesisVisualSourceContext:
    | RealUserGenesisVisualSourceContext
    | null;
  genesisPresenceContinuityContext:
    | GenesisRealityPresenceContinuityContext
    | null;
  realityRouteAuthorization:
    | RealityProductionRouteActivationAuthorization
    | null;
}>;

export type RealityCoordinatePresenceVisualSourceProjection = Readonly<{
  semanticRole: "REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  manifestationSourceReferenceId: string;
  presenceReferenceId: string;
  presenceState: "RECOGNIZED";
  continuityState: "CARRIED_TO_REALITY";
  arrivalState: "REALITY_APPROACHING";
  coordinateRole: "REALITY_COORDINATE_OBSERVATION";
  presenceRole: "RECOGNIZED_LIFE_PRESENCE";
  visualSource: RealLifeVisualSource;
  sceneModel: RealLifeVisualSource["sceneModel"];
  renderPlan: RealLifeVisualSource["renderPlan"];
  renderPlanResult: RealLifeVisualSource["renderPlanResult"];
  projectionBundle: RealLifeVisualSource["projectionBundle"];
  genesisVisualSourceContext: RealUserGenesisVisualSourceContext;
  genesisPresenceContinuityContext: GenesisRealityPresenceContinuityContext;
  realityRouteAuthorization: Extract<
    RealityProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
  existingVisualSourceReferencesOnly: true;
  sameManifestationSourceOnly: true;
  noVisualSourceCopy: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noVisualCalibration: true;
  noPressureMutation: true;
  noGravityMutation: true;
  noChoiceMutation: true;
  noCrystalMutation: true;
  noFallback: true;
}>;

export type RealityCoordinatePresenceVisualSourceProjectionBoundary =
  Readonly<{
    sourceProjectionOnly: true;
    existingRealUserVisualSourceOnly: true;
    recognizedPresenceContinuityRequired: true;
    authorizedRealityRouteOnly: true;
    sourceReferenceContinuityRequired: true;
    manifestationReferenceContinuityRequired: true;
    immutableProjectionOnly: true;
    preserveExistingVisualObjectIdentity: true;
    noVisualSourceCopy: true;
    noEngineInvocation: true;
    noSourceRecalculation: true;
    noEntityGeneration: true;
    noAssetGeneration: true;
    noPresenceMutation: true;
    noRendererInvocation: true;
    noRendererInputMutation: true;
    noVisualCalibration: true;
    noPressureExecution: true;
    noPressureMutation: true;
    noGravityMutation: true;
    noChoiceMutation: true;
    noCrystalMutation: true;
    noRouteMutation: true;
    noUiIntegration: true;
    noStorageRead: true;
    noStorageWrite: true;
    noFixtureSource: true;
    noPrototypeSource: true;
    noDefaultSource: true;
    noFallback: true;
  }>;

export type RealityCoordinatePresenceVisualSourceProjectionBlockedReason =
  | "GENESIS_VISUAL_SOURCE_CONTEXT_REQUIRED"
  | "GENESIS_VISUAL_SOURCE_CONTEXT_INVALID"
  | "GENESIS_PRESENCE_CONTINUITY_CONTEXT_REQUIRED"
  | "GENESIS_PRESENCE_CONTINUITY_CONTEXT_INVALID"
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "REALITY_ROUTE_AUTHORIZATION_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANIFESTATION_SOURCE_REFERENCE_MISMATCH";

export type RealityCoordinatePresenceVisualSourceProjectionResult =
  | Readonly<{
      status: "READY";
      source: "reality_coordinate_presence_visual_source_projection";
      projection: RealityCoordinatePresenceVisualSourceProjection;
      input: RealityCoordinatePresenceVisualSourceProjectionInput;
      boundary: RealityCoordinatePresenceVisualSourceProjectionBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "reality_coordinate_presence_visual_source_projection";
      reason: RealityCoordinatePresenceVisualSourceProjectionBlockedReason;
      projection: null;
      input: RealityCoordinatePresenceVisualSourceProjectionInput;
      boundary: RealityCoordinatePresenceVisualSourceProjectionBoundary;
    }>;
