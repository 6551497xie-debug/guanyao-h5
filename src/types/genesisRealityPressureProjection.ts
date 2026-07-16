import type { GenesisPersonalRevealProjection } from "./genesisPersonalRevealProjection";

export type GenesisRealityPressureReference = Readonly<{
  referenceType: "GENESIS_REALITY_PRESSURE_REFERENCE";
  referenceId: string;
  sourceRole: "REALITY_PRESSURE_ENGINE_REFERENCE";
  pressureReferenceOnly: true;
  noRawPressureCopy: true;
}>;

export type GenesisRealityPressureInput = Readonly<{
  personalRevealProjection: GenesisPersonalRevealProjection | null;
  realityPressureReference: GenesisRealityPressureReference | null;
}>;

export type GenesisRealityPressureStage =
  | "WAITING_FOR_PERSONAL_REVEAL"
  | "PRESSURE_ENTERING"
  | "PRESSURE_PRESENT";

export type GenesisRealityPressureProjection = Readonly<{
  semanticRole: "GENESIS_REALITY_PRESSURE_PROJECTION";
  personalRevealReferenceId: string;
  pressureReferenceId: string;
  pressureExpression: Readonly<{
    fieldCompression: number;
    boundaryLoad: number;
    coreResistance: number;
    flowDeflection: number;
    temporalWeight: number;
    noIdentityExpression: true;
    noAnimalGeometry: true;
  }>;
  presenceResponse: Readonly<{
    pressureAttention: number;
    structureResponse: number;
    coreResponse: number;
    quietPersistence: number;
  }>;
  pressureStage: GenesisRealityPressureStage;
  sourceRole: "FORMAL_REALITY_PRESSURE_REFERENCE_ONLY";
  referenceOnly: true;
  identityBlind: true;
  noIdentityFactCopy: true;
  noFourSymbolMutation: true;
  noMotherCodeCalculation: true;
  noGravityInvocation: true;
  noChoiceCalculation: true;
  noCrystalGeneration: true;
  noAnimalIdentity: true;
  noAnimalGeometry: true;
  noLifeStateMutation: true;
  noRendererInvocation: true;
  noRuntimeIntegration: true;
}>;

export type GenesisRealityPressureUnavailableReason =
  | "PERSONAL_REVEAL_REQUIRED"
  | "REALITY_PRESSURE_REFERENCE_REQUIRED";

export type GenesisRealityPressureBlockedReason =
  | "PERSONAL_REVEAL_REFERENCE_INVALID"
  | "REALITY_PRESSURE_REFERENCE_INVALID"
  | "REALITY_PRESSURE_SOURCE_BOUNDARY_INVALID";

type GenesisRealityPressureBoundary = Readonly<{
  projectionOnly: true;
  referenceOnly: true;
  noIdentityCalculation: true;
  noFourSymbolMutation: true;
  noMotherCodeCalculation: true;
  noGravityInvocation: true;
  noChoiceCalculation: true;
  noCrystalGeneration: true;
  noRendererInvocation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisRealityPressureProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisRealityPressureProjection;
      input: GenesisRealityPressureInput;
      boundary: GenesisRealityPressureBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: GenesisRealityPressureUnavailableReason;
      projection: null;
      input: GenesisRealityPressureInput;
      boundary: GenesisRealityPressureBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisRealityPressureBlockedReason;
      projection: null;
      input: GenesisRealityPressureInput;
      boundary: GenesisRealityPressureBoundary;
    }>;
