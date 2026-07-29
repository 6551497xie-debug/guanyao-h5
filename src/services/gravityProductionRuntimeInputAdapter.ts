import type {
  GravityEntryAdmission,
  GravityEntryVisualContinuity,
  GravityProductionRuntimeInput,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  LaunchLifeSourceSession,
} from "../types/launchLifeSourceSession";

export type GravityProductionRuntimeInputResult =
  | Readonly<{
      status: "READY";
      input: GravityProductionRuntimeInput;
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      input: null;
      reason:
        | "ADMISSION_REQUIRED"
        | "ADMISSION_NOT_ACCEPTING"
        | "IDENTITY_MISMATCH"
        | "PRESSURE_PROOF_INVALID"
        | "LIFE_SOURCE_SESSION_INVALID"
        | "BODY_APPROACH_PROOF_INVALID"
        | "ADMISSION_EXPIRED";
    }>;

const blocked = (
  reason: Extract<
    GravityProductionRuntimeInputResult,
    { status: "BLOCKED" }
  >["reason"],
): GravityProductionRuntimeInputResult =>
  Object.freeze({ status: "BLOCKED" as const, input: null, reason });

export function resolveGravityProductionRuntimeInput(input: Readonly<{
  admission: GravityEntryAdmission | null;
  lifeSourceSession: LaunchLifeSourceSession | null;
  visualContinuity: GravityEntryVisualContinuity | null;
}>): GravityProductionRuntimeInputResult {
  const admission = input.admission;
  if (admission === null) return blocked("ADMISSION_REQUIRED");
  if (admission.state !== "ACCEPTING_GRAVITY") {
    return blocked("ADMISSION_NOT_ACCEPTING");
  }
  if (Date.parse(admission.expiresAt) <= Date.now()) {
    return blocked("ADMISSION_EXPIRED");
  }
  const lifeSourceSession = input.lifeSourceSession;
  if (
    lifeSourceSession === null ||
    lifeSourceSession.schemaVersion !==
      "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1" ||
    lifeSourceSession.source !== "launch_life_source_session" ||
    lifeSourceSession.sourceReferenceId !==
      admission.identityReferences.sourceReferenceId
  ) {
    return blocked("LIFE_SOURCE_SESSION_INVALID");
  }
  if (
    input.visualContinuity === null ||
    input.visualContinuity.sourceReferenceId !==
      admission.identityReferences.sourceReferenceId
  ) {
    return blocked("IDENTITY_MISMATCH");
  }
  if (
    admission.currentPressure.sourceReferenceId !==
      admission.identityReferences.sourceReferenceId ||
    admission.currentPressure.gravityReadiness !== "READY" ||
    admission.currentPressure.userRecognitionConfirmed !== true
  ) {
    return blocked("PRESSURE_PROOF_INVALID");
  }
  if (
    admission.bodyApproach.sourceReferenceId !==
      admission.identityReferences.sourceReferenceId ||
    admission.bodyApproach.encounterCycleId !==
      admission.sourceReality.encounterCycleId ||
    admission.bodyApproach.bodyApproachConfirmed !== true
  ) {
    return blocked("BODY_APPROACH_PROOF_INVALID");
  }

  const motherCodeProfile =
    lifeSourceSession.motherCodeLandingResult.motherCodeProfile;
  const originMotherContext = lifeSourceSession.originMotherResult;
  const runtimeInput: GravityProductionRuntimeInput = Object.freeze({
    schemaVersion: "XINMAI_GRAVITY_PRODUCTION_RUNTIME_INPUT_V1" as const,
    source: "gravity_production_runtime_input_adapter" as const,
    admissionReferenceId: admission.admissionReferenceId,
    gravityCycleId: admission.gravityCycleId,
    admissionRevision: admission.revision,
    identityReferences: admission.identityReferences,
    currentPressure:
      admission.currentPressure.selectedPressureSeedContext,
    pressureProvenance: admission.currentPressure,
    lifeSourceSession,
    visualContinuity: input.visualContinuity,
    dynamicsInputContext: Object.freeze({
      selectedPressureSeedContext:
        admission.currentPressure.selectedPressureSeedContext,
      motherCodeProfile,
      originMotherContext,
      personaOutputSnapshot: Object.freeze({
        motherCode: motherCodeProfile.motherCodeName,
        motherCodeName: motherCodeProfile.motherCodeName,
        trigram: originMotherContext.mother.trigram,
        starbeast: Object.freeze({
          fourSymbol: originMotherContext.starbeast.fourSymbol,
        }),
      }),
    }),
    bodyApproachProof: admission.bodyApproach,
    boundary: Object.freeze({
      admissionOnly: true as const,
      recognizedIdentityOnly: true as const,
      launchLifeSourceOnly: true as const,
      currentPressureOnly: true as const,
      noRouteStateAuthority: true as const,
      noHistoricalStorageAuthority: true as const,
      noFixtureSource: true as const,
    }),
  });
  return Object.freeze({
    status: "READY" as const,
    input: runtimeInput,
    reason: null,
  });
}
