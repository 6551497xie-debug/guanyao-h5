import type { XinmaiCrystalOwnershipPresentationDecision } from "../types/xinmaiCrystalOwnershipPresentation";
import "../styles/xinmai-crystal-formation-ownership-moment.css";

const CONDENSING_SHARDS = Object.freeze(
  Array.from({ length: 10 }, (_, index) => index),
);

export function XinmaiCrystalFormationOwnershipMoment({
  decision,
  onOwnershipPresented,
  onContinue,
  continueDisabled = false,
  continueBusy = false,
  continueLabel = "带着这道痕迹，继续同行",
}: Readonly<{
  decision: XinmaiCrystalOwnershipPresentationDecision;
  onOwnershipPresented: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueBusy?: boolean;
  continueLabel?: string;
}>) {
  if (decision.state === "FORMATION_PENDING") {
    return (
      <div
        className="xinmai-crystal-ownership xinmai-crystal-ownership--pending"
        data-crystal-formation-presentation="FORMATION_PENDING"
        data-crystal-success-authority="NOT_CONFIRMED"
      >
        <span className="xinmai-crystal-ownership__pending-breath" aria-hidden="true" />
        <strong>这道现实回应正在被生命接住。</strong>
        <small>形成被正式确认以前，不会提前出现 Crystal。</small>
      </div>
    );
  }

  if (decision.state === "SAFE_WITHHELD") {
    return (
      <div
        className="xinmai-crystal-ownership xinmai-crystal-ownership--withheld"
        data-crystal-formation-presentation="SAFE_WITHHELD"
        data-crystal-success-authority="NOT_CONFIRMED"
      >
        <strong>这道痕迹还没有被完整确认。</strong>
        <small>已经发生的事实仍被保留，可以稍后再试。</small>
      </div>
    );
  }

  const { visualFacts } = decision;
  const recovered = decision.state === "RECOVERED_EXISTING";
  const ownershipPresented =
    visualFacts.ownershipInteraction === "PRESENTED";

  return (
    <article
      className="xinmai-crystal-ownership xinmai-crystal-ownership--available"
      data-crystal-formation-presentation={decision.state}
      data-crystal-success-authority={visualFacts.successAuthority}
      data-crystal-reference={visualFacts.crystalReferenceId}
      data-formation-reference={visualFacts.formationReferenceId}
      data-presentation-origin={visualFacts.presentationOrigin}
      data-motion-presentation={visualFacts.motionPreference}
      data-ownership-interaction={visualFacts.ownershipInteraction}
      data-authority-writeback="FORBIDDEN"
      aria-labelledby="xinmai-crystal-ownership-headline"
    >
      <div className="xinmai-crystal-ownership__scene">
        <div
          className="xinmai-crystal-ownership__release-field"
          aria-hidden="true"
        />
        <div
          className="xinmai-crystal-ownership__condensing-field"
          aria-hidden="true"
        >
          {CONDENSING_SHARDS.map((shard) => (
            <i key={shard} />
          ))}
        </div>
        <div
          className="xinmai-crystal-ownership__settling-ring"
          aria-hidden="true"
        />
        <button
          className="xinmai-crystal-ownership__crystal-touch"
          type="button"
          aria-label="轻触这颗 Crystal，确认它来自这次现实回应"
          aria-pressed={ownershipPresented}
          onClick={onOwnershipPresented}
        >
          <svg
            className="xinmai-crystal-ownership__crystal"
            viewBox="0 0 180 216"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="xinmai-crystal-ownership__crystal-shadow"
              d="M89 14 151 61 136 166 90 206 42 166 28 62Z"
            />
            <path
              className="xinmai-crystal-ownership__crystal-shell"
              d="M89 14 151 61 136 166 90 206 42 166 28 62Z"
            />
            <path
              className="xinmai-crystal-ownership__crystal-water"
              d="M89 25 137 66 124 157 89 189 54 157 41 67Z"
            />
            <path
              className="xinmai-crystal-ownership__crystal-light"
              d="M89 25 89 189 54 157 41 67Z"
            />
            <path
              className="xinmai-crystal-ownership__crystal-depth"
              d="m89 25 48 41-13 91-35 32Z"
            />
            <g className="xinmai-crystal-ownership__crystal-crackle">
              <path d="m90 42-18 38 17 21-23 40" />
              <path d="m89 101 23-24 14 15" />
              <path d="m66 141 22 18 17-31" />
              <path d="m72 80-20-8" />
            </g>
            <path
              className="xinmai-crystal-ownership__crystal-core"
              d="m90 72 19 28-19 43-19-43Z"
            />
          </svg>
          <span
            className="xinmai-crystal-ownership__touch-ring"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="xinmai-crystal-ownership__meaning">
        <small className="xinmai-crystal-ownership__eyebrow">
          {recovered ? "同一颗 Crystal 仍在这里" : "来自你真实走出的这一步"}
        </small>
        <blockquote>{visualFacts.actionSummary}</blockquote>
        <h2 id="xinmai-crystal-ownership-headline">
          {visualFacts.ownershipHeadline}
        </h2>
        <p>{visualFacts.ownershipSupport}</p>
        <small className="xinmai-crystal-ownership__crystal-line">
          {visualFacts.crystalLine}
        </small>
      </div>

      <div className="xinmai-crystal-ownership__actions">
        <small>
          {ownershipPresented
            ? "它已经回应了你的触碰。"
            : "你可以轻触它，也可以直接继续。"}
        </small>
        <p className="xinmai-crystal-ownership__exit-explanation">
          继续后会离开这段确认画面，进入同一生命的下一段现实。
        </p>
        <button
          className="xinmai-crystal-ownership__continue"
          type="button"
          disabled={continueDisabled}
          aria-busy={continueBusy}
          onClick={(event) => {
            event.currentTarget.blur();
            onContinue();
          }}
        >
          {continueLabel}
        </button>
      </div>
    </article>
  );
}
