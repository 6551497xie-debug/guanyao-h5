type XinmaiSixDimensionV2NewMutationPolicy = "ENABLED" | "SAFE_WITHHELD";

const defineXinmaiSixDimensionV2NewMutationPolicy = (
  policy: XinmaiSixDimensionV2NewMutationPolicy,
): XinmaiSixDimensionV2NewMutationPolicy => policy;

export const XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY =
  defineXinmaiSixDimensionV2NewMutationPolicy("ENABLED");

export const canMutateXinmaiSixDimensionObservation = (): boolean =>
  XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY === "ENABLED";

export const XINMAI_SIX_DIMENSION_PHASE_2_POLICY = Object.freeze({
  mutationPolicy: XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY,
  createsObservationSet:
    XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY === "ENABLED",
  writesCompletionReceipt:
    XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY === "ENABLED",
  writesCommandFence:
    XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY === "ENABLED",
  createsChoiceV3:
    XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY === "ENABLED",
} as const);
