import type { DynamicsMotherHandoff } from "../types/gravityRuntimeInput";
import type { GeoChronoMotherFusionResult } from "../types/guanyaoGeoChronoMotherFusion";

function resolveStarOriginIndex(primaryNode: string): number {
  const nodeNumber = Number(primaryNode.match(/(\d+)$/)?.[1]);
  return Number.isInteger(nodeNumber) && nodeNumber >= 1 && nodeNumber <= 28
    ? nodeNumber - 1
    : 0;
}

export function buildDynamicsMotherHandoff(
  reveal: GeoChronoMotherFusionResult,
): DynamicsMotherHandoff {
  const { profile, definition, trigram } = reveal.mother;
  const motherCodeProfile = {
    ...profile,
    trigram,
    lowerTrigram: profile.lowerTrigram ?? trigram,
    trigramSymbol: definition.trigramSymbol,
    trigramImage: definition.trigramImage,
    baseDrive: definition.baseDrive,
    defaultReactionChain: definition.defaultReactionChain,
    shadowInertia: definition.shadowInertia,
    personalityAsset: definition.personalityAsset,
    assetSummary: definition.assetSummary,
  };
  const originMotherContext = {
    source: "launch-lab",
    createdAt: new Date().toISOString(),
    geo: reveal.geo,
    chrono: reveal.chrono,
    starbeast: reveal.starbeast,
    mother_seed: reveal.mother_seed,
    mother: reveal.mother,
    trigram,
  };
  const personaOutputSnapshot = {
    motherCode: profile.motherCodeName,
    motherCodeName: profile.motherCodeName,
    motherCodeTitle: profile.motherCodeTitle,
    trigram,
    trigramSymbol: definition.trigramSymbol,
    starbeast: {
      fourSymbol: reveal.starbeast.fourSymbol,
    },
    chronoLockPoint: reveal.chrono.lockPoint,
    geoProvince: reveal.geo.province,
    starOrigin: {
      index: resolveStarOriginIndex(reveal.starbeast.primaryNode),
      originLightTrace: reveal.starbeast.originLightTrace,
    },
  };

  return Object.freeze({
    motherCodeProfile,
    originMotherContext,
    personaOutputSnapshot,
  });
}
