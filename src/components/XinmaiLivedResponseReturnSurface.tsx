import { useMemo, useState } from "react";
import type { ChoiceActionIntention } from "../types/xinmaiChoiceActionIntention";
import type { CrystalEligibility } from "../types/xinmaiCrystalEligibility";
import type {
  LivedResponseCandidate,
  LivedResponseOutcome,
} from "../types/xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  closeChoiceActionIntentionWithoutRecord,
  createLivedResponseCandidateReference,
} from "../services/xinmaiChoiceActionIntentionController";
import {
  confirmLivedResponseFact,
  revokeLivedResponseFact,
} from "../services/xinmaiLivedResponseAuthorityController";
import { resolveCrystalEligibilityForFact } from "../services/xinmaiCrystalEligibilityAuthority";
import {
  formCrystalFromEligibility,
  type XinmaiCrystalFormationResult,
} from "../services/xinmaiCrystalFormationConsumer";

const OUTCOMES: readonly Readonly<{
  value: LivedResponseOutcome;
  label: string;
}>[] = Object.freeze([
  { value: "ATTEMPTED", label: "我试着做了" },
  { value: "COMPLETED_AS_INTENDED", label: "我完成了原来的回应" },
  { value: "CHANGED_RESPONSE", label: "现实里，我用了另一种回应" },
  { value: "NOT_ATTEMPTED", label: "这一次还没有尝试" },
  { value: "UNABLE_TO_CONTINUE", label: "现实条件让我无法继续" },
]);

export function XinmaiLivedResponseReturnSurface({
  identityReferences,
  intentions,
  onResolved,
  reducedMotion = false,
}: Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  intentions: readonly ChoiceActionIntention[];
  onResolved: () => void;
  reducedMotion?: boolean;
}>) {
  const [selectedReferenceId, setSelectedReferenceId] = useState(
    intentions[0]?.choiceActionIntentionReferenceId ?? null,
  );
  const selected = useMemo(
    () =>
      intentions.find(
        (intention) =>
          intention.choiceActionIntentionReferenceId === selectedReferenceId,
      ) ?? intentions[0] ?? null,
    [intentions, selectedReferenceId],
  );
  const [outcome, setOutcome] =
    useState<LivedResponseOutcome>("ATTEMPTED");
  const [summary, setSummary] = useState("");
  const [eligibility, setEligibility] =
    useState<CrystalEligibility | null>(null);
  const [formation, setFormation] =
    useState<XinmaiCrystalFormationResult | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!selected) return null;

  const confirmFact = () => {
    if (busy || eligibility !== null) return;
    setBusy(true);
    setFeedback(null);
    const candidate: LivedResponseCandidate = Object.freeze({
      source: "xinmai_lived_response_return_surface" as const,
      candidateReferenceId: createLivedResponseCandidateReference(
        selected.choiceActionIntentionReferenceId,
      ),
      choiceActionIntentionReferenceId:
        selected.choiceActionIntentionReferenceId,
      candidateRevision: 1,
      responseOutcome: outcome,
      factualSummary: summary.trim(),
      state: "AWAITING_USER_CONFIRMATION" as const,
      createdAt: new Date().toISOString(),
    });
    const fact = confirmLivedResponseFact({
      candidate,
      intentionReferenceId: selected.choiceActionIntentionReferenceId,
    });
    if (fact.status !== "CONFIRMED") {
      setFeedback("这次事实还没有被保存，请稍后再试。");
      setBusy(false);
      return;
    }
    const resolved = resolveCrystalEligibilityForFact(fact.fact);
    if (resolved.status === "REJECTED") {
      setFeedback("这次回应已经被记住，生命沉积暂时没有完成。");
      setBusy(false);
      return;
    }
    setEligibility(resolved.eligibility);
    setFeedback(
      resolved.status === "ELIGIBLE"
        ? "这次真实回应，已经具备留下生命印记的条件。"
        : "这一次不形成印记，也没有关系。你的选择仍然被尊重。",
    );
    setBusy(false);
  };

  const rejectRecord = () => {
    const closed = closeChoiceActionIntentionWithoutRecord(
      selected.choiceActionIntentionReferenceId,
      identityReferences,
    );
    if (closed) onResolved();
    else setFeedback("这次记录尚未关闭，你仍可以继续同行。");
  };

  const formCrystal = async () => {
    if (!eligibility || eligibility.state !== "ELIGIBLE" || busy) return;
    setBusy(true);
    const result = await formCrystalFromEligibility({
      crystalEligibilityReferenceId:
        eligibility.crystalEligibilityReferenceId,
      expectedEligibilityRevision: eligibility.eligibilityRevision,
      identityReferences,
    });
    setFormation(result);
    setFeedback(
      result.status === "SAFE_WITHHELD"
        ? "这段经历已经被记录，生命沉积暂时没有完成。"
        : "这次真实回应，已经成为生命里的一道纹理。",
    );
    setBusy(false);
  };

  const revokeFact = () => {
    if (!eligibility || busy) return;
    setBusy(true);
    const result = revokeLivedResponseFact({
      livedResponseReferenceId: eligibility.livedResponseReferenceId,
      expectedUserConfirmationRevision: eligibility.livedResponseRevision,
      identityReferences,
    });
    if (result.status === "REVOKED") {
      setFeedback("这次记录已经撤回，没有形成生命印记。");
      onResolved();
    } else {
      setFeedback(
        result.reason === "FORMATION_ALREADY_CONFIRMED"
          ? "生命印记已经正式形成，这次记录没有被伪装成已删除。"
          : "这次记录尚未确认撤回，你仍可以继续同行或稍后重试。",
      );
    }
    setBusy(false);
  };

  return (
    <section
      aria-label="现实回应回访"
      data-lived-response-authority="USER_CONFIRMED_FACT"
      data-crystal-eligibility-authority="FORMAL_AUTHORITY_ONLY"
      data-motion-presentation={reducedMotion ? "STATIC" : "MOTION_ALLOWED"}
      data-formation-receipt={
        formation?.status === "FORMED" ||
        formation?.status === "ALREADY_FORMED"
          ? "CONFIRMED"
          : "NONE"
      }
      style={{
        display: "grid",
        gap: 12,
        width: "min(100%, 340px)",
        padding: "16px 18px",
        border: "1px solid rgba(207,189,150,0.14)",
        borderRadius: 16,
        background: "rgba(2,3,6,0.72)",
        backdropFilter: "blur(16px)",
      }}
    >
      <small>回到那次回应</small>
      <strong>{selected.actionSummary}</strong>
      {intentions.length > 1 ? (
        <div aria-label="选择要回看的现实回应">
          {intentions.map((intention) => (
            <button
              key={intention.choiceActionIntentionReferenceId}
              type="button"
              onClick={() =>
                setSelectedReferenceId(
                  intention.choiceActionIntentionReferenceId,
                )
              }
            >
              {intention.actionSummary}
            </button>
          ))}
        </div>
      ) : null}
      {eligibility === null ? (
        <>
          <p>现实里，实际发生了什么？</p>
          <div style={{ display: "grid", gap: 7 }}>
            {OUTCOMES.map((item) => (
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
            placeholder="可以留下一句实际发生的事实，也可以不写"
          />
          <div>
            <button type="button" onClick={rejectRecord}>
              我不想记录这次
            </button>
            <button type="button" disabled={busy} onClick={confirmFact}>
              确认这是实际发生的
            </button>
          </div>
        </>
      ) : eligibility.state === "ELIGIBLE" &&
        formation?.status !== "FORMED" &&
        formation?.status !== "ALREADY_FORMED" ? (
        <div>
          <button type="button" disabled={busy} onClick={revokeFact}>
            删除这次记录
          </button>
          <button type="button" disabled={busy} onClick={formCrystal}>
            让这次回应留在生命里
          </button>
        </div>
      ) : (
        <button type="button" onClick={onResolved}>
          继续同行
        </button>
      )}
      {feedback ? <p role="status">{feedback}</p> : null}
    </section>
  );
}
