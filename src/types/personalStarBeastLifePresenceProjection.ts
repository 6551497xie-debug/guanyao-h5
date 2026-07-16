import type { PersonalStarBeastRenderPlan } from "./personalStarBeastRenderPlan";
import type {
  GenesisTimeSequenceRecognitionProjection,
  GenesisTimeSequenceRecognitionStage,
} from "./genesisTimeSequenceRecognitionProjection";

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
  sourcePlanSemanticRole: PersonalStarBeastRenderPlan["semanticRole"];
  renderPlanOnly: true;
  rendererParametersOnly: true;
  identityBlind: true;
  noLifeFactCopy: true;
  noAnimalGeometry: true;
}>;
