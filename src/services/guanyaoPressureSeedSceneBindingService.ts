// GUANYAO pressure seed generation is one-way only:
// Pressure State Input -> Pressure Seed Matrix -> Pressure Seed Output.
// External semantic systems are never causal inputs.
import { GUANYAO_PRESSURE_SEED_MATRIX_V2 } from "../data/guanyaoPressureSeedMatrix";
import type {
  GuanyaoAgeSegment,
  GuanyaoCoreRelation,
  GuanyaoPressureField,
  GuanyaoPressureNature,
  GuanyaoPressureSeed,
  PressureSeedAgeGroup,
  PressureSeedField,
  PressureSeedMatrixNode,
  PressureSeedMatrixSeed,
} from "../types/guanyaoPressureSeed";

export interface GuanyaoPressureSeedSceneContext {
  ageSegment?: GuanyaoAgeSegment;
  pressureSeedInput?: Partial<PressureSeedInput>;
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
    source: "BEHAVIORAL_INERTIA_COMPRESSION_ENGINE";
    matrixSource: "SEED_MATRIX_V2";
    totalCandidates: number;
    selectionMode: "BEHAVIORAL_STATE_COMPRESSION";
    compositionMode: "POST_COMPRESSION_TRIPLET";
    ageGroup?: PressureSeedAgeGroup;
    pressureField?: PressureSeedField;
    anchorSeedId?: string;
    strongNeighborSeedId?: string;
    adjacentSeedId?: string;
    relation?: {
      strongAxisReason: string[];
      adjacentAxisReason: string[];
    };
  };
}

export interface GuanyaoPressureSeedMatrixSlotContext {
  ageSegment: GuanyaoAgeSegment;
  pressureField: GuanyaoPressureField;
  fieldSeedOffset: number;
}

export interface GuanyaoSelectedPressureSeedContext {
  selectedPressureSeedId: string;
  engineSource: "BEHAVIORAL_INERTIA_COMPRESSION_ENGINE";
  matrixCode: string;
  ageGroup?: PressureSeedAgeGroup;
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

export type PressureSeedDimensionBias = "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

export type PressureSeedInput = {
  pressureIntensity: number;
  currentState: string;
  dimensionBias: PressureSeedDimensionBias;
  seedCategory: PressureSeedField;
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const hasIntersection = <T>(left: T[] | undefined, right: T[]): boolean =>
  Boolean(left?.some((item) => right.includes(item)));

const pressureFieldRotationByAgeGroup: Record<PressureSeedAgeGroup, PressureSeedField[]> = {
  YOUTH: ["EXISTENCE", "POWER", "SOCIAL", "FAMILY", "RELATION", "INTEREST"],
  ESTABLISHING: ["POWER", "RELATION", "FAMILY", "EXISTENCE", "INTEREST", "SOCIAL"],
  MID_LIFE: ["POWER", "INTEREST", "FAMILY", "RELATION", "EXISTENCE", "SOCIAL"],
  RESTRUCTURING: ["POWER", "FAMILY", "EXISTENCE", "SOCIAL", "INTEREST", "RELATION"],
  SIXTY_PLUS: ["EXISTENCE", "FAMILY", "SOCIAL", "POWER", "INTEREST", "RELATION"],
};

const defaultAgeGroup: PressureSeedAgeGroup = "ESTABLISHING";
const defaultPressureField: PressureSeedField = "POWER";

const primaryRelationByPressureField: Record<PressureSeedField, GuanyaoCoreRelation> = {
  POWER: "BOSS",
  INTEREST: "PARTNER_BUSINESS",
  RELATION: "PARTNER_ROMANTIC",
  FAMILY: "PARENT",
  SOCIAL: "COLLEAGUE",
  EXISTENCE: "SELF",
};

const relationBiasByPressureField: Record<PressureSeedField, GuanyaoCoreRelation[]> = {
  POWER: ["BOSS", "SYSTEM"],
  INTEREST: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
  RELATION: ["PARTNER_ROMANTIC", "FRIEND"],
  FAMILY: ["PARENT", "CHILD"],
  SOCIAL: ["COLLEAGUE", "FRIEND", "SYSTEM"],
  EXISTENCE: ["SELF", "SYSTEM"],
};

const matrixSemanticHintsByPressureField: Record<PressureSeedField, { mechanism: string; engineHint: string; mappingHint: string; tags: string[] }> = {
  POWER: {
    mechanism: "权力、评价与控制权压力正在进入现实场。",
    engineHint: "控制权 决策权 权力 评价 规则 谁说了算",
    mappingHint: "权力结构与评价场压住用户位置。",
    tags: ["权力", "评价", "控制权", "决策权", "规则"],
  },
  INTEREST: {
    mechanism: "资源、利益与交换结构正在进入现实场。",
    engineHint: "关系 冲突 交换 合作 谈判 资源 分成",
    mappingHint: "资源交换与利益分配正在制造外部压力。",
    tags: ["利益", "资源", "交换", "合作", "谈判"],
  },
  RELATION: {
    mechanism: "关系回应、亲密连接与沟通成本正在进入现实场。",
    engineHint: "关系 冲突 沟通 回应 缓和 交换",
    mappingHint: "关系反馈与沟通摩擦正在牵引用户。",
    tags: ["关系", "回应", "沟通", "冲突", "交换"],
  },
  FAMILY: {
    mechanism: "家庭责任、控制与托底需求正在进入现实场。",
    engineHint: "家庭 财务 责任 承载 托底 供养 家里",
    mappingHint: "家庭承载与责任结构压向用户。",
    tags: ["家庭", "责任", "承载", "托底", "供养"],
  },
  SOCIAL: {
    mechanism: "归属、人群位置与外部评价正在进入现实场。",
    engineHint: "关系 冲突 沟通 圈子 归属 合作",
    mappingHint: "社会归属与群体关系正在制造压力。",
    tags: ["归属", "圈子", "关系", "人群", "评价"],
  },
  EXISTENCE: {
    mechanism: "方向悬置、阶段压力与状态不确定正在进入现实场。",
    engineHint: "不知道 选择 分岔 未成形 方向 状态",
    mappingHint: "方向悬置与阶段压力正在压住当前状态。",
    tags: ["方向", "状态", "悬置", "不确定", "阶段"],
  },
};

const dimensionBiasByPressureField: Record<PressureSeedField, PressureSeedDimensionBias> = {
  POWER: "behavior",
  INTEREST: "motivation",
  RELATION: "emotion",
  FAMILY: "body",
  SOCIAL: "memory",
  EXISTENCE: "thought",
};

const pressureFieldByDimensionBias: Record<PressureSeedDimensionBias, PressureSeedField> = {
  body: "FAMILY",
  emotion: "RELATION",
  thought: "EXISTENCE",
  behavior: "POWER",
  memory: "SOCIAL",
  motivation: "INTEREST",
};

const obsoleteMatrixStateNature = "ID" + "ENTITY";

const pressureStateNatureByMatrixNature: Partial<Record<string, GuanyaoPressureNature>> = {
  [obsoleteMatrixStateNature]: "EVALUATION",
};

function normalizeMatrixPressureNature(pressureNature: string): GuanyaoPressureNature {
  return pressureStateNatureByMatrixNature[pressureNature] ?? (pressureNature as GuanyaoPressureNature);
}

function normalizePressureSeedInput(context: GuanyaoPressureSeedSceneContext = {}): PressureSeedInput {
  const seedCategory = context.pressureSeedInput?.seedCategory ?? context.preferredFields?.[0] ?? defaultPressureField;
  const dimensionBias =
    context.pressureSeedInput?.dimensionBias ??
    dimensionBiasByPressureField[seedCategory] ??
    dimensionBiasByPressureField[defaultPressureField];

  return {
    pressureIntensity: clamp(context.pressureSeedInput?.pressureIntensity ?? 64, 0, 100),
    currentState: context.pressureSeedInput?.currentState?.trim() || seedCategory,
    dimensionBias,
    seedCategory,
  };
}

function derivePressureStatePreferences(input: PressureSeedInput): Pick<
  GuanyaoPressureSeedSceneContext,
  "preferredFields" | "preferredNatures" | "preferredRelations"
> {
  const preferredFields: GuanyaoPressureField[] = [input.seedCategory, pressureFieldByDimensionBias[input.dimensionBias]];
  const preferredNatures: GuanyaoPressureNature[] =
    input.pressureIntensity >= 82
      ? ["SURVIVAL", "CONTROL"]
      : input.pressureIntensity >= 68
        ? ["CONTROL", "EVALUATION"]
        : input.pressureIntensity >= 52
          ? ["OBLIGATION", "RESOURCE"]
          : ["BELONGING", "ATTACHMENT"];
  const preferredRelations: GuanyaoCoreRelation[] = relationBiasByPressureField[input.seedCategory];

  return {
    preferredFields: [...new Set(preferredFields)],
    preferredNatures: [...new Set(preferredNatures)],
    preferredRelations: [...new Set(preferredRelations)],
  };
}

function withPressureStateContext(
  context: GuanyaoPressureSeedSceneContext = {},
): GuanyaoPressureSeedSceneContext {
  const input = normalizePressureSeedInput(context);
  const preferences = derivePressureStatePreferences(input);

  return {
    ...context,
    pressureSeedInput: {
      ...input,
      ...context.pressureSeedInput,
    },
    preferredFields: context.preferredFields ?? preferences.preferredFields,
    preferredNatures: context.preferredNatures ?? preferences.preferredNatures,
    preferredRelations: context.preferredRelations ?? preferences.preferredRelations,
  };
}

function resolveRuntimeAgeGroup(context: GuanyaoPressureSeedSceneContext = {}): PressureSeedAgeGroup {
  if (context.ageSegment) return context.ageSegment;
  return defaultAgeGroup;
}

function findMatrixNode(ageGroup: PressureSeedAgeGroup, pressureField: PressureSeedField): PressureSeedMatrixNode | undefined {
  return GUANYAO_PRESSURE_SEED_MATRIX_V2.find(
    (node) => node.ageGroup === ageGroup && node.pressureField === pressureField,
  );
}

function hasAvailableSeed(node: PressureSeedMatrixNode | undefined, context: GuanyaoPressureSeedSceneContext = {}): node is PressureSeedMatrixNode {
  return Boolean(node && node.seeds.some((seed) => !context.excludeSeedIds?.includes(seed.id)));
}

function resolvePressureFieldForTriplet(
  ageGroup: PressureSeedAgeGroup,
  context: GuanyaoPressureSeedSceneContext = {},
): PressureSeedField {
  const rotation = pressureFieldRotationByAgeGroup[ageGroup] ?? pressureFieldRotationByAgeGroup[defaultAgeGroup];
  const preferredField = context.preferredFields?.find((field): field is PressureSeedField => rotation.includes(field));
  if (preferredField) return preferredField;

  const tripletOffset = Math.floor((context.excludeSeedIds?.length ?? 0) / 3);
  return rotation[tripletOffset % rotation.length] ?? defaultPressureField;
}

function resolveMatrixNodeForTriplet(context: GuanyaoPressureSeedSceneContext = {}): PressureSeedMatrixNode | undefined {
  const ageGroup = resolveRuntimeAgeGroup(context);
  const rotation = pressureFieldRotationByAgeGroup[ageGroup] ?? pressureFieldRotationByAgeGroup[defaultAgeGroup];
  const startField = resolvePressureFieldForTriplet(ageGroup, context);
  const startIndex = Math.max(rotation.indexOf(startField), 0);

  for (let index = 0; index < rotation.length; index += 1) {
    const pressureField = rotation[(startIndex + index) % rotation.length];
    const node = findMatrixNode(ageGroup, pressureField);
    if (hasAvailableSeed(node, context)) return node;

    const fallbackNode = findMatrixNode(defaultAgeGroup, pressureField);
    if (hasAvailableSeed(fallbackNode, context)) return fallbackNode;
  }

  return findMatrixNode(defaultAgeGroup, defaultPressureField);
}

function toPressureSeedCandidateFromMatrixSeed(
  node: PressureSeedMatrixNode,
  matrixSeed: PressureSeedMatrixSeed,
): GuanyaoPressureSeed {
  const semanticHint = matrixSemanticHintsByPressureField[node.pressureField];
  const pressureNature = normalizeMatrixPressureNature(matrixSeed.pressureNature);

  return {
    id: matrixSeed.id,
    matrixCode: `MATRIX_V2_${node.ageGroup}_${node.pressureField}`,
    pressureField: node.pressureField,
    pressureNature,
    primaryAge: node.ageGroup,
    ageBias: [node.ageGroup],
    primaryRelation: primaryRelationByPressureField[node.pressureField],
    relationBias: relationBiasByPressureField[node.pressureField],
    surface: matrixSeed.surface,
    core: {
      mechanism: semanticHint.mechanism,
      engineHint: semanticHint.engineHint,
    },
    shell: matrixSeed.shell,
    tags: [node.ageGroup, node.pressureField, pressureNature, ...semanticHint.tags],
    mappingHint: semanticHint.mappingHint,
  };
}

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
  return {
    surface: seed.surface,
    shell: seed.shell,
  };
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
  const pressureStateContext = withPressureStateContext(context);
  const node = resolveMatrixNodeForTriplet(pressureStateContext);
  if (!node) {
    console.warn("[guanyao] pressure seed matrix V2 node missing; triplet empty");
  }

  const selected = node
    ? node.seeds
        .filter((seed) => !(pressureStateContext.excludeSeedIds?.includes(seed.id) ?? false))
        .slice(0, 3)
        .map((seed) => toPressureSeedCandidateFromMatrixSeed(node, seed))
    : [];

  if (node && selected.length < 3) {
    selected.push(
      ...node.seeds
        .filter((seed) => !selected.some((selectedSeed) => selectedSeed.id === seed.id))
        .slice(0, 3 - selected.length)
        .map((seed) => toPressureSeedCandidateFromMatrixSeed(node, seed)),
    );
  }

  const [anchor, strongNeighbor, adjacentSeed] = selected;

  return {
    seeds: selected,
    frontStage: selected.map((seed) => ({
      id: seed.id,
      ...getPressureSeedSceneFrontStage(seed),
    })),
    strategy: {
      source: "BEHAVIORAL_INERTIA_COMPRESSION_ENGINE",
      matrixSource: "SEED_MATRIX_V2",
      totalCandidates: node?.seeds.length ?? 0,
      selectionMode: "BEHAVIORAL_STATE_COMPRESSION",
      compositionMode: "POST_COMPRESSION_TRIPLET",
      ageGroup: node?.ageGroup,
      pressureField: node?.pressureField,
      anchorSeedId: anchor?.id,
      strongNeighborSeedId: strongNeighbor?.id,
      adjacentSeedId: adjacentSeed?.id,
      relation: {
        strongAxisReason: node ? [`same matrix node: ${node.ageGroup}_${node.pressureField}`] : [],
        adjacentAxisReason: node ? [`same matrix node: ${node.ageGroup}_${node.pressureField}`] : [],
      },
    },
  };
}

export function getPressureSeedSceneCandidateAtMatrixSlot(
  context: GuanyaoPressureSeedMatrixSlotContext,
): GuanyaoPressureSeed | undefined {
  if (
    !Number.isInteger(context.fieldSeedOffset) ||
    context.fieldSeedOffset < 0
  ) {
    return undefined;
  }

  const node = findMatrixNode(context.ageSegment, context.pressureField);
  if (!node || node.status !== "locked") return undefined;

  const matrixSeed = node.seeds[context.fieldSeedOffset];
  return matrixSeed
    ? toPressureSeedCandidateFromMatrixSeed(node, matrixSeed)
    : undefined;
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
  const pressureStateContext = withPressureStateContext(context);

  return {
    selectedPressureSeedId: seed.id,
    engineSource: "BEHAVIORAL_INERTIA_COMPRESSION_ENGINE",
    matrixCode: seed.matrixCode,
    ageGroup: seed.primaryAge,
    pressureField: seed.pressureField,
    pressureNature: seed.pressureNature,
    primaryRelation: seed.primaryRelation,
    surface: seed.surface,
    shell: seed.shell,
    core: seed.core,
    tags: seed.tags,
    mappingHint: seed.mappingHint,
    pressureIntensity: derivePressureSeedIntensity(seed, pressureStateContext),
    pressureConfidence: derivePressureSeedConfidence(seed, pressureStateContext),
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

  const totalMatrixSeeds = GUANYAO_PRESSURE_SEED_MATRIX_V2.reduce((sum, node) => sum + node.seeds.length, 0);

  if (totalMatrixSeeds !== 90) {
    errors.push(`total matrix seeds expected 90, got ${totalMatrixSeeds}`);
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
  if (sampleTriplet.strategy.source !== "BEHAVIORAL_INERTIA_COMPRESSION_ENGINE") {
    errors.push(`source expected BEHAVIORAL_INERTIA_COMPRESSION_ENGINE, got ${sampleTriplet.strategy.source}`);
  }
  if (sampleTriplet.strategy.matrixSource !== "SEED_MATRIX_V2") {
    errors.push(`matrixSource expected SEED_MATRIX_V2, got ${sampleTriplet.strategy.matrixSource}`);
  }
  if (sampleTriplet.strategy.selectionMode !== "BEHAVIORAL_STATE_COMPRESSION") {
    errors.push(`selectionMode expected BEHAVIORAL_STATE_COMPRESSION, got ${sampleTriplet.strategy.selectionMode}`);
  }
  if (sampleTriplet.strategy.compositionMode !== "POST_COMPRESSION_TRIPLET") {
    errors.push(`compositionMode expected POST_COMPRESSION_TRIPLET, got ${sampleTriplet.strategy.compositionMode}`);
  }
  if (!sampleTriplet.strategy.ageGroup) {
    errors.push("sample triplet missing ageGroup");
  }
  if (!sampleTriplet.strategy.pressureField) {
    errors.push("sample triplet missing pressureField");
  }
  if (new Set(sampleTriplet.seeds.map((seed) => seed.matrixCode)).size !== 1) {
    errors.push("sample triplet seeds expected same matrixCode");
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
      "engineSource",
      "matrixCode",
      "ageGroup",
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
    totalSeeds: totalMatrixSeeds,
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
