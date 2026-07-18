import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenesisProductionRendererCanvasHost } from "../components/GenesisProductionRendererCanvasHost";
import {
  authorizeGenesisProductionRoute,
  GENESIS_PRODUCTION_ROUTE_TARGET,
} from "../services/genesisProductionRouteAuthorization";
import {
  advanceGenesisProductionRuntime,
  initializeGenesisProductionRuntime,
} from "../services/genesisProductionRuntimeConsumer";
import { orchestrateGenesisProductionTimeline } from "../services/genesisProductionTimelineOrchestrator";
import {
  activateGenesisProductionRealityEntryContext,
  advanceGenesisProductionRecognitionRealityEntry,
  clearGenesisProductionRealityEntryContext,
  initializeGenesisProductionRecognitionRealityEntry,
} from "../services/genesisProductionRecognitionRealityEntry";
import {
  resolveGenesisProductionRealityRouteHandoff,
} from "../services/genesisProductionRealityRouteHandoff";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import {
  activateRealityRouteActivationSourceContext,
  captureExplicitRealityRequestDateSource,
  clearRealityRouteActivationSourceContext,
} from "../services/realityRouteActivationSourceContext";
import { bridgeGenesisProductionRuntimeToVisualCalibration } from "../services/genesisProductionVisualCalibrationBridge";
import { resolveRealGenesisVisualConsumerSource } from "../services/realGenesisVisualConsumerSource";
import type {
  GenesisProductionCanvasHostState,
  GenesisProductionExperiencePageBoundary,
  GenesisProductionExperiencePageProps,
} from "../types/genesisProductionExperiencePage";
import type { GenesisProductionRecognitionRealityResult } from "../types/genesisProductionRecognitionRealityEntry";
import "../styles/genesis-production-experience.css";

export const GENESIS_PRODUCTION_EXPERIENCE_PAGE_BOUNDARY:
  GenesisProductionExperiencePageBoundary = Object.freeze({
    productionExperiencePageOnly: true,
    productionRouteAuthorizationRequired: true,
    realUserSourceResolutionOnly: true,
    productionTimelineOrchestrationOnly: true,
    timeDeliveryOnlyInteraction: true,
    completionRecognitionHoldRequired: true,
    productionRecognitionRealityBridgeOnly: true,
    explicitRealityEntryRequired: true,
    productionRealityRouteHandoffOnly: true,
    realityEntryContextRequiredBeforeNavigation: true,
    realityRouteActivationSourceRequiredBeforeNavigation: true,
    explicitRealityRequestDateCaptureOnly: true,
    explicitUserConfirmedRealityNavigationOnly: true,
    sourceReferenceExcludedFromUrl: true,
    noAutomaticRealityNavigation: true,
    noAutomaticRealityEntry: true,
    sourceNotReadyStopsRendering: true,
    noFixtureFallback: true,
    noPrototypeHarness: true,
    noPreviewRuntime: true,
    noEngineInvocation: true,
    noRouteRegistration: true,
    noReality: true,
    noPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorageWrite: true,
  });

export function GenesisProductionExperiencePage({
  sourceReferenceId,
}: GenesisProductionExperiencePageProps) {
  const navigate = useNavigate();
  const [canvasHostState, setCanvasHostState] =
    useState<GenesisProductionCanvasHostState>("STARTING");
  const routeAuthorization = useMemo(
    () =>
      authorizeGenesisProductionRoute({
        routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET,
        sourceReferenceId,
      }),
    [sourceReferenceId],
  );
  const consumerSourceResult = useMemo(
    () =>
      routeAuthorization.status === "READY"
        ? resolveRealGenesisVisualConsumerSource()
        : null,
    [routeAuthorization],
  );
  const initializedRuntimeResult = useMemo(
    () => routeAuthorization.status === "READY"
      ? initializeGenesisProductionRuntime({ routeAuthorization })
      : null,
    [routeAuthorization],
  );
  const [productionRuntimeResult, setProductionRuntimeResult] = useState(
    initializedRuntimeResult,
  );
  useEffect(() => {
    setProductionRuntimeResult(initializedRuntimeResult);
  }, [initializedRuntimeResult]);
  const timelineOrchestrationResult = useMemo(
    () => productionRuntimeResult?.status === "READY"
      ? orchestrateGenesisProductionTimeline(productionRuntimeResult.session)
      : null,
    [productionRuntimeResult],
  );
  const visualCalibrationResult = useMemo(
    () => productionRuntimeResult?.status === "READY"
      ? bridgeGenesisProductionRuntimeToVisualCalibration(
          productionRuntimeResult.session,
        )
      : null,
    [productionRuntimeResult],
  );
  const [recognitionRealityResult, setRecognitionRealityResult] =
    useState<GenesisProductionRecognitionRealityResult | null>(null);

  useEffect(() => {
    clearGenesisProductionRealityEntryContext();
    clearRealityRouteActivationSourceContext();
    setRecognitionRealityResult(null);
  }, [routeAuthorization.sourceReferenceId]);

  useEffect(() => {
    if (
      recognitionRealityResult !== null ||
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "COMPLETION"
    ) {
      return;
    }
    setRecognitionRealityResult(
      initializeGenesisProductionRecognitionRealityEntry(
        productionRuntimeResult.session,
      ),
    );
  }, [productionRuntimeResult, recognitionRealityResult]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      timelineOrchestrationResult?.status !== "READY" ||
      timelineOrchestrationResult.directive.behavior !== "AUTO_ADVANCE"
    ) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setProductionRuntimeResult(
        advanceGenesisProductionRuntime({
          session: productionRuntimeResult.session,
          trigger: "AUTO_ADVANCE",
        }),
      );
    }, timelineOrchestrationResult.directive.delayMs);
    return () => window.clearTimeout(timeout);
  }, [productionRuntimeResult, timelineOrchestrationResult]);

  const deliverTime = () => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      timelineOrchestrationResult?.status !== "READY" ||
      timelineOrchestrationResult.directive.behavior !==
        "WAIT_FOR_TIME_DELIVERY"
    ) {
      return;
    }
    setProductionRuntimeResult(
      advanceGenesisProductionRuntime({
        session: productionRuntimeResult.session,
        trigger: "TIME_DELIVERY",
      }),
    );
  };

  const confirmRecognition = () => {
    if (
      recognitionRealityResult?.status !== "READY" ||
      recognitionRealityResult.session.interactionAvailability !==
        "RECOGNITION_CONFIRM"
    ) {
      return;
    }
    setRecognitionRealityResult(
      advanceGenesisProductionRecognitionRealityEntry(
        recognitionRealityResult.session,
        "RECOGNITION_CONFIRM",
      ),
    );
  };

  const enterReality = () => {
    if (
      recognitionRealityResult?.status !== "READY" ||
      recognitionRealityResult.session.interactionAvailability !==
        "ENTER_REALITY"
    ) {
      return;
    }
    const result = advanceGenesisProductionRecognitionRealityEntry(
      recognitionRealityResult.session,
      "ENTER_REALITY",
    );
    setRecognitionRealityResult(result);
    if (result.status === "READY") {
      const entryContext =
        activateGenesisProductionRealityEntryContext(result.session);
      const realUserContext = readRealUserGenesisVisualSourceContext();
      const requestDateSource = captureExplicitRealityRequestDateSource({
        sourceReferenceId: result.session.sourceReferenceId,
        calendarInstant: new Date(),
      });
      const activationSourceContext =
        entryContext && realUserContext && requestDateSource
          ? activateRealityRouteActivationSourceContext({
              realityEntryContext: entryContext,
              lifeSourceSession: realUserContext.lifeSourceSession,
              requestDateSource,
            })
          : null;
      const handoff = resolveGenesisProductionRealityRouteHandoff({
        entryContext,
        sourceReferenceId: result.session.sourceReferenceId,
      });
      if (
        handoff.status === "READY" &&
        activationSourceContext?.status === "AVAILABLE"
      ) {
        navigate(handoff.routeTarget);
      }
    }
  };

  if (
    routeAuthorization.status !== "READY" ||
    consumerSourceResult === null ||
    consumerSourceResult.status !== "READY" ||
    productionRuntimeResult === null ||
    productionRuntimeResult.status !== "READY" ||
    timelineOrchestrationResult === null ||
    timelineOrchestrationResult.status !== "READY" ||
    visualCalibrationResult === null ||
    visualCalibrationResult.status !== "READY" ||
    consumerSourceResult.consumerSource.sourceReferenceId !==
      routeAuthorization.sourceReferenceId ||
    visualCalibrationResult.bundle.sourceReferenceId !==
      routeAuthorization.sourceReferenceId
  ) {
    return (
      <main
        className="gy-genesis-production-experience gy-genesis-production-experience--source-not-ready"
        data-production-genesis-status="SOURCE_NOT_READY"
        data-guard-reason={routeAuthorization.guardReason}
      >
        <p role="status">SOURCE_NOT_READY</p>
      </main>
    );
  }

  return (
    <main
      className="gy-genesis-production-experience"
      data-production-genesis-status="AUTHORIZED_PRODUCTION_GENESIS"
      data-source-experience-mode={routeAuthorization.sourceExperienceMode}
      data-source-provenance={routeAuthorization.sourceProvenance}
      data-source-reference-id={routeAuthorization.sourceReferenceId}
      data-production-renderer-host-state={canvasHostState}
      data-genesis-runtime-stage={visualCalibrationResult.bundle.runtimeStage}
      data-reality-entry-eligibility={
        recognitionRealityResult?.status === "READY"
          ? recognitionRealityResult.session.realityEntryEligibility
          : "NOT_ELIGIBLE"
      }
    >
      <GenesisProductionRendererCanvasHost
        routeAuthorization={routeAuthorization}
        consumerSourceResult={consumerSourceResult}
        visualCalibrationBundle={visualCalibrationResult.bundle}
        onStateChange={setCanvasHostState}
      />
      {timelineOrchestrationResult.directive.behavior ===
      "WAIT_FOR_TIME_DELIVERY" ? (
        <button
          type="button"
          className="gy-genesis-production-experience__time-delivery"
          onClick={deliverTime}
        >
          把时间交给星河
        </button>
      ) : null}
      {recognitionRealityResult?.status === "READY" &&
      recognitionRealityResult.session.interactionAvailability ===
        "RECOGNITION_CONFIRM" ? (
        <button
          type="button"
          className="gy-genesis-production-experience__completion-action"
          data-interaction="RECOGNITION_CONFIRM"
          onClick={confirmRecognition}
        >
          带着这份看见进入现实准备
        </button>
      ) : null}
      {recognitionRealityResult?.status === "READY" &&
      recognitionRealityResult.session.interactionAvailability ===
        "ENTER_REALITY" ? (
        <button
          type="button"
          className="gy-genesis-production-experience__completion-action"
          data-interaction="ENTER_REALITY"
          onClick={enterReality}
        >
          进入现实观察
        </button>
      ) : null}
      {recognitionRealityResult?.status === "READY" &&
      recognitionRealityResult.session.realityEntryEligibility ===
        "ELIGIBLE" ? (
        <p
          className="gy-genesis-production-experience__reality-ready"
          role="status"
        >
          Reality Entry 已准备好。
        </p>
      ) : null}
    </main>
  );
}
