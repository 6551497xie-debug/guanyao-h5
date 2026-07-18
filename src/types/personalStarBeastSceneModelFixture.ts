import type {
  PersonalStarBeastSceneModel,
} from "./personalStarBeastSceneModel";
import type {
  StarBeastFourSymbolFieldSource,
  StarBeastIdentitySource,
  StarBeastLifeArchetypeForceSource,
  StarBeastMansionSeedSource,
} from "./starBeastIdentitySource";
import type { RealLifeVisualSource } from "./realLifeVisualSourceAdapter";

export type PersonalStarBeastSceneModelFixture = Readonly<{
  fixtureId: string;
  identitySourceReference: StarBeastIdentitySource;
  mansionSeedReference: StarBeastMansionSeedSource;
  fourSymbolFieldReference: StarBeastFourSymbolFieldSource;
  lifeArchetypeReference: StarBeastLifeArchetypeForceSource;
  sceneModelReference: PersonalStarBeastSceneModel;
  visualSourceReference: RealLifeVisualSource;
  validationScope: "ISOLATED_PROTOTYPE_ONLY";
}>;

export type PersonalStarBeastSceneModelFixtureDifference = Readonly<{
  identityReferenceDifferent: boolean;
  mansionSeedDifferent: boolean;
  fourSymbolFieldDifferent: boolean;
  lifeArchetypeForceDifferent: boolean;
  sceneModelExpressionReferenceDifferent: boolean;
}>;

export type PersonalStarBeastSceneModelFixtureValidationReason =
  | "EXACTLY_TWO_FIXTURES_REQUIRED"
  | "FIXTURE_ID_REQUIRED"
  | "FIXTURE_ID_DUPLICATED"
  | "ISOLATED_SCOPE_REQUIRED"
  | "FORMAL_IDENTITY_SOURCE_INVALID"
  | "FORMAL_MANSION_SOURCE_INVALID"
  | "FORMAL_FOUR_SYMBOL_SOURCE_INVALID"
  | "FORMAL_LIFE_ARCHETYPE_SOURCE_INVALID"
  | "IDENTITY_REFERENCE_MISMATCH"
  | "SCENE_MODEL_REFERENCE_INVALID"
  | "MANIFESTATION_GRAMMAR_SOURCE_MISMATCH"
  | "MANIFESTATION_GRAMMAR_REFERENCE_MISMATCH"
  | "IDENTITY_REFERENCE_NOT_DISTINCT"
  | "LIFE_EXPRESSION_SOURCE_NOT_DISTINCT"
  | "SCENE_MODEL_EXPRESSION_REFERENCE_NOT_DISTINCT";

export type PersonalStarBeastSceneModelFixtureValidationResult =
  | Readonly<{
      status: "VALID";
      validation: "SAME_GRAMMAR_DIFFERENT_LIFE_CONFIRMED";
      fixtures: readonly [
        PersonalStarBeastSceneModelFixture,
        PersonalStarBeastSceneModelFixture,
      ];
      difference: PersonalStarBeastSceneModelFixtureDifference;
      boundary: PersonalStarBeastSceneModelFixtureValidationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      validation: "BLOCKED";
      reason: PersonalStarBeastSceneModelFixtureValidationReason;
      fixtures: readonly PersonalStarBeastSceneModelFixture[];
      difference: PersonalStarBeastSceneModelFixtureDifference | null;
      boundary: PersonalStarBeastSceneModelFixtureValidationBoundary;
    }>;

export type PersonalStarBeastSceneModelFixtureValidationBoundary = Readonly<{
  fixtureValidationOnly: true;
  formalReferencesOnly: true;
  noIdentityFactCopy: true;
  noIdentityCalculation: true;
  noSceneModelMutation: true;
  noRenderPlanCreation: true;
  noRendererInvocation: true;
  noWebGLActivation: true;
  noCanvasInvocation: true;
  noProductionIntegration: true;
  noRuntimeIntegration: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;
