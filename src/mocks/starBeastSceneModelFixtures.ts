import type { ChronoCoordinate } from "../types/guanyaoCausalEngine";
import type { PersonalStarBeastSceneModelFixture } from "../types/personalStarBeastSceneModelFixture";
import { runMotherCodeLandingEngine } from "../services/guanyaoLunarMotherCodeLandingAdapter";
import { resolveStarbeastFromBirthDate } from "../services/guanyaoStarbeastEngineService";
import { adaptRealLifeVisualSource } from "../services/realLifeVisualSourceAdapter";

type FormalFixtureSeed = Readonly<{
  fixtureId: string;
  birthInput: ChronoCoordinate;
}>;

const buildFormalFixture = (
  seed: FormalFixtureSeed,
): PersonalStarBeastSceneModelFixture => {
  const starbeastResult = resolveStarbeastFromBirthDate(seed.birthInput);
  const motherCodeLandingResult = runMotherCodeLandingEngine(seed.birthInput);
  if (starbeastResult.status !== "READY") {
    throw new Error(`Formal starbeast source failed for ${seed.fixtureId}`);
  }

  const adapted = adaptRealLifeVisualSource(
    Object.freeze({
      sourceKind: "ISOLATED_FIXTURE_ENGINE_RESULT" as const,
      sourceReferenceId: seed.fixtureId,
      starbeastDerivationResult: starbeastResult,
      motherCodeLandingResult,
      selectedPressureSeedContext: null,
    }),
  );
  if (adapted.status !== "AVAILABLE") {
    throw new Error(
      `Formal visual source adaptation failed for ${seed.fixtureId}: ${adapted.reason}`,
    );
  }

  const visualSourceReference = adapted.visualSource;
  const identitySourceReference =
    visualSourceReference.identitySourceReference;

  return Object.freeze({
    fixtureId: seed.fixtureId,
    identitySourceReference,
    mansionSeedReference: identitySourceReference.mansionSeed,
    fourSymbolFieldReference: identitySourceReference.fourSymbolField,
    lifeArchetypeReference: identitySourceReference.lifeArchetypeForce,
    sceneModelReference: visualSourceReference.sceneModel,
    visualSourceReference,
    validationScope: "ISOLATED_PROTOTYPE_ONLY",
  });
};

export const PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A =
  buildFormalFixture(
    Object.freeze({
      fixtureId: "personal-star-beast-scene-model-case-a",
      birthInput: Object.freeze({
        year: 1979,
        month: 4,
        day: 15,
        hourBranch: "未时",
      }),
    }),
  );

export const PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B =
  buildFormalFixture(
    Object.freeze({
      fixtureId: "personal-star-beast-scene-model-case-b",
      birthInput: Object.freeze({
        year: 2024,
        month: 2,
        day: 10,
        hourBranch: "子时",
      }),
    }),
  );

export const PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURES = Object.freeze([
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
] as const);
