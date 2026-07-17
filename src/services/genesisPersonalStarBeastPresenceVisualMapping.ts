import type { GenesisPersonalStarBeastRevealVisualState } from "../types/genesisPersonalStarBeastRevealVisualState";
import type {
  GenesisPersonalStarBeastPresenceVisualMappingBlockedReason,
  GenesisPersonalStarBeastPresenceVisualMappingBoundary,
  GenesisPersonalStarBeastPresenceVisualMappingInput,
  GenesisPersonalStarBeastPresenceVisualMappingResult,
  GenesisPersonalStarBeastPresenceVisualMappingUnavailableReason,
  GenesisPersonalStarBeastPresenceVisualState,
} from "../types/genesisPersonalStarBeastPresenceVisualState";

const MAPPING_BOUNDARY: GenesisPersonalStarBeastPresenceVisualMappingBoundary = Object.freeze({
  presenceLayerOnly: true,
  revealLayerConsumedAsUpstream: true,
  identityUntouched: true,
  identitySourceUntouched: true,
  mansionUntouched: true,
  fourSymbolEngineUntouched: true,
  motherCodeUntouched: true,
  lifeArchetypeUntouched: true,
  hexagramEngineUntouched: true,
  realityUntouched: true,
  gravityUntouched: true,
  choiceUntouched: true,
  crystalUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
  productionUntouched: true,
});

const unavailable = (
  input: GenesisPersonalStarBeastPresenceVisualMappingInput,
  reason: GenesisPersonalStarBeastPresenceVisualMappingUnavailableReason,
): GenesisPersonalStarBeastPresenceVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_personal_star_beast_presence_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisPersonalStarBeastPresenceVisualMappingInput,
  reason: GenesisPersonalStarBeastPresenceVisualMappingBlockedReason,
): GenesisPersonalStarBeastPresenceVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_personal_star_beast_presence_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const isValidRevealVisualState = (reveal: GenesisPersonalStarBeastRevealVisualState): boolean => (
  reveal.revealPresence === "LIFE_PRESENCE_RETURNING" &&
  reveal.stellarBodyFormation === "STELLAR_LIFE_STRUCTURE_FORMED" &&
  reveal.symbolicEmbodiment === "SYMBOLIC_FIELD_CARRIED" &&
  reveal.forceExpression === "LIFE_FORCE_RHYTHM_EMBODIED" &&
  reveal.lifePresenceRhythm === "QUIET_LIFE_PRESENCE_RHYTHM" &&
  reveal.revealCompletion === "PERSONAL_STAR_BEAST_REVEAL_COMPLETE" &&
  reveal.revealRhythmStages[0] === "PRESENCE" &&
  reveal.revealRhythmStages[1] === "FORMATION" &&
  reveal.revealRhythmStages[2] === "RETURN" &&
  reveal.visualOnly === true &&
  reveal.identityBlind === true &&
  reveal.noIdentityId === true &&
  reveal.noMansionName === true &&
  reveal.noFourSymbolName === true &&
  reveal.noMotherCodeId === true &&
  reveal.noLifeArchetypeId === true &&
  reveal.noUserData === true &&
  reveal.noAnimalType === true &&
  reveal.noFourSymbolResult === true &&
  reveal.noMotherCodeResult === true &&
  reveal.noLifeArchetypeResult === true &&
  reveal.noRealityPressure === true &&
  reveal.noCrystal === true &&
  reveal.noEngineInvocation === true &&
  reveal.noIdentitySourceInvocation === true &&
  reveal.noRendererInvocation === true &&
  reveal.noSceneModelInvocation === true &&
  reveal.noRenderPlanInvocation === true &&
  reveal.noStorageWrite === true
);

export function mapGenesisPersonalStarBeastPresenceVisualState(
  input: GenesisPersonalStarBeastPresenceVisualMappingInput,
): GenesisPersonalStarBeastPresenceVisualMappingResult {
  const reveal = input.revealVisualState;
  if (reveal === null) {
    return unavailable(input, "REVEAL_VISUAL_STATE_REQUIRED");
  }
  if (!isValidRevealVisualState(reveal)) {
    return blocked(input, "REVEAL_VISUAL_REFERENCE_INVALID");
  }

  const state: GenesisPersonalStarBeastPresenceVisualState = Object.freeze({
    presenceState: "LIFE_PRESENCE_ESTABLISHED",
    lifeOrientation: "PRIMARY_AXIS_EMERGING",
    breathingRhythm: "SLOW_LIFE_BREATH",
    stellarBodyCohesion: "STELLAR_BODY_COHESION_FORMING",
    silhouetteEmergence: "NON_LITERAL_SILHOUETTE_EMERGING",
    companionPresence: "QUIET_COMPANIONSHIP",
    presenceExpressionModes: [
      "AXIS_DIRECTION",
      "COHESIVE_STAR_BONE",
      "SLOW_BREATH_RESPONSE",
      "SILENT_COMPANIONSHIP",
    ] as const,
    revealVisualReference: reveal,
    visualOnly: true,
    identityBlind: true,
    noIdentityId: true,
    noMansionName: true,
    noFourSymbolName: true,
    noMotherCodeId: true,
    noLifeArchetypeId: true,
    noAnimalType: true,
    noRealityPressure: true,
    noCrystal: true,
    noEngineInvocation: true,
    noIdentitySourceInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
    noStorageWrite: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_MAPPING_READY" as const,
    source: "genesis_personal_star_beast_presence_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
