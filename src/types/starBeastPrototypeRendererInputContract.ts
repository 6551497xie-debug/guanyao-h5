import type {
  StarBeastPrototypeExpressionChannelConsumptionAvailable,
  StarBeastPrototypeExpressionChannelConsumptionBlocked,
  StarBeastPrototypeExpressionChannelConsumptionResult,
  StarBeastPrototypeExpressionChannelConsumptionUnavailable,
  StarBeastPrototypeRendererInputReference,
} from "./starBeastPrototypeExpressionChannelConsumption";

export type StarBeastPrototypeRendererRequestReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_REQUEST";
  referenceId: string;
  requestPurpose: "VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION";
}>;

export type StarBeastPrototypeRendererInputContractInput = Readonly<{
  expressionChannelConsumptionResultReference:
    | StarBeastPrototypeExpressionChannelConsumptionResult
    | null;
  prototypeRendererInputReference:
    | StarBeastPrototypeRendererInputReference
    | null;
  rendererRequestReference: StarBeastPrototypeRendererRequestReference | null;
}>;

type StarBeastPrototypeRendererInputContractBoundary = Readonly<{
  inputContractOnly: true;
  noRendererInvocation: true;
  noRenderExecution: true;
  noDrawCommands: true;
  noPixelParameters: true;
  noRenderPlanGeneration: true;
  noExpressionChannelMutation: true;
  noAssetDefinitionMutation: true;
  noCanvasConnection: true;
  noStarbeastLabConnection: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastPrototypeRendererInputContract = Readonly<{
  semanticRole: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT";
  sourceConsumptionResultReference:
    StarBeastPrototypeExpressionChannelConsumptionAvailable;
  sourceInputReference: StarBeastPrototypeRendererInputReference;
  rendererRequestReference: StarBeastPrototypeRendererRequestReference;
  expressionChannelsReference:
    StarBeastPrototypeRendererInputReference["expressionChannelsReference"];
  rendererContractReference:
    StarBeastPrototypeRendererInputReference["rendererContractReference"];
  isolatedPrototypeScopeReference:
    StarBeastPrototypeRendererInputReference["isolatedPrototypeScopeReference"];
  contractStatus:
    "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS";
  rendererNeutral: true;
  referenceOnly: true;
  boundary: StarBeastPrototypeRendererInputContractBoundary;
}>;

export type StarBeastPrototypeRendererInputContractAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_prototype_renderer_input_contract";
  input: StarBeastPrototypeRendererInputContractInput;
  contract: StarBeastPrototypeRendererInputContract;
}>;

export type StarBeastPrototypeRendererInputContractUnavailableReason =
  | "EXPRESSION_CHANNEL_CONSUMPTION_RESULT_REQUIRED"
  | "EXPRESSION_CHANNEL_CONSUMPTION_UNAVAILABLE"
  | "PROTOTYPE_RENDERER_INPUT_REFERENCE_REQUIRED"
  | "PROTOTYPE_RENDERER_REQUEST_REFERENCE_REQUIRED";

export type StarBeastPrototypeRendererInputContractUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_prototype_renderer_input_contract";
  reason: StarBeastPrototypeRendererInputContractUnavailableReason;
  input: StarBeastPrototypeRendererInputContractInput;
  sourceConsumptionResultReference:
    | StarBeastPrototypeExpressionChannelConsumptionAvailable
    | StarBeastPrototypeExpressionChannelConsumptionUnavailable
    | null;
  sourceUnavailableReason:
    | StarBeastPrototypeExpressionChannelConsumptionUnavailable["reason"]
    | null;
  noInputContract: true;
  boundary: StarBeastPrototypeRendererInputContractBoundary;
}>;

export type StarBeastPrototypeRendererInputContractBlockedReason =
  | "EXPRESSION_CHANNEL_CONSUMPTION_BLOCKED"
  | "PROTOTYPE_RENDERER_INPUT_REFERENCE_MISMATCH"
  | "PROTOTYPE_RENDERER_REQUEST_REFERENCE_INVALID"
  | "PROTOTYPE_RENDERER_INPUT_REFERENCE_BOUNDARY_INVALID"
  | "EXPRESSION_CHANNEL_CONSUMPTION_BOUNDARY_INVALID";

export type StarBeastPrototypeRendererInputContractBlocked = Readonly<{
  status: "BLOCKED";
  source: "star_beast_prototype_renderer_input_contract";
  reason: StarBeastPrototypeRendererInputContractBlockedReason;
  input: StarBeastPrototypeRendererInputContractInput;
  sourceConsumptionResultReference:
    | StarBeastPrototypeExpressionChannelConsumptionAvailable
    | StarBeastPrototypeExpressionChannelConsumptionBlocked;
  sourceBlockedReason:
    | StarBeastPrototypeExpressionChannelConsumptionBlocked["reason"]
    | null;
  noInputContract: true;
  boundary: StarBeastPrototypeRendererInputContractBoundary;
}>;

export type StarBeastPrototypeRendererInputContractResult =
  | StarBeastPrototypeRendererInputContractAvailable
  | StarBeastPrototypeRendererInputContractUnavailable
  | StarBeastPrototypeRendererInputContractBlocked;
