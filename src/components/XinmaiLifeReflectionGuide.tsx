import { useState } from "react";

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
  const [lifeContinuityStable, setLifeContinuityStable] = useState(false);

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
  const thirdUnfinishedFlowVisible = phase === "THIRD_APPROACH";
  const relationSettlingVisible =
    relationEstablished || phase === "PAUSED";
  const focusedInnerViewMeaningVisible =
    firstLifeSignalVisible || secondProtectiveMeaningVisible;
  const focusedInnerViewMomentVisible =
    focusedInnerViewMeaningVisible || thirdUnfinishedFlowVisible ||
    relationSettlingVisible;
  const relationSettlingState =
    lifeContinuityStable
      ? "LIFE_CONTINUES"
      : phase === "CONFIRMED"
      ? "RECOGNIZED"
      : phase === "SELF_NAMED"
        ? "USER_KEEPS_OWN_MEANING"
        : "PAUSED_WITHOUT_LOSS";

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
            : thirdUnfinishedFlowVisible
              ? "SAME_MERIDIAN_UNFINISHED_NEW_FLOW"
              : relationSettlingVisible
                ? "SAME_LIFE_RELATION_SETTLING"
                : "REFLECTION_SEQUENCE"
      }
      data-xinmai-ai-claim="NONE"
      data-xinmai-dust-claim="NONE"
      data-xinmai-meridian-claim="NONE"
      data-xinmai-life-continuity={
        lifeContinuityStable
          ? "STABLE_AFTER_UNDERSTANDING"
          : relationSettlingVisible
            ? "SETTLING_IN_SAME_LIFE"
            : "NOT_YET_ESTABLISHED"
      }
      data-xinmai-choice-timing="UNDECIDED_NOT_TRIGGERED_BY_UNDERSTANDING"
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
      ) : thirdUnfinishedFlowVisible ? (
        <div
          className="xinmai-life-reflection-guide__new-flow"
          data-xinmai-new-flow="EXISTING_SAME_BODY_MERIDIAN"
          data-xinmai-new-flow-state="EMERGING_NOT_RESOLVED"
          data-xinmai-old-protective-path="PRESENT_NOT_AUTOMATIC"
          data-xinmai-new-flow-count="ONE"
          data-xinmai-new-flow-agency="回应仍然由你决定。"
          data-xinmai-choice-stage="NOT_STARTED"
          data-xinmai-crystal-stage="NOT_STARTED"
        >
          <i aria-hidden="true" />
          <span>旧的保护仍在</span>
          <strong>一点新的流动，正在同一处生命里出现。</strong>
        </div>
      ) : relationSettlingVisible ? (
        <div
          className="xinmai-life-reflection-guide__relation-settling"
          data-xinmai-relation-response="SAME_LIFE_SETTLING"
          data-xinmai-relation-response-state={relationSettlingState}
          data-xinmai-life-identity="UNCHANGED"
          data-xinmai-new-flow-memory="RETAINED"
          data-xinmai-equilibrium="AFTER_EXPERIENCE_NOT_INITIAL"
          data-xinmai-result-model="NONE"
          data-xinmai-route-transition="NONE"
          data-xinmai-module-transition="NONE"
          data-xinmai-choice-stage="NOT_STARTED"
          data-xinmai-crystal-stage="NOT_STARTED"
        >
          <i aria-hidden="true" />
          <span>
            {lifeContinuityStable
              ? "生命继续在这里"
              : phase === "CONFIRMED"
              ? "生命回应了你的认出"
              : phase === "SELF_NAMED"
                ? "生命为你的理解留出位置"
                : "生命陪你停在这里"}
          </span>
          <strong>
            {lifeContinuityStable
              ? "这份理解已经沉回生命，它仍按自己的节律呼吸。"
              : phase === "CONFIRMED"
              ? "这股流动慢慢安定下来，仍然是它自己。"
              : phase === "SELF_NAMED"
                ? "它没有被命名成答案，仍按自己的节律继续。"
                : "不必现在确认，它仍安静保持这次流动。"}
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
        {!focusedInnerViewMomentVisible ? (
          <p className="xinmai-life-reflection-guide__observation">
            {observation ?? "先靠近这一处生命变化。"}
          </p>
        ) : null}

        {phase !== "OBSERVING" && !focusedInnerViewMomentVisible ? (
          <p
            className="xinmai-life-reflection-guide__understanding"
            data-dynamics-protective-understanding="CANDIDATE_NOT_CONCLUSION"
          >
            {phase === "PAUSED"
              ? "不必现在得出结论。你和它仍在这里。"
              : phase === "SELF_NAMED"
                ? "保留你的理解。系统不替你命名。"
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
          <div
            className="xinmai-life-reflection-guide__agency"
            data-xinmai-agency-purpose="RELATION_CONFIRMATION_NOT_CHOICE_ANSWER"
          >
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
          <button
            type="button"
            data-xinmai-relation-action="RESUME_RELATION_NOT_RESTART"
            onClick={onResume}
          >
            回到刚才那一处
          </button>
        ) : relationEstablished ? (
          lifeContinuityStable ? (
            <span
              className="xinmai-life-reflection-guide__continuity-whisper"
              data-xinmai-life-continuity-presence="SAME_LIFE_STILL_HERE"
            >
              它仍在这里
            </span>
          ) : (
            <button
              type="button"
              data-xinmai-relation-action="SETTLE_INTO_LIFE_NO_ROUTE"
              data-xinmai-choice-trigger="WITHHELD"
              onClick={() => {
                setLifeContinuityStable(true);
                onContinue?.();
              }}
            >
              让它继续呼吸
            </button>
          )
        ) : null}
      </div>

      {!focusedInnerViewMomentVisible ? (
        <p className="xinmai-life-reflection-guide__boundary">
          它只帮助你看见，不替你决定。
        </p>
      ) : null}
    </aside>
  );
}
