import type { MotherCodeProfile, Trigram } from "../types/guanyaoCausalEngine";
import type {
  DynamicsInputContext,
  StoredSelectedPressureSeedContext,
} from "../types/gravityRuntimeInput";

export type DynamicsInputNotReadyReason =
  | "PRESSURE_CONTEXT_MISSING"
  | "MOTHER_CONTEXT_MISSING";

export type DynamicsInputReadiness =
  | Readonly<{
      status: "NOT_READY";
      readiness: "NOT_READY";
      reason: "PRESSURE_CONTEXT_MISSING";
      hasPressureContext: false;
    }>
  | Readonly<{
      status: "NOT_READY";
      readiness: "NOT_READY";
      reason: "MOTHER_CONTEXT_MISSING";
      hasPressureContext: true;
    }>
  | Readonly<{
      status: "READY";
      readiness: "READY_FOR_CURRENT_HEXAGRAM";
      hasPressureContext: true;
      selectedPressureSeedContext: StoredSelectedPressureSeedContext;
      motherCodeProfile: MotherCodeProfile;
      motherTrigram?: string;
    }>;

function isTrigram(value: unknown): value is Trigram {
  return value === "乾" || value === "坤" || value === "震" || value === "巽" || value === "坎" || value === "离" || value === "艮" || value === "兑";
}

function normalizeMotherCodeProfile(input: DynamicsInputContext): MotherCodeProfile | null {
  const profile = input.motherCodeProfile ?? input.originMotherContext?.mother?.profile;
  const lowerTrigramCandidate =
    profile?.lowerTrigram ??
    profile?.trigram ??
    input.originMotherContext?.mother?.trigram ??
    input.originMotherContext?.trigram;
  const motherCodeName =
    profile?.motherCodeName ??
    input.personaOutputSnapshot?.motherCodeName ??
    input.personaOutputSnapshot?.motherCode;

  if (!profile || !motherCodeName || !isTrigram(lowerTrigramCandidate)) return null;

  return {
    motherCodeId: profile.motherCodeId ?? motherCodeName,
    motherCodeDefinitionId: profile.motherCodeDefinitionId,
    motherCodeName,
    motherCodeTitle: profile.motherCodeTitle,
    lowerTrigram: lowerTrigramCandidate,
    baseForce: profile.baseForce ?? profile.baseDrive ?? "母码底盘已接入。",
    causalPosition: profile.causalPosition,
    pressureEntry: profile.pressureEntry,
    defaultReactionPattern: profile.defaultReactionPattern ?? profile.defaultReactionChain ?? "默认反应待补充。",
    pressureSensitiveZones: profile.pressureSensitiveZones ?? ["现实压力"],
    defenseTendency: profile.defenseTendency ?? profile.pressureMode ?? "保护方式待补充。",
    behaviorBias: profile.behaviorBias ?? profile.shadowInertia ?? "回应方式待补充。",
    shadowInertia: profile.shadowInertia,
    pressureMode: profile.pressureMode,
    defaultReactionChain: profile.defaultReactionChain,
    unlockPotential: profile.unlockPotential,
    personalityAsset: profile.personalityAsset,
    assetSummary: profile.assetSummary,
    visualAssetKey: profile.visualAssetKey,
    visualAssetCode: profile.visualAssetCode,
    xiantianNumber: profile.xiantianNumber,
    xiantianDisplay: profile.xiantianDisplay,
    trigramSymbol: profile.trigramSymbol,
    trigramImage: profile.trigramImage,
    wuxing: profile.wuxing,
    visualAssetStatus: profile.visualAssetStatus,
    visualAssetPackage: profile.visualAssetPackage,
    visualTags: profile.visualTags,
    uiBindingStatus: profile.uiBindingStatus,
    uiSurface: profile.uiSurface,
  };
}

export function resolveDynamicsInputReadiness(
  input: DynamicsInputContext,
): DynamicsInputReadiness {
  if (!input.selectedPressureSeedContext) {
    return {
      status: "NOT_READY",
      readiness: "NOT_READY",
      reason: "PRESSURE_CONTEXT_MISSING",
      hasPressureContext: false,
    };
  }

  const motherCodeProfile = normalizeMotherCodeProfile(input);
  if (!motherCodeProfile) {
    return {
      status: "NOT_READY",
      readiness: "NOT_READY",
      reason: "MOTHER_CONTEXT_MISSING",
      hasPressureContext: true,
    };
  }

  return {
    status: "READY",
    readiness: "READY_FOR_CURRENT_HEXAGRAM",
    hasPressureContext: true,
    selectedPressureSeedContext: input.selectedPressureSeedContext,
    motherCodeProfile,
    motherTrigram:
      input.motherCodeProfile?.trigram ??
      input.originMotherContext?.mother?.trigram ??
      input.originMotherContext?.trigram,
  };
}
