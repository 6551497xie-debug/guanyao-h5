import { clearTraceLog, pushEvent } from "./rueTraceMockPipe";
import { getRUEEvolutionSummary, type RUEEvolutionSummary } from "./rueEvolutionSummaryVector";

export type RUEEvolutionSummaryCheckResult = {
  success: boolean;
  steps: string[];
  summary: RUEEvolutionSummary;
  error?: string;
};

const emptySummary: RUEEvolutionSummary = {
  seed: {
    entryRate: 0,
    completionRate: 0,
    dropOffRate: 0,
    effectScore: 0,
  },
  flow: {
    stepLatencyAvg: 0,
    breakPointCount: 0,
    transformationDelayIndex: 0,
  },
  beast: {
    intensity: 0,
    clarity: 0,
    stability: 0,
    feedbackTiming: 0,
    collapseRisk: 0,
  },
};

function isInUnitRange(value: number): boolean {
  return value >= 0 && value <= 1;
}

export function runRUEEvolutionSummaryCheck(): RUEEvolutionSummaryCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    pushEvent("launch_entry", { sessionId: "evolution-summary-check", timestamp: 1, seedId: "seed-alpha" });
    pushEvent("step_view", { sessionId: "evolution-summary-check", timestamp: 2, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_complete", { sessionId: "evolution-summary-check", timestamp: 3, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_view", { sessionId: "evolution-summary-check", timestamp: 4, seedId: "seed-alpha", stepIndex: 2 });
    pushEvent("step_complete", { sessionId: "evolution-summary-check", timestamp: 5, seedId: "seed-alpha", stepIndex: 2 });
    pushEvent("step_view", { sessionId: "evolution-summary-check", timestamp: 6, seedId: "seed-alpha", stepIndex: 3 });
    pushEvent("hesitation_gap", { sessionId: "evolution-summary-check", timestamp: 7, seedId: "seed-alpha", gapMs: 300 });
    pushEvent("hesitation_gap", { sessionId: "evolution-summary-check", timestamp: 8, seedId: "seed-alpha", gapMs: 600 });
    pushEvent("session_exit", { sessionId: "evolution-summary-check", timestamp: 9, seedId: "seed-alpha", exitReason: "user_close" });
    steps.push("constructed deterministic evolution summary trace fixture");

    const summary = getRUEEvolutionSummary();
    steps.push("calculated evolution summary");

    if (!isInUnitRange(summary.seed.entryRate)) {
      return { success: false, steps, summary, error: `expected seed.entryRate in [0, 1], received ${summary.seed.entryRate}` };
    }
    if (!isInUnitRange(summary.seed.completionRate)) {
      return { success: false, steps, summary, error: `expected seed.completionRate in [0, 1], received ${summary.seed.completionRate}` };
    }
    if (!isInUnitRange(summary.seed.dropOffRate)) {
      return { success: false, steps, summary, error: `expected seed.dropOffRate in [0, 1], received ${summary.seed.dropOffRate}` };
    }
    if (!isInUnitRange(summary.seed.effectScore)) {
      return { success: false, steps, summary, error: `expected seed.effectScore in [0, 1], received ${summary.seed.effectScore}` };
    }
    steps.push("validated seed block");

    if (summary.flow.stepLatencyAvg < 0) {
      return { success: false, steps, summary, error: `expected flow.stepLatencyAvg >= 0, received ${summary.flow.stepLatencyAvg}` };
    }
    if (summary.flow.breakPointCount < 0) {
      return { success: false, steps, summary, error: `expected flow.breakPointCount >= 0, received ${summary.flow.breakPointCount}` };
    }
    if (summary.flow.transformationDelayIndex < 0) {
      return {
        success: false,
        steps,
        summary,
        error: `expected flow.transformationDelayIndex >= 0, received ${summary.flow.transformationDelayIndex}`,
      };
    }
    steps.push("validated flow block");

    if (!isInUnitRange(summary.beast.intensity)) {
      return { success: false, steps, summary, error: `expected beast.intensity in [0, 1], received ${summary.beast.intensity}` };
    }
    if (!isInUnitRange(summary.beast.clarity)) {
      return { success: false, steps, summary, error: `expected beast.clarity in [0, 1], received ${summary.beast.clarity}` };
    }
    if (!isInUnitRange(summary.beast.stability)) {
      return { success: false, steps, summary, error: `expected beast.stability in [0, 1], received ${summary.beast.stability}` };
    }
    if (!isInUnitRange(summary.beast.feedbackTiming)) {
      return {
        success: false,
        steps,
        summary,
        error: `expected beast.feedbackTiming in [0, 1], received ${summary.beast.feedbackTiming}`,
      };
    }
    if (!isInUnitRange(summary.beast.collapseRisk)) {
      return { success: false, steps, summary, error: `expected beast.collapseRisk in [0, 1], received ${summary.beast.collapseRisk}` };
    }
    steps.push("validated beast block");

    clearTraceLog();
    steps.push("restored empty trace log");

    return {
      success: true,
      steps,
      summary,
    };
  } catch (error) {
    clearTraceLog();

    return {
      success: false,
      steps,
      summary: emptySummary,
      error: error instanceof Error ? error.message : "unknown RUE evolution summary check error",
    };
  }
}
