import { useEffect, useMemo, useRef, useState } from "react";
import type { CrystalFormationReceipt } from "../types/xinmaiCrystalEligibility";
import type { XinmaiCrystalFormationProductionOutcome } from "../types/xinmaiCrystalFormationProduction";
import type {
  LivedResponseCandidate,
  LivedResponseOutcome,
} from "../types/xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import type { XinmaiChoiceReturningProvenanceAdmission } from "../types/xinmaiChoiceReturningProvenance";
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
import { resolveCrystalEligibilityForFact } from "../services/xinmaiCrystalEligibilityAuthority";
import { confirmLivedResponseFact } from "../services/xinmaiLivedResponseAuthorityController";

const FACT_OUTCOMES: readonly Readonly<{
  value: Exclude<LivedResponseOutcome, "NOT_ATTEMPTED" | "UNABLE_TO_CONTINUE">;
  label: string;
}>[] = Object.freeze([
  { value: "ATTEMPTED", label: "我试着做了" },
  { value: "COMPLETED_AS_INTENDED", label: "我完成了原来的回应" },
  { value: "CHANGED_RESPONSE", label: "现实里，我用了另一种回应" },
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
  reducedMotion = false,
}: Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  admissions: readonly XinmaiChoiceReturningProvenanceAdmission[];
  onAuthorityRevision?: () => void;
  onRealityHandoff?: (handoff: XinmaiLivedResponseRealityHandoff) => void;
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
  }> | null>(null);
  const [formationFailure, setFormationFailure] =
    useState<FormationFailureReason | null>(null);
  const recoveryAttemptKeyRef = useRef<string | null>(null);
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
          }),
        );
        setFeedback("这次现实回应已经形成一颗结晶。");
        onAuthorityRevision?.();
      } else {
        setFormationFailure(result.reason);
        setFeedback("结晶尚未形成。事实与资格仍然保留，可以稍后重试。");
      }
      setBusy(false);
    });
    return () => {
      cancelled = true;
    };
  }, [identityReferences, onAuthorityRevision, selected]);

  if (!selected || !selected.intention) return null;
  const intention = selected.intention;

  const depart = async () => {
    if (busy || selected.state !== "RESUME_COMMITTED") return;
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
        : "这一步还没有被完整保存，请稍后再试。",
    );
    if (result.status === "DEPARTED" || result.status === "ALREADY_DEPARTED") {
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
    setFeedback(
      result.status === "RETURNED" || result.status === "ALREADY_RETURNED"
        ? "欢迎回来。你可以诚实地说说现实里发生了什么。"
        : "这次回来还没有被完整接住，请稍后再试。",
    );
    if (result.status === "RETURNED" || result.status === "ALREADY_RETURNED") {
      onAuthorityRevision?.();
    }
    setBusy(false);
  };

  const resolveWithoutFact = async (
    resolution: "NOT_ATTEMPTED" | "USER_REJECTED_RECORD",
  ) => {
    if (busy || selected.state !== "READY_FOR_LIVED_RESPONSE") return;
    setBusy(true);
    const result = await resolveXinmaiChoiceReturnWithoutFact({
      admission: selected,
      resolution,
    });
    setFeedback(
      result.status === "RESOLVED" || result.status === "ALREADY_RESOLVED"
        ? resolution === "NOT_ATTEMPTED"
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
        }),
      );
      setFormationFailure(null);
      setFeedback("这次现实回应已经形成一颗结晶。");
    } else {
      setFormationFailure(formation.reason);
      setFeedback("结晶尚未形成。事实与资格仍然保留，可以稍后重试。");
    }
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
        }),
      );
      setFeedback("这次现实回应已经形成一颗结晶。");
      onAuthorityRevision?.();
    } else {
      setFormationFailure(result.reason);
      setFeedback("结晶尚未形成。事实与资格仍然保留，可以稍后重试。");
    }
    setBusy(false);
  };

  const handoffConfirmedCrystal = () => {
    if (currentFormationReceipt === null || selected.returnReceipt === null) {
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
      aria-label="现实回应回访"
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
      data-body-imprint-authority="SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER"
      data-motion-presentation={staticPresentation ? "STATIC" : "MOTION_ALLOWED"}
      style={{
        display: "grid",
        gap: 12,
        width: "min(100%, 340px)",
        padding: "16px 18px",
        border: "1px solid rgba(207,189,150,0.14)",
        borderRadius: 16,
        background: "rgba(2,3,6,0.72)",
        backdropFilter: "blur(16px)",
        pointerEvents: "auto",
      }}
    >
      <small>那一步仍属于同一段生命</small>
      <strong>{intention.actionSummary}</strong>
      {admissions.length > 1 ? (
        <div aria-label="选择要继续的现实回应">
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
      {selected.state === "RESUME_COMMITTED" ? (
        <button type="button" disabled={busy} onClick={depart}>
          带着这一步，回到生活
        </button>
      ) : selected.state === "DORMANT_DEPARTURE" ? (
        <>
          <p>这一步已经被你带回生活。等你愿意时，再明确回来。</p>
          <button type="button" disabled={busy} onClick={returnExplicitly}>
            我回来了
          </button>
        </>
      ) : selected.state === "READY_FOR_LIVED_RESPONSE" ? (
        <>
          <p>现实里，实际发生了什么？</p>
          <div style={{ display: "grid", gap: 7 }}>
            {FACT_OUTCOMES.map((item) => (
              <label key={item.value}>
                <input
                  type="radio"
                  name="xinmai-lived-response-outcome"
                  checked={outcome === item.value}
                  onChange={() => setOutcome(item.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
          <textarea
            rows={2}
            maxLength={180}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="可以留下一句实际发生的事实"
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button type="button" disabled={busy} onClick={() => void resolveWithoutFact("NOT_ATTEMPTED")}>
              这一次还没有尝试
            </button>
            <button type="button" disabled={busy} onClick={() => void resolveWithoutFact("USER_REJECTED_RECORD")}>
              我不想记录这次
            </button>
            <button type="button" disabled={busy} onClick={confirmFact}>
              确认这是实际发生的
            </button>
          </div>
        </>
      ) : currentFormationReceipt !== null ? (
        <div
          data-crystal-formation-presentation={
            staticPresentation ? "STATIC_CONFIRMED" : "MOTION_CONFIRMED"
          }
          style={{ display: "grid", gap: 8 }}
        >
          <strong>这次现实回应，已经形成一颗结晶。</strong>
          <small>{currentFormationReceipt.formedCrystal.crystal.copy}</small>
          <button type="button" onClick={handoffConfirmedCrystal}>
            带着这颗结晶，回到同一生命空间
          </button>
        </div>
      ) : selected.state === "TERMINAL_BY_GROWTH" &&
        selected.currentEligibility !== null ? (
        <div style={{ display: "grid", gap: 8 }}>
          <p role="status">真实回应已经保存，结晶仍在等待正式形成。</p>
          <button type="button" disabled={busy} onClick={retryFormation}>
            重试形成结晶
          </button>
        </div>
      ) : selected.state === "RESUME_REPORTED" ? (
        <p role="status">
          真实回应已经保存，结晶资格尚未成立。不会提前进入完整闭环。
        </p>
      ) : (
        <p role="status">这次回访暂时无法确认。已有生命资产仍然保留。</p>
      )}
      {feedback ? <p role="status">{feedback}</p> : null}
    </section>
  );
}
