import type {
  XinmaiGenesisLifeOriginNativeControlConsumedReason,
  XinmaiGenesisLifeOriginNativeControlReadiness,
  XinmaiGenesisLifeOriginNativeControlReadinessBoundary,
  XinmaiGenesisLifeOriginNativeControlReadinessInput,
  XinmaiGenesisLifeOriginNativeControlSafeWithheldReason,
  XinmaiGenesisLifeOriginNativeControlWaitingReason,
} from "../types/xinmaiGenesisLifeOriginNativeControlReadiness";

export const XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_READINESS_BOUNDARY:
  XinmaiGenesisLifeOriginNativeControlReadinessBoundary = Object.freeze({
    presentationReadinessOnly: true,
    nativeButtonSingleOwner: true,
    sourceReferenceContinuityRequired: true,
    handlerRevalidationRequired: true,
    sceneNearObjectReadOnly: true,
    noStorageRead: true,
    noStorageWrite: true,
    noAuthorityWriteback: true,
    noRecognitionMutation: true,
    noNavigationMutation: true,
    noRendererInput: true,
    noSceneOutcomeInput: true,
    noDomInput: true,
    noCssInput: true,
    noTimerInput: true,
    noRafInput: true,
  });

const safeWithheld = (
  reason: XinmaiGenesisLifeOriginNativeControlSafeWithheldReason,
  sourceReferenceId: string | null,
): XinmaiGenesisLifeOriginNativeControlReadiness =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    source: "xinmai_genesis_life_origin_native_control_readiness" as const,
    controlOwner: "NONE" as const,
    sceneNearObject: "NONE" as const,
    sourceReferenceId,
    reason,
    boundary:
      XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_READINESS_BOUNDARY,
  });

const waiting = (
  reason: XinmaiGenesisLifeOriginNativeControlWaitingReason,
  sourceReferenceId: string,
): XinmaiGenesisLifeOriginNativeControlReadiness =>
  Object.freeze({
    status: "WAITING" as const,
    source: "xinmai_genesis_life_origin_native_control_readiness" as const,
    controlOwner: "NONE" as const,
    sceneNearObject: "NONE" as const,
    sourceReferenceId,
    reason,
    boundary:
      XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_READINESS_BOUNDARY,
  });

const consumed = (
  reason: XinmaiGenesisLifeOriginNativeControlConsumedReason,
  sourceReferenceId: string,
): XinmaiGenesisLifeOriginNativeControlReadiness =>
  Object.freeze({
    status: "CONSUMED" as const,
    source: "xinmai_genesis_life_origin_native_control_readiness" as const,
    controlOwner: "NONE" as const,
    sceneNearObject: "NONE" as const,
    sourceReferenceId,
    reason,
    boundary:
      XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_READINESS_BOUNDARY,
  });

const hasReference = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const referencesMatch = (references: readonly string[]): boolean =>
  references.every((reference) => reference === references[0]);

export function resolveXinmaiGenesisLifeOriginNativeControlReadiness(
  input: XinmaiGenesisLifeOriginNativeControlReadinessInput,
): XinmaiGenesisLifeOriginNativeControlReadiness {
  const routeReference = input.routeAuthorization.sourceReferenceId;

  if (input.policy === "SAFE_WITHHELD") {
    return safeWithheld("PRESENTATION_PAUSED", routeReference);
  }
  if (input.activationRevalidation === "SAFE_WITHHELD") {
    return safeWithheld(
      "ACTIVATION_REVALIDATION_FAILED",
      routeReference,
    );
  }
  if (input.routeAuthorization.status !== "READY") {
    return safeWithheld("ROUTE_ADMISSION_NOT_READY", routeReference);
  }
  if (!hasReference(routeReference)) {
    return safeWithheld("SOURCE_REFERENCE_MISSING", null);
  }

  const consumer = input.consumerSourceResult;
  const runtime = input.productionRuntimeResult;
  const manifestation = input.manifestationExperienceResult;

  if (
    consumer === null ||
    consumer.status !== "READY" ||
    runtime === null ||
    runtime.status !== "READY" ||
    manifestation === null ||
    manifestation.status !== "READY"
  ) {
    return safeWithheld("RUNTIME_STATE_MISMATCH", routeReference);
  }

  const baseReferences = Object.freeze([
    routeReference,
    consumer.consumerSource.sourceReferenceId,
    runtime.session.sourceReferenceId,
    manifestation.session.sourceReferenceId,
  ]);
  if (
    baseReferences.some((reference) => !hasReference(reference))
  ) {
    return safeWithheld("SOURCE_REFERENCE_MISSING", routeReference);
  }
  if (!referencesMatch(baseReferences)) {
    return safeWithheld("SOURCE_REFERENCE_MISMATCH", routeReference);
  }

  if (runtime.session.currentStage !== "COMPLETION") {
    if (input.recognitionRealityResult !== null) {
      return safeWithheld(
        "RECOGNITION_STATE_MISMATCH",
        routeReference,
      );
    }
    return waiting("GENESIS_COMPLETION_PENDING", routeReference);
  }
  if (
    runtime.session.runtimeStatus !== "RECOGNITION_HOLD" ||
    runtime.session.interactionAvailability !== "RECOGNITION_HOLD"
  ) {
    return safeWithheld("RUNTIME_STATE_MISMATCH", routeReference);
  }

  if (
    manifestation.session.currentState !== "PRESENCE_APPROACHING" &&
    manifestation.session.currentState !== "PRESENCE_RECOGNIZED"
  ) {
    return waiting("MANIFESTATION_APPROACH_PENDING", routeReference);
  }

  const recognition = input.recognitionRealityResult;
  if (recognition === null) {
    return waiting("RECOGNITION_SESSION_PENDING", routeReference);
  }
  if (recognition.status !== "READY") {
    return safeWithheld("RECOGNITION_SESSION_BLOCKED", routeReference);
  }
  if (
    !hasReference(recognition.session.sourceReferenceId) ||
    recognition.session.sourceReferenceId !== routeReference
  ) {
    return safeWithheld("SOURCE_REFERENCE_MISMATCH", routeReference);
  }

  const awaitingRecognition =
    recognition.session.phase ===
      "AWAITING_RECOGNITION_CONFIRMATION" &&
    recognition.session.interactionAvailability === "RECOGNITION_CONFIRM" &&
    recognition.session.recognitionConfirmed === false &&
    recognition.session.realityEntryConfirmed === false &&
    recognition.session.realityEntryEligibility === "NOT_ELIGIBLE" &&
    manifestation.session.currentState === "PRESENCE_APPROACHING";

  if (awaitingRecognition) {
    if (input.discoveryPhase === "DORMANT") {
      return Object.freeze({
        status: "READY" as const,
        source:
          "xinmai_genesis_life_origin_native_control_readiness" as const,
        controlOwner: "NATIVE_BUTTON" as const,
        sceneNearObject: "LIFE_ORIGIN" as const,
        sourceReferenceId: routeReference,
        reason: null,
        boundary:
          XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_READINESS_BOUNDARY,
      });
    }
    return consumed(
      input.discoveryPhase === "DISCOVERING"
        ? "DISCOVERY_IN_PROGRESS"
        : "DISCOVERY_REVEALED",
      routeReference,
    );
  }

  const recognitionAdvanced =
    recognition.session.recognitionConfirmed === true &&
    manifestation.session.currentState === "PRESENCE_RECOGNIZED" &&
    (
      (
        recognition.session.phase ===
          "AWAITING_REALITY_ENTRY_CONFIRMATION" &&
        recognition.session.interactionAvailability === "ENTER_REALITY" &&
        recognition.session.realityEntryConfirmed === false &&
        recognition.session.realityEntryEligibility === "NOT_ELIGIBLE"
      ) ||
      (
        recognition.session.phase === "REALITY_ENTRY_ELIGIBLE" &&
        recognition.session.interactionAvailability === "NONE" &&
        recognition.session.realityEntryConfirmed === true &&
        recognition.session.realityEntryEligibility === "ELIGIBLE"
      )
    );

  if (recognitionAdvanced) {
    if (input.discoveryPhase !== "REVEALED") {
      return safeWithheld("DISCOVERY_STATE_MISMATCH", routeReference);
    }
    return consumed("DISCOVERY_REVEALED", routeReference);
  }

  return safeWithheld("RECOGNITION_STATE_MISMATCH", routeReference);
}
