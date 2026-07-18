import type {
  RealityGravityPresentationBoundary,
  RealityGravityPresentationProps,
} from "../types/realityGravityPresentation";
import "../styles/reality-gravity-presentation.css";

export const REALITY_GRAVITY_PRESENTATION_BOUNDARY:
  RealityGravityPresentationBoundary = Object.freeze({
    sharedFrozenGravityPresentationOnly: true,
    statelessPresentationOnly: true,
    explicitConfirmationCallbackOnly: true,
    noSourceResolution: true,
    noFixtureSource: true,
    noPrototypeAuthorization: true,
    noEngineInvocation: true,
    noInertiaCalculation: true,
    noBehaviorScoring: true,
    noUserDiagnosis: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

export function RealityGravityPresentation({
  gravityObservationConfirmed,
  interactionAvailability,
  choiceReadiness,
  onConfirm,
}: RealityGravityPresentationProps) {
  return (
    <section
      className="gy-p37__gravity-space"
      aria-label="Gravity Experience Space惯性观察"
      data-gravity-experience-space-panel="GRAVITY_EXPERIENCE_SPACE"
    >
      <div className="gy-p37__gravity-head">
        <span>惯性观察</span>
        <strong>{gravityObservationConfirmed ? "已看见" : "觉察"}</strong>
      </div>
      <h2>
        {gravityObservationConfirmed
          ? "反应间隙已经打开。"
          : "看见惯性如何带动你。"}
      </h2>
      <p>
        {gravityObservationConfirmed
          ? "新的回应空间已经准备好；Choice 尚未执行。"
          : "刺激抵达之后，身体、情绪与行动往往先于解释发生。先观察，不急着改变。"}
      </p>
      <div className="gy-p37__response-list" aria-label="惯性观察范围">
        <span>刺激</span>
        <span>自动回应</span>
        <span>重复路径</span>
      </div>
      <small>Gravity Ready · 不生成行为结论</small>
      {interactionAvailability === "GRAVITY_OBSERVATION_CONFIRM" ? (
        <button
          type="button"
          data-interaction="GRAVITY_OBSERVATION_CONFIRM"
          onClick={onConfirm}
        >
          确认这份惯性观察
        </button>
      ) : null}
      {choiceReadiness === "READY" ? (
        <p className="gy-p37__choice-ready" role="status">
          Choice Experience 已准备好。
        </p>
      ) : null}
    </section>
  );
}
