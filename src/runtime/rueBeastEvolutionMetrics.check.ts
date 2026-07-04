import { clearTraceLog, pushEvent } from "./rueTraceMockPipe";
import { getBeastEvolutionVector, type RUEBeastEvolutionVector } from "./rueBeastEvolutionMetrics";

export type RUEBeastEvolutionMetricsCheckResult = {
  success: boolean;
  steps: string[];
  vector: RUEBeastEvolutionVector;
  error?: string;
};

const emptyVector = {
  intensity: 0,
  clarity: 0,
  stability: 0,
  feedbackTiming: 0,
  collapseRisk: 0,
};

function isInUnitRange(value: number): boolean {
  return value >= 0 && value <= 1;
}

export function runRUEBeastEvolutionMetricsCheck(): RUEBeastEvolutionMetricsCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    pushEvent("launch_entry", { sessionId: "beast-evolution-check", timestamp: 1, seedId: "seed-alpha" });
    pushEvent("step_view", { sessionId: "beast-evolution-check", timestamp: 2, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_complete", { sessionId: "beast-evolution-check", timestamp: 3, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_view", { sessionId: "beast-evolution-check", timestamp: 4, seedId: "seed-alpha", stepIndex: 2 });
    pushEvent("step_complete", { sessionId: "beast-evolution-check", timestamp: 5, seedId: "seed-alpha", stepIndex: 2 });
    pushEvent("step_view", { sessionId: "beast-evolution-check", timestamp: 6, seedId: "seed-alpha", stepIndex: 3 });
    pushEvent("hesitation_gap", { sessionId: "beast-evolution-check", timestamp: 7, seedId: "seed-alpha", gapMs: 300 });
    pushEvent("hesitation_gap", { sessionId: "beast-evolution-check", timestamp: 8, seedId: "seed-alpha", gapMs: 600 });
    pushEvent("session_exit", { sessionId: "beast-evolution-check", timestamp: 9, seedId: "seed-alpha", exitReason: "user_close" });
    steps.push("constructed deterministic beast evolution trace fixture");

    const vector = getBeastEvolutionVector();
    steps.push("calculated beast evolution vector");

    if (vector.intensity <= 0 || vector.intensity > 1) {
      return {
        success: false,
        steps,
        vector,
        error: `expected intensity in (0, 1], received ${vector.intensity}`,
      };
    }
    steps.push("validated intensity");

    if (!isInUnitRange(vector.clarity)) {
      return {
        success: false,
        steps,
        vector,
        error: `expected clarity in [0, 1], received ${vector.clarity}`,
      };
    }
    steps.push("validated clarity");

    if (!isInUnitRange(vector.stability)) {
      return {
        success: false,
        steps,
        vector,
        error: `expected stability in [0, 1], received ${vector.stability}`,
      };
    }
    steps.push("validated stability");

    if (!isInUnitRange(vector.feedbackTiming)) {
      return {
        success: false,
        steps,
        vector,
        error: `expected feedbackTiming in [0, 1], received ${vector.feedbackTiming}`,
      };
    }
    steps.push("validated feedbackTiming");

    if (!isInUnitRange(vector.collapseRisk)) {
      return {
        success: false,
        steps,
        vector,
        error: `expected collapseRisk in [0, 1], received ${vector.collapseRisk}`,
      };
    }
    steps.push("validated collapseRisk");

    clearTraceLog();
    steps.push("restored empty trace log");

    return {
      success: true,
      steps,
      vector,
    };
  } catch (error) {
    clearTraceLog();

    return {
      success: false,
      steps,
      vector: emptyVector,
      error: error instanceof Error ? error.message : "unknown RUE beast evolution metrics check error",
    };
  }
}
