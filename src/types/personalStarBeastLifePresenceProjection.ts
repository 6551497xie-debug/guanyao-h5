import type { PersonalStarBeastRenderPlan } from "./personalStarBeastRenderPlan";
import type {
  GenesisTimeSequenceRecognitionProjection,
  GenesisTimeSequenceRecognitionStage,
} from "./genesisTimeSequenceRecognitionProjection";
import type { GenesisBirthMansionIgnitionProjection } from "./genesisBirthMansionIgnitionProjection";
import type { GenesisFourSymbolAlignmentProjection } from "./genesisFourSymbolAlignmentProjection";

export type PersonalStarBeastLifePresenceProjection = Readonly<{
  semanticRole: "PERSONAL_STAR_BEAST_LIFE_PRESENCE_PROJECTION";
  sourceRenderPlanReferenceId: string;
  corePresence: Readonly<{
    influenceRadius: number;
    coherence: number;
    breathingAmplitude: number;
    lightReach: number;
    aggregationStrength: number;
  }>;
  stellarSkeleton: Readonly<{
    axisAngle: number;
    spineLength: number;
    spineSegments: number;
    branchCount: number;
    branchSpread: number;
    branchTaper: number;
    hierarchyDepth: number;
    nodeScale: number;
  }>;
  morphologicalField: Readonly<{
    mode: "EXPANSIVE" | "CONVERGING" | "WRAPPED" | "STEADY";
    fieldScale: number;
    bend: number;
    enclosure: number;
    flowDirection: number;
    boundarySoftness: number;
    spatialContraction: number;
    postureBias: number;
    nodeDistributionBias: number;
  }>;
  timeSequenceResponse: Readonly<{
    recognitionStage: GenesisTimeSequenceRecognitionStage;
    cosmicResponseStrength: number;
    fieldGathering: number;
    temporalPhase: number;
    presenceIntensity: number;
    sourceProjectionReferenceId: string | null;
  }>;
  timeSequenceProjectionReference: GenesisTimeSequenceRecognitionProjection | null;
  birthMansionIgnitionResponse: Readonly<{
    ignitionStage: "WAITING_FOR_TIME_RECOGNITION" | "SEED_APPROACHING" | "SEED_CLAIMED";
    claimStrength: number;
    fieldConvergence: number;
    presenceIntensity: number;
    sourceProjectionReferenceId: string | null;
  }>;
  birthMansionIgnitionProjectionReference: GenesisBirthMansionIgnitionProjection | null;
  morphologicalFieldAlignmentResponse: Readonly<{
    alignmentStage: "WAITING_FOR_SEED_CLAIM" | "FIELD_FORMING" | "FIELD_ALIGNED";
    fieldVisibility: number;
    envelopeScale: number;
    presenceIntensity: number;
    sourceProjectionReferenceId: string | null;
  }>;
  morphologicalFieldAlignmentProjectionReference: GenesisFourSymbolAlignmentProjection | null;
  sourcePlanSemanticRole: PersonalStarBeastRenderPlan["semanticRole"];
  renderPlanOnly: true;
  rendererParametersOnly: true;
  identityBlind: true;
  noLifeFactCopy: true;
  noAnimalGeometry: true;
}>;
