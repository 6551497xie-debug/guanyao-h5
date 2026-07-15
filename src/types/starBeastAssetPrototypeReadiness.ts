import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type { StarBeastAssetDefinition } from "./starBeastAssetArchitecture";

export type StarBeastAssetVisualCompatibilityReference = Readonly<{
  referenceType: "STAR_BEAST_VISUAL_STATE_COMPATIBILITY";
  referenceId: string;
}>;

export type StarBeastRendererContractReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_CONTRACT";
  referenceId: string;
}>;

export type StarBeastAssetPrototypeReadinessInput = Readonly<{
  assetDefinitionReference: StarBeastAssetDefinition | null;
  lifeArchetypeProfileReference: LifeArchetypeProfile | null;
  visualStateCompatibilityReference: StarBeastAssetVisualCompatibilityReference | null;
  rendererContractReference: StarBeastRendererContractReference | null;
}>;

export type StarBeastAssetPrototypeReadinessUnavailableReason =
  | "ASSET_DEFINITION_REQUIRED"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED"
  | "VISUAL_STATE_COMPATIBILITY_REFERENCE_REQUIRED"
  | "RENDERER_CONTRACT_REFERENCE_REQUIRED"
  | "ASSET_VISUAL_LAYER_MISSING";

export type StarBeastAssetPrototypeReadinessBlockedReason =
  | "LIFE_ARCHETYPE_SOURCE_MISMATCH"
  | "VISUAL_STATE_COMPATIBILITY_REFERENCE_INVALID"
  | "RENDERER_CONTRACT_REFERENCE_INVALID"
  | "ASSET_ARCHITECTURE_BOUNDARY_INVALID";

type StarBeastAssetPrototypeReadinessBoundary = Readonly<{
  noAssetCreation: true;
  noConsumption: true;
  noRenderExecution: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type StarBeastAssetPrototypeReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_PROTOTYPE_RENDERER_CONSUMPTION";
  source: "star_beast_asset_prototype_readiness";
  input: StarBeastAssetPrototypeReadinessInput;
  assetDefinitionReference: StarBeastAssetDefinition;
  lifeArchetypeProfileReference: LifeArchetypeProfile;
  visualStateCompatibilityReference: StarBeastAssetVisualCompatibilityReference;
  rendererContractReference: StarBeastRendererContractReference;
  boundary: StarBeastAssetPrototypeReadinessBoundary;
}>;

export type StarBeastAssetPrototypeReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_asset_prototype_readiness";
  reason: StarBeastAssetPrototypeReadinessUnavailableReason;
  missingLayers: readonly string[];
  input: StarBeastAssetPrototypeReadinessInput;
  boundary: StarBeastAssetPrototypeReadinessBoundary;
}>;

export type StarBeastAssetPrototypeReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "star_beast_asset_prototype_readiness";
  reason: StarBeastAssetPrototypeReadinessBlockedReason;
  input: StarBeastAssetPrototypeReadinessInput;
  boundary: StarBeastAssetPrototypeReadinessBoundary;
}>;

export type StarBeastAssetPrototypeReadinessResult =
  | StarBeastAssetPrototypeReadinessReady
  | StarBeastAssetPrototypeReadinessUnavailable
  | StarBeastAssetPrototypeReadinessBlocked;
