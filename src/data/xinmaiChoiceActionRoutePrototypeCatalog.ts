import type {
  ChoiceActionRoutePrototype,
  ChoiceActionRoutePrototypeId,
  ChoiceActionRouteSceneKind,
} from "../types/xinmaiChoiceActionRoute";

const ALL_SCENES = Object.freeze([
  "CURRENT_WORK_OR_AUTHORITY_CONTEXT",
  "CURRENT_RESOURCE_FACT_CONTEXT",
  "NEXT_SAME_RELATION_TRIGGER",
  "NEXT_NON_URGENT_RESPONSIBILITY_CONTEXT",
  "NEXT_SAFE_SOCIAL_TRIGGER",
  "CURRENT_SELF_DIRECTION_CONTEXT",
] as const satisfies readonly ChoiceActionRouteSceneKind[]);

export const XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_CATALOG =
  Object.freeze([
    Object.freeze({
      prototypeId: "ROUGH_FIRST_STEP" as const,
      prototypeVersion: 1 as const,
      title: "做一个粗糙的第一步",
      actionVerb: "开始",
      allowedTargetKinds: Object.freeze([
        "CURRENT_TASK",
        "FIRST_REVERSIBLE_UNIT",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "ONE_STEP",
        "TWO_MINUTES",
      ] as const),
      interactionSafetyConfirmationRequired: false,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
    Object.freeze({
      prototypeId: "PAUSE_ONE_AUTOMATIC_RESPONSE" as const,
      prototypeVersion: 1 as const,
      title: "暂停一次自动反应",
      actionVerb: "暂停",
      allowedTargetKinds: Object.freeze([
        "CURRENT_AUTOMATIC_RESPONSE",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "ONE_BREATH",
        "ONE_PAUSE",
      ] as const),
      interactionSafetyConfirmationRequired: false,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
    Object.freeze({
      prototypeId: "ASK_ONE_CONCRETE_QUESTION" as const,
      prototypeVersion: 1 as const,
      title: "提出一个具体问题",
      actionVerb: "询问",
      allowedTargetKinds: Object.freeze([
        "ONE_OBSERVABLE_FACT",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "ONE_SAFE_QUESTION",
      ] as const),
      interactionSafetyConfirmationRequired: true,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
    Object.freeze({
      prototypeId: "STATE_ONE_MINIMUM_BOUNDARY" as const,
      prototypeVersion: 1 as const,
      title: "表达一个最小边界",
      actionVerb: "表达",
      allowedTargetKinds: Object.freeze([
        "CURRENT_TASK",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "ONE_MINIMUM_BOUNDARY",
      ] as const),
      interactionSafetyConfirmationRequired: true,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
    Object.freeze({
      prototypeId: "SHRINK_TO_STARTABLE_UNIT" as const,
      prototypeVersion: 1 as const,
      title: "缩小任务直到可以开始",
      actionVerb: "缩小",
      allowedTargetKinds: Object.freeze([
        "CURRENT_TASK",
        "FIRST_REVERSIBLE_UNIT",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "TWO_MINUTES",
        "TEN_MINUTES",
        "ONE_STEP",
      ] as const),
      interactionSafetyConfirmationRequired: false,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
    Object.freeze({
      prototypeId: "VERIFY_ONE_TENSING_ASSUMPTION" as const,
      prototypeVersion: 1 as const,
      title: "验证一个让自己紧绷的假设",
      actionVerb: "核对",
      allowedTargetKinds: Object.freeze([
        "CURRENT_ASSUMPTION",
        "ONE_OBSERVABLE_FACT",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "ONE_FACT",
      ] as const),
      interactionSafetyConfirmationRequired: false,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
    Object.freeze({
      prototypeId: "BODY_RECOVERY_WINDOW" as const,
      prototypeVersion: 1 as const,
      title: "给身体一个明确恢复窗口",
      actionVerb: "恢复",
      allowedTargetKinds: Object.freeze([
        "CURRENT_BODY_STATE",
      ] as const),
      allowedSceneKinds: ALL_SCENES,
      allowedEffortBoundaries: Object.freeze([
        "TWO_MINUTES",
        "TEN_MINUTES",
      ] as const),
      interactionSafetyConfirmationRequired: false,
      safetyLevel: "P0_LOW_RISK_REVERSIBLE" as const,
      userMayDecline: true as const,
      userMayDefer: true as const,
      noOutcomePromise: true as const,
    }),
  ] satisfies readonly ChoiceActionRoutePrototype[]);

export const XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_BY_ID =
  Object.freeze(
    Object.fromEntries(
      XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_CATALOG.map(
        (prototype) => [prototype.prototypeId, prototype],
      ),
    ) as unknown as Record<
      ChoiceActionRoutePrototypeId,
      ChoiceActionRoutePrototype
    >,
  );
