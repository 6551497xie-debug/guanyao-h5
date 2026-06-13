import {
  buildSelectedPressureSeedContext,
  getPressureSeedSceneTriplet,
  type GuanyaoSelectedPressureSeedContext,
} from "./guanyaoPressureSeedSceneBindingService";

export type GuanyaoTripleForceName = "SEED_REALITY" | "AXIS_FORCE" | "YAO_LANDING";

export interface GuanyaoTripleForceReadout {
  forceName: GuanyaoTripleForceName;
  label: string;
  frontStageLine: string;
  engineLine: string;
  weight: number;
}

export interface GuanyaoTripleForceLandingResult {
  selectedPressureSeedId: string;
  matrixCode: string;
  seedReality: GuanyaoTripleForceReadout;
  axisForce: GuanyaoTripleForceReadout;
  yaoLanding: GuanyaoTripleForceReadout;
  ritualLines: string[];
  landing: {
    mappingHint: string;
    pressureField: string;
    pressureNature: string;
    primaryRelation: string;
    pressureIntensity: number;
    pressureConfidence: number;
    landingConfidence: number;
  };
  engineOnly: {
    coreMechanism: string;
    coreEngineHint: string;
    tags: string[];
  };
}

export interface GuanyaoTripleForceFrontStage {
  selectedPressureSeedId: string;
  ritualLines: string[];
  readouts: Array<{
    label: string;
    frontStageLine: string;
  }>;
}

export interface GuanyaoTripleForceLandingAuditResult {
  ok: boolean;
  errors: string[];
  sampleSeedId: string;
  ritualLineCount: number;
  readoutCount: number;
  landingConfidence: number;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const buildAxisFrontStageLine = (pressureIntensity: number): string => {
  if (pressureIntensity >= 85) return "压力读数偏高，旧反应正在接管。";
  if (pressureIntensity >= 70) return "压力读数成形，惯性反应开始浮出。";
  if (pressureIntensity >= 55) return "压力读数已捕获，行为偏移正在出现。";
  return "压力读数较轻，但惯性已经露头。";
};

const buildRitualLines = (pressureIntensity: number): string[] => [
  "现实种子已冻结。",
  buildAxisFrontStageLine(pressureIntensity),
  "卦场落位中。",
  "因果入口已打开。",
];

export function deriveTripleForceLandingConfidence(
  selectedContext: GuanyaoSelectedPressureSeedContext,
): number {
  return clamp(0.6 + selectedContext.pressureConfidence * 0.24 + (selectedContext.pressureIntensity / 100) * 0.16, 0.52, 0.96);
}

export function buildTripleForceLandingResult(
  selectedContext: GuanyaoSelectedPressureSeedContext,
): GuanyaoTripleForceLandingResult {
  const landingConfidence = deriveTripleForceLandingConfidence(selectedContext);

  const seedReality: GuanyaoTripleForceReadout = {
    forceName: "SEED_REALITY",
    label: "现实种子",
    frontStageLine: "现实种子已冻结。",
    engineLine: selectedContext.surface,
    weight: 1,
  };

  const axisForce: GuanyaoTripleForceReadout = {
    forceName: "AXIS_FORCE",
    label: "压力读数",
    frontStageLine: buildAxisFrontStageLine(selectedContext.pressureIntensity),
    engineLine: `pressureIntensity=${selectedContext.pressureIntensity}; pressureConfidence=${selectedContext.pressureConfidence}`,
    weight: selectedContext.pressureIntensity / 100,
  };

  const yaoLanding: GuanyaoTripleForceReadout = {
    forceName: "YAO_LANDING",
    label: "卦场落位",
    frontStageLine: "卦场开始落位，因果入口正在打开。",
    engineLine: selectedContext.mappingHint,
    weight: selectedContext.pressureConfidence,
  };

  return {
    selectedPressureSeedId: selectedContext.selectedPressureSeedId,
    matrixCode: selectedContext.matrixCode,
    seedReality,
    axisForce,
    yaoLanding,
    ritualLines: buildRitualLines(selectedContext.pressureIntensity),
    landing: {
      mappingHint: selectedContext.mappingHint,
      pressureField: selectedContext.pressureField,
      pressureNature: selectedContext.pressureNature,
      primaryRelation: selectedContext.primaryRelation,
      pressureIntensity: selectedContext.pressureIntensity,
      pressureConfidence: selectedContext.pressureConfidence,
      landingConfidence,
    },
    engineOnly: {
      coreMechanism: selectedContext.core.mechanism,
      coreEngineHint: selectedContext.core.engineHint,
      tags: selectedContext.tags,
    },
  };
}

export function getTripleForceFrontStage(
  result: GuanyaoTripleForceLandingResult,
): GuanyaoTripleForceFrontStage {
  return {
    selectedPressureSeedId: result.selectedPressureSeedId,
    ritualLines: result.ritualLines,
    readouts: [result.seedReality, result.axisForce, result.yaoLanding].map((readout) => ({
      label: readout.label,
      frontStageLine: readout.frontStageLine,
    })),
  };
}

export function auditGuanyaoTripleForceLandingProtocol(): GuanyaoTripleForceLandingAuditResult {
  const errors: string[] = [];
  const sampleSeed = getPressureSeedSceneTriplet().seeds[0];
  const selectedContext = sampleSeed ? buildSelectedPressureSeedContext(sampleSeed) : undefined;
  const result = selectedContext ? buildTripleForceLandingResult(selectedContext) : undefined;
  const frontStage = result ? getTripleForceFrontStage(result) : undefined;
  const forbiddenFrontStageKeys = [
    "core",
    "tags",
    "mappingHint",
    "pressureField",
    "pressureNature",
    "primaryRelation",
    "pressureIntensity",
    "pressureConfidence",
    "engineLine",
    "weight",
  ];

  if (!sampleSeed) {
    errors.push("sample seed missing");
  }
  if (!selectedContext) {
    errors.push("selected context missing");
  }
  if (!result) {
    errors.push("triple force result missing");
  }
  if (!frontStage) {
    errors.push("frontStage missing");
  }

  if (result) {
    if (!result.seedReality) errors.push("result missing seedReality");
    if (!result.axisForce) errors.push("result missing axisForce");
    if (!result.yaoLanding) errors.push("result missing yaoLanding");
    if (result.ritualLines.length === 0) errors.push("result ritualLines empty");
    if (!result.landing) errors.push("result missing landing");
    if (!result.engineOnly) errors.push("result missing engineOnly");
    if (result.landing.landingConfidence < 0 || result.landing.landingConfidence > 1) {
      errors.push(`landingConfidence out of range: ${result.landing.landingConfidence}`);
    }
  }

  if (frontStage) {
    const frontStageKeys = Object.keys(frontStage).sort().join(",");
    if (frontStageKeys !== "readouts,ritualLines,selectedPressureSeedId") {
      errors.push(`frontStage keys invalid: ${frontStageKeys}`);
    }
    frontStage.readouts.forEach((readout) => {
      const readoutKeys = Object.keys(readout).sort().join(",");
      if (readoutKeys !== "frontStageLine,label") {
        errors.push(`frontStage readout keys invalid: ${readoutKeys}`);
      }
    });
    const serializedFrontStage = JSON.stringify(frontStage);
    forbiddenFrontStageKeys.forEach((key) => {
      if (serializedFrontStage.includes(key)) {
        errors.push(`frontStage exposes ${key}`);
      }
    });
  }

  return {
    ok: errors.length === 0,
    errors,
    sampleSeedId: sampleSeed?.id ?? "",
    ritualLineCount: result?.ritualLines.length ?? 0,
    readoutCount: frontStage?.readouts.length ?? 0,
    landingConfidence: result?.landing.landingConfidence ?? 0,
  };
}
