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
import type { XinmaiCanonicalBodyImprintDecision } from "../types/xinmaiCanonicalBodyImprint";
import {
  XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
  type SixDimensionId,
  type SixDimensionPresentationAuthorityState,
  type SixDimensionSemanticResponseId,
  type SixDimensionTypedAcknowledgement,
} from "../types/xinmaiSixDimensionObservation";
import {
  createSixDimensionCanonicalLineageKey,
  createSixDimensionCommandReferenceId,
  createSixDimensionIdentityKey,
  createSixDimensionObservationSetId,
} from "../services/xinmaiSixDimensionObservationEvidenceValidator";
import { executeXinmaiSixDimensionObservationCommand } from "../services/xinmaiSixDimensionObservationAuthorityController";
import { readXinmaiGravityObservationContinuityState } from "../services/xinmaiLivedGrowthTransactionalStore";

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
  canonicalBodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
  growthSummaryPending: boolean;
  onExplicitDepartureCommitted: () => void;
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
  canonicalBodyImprintDecision,
  growthSummaryPending,
  onExplicitDepartureCommitted,
  onGrowthTerminalSummaryRefreshRequested,
  onObservationRecognitionRequested,
  onAcceptanceOutcome,
}: GravityProductionSurfaceHostProps) {
  const [lifeSurfaceOutcome, setLifeSurfaceOutcome] =
    useState<GravityLifeSurfaceOutcome | null>(null);
  const [observationSurfaceOutcome, setObservationSurfaceOutcome] =
    useState<GravityObservationSurfaceOutcome | null>(null);
  const [sixDimensionAuthority, setSixDimensionAuthority] =
    useState<SixDimensionPresentationAuthorityState>(() =>
      Object.freeze({
        status: "LOADING" as const,
        observationSet: null,
        completionReceipt: null,
        cause: null,
      }),
    );
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
    let cancelled = false;
    if (
      continuityDecision.status !== "OBSERVATION_RECOGNIZED"
    ) {
      return () => {
        cancelled = true;
      };
    }
    const identity = admission.identityReferences;
    const identityKey = createSixDimensionIdentityKey(
      identity.sourceReferenceId,
      identity.starBeastIdentityReferenceId,
      identity.mansionCoordinateReferenceId,
    );
    const catalogRevision =
      runtimeInput.pressureProvenance.captureProvenance.catalogRevision;
    const runtimeSeedId =
      admission.currentPressure.selectedPressureSeedId;
    const candidateReferenceId =
      admission.currentPressure.captureProvenance.candidateReferenceId;
    const lineageKey = createSixDimensionCanonicalLineageKey(
      identityKey,
      admission.sourceReality.encounterCycleId,
      admission.gravityCycleId,
      runtimeSeedId,
      catalogRevision,
    );
    const observationSetId =
      createSixDimensionObservationSetId(lineageKey);
    void readXinmaiGravityObservationContinuityState(
      `CURRENT:${identity.sourceReferenceId}`,
    ).then(async (gravityRead) => {
      if (cancelled) return;
      const gravityRecord =
        gravityRead.status === "FOUND" ? gravityRead.record : null;
      if (
        gravityRecord === null ||
        gravityRecord.gravityObservationReferenceId !==
          admission.gravityObservationReferenceId
      ) {
        setSixDimensionAuthority(
          Object.freeze({
            status: "SAFE_WITHHELD" as const,
            observationSet: null,
            completionReceipt: null,
            cause: Object.freeze({
              owner: "GRAVITY" as const,
              code: "GRAVITY_NOT_RECOGNIZED" as const,
              retryability: "RETRY_AFTER_REREAD" as const,
              innerCause: null,
            }),
          }),
        );
        return;
      }
      const result =
        await executeXinmaiSixDimensionObservationCommand(
          Object.freeze({
            type: "CREATE_OBSERVATION_SET" as const,
            commandReferenceId:
              createSixDimensionCommandReferenceId(
                observationSetId,
                "body",
                0,
                0,
                "CREATE_OBSERVATION_SET",
              ),
            expectedGravityObservationRevision:
              gravityRecord.gravityObservationLineageRevision,
            identityReferences: identity,
            encounterCycleId:
              admission.sourceReality.encounterCycleId,
            gravityCycleId: admission.gravityCycleId,
            gravityObservationReferenceId:
              admission.gravityObservationReferenceId,
            runtimeSeedId,
            candidateReferenceId,
            catalogRevision,
            dimensionProtocolRevision:
              XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
          }),
        );
      if (cancelled) return;
      setSixDimensionAuthority(
        result.status === "COMMITTED" ||
          result.status === "ALREADY_COMMITTED"
          ? Object.freeze({
              status:
                result.observationSet.lifecycle === "OPEN"
                  ? "OPEN" as const
                  : "COMPLETED" as const,
              observationSet: result.observationSet,
              completionReceipt: result.completionReceipt,
              cause: null,
            })
          : Object.freeze({
              status: "SAFE_WITHHELD" as const,
              observationSet: result.observationSet,
              completionReceipt: result.completionReceipt,
              cause: result.cause,
            }),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [admission, continuityDecision.status, runtimeInput]);

  const acknowledgeSixDimension = useCallback(
    async (
      dimensionId: SixDimensionId,
      acknowledgement: SixDimensionTypedAcknowledgement,
      semanticResponseId: SixDimensionSemanticResponseId,
    ): Promise<boolean> => {
      const current = sixDimensionAuthority.observationSet;
      if (current === null || current.lifecycle !== "OPEN") return false;
      const item = current.items.find(
        (candidate) => candidate.dimensionId === dimensionId,
      );
      if (item === undefined) return false;
      const usesSemanticSelection =
        current.schemaVersion ===
          XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION;
      const commandReferenceId =
        createSixDimensionCommandReferenceId(
          current.observationSetId,
          dimensionId,
          current.revision,
          item.itemRevision,
          usesSemanticSelection
            ? `ACKNOWLEDGE_SEMANTIC_SELECTION_V3:${acknowledgement}:${semanticResponseId}`
            : `ACKNOWLEDGE_DIMENSION:${acknowledgement}`,
        );
      const result =
        await executeXinmaiSixDimensionObservationCommand(
          usesSemanticSelection
            ? Object.freeze({
                type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3" as const,
                commandReferenceId,
                observationSetId: current.observationSetId,
                dimensionId,
                acknowledgement,
                semanticGrammarRevision:
                  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
                semanticResponseId,
                expectedSetRevision: current.revision,
                expectedItemRevision: item.itemRevision,
                sourceReferenceId: item.sourceReferenceId,
              })
            : Object.freeze({
                type: "ACKNOWLEDGE_DIMENSION" as const,
                commandReferenceId,
                observationSetId: current.observationSetId,
                dimensionId,
                acknowledgement,
                expectedSetRevision: current.revision,
                expectedItemRevision: item.itemRevision,
                sourceReferenceId: item.sourceReferenceId,
              }),
        );
      setSixDimensionAuthority(
        result.status === "COMMITTED" ||
          result.status === "ALREADY_COMMITTED"
          ? Object.freeze({
              status:
                result.observationSet.lifecycle === "OPEN"
                  ? "OPEN" as const
                  : "COMPLETED" as const,
              observationSet: result.observationSet,
              completionReceipt: result.completionReceipt,
              cause: null,
            })
          : Object.freeze({
              status: "SAFE_WITHHELD" as const,
              observationSet: result.observationSet,
              completionReceipt: result.completionReceipt,
              cause: result.cause,
            }),
      );
      return (
        result.status === "COMMITTED" ||
        result.status === "ALREADY_COMMITTED"
      );
    },
    [sixDimensionAuthority.observationSet],
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
      choiceReturn={
        admission.sourceReality.origin === "CHOICE_RETURN"
          ? "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED"
          : null
      }
      experienceSmokeFixture={null}
      surfaceAttempt={surfaceAttempt}
      observationContinuityDecision={continuityDecision}
      growthTerminalSummary={growthTerminalSummary}
      canonicalBodyImprintDecision={canonicalBodyImprintDecision}
      actionRouteResolution={actionRouteResolution}
      sixDimensionAuthority={sixDimensionAuthority}
      onSixDimensionAcknowledgement={acknowledgeSixDimension}
      growthSummaryPending={growthSummaryPending}
      onExplicitDepartureCommitted={onExplicitDepartureCommitted}
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
