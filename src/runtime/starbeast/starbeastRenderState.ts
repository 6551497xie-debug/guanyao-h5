export type StarbeastEntryState =
  | "INITIAL_ENTRY"
  | "PRESSURE_ACTIVE"
  | "BEAST_COLLAPSE_TRIGGERED"
  | "starfield_idle"
  | "28_lunar_assembly"
  | "beast_formation"
  | "beast_approach"
  | "recognition_ready"
  | "starbeast_sandify";

export type StarbeastRenderState = {
  starfieldDensity: number;
  lightAggregationIntensity: number;
  beastEmergenceTiming: number;
  collapseAnimationTrigger: boolean;
};

export function resolveStarbeastRenderState(entryState: StarbeastEntryState): StarbeastRenderState {
  if (entryState === "INITIAL_ENTRY" || entryState === "starfield_idle") {
    return {
      starfieldDensity: 1,
      lightAggregationIntensity: 0,
      beastEmergenceTiming: 0,
      collapseAnimationTrigger: false,
    };
  }

  if (entryState === "28_lunar_assembly") {
    return {
      starfieldDensity: 0.82,
      lightAggregationIntensity: 0.42,
      beastEmergenceTiming: 0.25,
      collapseAnimationTrigger: false,
    };
  }

  if (entryState === "beast_formation") {
    return {
      starfieldDensity: 0.58,
      lightAggregationIntensity: 0.68,
      beastEmergenceTiming: 0.5,
      collapseAnimationTrigger: false,
    };
  }

  if (entryState === "PRESSURE_ACTIVE" || entryState === "beast_approach" || entryState === "recognition_ready") {
    return {
      starfieldDensity: 0.34,
      lightAggregationIntensity: 1,
      beastEmergenceTiming: 1,
      collapseAnimationTrigger: false,
    };
  }

  return {
    starfieldDensity: 0.2,
    lightAggregationIntensity: 1,
    beastEmergenceTiming: 1,
    collapseAnimationTrigger: true,
  };
}
