import {
  resolveLifeJourneyStageExplicitAuthorityReadiness,
  type LifeJourneyStageExplicitAuthorityNotApplicable,
  type LifeJourneyStageExplicitAuthorityNotReady,
  type LifeJourneyStageExplicitAuthorityReadinessInput,
  type LifeJourneyStageExplicitAuthorityReady,
} from "./lifeJourneyStageExplicitAuthorityReadiness";

export type LifeJourneyStageDeclarationSubject = "life_subject";

export type LifeJourneyStageExplicitDeclarationDecision = "DECLARE";

export type LifeJourneyStageExplicitDeclarationCommandInput = Readonly<{
  readinessInput: LifeJourneyStageExplicitAuthorityReadinessInput;
  subject: LifeJourneyStageDeclarationSubject | null;
  decision: LifeJourneyStageExplicitDeclarationDecision | null;
}>;

export type LifeJourneyStageExplicitDeclarationCommand = Readonly<{
  source: "life_subject_explicit_declaration_decision";
  semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION_COMMAND";
  subject: LifeJourneyStageDeclarationSubject;
  decision: "DECLARE";
  declarationIntent: "DECLARE_CURRENT_LIFE_JOURNEY_STAGE";
  targetStage: LifeJourneyStageExplicitAuthorityReady["authorityEvidenceInput"]["proposedStage"];
  readiness: LifeJourneyStageExplicitAuthorityReady;
  authorityEvidenceInput: LifeJourneyStageExplicitAuthorityReady["authorityEvidenceInput"];
  evidenceReview: LifeJourneyStageExplicitAuthorityReady["authorityEvidenceInput"]["review"];
  subjectConfirmed: true;
  explicit: true;
  notAuthorityDeclaration: true;
  notStageSourceInput: true;
  noAutomaticProgression: true;
  noRuntimeInference: true;
}>;

export type LifeJourneyStageExplicitDeclarationCommandAvailable = Readonly<{
  status: "AVAILABLE";
  source: "life_journey_stage_explicit_declaration_command";
  readiness: LifeJourneyStageExplicitAuthorityReady;
  command: LifeJourneyStageExplicitDeclarationCommand;
}>;

export type LifeJourneyStageExplicitDeclarationCommandNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "life_journey_stage_explicit_declaration_command";
  reason: LifeJourneyStageExplicitAuthorityNotApplicable["reason"];
  readiness: LifeJourneyStageExplicitAuthorityNotApplicable;
  rejectionReason: LifeJourneyStageExplicitAuthorityNotApplicable["rejectionReason"];
}>;

export type LifeJourneyStageExplicitDeclarationCommandNotReadyReason =
  | LifeJourneyStageExplicitAuthorityNotReady["reason"]
  | "LIFE_SUBJECT_REQUIRED"
  | "EXPLICIT_DECLARE_DECISION_REQUIRED";

export type LifeJourneyStageExplicitDeclarationCommandNotReady = Readonly<{
  status: "NOT_READY";
  source: "life_journey_stage_explicit_declaration_command";
  reason: LifeJourneyStageExplicitDeclarationCommandNotReadyReason;
  readiness:
    | LifeJourneyStageExplicitAuthorityReady
    | LifeJourneyStageExplicitAuthorityNotReady;
  input: LifeJourneyStageExplicitDeclarationCommandInput;
}>;

export type LifeJourneyStageExplicitDeclarationCommandResult =
  | LifeJourneyStageExplicitDeclarationCommandAvailable
  | LifeJourneyStageExplicitDeclarationCommandNotApplicable
  | LifeJourneyStageExplicitDeclarationCommandNotReady;

export function resolveLifeJourneyStageExplicitDeclarationCommand(
  input: LifeJourneyStageExplicitDeclarationCommandInput,
): LifeJourneyStageExplicitDeclarationCommandResult {
  const readiness = resolveLifeJourneyStageExplicitAuthorityReadiness(input.readinessInput);

  if (readiness.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_explicit_declaration_command",
      reason: readiness.reason,
      readiness,
      input,
    });
  }

  if (readiness.status === "NOT_APPLICABLE") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "life_journey_stage_explicit_declaration_command",
      reason: readiness.reason,
      readiness,
      rejectionReason: readiness.rejectionReason,
    });
  }

  if (input.subject !== "life_subject") {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_explicit_declaration_command",
      reason: "LIFE_SUBJECT_REQUIRED",
      readiness,
      input,
    });
  }

  if (input.decision !== "DECLARE") {
    return Object.freeze({
      status: "NOT_READY",
      source: "life_journey_stage_explicit_declaration_command",
      reason: "EXPLICIT_DECLARE_DECISION_REQUIRED",
      readiness,
      input,
    });
  }

  const command: LifeJourneyStageExplicitDeclarationCommand = Object.freeze({
    source: "life_subject_explicit_declaration_decision",
    semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION_COMMAND",
    subject: input.subject,
    decision: input.decision,
    declarationIntent: "DECLARE_CURRENT_LIFE_JOURNEY_STAGE",
    targetStage: readiness.authorityEvidenceInput.proposedStage,
    readiness,
    authorityEvidenceInput: readiness.authorityEvidenceInput,
    evidenceReview: readiness.authorityEvidenceInput.review,
    subjectConfirmed: true,
    explicit: true,
    notAuthorityDeclaration: true,
    notStageSourceInput: true,
    noAutomaticProgression: true,
    noRuntimeInference: true,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "life_journey_stage_explicit_declaration_command",
    readiness,
    command,
  });
}
