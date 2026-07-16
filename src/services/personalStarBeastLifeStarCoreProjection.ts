import type { PersonalStarBeastLifePresenceProjection } from "../types/personalStarBeastLifePresenceProjection";
import type { PersonalStarBeastLifeStarCoreProjection } from "../types/personalStarBeastLifeStarCoreProjection";

export function projectLifePresenceToLifeStarCore(
  presence: PersonalStarBeastLifePresenceProjection,
): PersonalStarBeastLifeStarCoreProjection {
  const core = presence.corePresence;
  const field = presence.morphologicalField;
  const surfaceVariation =
    0.08 + core.coherence * 0.12 + field.boundarySoftness * 0.06;

  return Object.freeze({
    semanticRole: "PERSONAL_STAR_BEAST_LIFE_STAR_CORE_PROJECTION",
    sourceLifePresenceProjectionReferenceId:
      presence.sourceRenderPlanReferenceId,
    surfacePresence: Object.freeze({
      surfaceVariation,
      innerLayerDepth: 0.12 + core.influenceRadius * 0.14,
      atmosphereOpacity: 0.1 + core.coherence * 0.1,
      atmosphereRadius: 1.08 + core.influenceRadius * 0.28,
    }),
    coreInfluence: Object.freeze({
      influenceRadius: 0.62 + core.influenceRadius * 0.58,
      structureResponse: 0.56 + core.aggregationStrength * 0.38,
      lightFlowReach: 0.68 + core.lightReach * 0.34,
      nodeBreathCoupling: 0.3 + core.aggregationStrength * 0.42,
    }),
    temporalRhythm: Object.freeze({
      periodSeconds: 5.6 + field.boundarySoftness * 1.8,
      breathingAmplitude: 0.018 + core.breathingAmplitude * 0.58,
      variationAmount: 0.018 + surfaceVariation * 0.28,
      noFlicker: true,
      noPulseEffect: true,
    }),
    sourcePresenceSemanticRole: presence.semanticRole,
    presenceProjectionOnly: true,
    rendererParametersOnly: true,
    identityBlind: true,
    noLifeFactCopy: true,
    noAnimalGeometry: true,
  });
}
