import { resolveNodeRuntimeState } from "../runtime/nodeRuntimeBridge";
import type { Node1State } from "../transition/node1ToNode2";

type NodeBrowserPerceptionEntry = {
  time: number;
  event: string;
  matchRuntime: boolean;
};

const NODE1_STATE: Node1State = {
  mirrorActivated: true,
  reflectionMode: "ACTIVE",
  starbeastSync: true,
};

function runtimeAt(time: number) {
  return resolveNodeRuntimeState({
    node1State: NODE1_STATE,
    timeSpent: time,
  });
}

export function runNodeBrowserPerceptionSmoke(): {
  consistent: boolean;
  timeline: NodeBrowserPerceptionEntry[];
} {
  const timeline: NodeBrowserPerceptionEntry[] = [
    {
      time: 0,
      event: "Node1 visible; mirror activation state active",
      matchRuntime: runtimeAt(0).currentNode === "NODE1",
    },
    {
      time: 1200,
      event: "Node2 not rendered before threshold completion",
      matchRuntime: runtimeAt(1200).currentNode === "NODE1",
    },
    {
      time: 1201,
      event: "Node2 visual hint appears: Node 2：结构开始分离",
      matchRuntime: runtimeAt(1201).currentNode === "NODE2",
    },
    {
      time: 1201,
      event: "Directional light shift and mild starfield fragmentation align with Node2 visual signal",
      matchRuntime: runtimeAt(1201).currentNode === "NODE2" && runtimeAt(1201).visualState !== undefined,
    },
    {
      time: 1201,
      event: "No routing transition occurs",
      matchRuntime: runtimeAt(1201).currentNode === "NODE2",
    },
  ];

  return {
    consistent: timeline.every((entry) => entry.matchRuntime),
    timeline,
  };
}
