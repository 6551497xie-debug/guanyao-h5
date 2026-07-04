import type { Node2State } from "../transition/node1ToNode2";

export type Node2VisualSignal = {
  starfieldSplitIntensity: number;
  directionalLightBias: number;
  fieldSeparationVector: number;
  visualTensionGradient: number;
};

export function resolveNode2VisualSignal(node2State: Node2State): Node2VisualSignal {
  const separationFactor = node2State.separationMode ? 1 : 0;
  const awarenessFactor = node2State.structureAwareness === "FORMING" ? 1 : 0;
  const stabilityAnchor = node2State.emotionalStabilization ? 0.18 : 0;

  return {
    starfieldSplitIntensity: 0.32 + separationFactor * 0.28,
    directionalLightBias: 0.24 + separationFactor * 0.46,
    fieldSeparationVector: 0.18 + awarenessFactor * 0.52,
    visualTensionGradient: Math.max(0, 0.56 + separationFactor * 0.2 - stabilityAnchor),
  };
}
