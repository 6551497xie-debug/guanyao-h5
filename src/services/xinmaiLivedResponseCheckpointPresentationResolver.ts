import type {
  XinmaiLivedResponseCheckpointPresentationDecision,
  XinmaiLivedResponseCheckpointPresentationInput,
} from "../types/xinmaiLivedResponseCheckpointPresentation";
import { XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_SCHEMA_VERSION } from "../types/xinmaiLivedResponseCheckpointPresentation";
import { requireXinmaiFormalStatePresentation } from "./xinmaiSemanticConstitutionFormalStateMatrix";

const formalReturn = (state: string) =>
  requireXinmaiFormalStatePresentation("RETURN", state);
const formalChoice = (state: string) =>
  requireXinmaiFormalStatePresentation("CHOICE", state);

export const XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_POLICY:
  | "ENABLED"
  | "SAFE_WITHHELD" = "ENABLED";

type DecisionFields = Omit<
  XinmaiLivedResponseCheckpointPresentationDecision,
  | "schemaVersion"
  | "source"
  | "bodyImprintClaim"
  | "motionPreference"
  | "authorityWriteback"
>;

const decision = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
  fields: DecisionFields,
): XinmaiLivedResponseCheckpointPresentationDecision =>
  Object.freeze({
    schemaVersion:
      XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_SCHEMA_VERSION,
    source: "xinmai_lived_response_checkpoint_presentation_resolver" as const,
    ...fields,
    bodyImprintClaim:
      input.bodyImprintDecision.status === "IMPRINT_AVAILABLE"
        ? ("AVAILABLE" as const)
        : input.bodyImprintDecision.status === "SAFE_WITHHELD"
          ? ("SAFE_WITHHELD" as const)
          : ("NOT_CLAIMED" as const),
    motionPreference: input.motionPreference,
    authorityWriteback: "FORBIDDEN" as const,
  });

const safeWithheld = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
): XinmaiLivedResponseCheckpointPresentationDecision =>
  decision(input, {
    state: "SAFE_WITHHELD",
    baselineKind: null,
    headline: formalReturn("NON_RETRYABLE").currentFact,
    support: formalReturn("NON_RETRYABLE").exitConsequence,
    primaryAction: null,
    navigationConsequence: "NONE",
    announcement: null,
    announcementReferenceId: null,
  });

const ownershipIsCanonical = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
): boolean => {
  const receipt = input.formationReceipt;
  const ownership = input.ownershipDecision;
  if (
    receipt === null ||
    ownership === null ||
    ownership.state === "FORMATION_PENDING" ||
    ownership.state === "SAFE_WITHHELD"
  ) {
    return false;
  }
  return (
    receipt.status === "FORMED" &&
    ownership.visualFacts.successAuthority === "IDB_TRANSACTION_COMPLETE" &&
    ownership.visualFacts.formationReferenceId === receipt.formationReferenceId &&
    ownership.visualFacts.crystalReferenceId === receipt.crystalReferenceId &&
    ownership.visualFacts.choiceActionIntentionReferenceId ===
      receipt.choiceActionIntentionReferenceId
  );
};

const requestMatchesAuthorities = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
): boolean => {
  const request = input.formationRequestEvidence;
  const fact = input.currentFact;
  const eligibility = input.currentEligibility;
  if (request === null || fact === null || eligibility === null) return false;
  return (
    input.admission?.intention?.choiceActionIntentionReferenceId ===
      request.choiceActionIntentionReferenceId &&
    request.choiceActionIntentionReferenceId ===
      fact.choiceActionIntentionReferenceId &&
    request.livedResponseReferenceId === fact.livedResponseReferenceId &&
    request.crystalEligibilityReferenceId ===
      eligibility.crystalEligibilityReferenceId &&
    eligibility.livedResponseReferenceId === fact.livedResponseReferenceId &&
    (eligibility.state === "ELIGIBLE" ||
      eligibility.state === "FORMATION_PENDING")
  );
};

const recoveredFormationIsPending = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
): boolean =>
  input.currentFact !== null &&
  input.currentEligibility !== null &&
  input.formationReceipt === null &&
  input.currentEligibility.livedResponseReferenceId ===
    input.currentFact.livedResponseReferenceId &&
  input.currentEligibility.state === "FORMATION_PENDING";

const returnAcceptanceIsCurrent = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
): boolean => {
  const admission = input.admission;
  const accepted = input.returnAcceptanceEvidence;
  if (
    admission?.state !== "DORMANT_DEPARTURE" ||
    admission.intention === null ||
    admission.departureReceipt === null ||
    accepted === null
  ) {
    return false;
  }
  const receipt = accepted.returnReceipt;
  return (
    receipt.state === "READY_FOR_LIVED_RESPONSE" &&
    accepted.choiceActionIntentionReferenceId ===
      admission.intention.choiceActionIntentionReferenceId &&
    receipt.choiceActionIntentionReferenceId ===
      admission.intention.choiceActionIntentionReferenceId &&
    receipt.departureReceiptReferenceId ===
      admission.departureReceipt.departureReceiptReferenceId
  );
};

const acceptedReceiptMatchesReadyAdmission = (
  input: XinmaiLivedResponseCheckpointPresentationInput,
): boolean =>
  input.admission?.state === "READY_FOR_LIVED_RESPONSE" &&
  input.returnAcceptanceEvidence !== null &&
  input.returnAcceptanceEvidence.returnReceipt.returnReceiptReferenceId ===
    input.admission.returnReceipt.returnReceiptReferenceId;

export function resolveXinmaiLivedResponseCheckpointPresentation(
  input: XinmaiLivedResponseCheckpointPresentationInput,
): XinmaiLivedResponseCheckpointPresentationDecision {
  if (
    XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_POLICY === "SAFE_WITHHELD" ||
    input.identityStatus !== "READY" ||
    input.formationFailure
  ) {
    return safeWithheld(input);
  }

  if (ownershipIsCanonical(input)) {
    const ownership = input.ownershipDecision;
    const receipt = input.formationReceipt;
    if (
      ownership === null ||
      ownership.state === "FORMATION_PENDING" ||
      ownership.state === "SAFE_WITHHELD" ||
      receipt === null
    ) {
      return safeWithheld(input);
    }
    const recovered = ownership.state === "RECOVERED_EXISTING";
    return decision(input, {
      state: "OWNERSHIP_PRESENTED",
      baselineKind: null,
      headline: formalReturn("FORMED").currentFact,
      support: recovered
        ? "这道可回看的痕迹仍被保留。"
        : "这道痕迹来自你刚刚确认的现实结果。",
      primaryAction: "CONTINUE_TO_REALITY",
      navigationConsequence: "EXIT_EVIDENCE_TO_REALITY",
      announcement: recovered
        ? null
        : "这次现实结果已经保存为一道可回看的痕迹。",
      announcementReferenceId: recovered
        ? null
        : receipt.formationReferenceId,
    });
  }

  if (requestMatchesAuthorities(input) || recoveredFormationIsPending(input)) {
    const reference =
      input.formationRequestEvidence?.livedResponseReferenceId ??
      input.currentFact?.livedResponseReferenceId ??
      null;
    return decision(input, {
      state: "FORMATION_IN_PROGRESS",
      baselineKind: null,
      headline: formalReturn("FORMATION_PENDING").currentFact,
      support: formalReturn("FORMATION_PENDING").exitConsequence,
      primaryAction: null,
      navigationConsequence: "NONE",
      announcement: "现实结果已确认，正在保存为可回看的痕迹。",
      announcementReferenceId: reference,
    });
  }

  if (returnAcceptanceIsCurrent(input)) {
    return decision(input, {
      state: "RETURN_ACCEPTED_AWAITING_RESPONSE",
      baselineKind: null,
      headline: formalReturn("PENDING").currentFact,
      support: formalReturn("PENDING").exitConsequence,
      primaryAction: null,
      navigationConsequence: "REVEAL_RESPONSE",
      announcement: "你已经回到这一步，现实回应正在准备好。",
      announcementReferenceId:
        input.returnAcceptanceEvidence?.returnReceipt.returnReceiptReferenceId ??
        null,
    });
  }

  const admission = input.admission;
  if (admission === null) {
    return decision(input, {
      state: "BASELINE_LIFE_WORLD",
      baselineKind: "NEUTRAL",
      headline: "这里是你的旅程入口。",
      support:
        "此刻没有等待你确认的现实回应。你可以从这里开始下一段现实。",
      primaryAction: "START_NEW_REALITY",
      navigationConsequence: "NONE",
      announcement: null,
      announcementReferenceId: null,
    });
  }

  if (admission.state === "RESUME_COMMITTED") {
    const committed = formalChoice("COMMITTED");
    return decision(input, {
      state: "BASELINE_LIFE_WORLD",
      baselineKind: "CHOICE_AWAITS_DEPARTURE",
      headline: committed.currentFact,
      support: committed.exitConsequence,
      primaryAction: "CONFIRM_DEPARTURE",
      navigationConsequence: "NONE",
      announcement: null,
      announcementReferenceId: null,
    });
  }

  if (admission.state === "DORMANT_DEPARTURE") {
    const departed = formalChoice("DEPARTED");
    return decision(input, {
      state: "BASELINE_LIFE_WORLD",
      baselineKind: "DEPARTURE_AWAITS_RETURN",
      headline: departed.currentFact,
      support: departed.exitConsequence,
      primaryAction: "CONFIRM_RETURN",
      navigationConsequence: "NONE",
      announcement: null,
      announcementReferenceId: null,
    });
  }

  if (admission.state === "READY_FOR_LIVED_RESPONSE") {
    const announceAcceptedReturn = acceptedReceiptMatchesReadyAdmission(input);
    return decision(input, {
      state: "READY_TO_CONFIRM_REAL_RESPONSE",
      baselineKind: null,
      headline: formalReturn("SELECTION").purpose,
      support:
        "尝试过、完成了原来的回应，或换了一种回应，都可以成为这次真实记录。还没尝试或不想记录，也不会受到惩罚。",
      primaryAction: "CONFIRM_REAL_RESPONSE",
      navigationConsequence: "NONE",
      announcement: announceAcceptedReturn
        ? "你已经回到这一步。现在可以确认现实里真实发生了什么。"
        : null,
      announcementReferenceId: announceAcceptedReturn
        ? admission.returnReceipt.returnReceiptReferenceId
        : null,
    });
  }

  return safeWithheld(input);
}

export const XinmaiLivedResponseCheckpointPresentationResolver = Object.freeze({
  resolve: resolveXinmaiLivedResponseCheckpointPresentation,
  readsStorage: false as const,
  readsDom: false as const,
  readsTimer: false as const,
  writesAuthority: false as const,
});
