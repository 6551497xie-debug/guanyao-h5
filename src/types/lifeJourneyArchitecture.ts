import type {
  RealityCrystalExperienceArchitecture,
} from "./realityCrystalExperienceArchitecture";

export type LifeJourneyGenesisLayer = Readonly<{
  semanticRole: "GENESIS_LIFE_SOURCE_LAYER";
  answer: "WHAT_LIFE_AM_I";
  source: "TIME_STAR_SYMBOL_HEXAGRAM_FORCE_STAR_BEAST";
  boundary: "DOES_NOT_INTERPRET_REALITY";
  noRealityInterpretation: true;
  noArchiveMutation: true;
}>;

export type LifeJourneyRealityLayer = Readonly<{
  semanticRole: "REALITY_EXPERIENCE_LAYER";
  answer: "WHAT_AM_I_EXPERIENCING";
  includes: readonly [
    "PRESSURE_RECOGNITION",
    "GRAVITY_EXPERIENCE",
    "CHOICE_SPACE",
  ];
  boundary: "DOES_NOT_MODIFY_GENESIS";
  noGenesisMutation: true;
  noIdentityRedefinition: true;
}>;

export type LifeJourneyTransformationLayer = Readonly<{
  semanticRole: "TRANSFORMATION_LAYER";
  answer: "DID_NEW_RESPONSE_OCCUR";
  source: "CHOICE_EXPERIENCE";
  observationMode: "CHANGE_NOT_EVALUATION";
  noChoiceEvaluation: true;
  noBehaviorScore: true;
}>;

export type LifeJourneyCrystalLayer = Readonly<{
  semanticRole: "CRYSTAL_DEPOSITION_LAYER";
  answer: "WHAT_CHANGE_REMAINS";
  source: "TRANSFORMATION_EXPERIENCE";
  depositionMode: "CHANGE_IMPRINT_NOT_REWARD";
  noReward: true;
  noLevel: true;
  noPersonalityRedefinition: true;
  noCrystalRecord: true;
}>;

export type LifeJourneyArchiveBoundary = Readonly<{
  semanticRole: "FUTURE_ARCHIVE_BOUNDARY";
  answer: "HOW_FUTURE_HOLDS_CHANGE";
  boundaryMode: "FUTURE_DIRECTION_ONLY";
  noArchiveImplementation: true;
  noStorageSchema: true;
  noPersistence: true;
  noUserData: true;
  noGenesisRedefinition: true;
  noCrystalMutation: true;
}>;

export type LifeJourneyGenesisReference = Readonly<{
  referenceType: "GENESIS_ARCHITECTURE_REFERENCE";
  referenceId: string;
  sourceRole: "GENESIS_VISUAL_SEMANTIC_CHAIN";
  noRealityInterpretation: true;
  noIdentityCalculation: true;
  noUserData: true;
}>;

export type LifeJourneyRealityReference = Readonly<{
  referenceType: "REALITY_ARCHITECTURE_REFERENCE";
  referenceId: string;
  sourceRole: "PRESSURE_GRAVITY_CHOICE_ARCHITECTURES";
  noGenesisMutation: true;
  noIdentityRedefinition: true;
  noStorage: true;
  noUserData: true;
}>;

export type LifeJourneyArchitectureBoundary = Readonly<{
  architectureReviewOnly: true;
  lifecycleSemanticOnly: true;
  noStorageSchema: true;
  noStorageWrite: true;
  noUserBinding: true;
  noCrystalGeneration: true;
  noArchiveGeneration: true;
  noIdentityCalculation: true;
  noGenesisMutation: true;
  noRealityCalculation: true;
  noChoiceMutation: true;
  noCrystalMutation: true;
  noUserData: true;
  noRendererInvocation: true;
  noUiIntegration: true;
  noProductionIntegration: true;
  isolatedReviewOnly: true;
}>;

export type LifeJourneyArchitecture = Readonly<{
  semanticRole: "LIFE_JOURNEY_ARCHITECTURE";
  genesisLayer: LifeJourneyGenesisLayer;
  realityLayer: LifeJourneyRealityLayer;
  transformationLayer: LifeJourneyTransformationLayer;
  crystalLayer: LifeJourneyCrystalLayer;
  archiveBoundary: LifeJourneyArchiveBoundary;
  genesisReference: LifeJourneyGenesisReference;
  realityReference: LifeJourneyRealityReference;
  crystalReference: RealityCrystalExperienceArchitecture;
  causalSequence: readonly [
    "GENESIS",
    "REALITY",
    "TRANSFORMATION",
    "CRYSTAL",
    "ARCHIVE_BOUNDARY",
  ];
  userJourney: readonly [
    "ENTER_COSMOS",
    "DELIVER_TIME",
    "SEE_LIFE",
    "RECOGNIZE_SELF",
    "FACE_REALITY",
    "OBSERVE_PRESSURE",
    "SEE_INERTIA",
    "OPEN_CHOICE",
    "PRODUCE_RESPONSE",
    "LEAVE_CHANGE",
    "FUTURE_CARRY",
  ];
  boundary: LifeJourneyArchitectureBoundary;
}>;

export type LifeJourneyArchitectureInput = Readonly<{
  genesisReference: LifeJourneyGenesisReference | null;
  realityReference: LifeJourneyRealityReference | null;
  crystalExperienceArchitecture: RealityCrystalExperienceArchitecture | null;
}>;

export type LifeJourneyArchitectureUnavailableReason =
  | "GENESIS_REFERENCE_REQUIRED"
  | "REALITY_REFERENCE_REQUIRED"
  | "CRYSTAL_EXPERIENCE_ARCHITECTURE_REQUIRED";

export type LifeJourneyArchitectureBlockedReason =
  | "GENESIS_REFERENCE_INVALID"
  | "REALITY_REFERENCE_INVALID"
  | "CRYSTAL_EXPERIENCE_ARCHITECTURE_INVALID"
  | "LIFE_JOURNEY_CAUSAL_SEQUENCE_INVALID"
  | "ARCHIVE_BOUNDARY_INVALID";

export type LifeJourneyArchitectureReady = Readonly<{
  status: "READY";
  readiness: "FUTURE_ARCHIVE_BOUNDARY_READY";
  source: "life_journey_architecture";
  input: LifeJourneyArchitectureInput;
  architecture: LifeJourneyArchitecture;
  boundary: LifeJourneyArchitectureBoundary;
}>;

export type LifeJourneyArchitectureUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "life_journey_architecture";
  reason: LifeJourneyArchitectureUnavailableReason;
  input: LifeJourneyArchitectureInput;
  architecture: null;
  boundary: LifeJourneyArchitectureBoundary;
}>;

export type LifeJourneyArchitectureBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "life_journey_architecture";
  reason: LifeJourneyArchitectureBlockedReason;
  input: LifeJourneyArchitectureInput;
  architecture: null;
  boundary: LifeJourneyArchitectureBoundary;
}>;

export type LifeJourneyArchitectureResult =
  | LifeJourneyArchitectureReady
  | LifeJourneyArchitectureUnavailable
  | LifeJourneyArchitectureBlocked;
