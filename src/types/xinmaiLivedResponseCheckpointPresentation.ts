import type {
  CrystalEligibility,
  CrystalFormationReceipt,
} from "./xinmaiCrystalEligibility";
import type { XinmaiCanonicalBodyImprintDecision } from "./xinmaiCanonicalBodyImprint";
import type {
  XinmaiChoiceExplicitReturnReceipt,
  XinmaiChoiceReturningProvenanceAdmission,
} from "./xinmaiChoiceReturningProvenance";
import type {
  XinmaiCrystalOwnershipMotionPreference,
  XinmaiCrystalOwnershipPresentationDecision,
} from "./xinmaiCrystalOwnershipPresentation";
import type { LivedResponseFact } from "./xinmaiLivedResponse";

export const XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_SCHEMA_VERSION =
  "XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_V1" as const;

export type XinmaiLivedResponseCheckpointPresentationState =
  | "BASELINE_LIFE_WORLD"
  | "RETURN_ACCEPTED_AWAITING_RESPONSE"
  | "READY_TO_CONFIRM_REAL_RESPONSE"
  | "FORMATION_IN_PROGRESS"
  | "OWNERSHIP_PRESENTED"
  | "SAFE_WITHHELD";

export type XinmaiLivedResponseCheckpointAction =
  | "START_NEW_REALITY"
  | "CONFIRM_DEPARTURE"
  | "CONFIRM_RETURN"
  | "CONFIRM_REAL_RESPONSE"
  | "RETRY_RECONCILIATION"
  | "RETRY_FORMATION"
  | "CONTINUE_TO_REALITY";

export type XinmaiLivedResponseCheckpointBaselineKind =
  | "NEUTRAL"
  | "CHOICE_AWAITS_DEPARTURE"
  | "DEPARTURE_AWAITS_RETURN";

export type XinmaiLivedResponseFormationRequestEvidence = Readonly<{
  source: "existing_fact_and_eligibility_authorities";
  choiceActionIntentionReferenceId: string;
  livedResponseReferenceId: string;
  crystalEligibilityReferenceId: string;
}>;

export type XinmaiLivedResponseReturnAcceptanceEvidence = Readonly<{
  source: "xinmai_choice_returning_provenance_controller";
  choiceActionIntentionReferenceId: string;
  returnReceipt: XinmaiChoiceExplicitReturnReceipt;
}>;

export type XinmaiLivedResponseCheckpointPresentationInput = Readonly<{
  identityStatus: "READY" | "UNAVAILABLE" | "MISMATCH";
  admission: XinmaiChoiceReturningProvenanceAdmission | null;
  currentFact: LivedResponseFact | null;
  currentEligibility: CrystalEligibility | null;
  formationReceipt: CrystalFormationReceipt | null;
  formationRequestEvidence: XinmaiLivedResponseFormationRequestEvidence | null;
  returnAcceptanceEvidence: XinmaiLivedResponseReturnAcceptanceEvidence | null;
  formationFailure: boolean;
  ownershipDecision: XinmaiCrystalOwnershipPresentationDecision | null;
  bodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
  motionPreference: XinmaiCrystalOwnershipMotionPreference;
}>;

export type XinmaiLivedResponseCheckpointPresentationDecision = Readonly<{
  schemaVersion:
    typeof XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_SCHEMA_VERSION;
  source: "xinmai_lived_response_checkpoint_presentation_resolver";
  state: XinmaiLivedResponseCheckpointPresentationState;
  baselineKind: XinmaiLivedResponseCheckpointBaselineKind | null;
  headline: string;
  support: string;
  primaryAction: XinmaiLivedResponseCheckpointAction | null;
  navigationConsequence: "NONE" | "REVEAL_RESPONSE" | "EXIT_EVIDENCE_TO_REALITY";
  announcement: string | null;
  announcementReferenceId: string | null;
  bodyImprintClaim: "AVAILABLE" | "NOT_CLAIMED" | "SAFE_WITHHELD";
  motionPreference: XinmaiCrystalOwnershipMotionPreference;
  authorityWriteback: "FORBIDDEN";
}>;
