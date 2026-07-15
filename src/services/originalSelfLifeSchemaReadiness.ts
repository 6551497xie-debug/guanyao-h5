import type { MotherCodeProfile } from "../types/guanyaoCausalEngine";
import type { LifeArchetypeState, OriginalSelfJourneyPhase } from "../types/originalSelf";
import type { LifeJourneyStageSourceInput } from "./lifeJourneyStageSource";
import {
  resolveOriginalSelfLifeSchemaConsumption,
  type OriginalSelfLifeSchemaConsumption,
  type OriginalSelfLifeSchemaEndpointInput,
} from "./originalSelfLifeSchemaEndpoint";

export type OriginalSelfLifeSchemaReadinessInput = Readonly<{
  motherCodeProfile: MotherCodeProfile | null;
  lifeJourneyStageSource: LifeJourneyStageSourceInput | null;
  lifeArchetypeState: LifeArchetypeState | null;
  foundationJourneyPhase: OriginalSelfJourneyPhase | null;
}>;

export type OriginalSelfLifeSchemaReadinessNotReadyReason =
  | "MOTHER_CODE_PROFILE_MISSING"
  | "LIFE_JOURNEY_STAGE_SOURCE_MISSING"
  | "LIFE_ARCHETYPE_STATE_MISSING"
  | "FOUNDATION_JOURNEY_PHASE_MISSING";

export type OriginalSelfLifeSchemaReadiness =
  | Readonly<{
      status: "NOT_READY";
      readiness: "NOT_READY";
      source: "original_self_life_schema_readiness";
      reason: OriginalSelfLifeSchemaReadinessNotReadyReason;
      input: OriginalSelfLifeSchemaReadinessInput;
    }>
  | Readonly<{
      status: "READY";
      readiness: "READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA";
      source: "original_self_life_schema_readiness";
      input: OriginalSelfLifeSchemaReadinessInput;
      endpointInput: OriginalSelfLifeSchemaEndpointInput;
      consumption: OriginalSelfLifeSchemaConsumption;
    }>;

const createNotReady = (
  input: OriginalSelfLifeSchemaReadinessInput,
  reason: OriginalSelfLifeSchemaReadinessNotReadyReason,
): OriginalSelfLifeSchemaReadiness =>
  Object.freeze({
    status: "NOT_READY",
    readiness: "NOT_READY",
    source: "original_self_life_schema_readiness",
    reason,
    input,
  });

export function resolveOriginalSelfLifeSchemaReadiness(
  input: OriginalSelfLifeSchemaReadinessInput,
): OriginalSelfLifeSchemaReadiness {
  if (!input.motherCodeProfile) return createNotReady(input, "MOTHER_CODE_PROFILE_MISSING");
  if (!input.lifeJourneyStageSource) {
    return createNotReady(input, "LIFE_JOURNEY_STAGE_SOURCE_MISSING");
  }
  if (!input.lifeArchetypeState) return createNotReady(input, "LIFE_ARCHETYPE_STATE_MISSING");
  if (!input.foundationJourneyPhase) {
    return createNotReady(input, "FOUNDATION_JOURNEY_PHASE_MISSING");
  }

  const endpointInput: OriginalSelfLifeSchemaEndpointInput = Object.freeze({
    motherCodeProfile: input.motherCodeProfile,
    lifeJourneyStageSource: input.lifeJourneyStageSource,
    lifeArchetypeState: input.lifeArchetypeState,
    foundationJourneyPhase: input.foundationJourneyPhase,
  });

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA",
    source: "original_self_life_schema_readiness",
    input,
    endpointInput,
    consumption: resolveOriginalSelfLifeSchemaConsumption(endpointInput),
  });
}
