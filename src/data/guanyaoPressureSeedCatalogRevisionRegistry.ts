import type { PressureSeedMatrixNode } from "../types/guanyaoPressureSeed";
import { GUANYAO_PRESSURE_SEED_MATRIX_V2 } from "./guanyaoPressureSeedMatrix";
import {
  GUANYAO_PRESSURE_SEED_TARGET_CATALOG_20260810,
  GUANYAO_PRESSURE_SEED_TARGET_CATALOG_DIGEST,
  GUANYAO_PRESSURE_SEED_TARGET_CATALOG_REVISION,
} from "./generated/guanyaoPressureSeedCatalog20260810FiveStage450";

export const GUANYAO_PRESSURE_SEED_LEGACY_CATALOG_REVISION =
  "GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0" as const;

export const GUANYAO_PRESSURE_SEED_ACTIVE_CATALOG_REVISION =
  GUANYAO_PRESSURE_SEED_TARGET_CATALOG_REVISION;

export type GuanyaoPressureSeedCatalogRevision =
  | typeof GUANYAO_PRESSURE_SEED_LEGACY_CATALOG_REVISION
  | typeof GUANYAO_PRESSURE_SEED_TARGET_CATALOG_REVISION;

export type GuanyaoPressureSeedCatalogArtifact = Readonly<{
  revision: GuanyaoPressureSeedCatalogRevision;
  digest: string;
  matrix: readonly PressureSeedMatrixNode[];
}>;

export type GuanyaoPressureSeedCatalogResolution =
  | Readonly<{ status: "READY"; artifact: GuanyaoPressureSeedCatalogArtifact; reason: null }>
  | Readonly<{
      status: "BLOCKED";
      artifact: null;
      reason: "CATALOG_REVISION_UNKNOWN" | "CATALOG_ARTIFACT_UNAVAILABLE";
    }>;

export const TARGET_450_NEW_CREATION_POLICY = "ENABLED" as
  | "ENABLED"
  | "SAFE_WITHHELD";

const legacyArtifact: GuanyaoPressureSeedCatalogArtifact = Object.freeze({
  revision: GUANYAO_PRESSURE_SEED_LEGACY_CATALOG_REVISION,
  digest: "legacy-production-baseline:114f11b36bfe93296ce5054fc9c661fed49dddc0",
  matrix: GUANYAO_PRESSURE_SEED_MATRIX_V2,
});

const targetArtifact: GuanyaoPressureSeedCatalogArtifact = Object.freeze({
  revision: GUANYAO_PRESSURE_SEED_TARGET_CATALOG_REVISION,
  digest: GUANYAO_PRESSURE_SEED_TARGET_CATALOG_DIGEST,
  matrix: GUANYAO_PRESSURE_SEED_TARGET_CATALOG_20260810,
});

const registry: ReadonlyMap<string, GuanyaoPressureSeedCatalogArtifact> =
  new Map([
    [legacyArtifact.revision, legacyArtifact],
    [targetArtifact.revision, targetArtifact],
  ]);

export function resolveGuanyaoPressureSeedCatalogRevision(
  revision: string,
): GuanyaoPressureSeedCatalogResolution {
  if (!revision.trim() || !registry.has(revision)) {
    return Object.freeze({
      status: "BLOCKED" as const,
      artifact: null,
      reason: "CATALOG_REVISION_UNKNOWN" as const,
    });
  }
  const artifact = registry.get(revision);
  if (!artifact?.matrix.length) {
    return Object.freeze({
      status: "BLOCKED" as const,
      artifact: null,
      reason: "CATALOG_ARTIFACT_UNAVAILABLE" as const,
    });
  }
  return Object.freeze({ status: "READY" as const, artifact, reason: null });
}

export function resolveGuanyaoPressureSeedActiveCatalog(): GuanyaoPressureSeedCatalogResolution {
  return resolveGuanyaoPressureSeedCatalogRevision(
    GUANYAO_PRESSURE_SEED_ACTIVE_CATALOG_REVISION,
  );
}
