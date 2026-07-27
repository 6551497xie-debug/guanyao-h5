type XinmaiLifeReflectionGuideProps = Readonly<{
  surface: "REALITY" | "REFLECTION";
  phase?:
    | "OBSERVING"
    | "APPROACHED"
    | "CONFIRMED"
    | "SELF_NAMED"
    | "PAUSED";
  observation?: string;
  understanding?: string;
  onApproach?: () => void;
  onConfirm?: () => void;
  onSelfName?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onContinue?: () => void;
}>;

const REFLECTION_STEPS = Object.freeze([
  Object.freeze({
    id: "MIRROR",
    label: "看见",
    copy: "让生命状态先被看见",
  }),
  Object.freeze({
    id: "IDENTIFY",
    label: "命名",
    copy: "轻轻认出熟悉的保护方式",
  }),
  Object.freeze({
    id: "VALIDATE",
    label: "理解",
    copy: "承认它曾经保护过你",
  }),
  Object.freeze({
    id: "SHIFT",
    label: "转化",
    copy: "为新的回应留出一点空间",
  }),
]);

export function XinmaiLifeReflectionGuide({
  surface,
  phase = "OBSERVING",
  observation,
  understanding,
  onApproach,
  onConfirm,
  onSelfName,
  onPause,
  onResume,
  onContinue,
}: XinmaiLifeReflectionGuideProps) {
  if (surface === "REALITY") {
    return (
      <aside
        className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reality"
        data-xinmai-reality-guide="LIFE_AND_WORLD_MEET"
        aria-hidden="true"
      >
        <span>共同面对</span>
        <strong>现实先靠近，生命再回应。</strong>
      </aside>
    );
  }

  const activeStep =
    phase === "OBSERVING"
      ? "MIRROR"
      : phase === "APPROACHED" || phase === "PAUSED"
        ? "VALIDATE"
        : "SHIFT";
  const relationEstablished =
    phase === "CONFIRMED" || phase === "SELF_NAMED";

  return (
    <aside
      className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reflection"
      data-xinmai-reflection-guide="MIRROR_IDENTIFY_VALIDATE_SHIFT"
      data-xinmai-inner-view-phase={phase}
      data-xinmai-reflection-consumer="EXISTING_GRAVITY_STATE"
      data-xinmai-ai-claim="NONE"
      data-xinmai-dust-claim="NONE"
      data-xinmai-meridian-claim="NONE"
      aria-label="生命内观"
    >
      <span className="xinmai-life-reflection-guide__eyebrow">生命照见</span>
      <ol className="xinmai-life-reflection-guide__sequence">
        {REFLECTION_STEPS.map((step) => (
          <li
            key={step.id}
            data-xinmai-reflection-step={step.id}
            data-xinmai-reflection-step-state={
              step.id === activeStep ? "ACTIVE" : "RESTING"
            }
          >
            <i />
            <span>
              <strong>{step.label}</strong>
              <small>{step.copy}</small>
            </span>
          </li>
        ))}
      </ol>

      <div
        className="xinmai-life-reflection-guide__approach"
        data-xinmai-user-agency="CONFIRM_REVISE_OR_PAUSE"
      >
        <p className="xinmai-life-reflection-guide__observation">
          {observation ?? "先靠近这一处生命变化。"}
        </p>

        {phase !== "OBSERVING" ? (
          <p
            className="xinmai-life-reflection-guide__understanding"
            data-dynamics-protective-understanding="CANDIDATE_NOT_CONCLUSION"
          >
            {phase === "PAUSED"
              ? "不必现在得出结论。你和它仍在这里。"
              : phase === "SELF_NAMED"
                ? "保留你的理解。系统不替你命名。"
                : understanding ??
                  "这种回应，也许曾经用自己的方式保护过你。"}
          </p>
        ) : null}

        {phase === "OBSERVING" ? (
          <button type="button" onClick={onApproach}>
            靠近这处变化
          </button>
        ) : phase === "APPROACHED" ? (
          <div className="xinmai-life-reflection-guide__agency">
            <button type="button" onClick={onConfirm}>
              这像我
            </button>
            <button type="button" onClick={onSelfName}>
              不完全是这样
            </button>
            <button type="button" onClick={onPause}>
              先停在这里
            </button>
          </div>
        ) : phase === "PAUSED" ? (
          <button type="button" onClick={onResume}>
            再靠近一点
          </button>
        ) : relationEstablished ? (
          <button type="button" onClick={onContinue}>
            带着这份理解，继续观察
          </button>
        ) : null}
      </div>

      <p className="xinmai-life-reflection-guide__boundary">
        它只帮助你看见，不替你决定。
      </p>
    </aside>
  );
}
