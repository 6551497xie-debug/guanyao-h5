/**
 * GUANYAO 2.0 Inference Layer
 * Pure observational system:
 * Converts UI behavior traces into causal reconstruction
 * Does NOT affect engine or UI state
 */

export interface CausalInferenceReport {
  path: string[];
  stageMapping: {
    chrono: string;
    reaction: string;
    motherField: string;
    seed: string;
  };
  behaviorSignals: {
    attentionFlow: number;
    inertiaDirection: string;
    decisionLatency: number;
  };
  inferenceSummary: string;
}

export type CausalInferenceStage = "chrono" | "reaction" | "motherField" | "seed";

export interface CausalInferenceTrace {
  stage: CausalInferenceStage;
  event: string;
  timestamp: number;
  value?: string | number | boolean;
}

export interface CausalInferenceInput {
  chronoTraces?: CausalInferenceTrace[];
  reactionTraces?: CausalInferenceTrace[];
  motherFieldTraces?: CausalInferenceTrace[];
  seedTraces?: CausalInferenceTrace[];
  selectedPressureSeedId?: string;
  selectedPressureSeedSurface?: string;
}

const emptyStageMapping: CausalInferenceReport["stageMapping"] = {
  chrono: "chrono trace unavailable",
  reaction: "default reaction trace unavailable",
  motherField: "mother field trace unavailable",
  seed: "pressure seed trace unavailable",
};

function sortTraces(traces: CausalInferenceTrace[] = []): CausalInferenceTrace[] {
  return [...traces].sort((a, b) => a.timestamp - b.timestamp);
}

function normalizeAttentionFlow(traces: CausalInferenceTrace[]): number {
  if (traces.length === 0) return 0;

  const uniqueStages = new Set(traces.map((trace) => trace.stage)).size;
  const eventDensity = Math.min(1, traces.length / 16);
  const stageCoverage = uniqueStages / 4;

  return Number(((eventDensity + stageCoverage) / 2).toFixed(3));
}

function calculateDecisionLatency(traces: CausalInferenceTrace[]): number {
  if (traces.length < 2) return 0;

  const first = traces[0]?.timestamp ?? 0;
  const last = traces[traces.length - 1]?.timestamp ?? first;

  return Math.max(0, Math.round(last - first));
}

function inferStageMapping(stage: CausalInferenceStage, traces: CausalInferenceTrace[]): string {
  if (traces.length === 0) return emptyStageMapping[stage];

  const firstEvent = traces[0]?.event ?? "unknown";
  const lastEvent = traces[traces.length - 1]?.event ?? firstEvent;

  if (firstEvent === lastEvent) {
    return `${stage}: ${firstEvent}`;
  }

  return `${stage}: ${firstEvent} -> ${lastEvent}`;
}

function inferInertiaDirection(input: CausalInferenceInput, allTraces: CausalInferenceTrace[]): string {
  const seedText = [input.selectedPressureSeedId, input.selectedPressureSeedSurface].filter(Boolean).join(" / ");
  const finalTrace = allTraces[allTraces.length - 1];

  if (seedText) return `toward pressure seed: ${seedText}`;
  if (finalTrace) return `toward ${finalTrace.stage}: ${finalTrace.event}`;

  return "undetermined";
}

function buildPath(allTraces: CausalInferenceTrace[]): string[] {
  const observedStages = new Set(allTraces.map((trace) => trace.stage));
  const canonicalPath: CausalInferenceStage[] = ["chrono", "reaction", "motherField", "seed"];

  return canonicalPath.map((stage) => (observedStages.has(stage) ? stage : `${stage}:missing`));
}

export function collectCausalInferenceTraces(input: CausalInferenceInput): CausalInferenceTrace[] {
  return sortTraces([
    ...(input.chronoTraces ?? []),
    ...(input.reactionTraces ?? []),
    ...(input.motherFieldTraces ?? []),
    ...(input.seedTraces ?? []),
  ]);
}

export function runGuanyaoCausalInference(input: CausalInferenceInput): CausalInferenceReport {
  const chronoTraces = sortTraces(input.chronoTraces);
  const reactionTraces = sortTraces(input.reactionTraces);
  const motherFieldTraces = sortTraces(input.motherFieldTraces);
  const seedTraces = sortTraces(input.seedTraces);
  const allTraces = collectCausalInferenceTraces(input);
  const decisionLatency = calculateDecisionLatency(allTraces);
  const inertiaDirection = inferInertiaDirection(input, allTraces);

  return {
    path: buildPath(allTraces),
    stageMapping: {
      chrono: inferStageMapping("chrono", chronoTraces),
      reaction: inferStageMapping("reaction", reactionTraces),
      motherField: inferStageMapping("motherField", motherFieldTraces),
      seed: inferStageMapping("seed", seedTraces),
    },
    behaviorSignals: {
      attentionFlow: normalizeAttentionFlow(allTraces),
      inertiaDirection,
      decisionLatency,
    },
    inferenceSummary:
      allTraces.length > 0
        ? `Observed ${allTraces.length} UI trace(s); reconstructed ${inertiaDirection}.`
        : "No UI traces observed; causal reconstruction remains unavailable.",
  };
}
