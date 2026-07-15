import type { LifeJourneyStageAuthority } from "./lifeJourneyStageAuthority";
import type { LifeJourneyStageEvidenceAccepted } from "./lifeJourneyStageEvidenceReview";

export type LifeJourneyStageAuthorityEvidenceInput<
  TReview extends LifeJourneyStageEvidenceAccepted = LifeJourneyStageEvidenceAccepted,
> = Readonly<{
  source: "accepted_life_journey_stage_evidence_review";
  authority: TReview["reviewer"] & LifeJourneyStageAuthority;
  semanticRole: "LIFE_JOURNEY_STAGE_AUTHORITY_EVIDENCE_INPUT";
  review: TReview;
  proposedStage: TReview["candidate"]["trigger"]["semanticStage"];
  acceptedEvidenceRequired: true;
  requiresExplicitAuthorityDeclaration: true;
  notAuthorityDeclaration: true;
  notStageSourceInput: true;
  noAutomaticProgression: true;
  noStageTransition: true;
}>;

export type LifeJourneyStageAuthorityEvidenceInputBoundary = Readonly<{
  acceptedReviewRequired: true;
  originalReviewReferenceRequired: true;
  candidateAccessThroughReview: true;
  triggerAccessThroughReview: true;
  proposedStageDerivedFromAcceptedTrigger: true;
  noReviewMutation: true;
  noAuthorityDeclaration: true;
  noStageSourceInput: true;
  noAutomaticProgression: true;
  noRuntimeAdapter: true;
  noPersistence: true;
}>;
