import {
  GUANYAO_PRESSURE_SEED_DRAFT_POOL,
  getPressureSeedFrontStage,
} from "../data/guanyaoPressureSeedDraftPool";
import type {
  GuanyaoAgeSegment,
  GuanyaoCoreRelation,
  GuanyaoPressureField,
  GuanyaoPressureNature,
  GuanyaoPressureSeed,
} from "../types/guanyaoPressureSeed";

export interface GuanyaoPressureSeedSceneContext {
  ageSegment?: GuanyaoAgeSegment;
  preferredFields?: GuanyaoPressureField[];
  preferredNatures?: GuanyaoPressureNature[];
  preferredRelations?: GuanyaoCoreRelation[];
  excludeSeedIds?: string[];
  recentMatrixCodes?: string[];
}

export interface GuanyaoPressureSeedSceneCandidate {
  seed: GuanyaoPressureSeed;
  score: number;
  scoreBreakdown: {
    ageBias: number;
    fieldBias: number;
    natureBias: number;
    relationBias: number;
    freshness: number;
    baseline: number;
  };
}

export interface GuanyaoPressureSeedTriplet {
  seeds: GuanyaoPressureSeed[];
  frontStage: Array<{
    id: string;
    surface: string;
    shell: string;
  }>;
  strategy: {
    source: "DRAFT_POOL_V1";
    totalCandidates: number;
    selectionMode: "CONTEXTUAL_TRIPLET";
  };
}

export interface GuanyaoSelectedPressureSeedContext {
  selectedPressureSeedId: string;
  matrixCode: string;
  pressureField: GuanyaoPressureField;
  pressureNature: GuanyaoPressureNature;
  primaryRelation: GuanyaoCoreRelation;
  surface: string;
  shell: string;
  core: GuanyaoPressureSeed["core"];
  tags: string[];
  mappingHint: string;
  pressureIntensity: number;
  pressureConfidence: number;
}

export interface GuanyaoPressureSeedSceneBindingAuditResult {
  ok: boolean;
  totalSeeds: number;
  errors: string[];
  sampleTripletSize: number;
  sampleIntensity: number;
  sampleConfidence: number;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const hasIntersection = <T>(left: T[] | undefined, right: T[]): boolean =>
  Boolean(left?.some((item) => right.includes(item)));

export function getPressureSeedSceneFrontStage(seed: GuanyaoPressureSeed): {
  surface: string;
  shell: string;
} {
  return getPressureSeedFrontStage(seed);
}

export function scorePressureSeedForScene(
  seed: GuanyaoPressureSeed,
  context: GuanyaoPressureSeedSceneContext = {},
): GuanyaoPressureSeedSceneCandidate {
  const baseline = 10;
  const isExcluded = context.excludeSeedIds?.includes(seed.id) ?? false;
  const ageBias = context.ageSegment
    ? (seed.ageBias.includes(context.ageSegment) ? 20 : 0) + (seed.primaryAge === context.ageSegment ? 10 : 0)
    : 0;
  const fieldBias = context.preferredFields?.includes(seed.pressureField) ? 20 : 0;
  const natureBias = context.preferredNatures?.includes(seed.pressureNature) ? 16 : 0;
  const relationBias = context.preferredRelations
    ? (context.preferredRelations.includes(seed.primaryRelation) ? 22 : 0) +
      (hasIntersection(context.preferredRelations, seed.relationBias) ? 12 : 0)
    : 0;
  const freshness = (context.recentMatrixCodes?.includes(seed.matrixCode) ? -12 : 0) + (isExcluded ? -999 : 0);
  const rawScore = baseline + ageBias + fieldBias + natureBias + relationBias + freshness;

  return {
    seed,
    score: isExcluded ? rawScore : Math.max(0, rawScore),
    scoreBreakdown: {
      ageBias,
      fieldBias,
      natureBias,
      relationBias,
      freshness,
      baseline,
    },
  };
}

export function getPressureSeedSceneTriplet(
  context: GuanyaoPressureSeedSceneContext = {},
): GuanyaoPressureSeedTriplet {
  const candidates = GUANYAO_PRESSURE_SEED_DRAFT_POOL.map((seed) => scorePressureSeedForScene(seed, context))
    .filter((candidate) => !(context.excludeSeedIds?.includes(candidate.seed.id) ?? false))
    .sort((a, b) => b.score - a.score || a.seed.id.localeCompare(b.seed.id));

  const selected: GuanyaoPressureSeed[] = [];
  const selectedMatrixCodes = new Set<string>();

  for (const candidate of candidates) {
    if (selected.length >= 3) break;
    if (!selectedMatrixCodes.has(candidate.seed.matrixCode)) {
      selected.push(candidate.seed);
      selectedMatrixCodes.add(candidate.seed.matrixCode);
    }
  }

  for (const candidate of candidates) {
    if (selected.length >= 3) break;
    if (!selected.some((seed) => seed.id === candidate.seed.id)) {
      selected.push(candidate.seed);
    }
  }

  return {
    seeds: selected,
    frontStage: selected.map((seed) => ({
      id: seed.id,
      ...getPressureSeedSceneFrontStage(seed),
    })),
    strategy: {
      source: "DRAFT_POOL_V1",
      totalCandidates: candidates.length,
      selectionMode: "CONTEXTUAL_TRIPLET",
    },
  };
}

export function derivePressureSeedIntensity(
  seed: GuanyaoPressureSeed,
  context: GuanyaoPressureSeedSceneContext = {},
): number {
  const relationPrimary = context.preferredRelations?.includes(seed.primaryRelation) ? 12 : 0;
  const relationBias = hasIntersection(context.preferredRelations, seed.relationBias) ? 8 : 0;
  const primaryAge = context.ageSegment === seed.primaryAge ? 8 : 0;
  const ageBias = context.ageSegment && seed.ageBias.includes(context.ageSegment) ? 5 : 0;
  const natureWeight = ["CONTROL", "SURVIVAL", "ATTACHMENT"].includes(seed.pressureNature) ? 6 : 3;
  const recentPenalty = context.recentMatrixCodes?.includes(seed.matrixCode) ? -6 : 0;

  return clamp(60 + relationPrimary + relationBias + primaryAge + ageBias + natureWeight + recentPenalty, 40, 96);
}

export function derivePressureSeedConfidence(
  seed: GuanyaoPressureSeed,
  context: GuanyaoPressureSeedSceneContext = {},
): number {
  const primaryAge = context.ageSegment === seed.primaryAge ? 0.1 : 0;
  const ageBias = context.ageSegment && seed.ageBias.includes(context.ageSegment) ? 0.06 : 0;
  const relationPrimary = context.preferredRelations?.includes(seed.primaryRelation) ? 0.12 : 0;
  const relationBias = hasIntersection(context.preferredRelations, seed.relationBias) ? 0.08 : 0;
  const fieldBias = context.preferredFields?.includes(seed.pressureField) ? 0.06 : 0;
  const natureBias = context.preferredNatures?.includes(seed.pressureNature) ? 0.06 : 0;

  return clamp(0.64 + primaryAge + ageBias + relationPrimary + relationBias + fieldBias + natureBias, 0.52, 0.94);
}

export function buildSelectedPressureSeedContext(
  seed: GuanyaoPressureSeed,
  context: GuanyaoPressureSeedSceneContext = {},
): GuanyaoSelectedPressureSeedContext {
  return {
    selectedPressureSeedId: seed.id,
    matrixCode: seed.matrixCode,
    pressureField: seed.pressureField,
    pressureNature: seed.pressureNature,
    primaryRelation: seed.primaryRelation,
    surface: seed.surface,
    shell: seed.shell,
    core: seed.core,
    tags: seed.tags,
    mappingHint: seed.mappingHint,
    pressureIntensity: derivePressureSeedIntensity(seed, context),
    pressureConfidence: derivePressureSeedConfidence(seed, context),
  };
}

export function auditGuanyaoPressureSeedSceneBindingStrategy(): GuanyaoPressureSeedSceneBindingAuditResult {
  const errors: string[] = [];
  const sampleTriplet = getPressureSeedSceneTriplet();
  const sampleSeed = sampleTriplet.seeds[0];
  const sampleSelectedContext = sampleSeed ? buildSelectedPressureSeedContext(sampleSeed) : undefined;
  const forbiddenFrontStageKeys = [
    "core",
    "tags",
    "mappingHint",
    "pressureField",
    "pressureNature",
    "primaryAge",
    "ageBias",
    "primaryRelation",
    "relationBias",
    "matrixCode",
  ];

  if (GUANYAO_PRESSURE_SEED_DRAFT_POOL.length !== 72) {
    errors.push(`total seeds expected 72, got ${GUANYAO_PRESSURE_SEED_DRAFT_POOL.length}`);
  }
  if (sampleTriplet.seeds.length !== 3) {
    errors.push(`sample triplet expected 3, got ${sampleTriplet.seeds.length}`);
  }
  if (sampleTriplet.seeds.length === 0) {
    errors.push("sample triplet seeds empty");
  }

  sampleTriplet.frontStage.forEach((frontSeed) => {
    const keys = Object.keys(frontSeed).sort().join(",");
    if (keys !== "id,shell,surface") {
      errors.push(`${frontSeed.id} frontStage keys expected id,shell,surface, got ${keys}`);
    }
    forbiddenFrontStageKeys.forEach((key) => {
      if (key in frontSeed) {
        errors.push(`${frontSeed.id} frontStage exposes ${key}`);
      }
    });
  });

  if (!sampleSelectedContext) {
    errors.push("selected pressure seed context empty");
  } else {
    const requiredContextKeys: Array<keyof GuanyaoSelectedPressureSeedContext> = [
      "selectedPressureSeedId",
      "matrixCode",
      "pressureField",
      "pressureNature",
      "primaryRelation",
      "surface",
      "shell",
      "core",
      "tags",
      "mappingHint",
      "pressureIntensity",
      "pressureConfidence",
    ];
    requiredContextKeys.forEach((key) => {
      if (!(key in sampleSelectedContext)) {
        errors.push(`selected context missing ${key}`);
      }
    });
    if (sampleSelectedContext.pressureIntensity < 0 || sampleSelectedContext.pressureIntensity > 100) {
      errors.push(`pressureIntensity out of range: ${sampleSelectedContext.pressureIntensity}`);
    }
    if (sampleSelectedContext.pressureConfidence < 0 || sampleSelectedContext.pressureConfidence > 1) {
      errors.push(`pressureConfidence out of range: ${sampleSelectedContext.pressureConfidence}`);
    }
  }

  return {
    ok: errors.length === 0,
    totalSeeds: GUANYAO_PRESSURE_SEED_DRAFT_POOL.length,
    errors,
    sampleTripletSize: sampleTriplet.seeds.length,
    sampleIntensity: sampleSelectedContext?.pressureIntensity ?? 0,
    sampleConfidence: sampleSelectedContext?.pressureConfidence ?? 0,
  };
}
