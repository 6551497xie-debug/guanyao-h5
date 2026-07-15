import {
  resolveLifeJourneyStageEvidenceReviewConsumption,
  type LifeJourneyStageEvidenceReviewConsumption,
  type LifeJourneyStageEvidenceReviewEndpointInput,
} from "./lifeJourneyStageEvidenceReviewEndpoint";

type LifeJourneyStageEvidenceReviewAvailable = Extract<
  LifeJourneyStageEvidenceReviewConsumption,
  { status: "AVAILABLE" }
>;

type LifeJourneyStageEvidenceReviewUnavailable = Extract<
  LifeJourneyStageEvidenceReviewConsumption,
  { status: "UNAVAILABLE" }
>;

export type LifeJourneyStageEvidenceReviewReadinessInput =
  LifeJourneyStageEvidenceReviewEndpointInput;

export type LifeJourneyStageEvidenceReviewReadinessNotReadyReason =
  LifeJourneyStageEvidenceReviewUnavailable["reason"];

export type LifeJourneyStageEvidenceReviewReadiness =
  | Readonly<{
      status: "NOT_READY";
      readiness: "NOT_READY";
      source: "life_journey_stage_evidence_review_readiness";
      reason: LifeJourneyStageEvidenceReviewReadinessNotReadyReason;
      input: LifeJourneyStageEvidenceReviewReadinessInput;
      consumption: LifeJourneyStageEvidenceReviewUnavailable;
    }>
  | Readonly<{
      status: "READY";
      readiness: "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME";
      source: "life_journey_stage_evidence_review_readiness";
      input: LifeJourneyStageEvidenceReviewReadinessInput;
      consumption: LifeJourneyStageEvidenceReviewAvailable;
      disposition: LifeJourneyStageEvidenceReviewAvailable["disposition"];
    }>;

export function resolveLifeJourneyStageEvidenceReviewReadiness(
  input: LifeJourneyStageEvidenceReviewReadinessInput,
): LifeJourneyStageEvidenceReviewReadiness {
  const consumption = resolveLifeJourneyStageEvidenceReviewConsumption(input);

  if (consumption.status !== "AVAILABLE") {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "life_journey_stage_evidence_review_readiness",
      reason: consumption.reason,
      input,
      consumption,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME",
    source: "life_journey_stage_evidence_review_readiness",
    input,
    consumption,
    disposition: consumption.disposition,
  });
}
