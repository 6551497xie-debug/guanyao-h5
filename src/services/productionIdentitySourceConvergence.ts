import { resolveLifeArchetypeProfileFromMotherCode } from "./motherCodeLifeArchetypeSource";
import type { ProductionIdentitySourceConvergenceAuthorizationAuthorized } from "../types/productionIdentitySourceConvergenceAuthorization";
import type { LifeArchetypeProfile } from "../types/originalSelfLifeSchema";
import type {
  StarBeastGenesisFourSymbolResultReference,
  StarBeastGenesisMansionResultReference,
  StarBeastGenesisMotherCodeProfileReference,
} from "../types/starBeastGenesisSourceIdentity";
import type {
  ProductionIdentitySourceConvergenceBlockedReason,
  ProductionIdentitySourceConvergenceBoundary,
  ProductionIdentitySourceConvergenceInput,
  ProductionIdentitySourceConvergenceResult,
  ProductionIdentitySourceConvergenceUnavailableReason,
} from "../types/productionIdentitySourceConvergence";

const EXECUTED_BOUNDARY: ProductionIdentitySourceConvergenceBoundary =
  Object.freeze({
    convergenceOnly: true,
    isolatedExecutionOnly: true,
    referenceOnly: true,
    profileResolutionPerformed: true,
    noEngineInvocation: true,
    identityConvergencePerformed: true,
    noPersonalStarBeastEntityCreation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noLifeStateMutation: true,
  });

const NOT_EXECUTED_BOUNDARY = Object.freeze({
  ...EXECUTED_BOUNDARY,
  profileResolutionPerformed: false as const,
  identityConvergencePerformed: false as const,
});

const unavailable = (
  input: ProductionIdentitySourceConvergenceInput,
  reason: ProductionIdentitySourceConvergenceUnavailableReason,
): ProductionIdentitySourceConvergenceResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    convergenceStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_convergence" as const,
    reason,
    input,
    convergenceReference: null,
    boundary: NOT_EXECUTED_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceConvergenceInput,
  reason: ProductionIdentitySourceConvergenceBlockedReason,
): ProductionIdentitySourceConvergenceResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    convergenceStatus: "BLOCKED" as const,
    source: "production_identity_source_convergence" as const,
    reason,
    input,
    convergenceReference: null,
    boundary: NOT_EXECUTED_BOUNDARY,
  });

function isAuthorized(
  result: ProductionIdentitySourceConvergenceInput["authorizationResult"],
): result is ProductionIdentitySourceConvergenceAuthorizationAuthorized {
  if (result === null || result.status !== "AUTHORIZED") return false;
  const authorization = result.authorizationReference;
  const readiness = authorization.readinessReference;
  return (
    result.authorization ===
      "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE" &&
    result.source === "production_identity_source_convergence_authorization" &&
    result.boundary.authorizationReviewOnly === true &&
    result.boundary.isolatedConvergenceOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noIdentityConvergence === true &&
    result.boundary.noPersonalStarBeastCreation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noLifeStateMutation === true &&
    authorization.referenceType ===
      "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AUTHORIZATION" &&
    authorization.authorizationScope ===
      "ISOLATED_FORMAL_IDENTITY_SOURCE_CONVERGENCE_ONLY" &&
    authorization.convergenceAuthorization ===
      "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE" &&
    authorization.convergenceExecution === "NOT_PERFORMED" &&
    authorization.identityConvergence === "NOT_PERFORMED" &&
    authorization.personalStarBeastCreation === false &&
    authorization.productionIntegration === false &&
    authorization.userBinding === false &&
    authorization.referenceOnly === true &&
    readiness.referenceType ===
      "FORMAL_IDENTITY_SOURCE_CONVERGENCE_READINESS" &&
    readiness.convergence === "NOT_PERFORMED" &&
    readiness.personalStarBeastCreation === false &&
    readiness.productionIntegration === false &&
    readiness.userBinding === false &&
    readiness.referenceOnly === true
  );
}

function isLifeArchetypeProfile(
  profile: LifeArchetypeProfile,
  motherCodeId: string,
): boolean {
  return (
    profile.source === "mother_code_profile" &&
    profile.sourceMotherCodeId === motherCodeId &&
    profile.semanticRole === "ORIGINAL_LIFE_FORCE" &&
    profile.nonFinalIdentity === true &&
    profile.notHexagram === true &&
    profile.notPersonalityLabel === true
  );
}

export function convergeProductionIdentitySource(
  input: ProductionIdentitySourceConvergenceInput,
): ProductionIdentitySourceConvergenceResult {
  const authorization = input.authorizationResult;
  if (authorization === null) {
    return unavailable(input, "AUTHORIZATION_RESULT_REQUIRED");
  }
  if (authorization.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_RESULT_UNAVAILABLE");
  }
  if (authorization.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_RESULT_BLOCKED");
  }
  if (!isAuthorized(authorization)) {
    return blocked(input, "AUTHORIZATION_BOUNDARY_INVALID");
  }

  const readiness = authorization.authorizationReference.readinessReference;
  const consumption = readiness.engineConsumptionReference;
  const mansion = consumption.mansionEngineResultReference;
  if (
    mansion.status !== "READY" ||
    mansion.protocolVersion !== "GUANYAO_LUNAR_MANSION_V1" ||
    mansion.calculationBasis !==
      "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION" ||
    mansion.locationIndependent !== true ||
    mansion.birthTimeIndependent !== true
  ) {
    return blocked(input, "MANSION_SOURCE_INVALID");
  }
  if (!mansion.mansion || !mansion.fourSymbol || !mansion.direction) {
    return blocked(input, "FOUR_SYMBOL_SOURCE_INVALID");
  }

  const motherCode = consumption.motherCodeEngineResultReference;
  if (
    motherCode.status !== "READY" ||
    motherCode.protocolVersion !== "GUANYAO_LUNAR_TRIGRAM_LANDING_V1" ||
    motherCode.calculationBasis !==
      "LUNAR_YEAR_MONTH_DAY_PLUS_HOUR_BRANCH_MODULO_8" ||
    motherCode.trigramSourceScope !== "LUNAR_CHRONO_ONLY" ||
    motherCode.trigramIndependentOfStarbeast !== true ||
    motherCode.trigramIndependentOfLocation !== true
  ) {
    return blocked(input, "MOTHER_CODE_SOURCE_INVALID");
  }

  const lifeArchetypeResult = resolveLifeArchetypeProfileFromMotherCode(
    motherCode.motherCodeProfile,
  );
  if (lifeArchetypeResult.status !== "READY") {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_NOT_READY");
  }
  const lifeArchetypeProfile = lifeArchetypeResult.lifeArchetypeProfile;
  if (
    !isLifeArchetypeProfile(
      lifeArchetypeProfile,
      motherCode.motherCodeProfile.motherCodeId,
    )
  ) {
    return blocked(input, "LIFE_ARCHETYPE_SOURCE_INVALID");
  }

  const mansionResultReference: StarBeastGenesisMansionResultReference =
    Object.freeze({
      referenceType: "STAR_BEAST_GENESIS_MANSION_ENGINE_RESULT",
      sourceEngine: "guanyao_starbeast_engine",
      resultReference: mansion,
    });
  const fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference =
    Object.freeze({
      referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
      sourceEngine: "guanyao_starbeast_engine",
      resultReference: mansion,
    });
  const motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference =
    Object.freeze({
      referenceType: "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE",
      sourceEngine: "guanyao_lunar_mother_code_landing",
      landingResultReference: motherCode,
      profileReference: motherCode.motherCodeProfile,
    });

  const personalStarBeastIdentityReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_SOURCE" as const,
    referenceId: `personal-star-beast:${mansion.gregorianBirthDate}:${motherCode.motherCodeProfile.motherCodeId}`,
    semanticRole: "MANSION_SEED_FIELD_FORCE_CONVERGENCE" as const,
    notFourSymbolAnimal: true as const,
    notGeneratedAsset: true as const,
    notLifeState: true as const,
  });
  const identitySource = Object.freeze({
    semanticRole: "STAR_BEAST_IDENTITY_SOURCE" as const,
    mansionSeed: Object.freeze({
      semanticRole: "BIRTH_MANSION_LIFE_SEED" as const,
      sourceMansionResultReference: mansionResultReference,
      noFourSymbolSubstitution: true as const,
      noMotherCodeSubstitution: true as const,
    }),
    fourSymbolField: Object.freeze({
      semanticRole: "FOUR_SYMBOL_MORPHOLOGICAL_FIELD" as const,
      sourceFourSymbolResultReference: fourSymbolResultReference,
      noAnimalModelGeneration: true as const,
      noMotherCodeInference: true as const,
    }),
    lifeArchetypeForce: Object.freeze({
      semanticRole: "LIFE_ARCHETYPE_FORCE" as const,
      sourceMotherCodeProfileReference: motherCodeProfileReference,
      sourceLifeArchetypeProfileReference: lifeArchetypeProfile,
      noFourSymbolGeneration: true as const,
      noMansionSourceMutation: true as const,
    }),
    personalStarBeastReference: personalStarBeastIdentityReference,
    boundary: Object.freeze({
      independentSourcesBeforeConvergence: true as const,
      mansionDoesNotInferFourSymbolField: true as const,
      fourSymbolDoesNotInferLifeArchetypeForce: true as const,
      motherCodeDoesNotChangeMansionSource: true as const,
      identitySourceOnly: true as const,
      noPersonalStarBeastEntityCreation: true as const,
      noRendererAssetCreation: true as const,
    }),
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    convergenceStatus: "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AVAILABLE" as const,
    source: "production_identity_source_convergence" as const,
    input,
    convergenceReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_CONVERGENCE" as const,
      referenceId: `formal-identity-source-convergence:${personalStarBeastIdentityReference.referenceId}`,
      authorizationReference: authorization.authorizationReference,
      identitySource,
      personalStarBeastIdentityReference,
      lifeArchetypeProfileReference: lifeArchetypeProfile,
      convergenceExecution: "PERFORMED_ISOLATED" as const,
      identityConvergence: "PERFORMED_ISOLATED" as const,
      personalStarBeastCreation: false as const,
      productionIntegration: false as const,
      userBinding: false as const,
      referenceOnly: true as const,
    }),
    boundary: EXECUTED_BOUNDARY,
  });
}
