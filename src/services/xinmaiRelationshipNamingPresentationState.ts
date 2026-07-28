import type { StarBeastRelationshipNamingReadResult } from "../types/starBeastRelationshipNamingAsset";
import type {
  LifeWhisperRelationshipVisualFact,
  LifeWhisperUnavailableContinuation,
} from "../types/xinmaiLifeWhisperRelationship";

type LifeWhisperRelationshipIntentFacts = Pick<
  LifeWhisperRelationshipVisualFact,
  "lifeWhisperFact" | "lifeWhisperResponsePhase"
>;

export type RelationshipNamingEntryEligibility = Readonly<{
  status: "READY" | "NOT_READY";
  source:
    | "WHISPER_RESPONSE_SETTLED"
    | "WHISPER_SKIPPED"
    | "RELATIONSHIP_NOT_READY";
  triggerStarBeastResponse: false;
  namingOptional: true;
  realityEntryBlocked: false;
}>;

export function resolveRelationshipNamingEntryEligibility(input: Readonly<{
  lifeWhisperEntryReady: boolean;
}> &
  LifeWhisperRelationshipIntentFacts): RelationshipNamingEntryEligibility {
  const responseSettled =
    input.lifeWhisperFact === "WHISPER_SUBMITTED" &&
    input.lifeWhisperResponsePhase === "SETTLED";
  const whisperSkipped =
    input.lifeWhisperFact === "WHISPER_SKIPPED" &&
    input.lifeWhisperResponsePhase === "SKIPPED";
  return Object.freeze({
    status:
      input.lifeWhisperEntryReady &&
      (responseSettled || whisperSkipped)
        ? "READY"
        : "NOT_READY",
    source: responseSettled
      ? "WHISPER_RESPONSE_SETTLED"
      : whisperSkipped
        ? "WHISPER_SKIPPED"
        : "RELATIONSHIP_NOT_READY",
    triggerStarBeastResponse: false,
    namingOptional: true,
    realityEntryBlocked: false,
  });
}

export function resolveLifeWhisperRealityEntryIntent(
  input: LifeWhisperRelationshipIntentFacts &
    Readonly<{
      unavailableContinuation?: LifeWhisperUnavailableContinuation;
    }>,
): boolean {
  const submittedResponseSettled =
    input.lifeWhisperFact === "WHISPER_SUBMITTED" &&
    input.lifeWhisperResponsePhase === "SETTLED";
  const silenceExplicitlyChosen =
    input.lifeWhisperFact === "WHISPER_SKIPPED" &&
    input.lifeWhisperResponsePhase === "SKIPPED";
  const unavailableResponseExplicitlyContinued =
    input.lifeWhisperFact === "WHISPER_SUBMITTED" &&
    input.lifeWhisperResponsePhase === "UNAVAILABLE" &&
    input.unavailableContinuation ===
      "CONTINUE_WITHOUT_CONFIRMED_RESPONSE";
  return (
    submittedResponseSettled ||
    silenceExplicitlyChosen ||
    unavailableResponseExplicitlyContinued
  );
}

export function resolveFirstEncounterRealityEntryIntent(
  input: LifeWhisperRelationshipIntentFacts,
): boolean {
  return resolveLifeWhisperRealityEntryIntent(input);
}

export type RelationshipNameDeletePresentation = Readonly<{
  relationshipNaming: StarBeastRelationshipNamingReadResult;
  feedback: "DELETE_UNCONFIRMED" | null;
  canRetry: boolean;
  realityEntryBlocked: false;
}>;

export function resolveRelationshipNameDeletePresentation(input: Readonly<{
  lastConfirmedRelationshipNaming: StarBeastRelationshipNamingReadResult;
  deleteOutcome:
    | "DELETED"
    | "ALREADY_UNNAMED"
    | "DELETE_UNCONFIRMED";
}>): RelationshipNameDeletePresentation {
  if (input.deleteOutcome === "DELETE_UNCONFIRMED") {
    return Object.freeze({
      relationshipNaming: input.lastConfirmedRelationshipNaming,
      feedback: "DELETE_UNCONFIRMED",
      canRetry: true,
      realityEntryBlocked: false,
    });
  }
  return Object.freeze({
    relationshipNaming: Object.freeze({
      status: "UNNAMED",
      asset: null,
    }),
    feedback: null,
    canRetry: false,
    realityEntryBlocked: false,
  });
}
