import type {
  RealityPressurePresentationBoundary,
  RealityPressurePresentationProps,
} from "../types/realityPressurePresentation";
import "../styles/reality-pressure-presentation.css";

export const REALITY_PRESSURE_PRESENTATION_BOUNDARY:
  RealityPressurePresentationBoundary = Object.freeze({
    sharedFrozenPressurePresentationOnly: true,
    statelessPresentationOnly: true,
    explicitConfirmationCallbackOnly: true,
    noSourceResolution: true,
    noFixtureSource: true,
    noPrototypeAuthorization: true,
    noEngineInvocation: true,
    noPressureCalculation: true,
    noPressureSeedMatching: true,
    noDiagnosis: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

export function RealityPressurePresentation({
  pressureObservationConfirmed,
  interactionAvailability,
  gravityReadiness,
  onConfirm,
}: RealityPressurePresentationProps) {
  return (
    <section
      className="gy-p36__pressure-space"
      aria-label="Pressure Recognition Space现实作用观察"
      data-pressure-recognition-space-panel="PRESSURE_RECOGNITION_SPACE"
    >
      <div className="gy-p36__pressure-head">
        <span>现实作用观察</span>
        <strong>{pressureObservationConfirmed ? "已看见" : "观察"}</strong>
      </div>
      <h2>
        {pressureObservationConfirmed
          ? "张力已经被看见。"
          : "先看见，什么正在作用于你。"}
      </h2>
      <p>
        {pressureObservationConfirmed
          ? "接下来观察：我如何回应这些作用。Gravity 尚未执行。"
          : "不急着解释，也不急着判断。先让现实信号与内在张力浮现。"}
      </p>
      <div className="gy-p36__signal-list" aria-label="现实信号观察范围">
        <span>外部变化</span>
        <span>内在张力</span>
        <span>尚未命名的拉扯</span>
      </div>
      <small>Reality Ready · 不生成压力结论</small>
      {interactionAvailability === "PRESSURE_OBSERVATION_CONFIRM" ? (
        <button
          type="button"
          data-interaction="PRESSURE_OBSERVATION_CONFIRM"
          onClick={onConfirm}
        >
          确认这份观察
        </button>
      ) : null}
      {gravityReadiness === "READY" ? (
        <p className="gy-p36__gravity-ready" role="status">
          Gravity Experience 已准备好。
        </p>
      ) : null}
    </section>
  );
}
