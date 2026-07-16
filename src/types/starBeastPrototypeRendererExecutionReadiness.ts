import type {
  StarBeastPrototypeRendererInputContract,
  StarBeastPrototypeRendererInputContractAvailable,
  StarBeastPrototypeRendererInputContractBlocked,
  StarBeastPrototypeRendererInputContractResult,
  StarBeastPrototypeRendererInputContractUnavailable,
} from "./starBeastPrototypeRendererInputContract";

export type StarBeastPrototypeExecutionSliceReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_SLICE";
  referenceId: string;
  scope: "ISOLATED_PROTOTYPE_ONLY";
  reversible: true;
}>;

export type StarBeastPrototypeExecutionStopReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_STOP";
  referenceId: string;
  stopOnBoundaryViolation: true;
}>;

export type StarBeastPrototypeRendererExecutionReadinessInput = Readonly<{
  inputContractResultReference:
    | StarBeastPrototypeRendererInputContractResult
    | null;
  inputContractReference: StarBeastPrototypeRendererInputContract | null;
  executionSliceReference: StarBeastPrototypeExecutionSliceReference | null;
  executionStopReference: StarBeastPrototypeExecutionStopReference | null;
}>;

type StarBeastPrototypeRendererExecutionReadinessBoundary = Readonly<{
  readinessOnly: true;
  explicitExecutionAuthorizationRequired: true;
  executionAuthorizationDeferred: true;
  noRendererInvocation: true;
  noRenderExecution: true;
  noDrawCommands: true;
  noBackendSelection: true;
  noRenderPlanGeneration: true;
  noCanvasConnection: true;
  noStarbeastLabConnection: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastPrototypeRendererExecutionReadinessReady = Readonly<{
  status: "READY";
  readiness:
    "READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION";
  source: "star_beast_prototype_renderer_execution_readiness";
  input: StarBeastPrototypeRendererExecutionReadinessInput;
  sourceInputContractResultReference:
    StarBeastPrototypeRendererInputContractAvailable;
  inputContractReference: StarBeastPrototypeRendererInputContract;
  executionSliceReference: StarBeastPrototypeExecutionSliceReference;
  executionStopReference: StarBeastPrototypeExecutionStopReference;
  boundary: StarBeastPrototypeRendererExecutionReadinessBoundary;
}>;

export type StarBeastPrototypeRendererExecutionReadinessUnavailableReason =
  | "INPUT_CONTRACT_RESULT_REFERENCE_REQUIRED"
  | "INPUT_CONTRACT_RESULT_UNAVAILABLE"
  | "INPUT_CONTRACT_REFERENCE_REQUIRED"
  | "EXECUTION_SLICE_REFERENCE_REQUIRED"
  | "EXECUTION_STOP_REFERENCE_REQUIRED";

export type StarBeastPrototypeRendererExecutionReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_prototype_renderer_execution_readiness";
  reason: StarBeastPrototypeRendererExecutionReadinessUnavailableReason;
  input: StarBeastPrototypeRendererExecutionReadinessInput;
  sourceInputContractResultReference:
    | StarBeastPrototypeRendererInputContractAvailable
    | StarBeastPrototypeRendererInputContractUnavailable
    | null;
  sourceUnavailableReason:
    | StarBeastPrototypeRendererInputContractUnavailable["reason"]
    | null;
  boundary: StarBeastPrototypeRendererExecutionReadinessBoundary;
}>;

export type StarBeastPrototypeRendererExecutionReadinessBlockedReason =
  | "INPUT_CONTRACT_RESULT_BLOCKED"
  | "INPUT_CONTRACT_REFERENCE_MISMATCH"
  | "INPUT_CONTRACT_BOUNDARY_INVALID"
  | "EXECUTION_SLICE_REFERENCE_INVALID"
  | "EXECUTION_STOP_REFERENCE_INVALID";

export type StarBeastPrototypeRendererExecutionReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "star_beast_prototype_renderer_execution_readiness";
  reason: StarBeastPrototypeRendererExecutionReadinessBlockedReason;
  input: StarBeastPrototypeRendererExecutionReadinessInput;
  sourceInputContractResultReference:
    | StarBeastPrototypeRendererInputContractAvailable
    | StarBeastPrototypeRendererInputContractBlocked;
  sourceBlockedReason:
    | StarBeastPrototypeRendererInputContractBlocked["reason"]
    | null;
  boundary: StarBeastPrototypeRendererExecutionReadinessBoundary;
}>;

export type StarBeastPrototypeRendererExecutionReadinessResult =
  | StarBeastPrototypeRendererExecutionReadinessReady
  | StarBeastPrototypeRendererExecutionReadinessUnavailable
  | StarBeastPrototypeRendererExecutionReadinessBlocked;
