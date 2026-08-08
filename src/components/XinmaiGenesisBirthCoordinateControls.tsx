import type { FormEvent } from "react";
import type {
  XinmaiGenesisBirthCoordinateDraft,
  XinmaiGenesisBirthCoordinatePresentationDecision,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";
import { XINMAI_GENESIS_BIRTH_HOUR_BRANCHES } from "../types/xinmaiGenesisBirthCoordinatePresentation";
import "../styles/xinmai-genesis-birth-coordinate-spatial-interaction.css";

export type XinmaiGenesisBirthCoordinateControlsProps = Readonly<{
  draft: XinmaiGenesisBirthCoordinateDraft;
  decision: XinmaiGenesisBirthCoordinatePresentationDecision;
  onBegin: () => void;
  onDraftChange: (draft: XinmaiGenesisBirthCoordinateDraft) => void;
  onConfirm: () => void;
}>;

export function XinmaiGenesisBirthCoordinateControls({
  draft,
  decision,
  onBegin,
  onDraftChange,
  onConfirm,
}: XinmaiGenesisBirthCoordinateControlsProps) {
  const updateNumber = (
    field: "year" | "month" | "day",
    value: string,
  ) => {
    const numeric = Number(value);
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
        <h1 id="xinmai-genesis-birth-coordinate-title">
          {decision.headline}
        </h1>
        <p>{decision.support}</p>
      </div>

      {decision.primaryAction === "BEGIN" ? (
        <button
          className="xinmai-genesis-birth-coordinate__primary"
          type="button"
          onClick={onBegin}
        >
          填写出生时间
        </button>
      ) : null}

      {decision.showCoordinateFields ? (
        <form onSubmit={submit} noValidate>
          <fieldset disabled={decision.primaryAction === "NONE"}>
            <legend>出生日期与时辰</legend>
            <div className="xinmai-genesis-birth-coordinate__fields">
              <label>
                <span>出生年份</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1901"
                  max="2100"
                  value={Number.isFinite(draft.year) ? draft.year : ""}
                  onChange={(event) => updateNumber("year", event.target.value)}
                  autoComplete="bday-year"
                />
              </label>
              <label>
                <span>出生月份</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="12"
                  value={Number.isFinite(draft.month) ? draft.month : ""}
                  onChange={(event) => updateNumber("month", event.target.value)}
                  autoComplete="bday-month"
                />
              </label>
              <label>
                <span>出生日期</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="31"
                  value={Number.isFinite(draft.day) ? draft.day : ""}
                  onChange={(event) => updateNumber("day", event.target.value)}
                  autoComplete="bday-day"
                />
              </label>
              <label>
                <span>出生时辰</span>
                <select
                  value={draft.hourBranch}
                  onChange={(event) =>
                    onDraftChange(
                      Object.freeze({
                        ...draft,
                        hourBranch: event.target.value as typeof draft.hourBranch,
                      }),
                    )
                  }
                >
                  {XINMAI_GENESIS_BIRTH_HOUR_BRANCHES.map((hourBranch) => (
                    <option key={hourBranch} value={hourBranch}>
                      {hourBranch}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="xinmai-genesis-birth-coordinate__summary">
              {draft.year}年{draft.month}月{draft.day}日 · {draft.hourBranch}
            </p>
            {decision.primaryAction === "CONFIRM" ? (
              <button
                className="xinmai-genesis-birth-coordinate__primary"
                type="submit"
                disabled={!decision.confirmationEnabled}
              >
                确认生命坐标
              </button>
            ) : null}
          </fieldset>
        </form>
      ) : null}

      <p
        className="xinmai-genesis-birth-coordinate__status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {decision.state === "BIRTH_SOURCE_ACCEPTED" ||
        decision.state === "SAFE_WITHHELD" ||
        decision.state === "BIRTH_COORDINATE_READY"
          ? decision.support
          : ""}
      </p>
    </section>
  );
}
