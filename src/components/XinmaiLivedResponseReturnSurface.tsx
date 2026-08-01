import { useEffect, useMemo, useState } from "react";
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
import { confirmLivedResponseFact } from "../services/xinmaiLivedResponseAuthorityController";
import { resolveCrystalEligibilityForFact } from "../services/xinmaiCrystalEligibilityAuthority";

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
    await resolveCrystalEligibilityForFact(fact.fact);
    setFeedback("这次真实回应已经被记住。");
    onAuthorityRevision?.();
    onRealityHandoff?.(
      Object.freeze({
        intentReferenceId:
          selected.returnReceipt.realityProof.realityIntentReferenceId,
        targetEncounterCycleId:
          selected.returnReceipt.targetEncounterCycleId,
        choiceActionIntentionReferenceId:
          intention.choiceActionIntentionReferenceId,
      }),
    );
    setBusy(false);
  };

  return (
    <section
      aria-label="现实回应回访"
      data-choice-returning-admission={selected.state}
      data-lived-response-authority="USER_CONFIRMED_FACT"
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
      ) : selected.state === "RESUME_REPORTED" ||
        selected.state === "TERMINAL_BY_GROWTH" ? (
        <button
          type="button"
          onClick={() => {
            const receipt = selected.returnReceipt;
            if (!receipt) return;
            onRealityHandoff?.({
              intentReferenceId: receipt.realityProof.realityIntentReferenceId,
              targetEncounterCycleId: receipt.targetEncounterCycleId,
              choiceActionIntentionReferenceId:
                intention.choiceActionIntentionReferenceId,
            });
          }}
        >
          回到同一生命空间
        </button>
      ) : (
        <p role="status">这次回访暂时无法确认。已有生命资产仍然保留。</p>
      )}
      {feedback ? <p role="status">{feedback}</p> : null}
    </section>
  );
}
