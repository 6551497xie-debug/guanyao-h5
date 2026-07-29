import {
  readGravityEntryRecoveryCandidate,
  updateGravityEntryRecoveryCandidate,
  clearGravityEntryRecoveryCandidate,
} from "./xinmaiGravityEntryRecoveryAdapter";
import {
  isGravitySurfaceAdmissionTransactionValid,
} from "./xinmaiGravitySurfaceAdmissionTransaction";
import type {
  GravityEntryAdmission,
  GravityEntryCutoverCommitResult,
  GravityEntryFailure,
  GravityEntryFailureReason,
  GravityEntryFailureStage,
  GravityEntryTransferPrepareResult,
  GravityEntryTransferRequest,
  GravityHostAcceptanceOutcome,
  GravityRouteAdmission,
  GravityRouteAdmissionResult,
  GravityRouteTicket,
  RealityToGravityCutoverEnvelope,
} from "../types/xinmaiGravityEntryAdmission";
import {
  XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  RealityEncounterIdentityReferences,
  RealityEncounterIntent,
} from "../types/xinmaiRealityEncounterIntent";

const GRAVITY_ENTRY_TTL_MS = 2 * 60 * 60 * 1_000;
let currentAdmission: GravityEntryAdmission | null = null;

export const GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY =
  Object.freeze({
    singleCurrentAdmission: true as const,
    uniqueGravityCycleIdGenerator: true as const,
    existingIdentityReferencesOnly: true as const,
    currentRealityProofRequired: true as const,
    currentPressureProofRequired: true as const,
    bodyApproachProofRequired: true as const,
    recoveryCandidateIsNotAuthority: true as const,
    routeCannotCommitActive: true as const,
    hostTypedOutcomeRequired: true as const,
    noIdentityMutation: true as const,
    noPressureInference: true as const,
    noDirectStorageRead: true as const,
    noDirectStorageWrite: true as const,
    noNavigation: true as const,
    noRendererInvocation: true as const,
    noChoiceExecution: true as const,
    noCrystalExecution: true as const,
    noArchiveWrite: true as const,
  });

const opaqueId = (): string =>
  typeof crypto !== "undefined" &&
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Math.random().toString(36).slice(2)}-${Math.random()
        .toString(36)
        .slice(2)}`;

const identityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const requestMatchesReality = (
  request: GravityEntryTransferRequest,
  reality: RealityEncounterIntent,
): boolean =>
  reality.state === "ACTIVE_IN_REALITY" &&
  reality.intentReferenceId === request.sourceReality.intentReferenceId &&
  reality.encounterCycleId === request.sourceReality.encounterCycleId &&
  reality.revision === request.sourceReality.intentRevision &&
  reality.origin === request.sourceReality.origin &&
  reality.qualification === request.sourceReality.qualification &&
  identityMatches(request.identityReferences, {
    sourceReferenceId: reality.sourceReferenceId,
    starBeastIdentityReferenceId:
      reality.starBeastIdentityReferenceId,
    mansionCoordinateReferenceId:
      reality.mansionCoordinateReferenceId,
  });

const requestIsValid = (
  request: GravityEntryTransferRequest,
): GravityEntryFailureReason | null => {
  const pressure = request.pressureSession;
  if (
    request.schemaVersion !==
      "XINMAI_GRAVITY_ENTRY_TRANSFER_REQUEST_V1" ||
    request.source !== "reality_production_host" ||
    request.userExplicitRequest !== true ||
    request.sourceReality.state !== "ACTIVE_IN_REALITY"
  ) {
    return "SOURCE_REALITY_NOT_ACTIVE";
  }
  if (
    request.identityReferences.sourceReferenceId !==
      pressure.sourceReferenceId ||
    request.visualContinuity.sourceReferenceId !==
      request.identityReferences.sourceReferenceId
  ) {
    return "IDENTITY_MISMATCH";
  }
  if (
    pressure.schemaVersion !==
      "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2" ||
    pressure.source !==
      "reality_production_pressure_seed_consumer" ||
    pressure.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    pressure.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return "PRESSURE_SESSION_NOT_CURRENT";
  }
  if (
    pressure.captureState !== "SEED_RECOGNIZED" ||
    pressure.gravityReadiness !== "READY" ||
    pressure.selectedPressureSeedContext === null ||
    pressure.captureProvenance === null ||
    pressure.captureProvenance.sourceReferenceId !==
      request.identityReferences.sourceReferenceId ||
    pressure.captureProvenance.bundleReferenceId !==
      pressure.candidateBundleReferenceId ||
    pressure.captureProvenance.candidateReferenceId !==
      pressure.selectedPressureSeedContext.selectedPressureSeedId
  ) {
    return "PRESSURE_NOT_RECOGNIZED";
  }
  if (
    request.bodyApproachProof.source !==
      "reality_inner_view_approach" ||
    request.bodyApproachProof.bodyApproachConfirmed !== true ||
    request.bodyApproachProof.innerViewEntry !==
      "CURRENT_LIFE_WEATHER_BODY_APPROACHED" ||
    request.bodyApproachProof.sourceReferenceId !==
      request.identityReferences.sourceReferenceId ||
    request.bodyApproachProof.encounterCycleId !==
      request.sourceReality.encounterCycleId
  ) {
    return "BODY_APPROACH_NOT_CONFIRMED";
  }
  return null;
};

const nextAdmission = (
  admission: GravityEntryAdmission,
  patch: Partial<
    Pick<
      GravityEntryAdmission,
      "state" | "failure" | "terminalReason"
    >
  >,
): GravityEntryAdmission =>
  Object.freeze({
    ...admission,
    ...patch,
    updatedAt: new Date().toISOString(),
    revision: admission.revision + 1,
  });

const isExpired = (admission: GravityEntryAdmission): boolean => {
  const issuedAt = Date.parse(admission.issuedAt);
  const declaredExpiry = Date.parse(admission.expiresAt);
  const now = Date.now();
  return (
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(declaredExpiry) ||
    issuedAt > now ||
    declaredExpiry <= issuedAt ||
    Math.min(
      declaredExpiry,
      issuedAt + GRAVITY_ENTRY_TTL_MS,
    ) <= now
  );
};

const createRouteAdmission = (
  admission: GravityEntryAdmission,
): GravityRouteAdmission =>
  Object.freeze({
    schemaVersion: "XINMAI_GRAVITY_ROUTE_ADMISSION_V1" as const,
    source:
      "reality_to_gravity_entry_admission_controller" as const,
    admissionReferenceId: admission.admissionReferenceId,
    gravityCycleId: admission.gravityCycleId,
    admissionRevision: admission.revision,
    identityReferences: admission.identityReferences,
    selectedPressureSeedId:
      admission.currentPressure.selectedPressureSeedId,
    routeTarget: "/dynamics" as const,
    expiresAt: admission.expiresAt,
  });

const routeReady = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  admission: GravityEntryAdmission,
): GravityRouteAdmissionResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    admission: createRouteAdmission(admission),
    intent: admission,
    reason: null,
  });

const routeBlocked = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  reason: GravityEntryFailureReason,
  status: "BLOCKED" | "RETRY_REQUIRED" = "BLOCKED",
  intent: GravityEntryAdmission | null = currentAdmission,
): GravityRouteAdmissionResult =>
  Object.freeze({
    status,
    operation,
    admission: null,
    intent,
    reason,
  });

const commitWithConfirmedRecovery = (
  previous: GravityEntryAdmission,
  candidate: GravityEntryAdmission,
): boolean => {
  const write = updateGravityEntryRecoveryCandidate(candidate);
  if (write.status !== "CONFIRMED") {
    currentAdmission = previous;
    return false;
  }
  currentAdmission = candidate;
  return true;
};

export function prepareGravityEntryTransfer(input: Readonly<{
  request: GravityEntryTransferRequest;
  currentRealityIntent: RealityEncounterIntent;
}>): GravityEntryTransferPrepareResult {
  const invalidRequest = requestIsValid(input.request);
  if (invalidRequest !== null) {
    return Object.freeze({
      status: "BLOCKED" as const,
      admission: currentAdmission,
      reason: invalidRequest,
    });
  }
  if (!requestMatchesReality(input.request, input.currentRealityIntent)) {
    return Object.freeze({
      status: "BLOCKED" as const,
      admission: currentAdmission,
      reason: input.currentRealityIntent.state === "ACTIVE_IN_REALITY"
        ? "IDENTITY_MISMATCH" as const
        : "SOURCE_REALITY_NOT_ACTIVE" as const,
    });
  }
  if (
    currentAdmission !== null &&
    currentAdmission.state !== "TERMINAL"
  ) {
    if (
      currentAdmission.sourceReality.intentReferenceId ===
        input.request.sourceReality.intentReferenceId &&
      currentAdmission.sourceReality.encounterCycleId ===
        input.request.sourceReality.encounterCycleId &&
      currentAdmission.currentPressure.selectedPressureSeedId ===
        input.request.pressureSession.selectedPressureSeedContext
          ?.selectedPressureSeedId &&
      identityMatches(
        currentAdmission.identityReferences,
        input.request.identityReferences,
      ) &&
      (currentAdmission.state === "TRANSFER_PREPARED" ||
        currentAdmission.state === "FAILED_RETRYABLE")
    ) {
      if (currentAdmission.state === "FAILED_RETRYABLE") {
        const retried = nextAdmission(currentAdmission, {
          state: "TRANSFER_PREPARED",
          failure: null,
          terminalReason: null,
        });
        currentAdmission = retried;
        return Object.freeze({
          status: "PREPARED" as const,
          admission: retried,
          reason: null,
        });
      }
      return Object.freeze({
        status: "PREPARED" as const,
        admission: currentAdmission,
        reason: null,
      });
    }
    return Object.freeze({
      status: "BLOCKED" as const,
      admission: currentAdmission,
      reason: "ADMISSION_NOT_CURRENT" as const,
    });
  }

  const pressureSession = input.request.pressureSession;
  const selected = pressureSession.selectedPressureSeedContext;
  const capture = pressureSession.captureProvenance;
  if (selected === null || capture === null) {
    return Object.freeze({
      status: "BLOCKED" as const,
      admission: null,
      reason: "PRESSURE_NOT_RECOGNIZED" as const,
    });
  }
  const issuedAt = new Date().toISOString();
  const admission: GravityEntryAdmission = Object.freeze({
    schemaVersion: XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION,
    source:
      "reality_to_gravity_entry_admission_controller" as const,
    admissionReferenceId: `gravity-admission:${opaqueId()}`,
    gravityCycleId: `gravity-cycle:${opaqueId()}`,
    revision: 1,
    state: "TRANSFER_PREPARED" as const,
    routeTarget: "/dynamics" as const,
    identityReferences: Object.freeze({
      ...input.request.identityReferences,
    }),
    sourceReality: Object.freeze({
      intentReferenceId: input.currentRealityIntent.intentReferenceId,
      encounterCycleId: input.currentRealityIntent.encounterCycleId,
      intentRevision: input.currentRealityIntent.revision,
      origin: input.currentRealityIntent.origin,
      qualification: input.currentRealityIntent.qualification,
      choiceActionIntentionReferenceId:
        input.currentRealityIntent.choiceActionIntentionReferenceId,
      sourceState: "ACTIVE_IN_REALITY" as const,
      terminalReason: "ENCOUNTER_COMPLETED" as const,
      cutoverMeaning: "SUPERSEDED_BY_GRAVITY_TRANSFER" as const,
      activeConfirmed: true as const,
    }),
    currentPressure: Object.freeze({
      pressureSessionSchemaVersion:
        "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2" as const,
      sourceReferenceId: pressureSession.sourceReferenceId,
      candidateBundleReferenceId:
        pressureSession.candidateBundleReferenceId,
      selectedPressureSeedId:
        selected.selectedPressureSeedId ??
        capture.candidateReferenceId,
      captureProvenance: capture,
      gravityReadiness: "READY" as const,
      userRecognitionConfirmed: true as const,
      selectedPressureSeedContext: Object.freeze({ ...selected }),
    }),
    bodyApproach: input.request.bodyApproachProof,
    issuedAt,
    updatedAt: issuedAt,
    expiresAt: new Date(
      Date.parse(issuedAt) + GRAVITY_ENTRY_TTL_MS,
    ).toISOString(),
    failure: null,
    terminalReason: null,
    provenance: Object.freeze({
      userExplicitRequest: true as const,
      identityAuthority: "EXISTING_RECOGNIZED_LIFE" as const,
      realityAuthority: "XINMAI_REALITY_ENCOUNTER_INTENT" as const,
      pressureAuthority: "REALITY_PRESSURE_SEED_SESSION_V2" as const,
      bodyApproachAuthority: "REALITY_INNER_VIEW_APPROACH" as const,
      noIdentityMutation: true as const,
      noPressureInference: true as const,
      noAutomaticSelection: true as const,
      noChoiceExecution: true as const,
      noCrystalExecution: true as const,
      noLegacyDynamicsAuthority: true as const,
    }),
  });
  currentAdmission = admission;
  return Object.freeze({
    status: "PREPARED" as const,
    admission,
    reason: null,
  });
}

export function commitPreparedGravityTransfer(
  envelope: RealityToGravityCutoverEnvelope,
): GravityEntryCutoverCommitResult {
  if (
    currentAdmission === null ||
    currentAdmission.state !== "TRANSFER_PREPARED" ||
    envelope.targetGravity.admission.admissionReferenceId !==
      currentAdmission.admissionReferenceId ||
    envelope.targetGravity.admission.gravityCycleId !==
      currentAdmission.gravityCycleId ||
    envelope.targetGravity.admission.revision !==
      currentAdmission.revision + 1 ||
    envelope.targetGravity.admission.state !==
      "READY_TO_ENTER_GRAVITY" ||
    !identityMatches(
      envelope.targetGravity.identityReferences,
      currentAdmission.identityReferences,
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      admission: currentAdmission,
      reason: "ADMISSION_NOT_CURRENT" as const,
    });
  }
  currentAdmission = envelope.targetGravity.admission;
  return Object.freeze({
    status: "READY" as const,
    admission: currentAdmission,
    reason: null,
  });
}

const recoverCurrentAdmission = (
  identityReferences: RealityEncounterIdentityReferences,
): GravityRouteAdmissionResult => {
  const recovery = readGravityEntryRecoveryCandidate();
  if (recovery.status !== "FOUND") {
    return routeBlocked(
      "RECOVER",
      recovery.status === "CORRUPTED"
        ? "RECOVERY_CANDIDATE_INVALID"
        : "ADMISSION_NOT_CURRENT",
    );
  }
  const candidate = recovery.snapshot.currentGravityAdmission;
  if (!identityMatches(candidate.identityReferences, identityReferences)) {
    return routeBlocked(
      "RECOVER",
      "IDENTITY_MISMATCH",
      "BLOCKED",
      candidate,
    );
  }
  currentAdmission = candidate;
  if (isExpired(candidate)) {
    const terminal = nextAdmission(candidate, {
      state: "TERMINAL",
      failure: null,
      terminalReason: "ADMISSION_EXPIRED",
    });
    currentAdmission = terminal;
    updateGravityEntryRecoveryCandidate(terminal);
    return routeBlocked(
      "RECOVER",
      "ADMISSION_EXPIRED",
      "BLOCKED",
      terminal,
    );
  }
  if (candidate.state === "ACTIVE_IN_GRAVITY") {
    const accepting = nextAdmission(candidate, {
      state: "ACCEPTING_GRAVITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitWithConfirmedRecovery(candidate, accepting)) {
      return routeBlocked(
        "RECOVER",
        "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE",
        "RETRY_REQUIRED",
        candidate,
      );
    }
    return routeReady("RECOVER", accepting);
  }
  if (candidate.state === "READY_TO_ENTER_GRAVITY") {
    const accepting = nextAdmission(candidate, {
      state: "ACCEPTING_GRAVITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitWithConfirmedRecovery(candidate, accepting)) {
      return routeBlocked(
        "RECOVER",
        "CUTOVER_STORAGE_UNAVAILABLE",
        "RETRY_REQUIRED",
        candidate,
      );
    }
    return routeReady("RECOVER", accepting);
  }
  if (candidate.state === "ACCEPTING_GRAVITY") {
    return routeReady("RECOVER", candidate);
  }
  return routeBlocked(
    "RECOVER",
    candidate.state === "FAILED_RETRYABLE"
      ? "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE"
      : "ADMISSION_NOT_CURRENT",
    candidate.state === "FAILED_RETRYABLE"
      ? "RETRY_REQUIRED"
      : "BLOCKED",
    candidate,
  );
};

export function establishGravityRouteAdmission(input: Readonly<{
  routeTicket: GravityRouteTicket | null;
  identityReferences: RealityEncounterIdentityReferences;
}>): GravityRouteAdmissionResult {
  if (currentAdmission === null) {
    return recoverCurrentAdmission(input.identityReferences);
  }
  if (
    input.routeTicket !== null &&
    (input.routeTicket.admissionReferenceId !==
      currentAdmission.admissionReferenceId ||
      input.routeTicket.gravityCycleId !==
        currentAdmission.gravityCycleId)
  ) {
    return routeBlocked("ADMIT", "ADMISSION_NOT_CURRENT");
  }
  if (
    !identityMatches(
      currentAdmission.identityReferences,
      input.identityReferences,
    )
  ) {
    return routeBlocked("ADMIT", "IDENTITY_MISMATCH");
  }
  if (isExpired(currentAdmission)) {
    return routeBlocked("ADMIT", "ADMISSION_EXPIRED");
  }
  if (currentAdmission.state === "READY_TO_ENTER_GRAVITY") {
    const previous = currentAdmission;
    const accepting = nextAdmission(previous, {
      state: "ACCEPTING_GRAVITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitWithConfirmedRecovery(previous, accepting)) {
      return routeBlocked("ADMIT", "CUTOVER_STORAGE_UNAVAILABLE");
    }
    return routeReady("ADMIT", accepting);
  }
  if (currentAdmission.state === "ACCEPTING_GRAVITY") {
    return routeReady("ADMIT", currentAdmission);
  }
  if (currentAdmission.state === "FAILED_RETRYABLE") {
    return routeBlocked(
      "ADMIT",
      "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE",
      "RETRY_REQUIRED",
    );
  }
  if (currentAdmission.state === "ACTIVE_IN_GRAVITY") {
    const previous = currentAdmission;
    const accepting = nextAdmission(previous, {
      state: "ACCEPTING_GRAVITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitWithConfirmedRecovery(previous, accepting)) {
      return routeBlocked(
        "RECOVER",
        "CUTOVER_STORAGE_UNAVAILABLE",
      );
    }
    return routeReady("RECOVER", accepting);
  }
  return routeBlocked("ADMIT", "ADMISSION_NOT_CURRENT");
}

export function retryGravityEntryAcceptance(input: Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
}>): GravityRouteAdmissionResult {
  if (
    currentAdmission === null ||
    currentAdmission.admissionReferenceId !==
      input.admissionReferenceId ||
    currentAdmission.gravityCycleId !== input.gravityCycleId ||
    !identityMatches(
      currentAdmission.identityReferences,
      input.identityReferences,
    )
  ) {
    return routeBlocked("RETRY", "ADMISSION_NOT_CURRENT");
  }
  if (
    currentAdmission.state !== "FAILED_RETRYABLE" ||
    isExpired(currentAdmission)
  ) {
    return routeBlocked(
      "RETRY",
      isExpired(currentAdmission)
        ? "ADMISSION_EXPIRED"
        : "ADMISSION_NOT_CURRENT",
    );
  }
  const previous = currentAdmission;
  const accepting = nextAdmission(previous, {
    state: "ACCEPTING_GRAVITY",
    failure: null,
    terminalReason: null,
  });
  if (!commitWithConfirmedRecovery(previous, accepting)) {
    return routeBlocked("RETRY", "CUTOVER_STORAGE_UNAVAILABLE");
  }
  return routeReady("RETRY", accepting);
}

export function failGravityEntryAcceptance(input: Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  stage: GravityEntryFailureStage;
  reason: GravityEntryFailureReason;
}>): GravityEntryAdmission | null {
  if (
    currentAdmission === null ||
    currentAdmission.admissionReferenceId !==
      input.admissionReferenceId ||
    currentAdmission.gravityCycleId !== input.gravityCycleId ||
    currentAdmission.revision !== input.admissionRevision ||
    (currentAdmission.state !== "TRANSFER_PREPARED" &&
      currentAdmission.state !== "READY_TO_ENTER_GRAVITY" &&
      currentAdmission.state !== "ACCEPTING_GRAVITY")
  ) {
    return currentAdmission;
  }
  const failure: GravityEntryFailure = Object.freeze({
    stage: input.stage,
    reason: input.reason,
    failedAt: new Date().toISOString(),
    retryAllowed: true as const,
  });
  const previous = currentAdmission;
  const failed = nextAdmission(previous, {
    state: "FAILED_RETRYABLE",
    failure,
    terminalReason: null,
  });
  if (previous.state === "TRANSFER_PREPARED") {
    currentAdmission = failed;
    return failed;
  }
  if (!commitWithConfirmedRecovery(previous, failed)) {
    return previous;
  }
  return failed;
}

export function commitGravityEntryActive(
  outcome: GravityHostAcceptanceOutcome,
): GravityEntryAdmission | null {
  if (
    currentAdmission === null ||
    currentAdmission.state !== "ACCEPTING_GRAVITY" ||
    outcome.status !== "GRAVITY_MINIMUM_PRESENTED" ||
    currentAdmission.admissionReferenceId !==
      outcome.admissionReferenceId ||
    currentAdmission.gravityCycleId !== outcome.gravityCycleId ||
    currentAdmission.revision !== outcome.admissionRevision ||
    currentAdmission.currentPressure.selectedPressureSeedId !==
      outcome.selectedPressureSeedId ||
    !identityMatches(
      currentAdmission.identityReferences,
      outcome.identityReferences,
    ) ||
    !isGravitySurfaceAdmissionTransactionValid(
      outcome.transaction,
      Object.freeze({
        admissionReferenceId: currentAdmission.admissionReferenceId,
        gravityCycleId: currentAdmission.gravityCycleId,
        admissionRevision: currentAdmission.revision,
        identityReferences: currentAdmission.identityReferences,
        selectedPressureSeedId:
          currentAdmission.currentPressure.selectedPressureSeedId,
        sourceEncounterCycleId:
          currentAdmission.sourceReality.encounterCycleId,
        choiceActionIntentionReferenceId:
          currentAdmission.sourceReality
            .choiceActionIntentionReferenceId,
        gravityObservationReferenceId:
          outcome.transaction.gravityObservationReferenceId,
      }),
    ) ||
    outcome.committedAt !== outcome.transaction.committedAt ||
    isExpired(currentAdmission)
  ) {
    return currentAdmission;
  }
  const previous = currentAdmission;
  const active = nextAdmission(previous, {
    state: "ACTIVE_IN_GRAVITY",
    failure: null,
    terminalReason: null,
  });
  if (!commitWithConfirmedRecovery(previous, active)) {
    return previous;
  }
  return active;
}

export function terminateGravityEntry(input: Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  expectedRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  terminalReason: GravityEntryAdmission["terminalReason"];
}>): GravityEntryAdmission | null {
  if (
    currentAdmission === null ||
    input.terminalReason === null ||
    currentAdmission.admissionReferenceId !==
      input.admissionReferenceId ||
    currentAdmission.gravityCycleId !== input.gravityCycleId ||
    currentAdmission.revision !== input.expectedRevision ||
    !identityMatches(
      currentAdmission.identityReferences,
      input.identityReferences,
    )
  ) {
    return currentAdmission;
  }
  const terminal = nextAdmission(currentAdmission, {
    state: "TERMINAL",
    failure: null,
    terminalReason: input.terminalReason,
  });
  const clear = clearGravityEntryRecoveryCandidate(
    terminal.admissionReferenceId,
  );
  if (clear.status !== "CONFIRMED") return currentAdmission;
  currentAdmission = null;
  return terminal;
}

export function readCurrentGravityEntryAdmission():
  GravityEntryAdmission | null {
  return currentAdmission;
}

export const RealityToGravityEntryAdmissionController = Object.freeze({
  prepareTransfer: prepareGravityEntryTransfer,
  commitPreparedTransfer: commitPreparedGravityTransfer,
  establishRouteAdmission: establishGravityRouteAdmission,
  retryAcceptance: retryGravityEntryAcceptance,
  failAcceptance: failGravityEntryAcceptance,
  commitActive: commitGravityEntryActive,
  terminate: terminateGravityEntry,
  readCurrentAdmission: readCurrentGravityEntryAdmission,
  boundary: GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY,
});
