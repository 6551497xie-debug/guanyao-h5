import { clearTraceLog, pushEvent } from "./rueTraceMockPipe";
import { getAverageHesitationGap, getDropOffIndex, getSessionLength, getStepCompletionRate } from "./rueTraceMockMetrics";

export type RUETraceMetricsCheckResult = {
  success: boolean;
  steps: string[];
  metrics: {
    sessionLength: number;
    completionRate: number;
    dropOffIndex: number;
    averageGap: number;
  };
  error?: string;
};

const emptyMetrics = {
  sessionLength: 0,
  completionRate: 0,
  dropOffIndex: -1,
  averageGap: 0,
};

export function runRUETraceMetricsCheck(): RUETraceMetricsCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    pushEvent("launch_entry", { sessionId: "metrics-check", timestamp: 1000 });
    pushEvent("step_view", { sessionId: "metrics-check", timestamp: 1100, stepIndex: 1 });
    pushEvent("step_view", { sessionId: "metrics-check", timestamp: 1200, stepIndex: 2 });
    pushEvent("step_view", { sessionId: "metrics-check", timestamp: 1300, stepIndex: 3 });
    pushEvent("step_complete", { sessionId: "metrics-check", timestamp: 1400, stepIndex: 1 });
    pushEvent("step_complete", { sessionId: "metrics-check", timestamp: 1500, stepIndex: 2 });
    pushEvent("hesitation_gap", { sessionId: "metrics-check", timestamp: 1600, gapMs: 300 });
    pushEvent("hesitation_gap", { sessionId: "metrics-check", timestamp: 1700, gapMs: 600 });
    pushEvent("hesitation_gap", { sessionId: "metrics-check", timestamp: 1800, gapMs: 900 });
    pushEvent("session_exit", { sessionId: "metrics-check", timestamp: 1900, exitReason: "user_close" });
    steps.push("constructed deterministic trace fixture");

    const metrics = {
      sessionLength: getSessionLength(),
      completionRate: getStepCompletionRate(),
      dropOffIndex: getDropOffIndex(),
      averageGap: getAverageHesitationGap(),
    };
    steps.push("calculated metrics");

    if (metrics.sessionLength <= 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected sessionLength > 0, received ${metrics.sessionLength}`,
      };
    }
    steps.push("validated sessionLength");

    if (metrics.completionRate !== 2 / 3) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected completionRate 0.6666666666666666, received ${metrics.completionRate}`,
      };
    }
    steps.push("validated completionRate");

    if (metrics.dropOffIndex < 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected dropOffIndex >= 0, received ${metrics.dropOffIndex}`,
      };
    }
    steps.push("validated dropOffIndex");

    if (metrics.averageGap !== 600) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected averageGap 600, received ${metrics.averageGap}`,
      };
    }
    steps.push("validated averageGap");

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
      error: error instanceof Error ? error.message : "unknown RUE trace metrics check error",
    };
  }
}

