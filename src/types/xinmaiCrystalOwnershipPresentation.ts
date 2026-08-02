import type { CrystalFormationReceipt } from "./xinmaiCrystalEligibility";

export const XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_SCHEMA_VERSION =
  "XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_V1" as const;

export type XinmaiCrystalOwnershipPresentationState =
  | "FORMATION_PENDING"
  | "FORMATION_CONFIRMED"
  | "OWNERSHIP_PRESENTED"
  | "RECOVERED_EXISTING"
  | "SAFE_WITHHELD";

export type XinmaiCrystalOwnershipPresentationOrigin =
  | "CURRENT_TRANSACTION"
  | "CANONICAL_RECOVERY";

export type XinmaiCrystalOwnershipMotionPreference =
  | "MOTION"
  | "REDUCED_MOTION";

export type XinmaiCrystalOwnershipVisualFacts = Readonly<{
  schemaVersion: typeof XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_SCHEMA_VERSION;
  source: "xinmai_crystal_ownership_presentation_resolver";
  successAuthority: "IDB_TRANSACTION_COMPLETE";
  formationReferenceId: string;
  crystalReferenceId: string;
  crystalEligibilityReferenceId: string;
  livedResponseReferenceId: string;
  choiceActionIntentionReferenceId: string;
  actionSummary: string;
  crystalTitle: string;
  crystalLine: string;
  ownershipHeadline: "你真实走出的这一步，留下了痕迹。";
  ownershipSupport:
    "它不证明你更好，只记得你曾经这样选择。";
  presentationOrigin: XinmaiCrystalOwnershipPresentationOrigin;
  motionPreference: XinmaiCrystalOwnershipMotionPreference;
  ownershipInteraction: "AVAILABLE" | "PRESENTED";
}>;

export type XinmaiCrystalOwnershipPresentationDecision =
  | Readonly<{
      state: Exclude<
        XinmaiCrystalOwnershipPresentationState,
        "SAFE_WITHHELD" | "FORMATION_PENDING"
      >;
      visualFacts: XinmaiCrystalOwnershipVisualFacts;
      reason: null;
      authorityWriteback: "FORBIDDEN";
    }>
  | Readonly<{
      state: "FORMATION_PENDING";
      visualFacts: null;
      reason: "FORMATION_TRANSACTION_NOT_CONFIRMED";
      authorityWriteback: "FORBIDDEN";
    }>
  | Readonly<{
      state: "SAFE_WITHHELD";
      visualFacts: null;
      reason:
        | "FORMATION_NOT_CONFIRMED"
        | "FORMATION_RECEIPT_INVALID"
        | "FORMATION_RECOVERY_UNAVAILABLE";
      authorityWriteback: "FORBIDDEN";
    }>;

export type XinmaiCrystalOwnershipPresentationInput = Readonly<{
  receipt: CrystalFormationReceipt | null;
  actionSummary: string | null;
  presentationOrigin: XinmaiCrystalOwnershipPresentationOrigin;
  formationPending: boolean;
  safeWithheld: boolean;
  ownershipPresented: boolean;
  motionPreference: XinmaiCrystalOwnershipMotionPreference;
}>;
