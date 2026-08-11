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
    ADVANCE: "你最先想推进",
    WITHDRAW: "你最先想退开",
    PAUSE: "你最先想停一下再决定",
  });

const GOAL_PHRASES: Readonly<Record<XinmaiGoalSemanticResponseId, string>> =
  Object.freeze({
    NEED: "有一个重要需要不想被忽略",
    VALUE: "有一项在意的价值不想失去",
    UNCERTAIN: "想保护什么还不完全确定",
  });

export function resolveXinmaiMicroActionCausalExplanation(
  actionSemanticResponseId: XinmaiActionSemanticResponseId,
  goalSemanticResponseId: XinmaiGoalSemanticResponseId,
  microAction: string,
): string {
  const action = ACTION_PHRASES[actionSemanticResponseId];
  const goal = GOAL_PHRASES[goalSemanticResponseId];
  const nextAction = microAction.trim();
  if (!nextAction) return `${action}，同时${goal}。下一次的小行动还没有明确。`;
  return goalSemanticResponseId === "UNCERTAIN"
    ? `${action}，但${goal}。下一次可以先尝试【${nextAction}】。`
    : `${action}，同时${goal}。下一次可以先尝试【${nextAction}】。`;
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
