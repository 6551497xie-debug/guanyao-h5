import type { MotherCodeProfile } from "../types/guanyaoCausalEngine";
import type { LifeArchetypeState, OriginalSelfJourneyPhase } from "../types/originalSelf";
import type {
  LifeJourneyStage,
  OriginalSelfLifeSchemaMapping,
} from "../types/originalSelfLifeSchema";
import {
  resolveLifeArchetypeProfileFromMotherCode,
  type MotherCodeLifeArchetypeSourceNotReadyReason,
  type MotherCodeLifeArchetypeSourceResult,
} from "./motherCodeLifeArchetypeSource";
import { mapOriginalSelfLifeSchemaToFoundation } from "./originalSelfLifeSchemaMapping";

export type OriginalSelfLifeSchemaEntryInput = Readonly<{
  motherCodeProfile: MotherCodeProfile;
  lifeJourneyStage: LifeJourneyStage;
  lifeArchetypeState: LifeArchetypeState;
  foundationJourneyPhase: OriginalSelfJourneyPhase;
}>;

type MotherCodeLifeArchetypeSourceReady = Extract<
  MotherCodeLifeArchetypeSourceResult,
  { status: "READY" }
>;

type MotherCodeLifeArchetypeSourceNotReady = Extract<
  MotherCodeLifeArchetypeSourceResult,
  { status: "NOT_READY" }
>;

export type OriginalSelfLifeSchemaEntryResult =
  | Readonly<{
      status: "NOT_READY";
      source: "original_self_life_schema_entry";
      reason: MotherCodeLifeArchetypeSourceNotReadyReason;
      sourceResult: MotherCodeLifeArchetypeSourceNotReady;
    }>
  | Readonly<{
      status: "READY";
      source: "original_self_life_schema_entry";
      sourceResult: MotherCodeLifeArchetypeSourceReady;
      mapping: OriginalSelfLifeSchemaMapping;
    }>;

export function resolveOriginalSelfLifeSchemaFromSources(
  input: OriginalSelfLifeSchemaEntryInput,
): OriginalSelfLifeSchemaEntryResult {
  const sourceResult = resolveLifeArchetypeProfileFromMotherCode(input.motherCodeProfile);

  if (sourceResult.status !== "READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "original_self_life_schema_entry",
      reason: sourceResult.reason,
      sourceResult,
    });
  }

  return Object.freeze({
    status: "READY",
    source: "original_self_life_schema_entry",
    sourceResult,
    mapping: mapOriginalSelfLifeSchemaToFoundation(
      Object.freeze({
        lifeArchetypeProfile: sourceResult.lifeArchetypeProfile,
        lifeJourneyStage: input.lifeJourneyStage,
        lifeArchetypeState: input.lifeArchetypeState,
        foundationJourneyPhase: input.foundationJourneyPhase,
      }),
    ),
  });
}
