import { resolveGuanyaoPressureSeedCatalogRevision } from "../data/guanyaoPressureSeedCatalogRevisionRegistry";
import { resolveXinmaiSixDimensionSemanticChoreography } from "./xinmaiSixDimensionSemanticChoreographyResolver";
import type { SixDimensionSemanticSelectionRecoveryResult } from "../types/xinmaiSixDimensionSemanticSelection";
import type { XinmaiSixDimensionResponseMapPresentation } from "../types/xinmaiSixDimensionResponseMapPresentation";
import type {
  XinmaiActionSemanticResponseId,
  XinmaiGoalSemanticResponseId,
} from "../types/xinmaiSixDimensionResponseMapPresentation";

const FALLBACK_TRIGGER = "这一轮选中的现实";

const ACTION_PHRASES: Readonly<Record<XinmaiActionSemanticResponseId, string>> =
  Object.freeze({
    ADVANCE: "自动反应准备立刻推进",
    WITHDRAW: "自动反应准备退开",
    PAUSE: "自动反应准备先停住",
  });

const GOAL_PHRASES: Readonly<Record<XinmaiGoalSemanticResponseId, string>> =
  Object.freeze({
    NEED: "它在保护一个现实需要",
    VALUE: "它在保护一种重要价值",
    UNCERTAIN: "它想保护什么还不确定",
  });

export function resolveXinmaiMicroActionCausalExplanation(
  actionSemanticResponseId: XinmaiActionSemanticResponseId,
  goalSemanticResponseId: XinmaiGoalSemanticResponseId,
  microAction: string,
): string {
  const action = ACTION_PHRASES[actionSemanticResponseId];
  const goal = GOAL_PHRASES[goalSemanticResponseId];
  const nextAction = microAction.trim();
  if (!nextAction) return `${action}；${goal}。现实实验还没有选定。`;
  return goalSemanticResponseId === "UNCERTAIN"
    ? `${action}，但${goal}。这次用一个小实验收集反馈：${nextAction}`
    : `${action}，因为${goal}。这次用一个小实验检验它：${nextAction}`;
}

const resolveTrigger = (
  recovery: SixDimensionSemanticSelectionRecoveryResult,
  fallback?: string,
): string => {
  if (fallback?.trim()) return fallback.trim();
  const pressure = recovery.observationSet?.pressure;
  if (!pressure) return FALLBACK_TRIGGER;
  const catalog = resolveGuanyaoPressureSeedCatalogRevision(
    pressure.catalogRevision,
  );
  if (catalog.status !== "READY") return FALLBACK_TRIGGER;
  return catalog.artifact.matrix
    .flatMap((node) => node.seeds)
    .find((seed) => seed.id === pressure.runtimeSeedId)?.surface ??
    FALLBACK_TRIGGER;
};

export function resolveXinmaiSixDimensionResponseMapPresentation(
  recovery: SixDimensionSemanticSelectionRecoveryResult,
  fallbackRealityTrigger?: string,
): XinmaiSixDimensionResponseMapPresentation {
  const realityTrigger = resolveTrigger(recovery, fallbackRealityTrigger);
  if (recovery.status === "LEGACY_GENERIC_ONLY") {
    return Object.freeze({
      state: "LEGACY_GENERIC_ONLY" as const,
      realityTrigger,
      items: Object.freeze([]),
      actionSemanticResponseId: null,
      goalSemanticResponseId: null,
      safeWithheldReason: "SEMANTIC_SELECTION_NOT_RECORDED" as const,
    });
  }
  if (recovery.status === "SAFE_WITHHELD") {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      realityTrigger,
      items: Object.freeze([]),
      actionSemanticResponseId: null,
      goalSemanticResponseId: null,
      safeWithheldReason: recovery.cause.code,
    });
  }
  const items = Object.freeze(recovery.selections.map((entry) => {
    const grammar = resolveXinmaiSixDimensionSemanticChoreography(
      entry.dimensionId,
    );
    const response = grammar.responses.find(
      (candidate) =>
        candidate.id === entry.selection.semanticResponseId,
    );
    if (!response) {
      throw new Error("SEMANTIC_RESPONSE_PRESENTATION_MAPPING_MISSING");
    }
    return Object.freeze({
      dimensionId: entry.dimensionId,
      dimensionLabel: grammar.label,
      selectedMeaning: response.mirror,
    });
  }));
  const actionSemanticResponseId = recovery.selections.find(
    (item) => item.dimensionId === "action",
  )?.selection.semanticResponseId;
  const goalSemanticResponseId = recovery.selections.find(
    (item) => item.dimensionId === "goal",
  )?.selection.semanticResponseId;
  if (recovery.status !== "EXACT_COMPLETE" ||
      !actionSemanticResponseId ||
      !goalSemanticResponseId ||
      !Object.prototype.hasOwnProperty.call(ACTION_PHRASES, actionSemanticResponseId) ||
      !Object.prototype.hasOwnProperty.call(GOAL_PHRASES, goalSemanticResponseId) ||
      items.length !== 6) {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      realityTrigger,
      items: Object.freeze([]),
      actionSemanticResponseId: null,
      goalSemanticResponseId: null,
      safeWithheldReason: "SEMANTIC_SELECTION_MAP_INCOMPLETE",
    });
  }
  return Object.freeze({
    state: "EXACT" as const,
    realityTrigger,
    items,
    actionSemanticResponseId:
      actionSemanticResponseId as XinmaiActionSemanticResponseId,
    goalSemanticResponseId:
      goalSemanticResponseId as XinmaiGoalSemanticResponseId,
    safeWithheldReason: null,
  });
}

export const XinmaiSixDimensionResponseMapPresentationResolver =
  Object.freeze({
    resolve: resolveXinmaiSixDimensionResponseMapPresentation,
    owner: "XINMAI_SIX_DIMENSION_RESPONSE_MAP_PRESENTATION_RESOLVER" as const,
    readOnly: true as const,
    writesAuthority: false as const,
    infersMissingSelection: false as const,
  });
