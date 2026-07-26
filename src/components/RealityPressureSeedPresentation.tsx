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
    explicitGravityContinuationCallbackOnly: true,
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
          这就是我正在经历的
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
  onContinueToGravity,
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
        <span>现实正在靠近</span>
        <strong>{recognized ? "已经看见" : "此刻"}</strong>
      </div>
      <h2>
        {recognized
          ? "这段现实，正在经过你们。"
          : "此刻，哪一种现实最接近你？"}
      </h2>
      <p>
        {recognized
          ? session.selectedPressureSeedContext?.surface ??
            "现实已经被你看见。"
          : "不用判断，只停在最有感觉的那一幕。"}
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
        <div className="gy-p36__gravity-ready">
          <p role="status">它仍是它，只是身体正在回应。</p>
          <button
            type="button"
            data-interaction="CONTINUE_TO_GRAVITY"
            onClick={onContinueToGravity}
          >
            继续看它如何回应
          </button>
        </div>
      ) : null}
    </section>
  );
}
