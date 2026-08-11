import type {
  GravityEntryAdmissionState,
  GravityEntryTerminalReason,
} from "../types/xinmaiGravityEntryAdmission";
import type { RealityAdventureEncounterContinuityRecord } from "../types/xinmaiRealityAdventureContinuity";
import type { RealityEncounterTerminalReason } from "../types/xinmaiRealityEncounterIntent";

export type XinmaiCompletedReturnTargetLifecycleClassification =
  | "ALLOW"
  | "ALREADY_RECONCILED"
  | "TARGET_STATE_NOT_ELIGIBLE"
  | "TARGET_CONTINUITY_CORRUPTED"
  | "GRAVITY_ADMISSION_MISSING"
  | "TERMINAL_REASON_CONFLICT";

export function classifyXinmaiCompletedReturnTargetLifecycle(input: Readonly<{
  lifecycle: RealityAdventureEncounterContinuityRecord["lifecycle"];
  activeIdentityKeyPresent: boolean;
  outerTerminalReason: RealityEncounterTerminalReason | null;
  intentState: RealityAdventureEncounterContinuityRecord["realityIntent"]["state"];
  intentTerminalReason: RealityEncounterTerminalReason | null;
  gravityAdmissionState: GravityEntryAdmissionState | null;
  gravityTerminalReason: GravityEntryTerminalReason | null;
}>): XinmaiCompletedReturnTargetLifecycleClassification {
  const hasGravity = input.gravityAdmissionState !== null;
  if (input.lifecycle === "TERMINAL") {
    const exactAdmission =
      !hasGravity ||
      (input.gravityAdmissionState === "TERMINAL" &&
        input.gravityTerminalReason === "START_NEW_REALITY_ENCOUNTER");
    const exactIntent =
      input.intentState === "TERMINAL" &&
      (input.intentTerminalReason === "START_NEW_ENCOUNTER" ||
        (hasGravity &&
          input.intentTerminalReason === "ENCOUNTER_COMPLETED"));
    return input.outerTerminalReason === "START_NEW_ENCOUNTER" &&
      !input.activeIdentityKeyPresent &&
      exactAdmission &&
      exactIntent
      ? "ALREADY_RECONCILED"
      : "TERMINAL_REASON_CONFLICT";
  }
  if (!input.activeIdentityKeyPresent) {
    return "TARGET_CONTINUITY_CORRUPTED";
  }
  const preGravity =
    input.lifecycle === "REALITY_PENDING" ||
    input.lifecycle === "REALITY_ACTIVE" ||
    input.lifecycle === "PRESSURE_RECOGNIZED";
  const inGravity =
    input.lifecycle === "GRAVITY_ADMITTED" ||
    input.lifecycle === "ACTIVE_IN_GRAVITY";
  if (preGravity) {
    return hasGravity ? "TARGET_CONTINUITY_CORRUPTED" : "ALLOW";
  }
  if (inGravity) {
    if (!hasGravity) return "GRAVITY_ADMISSION_MISSING";
    return input.gravityAdmissionState === "READY_TO_ENTER_GRAVITY" ||
      input.gravityAdmissionState === "ACCEPTING_GRAVITY" ||
      input.gravityAdmissionState === "ACTIVE_IN_GRAVITY"
      ? "ALLOW"
      : "TARGET_CONTINUITY_CORRUPTED";
  }
  return "TARGET_STATE_NOT_ELIGIBLE";
}
