import type {
  ChangeExperienceDimension,
  ChangeExperiencePresentation,
  ChangeExperienceUnit,
} from "../types/changeExperience";
import {
  actionFiveAwarenessChangeExperiencePresentation,
  bodyAwarenessChangeExperiencePresentation,
  emotionChangeAwarenessChangeExperiencePresentation,
  memoryWisdomChangeExperiencePresentation,
  motivationDriveChangeExperiencePresentation,
  thoughtChangeCognitionChangeExperiencePresentation,
} from "./fixtures/changeExperiencePresentationFixtures";
import {
  actionFiveAwarenessChangeExperienceUnit,
  bodyAwarenessChangeExperienceUnit,
  emotionChangeAwarenessChangeExperienceUnit,
  memoryWisdomChangeExperienceUnit,
  motivationDriveChangeExperienceUnit,
  thoughtChangeCognitionChangeExperienceUnit,
} from "./fixtures/changeExperienceFixtures";

export type ChangeExperienceRuntimeAction = Readonly<{
  layerLabel: string;
  yaoName: string;
}>;

export type ChangeExperienceRuntimeRoute = Readonly<{
  dimension: ChangeExperienceDimension;
  unit: ChangeExperienceUnit;
  presentation: ChangeExperiencePresentation;
}>;

type ChangeExperienceRuntimeRouteDefinition = ChangeExperienceRuntimeRoute &
  Readonly<{
    layerLabels: readonly string[];
    smokeFixtures: readonly string[];
  }>;

const changeExperienceRuntimeRoutes: readonly ChangeExperienceRuntimeRouteDefinition[] = [
  {
    dimension: "body",
    layerLabels: ["身体"],
    smokeFixtures: ["body-awareness", "body"],
    unit: bodyAwarenessChangeExperienceUnit,
    presentation: bodyAwarenessChangeExperiencePresentation,
  },
  {
    dimension: "emotion",
    layerLabels: ["情绪"],
    smokeFixtures: ["emotion-change", "emotion"],
    unit: emotionChangeAwarenessChangeExperienceUnit,
    presentation: emotionChangeAwarenessChangeExperiencePresentation,
  },
  {
    dimension: "thought",
    layerLabels: ["思想", "思维"],
    smokeFixtures: ["thought-change", "thought"],
    unit: thoughtChangeCognitionChangeExperienceUnit,
    presentation: thoughtChangeCognitionChangeExperiencePresentation,
  },
  {
    dimension: "action",
    layerLabels: ["行动", "行为"],
    smokeFixtures: ["action-five"],
    unit: actionFiveAwarenessChangeExperienceUnit,
    presentation: actionFiveAwarenessChangeExperiencePresentation,
  },
  {
    dimension: "memory",
    layerLabels: ["记忆"],
    smokeFixtures: ["memory-wisdom", "memory"],
    unit: memoryWisdomChangeExperienceUnit,
    presentation: memoryWisdomChangeExperiencePresentation,
  },
  {
    dimension: "motivation",
    layerLabels: ["动机", "目标"],
    smokeFixtures: ["motivation-drive", "motivation"],
    unit: motivationDriveChangeExperienceUnit,
    presentation: motivationDriveChangeExperiencePresentation,
  },
];

const isAwarenessYao = (yaoName: string): boolean =>
  yaoName.includes("五爻") || yaoName.includes("觉察");

export const resolveChangeExperienceRuntimeRoute = (
  action: ChangeExperienceRuntimeAction | null,
  experienceSmokeFixture: string | null,
): ChangeExperienceRuntimeRoute | null => {
  if (!action) return null;

  return (
    changeExperienceRuntimeRoutes.find(
      (route) =>
        route.layerLabels.includes(action.layerLabel) &&
        (isAwarenessYao(action.yaoName) ||
          (experienceSmokeFixture !== null && route.smokeFixtures.includes(experienceSmokeFixture))),
    ) ?? null
  );
};

export const ChangeExperienceRuntimeRoutingService = {
  resolveChangeExperienceRuntimeRoute,
} as const;
