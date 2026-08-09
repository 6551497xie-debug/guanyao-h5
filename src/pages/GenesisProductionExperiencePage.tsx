import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
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
import {
  createStarBeastRelationshipNamingAsset,
  persistRecognizedGenesisLifeAssets,
} from "../services/sessionService";
import {
  resolveFirstEncounterRealityEntryIntent,
  resolveRelationshipNamingEntryEligibility,
} from "../services/xinmaiRelationshipNamingPresentationState";
import { resolveLifeWhisperVisualOutcomeTransition } from "../services/xinmaiLifeWhisperVisualOutcomeTransition";
import { resolveXinmaiGenesisLifeOriginNativeControlReadiness } from "../services/xinmaiGenesisLifeOriginNativeControlReadinessResolver";
import { XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_PRESENTATION_POLICY } from "../services/xinmaiGenesisLifeOriginNativeControlPresentationPolicy";
import { recoverRealityRecognizedIdentity } from "../services/realityRecognizedIdentityRecoveryAdapter";
import { requestRealityEncounter } from "../services/xinmaiRealityEncounterIntentController";
import { observeRealityEncounterRequestOutcome } from "../services/gravityEntryAcceptanceRuntimePort";
import { STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS } from "../types/starBeastRelationshipNamingAsset";
import type {
  LifeWhisperRelationshipFact,
  LifeWhisperRelationshipResponsePhase,
  LifeWhisperSurfaceVisualResponseOutcome,
  LifeWhisperUnavailableContinuation,
} from "../types/xinmaiLifeWhisperRelationship";
import type {
  XinmaiGenesisLifeOriginActivationRevalidation,
  XinmaiGenesisLifeOriginDiscoveryPhase,
} from "../types/xinmaiGenesisLifeOriginNativeControlReadiness";
import "../styles/genesis-production-experience.css";

const ENTRANCE_COORDINATE_CONTINUITY_HOLD_MS = Object.freeze({
  MOON_ORIGIN: 520,
  STAR_RIVER: 680,
});

const PRESENCE_RECOGNITION_TIMING_MS = Object.freeze({
  QUIET_HOLD: 1_250,
  RESPONSE_HOLD: 1_050,
});

const REALITY_ENTRY_VISUAL_HOLD_MS = 560;
const LIFE_ORIGIN_DISCOVERY_DURATION_MS = 5_200;
const FIRST_ENCOUNTER_LIFE_WHISPER_OUTCOME_WATCHDOG_MS = 6_000;

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
  const authorizedSourceReferenceId =
    routeAuthorization.status === "READY"
      ? routeAuthorization.sourceReferenceId
      : "";
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
  const [recognitionPromptReady, setRecognitionPromptReady] = useState(false);
  const [recognitionResponseSettled, setRecognitionResponseSettled] =
    useState(false);
  const [lifeOriginDiscoveryPhase, setLifeOriginDiscoveryPhase] =
    useState<XinmaiGenesisLifeOriginDiscoveryPhase>("DORMANT");
  const [lifeOriginActivationRevalidation, setLifeOriginActivationRevalidation] =
    useState<XinmaiGenesisLifeOriginActivationRevalidation>("CURRENT");
  const [lifeWhisperText, setLifeWhisperText] = useState("");
  const [lifeWhisperFact, setLifeWhisperFact] =
    useState<LifeWhisperRelationshipFact>("NONE");
  const [lifeWhisperResponsePhase, setLifeWhisperResponsePhase] =
    useState<LifeWhisperRelationshipResponsePhase>("DORMANT");
  const [
    lifeWhisperResponseCycleId,
    setLifeWhisperResponseCycleId,
  ] = useState<string | null>(null);
  const [
    lifeWhisperUnavailableContinuation,
    setLifeWhisperUnavailableContinuation,
  ] = useState<LifeWhisperUnavailableContinuation>("NONE");
  const [
    lifeWhisperUnavailableReason,
    setLifeWhisperUnavailableReason,
  ] = useState<
    Extract<
      LifeWhisperSurfaceVisualResponseOutcome,
      { status: "VISUAL_RESPONSE_UNAVAILABLE" }
    >["reason"] | null
  >(null);
  const [
    lifeWhisperSettlementAuthority,
    setLifeWhisperSettlementAuthority,
  ] = useState<
    "MOTION_VISUAL_OUTCOME" | "STATIC_VISUAL_OUTCOME" | null
  >(null);
  const [relationshipNameDraft, setRelationshipNameDraft] = useState("");
  const [relationshipName, setRelationshipName] = useState<string | null>(
    null,
  );
  const [relationshipNamingState, setRelationshipNamingState] = useState<
    "PENDING" | "NAMED" | "SKIPPED"
  >("PENDING");
  const [relationshipNamingPersistence, setRelationshipNamingPersistence] =
    useState<"PERSISTED" | "CURRENT_CYCLE_ONLY" | null>(null);
  const lifeOriginDiscoveryTimerRef = useRef<number | null>(null);
  const lifeWhisperFactRef =
    useRef<LifeWhisperRelationshipFact>("NONE");
  const lifeWhisperResponsePhaseRef =
    useRef<LifeWhisperRelationshipResponsePhase>("DORMANT");
  const lifeWhisperResponseCycleIdRef = useRef<string | null>(null);
  const lifeWhisperResponseCycleSequenceRef = useRef(0);
  const lifeWhisperOutcomeWatchdogRef = useRef<number | null>(null);
  const realityEntryTimerRef = useRef<number | null>(null);
  const clearLifeWhisperOutcomeWatchdog = useCallback(() => {
    if (lifeWhisperOutcomeWatchdogRef.current !== null) {
      window.clearTimeout(lifeWhisperOutcomeWatchdogRef.current);
      lifeWhisperOutcomeWatchdogRef.current = null;
    }
  }, []);
  const beginLifeWhisperResponseCycle = useCallback(() => {
    clearLifeWhisperOutcomeWatchdog();
    lifeWhisperResponseCycleSequenceRef.current += 1;
    const responseCycleId =
      `first-encounter-life-whisper-cycle-${lifeWhisperResponseCycleSequenceRef.current}`;
    lifeWhisperResponseCycleIdRef.current = responseCycleId;
    setLifeWhisperResponseCycleId(responseCycleId);
    lifeWhisperResponsePhaseRef.current = "RESPONDING";
    setLifeWhisperResponsePhase("RESPONDING");
    setLifeWhisperUnavailableContinuation("NONE");
    setLifeWhisperUnavailableReason(null);
    setLifeWhisperSettlementAuthority(null);
    lifeWhisperOutcomeWatchdogRef.current = window.setTimeout(() => {
      if (
        lifeWhisperResponseCycleIdRef.current !== responseCycleId ||
        lifeWhisperFactRef.current !== "WHISPER_SUBMITTED" ||
        lifeWhisperResponsePhaseRef.current !== "RESPONDING"
      ) {
        return;
      }
      lifeWhisperOutcomeWatchdogRef.current = null;
      lifeWhisperResponsePhaseRef.current = "UNAVAILABLE";
      setLifeWhisperResponsePhase("UNAVAILABLE");
      setLifeWhisperUnavailableReason("OUTCOME_WATCHDOG_EXPIRED");
    }, FIRST_ENCOUNTER_LIFE_WHISPER_OUTCOME_WATCHDOG_MS);
  }, [clearLifeWhisperOutcomeWatchdog]);
  const recognitionInteractionAvailability =
    recognitionRealityResult?.status === "READY"
      ? recognitionRealityResult.session.interactionAvailability
      : "NONE";
  const recognitionActionReady =
    recognitionRealityResult?.status === "READY" &&
    recognitionRealityResult.session.interactionAvailability ===
      "RECOGNITION_CONFIRM" &&
    productionRuntimeResult?.status === "READY" &&
    productionRuntimeResult.session.currentStage === "COMPLETION" &&
    manifestationExperienceResult?.status === "READY" &&
    manifestationExperienceResult.session.currentState ===
      "PRESENCE_APPROACHING";
  const lifeOriginControlReadinessInput = useMemo(
    () =>
      Object.freeze({
        policy:
          XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_PRESENTATION_POLICY,
        routeAuthorization,
        consumerSourceResult,
        productionRuntimeResult,
        manifestationExperienceResult,
        recognitionRealityResult,
        discoveryPhase: lifeOriginDiscoveryPhase,
        activationRevalidation: lifeOriginActivationRevalidation,
      }),
    [
      consumerSourceResult,
      lifeOriginActivationRevalidation,
      lifeOriginDiscoveryPhase,
      manifestationExperienceResult,
      productionRuntimeResult,
      recognitionRealityResult,
      routeAuthorization,
    ],
  );
  const lifeOriginControlReadiness = useMemo(
    () =>
      resolveXinmaiGenesisLifeOriginNativeControlReadiness(
        lifeOriginControlReadinessInput,
      ),
    [lifeOriginControlReadinessInput],
  );
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
  const lifeWhisperEntryReady =
    recognitionRealityResult?.status === "READY" &&
    recognitionRealityResult.session.interactionAvailability ===
      "ENTER_REALITY" &&
    presenceRecognitionContinuityResult?.status === "READY" &&
    recognitionResponseSettled;
  const lifeWhisperRelationIntentResolved =
    resolveFirstEncounterRealityEntryIntent({
      lifeWhisperFact,
      lifeWhisperResponsePhase,
      unavailableContinuation: lifeWhisperUnavailableContinuation,
    });
  const relationshipNamingEligibility =
    resolveRelationshipNamingEntryEligibility({
      lifeWhisperEntryReady,
      lifeWhisperFact,
      lifeWhisperResponsePhase,
    });
  const relationshipNamingReady =
    relationshipNamingEligibility.status === "READY";

  useEffect(() => {
    clearGenesisProductionRealityEntryContext();
    clearRealityRouteActivationSourceContext();
    clearGenesisRealityPresenceContinuityContext();
    setRecognitionRealityResult(null);
    setTimeDeliveryResponse(null);
    setRecognitionPromptReady(false);
    setRecognitionResponseSettled(false);
    setLifeOriginDiscoveryPhase("DORMANT");
    setLifeOriginActivationRevalidation("CURRENT");
    setLifeWhisperText("");
    setLifeWhisperFact("NONE");
    lifeWhisperFactRef.current = "NONE";
    setLifeWhisperResponsePhase("DORMANT");
    lifeWhisperResponsePhaseRef.current = "DORMANT";
    setLifeWhisperResponseCycleId(null);
    lifeWhisperResponseCycleIdRef.current = null;
    lifeWhisperResponseCycleSequenceRef.current = 0;
    setLifeWhisperUnavailableContinuation("NONE");
    setLifeWhisperUnavailableReason(null);
    setLifeWhisperSettlementAuthority(null);
    setRelationshipNameDraft("");
    setRelationshipName(null);
    setRelationshipNamingState("PENDING");
    setRelationshipNamingPersistence(null);
    if (lifeOriginDiscoveryTimerRef.current !== null) {
      window.clearTimeout(lifeOriginDiscoveryTimerRef.current);
      lifeOriginDiscoveryTimerRef.current = null;
    }
    clearLifeWhisperOutcomeWatchdog();
    if (realityEntryTimerRef.current !== null) {
      window.clearTimeout(realityEntryTimerRef.current);
      realityEntryTimerRef.current = null;
    }
  }, [
    clearLifeWhisperOutcomeWatchdog,
    routeAuthorization.sourceReferenceId,
  ]);

  useEffect(
    () => () => {
      if (lifeOriginDiscoveryTimerRef.current !== null) {
        window.clearTimeout(lifeOriginDiscoveryTimerRef.current);
      }
      clearLifeWhisperOutcomeWatchdog();
      if (realityEntryTimerRef.current !== null) {
        window.clearTimeout(realityEntryTimerRef.current);
      }
    },
    [clearLifeWhisperOutcomeWatchdog],
  );

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
      !recognitionActionReady ||
      lifeOriginDiscoveryPhase !== "REVEALED"
    ) {
      setRecognitionPromptReady(false);
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setRecognitionPromptReady(true);
    }, PRESENCE_RECOGNITION_TIMING_MS.QUIET_HOLD);
    return () => window.clearTimeout(timeout);
  }, [
    recognitionActionReady,
    lifeOriginDiscoveryPhase,
    routeAuthorization.sourceReferenceId,
  ]);

  useEffect(() => {
    if (recognitionInteractionAvailability !== "ENTER_REALITY") {
      setRecognitionResponseSettled(false);
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setRecognitionResponseSettled(true);
    }, PRESENCE_RECOGNITION_TIMING_MS.RESPONSE_HOLD);
    return () => window.clearTimeout(timeout);
  }, [
    recognitionInteractionAvailability,
    routeAuthorization.sourceReferenceId,
  ]);

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

  const beginLifeOriginDiscovery = useCallback(() => {
    const revalidatedReadiness =
      resolveXinmaiGenesisLifeOriginNativeControlReadiness(
        lifeOriginControlReadinessInput,
      );
    if (revalidatedReadiness.status !== "READY") {
      setLifeOriginActivationRevalidation("SAFE_WITHHELD");
      return;
    }
    setLifeOriginActivationRevalidation("CURRENT");
    setRecognitionPromptReady(false);
    setLifeOriginDiscoveryPhase("DISCOVERING");
    lifeOriginDiscoveryTimerRef.current = window.setTimeout(() => {
      lifeOriginDiscoveryTimerRef.current = null;
      setLifeOriginDiscoveryPhase("REVEALED");
    }, LIFE_ORIGIN_DISCOVERY_DURATION_MS);
  }, [lifeOriginControlReadinessInput]);

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
    setRecognitionPromptReady(false);
    setRecognitionResponseSettled(false);
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

  const submitLifeWhisper = () => {
    if (
      !lifeWhisperEntryReady ||
      lifeWhisperFact !== "NONE" ||
      lifeWhisperText.trim().length === 0
    ) {
      return;
    }
    setLifeWhisperText("");
    lifeWhisperFactRef.current = "WHISPER_SUBMITTED";
    setLifeWhisperFact("WHISPER_SUBMITTED");
    beginLifeWhisperResponseCycle();
  };

  const skipLifeWhisper = () => {
    if (!lifeWhisperEntryReady || lifeWhisperFact !== "NONE") {
      return;
    }
    clearLifeWhisperOutcomeWatchdog();
    setLifeWhisperText("");
    lifeWhisperFactRef.current = "WHISPER_SKIPPED";
    setLifeWhisperFact("WHISPER_SKIPPED");
    lifeWhisperResponsePhaseRef.current = "SKIPPED";
    setLifeWhisperResponsePhase("SKIPPED");
    lifeWhisperResponseCycleIdRef.current = null;
    setLifeWhisperResponseCycleId(null);
    setLifeWhisperUnavailableContinuation("NONE");
    setLifeWhisperUnavailableReason(null);
    setLifeWhisperSettlementAuthority(null);
  };

  const handleLifeWhisperVisualResponseOutcome = useCallback(
    (outcome: LifeWhisperSurfaceVisualResponseOutcome) => {
      const transition = resolveLifeWhisperVisualOutcomeTransition({
        expectedSourceReferenceId: authorizedSourceReferenceId,
        currentResponseCycleId:
          lifeWhisperResponseCycleIdRef.current,
        lifeWhisperFact: lifeWhisperFactRef.current,
        lifeWhisperResponsePhase:
          lifeWhisperResponsePhaseRef.current,
        outcome,
      });
      if (transition.action === "SETTLE") {
        clearLifeWhisperOutcomeWatchdog();
        lifeWhisperResponsePhaseRef.current = "SETTLED";
        setLifeWhisperResponsePhase("SETTLED");
        setLifeWhisperSettlementAuthority(transition.authority);
        setLifeWhisperUnavailableReason(null);
        return;
      }
      if (transition.action === "MARK_UNAVAILABLE") {
        clearLifeWhisperOutcomeWatchdog();
        lifeWhisperResponsePhaseRef.current = "UNAVAILABLE";
        setLifeWhisperResponsePhase("UNAVAILABLE");
        setLifeWhisperUnavailableReason(transition.reason);
        setLifeWhisperSettlementAuthority(null);
      }
    },
    [
      clearLifeWhisperOutcomeWatchdog,
      authorizedSourceReferenceId,
    ],
  );

  const retryLifeWhisperResponse = () => {
    if (
      lifeWhisperFactRef.current !== "WHISPER_SUBMITTED" ||
      lifeWhisperResponsePhaseRef.current !== "UNAVAILABLE"
    ) {
      return;
    }
    beginLifeWhisperResponseCycle();
  };

  const continueWithoutConfirmedLifeWhisperResponse = () => {
    if (
      lifeWhisperFactRef.current !== "WHISPER_SUBMITTED" ||
      lifeWhisperResponsePhaseRef.current !== "UNAVAILABLE"
    ) {
      return;
    }
    setLifeWhisperUnavailableContinuation(
      "CONTINUE_WITHOUT_CONFIRMED_RESPONSE",
    );
  };

  const submitRelationshipName = () => {
    const normalizedName = relationshipNameDraft.trim();
    if (
      !relationshipNamingReady ||
      relationshipNamingState !== "PENDING" ||
      normalizedName.length === 0 ||
      consumerSourceResult?.status !== "READY" ||
      recognitionRealityResult?.status !== "READY" ||
      visualCalibrationResult?.status !== "READY" ||
      directionFieldCalibrationResult?.status !== "AVAILABLE" ||
      archetypeForceCalibrationResult?.status !== "AVAILABLE" ||
      presenceVisualRealizationResult?.status !== "READY"
    ) {
      return;
    }

    const visualContinuity = Object.freeze({
      sourceReferenceId:
        recognitionRealityResult.session.sourceReferenceId,
      consumerSourceResult,
      visualCalibrationBundle: visualCalibrationResult.bundle,
      fourSymbolDirectionFieldVisualCalibration:
        directionFieldCalibrationResult.calibration,
      lifeArchetypeForceCondensationVisualCalibration:
        archetypeForceCalibrationResult.calibration,
    });
    persistRecognizedGenesisLifeAssets({
      visualContinuity,
      presenceVisualRealization:
        presenceVisualRealizationResult.realization,
    });
    const result = createStarBeastRelationshipNamingAsset({
      relationshipName: normalizedName,
      visualContinuity,
    });
    setRelationshipNameDraft("");
    if (result.status === "READY") {
      setRelationshipName(result.asset.relationshipName);
      setRelationshipNamingPersistence(result.persistence);
      setRelationshipNamingState("NAMED");
      return;
    }

    // 关系称呼是可选资产；身份失配、损坏或存储不可用都不能阻断同行。
    setRelationshipName(null);
    setRelationshipNamingPersistence(null);
    setRelationshipNamingState("SKIPPED");
  };

  const skipRelationshipNaming = () => {
    if (
      !relationshipNamingReady ||
      relationshipNamingState !== "PENDING"
    ) {
      return;
    }
    setRelationshipNameDraft("");
    setRelationshipName(null);
    setRelationshipNamingPersistence(null);
    setRelationshipNamingState("SKIPPED");
  };

  const enterReality = async () => {
    if (
      consumerSourceResult === null ||
      consumerSourceResult.status !== "READY" ||
      recognitionRealityResult?.status !== "READY" ||
      recognitionRealityResult.session.interactionAvailability !==
        "ENTER_REALITY" ||
      presenceRecognitionContinuityResult?.status !== "READY" ||
      visualCalibrationResult === null ||
      visualCalibrationResult.status !== "READY" ||
      directionFieldCalibrationResult === null ||
      directionFieldCalibrationResult.status !== "AVAILABLE" ||
      archetypeForceCalibrationResult === null ||
      archetypeForceCalibrationResult.status !== "AVAILABLE" ||
      presenceVisualRealizationResult === null ||
      presenceVisualRealizationResult.status !== "READY" ||
      !lifeWhisperRelationIntentResolved
    ) {
      return;
    }
    const result = advanceGenesisProductionRecognitionRealityEntry(
      recognitionRealityResult.session,
      "ENTER_REALITY",
    );
    if (result.status === "READY") {
      clearLifeWhisperOutcomeWatchdog();
      lifeWhisperResponseCycleIdRef.current = null;
      const entryContext =
        activateGenesisProductionRealityEntryContext(result.session);
      const handoff = resolveGenesisProductionRealityRouteHandoff({
        entryContext,
        sourceReferenceId: result.session.sourceReferenceId,
      });
      if (handoff.status === "READY") {
        const presenceContinuityContext =
          presenceVisualRealizationResult?.status === "READY"
            ? activateGenesisRealityPresenceContinuityContext({
                presenceRealization:
                  presenceVisualRealizationResult.realization,
                realityEntryContext: entryContext,
              })
            : null;
        if (presenceContinuityContext !== null) {
          const visualContinuity = Object.freeze({
            sourceReferenceId: result.session.sourceReferenceId,
            consumerSourceResult,
            visualCalibrationBundle: visualCalibrationResult.bundle,
            fourSymbolDirectionFieldVisualCalibration:
              directionFieldCalibrationResult.calibration,
            lifeArchetypeForceCondensationVisualCalibration:
              archetypeForceCalibrationResult.calibration,
          });
          persistRecognizedGenesisLifeAssets({
            visualContinuity,
            presenceVisualRealization:
              presenceVisualRealizationResult.realization,
          });
          const identityRecovery =
            recoverRealityRecognizedIdentity({
              visualContinuity,
              presenceVisualRealization:
                presenceVisualRealizationResult.realization,
            });
          const qualification =
            lifeWhisperFactRef.current === "WHISPER_SKIPPED"
              ? "WHISPER_SKIPPED" as const
              : lifeWhisperResponsePhaseRef.current === "SETTLED"
                ? "WHISPER_RESPONSE_SETTLED" as const
                : lifeWhisperUnavailableContinuation ===
                    "CONTINUE_WITHOUT_CONFIRMED_RESPONSE"
                  ? "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED" as const
                  : null;
          const intentResult =
            identityRecovery.status === "READY" &&
            qualification !== null
              ? await requestRealityEncounter({
                  origin: "FIRST_ENCOUNTER",
                  qualification,
                  identityReferences:
                    identityRecovery.identityReferences,
                })
              : null;
          if (intentResult !== null) {
            observeRealityEncounterRequestOutcome(intentResult);
          }
          if (intentResult?.status === "READY") {
            setRecognitionRealityResult(result);
            // This brief hold preserves the existing same-body visual
            // continuity. It is not a Reality success authority.
            realityEntryTimerRef.current = window.setTimeout(() => {
              realityEntryTimerRef.current = null;
              navigate(handoff.routeTarget, {
                state: {
                  intentReferenceId:
                    intentResult.intent.intentReferenceId,
                  visualContinuity,
                },
              });
            }, REALITY_ENTRY_VISUAL_HOLD_MS);
          }
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
      data-genesis-life-origin-discovery={lifeOriginDiscoveryPhase}
      data-genesis-life-origin-native-control-readiness={
        lifeOriginControlReadiness.status
      }
      data-genesis-life-origin-native-control-reason={
        lifeOriginControlReadiness.reason ?? "NONE"
      }
      data-life-whisper-entry-ready={
        lifeWhisperEntryReady ? "READY" : "NOT_READY"
      }
      data-life-whisper-fact={lifeWhisperFact}
      data-life-whisper-response-phase={lifeWhisperResponsePhase}
      data-life-whisper-response-cycle={
        lifeWhisperResponseCycleId === null ? "NONE" : "CURRENT"
      }
      data-life-whisper-response-authority={
        lifeWhisperSettlementAuthority ?? "NONE"
      }
      data-life-whisper-unavailable-reason={
        lifeWhisperUnavailableReason ?? "NONE"
      }
      data-life-whisper-unavailable-continuation={
        lifeWhisperUnavailableContinuation
      }
      data-relationship-naming-state={
        relationshipNamingReady ? relationshipNamingState : "NOT_READY"
      }
      data-relationship-naming-eligibility-source={
        relationshipNamingEligibility.source
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
        lifeOriginDiscoveryPhase={lifeOriginDiscoveryPhase}
        lifeOriginControlReadiness={lifeOriginControlReadiness}
        lifeWhisperRelationshipVisualFact={{
          lifeWhisperFact,
          lifeWhisperResponsePhase,
          responseCycleId: lifeWhisperResponseCycleId,
        }}
        onLifeWhisperVisualResponseOutcome={
          handleLifeWhisperVisualResponseOutcome
        }
        onStateChange={setCanvasHostState}
      />
      {lifeOriginControlReadiness.status === "READY" ? (
        <button
          type="button"
          className="gy-genesis-production-experience__origin-invitation"
          aria-label="轻触这束光，发现属于你的生命星宿"
          data-continuous-scene-near-control="LIFE_ORIGIN"
          data-genesis-life-origin-native-control="READY"
          disabled={false}
          aria-disabled={undefined}
          tabIndex={0}
          onClick={beginLifeOriginDiscovery}
        >
          轻触这束光
        </button>
      ) : null}
      {lifeOriginControlReadiness.status === "SAFE_WITHHELD" ? (
        <section
          className="gy-genesis-production-experience__origin-safe-withheld"
          data-genesis-life-origin-native-control="SAFE_WITHHELD"
          data-genesis-life-origin-safe-withheld-reason={
            lifeOriginControlReadiness.reason
          }
          aria-label="生命来源确认状态"
        >
          <p role="status" aria-live="polite">
            这束光暂时无法确认。已保存的出生信息仍被保留。
          </p>
          <button
            type="button"
            onClick={() => navigate("/launch-lab", { replace: true })}
          >
            返回出生信息
          </button>
        </section>
      ) : null}
      {lifeWhisperEntryReady && !relationshipNamingReady ? (
        <section
          className="gy-genesis-production-experience__life-whisper"
          data-life-whisper-entry="READY"
          data-life-whisper-fact={lifeWhisperFact}
          aria-label="生命低语"
        >
          {lifeWhisperFact === "NONE" ? (
            <form
              className="gy-genesis-production-experience__life-whisper-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitLifeWhisper();
              }}
            >
              <label htmlFor="xinmai-life-whisper">
                留下一句此刻的心声
              </label>
              <textarea
                id="xinmai-life-whisper"
                value={lifeWhisperText}
                rows={1}
                maxLength={120}
                placeholder="一句话，一个词，都可以"
                aria-describedby="xinmai-life-whisper-guidance"
                onChange={(event) => setLifeWhisperText(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    !event.nativeEvent.isComposing &&
                    event.key === "Enter" &&
                    (event.metaKey || event.ctrlKey)
                  ) {
                    event.preventDefault();
                    submitLifeWhisper();
                  }
                }}
              />
              <p id="xinmai-life-whisper-guidance">
                只留在此刻，不会被分析
              </p>
              <div className="gy-genesis-production-experience__life-whisper-actions">
                <button
                  type="button"
                  data-interaction="WHISPER_SKIPPED"
                  onClick={skipLifeWhisper}
                >
                  暂时不说
                </button>
                <button
                  type="submit"
                  data-interaction="WHISPER_SUBMITTED"
                  disabled={lifeWhisperText.trim().length === 0}
                >
                  留给它
                </button>
              </div>
            </form>
          ) : lifeWhisperFact === "WHISPER_SUBMITTED" &&
            lifeWhisperResponsePhase === "UNAVAILABLE" ? (
            <div
              className="gy-genesis-production-experience__life-whisper-unavailable"
              role="status"
            >
              <p>这一次，它的回应没有完整显现。</p>
              <div className="gy-genesis-production-experience__life-whisper-actions">
                <button
                  type="button"
                  data-interaction="RETRY_LIFE_WHISPER_RESPONSE"
                  onClick={retryLifeWhisperResponse}
                >
                  再靠近一次
                </button>
                <button
                  type="button"
                  data-interaction="CONTINUE_WITHOUT_CONFIRMED_RESPONSE"
                  onClick={
                    continueWithoutConfirmedLifeWhisperResponse
                  }
                >
                  暂不等待，继续同行
                </button>
              </div>
            </div>
          ) : (
            <p
              className="gy-genesis-production-experience__life-whisper-settled"
              role="status"
            >
              {lifeWhisperFact === "WHISPER_SUBMITTED"
                ? lifeWhisperResponsePhase === "RESPONDING"
                  ? "它正在听。"
                  : "它听见了。这句话只留在此刻。"
                : "此刻不说，也可以。"}
            </p>
          )}
        </section>
      ) : null}
      {relationshipNamingReady ? (
        <section
          className="gy-genesis-production-experience__relationship-naming"
          data-relationship-naming-entry="READY"
          data-relationship-naming-persistence={
            relationshipNamingPersistence ?? "NONE"
          }
          aria-label="生命伙伴关系称呼"
        >
          {relationshipNamingState === "PENDING" ? (
            <form
              className="gy-genesis-production-experience__relationship-naming-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitRelationshipName();
              }}
            >
              <label htmlFor="xinmai-relationship-name">
                如果愿意，可以这样称呼它
              </label>
              <input
                id="xinmai-relationship-name"
                type="text"
                value={relationshipNameDraft}
                maxLength={
                  STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS * 2
                }
                autoComplete="off"
                placeholder="一个只属于你们的称呼"
                aria-describedby="xinmai-relationship-name-guidance"
                onChange={(event) =>
                  setRelationshipNameDraft(
                    Array.from(event.target.value)
                      .slice(
                        0,
                        STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS,
                      )
                      .join(""),
                  )
                }
              />
              <p id="xinmai-relationship-name-guidance">
                它的天地之名不会改变
              </p>
              <div className="gy-genesis-production-experience__relationship-naming-actions">
                <button
                  type="button"
                  data-interaction="RELATIONSHIP_NAMING_SKIPPED"
                  onClick={skipRelationshipNaming}
                >
                  以后再说
                </button>
                <button
                  type="submit"
                  data-interaction="RELATIONSHIP_NAME_CREATED"
                  disabled={relationshipNameDraft.trim().length === 0}
                >
                  留下称呼
                </button>
              </div>
            </form>
          ) : (
            <p
              className="gy-genesis-production-experience__relationship-naming-settled"
              role="status"
            >
              {relationshipNamingState === "NAMED" &&
              relationshipName !== null ? (
                <>
                  你可以叫它
                  <strong>{relationshipName}</strong>
                  {relationshipNamingPersistence ===
                  "CURRENT_CYCLE_ONLY" ? (
                    <span>这个称呼暂时只留在此刻。</span>
                  ) : null}
                </>
              ) : (
                "不命名，也不妨碍你们继续同行。"
              )}
            </p>
          )}
        </section>
      ) : null}
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
        "PRESENT" ||
        recognitionPromptReady) &&
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
      {recognitionActionReady &&
      recognitionPromptReady ? (
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
      presenceRecognitionContinuityResult?.status === "READY" &&
      recognitionResponseSettled &&
      lifeWhisperRelationIntentResolved ? (
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
    </main>
  );
}
