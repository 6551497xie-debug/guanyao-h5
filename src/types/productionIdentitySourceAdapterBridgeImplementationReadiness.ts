import type { ProductionIdentitySourceNormalizedReferenceBridgeResult } from "./productionIdentitySourceNormalizedReferenceBridge";

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessInput = Readonly<{
  bridgeReviewResult: ProductionIdentitySourceNormalizedReferenceBridgeResult | null;
}>;

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessUnavailableReason =
  | "BRIDGE_REVIEW_REQUIRED"
  | "BRIDGE_REVIEW_UNAVAILABLE";

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessBlockedReason =
  | "BRIDGE_REVIEW_BLOCKED"
  | "BRIDGE_REVIEW_BOUNDARY_INVALID"
  | "BRIDGE_REFERENCE_INVALID";

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessBoundary =
  Readonly<{
    implementationReadinessOnly: true;
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

export type ProductionIdentitySourceAdapterBridgeImplementationReference =
  Readonly<{
    referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_READINESS";
    referenceId: string;
    sourceBridgeReviewReference: Extract<
      ProductionIdentitySourceNormalizedReferenceBridgeResult,
      { status: "READY" }
    >["bridgeReference"];
    implementationScope: "FUTURE_ADAPTER_IMPLEMENTATION_ONLY";
    implementationAuthorized: false;
    adapterInvocation: "NOT_PERFORMED";
    engineInvocation: "NOT_PERFORMED";
    referenceOnly: true;
    noUserInputBinding: true;
    noProductIntegration: true;
    noRendererInvocation: true;
    noStorageWrite: true;
    noIdentityRecalculation: true;
    noLifeStateMutation: true;
  }>;

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessReady =
  Readonly<{
    status: "READY";
    readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION";
    source: "production_identity_source_adapter_bridge_implementation_readiness";
    input: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput;
    implementationReference: ProductionIdentitySourceAdapterBridgeImplementationReference;
    boundary: ProductionIdentitySourceAdapterBridgeImplementationReadinessBoundary;
  }>;

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    readiness: "UNAVAILABLE";
    source: "production_identity_source_adapter_bridge_implementation_readiness";
    reason: ProductionIdentitySourceAdapterBridgeImplementationReadinessUnavailableReason;
    input: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput;
    implementationReference: null;
    boundary: ProductionIdentitySourceAdapterBridgeImplementationReadinessBoundary;
  }>;

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessBlocked =
  Readonly<{
    status: "BLOCKED";
    readiness: "BLOCKED";
    source: "production_identity_source_adapter_bridge_implementation_readiness";
    reason: ProductionIdentitySourceAdapterBridgeImplementationReadinessBlockedReason;
    input: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput;
    implementationReference: null;
    boundary: ProductionIdentitySourceAdapterBridgeImplementationReadinessBoundary;
  }>;

export type ProductionIdentitySourceAdapterBridgeImplementationReadinessResult =
  | ProductionIdentitySourceAdapterBridgeImplementationReadinessReady
  | ProductionIdentitySourceAdapterBridgeImplementationReadinessUnavailable
  | ProductionIdentitySourceAdapterBridgeImplementationReadinessBlocked;
