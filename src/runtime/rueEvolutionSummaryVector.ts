import { getBeastEvolutionVector, type RUEBeastEvolutionVector } from "./rueBeastEvolutionMetrics";
import { getSeedCompletionRate, getSeedDropOffRate, getSeedEffectScore, getSeedEntryRate } from "./ruePressureSeedMetrics";
import { getAverageStepLatency, getFlowBreakPoints, getStepLatency, getTransformationDelayIndex } from "./rueValueFlowMetrics";

export type RUEEvolutionSummary = {
  seed: {
    entryRate: number;
    completionRate: number;
    dropOffRate: number;
    effectScore: number;
  };
  flow: {
    stepLatencyAvg: number;
    breakPointCount: number;
    transformationDelayIndex: number;
  };
  beast: RUEBeastEvolutionVector;
};

export function getRUEEvolutionSummary(): RUEEvolutionSummary {
  const stepLatency = getStepLatency();

  return {
    seed: {
      entryRate: getSeedEntryRate(),
      completionRate: getSeedCompletionRate(),
      dropOffRate: getSeedDropOffRate(),
      effectScore: getSeedEffectScore(),
    },
    flow: {
      stepLatencyAvg: stepLatency.length === 0 ? 0 : getAverageStepLatency(),
      breakPointCount: getFlowBreakPoints().length,
      transformationDelayIndex: getTransformationDelayIndex(),
    },
    beast: getBeastEvolutionVector(),
  };
}
