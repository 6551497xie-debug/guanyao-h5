import {
  XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_BY_ID,
} from "../data/xinmaiChoiceActionRoutePrototypeCatalog";
import {
  XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION,
  XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION,
  XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION,
  type ChoiceActionRouteCandidate,
  type ChoiceActionRouteEffortBoundary,
  type ChoiceActionRouteParameters,
  type ChoiceActionRoutePrototypeId,
  type ChoiceActionRouteResolution,
  type ChoiceActionRouteResolverInput,
  type ChoiceActionRouteSceneKind,
  type ChoiceActionRouteTargetKind,
} from "../types/xinmaiChoiceActionRoute";
import type {
  GuanyaoPressureNature,
  PressureSeedField,
} from "../types/guanyaoPressureSeed";
import type { Trigram } from "../types/guanyaoCausalEngine";
import {
  createChoiceActionRouteCanonicalIdentityKey,
  createChoiceActionRouteReferenceId,
  createChoiceActionRouteSetReferenceId,
  validateChoiceActionRouteCandidate,
} from "./xinmaiChoiceActionRouteValidator";

const PRESSURE_PROTOTYPES = Object.freeze({
  EVALUATION: Object.freeze([
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "ROUGH_FIRST_STEP",
    "ASK_ONE_CONCRETE_QUESTION",
  ]),
  RESOURCE: Object.freeze([
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "ROUGH_FIRST_STEP",
  ]),
  ATTACHMENT: Object.freeze([
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "ASK_ONE_CONCRETE_QUESTION",
    "BODY_RECOVERY_WINDOW",
  ]),
  CONTROL: Object.freeze([
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "SHRINK_TO_STARTABLE_UNIT",
    "VERIFY_ONE_TENSING_ASSUMPTION",
  ]),
  OBLIGATION: Object.freeze([
    "SHRINK_TO_STARTABLE_UNIT",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "BODY_RECOVERY_WINDOW",
  ]),
  BELONGING: Object.freeze([
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "ASK_ONE_CONCRETE_QUESTION",
    "ROUGH_FIRST_STEP",
  ]),
  IDENTITY: Object.freeze([
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "ROUGH_FIRST_STEP",
    "BODY_RECOVERY_WINDOW",
  ]),
  SURVIVAL: Object.freeze([]),
}) as unknown as Readonly<
  Record<GuanyaoPressureNature, readonly ChoiceActionRoutePrototypeId[]>
>;

const MOTHER_PREFERENCES = Object.freeze({
  乾: Object.freeze([
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "SHRINK_TO_STARTABLE_UNIT",
    "ROUGH_FIRST_STEP",
    "ASK_ONE_CONCRETE_QUESTION",
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "BODY_RECOVERY_WINDOW",
  ]),
  坤: Object.freeze([
    "BODY_RECOVERY_WINDOW",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "SHRINK_TO_STARTABLE_UNIT",
    "ASK_ONE_CONCRETE_QUESTION",
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "ROUGH_FIRST_STEP",
  ]),
  震: Object.freeze([
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "ASK_ONE_CONCRETE_QUESTION",
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "SHRINK_TO_STARTABLE_UNIT",
    "ROUGH_FIRST_STEP",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "BODY_RECOVERY_WINDOW",
  ]),
  巽: Object.freeze([
    "ROUGH_FIRST_STEP",
    "ASK_ONE_CONCRETE_QUESTION",
    "SHRINK_TO_STARTABLE_UNIT",
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "BODY_RECOVERY_WINDOW",
  ]),
  坎: Object.freeze([
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "BODY_RECOVERY_WINDOW",
    "ASK_ONE_CONCRETE_QUESTION",
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "SHRINK_TO_STARTABLE_UNIT",
    "ROUGH_FIRST_STEP",
  ]),
  离: Object.freeze([
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "ASK_ONE_CONCRETE_QUESTION",
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "ROUGH_FIRST_STEP",
    "SHRINK_TO_STARTABLE_UNIT",
    "BODY_RECOVERY_WINDOW",
  ]),
  艮: Object.freeze([
    "ROUGH_FIRST_STEP",
    "SHRINK_TO_STARTABLE_UNIT",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "ASK_ONE_CONCRETE_QUESTION",
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "BODY_RECOVERY_WINDOW",
  ]),
  兑: Object.freeze([
    "ASK_ONE_CONCRETE_QUESTION",
    "PAUSE_ONE_AUTOMATIC_RESPONSE",
    "STATE_ONE_MINIMUM_BOUNDARY",
    "VERIFY_ONE_TENSING_ASSUMPTION",
    "ROUGH_FIRST_STEP",
    "SHRINK_TO_STARTABLE_UNIT",
    "BODY_RECOVERY_WINDOW",
  ]),
}) as unknown as Readonly<
  Record<Trigram, readonly ChoiceActionRoutePrototypeId[]>
>;

const SCENE_BY_FIELD: Readonly<
  Record<PressureSeedField, ChoiceActionRouteSceneKind>
> = Object.freeze({
  POWER: "CURRENT_WORK_OR_AUTHORITY_CONTEXT",
  INTEREST: "CURRENT_RESOURCE_FACT_CONTEXT",
  RELATION: "NEXT_SAME_RELATION_TRIGGER",
  FAMILY: "NEXT_NON_URGENT_RESPONSIBILITY_CONTEXT",
  SOCIAL: "NEXT_SAFE_SOCIAL_TRIGGER",
  EXISTENCE: "CURRENT_SELF_DIRECTION_CONTEXT",
});

const SCENE_LABEL: Readonly<Record<ChoiceActionRouteSceneKind, string>> =
  Object.freeze({
    CURRENT_WORK_OR_AUTHORITY_CONTEXT: "当前工作或权责场景",
    CURRENT_RESOURCE_FACT_CONTEXT: "当前资源事实场景",
    NEXT_SAME_RELATION_TRIGGER: "下一次同一关系触发",
    NEXT_NON_URGENT_RESPONSIBILITY_CONTEXT:
      "下一次非紧急责任场景",
    NEXT_SAFE_SOCIAL_TRIGGER: "下一次安全社交触发",
    CURRENT_SELF_DIRECTION_CONTEXT: "当前自我方向场景",
  });

const normalizeText = (value: string): string =>
  value.trim().normalize("NFC");

const deriveParameters = (
  prototypeId: ChoiceActionRoutePrototypeId,
  sceneKind: ChoiceActionRouteSceneKind,
): ChoiceActionRouteParameters => {
  const byPrototype: Record<
    ChoiceActionRoutePrototypeId,
    Readonly<{
      targetKind: ChoiceActionRouteTargetKind;
      scale: ChoiceActionRouteParameters["scale"];
      effortBoundary: ChoiceActionRouteEffortBoundary;
      requiresUserSafetyConfirmation: boolean;
    }>
  > = {
    ROUGH_FIRST_STEP: {
      targetKind: "FIRST_REVERSIBLE_UNIT",
      scale: "SINGLE_STEP",
      effortBoundary: "ONE_STEP",
      requiresUserSafetyConfirmation: false,
    },
    PAUSE_ONE_AUTOMATIC_RESPONSE: {
      targetKind: "CURRENT_AUTOMATIC_RESPONSE",
      scale: "SMALLEST",
      effortBoundary: "ONE_BREATH",
      requiresUserSafetyConfirmation: false,
    },
    ASK_ONE_CONCRETE_QUESTION: {
      targetKind: "ONE_OBSERVABLE_FACT",
      scale: "SINGLE_STEP",
      effortBoundary: "ONE_SAFE_QUESTION",
      requiresUserSafetyConfirmation: true,
    },
    STATE_ONE_MINIMUM_BOUNDARY: {
      targetKind: "CURRENT_TASK",
      scale: "SMALLEST",
      effortBoundary: "ONE_MINIMUM_BOUNDARY",
      requiresUserSafetyConfirmation: true,
    },
    SHRINK_TO_STARTABLE_UNIT: {
      targetKind: "CURRENT_TASK",
      scale: "SMALLEST",
      effortBoundary: "TWO_MINUTES",
      requiresUserSafetyConfirmation: false,
    },
    VERIFY_ONE_TENSING_ASSUMPTION: {
      targetKind: "CURRENT_ASSUMPTION",
      scale: "SINGLE_STEP",
      effortBoundary: "ONE_FACT",
      requiresUserSafetyConfirmation: false,
    },
    BODY_RECOVERY_WINDOW: {
      targetKind: "CURRENT_BODY_STATE",
      scale: "SMALL",
      effortBoundary: "TWO_MINUTES",
      requiresUserSafetyConfirmation: false,
    },
  };
  return Object.freeze({
    ...byPrototype[prototypeId],
    sceneKind,
  });
};

const deriveAction = (
  prototypeId: ChoiceActionRoutePrototypeId,
  parameters: ChoiceActionRouteParameters,
): ChoiceActionRouteCandidate["action"] => {
  const scene = SCENE_LABEL[parameters.sceneKind];
  const copy: Record<
    ChoiceActionRoutePrototypeId,
    Readonly<{
      visibleAction: string;
      actionObject: string;
      completionPrompt: string;
    }>
  > = {
    ROUGH_FIRST_STEP: {
      visibleAction: `在${scene}里，只做一个可撤回的第一步；完成这一步就停下来重新判断。`,
      actionObject: "一个可撤回的第一步",
      completionPrompt: "我是否实际做了这个第一步？",
    },
    PAUSE_ONE_AUTOMATIC_RESPONSE: {
      visibleAction: `下一次${scene}出现时，先停一口呼吸，再决定是否沿用原来的反应。`,
      actionObject: "一次自动反应",
      completionPrompt: "我是否在自动反应前停过一次？",
    },
    ASK_ONE_CONCRETE_QUESTION: {
      visibleAction: `如果${scene}安全且非紧急，只提出一个关于可观察事实的具体问题，不要求当场得到理想答案。`,
      actionObject: "一个可观察事实",
      completionPrompt: "我是否提出过这个具体问题？",
    },
    STATE_ONE_MINIMUM_BOUNDARY: {
      visibleAction: `如果${scene}安全且可协商，只表达一个关于时间或范围的最小边界。`,
      actionObject: "一个时间或范围边界",
      completionPrompt: "我是否清楚表达过这个最小边界？",
    },
    SHRINK_TO_STARTABLE_UNIT: {
      visibleAction: `把${scene}中的当前任务缩小成一个两分钟内可以开始的动作。`,
      actionObject: "一个两分钟内可开始的动作",
      completionPrompt: "我是否尝试过这个缩小后的动作？",
    },
    VERIFY_ONE_TENSING_ASSUMPTION: {
      visibleAction: `在${scene}里，只核对一个可观察事实，不急着证明自己的解释。`,
      actionObject: "一个可观察事实",
      completionPrompt: "我是否核对过至少一个事实？",
    },
    BODY_RECOVERY_WINDOW: {
      visibleAction: `在${scene}可安全暂停时，给身体两分钟，只做一次离开屏幕或调整姿势。`,
      actionObject: "一次身体恢复窗口",
      completionPrompt: "我是否给身体留出过这段窗口？",
    },
  };
  const prototype =
    XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_BY_ID[prototypeId];
  return Object.freeze({
    ...copy[prototypeId],
    actionVerb: prototype.actionVerb,
    sceneBoundary: scene,
    effortBoundary: parameters.effortBoundary,
  });
};

const hasCompleteInput = (
  input: ChoiceActionRouteResolverInput,
): boolean =>
  Object.values(input.identityReferences).every((value) =>
    Boolean(normalizeText(value)),
  ) &&
  Boolean(normalizeText(input.sourceEncounterCycleId)) &&
  Boolean(normalizeText(input.gravityCycleId)) &&
  Boolean(normalizeText(input.gravityObservationReferenceId)) &&
  Number.isInteger(input.observationCheckpointRevision) &&
  input.observationCheckpointRevision > 0;

const safeWithheld = (
  input: ChoiceActionRouteResolverInput | null,
  reason: Extract<
    ChoiceActionRouteResolution,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): ChoiceActionRouteResolution =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    routeSetReferenceId: null,
    resolverInput: input,
    candidates: Object.freeze([]) as readonly [],
    reason,
  });

export function resolveChoiceActionRoutes(
  input: ChoiceActionRouteResolverInput,
): ChoiceActionRouteResolution {
  if (!hasCompleteInput(input)) {
    return safeWithheld(input, "IDENTITY_PROVENANCE_INCOMPLETE");
  }
  if (input.observationStatus !== "OBSERVATION_RECOGNIZED") {
    return safeWithheld(input, "OBSERVATION_NOT_RECOGNIZED");
  }
  if (
    !normalizeText(input.pressure.selectedPressureSeedId) ||
    !normalizeText(input.pressure.candidateReferenceId) ||
    !SCENE_BY_FIELD[input.pressure.pressureField] ||
    !PRESSURE_PROTOTYPES[input.pressure.pressureNature]
  ) {
    return safeWithheld(input, "PRESSURE_PROVENANCE_INCOMPLETE");
  }
  if (
    !normalizeText(input.motherCode.motherCodeProfileId) ||
    !normalizeText(input.motherCode.motherCodeDefinitionId) ||
    !MOTHER_PREFERENCES[input.motherCode.lowerTrigram]
  ) {
    return safeWithheld(input, "MOTHER_CODE_PROVENANCE_INCOMPLETE");
  }
  if (input.pressure.pressureNature === "SURVIVAL") {
    return safeWithheld(
      input,
      "SURVIVAL_CONTEXT_SAFE_WITHHELD",
    );
  }
  const pressureCandidates =
    PRESSURE_PROTOTYPES[input.pressure.pressureNature];
  if (pressureCandidates.length === 0) {
    return safeWithheld(input, "PROTOTYPE_MAPPING_UNAVAILABLE");
  }
  const motherRank = new Map(
    MOTHER_PREFERENCES[input.motherCode.lowerTrigram].map(
      (prototypeId, index) => [prototypeId, index],
    ),
  );
  const ordered = [...pressureCandidates].sort((left, right) => {
    const rank =
      (motherRank.get(left) ?? Number.MAX_SAFE_INTEGER) -
      (motherRank.get(right) ?? Number.MAX_SAFE_INTEGER);
    return rank === 0 ? left.localeCompare(right) : rank;
  });
  const routeSetReferenceId =
    createChoiceActionRouteSetReferenceId(input);
  const sceneKind = SCENE_BY_FIELD[input.pressure.pressureField];
  const candidates = ordered.map((prototypeId) => {
    const parameters = deriveParameters(prototypeId, sceneKind);
    const prototype =
      XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_BY_ID[prototypeId];
    const action = deriveAction(prototypeId, parameters);
    const partial = Object.freeze({
      prototypeId,
      prototypeVersion: prototype.prototypeVersion,
      parameters,
    });
    const canonicalIdentityKey =
      createChoiceActionRouteCanonicalIdentityKey(input, partial);
    const candidate: ChoiceActionRouteCandidate = Object.freeze({
      schemaVersion: XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION,
      source: "xinmai_choice_action_route_authority" as const,
      actionRouteReferenceId:
        createChoiceActionRouteReferenceId(canonicalIdentityKey),
      routeSetReferenceId,
      canonicalIdentityKey,
      catalogRevision:
        XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION,
      resolverVersion:
        XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION,
      validatorVersion:
        XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION,
      prototypeId,
      prototypeVersion: prototype.prototypeVersion,
      identityReferences: Object.freeze({
        ...input.identityReferences,
      }),
      sourceEncounterCycleId: input.sourceEncounterCycleId,
      pressureProvenance: Object.freeze({ ...input.pressure }),
      gravityProvenance: Object.freeze({
        gravityCycleId: input.gravityCycleId,
        gravityObservationReferenceId:
          input.gravityObservationReferenceId,
        observationCheckpointRevision:
          input.observationCheckpointRevision,
      }),
      motherCodeProvenance: Object.freeze({
        ...input.motherCode,
      }),
      parameters,
      action,
      safety: Object.freeze({
        safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
        validatorVersion:
          XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION,
        forbiddenContextMatches: Object.freeze([]) as readonly [],
        userMayDecline: true as const,
        userMayDefer: true as const,
        noOutcomePromise: true as const,
      }),
      provenance: Object.freeze({
        authoringSource:
          "CURATED_PARAMETERIZED_PROTOTYPE" as const,
        aiDraftUsed: false as const,
        aiHasNoAuthority: true as const,
        userHasNotActedYet: true as const,
        noLivedResponseAuthority: true as const,
        noCrystalEligibilityAuthority: true as const,
      }),
      lifecycle: "ROUTE_CANDIDATE_AVAILABLE" as const,
      revision: 1 as const,
      expiryRule:
        "CURRENT_RECOGNIZED_OBSERVATION_ONLY" as const,
    });
    return validateChoiceActionRouteCandidate(candidate, input);
  }).filter(
    (
      result,
    ): result is Extract<typeof result, { status: "VALID" }> =>
      result.status === "VALID",
  ).map((result) => result.candidate);
  if (candidates.length === 0) {
    return safeWithheld(input, "PARAMETER_VALIDATION_FAILED");
  }
  return Object.freeze({
    status: "READY" as const,
    routeSetReferenceId,
    resolverInput: input,
    candidates: Object.freeze(candidates.slice(0, 3)),
    reason: null,
  });
}

export const XinmaiChoiceActionRouteResolver = Object.freeze({
  resolve: resolveChoiceActionRoutes,
  deterministic: true as const,
  pure: true as const,
  noStorageRead: true as const,
  noStorageWrite: true as const,
  noAiAuthority: true as const,
  noFixtureAuthority: true as const,
  noRendererAuthority: true as const,
});
