export const XINMAI_LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_CONSUMER =
  "ENABLED" as "ENABLED" | "SAFE_WITHHELD";

export const XINMAI_LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_POLICY =
  Object.freeze({
    state: XINMAI_LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_CONSUMER,
    canonicalReadEnabled: true as const,
    firstEncounterMutationEnabled:
      XINMAI_LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_CONSUMER ===
      "ENABLED",
    writesRelationship: false as const,
    writesIdentity: false as const,
    writesNaming: false as const,
    writesLifeWhisper: false as const,
    createsRealityIntent: false as const,
  });
