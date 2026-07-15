import type {
  LifeJourneyStageAuthority,
  LifeJourneyStageAuthorityDeclaration,
} from "../types/lifeJourneyStageAuthority";
import {
  resolveLifeJourneyStageExplicitDeclarationCommand,
  type LifeJourneyStageExplicitDeclarationCommandAvailable,
  type LifeJourneyStageExplicitDeclarationCommandInput,
  type LifeJourneyStageExplicitDeclarationCommandNotApplicable,
  type LifeJourneyStageExplicitDeclarationCommandNotReady,
} from "./lifeJourneyStageExplicitDeclarationCommand";

export type LifeJourneyStageAuthorityDeclarationResolverInput = Readonly<{
  commandInput: LifeJourneyStageExplicitDeclarationCommandInput;
  authority: LifeJourneyStageAuthority | null;
}>;

export type LifeJourneyStageAuthorityDeclarationResolverReady = Readonly<{
  status: "READY";
  source: "life_journey_stage_authority_declaration_resolver";
  resolution: "EXPLICIT_AUTHORITY_DECLARATION_CREATED";
  commandResult: LifeJourneyStageExplicitDeclarationCommandAvailable;
  command: LifeJourneyStageExplicitDeclarationCommandAvailable["command"];
  declaration: LifeJourneyStageAuthorityDeclaration;
  explicitSubjectCommandRequired: true;
  exclusiveAuthorityRequired: true;
  notStageSourceInput: true;
  noStageTransition: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageAuthorityDeclarationResolverNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "life_journey_stage_authority_declaration_resolver";
  reason: LifeJourneyStageExplicitDeclarationCommandNotApplicable["reason"];
  commandResult: LifeJourneyStageExplicitDeclarationCommandNotApplicable;
  rejectionReason: LifeJourneyStageExplicitDeclarationCommandNotApplicable["rejectionReason"];
}>;

export type LifeJourneyStageAuthorityDeclarationResolverNotReadyReason =
  | LifeJourneyStageExplicitDeclarationCommandNotReady["reason"]
  | "DECLARATION_AUTHORITY_REQUIRED"
  | "DECLARATION_AUTHORITY_INVALID";

export type LifeJourneyStageAuthorityDeclarationResolverNotReady = Readonly<{
  status: "NOT_READY";
  source: "life_journey_stage_authority_declaration_resolver";
  reason: LifeJourneyStageAuthorityDeclarationResolverNotReadyReason;
  commandResult:
    | LifeJourneyStageExplicitDeclarationCommandAvailable
    | LifeJourneyStageExplicitDeclarationCommandNotReady;
  input: LifeJourneyStageAuthorityDeclarationResolverInput;
}>;

export type LifeJourneyStageAuthorityDeclarationResolverResult =
  | LifeJourneyStageAuthorityDeclarationResolverReady
  | LifeJourneyStageAuthorityDeclarationResolverNotApplicable
  | LifeJourneyStageAuthorityDeclarationResolverNotReady;

export function resolveLifeJourneyStageAuthorityDeclaration(
  input: LifeJourneyStageAuthorityDeclarationResolverInput,
): LifeJourneyStageAuthorityDeclarationResolverResult {
  const commandResult = resolveLifeJourneyStageExplicitDeclarationCommand(input.commandInput);

  if (commandResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_authority_declaration_resolver",
      reason: commandResult.reason,
      commandResult,
      input,
    });
  }

  if (commandResult.status === "NOT_APPLICABLE") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "life_journey_stage_authority_declaration_resolver",
      reason: commandResult.reason,
      commandResult,
      rejectionReason: commandResult.rejectionReason,
    });
  }

  if (input.authority === null) {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_authority_declaration_resolver",
      reason: "DECLARATION_AUTHORITY_REQUIRED",
      commandResult,
      input,
    });
  }

  if (input.authority !== commandResult.command.authorityEvidenceInput.authority) {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_authority_declaration_resolver",
      reason: "DECLARATION_AUTHORITY_INVALID",
      commandResult,
      input,
    });
  }

  const declaration: LifeJourneyStageAuthorityDeclaration = Object.freeze({
    authority: input.authority,
    sourceBoundary: "upper_schema",
    semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION",
    lifeJourneyStage: commandResult.command.targetStage,
    explicit: true,
    noAutomaticProgression: true,
    noRuntimeInference: true,
    noFoundationPhaseInference: true,
  });

  return Object.freeze({
    status: "READY",
    source: "life_journey_stage_authority_declaration_resolver",
    resolution: "EXPLICIT_AUTHORITY_DECLARATION_CREATED",
    commandResult,
    command: commandResult.command,
    declaration,
    explicitSubjectCommandRequired: true,
    exclusiveAuthorityRequired: true,
    notStageSourceInput: true,
    noStageTransition: true,
    noAutomaticProgression: true,
  });
}
