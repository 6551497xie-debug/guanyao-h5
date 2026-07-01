/**
 * GUANYAO Deterministic Persona Generation Engine
 *
 * This is a deterministic persona generation engine.
 * Not a divination system.
 *
 * Flow:
 * Chrono -> Geo -> Star -> Direction -> Beast -> MotherCode
 *
 * Rules:
 * - Chrono cannot access Beast or Mother.
 * - Geo is immutable after resolution.
 * - Star mapping is deterministic.
 * - Direction is derived only from Star.
 * - Beast is visual layer only.
 * - Mother is final aggregation only.
 */

import { serializeMotherCodeCard, type MotherCodeCard } from "./guanyaoMotherCodeCardProtocol";

export type ChronoInput = {
  year: number;
  month: number;
  day: number;
  hour: string;
};

export type GeoInput = {
  province: string;
  city: string;
};

export type StarNode = {
  index: number;
  intensity: number;
  resonance: number;
};

export type Direction = "青龙" | "朱雀" | "白虎" | "玄武";

export type BeastForm = {
  nodes: StarNode[];
  topology: "cluster";
  direction: Direction;
};

export type MotherCode = {
  trigram: string;
  direction: Direction;
  starOrigin: StarNode;
  chronoSignature: string;
  geoAnchor: string;
};

export type ChronoResolution = {
  signature: string;
  phase: string;
};

export type GeoResolution = {
  anchor: string;
  weight: "static";
};

export type PersonaGenerationInput = {
  chrono: ChronoInput;
  geo: GeoInput;
};

export type PersonaGenerationResult = {
  chrono: ChronoResolution;
  geo: GeoResolution;
  star: StarNode;
  direction: Direction;
  beast: BeastForm;
  mother: MotherCode;
};

export type PersonaOutputSnapshot = {
  chrono: string;
  motherCode: string;
  direction: Direction;
  starOrigin: StarNode;
  trigram: string;
  motherCodeCard: MotherCodeCard;
  writer: "deterministicPersonaEngine";
  lockedAt: string;
};

export const PERSONA_ENGINE_STATE = {
  INIT: "init",
  CHRONO_RESOLVED: "chrono_resolved",
  GEO_ANCHORED: "geo_anchored",
  STAR_MAPPED: "star_mapped",
  DIRECTION_ASSIGNED: "direction_assigned",
  BEAST_FORMED: "beast_formed",
  MOTHER_GENERATED: "mother_generated",
} as const;

const TRIGRAMS = ["乾", "坤", "震", "巽", "坎", "离", "艮", "兑"] as const;
const PERSONA_SNAPSHOT_KEY = "guanyao:personaOutputSnapshot";
const DETERMINISTIC_PERSONA_WRITER = "deterministicPersonaEngine" as const;

function stableHash(input: string): number {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function normalizePositive(value: number, modulo: number): number {
  return ((value % modulo) + modulo) % modulo;
}

export function resolveChrono(input: ChronoInput): ChronoResolution {
  return {
    signature: `${input.year}-${input.month}-${input.day}-${input.hour}`,
    phase: input.hour,
  };
}

export function resolveGeo(input: GeoInput): GeoResolution {
  return Object.freeze({
    anchor: `${input.province}-${input.city}`,
    weight: "static" as const,
  });
}

export function mapStar(chrono: ChronoResolution, geo: GeoResolution): StarNode {
  const index = stableHash(`${chrono.signature}${geo.anchor}`) % 28;

  return {
    index,
    intensity: (index % 7) + 1,
    resonance: (index % 5) + 1,
  };
}

export function resolveDirection(star: StarNode): Direction {
  if (star.index < 7) return "青龙";
  if (star.index < 14) return "朱雀";
  if (star.index < 21) return "白虎";
  return "玄武";
}

export function generateNodes(star: StarNode): StarNode[] {
  return Array.from({ length: 7 }, (_, offset) => {
    const index = normalizePositive(star.index + offset * 4, 28);

    return {
      index,
      intensity: ((star.intensity + offset - 1) % 7) + 1,
      resonance: ((star.resonance + offset - 1) % 5) + 1,
    };
  });
}

export function buildBeast(star: StarNode, direction: Direction): BeastForm {
  return {
    nodes: generateNodes(star),
    topology: "cluster",
    direction,
  };
}

function generateMotherCode(
  chrono: ChronoResolution,
  geo: GeoResolution,
  star: StarNode,
  direction: Direction,
): MotherCode {
  const trigramIndex = stableHash(`${star.index}-${direction}`) % TRIGRAMS.length;

  return {
    trigram: TRIGRAMS[trigramIndex] ?? "乾",
    direction,
    starOrigin: star,
    chronoSignature: chrono.signature,
    geoAnchor: geo.anchor,
  };
}

export function generatePersona(input: PersonaGenerationInput): PersonaGenerationResult {
  const chrono = resolveChrono(input.chrono);
  const geo = resolveGeo(input.geo);
  const star = mapStar(chrono, geo);
  const direction = resolveDirection(star);
  const beast = buildBeast(star, direction);
  const mother = generateMotherCode(chrono, geo, star, direction);

  return {
    chrono,
    geo,
    star,
    direction,
    beast,
    mother,
  };
}

function assertPersonaWriteAuthority(engine: string): asserts engine is typeof DETERMINISTIC_PERSONA_WRITER {
  if (engine !== DETERMINISTIC_PERSONA_WRITER) {
    throw new Error("WRITE_AUTHORITY_VIOLATION");
  }
}

function readExistingSnapshot(): PersonaOutputSnapshot | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(PERSONA_SNAPSHOT_KEY);
    return raw ? JSON.parse(raw) as PersonaOutputSnapshot : null;
  } catch {
    return null;
  }
}

function sameSnapshotIdentity(a: PersonaOutputSnapshot, b: PersonaOutputSnapshot) {
  return (
    a.chrono === b.chrono &&
    a.motherCode === b.motherCode &&
    a.direction === b.direction &&
    a.trigram === b.trigram &&
    a.starOrigin.index === b.starOrigin.index &&
    a.starOrigin.intensity === b.starOrigin.intensity &&
    a.starOrigin.resonance === b.starOrigin.resonance
  );
}

export function buildPersonaOutputSnapshot(result: PersonaGenerationResult): PersonaOutputSnapshot {
  const geoAnchor = result.geo.anchor.split("-").join(" · ");
  const motherCodeCard = serializeMotherCodeCard(result);

  return Object.freeze({
    chrono: `${result.chrono.phase} · ${geoAnchor}`,
    motherCode: result.mother.trigram,
    direction: result.direction,
    starOrigin: Object.freeze({ ...result.mother.starOrigin }),
    trigram: result.mother.trigram,
    motherCodeCard,
    writer: DETERMINISTIC_PERSONA_WRITER,
    lockedAt: new Date(0).toISOString(),
  });
}

export function writePersonaOutputSnapshotFromDeterministicEngine(result: PersonaGenerationResult): PersonaOutputSnapshot {
  assertPersonaWriteAuthority(DETERMINISTIC_PERSONA_WRITER);

  const snapshot = buildPersonaOutputSnapshot(result);
  const existing = readExistingSnapshot();

  if (existing) {
    if (!sameSnapshotIdentity(existing, snapshot)) {
      throw new Error("PERSONA_SNAPSHOT_IMMUTABLE");
    }

    return existing;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(PERSONA_SNAPSHOT_KEY, JSON.stringify(snapshot));
  }

  return snapshot;
}
