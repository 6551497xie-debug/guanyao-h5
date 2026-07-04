import { clearTraceLog, pushEvent } from "./rueTraceMockPipe";
import { getSeedCompletionRate, getSeedDropOffRate, getSeedEffectScore, getSeedEntryRate } from "./ruePressureSeedMetrics";

export type RUEPressureSeedMetricsCheckResult = {
  success: boolean;
  steps: string[];
  metrics: {
    seedEntryRate: number;
    seedCompletionRate: number;
    seedDropOffRate: number;
    seedEffectScore: number;
  };
  error?: string;
};

const emptyMetrics = {
  seedEntryRate: 0,
  seedCompletionRate: 0,
  seedDropOffRate: 0,
  seedEffectScore: 0,
};

export function runRUEPressureSeedMetricsCheck(): RUEPressureSeedMetricsCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    pushEvent("launch_entry", { sessionId: "seed-metrics-check", timestamp: 1000, seedId: "seed-alpha" });
    pushEvent("step_view", { sessionId: "seed-metrics-check", timestamp: 1100, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_view", { sessionId: "seed-metrics-check", timestamp: 1200, seedId: "seed-alpha", stepIndex: 3 });
    pushEvent("step_view", { sessionId: "seed-metrics-check", timestamp: 1300, seedId: "seed-alpha", stepIndex: 6 });
    pushEvent("step_complete", { sessionId: "seed-metrics-check", timestamp: 1400, seedId: "seed-alpha", stepIndex: 3 });
    pushEvent("step_complete", { sessionId: "seed-metrics-check", timestamp: 1500, seedId: "seed-alpha", stepIndex: 6 });
    pushEvent("hesitation_gap", { sessionId: "seed-metrics-check", timestamp: 1600, seedId: "seed-alpha", gapMs: 400 });
    pushEvent("hesitation_gap", { sessionId: "seed-metrics-check", timestamp: 1700, seedId: "seed-alpha", gapMs: 800 });
    pushEvent("session_exit", { sessionId: "seed-metrics-check", timestamp: 1800, seedId: "seed-alpha", exitReason: "user_close" });
    steps.push("constructed deterministic seed trace fixture");

    const metrics = {
      seedEntryRate: getSeedEntryRate(),
      seedCompletionRate: getSeedCompletionRate(),
      seedDropOffRate: getSeedDropOffRate(),
      seedEffectScore: getSeedEffectScore(),
    };
    steps.push("calculated pressure seed metrics");

    if (metrics.seedEntryRate <= 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected seedEntryRate > 0, received ${metrics.seedEntryRate}`,
      };
    }
    steps.push("validated seedEntryRate");

    if (metrics.seedCompletionRate <= 0 || metrics.seedCompletionRate > 1) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected seedCompletionRate in (0, 1], received ${metrics.seedCompletionRate}`,
      };
    }
    steps.push("validated seedCompletionRate");

    if (metrics.seedDropOffRate < 0) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected seedDropOffRate >= 0, received ${metrics.seedDropOffRate}`,
      };
    }
    steps.push("validated seedDropOffRate");

    if (metrics.seedEffectScore <= 0 || metrics.seedEffectScore > 1) {
      return {
        success: false,
        steps,
        metrics,
        error: `expected seedEffectScore in (0, 1], received ${metrics.seedEffectScore}`,
      };
    }
    steps.push("validated seedEffectScore");

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
      error: error instanceof Error ? error.message : "unknown RUE pressure seed metrics check error",
    };
  }
}

