import type {
  XinmaiCrystalOwnershipPresentationDecision,
  XinmaiCrystalOwnershipPresentationInput,
  XinmaiCrystalOwnershipVisualFacts,
} from "../types/xinmaiCrystalOwnershipPresentation";
import { XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_SCHEMA_VERSION } from "../types/xinmaiCrystalOwnershipPresentation";

export const XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_POLICY:
  | "ENABLED"
  | "STATIC_CONFIRMATION_ONLY" = "ENABLED";

const pending = (): XinmaiCrystalOwnershipPresentationDecision =>
  Object.freeze({
    state: "FORMATION_PENDING" as const,
    visualFacts: null,
    reason: "FORMATION_TRANSACTION_NOT_CONFIRMED" as const,
    authorityWriteback: "FORBIDDEN" as const,
  });

const safeWithheld = (
  reason: Extract<
    XinmaiCrystalOwnershipPresentationDecision,
    { state: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiCrystalOwnershipPresentationDecision =>
  Object.freeze({
    state: "SAFE_WITHHELD" as const,
    visualFacts: null,
    reason,
    authorityWriteback: "FORBIDDEN" as const,
  });

const hasValidReceiptIdentity = (
  input: XinmaiCrystalOwnershipPresentationInput,
): boolean => {
  const { receipt } = input;
  if (receipt === null || receipt.status !== "FORMED") return false;
  return (
    receipt.formationReferenceId.length > 0 &&
    receipt.crystalReferenceId.length > 0 &&
    receipt.livedResponseReferenceId.length > 0 &&
    receipt.choiceActionIntentionReferenceId.length > 0 &&
    receipt.formedCrystal.status === "CRYSTALLIZED" &&
    receipt.formedCrystal.formationReferenceId ===
      receipt.formationReferenceId &&
    receipt.formedCrystal.crystalReferenceId === receipt.crystalReferenceId &&
    receipt.formedCrystal.livedResponseReferenceId ===
      receipt.livedResponseReferenceId
  );
};

export function resolveXinmaiCrystalOwnershipPresentation(
  input: XinmaiCrystalOwnershipPresentationInput,
): XinmaiCrystalOwnershipPresentationDecision {
  if (input.safeWithheld) {
    return safeWithheld("FORMATION_RECOVERY_UNAVAILABLE");
  }
  if (input.receipt === null) {
    return input.formationPending
      ? pending()
      : safeWithheld("FORMATION_NOT_CONFIRMED");
  }
  if (!hasValidReceiptIdentity(input) || !input.actionSummary?.trim()) {
    return safeWithheld("FORMATION_RECEIPT_INVALID");
  }

  const receipt = input.receipt;
  const visualFacts: XinmaiCrystalOwnershipVisualFacts = Object.freeze({
    schemaVersion: XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_SCHEMA_VERSION,
    source: "xinmai_crystal_ownership_presentation_resolver" as const,
    successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
    formationReferenceId: receipt.formationReferenceId,
    crystalReferenceId: receipt.crystalReferenceId,
    crystalEligibilityReferenceId:
      receipt.crystalEligibilityReferenceId,
    livedResponseReferenceId: receipt.livedResponseReferenceId,
    choiceActionIntentionReferenceId:
      receipt.choiceActionIntentionReferenceId,
    actionSummary: input.actionSummary.trim(),
    crystalTitle: receipt.formedCrystal.crystal.title,
    crystalLine: receipt.formedCrystal.crystal.copy,
    ownershipHeadline: "你真实走出的这一步，留下了痕迹。" as const,
    ownershipSupport:
      "它不证明你更好，只记得你曾经这样选择。" as const,
    presentationOrigin: input.presentationOrigin,
    motionPreference:
      XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_POLICY ===
      "STATIC_CONFIRMATION_ONLY"
        ? "REDUCED_MOTION"
        : input.motionPreference,
    ownershipInteraction: input.ownershipPresented
      ? ("PRESENTED" as const)
      : ("AVAILABLE" as const),
  });

  return Object.freeze({
    state:
      input.presentationOrigin === "CANONICAL_RECOVERY"
        ? ("RECOVERED_EXISTING" as const)
        : input.ownershipPresented
          ? ("OWNERSHIP_PRESENTED" as const)
          : ("FORMATION_CONFIRMED" as const),
    visualFacts,
    reason: null,
    authorityWriteback: "FORBIDDEN" as const,
  });
}

export const XinmaiCrystalOwnershipPresentationResolver = Object.freeze({
  resolve: resolveXinmaiCrystalOwnershipPresentation,
  readsStorage: false as const,
  writesAuthority: false as const,
});
