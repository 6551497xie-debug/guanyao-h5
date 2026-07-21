import type { GenesisManifestationExperienceStateSession } from "./genesisManifestationExperienceState";
import type { GenesisStarBeastPresenceVisualRealization } from "./genesisStarBeastPresenceVisualRealization";

export type GenesisPresenceApproachContinuityActivationInput = Readonly<{
  manifestationExperienceSession:
    | GenesisManifestationExperienceStateSession
    | null;
  presenceVisualRealization:
    | GenesisStarBeastPresenceVisualRealization
    | null;
}>;

export type GenesisPresenceApproachContinuityActivation = Readonly<{
  semanticRole: "GENESIS_PRESENCE_APPROACH_CONTINUITY_ACTIVATION";
  sourceReferenceId: string;
  bridgeReferenceId: string;
  manifestationSourceReferenceId: string;
  experienceState: "PRESENCE_APPROACHING";
  previousExperienceState: "FORCE_CONDENSING";
  visualPresenceState: "APPROACHING";
  sourcePresenceState: "DORMANT";
  presenceOrigin: "EXISTING_IN_LIFE_COORDINATE";
  appearanceMeaning: "BECOMES_VISIBLE_NOT_GENERATED";
  sourceProvenance: "REAL_USER_SESSION";
  continuity: Readonly<{
    forceCondensationCompleted: true;
    manifestationSourceContinuous: true;
    experienceAndVisualPresenceAligned: true;
  }>;
  existingExperienceSessionOnly: true;
  existingPresenceRealizationOnly: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceSourceMutation: true;
  noEngineInvocation: true;
  noRendererParameterMutation: true;
  noTimelineMutation: true;
  noFallback: true;
}>;

export type GenesisPresenceApproachContinuityActivationBoundary = Readonly<{
  continuityActivationOnly: true;
  existingExperienceSessionOnly: true;
  existingPresenceRealizationOnly: true;
  forceCondensationBeforePresenceApproach: true;
  realUserSourceOnly: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceSourceMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererParameterMutation: true;
  noTimelineSpeedMutation: true;
  noVisualAssetMutation: true;
  noFixtureSource: true;
  noStorageWrite: true;
  noFallback: true;
}>;

export type GenesisPresenceApproachContinuityActivationBlockedReason =
  | "EXPERIENCE_SESSION_REQUIRED"
  | "PRESENCE_REALIZATION_REQUIRED"
  | "EXPERIENCE_STATE_INVALID"
  | "PRESENCE_STATE_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANIFESTATION_SOURCE_REFERENCE_MISMATCH";

export type GenesisPresenceApproachContinuityActivationResult =
  | Readonly<{
      status: "READY";
      source: "genesis_presence_approach_continuity_activation";
      activation: GenesisPresenceApproachContinuityActivation;
      input: GenesisPresenceApproachContinuityActivationInput;
      boundary: GenesisPresenceApproachContinuityActivationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_presence_approach_continuity_activation";
      reason: GenesisPresenceApproachContinuityActivationBlockedReason;
      activation: null;
      input: GenesisPresenceApproachContinuityActivationInput;
      boundary: GenesisPresenceApproachContinuityActivationBoundary;
    }>;
