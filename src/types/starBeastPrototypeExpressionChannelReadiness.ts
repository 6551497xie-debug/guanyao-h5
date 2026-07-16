import type {
  StarBeastAssetPrototypeAdapterAvailable,
  StarBeastAssetPrototypeAdapterBlocked,
  StarBeastAssetPrototypeAdapterResult,
  StarBeastAssetPrototypeAdapterUnavailable,
  StarBeastPrototypeExpressionChannels,
} from "./starBeastAssetPrototypeAdapter";
import type { StarBeastRendererContractReference } from "./starBeastAssetPrototypeReadiness";

export type StarBeastPrototypeIsolationScopeReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE";
  referenceId: string;
  scope: "ISOLATED_PROTOTYPE_ONLY";
}>;

export type StarBeastPrototypeExpressionChannelReadinessInput = Readonly<{
  adapterResultReference: StarBeastAssetPrototypeAdapterResult | null;
  expressionChannelsReference: StarBeastPrototypeExpressionChannels | null;
  rendererContractReference: StarBeastRendererContractReference | null;
  isolationScopeReference: StarBeastPrototypeIsolationScopeReference | null;
}>;

type StarBeastPrototypeExpressionChannelReadinessBoundary = Readonly<{
  readinessOnly: true;
  noChannelConsumption: true;
  noRenderExecution: true;
  noCanvasConnection: true;
  noStarbeastLabConnection: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type StarBeastPrototypeExpressionChannelReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION";
  source: "star_beast_prototype_expression_channel_readiness";
  input: StarBeastPrototypeExpressionChannelReadinessInput;
  sourceAdapterResultReference: StarBeastAssetPrototypeAdapterAvailable;
  expressionChannelsReference: StarBeastPrototypeExpressionChannels;
  rendererContractReference: StarBeastRendererContractReference;
  isolationScopeReference: StarBeastPrototypeIsolationScopeReference;
  boundary: StarBeastPrototypeExpressionChannelReadinessBoundary;
}>;

export type StarBeastPrototypeExpressionChannelReadinessUnavailableReason =
  | "ADAPTER_RESULT_REFERENCE_REQUIRED"
  | "ADAPTER_RESULT_UNAVAILABLE"
  | "EXPRESSION_CHANNELS_REFERENCE_REQUIRED"
  | "RENDERER_CONTRACT_REFERENCE_REQUIRED"
  | "ISOLATION_SCOPE_REFERENCE_REQUIRED";

export type StarBeastPrototypeExpressionChannelReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_prototype_expression_channel_readiness";
  reason: StarBeastPrototypeExpressionChannelReadinessUnavailableReason;
  input: StarBeastPrototypeExpressionChannelReadinessInput;
  sourceAdapterResultReference:
    | StarBeastAssetPrototypeAdapterAvailable
    | StarBeastAssetPrototypeAdapterUnavailable
    | null;
  sourceUnavailableReason:
    | StarBeastAssetPrototypeAdapterUnavailable["reason"]
    | null;
  boundary: StarBeastPrototypeExpressionChannelReadinessBoundary;
}>;

export type StarBeastPrototypeExpressionChannelReadinessBlockedReason =
  | "ADAPTER_RESULT_BLOCKED"
  | "EXPRESSION_CHANNELS_REFERENCE_MISMATCH"
  | "RENDERER_CONTRACT_REFERENCE_MISMATCH"
  | "ISOLATION_SCOPE_REFERENCE_INVALID"
  | "ADAPTER_BOUNDARY_INVALID"
  | "EXPRESSION_CHANNEL_CONTRACT_INVALID"
  | "EXPRESSION_CHANNEL_SOURCE_MISMATCH";

export type StarBeastPrototypeExpressionChannelReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "star_beast_prototype_expression_channel_readiness";
  reason: StarBeastPrototypeExpressionChannelReadinessBlockedReason;
  input: StarBeastPrototypeExpressionChannelReadinessInput;
  sourceAdapterResultReference:
    | StarBeastAssetPrototypeAdapterAvailable
    | StarBeastAssetPrototypeAdapterBlocked;
  sourceBlockedReason:
    | StarBeastAssetPrototypeAdapterBlocked["reason"]
    | null;
  boundary: StarBeastPrototypeExpressionChannelReadinessBoundary;
}>;

export type StarBeastPrototypeExpressionChannelReadinessResult =
  | StarBeastPrototypeExpressionChannelReadinessReady
  | StarBeastPrototypeExpressionChannelReadinessUnavailable
  | StarBeastPrototypeExpressionChannelReadinessBlocked;
