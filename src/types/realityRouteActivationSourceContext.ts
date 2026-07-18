import type { GenesisProductionRealityEntryContext } from "./genesisProductionRecognitionRealityEntry";
import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type { RealityPressureExplicitRequestDateSource } from "./realityPressureCandidateActivationContext";

export type RealityRouteActivationSourceContextBoundary = Readonly<{
  explicitRealityEntryOnly: true;
  inMemoryContextOnly: true;
  existingRealityEntryContextOnly: true;
  existingLaunchLifeSourceSessionOnly: true;
  explicitRequestDateSourceOnly: true;
  requestDateCapturedOnceOnly: true;
  sourceReferenceContinuityRequired: true;
  immutableContextOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noRouteAuthorizationInvocation: true;
  noCandidateActivation: true;
  noCandidateSourceInvocation: true;
  noConsumerInvocation: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noNavigationInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityRouteActivationSourceContext = Readonly<{
  schemaVersion: "GUANYAO_REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_V1";
  source: "reality_route_activation_source_context";
  contextReferenceId: string;
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  activationBoundary: "EXPLICIT_ENTER_REALITY";
  realityEntryContext: GenesisProductionRealityEntryContext;
  lifeSourceSession: LaunchLifeSourceSession;
  requestDateSource: RealityPressureExplicitRequestDateSource;
  provenance: Readonly<{
    realityEntrySource: "GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT";
    lifeSource: "LAUNCH_LIFE_SOURCE_SESSION";
    requestDateSource: "EXPLICIT_REALITY_ENTRY_CALENDAR_SOURCE";
    sourceReferenceId: string;
    noPressureInference: true;
    noCandidateSelection: true;
  }>;
  boundary: RealityRouteActivationSourceContextBoundary;
}>;

export type RealityRouteActivationSourceContextInput = Readonly<{
  realityEntryContext: GenesisProductionRealityEntryContext;
  lifeSourceSession: LaunchLifeSourceSession;
  requestDateSource: RealityPressureExplicitRequestDateSource;
}>;

export type RealityRouteActivationSourceContextBlockedReason =
  | "REALITY_ENTRY_CONTEXT_REQUIRED"
  | "REALITY_ENTRY_CONTEXT_INVALID"
  | "REAL_LIFE_SOURCE_SESSION_REQUIRED"
  | "EXPLICIT_REQUEST_DATE_REQUIRED"
  | "EXPLICIT_REQUEST_DATE_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH";

export type RealityRouteActivationSourceContextResult =
  | Readonly<{
      status: "AVAILABLE";
      context: RealityRouteActivationSourceContext;
      reason: null;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      context: null;
      reason: RealityRouteActivationSourceContextBlockedReason;
    }>;

export type RealityExplicitRequestDateSourceInput = Readonly<{
  sourceReferenceId: string;
  calendarInstant: Date;
}>;
