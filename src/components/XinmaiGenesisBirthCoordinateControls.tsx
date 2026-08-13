import { useLayoutEffect, useRef } from "react";
import type { FormEvent } from "react";
import {
  syncXinmaiGenesisBirthNativeInput,
  XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY,
} from "../services/xinmaiGenesisBirthNativeInputAdapter";
import type { XinmaiGenesisBirthNativeInput } from "../services/xinmaiGenesisBirthNativeInputAdapter";
import { resolveXinmaiJourneySemanticPresentation } from "../services/xinmaiJourneySemanticPresentationResolver";
import { requireXinmaiFormalStatePresentation } from "../services/xinmaiSemanticConstitutionFormalStateMatrix";
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

const formatCivilDate = (draft: XinmaiGenesisBirthCoordinateDraft): string => {
  if (draft.year === null || draft.month === null || draft.day === null) return "";
  return [
    String(draft.year).padStart(4, "0"),
    String(draft.month).padStart(2, "0"),
    String(draft.day).padStart(2, "0"),
  ].join("-");
};

const validationRecoveryCopy = (
  decision: XinmaiGenesisBirthCoordinatePresentationDecision,
): string => {
  if (decision.validation.status === "VALID") {
    return "核对一致后，系统会保存本次体验唯一的时间坐标记录。";
  }
  switch (decision.validation.reason) {
    case "YEAR_OUTSIDE_SUPPORTED_RANGE":
      return "请填写系统支持范围内的公历年份。";
    case "MONTH_OUTSIDE_RANGE":
    case "DAY_OUTSIDE_RANGE":
    case "DATE_DOES_NOT_EXIST":
      return "这个公历日期不存在，请重新选择日期。";
    case "BIRTH_TIME_UNRESOLVED":
      return "日期会保留；补充当地时间后才能形成个性化生命起点。";
    case "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH":
      return "这个时间范围跨越了两个时辰。请缩小范围，或改为具体时间。";
    case "CALENDAR_UNAVAILABLE":
      return "农历推导暂时不可用。原始输入会保留，请稍后重试。";
    case "INVALID_LOCAL_TIME":
      return "请填写完整的当地钟表时间，或选择一个有效时间范围。";
  }
};

export function XinmaiGenesisBirthCoordinateControls({
  draft,
  decision,
  onBegin,
  onDraftChange,
  onConfirm,
}: XinmaiGenesisBirthCoordinateControlsProps) {
  const semantic = resolveXinmaiJourneySemanticPresentation("BIRTH_COORDINATE");
  const latestDraftRef = useRef(draft);
  const formalBirthState =
    decision.state === "BIRTH_SOURCE_ACCEPTED"
      ? "RECOVERY"
      : draft.precision === "UNKNOWN"
        ? "UNKNOWN"
        : decision.validation.status === "VALID"
          ? draft.precision === "APPROXIMATE_RANGE" ? "RANGE" : "VALID"
          : decision.validation.reason === "CALENDAR_UNAVAILABLE"
            ? "FAILURE"
            : "EMPTY";
  const formalBirthPresentation = requireXinmaiFormalStatePresentation(
    "BIRTH",
    formalBirthState,
  );
  useLayoutEffect(() => {
    latestDraftRef.current = draft;
  }, [draft]);
  const syncNativeInput = (input: XinmaiGenesisBirthNativeInput) => {
    const result = syncXinmaiGenesisBirthNativeInput(latestDraftRef.current, input);
    if (result.status !== "UPDATED") return;
    latestDraftRef.current = result.draft;
    onDraftChange(result.draft);
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
      data-formal-journey-state={`BIRTH/${formalBirthState}`}
      data-scene-enrichment={decision.sceneEnrichment}
      data-birth-coordinate-validation={
        decision.validation.status === "VALID"
          ? "VALID"
          : decision.validation.reason
      }
      data-native-input-sync={XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY}
      data-overview-effect-entry="LUNAR_EARTH_OVERVIEW"
      data-subject-anchor="FIRST_PERSON_OBSERVER_AND_ACTOR"
      data-star-beast-relation="OTHER_COSMIC_LIFE"
    >
      <div className="xinmai-genesis-birth-coordinate__copy">
        <span className="xinmai-genesis-birth-coordinate__eyebrow">月地视域 · 现实起点</span>
        <h1 id="xinmai-genesis-birth-coordinate-title">{semantic.purpose}</h1>
        <p>{semantic.explanation}</p>
      </div>
      {decision.primaryAction === "BEGIN" ? (
        <button className="xinmai-genesis-birth-coordinate__primary" type="button" onClick={onBegin}>
          填写出生时间
        </button>
      ) : null}
      {decision.showCoordinateFields ? (
        <form onSubmit={submit} noValidate aria-describedby="xinmai-genesis-birth-coordinate-feedback">
          <fieldset disabled={XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY !== "ENABLED"}>
            <legend>填写出生时间坐标</legend>
            <p className="xinmai-genesis-birth-coordinate__instruction">
              按出生证明或家人记忆中的当地时间填写。系统以公历作为输入；农历与时辰只作为文化时间表达，不用于判断命运或人格。
            </p>
            <div
              className="xinmai-genesis-birth-coordinate__instrument"
              data-chrono-visual-shell="AXIS_GRAMMAR_REWIRED_TO_RAW_BIRTH_INPUT"
            >
              <div className="xinmai-genesis-birth-coordinate__axis" aria-hidden="true">
                <span className="xinmai-genesis-birth-coordinate__axis-line" />
                <span className="xinmai-genesis-birth-coordinate__core" />
                <span className="xinmai-genesis-birth-coordinate__axis-line" />
              </div>
              <div className="xinmai-genesis-birth-coordinate__fields">
                <label className="xinmai-genesis-birth-coordinate__date-field">
                  <span>当地民用公历出生日期</span>
                  <input
                    id="xinmai-birth-civil-date"
                    name="xinmai-birth-civil-date"
                    type="date"
                    min="1901-01-01"
                    max="2100-12-31"
                    value={formatCivilDate(draft)}
                    onInput={(event) => syncNativeInput({ field: "CIVIL_DATE", value: event.currentTarget.value })}
                    onChange={(event) => syncNativeInput({ field: "CIVIL_DATE", value: event.currentTarget.value })}
                    autoComplete="bday"
                  />
                </label>
                <label>
                  <span>时间记忆</span>
                  <select
                    id="xinmai-birth-time-precision"
                    name="xinmai-birth-time-precision"
                    value={draft.precision}
                    onInput={(event) => syncNativeInput({
                      field: "PRECISION",
                      value: event.currentTarget.value as typeof draft.precision,
                    })}
                    onChange={(event) => syncNativeInput({
                      field: "PRECISION",
                      value: event.currentTarget.value as typeof draft.precision,
                    })}
                  >
                    <option value="EXACT">知道具体时间</option>
                    <option value="APPROXIMATE_RANGE">只知道时间范围</option>
                    <option value="UNKNOWN">暂时不知道</option>
                  </select>
                </label>
                {draft.precision === "EXACT" ? (
                  <label className="xinmai-genesis-birth-coordinate__time-field">
                    <span>当地钟表时间</span>
                    <input
                      id="xinmai-birth-exact-time"
                      name="xinmai-birth-exact-time"
                      type="time"
                      value={draft.exactLocalTime}
                      onInput={(event) => syncNativeInput({ field: "EXACT_LOCAL_TIME", value: event.currentTarget.value })}
                      onChange={(event) => syncNativeInput({ field: "EXACT_LOCAL_TIME", value: event.currentTarget.value })}
                      autoComplete="bday-time"
                    />
                  </label>
                ) : null}
                {draft.precision === "APPROXIMATE_RANGE" ? (
                  <>
                    <label>
                      <span>最早时间</span>
                      <input
                        id="xinmai-birth-range-start"
                        name="xinmai-birth-range-start"
                        type="time"
                        value={draft.approximateRangeStart}
                        onInput={(event) => syncNativeInput({ field: "APPROXIMATE_RANGE_START", value: event.currentTarget.value })}
                        onChange={(event) => syncNativeInput({ field: "APPROXIMATE_RANGE_START", value: event.currentTarget.value })}
                      />
                    </label>
                    <label>
                      <span>最晚时间</span>
                      <input
                        id="xinmai-birth-range-end"
                        name="xinmai-birth-range-end"
                        type="time"
                        value={draft.approximateRangeEnd}
                        onInput={(event) => syncNativeInput({ field: "APPROXIMATE_RANGE_END", value: event.currentTarget.value })}
                        onChange={(event) => syncNativeInput({ field: "APPROXIMATE_RANGE_END", value: event.currentTarget.value })}
                      />
                    </label>
                  </>
                ) : null}
              </div>
            </div>
            {decision.derivationReceipt ? (
              <div className="xinmai-genesis-birth-coordinate__summary" data-birth-source-derivation="READY">
                <span>请确认这组时间坐标</span>
                <strong>
                  {decision.derivationReceipt.canonicalGregorianBirthDate}
                  <i aria-hidden="true">·</i>
                  {draft.precision === "EXACT"
                    ? draft.exactLocalTime
                    : `${draft.approximateRangeStart}–${draft.approximateRangeEnd}`}
                </strong>
                <span>系统确定性推导</span>
                <strong>农历{formatLunar(decision.derivationReceipt)} · {decision.derivationReceipt.derivedHourBranch}</strong>
              </div>
            ) : draft.precision === "UNKNOWN" ? (
              <p className="xinmai-genesis-birth-coordinate__summary" data-birth-source-derivation="UNRESOLVED">
                日期会保留；系统不会猜测时辰，也不会形成个性化生命身份。
              </p>
            ) : null}
            <p
              id="xinmai-genesis-birth-coordinate-feedback"
              className="xinmai-genesis-birth-coordinate__feedback"
              data-birth-coordinate-feedback={decision.validation.status}
            >
              {validationRecoveryCopy(decision)} {formalBirthPresentation.exitConsequence}
            </p>
            <button
              className="xinmai-genesis-birth-coordinate__primary"
              type="submit"
              disabled={!decision.confirmationEnabled}
              aria-disabled={!decision.confirmationEnabled}
            >
              {decision.confirmationEnabled ? semantic.primaryAction : "完成输入后确认"}
            </button>
          </fieldset>
        </form>
      ) : null}
      <p className="xinmai-genesis-birth-coordinate__status" role="status" aria-live="polite" aria-atomic="true">
        {decision.state === "LIFE_WORLD_BASELINE" ? "" : decision.support}
      </p>
    </section>
  );
}
