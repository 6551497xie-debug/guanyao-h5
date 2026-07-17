import type {
  GenesisFullSequenceReviewBoundary,
  GenesisFullSequenceReviewInput,
  GenesisFullSequenceReviewResult,
  GenesisFullSequenceReviewUnavailableReason,
  GenesisFullSequenceReviewBlockedReason,
  GenesisFullSequenceReview,
} from "../types/genesisFullSequenceReview";

const REVIEW_BOUNDARY: GenesisFullSequenceReviewBoundary = Object.freeze({
  genesisIntegrationOnly: true,
  visualStatesConsumedAsUpstream: true,
  identityUntouched: true,
  userDataUntouched: true,
  engineResultsUntouched: true,
  rendererCommandsUntouched: true,
  lifeSystemUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  realityUntouched: true,
  gravityUntouched: true,
  choiceUntouched: true,
  crystalUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const unavailable = (
  input: GenesisFullSequenceReviewInput,
  reason: GenesisFullSequenceReviewUnavailableReason,
): GenesisFullSequenceReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "genesis_full_sequence_review" as const,
  reason,
  input,
  review: null,
  boundary: REVIEW_BOUNDARY,
});

const blocked = (
  input: GenesisFullSequenceReviewInput,
  reason: GenesisFullSequenceReviewBlockedReason,
): GenesisFullSequenceReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "genesis_full_sequence_review" as const,
  reason,
  input,
  review: null,
  boundary: REVIEW_BOUNDARY,
});

const hasRequiredVisualState = (input: GenesisFullSequenceReviewInput): boolean =>
  input.moonOriginVisualState !== null &&
  input.starRiverVisualState !== null &&
  input.timeResonanceVisualState !== null &&
  input.symbolVisualState !== null &&
  input.hexagramVisualState !== null &&
  input.lifeForceVisualState !== null &&
  input.personalStarBeastRevealVisualState !== null &&
  input.personalStarBeastPresenceVisualState !== null;

const hasValidUpstreamBoundaries = (input: GenesisFullSequenceReviewInput): boolean => {
  const moon = input.moonOriginVisualState;
  const star = input.starRiverVisualState;
  const time = input.timeResonanceVisualState;
  const symbol = input.symbolVisualState;
  const hexagram = input.hexagramVisualState;
  const force = input.lifeForceVisualState;
  const reveal = input.personalStarBeastRevealVisualState;
  const presence = input.personalStarBeastPresenceVisualState;
  if (
    moon === null ||
    star === null ||
    time === null ||
    symbol === null ||
    hexagram === null ||
    force === null ||
    reveal === null ||
    presence === null
  ) {
    return false;
  }

  return (
    moon.entranceState === "ENTERING_TAIYIN_REALM" &&
    moon.visualOnly === true &&
    moon.identityBlind === true &&
    moon.noStarBeast === true &&
    moon.noEngineInvocation === true &&
    star.moonOriginReference === moon &&
    star.starFieldPresence === "STELLAR_FIELD_PRESENT" &&
    star.stellarOrderExpression === "ORDERED_STELLAR_RELATIONS" &&
    star.mansionGroupExpression === "SEVEN_POINT_GROUP_TENDENCY" &&
    star.identityBlind === true &&
    star.noPersonalStarBeast === true &&
    time.starRiverReference === star &&
    time.temporalEntryState === "LIFE_TIME_DELIVERED_TO_STARS" &&
    time.starFieldResponse === "STELLAR_RHYTHM_RESPONDS" &&
    time.identityBlind === true &&
    time.noPersonalStarBeast === true &&
    symbol.timeResonanceReference === time &&
    symbol.symbolFieldPresence === "SYMBOL_FIELD_EMERGING" &&
    symbol.sevenMansionAggregation === "SEVEN_MANSION_RELATIONS_GATHERING" &&
    symbol.identityBlind === true &&
    symbol.noPersonalStarBeast === true &&
    hexagram.symbolVisualReference === symbol &&
    hexagram.changePatternPresence === "CHANGE_PATTERN_EMERGING" &&
    hexagram.yaoStructureExpression === "SIX_LAYER_TRANSFORMATION_STRUCTURE" &&
    hexagram.identityBlind === true &&
    hexagram.noPersonalStarBeast === true &&
    force.hexagramVisualReference === hexagram &&
    force.forcePresence === "LIFE_FORCE_AWAKENING" &&
    force.forceInfluence === "STRUCTURE_RESPONDS_TO_FORCE" &&
    force.identityBlind === true &&
    force.noPersonalStarBeast === true &&
    reveal.moonOriginVisualReference === moon &&
    reveal.starRiverVisualReference === star &&
    reveal.timeResonanceVisualReference === time &&
    reveal.symbolVisualReference === symbol &&
    reveal.hexagramVisualReference === hexagram &&
    reveal.lifeForceVisualReference === force &&
    reveal.revealPresence === "LIFE_PRESENCE_RETURNING" &&
    reveal.revealCompletion === "PERSONAL_STAR_BEAST_REVEAL_COMPLETE" &&
    reveal.revealRhythmStages[0] === "PRESENCE" &&
    reveal.revealRhythmStages[1] === "FORMATION" &&
    reveal.revealRhythmStages[2] === "RETURN" &&
    reveal.identityBlind === true &&
    reveal.noAnimalType === true &&
    reveal.noRealityPressure === true &&
    reveal.noCrystal === true &&
    presence.revealVisualReference === reveal &&
    presence.presenceState === "LIFE_PRESENCE_ESTABLISHED" &&
    presence.lifeOrientation === "PRIMARY_AXIS_EMERGING" &&
    presence.breathingRhythm === "SLOW_LIFE_BREATH" &&
    presence.stellarBodyCohesion === "STELLAR_BODY_COHESION_FORMING" &&
    presence.companionPresence === "QUIET_COMPANIONSHIP" &&
    presence.identityBlind === true &&
    presence.noAnimalType === true &&
    presence.noRealityPressure === true &&
    presence.noCrystal === true
  );
};

export function reviewGenesisFullSequence(
  input: GenesisFullSequenceReviewInput,
): GenesisFullSequenceReviewResult {
  if (!hasRequiredVisualState(input)) {
    return unavailable(input, "GENESIS_VISUAL_STATES_REQUIRED");
  }
  if (!hasValidUpstreamBoundaries(input)) {
    return blocked(input, "GENESIS_TRANSITION_CAUSALITY_INVALID");
  }

  const moon = input.moonOriginVisualState!;
  const star = input.starRiverVisualState!;
  const time = input.timeResonanceVisualState!;
  const symbol = input.symbolVisualState!;
  const hexagram = input.hexagramVisualState!;
  const force = input.lifeForceVisualState!;
  const reveal = input.personalStarBeastRevealVisualState!;
  const presence = input.personalStarBeastPresenceVisualState!;

  const review: GenesisFullSequenceReview = Object.freeze({
    sequenceIntegrity: "SEVEN_LAYER_SEQUENCE_INTACT",
    transitionQuality: "CAUSALLY_CONTINUOUS",
    semanticContinuity: "LIFE_JOURNEY_CONTINUOUS",
    visualCausality: "UPSTREAM_VISUAL_STATE_DRIVES_NEXT_LAYER",
    revealJourneyState: "PERSONAL_STAR_BEAST_PRESENCE_ARRIVED",
    sequence: Object.freeze([
      "MOON",
      "STAR",
      "TIME",
      "SYMBOL",
      "HEXAGRAM",
      "FORCE",
      "BEAST",
    ] as const),
    transitions: Object.freeze([
      "MOON_TO_STAR",
      "STAR_TO_TIME",
      "TIME_TO_SYMBOL",
      "SYMBOL_TO_HEXAGRAM",
      "HEXAGRAM_TO_FORCE",
      "FORCE_TO_BEAST",
    ] as const),
    moonOriginVisualStateReference: moon,
    starRiverVisualStateReference: star,
    timeResonanceVisualStateReference: time,
    symbolVisualStateReference: symbol,
    hexagramVisualStateReference: hexagram,
    lifeForceVisualStateReference: force,
    personalStarBeastRevealVisualStateReference: reveal,
    personalStarBeastPresenceVisualStateReference: presence,
  });

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "GENESIS_FULL_SEQUENCE_REVIEW_READY" as const,
    source: "genesis_full_sequence_review" as const,
    input,
    review,
    boundary: REVIEW_BOUNDARY,
  });
}
