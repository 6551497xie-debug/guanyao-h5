import type {
  ProductionIdentitySourceAdapterBlockedReason,
  ProductionIdentitySourceAdapterBoundary,
  ProductionIdentitySourceAdapterInput,
  ProductionIdentitySourceAdapterResult,
  ProductionIdentitySourceAdapterUnavailableReason,
} from "../types/productionIdentitySourceAdapter";

const ADAPTER_BOUNDARY: ProductionIdentitySourceAdapterBoundary =
  Object.freeze({
    adapterOnly: true,
    referenceOnly: true,
    noIdentityRecalculation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noSceneModelCreation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
    noStorageWrite: true,
  });

const unavailable = (
  input: ProductionIdentitySourceAdapterInput,
  reason: ProductionIdentitySourceAdapterUnavailableReason,
): ProductionIdentitySourceAdapterResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    adapterStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_adapter" as const,
    reason,
    input,
    adapterReference: null,
    boundary: ADAPTER_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceAdapterInput,
  reason: ProductionIdentitySourceAdapterBlockedReason,
): ProductionIdentitySourceAdapterResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    adapterStatus: "BLOCKED" as const,
    source: "production_identity_source_adapter" as const,
    reason,
    input,
    adapterReference: null,
    boundary: ADAPTER_BOUNDARY,
  });

export function adaptProductionIdentitySource(
  input: ProductionIdentitySourceAdapterInput,
): ProductionIdentitySourceAdapterResult {
  const readiness = input.readinessResult;
  if (readiness === null) {
    return unavailable(input, "READINESS_RESULT_REQUIRED");
  }

  if (readiness.status === "UNAVAILABLE") {
    return unavailable(input, "SOURCE_READINESS_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, "SOURCE_READINESS_BLOCKED");
  }

  if (
    readiness.readiness !== "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER" ||
    readiness.source !== "production_identity_source_adapter_readiness" ||
    readiness.boundary.readinessOnly !== true ||
    readiness.boundary.referenceOnly !== true ||
    readiness.boundary.noIdentityRecalculation !== true ||
    readiness.boundary.noUserInputBinding !== true ||
    readiness.boundary.noProductIntegration !== true ||
    readiness.boundary.noSceneModelCreation !== true ||
    readiness.boundary.noRendererInvocation !== true ||
    readiness.boundary.noLifeStateMutation !== true ||
    readiness.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "READINESS_BOUNDARY_INVALID");
  }

  const entry = readiness.identitySourceEntryReference;
  if (
    entry.referenceType !== "PRODUCTION_IDENTITY_SOURCE_ENTRY" ||
    entry.sourceRole !== "FORMAL_LIFE_IDENTITY_ENTRY" ||
    entry.referenceOnly !== true ||
    entry.noUserInputBinding !== true ||
    entry.noProductIntegration !== true ||
    entry.noSceneModelCreation !== true ||
    entry.noRendererInvocation !== true ||
    entry.noStorageWrite !== true
  ) {
    return blocked(input, "IDENTITY_ENTRY_REFERENCE_INVALID");
  }

  if (
    entry.sourceTrajectoryReference !==
      readiness.input.sourceTrajectoryReference ||
    entry.identitySourceReference !==
      entry.sourceTrajectoryReference.starBeastIdentitySource ||
    entry.originCoordinateReference !==
      entry.sourceTrajectoryReference.originCoordinateReference ||
    entry.mansionResultReference !==
      entry.sourceTrajectoryReference.mansionResultReference ||
    entry.fourSymbolResultReference !==
      entry.sourceTrajectoryReference.fourSymbolResultReference ||
    entry.motherCodeProfileReference !==
      entry.sourceTrajectoryReference.motherCodeProfileReference ||
    entry.lifeArchetypeProfileReference !==
      entry.sourceTrajectoryReference.lifeArchetypeProfileReference ||
    entry.personalStarBeastIdentityReference !==
      entry.sourceTrajectoryReference.starBeastIdentitySource
        .personalStarBeastReference
  ) {
    return blocked(input, "SOURCE_ENTRY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "AVAILABLE" as const,
    adapterStatus: "FORMAL_IDENTITY_SOURCE_ADAPTER_READY" as const,
    source: "production_identity_source_adapter" as const,
    input,
    adapterReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_ENTRY" as const,
      referenceId: `formal-identity-source-adapter:${entry.referenceId}`,
      sourceRole: "FORMAL_LIFE_IDENTITY_SOURCE" as const,
      sourceReadinessReference: readiness,
      identitySourceEntryReference: entry,
      adapterOnly: true as const,
      referenceOnly: true as const,
      noIdentityRecalculation: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noSceneModelCreation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
      noStorageWrite: true as const,
    }),
    boundary: ADAPTER_BOUNDARY,
  });
}
