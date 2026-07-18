import type {
  RealityPressureCandidateActivationContextBoundary,
  RealityPressureCandidateActivationContextContract,
} from "../types/realityPressureCandidateActivationContext";

export const REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY:
  RealityPressureCandidateActivationContextBoundary = Object.freeze({
    contractOnly: true,
    authorizedRealityRouteOnly: true,
    existingLaunchLifeSourceSessionOnly: true,
    explicitRequestDateSourceOnly: true,
    requestDateCapturedOnceOnly: true,
    sourceReferenceContinuityRequired: true,
    immutableActivationContextRequired: true,
    initialCandidateDeliveryStateOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noImplicitSystemClock: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateRequestBridgeInvocation: true,
    noCandidateSourceInvocation: true,
    noCandidateAssembly: true,
    noDeliverySessionActivation: true,
    noCaptureExecution: true,
    noPressureConsumerIntegration: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

export const REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_CONTRACT:
  RealityPressureCandidateActivationContextContract = Object.freeze({
    schemaVersion:
      "GUANYAO_REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTRACT_V1",
    semanticRole:
      "REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_CONTRACT",
    routeTarget: "/reality",
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceProvenance: "REAL_USER_SESSION",
    requiredRouteAuthorization: "AUTHORIZED_PRODUCTION_REALITY_SOURCE",
    requiredLifeSource: "LAUNCH_LIFE_SOURCE_SESSION",
    requiredRequestDateProvenance: "EXPLICIT_CALLER_PROVIDED",
    requestDateCaptureBoundary: "REALITY_ROUTE_ACTIVATION",
    initialCandidateCursor: null,
    initialExcludedCandidateReferenceIds: Object.freeze([]) as readonly [],
    boundary: REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY,
  });
