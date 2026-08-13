export const XINMAI_LIFE_COMPANION_CANONICAL_MUTATION_POLICY =
  Object.freeze({
    state: "SAFE_WITHHELD" as const,
    transactionWriterEnabled: false as const,
    createsRelationshipAggregate: false as const,
    writesFirstEncounterReceipt: false as const,
    writesCommandFence: false as const,
    createsRealityIntent: false as const,
    writesLifeWhisper: false as const,
    writesNaming: false as const,
  });
