import {
  resolveNodeDomRenderState,
  type DOMRenderState,
} from "../node/dom/nodeDomRenderContract";
import {
  resolveNodeRuntimeState,
  type NodeRuntimeState,
} from "../node/runtime/nodeRuntimeBridge";
import type { Node1State } from "../node/transition/node1ToNode2";

export type FinalDOMProjection = {
  shouldRenderNode1: boolean;
  shouldRenderNode2: boolean;
  visualOverlay: DOMRenderState["visualOverlay"];
  starbeastHints: {
    mirrorActive: boolean;
    structureSeparationActive: boolean;
  };
};

type FinalDOMProjectionInput =
  | NodeRuntimeState
  | {
      node1State: Node1State;
      timeSpent: number;
    };

function resolveProjectionRuntimeState(input: FinalDOMProjectionInput): NodeRuntimeState {
  if ("currentNode" in input) {
    return input;
  }

  return resolveNodeRuntimeState(input);
}

export function resolveFinalDOMProjection(input: FinalDOMProjectionInput): FinalDOMProjection {
  const nodeRuntimeState = resolveProjectionRuntimeState(input);
  const domState = resolveNodeDomRenderState(nodeRuntimeState);

  return {
    shouldRenderNode1: domState.renderNode1,
    shouldRenderNode2: domState.renderNode2,
    visualOverlay: domState.visualOverlay,
    starbeastHints: {
      mirrorActive: domState.renderNode1,
      structureSeparationActive: domState.renderNode2,
    },
  };
}
