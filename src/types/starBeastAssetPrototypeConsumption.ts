import type { StarBeastAssetDefinition } from "./starBeastAssetArchitecture";
import type {
  StarBeastAssetPrototypeReadinessBlocked,
  StarBeastAssetPrototypeReadinessReady,
  StarBeastAssetPrototypeReadinessResult,
  StarBeastAssetPrototypeReadinessUnavailable,
  StarBeastAssetVisualCompatibilityReference,
  StarBeastRendererContractReference,
} from "./starBeastAssetPrototypeReadiness";

export type StarBeastAssetPrototypeConsumptionInput = Readonly<{
  readinessResultReference: StarBeastAssetPrototypeReadinessResult;
  assetDefinitionReference: StarBeastAssetDefinition | null;
  visualStateCompatibilityReference: StarBeastAssetVisualCompatibilityReference | null;
  rendererContractReference: StarBeastRendererContractReference | null;
}>;

type StarBeastAssetPrototypeConsumptionBoundary = Readonly<{
  noAssetCreation: true;
  noRenderExecution: true;
  noCanvasConnection: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type StarBeastAssetPrototypeConsumption = Readonly<{
  semanticRole: "STAR_BEAST_ASSET_PROTOTYPE_CONSUMPTION";
  sourceReadinessReference: StarBeastAssetPrototypeReadinessReady;
  assetDefinitionReference: StarBeastAssetDefinition;
  visualStateCompatibilityReference: StarBeastAssetVisualCompatibilityReference;
  rendererContractReference: StarBeastRendererContractReference;
  consumptionStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_ADAPTER";
  referenceOnly: true;
  notRendererOutput: true;
  boundary: StarBeastAssetPrototypeConsumptionBoundary;
}>;

export type StarBeastAssetPrototypeConsumptionAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_asset_prototype_consumption";
  input: StarBeastAssetPrototypeConsumptionInput;
  consumption: StarBeastAssetPrototypeConsumption;
}>;

export type StarBeastAssetPrototypeConsumptionUnavailableReason =
  | "ASSET_PROTOTYPE_READINESS_UNAVAILABLE"
  | "ASSET_DEFINITION_REFERENCE_REQUIRED"
  | "VISUAL_STATE_COMPATIBILITY_REFERENCE_REQUIRED"
  | "RENDERER_CONTRACT_REFERENCE_REQUIRED";

export type StarBeastAssetPrototypeConsumptionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_asset_prototype_consumption";
  reason: StarBeastAssetPrototypeConsumptionUnavailableReason;
  input: StarBeastAssetPrototypeConsumptionInput;
  sourceReadinessReference:
    | StarBeastAssetPrototypeReadinessReady
    | StarBeastAssetPrototypeReadinessUnavailable;
  sourceUnavailableReason:
    | StarBeastAssetPrototypeReadinessUnavailable["reason"]
    | null;
  noPrototypeConsumption: true;
  boundary: StarBeastAssetPrototypeConsumptionBoundary;
}>;

export type StarBeastAssetPrototypeConsumptionBlockedReason =
  | "ASSET_PROTOTYPE_READINESS_BLOCKED"
  | "ASSET_DEFINITION_REFERENCE_MISMATCH"
  | "VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH"
  | "RENDERER_CONTRACT_REFERENCE_MISMATCH";

export type StarBeastAssetPrototypeConsumptionBlocked = Readonly<{
  status: "BLOCKED";
  source: "star_beast_asset_prototype_consumption";
  reason: StarBeastAssetPrototypeConsumptionBlockedReason;
  input: StarBeastAssetPrototypeConsumptionInput;
  sourceReadinessReference:
    | StarBeastAssetPrototypeReadinessReady
    | StarBeastAssetPrototypeReadinessBlocked;
  sourceBlockedReason:
    | StarBeastAssetPrototypeReadinessBlocked["reason"]
    | null;
  noPrototypeConsumption: true;
  boundary: StarBeastAssetPrototypeConsumptionBoundary;
}>;

export type StarBeastAssetPrototypeConsumptionResult =
  | StarBeastAssetPrototypeConsumptionAvailable
  | StarBeastAssetPrototypeConsumptionUnavailable
  | StarBeastAssetPrototypeConsumptionBlocked;
