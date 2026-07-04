import {
  resolveNode1ToNode2Transition,
  type Node1State,
  type Node2State,
} from "./node1ToNode2";

type Node1TransitionCheckInput = {
  mirrorActivated: boolean;
  reflectionMode?: "ACTIVE";
  starbeastSync?: true;
  timeSpent: number;
};

type NodeTransitionCheckCase = {
  input: Node1TransitionCheckInput;
  output: Node1TransitionCheckInput | Node2State;
  valid: boolean;
};

function isValidNode2State(output: Node1TransitionCheckInput | Node2State): output is Node2State {
  return (
    "separationMode" in output &&
    output.separationMode === true &&
    output.structureAwareness === "FORMING" &&
    output.emotionalStabilization === true
  );
}

function resolveCheckTransition(input: Node1TransitionCheckInput): Node1TransitionCheckInput | Node2State {
  if (!input.mirrorActivated) return input;

  return resolveNode1ToNode2Transition(
    {
      mirrorActivated: true,
      reflectionMode: "ACTIVE",
      starbeastSync: true,
    },
    input.timeSpent
  ) ?? input;
}

export function runNodeTransitionCheck(): {
  success: boolean;
  cases: NodeTransitionCheckCase[];
} {
  const inputs: Node1TransitionCheckInput[] = [
    {
      mirrorActivated: true,
      reflectionMode: "ACTIVE",
      starbeastSync: true,
      timeSpent: 1300,
    },
    {
      mirrorActivated: true,
      reflectionMode: "ACTIVE",
      starbeastSync: true,
      timeSpent: 1100,
    },
    {
      mirrorActivated: false,
      timeSpent: 2000,
    },
  ];

  const cases = inputs.map((input) => {
    const output = resolveCheckTransition(input);
    const shouldTransition = input.mirrorActivated === true && input.timeSpent > 1200;
    const transitioned = isValidNode2State(output);

    return {
      input,
      output,
      valid: shouldTransition ? transitioned : output === input,
    };
  });

  return {
    success: cases.every((entryCase) => entryCase.valid),
    cases,
  };
}

export type { Node1State, Node2State };
