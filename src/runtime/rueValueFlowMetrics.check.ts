import { clearTraceLog, pushEvent } from "./rueTraceMockPipe";
import { getAverageStepLatency, getFlowBreakPoints, getStepLatency, getTransformationDelayIndex } from "./rueValueFlowMetrics";

export type RUEValueFlowMetricsCheckResult = {
  success: boolean;
  steps: string[];
  metrics: {
    stepLatencyCount: number;
    averageLatency: number;
    breakPointsCount: number;
    transformationDelayIndex: number;
  };
  error?: string;
};

const emptyMetrics = {
  stepLatencyCount: 0,
  averageLatency: 0,
  breakPointsCount: 0,
  transformationDelayIndex: 0,
};

export function runRUEValueFlowMetricsCheck(): RUEValueFlowMetricsCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    pushEvent("launch_entry", { sessionId: "value-flow-check", timestamp: 1 });
    pushEvent("step_view", { sessionId: "value-flow-check", timestamp: 2, stepIndex: 1 });
    pushEvent("step_complete", { sessionId: "value-flow-check", timestamp: 3, stepIndex: 1 });
    pushEvent("step_view", { sessionId: "value-flow-check", timestamp: 4, stepIndex: 2 });
    pushEvent("step_complete", { sessionId: "value-flow-check", timestamp: 5, stepIndex: 2 });
    pushEvent("step_view", { sessionId: "value-flow-check", timestamp: 6, stepIndex: 3 });
    pushEvent("session_exit", { sessionId: "value-flow-check", timestamp: 7, exitReason: "user_close" });
    steps.push("constructed deterministic value flow trace fixture");

    const stepLatencies = getStepLatency();
    const breakPoints = getFlowBreakPoints();
    const metrics = {
      stepLatencyCount: stepLatencies.length,
      averageLatency: getAverageStepLatency(),
      breakPointsCount: breakPoints.length,
      transformationDelayIndex: getTransformationDelayIndex(),
    };
    steps.push("calculated value flow metrics");

    if (metrics.stepLatencyCount <= 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected stepLatencyCount > 0, received ${metrics.stepLatencyCount}`,
      };
    }
    steps.push("validated stepLatencyCount");

    if (metrics.averageLatency <= 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected averageLatency > 0, received ${metrics.averageLatency}`,
      };
    }
    steps.push("validated averageLatency");

    if (!Array.isArray(breakPoints)) {
      return {
        success: false,
        steps,
        metrics,
        error: "expected breakPoints to be a deterministic array",
      };
    }
    steps.push("validated breakPoints array");

    if (metrics.transformationDelayIndex < 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected transformationDelayIndex >= 0, received ${metrics.transformationDelayIndex}`,
      };
    }
    steps.push("validated transformationDelayIndex");

    clearTraceLog();
    steps.push("restored empty trace log");

    return {
      success: true,
      steps,
      metrics,
    };
  } catch (error) {
    clearTraceLog();

    return {
      success: false,
      steps,
      metrics: emptyMetrics,
      error: error instanceof Error ? error.message : "unknown RUE value flow metrics check error",
    };
  }
}
