import type {
  RealityPressureSeedContinuationContext,
  RealityPressureSeedContinuationContextBlockedReason,
  RealityPressureSeedContinuationContextBoundary,
  RealityPressureSeedContinuationContextInput,
  RealityPressureSeedContinuationContextResult,
  RealityPressureSeedContinuationSessionInput,
} from "../types/realityPressureSeedContinuationContext";

export const REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_BOUNDARY:
  RealityPressureSeedContinuationContextBoundary = Object.freeze({
    continuationCarrierOnly: true,
    authorizedRealityRouteOnly: true,
    existingRouteResultsOnly: true,
    existingPressureSeedSessionOnly: true,
    initialConsumerSessionMustBeNull: true,
    sourceReferenceContinuityRequired: true,
    bundleReferenceContinuityRequired: true,
    immutableContextOnly: true,
    explicitUserRecognitionRequired: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noSystemClock: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateSourceInvocation: true,
    noCandidateAssembly: true,
    noConsumerInvocation: true,
    noCaptureExecution: true,
    noCandidateSelection: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noNavigationInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const forbiddenSourceMarkers = [
  "fixture",
  "prototype",
  "default",
  "referenceonly",
] as const;

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return forbiddenSourceMarkers.some((marker) => normalized.includes(marker));
};

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  reason: RealityPressureSeedContinuationContextBlockedReason,
): RealityPressureSeedContinuationContextResult => Object.freeze({
  status,
  context: null,
  reason,
  boundary: REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_BOUNDARY,
});

const ready = (
  context: RealityPressureSeedContinuationContext,
): RealityPressureSeedContinuationContextResult => Object.freeze({
  status: "READY" as const,
  context,
  reason: null,
  boundary: REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_BOUNDARY,
});

const isReadyAuthorization = (
  authorization: RealityPressureSeedContinuationContextInput["routeAuthorization"],
): authorization is Extract<
  RealityPressureSeedContinuationContextInput["routeAuthorization"],
  { status: "READY" }
> =>
  authorization?.status === "READY" &&
  authorization.authorizationState ===
    "AUTHORIZED_PRODUCTION_REALITY_SOURCE" &&
  authorization.routeTarget === "/reality" &&
  authorization.sourceContext.sourceExperienceMode ===
    "REAL_USER_EXPERIENCE" &&
  authorization.sourceContext.sourceProvenance === "REAL_USER_SESSION";

export function createRealityPressureSeedContinuationContext(
  input: RealityPressureSeedContinuationContextInput,
): RealityPressureSeedContinuationContextResult {
  const authorization = input?.routeAuthorization;
  if (!isReadyAuthorization(authorization)) {
    return unavailable(
      "SOURCE_NOT_READY",
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
    );
  }
  const activationResult = input.routeCandidateActivationResult;
  if (activationResult?.status !== "READY") {
    return unavailable(
      "SOURCE_NOT_READY",
      "ROUTE_CANDIDATE_ACTIVATION_NOT_READY",
    );
  }
  const requestResult = input.routeCandidateRequestResult;
  if (requestResult?.status !== "READY") {
    return unavailable(
      "SOURCE_NOT_READY",
      "ROUTE_CANDIDATE_REQUEST_NOT_READY",
    );
  }
  const deliveryResult = input.routeDeliveryResult;
  if (deliveryResult?.status !== "READY") {
    return unavailable("SOURCE_NOT_READY", "ROUTE_DELIVERY_NOT_READY");
  }

  const sourceReferenceId = authorization.sourceReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable("BLOCKED", "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (
    activationResult.sourceReferenceId !== sourceReferenceId ||
    requestResult.sourceReferenceId !== sourceReferenceId ||
    deliveryResult.sourceReferenceId !== sourceReferenceId ||
    activationResult.candidateActivationContext.sourceReferenceId !==
      sourceReferenceId ||
    requestResult.candidateRequestContext.sourceReferenceId !==
      sourceReferenceId ||
    deliveryResult.deliverySession.sourceReferenceId !== sourceReferenceId ||
    deliveryResult.candidateSourceContext.sourceReferenceId !==
      sourceReferenceId ||
    deliveryResult.consumerInput.routeAuthorization.sourceReferenceId !==
      sourceReferenceId
  ) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    requestResult.candidateActivationContextReferenceId !==
      activationResult.candidateActivationContext.contextReferenceId ||
    deliveryResult.candidateActivationContextReferenceId !==
      activationResult.candidateActivationContext.contextReferenceId ||
    requestResult.candidateRequestContext.activationContextReferenceId !==
      activationResult.candidateActivationContext.contextReferenceId
  ) {
    return unavailable("BLOCKED", "ACTIVATION_REFERENCE_MISMATCH");
  }
  if (
    deliveryResult.deliverySession.currentBundleReferenceId !==
      deliveryResult.candidateSourceContext.bundleReferenceId ||
    deliveryResult.consumerInput.candidateSourceContext !==
      deliveryResult.candidateSourceContext
  ) {
    return unavailable("BLOCKED", "BUNDLE_REFERENCE_MISMATCH");
  }

  const context: RealityPressureSeedContinuationContext = Object.freeze({
    schemaVersion:
      "GUANYAO_REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_V1" as const,
    source: "reality_pressure_seed_continuation_context" as const,
    contextReferenceId: `reality-pressure-continuation:${sourceReferenceId}:${deliveryResult.candidateSourceContext.bundleReferenceId}`,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    phase: "READY_FOR_CONSUMER_INITIALIZATION" as const,
    routeAuthorization: authorization,
    candidateActivationContext: activationResult.candidateActivationContext,
    activationRequestContext: requestResult.candidateRequestContext,
    deliverySession: deliveryResult.deliverySession,
    candidateSourceContext: deliveryResult.candidateSourceContext,
    consumerInput: deliveryResult.consumerInput,
    pressureSeedSession: null,
    provenance: Object.freeze({
      routeCandidateActivationSource:
        "REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE" as const,
      routeCandidateRequestSource:
        "REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE" as const,
      routeDeliverySource:
        "REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE" as const,
      sourceReferenceId,
      userRecognitionRequired: true as const,
      noCandidateSelection: true as const,
    }),
    boundary: REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_BOUNDARY,
  });

  return ready(context);
}

export function attachRealityPressureSeedSessionToContinuationContext(
  input: RealityPressureSeedContinuationSessionInput,
): RealityPressureSeedContinuationContextResult {
  const context = input?.context;
  if (
    !context ||
    !Object.isFrozen(context) ||
    context.boundary !== REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_BOUNDARY ||
    context.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    context.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return unavailable("BLOCKED", "CONTINUATION_CONTEXT_INVALID");
  }
  const consumerResult = input.consumerResult;
  if (
    consumerResult?.status !== "READY" ||
    !Object.isFrozen(consumerResult) ||
    !Object.isFrozen(consumerResult.session)
  ) {
    return unavailable("SOURCE_NOT_READY", "PRESSURE_SEED_SESSION_NOT_READY");
  }
  const pressureSeedSession = consumerResult.session;
  if (pressureSeedSession.sourceReferenceId !== context.sourceReferenceId) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    pressureSeedSession.candidateBundleReferenceId !==
      context.candidateSourceContext.bundleReferenceId ||
    pressureSeedSession.candidateBundleReferenceId !==
      context.deliverySession.currentBundleReferenceId
  ) {
    return unavailable("BLOCKED", "BUNDLE_REFERENCE_MISMATCH");
  }

  return ready(
    Object.freeze({
      ...context,
      phase: "ACTIVE" as const,
      pressureSeedSession,
    }),
  );
}
