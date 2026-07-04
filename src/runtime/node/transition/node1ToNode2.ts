export type Node1State = {
  mirrorActivated: true;
  reflectionMode: "ACTIVE";
  starbeastSync: true;
};

export type Node2State = {
  separationMode: true;
  structureAwareness: "FORMING";
  emotionalStabilization: true;
};

export type Node2VisualSignal = {
  starfieldFragmentation: "SLIGHT";
  lightDirectionality: "DIRECTIONAL";
  splitFieldEffect: "SUBTLE";
};

export const NODE1_TO_NODE2_THRESHOLD_MS = 1200;

export const NODE2_STATE: Node2State = {
  separationMode: true,
  structureAwareness: "FORMING",
  emotionalStabilization: true,
};

export const NODE2_VISUAL_SIGNAL: Node2VisualSignal = {
  starfieldFragmentation: "SLIGHT",
  lightDirectionality: "DIRECTIONAL",
  splitFieldEffect: "SUBTLE",
};

export const NODE2_TEXT_OVERLAY = {
  text: "Node 2：结构开始分离",
  fadeInDelayMs: 800,
} as const;

export function shouldTransitionNode1ToNode2(node1State: Node1State, dwellMs: number): boolean {
  return node1State.mirrorActivated === true && dwellMs > NODE1_TO_NODE2_THRESHOLD_MS;
}

export function resolveNode1ToNode2Transition(
  node1State: Node1State,
  dwellMs: number
): Node2State | null {
  if (!shouldTransitionNode1ToNode2(node1State, dwellMs)) return null;
  return NODE2_STATE;
}
