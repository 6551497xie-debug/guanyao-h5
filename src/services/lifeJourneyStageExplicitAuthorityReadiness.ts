import {
  adaptLifeJourneyStageAuthorityEvidenceInput,
  type LifeJourneyStageAuthorityEvidenceInputAdapterInput,
  type LifeJourneyStageAuthorityEvidenceInputAdapterResult,
} from "./lifeJourneyStageAuthorityEvidenceInputAdapter";

type LifeJourneyStageAuthorityEvidenceInputAvailable = Extract<
  LifeJourneyStageAuthorityEvidenceInputAdapterResult,
  { status: "AVAILABLE" }
>;

type LifeJourneyStageAuthorityEvidenceInputNotApplicable = Extract<
  LifeJourneyStageAuthorityEvidenceInputAdapterResult,
  { status: "NOT_APPLICABLE" }
>;

type LifeJourneyStageAuthorityEvidenceInputUnavailable = Extract<
  LifeJourneyStageAuthorityEvidenceInputAdapterResult,
  { status: "UNAVAILABLE" }
>;

export type LifeJourneyStageExplicitAuthorityReadinessInput =
  LifeJourneyStageAuthorityEvidenceInputAdapterInput;

export type LifeJourneyStageExplicitAuthorityReady = Readonly<{
  status: "READY";
  source: "life_journey_stage_explicit_authority_readiness";
  readiness: "READY_FOR_EXPLICIT_AUTHORITY_DECLARATION";
  adapterResult: LifeJourneyStageAuthorityEvidenceInputAvailable;
  authorityEvidenceInput: LifeJourneyStageAuthorityEvidenceInputAvailable["authorityEvidenceInput"];
  explicitDeclarationRequired: true;
  notAuthorityDeclaration: true;
  notStageSourceInput: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageExplicitAuthorityNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "life_journey_stage_explicit_authority_readiness";
  readiness: "NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION";
  reason: LifeJourneyStageAuthorityEvidenceInputNotApplicable["reason"];
  adapterResult: LifeJourneyStageAuthorityEvidenceInputNotApplicable;
  review: LifeJourneyStageAuthorityEvidenceInputNotApplicable["review"];
  rejectionReason: LifeJourneyStageAuthorityEvidenceInputNotApplicable["rejectionReason"];
  reviewCompleted: true;
  notSystemError: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageExplicitAuthorityNotReady = Readonly<{
  status: "NOT_READY";
  source: "life_journey_stage_explicit_authority_readiness";
  readiness: "NOT_READY";
  reason: LifeJourneyStageAuthorityEvidenceInputUnavailable["reason"];
  adapterResult: LifeJourneyStageAuthorityEvidenceInputUnavailable;
  input: LifeJourneyStageAuthorityEvidenceInputUnavailable["input"];
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageExplicitAuthorityReadiness =
  | LifeJourneyStageExplicitAuthorityReady
  | LifeJourneyStageExplicitAuthorityNotApplicable
  | LifeJourneyStageExplicitAuthorityNotReady;

export function resolveLifeJourneyStageExplicitAuthorityReadiness(
  input: LifeJourneyStageExplicitAuthorityReadinessInput,
): LifeJourneyStageExplicitAuthorityReadiness {
  const adapterResult = adaptLifeJourneyStageAuthorityEvidenceInput(input);

  if (adapterResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_explicit_authority_readiness",
      readiness: "NOT_READY",
      reason: adapterResult.reason,
      adapterResult,
      input: adapterResult.input,
      noAutomaticProgression: true,
    });
  }

  if (adapterResult.status === "NOT_APPLICABLE") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "life_journey_stage_explicit_authority_readiness",
      readiness: "NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION",
      reason: adapterResult.reason,
      adapterResult,
      review: adapterResult.review,
      rejectionReason: adapterResult.rejectionReason,
      reviewCompleted: true,
      notSystemError: true,
      noAutomaticProgression: true,
    });
  }

  return Object.freeze({
    status: "READY",
    source: "life_journey_stage_explicit_authority_readiness",
    readiness: "READY_FOR_EXPLICIT_AUTHORITY_DECLARATION",
    adapterResult,
    authorityEvidenceInput: adapterResult.authorityEvidenceInput,
    explicitDeclarationRequired: true,
    notAuthorityDeclaration: true,
    notStageSourceInput: true,
    noAutomaticProgression: true,
  });
}
