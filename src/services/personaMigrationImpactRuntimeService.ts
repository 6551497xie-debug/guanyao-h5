import type { ChangeExperiencePresentation } from "../types/changeExperience";
import type {
  PersonaDimension,
  PersonaMigrationImpact,
  PersonaMigrationImpactGuardrails,
  PersonaYaoStage,
} from "../types/personaTransmission";

export type RuntimePersonaMigrationImpactInput = Readonly<{
  sourceUnitId: string;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
  presentation: ChangeExperiencePresentation;
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
  `runtime:${input.dimension}:${input.yaoStage}:oldReaction → newResponse`;

export const formRuntimePersonaMigrationImpact = (
  input: RuntimePersonaMigrationImpactInput,
): PersonaMigrationImpact | null => {
  const { presentation } = input;
  const fromModel = presentation.recognition.oldReaction;
  const toResponse = presentation.revision.newResponse;
  const imprintLine = presentation.meaning.crystalImprint || presentation.revision.transformationMoment;

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
      before: presentation.visual.starbeast?.beforeState ?? "",
      after: presentation.visual.starbeast?.afterState ?? "",
      cue: presentation.visual.starbeast?.cueLine ?? "",
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
