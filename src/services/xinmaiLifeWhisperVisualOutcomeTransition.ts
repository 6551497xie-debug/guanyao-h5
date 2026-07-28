import type {
  LifeWhisperRelationshipFact,
  LifeWhisperRelationshipResponsePhase,
  LifeWhisperSurfaceVisualResponseOutcome,
} from "../types/xinmaiLifeWhisperRelationship";

export type LifeWhisperVisualOutcomeTransition =
  | Readonly<{
      action: "IGNORE";
      reason:
        | "IDENTITY_MISMATCH"
        | "CYCLE_MISMATCH"
        | "RELATIONSHIP_FACT_MISMATCH"
        | "RELATIONSHIP_PHASE_MISMATCH"
        | "MOTION_ONLY_STARTED";
    }>
  | Readonly<{
      action: "SETTLE";
      authority: "MOTION_VISUAL_OUTCOME" | "STATIC_VISUAL_OUTCOME";
    }>
  | Readonly<{
      action: "MARK_UNAVAILABLE";
      reason: Extract<
        LifeWhisperSurfaceVisualResponseOutcome,
        { status: "VISUAL_RESPONSE_UNAVAILABLE" }
      >["reason"];
    }>;

export function resolveLifeWhisperVisualOutcomeTransition(
  input: Readonly<{
    expectedSourceReferenceId: string;
    currentResponseCycleId: string | null;
    lifeWhisperFact: LifeWhisperRelationshipFact;
    lifeWhisperResponsePhase: LifeWhisperRelationshipResponsePhase;
    outcome: LifeWhisperSurfaceVisualResponseOutcome;
  }>,
): LifeWhisperVisualOutcomeTransition {
  if (input.outcome.sourceReferenceId !== input.expectedSourceReferenceId) {
    return Object.freeze({
      action: "IGNORE",
      reason: "IDENTITY_MISMATCH",
    });
  }
  if (
    input.currentResponseCycleId === null ||
    input.outcome.responseCycleId !== input.currentResponseCycleId
  ) {
    return Object.freeze({
      action: "IGNORE",
      reason: "CYCLE_MISMATCH",
    });
  }
  if (input.lifeWhisperFact !== "WHISPER_SUBMITTED") {
    return Object.freeze({
      action: "IGNORE",
      reason: "RELATIONSHIP_FACT_MISMATCH",
    });
  }
  if (input.lifeWhisperResponsePhase !== "RESPONDING") {
    return Object.freeze({
      action: "IGNORE",
      reason: "RELATIONSHIP_PHASE_MISMATCH",
    });
  }
  if (input.outcome.status === "MOTION_RESPONSE_STARTED") {
    return Object.freeze({
      action: "IGNORE",
      reason: "MOTION_ONLY_STARTED",
    });
  }
  if (input.outcome.status === "MOTION_RESPONSE_COMPLETED") {
    return Object.freeze({
      action: "SETTLE",
      authority: "MOTION_VISUAL_OUTCOME",
    });
  }
  if (input.outcome.status === "STATIC_RESPONSE_PRESENTED") {
    return Object.freeze({
      action: "SETTLE",
      authority: "STATIC_VISUAL_OUTCOME",
    });
  }
  if (input.outcome.status === "VISUAL_RESPONSE_UNAVAILABLE") {
    return Object.freeze({
      action: "MARK_UNAVAILABLE",
      reason: input.outcome.reason,
    });
  }
  return Object.freeze({
    action: "IGNORE",
    reason: "RELATIONSHIP_PHASE_MISMATCH",
  });
}
