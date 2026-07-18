import type {
  PresenceCarryContinuity,
  PresenceCarryRealityArrivalState,
  PresenceCarryRealityTransition,
  PresenceCarryRealityTransitionBlocked,
  PresenceCarryRealityTransitionBlockedReason,
  PresenceCarryRealityTransitionBoundary,
  PresenceCarryRealityTransitionInput,
  PresenceCarryRealityTransitionResult,
  PresenceCarryRealityTransitionUnavailable,
  PresenceCarryRealityTransitionUnavailableReason,
  PresenceCarryRecognitionPresenceState,
  PresenceCarryTransitionState,
} from "../types/presenceCarryRealityTransition";

export const PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY: PresenceCarryRealityTransitionBoundary =
  Object.freeze({
    experienceContinuityOnly: true,
    noGenesisMutation: true,
    noVisualStateMutation: true,
    noPressureMutation: true,
    noIdentity: true,
    noUserData: true,
    noStorage: true,
    noEngineResult: true,
    noLifeGeneration: true,
    noRuntimeRuleMutation: true,
  });

const unavailable = (
  input: PresenceCarryRealityTransitionInput,
  reason: PresenceCarryRealityTransitionUnavailableReason,
): PresenceCarryRealityTransitionUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "presence_carry_reality_transition" as const,
    reason,
    transition: null,
    input,
    boundary: PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY,
  });

const createTransition = (
  values: Readonly<{
    recognitionPresenceState: PresenceCarryRecognitionPresenceState;
    transitionCarryState: PresenceCarryTransitionState;
    realityArrivalState: PresenceCarryRealityArrivalState;
    presenceContinuity: PresenceCarryContinuity;
  }>,
): PresenceCarryRealityTransition => {
  const inReality =
    values.realityArrivalState === "REALITY_PRESENT" ||
    values.realityArrivalState === "PRESSURE_CONTEXT_READY";
  return Object.freeze({
    semanticRole: "PRESENCE_CARRY_REALITY_TRANSITION" as const,
    recognitionPresenceState: values.recognitionPresenceState,
    transitionCarryState: values.transitionCarryState,
    realityArrivalState: values.realityArrivalState,
    presenceContinuity: values.presenceContinuity,
    presenceReference: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE" as const,
    recognitionReference: "RECOGNITION_SPACE_RUNTIME" as const,
    realityEntryReference: "REALITY_ENTRY_SPACE_RUNTIME" as const,
    pressureObservationContext: "PRESSURE_OBSERVATION_CONTEXT" as const,
    spatialRelationship: inReality
      ? ("PRESENCE_IN_REALITY" as const)
      : values.realityArrivalState === "REALITY_APPROACHING"
        ? ("PRESENCE_APPROACHES_REALITY" as const)
        : ("PRESENCE_WITH_USER" as const),
    visualCarryMode: inReality
      ? ("LOW_CONTRAST_REALITY_ARRIVAL" as const)
      : ("LOW_CONTRAST_CONTINUITY" as const),
    boundary: PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY,
  });
};

const blocked = (
  input: PresenceCarryRealityTransitionInput,
  reason: PresenceCarryRealityTransitionBlockedReason,
  transition: PresenceCarryRealityTransition,
): PresenceCarryRealityTransitionBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "presence_carry_reality_transition" as const,
    reason,
    transition,
    input,
    boundary: PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY,
  });

export function resolvePresenceCarryRealityTransition(
  input: PresenceCarryRealityTransitionInput,
): PresenceCarryRealityTransitionResult {
  if (!input.recognitionEntered) {
    return unavailable(input, "RECOGNITION_ENTRY_REQUIRED");
  }
  if (input.recognitionSpaceRuntime === null) {
    return unavailable(input, "RECOGNITION_PRESENCE_REQUIRED");
  }
  if (input.bridgeFix === null) {
    return unavailable(input, "BRIDGE_FIX_REQUIRED");
  }

  const bridgeBroken =
    input.bridgeFix.bridgeState === "BRIDGE_BROKEN" ||
    input.bridgeFix.bridgeIntegrity === "BROKEN";
  if (bridgeBroken) {
    return blocked(
      input,
      "BRIDGE_CONTINUITY_BROKEN",
      createTransition({
        recognitionPresenceState: "PRESENCE_HELD",
        transitionCarryState: "NOT_STARTED",
        realityArrivalState: "NOT_READY",
        presenceContinuity: "BROKEN",
      }),
    );
  }

  const recognitionConfirmed =
    input.recognitionSpaceRuntime.recognitionConfirmed;
  if (input.realityEntryConfirmed && !recognitionConfirmed) {
    return blocked(
      input,
      "REALITY_ENTRY_BEFORE_RECOGNITION",
      createTransition({
        recognitionPresenceState: "PRESENCE_HELD",
        transitionCarryState: "NOT_STARTED",
        realityArrivalState: "NOT_READY",
        presenceContinuity: "BROKEN",
      }),
    );
  }

  if (!recognitionConfirmed) {
    return Object.freeze({
      status: "READY" as const,
      source: "presence_carry_reality_transition" as const,
      transition: createTransition({
        recognitionPresenceState: "PRESENCE_HELD",
        transitionCarryState: "READY_TO_CARRY",
        realityArrivalState: "NOT_READY",
        presenceContinuity: "HELD",
      }),
      input,
      boundary: PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY,
    });
  }

  if (!input.realityEntryConfirmed) {
    return Object.freeze({
      status: "READY" as const,
      source: "presence_carry_reality_transition" as const,
      transition: createTransition({
        recognitionPresenceState: "RECOGNITION_CONFIRMED",
        transitionCarryState: "CARRYING_PRESENCE",
        realityArrivalState: "REALITY_APPROACHING",
        presenceContinuity: "CONTINUOUS",
      }),
      input,
      boundary: PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY,
    });
  }

  if (
    input.realityEntryRuntime === null ||
    input.realityEntryRuntime.realityReadiness !== "READY"
  ) {
    return unavailable(input, "REALITY_ENTRY_CONTEXT_REQUIRED");
  }

  if (input.pressureObservationConfirmed && input.pressureRuntime === null) {
    return blocked(
      input,
      "PRESSURE_CONTEXT_BEFORE_REALITY",
      createTransition({
        recognitionPresenceState: "RECOGNITION_CONFIRMED",
        transitionCarryState: "CARRYING_PRESENCE",
        realityArrivalState: "REALITY_PRESENT",
        presenceContinuity: "CONTINUOUS",
      }),
    );
  }

  return Object.freeze({
    status: "READY" as const,
    source: "presence_carry_reality_transition" as const,
    transition: createTransition({
      recognitionPresenceState: "RECOGNITION_CONFIRMED",
      transitionCarryState: "PRESENCE_CONTINUES",
      realityArrivalState: input.pressureObservationConfirmed
        ? "PRESSURE_CONTEXT_READY"
        : "REALITY_PRESENT",
      presenceContinuity: "CONTINUOUS",
    }),
    input,
    boundary: PRESENCE_CARRY_REALITY_TRANSITION_BOUNDARY,
  });
}
