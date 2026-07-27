type XinmaiLifeReflectionGuideProps = Readonly<{
  surface: "REALITY" | "REFLECTION";
  phase?:
    | "OBSERVING"
    | "FIRST_APPROACH"
    | "SECOND_APPROACH"
    | "THIRD_APPROACH"
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
      : phase === "FIRST_APPROACH"
        ? "IDENTIFY"
        : phase === "SECOND_APPROACH" || phase === "PAUSED"
        ? "VALIDATE"
        : "SHIFT";
  const relationEstablished =
    phase === "CONFIRMED" || phase === "SELF_NAMED";
  const approachDepth =
    phase === "OBSERVING"
      ? 0
      : phase === "FIRST_APPROACH"
        ? 1
        : phase === "SECOND_APPROACH" || phase === "PAUSED"
          ? 2
          : 3;
  const firstLifeSignalVisible = phase === "FIRST_APPROACH";
  const secondProtectiveMeaningVisible = phase === "SECOND_APPROACH";
  const focusedInnerViewMeaningVisible =
    firstLifeSignalVisible || secondProtectiveMeaningVisible;

  function resolveStepState(stepId: string) {
    const stepOrder = ["MIRROR", "IDENTIFY", "VALIDATE", "SHIFT"];
    const activeIndex = stepOrder.indexOf(activeStep);
    const stepIndex = stepOrder.indexOf(stepId);
    if (stepId === activeStep) return "ACTIVE";
    if (stepIndex >= 0 && stepIndex < activeIndex) return "PASSED";
    return "RESTING";
  }

  return (
    <aside
      className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reflection"
      data-xinmai-reflection-guide="MIRROR_IDENTIFY_VALIDATE_SHIFT"
      data-xinmai-inner-view-phase={phase}
      data-xinmai-three-approach-depth={approachDepth}
      data-xinmai-three-approach-sequence="SEE_UNDERSTAND_TRANSFORM"
      data-xinmai-reflection-consumer="EXISTING_GRAVITY_STATE"
      data-xinmai-life-signal-mode={
        firstLifeSignalVisible
          ? "SINGLE_EXISTING_DIMENSION_SIGNAL"
          : secondProtectiveMeaningVisible
            ? "SINGLE_EXISTING_PROTECTIVE_MEANING"
            : "REFLECTION_SEQUENCE"
      }
      data-xinmai-ai-claim="NONE"
      data-xinmai-dust-claim="NONE"
      data-xinmai-meridian-claim="NONE"
      aria-label="生命内观"
    >
      {firstLifeSignalVisible ? (
        <div
          className="xinmai-life-reflection-guide__life-signal"
          data-xinmai-life-signal="EXISTING_SIX_DIMENSION_OBSERVATION"
          data-xinmai-life-signal-count="ONE"
          data-xinmai-life-signal-meaning="STATE_CHANGE_NOT_DIAGNOSIS"
          data-xinmai-life-signal-boundary="先看见这处变化，不急着把它解释成你。"
        >
          <i aria-hidden="true" />
          <span>这一处，先有了回应</span>
          <strong>{observation ?? "生命在这里停留了一下。"}</strong>
        </div>
      ) : secondProtectiveMeaningVisible ? (
        <div
          className="xinmai-life-reflection-guide__protective-meaning"
          data-xinmai-protective-meaning="EXISTING_DIMENSION_UNDERSTANDING"
          data-xinmai-protective-meaning-count="ONE"
          data-xinmai-protective-meaning-certainty="POSSIBILITY_NOT_CONCLUSION"
          data-xinmai-dust-layer="UNRESOLVED"
        >
          <i aria-hidden="true" />
          <span>它也许曾这样保护过你</span>
          <strong>
            {understanding ??
              "这种回应，也许曾经用自己的方式保护过你。"}
          </strong>
        </div>
      ) : (
        <>
          <span className="xinmai-life-reflection-guide__eyebrow">
            生命照见
          </span>
          <ol className="xinmai-life-reflection-guide__sequence">
            {REFLECTION_STEPS.map((step) => (
              <li
                key={step.id}
                data-xinmai-reflection-step={step.id}
                data-xinmai-reflection-step-state={resolveStepState(step.id)}
              >
                <i />
                <span>
                  <strong>{step.label}</strong>
                  <small>{step.copy}</small>
                </span>
              </li>
            ))}
          </ol>
        </>
      )}

      <div
        className="xinmai-life-reflection-guide__approach"
        data-xinmai-user-agency="CONFIRM_REVISE_OR_PAUSE"
      >
        {!focusedInnerViewMeaningVisible ? (
          <p className="xinmai-life-reflection-guide__observation">
            {observation ?? "先靠近这一处生命变化。"}
          </p>
        ) : null}

        {phase !== "OBSERVING" && !focusedInnerViewMeaningVisible ? (
          <p
            className="xinmai-life-reflection-guide__understanding"
            data-dynamics-protective-understanding="CANDIDATE_NOT_CONCLUSION"
          >
            {phase === "PAUSED"
              ? "不必现在得出结论。你和它仍在这里。"
              : phase === "SELF_NAMED"
                ? "保留你的理解。系统不替你命名。"
                : phase === "THIRD_APPROACH"
                  ? "如果你愿意，为生命留出一点不同的流动。回应仍然由你决定。"
                  : phase === "CONFIRMED"
                    ? "这份理解来自你的确认，不是系统替你下的结论。"
                    : understanding ??
                      "这种回应，也许曾经用自己的方式保护过你。"}
          </p>
        ) : null}

        {phase === "OBSERVING" ? (
          <button type="button" onClick={onApproach}>
            第一次靠近 · 看见
          </button>
        ) : phase === "FIRST_APPROACH" ? (
          <button type="button" onClick={onApproach}>
            第二次靠近 · 理解
          </button>
        ) : phase === "SECOND_APPROACH" ? (
          <button type="button" onClick={onApproach}>
            第三次靠近 · 让它流动
          </button>
        ) : phase === "THIRD_APPROACH" ? (
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
            回到刚才那一处
          </button>
        ) : relationEstablished ? (
          <button type="button" onClick={onContinue}>
            带着这份理解，继续观察
          </button>
        ) : null}
      </div>

      {!focusedInnerViewMeaningVisible ? (
        <p className="xinmai-life-reflection-guide__boundary">
          它只帮助你看见，不替你决定。
        </p>
      ) : null}
    </aside>
  );
}
