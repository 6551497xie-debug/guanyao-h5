import { getSeedEffectScore } from "./ruePressureSeedMetrics";
import { getTraceLog } from "./rueTraceMockPipe";
import { getAverageStepLatency, getFlowBreakPoints } from "./rueValueFlowMetrics";

export type RUEBeastEvolutionVector = {
  intensity: number;
  clarity: number;
  stability: number;
  feedbackTiming: number;
  collapseRisk: number;
};

function safeDiv(a: number, b: number): number {
  if (b === 0) return 0;
  return a / b;
}

export function getBeastIntensity(): number {
  const traceLog = getTraceLog();
  const stepEvents = traceLog.filter((event) => event.type === "step_view" || event.type === "step_complete");

  return safeDiv(stepEvents.length, Math.max(traceLog.length, 1));
}

export function getBeastClarity(): number {
  const traceLog = getTraceLog();
  const views = traceLog.filter((event) => event.type === "step_view").length;
  const completes = traceLog.filter((event) => event.type === "step_complete").length;
  const breakPointCount = getFlowBreakPoints().length;
  const completionRate = safeDiv(completes, Math.max(views, 1));
  const noisePenalty = safeDiv(breakPointCount, Math.max(views, 1));

  return Math.max(0, completionRate - noisePenalty);
}

export function getBeastStability(): number {
  const averageLatency = getAverageStepLatency();
  const normalizedLatency = Math.min(averageLatency / 5000, 1);

  return 1 - normalizedLatency;
}

export function getBeastFeedbackTiming(): number {
  const seedScore = getSeedEffectScore();
  const averageLatency = getAverageStepLatency();
  const flowEfficiency = 1 - Math.min(averageLatency / 5000, 1);

  return seedScore * 0.6 + flowEfficiency * 0.4;
}

export function getBeastCollapseRisk(): number {
  const traceLog = getTraceLog();
  const breakPointCount = getFlowBreakPoints().length;
  const hasDropOff = traceLog.some((event) => event.type === "session_exit" || event.type === "session_abandon") ? 1 : 0;
  const latencyRisk = Math.min(getAverageStepLatency() / 5000, 1);
  const risk = safeDiv(breakPointCount, Math.max(traceLog.length, 1)) * 0.4 + hasDropOff * 0.4 + latencyRisk * 0.2;

  return Math.min(1, risk);
}

export function getBeastEvolutionVector(): RUEBeastEvolutionVector {
  return {
    intensity: getBeastIntensity(),
    clarity: getBeastClarity(),
    stability: getBeastStability(),
    feedbackTiming: getBeastFeedbackTiming(),
    collapseRisk: getBeastCollapseRisk(),
  };
}
