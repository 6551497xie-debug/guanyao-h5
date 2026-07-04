export type NodeTransitionLerp = {
  progress: number;
  starfieldFragmentation: number;
  directionalLightShift: number;
  node1LabelOpacity: number;
  node2LabelOpacity: number;
};

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function smooth01(value: number): number {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

export function getNodeTransitionLerp(progress: number): NodeTransitionLerp {
  const normalizedProgress = clamp01(progress);
  const perceptualProgress = smooth01(normalizedProgress);

  return {
    progress: normalizedProgress,
    starfieldFragmentation: perceptualProgress,
    directionalLightShift: perceptualProgress,
    node1LabelOpacity: 1 - perceptualProgress,
    node2LabelOpacity: perceptualProgress,
  };
}
