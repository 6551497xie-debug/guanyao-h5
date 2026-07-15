import type {
  LifeJourneyStageEvidenceReviewResolverNotReadyReason,
  LifeJourneyStageEvidenceReviewResolverResult,
} from "./lifeJourneyStageEvidenceReviewResolver";

type LifeJourneyStageEvidenceReviewResolverReady = Extract<
  LifeJourneyStageEvidenceReviewResolverResult,
  { status: "READY" }
>;

type LifeJourneyStageEvidenceReviewResolverNotReady = Extract<
  LifeJourneyStageEvidenceReviewResolverResult,
  { status: "NOT_READY" }
>;

export type LifeJourneyStageEvidenceReviewAvailable = Readonly<{
  status: "AVAILABLE";
  source: "life_journey_stage_evidence_review_consumption";
  result: LifeJourneyStageEvidenceReviewResolverReady;
  review: LifeJourneyStageEvidenceReviewResolverReady["review"];
  disposition: LifeJourneyStageEvidenceReviewResolverReady["review"]["status"];
}>;

export type LifeJourneyStageEvidenceReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "life_journey_stage_evidence_review_consumption";
  result: LifeJourneyStageEvidenceReviewResolverNotReady;
  reason: LifeJourneyStageEvidenceReviewResolverNotReadyReason;
  input: LifeJourneyStageEvidenceReviewResolverNotReady["input"];
}>;

export type LifeJourneyStageEvidenceReviewConsumption =
  | LifeJourneyStageEvidenceReviewAvailable
  | LifeJourneyStageEvidenceReviewUnavailable;

export function consumeLifeJourneyStageEvidenceReviewResult(
  result: LifeJourneyStageEvidenceReviewResolverResult,
): LifeJourneyStageEvidenceReviewConsumption {
  if (result.status !== "READY") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "life_journey_stage_evidence_review_consumption",
      result,
      reason: result.reason,
      input: result.input,
    });
  }

  return Object.freeze({
    status: "AVAILABLE",
    source: "life_journey_stage_evidence_review_consumption",
    result,
    review: result.review,
    disposition: result.review.status,
  });
}
