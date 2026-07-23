import { useCallback, useEffect, useMemo, useState } from "react";
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
import { calibrateGenesisFourSymbolDirectionField } from "../services/genesisFourSymbolDirectionFieldVisualCalibration";
import { calibrateGenesisLifeArchetypeForceCondensation } from "../services/genesisLifeArchetypeForceCondensationVisualCalibration";
import { resolveRealGenesisVisualConsumerSource } from "../services/realGenesisVisualConsumerSource";
import { calibrateGenesisTimeDeliveryResponse } from "../services/genesisTimeDeliveryResponseCalibration";
import { GENESIS_COORDINATE_SEEKING_VISUAL_SETTLE_MS } from "../services/genesisTwentyEightMansionVisualLayerCalibration";
import {
  advanceGenesisManifestationExperienceState,
  initializeGenesisManifestationExperienceState,
} from "../services/genesisManifestationExperienceState";
import type { GenesisTimeDeliveryResponseCalibration } from "../types/genesisTimeDeliveryResponseCalibration";
import type { GenesisManifestationExperienceStateResult } from "../types/genesisManifestationExperienceState";
import { realizeGenesisStarBeastPresence } from "../services/genesisStarBeastPresenceVisualRealization";
import { activateGenesisPresenceApproachContinuity } from "../services/genesisPresenceApproachContinuityActivation";
import { activateGenesisPresenceRecognitionContinuity } from "../services/genesisPresenceRecognitionContinuityActivation";
import {
  activateGenesisRealityPresenceContinuityContext,
  clearGenesisRealityPresenceContinuityContext,
} from "../services/genesisRealityPresenceContinuityBridge";
import type { GenesisPresenceRecognitionPhase } from "../types/genesisStarBeastPresenceVisualRealization";
import type {
  GenesisProductionCanvasHostState,
  GenesisProductionExperiencePageBoundary,
  GenesisProductionExperiencePageProps,
} from "../types/genesisProductionExperiencePage";
import type { GenesisProductionRecognitionRealityResult } from "../types/genesisProductionRecognitionRealityEntry";
import "../styles/genesis-production-experience.css";

const ENTRANCE_COORDINATE_CONTINUITY_HOLD_MS = Object.freeze({
  MOON_ORIGIN: 520,
  STAR_RIVER: 680,
});

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
  const lifeForceManifestationBridge =
    consumerSourceResult?.status === "READY"
      ? consumerSourceResult.consumerSource.projectionBundle
          .lifeForceManifestationBridge
      : null;
  const initializedManifestationExperienceResult = useMemo(
    () =>
      initializedRuntimeResult?.status === "READY"
        ? initializeGenesisManifestationExperienceState({
            runtimeSession: initializedRuntimeResult.session,
            lifeForceManifestationBridge,
          })
        : null,
    [initializedRuntimeResult, lifeForceManifestationBridge],
  );
  const [productionRuntimeResult, setProductionRuntimeResult] = useState(
    initializedRuntimeResult,
  );
  const [manifestationExperienceResult, setManifestationExperienceResult] =
    useState<GenesisManifestationExperienceStateResult | null>(
      initializedManifestationExperienceResult,
    );
  const [timeDeliveryResponse, setTimeDeliveryResponse] =
    useState<GenesisTimeDeliveryResponseCalibration | null>(null);
  useEffect(() => {
    setProductionRuntimeResult(initializedRuntimeResult);
    setManifestationExperienceResult(
      initializedManifestationExperienceResult,
    );
  }, [initializedManifestationExperienceResult, initializedRuntimeResult]);
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
  const directionFieldCalibrationResult = useMemo(
    () =>
      consumerSourceResult?.status === "READY" &&
      visualCalibrationResult?.status === "READY"
        ? calibrateGenesisFourSymbolDirectionField({
            lifeDirectionProjection:
              consumerSourceResult.consumerSource.projectionBundle
                .fourSymbolLifeDirectionProjection,
            activeVisualLayer:
              visualCalibrationResult.bundle.genesisVisualRealization
                .activeVisualLayer,
          })
        : null,
    [consumerSourceResult, visualCalibrationResult],
  );
  const archetypeForceCalibrationResult = useMemo(
    () =>
      consumerSourceResult?.status === "READY" &&
      visualCalibrationResult?.status === "READY" &&
      directionFieldCalibrationResult?.status === "AVAILABLE"
        ? calibrateGenesisLifeArchetypeForceCondensation({
            lifeArchetypeProjection:
              consumerSourceResult.consumerSource.projectionBundle
                .lifeArchetypeProjection,
            directionFieldCalibration:
              directionFieldCalibrationResult.calibration,
            activeVisualLayer:
              visualCalibrationResult.bundle.genesisVisualRealization
                .activeVisualLayer,
          })
        : null,
    [
      consumerSourceResult,
      directionFieldCalibrationResult,
      visualCalibrationResult,
    ],
  );
  const [recognitionRealityResult, setRecognitionRealityResult] =
    useState<GenesisProductionRecognitionRealityResult | null>(null);
  const presenceRecognitionPhase: GenesisPresenceRecognitionPhase =
    recognitionRealityResult?.status === "READY"
      ? recognitionRealityResult.session.recognitionConfirmed
        ? "RECOGNIZED"
        : "RECOGNITION_HOLD"
      : "NOT_REACHED";
  const presenceVisualRealizationResult = useMemo(() => {
    return productionRuntimeResult?.status === "READY"
      ? realizeGenesisStarBeastPresence({
          runtimeSession: productionRuntimeResult.session,
          lifeForceManifestationBridge,
          recognitionPhase: presenceRecognitionPhase,
        })
      : null;
  }, [lifeForceManifestationBridge, presenceRecognitionPhase, productionRuntimeResult]);
  const presenceApproachContinuityResult = useMemo(
    () =>
      manifestationExperienceResult?.status === "READY" &&
      presenceVisualRealizationResult?.status === "READY"
        ? activateGenesisPresenceApproachContinuity({
            manifestationExperienceSession:
              manifestationExperienceResult.session,
            presenceVisualRealization:
              presenceVisualRealizationResult.realization,
          })
        : null,
    [manifestationExperienceResult, presenceVisualRealizationResult],
  );
  const presenceRecognitionContinuityResult = useMemo(
    () =>
      manifestationExperienceResult?.status === "READY" &&
      presenceVisualRealizationResult?.status === "READY" &&
      recognitionRealityResult?.status === "READY"
        ? activateGenesisPresenceRecognitionContinuity({
            manifestationExperienceSession:
              manifestationExperienceResult.session,
            presenceVisualRealization:
              presenceVisualRealizationResult.realization,
            recognitionRealitySession: recognitionRealityResult.session,
          })
        : null,
    [
      manifestationExperienceResult,
      presenceVisualRealizationResult,
      recognitionRealityResult,
    ],
  );

  useEffect(() => {
    clearGenesisProductionRealityEntryContext();
    clearRealityRouteActivationSourceContext();
    clearGenesisRealityPresenceContinuityContext();
    setRecognitionRealityResult(null);
    setTimeDeliveryResponse(null);
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
    const runtimeStage = productionRuntimeResult.session.currentStage;
    const consumerAlignedDelayMs =
      runtimeStage === "MOON_ORIGIN"
        ? ENTRANCE_COORDINATE_CONTINUITY_HOLD_MS.MOON_ORIGIN
        : runtimeStage === "STAR_RIVER"
          ? ENTRANCE_COORDINATE_CONTINUITY_HOLD_MS.STAR_RIVER
          : timelineOrchestrationResult.directive.delayMs;
    const timeout = window.setTimeout(() => {
      setProductionRuntimeResult(
        advanceGenesisProductionRuntime({
          session: productionRuntimeResult.session,
          trigger: "AUTO_ADVANCE",
        }),
      );
    }, consumerAlignedDelayMs);
    return () => window.clearTimeout(timeout);
  }, [productionRuntimeResult, timelineOrchestrationResult]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "SYMBOL_REVEAL" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !== "TIME_ACCEPTED"
    ) {
      return;
    }
    const seekingResult = advanceGenesisManifestationExperienceState({
      session: manifestationExperienceResult.session,
      runtimeSession: productionRuntimeResult.session,
      lifeForceManifestationBridge,
      trigger: "AUTO_ADVANCE",
    });
    if (seekingResult.status === "READY") {
      setManifestationExperienceResult(seekingResult);
    }
  }, [
    lifeForceManifestationBridge,
    manifestationExperienceResult,
    productionRuntimeResult,
  ]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "STAR_BEAST_REVEAL" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !==
        "FORCE_CONDENSING" ||
      presenceVisualRealizationResult?.status !== "READY" ||
      presenceVisualRealizationResult.realization.visualPresenceState !==
        "APPROACHING"
    ) {
      return;
    }
    const approachResult = advanceGenesisManifestationExperienceState({
      session: manifestationExperienceResult.session,
      runtimeSession: productionRuntimeResult.session,
      lifeForceManifestationBridge,
      trigger: "AUTO_ADVANCE",
    });
    if (
      approachResult.status === "READY" &&
      approachResult.session.currentState === "PRESENCE_APPROACHING"
    ) {
      setManifestationExperienceResult(approachResult);
    }
  }, [
    lifeForceManifestationBridge,
    manifestationExperienceResult,
    presenceVisualRealizationResult,
    productionRuntimeResult,
  ]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "LIFE_FORCE" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !==
        "DIRECTION_AWAKENING"
    ) {
      return;
    }
    const forceResult = advanceGenesisManifestationExperienceState({
      session: manifestationExperienceResult.session,
      runtimeSession: productionRuntimeResult.session,
      lifeForceManifestationBridge,
      trigger: "AUTO_ADVANCE",
    });
    if (forceResult.status === "READY") {
      setManifestationExperienceResult(forceResult);
    }
  }, [
    lifeForceManifestationBridge,
    manifestationExperienceResult,
    productionRuntimeResult,
  ]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "HEXAGRAM_IMPRINT" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !==
        "COORDINATE_FOUND"
    ) {
      return;
    }
    const directionResult = advanceGenesisManifestationExperienceState({
      session: manifestationExperienceResult.session,
      runtimeSession: productionRuntimeResult.session,
      lifeForceManifestationBridge,
      trigger: "AUTO_ADVANCE",
    });
    if (directionResult.status === "READY") {
      setManifestationExperienceResult(directionResult);
    }
  }, [
    lifeForceManifestationBridge,
    manifestationExperienceResult,
    productionRuntimeResult,
  ]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "SYMBOL_REVEAL" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !==
        "COORDINATE_SEEKING"
    ) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      const foundResult = advanceGenesisManifestationExperienceState({
        session: manifestationExperienceResult.session,
        runtimeSession: productionRuntimeResult.session,
        lifeForceManifestationBridge,
        trigger: "AUTO_ADVANCE",
      });
      if (foundResult.status === "READY") {
        setManifestationExperienceResult(foundResult);
      }
    }, GENESIS_COORDINATE_SEEKING_VISUAL_SETTLE_MS);
    return () => window.clearTimeout(timeout);
  }, [
    lifeForceManifestationBridge,
    manifestationExperienceResult,
    productionRuntimeResult,
  ]);

  const deliverTime = useCallback(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      timelineOrchestrationResult?.status !== "READY" ||
      timelineOrchestrationResult.directive.behavior !==
        "WAIT_FOR_TIME_DELIVERY" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !== "DORMANT"
    ) {
      return;
    }
    const acceptedExperienceResult =
      advanceGenesisManifestationExperienceState({
        session: manifestationExperienceResult.session,
        runtimeSession: productionRuntimeResult.session,
        lifeForceManifestationBridge,
        trigger: "TIME_DELIVERY",
      });
    if (acceptedExperienceResult.status !== "READY") return;
    const responseResult = calibrateGenesisTimeDeliveryResponse({
      runtimeSession: productionRuntimeResult.session,
      lifeForceManifestationBridge,
      acceptedExperienceSession: acceptedExperienceResult.session,
    });
    const nextRuntimeResult = advanceGenesisProductionRuntime({
      session: productionRuntimeResult.session,
      trigger: "TIME_DELIVERY",
    });
    if (
      responseResult.status !== "READY" ||
      nextRuntimeResult.status !== "READY"
    ) {
      return;
    }
    setManifestationExperienceResult(acceptedExperienceResult);
    setProductionRuntimeResult(nextRuntimeResult);
    setTimeDeliveryResponse(
      responseResult.calibration,
    );
  }, [
    lifeForceManifestationBridge,
    manifestationExperienceResult,
    productionRuntimeResult,
    timelineOrchestrationResult,
  ]);

  useEffect(() => {
    if (
      productionRuntimeResult?.status !== "READY" ||
      productionRuntimeResult.session.currentStage !== "TIME_RESONANCE" ||
      timelineOrchestrationResult?.status !== "READY" ||
      timelineOrchestrationResult.directive.behavior !==
        "WAIT_FOR_TIME_DELIVERY" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !== "DORMANT"
    ) {
      return;
    }
    // Launch has already accepted all four birth-time coordinates. Genesis
    // consumes that completed handoff instead of asking the user to deliver
    // the same time a second time.
    deliverTime();
  }, [
    deliverTime,
    manifestationExperienceResult,
    productionRuntimeResult,
    timelineOrchestrationResult,
  ]);

  const confirmRecognition = () => {
    if (
      recognitionRealityResult?.status !== "READY" ||
      recognitionRealityResult.session.interactionAvailability !==
        "RECOGNITION_CONFIRM" ||
      productionRuntimeResult?.status !== "READY" ||
      manifestationExperienceResult?.status !== "READY" ||
      manifestationExperienceResult.session.currentState !==
        "PRESENCE_APPROACHING"
    ) {
      return;
    }
    const recognizedRealityResult =
      advanceGenesisProductionRecognitionRealityEntry(
        recognitionRealityResult.session,
        "RECOGNITION_CONFIRM",
      );
    const recognizedExperienceResult =
      advanceGenesisManifestationExperienceState({
        session: manifestationExperienceResult.session,
        runtimeSession: productionRuntimeResult.session,
        lifeForceManifestationBridge,
        trigger: "RECOGNITION_CONFIRM",
      });
    const recognizedPresenceResult = realizeGenesisStarBeastPresence({
      runtimeSession: productionRuntimeResult.session,
      lifeForceManifestationBridge,
      recognitionPhase: "RECOGNIZED",
    });
    if (
      recognizedRealityResult.status !== "READY" ||
      recognizedExperienceResult.status !== "READY" ||
      recognizedPresenceResult.status !== "READY" ||
      activateGenesisPresenceRecognitionContinuity({
        manifestationExperienceSession: recognizedExperienceResult.session,
        presenceVisualRealization: recognizedPresenceResult.realization,
        recognitionRealitySession: recognizedRealityResult.session,
      }).status !== "READY"
    ) {
      return;
    }
    setManifestationExperienceResult(recognizedExperienceResult);
    setRecognitionRealityResult(recognizedRealityResult);
  };

  const enterReality = () => {
    if (
      recognitionRealityResult?.status !== "READY" ||
      recognitionRealityResult.session.interactionAvailability !==
        "ENTER_REALITY" ||
      presenceRecognitionContinuityResult?.status !== "READY" ||
      visualCalibrationResult === null ||
      visualCalibrationResult.status !== "READY" ||
      directionFieldCalibrationResult === null ||
      directionFieldCalibrationResult.status !== "AVAILABLE" ||
      archetypeForceCalibrationResult === null ||
      archetypeForceCalibrationResult.status !== "AVAILABLE"
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
        const presenceContinuityContext =
          presenceVisualRealizationResult?.status === "READY"
            ? activateGenesisRealityPresenceContinuityContext({
                presenceRealization:
                  presenceVisualRealizationResult.realization,
                realityEntryContext: entryContext,
              })
            : null;
        if (presenceContinuityContext !== null) {
          navigate(handoff.routeTarget, {
            state: {
              visualContinuity: Object.freeze({
                sourceReferenceId: result.session.sourceReferenceId,
                consumerSourceResult,
                visualCalibrationBundle: visualCalibrationResult.bundle,
                fourSymbolDirectionFieldVisualCalibration:
                  directionFieldCalibrationResult.calibration,
                lifeArchetypeForceCondensationVisualCalibration:
                  archetypeForceCalibrationResult.calibration,
              }),
            },
          });
        }
      }
    }
  };

  if (
    routeAuthorization.status !== "READY" ||
    consumerSourceResult === null ||
    consumerSourceResult.status !== "READY" ||
    productionRuntimeResult === null ||
    productionRuntimeResult.status !== "READY" ||
    manifestationExperienceResult === null ||
    manifestationExperienceResult.status !== "READY" ||
    timelineOrchestrationResult === null ||
    timelineOrchestrationResult.status !== "READY" ||
    visualCalibrationResult === null ||
    visualCalibrationResult.status !== "READY" ||
    directionFieldCalibrationResult === null ||
    directionFieldCalibrationResult.status !== "AVAILABLE" ||
    archetypeForceCalibrationResult === null ||
    archetypeForceCalibrationResult.status !== "AVAILABLE" ||
    consumerSourceResult.consumerSource.sourceReferenceId !==
      routeAuthorization.sourceReferenceId ||
    visualCalibrationResult.bundle.sourceReferenceId !==
      routeAuthorization.sourceReferenceId ||
    manifestationExperienceResult.session.sourceReferenceId !==
      routeAuthorization.sourceReferenceId ||
    directionFieldCalibrationResult.calibration.sourceReferenceId !==
      routeAuthorization.sourceReferenceId ||
    archetypeForceCalibrationResult.calibration.sourceReferenceId !==
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
      data-genesis-time-delivery-response={
        timeDeliveryResponse?.responseState ?? "DORMANT"
      }
      data-genesis-time-delivery-response-copy={
        timeDeliveryResponse?.copyKey ?? "WAIT_FOR_TIME_DELIVERY"
      }
      data-genesis-manifestation-experience-state={
        manifestationExperienceResult.session.currentState
      }
      data-genesis-direction-field-phase={
        directionFieldCalibrationResult.calibration.phase
      }
      data-genesis-direction-response={
        directionFieldCalibrationResult.calibration.responseMessage
      }
      data-genesis-archetype-force-phase={
        archetypeForceCalibrationResult.calibration.phase
      }
      data-genesis-force-response={
        archetypeForceCalibrationResult.calibration.responseMessage
      }
      data-genesis-presence-visual-state={
        presenceVisualRealizationResult?.status === "READY"
          ? presenceVisualRealizationResult.realization.visualPresenceState
          : "DORMANT"
      }
      data-genesis-presence-approach-continuity={
        presenceApproachContinuityResult?.status === "READY"
          ? "READY"
          : "NOT_ACTIVE"
      }
    >
      <GenesisProductionRendererCanvasHost
        routeAuthorization={routeAuthorization}
        consumerSourceResult={consumerSourceResult}
        visualCalibrationBundle={visualCalibrationResult.bundle}
        fourSymbolDirectionFieldVisualCalibration={
          directionFieldCalibrationResult.calibration
        }
        lifeArchetypeForceCondensationVisualCalibration={
          archetypeForceCalibrationResult.calibration
        }
        onStateChange={setCanvasHostState}
      />
      {timeDeliveryResponse !== null &&
      productionRuntimeResult.session.currentStage === "SYMBOL_REVEAL" ? (
        <p className="gy-genesis-production-experience__time-response" role="status">
          {manifestationExperienceResult.session.currentState ===
          "COORDINATE_SEEKING" ? (
            <span>
              {timeDeliveryResponse.seekingMessage.replace(
                "你的位置",
                "你的生命坐标",
              )}
            </span>
          ) : manifestationExperienceResult.session.currentState ===
            "COORDINATE_FOUND" ? (
            // “你的时间找到了位置。”退为历史文案；消费层现在明确回报
            // 已成立的生命坐标，不展示星宿名称或知识解释。
            <span>你的生命坐标已经找到。</span>
          ) : (
            <span>{timeDeliveryResponse.responseMessage}</span>
          )}
        </p>
      ) : null}
      {manifestationExperienceResult.session.currentState ===
        "DIRECTION_AWAKENING" &&
      directionFieldCalibrationResult.calibration.phase === "AWAKENING" ? (
        <p className="gy-genesis-production-experience__time-response" role="status">
          出生宿正在回应天地方位。
        </p>
      ) : null}
      {manifestationExperienceResult.session.currentState ===
        "FORCE_CONDENSING" &&
      archetypeForceCalibrationResult.calibration.phase === "CONDENSING" ? (
        <p className="gy-genesis-production-experience__time-response" role="status">
          这股生命力量，正以自己的节律作用于世界。
        </p>
      ) : null}
      {presenceVisualRealizationResult?.status === "READY" &&
      presenceVisualRealizationResult.realization.visualPresenceState !==
        "DORMANT" &&
      (presenceVisualRealizationResult.realization.visualPresenceState !==
        "APPROACHING" ||
        presenceApproachContinuityResult?.status === "READY") ? (
        <p className="gy-genesis-production-experience__presence-response" role="status">
          {presenceVisualRealizationResult.realization.visualPresenceState ===
          "APPROACHING"
            ? // “它正在靠近。”退为历史文案；生命并非从外部进入，
              // 而是从同一核心与既有力量节律中逐步被看见。
              "它正在从这束光中显现。"
            : presenceVisualRealizationResult.realization.visualPresenceState ===
                "PRESENT"
              ? // “它一直在那里。”保留为历史语义；认出之前先明确
                // 这不是新出现的漂亮形象，而是一路同行的同一束光。
                "你一路看见的那束光，就是它。"
              : // “你终于看见它。”退为历史文案；显现完成不等于
                // 身份成立，用户的主动认出才完成同一生命闭环。
                "你认出了它：始终是同一个生命。"}
        </p>
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
          认出它一直在那里
        </button>
      ) : null}
      {recognitionRealityResult?.status === "READY" &&
      recognitionRealityResult.session.interactionAvailability ===
        "ENTER_REALITY" &&
      presenceRecognitionContinuityResult?.status === "READY" ? (
        <button
          type="button"
          className="gy-genesis-production-experience__completion-action"
          data-interaction="ENTER_REALITY"
          data-genesis-presence-recognition-continuity="READY"
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
