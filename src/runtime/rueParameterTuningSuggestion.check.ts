import { getRUEEvolutionSummary, type RUEEvolutionSummary } from "./rueEvolutionSummaryVector";
import { getRUEParameterTuningSuggestion, type RUEParameterTuningSuggestion } from "./rueParameterTuningSuggestion";
import { clearTraceLog, pushEvent } from "./rueTraceMockPipe";

export type RUEParameterTuningSuggestionCheckResult = {
  success: boolean;
  steps: string[];
  summary: RUEEvolutionSummary;
  suggestion: ReturnType<typeof getRUEParameterTuningSuggestion>;
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

const emptySuggestion: RUEParameterTuningSuggestion = {
  seed: {
    claritySuggestion: "",
    completionSuggestion: "",
    dropOffSuggestion: "",
  },
  flow: {
    latencySuggestion: "",
    breakPointSuggestion: "",
    transformationSuggestion: "",
  },
  beast: {
    intensitySuggestion: "",
    stabilitySuggestion: "",
    feedbackSuggestion: "",
    collapseRiskSuggestion: "",
  },
};

function isStringField(value: unknown): value is string {
  return typeof value === "string";
}

function isPresentObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

export function runRUEParameterTuningSuggestionCheck(): RUEParameterTuningSuggestionCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    pushEvent("launch_entry", { sessionId: "parameter-tuning-check", timestamp: 1, seedId: "seed-alpha" });
    pushEvent("step_view", { sessionId: "parameter-tuning-check", timestamp: 2, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_complete", { sessionId: "parameter-tuning-check", timestamp: 3, seedId: "seed-alpha", stepIndex: 1 });
    pushEvent("step_view", { sessionId: "parameter-tuning-check", timestamp: 4, seedId: "seed-alpha", stepIndex: 2 });
    pushEvent("step_complete", { sessionId: "parameter-tuning-check", timestamp: 5, seedId: "seed-alpha", stepIndex: 2 });
    pushEvent("step_view", { sessionId: "parameter-tuning-check", timestamp: 6, seedId: "seed-alpha", stepIndex: 3 });
    pushEvent("hesitation_gap", { sessionId: "parameter-tuning-check", timestamp: 7, seedId: "seed-alpha", gapMs: 300 });
    pushEvent("hesitation_gap", { sessionId: "parameter-tuning-check", timestamp: 8, seedId: "seed-alpha", gapMs: 600 });
    pushEvent("session_exit", { sessionId: "parameter-tuning-check", timestamp: 9, seedId: "seed-alpha", exitReason: "user_close" });
    steps.push("constructed deterministic parameter tuning trace fixture");

    const summary = getRUEEvolutionSummary();
    const suggestion = getRUEParameterTuningSuggestion();
    steps.push("calculated summary and parameter tuning suggestion");

    if (!isPresentObject(suggestion.seed)) {
      return { success: false, steps, summary, suggestion, error: "expected suggestion.seed to be present" };
    }
    if (!isStringField(suggestion.seed.claritySuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected seed.claritySuggestion to be string" };
    }
    if (!isStringField(suggestion.seed.completionSuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected seed.completionSuggestion to be string" };
    }
    if (!isStringField(suggestion.seed.dropOffSuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected seed.dropOffSuggestion to be string" };
    }
    steps.push("validated seed suggestion block");

    if (!isPresentObject(suggestion.flow)) {
      return { success: false, steps, summary, suggestion, error: "expected suggestion.flow to be present" };
    }
    if (!isStringField(suggestion.flow.latencySuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected flow.latencySuggestion to be string" };
    }
    if (!isStringField(suggestion.flow.breakPointSuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected flow.breakPointSuggestion to be string" };
    }
    if (!isStringField(suggestion.flow.transformationSuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected flow.transformationSuggestion to be string" };
    }
    steps.push("validated flow suggestion block");

    if (!isPresentObject(suggestion.beast)) {
      return { success: false, steps, summary, suggestion, error: "expected suggestion.beast to be present" };
    }
    if (!isStringField(suggestion.beast.intensitySuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected beast.intensitySuggestion to be string" };
    }
    if (!isStringField(suggestion.beast.stabilitySuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected beast.stabilitySuggestion to be string" };
    }
    if (!isStringField(suggestion.beast.feedbackSuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected beast.feedbackSuggestion to be string" };
    }
    if (!isStringField(suggestion.beast.collapseRiskSuggestion)) {
      return { success: false, steps, summary, suggestion, error: "expected beast.collapseRiskSuggestion to be string" };
    }
    steps.push("validated beast suggestion block");

    JSON.stringify(suggestion);
    steps.push("validated suggestion serialization");

    clearTraceLog();
    steps.push("restored empty trace log");

    return {
      success: true,
      steps,
      summary,
      suggestion,
    };
  } catch (error) {
    clearTraceLog();

    return {
      success: false,
      steps,
      summary: emptySummary,
      suggestion: emptySuggestion,
      error: error instanceof Error ? error.message : "unknown RUE parameter tuning suggestion check error",
    };
  }
}
