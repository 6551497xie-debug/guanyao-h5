export type XinmaiCrystalFreshRealityPresentationPolicy =
  | "ENABLED"
  | "SAFE_WITHHELD";

export const XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY:
  XinmaiCrystalFreshRealityPresentationPolicy = "ENABLED";

export const isXinmaiCrystalFreshRealityPresentationEnabled = (
  policy: XinmaiCrystalFreshRealityPresentationPolicy,
): boolean => policy === "ENABLED";
