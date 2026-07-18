import type {
  RealityPressureSeedCandidatePresentationProps,
  RealityPressureSeedPresentationBoundary,
  RealityPressureSeedPresentationProps,
} from "../types/realityPressureSeedPresentation";
import "../styles/reality-pressure-presentation.css";

export const REALITY_PRESSURE_SEED_PRESENTATION_BOUNDARY:
  RealityPressureSeedPresentationBoundary = Object.freeze({
    productionPressureSeedPresentationOnly: true,
    v2PressureSeedSessionOnly: true,
    statelessPresentationOnly: true,
    candidateSurfaceAndShellOnly: true,
    explicitRecognitionCallbackOnly: true,
    explicitNextBundleCallbackOnly: true,
    explicitPauseCallbackOnly: true,
    sourceReferenceReadOnly: true,
    noFixtureSource: true,
    noPrototypeAuthorization: true,
    noDefaultCandidate: true,
    noAutomaticSelection: true,
    noSourceResolution: true,
    noEngineInvocation: true,
    noPressureCalculation: true,
    noPressureSeedMatching: true,
    noCaptureExecution: true,
    noConsumerInvocation: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

function RealityPressureSeedCandidatePresentation({
  candidate,
  recognitionAvailable,
  onRecognize,
}: RealityPressureSeedCandidatePresentationProps) {
  return (
    <article
      data-pressure-seed-candidate={candidate.candidateReferenceId}
      data-candidate-selection="USER_RECOGNITION_REQUIRED"
    >
      <h3>{candidate.surface}</h3>
      <p>{candidate.shell}</p>
      {recognitionAvailable ? (
        <button
          type="button"
          data-interaction="PRESSURE_SEED_RECOGNIZE"
          onClick={() => onRecognize(candidate.candidateReferenceId)}
        >
          这就是正在作用于我的
        </button>
      ) : null}
    </article>
  );
}

export function RealityPressureSeedPresentation({
  session,
  onRecognize,
  onRequestNextBundle,
  onPause,
}: RealityPressureSeedPresentationProps) {
  const recognitionAvailable = session.availableEvents.includes(
    "PRESSURE_SEED_RECOGNIZE",
  );
  const nextBundleAvailable = session.availableEvents.includes(
    "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
  );
  const pauseAvailable = session.availableEvents.includes(
    "PRESSURE_SEED_PAUSE",
  );
  const recognized = session.captureState === "SEED_RECOGNIZED";

  return (
    <section
      className="gy-p36__pressure-space"
      aria-label="Reality Pressure Seed Recognition"
      data-pressure-seed-presentation="V2"
      data-pressure-seed-capture-state={session.captureState}
      data-source-reference-id={session.sourceReferenceId}
      data-candidate-bundle-reference={session.candidateBundleReferenceId}
    >
      <div className="gy-p36__pressure-head">
        <span>现实力量认领</span>
        <strong>{recognized ? "已认领" : "看见"}</strong>
      </div>
      <h2>
        {recognized
          ? "这股力量已经被你看见。"
          : "哪一种现实力量，正在作用于你？"}
      </h2>
      <p>
        {recognized
          ? session.selectedPressureSeedContext?.surface ?? "认领已经完成。"
          : "不需要判断对错，只认出此刻最像你的那一个。"}
      </p>

      {!recognized ? (
        <div
          className="gy-p36__signal-list"
          aria-label="现实力量候选"
          data-candidate-count={session.candidateBundle.candidates.length}
        >
          {session.candidateBundle.candidates.map((candidate) => (
            <RealityPressureSeedCandidatePresentation
              key={candidate.candidateReferenceId}
              candidate={candidate}
              recognitionAvailable={recognitionAvailable}
              onRecognize={onRecognize}
            />
          ))}
        </div>
      ) : null}

      {!recognized && nextBundleAvailable ? (
        <button
          type="button"
          data-interaction="PRESSURE_SEED_REQUEST_NEXT_BUNDLE"
          onClick={onRequestNextBundle}
        >
          都不像，换一组
        </button>
      ) : null}
      {!recognized && pauseAvailable ? (
        <button
          type="button"
          data-interaction="PRESSURE_SEED_PAUSE"
          onClick={onPause}
        >
          暂时停在这里
        </button>
      ) : null}
      {session.gravityReadiness === "READY" ? (
        <p className="gy-p36__gravity-ready" role="status">
          Reality Pressure Seed 已完成认领。Gravity 尚未启动。
        </p>
      ) : null}
    </section>
  );
}
