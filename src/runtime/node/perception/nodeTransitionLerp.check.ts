import {
  getNodeTransitionLerp,
  type NodeTransitionLerp,
} from "./nodeTransitionLerp";

type NodeTransitionLerpCheckCase = {
  input: number | number[];
  output: NodeTransitionLerp | NodeTransitionLerp[];
  valid: boolean;
};

function stringifyLerp(output: NodeTransitionLerp): string {
  return JSON.stringify(output);
}

function isWithinUnitRange(value: number): boolean {
  return value >= 0 && value <= 1;
}

function hasValidRange(output: NodeTransitionLerp): boolean {
  return (
    isWithinUnitRange(output.progress) &&
    isWithinUnitRange(output.starfieldFragmentation) &&
    isWithinUnitRange(output.directionalLightShift) &&
    isWithinUnitRange(output.node1LabelOpacity) &&
    isWithinUnitRange(output.node2LabelOpacity)
  );
}

function isStrictlyDecreasing(values: number[]): boolean {
  return values.every((value, index) => index === 0 || value < values[index - 1]!);
}

function isStrictlyIncreasing(values: number[]): boolean {
  return values.every((value, index) => index === 0 || value > values[index - 1]!);
}

export function runNodeTransitionLerpCheck(): {
  success: boolean;
  monotonic: boolean;
  deterministic: boolean;
  cases: NodeTransitionLerpCheckCase[];
} {
  const progress0 = getNodeTransitionLerp(0);
  const progress05 = getNodeTransitionLerp(0.5);
  const progress05Repeat = getNodeTransitionLerp(0.5);
  const progress1 = getNodeTransitionLerp(1);
  const sequenceInput = [0, 0.3, 0.6, 1];
  const sequenceOutput = sequenceInput.map((progress) => getNodeTransitionLerp(progress));

  const deterministic = stringifyLerp(progress05) === stringifyLerp(progress05Repeat);
  const monotonic =
    isStrictlyDecreasing(sequenceOutput.map((output) => output.node1LabelOpacity)) &&
    isStrictlyIncreasing(sequenceOutput.map((output) => output.node2LabelOpacity));

  const cases: NodeTransitionLerpCheckCase[] = [
    {
      input: 0,
      output: progress0,
      valid:
        hasValidRange(progress0) &&
        progress0.node1LabelOpacity === 1 &&
        progress0.node2LabelOpacity === 0 &&
        progress0.starfieldFragmentation === 0,
    },
    {
      input: 0.5,
      output: progress05,
      valid:
        hasValidRange(progress05) &&
        progress05.node1LabelOpacity > 0 &&
        progress05.node1LabelOpacity < 1 &&
        progress05.node2LabelOpacity > 0 &&
        progress05.node2LabelOpacity < 1 &&
        progress05.starfieldFragmentation > 0 &&
        progress05.starfieldFragmentation < 1,
    },
    {
      input: 1,
      output: progress1,
      valid:
        hasValidRange(progress1) &&
        progress1.node1LabelOpacity === 0 &&
        progress1.node2LabelOpacity === 1 &&
        progress1.directionalLightShift === 1,
    },
    {
      input: 0.5,
      output: progress05Repeat,
      valid: deterministic,
    },
    {
      input: sequenceInput,
      output: sequenceOutput,
      valid: monotonic && sequenceOutput.every(hasValidRange),
    },
  ];

  return {
    success: deterministic && monotonic && cases.every((item) => item.valid),
    monotonic,
    deterministic,
    cases,
  };
}
