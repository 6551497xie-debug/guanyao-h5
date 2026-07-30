export const XINMAI_REALITY_ADVENTURE_CONTINUITY_MUTATION_MODE =
  "ENABLED" as "ENABLED" | "SAFE_WITHHELD";

export function isRealityAdventureContinuityMutationEnabled():
  boolean {
  return (
    XINMAI_REALITY_ADVENTURE_CONTINUITY_MUTATION_MODE ===
    "ENABLED"
  );
}

export const REALITY_ADVENTURE_CONTINUITY_MUTATION_POLICY_BOUNDARY =
  Object.freeze({
    forwardCounterCommitOnly: true as const,
    canonicalRecoveryRemainsReadable: true as const,
    legacySourcesRemainReadOnly: true as const,
    noLegacyWriterRestoration: true as const,
    noSchemaDowngrade: true as const,
    noDatabaseDeletion: true as const,
  });
