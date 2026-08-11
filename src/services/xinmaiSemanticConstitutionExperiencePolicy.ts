export type XinmaiSemanticConstitutionExperiencePolicy =
  | "ENABLED"
  | "SAFE_WITHHELD";

export const XINMAI_SEMANTIC_CONSTITUTION_EXPERIENCE_POLICY:
  XinmaiSemanticConstitutionExperiencePolicy = "ENABLED";

export const isXinmaiSemanticConstitutionExperienceEnabled = (
  policy: XinmaiSemanticConstitutionExperiencePolicy,
): boolean => policy === "ENABLED";
