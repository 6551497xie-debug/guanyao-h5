import {
  isXinmaiCrystalFreshRealityPresentationEnabled,
  XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY,
} from "./xinmaiCrystalFreshRealityPresentationPolicy";

export const resolveXinmaiCrystalValueLinePresentation = (
  persistedCrystalCopy: string,
): Readonly<{
  line: string;
  persistedCrystalCopyPreserved: true;
  presentationPolicy: "ENABLED" | "SAFE_WITHHELD";
}> => {
  void persistedCrystalCopy;
  const enabled = isXinmaiCrystalFreshRealityPresentationEnabled(
    XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY,
  );
  return Object.freeze({
    line: enabled
      ? "这道痕迹记录着：你曾把一个明确的回应带回现实，并确认了实际发生的结果。"
      : "这道生命痕迹已经形成；具体说明暂时收起，已保存的内容不会改变。",
    persistedCrystalCopyPreserved: true as const,
    presentationPolicy:
      XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY,
  });
};

export const XinmaiCrystalValueLinePresentationResolver = Object.freeze({
  resolve: resolveXinmaiCrystalValueLinePresentation,
  readsOnly: true as const,
  writesAuthority: false as const,
});
