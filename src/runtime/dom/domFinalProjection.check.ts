import {
  resolveFinalDOMProjection,
  type FinalDOMProjection,
} from "./domFinalProjection";
import type { NodeRuntimeState } from "../node/runtime/nodeRuntimeBridge";

type DomFinalProjectionCheckResult = {
  input: NodeRuntimeState;
  output: FinalDOMProjection;
  valid: boolean;
};

const NODE1_RUNTIME_STATE: NodeRuntimeState = {
  currentNode: "NODE1",
  nodeState: {
    mirrorActivated: true,
    reflectionMode: "ACTIVE",
    starbeastSync: true,
  },
};

const NODE2_RUNTIME_STATE: NodeRuntimeState = {
  currentNode: "NODE2",
  nodeState: {
    separationMode: true,
    structureAwareness: "FORMING",
    emotionalStabilization: true,
  },
  visualState: {
    starfieldSplitIntensity: 1,
    directionalLightBias: 1,
    fieldSeparationVector: 1,
    visualTensionGradient: 1,
  },
};

function isEmptyOverlay(output: FinalDOMProjection): boolean {
  return Object.keys(output.visualOverlay).length === 0;
}

function isNode2OverlayContract(output: FinalDOMProjection): boolean {
  return (
    output.visualOverlay.starfield === true &&
    output.visualOverlay.directionalLight === true &&
    output.visualOverlay.splitField === true
  );
}

function stringifyOutput(output: FinalDOMProjection): string {
  return JSON.stringify(output);
}

export function runDomFinalProjectionCheck(): {
  success: boolean;
  deterministic: boolean;
  results: DomFinalProjectionCheckResult[];
} {
  const node1Output = resolveFinalDOMProjection(NODE1_RUNTIME_STATE);
  const node2Output = resolveFinalDOMProjection(NODE2_RUNTIME_STATE);
  const node2RepeatOutput = resolveFinalDOMProjection(NODE2_RUNTIME_STATE);
  const deterministic = stringifyOutput(node2Output) === stringifyOutput(node2RepeatOutput);

  const results: DomFinalProjectionCheckResult[] = [
    {
      input: NODE1_RUNTIME_STATE,
      output: node1Output,
      valid:
        node1Output.shouldRenderNode1 === true &&
        node1Output.shouldRenderNode2 === false &&
        isEmptyOverlay(node1Output) &&
        node1Output.starbeastHints.mirrorActive === true &&
        node1Output.starbeastHints.structureSeparationActive === false,
    },
    {
      input: NODE2_RUNTIME_STATE,
      output: node2Output,
      valid:
        node2Output.shouldRenderNode1 === false &&
        node2Output.shouldRenderNode2 === true &&
        isNode2OverlayContract(node2Output) &&
        node2Output.starbeastHints.mirrorActive === false &&
        node2Output.starbeastHints.structureSeparationActive === true,
    },
    {
      input: NODE2_RUNTIME_STATE,
      output: node2RepeatOutput,
      valid: deterministic,
    },
  ];

  return {
    success: deterministic && results.every((result) => result.valid),
    deterministic,
    results,
  };
}
