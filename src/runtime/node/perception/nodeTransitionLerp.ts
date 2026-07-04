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

function easeIn(value: number): number {
  const t = clamp01(value);
  return t * t;
}

function easeOut(value: number): number {
  const t = clamp01(value);
  return 1 - Math.pow(1 - t, 2);
}

export function getNodeTransitionLerp(progress: number): NodeTransitionLerp {
  const normalizedProgress = clamp01(progress);
  const directionalProgress = smooth01(normalizedProgress);
  const fragmentationProgress = smooth01((normalizedProgress - 0.18) / 0.82);
  const node1FadeOut = easeOut((normalizedProgress - 0.08) / 0.72);
  const node2FadeIn = easeIn((normalizedProgress - 0.24) / 0.76);

  return {
    progress: normalizedProgress,
    starfieldFragmentation: fragmentationProgress * 0.72,
    directionalLightShift: directionalProgress,
    node1LabelOpacity: 1 - node1FadeOut,
    node2LabelOpacity: node2FadeIn,
  };
}
