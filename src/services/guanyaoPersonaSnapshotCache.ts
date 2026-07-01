/**
 * GUANYAO Persona Snapshot Cache
 *
 * Read-only cache adapter:
 * Engine -> Snapshot Cache -> MotherCard.
 *
 * This module does not import or call generation / inference engines.
 * It only normalizes already-locked cached output for static rendering.
 */

export type CachedStarOrigin =
  | {
      index?: number;
      intensity?: number;
      resonance?: number;
    }
  | string;

export type CachedPersonaOutput = {
  motherCode: string;
  direction: string;
  starOrigin: CachedStarOrigin;
  trigram: string;
};

export type MotherCardReadonlySnapshot = {
  chrono: string;
  motherCode: string;
  direction: string;
  starOrigin: CachedStarOrigin;
  trigram: string;
  cacheStatus: "hit" | "missing";
};

const PERSONA_SNAPSHOT_KEY = "guanyao:personaOutputSnapshot";

function readJson(key: string): unknown | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeCachedPersonaOutput(value: unknown): CachedPersonaOutput | null {
  if (!isRecord(value)) return null;

  const directMother = isRecord(value.mother) ? value.mother : null;
  const fusionMother = isRecord(directMother?.profile) ? directMother.profile : null;
  const fusionGeo = isRecord(value.geo) ? value.geo : null;
  const fusionStarbeast = isRecord(value.starbeast) ? value.starbeast : null;

  const trigram =
    typeof value.trigram === "string"
      ? value.trigram
      : typeof directMother?.trigram === "string"
        ? directMother.trigram
        : typeof fusionMother?.lowerTrigram === "string"
          ? fusionMother.lowerTrigram
          : "";

  const motherCode =
    typeof value.motherCode === "string"
      ? value.motherCode
      : typeof directMother?.trigram === "string"
        ? directMother.trigram
        : typeof fusionMother?.motherCodeName === "string"
          ? fusionMother.motherCodeName
          : trigram;

  const direction =
    typeof value.direction === "string"
      ? value.direction
      : typeof directMother?.direction === "string"
        ? directMother.direction
        : typeof fusionGeo?.symbol === "string"
          ? fusionGeo.symbol
          : "";

  const starOrigin =
    isRecord(value.starOrigin)
      ? value.starOrigin
      : isRecord(directMother?.starOrigin)
        ? directMother.starOrigin
        : typeof fusionStarbeast?.primaryNode === "string"
          ? fusionStarbeast.primaryNode
          : "";

  if (!motherCode || !direction || !trigram) return null;

  return {
    motherCode,
    direction,
    starOrigin,
    trigram,
  };
}

export function readCachedPersonaOutput(): CachedPersonaOutput | null {
  return normalizeCachedPersonaOutput(readJson(PERSONA_SNAPSHOT_KEY));
}

export function createMotherCardReadonlySnapshot(chrono: string): MotherCardReadonlySnapshot {
  const cachedPersonaOutput = readCachedPersonaOutput();

  if (!cachedPersonaOutput) {
    return {
      chrono,
      motherCode: "CACHE_PENDING",
      direction: "CACHE_PENDING",
      starOrigin: "CACHE_PENDING",
      trigram: "CACHE_PENDING",
      cacheStatus: "missing",
    };
  }

  return {
    chrono,
    motherCode: cachedPersonaOutput.motherCode,
    direction: cachedPersonaOutput.direction,
    starOrigin: cachedPersonaOutput.starOrigin,
    trigram: cachedPersonaOutput.trigram,
    cacheStatus: "hit",
  };
}
