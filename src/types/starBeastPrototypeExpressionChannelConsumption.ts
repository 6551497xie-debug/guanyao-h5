import type { StarBeastAssetPrototypeAdapterAvailable } from "./starBeastAssetPrototypeAdapter";
import type { StarBeastRendererContractReference } from "./starBeastAssetPrototypeReadiness";
import type {
  StarBeastPrototypeExpressionChannelReadinessBlocked,
  StarBeastPrototypeExpressionChannelReadinessReady,
  StarBeastPrototypeExpressionChannelReadinessResult,
  StarBeastPrototypeExpressionChannelReadinessUnavailable,
  StarBeastPrototypeIsolationScopeReference,
} from "./starBeastPrototypeExpressionChannelReadiness";

export type StarBeastPrototypeExpressionChannelConsumptionInput = Readonly<{
  expressionChannelReadinessReference:
    | StarBeastPrototypeExpressionChannelReadinessResult
    | null;
  prototypeAdapterReference: StarBeastAssetPrototypeAdapterAvailable | null;
  rendererContractReference: StarBeastRendererContractReference | null;
  isolatedPrototypeScopeReference:
    | StarBeastPrototypeIsolationScopeReference
    | null;
}>;

export type StarBeastPrototypeRendererInputReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_REFERENCE";
  sourceReadinessReference: StarBeastPrototypeExpressionChannelReadinessReady;
  prototypeAdapterReference: StarBeastAssetPrototypeAdapterAvailable;
  expressionChannelsReference:
    StarBeastPrototypeExpressionChannelReadinessReady["expressionChannelsReference"];
  rendererContractReference: StarBeastRendererContractReference;
  isolatedPrototypeScopeReference: StarBeastPrototypeIsolationScopeReference;
  stableConsumptionReference: true;
  notRenderInput: true;
  notRenderPlan: true;
  notVisualOutput: true;
  noVisualParametersCopied: true;
}>;

type StarBeastPrototypeExpressionChannelConsumptionBoundary = Readonly<{
  referenceConsumptionOnly: true;
  noRendererInvocation: true;
  noRenderPlanGeneration: true;
  noExpressionChannelMutation: true;
  noAssetDefinitionMutation: true;
  noCanvasConnection: true;
  noStarbeastLabConnection: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastPrototypeExpressionChannelConsumption = Readonly<{
  semanticRole: "STAR_BEAST_PROTOTYPE_EXPRESSION_CHANNEL_CONSUMPTION";
  sourceReadinessReference: StarBeastPrototypeExpressionChannelReadinessReady;
  prototypeRendererInputReference: StarBeastPrototypeRendererInputReference;
  consumptionStatus: "AVAILABLE_FOR_FUTURE_ISOLATED_PROTOTYPE_RENDERER";
  boundary: StarBeastPrototypeExpressionChannelConsumptionBoundary;
}>;

export type StarBeastPrototypeExpressionChannelConsumptionAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_prototype_expression_channel_consumption";
    input: StarBeastPrototypeExpressionChannelConsumptionInput;
    consumption: StarBeastPrototypeExpressionChannelConsumption;
  }>;

export type StarBeastPrototypeExpressionChannelConsumptionUnavailableReason =
  | "EXPRESSION_CHANNEL_READINESS_REFERENCE_REQUIRED"
  | "EXPRESSION_CHANNEL_READINESS_UNAVAILABLE"
  | "PROTOTYPE_ADAPTER_REFERENCE_REQUIRED"
  | "RENDERER_CONTRACT_REFERENCE_REQUIRED"
  | "ISOLATED_PROTOTYPE_SCOPE_REFERENCE_REQUIRED";

export type StarBeastPrototypeExpressionChannelConsumptionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_prototype_expression_channel_consumption";
    reason: StarBeastPrototypeExpressionChannelConsumptionUnavailableReason;
    input: StarBeastPrototypeExpressionChannelConsumptionInput;
    sourceReadinessReference:
      | StarBeastPrototypeExpressionChannelReadinessReady
      | StarBeastPrototypeExpressionChannelReadinessUnavailable
      | null;
    sourceUnavailableReason:
      | StarBeastPrototypeExpressionChannelReadinessUnavailable["reason"]
      | null;
    noPrototypeRendererInputReference: true;
    boundary: StarBeastPrototypeExpressionChannelConsumptionBoundary;
  }>;

export type StarBeastPrototypeExpressionChannelConsumptionBlockedReason =
  | "EXPRESSION_CHANNEL_READINESS_BLOCKED"
  | "PROTOTYPE_ADAPTER_REFERENCE_MISMATCH"
  | "RENDERER_CONTRACT_REFERENCE_MISMATCH"
  | "ISOLATED_PROTOTYPE_SCOPE_REFERENCE_MISMATCH"
  | "ISOLATED_PROTOTYPE_SCOPE_REFERENCE_INVALID"
  | "READINESS_BOUNDARY_INVALID";

export type StarBeastPrototypeExpressionChannelConsumptionBlocked = Readonly<{
  status: "BLOCKED";
  source: "star_beast_prototype_expression_channel_consumption";
  reason: StarBeastPrototypeExpressionChannelConsumptionBlockedReason;
  input: StarBeastPrototypeExpressionChannelConsumptionInput;
  sourceReadinessReference:
    | StarBeastPrototypeExpressionChannelReadinessReady
    | StarBeastPrototypeExpressionChannelReadinessBlocked;
  sourceBlockedReason:
    | StarBeastPrototypeExpressionChannelReadinessBlocked["reason"]
    | null;
  noPrototypeRendererInputReference: true;
  boundary: StarBeastPrototypeExpressionChannelConsumptionBoundary;
}>;

export type StarBeastPrototypeExpressionChannelConsumptionResult =
  | StarBeastPrototypeExpressionChannelConsumptionAvailable
  | StarBeastPrototypeExpressionChannelConsumptionUnavailable
  | StarBeastPrototypeExpressionChannelConsumptionBlocked;
