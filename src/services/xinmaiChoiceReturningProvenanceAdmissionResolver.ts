import type { ChoiceActionIntention } from "../types/xinmaiChoiceActionIntention";
import type {
  CrystalEligibility,
  CrystalFormationReceipt,
} from "../types/xinmaiCrystalEligibility";
import type { LivedResponseFact } from "../types/xinmaiLivedResponse";
import type {
  XinmaiChoiceExplicitDepartureReceipt,
  XinmaiChoiceExplicitReturnReceipt,
  XinmaiChoiceReturningProvenanceAdmission,
} from "../types/xinmaiChoiceReturningProvenance";

export type XinmaiChoiceReturningAdmissionResolverInput = Readonly<{
  intention: ChoiceActionIntention;
  departureReceipt: XinmaiChoiceExplicitDepartureReceipt | null;
  returnReceipt: XinmaiChoiceExplicitReturnReceipt | null;
  currentFact: LivedResponseFact | null;
  currentEligibility: CrystalEligibility | null;
  formationReceipt: CrystalFormationReceipt | null;
  realityProofState: "NOT_REQUIRED" | "CURRENT" | "UNAVAILABLE" | "MISMATCH";
}>;

const safeWithheld = (
  input: XinmaiChoiceReturningAdmissionResolverInput,
  reason: Extract<
    XinmaiChoiceReturningProvenanceAdmission,
    { state: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiChoiceReturningProvenanceAdmission =>
  Object.freeze({
    state: "SAFE_WITHHELD" as const,
    intention: input.intention,
    departureReceipt: input.departureReceipt,
    returnReceipt: input.returnReceipt,
    currentFact: input.currentFact,
    currentEligibility: input.currentEligibility,
    formationReceipt: input.formationReceipt,
    reason,
  });

export function resolveXinmaiChoiceReturningProvenanceAdmission(
  input: XinmaiChoiceReturningAdmissionResolverInput,
): XinmaiChoiceReturningProvenanceAdmission {
  if (input.currentFact !== null) {
    if (input.currentEligibility !== null || input.formationReceipt !== null) {
      return Object.freeze({
        state: "TERMINAL_BY_GROWTH" as const,
        intention: input.intention,
        departureReceipt: input.departureReceipt,
        returnReceipt: input.returnReceipt,
        currentFact: input.currentFact,
        currentEligibility: input.currentEligibility,
        formationReceipt: input.formationReceipt,
        reason: null,
      });
    }
    return Object.freeze({
      state: "RESUME_REPORTED" as const,
      intention: input.intention,
      departureReceipt: input.departureReceipt,
      returnReceipt: input.returnReceipt,
      currentFact: input.currentFact,
      currentEligibility: null,
      formationReceipt: null,
      reason: null,
    });
  }
  if (input.departureReceipt === null) {
    return input.intention.state === "AWAITING_RETURN"
      ? safeWithheld(input, "TARGET_REALITY_BOUND_UNPROVEN")
      : Object.freeze({
          state: "RESUME_COMMITTED" as const,
          intention: input.intention,
          departureReceipt: null,
          returnReceipt: null,
          currentFact: null,
          currentEligibility: null,
          formationReceipt: null,
          reason: "EXPLICIT_DEPARTURE_REQUIRED" as const,
        });
  }
  const activeReturn =
    input.returnReceipt?.state === "READY_FOR_LIVED_RESPONSE"
      ? input.returnReceipt
      : null;
  if (activeReturn === null) {
    return input.departureReceipt.state === "DORMANT_DEPARTURE"
      ? Object.freeze({
          state: "DORMANT_DEPARTURE" as const,
          intention: input.intention,
          departureReceipt: input.departureReceipt,
          returnReceipt: input.returnReceipt,
          currentFact: null,
          currentEligibility: null,
          formationReceipt: null,
          reason: null,
        })
      : safeWithheld(input, "RECOVERY_CORRUPTED");
  }
  if (input.realityProofState === "UNAVAILABLE") {
    return safeWithheld(input, "REALITY_PROOF_UNAVAILABLE");
  }
  if (input.realityProofState !== "CURRENT") {
    return safeWithheld(input, "REALITY_PROOF_MISMATCH");
  }
  if (
    input.departureReceipt.state === "RETURN_IN_PROGRESS" &&
    activeReturn.consumedLivedResponseReferenceId === null &&
    activeReturn.departureReceiptReferenceId ===
      input.departureReceipt.departureReceiptReferenceId
  ) {
    return Object.freeze({
      state: "READY_FOR_LIVED_RESPONSE" as const,
      intention: input.intention,
      departureReceipt: input.departureReceipt,
      returnReceipt: activeReturn,
      currentFact: null,
      currentEligibility: null,
      formationReceipt: null,
      reason: null,
    });
  }
  return safeWithheld(input, "RECOVERY_CORRUPTED");
}

export const XinmaiChoiceReturningProvenanceAdmissionResolver = Object.freeze({
  resolve: resolveXinmaiChoiceReturningProvenanceAdmission,
  states: Object.freeze([
    "RESUME_COMMITTED",
    "DORMANT_DEPARTURE",
    "READY_FOR_LIVED_RESPONSE",
    "RESUME_REPORTED",
    "TERMINAL_BY_GROWTH",
    "SAFE_WITHHELD",
  ] as const),
  readOnly: true as const,
  noStorageRead: true as const,
  noMutation: true as const,
});
