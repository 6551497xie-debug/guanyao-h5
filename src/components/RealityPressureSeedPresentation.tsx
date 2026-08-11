import { useEffect, useRef } from "react";
import type {
  RealityPressureSeedCandidatePresentationProps,
  RealityPressureSeedPresentationBoundary,
  RealityPressureSeedPresentationProps,
} from "../types/realityPressureSeedPresentation";
import "../styles/reality-pressure-presentation.css";
import "../styles/xinmai-reality-seed-continuous-discovery.css";
import { resolveXinmaiFreshRealityVisibleNoveltyPresentation } from "../services/xinmaiFreshRealityVisibleNoveltyPresentationResolver";
import { resolveXinmaiJourneySemanticPresentation } from "../services/xinmaiJourneySemanticPresentationResolver";

export const REALITY_PRESSURE_SEED_PRESENTATION_BOUNDARY:
  RealityPressureSeedPresentationBoundary = Object.freeze({
    productionPressureSeedPresentationOnly: true,
    v2PressureSeedSessionOnly: true,
    statelessPresentationOnly: true,
    candidateSurfaceAndShellOnly: true,
    explicitRecognitionCallbackOnly: true,
    explicitNextBundleCallbackOnly: true,
    explicitPauseCallbackOnly: true,
    explicitLeaveCallbackOnly: true,
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
  recentlyCompleted,
  recognitionAvailable,
  onRecognize,
}: RealityPressureSeedCandidatePresentationProps) {
  return (
    <article
      data-pressure-seed-candidate={candidate.candidateReferenceId}
      data-candidate-selection="USER_RECOGNITION_REQUIRED"
      data-reality-fragment="WORLD_APPROACHING_LIFE"
    >
      {recentlyCompleted ? (
        <small data-recently-completed-reality="TRUE">
          刚刚完成过的一幕
        </small>
      ) : null}
      <h3>{candidate.surface}</h3>
      <p>{candidate.shell}</p>
      {recognitionAvailable ? (
        <button
          type="button"
          data-interaction="PRESSURE_SEED_RECOGNIZE"
          onClick={() => onRecognize(candidate.candidateReferenceId)}
        >
          就是这一幕
        </button>
      ) : null}
    </article>
  );
}

export function RealityPressureSeedPresentation({
  session,
  interactionEnabled,
  freshPostOwnershipCycle,
  historicalRealityMemoryKey,
  onRecognize,
  onRequestNextBundle,
  onPause,
  explicitLeaveState,
  onExplicitLeaveRequest,
  realitySurfaceAdmissionAttempt,
  onRealityPressureSurfaceOutcome,
}: RealityPressureSeedPresentationProps) {
  const semantic = resolveXinmaiJourneySemanticPresentation(
    freshPostOwnershipCycle ? "FRESH_REALITY" : "REALITY_SELECTION",
  );
  const recognitionAvailable =
    interactionEnabled &&
    session.availableEvents.includes(
      "PRESSURE_SEED_RECOGNIZE",
    );
  const nextBundleAvailable =
    interactionEnabled &&
    session.availableEvents.includes(
      "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
    );
  const pauseAvailable =
    interactionEnabled &&
    session.availableEvents.includes(
      "PRESSURE_SEED_PAUSE",
    );
  const recognized = session.captureState === "SEED_RECOGNIZED";
  const visibleNovelty =
    resolveXinmaiFreshRealityVisibleNoveltyPresentation({
      candidates: session.candidateBundle.candidates,
      freshPostOwnershipCycle,
      historicalRealityMemoryKey,
    });
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
      aria-label="选择当前最接近的现实情境"
      data-pressure-seed-presentation="V2"
      data-xinmai-screen="7"
      data-reality-experience-order="LIFE_FIRST_REALITY_SECOND_RECOGNITION_THIRD"
      data-reality-analysis-stage="NOT_STARTED"
      data-reality-surface-interaction={
        interactionEnabled
          ? "ACTIVE_INTERACTION"
          : "PRE_ACTIVE_PRESENTATION_ONLY"
      }
      data-pressure-seed-capture-state={session.captureState}
      data-recognized-reality-presentation={
        recognized ? "TEXT_RECEDES_LIFE_RESPONDS" : "EXPLORING_FRAGMENTS"
      }
      data-source-reference-id={session.sourceReferenceId}
      data-candidate-bundle-reference={session.candidateBundleReferenceId}
      data-fresh-reality-visible-novelty={visibleNovelty.state}
      data-historical-reality-match={
        visibleNovelty.historicalMatchReferenceId ?? "NONE"
      }
    >
      <div className="gy-p36__pressure-head">
        <span>{freshPostOwnershipCycle ? "新的现实周期" : "现实情境"}</span>
        <strong>{recognized ? "已选择" : "此刻"}</strong>
      </div>
      <h2>
        {recognized ? "你选择了这一幕。" : semantic.purpose}
      </h2>
      <p>
        {recognized
          ? "接下来会从六个角度观察你的反应；只有你最终确认的选择才会保存。"
          : semantic.explanation}
      </p>

      {!recognized ? (
        <div
          key={session.candidateBundleReferenceId}
          className="gy-p36__signal-list"
          aria-label="可选择的现实情境"
          aria-live="polite"
          data-candidate-count={session.candidateBundle.candidates.length}
          data-reality-seed-discovery="CONTINUOUS_EXISTING_CATALOG"
          data-reality-seed-bundle-continuity="CURSOR_WITHOUT_REPETITION"
        >
          {visibleNovelty.candidates.map(({ candidate, recentlyCompleted }) => (
            <RealityPressureSeedCandidatePresentation
              key={candidate.candidateReferenceId}
              candidate={candidate}
              recentlyCompleted={recentlyCompleted}
              recognitionAvailable={recognitionAvailable}
              onRecognize={onRecognize}
            />
          ))}
          {nextBundleAvailable ? (
            <div
              className="gy-reality-seed-continuation"
              role="group"
              aria-label="查看下一组现实情境"
              data-reality-seed-continuation="IN_SWIPE_PATH"
              data-next-bundle-source="EXISTING_PRESSURE_SEED_CURSOR"
              data-automatic-recognition="NONE"
            >
              <span>还没有找到最接近的一幕？</span>
              <strong>可以继续查看其他合格情境。</strong>
              <button
                type="button"
                data-interaction="PRESSURE_SEED_REQUEST_NEXT_BUNDLE"
                onClick={onRequestNextBundle}
              >
                {semantic.secondaryAction}
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
          暂时离开，保留已有内容
        </button>
      ) : null}
      <div
        className="gy-reality-explicit-leave"
        data-reality-explicit-leave-state={explicitLeaveState.status}
      >
        <button
          type="button"
          data-interaction="REALITY_EXPLICIT_LEAVE"
          disabled={explicitLeaveState.status === "PENDING"}
          onClick={onExplicitLeaveRequest}
        >
          {explicitLeaveState.status === "PENDING"
            ? "正在结束当前现实选择"
            : "结束当前现实选择并返回"}
        </button>
        {explicitLeaveState.status === "RETRYABLE" ? (
          <p
            role="status"
            data-reality-explicit-leave-feedback="RETRYABLE"
          >
            这一轮还没有完整停下，可以再试一次。
          </p>
        ) : null}
      </div>
      {interactionEnabled &&
      session.gravityReadiness === "READY" ? (
        <div
          className="gy-p36__gravity-ready"
          data-inner-view-guidance="APPROACH_LIFE_BODY"
          data-direct-gravity-action="WITHHELD"
        >
          <p role="status">
            这一幕已确认。接下来会从六个角度观察你的反应。
          </p>
        </div>
      ) : null}
    </section>
  );
}
