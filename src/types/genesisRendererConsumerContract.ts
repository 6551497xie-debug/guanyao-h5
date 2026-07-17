import type { GenesisCompletionMomentReview } from "./genesisCompletionMomentReview";
import type { GenesisHexagramVisualState } from "./genesisHexagramVisualState";
import type { GenesisLifeForceVisualState } from "./genesisLifeForceVisualState";
import type { GenesisMoonOriginVisualState } from "./genesisMoonOriginVisualState";
import type { GenesisPersonalStarBeastPresenceVisualState } from "./genesisPersonalStarBeastPresenceVisualState";
import type { GenesisRuntimeStage, GenesisRuntimeStateMachine } from "./genesisRuntimeStateMachine";
import type { GenesisStarRiverVisualState } from "./genesisStarRiverVisualState";
import type { GenesisSymbolVisualState } from "./genesisSymbolVisualState";
import type { GenesisTimeResonanceVisualState } from "./genesisTimeResonanceVisualState";
import type {
  GenesisTransitionTimeline,
  GenesisTransitionTimelineStage,
} from "./genesisTransitionTimeline";

export type GenesisRendererRenderIntent =
  | "TAIYIN_ENTRY"
  | "STELLAR_ORDER"
  | "TIME_RESPONSE"
  | "SYMBOLIC_FIELD"
  | "CHANGE_IMPRINT"
  | "LIFE_FORCE_MOTION"
  | "LIFE_PRESENCE"
  | "RECOGNITION_HOLD";

export type GenesisRendererVisualStateReference =
  | Readonly<{
      stage: "MOON_ORIGIN";
      referenceType: "MOON_ORIGIN_VISUAL_STATE";
      state: GenesisMoonOriginVisualState;
    }>
  | Readonly<{
      stage: "STAR_RIVER";
      referenceType: "STAR_RIVER_VISUAL_STATE";
      state: GenesisStarRiverVisualState;
    }>
  | Readonly<{
      stage: "TIME_RESONANCE";
      referenceType: "TIME_RESONANCE_VISUAL_STATE";
      state: GenesisTimeResonanceVisualState;
    }>
  | Readonly<{
      stage: "SYMBOL_REVEAL";
      referenceType: "SYMBOL_VISUAL_STATE";
      state: GenesisSymbolVisualState;
    }>
  | Readonly<{
      stage: "HEXAGRAM_IMPRINT";
      referenceType: "HEXAGRAM_VISUAL_STATE";
      state: GenesisHexagramVisualState;
    }>
  | Readonly<{
      stage: "LIFE_FORCE";
      referenceType: "LIFE_FORCE_VISUAL_STATE";
      state: GenesisLifeForceVisualState;
    }>
  | Readonly<{
      stage: "STAR_BEAST_REVEAL";
      referenceType: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE";
      state: GenesisPersonalStarBeastPresenceVisualState;
    }>
  | Readonly<{
      stage: "COMPLETION";
      referenceType: "GENESIS_COMPLETION_MOMENT_REVIEW";
      state: GenesisCompletionMomentReview;
    }>;

export type GenesisRendererVisualStateReferences = Readonly<{
  moonOrigin: GenesisMoonOriginVisualState | null;
  starRiver: GenesisStarRiverVisualState | null;
  timeResonance: GenesisTimeResonanceVisualState | null;
  symbol: GenesisSymbolVisualState | null;
  hexagram: GenesisHexagramVisualState | null;
  lifeForce: GenesisLifeForceVisualState | null;
  starBeastPresence: GenesisPersonalStarBeastPresenceVisualState | null;
  completion: GenesisCompletionMomentReview | null;
}>;

export type GenesisRendererConsumerBoundary = Readonly<{
  rendererConsumerOnly: true;
  runtimeStageConsumed: true;
  timelineStateConsumed: true;
  visualStateConsumed: true;
  noVisualStateMutation: true;
  noVisualStateCreation: true;
  noIdentity: true;
  noBirthData: true;
  noEngineResult: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererCreation: true;
  noSceneModel: true;
  noRenderPlan: true;
  noUserData: true;
  noStorage: true;
  noReality: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  isolatedGenesisRuntimeConsumerOnly: true;
  productionIntegration: false;
}>;

export type GenesisRendererConsumerInput = Readonly<{
  runtimeStateMachineReference: GenesisRuntimeStateMachine | null;
  transitionTimelineReference: GenesisTransitionTimeline | null;
  visualStateReferences: GenesisRendererVisualStateReferences;
  transitionProgress: number;
}>;

export type GenesisRendererConsumerContract = Readonly<{
  runtimeStage: GenesisRuntimeStage;
  visualStateReference: GenesisRendererVisualStateReference;
  timelineState: GenesisTransitionTimelineStage;
  renderIntent: GenesisRendererRenderIntent;
  transitionProgress: number;
}>;

export type GenesisRendererConsumerUnavailableReason =
  | "RUNTIME_STATE_REFERENCE_REQUIRED"
  | "TRANSITION_TIMELINE_REFERENCE_REQUIRED"
  | "VISUAL_STATE_REFERENCE_REQUIRED";

export type GenesisRendererConsumerBlockedReason =
  | "RUNTIME_BOUNDARY_INVALID"
  | "TIMELINE_BOUNDARY_INVALID"
  | "RUNTIME_TIMELINE_REFERENCE_MISMATCH"
  | "STAGE_TIMELINE_MISMATCH"
  | "TRANSITION_PROGRESS_INVALID"
  | "VISUAL_STATE_BOUNDARY_INVALID";

export type GenesisRendererConsumerReady = Readonly<{
  status: "READY";
  consumerStatus: "GENESIS_RENDERER_CONSUMER_READY";
  source: "genesis_renderer_consumer";
  input: GenesisRendererConsumerInput;
  contract: GenesisRendererConsumerContract;
  boundary: GenesisRendererConsumerBoundary;
}>;

export type GenesisRendererConsumerUnavailable = Readonly<{
  status: "UNAVAILABLE";
  consumerStatus: "UNAVAILABLE";
  source: "genesis_renderer_consumer";
  reason: GenesisRendererConsumerUnavailableReason;
  input: GenesisRendererConsumerInput;
  contract: null;
  boundary: GenesisRendererConsumerBoundary;
}>;

export type GenesisRendererConsumerBlocked = Readonly<{
  status: "BLOCKED";
  consumerStatus: "BLOCKED";
  source: "genesis_renderer_consumer";
  reason: GenesisRendererConsumerBlockedReason;
  input: GenesisRendererConsumerInput;
  contract: null;
  boundary: GenesisRendererConsumerBoundary;
}>;

export type GenesisRendererConsumerResult =
  | GenesisRendererConsumerReady
  | GenesisRendererConsumerUnavailable
  | GenesisRendererConsumerBlocked;
