import type {
  RealityChoicePresentationBoundary,
  RealityChoicePresentationProps,
} from "../types/realityChoicePresentation";
import "../styles/reality-choice-presentation.css";

export const REALITY_CHOICE_PRESENTATION_BOUNDARY:
  RealityChoicePresentationBoundary = Object.freeze({
    sharedFrozenChoicePresentationOnly: true,
    statelessPresentationOnly: true,
    explicitActiveResponseCallbackOnly: true,
    userOwnedResponseOnly: true,
    noSourceResolution: true,
    noFixtureSource: true,
    noPrototypeAuthorization: true,
    noEngineInvocation: true,
    noBehaviorGeneration: true,
    noRecommendedAction: true,
    noBestChoice: true,
    noUserJudgement: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

export function RealityChoicePresentation({
  choiceActiveResponseConfirmed,
  interactionAvailability,
  crystalReadiness,
  onActivate,
}: RealityChoicePresentationProps) {
  return (
    <section
      className="gy-p38__choice-space"
      aria-label="Choice Experience Space回应空间"
      data-choice-experience-space-panel="CHOICE_EXPERIENCE_SPACE"
    >
      <div className="gy-p38__choice-head">
        <span>回应空间</span>
        <strong>{choiceActiveResponseConfirmed ? "已发生" : "开放"}</strong>
      </div>
      <h2>
        {choiceActiveResponseConfirmed
          ? "这次回应已经发生。"
          : "反应间隙已经打开。"}
      </h2>
      <p>
        {choiceActiveResponseConfirmed
          ? "Crystal 已准备好；这次变化尚未沉积。"
          : "你不一定必须沿着旧路径回应。除了旧路径，还有其他可能。"}
      </p>
      <div className="gy-p38__possibility-list" aria-label="回应可能观察范围">
        <span>旧路径</span>
        <span>反应间隙</span>
        <span>其他可能</span>
      </div>
      <small>Choice Ready · 不提供唯一答案</small>
      {interactionAvailability === "CHOICE_ACTIVE_RESPONSE" ? (
        <button
          type="button"
          data-interaction="CHOICE_ACTIVE_RESPONSE"
          onClick={onActivate}
        >
          主动产生新的回应
        </button>
      ) : null}
      {crystalReadiness === "READY" ? (
        <p className="gy-p38__crystal-ready" role="status">
          Crystal Experience 已准备好。
        </p>
      ) : null}
    </section>
  );
}
