import type { RealityCoordinatePresenceVisualSourceProjection } from "./realityCoordinatePresenceVisualSourceProjection";
import type { RealityPresenceVisualCalibrationHandoffSnapshot } from "./realityPresenceVisualCalibrationHandoffSnapshot";

export type RealityPresenceRendererAuthorizationInput = Readonly<{
  presenceVisualSourceProjection:
    | RealityCoordinatePresenceVisualSourceProjection
    | null;
  visualCalibrationHandoffSnapshot:
    | RealityPresenceVisualCalibrationHandoffSnapshot
    | null;
}>;

export type RealityPresenceProductionRendererHostAuthorization = Readonly<{
  authorizationId: "GUANYAO_REALITY_PRESENCE_PRODUCTION_RENDERER_AUTHORIZATION_V1";
  classification: "PRODUCTION";
  authorizedTarget: "REALITY_PRESENCE_PRODUCTION_RENDERER_HOST";
  authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE";
  authorizedSourceMode: "REAL_USER_EXPERIENCE";
  authorizedSourceProvenance: "REAL_USER_SESSION";
  authorizedSourceReferenceId: string;
  authorizedManifestationSourceReferenceId: string;
  authorizedPresenceState: "RECOGNIZED";
  authorizedRealityArrivalState: "REALITY_APPROACHING";
  authorizedCalibrationSnapshotSchema: "GUANYAO_REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_V1";
  hostEligibility: "ELIGIBLE";
  productionRenderingStatus: "AUTHORIZED";
  sourceProjectionStatus: "AUTHORIZED";
  calibrationHandoffStatus: "AUTHORIZED";
  fixtureSourceStatus: "FORBIDDEN";
  prototypeAuthorizationStatus: "NOT_ACCEPTED";
  routeIntegrationStatus: "NOT_AUTHORIZED_IN_THIS_CONTRACT";
  rendererInvocationStatus: "NOT_STARTED";
  fallbackRequired: true;
}>;

export type RealityPresenceRendererAuthorizationBoundary = Readonly<{
  rendererAuthorizationOnly: true;
  existingPresenceVisualSourceProjectionOnly: true;
  existingVisualCalibrationHandoffSnapshotOnly: true;
  recognizedPresenceOnly: true;
  realityApproachingOnly: true;
  sourceReferenceContinuityRequired: true;
  manifestationReferenceContinuityRequired: true;
  productionHostEligibilityOnly: true;
  immutableAuthorizationOnly: true;
  noEngineResult: true;
  noUserData: true;
  noSceneModel: true;
  noRenderPlan: true;
  noCalibrationCopy: true;
  noCalibrationMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererCoreInvocation: true;
  noRendererHostImplementation: true;
  noRouteIntegration: true;
  noNavigationMutation: true;
  noUiIntegration: true;
  noTimelineMutation: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noStorageRead: true;
  noStorageWrite: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noFallbackSource: true;
}>;

export type RealityPresenceRendererAuthorizationBlockedReason =
  | "PRESENCE_VISUAL_SOURCE_PROJECTION_REQUIRED"
  | "VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_REQUIRED"
  | "PRESENCE_VISUAL_SOURCE_PROJECTION_INVALID"
  | "VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANIFESTATION_SOURCE_REFERENCE_MISMATCH"
  | "FORBIDDEN_SOURCE_REFERENCE";

export type RealityPresenceRendererAuthorizationResult =
  | Readonly<{
      status: "READY";
      source: "reality_presence_renderer_authorization";
      authorizationState: "AUTHORIZED_REALITY_PRESENCE_PRODUCTION_RENDERER";
      guardReason: null;
      authorization: RealityPresenceProductionRendererHostAuthorization;
      input: RealityPresenceRendererAuthorizationInput;
      boundary: RealityPresenceRendererAuthorizationBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "reality_presence_renderer_authorization";
      authorizationState: "SOURCE_NOT_READY" | "BLOCKED";
      guardReason: RealityPresenceRendererAuthorizationBlockedReason;
      authorization: null;
      input: RealityPresenceRendererAuthorizationInput;
      boundary: RealityPresenceRendererAuthorizationBoundary;
    }>;
