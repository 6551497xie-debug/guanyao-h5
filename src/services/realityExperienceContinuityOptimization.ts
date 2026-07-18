import type {
  RealityChoiceContinuity,
  RealityExperienceContinuityOptimization,
  RealityExperienceContinuityOptimizationBlocked,
  RealityExperienceContinuityOptimizationBlockedReason,
  RealityExperienceContinuityOptimizationBoundary,
  RealityExperienceContinuityOptimizationInput,
  RealityExperienceContinuityOptimizationResult,
  RealityExperienceContinuityOptimizationUnavailable,
  RealityExperienceContinuityOptimizationUnavailableReason,
  RealityExperienceFlowIntegrity,
  RealityExperienceObservationMode,
  RealityGravityContinuity,
  RealityPressureContinuity,
} from "../types/realityExperienceContinuityOptimization";

export const REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION_BOUNDARY: RealityExperienceContinuityOptimizationBoundary =
  Object.freeze({
    experienceOptimizationOnly: true,
    noPressureMutation: true,
    noGravityMutation: true,
    noChoiceMutation: true,
    noGenesisMutation: true,
    noVisualStateMutation: true,
    noUserDiagnosis: true,
    noBehaviorScore: true,
    noUserProfile: true,
    noIdentity: true,
    noEngineResult: true,
    noStorage: true,
  });

const unavailable = (
  input: RealityExperienceContinuityOptimizationInput,
  reason: RealityExperienceContinuityOptimizationUnavailableReason,
): RealityExperienceContinuityOptimizationUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "reality_experience_continuity_optimization" as const,
    reason,
    continuity: null,
    input,
    boundary: REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION_BOUNDARY,
  });

const createContinuity = (values: Readonly<{
  pressureContinuity: RealityPressureContinuity;
  gravityContinuity: RealityGravityContinuity;
  choiceContinuity: RealityChoiceContinuity;
  realityFlowIntegrity: RealityExperienceFlowIntegrity;
  observationMode: RealityExperienceObservationMode;
}>): RealityExperienceContinuityOptimization =>
  Object.freeze({
    semanticRole: "REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION" as const,
    pressureContinuity: values.pressureContinuity,
    gravityContinuity: values.gravityContinuity,
    choiceContinuity: values.choiceContinuity,
    presenceCarryReference: "PRESENCE_CARRY_REALITY_TRANSITION" as const,
    realityFlowIntegrity: values.realityFlowIntegrity,
    observationMode: values.observationMode,
    boundary: REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION_BOUNDARY,
  });

const blocked = (
  input: RealityExperienceContinuityOptimizationInput,
  reason: RealityExperienceContinuityOptimizationBlockedReason,
  continuity: RealityExperienceContinuityOptimization,
): RealityExperienceContinuityOptimizationBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "reality_experience_continuity_optimization" as const,
    reason,
    continuity,
    input,
    boundary: REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION_BOUNDARY,
  });

const pressureContinuityFor = (
  input: RealityExperienceContinuityOptimizationInput,
): RealityPressureContinuity => {
  if (input.pressureRuntime === null) return "NOT_READY";
  return input.pressureObservationConfirmed
    ? "ACKNOWLEDGED"
    : "OBSERVING";
};

const gravityContinuityFor = (
  input: RealityExperienceContinuityOptimizationInput,
): RealityGravityContinuity => {
  if (input.gravityRuntime === null) return "WAITING_FOR_PRESSURE";
  return input.gravityObservationConfirmed ? "ACKNOWLEDGED" : "OBSERVING";
};

const choiceContinuityFor = (
  input: RealityExperienceContinuityOptimizationInput,
): RealityChoiceContinuity => {
  if (input.choiceRuntime === null) return "WAITING_FOR_GRAVITY";
  return input.choiceActiveResponseConfirmed
    ? "ACTIVE_RESPONSE"
    : "RESPONSE_GAP_OPEN";
};

const observationModeFor = (
  input: RealityExperienceContinuityOptimizationInput,
): RealityExperienceObservationMode => {
  if (input.choiceActiveResponseConfirmed) return "RESPONSE_ACKNOWLEDGED";
  if (input.choiceRuntime !== null) return "RESPONSE_SPACE";
  if (input.gravityRuntime !== null) return "INERTIA_AWARENESS";
  return "REALITY_SIGNAL_OBSERVATION";
};

export function resolveRealityExperienceContinuityOptimization(
  input: RealityExperienceContinuityOptimizationInput,
): RealityExperienceContinuityOptimizationResult {
  if (input.presenceCarry === null) {
    return unavailable(input, "PRESENCE_CARRY_REQUIRED");
  }
  if (input.presenceCarry.presenceContinuity !== "CONTINUOUS") {
    return blocked(
      input,
      "PRESENCE_CARRY_DISCONTINUITY",
      createContinuity({
        pressureContinuity: "NOT_READY",
        gravityContinuity: "WAITING_FOR_PRESSURE",
        choiceContinuity: "WAITING_FOR_GRAVITY",
        realityFlowIntegrity: "BROKEN",
        observationMode: "REALITY_SIGNAL_OBSERVATION",
      }),
    );
  }
  if (input.pressureRuntime === null) {
    return unavailable(input, "PRESSURE_RUNTIME_REQUIRED");
  }
  if (input.gravityObservationConfirmed && input.gravityRuntime === null) {
    return blocked(
      input,
      "GRAVITY_RUNTIME_BEFORE_PRESSURE",
      createContinuity({
        pressureContinuity: pressureContinuityFor(input),
        gravityContinuity: "WAITING_FOR_PRESSURE",
        choiceContinuity: "WAITING_FOR_GRAVITY",
        realityFlowIntegrity: "BROKEN",
        observationMode: observationModeFor(input),
      }),
    );
  }
  if (input.choiceActiveResponseConfirmed && input.choiceRuntime === null) {
    return blocked(
      input,
      "CHOICE_RUNTIME_BEFORE_GRAVITY",
      createContinuity({
        pressureContinuity: pressureContinuityFor(input),
        gravityContinuity: gravityContinuityFor(input),
        choiceContinuity: "WAITING_FOR_GRAVITY",
        realityFlowIntegrity: "BROKEN",
        observationMode: observationModeFor(input),
      }),
    );
  }

  const continuity = createContinuity({
    pressureContinuity: pressureContinuityFor(input),
    gravityContinuity: gravityContinuityFor(input),
    choiceContinuity: choiceContinuityFor(input),
    realityFlowIntegrity: "CONTINUOUS",
    observationMode: observationModeFor(input),
  });
  return Object.freeze({
    status: "READY" as const,
    source: "reality_experience_continuity_optimization" as const,
    continuity,
    input,
    boundary: REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION_BOUNDARY,
  });
}
