import {
  clearRealityRouteActivationSourceContextForAdmission,
  readRealityRouteActivationSourceContext,
} from "./realityRouteActivationSourceContext";
import {
  readCurrentRealityEncounterIntent,
  terminateRealityEncounter,
} from "./xinmaiRealityEncounterIntentController";
import type {
  RealityExplicitLeaveRequest,
  RealityExplicitLeaveTransactionResult,
} from "../types/realityProductionRouteEntry";
import type {
  RealityEncounterAdmission,
  RealityEncounterIntent,
} from "../types/xinmaiRealityEncounterIntent";

type RealityExplicitLeaveRequestMismatchReason = Extract<
  RealityExplicitLeaveTransactionResult,
  { status: "STALE_REQUEST_REJECTED" }
>["reason"];

export const REALITY_EXPLICIT_LEAVE_TERMINATION_BOUNDARY =
  Object.freeze({
    routeTransactionOnly: true as const,
    currentIntentValidationRequired: true as const,
    exactActivationClearRequired: true as const,
    confirmedRecoveryClearRequired: true as const,
    safeRetryRequired: true as const,
    noNavigationAuthority: true as const,
    noPressureSeedWrite: true as const,
    noGrowthConsumer: true as const,
    noRendererConsumer: true as const,
  });

export function createRealityExplicitLeaveRequestFromIntent(
  intent: RealityEncounterIntent,
): RealityExplicitLeaveRequest | null {
  if (
    intent.state === "TERMINAL" ||
    intent.routeTarget !== "/reality"
  ) {
    return null;
  }
  return Object.freeze({
    intentReferenceId: intent.intentReferenceId,
    encounterCycleId: intent.encounterCycleId,
    expectedIntentRevision: intent.revision,
    identityReferences: Object.freeze({
      sourceReferenceId: intent.sourceReferenceId,
      starBeastIdentityReferenceId:
        intent.starBeastIdentityReferenceId,
      mansionCoordinateReferenceId:
        intent.mansionCoordinateReferenceId,
    }),
    routeTarget: "/reality" as const,
    terminalReason: "EXPLICIT_LEAVE" as const,
  });
}

export function createRealityExplicitLeaveRequestFromAdmission(
  admission: RealityEncounterAdmission,
): RealityExplicitLeaveRequest {
  return Object.freeze({
    intentReferenceId: admission.intentReferenceId,
    encounterCycleId: admission.encounterCycleId,
    expectedIntentRevision: admission.intentRevision,
    identityReferences: admission.identityReferences,
    routeTarget: "/reality" as const,
    terminalReason: "EXPLICIT_LEAVE" as const,
  });
}

const requestMatchesCurrentIntent = (
  request: RealityExplicitLeaveRequest,
  currentIntent: RealityEncounterIntent,
): RealityExplicitLeaveRequestMismatchReason | null => {
  if (currentIntent.intentReferenceId !== request.intentReferenceId) {
    return "INTENT_REFERENCE_MISMATCH";
  }
  if (currentIntent.encounterCycleId !== request.encounterCycleId) {
    return "ENCOUNTER_CYCLE_MISMATCH";
  }
  if (currentIntent.revision !== request.expectedIntentRevision) {
    return "INTENT_REVISION_MISMATCH";
  }
  if (
    currentIntent.sourceReferenceId !==
      request.identityReferences.sourceReferenceId ||
    currentIntent.starBeastIdentityReferenceId !==
      request.identityReferences.starBeastIdentityReferenceId ||
    currentIntent.mansionCoordinateReferenceId !==
      request.identityReferences.mansionCoordinateReferenceId
  ) {
    return "IDENTITY_MISMATCH";
  }
  return null;
};

export function executeRealityExplicitLeaveTermination(
  request: RealityExplicitLeaveRequest,
): RealityExplicitLeaveTransactionResult {
  const currentIntent = readCurrentRealityEncounterIntent();
  if (currentIntent === null || currentIntent.state === "TERMINAL") {
    return Object.freeze({
      status: "NO_ACTIVE_ENCOUNTER" as const,
      request,
      reason:
        currentIntent === null
          ? "NO_CURRENT_INTENT" as const
          : "INTENT_ALREADY_TERMINAL" as const,
    });
  }

  const mismatch = requestMatchesCurrentIntent(
    request,
    currentIntent,
  );
  if (mismatch !== null) {
    return Object.freeze({
      status: "STALE_REQUEST_REJECTED" as const,
      request,
      reason: mismatch,
    });
  }

  const activationSource =
    readRealityRouteActivationSourceContext();
  if (
    activationSource !== null &&
    (activationSource.intentReferenceId !== request.intentReferenceId ||
      activationSource.encounterCycleId !== request.encounterCycleId ||
      activationSource.sourceReferenceId !==
        request.identityReferences.sourceReferenceId)
  ) {
    return Object.freeze({
      status: "STALE_REQUEST_REJECTED" as const,
      request,
      reason: "ACTIVATION_ADMISSION_MISMATCH" as const,
    });
  }

  const activationClear =
    clearRealityRouteActivationSourceContextForAdmission(
      activationSource ??
        Object.freeze({
          intentReferenceId: request.intentReferenceId,
          encounterCycleId: request.encounterCycleId,
          intentRevision: request.expectedIntentRevision,
        }),
    );
  if (activationClear.status === "MISMATCH") {
    return Object.freeze({
      status: "STALE_REQUEST_REJECTED" as const,
      request,
      reason: activationClear.reason,
    });
  }

  const termination = terminateRealityEncounter({
    intentReferenceId: request.intentReferenceId,
    encounterCycleId: request.encounterCycleId,
    expectedIntentRevision: request.expectedIntentRevision,
    identityReferences: request.identityReferences,
    terminalReason: request.terminalReason,
  });
  if (termination.status === "TERMINATED") {
    return Object.freeze({
      status: "TERMINATED_AND_LEFT" as const,
      request,
      reason: "EXPLICIT_LEAVE" as const,
    });
  }
  if (termination.status === "TERMINATION_RETRYABLE") {
    return Object.freeze({
      status: "TERMINATION_RETRYABLE" as const,
      request,
      reason: termination.reason,
    });
  }
  if (termination.status === "NOT_ACTIVE") {
    return Object.freeze({
      status: "NO_ACTIVE_ENCOUNTER" as const,
      request,
      reason: termination.reason,
    });
  }
  return Object.freeze({
    status: "STALE_REQUEST_REJECTED" as const,
    request,
    reason: termination.reason,
  });
}
