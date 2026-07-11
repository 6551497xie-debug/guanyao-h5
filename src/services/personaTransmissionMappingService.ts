import type {
  PersonaTransmissionMappingFailure,
  PersonaTransmissionMappingInput,
  PersonaTransmissionMappingNeedsTranslation,
  PersonaTransmissionMappingResult,
  PersonaTransmissionMappingSuccess,
} from "../types/personaTransmission";
import {
  ACTION_FIVE_AWARENESS_FIXTURE_ID,
  actionFiveAwarenessRuntimeUnit,
} from "./fixtures/personaTransmissionFixtures";
import { validatePersonaTransmissionRuntimeUnit } from "./validators/personaTransmissionRuntimeValidator";

const createNotReadyResult = (reason: string): PersonaTransmissionMappingFailure => ({
  status: "NOT_READY",
  reason,
});

const createNeedsTranslationResult = (reason: string): PersonaTransmissionMappingNeedsTranslation => ({
  status: "NEEDS_TRANSLATION",
  reason,
});

const createPassResult = (): PersonaTransmissionMappingSuccess => ({
  status: "PASS",
  unit: actionFiveAwarenessRuntimeUnit,
});

const isActionFiveAwarenessFixture = (input: PersonaTransmissionMappingInput): boolean =>
  input.source === "fixture" && input.pressureContext.pressureSeedId === ACTION_FIVE_AWARENESS_FIXTURE_ID;

export const mapPersonaTransmission = (
  input: PersonaTransmissionMappingInput,
): PersonaTransmissionMappingResult => {
  if (!input.yaoTransmissionProfile) {
    return createNotReadyResult("YAO_TRANSMISSION_PROFILE_MISSING");
  }

  if (!input.pressureContext.pressureSeed && !input.pressureContext.pressureField) {
    return createNotReadyResult("PRESSURE_CONTEXT_MISSING");
  }

  if (isActionFiveAwarenessFixture(input)) {
    const validation = validatePersonaTransmissionRuntimeUnit(actionFiveAwarenessRuntimeUnit);

    if (validation.status !== "PASS") {
      return createNeedsTranslationResult(`PERSONA_TRANSMISSION_RUNTIME_VALIDATION_FAILED:${validation.reasons.join(",")}`);
    }

    return createPassResult();
  }

  return createNeedsTranslationResult("PERSONA_TRANSMISSION_MAPPING_NOT_IMPLEMENTED");
};

export const PersonaTransmissionMappingService = {
  mapPersonaTransmission,
} as const;
