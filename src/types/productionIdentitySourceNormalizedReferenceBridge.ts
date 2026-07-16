import type { ProductionIdentitySourceInputNormalizerResult } from "./productionIdentitySourceInputNormalizer";

export type ProductionIdentitySourceNormalizedReferenceBridgeInput = Readonly<{
  normalizationResult: ProductionIdentitySourceInputNormalizerResult | null;
}>;

export type ProductionIdentitySourceNormalizedReferenceBridgeUnavailableReason =
  | "NORMALIZATION_RESULT_REQUIRED"
  | "NORMALIZATION_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceNormalizedReferenceBridgeBlockedReason =
  | "NORMALIZATION_RESULT_BLOCKED"
  | "NORMALIZATION_REFERENCE_INVALID";

export type ProductionIdentitySourceNormalizedReferenceBridgeBoundary = Readonly<{
  bridgeOnly: true;
  referenceOnly: true;
  noAdapterInvocation: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceNormalizedReferenceBridgeReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW";
  referenceId: string;
  bridgeScope: "FUTURE_FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_ONLY";
  normalizedReference: Extract<
    ProductionIdentitySourceInputNormalizerResult,
    { status: "READY" }
  >["normalizationReference"];
  downstreamExpectation: Readonly<{
    normalizedDateSource: "LUNAR_BIRTH_DATE_FROM_NORMALIZATION";
    normalizedTimeSource: "HOUR_BRANCH_FROM_NORMALIZATION";
    locationContextSource: "CONTEXT_REFERENCE_ONLY";
    downstreamInputRole: "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT";
  }>;
  bridgeOnly: true;
  referenceOnly: true;
  noAdapterInvocation: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceNormalizedReferenceBridgeReady = Readonly<{
  status: "READY";
  bridgeStatus: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW";
  source: "production_identity_source_normalized_reference_bridge";
  input: ProductionIdentitySourceNormalizedReferenceBridgeInput;
  bridgeReference: ProductionIdentitySourceNormalizedReferenceBridgeReference;
  boundary: ProductionIdentitySourceNormalizedReferenceBridgeBoundary;
}>;

export type ProductionIdentitySourceNormalizedReferenceBridgeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  bridgeStatus: "UNAVAILABLE";
  source: "production_identity_source_normalized_reference_bridge";
  reason: ProductionIdentitySourceNormalizedReferenceBridgeUnavailableReason;
  input: ProductionIdentitySourceNormalizedReferenceBridgeInput;
  bridgeReference: null;
  boundary: ProductionIdentitySourceNormalizedReferenceBridgeBoundary;
}>;

export type ProductionIdentitySourceNormalizedReferenceBridgeBlocked = Readonly<{
  status: "BLOCKED";
  bridgeStatus: "BLOCKED";
  source: "production_identity_source_normalized_reference_bridge";
  reason: ProductionIdentitySourceNormalizedReferenceBridgeBlockedReason;
  input: ProductionIdentitySourceNormalizedReferenceBridgeInput;
  bridgeReference: null;
  boundary: ProductionIdentitySourceNormalizedReferenceBridgeBoundary;
}>;

export type ProductionIdentitySourceNormalizedReferenceBridgeResult =
  | ProductionIdentitySourceNormalizedReferenceBridgeReady
  | ProductionIdentitySourceNormalizedReferenceBridgeUnavailable
  | ProductionIdentitySourceNormalizedReferenceBridgeBlocked;
