import { useEffect, useRef } from "react";
import type {
  RealityPressureSeedCandidatePresentationProps,
  RealityPressureSeedPresentationBoundary,
  RealityPressureSeedPresentationProps,
} from "../types/realityPressureSeedPresentation";
import "../styles/reality-pressure-presentation.css";
import "../styles/xinmai-reality-seed-continuous-discovery.css";

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
      data-reality-fragment="WORLD_APPROACHING_LIFE"
    >
      <h3>{candidate.surface}</h3>
      <p>{candidate.shell}</p>
      {recognitionAvailable ? (
        <button
          type="button"
          data-interaction="PRESSURE_SEED_RECOGNIZE"
          onClick={() => onRecognize(candidate.candidateReferenceId)}
        >
          停在这一幕
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
  realitySurfaceAdmissionAttempt,
  onRealityPressureSurfaceOutcome,
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
  const reportedSurfaceOutcomeKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const outcomeKey =
      `${realitySurfaceAdmissionAttempt.intentReferenceId}:` +
      `${realitySurfaceAdmissionAttempt.encounterCycleId}:` +
      `${realitySurfaceAdmissionAttempt.intentRevision}:` +
      session.candidateBundleReferenceId;
    if (reportedSurfaceOutcomeKeyRef.current === outcomeKey) {
      return;
    }
    reportedSurfaceOutcomeKeyRef.current = outcomeKey;
    const sharedOutcome = Object.freeze({
      ...realitySurfaceAdmissionAttempt,
      identityReferences:
        realitySurfaceAdmissionAttempt.identityReferences,
      sourceReferenceId: session.sourceReferenceId,
    });
    if (
      session.sourceReferenceId !==
      realitySurfaceAdmissionAttempt.identityReferences
        .sourceReferenceId
    ) {
      onRealityPressureSurfaceOutcome(
        Object.freeze({
          ...sharedOutcome,
          status:
            "REALITY_PRESSURE_SURFACE_UNAVAILABLE" as const,
          reason: "PRESSURE_SOURCE_MISMATCH" as const,
          reportedAt: new Date().toISOString(),
        }),
      );
      return;
    }
    if (session.candidateBundle.candidates.length === 0) {
      onRealityPressureSurfaceOutcome(
        Object.freeze({
          ...sharedOutcome,
          status:
            "REALITY_PRESSURE_SURFACE_UNAVAILABLE" as const,
          reason: "CANDIDATE_BUNDLE_EMPTY" as const,
          reportedAt: new Date().toISOString(),
        }),
      );
      return;
    }
    onRealityPressureSurfaceOutcome(
      Object.freeze({
        ...sharedOutcome,
        status: "REALITY_PRESSURE_SURFACE_PRESENTED" as const,
        surfaceMode:
          "SEMANTIC_PRESSURE_CANDIDATE_SURFACE" as const,
        candidateBundleReferenceId:
          session.candidateBundleReferenceId,
        candidateCount: session.candidateBundle.candidates.length,
        presentedAt: new Date().toISOString(),
      }),
    );
  }, [
    onRealityPressureSurfaceOutcome,
    realitySurfaceAdmissionAttempt,
    session.candidateBundle.candidates.length,
    session.candidateBundleReferenceId,
    session.sourceReferenceId,
  ]);

  return (
    <section
      className="gy-p36__pressure-space"
      aria-label="认出正在靠近生命的现实"
      data-pressure-seed-presentation="V2"
      data-xinmai-screen="7"
      data-reality-experience-order="LIFE_FIRST_REALITY_SECOND_RECOGNITION_THIRD"
      data-reality-analysis-stage="NOT_STARTED"
      data-pressure-seed-capture-state={session.captureState}
      data-recognized-reality-presentation={
        recognized ? "TEXT_RECEDES_LIFE_RESPONDS" : "EXPLORING_FRAGMENTS"
      }
      data-source-reference-id={session.sourceReferenceId}
      data-candidate-bundle-reference={session.candidateBundleReferenceId}
    >
      <div className="gy-p36__pressure-head">
        <span>现实从远处靠近</span>
        <strong>{recognized ? "生命回应" : "此刻"}</strong>
      </div>
      <h2>
        {recognized
          ? "这一幕，正在经过你们。"
          : "哪一幕，刚刚碰到了你的生命？"}
      </h2>
      <p>
        {recognized
          ? "先让文字退远一点，看生命身体里哪一处开始回应。"
          : "不需要选得准确，先停在让身体有一点回应的那一幕。"}
      </p>

      {!recognized ? (
        <div
          key={session.candidateBundleReferenceId}
          className="gy-p36__signal-list"
          aria-label="正在靠近生命的现实片段"
          aria-live="polite"
          data-candidate-count={session.candidateBundle.candidates.length}
          data-reality-seed-discovery="CONTINUOUS_EXISTING_CATALOG"
          data-reality-seed-bundle-continuity="CURSOR_WITHOUT_REPETITION"
        >
          {session.candidateBundle.candidates.map((candidate) => (
            <RealityPressureSeedCandidatePresentation
              key={candidate.candidateReferenceId}
              candidate={candidate}
              recognitionAvailable={recognitionAvailable}
              onRecognize={onRecognize}
            />
          ))}
          {nextBundleAvailable ? (
            <div
              className="gy-reality-seed-continuation"
              role="group"
              aria-label="继续靠近下一组现实片段"
              data-reality-seed-continuation="IN_SWIPE_PATH"
              data-next-bundle-source="EXISTING_PRESSURE_SEED_CURSOR"
              data-automatic-recognition="NONE"
            >
              <span>星河还没有结束</span>
              <strong>还有别的现实，正在从远处靠近。</strong>
              <button
                type="button"
                data-interaction="PRESSURE_SEED_REQUEST_NEXT_BUNDLE"
                onClick={onRequestNextBundle}
              >
                继续靠近
              </button>
            </div>
          ) : null}
        </div>
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
        <div
          className="gy-p36__gravity-ready"
          data-inner-view-guidance="APPROACH_LIFE_BODY"
          data-direct-gravity-action="WITHHELD"
        >
          <p role="status">
            身体里有一处回应正在成形。轻触生命本身，靠近它。
          </p>
        </div>
      ) : null}
    </section>
  );
}
