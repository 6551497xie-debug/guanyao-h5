import type { MotherCodeProfile } from "../types/guanyaoCausalEngine";
import type { LifeArchetypeProfile } from "../types/originalSelfLifeSchema";

export type MotherCodeLifeArchetypeSourceNotReadyReason =
  | "MOTHER_CODE_TRIGRAM_MISSING"
  | "MOTHER_CODE_LIFE_SEMANTICS_MISSING";

export type MotherCodeLifeArchetypeSourceResult =
  | Readonly<{
      status: "NOT_READY";
      source: "mother_code_profile";
      reason: MotherCodeLifeArchetypeSourceNotReadyReason;
      motherCodeProfile: MotherCodeProfile;
    }>
  | Readonly<{
      status: "READY";
      source: "mother_code_profile";
      motherCodeProfile: MotherCodeProfile;
      lifeArchetypeProfile: LifeArchetypeProfile;
    }>;

const LIFE_ARCHETYPE_IDENTITY_BY_TRIGRAM = Object.freeze({
  乾: Object.freeze({ code: "QIAN", trigram: "乾" }),
  坤: Object.freeze({ code: "KUN", trigram: "坤" }),
  震: Object.freeze({ code: "ZHEN", trigram: "震" }),
  巽: Object.freeze({ code: "XUN", trigram: "巽" }),
  坎: Object.freeze({ code: "KAN", trigram: "坎" }),
  离: Object.freeze({ code: "LI", trigram: "离" }),
  艮: Object.freeze({ code: "GEN", trigram: "艮" }),
  兑: Object.freeze({ code: "DUI", trigram: "兑" }),
} as const);

export function resolveLifeArchetypeProfileFromMotherCode(
  motherCodeProfile: MotherCodeProfile,
): MotherCodeLifeArchetypeSourceResult {
  const { lowerTrigram, personalityAsset, shadowInertia, unlockPotential } = motherCodeProfile;

  if (!lowerTrigram) {
    return Object.freeze({
      status: "NOT_READY",
      source: "mother_code_profile",
      reason: "MOTHER_CODE_TRIGRAM_MISSING",
      motherCodeProfile,
    });
  }

  if (!personalityAsset || !shadowInertia || !unlockPotential) {
    return Object.freeze({
      status: "NOT_READY",
      source: "mother_code_profile",
      reason: "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
      motherCodeProfile,
    });
  }

  const identity = LIFE_ARCHETYPE_IDENTITY_BY_TRIGRAM[lowerTrigram];
  const lifeArchetypeProfile = Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: motherCodeProfile.motherCodeId,
    ...identity,
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: motherCodeProfile.baseForce,
    lifeIntention: personalityAsset,
    shadowPattern: shadowInertia,
    awakeningDirection: unlockPotential,
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  }) satisfies LifeArchetypeProfile;

  return Object.freeze({
    status: "READY",
    source: "mother_code_profile",
    motherCodeProfile,
    lifeArchetypeProfile,
  });
}
