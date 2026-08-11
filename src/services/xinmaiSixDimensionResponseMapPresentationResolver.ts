import { resolveGuanyaoPressureSeedCatalogRevision } from "../data/guanyaoPressureSeedCatalogRevisionRegistry";
import { resolveXinmaiSixDimensionSemanticChoreography } from "./xinmaiSixDimensionSemanticChoreographyResolver";
import type { SixDimensionSemanticSelectionRecoveryResult } from "../types/xinmaiSixDimensionSemanticSelection";
import type { XinmaiSixDimensionResponseMapPresentation } from "../types/xinmaiSixDimensionResponseMapPresentation";

const FALLBACK_TRIGGER = "这一轮选中的现实";

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
      actionImpulse: null,
      protectedNeed: null,
      safeWithheldReason: "SEMANTIC_SELECTION_NOT_RECORDED" as const,
    });
  }
  if (recovery.status === "SAFE_WITHHELD") {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      realityTrigger,
      items: Object.freeze([]),
      actionImpulse: null,
      protectedNeed: null,
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
  const actionImpulse = items.find(
    (item) => item.dimensionId === "action",
  )?.selectedMeaning ?? null;
  const protectedNeed = items.find(
    (item) => item.dimensionId === "goal",
  )?.selectedMeaning ?? null;
  if (recovery.status !== "EXACT_COMPLETE" || !actionImpulse ||
      !protectedNeed || items.length !== 6) {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      realityTrigger,
      items: Object.freeze([]),
      actionImpulse: null,
      protectedNeed: null,
      safeWithheldReason: "SEMANTIC_SELECTION_MAP_INCOMPLETE",
    });
  }
  return Object.freeze({
    state: "EXACT" as const,
    realityTrigger,
    items,
    actionImpulse,
    protectedNeed,
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
