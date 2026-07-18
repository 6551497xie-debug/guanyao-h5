import type {
  PressureRecognitionInterventionBoundary,
  RealityExperienceArchitectureReference,
  RealityPressureRecognitionArchitecture,
  RealityPressureRecognitionArchitectureBlockedReason,
  RealityPressureRecognitionArchitectureBoundary,
  RealityPressureRecognitionArchitectureInput,
  RealityPressureRecognitionArchitectureResult,
  RealityPressureRecognitionArchitectureUnavailableReason,
} from "../types/realityPressureRecognitionArchitecture";

const ARCHITECTURE_BOUNDARY: RealityPressureRecognitionArchitectureBoundary =
  Object.freeze({
    architectureReviewOnly: true,
    pressureRecognitionSemanticOnly: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noDiagnosis: true,
    noUserJudgment: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noGenesisMutation: true,
    noIdentityMutation: true,
    noUserProfile: true,
    noStorage: true,
    noUi: true,
    noRenderer: true,
    noProductionIntegration: true,
  });

const INTERVENTION_BOUNDARY: PressureRecognitionInterventionBoundary =
  Object.freeze({
    pressureRecognitionOnly: true,
    noPressureCalculation: true,
    noPressureSeedMatching: true,
    noUserJudgment: true,
    noPersonalityConclusion: true,
    noDestinyJudgment: true,
    noBehaviorAdvice: true,
    noGravityInvocation: true,
    noChoiceInvocation: true,
    noCrystalGeneration: true,
    noGenesisMutation: true,
    noIdentityMutation: true,
    noUserProfile: true,
    noStorageWrite: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noProductionIntegration: true,
    isolatedReviewOnly: true,
  });

const unavailable = (
  input: RealityPressureRecognitionArchitectureInput,
  reason: RealityPressureRecognitionArchitectureUnavailableReason,
): RealityPressureRecognitionArchitectureResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "reality_pressure_recognition_architecture" as const,
    reason,
    input,
    architecture: null,
    boundary: ARCHITECTURE_BOUNDARY,
  });

const blocked = (
  input: RealityPressureRecognitionArchitectureInput,
  reason: RealityPressureRecognitionArchitectureBlockedReason,
): RealityPressureRecognitionArchitectureResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "reality_pressure_recognition_architecture" as const,
    reason,
    input,
    architecture: null,
    boundary: ARCHITECTURE_BOUNDARY,
  });

const isValidReference = (
  reference: RealityExperienceArchitectureReference,
): boolean =>
  reference.referenceType === "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE" &&
  reference.referenceId.trim().length > 0 &&
  reference.sourceRole === "REALITY_EXPERIENCE_ARCHITECTURE" &&
  reference.realityStage === "REALITY_ENTRY" &&
  reference.genesisBoundary === "GENESIS_COMPLETION_HELD" &&
  reference.pressureRecognitionNotStarted === true &&
  reference.noPressureResult === true &&
  reference.noGravityResult === true &&
  reference.noChoiceResult === true &&
  reference.noCrystalResult === true &&
  reference.noUserProfile === true;

export function reviewRealityPressureRecognitionArchitecture(
  input: RealityPressureRecognitionArchitectureInput,
): RealityPressureRecognitionArchitectureResult {
  const reference = input.realityExperienceArchitectureReference;
  if (reference === null) {
    return unavailable(
      input,
      "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_REQUIRED",
    );
  }
  if (!isValidReference(reference)) {
    return blocked(input, "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_INVALID");
  }
  if (reference.genesisBoundary !== "GENESIS_COMPLETION_HELD") {
    return blocked(input, "GENESIS_BOUNDARY_INVALID");
  }

  const architecture: RealityPressureRecognitionArchitecture = Object.freeze({
    semanticRole: "REALITY_PRESSURE_RECOGNITION_ARCHITECTURE",
    pressureEntryState: "REALITY_ENTRY_RECEIVED",
    realitySignalLayer: Object.freeze({
      semanticRole: "REALITY_SIGNAL_OBSERVATION",
      observationMode: "OBSERVE_REALITY_INFLUENCES",
      userQuestion: "WHAT_IS_ACTING_ON_ME",
      noPressureCalculation: true,
      noDiagnosis: true,
      noUserJudgment: true,
    }),
    pressureObservationLayer: Object.freeze({
      semanticRole: "PRESSURE_TENSION_OBSERVATION",
      observationMode: "USER_PARTICIPATORY_OBSERVATION",
      observationScopes: [
        "RELATION_TENSION",
        "GOAL_TENSION",
        "ENVIRONMENTAL_CHANGE",
        "INNER_OUTER_CONFLICT",
      ] as const,
      outputMode: "OBSERVATION_NOT_CONCLUSION",
      noPersonalityLabel: true,
      noDestinyJudgment: true,
    }),
    inertiaPreparationLayer: Object.freeze({
      semanticRole: "INERTIA_OBSERVATION_PREPARATION",
      preparationMode: "OBSERVE_PRIOR_RESPONSE",
      gravityPreparationOnly: true,
      noCriticism: true,
      noBehaviorAdvice: true,
      noChoiceResolution: true,
    }),
    interventionBoundary: INTERVENTION_BOUNDARY,
    readinessState: "PRESSURE_RECOGNITION_BOUNDARY_READY",
    realityExperienceArchitectureReference: reference,
    genesisBoundary: "GENESIS_COMPLETION_HELD_AND_NOT_REDEFINED",
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "PRESSURE_RECOGNITION_BOUNDARY_READY" as const,
    source: "reality_pressure_recognition_architecture" as const,
    input,
    architecture,
    boundary: ARCHITECTURE_BOUNDARY,
  });
}
