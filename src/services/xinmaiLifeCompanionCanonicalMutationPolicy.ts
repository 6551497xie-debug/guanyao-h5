export const XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION =
  "ENABLED" as "ENABLED" | "SAFE_WITHHELD";

export const XINMAI_LIFE_COMPANION_CANONICAL_MUTATION_POLICY =
  Object.freeze({
    state: XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION,
    transactionWriterEnabled:
      XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION === "ENABLED",
    createsRelationshipAggregate:
      XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION === "ENABLED",
    writesFirstEncounterReceipt:
      XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION === "ENABLED",
    writesCommandFence:
      XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION === "ENABLED",
    createsRealityIntent: false as const,
    writesLifeWhisper: false as const,
    writesNaming: false as const,
  });
