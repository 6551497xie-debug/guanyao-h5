/**
 * GUANYAO Persona Generation Trigger
 *
 * Single Entry Persona Generation System.
 *
 * UI can dispatch input here, but cannot call engines or write snapshots.
 * This is the only allowed runtime entry to deterministic persona generation.
 */

import {
  generatePersona,
  writePersonaOutputSnapshotFromDeterministicEngine,
  type PersonaGenerationInput,
  type PersonaOutputSnapshot,
} from "./guanyaoDeterministicPersonaEngine";

export const PERSONA_GENERATION_TRIGGER_STATE = {
  IDLE: "idle",
  TRIGGERED: "triggered",
  GENERATING: "generating",
  SNAPSHOT_FINALIZED: "snapshot_finalized",
  READY_FOR_READ: "ready_for_read",
} as const;

export type PersonaGenerationTriggerState =
  (typeof PERSONA_GENERATION_TRIGGER_STATE)[keyof typeof PERSONA_GENERATION_TRIGGER_STATE];

export async function triggerPersonaGeneration(input: PersonaGenerationInput): Promise<PersonaOutputSnapshot> {
  let state: PersonaGenerationTriggerState = PERSONA_GENERATION_TRIGGER_STATE.IDLE;

  state = PERSONA_GENERATION_TRIGGER_STATE.TRIGGERED;
  state = PERSONA_GENERATION_TRIGGER_STATE.GENERATING;
  const result = generatePersona(input);

  const snapshot = writePersonaOutputSnapshotFromDeterministicEngine(result);
  state = PERSONA_GENERATION_TRIGGER_STATE.SNAPSHOT_FINALIZED;

  state = PERSONA_GENERATION_TRIGGER_STATE.READY_FOR_READ;
  void state;

  return snapshot;
}
