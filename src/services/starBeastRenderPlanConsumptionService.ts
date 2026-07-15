import type {
  StarBeastRenderPlanConsumption,
  StarBeastRenderPlanConsumptionInput,
  StarBeastRenderPlanConsumptionResult,
  StarBeastRenderPlanConsumptionUnavailableReason,
} from "../types/starBeastRenderPlanConsumption";
import type { StarBeastRendererOutput } from "../types/starBeastRendererContract";

const unavailable = (
  input: StarBeastRenderPlanConsumptionInput,
  reason: StarBeastRenderPlanConsumptionUnavailableReason,
  sourceRendererOutput: StarBeastRendererOutput,
): StarBeastRenderPlanConsumptionResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_render_plan_consumption",
    reason,
    input,
    sourceRendererOutput,
    sourceUnavailableReason:
      sourceRendererOutput.status === "UNAVAILABLE"
        ? sourceRendererOutput.reason
        : null,
    noRenderPlanConsumption: true,
    noRenderExecution: true,
  });

export function consumeStarBeastRenderPlan(
  input: StarBeastRenderPlanConsumptionInput,
): StarBeastRenderPlanConsumptionResult {
  const sourceRendererOutput = input.rendererOutput;

  if (sourceRendererOutput.status === "UNAVAILABLE") {
    return unavailable(
      input,
      "RENDER_PLAN_OUTPUT_UNAVAILABLE",
      sourceRendererOutput,
    );
  }

  if (input.renderPlanReference === null) {
    return unavailable(
      input,
      "RENDER_PLAN_REFERENCE_REQUIRED",
      sourceRendererOutput,
    );
  }

  if (input.renderPlanReference !== sourceRendererOutput.plan) {
    return unavailable(
      input,
      "RENDER_PLAN_REFERENCE_MISMATCH",
      sourceRendererOutput,
    );
  }

  const consumption: StarBeastRenderPlanConsumption = Object.freeze({
    semanticRole: "STAR_BEAST_RENDER_PLAN_CONSUMPTION",
    renderPlanReference: input.renderPlanReference,
    sourceRendererOutput,
    sourceRequestReference: sourceRendererOutput.input.requestReference,
    consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER",
    rendererImplementationDeferred: true,
    noRenderExecution: true,
    noPlanMutation: true,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_render_plan_consumption",
    input,
    consumption,
  });
}
