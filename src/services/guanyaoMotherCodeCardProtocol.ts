/**
 * GUANYAO Mother Code Card Protocol
 *
 * Mother Code Card = standardized IP asset generated from deterministic persona output.
 *
 * This module serializes an already-generated persona result into an immutable card product.
 * It contains no UI layout logic, no canvas logic, and no runtime trigger.
 */

import type { Direction, PersonaGenerationResult, StarNode } from "./guanyaoDeterministicPersonaEngine";

export type MotherCodeCard = {
  identity: {
    motherCode: string;
    personaName: string;
    title: string;
  };
  structure: {
    fourSymbols: Direction;
    starOrigin: StarNode;
    trigram: string;
  };
  timeline: {
    chrono: string;
  };
  space: {
    geo: string;
  };
};

const MOTHER_CODE_IDENTITY: Record<string, { personaName: string; title: string }> = {
  "乾": { personaName: "乾｜创世者", title: "《创世者》" },
  "坤": { personaName: "坤｜承载者", title: "《承载者》" },
  "震": { personaName: "震｜行动者", title: "《行动者》" },
  "巽": { personaName: "巽｜渗透者", title: "《渗透者》" },
  "坎": { personaName: "坎｜深潜者", title: "《深潜者》" },
  "离": { personaName: "离｜照见者", title: "《照见者》" },
  "艮": { personaName: "艮｜守望者", title: "《守望者》" },
  "兑": { personaName: "兑｜连接者", title: "《连接者》" },
};

function resolveIdentity(trigram: string) {
  return MOTHER_CODE_IDENTITY[trigram] ?? {
    personaName: `${trigram || "母码"}｜人格显影`,
    title: "《人格显影》",
  };
}

export function serializeMotherCodeCard(result: PersonaGenerationResult): MotherCodeCard {
  const trigram = result.mother.trigram;
  const identity = resolveIdentity(trigram);

  return Object.freeze({
    identity: Object.freeze({
      motherCode: trigram,
      personaName: identity.personaName,
      title: identity.title,
    }),
    structure: Object.freeze({
      fourSymbols: result.direction,
      starOrigin: Object.freeze({ ...result.mother.starOrigin }),
      trigram,
    }),
    timeline: Object.freeze({
      chrono: result.chrono.signature,
    }),
    space: Object.freeze({
      geo: result.geo.anchor,
    }),
  });
}
