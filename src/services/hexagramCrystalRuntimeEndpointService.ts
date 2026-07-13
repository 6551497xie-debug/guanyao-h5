import type { CurrentHexagramProfile } from "../types/guanyaoCausalEngine";
import type { CrystalState, PersonaMigrationImpact } from "../types/personaTransmission";
import { adaptCrystalState } from "./crystalEndStateAdapterService";
import { mapCrystalState } from "./crystalMappingService";
import { formHexagramCrystalResult } from "./hexagramCrystalEngineService";
import { consumeHexagramCrystalResult } from "./hexagramCrystalResultConsumptionService";

export type RuntimeCurrentCrystalEndStatePressureContext = Readonly<{
  selectedPressureSeedId?: string;
  surface?: string;
  pressureField?: string;
}>;

export type RuntimeCurrentCrystalEndState = Readonly<{
  source: "dynamics";
  status: "CRYSTALLIZED";
  createdAt: string;
  mother: Readonly<{
    motherCodeName: string;
    lowerTrigram: string;
  }>;
  pressure: RuntimeCurrentCrystalEndStatePressureContext;
  hexagram: Readonly<{
    lowerTrigram: string;
    upperTrigram: string;
    hexagramCode?: string;
    hexagramName?: string;
    hexagramTitle?: string;
  }>;
  transmission: Readonly<{
    completedNodeCount: 6;
    primaryDimension?: string;
  }>;
  crystal: Readonly<{
    title: "本局结晶";
    copy: string;
  }>;
}>;

export type RuntimeCurrentCrystalEndStateInput = Readonly<{
  currentHexagramProfile: CurrentHexagramProfile | null;
  motherCodeName: string;
  selectedPressureSeedContext: RuntimeCurrentCrystalEndStatePressureContext | null;
  completedNodeCount: number;
  primaryDimension?: string;
  readyToCrystallize: boolean;
  migrationImpact?: PersonaMigrationImpact | null;
  createdAt?: string;
}>;

export const resolveRuntimeCurrentCrystalEndState = (
  input: RuntimeCurrentCrystalEndStateInput,
): RuntimeCurrentCrystalEndState | null => {
  const {
    currentHexagramProfile,
    motherCodeName,
    selectedPressureSeedContext,
    completedNodeCount,
    primaryDimension,
    readyToCrystallize,
    migrationImpact,
  } = input;

  if (!currentHexagramProfile || !readyToCrystallize || completedNodeCount < 6 || !migrationImpact) return null;

  const crystalMappingResult = mapCrystalState({
    structureSource: {
      source: "currentHexagramProfile",
      currentHexagramProfile,
    },
    migrationImpacts: [migrationImpact],
    source: "runtime",
  });

  if (crystalMappingResult.status !== "PASS") return null;

  const endStateAdapterResult = adaptCrystalState({
    crystalState: crystalMappingResult.crystalState,
    source: "runtime",
  });

  if (endStateAdapterResult.status !== "READY") return null;

  const crystalState: CrystalState = endStateAdapterResult.crystalState;
  const sourceHexagram = crystalState.structureSource?.currentHexagramProfile;
  const dominantImpact = crystalState.dominantImpact;
  if (!sourceHexagram || !dominantImpact) return null;

  const hexagramCrystalResult = formHexagramCrystalResult({
    sourceHexagram: {
      lowerTrigram: sourceHexagram.lowerTrigram,
      upperTrigram: sourceHexagram.upperTrigram,
      hexagramCode: sourceHexagram.hexagramCode,
      hexagramName: sourceHexagram.hexagramName,
      hexagramTitle: sourceHexagram.hexagramTitle,
    },
    crystalMeaning: crystalState.crystalMeaning,
    migrationTrace: {
      traceLine: dominantImpact.crystalImprint.imprintLine,
      sourceUnitId: dominantImpact.sourceUnit.unitId,
      dimension: dominantImpact.dimension,
      yaoStage: dominantImpact.yaoStage,
    },
    dominantShift: {
      fromModel: dominantImpact.fromModel,
      toResponse: dominantImpact.toResponse,
      deflectionVector: dominantImpact.deflectionVector,
    },
    changedLineContext: {
      sourceUnitId: dominantImpact.sourceUnit.unitId,
      dimension: dominantImpact.dimension,
      yaoStage: dominantImpact.yaoStage,
      changedLineHint: dominantImpact.crystalImprint.imprintLine,
    },
    source: "runtime",
  });

  const resultConsumption = consumeHexagramCrystalResult({
    result: hexagramCrystalResult,
    source: "runtime",
  });

  if (resultConsumption.status !== "READY_FOR_HEXAGRAM_EXPRESSION_LAYER") return null;

  const consumptionPayload = resultConsumption.payload;
  const inheritedIdentity = consumptionPayload.inheritedIdentity;
  if (!inheritedIdentity.lowerTrigram || !inheritedIdentity.upperTrigram) return null;

  return {
    source: "dynamics",
    status: "CRYSTALLIZED",
    createdAt: input.createdAt ?? new Date().toISOString(),
    mother: {
      motherCodeName: motherCodeName || inheritedIdentity.lowerTrigram,
      lowerTrigram: inheritedIdentity.lowerTrigram,
    },
    pressure: {
      selectedPressureSeedId: selectedPressureSeedContext?.selectedPressureSeedId,
      surface: selectedPressureSeedContext?.surface,
      pressureField: selectedPressureSeedContext?.pressureField,
    },
    hexagram: {
      lowerTrigram: inheritedIdentity.lowerTrigram,
      upperTrigram: inheritedIdentity.upperTrigram,
      hexagramCode: inheritedIdentity.hexagramCode,
      hexagramName: inheritedIdentity.hexagramName,
      hexagramTitle: inheritedIdentity.hexagramTitle,
    },
    transmission: {
      completedNodeCount: 6,
      primaryDimension: consumptionPayload.migrationTrace.dimension ?? primaryDimension,
    },
    crystal: {
      title: "本局结晶",
      copy: consumptionPayload.crystalLine,
    },
  };
};

export const HexagramCrystalRuntimeEndpointService = {
  resolveRuntimeCurrentCrystalEndState,
} as const;
