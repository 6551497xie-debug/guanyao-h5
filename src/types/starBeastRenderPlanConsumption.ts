import type {
  StarBeastRenderPlan,
  StarBeastRendererOutput,
  StarBeastRendererUnavailableReason,
} from "./starBeastRendererContract";

type StarBeastRendererPlannedOutput = Extract<
  StarBeastRendererOutput,
  { status: "PLANNED" }
>;

export type StarBeastRenderPlanConsumptionInput = Readonly<{
  rendererOutput: StarBeastRendererOutput;
  renderPlanReference: StarBeastRenderPlan | null;
}>;

export type StarBeastRenderPlanConsumption = Readonly<{
  semanticRole: "STAR_BEAST_RENDER_PLAN_CONSUMPTION";
  renderPlanReference: StarBeastRenderPlan;
  sourceRendererOutput: StarBeastRendererPlannedOutput;
  sourceRequestReference: StarBeastRendererPlannedOutput["input"]["requestReference"];
  consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER";
  rendererImplementationDeferred: true;
  noRenderExecution: true;
  noPlanMutation: true;
}>;

export type StarBeastRenderPlanConsumptionAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_render_plan_consumption";
  input: StarBeastRenderPlanConsumptionInput;
  consumption: StarBeastRenderPlanConsumption;
}>;

export type StarBeastRenderPlanConsumptionUnavailableReason =
  | "RENDER_PLAN_OUTPUT_UNAVAILABLE"
  | "RENDER_PLAN_REFERENCE_REQUIRED"
  | "RENDER_PLAN_REFERENCE_MISMATCH";

export type StarBeastRenderPlanConsumptionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_render_plan_consumption";
  reason: StarBeastRenderPlanConsumptionUnavailableReason;
  input: StarBeastRenderPlanConsumptionInput;
  sourceRendererOutput: StarBeastRendererOutput;
  sourceUnavailableReason: StarBeastRendererUnavailableReason | null;
  noRenderPlanConsumption: true;
  noRenderExecution: true;
}>;

export type StarBeastRenderPlanConsumptionResult =
  | StarBeastRenderPlanConsumptionAvailable
  | StarBeastRenderPlanConsumptionUnavailable;
