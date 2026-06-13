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
    compositionMode: "ANCHOR_STRONG_ADJACENT";
    anchorSeedId?: string;
    strongNeighborSeedId?: string;
    adjacentSeedId?: string;
    relation?: {
      strongAxisReason: string[];
      adjacentAxisReason: string[];
    };
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
  compositionMode?: string;
  anchorSeedId?: string;
  strongNeighborSeedId?: string;
  adjacentSeedId?: string;
  sampleIntensity: number;
  sampleConfidence: number;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const hasIntersection = <T>(left: T[] | undefined, right: T[]): boolean =>
  Boolean(left?.some((item) => right.includes(item)));

function hasAgeOverlap(a: GuanyaoPressureSeed, b: GuanyaoPressureSeed): boolean {
  return hasIntersection(a.ageBias, b.ageBias);
}

function hasRelationOverlap(a: GuanyaoPressureSeed, b: GuanyaoPressureSeed): boolean {
  return hasIntersection(a.relationBias, b.relationBias);
}

function getStrongAxisReasons(seed: GuanyaoPressureSeed, anchor: GuanyaoPressureSeed): string[] {
  const reasons: string[] = [];

  if (seed.pressureNature === anchor.pressureNature) reasons.push("same pressureNature");
  if (seed.pressureField === anchor.pressureField) reasons.push("same pressureField");
  if (seed.primaryRelation === anchor.primaryRelation) reasons.push("same primaryRelation");
  if (hasRelationOverlap(seed, anchor)) reasons.push("relationBias overlap");
  if (hasAgeOverlap(seed, anchor)) reasons.push("ageBias overlap");
  if (seed.primaryAge === anchor.primaryAge) reasons.push("same primaryAge");

  return reasons;
}

function getAdjacentAxisReasons(
  seed: GuanyaoPressureSeed,
  anchor: GuanyaoPressureSeed,
  neighbor?: GuanyaoPressureSeed,
): string[] {
  const reasons: string[] = [];

  if (seed.pressureNature === anchor.pressureNature) reasons.push("same pressureNature as anchor");
  if (seed.pressureField === anchor.pressureField) reasons.push("same pressureField as anchor");
  if (hasRelationOverlap(seed, anchor)) reasons.push("relationBias overlap with anchor");
  if (hasAgeOverlap(seed, anchor)) reasons.push("ageBias overlap with anchor");
  if (neighbor && seed.pressureNature === neighbor.pressureNature) reasons.push("same pressureNature as neighbor");
  if (neighbor && seed.pressureField === neighbor.pressureField) reasons.push("same pressureField as neighbor");

  return reasons;
}

function getStrongAxisScore(seed: GuanyaoPressureSeed, anchor: GuanyaoPressureSeed): number {
  return (
    (seed.pressureNature === anchor.pressureNature ? 40 : 0) +
    (seed.pressureField === anchor.pressureField ? 30 : 0) +
    (seed.primaryRelation === anchor.primaryRelation ? 24 : 0) +
    (hasRelationOverlap(seed, anchor) ? 16 : 0) +
    (hasAgeOverlap(seed, anchor) ? 12 : 0) +
    (seed.primaryAge === anchor.primaryAge ? 8 : 0)
  );
}

function getAdjacentAxisScore(
  seed: GuanyaoPressureSeed,
  anchor: GuanyaoPressureSeed,
  neighbor?: GuanyaoPressureSeed,
): number {
  return (
    (seed.pressureNature === anchor.pressureNature ? 24 : 0) +
    (seed.pressureField === anchor.pressureField ? 20 : 0) +
    (hasRelationOverlap(seed, anchor) ? 14 : 0) +
    (hasAgeOverlap(seed, anchor) ? 12 : 0) +
    (neighbor && seed.pressureNature === neighbor.pressureNature ? 12 : 0) +
    (neighbor && seed.pressureField === neighbor.pressureField ? 10 : 0)
  );
}

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

  const anchorCandidate = candidates[0];
  const anchor = anchorCandidate?.seed;
  const remainingCandidates = anchor
    ? candidates.filter((candidate) => candidate.seed.id !== anchor.id)
    : [];
  const strongNeighborCandidate = anchor
    ? [...remainingCandidates]
        .map((candidate) => ({
          ...candidate,
          axisScore: getStrongAxisScore(candidate.seed, anchor),
        }))
        .filter((candidate) => candidate.axisScore > 0)
        .sort((a, b) => b.axisScore + b.score - (a.axisScore + a.score) || a.seed.id.localeCompare(b.seed.id))[0] ??
      remainingCandidates[0]
    : undefined;
  const strongNeighbor = strongNeighborCandidate?.seed;
  const adjacentCandidates = remainingCandidates.filter((candidate) => candidate.seed.id !== strongNeighbor?.id);
  const adjacentCandidate = anchor
    ? [...adjacentCandidates]
        .map((candidate) => ({
          ...candidate,
          axisScore: getAdjacentAxisScore(candidate.seed, anchor, strongNeighbor),
        }))
        .filter((candidate) => candidate.axisScore > 0)
        .sort((a, b) => b.axisScore + b.score - (a.axisScore + a.score) || a.seed.id.localeCompare(b.seed.id))[0] ??
      adjacentCandidates[0]
    : undefined;
  const adjacentSeed = adjacentCandidate?.seed;
  const selected = [anchor, strongNeighbor, adjacentSeed].filter((seed): seed is GuanyaoPressureSeed => Boolean(seed));
  const strongAxisReason = anchor && strongNeighbor ? getStrongAxisReasons(strongNeighbor, anchor) : [];
  const adjacentAxisReason = anchor && adjacentSeed ? getAdjacentAxisReasons(adjacentSeed, anchor, strongNeighbor) : [];

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
      compositionMode: "ANCHOR_STRONG_ADJACENT",
      anchorSeedId: anchor?.id,
      strongNeighborSeedId: strongNeighbor?.id,
      adjacentSeedId: adjacentSeed?.id,
      relation: {
        strongAxisReason,
        adjacentAxisReason,
      },
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
  if (new Set(sampleTriplet.seeds.map((seed) => seed.id)).size !== sampleTriplet.seeds.length) {
    errors.push("sample triplet contains duplicate seed ids");
  }
  if (sampleTriplet.strategy.selectionMode !== "CONTEXTUAL_TRIPLET") {
    errors.push(`selectionMode expected CONTEXTUAL_TRIPLET, got ${sampleTriplet.strategy.selectionMode}`);
  }
  if (sampleTriplet.strategy.compositionMode !== "ANCHOR_STRONG_ADJACENT") {
    errors.push(`compositionMode expected ANCHOR_STRONG_ADJACENT, got ${sampleTriplet.strategy.compositionMode}`);
  }
  const [anchorSeed, strongNeighborSeed, adjacentSeed] = sampleTriplet.seeds;
  if (anchorSeed && strongNeighborSeed && getStrongAxisScore(strongNeighborSeed, anchorSeed) <= 0) {
    errors.push(`${strongNeighborSeed.id} does not share a strong axis with ${anchorSeed.id}`);
  }
  if (
    anchorSeed &&
    adjacentSeed &&
    getAdjacentAxisScore(adjacentSeed, anchorSeed, strongNeighborSeed) <= 0
  ) {
    errors.push(`${adjacentSeed.id} does not share an adjacent axis with ${anchorSeed.id}`);
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
    compositionMode: sampleTriplet.strategy.compositionMode,
    anchorSeedId: sampleTriplet.strategy.anchorSeedId,
    strongNeighborSeedId: sampleTriplet.strategy.strongNeighborSeedId,
    adjacentSeedId: sampleTriplet.strategy.adjacentSeedId,
    sampleIntensity: sampleSelectedContext?.pressureIntensity ?? 0,
    sampleConfidence: sampleSelectedContext?.pressureConfidence ?? 0,
  };
}
