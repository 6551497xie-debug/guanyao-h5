export const XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY =
  "SAFE_WITHHELD" as const;

export const canMutateXinmaiSixDimensionObservation = (): false => false;

export const XINMAI_SIX_DIMENSION_PHASE_1_POLICY = Object.freeze({
  mutationPolicy: XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY,
  createsObservationSet: false,
  writesCompletionReceipt: false,
  writesCommandFence: false,
  createsChoiceV3: false,
  ordinaryJourneyCreatesRecords: false,
} as const);
