import type {
  CrystalMappingInput,
  CrystalMappingNotReady,
  CrystalMappingNotReadyReason,
  CrystalMappingResult,
  CrystalMappingSuccess,
  CrystalState,
  PersonaMigrationImpact,
} from "../types/personaTransmission";

const createNotReadyResult = (
  reason: CrystalMappingNotReadyReason,
  crystalState?: CrystalState,
): CrystalMappingNotReady => ({
  status: "NOT_READY",
  reason,
  ...(crystalState ? { crystalState } : {}),
});

const createPassResult = (crystalState: CrystalState): CrystalMappingSuccess => ({
  status: "PASS",
  crystalState,
});

const isReadyImpact = (impact: PersonaMigrationImpact): boolean =>
  impact.impactReadiness === "READY_FOR_CRYSTAL";

const resolveDominantImpact = (
  readyImpacts: readonly PersonaMigrationImpact[],
): PersonaMigrationImpact | null => {
  if (readyImpacts.length !== 1) return null;
  return readyImpacts[0];
};

const createGuardrails = (): CrystalState["guardrails"] => ({
  noStorageWrite: true,
  noHexagramGeneration: true,
  noCrystalEngineMutation: true,
  noCollectibleAsset: true,
  noScore: true,
  noLevel: true,
  noGrowthValue: true,
  noPetGrowth: true,
  no384Yao: true,
  noArchive: true,
  noOldR8: true,
});

const createNotReadyCrystalState = (
  input: CrystalMappingInput,
  readyImpacts: readonly PersonaMigrationImpact[],
  dominantImpact: PersonaMigrationImpact | null,
  crystalMeaning: string,
): CrystalState => ({
  structureSource: input.structureSource,
  impactSources: readyImpacts,
  dominantImpact,
  readiness: "NOT_READY",
  crystalMeaning,
  assetBoundary: {
    canCreateCurrentCrystalEndState: false,
    canExposeHexagramAsset: false,
    canDepositToRingLite: false,
  },
  ringDepositMeaning: {
    traceLine: dominantImpact?.crystalImprint.imprintLine ?? "",
    shouldDepositToRingLite: false,
  },
  guardrails: createGuardrails(),
});

const createReadyCrystalState = (
  input: CrystalMappingInput,
  readyImpacts: readonly PersonaMigrationImpact[],
  dominantImpact: PersonaMigrationImpact,
): CrystalState => ({
  structureSource: input.structureSource,
  impactSources: readyImpacts,
  dominantImpact,
  readiness: "READY_TO_CRYSTALLIZE",
  crystalMeaning: `这一局把${dominantImpact.fromModel}转向${dominantImpact.toResponse}`,
  assetBoundary: {
    canCreateCurrentCrystalEndState: true,
    canExposeHexagramAsset: false,
    canDepositToRingLite: false,
  },
  ringDepositMeaning: {
    traceLine: dominantImpact.crystalImprint.imprintLine,
    shouldDepositToRingLite: false,
  },
  guardrails: createGuardrails(),
});

export const mapCrystalState = (input: CrystalMappingInput): CrystalMappingResult => {
  const readyImpacts = input.migrationImpacts.filter(isReadyImpact);
  const dominantImpact = resolveDominantImpact(readyImpacts);

  if (!input.structureSource) {
    return createNotReadyResult(
      "CURRENT_HEXAGRAM_PROFILE_MISSING",
      createNotReadyCrystalState(input, readyImpacts, dominantImpact, "本局卦象结构尚未形成。"),
    );
  }

  if (readyImpacts.length === 0) {
    return createNotReadyResult(
      "READY_MIGRATION_IMPACT_MISSING",
      createNotReadyCrystalState(input, readyImpacts, null, "本局尚未出现可结晶的人格迁移影响。"),
    );
  }

  if (!dominantImpact) {
    return createNotReadyResult(
      "DOMINANT_IMPACT_UNRESOLVED",
      createNotReadyCrystalState(input, readyImpacts, null, "本局存在多个迁移影响，尚未确定主影响。"),
    );
  }

  return createPassResult(createReadyCrystalState(input, readyImpacts, dominantImpact));
};

export const CrystalMappingService = {
  mapCrystalState,
} as const;
