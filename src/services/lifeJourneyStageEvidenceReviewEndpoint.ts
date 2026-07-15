import {
  resolveLifeJourneyStageEvidenceReview,
  type LifeJourneyStageEvidenceReviewResolverInput,
} from "./lifeJourneyStageEvidenceReviewResolver";
import {
  consumeLifeJourneyStageEvidenceReviewResult,
  type LifeJourneyStageEvidenceReviewConsumption,
} from "./lifeJourneyStageEvidenceReviewResultConsumption";

export type { LifeJourneyStageEvidenceReviewConsumption } from "./lifeJourneyStageEvidenceReviewResultConsumption";

export type LifeJourneyStageEvidenceReviewEndpointInput =
  LifeJourneyStageEvidenceReviewResolverInput;

export function resolveLifeJourneyStageEvidenceReviewConsumption(
  input: LifeJourneyStageEvidenceReviewEndpointInput,
): LifeJourneyStageEvidenceReviewConsumption {
  return consumeLifeJourneyStageEvidenceReviewResult(
    resolveLifeJourneyStageEvidenceReview(input),
  );
}
