import { adaptStarBeastRendererInputToRenderPlan } from "./starBeastRenderPlanAdapter";
import { consumeStarBeastRenderPlan } from "./starBeastRenderPlanConsumptionService";
import type { StarBeastRenderPlanConsumptionResult } from "../types/starBeastRenderPlanConsumption";
import type { StarBeastRendererInput } from "../types/starBeastRendererContract";

export type { StarBeastRenderPlanConsumptionResult } from "../types/starBeastRenderPlanConsumption";

export type StarBeastRenderPlanEndpointInput = StarBeastRendererInput;

export function resolveStarBeastRenderPlanConsumption(
  input: StarBeastRenderPlanEndpointInput,
): StarBeastRenderPlanConsumptionResult {
  const rendererOutput = adaptStarBeastRendererInputToRenderPlan(input);

  return consumeStarBeastRenderPlan(
    Object.freeze({
      rendererOutput,
      renderPlanReference:
        rendererOutput.status === "PLANNED" ? rendererOutput.plan : null,
    }),
  );
}
