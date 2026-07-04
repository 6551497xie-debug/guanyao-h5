import {
  resolveStarbeastRenderState,
  type StarbeastEntryState,
  type StarbeastRenderState,
} from "./starbeastRenderState";

type StarbeastRenderStateCheckCase = {
  input: string;
  output: StarbeastRenderState;
  valid: boolean;
};

function isValidStarbeastRenderState(output: StarbeastRenderState): boolean {
  return (
    output !== null &&
    typeof output.starfieldDensity === "number" &&
    typeof output.lightAggregationIntensity === "number" &&
    typeof output.beastEmergenceTiming === "number" &&
    typeof output.collapseAnimationTrigger === "boolean"
  );
}

export function runStarbeastRenderStateCheck(): {
  success: boolean;
  cases: StarbeastRenderStateCheckCase[];
} {
  const entryStates: StarbeastEntryState[] = [
    "INITIAL_ENTRY",
    "PRESSURE_ACTIVE",
    "BEAST_COLLAPSE_TRIGGERED",
  ];

  const cases = entryStates.map((entryState) => {
    const output = resolveStarbeastRenderState(entryState);

    return {
      input: entryState,
      output,
      valid: isValidStarbeastRenderState(output),
    };
  });

  return {
    success: cases.every((entryCase) => entryCase.valid),
    cases,
  };
}
