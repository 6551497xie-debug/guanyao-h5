import type {
  LifeJourneyStageEvidenceRejectionReason,
  LifeJourneyStageEvidenceReview,
} from "../types/lifeJourneyStageEvidenceReview";

export type LifeJourneyStageEvidenceReviewDecision = "ACCEPT" | "REJECT";

export type LifeJourneyStageEvidenceReviewResolverInput = Readonly<{
  candidate: LifeJourneyStageEvidenceReview["candidate"] | null;
  reviewer: LifeJourneyStageEvidenceReview["reviewer"] | null;
  decision: LifeJourneyStageEvidenceReviewDecision | null;
  rejectionReason?: LifeJourneyStageEvidenceRejectionReason | null;
}>;

export type LifeJourneyStageEvidenceReviewResolverNotReadyReason =
  | "EVIDENCE_CANDIDATE_MISSING"
  | "AUTHORITY_REVIEWER_INVALID"
  | "AUTHORITY_DECISION_INVALID"
  | "REJECTION_REASON_MISSING"
  | "REJECTION_REASON_INVALID";

export type LifeJourneyStageEvidenceReviewResolverResult =
  | Readonly<{
      status: "NOT_READY";
      source: "life_journey_stage_evidence_review_resolver";
      reason: LifeJourneyStageEvidenceReviewResolverNotReadyReason;
      input: LifeJourneyStageEvidenceReviewResolverInput;
    }>
  | Readonly<{
      status: "READY";
      source: "life_journey_stage_evidence_review_resolver";
      input: LifeJourneyStageEvidenceReviewResolverInput;
      review: LifeJourneyStageEvidenceReview;
    }>;

const LIFE_JOURNEY_STAGE_AUTHORITY = "original_self_life_journey_orchestrator" as const;

const EVIDENCE_REJECTION_REASONS: readonly LifeJourneyStageEvidenceRejectionReason[] =
  Object.freeze([
    "EVIDENCE_SOURCE_UNVERIFIED",
    "TRIGGER_SEMANTIC_MISMATCH",
    "AUTHORITY_CONTEXT_INSUFFICIENT",
  ]);

const createNotReady = (
  input: LifeJourneyStageEvidenceReviewResolverInput,
  reason: LifeJourneyStageEvidenceReviewResolverNotReadyReason,
): LifeJourneyStageEvidenceReviewResolverResult =>
  Object.freeze({
    status: "NOT_READY",
    source: "life_journey_stage_evidence_review_resolver",
    reason,
    input,
  });

export function resolveLifeJourneyStageEvidenceReview(
  input: LifeJourneyStageEvidenceReviewResolverInput,
): LifeJourneyStageEvidenceReviewResolverResult {
  if (!input.candidate) return createNotReady(input, "EVIDENCE_CANDIDATE_MISSING");
  if (input.reviewer !== LIFE_JOURNEY_STAGE_AUTHORITY) {
    return createNotReady(input, "AUTHORITY_REVIEWER_INVALID");
  }
  if (input.decision !== "ACCEPT" && input.decision !== "REJECT") {
    return createNotReady(input, "AUTHORITY_DECISION_INVALID");
  }

  if (input.decision === "ACCEPT") {
    return Object.freeze({
      status: "READY",
      source: "life_journey_stage_evidence_review_resolver",
      input,
      review: Object.freeze({
        status: "ACCEPTED",
        reviewer: input.reviewer,
        semanticRole: "LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW",
        candidate: input.candidate,
        acceptedAsEvidence: true,
        notStageDeclaration: true,
        noAutomaticProgression: true,
      }),
    });
  }

  if (!input.rejectionReason) return createNotReady(input, "REJECTION_REASON_MISSING");
  if (!EVIDENCE_REJECTION_REASONS.includes(input.rejectionReason)) {
    return createNotReady(input, "REJECTION_REASON_INVALID");
  }

  return Object.freeze({
    status: "READY",
    source: "life_journey_stage_evidence_review_resolver",
    input,
    review: Object.freeze({
      status: "REJECTED",
      reviewer: input.reviewer,
      semanticRole: "LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW",
      candidate: input.candidate,
      acceptedAsEvidence: false,
      reason: input.rejectionReason,
      notStageDeclaration: true,
      noAutomaticProgression: true,
    }),
  });
}
