import type { LifeJourneyStageTrigger } from "./lifeJourneyStageTrigger";

export type LifeJourneyStageTriggerEvidenceSource = Readonly<{
  boundary: "formal_life_journey_evidence_provider";
  sourceReference: string;
}>;

export type LifeJourneyStageTriggerEvidenceCandidate = Readonly<{
  evidenceSource: LifeJourneyStageTriggerEvidenceSource;
  trigger: LifeJourneyStageTrigger;
  semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE";
  immutable: true;
  traceable: true;
  requiresAuthorityReview: true;
  notStageDeclaration: true;
  notAuthorityDecision: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageTriggerEvidenceBoundary = Readonly<{
  explicitProvenanceRequired: true;
  immutableCandidate: true;
  traceableCandidate: true;
  requiresAuthorityReview: true;
  noEvidenceAcceptance: true;
  noStageDeclaration: true;
  noAutomaticProgression: true;
  noRuntimeSourceMapping: true;
  noPersistence: true;
}>;
