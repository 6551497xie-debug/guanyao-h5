import {
  XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  createEmptyXinmaiLivedGrowthEnvelope,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";

export const simulateXinmaiLivedGrowthLegacyWriterForAcceptance =
  (variant: "STABLE" | "CONFLICT" = "STABLE"): boolean => {
    if (import.meta.env?.DEV !== true) return false;
    try {
      window.localStorage.setItem(
        XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
        JSON.stringify({
          ...createEmptyXinmaiLivedGrowthEnvelope(),
          updatedAt:
            variant === "STABLE"
              ? new Date(0).toISOString()
              : new Date(1).toISOString(),
        }),
      );
      return true;
    } catch {
      return false;
    }
  };
