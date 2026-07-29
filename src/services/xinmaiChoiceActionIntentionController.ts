import {
  XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
  type ChoiceActionIntention,
  type CommitChoiceActionIntentionInput,
} from "../types/xinmaiChoiceActionIntention";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  readXinmaiLivedGrowthRecoveryCandidate,
  transactXinmaiLivedGrowthRecovery,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import {
  createEphemeralXinmaiGrowthReference,
  createStableXinmaiGrowthReference,
} from "./xinmaiLivedGrowthReference";

export const xinmaiGrowthIdentityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId === right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId === right.mansionCoordinateReferenceId;

export function commitChoiceActionIntention(
  input: CommitChoiceActionIntentionInput,
):
  | Readonly<{ status: "COMMITTED"; intention: ChoiceActionIntention }>
  | Readonly<{
      status: "REJECTED";
      intention: null;
      reason: "INVALID_INPUT" | "PERSISTENCE_UNAVAILABLE";
    }> {
  if (
    Object.values(input.identityReferences).some((value) => !value.trim()) ||
    !input.sourceEncounterCycleId.trim() ||
    !input.gravityCycleId.trim() ||
    !input.gravityObservationReferenceId.trim() ||
    !input.actionSummary.trim() ||
    input.formationSourceSnapshot.completedNodeCount < 6 ||
    input.formationSourceSnapshot.assetCompletionState !== "READY_TO_CRYSTALLIZE"
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      intention: null,
      reason: "INVALID_INPUT" as const,
    });
  }
  const now = new Date().toISOString();
  const choiceActionIntentionReferenceId = createStableXinmaiGrowthReference(
    "choice-intention",
    input.identityReferences.sourceReferenceId,
    input.sourceEncounterCycleId,
    input.gravityCycleId,
    input.gravityObservationReferenceId,
  );
  const intention: ChoiceActionIntention = Object.freeze({
    schemaVersion: XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
    source: "xinmai_choice_action_intention_controller" as const,
    choiceActionIntentionReferenceId,
    identityReferences: Object.freeze({ ...input.identityReferences }),
    sourceEncounterCycleId: input.sourceEncounterCycleId,
    targetEncounterCycleId: null,
    gravityCycleId: input.gravityCycleId,
    gravityObservationReferenceId: input.gravityObservationReferenceId,
    state: "COMMITTED" as const,
    revision: 1,
    actionSummary: input.actionSummary.trim(),
    formationSourceSnapshot: input.formationSourceSnapshot,
    committedAt: now,
    updatedAt: now,
    provenance: Object.freeze({
      userExplicitCommit: true as const,
      sourceAuthority: "GRAVITY_TYPED_OBSERVATION" as const,
      noLivedResponseAuthority: true as const,
      noCrystalEligibilityAuthority: true as const,
    }),
  });
  const result = transactXinmaiLivedGrowthRecovery((current) => ({
    ...current,
    choiceActionIntentions: current.choiceActionIntentions.some(
      (candidate) =>
        candidate.choiceActionIntentionReferenceId ===
        choiceActionIntentionReferenceId,
    )
      ? current.choiceActionIntentions
      : Object.freeze([...current.choiceActionIntentions, intention]),
  }));
  const confirmed =
    result.status === "CONFIRMED"
      ? result.envelope.choiceActionIntentions.find(
          (candidate) =>
            candidate.choiceActionIntentionReferenceId ===
            choiceActionIntentionReferenceId,
        )
      : null;
  return confirmed
    ? Object.freeze({ status: "COMMITTED" as const, intention: confirmed })
    : Object.freeze({
        status: "REJECTED" as const,
        intention: null,
        reason: "PERSISTENCE_UNAVAILABLE" as const,
      });
}

export function bindChoiceActionIntentionToRealityEncounter(input: Readonly<{
  choiceActionIntentionReferenceId: string;
  targetEncounterCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
}>): ChoiceActionIntention | null {
  let bound: ChoiceActionIntention | null = null;
  const result = transactXinmaiLivedGrowthRecovery((current) => ({
    ...current,
    choiceActionIntentions: Object.freeze(
      current.choiceActionIntentions.map((intention) => {
        if (
          intention.choiceActionIntentionReferenceId !==
            input.choiceActionIntentionReferenceId ||
          !xinmaiGrowthIdentityMatches(
            intention.identityReferences,
            input.identityReferences,
          ) ||
          (intention.targetEncounterCycleId !== null &&
            intention.targetEncounterCycleId !== input.targetEncounterCycleId)
        ) {
          return intention;
        }
        bound = Object.freeze({
          ...intention,
          targetEncounterCycleId: input.targetEncounterCycleId,
          state: "AWAITING_RETURN" as const,
          revision: intention.revision + 1,
          updatedAt: new Date().toISOString(),
        });
        return bound;
      }),
    ),
  }));
  return result.status === "CONFIRMED" ? bound : null;
}

export function readOutstandingChoiceActionIntentions(
  identityReferences: RealityEncounterIdentityReferences,
): readonly ChoiceActionIntention[] {
  const result = readXinmaiLivedGrowthRecoveryCandidate();
  if (result.status !== "FOUND") return Object.freeze([]);
  return Object.freeze(
    result.envelope.choiceActionIntentions.filter(
      (intention) =>
        xinmaiGrowthIdentityMatches(
          intention.identityReferences,
          identityReferences,
        ) &&
        (intention.state === "COMMITTED" ||
          intention.state === "AWAITING_RETURN") &&
        !result.envelope.livedResponseFacts.some(
          (fact) =>
            fact.choiceActionIntentionReferenceId ===
              intention.choiceActionIntentionReferenceId &&
            fact.state === "CONFIRMED",
        ),
    ),
  );
}

export function closeChoiceActionIntentionWithoutRecord(
  referenceId: string,
  identityReferences: RealityEncounterIdentityReferences,
): boolean {
  let closed = false;
  const result = transactXinmaiLivedGrowthRecovery((current) => ({
    ...current,
    choiceActionIntentions: Object.freeze(
      current.choiceActionIntentions.map((intention) => {
        if (
          intention.choiceActionIntentionReferenceId !== referenceId ||
          !xinmaiGrowthIdentityMatches(
            intention.identityReferences,
            identityReferences,
          )
        ) {
          return intention;
        }
        closed = true;
        return Object.freeze({
          ...intention,
          state: "CLOSED" as const,
          revision: intention.revision + 1,
          updatedAt: new Date().toISOString(),
        });
      }),
    ),
  }));
  return closed && result.status === "CONFIRMED";
}

export const createLivedResponseCandidateReference = (
  intentionReferenceId: string,
): string =>
  createEphemeralXinmaiGrowthReference(
    `lived-response-candidate:${intentionReferenceId}`,
  );
