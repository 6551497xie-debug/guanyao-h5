import { readRealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";
import { GENESIS_VISUAL_CONSUMER_SOURCE_BOUNDARY } from "./genesisVisualConsumerSourceBoundary";
import type { GenesisVisualConsumerSourceResult } from "../types/genesisVisualConsumerSource";

const sourceNotReady = (): GenesisVisualConsumerSourceResult =>
  Object.freeze({
    status: "SOURCE_NOT_READY" as const,
    source: "genesis_visual_consumer_source" as const,
    consumerSource: null,
    boundary: GENESIS_VISUAL_CONSUMER_SOURCE_BOUNDARY,
  });

export function resolveRealGenesisVisualConsumerSource():
  GenesisVisualConsumerSourceResult {
  const context = readRealUserGenesisVisualSourceContext();
  if (context === null) return sourceNotReady();

  const referenceId = context.sourceReferenceId;
  if (
    context.sourceMode !== "REAL_USER_EXPERIENCE" ||
    context.lifeSourceSession.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.visualSourceAdapterInput.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.visualSource.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.lifeSourceSession.sourceReferenceId !== referenceId ||
    context.visualSourceAdapterInput.sourceReferenceId !== referenceId ||
    context.visualSource.provenance.sourceReferenceId !== referenceId
  ) {
    return sourceNotReady();
  }

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_visual_consumer_source" as const,
    consumerSource: Object.freeze({
      sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
      sourceProvenance: "REAL_USER_SESSION" as const,
      sourceReferenceId: referenceId,
      renderPlanResult: context.visualSource.renderPlanResult,
      projectionBundle: context.visualSource.projectionBundle,
    }),
    boundary: GENESIS_VISUAL_CONSUMER_SOURCE_BOUNDARY,
  });
}
