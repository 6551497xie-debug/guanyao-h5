import type { GenesisManifestationExperienceStateSession } from "./genesisManifestationExperienceState";
import type { GenesisProductionRealityEntrySession } from "./genesisProductionRecognitionRealityEntry";
import type { GenesisStarBeastPresenceVisualRealization } from "./genesisStarBeastPresenceVisualRealization";

export type GenesisPresenceRecognitionContinuityActivationInput = Readonly<{
  manifestationExperienceSession:
    | GenesisManifestationExperienceStateSession
    | null;
  presenceVisualRealization:
    | GenesisStarBeastPresenceVisualRealization
    | null;
  recognitionRealitySession: GenesisProductionRealityEntrySession | null;
}>;

export type GenesisPresenceRecognitionContinuityActivation = Readonly<{
  semanticRole: "GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION";
  sourceReferenceId: string;
  bridgeReferenceId: string;
  manifestationSourceReferenceId: string;
  experienceState: "PRESENCE_RECOGNIZED";
  previousExperienceState: "PRESENCE_APPROACHING";
  visualPresenceState: "RECOGNIZED";
  sourcePresenceState: "DORMANT";
  recognitionPhase: "AWAITING_REALITY_ENTRY_CONFIRMATION";
  recognitionConfirmed: true;
  presenceOrigin: "EXISTING_IN_LIFE_COORDINATE";
  recognitionMeaning: "RECOGNIZES_EXISTING_PRESENCE";
  sourceProvenance: "REAL_USER_SESSION";
  continuity: Readonly<{
    presenceApproachCompleted: true;
    explicitRecognitionConfirmed: true;
    manifestationSourceContinuous: true;
    experienceAndVisualPresenceAligned: true;
  }>;
  existingExperienceSessionOnly: true;
  existingPresenceRealizationOnly: true;
  existingRecognitionSessionOnly: true;
  noAutomaticRecognition: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceSourceMutation: true;
  noEngineInvocation: true;
  noRendererParameterMutation: true;
  noTimelineMutation: true;
  noRealityEntry: true;
  noFallback: true;
}>;

export type GenesisPresenceRecognitionContinuityActivationBoundary = Readonly<{
  continuityActivationOnly: true;
  explicitRecognitionConfirmationRequired: true;
  presenceApproachBeforeRecognition: true;
  realUserSourceOnly: true;
  noAutomaticRecognition: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceSourceMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererParameterMutation: true;
  noTimelineSpeedMutation: true;
  noVisualAssetMutation: true;
  noRealityEntry: true;
  noFixtureSource: true;
  noStorageWrite: true;
  noFallback: true;
}>;

export type GenesisPresenceRecognitionContinuityActivationBlockedReason =
  | "EXPERIENCE_SESSION_REQUIRED"
  | "PRESENCE_REALIZATION_REQUIRED"
  | "RECOGNITION_SESSION_REQUIRED"
  | "EXPERIENCE_STATE_INVALID"
  | "PRESENCE_STATE_INVALID"
  | "EXPLICIT_RECOGNITION_REQUIRED"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANIFESTATION_SOURCE_REFERENCE_MISMATCH";

export type GenesisPresenceRecognitionContinuityActivationResult =
  | Readonly<{
      status: "READY";
      source: "genesis_presence_recognition_continuity_activation";
      activation: GenesisPresenceRecognitionContinuityActivation;
      input: GenesisPresenceRecognitionContinuityActivationInput;
      boundary: GenesisPresenceRecognitionContinuityActivationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_presence_recognition_continuity_activation";
      reason: GenesisPresenceRecognitionContinuityActivationBlockedReason;
      activation: null;
      input: GenesisPresenceRecognitionContinuityActivationInput;
      boundary: GenesisPresenceRecognitionContinuityActivationBoundary;
    }>;
