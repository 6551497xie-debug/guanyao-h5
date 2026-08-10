import type {
  SixDimensionObservationCommand,
  SixDimensionObservationResult,
} from "../types/xinmaiSixDimensionObservation";
import {
  XINMAI_SIX_DIMENSION_PHASE_1_POLICY,
  canMutateXinmaiSixDimensionObservation,
} from "./xinmaiSixDimensionObservationRuntimePolicy";

export const XINMAI_SIX_DIMENSION_AUTHORITY_FOUNDATION = Object.freeze({
  canonicalOwner:
    "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
  phase: "AUTHORITY_FOUNDATION_PHASE_1" as const,
  mutationPolicy:
    XINMAI_SIX_DIMENSION_PHASE_1_POLICY.mutationPolicy,
  transactionWriterEnabled: false as const,
  noPageAuthority: true as const,
  noLocalStorageAuthority: true as const,
  noSessionStorageAuthority: true as const,
  noChoiceV3Creation: true as const,
});

export const executeXinmaiSixDimensionObservationCommand = async (
  _command: SixDimensionObservationCommand,
): Promise<SixDimensionObservationResult<never>> => {
  if (canMutateXinmaiSixDimensionObservation()) {
    throw new Error(
      "SIX_DIMENSION_PHASE_1_MUTATION_POLICY_INVARIANT_VIOLATION",
    );
  }
  return Object.freeze({
    status: "SAFE_WITHHELD" as const,
    value: null,
    observationSet: null,
    completionReceipt: null,
    cause: Object.freeze({
      owner: "SIX_DIMENSION_AUTHORITY" as const,
      code: "MUTATION_POLICY_SAFE_WITHHELD" as const,
      retryability: "NOT_RETRYABLE" as const,
      innerCause: null,
    }),
  });
};
