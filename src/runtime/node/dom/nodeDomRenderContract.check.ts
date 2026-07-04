import {
  resolveNodeDomRenderState,
  type DOMRenderState,
} from "./nodeDomRenderContract";
import type { NodeRuntimeState } from "../runtime/nodeRuntimeBridge";

type NodeDomRenderContractCheckResult = {
  input: NodeRuntimeState;
  output: DOMRenderState;
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

function isEmptyOverlay(output: DOMRenderState): boolean {
  return Object.keys(output.visualOverlay).length === 0;
}

function isActiveOverlay(output: DOMRenderState): boolean {
  return (
    output.visualOverlay.starfield === true &&
    output.visualOverlay.directionalLight === true &&
    output.visualOverlay.splitField === true
  );
}

function stringifyOutput(output: DOMRenderState): string {
  return JSON.stringify(output);
}

export function runNodeDomRenderContractCheck(): {
  success: boolean;
  deterministic: boolean;
  results: NodeDomRenderContractCheckResult[];
} {
  const node1Output = resolveNodeDomRenderState(NODE1_RUNTIME_STATE);
  const node2Output = resolveNodeDomRenderState(NODE2_RUNTIME_STATE);
  const node2RepeatOutput = resolveNodeDomRenderState(NODE2_RUNTIME_STATE);
  const deterministic = stringifyOutput(node2Output) === stringifyOutput(node2RepeatOutput);

  const results: NodeDomRenderContractCheckResult[] = [
    {
      input: NODE1_RUNTIME_STATE,
      output: node1Output,
      valid:
        node1Output.renderNode1 === true &&
        node1Output.renderNode2 === false &&
        isEmptyOverlay(node1Output),
    },
    {
      input: NODE2_RUNTIME_STATE,
      output: node2Output,
      valid:
        node2Output.renderNode1 === false &&
        node2Output.renderNode2 === true &&
        isActiveOverlay(node2Output),
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
