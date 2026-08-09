import type { FormEvent } from "react";
import type {
  XinmaiGenesisBirthCoordinateDraft,
  XinmaiGenesisBirthCoordinatePresentationDecision,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";
import "../styles/xinmai-genesis-birth-coordinate-spatial-interaction.css";

export type XinmaiGenesisBirthCoordinateControlsProps = Readonly<{
  draft: XinmaiGenesisBirthCoordinateDraft;
  decision: XinmaiGenesisBirthCoordinatePresentationDecision;
  onBegin: () => void;
  onDraftChange: (draft: XinmaiGenesisBirthCoordinateDraft) => void;
  onConfirm: () => void;
}>;

const formatLunar = (
  receipt: NonNullable<XinmaiGenesisBirthCoordinatePresentationDecision["derivationReceipt"]>,
) => {
  const lunar = receipt.calendarResolution.lunarBirthDate;
  return `${lunar.relatedYear}年${lunar.isLeapMonth ? "闰" : ""}${lunar.month}月${lunar.day}日`;
};

export function XinmaiGenesisBirthCoordinateControls({
  draft,
  decision,
  onBegin,
  onDraftChange,
  onConfirm,
}: XinmaiGenesisBirthCoordinateControlsProps) {
  const updateNumber = (field: "year" | "month" | "day", value: string) => {
    const numeric = value.trim() === "" ? null : Number(value);
    onDraftChange(Object.freeze({ ...draft, [field]: numeric }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (decision.confirmationEnabled) onConfirm();
  };
  return (
    <section
      className="xinmai-genesis-birth-coordinate"
      aria-labelledby="xinmai-genesis-birth-coordinate-title"
      data-birth-coordinate-state={decision.state}
      data-scene-enrichment={decision.sceneEnrichment}
    >
      <div className="xinmai-genesis-birth-coordinate__copy">
        <h1 id="xinmai-genesis-birth-coordinate-title">{decision.headline}</h1>
        <p>{decision.support}</p>
      </div>
      {decision.primaryAction === "BEGIN" ? (
        <button className="xinmai-genesis-birth-coordinate__primary" type="button" onClick={onBegin}>
          填写出生时间
        </button>
      ) : null}
      {decision.showCoordinateFields ? (
        <form onSubmit={submit} noValidate>
          <fieldset disabled={decision.primaryAction === "NONE"}>
            <legend>当地民用公历出生日期与时间</legend>
            <p>请按出生证明或家人记忆中的当地时间填写。系统不会进行真太阳时、时区或夏令时换算。</p>
            <div className="xinmai-genesis-birth-coordinate__fields">
              {(["year", "month", "day"] as const).map((field) => (
                <label key={field}>
                  <span>{field === "year" ? "出生年份" : field === "month" ? "出生月份" : "出生日期"}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={field === "year" ? "1901" : "1"}
                    max={field === "year" ? "2100" : field === "month" ? "12" : "31"}
                    value={draft[field] ?? ""}
                    onChange={(event) => updateNumber(field, event.target.value)}
                    autoComplete={field === "year" ? "bday-year" : field === "month" ? "bday-month" : "bday-day"}
                  />
                </label>
              ))}
              <label>
                <span>时间精度</span>
                <select
                  value={draft.precision}
                  onChange={(event) => onDraftChange(Object.freeze({
                    ...draft,
                    precision: event.target.value as typeof draft.precision,
                  }))}
                >
                  <option value="EXACT">知道具体时间</option>
                  <option value="APPROXIMATE_RANGE">只知道时间范围</option>
                  <option value="UNKNOWN">暂时不知道</option>
                </select>
              </label>
              {draft.precision === "EXACT" ? (
                <label>
                  <span>当地钟表时间</span>
                  <input type="time" value={draft.exactLocalTime} onChange={(event) => onDraftChange(Object.freeze({ ...draft, exactLocalTime: event.target.value }))} />
                </label>
              ) : null}
              {draft.precision === "APPROXIMATE_RANGE" ? (
                <>
                  <label>
                    <span>最早时间</span>
                    <input type="time" value={draft.approximateRangeStart} onChange={(event) => onDraftChange(Object.freeze({ ...draft, approximateRangeStart: event.target.value }))} />
                  </label>
                  <label>
                    <span>最晚时间</span>
                    <input type="time" value={draft.approximateRangeEnd} onChange={(event) => onDraftChange(Object.freeze({ ...draft, approximateRangeEnd: event.target.value }))} />
                  </label>
                </>
              ) : null}
            </div>
            {decision.derivationReceipt ? (
              <p className="xinmai-genesis-birth-coordinate__summary">
                原始输入：{decision.derivationReceipt.canonicalGregorianBirthDate} · {draft.precision === "EXACT" ? draft.exactLocalTime : `${draft.approximateRangeStart}–${draft.approximateRangeEnd}`}<br />
                系统推导：农历{formatLunar(decision.derivationReceipt)} · {decision.derivationReceipt.derivedHourBranch}
              </p>
            ) : draft.precision === "UNKNOWN" ? (
              <p className="xinmai-genesis-birth-coordinate__summary">日期可暂存；不会猜测时辰，也不会形成个性化生命身份。</p>
            ) : null}
            {decision.primaryAction === "CONFIRM" ? (
              <button className="xinmai-genesis-birth-coordinate__primary" type="submit" disabled={!decision.confirmationEnabled}>
                确认原始输入与推导结果
              </button>
            ) : null}
          </fieldset>
        </form>
      ) : null}
      <p className="xinmai-genesis-birth-coordinate__status" role="status" aria-live="polite" aria-atomic="true">
        {decision.state === "BIRTH_SOURCE_ACCEPTED" || decision.state === "SAFE_WITHHELD" || decision.state === "BIRTH_COORDINATE_READY" ? decision.support : ""}
      </p>
    </section>
  );
}
