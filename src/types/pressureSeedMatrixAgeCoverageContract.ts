import type {
  PressureSeedAgeGroup,
  PressureSeedField,
} from "./guanyaoPressureSeed";

export type PressureSeedMatrixAgeCoverageNodeStatus =
  | "LOCKED"
  | "NOT_READY";

export type PressureSeedMatrixAgeCoverageNode = Readonly<{
  nodeReferenceId: string;
  ageGroup: PressureSeedAgeGroup;
  pressureField: PressureSeedField;
  expectedSeedCount: 15;
  readySeedCount: number;
  status: PressureSeedMatrixAgeCoverageNodeStatus;
}>;

export type PressureSeedMatrixAgeCatalogCoverage = Readonly<{
  ageGroup: PressureSeedAgeGroup;
  expectedNodeCount: 6;
  lockedNodeCount: number;
  expectedSeedCount: 90;
  readySeedCount: number;
  status: PressureSeedMatrixAgeCoverageNodeStatus;
  nodes: readonly PressureSeedMatrixAgeCoverageNode[];
}>;

export type PressureSeedMatrixAgeCoverageBoundary = Readonly<{
  coverageContractOnly: true;
  existingLockedMatrixReadOnly: true;
  explicitAgeCatalogRequired: true;
  allSixPressureFieldsRequired: true;
  fifteenSeedsPerNodeRequired: true;
  noAgeCatalogFallback: true;
  noDraftPoolPromotion: true;
  noMatrixMutation: true;
  noEngineInvocation: true;
  noCandidateAssembly: true;
  noCaptureExecution: true;
  noRuntimeIntegration: true;
  noUiIntegration: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type PressureSeedMatrixAgeCoverageSnapshot = Readonly<{
  schemaVersion: "GUANYAO_PRESSURE_SEED_MATRIX_AGE_COVERAGE_V1";
  source: "pressure_seed_matrix_age_coverage_contract";
  targetAgeGroupCount: 5;
  targetPressureFieldCount: 6;
  targetNodeCount: 30;
  targetSeedCount: 450;
  lockedNodeCount: number;
  readySeedCount: number;
  missingNodeCount: number;
  missingSeedCount: number;
  productionReadiness: "READY" | "PARTIAL";
  catalogs: readonly PressureSeedMatrixAgeCatalogCoverage[];
  boundary: PressureSeedMatrixAgeCoverageBoundary;
}>;

export type PressureSeedMatrixAgeCatalogEligibilityResult =
  | Readonly<{
      status: "READY";
      source: "pressure_seed_matrix_age_coverage_contract";
      ageGroup: PressureSeedAgeGroup;
      catalog: PressureSeedMatrixAgeCatalogCoverage;
      reason: null;
      boundary: PressureSeedMatrixAgeCoverageBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY";
      source: "pressure_seed_matrix_age_coverage_contract";
      ageGroup: PressureSeedAgeGroup;
      catalog: PressureSeedMatrixAgeCatalogCoverage;
      reason: "AGE_CATALOG_NOT_READY";
      boundary: PressureSeedMatrixAgeCoverageBoundary;
    }>;
