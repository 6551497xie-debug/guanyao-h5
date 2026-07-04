import { getNodeTransitionLerp } from "./nodeTransitionLerp";

type PerceptionFrame = {
  label: "ENTRY" | "NODE1" | "TRANSITION" | "NODE2";
  node1Visible: boolean;
  node2Visible: boolean;
  entryVisible: boolean;
  starfieldStable: boolean;
  starfieldDeformation: number;
  directionalLightShift: number;
  textStacking: boolean;
};

export type NodePerceptionContinuityAuditResult = {
  continuityScore: number;
  flickerDetected: boolean;
  overlapDetected: boolean;
  perceptualBreaks: string[];
};

function hasDualNodeOverlap(frame: PerceptionFrame): boolean {
  return frame.node1Visible && frame.node2Visible;
}

function hasEntryNodeOverlap(frame: PerceptionFrame): boolean {
  return frame.entryVisible && (frame.node1Visible || frame.node2Visible);
}

function hasAbruptShift(previous: PerceptionFrame, next: PerceptionFrame): boolean {
  const deformationDelta = Math.abs(next.starfieldDeformation - previous.starfieldDeformation);
  const lightDelta = Math.abs(next.directionalLightShift - previous.directionalLightShift);

  return deformationDelta > 0.65 || lightDelta > 0.65;
}

export function runNodePerceptionContinuityAudit(): NodePerceptionContinuityAuditResult {
  const node1Lerp = getNodeTransitionLerp(0);
  const midLerp = getNodeTransitionLerp(0.5);
  const node2Lerp = getNodeTransitionLerp(1);

  const frames: PerceptionFrame[] = [
    {
      label: "ENTRY",
      node1Visible: false,
      node2Visible: false,
      entryVisible: true,
      starfieldStable: true,
      starfieldDeformation: 0,
      directionalLightShift: 0,
      textStacking: false,
    },
    {
      label: "NODE1",
      node1Visible: node1Lerp.node1LabelOpacity > 0,
      node2Visible: false,
      entryVisible: false,
      starfieldStable: true,
      starfieldDeformation: node1Lerp.starfieldFragmentation,
      directionalLightShift: node1Lerp.directionalLightShift,
      textStacking: false,
    },
    {
      label: "TRANSITION",
      node1Visible: false,
      node2Visible: midLerp.node2LabelOpacity > 0,
      entryVisible: false,
      starfieldStable: true,
      starfieldDeformation: midLerp.starfieldFragmentation,
      directionalLightShift: midLerp.directionalLightShift,
      textStacking: false,
    },
    {
      label: "NODE2",
      node1Visible: false,
      node2Visible: node2Lerp.node2LabelOpacity > 0,
      entryVisible: false,
      starfieldStable: true,
      starfieldDeformation: node2Lerp.starfieldFragmentation,
      directionalLightShift: node2Lerp.directionalLightShift,
      textStacking: false,
    },
  ];

  const perceptualBreaks: string[] = [];

  frames.forEach((frame) => {
    if (hasEntryNodeOverlap(frame)) {
      perceptualBreaks.push(`${frame.label}: ENTRY_NODE_OVERLAP`);
    }
    if (hasDualNodeOverlap(frame)) {
      perceptualBreaks.push(`${frame.label}: DUAL_NODE_OVERLAP`);
    }
    if (frame.textStacking) {
      perceptualBreaks.push(`${frame.label}: TEXT_STACKING_ARTIFACT`);
    }
    if (!frame.starfieldStable) {
      perceptualBreaks.push(`${frame.label}: STARFIELD_FLICKER`);
    }
  });

  for (let index = 1; index < frames.length; index += 1) {
    const previous = frames[index - 1]!;
    const next = frames[index]!;
    if (hasAbruptShift(previous, next)) {
      perceptualBreaks.push(`${previous.label}_TO_${next.label}: TRANSITION_POP`);
    }
  }

  const flickerDetected = perceptualBreaks.some((item) => item.includes("FLICKER"));
  const overlapDetected = perceptualBreaks.some((item) => item.includes("OVERLAP"));
  const continuityScore = Math.max(0, 1 - perceptualBreaks.length * 0.2);

  return {
    continuityScore,
    flickerDetected,
    overlapDetected,
    perceptualBreaks,
  };
}
