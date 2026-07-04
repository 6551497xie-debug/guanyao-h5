import type { NodeRuntimeState } from "../runtime/nodeRuntimeBridge";

export type DOMRenderState = {
  renderNode1: boolean;
  renderNode2: boolean;
  visualOverlay: {
    starfield?: boolean;
    directionalLight?: boolean;
    splitField?: boolean;
  };
};

export function resolveNodeDomRenderState(runtimeState: NodeRuntimeState): DOMRenderState {
  if (runtimeState.currentNode === "NODE1") {
    return {
      renderNode1: true,
      renderNode2: false,
      visualOverlay: {},
    };
  }

  return {
    renderNode1: false,
    renderNode2: true,
    visualOverlay: {
      starfield: runtimeState.visualState.starfieldSplitIntensity > 0,
      directionalLight: runtimeState.visualState.directionalLightBias > 0,
      splitField: runtimeState.visualState.fieldSeparationVector > 0,
    },
  };
}
