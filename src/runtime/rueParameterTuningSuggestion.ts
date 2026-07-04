import { getRUEEvolutionSummary } from "./rueEvolutionSummaryVector";

export type RUEParameterTuningSuggestion = {
  seed: {
    claritySuggestion: string;
    completionSuggestion: string;
    dropOffSuggestion: string;
  };
  flow: {
    latencySuggestion: string;
    breakPointSuggestion: string;
    transformationSuggestion: string;
  };
  beast: {
    intensitySuggestion: string;
    stabilitySuggestion: string;
    feedbackSuggestion: string;
    collapseRiskSuggestion: string;
  };
};

export function getRUEParameterTuningSuggestion(): RUEParameterTuningSuggestion {
  const summary = getRUEEvolutionSummary();

  return {
    seed: {
      claritySuggestion: summary.seed.entryRate < 0.3 ? "seed attraction is weak; improve pressure seed clarity" : "seed entry signal is stable",
      completionSuggestion: summary.seed.completionRate < 0.5 ? "seed structure is fractured; review seed-to-completion continuity" : "seed completion path is stable",
      dropOffSuggestion: summary.seed.dropOffRate > 0.5 ? "flow interruption is severe after seed entry" : "seed drop-off pressure is controlled",
    },
    flow: {
      latencySuggestion: summary.flow.stepLatencyAvg > 3000 ? "flow is too slow; review step transition threshold" : "flow latency is within expected range",
      breakPointSuggestion: summary.flow.breakPointCount > 2 ? "path stability is weak; inspect repeated break points" : "path break points are controlled",
      transformationSuggestion:
        summary.flow.transformationDelayIndex > 3000
          ? "transformation delay is high; review transformation trigger sensitivity"
          : "transformation delay is within expected range",
    },
    beast: {
      intensitySuggestion: summary.beast.intensity < 0.3 ? "beast intensity is low; observe behavior activation strength" : "beast intensity is stable",
      stabilitySuggestion: summary.beast.stability < 0.5 ? "behavior fluctuation is high; inspect rhythm consistency" : "behavior stability is controlled",
      feedbackSuggestion: summary.beast.feedbackTiming < 0.5 ? "beast feedback timing is weak; review feedback timing quality" : "beast feedback timing is stable",
      collapseRiskSuggestion: summary.beast.collapseRisk > 0.6 ? "system instability is high; inspect collapse risk inputs" : "collapse risk is controlled",
    },
  };
}
