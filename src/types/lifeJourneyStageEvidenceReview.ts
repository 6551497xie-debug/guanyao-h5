import type { LifeJourneyStageAuthority } from "./lifeJourneyStageAuthority";
import type { LifeJourneyStageTriggerEvidenceCandidate } from "./lifeJourneyStageTriggerEvidence";

export type LifeJourneyStageEvidenceRejectionReason =
  | "EVIDENCE_SOURCE_UNVERIFIED"
  | "TRIGGER_SEMANTIC_MISMATCH"
  | "AUTHORITY_CONTEXT_INSUFFICIENT";

export type LifeJourneyStageEvidenceAccepted = Readonly<{
  status: "ACCEPTED";
  reviewer: LifeJourneyStageAuthority;
  semanticRole: "LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW";
  candidate: LifeJourneyStageTriggerEvidenceCandidate;
  acceptedAsEvidence: true;
  notStageDeclaration: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageEvidenceRejected = Readonly<{
  status: "REJECTED";
  reviewer: LifeJourneyStageAuthority;
  semanticRole: "LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW";
  candidate: LifeJourneyStageTriggerEvidenceCandidate;
  acceptedAsEvidence: false;
  reason: LifeJourneyStageEvidenceRejectionReason;
  notStageDeclaration: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageEvidenceReview =
  | LifeJourneyStageEvidenceAccepted
  | LifeJourneyStageEvidenceRejected;

export type LifeJourneyStageEvidenceReviewBoundary = Readonly<{
  exclusiveAuthorityReviewer: true;
  candidateReferenceRequired: true;
  explicitRejectionReasonRequired: true;
  noCandidateMutation: true;
  noStageDeclaration: true;
  noStageSourceInput: true;
  noAutomaticProgression: true;
  noRuntimeReviewResolver: true;
  noPersistence: true;
}>;
