import type {
  LifeJourneyStageAuthorityDeclarationResolverNotApplicable,
  LifeJourneyStageAuthorityDeclarationResolverNotReady,
  LifeJourneyStageAuthorityDeclarationResolverReady,
  LifeJourneyStageAuthorityDeclarationResolverResult,
} from "./lifeJourneyStageAuthorityDeclarationResolver";

export type LifeJourneyStageAuthorityDeclarationAvailable = Readonly<{
  status: "AVAILABLE";
  source: "life_journey_stage_authority_declaration_consumption";
  result: LifeJourneyStageAuthorityDeclarationResolverReady;
  declaration: LifeJourneyStageAuthorityDeclarationResolverReady["declaration"];
  command: LifeJourneyStageAuthorityDeclarationResolverReady["command"];
  disposition: "DECLARED";
  notStageSourceInput: true;
  noStageTransition: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageAuthorityDeclarationNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "life_journey_stage_authority_declaration_consumption";
  result: LifeJourneyStageAuthorityDeclarationResolverNotApplicable;
  reason: LifeJourneyStageAuthorityDeclarationResolverNotApplicable["reason"];
  rejectionReason: LifeJourneyStageAuthorityDeclarationResolverNotApplicable["rejectionReason"];
  disposition: "REVIEW_REJECTED";
  reviewCompleted: true;
  notSystemError: true;
  notStageSourceInput: true;
  noStageTransition: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageAuthorityDeclarationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "life_journey_stage_authority_declaration_consumption";
  result: LifeJourneyStageAuthorityDeclarationResolverNotReady;
  reason: LifeJourneyStageAuthorityDeclarationResolverNotReady["reason"];
  input: LifeJourneyStageAuthorityDeclarationResolverNotReady["input"];
  notStageSourceInput: true;
  noStageTransition: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageAuthorityDeclarationConsumption =
  | LifeJourneyStageAuthorityDeclarationAvailable
  | LifeJourneyStageAuthorityDeclarationNotApplicable
  | LifeJourneyStageAuthorityDeclarationUnavailable;

export function consumeLifeJourneyStageAuthorityDeclarationResult(
  result: LifeJourneyStageAuthorityDeclarationResolverResult,
): LifeJourneyStageAuthorityDeclarationConsumption {
  if (result.status === "READY") {
    return Object.freeze({
      status: "AVAILABLE",
      source: "life_journey_stage_authority_declaration_consumption",
      result,
      declaration: result.declaration,
      command: result.command,
      disposition: "DECLARED",
      notStageSourceInput: true,
      noStageTransition: true,
      noAutomaticProgression: true,
    });
  }

  if (result.status === "NOT_APPLICABLE") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "life_journey_stage_authority_declaration_consumption",
      result,
      reason: result.reason,
      rejectionReason: result.rejectionReason,
      disposition: "REVIEW_REJECTED",
      reviewCompleted: true,
      notSystemError: true,
      notStageSourceInput: true,
      noStageTransition: true,
      noAutomaticProgression: true,
    });
  }

  return Object.freeze({
    status: "UNAVAILABLE",
    source: "life_journey_stage_authority_declaration_consumption",
    result,
    reason: result.reason,
    input: result.input,
    notStageSourceInput: true,
    noStageTransition: true,
    noAutomaticProgression: true,
  });
}
