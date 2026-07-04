import { resolveNodeRuntimeState } from "./nodeRuntimeBridge";
import type { Node1State } from "../transition/node1ToNode2";

type NodeRuntimeBridgeCheckInput = {
  node1State: Record<string, never>;
  timeSpent: number;
};

type NodeRuntimeBridgeCheckResult = {
  input: NodeRuntimeBridgeCheckInput;
  output: ReturnType<typeof resolveNodeRuntimeState>;
  valid: boolean;
};

const ACTIVE_NODE1_STATE: Node1State = {
  mirrorActivated: true,
  reflectionMode: "ACTIVE",
  starbeastSync: true,
};

function resolveCheckInput(input: NodeRuntimeBridgeCheckInput): ReturnType<typeof resolveNodeRuntimeState> {
  return resolveNodeRuntimeState({
    node1State: ACTIVE_NODE1_STATE,
    timeSpent: input.timeSpent,
  });
}

function stringifyOutput(output: ReturnType<typeof resolveNodeRuntimeState>): string {
  return JSON.stringify(output);
}

export function runNodeRuntimeBridgeCheck(): {
  success: boolean;
  deterministic: boolean;
  results: NodeRuntimeBridgeCheckResult[];
} {
  const case1: NodeRuntimeBridgeCheckInput = {
    node1State: {},
    timeSpent: 1100,
  };
  const case2: NodeRuntimeBridgeCheckInput = {
    node1State: {},
    timeSpent: 1300,
  };

  const case1Output = resolveCheckInput(case1);
  const case2Output = resolveCheckInput(case2);
  const case2RepeatOutput = resolveCheckInput(case2);
  const deterministic = stringifyOutput(case2Output) === stringifyOutput(case2RepeatOutput);

  const results: NodeRuntimeBridgeCheckResult[] = [
    {
      input: case1,
      output: case1Output,
      valid: case1Output.currentNode === "NODE1" && case1Output.visualState === undefined,
    },
    {
      input: case2,
      output: case2Output,
      valid: case2Output.currentNode === "NODE2" && case2Output.visualState !== undefined,
    },
    {
      input: case2,
      output: case2RepeatOutput,
      valid: deterministic,
    },
  ];

  return {
    success: deterministic && results.every((result) => result.valid),
    deterministic,
    results,
  };
}
