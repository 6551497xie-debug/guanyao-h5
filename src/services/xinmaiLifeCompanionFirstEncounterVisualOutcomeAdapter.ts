import type { GenesisPresenceRecognitionContinuityActivationResult } from "../types/genesisPresenceRecognitionContinuityActivation";
import type { XinmaiLifeCompanionFirstEncounterVisualOutcome } from "../types/xinmaiLifeCompanionRelationshipCanonical";

export type XinmaiLifeCompanionFirstEncounterVisualOutcomeResult =
  | Readonly<{
      status: "READY";
      responseCycleReferenceId: string;
      visualOutcomeReferenceId: string;
      visualOutcome: XinmaiLifeCompanionFirstEncounterVisualOutcome;
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      responseCycleReferenceId: null;
      visualOutcomeReferenceId: null;
      visualOutcome: null;
      reason: "RECOGNITION_CONTINUITY_NOT_READY";
    }>;

export function resolveXinmaiLifeCompanionFirstEncounterVisualOutcome(
  input: Readonly<{
    recognitionContinuity:
      GenesisPresenceRecognitionContinuityActivationResult;
    presentationMode: "MOTION" | "REDUCED_MOTION";
  }>,
): XinmaiLifeCompanionFirstEncounterVisualOutcomeResult {
  if (input.recognitionContinuity.status !== "READY") {
    return Object.freeze({
      status: "BLOCKED" as const,
      responseCycleReferenceId: null,
      visualOutcomeReferenceId: null,
      visualOutcome: null,
      reason: "RECOGNITION_CONTINUITY_NOT_READY" as const,
    });
  }
  const activation = input.recognitionContinuity.activation;
  const visualOutcome: XinmaiLifeCompanionFirstEncounterVisualOutcome =
    input.presentationMode === "REDUCED_MOTION"
      ? "STATIC_RESPONSE"
      : "MOTION_RESPONSE";
  const responseCycleReferenceId =
    `first-encounter-cycle:${encodeURIComponent(activation.bridgeReferenceId)}`;
  return Object.freeze({
    status: "READY" as const,
    responseCycleReferenceId,
    visualOutcomeReferenceId:
      `first-encounter-visual:${encodeURIComponent(activation.manifestationSourceReferenceId)}:${visualOutcome}`,
    visualOutcome,
    reason: null,
  });
}

export const XinmaiLifeCompanionFirstEncounterVisualOutcomeAdapter =
  Object.freeze({
    resolve: resolveXinmaiLifeCompanionFirstEncounterVisualOutcome,
  });
