/**
 * GUANYAO Persona Snapshot Cache
 *
 * Read-only cache adapter:
 * Engine -> Snapshot Cache -> MotherCard.
 *
 * This module does not import or call generation / inference engines.
 * It only normalizes already-locked cached output for static rendering.
 */

import { readPersistedPersonaOutputSnapshot } from "./guanyaoPersonaSnapshotPersistenceAdapter";

export type CachedStarOrigin =
  | {
      index?: number;
      intensity?: number;
      resonance?: number;
    }
  | string;

export type CachedPersonaOutput = {
  motherCode: string;
  fourSymbol: string;
  starOrigin: CachedStarOrigin;
  trigram: string;
};

export type MotherCardReadonlySnapshot = {
  chrono: string;
  motherCode: string;
  fourSymbol: string;
  starOrigin: string;
  trigram: string;
  cacheStatus: "hit" | "missing";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeCachedPersonaOutput(value: unknown): CachedPersonaOutput | null {
  if (!isRecord(value)) return null;

  const trigram = typeof value.trigram === "string" ? value.trigram : "";
  const motherCode = typeof value.motherCode === "string" ? value.motherCode : "";
  const starbeast = isRecord(value.starbeast) ? value.starbeast : null;
  const fourSymbol =
    (starbeast && typeof starbeast.fourSymbol === "string" ? starbeast.fourSymbol : "") ||
    (typeof value.fourBeast === "string" ? value.fourBeast : "") ||
    (typeof value.direction === "string" ? value.direction : "");
  const starOrigin = isRecord(value.starOrigin) ? value.starOrigin : "";

  if (!motherCode || !fourSymbol || !trigram) return null;

  return {
    motherCode,
    fourSymbol,
    starOrigin,
    trigram,
  };
}

export function readCachedPersonaOutput(): CachedPersonaOutput | null {
  return normalizeCachedPersonaOutput(readPersistedPersonaOutputSnapshot());
}

function formatStarOrigin(starOrigin: CachedStarOrigin) {
  if (typeof starOrigin === "string") return starOrigin;
  return `28宿节点-${String((starOrigin.index ?? 0) + 1).padStart(2, "0")} / I${starOrigin.intensity ?? "-"} / R${starOrigin.resonance ?? "-"}`;
}

export function createMotherCardReadonlySnapshot(chrono: string): MotherCardReadonlySnapshot {
  const cachedPersonaOutput = readCachedPersonaOutput();

  if (!cachedPersonaOutput) {
    return {
      chrono,
      motherCode: "CACHE_PENDING",
      fourSymbol: "CACHE_PENDING",
      starOrigin: "CACHE_PENDING",
      trigram: "CACHE_PENDING",
      cacheStatus: "missing",
    };
  }

  return {
    chrono,
    motherCode: cachedPersonaOutput.motherCode,
    fourSymbol: cachedPersonaOutput.fourSymbol,
    starOrigin: formatStarOrigin(cachedPersonaOutput.starOrigin),
    trigram: cachedPersonaOutput.trigram,
    cacheStatus: "hit",
  };
}
