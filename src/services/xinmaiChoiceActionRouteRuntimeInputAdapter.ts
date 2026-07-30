import type {
  GravityProductionRuntimeInput,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravityObservationResumeDecision,
} from "../types/xinmaiGravityObservationContinuity";
import type {
  GuanyaoPressureNature,
  PressureSeedField,
} from "../types/guanyaoPressureSeed";
import type { Trigram } from "../types/guanyaoCausalEngine";
import type {
  ChoiceActionRouteResolution,
  ChoiceActionRouteResolverInput,
} from "../types/xinmaiChoiceActionRoute";
import { resolveChoiceActionRoutes } from "./xinmaiChoiceActionRouteResolver";

const PRESSURE_FIELDS = new Set<PressureSeedField>([
  "POWER",
  "INTEREST",
  "RELATION",
  "FAMILY",
  "SOCIAL",
  "EXISTENCE",
]);
const PRESSURE_NATURES = new Set<GuanyaoPressureNature>([
  "EVALUATION",
  "RESOURCE",
  "ATTACHMENT",
  "CONTROL",
  "OBLIGATION",
  "BELONGING",
  "IDENTITY",
  "SURVIVAL",
]);
const TRIGRAMS = new Set<Trigram>([
  "乾",
  "坤",
  "震",
  "巽",
  "坎",
  "离",
  "艮",
  "兑",
]);

const safeWithheld = (
  reason: Extract<
    ChoiceActionRouteResolution,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): ChoiceActionRouteResolution =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    routeSetReferenceId: null,
    resolverInput: null,
    candidates: Object.freeze([]) as readonly [],
    reason,
  });

export function resolveProductionChoiceActionRoutes(input: Readonly<{
  runtimeInput: GravityProductionRuntimeInput;
  observationDecision: GravityObservationResumeDecision;
}>): ChoiceActionRouteResolution {
  const observation = input.observationDecision;
  if (observation.status !== "OBSERVATION_RECOGNIZED") {
    return safeWithheld("OBSERVATION_NOT_RECOGNIZED");
  }
  const pressureField =
    input.runtimeInput.currentPressure.pressureField;
  const pressureNature =
    input.runtimeInput.currentPressure.pressureNature;
  if (
    typeof pressureField !== "string" ||
    !PRESSURE_FIELDS.has(pressureField as PressureSeedField) ||
    typeof pressureNature !== "string" ||
    !PRESSURE_NATURES.has(
      pressureNature as GuanyaoPressureNature,
    )
  ) {
    return safeWithheld("PRESSURE_PROVENANCE_INCOMPLETE");
  }
  const motherCodeProfile =
    input.runtimeInput.dynamicsInputContext.motherCodeProfile;
  const lowerTrigram =
    input.runtimeInput.dynamicsInputContext.originMotherContext
      .mother.trigram;
  if (
    typeof lowerTrigram !== "string" ||
    !TRIGRAMS.has(lowerTrigram as Trigram)
  ) {
    return safeWithheld("MOTHER_CODE_PROVENANCE_INCOMPLETE");
  }
  const resolverInput: ChoiceActionRouteResolverInput =
    Object.freeze({
      identityReferences: input.runtimeInput.identityReferences,
      sourceEncounterCycleId:
        input.runtimeInput.sourceReality.encounterCycleId,
      gravityCycleId: input.runtimeInput.gravityCycleId,
      gravityObservationReferenceId:
        input.runtimeInput.gravityObservationReferenceId,
      observationCheckpointRevision:
        observation.checkpointRevision,
      observationStatus: "OBSERVATION_RECOGNIZED" as const,
      pressure: Object.freeze({
        selectedPressureSeedId:
          input.runtimeInput.pressureProvenance
            .selectedPressureSeedId,
        candidateReferenceId:
          input.runtimeInput.pressureProvenance
            .captureProvenance.candidateReferenceId,
        pressureField: pressureField as PressureSeedField,
        pressureNature:
          pressureNature as GuanyaoPressureNature,
      }),
      motherCode: Object.freeze({
        motherCodeProfileId: motherCodeProfile.motherCodeId,
        motherCodeDefinitionId: String(
          motherCodeProfile.motherCodeDefinitionId ??
            motherCodeProfile.motherCodeId,
        ),
        lowerTrigram: lowerTrigram as Trigram,
      }),
    });
  return resolveChoiceActionRoutes(resolverInput);
}

export const XinmaiChoiceActionRouteRuntimeInputAdapter =
  Object.freeze({
    resolve: resolveProductionChoiceActionRoutes,
    productionTypedRuntimeOnly: true as const,
    noFixtureSource: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
  });
