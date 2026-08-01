import type { ChoiceActionIntention } from "./xinmaiChoiceActionIntention";
import type {
  CrystalEligibility,
  CrystalFormationReceipt,
} from "./xinmaiCrystalEligibility";
import type { LivedResponseFact } from "./xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_CHOICE_DEPARTURE_RECEIPT_SCHEMA_VERSION =
  "XINMAI_CHOICE_DEPARTURE_RECEIPT_V1" as const;
export const XINMAI_CHOICE_RETURN_RECEIPT_SCHEMA_VERSION =
  "XINMAI_CHOICE_RETURN_RECEIPT_V1" as const;
export const XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION =
  "XINMAI_CHOICE_RETURNING_REALITY_PROOF_V1" as const;

export type XinmaiChoiceNoFactResolution =
  | "NOT_ATTEMPTED"
  | "USER_REJECTED_RECORD";

export type XinmaiChoiceReturningRealityProof = Readonly<{
  schemaVersion:
    typeof XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION;
  source: "xinmai_choice_returning_reality_proof_adapter";
  realityIntentReferenceId: string;
  returnIntentRequestReferenceId: string;
  departureReceiptReferenceId: string;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  returnAttemptRevision: number;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  canonicalRevision: number;
  fencingToken: number;
  realityIntentRevision: number;
  realityLifecycle:
    | "REALITY_PENDING"
    | "REALITY_ACTIVE"
    | "PRESSURE_RECOGNIZED"
    | "GRAVITY_ADMITTED"
    | "ACTIVE_IN_GRAVITY"
    | "TERMINAL";
  observedAt: string;
  provenance: Readonly<{
    origin: "CHOICE_RETURN";
    qualification: "EXPLICIT_RETURN_TO_CHOICE";
    routeTarget: "/reality";
    readOnly: true;
    noGrowthAuthority: true;
  }>;
}>;

export type XinmaiChoiceExplicitDepartureReceipt = Readonly<{
  schemaVersion: typeof XINMAI_CHOICE_DEPARTURE_RECEIPT_SCHEMA_VERSION;
  source: "xinmai_choice_returning_provenance_controller";
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  actionRoutePrototypeVersion: number;
  gravityObservationReferenceId: string;
  sourceEncounterCycleId: string;
  choiceRevisionAtDeparture: number;
  revision: number;
  state:
    | "DORMANT_DEPARTURE"
    | "RETURN_IN_PROGRESS"
    | "RETURNED"
    | "INVALIDATED";
  departedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    userExplicitDeparture: true;
    growthTransactionConfirmed: true;
    noTargetEncounterYet: true;
    noActionCompletionClaim: true;
    noLivedResponseAuthority: true;
    noCrystalAuthority: true;
  }>;
}>;

export type XinmaiChoiceExplicitReturnReceipt = Readonly<{
  schemaVersion: typeof XINMAI_CHOICE_RETURN_RECEIPT_SCHEMA_VERSION;
  source: "xinmai_choice_returning_provenance_controller";
  returnReceiptReferenceId: string;
  returnIntentRequestReferenceId: string;
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  gravityObservationReferenceId: string;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  returnAttemptRevision: number;
  revision: number;
  state:
    | "READY_FOR_LIVED_RESPONSE"
    | "CONSUMED_BY_FACT"
    | "RESOLVED_WITHOUT_FACT"
    | "INVALIDATED";
  consumedLivedResponseReferenceId: string | null;
  noFactReason: XinmaiChoiceNoFactResolution | null;
  realityProof: XinmaiChoiceReturningRealityProof;
  returnedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    userExplicitReturn: true;
    realityIntentCommittedBeforeReceipt: true;
    noRealityActivationClaim: true;
    noActionCompletionClaim: true;
    noLivedResponseAuthority: true;
    noCrystalAuthority: true;
  }>;
}>;

type AdmissionAssets = Readonly<{
  intention: ChoiceActionIntention;
  departureReceipt: XinmaiChoiceExplicitDepartureReceipt | null;
  returnReceipt: XinmaiChoiceExplicitReturnReceipt | null;
  currentFact: LivedResponseFact | null;
  currentEligibility: CrystalEligibility | null;
  formationReceipt: CrystalFormationReceipt | null;
}>;

export type XinmaiChoiceReturningProvenanceAdmission =
  | (AdmissionAssets &
      Readonly<{
        state: "RESUME_COMMITTED";
        departureReceipt: null;
        returnReceipt: null;
        currentFact: null;
        currentEligibility: null;
        formationReceipt: null;
        reason: "EXPLICIT_DEPARTURE_REQUIRED";
      }>)
  | (AdmissionAssets &
      Readonly<{
        state: "DORMANT_DEPARTURE";
        departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
        returnReceipt: XinmaiChoiceExplicitReturnReceipt | null;
        currentFact: null;
        currentEligibility: null;
        formationReceipt: null;
        reason: null;
      }>)
  | (AdmissionAssets &
      Readonly<{
        state: "READY_FOR_LIVED_RESPONSE";
        departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
        returnReceipt: XinmaiChoiceExplicitReturnReceipt;
        currentFact: null;
        currentEligibility: null;
        formationReceipt: null;
        reason: null;
      }>)
  | (AdmissionAssets &
      Readonly<{
        state: "RESUME_REPORTED";
        currentFact: LivedResponseFact;
        reason: null;
      }>)
  | (AdmissionAssets &
      Readonly<{
        state: "TERMINAL_BY_GROWTH";
        currentFact: LivedResponseFact;
        reason: null;
      }>)
  | Readonly<{
      state: "SAFE_WITHHELD";
      intention: ChoiceActionIntention | null;
      departureReceipt: XinmaiChoiceExplicitDepartureReceipt | null;
      returnReceipt: XinmaiChoiceExplicitReturnReceipt | null;
      currentFact: LivedResponseFact | null;
      currentEligibility: CrystalEligibility | null;
      formationReceipt: CrystalFormationReceipt | null;
      reason:
        | "RECOVERY_UNAVAILABLE"
        | "RECOVERY_CORRUPTED"
        | "TARGET_REALITY_BOUND_UNPROVEN"
        | "REALITY_PROOF_UNAVAILABLE"
        | "REALITY_PROOF_MISMATCH"
        | "PROVENANCE_NOT_UNIQUE";
    }>;

export type XinmaiChoiceReturningRealityProofResult =
  | Readonly<{
      status: "READY";
      proof: XinmaiChoiceReturningRealityProof;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      proof: null;
      reason:
        | "REALITY_PROOF_UNAVAILABLE"
        | "REALITY_PROOF_MISMATCH";
    }>;

export type XinmaiChoiceReturnResolutionProofResult =
  | Readonly<{
      status: "READY";
      admission: Extract<
        XinmaiChoiceReturningProvenanceAdmission,
        { state: "RESUME_REPORTED" | "TERMINAL_BY_GROWTH" }
      >;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      admission: null;
      reason:
        | "RECOVERY_UNAVAILABLE"
        | "RECOVERY_CORRUPTED"
        | "REALITY_PROOF_MISMATCH"
        | "LIVED_RESPONSE_NOT_CONFIRMED";
    }>;
