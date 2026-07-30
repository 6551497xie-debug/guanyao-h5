import {
  XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
  type ChoiceActionIntention,
  type CommitChoiceActionIntentionInput,
} from "../types/xinmaiChoiceActionIntention";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import type {
  CrystalEligibility,
  CrystalFormationReceipt,
} from "../types/xinmaiCrystalEligibility";
import type { LivedResponseFact } from "../types/xinmaiLivedResponse";
import {
  commitXinmaiLivedGrowthTransaction,
  preserveXinmaiLivedGrowthTransaction,
  rejectXinmaiLivedGrowthTransaction,
} from "../types/xinmaiLivedGrowthTransaction";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import {
  executeXinmaiLivedGrowthTransaction,
} from "./xinmaiLivedGrowthTransactionAuthority";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";
import {
  transactXinmaiGravityObservationContinuity,
} from "./xinmaiLivedGrowthTransactionalStore";
import {
  createEphemeralXinmaiGrowthReference,
  createStableXinmaiGrowthReference,
} from "./xinmaiLivedGrowthReference";
import {
  validateChoiceActionIntentionPrerequisites,
} from "./xinmaiChoiceActionIntentionPrerequisiteValidator";
import {
  resolveChoiceActionRoutes,
} from "./xinmaiChoiceActionRouteResolver";
import {
  canCreateXinmaiChoiceFromActionRoute,
} from "./xinmaiChoiceActionRouteRuntimePolicy";

type ChoiceMutationFailureReason =
  | "INVALID_INPUT"
  | "INTENTION_NOT_FOUND"
  | "IDENTITY_MISMATCH"
  | "ENCOUNTER_MISMATCH"
  | "STALE_INTENTION_REVISION"
  | "FORMATION_ALREADY_CONFIRMED"
  | "ACTION_ROUTE_RUNTIME_PAUSED"
  | "PERSISTENCE_UNAVAILABLE";

export type CommitChoiceActionIntentionResult =
  | Readonly<{
      status: "COMMITTED" | "ALREADY_COMMITTED";
      intention: ChoiceActionIntention;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      intention: null;
      reason: ChoiceMutationFailureReason | string;
    }>;

export type BindChoiceActionIntentionResult =
  | Readonly<{
      status: "BOUND" | "ALREADY_BOUND";
      intention: ChoiceActionIntention;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      intention: null;
      reason: ChoiceMutationFailureReason | string;
    }>;

export type CloseChoiceActionIntentionResult =
  | Readonly<{
      status: "CLOSED" | "ALREADY_CLOSED";
      intention: ChoiceActionIntention;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      intention: null;
      reason: ChoiceMutationFailureReason | string;
    }>;

export type XinmaiLivedGrowthReturnItem = Readonly<{
  intention: ChoiceActionIntention;
  currentFact: LivedResponseFact | null;
  currentEligibility: CrystalEligibility | null;
  formationReceipt: CrystalFormationReceipt | null;
}>;

export async function commitChoiceActionIntention(
  input: CommitChoiceActionIntentionInput,
): Promise<CommitChoiceActionIntentionResult> {
  if (!canCreateXinmaiChoiceFromActionRoute()) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      intention: null,
      reason: "ACTION_ROUTE_RUNTIME_PAUSED" as const,
    });
  }
  const prerequisiteValidation =
    validateChoiceActionIntentionPrerequisites(input);
  if (prerequisiteValidation.status !== "VALID") {
    return Object.freeze({
      status: "REJECTED" as const,
      intention: null,
      reason: "INVALID_INPUT" as const,
    });
  }
  const initialRouteResolution = resolveChoiceActionRoutes(
    input.actionRouteResolverInput,
  );
  const initiallySelectedRoute =
    initialRouteResolution.status === "READY"
      ? initialRouteResolution.candidates.find(
          (candidate) =>
            candidate.actionRouteReferenceId ===
            input.selectedActionRouteReferenceId,
        ) ?? null
      : null;
  if (initiallySelectedRoute === null) {
    return Object.freeze({
      status: "REJECTED" as const,
      intention: null,
      reason: "INVALID_INPUT" as const,
    });
  }
  const choiceActionIntentionReferenceId = createStableXinmaiGrowthReference(
    "choice-intention",
    input.identityReferences.sourceReferenceId,
    input.sourceEncounterCycleId,
    input.gravityCycleId,
    input.gravityObservationReferenceId,
  );
  const result =
    await transactXinmaiGravityObservationContinuity(
      `CURRENT:${input.identityReferences.sourceReferenceId}`,
      (observation, current) => {
      const existing = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          choiceActionIntentionReferenceId,
      );
      if (existing) {
        if (
          !xinmaiGrowthIdentityMatches(
            existing.identityReferences,
            input.identityReferences,
          ) ||
          existing.sourceEncounterCycleId !== input.sourceEncounterCycleId ||
          existing.gravityCycleId !== input.gravityCycleId ||
          existing.gravityObservationReferenceId !==
            input.gravityObservationReferenceId
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "IDENTITY_MISMATCH" as const,
          });
        }
        if (
          existing.schemaVersion ===
            XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION &&
          (existing.actionRouteSnapshot.actionRouteReferenceId !==
            input.selectedActionRouteReferenceId ||
            existing.actionRouteSnapshot.canonicalIdentityKey !==
              initiallySelectedRoute.canonicalIdentityKey)
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "CHOICE_ALREADY_EXISTS" as const,
          });
        }
        return Object.freeze({
          status: "ALREADY_COMMITTED" as const,
          value: existing,
        });
      }
      if (
        observation === null ||
        observation.gravityObservationReferenceId !==
          input.gravityObservationReferenceId ||
        observation.sourceReality.encounterCycleId !==
          input.sourceEncounterCycleId ||
        observation.gravityAdmission.gravityCycleId !==
          input.gravityCycleId ||
        !xinmaiGrowthIdentityMatches(
          observation.identityReferences,
          input.identityReferences,
        )
      ) {
        return Object.freeze({
          status: "REJECTED" as const,
          reason: "OBSERVATION_STALE" as const,
        });
      }
      if (
        observation.lifecycleState === "CONSUMED_BY_CHOICE" ||
        current.choiceActionIntentions.some(
          (candidate) =>
            candidate.gravityObservationReferenceId ===
              input.gravityObservationReferenceId,
        )
      ) {
        return Object.freeze({
          status: "REJECTED" as const,
          reason: "CHOICE_ALREADY_EXISTS" as const,
        });
      }
      if (observation.lifecycleState !== "CURRENT") {
        return Object.freeze({
          status: "REJECTED" as const,
          reason: "OBSERVATION_TERMINAL" as const,
        });
      }
      if (
        observation.checkpointState !==
          "OBSERVATION_RECOGNIZED" ||
        observation.checkpointRevision !==
          input.expectedObservationCheckpointRevision
      ) {
        return Object.freeze({
          status: "REJECTED" as const,
          reason: "OBSERVATION_NOT_RECOGNIZED" as const,
        });
      }
      const inTransactionValidation =
        validateChoiceActionIntentionPrerequisites(input);
      const currentRouteResolution = resolveChoiceActionRoutes(
        input.actionRouteResolverInput,
      );
      const selectedRoute =
        currentRouteResolution.status === "READY"
          ? currentRouteResolution.candidates.find(
              (candidate) =>
                candidate.actionRouteReferenceId ===
                input.selectedActionRouteReferenceId,
            ) ?? null
          : null;
      if (
        inTransactionValidation.status !== "VALID" ||
        selectedRoute === null ||
        selectedRoute.canonicalIdentityKey !==
          initiallySelectedRoute.canonicalIdentityKey ||
        selectedRoute.pressureProvenance.candidateReferenceId !==
          observation.pressureProvenance.candidateReferenceId ||
        selectedRoute.pressureProvenance.selectedPressureSeedId !==
          observation.pressureProvenance.selectedPressureSeedId
      ) {
        return Object.freeze({
          status: "REJECTED" as const,
          reason: "ACTION_ROUTE_STALE" as const,
        });
      }
      const now = new Date().toISOString();
      const intention: ChoiceActionIntention = Object.freeze({
        schemaVersion: XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
        source: "xinmai_choice_action_intention_controller" as const,
        choiceActionIntentionReferenceId,
        identityReferences: Object.freeze({ ...input.identityReferences }),
        sourceEncounterCycleId: input.sourceEncounterCycleId,
        targetEncounterCycleId: null,
        gravityCycleId: input.gravityCycleId,
        gravityObservationReferenceId:
          input.gravityObservationReferenceId,
        state: "COMMITTED" as const,
        revision: 1,
        actionSummary: selectedRoute.action.visibleAction.trim(),
        formationSourceSnapshot: input.formationSourceSnapshot,
        actionRouteSnapshot: Object.freeze({
          ...selectedRoute,
          lifecycle: "CONSUMED_BY_CHOICE" as const,
          revision: 1 as const,
          userExplicitSelection: true as const,
        }),
        committedAt: now,
        updatedAt: now,
        provenance: Object.freeze({
          userExplicitCommit: true as const,
          sourceAuthority:
            "XINMAI_CHOICE_ACTION_ROUTE_AUTHORITY" as const,
          noLivedResponseAuthority: true as const,
          noCrystalEligibilityAuthority: true as const,
        }),
      });
      return Object.freeze({
        status: "COMMIT" as const,
        value: intention,
        record: Object.freeze({
          ...observation,
          checkpointRevision:
            observation.checkpointRevision + 1,
          lifecycleState: "CONSUMED_BY_CHOICE" as const,
          consumedByChoiceActionIntentionReferenceId:
            choiceActionIntentionReferenceId,
          updatedAt: now,
        }),
        growthEnvelope: Object.freeze({
          ...current,
          choiceActionIntentions: Object.freeze([
            ...current.choiceActionIntentions,
            intention,
          ]),
        }),
      });
    },
  );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return Object.freeze({
      status:
        result.status === "COMMITTED"
          ? "COMMITTED" as const
          : "ALREADY_COMMITTED" as const,
      intention: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    intention: null,
    reason:
      "reason" in result
        ? result.reason
        : "PERSISTENCE_UNAVAILABLE",
  });
}

export async function bindChoiceActionIntentionToRealityEncounter(
  input: Readonly<{
    choiceActionIntentionReferenceId: string;
    expectedIntentionRevision: number;
    targetEncounterCycleId: string;
    identityReferences: RealityEncounterIdentityReferences;
  }>,
): Promise<BindChoiceActionIntentionResult> {
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:bind-choice",
        input.choiceActionIntentionReferenceId,
        input.targetEncounterCycleId,
        String(input.expectedIntentionRevision),
      ),
      commandType: "BIND_CHOICE_TO_ENCOUNTER" as const,
      identityReferences: input.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const intention = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          input.choiceActionIntentionReferenceId,
      );
      if (!intention) {
        return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_FOUND");
      }
      if (
        !xinmaiGrowthIdentityMatches(
          intention.identityReferences,
          input.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      if (
        intention.targetEncounterCycleId === input.targetEncounterCycleId &&
        intention.state === "AWAITING_RETURN"
      ) {
        return preserveXinmaiLivedGrowthTransaction(intention);
      }
      if (intention.revision !== input.expectedIntentionRevision) {
        return rejectXinmaiLivedGrowthTransaction(
          "STALE_INTENTION_REVISION",
        );
      }
      if (
        intention.targetEncounterCycleId !== null ||
        intention.state !== "COMMITTED"
      ) {
        return rejectXinmaiLivedGrowthTransaction("ENCOUNTER_MISMATCH");
      }
      const bound: ChoiceActionIntention = Object.freeze({
        ...intention,
        targetEncounterCycleId: input.targetEncounterCycleId,
        state: "AWAITING_RETURN" as const,
        revision: intention.revision + 1,
        updatedAt: new Date().toISOString(),
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceActionIntentions: Object.freeze(
            current.choiceActionIntentions.map((candidate) =>
              candidate.choiceActionIntentionReferenceId ===
              input.choiceActionIntentionReferenceId
                ? bound
                : candidate,
            ),
          ),
        },
        bound,
      );
    },
  );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return Object.freeze({
      status:
        result.status === "COMMITTED"
          ? "BOUND" as const
          : "ALREADY_BOUND" as const,
      intention: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    intention: null,
    reason: result.reason,
  });
}

export async function readOutstandingChoiceActionIntentions(
  identityReferences: RealityEncounterIdentityReferences,
): Promise<readonly ChoiceActionIntention[]> {
  return Object.freeze(
    (await readOpenXinmaiLivedGrowthReturnItems(identityReferences))
      .filter((item) => item.currentFact === null)
      .map((item) => item.intention),
  );
}

export async function readOpenXinmaiLivedGrowthReturnItems(
  identityReferences: RealityEncounterIdentityReferences,
): Promise<readonly XinmaiLivedGrowthReturnItem[]> {
  const result = await readXinmaiLivedGrowthCanonicalState();
  if (result.status !== "FOUND") return Object.freeze([]);
  return Object.freeze(
    result.envelope.choiceActionIntentions.filter(
      (intention) =>
        xinmaiGrowthIdentityMatches(
          intention.identityReferences,
          identityReferences,
        ) &&
        (intention.state === "COMMITTED" ||
          intention.state === "AWAITING_RETURN" ||
          intention.state === "REPORTED"),
    ).map((intention) => {
      const currentFact =
        result.envelope.livedResponseFacts
          .filter(
            (fact) =>
              fact.choiceActionIntentionReferenceId ===
                intention.choiceActionIntentionReferenceId &&
              fact.state === "CONFIRMED",
          )
          .sort(
            (left, right) =>
              right.userConfirmationRevision -
              left.userConfirmationRevision,
          )[0] ?? null;
      const currentEligibility =
        currentFact === null
          ? null
          : result.envelope.crystalEligibilities.find(
              (eligibility) =>
                eligibility.livedResponseReferenceId ===
                  currentFact.livedResponseReferenceId &&
                eligibility.livedResponseRevision ===
                  currentFact.userConfirmationRevision &&
                eligibility.state !== "INVALIDATED",
            ) ?? null;
      const formationReceipt =
        result.envelope.formationReceipts.find(
          (receipt) =>
            receipt.choiceActionIntentionReferenceId ===
            intention.choiceActionIntentionReferenceId,
        ) ?? null;
      return Object.freeze({
        intention,
        currentFact,
        currentEligibility,
        formationReceipt,
      });
    }).filter((item) => item.formationReceipt === null),
  );
}

export async function closeChoiceActionIntentionWithoutRecord(
  input: Readonly<{
    choiceActionIntentionReferenceId: string;
    expectedIntentionRevision: number;
    identityReferences: RealityEncounterIdentityReferences;
  }>,
): Promise<CloseChoiceActionIntentionResult> {
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:close-choice",
        input.choiceActionIntentionReferenceId,
        String(input.expectedIntentionRevision),
      ),
      commandType: "CLOSE_CHOICE_WITHOUT_RECORD" as const,
      identityReferences: input.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const intention = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          input.choiceActionIntentionReferenceId,
      );
      if (!intention) {
        return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_FOUND");
      }
      if (
        !xinmaiGrowthIdentityMatches(
          intention.identityReferences,
          input.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      const receiptCount = current.formationReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          input.choiceActionIntentionReferenceId,
      ).length;
      if (receiptCount > 0) {
        return rejectXinmaiLivedGrowthTransaction(
          "FORMATION_ALREADY_CONFIRMED",
        );
      }
      if (intention.state === "CLOSED") {
        return preserveXinmaiLivedGrowthTransaction(intention);
      }
      if (intention.revision !== input.expectedIntentionRevision) {
        return rejectXinmaiLivedGrowthTransaction(
          "STALE_INTENTION_REVISION",
        );
      }
      const closed: ChoiceActionIntention = Object.freeze({
        ...intention,
        state: "CLOSED" as const,
        revision: intention.revision + 1,
        updatedAt: new Date().toISOString(),
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceActionIntentions: Object.freeze(
            current.choiceActionIntentions.map((candidate) =>
              candidate.choiceActionIntentionReferenceId ===
              input.choiceActionIntentionReferenceId
                ? closed
                : candidate,
            ),
          ),
        },
        closed,
      );
    },
  );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return Object.freeze({
      status:
        result.status === "COMMITTED"
          ? "CLOSED" as const
          : "ALREADY_CLOSED" as const,
      intention: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    intention: null,
    reason: result.reason,
  });
}

export const createLivedResponseCandidateReference = (
  intentionReferenceId: string,
): string =>
  createEphemeralXinmaiGrowthReference(
    `lived-response-candidate:${intentionReferenceId}`,
  );
