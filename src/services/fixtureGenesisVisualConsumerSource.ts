import {
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
} from "../mocks/starBeastSceneModelFixtures";
import { GENESIS_VISUAL_CONSUMER_SOURCE_BOUNDARY } from "./genesisVisualConsumerSourceBoundary";
import type { GenesisVisualConsumerSourceResult } from "../types/genesisVisualConsumerSource";

const FIXTURE_VISUAL_SOURCES = Object.freeze([
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.visualSourceReference,
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B.visualSourceReference,
] as const);

export const getFixtureGenesisVisualConsumerAuthorizationPlanResults = () =>
  Object.freeze([
    FIXTURE_VISUAL_SOURCES[0].renderPlanResult,
    FIXTURE_VISUAL_SOURCES[1].renderPlanResult,
  ] as const);

export function resolveFixtureGenesisVisualConsumerSource(
  fixtureCaseIndex: 0 | 1,
): GenesisVisualConsumerSourceResult {
  const visualSource = FIXTURE_VISUAL_SOURCES[fixtureCaseIndex];
  const isCaseA = fixtureCaseIndex === 0;

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_visual_consumer_source" as const,
    consumerSource: Object.freeze({
      sourceExperienceMode: "FIXTURE_PREVIEW_ONLY" as const,
      sourceProvenance: isCaseA
        ? ("FIXTURE_CASE_A" as const)
        : ("FIXTURE_CASE_B" as const),
      sourceReferenceId: visualSource.provenance.sourceReferenceId,
      renderPlanResult: visualSource.renderPlanResult,
      projectionBundle: visualSource.projectionBundle,
    }),
    boundary: GENESIS_VISUAL_CONSUMER_SOURCE_BOUNDARY,
  });
}
