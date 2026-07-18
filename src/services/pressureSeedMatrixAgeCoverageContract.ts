import { GUANYAO_PRESSURE_SEED_MATRIX_V2 } from "../data/guanyaoPressureSeedMatrix";
import type {
  PressureSeedAgeGroup,
  PressureSeedField,
  PressureSeedMatrixNode,
} from "../types/guanyaoPressureSeed";
import type {
  PressureSeedMatrixAgeCatalogCoverage,
  PressureSeedMatrixAgeCatalogEligibilityResult,
  PressureSeedMatrixAgeCoverageBoundary,
  PressureSeedMatrixAgeCoverageNode,
  PressureSeedMatrixAgeCoverageSnapshot,
} from "../types/pressureSeedMatrixAgeCoverageContract";

export const PRESSURE_SEED_MATRIX_TARGET_AGE_GROUPS = Object.freeze([
  "YOUTH",
  "ESTABLISHING",
  "MID_LIFE",
  "RESTRUCTURING",
  "SIXTY_PLUS",
] as const satisfies readonly PressureSeedAgeGroup[]);

export const PRESSURE_SEED_MATRIX_TARGET_FIELDS = Object.freeze([
  "POWER",
  "INTEREST",
  "RELATION",
  "FAMILY",
  "SOCIAL",
  "EXISTENCE",
] as const satisfies readonly PressureSeedField[]);

export const PRESSURE_SEED_MATRIX_AGE_COVERAGE_BOUNDARY:
  PressureSeedMatrixAgeCoverageBoundary = Object.freeze({
    coverageContractOnly: true,
    existingLockedMatrixReadOnly: true,
    explicitAgeCatalogRequired: true,
    allSixPressureFieldsRequired: true,
    fifteenSeedsPerNodeRequired: true,
    noAgeCatalogFallback: true,
    noDraftPoolPromotion: true,
    noMatrixMutation: true,
    noEngineInvocation: true,
    noCandidateAssembly: true,
    noCaptureExecution: true,
    noRuntimeIntegration: true,
    noUiIntegration: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const EXPECTED_SEEDS_PER_NODE = 15 as const;

const isReadySeed = (seed: PressureSeedMatrixNode["seeds"][number]): boolean =>
  Boolean(
    seed.id.trim() &&
      seed.surface.trim() &&
      seed.shell.trim() &&
      seed.pressureNature.trim(),
  );

const findUniqueNode = (
  ageGroup: PressureSeedAgeGroup,
  pressureField: PressureSeedField,
): PressureSeedMatrixNode | null => {
  const matches = GUANYAO_PRESSURE_SEED_MATRIX_V2.filter(
    (node) =>
      node.ageGroup === ageGroup && node.pressureField === pressureField,
  );
  return matches.length === 1 ? matches[0] : null;
};

const buildCoverageNode = (
  ageGroup: PressureSeedAgeGroup,
  pressureField: PressureSeedField,
): PressureSeedMatrixAgeCoverageNode => {
  const node = findUniqueNode(ageGroup, pressureField);
  const readySeedCount = node?.seeds.filter(isReadySeed).length ?? 0;
  const isLocked =
    node?.status === "locked" &&
    node.seeds.length === EXPECTED_SEEDS_PER_NODE &&
    readySeedCount === EXPECTED_SEEDS_PER_NODE;

  return Object.freeze({
    nodeReferenceId: `pressure-seed-matrix:${ageGroup}:${pressureField}`,
    ageGroup,
    pressureField,
    expectedSeedCount: EXPECTED_SEEDS_PER_NODE,
    readySeedCount,
    status: isLocked ? ("LOCKED" as const) : ("NOT_READY" as const),
  });
};

const buildCatalogCoverage = (
  ageGroup: PressureSeedAgeGroup,
): PressureSeedMatrixAgeCatalogCoverage => {
  const nodes = Object.freeze(
    PRESSURE_SEED_MATRIX_TARGET_FIELDS.map((pressureField) =>
      buildCoverageNode(ageGroup, pressureField),
    ),
  );
  const lockedNodeCount = nodes.filter(
    (node) => node.status === "LOCKED",
  ).length;
  const readySeedCount = nodes.reduce(
    (total, node) => total + node.readySeedCount,
    0,
  );

  return Object.freeze({
    ageGroup,
    expectedNodeCount: 6 as const,
    lockedNodeCount,
    expectedSeedCount: 90 as const,
    readySeedCount,
    status:
      lockedNodeCount === PRESSURE_SEED_MATRIX_TARGET_FIELDS.length
        ? ("LOCKED" as const)
        : ("NOT_READY" as const),
    nodes,
  });
};

export function getPressureSeedMatrixAgeCoverageSnapshot(): PressureSeedMatrixAgeCoverageSnapshot {
  const catalogs = Object.freeze(
    PRESSURE_SEED_MATRIX_TARGET_AGE_GROUPS.map(buildCatalogCoverage),
  );
  const lockedNodeCount = catalogs.reduce(
    (total, catalog) => total + catalog.lockedNodeCount,
    0,
  );
  const readySeedCount = catalogs.reduce(
    (total, catalog) => total + catalog.readySeedCount,
    0,
  );
  const targetNodeCount = 30;
  const targetSeedCount = 450;

  return Object.freeze({
    schemaVersion: "GUANYAO_PRESSURE_SEED_MATRIX_AGE_COVERAGE_V1" as const,
    source: "pressure_seed_matrix_age_coverage_contract" as const,
    targetAgeGroupCount: 5 as const,
    targetPressureFieldCount: 6 as const,
    targetNodeCount: 30 as const,
    targetSeedCount: 450 as const,
    lockedNodeCount,
    readySeedCount,
    missingNodeCount: targetNodeCount - lockedNodeCount,
    missingSeedCount: targetSeedCount - readySeedCount,
    productionReadiness:
      lockedNodeCount === targetNodeCount
        ? ("READY" as const)
        : ("PARTIAL" as const),
    catalogs,
    boundary: PRESSURE_SEED_MATRIX_AGE_COVERAGE_BOUNDARY,
  });
}

export function resolvePressureSeedMatrixAgeCatalogEligibility(
  ageGroup: PressureSeedAgeGroup,
): PressureSeedMatrixAgeCatalogEligibilityResult {
  const snapshot = getPressureSeedMatrixAgeCoverageSnapshot();
  const catalog = snapshot.catalogs.find(
    (candidate) => candidate.ageGroup === ageGroup,
  );

  if (!catalog) {
    throw new Error(`PRESSURE_SEED_AGE_CATALOG_CONTRACT_MISSING:${ageGroup}`);
  }

  if (catalog.status !== "LOCKED") {
    return Object.freeze({
      status: "SOURCE_NOT_READY" as const,
      source: "pressure_seed_matrix_age_coverage_contract" as const,
      ageGroup,
      catalog,
      reason: "AGE_CATALOG_NOT_READY" as const,
      boundary: PRESSURE_SEED_MATRIX_AGE_COVERAGE_BOUNDARY,
    });
  }

  return Object.freeze({
    status: "READY" as const,
    source: "pressure_seed_matrix_age_coverage_contract" as const,
    ageGroup,
    catalog,
    reason: null,
    boundary: PRESSURE_SEED_MATRIX_AGE_COVERAGE_BOUNDARY,
  });
}
