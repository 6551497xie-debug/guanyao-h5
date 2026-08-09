import { useEffect, useMemo, useRef, useState } from "react";
import type { CrystalFormationReceipt } from "../types/xinmaiCrystalEligibility";
import type { XinmaiCanonicalBodyImprintDecision } from "../types/xinmaiCanonicalBodyImprint";
import type { XinmaiCrystalFormationProductionOutcome } from "../types/xinmaiCrystalFormationProduction";
import type { XinmaiCrystalOwnershipPresentationOrigin } from "../types/xinmaiCrystalOwnershipPresentation";
import type {
  LivedResponseCandidate,
  LivedResponseFact,
  LivedResponseOutcome,
} from "../types/xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import type { XinmaiChoiceReturningProvenanceAdmission } from "../types/xinmaiChoiceReturningProvenance";
import type {
  XinmaiLivedResponseFormationRequestEvidence,
  XinmaiLivedResponseReturnAcceptanceEvidence,
} from "../types/xinmaiLivedResponseCheckpointPresentation";
import { XinmaiCrystalFormationOwnershipMoment } from "./XinmaiCrystalFormationOwnershipMoment";
import { createLivedResponseCandidateReference } from "../services/xinmaiChoiceActionIntentionController";
import {
  confirmXinmaiChoiceExplicitDeparture,
  confirmXinmaiChoiceExplicitReturn,
  resolveXinmaiChoiceReturnWithoutFact,
} from "../services/xinmaiChoiceReturningProvenanceController";
import {
  orchestrateProductionCrystalFormation,
  recoverProductionCrystalFormation,
} from "../services/xinmaiCrystalFormationProductionOrchestrator";
import { resolveXinmaiCrystalOwnershipPresentation } from "../services/xinmaiCrystalOwnershipPresentationResolver";
import { resolveCrystalEligibilityForFact } from "../services/xinmaiCrystalEligibilityAuthority";
import { confirmLivedResponseFact } from "../services/xinmaiLivedResponseAuthorityController";
import { resolveXinmaiLivedResponseCheckpointPresentation } from "../services/xinmaiLivedResponseCheckpointPresentationResolver";
import { resolveXinmaiReturningSameLifeContinuityPresentation } from "../services/xinmaiReturningSameLifeContinuityPresentationResolver";
import type {
  XinmaiReturningSameLifeContinuityPresentationProjection,
} from "../types/xinmaiReturningSameLifeContinuityPresentation";
import "../styles/xinmai-lived-response-checkpoint.css";

const FACT_OUTCOMES: readonly Readonly<{
  value: Exclude<LivedResponseOutcome, "NOT_ATTEMPTED" | "UNABLE_TO_CONTINUE">;
  label: string;
  helper: string;
}>[] = Object.freeze([
  {
    value: "ATTEMPTED",
    label: "我试着做了",
    helper: "确认后会形成一条真实回应记录，并进入 Crystal 形成确认。",
  },
  {
    value: "COMPLETED_AS_INTENDED",
    label: "我完成了原来的回应",
    helper: "确认后会形成一条真实回应记录，并进入 Crystal 形成确认。",
  },
  {
    value: "CHANGED_RESPONSE",
    label: "现实里，我用了另一种回应",
    helper: "改变回应同样可以成为真实记录，不要求符合原计划。",
  },
]);

export type XinmaiLivedResponseRealityHandoff = Readonly<{
  intentReferenceId: string;
  targetEncounterCycleId: string;
  choiceActionIntentionReferenceId: string;
}>;

type FormationFailureReason = Extract<
  XinmaiCrystalFormationProductionOutcome,
  { status: "SAFE_WITHHELD" }
>["reason"];

export function XinmaiLivedResponseReturnSurface({
  identityReferences,
  admissions,
  onAuthorityRevision,
  onRealityHandoff,
  bodyImprintDecision,
  sourceRenderPlanReferenceId,
  onSameLifeContinuityProjection,
  reducedMotion = false,
}: Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  admissions: readonly XinmaiChoiceReturningProvenanceAdmission[];
  onAuthorityRevision?: () => void;
  onRealityHandoff?: (handoff: XinmaiLivedResponseRealityHandoff) => void;
  bodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
  sourceRenderPlanReferenceId: string;
  onSameLifeContinuityProjection?: (
    projection: XinmaiReturningSameLifeContinuityPresentationProjection,
  ) => void;
  reducedMotion?: boolean;
}>) {
  const [selectedReferenceId, setSelectedReferenceId] = useState(
    admissions[0]?.intention?.choiceActionIntentionReferenceId ?? null,
  );
  const selected = useMemo(
    () =>
      admissions.find(
        (admission) =>
          admission.intention?.choiceActionIntentionReferenceId ===
          selectedReferenceId,
      ) ?? admissions[0] ?? null,
    [admissions, selectedReferenceId],
  );
  const [outcome, setOutcome] = useState<
    Exclude<LivedResponseOutcome, "NOT_ATTEMPTED" | "UNABLE_TO_CONTINUE">
  >("ATTEMPTED");
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmedFormation, setConfirmedFormation] = useState<Readonly<{
    choiceActionIntentionReferenceId: string;
    receipt: CrystalFormationReceipt;
    presentationOrigin: XinmaiCrystalOwnershipPresentationOrigin;
  }> | null>(null);
  const [ownershipPresentedCrystalReferenceId, setOwnershipPresentedCrystalReferenceId] =
    useState<string | null>(null);
  const [formationFailure, setFormationFailure] =
    useState<FormationFailureReason | null>(null);
  const [returnAcceptanceEvidence, setReturnAcceptanceEvidence] =
    useState<XinmaiLivedResponseReturnAcceptanceEvidence | null>(null);
  const [pendingFormationAuthorities, setPendingFormationAuthorities] =
    useState<Readonly<{
      fact: LivedResponseFact;
      eligibility: NonNullable<
        XinmaiChoiceReturningProvenanceAdmission["currentEligibility"]
      >;
    }> | null>(null);
  const recoveryAttemptKeyRef = useRef<string | null>(null);
  const lastAnnouncementKeyRef = useRef<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [nativeReducedMotion, setNativeReducedMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setNativeReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const staticPresentation = reducedMotion || nativeReducedMotion;
  const selectedChoiceReferenceId =
    selected?.intention?.choiceActionIntentionReferenceId ?? null;
  const currentFormationReceipt =
    confirmedFormation?.choiceActionIntentionReferenceId ===
    selectedChoiceReferenceId
      ? confirmedFormation.receipt
      : selected?.formationReceipt ?? null;
  const currentPresentationOrigin: XinmaiCrystalOwnershipPresentationOrigin =
    confirmedFormation?.choiceActionIntentionReferenceId ===
    selectedChoiceReferenceId
      ? confirmedFormation.presentationOrigin
      : "CANONICAL_RECOVERY";
  const ownershipPresentationDecision = useMemo(
    () =>
      resolveXinmaiCrystalOwnershipPresentation({
        receipt: currentFormationReceipt,
        actionSummary: selected?.intention?.actionSummary ?? null,
        presentationOrigin: currentPresentationOrigin,
        formationPending:
          currentFormationReceipt === null &&
          selected?.state === "TERMINAL_BY_GROWTH" &&
          formationFailure === null,
        safeWithheld: formationFailure !== null,
        ownershipPresented:
          currentFormationReceipt !== null &&
          ownershipPresentedCrystalReferenceId ===
            currentFormationReceipt.crystalReferenceId,
        motionPreference: staticPresentation
          ? "REDUCED_MOTION"
          : "MOTION",
      }),
    [
      currentFormationReceipt,
      currentPresentationOrigin,
      formationFailure,
      ownershipPresentedCrystalReferenceId,
      selected,
      staticPresentation,
    ],
  );
  const currentFact = pendingFormationAuthorities?.fact ?? selected?.currentFact ?? null;
  const currentEligibility =
    pendingFormationAuthorities?.eligibility ?? selected?.currentEligibility ?? null;
  const formationRequestEvidence = useMemo<
    XinmaiLivedResponseFormationRequestEvidence | null
  >(
    () =>
      pendingFormationAuthorities === null
        ? null
        : Object.freeze({
            source: "existing_fact_and_eligibility_authorities" as const,
            choiceActionIntentionReferenceId:
              pendingFormationAuthorities.fact.choiceActionIntentionReferenceId,
            livedResponseReferenceId:
              pendingFormationAuthorities.fact.livedResponseReferenceId,
            crystalEligibilityReferenceId:
              pendingFormationAuthorities.eligibility
                .crystalEligibilityReferenceId,
          }),
    [pendingFormationAuthorities],
  );
  const checkpointDecision = useMemo(
    () =>
      resolveXinmaiLivedResponseCheckpointPresentation({
        identityStatus: "READY",
        admission: selected,
        currentFact,
        currentEligibility,
        formationReceipt: currentFormationReceipt,
        formationRequestEvidence,
        returnAcceptanceEvidence,
        formationFailure: formationFailure !== null,
        ownershipDecision: ownershipPresentationDecision,
        bodyImprintDecision,
        motionPreference: staticPresentation ? "REDUCED_MOTION" : "MOTION",
      }),
    [
      bodyImprintDecision,
      currentEligibility,
      currentFact,
      currentFormationReceipt,
      formationFailure,
      formationRequestEvidence,
      ownershipPresentationDecision,
      returnAcceptanceEvidence,
      selected,
      staticPresentation,
    ],
  );
  const sameLifeContinuityProjection = useMemo(
    () =>
      resolveXinmaiReturningSameLifeContinuityPresentation({
        consumerSurface: "RETURNING_OWNERSHIP",
        identityStatus: "READY",
        sourceReferenceId: identityReferences.sourceReferenceId,
        sourceRenderPlanReferenceId,
        canonicalBodyImprintDecision: bodyImprintDecision,
        checkpointDecision,
        admission: selected,
        currentFact,
        currentEligibility,
        formationReceipt: currentFormationReceipt,
        returnAcceptanceEvidence,
        ownershipDecision: ownershipPresentationDecision,
      }),
    [
      bodyImprintDecision,
      checkpointDecision,
      currentEligibility,
      currentFact,
      currentFormationReceipt,
      identityReferences.sourceReferenceId,
      ownershipPresentationDecision,
      returnAcceptanceEvidence,
      selected,
      sourceRenderPlanReferenceId,
    ],
  );

  useEffect(() => {
    onSameLifeContinuityProjection?.(sameLifeContinuityProjection);
  }, [onSameLifeContinuityProjection, sameLifeContinuityProjection]);

  useEffect(() => {
    if (
      checkpointDecision.announcement === null ||
      checkpointDecision.announcementReferenceId === null
    ) {
      setLiveAnnouncement("");
      return;
    }
    const key = `${checkpointDecision.state}:${checkpointDecision.announcementReferenceId}`;
    if (lastAnnouncementKeyRef.current === key) return;
    lastAnnouncementKeyRef.current = key;
    setLiveAnnouncement(checkpointDecision.announcement);
  }, [checkpointDecision]);

  useEffect(() => {
    if (
      selected?.state !== "TERMINAL_BY_GROWTH" ||
      selected.formationReceipt !== null ||
      selected.currentFact === null ||
      selected.currentEligibility === null ||
      (selected.currentEligibility.state !== "ELIGIBLE" &&
        selected.currentEligibility.state !== "FORMATION_PENDING")
    ) {
      return;
    }
    const attemptKey =
      `${selected.currentEligibility.crystalEligibilityReferenceId}:` +
      `${selected.currentEligibility.eligibilityRevision}`;
    if (recoveryAttemptKeyRef.current === attemptKey) return;
    recoveryAttemptKeyRef.current = attemptKey;
    let cancelled = false;
    setBusy(true);
    setFormationFailure(null);
    setPendingFormationAuthorities(
      Object.freeze({
        fact: selected.currentFact,
        eligibility: selected.currentEligibility,
      }),
    );
    void recoverProductionCrystalFormation({
      fact: selected.currentFact,
      eligibility: selected.currentEligibility,
      identityReferences,
    }).then((result) => {
      if (cancelled) return;
      if (result.status === "FORMED" || result.status === "ALREADY_FORMED") {
        setConfirmedFormation(
          Object.freeze({
            choiceActionIntentionReferenceId:
              selected.intention.choiceActionIntentionReferenceId,
            receipt: result.receipt,
            presentationOrigin:
              result.status === "FORMED"
                ? "CURRENT_TRANSACTION"
                : "CANONICAL_RECOVERY",
          }),
        );
        setFeedback(null);
        onAuthorityRevision?.();
      } else {
        setFormationFailure(result.reason);
        setFeedback("结晶尚未形成。事实与资格仍然保留，可以稍后重试。");
      }
      setPendingFormationAuthorities(null);
      setBusy(false);
    });
    return () => {
      cancelled = true;
    };
  }, [identityReferences, onAuthorityRevision, selected]);

  if (!selected || !selected.intention) return null;
  const intention = selected.intention;

  const depart = async () => {
    if (
      busy ||
      (selected.state !== "RESUME_COMMITTED" &&
        selected.state !== "DEPARTURE_RECONCILIATION_PENDING")
    ) return;
    setBusy(true);
    setFeedback(null);
    const result = await confirmXinmaiChoiceExplicitDeparture({
      intention,
      expectedIntentionRevision: intention.revision,
      identityReferences,
    });
    setFeedback(
      result.status === "DEPARTED" || result.status === "ALREADY_DEPARTED"
        ? "这一步已经被你带回生活。"
        : result.status === "DEPARTURE_RECONCILIATION_PENDING"
          ? "离场事实已保存，生命旅程仍在协调。既有资产不会丢失，可以稍后重试。"
          : "这一步还没有被完整保存，请稍后再试。",
    );
    if (
      result.status === "DEPARTED" ||
      result.status === "ALREADY_DEPARTED" ||
      result.status === "DEPARTURE_RECONCILIATION_PENDING"
    ) {
      onAuthorityRevision?.();
    }
    setBusy(false);
  };

  const returnExplicitly = async () => {
    if (busy || selected.state !== "DORMANT_DEPARTURE") return;
    setBusy(true);
    setFeedback(null);
    const result = await confirmXinmaiChoiceExplicitReturn({
      admission: selected,
    });
    if (result.status === "RETURNED" || result.status === "ALREADY_RETURNED") {
      setReturnAcceptanceEvidence(
        Object.freeze({
          source: "xinmai_choice_returning_provenance_controller" as const,
          choiceActionIntentionReferenceId:
            result.intention.choiceActionIntentionReferenceId,
          returnReceipt: result.returnReceipt,
        }),
      );
      setFeedback(null);
      onAuthorityRevision?.();
    } else {
      setReturnAcceptanceEvidence(null);
      setFeedback("这次回来还没有被完整接住，请稍后再试。");
    }
    setBusy(false);
  };

  const resolveWithoutFact = async (
    resolution: "NOT_ATTEMPTED" | "USER_REJECTED_RECORD",
  ) => {
    if (
      busy ||
      (selected.state !== "READY_FOR_LIVED_RESPONSE" &&
        selected.state !== "NO_FACT_TARGET_TERMINATION_PENDING")
    ) return;
    setBusy(true);
    const result = await resolveXinmaiChoiceReturnWithoutFact({
      admission: selected,
      resolution,
    });
    setFeedback(
      result.status === "RESOLVED" || result.status === "ALREADY_RESOLVED"
        ? result.intentTermination === "RETRYABLE"
          ? "你的选择已经保存，这次确认仍在安全结束，可以重试。"
          : resolution === "NOT_ATTEMPTED"
            ? "还没有尝试，也没有关系。这一步仍会等你。"
            : "这次不作记录。你仍然可以继续同行。"
        : "这次选择尚未完整保存，请稍后再试。",
    );
    if (result.status === "RESOLVED" || result.status === "ALREADY_RESOLVED") {
      onAuthorityRevision?.();
    }
    setBusy(false);
  };

  const confirmFact = async () => {
    if (busy || selected.state !== "READY_FOR_LIVED_RESPONSE") return;
    setBusy(true);
    setFeedback(null);
    const candidate: LivedResponseCandidate = Object.freeze({
      source: "xinmai_lived_response_return_surface" as const,
      candidateReferenceId: createLivedResponseCandidateReference(
        intention.choiceActionIntentionReferenceId,
      ),
      choiceActionIntentionReferenceId:
        intention.choiceActionIntentionReferenceId,
      candidateRevision: 1,
      responseOutcome: outcome,
      factualSummary: summary.trim(),
      state: "AWAITING_USER_CONFIRMATION" as const,
      createdAt: new Date().toISOString(),
    });
    const fact = await confirmLivedResponseFact({
      candidate,
      intentionReferenceId: intention.choiceActionIntentionReferenceId,
      expectedIntentionRevision: intention.revision,
      expectedCurrentFactRevision: 0,
      returnReceiptReferenceId:
        selected.returnReceipt.returnReceiptReferenceId,
      identityReferences,
    });
    if (fact.status !== "CONFIRMED" && fact.status !== "ALREADY_CONFIRMED") {
      setFeedback("这次事实还没有被保存，请稍后再试。");
      setBusy(false);
      return;
    }
    const eligibility = await resolveCrystalEligibilityForFact(fact.fact);
    if (
      (eligibility.status !== "ELIGIBLE" &&
        eligibility.status !== "ALREADY_RESOLVED") ||
      (eligibility.eligibility.state !== "ELIGIBLE" &&
        eligibility.eligibility.state !== "FORMATION_PENDING" &&
        eligibility.eligibility.state !== "CONSUMED")
    ) {
      setFeedback(
        eligibility.status === "WITHHELD"
          ? "这次回应没有生成结晶资格。已有事实仍然保留。"
          : "结晶资格尚未确认。已有事实仍然保留，可以稍后重试。",
      );
      onAuthorityRevision?.();
      setBusy(false);
      return;
    }
    setPendingFormationAuthorities(
      Object.freeze({
        fact: fact.fact,
        eligibility: eligibility.eligibility,
      }),
    );
    const formation = await orchestrateProductionCrystalFormation({
      trigger: "POST_FACT_COMMIT",
      fact: fact.fact,
      eligibility: eligibility.eligibility,
      identityReferences,
    });
    if (formation.status === "FORMED" || formation.status === "ALREADY_FORMED") {
      setConfirmedFormation(
        Object.freeze({
          choiceActionIntentionReferenceId:
            intention.choiceActionIntentionReferenceId,
          receipt: formation.receipt,
          presentationOrigin:
            formation.status === "FORMED"
              ? "CURRENT_TRANSACTION"
              : "CANONICAL_RECOVERY",
        }),
      );
      setFormationFailure(null);
      setFeedback(null);
    } else {
      setFormationFailure(formation.reason);
      setFeedback("结晶尚未形成。事实与资格仍然保留，可以稍后重试。");
    }
    setPendingFormationAuthorities(null);
    onAuthorityRevision?.();
    setBusy(false);
  };

  const retryFormation = async () => {
    if (
      busy ||
      selected.currentFact === null ||
      selected.currentEligibility === null
    ) {
      return;
    }
    setBusy(true);
    setFormationFailure(null);
    setPendingFormationAuthorities(
      Object.freeze({
        fact: selected.currentFact,
        eligibility: selected.currentEligibility,
      }),
    );
    const result = await recoverProductionCrystalFormation({
      fact: selected.currentFact,
      eligibility: selected.currentEligibility,
      identityReferences,
    });
    if (result.status === "FORMED" || result.status === "ALREADY_FORMED") {
      setConfirmedFormation(
        Object.freeze({
          choiceActionIntentionReferenceId:
            intention.choiceActionIntentionReferenceId,
          receipt: result.receipt,
          presentationOrigin:
            result.status === "FORMED"
              ? "CURRENT_TRANSACTION"
              : "CANONICAL_RECOVERY",
        }),
      );
      setFeedback(null);
      onAuthorityRevision?.();
    } else {
      setFormationFailure(result.reason);
      setFeedback("结晶尚未形成。事实与资格仍然保留，可以稍后重试。");
    }
    setPendingFormationAuthorities(null);
    setBusy(false);
  };

  const handoffConfirmedCrystal = () => {
    if (
      currentFormationReceipt === null ||
      selected.returnReceipt === null ||
      sameLifeContinuityProjection.status !== "PRESENTABLE" ||
      sameLifeContinuityProjection.checkpointState !== "OWNERSHIP_PRESENTED" ||
      sameLifeContinuityProjection.lineage.crystalReferenceId !==
        currentFormationReceipt.crystalReferenceId
    ) {
      return;
    }
    onRealityHandoff?.({
      intentReferenceId:
        selected.returnReceipt.realityProof.realityIntentReferenceId,
      targetEncounterCycleId:
        selected.returnReceipt.targetEncounterCycleId,
      choiceActionIntentionReferenceId:
        intention.choiceActionIntentionReferenceId,
    });
  };

  return (
    <section
      className="xinmai-lived-response-return-surface"
      aria-labelledby={
        checkpointDecision.state === "OWNERSHIP_PRESENTED"
          ? "xinmai-crystal-ownership-headline"
          : "xinmai-lived-response-checkpoint-heading"
      }
      data-lived-response-checkpoint={checkpointDecision.state}
      data-checkpoint-authority-writeback={checkpointDecision.authorityWriteback}
      data-choice-returning-admission={selected.state}
      data-lived-response-authority="USER_CONFIRMED_FACT"
      data-crystal-formation-authority="IDB_TRANSACTION_COMPLETE"
      data-crystal-formation-outcome={
        currentFormationReceipt !== null
          ? "FORMED"
          : formationFailure !== null
            ? "SAFE_WITHHELD"
            : "NOT_CONFIRMED"
      }
      data-crystal-reference={
        currentFormationReceipt?.crystalReferenceId ?? "NONE"
      }
      data-body-imprint-claim={checkpointDecision.bodyImprintClaim}
      data-motion-presentation={staticPresentation ? "STATIC" : "MOTION_ALLOWED"}
      data-ownership-surface-active={
        checkpointDecision.state === "OWNERSHIP_PRESENTED" ? "TRUE" : "FALSE"
      }
      data-returning-same-life-continuity={
        sameLifeContinuityProjection.status
      }
      data-returning-same-life-continuity-reference={
        sameLifeContinuityProjection.semanticProjectionReferenceId ?? "NONE"
      }
    >
      {checkpointDecision.state !== "OWNERSHIP_PRESENTED" ? (
        <header className="xinmai-lived-response-return-surface__heading">
          <small>现实行动确认</small>
          <h2 id="xinmai-lived-response-checkpoint-heading">
            {checkpointDecision.headline}
          </h2>
          <p>{checkpointDecision.support}</p>
          <blockquote>{intention.actionSummary}</blockquote>
        </header>
      ) : null}
      <p
        className="xinmai-lived-response-return-surface__live"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveAnnouncement || feedback || ""}
      </p>
      {currentFormationReceipt === null && admissions.length > 1 ? (
        <div
          className="xinmai-lived-response-return-surface__choice-switcher"
          aria-label="选择要继续确认的现实行动"
        >
          {admissions.map((admission) =>
            admission.intention ? (
              <button
                key={admission.intention.choiceActionIntentionReferenceId}
                type="button"
                onClick={() =>
                  setSelectedReferenceId(
                    admission.intention?.choiceActionIntentionReferenceId ?? null,
                  )
                }
              >
                {admission.intention.actionSummary}
              </button>
            ) : null,
          )}
        </div>
      ) : null}
      {checkpointDecision.state === "BASELINE_LIFE_WORLD" &&
      checkpointDecision.baselineKind === "CHOICE_AWAITS_DEPARTURE" ? (
        <button className="xinmai-lived-response-return-surface__primary" type="button" disabled={busy} onClick={depart}>
          带着这一步，回到生活
        </button>
      ) : checkpointDecision.state === "BASELINE_LIFE_WORLD" &&
        checkpointDecision.baselineKind === "DEPARTURE_AWAITS_RETURN" ? (
        <button className="xinmai-lived-response-return-surface__primary" type="button" disabled={busy} onClick={returnExplicitly}>
          我回来了
        </button>
      ) : checkpointDecision.state === "READY_TO_CONFIRM_REAL_RESPONSE" ? (
        <div className="xinmai-lived-response-return-surface__confirmation">
          <fieldset className="xinmai-lived-response-return-surface__fact-choices">
            <legend>选择真实发生的回应</legend>
            {FACT_OUTCOMES.map((item) => {
              const helperId = `xinmai-lived-response-${item.value.toLowerCase()}-helper`;
              return (
                <label key={item.value}>
                  <span>
                    <input
                      type="radio"
                      name="xinmai-lived-response-outcome"
                      checked={outcome === item.value}
                      aria-describedby={helperId}
                      onChange={() => setOutcome(item.value)}
                    />
                    <b>{item.label}</b>
                  </span>
                  <small id={helperId}>{item.helper}</small>
                </label>
              );
            })}
          </fieldset>
          <textarea
            rows={2}
            maxLength={180}
            value={summary}
            aria-label="补充实际发生的事实"
            onChange={(event) => setSummary(event.target.value)}
            placeholder="可以留下一句实际发生的事实"
          />
          <div className="xinmai-lived-response-return-surface__fact-submit">
            <button type="button" disabled={busy} onClick={confirmFact}>
              确认这是实际发生的
            </button>
            <small>
              确认后，系统才会依据这次真实回应检查 Crystal 是否正式形成。
            </small>
          </div>
          <div
            className="xinmai-lived-response-return-surface__no-fact"
            aria-label="这次不形成真实回应记录"
          >
            <div>
              <button type="button" disabled={busy} onClick={() => void resolveWithoutFact("NOT_ATTEMPTED")}>
                这一次还没有尝试
              </button>
              <small>不形成事实或 Crystal；这一步仍会等你。</small>
            </div>
            <div>
              <button type="button" disabled={busy} onClick={() => void resolveWithoutFact("USER_REJECTED_RECORD")}>
                我不想记录这次
              </button>
              <small>不记录、不形成，也没有惩罚。</small>
            </div>
          </div>
        </div>
      ) : checkpointDecision.state === "FORMATION_IN_PROGRESS" ? (
        <div className="xinmai-lived-response-return-surface__progress" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : checkpointDecision.state === "OWNERSHIP_PRESENTED" &&
        currentFormationReceipt !== null &&
        sameLifeContinuityProjection.status === "PRESENTABLE" &&
        sameLifeContinuityProjection.checkpointState ===
          "OWNERSHIP_PRESENTED" ? (
        <XinmaiCrystalFormationOwnershipMoment
          decision={ownershipPresentationDecision}
          onOwnershipPresented={() =>
            setOwnershipPresentedCrystalReferenceId(
              currentFormationReceipt.crystalReferenceId,
            )
          }
          onContinue={handoffConfirmedCrystal}
        />
      ) : checkpointDecision.state === "SAFE_WITHHELD" &&
        selected.state === "DEPARTURE_RECONCILIATION_PENDING" ? (
        <div className="xinmai-lived-response-return-surface__recovery">
          <button type="button" disabled={busy} onClick={depart}>
            重试协调
          </button>
        </div>
      ) : checkpointDecision.state === "SAFE_WITHHELD" &&
        selected.state === "NO_FACT_TARGET_TERMINATION_PENDING" ? (
        <div className="xinmai-lived-response-return-surface__recovery">
          <button
            type="button"
            disabled={busy}
            onClick={() =>
              void resolveWithoutFact(
                selected.returnReceipt.noFactReason,
              )
            }
          >
            重试结束本次确认
          </button>
        </div>
      ) : checkpointDecision.state === "SAFE_WITHHELD" &&
        selected.state === "TERMINAL_BY_GROWTH" &&
        selected.currentEligibility !== null ? (
        <div className="xinmai-lived-response-return-surface__recovery">
          <button type="button" disabled={busy} onClick={retryFormation}>
            重试形成结晶
          </button>
        </div>
      ) : null}
      {feedback ? (
        <p className="xinmai-lived-response-return-surface__feedback">
          {feedback}
        </p>
      ) : null}
    </section>
  );
}
