import type { MotherCodeProfile } from "../types/guanyaoCausalEngine";
import type { LifeArchetypeState, OriginalSelfJourneyPhase } from "../types/originalSelf";
import type { OriginalSelfLifeSchemaMapping } from "../types/originalSelfLifeSchema";
import {
  resolveLifeJourneyStageSource,
  type LifeJourneyStageSourceInput,
  type LifeJourneyStageSourceNotReadyReason,
  type LifeJourneyStageSourceResult,
} from "./lifeJourneyStageSource";
import {
  resolveLifeArchetypeProfileFromMotherCode,
  type MotherCodeLifeArchetypeSourceNotReadyReason,
  type MotherCodeLifeArchetypeSourceResult,
} from "./motherCodeLifeArchetypeSource";
import { mapOriginalSelfLifeSchemaToFoundation } from "./originalSelfLifeSchemaMapping";

export type OriginalSelfLifeSchemaEntryInput = Readonly<{
  motherCodeProfile: MotherCodeProfile;
  lifeJourneyStageSource: LifeJourneyStageSourceInput;
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

type LifeJourneyStageSourceReady = Extract<LifeJourneyStageSourceResult, { status: "READY" }>;

type LifeJourneyStageSourceNotReady = Extract<
  LifeJourneyStageSourceResult,
  { status: "NOT_READY" }
>;

export type OriginalSelfLifeSchemaEntryNotReadyReason =
  | MotherCodeLifeArchetypeSourceNotReadyReason
  | LifeJourneyStageSourceNotReadyReason;

export type OriginalSelfLifeSchemaEntryResult =
  | Readonly<{
      status: "NOT_READY";
      source: "original_self_life_schema_entry";
      reason: MotherCodeLifeArchetypeSourceNotReadyReason;
      sourceBoundary: "mother_code";
      sourceResult: MotherCodeLifeArchetypeSourceNotReady;
    }>
  | Readonly<{
      status: "NOT_READY";
      source: "original_self_life_schema_entry";
      reason: LifeJourneyStageSourceNotReadyReason;
      sourceBoundary: "life_journey_stage";
      sourceResult: LifeJourneyStageSourceNotReady;
    }>
  | Readonly<{
      status: "READY";
      source: "original_self_life_schema_entry";
      sourceResults: Readonly<{
        motherCode: MotherCodeLifeArchetypeSourceReady;
        lifeJourneyStage: LifeJourneyStageSourceReady;
      }>;
      mapping: OriginalSelfLifeSchemaMapping;
    }>;

export function resolveOriginalSelfLifeSchemaFromSources(
  input: OriginalSelfLifeSchemaEntryInput,
): OriginalSelfLifeSchemaEntryResult {
  const motherCodeSourceResult = resolveLifeArchetypeProfileFromMotherCode(input.motherCodeProfile);

  if (motherCodeSourceResult.status !== "READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "original_self_life_schema_entry",
      reason: motherCodeSourceResult.reason,
      sourceBoundary: "mother_code",
      sourceResult: motherCodeSourceResult,
    });
  }

  const lifeJourneyStageSourceResult = resolveLifeJourneyStageSource(input.lifeJourneyStageSource);

  if (lifeJourneyStageSourceResult.status !== "READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "original_self_life_schema_entry",
      reason: lifeJourneyStageSourceResult.reason,
      sourceBoundary: "life_journey_stage",
      sourceResult: lifeJourneyStageSourceResult,
    });
  }

  return Object.freeze({
    status: "READY",
    source: "original_self_life_schema_entry",
    sourceResults: Object.freeze({
      motherCode: motherCodeSourceResult,
      lifeJourneyStage: lifeJourneyStageSourceResult,
    }),
    mapping: mapOriginalSelfLifeSchemaToFoundation(
      Object.freeze({
        lifeArchetypeProfile: motherCodeSourceResult.lifeArchetypeProfile,
        lifeJourneyStage: lifeJourneyStageSourceResult.stageSource.currentStage,
        lifeArchetypeState: input.lifeArchetypeState,
        foundationJourneyPhase: input.foundationJourneyPhase,
      }),
    ),
  });
}
