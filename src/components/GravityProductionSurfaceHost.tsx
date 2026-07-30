import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GravityPage } from "../pages/GravityPage";
import {
  resolveGravitySurfaceAdmissionTransaction,
} from "../services/xinmaiGravitySurfaceAdmissionTransaction";
import {
  resolveProductionChoiceActionRoutes,
} from "../services/xinmaiChoiceActionRouteRuntimeInputAdapter";
import type {
  GravityEntryAdmission,
  GravityHostAcceptanceOutcome,
  GravityProductionRuntimeInput,
  GravityRouteAdmission,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravityLifeSurfaceOutcome,
  GravityObservationSurfaceOutcome,
  GravitySurfaceAdmissionAttempt,
} from "../types/xinmaiGravitySurfaceAdmission";
import type {
  GravityObservationRecognitionOutcome,
  GravityObservationRecognitionProvenance,
  GravityObservationResumeDecision,
} from "../types/xinmaiGravityObservationContinuity";
import type {
  ChoiceGrowthTerminalSummary,
} from "../types/xinmaiChoicePresentationReadiness";

const GRAVITY_SURFACE_WATCHDOG_MS = 8_000;

export const GRAVITY_PRODUCTION_SURFACE_HOST_BOUNDARY =
  Object.freeze({
    typedAdmissionOnly: true as const,
    explicitRuntimeInputOnly: true as const,
    typedLifeSurfaceOutcomeRequired: true as const,
    typedObservationSurfaceOutcomeRequired: true as const,
    watchdogFailureOnly: true as const,
    noDomInspection: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noNavigation: true as const,
    noPressureInference: true as const,
    noChoiceExecution: true as const,
    noCrystalExecution: true as const,
    noRendererInvocation: true as const,
  });

export type GravityProductionSurfaceHostProps = Readonly<{
  routeAdmission: GravityRouteAdmission;
  admission: GravityEntryAdmission;
  runtimeInput: GravityProductionRuntimeInput;
  continuityDecision: GravityObservationResumeDecision;
  growthTerminalSummary: ChoiceGrowthTerminalSummary;
  growthSummaryPending: boolean;
  onGrowthTerminalSummaryRefreshRequested: () => Promise<void>;
  onObservationRecognitionRequested: (
    recognition: GravityObservationRecognitionProvenance,
    expectedCheckpointRevision: number,
  ) => Promise<GravityObservationRecognitionOutcome>;
  onAcceptanceOutcome: (
    outcome: GravityHostAcceptanceOutcome,
  ) => void;
}>;

export function GravityProductionSurfaceHost({
  routeAdmission,
  admission,
  runtimeInput,
  continuityDecision,
  growthTerminalSummary,
  growthSummaryPending,
  onGrowthTerminalSummaryRefreshRequested,
  onObservationRecognitionRequested,
  onAcceptanceOutcome,
}: GravityProductionSurfaceHostProps) {
  const [lifeSurfaceOutcome, setLifeSurfaceOutcome] =
    useState<GravityLifeSurfaceOutcome | null>(null);
  const [observationSurfaceOutcome, setObservationSurfaceOutcome] =
    useState<GravityObservationSurfaceOutcome | null>(null);
  const deliveredAttemptRef = useRef<string | null>(null);
  const surfaceAttempt = useMemo<GravitySurfaceAdmissionAttempt>(
    () =>
      Object.freeze({
        admissionReferenceId: admission.admissionReferenceId,
        gravityCycleId: admission.gravityCycleId,
        admissionRevision: admission.revision,
        identityReferences: admission.identityReferences,
        selectedPressureSeedId:
          admission.currentPressure.selectedPressureSeedId,
        sourceEncounterCycleId:
          admission.sourceReality.encounterCycleId,
        choiceActionIntentionReferenceId:
          admission.sourceReality.choiceActionIntentionReferenceId,
        gravityObservationReferenceId:
          admission.gravityObservationReferenceId,
      }),
    [admission],
  );
  const attemptKey =
    `${surfaceAttempt.admissionReferenceId}:` +
    `${surfaceAttempt.gravityCycleId}:` +
    `${surfaceAttempt.admissionRevision}`;
  const actionRouteResolution = useMemo(
    () =>
      resolveProductionChoiceActionRoutes({
        runtimeInput,
        observationDecision: continuityDecision,
      }),
    [runtimeInput, continuityDecision],
  );

  useEffect(() => {
    setLifeSurfaceOutcome(null);
    setObservationSurfaceOutcome(null);
    deliveredAttemptRef.current = null;
  }, [attemptKey]);

  const reportUnavailable = useCallback(
    (
      reason: Extract<
        GravityHostAcceptanceOutcome,
        { status: "GRAVITY_HOST_UNAVAILABLE" }
      >["reason"],
    ) => {
      if (deliveredAttemptRef.current === attemptKey) return;
      deliveredAttemptRef.current = attemptKey;
      onAcceptanceOutcome(
        Object.freeze({
          status: "GRAVITY_HOST_UNAVAILABLE" as const,
          ...surfaceAttempt,
          reason,
          reportedAt: new Date().toISOString(),
        }),
      );
    },
    [attemptKey, onAcceptanceOutcome, surfaceAttempt],
  );

  const receiveLifeSurfaceOutcome = useCallback(
    (outcome: GravityLifeSurfaceOutcome) => {
      if (
        outcome.admissionReferenceId !==
          surfaceAttempt.admissionReferenceId ||
        outcome.gravityCycleId !== surfaceAttempt.gravityCycleId ||
        outcome.admissionRevision !==
          surfaceAttempt.admissionRevision
      ) {
        return;
      }
      if (outcome.status === "GRAVITY_LIFE_SURFACE_UNAVAILABLE") {
        reportUnavailable("LIFE_SURFACE_OUTCOME_REJECTED");
        return;
      }
      setLifeSurfaceOutcome(outcome);
    },
    [reportUnavailable, surfaceAttempt],
  );

  const receiveObservationSurfaceOutcome = useCallback(
    (outcome: GravityObservationSurfaceOutcome) => {
      if (
        outcome.admissionReferenceId !==
          surfaceAttempt.admissionReferenceId ||
        outcome.gravityCycleId !== surfaceAttempt.gravityCycleId ||
        outcome.admissionRevision !==
          surfaceAttempt.admissionRevision
      ) {
        return;
      }
      if (
        outcome.status ===
        "GRAVITY_OBSERVATION_SURFACE_UNAVAILABLE"
      ) {
        reportUnavailable("OBSERVATION_SURFACE_OUTCOME_REJECTED");
        return;
      }
      setObservationSurfaceOutcome(outcome);
    },
    [reportUnavailable, surfaceAttempt],
  );

  useEffect(() => {
    if (deliveredAttemptRef.current === attemptKey) return;
    const transaction = resolveGravitySurfaceAdmissionTransaction({
      attempt: surfaceAttempt,
      lifeSurfaceOutcome,
      observationSurfaceOutcome,
    });
    if (transaction.status !== "READY") return;
    deliveredAttemptRef.current = attemptKey;
    onAcceptanceOutcome(
      Object.freeze({
        status: "GRAVITY_MINIMUM_PRESENTED" as const,
        ...surfaceAttempt,
        transaction: transaction.transaction,
        committedAt: transaction.transaction.committedAt,
      }),
    );
  }, [
    attemptKey,
    lifeSurfaceOutcome,
    observationSurfaceOutcome,
    onAcceptanceOutcome,
    surfaceAttempt,
  ]);

  useEffect(() => {
    const watchdog = window.setTimeout(() => {
      reportUnavailable("SURFACE_OUTCOME_WATCHDOG_EXPIRED");
    }, GRAVITY_SURFACE_WATCHDOG_MS);
    return () => window.clearTimeout(watchdog);
  }, [attemptKey, reportUnavailable]);

  return (
    <GravityPage
      dynamicsInputContext={runtimeInput.dynamicsInputContext}
      visualContinuity={runtimeInput.visualContinuity}
      innerViewEntry="CURRENT_LIFE_WEATHER_BODY_APPROACHED"
      choiceContinuation={
        admission.sourceReality.origin === "CHOICE_CONTINUATION"
          ? "CHOICE_ACTION_INTENTION_CONTINUATION"
          : null
      }
      experienceSmokeFixture={null}
      surfaceAttempt={surfaceAttempt}
      observationContinuityDecision={continuityDecision}
      growthTerminalSummary={growthTerminalSummary}
      actionRouteResolution={actionRouteResolution}
      growthSummaryPending={growthSummaryPending}
      onGrowthTerminalSummaryRefreshRequested={
        onGrowthTerminalSummaryRefreshRequested
      }
      onObservationRecognitionRequested={
        onObservationRecognitionRequested
      }
      onLifeSurfaceOutcome={receiveLifeSurfaceOutcome}
      onObservationSurfaceOutcome={
        receiveObservationSurfaceOutcome
      }
    />
  );
}
