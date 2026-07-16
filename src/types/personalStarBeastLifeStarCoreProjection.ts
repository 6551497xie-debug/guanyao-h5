import type { PersonalStarBeastLifePresenceProjection } from "./personalStarBeastLifePresenceProjection";

export type PersonalStarBeastLifeStarCoreProjection = Readonly<{
  semanticRole: "PERSONAL_STAR_BEAST_LIFE_STAR_CORE_PROJECTION";
  sourceLifePresenceProjectionReferenceId: string;
  surfacePresence: Readonly<{
    surfaceVariation: number;
    innerLayerDepth: number;
    atmosphereOpacity: number;
    atmosphereRadius: number;
  }>;
  coreInfluence: Readonly<{
    influenceRadius: number;
    structureResponse: number;
    lightFlowReach: number;
    nodeBreathCoupling: number;
  }>;
  temporalRhythm: Readonly<{
    periodSeconds: number;
    breathingAmplitude: number;
    variationAmount: number;
    noFlicker: true;
    noPulseEffect: true;
  }>;
  sourcePresenceSemanticRole: PersonalStarBeastLifePresenceProjection["semanticRole"];
  presenceProjectionOnly: true;
  rendererParametersOnly: true;
  identityBlind: true;
  noLifeFactCopy: true;
  noAnimalGeometry: true;
}>;
