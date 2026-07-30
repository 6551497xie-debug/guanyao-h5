import type {
  ChoiceFormationSourceSnapshot,
} from "../types/xinmaiChoiceActionIntention";
import type {
  ChoiceActionRouteCandidate,
} from "../types/xinmaiChoiceActionRoute";
import type {
  CurrentHexagramFormationResult,
} from "../types/currentHexagramFormation";
import type {
  PersonaDimension,
  PersonaMigrationImpact,
} from "../types/personaTransmission";
import type {
  SingleModelRevisionAction,
} from "../types/dynamicsRevisionAction";

const DIMENSION_BY_PROTOTYPE: Readonly<
  Record<ChoiceActionRouteCandidate["prototypeId"], PersonaDimension>
> = Object.freeze({
  ROUGH_FIRST_STEP: "action",
  PAUSE_ONE_AUTOMATIC_RESPONSE: "action",
  ASK_ONE_CONCRETE_QUESTION: "thought",
  STATE_ONE_MINIMUM_BOUNDARY: "action",
  SHRINK_TO_STARTABLE_UNIT: "action",
  VERIFY_ONE_TENSING_ASSUMPTION: "thought",
  BODY_RECOVERY_WINDOW: "body",
});

const LAYER_LABEL: Readonly<Record<PersonaDimension, string>> =
  Object.freeze({
    body: "身体",
    emotion: "情绪",
    thought: "思维",
    action: "行动",
    memory: "记忆",
    motivation: "动机",
  });

export function projectChoiceActionRouteForGrowth(
  candidate: ChoiceActionRouteCandidate,
): Readonly<{
  dimension: PersonaDimension;
  action: SingleModelRevisionAction;
  migrationImpact: PersonaMigrationImpact;
}> {
  const dimension = DIMENSION_BY_PROTOTYPE[candidate.prototypeId];
  const action: SingleModelRevisionAction = Object.freeze({
    layerLabel: LAYER_LABEL[dimension],
    yaoName: "现实微实验",
    actionLine: candidate.action.visibleAction,
    sourceReason: "来自当前已认出的 Gravity Observation",
    interventionPotential: 1,
    userAgency: 1,
  });
  const migrationImpact: PersonaMigrationImpact = Object.freeze({
    sourceUnit: Object.freeze({
      unitId: candidate.actionRouteReferenceId,
      dimension,
      yaoStage: "revision" as const,
    }),
    dimension,
    yaoStage: "revision" as const,
    fromModel: "熟悉的回应仍在影响当前生命",
    toResponse: candidate.action.visibleAction,
    deflectionVector: candidate.prototypeId,
    beastImpact: Object.freeze({
      before: "旧回应仍在收紧",
      after: "生命为一次现实微实验留出空间",
      cue: "同一生命没有被替换",
    }),
    crystalImprint: Object.freeze({
      imprintLine: candidate.action.completionPrompt,
      shouldFeedCrystal: false,
      shouldDepositToRingLite: false,
    }),
    impactReadiness: "READY_FOR_CRYSTAL" as const,
    guardrails: Object.freeze({
      noStorageWrite: true as const,
      noLongTermProfile: true as const,
      noScore: true as const,
      noGrowthValue: true as const,
      noRawEngineLanguage: true as const,
      no384Yao: true as const,
      noArchive: true as const,
    }),
  });
  return Object.freeze({ dimension, action, migrationImpact });
}

export function createChoiceRouteFormationSourceSnapshot(input: Readonly<{
  candidate: ChoiceActionRouteCandidate;
  formation: CurrentHexagramFormationResult | null;
  completedNodeCount: number;
  assetCompletionState: string;
}>): ChoiceFormationSourceSnapshot | null {
  if (
    input.formation === null ||
    input.completedNodeCount < 6 ||
    input.assetCompletionState !== "READY_TO_CRYSTALLIZE"
  ) {
    return null;
  }
  const projection = projectChoiceActionRouteForGrowth(
    input.candidate,
  );
  return Object.freeze({
    formation: input.formation,
    migrationImpact: projection.migrationImpact,
    completedNodeCount: input.completedNodeCount,
    primaryDimension: projection.dimension,
    action: projection.action,
    assetCompletionState: "READY_TO_CRYSTALLIZE" as const,
  });
}

export const XinmaiChoiceActionRouteGrowthProjection =
  Object.freeze({
    project: projectChoiceActionRouteForGrowth,
    createFormationSnapshot:
      createChoiceRouteFormationSourceSnapshot,
    derivedOnly: true as const,
    noGrowthAuthority: true as const,
    noStorageWrite: true as const,
  });
