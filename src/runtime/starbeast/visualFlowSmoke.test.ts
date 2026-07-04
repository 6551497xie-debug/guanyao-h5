import {
  resolveStarbeastRenderState,
  type StarbeastEntryState,
  type StarbeastRenderState,
} from "./starbeastRenderState";

const BEAST_COLLAPSE_VISUAL_EVENT = "BEAST_COLLAPSE_VISUAL_EVENT";

type StarbeastVisualStep =
  | "STARFIELD_RENDERS"
  | "TOP_TEXT_APPEARS"
  | "LIGHT_AGGREGATION_BEGINS"
  | "STARBEAST_EMERGES"
  | "STARBEAST_CLICK_COLLAPSE";

type StarbeastVisualFlowCase = {
  step: StarbeastVisualStep;
  entryState: StarbeastEntryState;
  renderState: StarbeastRenderState;
  event: typeof BEAST_COLLAPSE_VISUAL_EVENT | null;
  valid: boolean;
};

const EXPECTED_SEQUENCE: StarbeastVisualStep[] = [
  "STARFIELD_RENDERS",
  "TOP_TEXT_APPEARS",
  "LIGHT_AGGREGATION_BEGINS",
  "STARBEAST_EMERGES",
  "STARBEAST_CLICK_COLLAPSE",
];

const VISUAL_SEQUENCE: Array<{
  step: StarbeastVisualStep;
  entryState: StarbeastEntryState;
  event: typeof BEAST_COLLAPSE_VISUAL_EVENT | null;
}> = [
  { step: "STARFIELD_RENDERS", entryState: "starfield_idle", event: null },
  { step: "TOP_TEXT_APPEARS", entryState: "starfield_idle", event: null },
  { step: "LIGHT_AGGREGATION_BEGINS", entryState: "28_lunar_assembly", event: null },
  { step: "STARBEAST_EMERGES", entryState: "beast_approach", event: null },
  {
    step: "STARBEAST_CLICK_COLLAPSE",
    entryState: "BEAST_COLLAPSE_TRIGGERED",
    event: BEAST_COLLAPSE_VISUAL_EVENT,
  },
];

function isSequenceInOrder(sequence: StarbeastVisualStep[]): boolean {
  if (sequence.length !== EXPECTED_SEQUENCE.length) return false;
  return sequence.every((step, index) => step === EXPECTED_SEQUENCE[index]);
}

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function isValidVisualStep(step: StarbeastVisualStep, renderState: StarbeastRenderState): boolean {
  const renderStateComplete =
    isFiniteNumber(renderState.starfieldDensity) &&
    isFiniteNumber(renderState.lightAggregationIntensity) &&
    isFiniteNumber(renderState.beastEmergenceTiming) &&
    typeof renderState.collapseAnimationTrigger === "boolean";

  if (!renderStateComplete) return false;

  if (step === "STARFIELD_RENDERS") {
    return renderState.starfieldDensity > 0;
  }

  if (step === "LIGHT_AGGREGATION_BEGINS") {
    return renderState.lightAggregationIntensity > 0;
  }

  if (step === "STARBEAST_EMERGES") {
    return renderState.beastEmergenceTiming > 0;
  }

  if (step === "STARBEAST_CLICK_COLLAPSE") {
    return renderState.collapseAnimationTrigger;
  }

  return true;
}

export function runStarbeastVisualFlowSmokeTest(): {
  success: boolean;
  cases: StarbeastVisualFlowCase[];
  orderValid: boolean;
  visualContinuity: boolean;
  temporalCorrectness: boolean;
  interactionCorrectness: boolean;
} {
  const cases = VISUAL_SEQUENCE.map(({ step, entryState, event }) => {
    const renderState = resolveStarbeastRenderState(entryState);

    return {
      step,
      entryState,
      renderState,
      event,
      valid: isValidVisualStep(step, renderState),
    };
  });

  const orderValid = isSequenceInOrder(cases.map((entryCase) => entryCase.step));
  const visualContinuity = cases.every((entryCase) => entryCase.renderState.starfieldDensity >= 0) &&
    cases.some((entryCase) => entryCase.renderState.lightAggregationIntensity > 0);
  const temporalCorrectness = cases.every((entryCase) => entryCase.renderState.beastEmergenceTiming >= 0);
  const interactionCorrectness = cases.every((entryCase) => {
    if (entryCase.step !== "STARBEAST_CLICK_COLLAPSE") return entryCase.event === null;
    return entryCase.event === BEAST_COLLAPSE_VISUAL_EVENT && entryCase.renderState.collapseAnimationTrigger;
  });

  return {
    success:
      orderValid &&
      visualContinuity &&
      temporalCorrectness &&
      interactionCorrectness &&
      cases.every((entryCase) => entryCase.valid),
    cases,
    orderValid,
    visualContinuity,
    temporalCorrectness,
    interactionCorrectness,
  };
}
