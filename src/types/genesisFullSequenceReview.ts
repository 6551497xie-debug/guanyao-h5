import type { GenesisHexagramVisualState } from "./genesisHexagramVisualState";
import type { GenesisLifeForceVisualState } from "./genesisLifeForceVisualState";
import type { GenesisMoonOriginVisualState } from "./genesisMoonOriginVisualState";
import type { GenesisPersonalStarBeastPresenceVisualState } from "./genesisPersonalStarBeastPresenceVisualState";
import type { GenesisPersonalStarBeastRevealVisualState } from "./genesisPersonalStarBeastRevealVisualState";
import type { GenesisStarRiverVisualState } from "./genesisStarRiverVisualState";
import type { GenesisSymbolVisualState } from "./genesisSymbolVisualState";
import type { GenesisTimeResonanceVisualState } from "./genesisTimeResonanceVisualState";

export type GenesisFullSequenceLayer =
  | "MOON"
  | "STAR"
  | "TIME"
  | "SYMBOL"
  | "HEXAGRAM"
  | "FORCE"
  | "BEAST";

export type GenesisFullSequenceTransition =
  | "MOON_TO_STAR"
  | "STAR_TO_TIME"
  | "TIME_TO_SYMBOL"
  | "SYMBOL_TO_HEXAGRAM"
  | "HEXAGRAM_TO_FORCE"
  | "FORCE_TO_BEAST";

export type GenesisFullSequenceIntegrity = "SEVEN_LAYER_SEQUENCE_INTACT";
export type GenesisFullSequenceTransitionQuality = "CAUSALLY_CONTINUOUS";
export type GenesisFullSequenceSemanticContinuity = "LIFE_JOURNEY_CONTINUOUS";
export type GenesisFullSequenceVisualCausality =
  | "UPSTREAM_VISUAL_STATE_DRIVES_NEXT_LAYER";
export type GenesisFullSequenceRevealJourneyState =
  | "PERSONAL_STAR_BEAST_PRESENCE_ARRIVED";

export type GenesisFullSequenceReviewInput = Readonly<{
  moonOriginVisualState: GenesisMoonOriginVisualState | null;
  starRiverVisualState: GenesisStarRiverVisualState | null;
  timeResonanceVisualState: GenesisTimeResonanceVisualState | null;
  symbolVisualState: GenesisSymbolVisualState | null;
  hexagramVisualState: GenesisHexagramVisualState | null;
  lifeForceVisualState: GenesisLifeForceVisualState | null;
  personalStarBeastRevealVisualState:
    | GenesisPersonalStarBeastRevealVisualState
    | null;
  personalStarBeastPresenceVisualState:
    | GenesisPersonalStarBeastPresenceVisualState
    | null;
}>;

export type GenesisFullSequenceReview = Readonly<{
  sequenceIntegrity: GenesisFullSequenceIntegrity;
  transitionQuality: GenesisFullSequenceTransitionQuality;
  semanticContinuity: GenesisFullSequenceSemanticContinuity;
  visualCausality: GenesisFullSequenceVisualCausality;
  revealJourneyState: GenesisFullSequenceRevealJourneyState;
  sequence: readonly [
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
  ];
  transitions: readonly [
    "MOON_TO_STAR",
    "STAR_TO_TIME",
    "TIME_TO_SYMBOL",
    "SYMBOL_TO_HEXAGRAM",
    "HEXAGRAM_TO_FORCE",
    "FORCE_TO_BEAST",
  ];
  moonOriginVisualStateReference: GenesisMoonOriginVisualState;
  starRiverVisualStateReference: GenesisStarRiverVisualState;
  timeResonanceVisualStateReference: GenesisTimeResonanceVisualState;
  symbolVisualStateReference: GenesisSymbolVisualState;
  hexagramVisualStateReference: GenesisHexagramVisualState;
  lifeForceVisualStateReference: GenesisLifeForceVisualState;
  personalStarBeastRevealVisualStateReference:
    GenesisPersonalStarBeastRevealVisualState;
  personalStarBeastPresenceVisualStateReference:
    GenesisPersonalStarBeastPresenceVisualState;
}>;

export type GenesisFullSequenceReviewUnavailableReason =
  | "GENESIS_VISUAL_STATES_REQUIRED"
  | "GENESIS_VISUAL_STATE_UNAVAILABLE";

export type GenesisFullSequenceReviewBlockedReason =
  | "GENESIS_SEQUENCE_ORDER_INVALID"
  | "GENESIS_TRANSITION_CAUSALITY_INVALID"
  | "GENESIS_VISUAL_CHAIN_REFERENCE_INVALID"
  | "GENESIS_FULL_SEQUENCE_REVIEW_BOUNDARY_INVALID"
  | "ANIMAL_IDENTITY_PATH_PRESENT";

export type GenesisFullSequenceReviewBoundary = Readonly<{
  genesisIntegrationOnly: true;
  visualStatesConsumedAsUpstream: true;
  identityUntouched: true;
  userDataUntouched: true;
  engineResultsUntouched: true;
  rendererCommandsUntouched: true;
  lifeSystemUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  realityUntouched: true;
  gravityUntouched: true;
  choiceUntouched: true;
  crystalUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisFullSequenceReviewReady = Readonly<{
  status: "READY";
  reviewStatus: "GENESIS_FULL_SEQUENCE_REVIEW_READY";
  source: "genesis_full_sequence_review";
  input: GenesisFullSequenceReviewInput;
  review: GenesisFullSequenceReview;
  boundary: GenesisFullSequenceReviewBoundary;
}>;

export type GenesisFullSequenceReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "genesis_full_sequence_review";
  reason: GenesisFullSequenceReviewUnavailableReason;
  input: GenesisFullSequenceReviewInput;
  review: null;
  boundary: GenesisFullSequenceReviewBoundary;
}>;

export type GenesisFullSequenceReviewBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "genesis_full_sequence_review";
  reason: GenesisFullSequenceReviewBlockedReason;
  input: GenesisFullSequenceReviewInput;
  review: null;
  boundary: GenesisFullSequenceReviewBoundary;
}>;

export type GenesisFullSequenceReviewResult =
  | GenesisFullSequenceReviewReady
  | GenesisFullSequenceReviewUnavailable
  | GenesisFullSequenceReviewBlocked;
