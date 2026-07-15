import type {
  StarBeastRenderPlanConsumptionResult,
  StarBeastRenderPlanConsumptionUnavailableReason,
} from "./starBeastRenderPlanConsumption";
import type { StarBeastRendererUnavailableReason } from "./starBeastRendererContract";

type StarBeastRenderPlanEndpointAvailable = Extract<
  StarBeastRenderPlanConsumptionResult,
  { status: "AVAILABLE" }
>;

type StarBeastRenderPlanEndpointUnavailable = Extract<
  StarBeastRenderPlanConsumptionResult,
  { status: "UNAVAILABLE" }
>;

export type StarBeastRendererReadinessInput = Readonly<{
  endpointResult: StarBeastRenderPlanConsumptionResult | null;
}>;

export type StarBeastRendererReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL";
  source: "star_beast_renderer_readiness";
  input: StarBeastRendererReadinessInput;
  sourceEndpointResult: StarBeastRenderPlanEndpointAvailable;
  renderPlanConsumptionReference: StarBeastRenderPlanEndpointAvailable["consumption"];
  renderPlanReference: StarBeastRenderPlanEndpointAvailable["consumption"]["renderPlanReference"];
  sourceRequestReference: StarBeastRenderPlanEndpointAvailable["consumption"]["sourceRequestReference"];
  rendererImplementationDeferred: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererReadinessNotReadyReason =
  "RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE";

export type StarBeastRendererReadinessNotReady = Readonly<{
  status: "NOT_READY";
  readiness: "NOT_READY";
  source: "star_beast_renderer_readiness";
  reason: StarBeastRendererReadinessNotReadyReason;
  input: StarBeastRendererReadinessInput;
  sourceEndpointResult: StarBeastRenderPlanEndpointUnavailable;
  sourceConsumptionUnavailableReason: StarBeastRenderPlanConsumptionUnavailableReason;
  sourceRendererUnavailableReason: StarBeastRendererUnavailableReason | null;
  rendererImplementationDeferred: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererReadinessUnavailableReason =
  "RENDER_PLAN_ENDPOINT_RESULT_REQUIRED";

export type StarBeastRendererReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_renderer_readiness";
  reason: StarBeastRendererReadinessUnavailableReason;
  input: StarBeastRendererReadinessInput;
  noEndpointResult: true;
  rendererImplementationDeferred: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererReadinessResult =
  | StarBeastRendererReadinessReady
  | StarBeastRendererReadinessNotReady
  | StarBeastRendererReadinessUnavailable;
