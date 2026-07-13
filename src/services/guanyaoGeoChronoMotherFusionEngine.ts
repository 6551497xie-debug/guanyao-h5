import { getMotherCodeDefinitionByTrigram, toMotherCodeProfile } from "../data/guanyaoMotherCodeRegistry";
import type {
  ChronoLayerInput,
  GeoChronoMotherFusionInput,
  GeoChronoMotherFusionResult,
  StarbeastLayerInput,
} from "../types/guanyaoGeoChronoMotherFusion";

function resolveChronoLockPoint(input: ChronoLayerInput) {
  const timePhaseIndex = Math.abs(input.periodIndex) % 7;
  const calibrationIndex = Math.abs(input.year + input.month * 2 + input.day * 3 + input.periodIndex) % 21;
  return {
    lockPoint: `X${timePhaseIndex + 1}-Y${calibrationIndex + 1}`,
    timePhaseIndex,
    calibrationIndex,
  };
}

function resolveStarbeastResidue(input: StarbeastLayerInput) {
  const count = Math.max(1, input.nodeCount);
  const index = ((input.primaryNodeIndex % count) + count) % count;
  return {
    primaryNode: `28宿节点-${String(index + 1).padStart(2, "0")}`,
    index,
  };
}

export function runGeoChronoMotherFusionEngine(
  input: GeoChronoMotherFusionInput,
): GeoChronoMotherFusionResult {
  const symbol = input.fourSymbol;
  const chrono = resolveChronoLockPoint(input.chrono);
  const starbeast = resolveStarbeastResidue(input.starbeast);
  const trigram = input.trigramLanding.fieldMapping.trigram;
  const definition = getMotherCodeDefinitionByTrigram(trigram);

  if (!definition) {
    throw new Error(`Missing mother code definition for fusion trigram ${trigram}`);
  }

  return {
    mother_seed: {
      direction: symbol,
      timePhase: chrono.lockPoint,
      starResidue: starbeast.primaryNode,
    },
    geo: {
      province: input.geo.province,
      city: input.geo.city,
      symbol,
      role: "directional bias",
    },
    chrono: {
      ...chrono,
      role: "temporal axis",
    },
    starbeast: {
      primaryNode: starbeast.primaryNode,
      originLightTrace: input.starbeast.originLightTrace,
      role: "identity residue",
    },
    mother: {
      trigram,
      definition,
      profile: toMotherCodeProfile(definition),
    },
  };
}
