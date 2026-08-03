export type XinmaiRealityAdventureLifecycleReconciliationMutationPolicy =
  | "ENABLED"
  | "PAUSED";

export const XINMAI_REALITY_ADVENTURE_LIFECYCLE_RECONCILIATION_MUTATION_POLICY =
  "ENABLED" as XinmaiRealityAdventureLifecycleReconciliationMutationPolicy;

export const isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled =
  (): boolean =>
    XINMAI_REALITY_ADVENTURE_LIFECYCLE_RECONCILIATION_MUTATION_POLICY ===
    "ENABLED";
