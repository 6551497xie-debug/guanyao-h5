import type { ProductionIdentitySourceConvergenceAvailable } from "../types/productionIdentitySourceConvergence";
import type {
  PersonalStarBeastIdentityProductReadinessBlockedReason,
  PersonalStarBeastIdentityProductReadinessBoundary,
  PersonalStarBeastIdentityProductReadinessInput,
  PersonalStarBeastIdentityProductReadinessResult,
  PersonalStarBeastIdentityProductReadinessUnavailableReason,
} from "../types/personalStarBeastIdentityProductReadiness";

const READINESS_BOUNDARY: PersonalStarBeastIdentityProductReadinessBoundary =
  Object.freeze({
    readinessOnly: true,
    productConsumptionReadinessOnly: true,
    referenceOnly: true,
    noEngineInvocation: true,
    noProductConsumption: true,
    noUserBinding: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noVisualAssetCreation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: PersonalStarBeastIdentityProductReadinessInput,
  reason: PersonalStarBeastIdentityProductReadinessUnavailableReason,
): PersonalStarBeastIdentityProductReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "personal_star_beast_identity_product_readiness" as const,
    reason,
    input,
    readinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityProductReadinessInput,
  reason: PersonalStarBeastIdentityProductReadinessBlockedReason,
): PersonalStarBeastIdentityProductReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "personal_star_beast_identity_product_readiness" as const,
    reason,
    input,
    readinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

function isAvailableConvergence(
  result: PersonalStarBeastIdentityProductReadinessInput["convergenceResult"],
): result is ProductionIdentitySourceConvergenceAvailable {
  if (result === null || result.status !== "AVAILABLE") return false;
  const reference = result.convergenceReference;
  return (
    result.convergenceStatus ===
      "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AVAILABLE" &&
    result.source === "production_identity_source_convergence" &&
    result.boundary.convergenceOnly === true &&
    result.boundary.isolatedExecutionOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.identityConvergencePerformed === true &&
    result.boundary.noPersonalStarBeastEntityCreation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_CONVERGENCE" &&
    reference.identityConvergence === "PERFORMED_ISOLATED" &&
    reference.personalStarBeastCreation === false &&
    reference.productionIntegration === false &&
    reference.userBinding === false &&
    reference.referenceOnly === true
  );
}

export function resolvePersonalStarBeastIdentityProductReadiness(
  input: PersonalStarBeastIdentityProductReadinessInput,
): PersonalStarBeastIdentityProductReadinessResult {
  const convergence = input.convergenceResult;
  if (convergence === null) {
    return unavailable(input, "CONVERGENCE_RESULT_REQUIRED");
  }
  if (convergence.status === "UNAVAILABLE") {
    return unavailable(input, "CONVERGENCE_RESULT_UNAVAILABLE");
  }
  if (convergence.status === "BLOCKED") {
    return blocked(input, "CONVERGENCE_RESULT_BLOCKED");
  }
  if (!isAvailableConvergence(convergence)) {
    return blocked(input, "CONVERGENCE_BOUNDARY_INVALID");
  }

  const reference = convergence.convergenceReference;
  const identityReference = reference.personalStarBeastIdentityReference;
  if (
    identityReference.referenceType !== "PERSONAL_STAR_BEAST_IDENTITY_SOURCE" ||
    identityReference.semanticRole !== "MANSION_SEED_FIELD_FORCE_CONVERGENCE" ||
    identityReference.notFourSymbolAnimal !== true ||
    identityReference.notGeneratedAsset !== true ||
    identityReference.notLifeState !== true ||
    reference.identitySource.personalStarBeastReference !== identityReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_INVALID");
  }

  const identitySource = reference.identitySource;
  if (
    identitySource.semanticRole !== "STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.boundary.identitySourceOnly !== true ||
    identitySource.boundary.independentSourcesBeforeConvergence !== true ||
    identitySource.boundary.noPersonalStarBeastEntityCreation !== true ||
    identitySource.boundary.noRendererAssetCreation !== true ||
    identitySource.mansionSeed.noFourSymbolSubstitution !== true ||
    identitySource.fourSymbolField.noAnimalModelGeneration !== true ||
    identitySource.lifeArchetypeForce.noFourSymbolGeneration !== true
  ) {
    return blocked(input, "IDENTITY_SOURCE_INVALID");
  }

  const lifeArchetype = reference.lifeArchetypeProfileReference;
  if (
    lifeArchetype.source !== "mother_code_profile" ||
    lifeArchetype.semanticRole !== "ORIGINAL_LIFE_FORCE" ||
    lifeArchetype.nonFinalIdentity !== true ||
    lifeArchetype.notHexagram !== true ||
    lifeArchetype.notPersonalityLabel !== true ||
    identitySource.lifeArchetypeForce.sourceLifeArchetypeProfileReference !==
      lifeArchetype
  ) {
    return blocked(input, "LIFE_ARCHETYPE_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION" as const,
    source: "personal_star_beast_identity_product_readiness" as const,
    input,
    readinessReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS" as const,
      referenceId: `personal-star-beast-identity-product-readiness:${identityReference.referenceId}`,
      identityReference,
      identitySourceReference: identitySource,
      lifeArchetypeProfileReference: lifeArchetype,
      consumptionScope: "PRODUCT_EXPERIENCE_REFERENCE_ONLY" as const,
      productConsumption: "NOT_PERFORMED" as const,
      userBinding: false as const,
      rendererConsumption: false as const,
      storageWrite: false as const,
      referenceOnly: true as const,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
