import type { ProductionIdentitySourceInputNormalizerReady } from "../types/productionIdentitySourceInputNormalizer";
import type {
  ProductionIdentitySourceNormalizedReferenceBridgeBlockedReason,
  ProductionIdentitySourceNormalizedReferenceBridgeBoundary,
  ProductionIdentitySourceNormalizedReferenceBridgeInput,
  ProductionIdentitySourceNormalizedReferenceBridgeResult,
  ProductionIdentitySourceNormalizedReferenceBridgeUnavailableReason,
} from "../types/productionIdentitySourceNormalizedReferenceBridge";

const BRIDGE_BOUNDARY: ProductionIdentitySourceNormalizedReferenceBridgeBoundary =
  Object.freeze({
    bridgeOnly: true,
    referenceOnly: true,
    noAdapterInvocation: true,
    noEngineInvocation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noIdentityRecalculation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceNormalizedReferenceBridgeInput,
  reason: ProductionIdentitySourceNormalizedReferenceBridgeUnavailableReason,
): ProductionIdentitySourceNormalizedReferenceBridgeResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    bridgeStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_normalized_reference_bridge" as const,
    reason,
    input,
    bridgeReference: null,
    boundary: BRIDGE_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceNormalizedReferenceBridgeInput,
  reason: ProductionIdentitySourceNormalizedReferenceBridgeBlockedReason,
): ProductionIdentitySourceNormalizedReferenceBridgeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    bridgeStatus: "BLOCKED" as const,
    source: "production_identity_source_normalized_reference_bridge" as const,
    reason,
    input,
    bridgeReference: null,
    boundary: BRIDGE_BOUNDARY,
  });

function isReadyNormalization(
  result: ProductionIdentitySourceNormalizedReferenceBridgeInput["normalizationResult"],
): result is ProductionIdentitySourceInputNormalizerReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.normalizationReference;
  const location = reference.locationContextReference;
  return (
    result.normalizationStatus === "FORMAL_IDENTITY_SOURCE_NORMALIZATION_READY" &&
    result.source === "production_identity_source_input_normalizer" &&
    result.boundary.implementationOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noRawUserDataInResult === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noUiIntegration === true &&
    result.boundary.noRendererIntegration === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noStarBeastCreation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE" &&
    reference.source === "production_identity_source_input_normalizer" &&
    reference.normalized === true &&
    reference.referenceOnly === true &&
    reference.lunarDateIsCanonicalCalculationInput === true &&
    reference.locationExcludedFromStarBeastDerivation === true &&
    reference.locationExcludedFromMotherCodeDerivation === true &&
    typeof reference.gregorianBirthDate === "string" &&
    typeof reference.hourBranch === "string" &&
    Number.isInteger(reference.hourBranchOrdinal) &&
    (location === null ||
      (location.referenceType === "BIRTH_LOCATION_CONTEXT_REFERENCE" &&
        location.contextPresent === true &&
        location.excludedFromStarBeastDerivation === true &&
        location.excludedFromMotherCodeDerivation === true))
  );
}

export function reviewProductionIdentitySourceNormalizedReferenceBridge(
  input: ProductionIdentitySourceNormalizedReferenceBridgeInput,
): ProductionIdentitySourceNormalizedReferenceBridgeResult {
  const normalization = input.normalizationResult;
  if (normalization === null) return unavailable(input, "NORMALIZATION_RESULT_REQUIRED");
  if (normalization.status === "UNAVAILABLE") {
    return unavailable(input, "NORMALIZATION_RESULT_UNAVAILABLE");
  }
  if (normalization.status === "BLOCKED") {
    return blocked(input, "NORMALIZATION_RESULT_BLOCKED");
  }
  if (!isReadyNormalization(normalization)) {
    return blocked(input, "NORMALIZATION_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    bridgeStatus: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW" as const,
    source: "production_identity_source_normalized_reference_bridge" as const,
    input,
    bridgeReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW" as const,
      referenceId: `formal-identity-source-adapter-bridge:${normalization.normalizationReference.referenceId}`,
      bridgeScope: "FUTURE_FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_ONLY" as const,
      normalizedReference: normalization.normalizationReference,
      downstreamExpectation: Object.freeze({
        normalizedDateSource: "LUNAR_BIRTH_DATE_FROM_NORMALIZATION" as const,
        normalizedTimeSource: "HOUR_BRANCH_FROM_NORMALIZATION" as const,
        locationContextSource: "CONTEXT_REFERENCE_ONLY" as const,
        downstreamInputRole: "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT" as const,
      }),
      bridgeOnly: true as const,
      referenceOnly: true as const,
      noAdapterInvocation: true as const,
      noEngineInvocation: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: BRIDGE_BOUNDARY,
  });
}
