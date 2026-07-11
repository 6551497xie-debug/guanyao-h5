import type {
  PersonaTransmissionExperienceModel,
  PersonaTransmissionExperienceResult,
  PersonaTransmissionRuntimeUnit,
} from "../../types/personaTransmission";
import {
  ACTION_FIVE_AWARENESS_FIXTURE_ID,
  actionFiveAwarenessRuntimeUnit,
} from "./personaTransmissionFixtures";

export const createPersonaTransmissionExperienceModel = (
  unit: PersonaTransmissionRuntimeUnit,
): PersonaTransmissionExperienceResult => {
  if (unit.identity.unitId !== ACTION_FIVE_AWARENESS_FIXTURE_ID) {
    return {
      status: "NOT_READY",
      reason: "PERSONA_TRANSMISSION_EXPERIENCE_FIXTURE_NOT_IMPLEMENTED",
    };
  }

  return {
    status: "READY",
    identity: {
      unitId: unit.identity.unitId,
      dimension: unit.dimension,
      yaoStage: unit.yaoStage,
    },
    orientation: {
      pressureLine: unit.triggerContext.pressureSeed ?? unit.triggerContext.pressureField ?? "",
      currentRoundLine: unit.triggerContext.currentHexagramProfile,
    },
    recognition: {
      oldModelLine: unit.oldModel,
      inertiaLine: unit.inertiaPattern,
      insightLine: unit.insight,
    },
    revision: {
      directionLine: unit.revisionDirection,
      microActionLine: unit.microAction,
    },
    starbeast: {
      beforeLine: unit.beastCue.before,
      afterLine: unit.beastCue.after,
      cueLine: unit.beastCue.cue,
    },
    trace: {
      crystalLine: unit.crystalTrace.traceLine,
      depositsToCrystal: unit.crystalTrace.shouldDepositToCrystal,
      depositsToRingLite: unit.crystalTrace.shouldDepositToRingLite,
    },
  };
};

export const actionFiveAwarenessExperienceModel = createPersonaTransmissionExperienceModel(
  actionFiveAwarenessRuntimeUnit,
) as PersonaTransmissionExperienceModel;
