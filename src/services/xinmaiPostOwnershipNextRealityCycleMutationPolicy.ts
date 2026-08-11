export type XinmaiPostOwnershipNextRealityCycleMutationPolicy =
  | "ENABLED"
  | "SAFE_WITHHELD";

export const POST_OWNERSHIP_NEXT_CYCLE_NEW_MUTATION:
  XinmaiPostOwnershipNextRealityCycleMutationPolicy = "ENABLED";

export const isXinmaiPostOwnershipNextRealityCycleMutationEnabled =
  (): boolean =>
    String(POST_OWNERSHIP_NEXT_CYCLE_NEW_MUTATION) === "ENABLED";
