import { resolveFinalDOMProjection, type FinalDOMProjection } from "./domFinalProjection";

type BrowserPerceptionTimelineItem = {
  time: number;
  domState: string;
  uiState: string;
  match: boolean;
};

const NODE1_STATE = {
  mirrorActivated: true,
  reflectionMode: "ACTIVE",
  starbeastSync: true,
} as const;

function describeDOMState(domState: FinalDOMProjection): string {
  if (domState.shouldRenderNode1 && !domState.shouldRenderNode2) {
    return "NODE1_VISIBLE";
  }

  if (!domState.shouldRenderNode1 && domState.shouldRenderNode2) {
    return "NODE2_VISIBLE";
  }

  return "DUAL_OR_EMPTY_RENDER_DRIFT";
}

function resolvePerceivedUIState(domState: FinalDOMProjection): string {
  if (domState.shouldRenderNode1 && !domState.shouldRenderNode2) {
    return "NODE1_VISIBLE";
  }

  if (
    !domState.shouldRenderNode1 &&
    domState.shouldRenderNode2 &&
    domState.visualOverlay.starfield === true &&
    domState.visualOverlay.directionalLight === true &&
    domState.visualOverlay.splitField === true &&
    domState.starbeastHints.mirrorActive === false &&
    domState.starbeastHints.structureSeparationActive === true
  ) {
    return "NODE2_VISIBLE";
  }

  return "UI_PROJECTION_DRIFT";
}

function createTimelineItem(time: number): BrowserPerceptionTimelineItem {
  const domState = resolveFinalDOMProjection({
    node1State: NODE1_STATE,
    timeSpent: time,
  });
  const resolvedDOMState = describeDOMState(domState);
  const uiState = resolvePerceivedUIState(domState);

  return {
    time,
    domState: resolvedDOMState,
    uiState,
    match: resolvedDOMState === uiState,
  };
}

export function runDomFinalProjectionBrowserCheck(): {
  consistent: boolean;
  driftDetected: boolean;
  timeline: BrowserPerceptionTimelineItem[];
} {
  const timeline = [
    createTimelineItem(0),
    createTimelineItem(1200),
    createTimelineItem(1201),
  ];

  const noEarlyNode2Rendering =
    timeline[0]?.domState === "NODE1_VISIBLE" &&
    timeline[1]?.domState === "NODE1_VISIBLE";
  const node2RendersAfterThreshold = timeline[2]?.domState === "NODE2_VISIBLE";
  const noDualNodeRendering = timeline.every(
    (item) => item.domState !== "DUAL_OR_EMPTY_RENDER_DRIFT"
  );
  const projectionMatchesUI = timeline.every((item) => item.match);
  const consistent =
    noEarlyNode2Rendering &&
    node2RendersAfterThreshold &&
    noDualNodeRendering &&
    projectionMatchesUI;

  return {
    consistent,
    driftDetected: !consistent,
    timeline,
  };
}
