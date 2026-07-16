import type {
  PersonalStarBeastIdentityProductConsumptionContractBlockedReason,
  PersonalStarBeastIdentityProductConsumptionContractBoundary,
  PersonalStarBeastIdentityProductConsumptionContractInput,
  PersonalStarBeastIdentityProductConsumptionContractResult,
  PersonalStarBeastIdentityProductConsumptionContractUnavailableReason,
} from "../types/personalStarBeastIdentityProductConsumptionContract";

const CONTRACT_BOUNDARY: PersonalStarBeastIdentityProductConsumptionContractBoundary =
  Object.freeze({
    contractOnly: true,
    referenceOnly: true,
    noProductConsumption: true,
    noUserBinding: true,
    noConsumerCreation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noUserProfileCreation: true,
    noSceneModelCreation: true,
    noVisualAssetCreation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: PersonalStarBeastIdentityProductConsumptionContractInput,
  reason: PersonalStarBeastIdentityProductConsumptionContractUnavailableReason,
): PersonalStarBeastIdentityProductConsumptionContractResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    contractStatus: "UNAVAILABLE" as const,
    source: "personal_star_beast_identity_product_consumption_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityProductConsumptionContractInput,
  reason: PersonalStarBeastIdentityProductConsumptionContractBlockedReason,
): PersonalStarBeastIdentityProductConsumptionContractResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    contractStatus: "BLOCKED" as const,
    source: "personal_star_beast_identity_product_consumption_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

export function reviewPersonalStarBeastIdentityProductConsumptionContract(
  input: PersonalStarBeastIdentityProductConsumptionContractInput,
): PersonalStarBeastIdentityProductConsumptionContractResult {
  const readiness = input.readinessResult;
  if (readiness === null) {
    return unavailable(input, "READINESS_RESULT_REQUIRED");
  }
  if (readiness.status === "UNAVAILABLE") {
    return unavailable(input, "READINESS_RESULT_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, "READINESS_RESULT_BLOCKED");
  }

  if (
    readiness.status !== "READY" ||
    readiness.readiness !==
      "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION" ||
    readiness.source !== "personal_star_beast_identity_product_readiness" ||
    readiness.boundary.readinessOnly !== true ||
    readiness.boundary.productConsumptionReadinessOnly !== true ||
    readiness.boundary.referenceOnly !== true ||
    readiness.boundary.noProductConsumption !== true ||
    readiness.boundary.noUserBinding !== true ||
    readiness.boundary.noEngineInvocation !== true ||
    readiness.boundary.noRendererInvocation !== true ||
    readiness.boundary.noStorageWrite !== true ||
    readiness.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "READINESS_BOUNDARY_INVALID");
  }

  const readinessReference = readiness.readinessReference;
  if (
    readinessReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS" ||
    readinessReference.consumptionScope !== "PRODUCT_EXPERIENCE_REFERENCE_ONLY" ||
    readinessReference.productConsumption !== "NOT_PERFORMED" ||
    readinessReference.userBinding !== false ||
    readinessReference.rendererConsumption !== false ||
    readinessReference.storageWrite !== false ||
    readinessReference.referenceOnly !== true
  ) {
    return blocked(input, "READINESS_REFERENCE_INVALID");
  }

  const identitySource = readinessReference.identitySourceReference;
  if (
    identitySource.semanticRole !== "STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.boundary.identitySourceOnly !== true ||
    identitySource.boundary.independentSourcesBeforeConvergence !== true ||
    identitySource.boundary.noPersonalStarBeastEntityCreation !== true ||
    identitySource.boundary.noRendererAssetCreation !== true ||
    identitySource.personalStarBeastReference !==
      readinessReference.identityReference
  ) {
    return blocked(input, "IDENTITY_SOURCE_DRIFT");
  }

  if (readinessReference.consumptionScope !== "PRODUCT_EXPERIENCE_REFERENCE_ONLY") {
    return blocked(input, "CONSUMPTION_SCOPE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    contractStatus:
      "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY" as const,
    source:
      "personal_star_beast_identity_product_consumption_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT" as const,
      referenceId: `personal-star-beast-identity-product-consumption-contract:${readinessReference.referenceId}`,
      contractVersion: "V1" as const,
      consumerScope:
        "FUTURE_PERSONAL_STAR_BEAST_PRODUCT_CONSUMER_ONLY" as const,
      readinessReference,
      inputContract: Object.freeze({
        acceptedReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS" as const,
        requiredReadiness:
          "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION" as const,
        sourceReferenceOnly: true as const,
        explicitUserBindingRequired: true as const,
        productConsumerMustNotRecalculateIdentity: true as const,
        rendererConsumptionDeferred: true as const,
        storageWriteDeferred: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_REFERENCE" as const,
        futureProductConsumerOnly: true as const,
        referenceOnly: true as const,
        productConsumption: "NOT_PERFORMED" as const,
        explicitUserBindingRequired: true as const,
        noIdentityRecalculation: true as const,
        noAutomaticUserBinding: true as const,
        noRendererInvocation: true as const,
        noStorageWrite: true as const,
      }),
      contractOnly: true as const,
      referenceOnly: true as const,
      productConsumption: "NOT_PERFORMED" as const,
      explicitUserBindingRequired: true as const,
      noAutomaticUserBinding: true as const,
      noConsumerCreation: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noUserProfileCreation: true as const,
      noSceneModelCreation: true as const,
      noVisualAssetCreation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: CONTRACT_BOUNDARY,
  });
}
