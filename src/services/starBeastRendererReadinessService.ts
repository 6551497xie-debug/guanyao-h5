import type {
  StarBeastRendererReadinessInput,
  StarBeastRendererReadinessResult,
} from "../types/starBeastRendererReadiness";

const STAR_BEAST_RENDERER_READINESS_GUARDRAILS = Object.freeze({
  rendererImplementationDeferred: true,
  noRenderExecution: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
} as const);

export function resolveStarBeastRendererReadiness(
  input: StarBeastRendererReadinessInput,
): StarBeastRendererReadinessResult {
  const endpointResult = input.endpointResult;

  if (endpointResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_readiness",
      reason: "RENDER_PLAN_ENDPOINT_RESULT_REQUIRED",
      input,
      noEndpointResult: true,
      ...STAR_BEAST_RENDERER_READINESS_GUARDRAILS,
    });
  }

  if (endpointResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_readiness",
      reason: "RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE",
      input,
      sourceEndpointResult: endpointResult,
      sourceConsumptionUnavailableReason: endpointResult.reason,
      sourceRendererUnavailableReason: endpointResult.sourceUnavailableReason,
      ...STAR_BEAST_RENDERER_READINESS_GUARDRAILS,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL",
    source: "star_beast_renderer_readiness",
    input,
    sourceEndpointResult: endpointResult,
    renderPlanConsumptionReference: endpointResult.consumption,
    renderPlanReference: endpointResult.consumption.renderPlanReference,
    sourceRequestReference: endpointResult.consumption.sourceRequestReference,
    ...STAR_BEAST_RENDERER_READINESS_GUARDRAILS,
  });
}
