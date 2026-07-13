import type {
  PersonaDimension,
  PersonaMigrationImpact,
  PersonaMigrationImpactGuardrails,
  PersonaYaoStage,
} from "../types/personaTransmission";

export type RuntimePersonaMigrationImpactDomainFacts = Readonly<{
  oldReaction: string;
  revisedResponse: string;
  crystalImprint: string;
  migrationTrace: string;
  dominantShift: string;
  visualMetadata?: Readonly<{
    starbeastBefore?: string;
    starbeastAfter?: string;
    starbeastCue?: string;
  }>;
}>;

export type RuntimePersonaMigrationImpactInput = Readonly<{
  sourceUnitId: string;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
  domainFacts: RuntimePersonaMigrationImpactDomainFacts;
}>;

const hasText = (value?: string): value is string => typeof value === "string" && value.trim().length > 0;

const createGuardrails = (): PersonaMigrationImpactGuardrails => ({
  noStorageWrite: true,
  noLongTermProfile: true,
  noScore: true,
  noGrowthValue: true,
  noRawEngineLanguage: true,
  no384Yao: true,
  noArchive: true,
});

const createDeflectionVector = (input: RuntimePersonaMigrationImpactInput): string =>
  hasText(input.domainFacts.dominantShift)
    ? input.domainFacts.dominantShift
    : `runtime:${input.dimension}:${input.yaoStage}:oldReaction → revisedResponse`;

export const formRuntimePersonaMigrationImpact = (
  input: RuntimePersonaMigrationImpactInput,
): PersonaMigrationImpact | null => {
  const { domainFacts } = input;
  const fromModel = domainFacts.oldReaction;
  const toResponse = domainFacts.revisedResponse;
  const imprintLine = domainFacts.crystalImprint || domainFacts.migrationTrace;

  if (!hasText(fromModel) || !hasText(toResponse) || !hasText(imprintLine)) return null;

  return {
    sourceUnit: {
      unitId: input.sourceUnitId,
      dimension: input.dimension,
      yaoStage: input.yaoStage,
    },
    dimension: input.dimension,
    yaoStage: input.yaoStage,
    fromModel,
    toResponse,
    deflectionVector: createDeflectionVector(input),
    beastImpact: {
      before: domainFacts.visualMetadata?.starbeastBefore ?? "",
      after: domainFacts.visualMetadata?.starbeastAfter ?? "",
      cue: domainFacts.visualMetadata?.starbeastCue ?? "",
    },
    crystalImprint: {
      imprintLine,
      shouldFeedCrystal: true,
      shouldDepositToRingLite: false,
    },
    impactReadiness: "READY_FOR_CRYSTAL",
    guardrails: createGuardrails(),
  };
};

export const PersonaMigrationImpactRuntimeService = {
  formRuntimePersonaMigrationImpact,
} as const;
