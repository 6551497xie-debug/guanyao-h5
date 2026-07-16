import type {
  PersonalStarBeastIdentityProductReadinessReference,
  PersonalStarBeastIdentityProductReadinessResult,
} from "./personalStarBeastIdentityProductReadiness";

export type PersonalStarBeastIdentityProductConsumptionContractInput = Readonly<{
  readinessResult: PersonalStarBeastIdentityProductReadinessResult | null;
}>;

export type PersonalStarBeastIdentityProductConsumptionContractUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "READINESS_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityProductConsumptionContractBlockedReason =
  | "READINESS_RESULT_BLOCKED"
  | "READINESS_BOUNDARY_INVALID"
  | "READINESS_REFERENCE_INVALID"
  | "IDENTITY_SOURCE_DRIFT"
  | "CONSUMPTION_SCOPE_INVALID";

export type PersonalStarBeastIdentityProductConsumptionContractBoundary =
  Readonly<{
    contractOnly: true;
    referenceOnly: true;
    noProductConsumption: true;
    noUserBinding: true;
    noConsumerCreation: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noStorageWrite: true;
    noUserProfileCreation: true;
    noSceneModelCreation: true;
    noVisualAssetCreation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityProductConsumptionInputContract =
  Readonly<{
    acceptedReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS";
    requiredReadiness: "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION";
    sourceReferenceOnly: true;
    explicitUserBindingRequired: true;
    productConsumerMustNotRecalculateIdentity: true;
    rendererConsumptionDeferred: true;
    storageWriteDeferred: true;
  }>;

export type PersonalStarBeastIdentityProductConsumptionOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_REFERENCE";
    futureProductConsumerOnly: true;
    referenceOnly: true;
    productConsumption: "NOT_PERFORMED";
    explicitUserBindingRequired: true;
    noIdentityRecalculation: true;
    noAutomaticUserBinding: true;
    noRendererInvocation: true;
    noStorageWrite: true;
  }>;

export type PersonalStarBeastIdentityProductConsumptionContractReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT";
    referenceId: string;
    contractVersion: "V1";
    consumerScope: "FUTURE_PERSONAL_STAR_BEAST_PRODUCT_CONSUMER_ONLY";
    readinessReference: PersonalStarBeastIdentityProductReadinessReference;
    inputContract: PersonalStarBeastIdentityProductConsumptionInputContract;
    outputContract: PersonalStarBeastIdentityProductConsumptionOutputContract;
    contractOnly: true;
    referenceOnly: true;
    productConsumption: "NOT_PERFORMED";
    explicitUserBindingRequired: true;
    noAutomaticUserBinding: true;
    noConsumerCreation: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noStorageWrite: true;
    noUserProfileCreation: true;
    noSceneModelCreation: true;
    noVisualAssetCreation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityProductConsumptionContractReady =
  Readonly<{
    status: "READY";
    contractStatus: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY";
    source: "personal_star_beast_identity_product_consumption_contract";
    input: PersonalStarBeastIdentityProductConsumptionContractInput;
    contractReference: PersonalStarBeastIdentityProductConsumptionContractReference;
    boundary: PersonalStarBeastIdentityProductConsumptionContractBoundary;
  }>;

export type PersonalStarBeastIdentityProductConsumptionContractUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    contractStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_product_consumption_contract";
    reason: PersonalStarBeastIdentityProductConsumptionContractUnavailableReason;
    input: PersonalStarBeastIdentityProductConsumptionContractInput;
    contractReference: null;
    boundary: PersonalStarBeastIdentityProductConsumptionContractBoundary;
  }>;

export type PersonalStarBeastIdentityProductConsumptionContractBlocked =
  Readonly<{
    status: "BLOCKED";
    contractStatus: "BLOCKED";
    source: "personal_star_beast_identity_product_consumption_contract";
    reason: PersonalStarBeastIdentityProductConsumptionContractBlockedReason;
    input: PersonalStarBeastIdentityProductConsumptionContractInput;
    contractReference: null;
    boundary: PersonalStarBeastIdentityProductConsumptionContractBoundary;
  }>;

export type PersonalStarBeastIdentityProductConsumptionContractResult =
  | PersonalStarBeastIdentityProductConsumptionContractReady
  | PersonalStarBeastIdentityProductConsumptionContractUnavailable
  | PersonalStarBeastIdentityProductConsumptionContractBlocked;
