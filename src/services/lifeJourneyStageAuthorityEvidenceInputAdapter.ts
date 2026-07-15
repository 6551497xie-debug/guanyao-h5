import type { LifeJourneyStageAuthorityEvidenceInput } from "../types/lifeJourneyStageAuthorityEvidenceInput";
import {
  resolveLifeJourneyStageEvidenceReviewReadiness,
  type LifeJourneyStageEvidenceReviewReadiness,
  type LifeJourneyStageEvidenceReviewReadinessInput,
} from "./lifeJourneyStageEvidenceReviewReadiness";

type LifeJourneyStageEvidenceReviewReady = Extract<
  LifeJourneyStageEvidenceReviewReadiness,
  { status: "READY" }
>;

type LifeJourneyStageEvidenceReviewNotReady = Extract<
  LifeJourneyStageEvidenceReviewReadiness,
  { status: "NOT_READY" }
>;

type LifeJourneyStageEvidenceAccepted = Extract<
  LifeJourneyStageEvidenceReviewReady["consumption"]["review"],
  { status: "ACCEPTED" }
>;

type LifeJourneyStageEvidenceRejected = Extract<
  LifeJourneyStageEvidenceReviewReady["consumption"]["review"],
  { status: "REJECTED" }
>;

export type LifeJourneyStageAuthorityEvidenceInputAdapterInput =
  LifeJourneyStageEvidenceReviewReadinessInput;

export type LifeJourneyStageAuthorityEvidenceInputAvailable = Readonly<{
  status: "AVAILABLE";
  source: "life_journey_stage_authority_evidence_input_adapter";
  readiness: LifeJourneyStageEvidenceReviewReady;
  authorityEvidenceInput: LifeJourneyStageAuthorityEvidenceInput<LifeJourneyStageEvidenceAccepted>;
}>;

export type LifeJourneyStageAuthorityEvidenceInputNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "life_journey_stage_authority_evidence_input_adapter";
  reason: "REVIEW_REJECTED";
  readiness: LifeJourneyStageEvidenceReviewReady;
  review: LifeJourneyStageEvidenceRejected;
  rejectionReason: LifeJourneyStageEvidenceRejected["reason"];
}>;

export type LifeJourneyStageAuthorityEvidenceInputUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "life_journey_stage_authority_evidence_input_adapter";
  reason: LifeJourneyStageEvidenceReviewNotReady["reason"];
  readiness: LifeJourneyStageEvidenceReviewNotReady;
  input: LifeJourneyStageEvidenceReviewNotReady["input"];
}>;

export type LifeJourneyStageAuthorityEvidenceInputAdapterResult =
  | LifeJourneyStageAuthorityEvidenceInputAvailable
  | LifeJourneyStageAuthorityEvidenceInputNotApplicable
  | LifeJourneyStageAuthorityEvidenceInputUnavailable;

export function adaptLifeJourneyStageAuthorityEvidenceInput(
  input: LifeJourneyStageAuthorityEvidenceInputAdapterInput,
): LifeJourneyStageAuthorityEvidenceInputAdapterResult {
  const readiness = resolveLifeJourneyStageEvidenceReviewReadiness(input);

  if (readiness.status !== "READY") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "life_journey_stage_authority_evidence_input_adapter",
      reason: readiness.reason,
      readiness,
      input: readiness.input,
    });
  }

  const review = readiness.consumption.review;
  if (review.status !== "ACCEPTED") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "life_journey_stage_authority_evidence_input_adapter",
      reason: "REVIEW_REJECTED",
      readiness,
      review,
      rejectionReason: review.reason,
    });
  }

  const authorityEvidenceInput: LifeJourneyStageAuthorityEvidenceInput<typeof review> =
    Object.freeze({
      source: "accepted_life_journey_stage_evidence_review",
      authority: review.reviewer,
      semanticRole: "LIFE_JOURNEY_STAGE_AUTHORITY_EVIDENCE_INPUT",
      review,
      proposedStage: review.candidate.trigger.semanticStage,
      acceptedEvidenceRequired: true,
      requiresExplicitAuthorityDeclaration: true,
      notAuthorityDeclaration: true,
      notStageSourceInput: true,
      noAutomaticProgression: true,
      noStageTransition: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "life_journey_stage_authority_evidence_input_adapter",
    readiness,
    authorityEvidenceInput,
  });
}
