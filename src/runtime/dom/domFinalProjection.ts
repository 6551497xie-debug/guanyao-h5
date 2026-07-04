import {
  resolveNodeDomRenderState,
  type DOMRenderState,
} from "../node/dom/nodeDomRenderContract";
import type { NodeRuntimeState } from "../node/runtime/nodeRuntimeBridge";

export type FinalDOMProjection = {
  shouldRenderNode1: boolean;
  shouldRenderNode2: boolean;
  visualOverlay: DOMRenderState["visualOverlay"];
  starbeastHints: {
    mirrorActive: boolean;
    structureSeparationActive: boolean;
  };
};

export function resolveFinalDOMProjection(nodeRuntimeState: NodeRuntimeState): FinalDOMProjection {
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
