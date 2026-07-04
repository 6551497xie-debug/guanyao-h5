import { resolveNode2VisualSignal, type Node2VisualSignal } from "./node2VisualSignal";
import type { Node2State } from "../transition/node1ToNode2";

const FORMING_NODE2_STATE: Node2State = {
  separationMode: true,
  structureAwareness: "FORMING",
  emotionalStabilization: true,
};

function isValidSignal(signal: Node2VisualSignal): boolean {
  return Object.values(signal).every((value) => typeof value === "number" && value >= 0);
}

function isStableSignal(a: Node2VisualSignal, b: Node2VisualSignal): boolean {
  return (
    a.starfieldSplitIntensity === b.starfieldSplitIntensity &&
    a.directionalLightBias === b.directionalLightBias &&
    a.fieldSeparationVector === b.fieldSeparationVector &&
    a.visualTensionGradient === b.visualTensionGradient
  );
}

export function runNode2VisualSignalCheck(): {
  success: boolean;
  stable: boolean;
  signal: Node2VisualSignal;
} {
  const first = resolveNode2VisualSignal(FORMING_NODE2_STATE);
  const second = resolveNode2VisualSignal(FORMING_NODE2_STATE);
  const stable = isStableSignal(first, second);

  return {
    success: isValidSignal(first) && stable,
    stable,
    signal: first,
  };
}
