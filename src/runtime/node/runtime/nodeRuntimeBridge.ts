import {
  resolveNode1ToNode2Transition,
  type Node1State,
  type Node2State,
} from "../transition/node1ToNode2";
import {
  resolveNode2VisualSignal,
  type Node2VisualSignal,
} from "../visual/node2VisualSignal";

export type NodeRuntimeState =
  | {
      currentNode: "NODE1";
      nodeState: Node1State;
      visualState?: undefined;
    }
  | {
      currentNode: "NODE2";
      nodeState: Node2State;
      visualState: Node2VisualSignal;
    };

export function resolveNodeRuntimeState(input: {
  node1State: Node1State;
  timeSpent: number;
}): NodeRuntimeState {
  const node2State = resolveNode1ToNode2Transition(input.node1State, input.timeSpent);

  if (!node2State) {
    return {
      currentNode: "NODE1",
      nodeState: input.node1State,
    };
  }

  return {
    currentNode: "NODE2",
    nodeState: node2State,
    visualState: resolveNode2VisualSignal(node2State),
  };
}
