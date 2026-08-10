export type RealityPressureFailureCauseCode =
  | "STAGE_NOT_IN_CATALOG"
  | "CATALOG_REVISION_UNKNOWN"
  | "CATALOG_ARTIFACT_UNAVAILABLE"
  | "SOURCE_INVALID"
  | "SOURCE_REVISION_MISMATCH"
  | "RUNTIME_ID_BINDING_MISSING"
  | "PRESSURE_NATURE_BINDING_MISSING"
  | "BUNDLE_BUILD_CONFLICT"
  | "DELIVERY_NOT_READY"
  | "TARGET_450_NEW_CREATION_SAFE_WITHHELD"
  | "INTENT_NOT_READY"
  | "ADMISSION_NOT_READY"
  | "LIFECYCLE_NOT_READY";

export type RealityPressureFailureStage =
  | "CANDIDATE_SOURCE"
  | "BUNDLE_BUILDER"
  | "DELIVERY_SESSION"
  | "DELIVERY_ORCHESTRATOR"
  | "ROUTE_HOST"
  | "PRESENTATION";

export type RealityPressureFailureEnvelope = Readonly<{
  schemaVersion: "XINMAI_REALITY_PRESSURE_FAILURE_ENVELOPE_V1";
  cause: RealityPressureFailureCauseCode;
  retryability: "RETRYABLE" | "NON_RETRYABLE";
  chain: readonly Readonly<{
    stage: RealityPressureFailureStage;
    outcome: string;
  }>[];
}>;

export const createRealityPressureFailureEnvelope = (
  cause: RealityPressureFailureCauseCode,
  retryability: RealityPressureFailureEnvelope["retryability"],
  stage: RealityPressureFailureStage,
  outcome: string,
): RealityPressureFailureEnvelope => Object.freeze({
  schemaVersion: "XINMAI_REALITY_PRESSURE_FAILURE_ENVELOPE_V1" as const,
  cause,
  retryability,
  chain: Object.freeze([Object.freeze({ stage, outcome })]),
});

export const appendRealityPressureFailureStage = (
  failure: RealityPressureFailureEnvelope,
  stage: RealityPressureFailureStage,
  outcome: string,
): RealityPressureFailureEnvelope => Object.freeze({
  ...failure,
  chain: Object.freeze([
    ...failure.chain,
    Object.freeze({ stage, outcome }),
  ]),
});
