import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createXinmaiContinuousSceneSameLifeRendererAdapter } from "../renderers/xinmaiContinuousSceneRendererAdapter";
import { resolveLifeUniverseCrystalImprintGeometry } from "../renderers/lifeUniverseStarField";
import { projectPersonalStarBeastRenderPlanToLifePresence } from "../services/personalStarBeastLifePresenceProjection";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "../services/isolatedWebGLPrototypeRenderPlanReference";
import {
  commitXinmaiSameLifeSurfaceOutcome,
  resolveXinmaiSameLifeSurfaceFacts,
  resolveXinmaiSameLifeSurfaceSelection,
} from "../services/xinmaiSameLifeSurfaceHostResolver";
import { resolveXinmaiSameLifeAccessibleSemanticMirror } from "../services/xinmaiSameLifeAccessibleSemanticMirror";
import { resolveXinmaiRealityGravityChoiceSceneAccessibleSemanticMirror } from "../services/xinmaiRealityGravityChoiceSceneAccessibleSemanticMirror";
import { resolveXinmaiRealityGravityChoiceSceneSemanticPresentation } from "../services/xinmaiRealityGravityChoiceSceneSemanticResolver";
import { XinmaiSemanticStaticSameLifeSurface } from "./XinmaiSemanticStaticSameLifeSurface";
import {
  useXinmaiContinuousScenePresentation,
} from "./XinmaiContinuousSceneHostContext";
import { adaptRealLifeVisualSource } from "../services/realLifeVisualSourceAdapter";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import { projectGravityLifeSurfaceOutcomes } from "../services/gravityEntryAcceptanceRuntimePort";
import "../styles/reality-life-entry-continuity.css";
import "../styles/reality-inner-view-entry.css";
import "../styles/xinmai-reality-seed-body-response.css";
import "../styles/xinmai-same-life-surface.css";
import type {
  GenesisProductionCanvasHostState,
} from "../types/genesisProductionExperiencePage";
import type { GenesisWebGLRendererCoreFallback } from "../types/genesisWebGLRendererCore";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import {
  XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
  type XinmaiCanonicalBodyImprintDecision,
} from "../types/xinmaiCanonicalBodyImprint";
import type {
  RealityLifeSurfaceOutcome,
  RealitySurfaceAdmissionAttempt,
} from "../types/xinmaiRealitySurfaceAdmission";
import type { SelectedPressureSeedContext } from "../types/primaryPetal";
import type {
  GravityLifeSurfaceOutcome,
  GravitySurfaceAdmissionAttempt,
} from "../types/xinmaiGravitySurfaceAdmission";
import {
  DORMANT_LIFE_WHISPER_RELATIONSHIP_VISUAL_FACT,
  type LifeWhisperRelationshipVisualFact,
  type LifeWhisperSurfaceVisualResponseOutcome,
} from "../types/xinmaiLifeWhisperRelationship";
import type {
  XinmaiSameLifeSurfaceCommitProof,
  XinmaiSameLifeSurfaceConsumer,
  XinmaiSameLifeSurfaceOutcome,
} from "../types/xinmaiSameLifeSurfacePresentation";
import {
  XINMAI_CONTINUOUS_SCENE_PRESENTATION_VERSION,
  type XinmaiContinuousSceneConsumerSurface,
  type XinmaiContinuousSceneNearObjectKind,
} from "../types/xinmaiContinuousScenePresentation";
import {
  XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_VERSION,
  type XinmaiRealityGravityChoiceSceneSemanticFacts,
  type XinmaiRealityGravityChoiceSceneSemanticProjection,
} from "../types/xinmaiRealityGravityChoiceSceneSemanticPresentation";
import type {
  XinmaiReturningSameLifeContinuityPresentationProjection,
} from "../types/xinmaiReturningSameLifeContinuityPresentation";

const REALITY_ARRIVAL_TIMING_MS = Object.freeze({
  IDENTITY_HOLD: 1_600,
  SETTLED: 4_600,
  LIFE_WEATHER_SETTLE: 2_800,
});

type LifeWhisperSurfaceVisualResponseOutcomeInput =
  LifeWhisperSurfaceVisualResponseOutcome extends infer Outcome
    ? Outcome extends LifeWhisperSurfaceVisualResponseOutcome
      ? Omit<Outcome, "sourceReferenceId">
      : never
    : never;

type RealityLifeSurfaceOutcomeInput =
  RealityLifeSurfaceOutcome extends infer Outcome
    ? Outcome extends RealityLifeSurfaceOutcome
      ? Omit<
          Outcome,
          | "intentReferenceId"
          | "encounterCycleId"
          | "intentRevision"
          | "identityReferences"
          | "sourceReferenceId"
        >
      : never
    : never;

type GravityLifeSurfaceOutcomeInput =
  GravityLifeSurfaceOutcome extends infer Outcome
    ? Outcome extends GravityLifeSurfaceOutcome
      ? Omit<
          Outcome,
          | "admissionReferenceId"
          | "gravityCycleId"
          | "admissionRevision"
          | "identityReferences"
          | "selectedPressureSeedId"
          | "sourceEncounterCycleId"
          | "choiceActionIntentionReferenceId"
          | "gravityObservationReferenceId"
          | "sourceReferenceId"
        >
      : never
    : never;

export function RealityLifeUniverseCanvas({
  visualContinuity,
  selectedPressureSeedContext = null,
  currentRealityWeatherEnabled = false,
  innerViewApproachState = "INACTIVE",
  onApproachCurrentWeather,
  historicalRealityMemoryKey = null,
  canonicalBodyImprintDecision =
    XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
  choiceLifeTraceMemoryKey = null,
  choiceLifeTraceSourceSlot = null,
  lifeWhisperRelationshipVisualFact =
    DORMANT_LIFE_WHISPER_RELATIONSHIP_VISUAL_FACT,
  onLifeWhisperVisualResponseOutcome,
  realitySurfaceAdmissionAttempt,
  onRealityLifeSurfaceOutcome,
  gravitySurfaceAdmissionAttempt,
  onGravityLifeSurfaceOutcome,
  sameLifeSurfaceConsumer = "REALITY",
  onSameLifeSurfaceOutcome,
  sceneSemanticFacts = null,
  onSceneSemanticProjection,
  sameLifeContinuityProjection = null,
}: Pick<RealityProductionHostProps, "visualContinuity"> &
  Readonly<{
    selectedPressureSeedContext?: SelectedPressureSeedContext | null;
    currentRealityWeatherEnabled?: boolean;
    innerViewApproachState?:
      | "INACTIVE"
      | "AWAITING_BODY_APPROACH"
      | "BODY_APPROACHED";
    onApproachCurrentWeather?: () => void;
    historicalRealityMemoryKey?: string | null;
    canonicalBodyImprintDecision?: XinmaiCanonicalBodyImprintDecision;
    choiceLifeTraceMemoryKey?: string | null;
    choiceLifeTraceSourceSlot?: number | null;
    lifeWhisperRelationshipVisualFact?: LifeWhisperRelationshipVisualFact;
    onLifeWhisperVisualResponseOutcome?: (
      outcome: LifeWhisperSurfaceVisualResponseOutcome,
    ) => void;
    realitySurfaceAdmissionAttempt?: RealitySurfaceAdmissionAttempt;
    onRealityLifeSurfaceOutcome?: (
      outcome: RealityLifeSurfaceOutcome,
    ) => void;
    gravitySurfaceAdmissionAttempt?: GravitySurfaceAdmissionAttempt;
    onGravityLifeSurfaceOutcome?: (
      outcome: GravityLifeSurfaceOutcome,
    ) => void;
    sameLifeSurfaceConsumer?: XinmaiSameLifeSurfaceConsumer;
    onSameLifeSurfaceOutcome?: (
      outcome: XinmaiSameLifeSurfaceOutcome,
    ) => void;
    sceneSemanticFacts?:
      | XinmaiRealityGravityChoiceSceneSemanticFacts
      | null;
    onSceneSemanticProjection?: (
      projection:
        | XinmaiRealityGravityChoiceSceneSemanticProjection
        | null,
    ) => void;
    sameLifeContinuityProjection?:
      | XinmaiReturningSameLifeContinuityPresentationProjection
      | null;
  }>) {
  const continuesRecognizedPressure = selectedPressureSeedContext !== null;
  const [reducedMotionRequested, setReducedMotionRequested] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const rendererFailureRequested =
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get(
      "__xinmaiRendererFailure",
    ) === "1";
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotionRequested(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const lifeWhisperRelationshipVisualFactRef = useRef(
    lifeWhisperRelationshipVisualFact,
  );
  lifeWhisperRelationshipVisualFactRef.current =
    lifeWhisperRelationshipVisualFact;
  const readLifeWhisperRelationshipVisualFact = useCallback(
    () => lifeWhisperRelationshipVisualFactRef.current,
    [],
  );
  const onLifeWhisperVisualResponseOutcomeRef = useRef(
    onLifeWhisperVisualResponseOutcome,
  );
  onLifeWhisperVisualResponseOutcomeRef.current =
    onLifeWhisperVisualResponseOutcome;
  const lastDeliveredLifeWhisperOutcomeKeyRef = useRef<string | null>(null);
  const emitLifeWhisperVisualResponseOutcome = useCallback(
    (
      outcome: LifeWhisperSurfaceVisualResponseOutcomeInput,
    ) => {
      const outcomeKey = `${outcome.responseCycleId}:${outcome.status}`;
      if (
        lastDeliveredLifeWhisperOutcomeKeyRef.current === outcomeKey
      ) {
        return;
      }
      lastDeliveredLifeWhisperOutcomeKeyRef.current = outcomeKey;
      onLifeWhisperVisualResponseOutcomeRef.current?.(
        Object.freeze({
          ...outcome,
          sourceReferenceId: visualContinuity.sourceReferenceId,
        }) as LifeWhisperSurfaceVisualResponseOutcome,
      );
    },
    [visualContinuity.sourceReferenceId],
  );
  const onRealityLifeSurfaceOutcomeRef = useRef(
    onRealityLifeSurfaceOutcome,
  );
  onRealityLifeSurfaceOutcomeRef.current =
    onRealityLifeSurfaceOutcome;
  const lastDeliveredRealityLifeSurfaceOutcomeKeyRef =
    useRef<string | null>(null);
  const emitRealityLifeSurfaceOutcome = useCallback(
    (outcome: RealityLifeSurfaceOutcomeInput) => {
      if (realitySurfaceAdmissionAttempt === undefined) {
        return;
      }
      const outcomeKey =
        `${realitySurfaceAdmissionAttempt.intentReferenceId}:` +
        `${realitySurfaceAdmissionAttempt.encounterCycleId}:` +
        `${realitySurfaceAdmissionAttempt.intentRevision}:` +
        outcome.status;
      if (
        lastDeliveredRealityLifeSurfaceOutcomeKeyRef.current ===
        outcomeKey
      ) {
        return;
      }
      lastDeliveredRealityLifeSurfaceOutcomeKeyRef.current =
        outcomeKey;
      onRealityLifeSurfaceOutcomeRef.current?.(
        Object.freeze({
          ...realitySurfaceAdmissionAttempt,
          sourceReferenceId: visualContinuity.sourceReferenceId,
          ...outcome,
        }) as RealityLifeSurfaceOutcome,
      );
    },
    [
      realitySurfaceAdmissionAttempt,
      visualContinuity.sourceReferenceId,
    ],
  );
  const onGravityLifeSurfaceOutcomeRef = useRef(
    onGravityLifeSurfaceOutcome,
  );
  onGravityLifeSurfaceOutcomeRef.current =
    onGravityLifeSurfaceOutcome;
  const lastDeliveredGravityLifeSurfaceOutcomeKeyRef =
    useRef<string | null>(null);
  const emitGravityLifeSurfaceOutcome = useCallback(
    (outcome: GravityLifeSurfaceOutcomeInput) => {
      if (gravitySurfaceAdmissionAttempt === undefined) return;
      const outcomeKey =
        `${gravitySurfaceAdmissionAttempt.admissionReferenceId}:` +
        `${gravitySurfaceAdmissionAttempt.gravityCycleId}:` +
        `${gravitySurfaceAdmissionAttempt.admissionRevision}:` +
        outcome.status;
      if (
        lastDeliveredGravityLifeSurfaceOutcomeKeyRef.current ===
        outcomeKey
      ) {
        return;
      }
      lastDeliveredGravityLifeSurfaceOutcomeKeyRef.current =
        outcomeKey;
      const typedOutcome = Object.freeze({
        ...gravitySurfaceAdmissionAttempt,
        sourceReferenceId: visualContinuity.sourceReferenceId,
        ...outcome,
      }) as GravityLifeSurfaceOutcome;
      for (const projectedOutcome of
        projectGravityLifeSurfaceOutcomes(typedOutcome)) {
        onGravityLifeSurfaceOutcomeRef.current?.(
          projectedOutcome,
        );
      }
    },
    [
      gravitySurfaceAdmissionAttempt,
      visualContinuity.sourceReferenceId,
    ],
  );
  const onSameLifeSurfaceOutcomeRef = useRef(
    onSameLifeSurfaceOutcome,
  );
  onSameLifeSurfaceOutcomeRef.current = onSameLifeSurfaceOutcome;
  const lastDeliveredSameLifeSurfaceOutcomeKeyRef =
    useRef<string | null>(null);
  const [rendererState, setRendererState] =
    useState<GenesisProductionCanvasHostState>("STARTING");
  const [webglUnavailable, setWebglUnavailable] = useState(
    rendererFailureRequested,
  );
  const [sameLifeSurfaceCommitProof, setSameLifeSurfaceCommitProof] =
    useState<XinmaiSameLifeSurfaceCommitProof | null>(null);
  const [sameLifeSurfaceOutcome, setSameLifeSurfaceOutcome] =
    useState<XinmaiSameLifeSurfaceOutcome | null>(null);
  const [rendererFallbackReason, setRendererFallbackReason] =
    useState<GenesisWebGLRendererCoreFallback["reason"] | null>(null);
  const [
    realityLifeSurfaceUnavailableReason,
    setRealityLifeSurfaceUnavailableReason,
  ] = useState<
    Extract<
      RealityLifeSurfaceOutcome,
      { status: "REALITY_LIFE_SURFACE_UNAVAILABLE" }
    >["reason"] | null
  >(null);
  const [arrivalPhase, setArrivalPhase] = useState(() =>
    continuesRecognizedPressure ? "SETTLED" : "IDENTITY_HOLD",
  );
  const arrivalPhaseRef = useRef(arrivalPhase);
  arrivalPhaseRef.current = arrivalPhase;
  const [lifeWeatherPhase, setLifeWeatherPhase] = useState<
    "QUIET_WITH_MEMORY" | "CURRENT_REALITY_SENSING" | "CURRENT_REALITY_SETTLED"
  >(() =>
    selectedPressureSeedContext === null
      ? "QUIET_WITH_MEMORY"
      : currentRealityWeatherEnabled
        ? "CURRENT_REALITY_SENSING"
        : "CURRENT_REALITY_SETTLED",
  );
  const realityPressureConsumer = useMemo(() => {
    if (selectedPressureSeedContext === null) {
      return Object.freeze({
        status: "WAITING" as const,
        // A persisted projection belongs to history. A new Reality encounter
        // stays visually quiet until the user recognizes what is happening now.
        projection: null,
      });
    }

    const sourceContext = readRealUserGenesisVisualSourceContext();
    if (
      sourceContext === null ||
      sourceContext.sourceReferenceId !== visualContinuity.sourceReferenceId
    ) {
      return Object.freeze({
        status: "BLOCKED" as const,
        projection: null,
      });
    }

    const adaptedSource = adaptRealLifeVisualSource(
      Object.freeze({
        ...sourceContext.visualSourceAdapterInput,
        selectedPressureSeedContext,
      }),
    );
    const projection =
      adaptedSource.status === "AVAILABLE"
        ? adaptedSource.visualSource.projectionBundle.realityPressureProjection
        : null;
    if (
      adaptedSource.status !== "AVAILABLE" ||
      adaptedSource.visualSource.provenance.selectedPressureSeedId !==
        selectedPressureSeedContext.selectedPressureSeedId ||
      projection === null
    ) {
      return Object.freeze({
        status: "BLOCKED" as const,
        projection: null,
      });
    }

    return Object.freeze({
      status: "RESPONDING" as const,
      projection,
    });
  }, [selectedPressureSeedContext, visualContinuity]);
  const realityPressureFlowSide =
    (realityPressureConsumer.projection?.pressureExpression.flowDeflection ??
      0) >= 0
      ? "RIGHT"
      : "LEFT";
  const realitySeedBodyTargetX =
    realityPressureFlowSide === "RIGHT" ? 59 : 41;
  const realitySeedIngressOriginX =
    realityPressureFlowSide === "RIGHT" ? 96 : 4;
  const realitySeedIngressControlX =
    realityPressureFlowSide === "RIGHT" ? 78 : 22;
  const realitySeedBodyResponsePath =
    selectedPressureSeedContext === null
      ? ""
      : `M ${realitySeedIngressOriginX} 72 C ${realitySeedIngressControlX} 69 ${realitySeedBodyTargetX + (realityPressureFlowSide === "RIGHT" ? 7 : -7)} 57 ${realitySeedBodyTargetX} 48`;
  const lifeMemoryGeometry = useMemo(() => {
    const projectionBundle =
      visualContinuity.consumerSourceResult.consumerSource.projectionBundle;
    const morphology =
      projectionBundle.morphologicalFieldAlignmentProjection
        .morphologicalFieldExpression;
    const sharedInput = {
      birthMansionIndex:
        projectionBundle.twentyEightMansionCoordinateProjection.birthMansion
          .mansionIndex,
      normalizedOrbitPositions:
        projectionBundle.twentyEightMansionCoordinateProjection.coordinates.map(
          (coordinate) => coordinate.normalizedOrbitPosition,
        ),
      envelopeScale: morphology.envelopeScale,
      postureBias: morphology.postureBias,
    };
    return Object.freeze({
      historicalReality: historicalRealityMemoryKey
        ? resolveLifeUniverseCrystalImprintGeometry({
            identityKey: historicalRealityMemoryKey,
            ...sharedInput,
          })
        : null,
      choiceLifeTrace:
        choiceLifeTraceMemoryKey && choiceLifeTraceSourceSlot !== null
          ? resolveLifeUniverseCrystalImprintGeometry({
              identityKey: choiceLifeTraceMemoryKey,
              ...sharedInput,
              sourceSlot: choiceLifeTraceSourceSlot,
            })
          : null,
    });
  }, [
    choiceLifeTraceMemoryKey,
    choiceLifeTraceSourceSlot,
    historicalRealityMemoryKey,
    visualContinuity,
  ]);
  const choiceLifeTraceBodyPath = lifeMemoryGeometry.choiceLifeTrace
    ? `M ${lifeMemoryGeometry.choiceLifeTrace.target[0]} ${lifeMemoryGeometry.choiceLifeTrace.target[1]} L ${lifeMemoryGeometry.choiceLifeTrace.stem[0]} ${lifeMemoryGeometry.choiceLifeTrace.stem[1]} L ${lifeMemoryGeometry.choiceLifeTrace.branchTarget[0]} ${lifeMemoryGeometry.choiceLifeTrace.branchTarget[1]}`
    : "";
  const choiceLifeTraceBodyPoint =
    lifeMemoryGeometry.choiceLifeTrace?.branchTarget ?? null;
  const choiceLifeTraceResponseInfluence =
    lifeMemoryGeometry.choiceLifeTrace !== null &&
    selectedPressureSeedContext !== null
      ? "CADENCE_BIAS_ONLY"
      : "NONE";
  const choiceLifeTraceCadenceSignature =
    choiceLifeTraceSourceSlot === null
      ? "NONE"
      : `SOURCE_SLOT_${choiceLifeTraceSourceSlot}`;
  const sameLifeSurfaceFacts = useMemo(() => {
    const source = visualContinuity.consumerSourceResult.consumerSource;
    return resolveXinmaiSameLifeSurfaceFacts({
      sourceReferenceId: visualContinuity.sourceReferenceId,
      renderPlan: source.renderPlanResult.plan,
      canonicalBodyImprintDecision,
    });
  }, [canonicalBodyImprintDecision, visualContinuity]);
  const sameLifeSurfaceSelection = useMemo(
    () =>
      resolveXinmaiSameLifeSurfaceSelection({
        facts: sameLifeSurfaceFacts,
        nativeReducedMotion: reducedMotionRequested,
        webglUnavailable,
      }),
    [reducedMotionRequested, sameLifeSurfaceFacts, webglUnavailable],
  );
  const staticLifePresence = useMemo(() => {
    const source = visualContinuity.consumerSourceResult.consumerSource;
    const projections = source.projectionBundle;
    return source.renderPlanResult.plan === null
      ? null
      : projectPersonalStarBeastRenderPlanToLifePresence(
          source.renderPlanResult.plan,
          projections.timeSequenceRecognitionProjection,
          projections.birthMansionIgnitionProjection,
          projections.morphologicalFieldAlignmentProjection,
          projections.lifeForceInfusionProjection,
          projections.personalRevealProjection,
          realityPressureConsumer.projection,
        );
  }, [realityPressureConsumer.projection, visualContinuity]);

  useEffect(() => {
    setSameLifeSurfaceOutcome(null);
    lastDeliveredSameLifeSurfaceOutcomeKeyRef.current = null;
  }, [
    sameLifeSurfaceFacts?.bodyReferenceId,
    sameLifeSurfaceFacts?.sourceReferenceId,
    sameLifeSurfaceFacts?.sourceRenderPlanReferenceId,
  ]);

  useEffect(() => {
    if (sameLifeSurfaceSelection.status !== "SAFE_WITHHELD") return;
    const outcome = commitXinmaiSameLifeSurfaceOutcome({
      selection: sameLifeSurfaceSelection,
      proof: null,
      consumer: sameLifeSurfaceConsumer,
    });
    setSameLifeSurfaceOutcome(outcome);
    onSameLifeSurfaceOutcomeRef.current?.(outcome);
  }, [sameLifeSurfaceConsumer, sameLifeSurfaceSelection]);

  useEffect(() => {
    if (continuesRecognizedPressure) {
      setArrivalPhase("SETTLED");
      return undefined;
    }

    setArrivalPhase("IDENTITY_HOLD");
    const revealTimer = window.setTimeout(() => {
      setArrivalPhase("REALITY_REVEAL");
    }, REALITY_ARRIVAL_TIMING_MS.IDENTITY_HOLD);
    const settleTimer = window.setTimeout(() => {
      setArrivalPhase("SETTLED");
    }, REALITY_ARRIVAL_TIMING_MS.SETTLED);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(settleTimer);
    };
  }, [continuesRecognizedPressure, visualContinuity.sourceReferenceId]);

  useEffect(() => {
    if (selectedPressureSeedContext === null) {
      setLifeWeatherPhase("QUIET_WITH_MEMORY");
      return undefined;
    }
    if (
      !currentRealityWeatherEnabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setLifeWeatherPhase("CURRENT_REALITY_SETTLED");
      return undefined;
    }

    setLifeWeatherPhase("CURRENT_REALITY_SENSING");
    const settleTimer = window.setTimeout(() => {
      setLifeWeatherPhase("CURRENT_REALITY_SETTLED");
    }, REALITY_ARRIVAL_TIMING_MS.LIFE_WEATHER_SETTLE);
    return () => window.clearTimeout(settleTimer);
  }, [
    currentRealityWeatherEnabled,
    selectedPressureSeedContext?.selectedPressureSeedId,
  ]);

  useEffect(() => {
    if (sameLifeSurfaceSelection.status === "SAFE_WITHHELD") {
      setRendererFallbackReason(null);
      setRealityLifeSurfaceUnavailableReason("SOURCE_NOT_READY");
      setRendererState("BLOCKED");
      return;
    }
    if (sameLifeSurfaceSelection.status === "STATIC_SELECTED") {
      setRendererFallbackReason(
        sameLifeSurfaceSelection.reason === "NATIVE_REDUCED_MOTION"
          ? "REDUCED_MOTION_REQUESTED"
          : "RENDERER_INITIALIZATION_FAILED",
      );
      setRealityLifeSurfaceUnavailableReason(null);
      setRendererState("FALLBACK_REQUIRED");
      return;
    }
    setRendererFallbackReason(null);
    setRealityLifeSurfaceUnavailableReason(null);
    setRendererState("STARTING");
  }, [sameLifeSurfaceSelection]);

  const realityStaticLifeSurfaceVisible =
    sameLifeSurfaceSelection.status === "STATIC_SELECTED" &&
    staticLifePresence !== null;

  const acceptSameLifeSurfaceCommitProof = useCallback(
    (proof: XinmaiSameLifeSurfaceCommitProof) => {
      setSameLifeSurfaceCommitProof(proof);
    },
    [],
  );

  useEffect(() => {
    if (sameLifeSurfaceSelection.status === "SAFE_WITHHELD") {
      return;
    }
    const outcome = commitXinmaiSameLifeSurfaceOutcome({
      selection: sameLifeSurfaceSelection,
      proof: sameLifeSurfaceCommitProof,
      consumer: sameLifeSurfaceConsumer,
    });
    if (outcome.status === "SAME_LIFE_SURFACE_SAFE_WITHHELD") {
      return;
    }
    const outcomeKey = `${outcome.status}:${outcome.facts.bodyReferenceId}:${outcome.facts.imprints
      .map((imprint) => imprint.imprintReferenceId)
      .join(",")}`;
    if (lastDeliveredSameLifeSurfaceOutcomeKeyRef.current === outcomeKey) {
      return;
    }
    lastDeliveredSameLifeSurfaceOutcomeKeyRef.current = outcomeKey;
    setSameLifeSurfaceOutcome(outcome);
    onSameLifeSurfaceOutcomeRef.current?.(outcome);
    const staticPresented =
      outcome.status === "STATIC_SAME_LIFE_SURFACE_PRESENTED";
    emitRealityLifeSurfaceOutcome({
      status: "REALITY_LIFE_SURFACE_PRESENTED",
      surfaceMode: staticPresented
        ? "SEMANTIC_STATIC_LIFE_UNIVERSE"
        : "WEBGL_LIFE_UNIVERSE",
      presentedAt: outcome.presentedAt,
    });
    emitGravityLifeSurfaceOutcome({
      status: "GRAVITY_LIFE_SURFACE_PRESENTED",
      surfaceMode: staticPresented
        ? "SEMANTIC_STATIC_SAME_LIFE_SURFACE"
        : "WEBGL_SAME_LIFE_SURFACE",
      presentedAt: outcome.presentedAt,
    });
  }, [
    sameLifeSurfaceCommitProof,
    sameLifeSurfaceConsumer,
    sameLifeSurfaceSelection,
    emitRealityLifeSurfaceOutcome,
    emitGravityLifeSurfaceOutcome,
  ]);

  useEffect(() => {
    if (
      rendererState !== "BLOCKED" ||
      realityLifeSurfaceUnavailableReason === null
    ) {
      return;
    }
    emitRealityLifeSurfaceOutcome({
      status: "REALITY_LIFE_SURFACE_UNAVAILABLE",
      reason: realityLifeSurfaceUnavailableReason,
      reportedAt: new Date().toISOString(),
    });
    emitGravityLifeSurfaceOutcome({
      status: "GRAVITY_LIFE_SURFACE_UNAVAILABLE",
      reason:
        realityLifeSurfaceUnavailableReason === "CANVAS_REQUIRED"
          ? "SOURCE_NOT_READY"
          : realityLifeSurfaceUnavailableReason,
      reportedAt: new Date().toISOString(),
    });
  }, [
    emitRealityLifeSurfaceOutcome,
    emitGravityLifeSurfaceOutcome,
    realityLifeSurfaceUnavailableReason,
    rendererState,
  ]);

  const staticLifeWhisperResponseVisible =
    rendererState === "FALLBACK_REQUIRED" &&
    rendererFallbackReason !== null &&
    lifeWhisperRelationshipVisualFact.lifeWhisperFact ===
      "WHISPER_SUBMITTED" &&
    (lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase ===
      "RESPONDING" ||
      lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase ===
        "SETTLED") &&
    lifeWhisperRelationshipVisualFact.responseCycleId !== null;
  const accessibleSemanticMirror = useMemo(
    () =>
      resolveXinmaiSameLifeAccessibleSemanticMirror({
        canonicalDecision: canonicalBodyImprintDecision,
        surfaceOutcome: sameLifeSurfaceOutcome,
      }),
    [canonicalBodyImprintDecision, sameLifeSurfaceOutcome],
  );

  useEffect(() => {
    if (
      !staticLifeWhisperResponseVisible ||
      lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase !==
        "RESPONDING" ||
      lifeWhisperRelationshipVisualFact.responseCycleId === null ||
      rendererFallbackReason === null
    ) {
      return undefined;
    }

    if (
      sameLifeSurfaceCommitProof?.presenter !==
      "SEMANTIC_STATIC_SAME_LIFE_BODY"
    ) {
      return undefined;
    }
    emitLifeWhisperVisualResponseOutcome({
      responseCycleId:
        lifeWhisperRelationshipVisualFact.responseCycleId as string,
      status: "STATIC_RESPONSE_PRESENTED",
      surfaceMode: "SEMANTIC_STATIC_FALLBACK",
      reason: rendererFallbackReason,
    });
    return undefined;
  }, [
    emitLifeWhisperVisualResponseOutcome,
    lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase,
    lifeWhisperRelationshipVisualFact.responseCycleId,
    rendererFallbackReason,
    sameLifeSurfaceCommitProof,
    staticLifeWhisperResponseVisible,
  ]);

  useEffect(() => {
    if (
      rendererState !== "BLOCKED" ||
      lifeWhisperRelationshipVisualFact.lifeWhisperFact !==
        "WHISPER_SUBMITTED" ||
      lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase !==
        "RESPONDING" ||
      lifeWhisperRelationshipVisualFact.responseCycleId === null
    ) {
      return;
    }
    emitLifeWhisperVisualResponseOutcome({
      responseCycleId:
        lifeWhisperRelationshipVisualFact.responseCycleId,
      status: "VISUAL_RESPONSE_UNAVAILABLE",
      surfaceMode: "SEMANTIC_STATIC_FALLBACK",
      reason: "SURFACE_BLOCKED",
    });
  }, [
    emitLifeWhisperVisualResponseOutcome,
    lifeWhisperRelationshipVisualFact.lifeWhisperFact,
    lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase,
    lifeWhisperRelationshipVisualFact.responseCycleId,
    rendererState,
  ]);

  const source = visualContinuity.consumerSourceResult.consumerSource;
  const projectionBundle = source.projectionBundle;
  const sourceRenderPlanReferenceId = useMemo(
    () =>
      createIsolatedWebGLPrototypeRenderPlanReference(
        source.renderPlanResult.plan,
      ).referenceId,
    [source.renderPlanResult.plan],
  );
  const continuousSceneSurface = useMemo<
    XinmaiContinuousSceneConsumerSurface
  >(
    () =>
      sameLifeSurfaceConsumer === "GRAVITY"
        ? "GRAVITY_CHOICE"
        : sameLifeSurfaceConsumer === "RETURNING"
          ? "RETURNING_OWNERSHIP"
          : sameLifeSurfaceConsumer === "ARCHIVE"
            ? "ARCHIVE"
            : "REALITY",
    [sameLifeSurfaceConsumer],
  );
  const acceptMotionSameLifeCommitProof = useCallback(
    (proof: XinmaiSameLifeSurfaceCommitProof) => {
      setSameLifeSurfaceCommitProof(proof);
      setRendererFallbackReason(null);
      setRealityLifeSurfaceUnavailableReason(null);
      setRendererState("RENDERING");
    },
    [],
  );
  const continuousSceneRuntimeFactory = useMemo(() => {
    if (
      sameLifeSurfaceSelection.status !== "MOTION_SELECTED" ||
      rendererFailureRequested ||
      source.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
      source.sourceProvenance !== "REAL_USER_SESSION" ||
      source.sourceReferenceId !== visualContinuity.sourceReferenceId ||
      visualContinuity.visualCalibrationBundle.sourceReferenceId !==
        visualContinuity.sourceReferenceId ||
      visualContinuity.visualCalibrationBundle.runtimeStage !== "COMPLETION" ||
      realityPressureConsumer.status === "BLOCKED"
    ) {
      return null;
    }
    return createXinmaiContinuousSceneSameLifeRendererAdapter({
      factoryReferenceId:
        `CONTINUOUS_SCENE_SAME_LIFE:${continuousSceneSurface}:` +
        sourceRenderPlanReferenceId,
      coreInput: {
        renderPlan: source.renderPlanResult.plan,
        sameLifeSurfaceFacts: sameLifeSurfaceSelection.facts,
        readLifeWhisperRelationshipVisualFact,
        twentyEightMansionCoordinateProjection:
          projectionBundle.twentyEightMansionCoordinateProjection,
        timeSequenceRecognitionProjection:
          projectionBundle.timeSequenceRecognitionProjection,
        birthMansionIgnitionProjection:
          projectionBundle.birthMansionIgnitionProjection,
        morphologicalFieldAlignmentProjection:
          projectionBundle.morphologicalFieldAlignmentProjection,
        fourSymbolDirectionFieldVisualCalibration:
          visualContinuity.fourSymbolDirectionFieldVisualCalibration,
        lifeArchetypeForceCondensationVisualCalibration:
          visualContinuity.lifeArchetypeForceCondensationVisualCalibration,
        lifeForceInfusionProjection:
          projectionBundle.lifeForceInfusionProjection,
        personalRevealProjection:
          projectionBundle.personalRevealProjection,
        realityPressureProjection: realityPressureConsumer.projection,
        genesisVisualRealization:
          visualContinuity.visualCalibrationBundle.genesisVisualRealization,
        genesisPerspectiveCalibration:
          visualContinuity.visualCalibrationBundle
            .genesisPerspectiveCalibration,
        genesisPresenceRecognitionCalibration:
          visualContinuity.visualCalibrationBundle
            .genesisPresenceRecognitionCalibration,
        genesisSpatialDistanceCalibration:
          visualContinuity.visualCalibrationBundle
            .genesisSpatialDistanceCalibration,
      },
      callbacks: {
        onSameLifeSurfaceCommitProof:
          acceptMotionSameLifeCommitProof,
        onLifeWhisperVisualOutcome: (outcome) => {
          if (outcome !== null) {
            emitLifeWhisperVisualResponseOutcome(outcome);
          }
        },
      },
    });
  }, [
    acceptMotionSameLifeCommitProof,
    continuousSceneSurface,
    emitLifeWhisperVisualResponseOutcome,
    projectionBundle,
    readLifeWhisperRelationshipVisualFact,
    realityPressureConsumer,
    rendererFailureRequested,
    sameLifeSurfaceSelection,
    source,
    sourceRenderPlanReferenceId,
    visualContinuity,
  ]);
  const handleContinuousSceneOutcome = useCallback(
    (outcome: import("../types/xinmaiContinuousScenePresentation").XinmaiContinuousSceneOutcome) => {
      if (outcome.status === "CONTINUOUS_SCENE_MOTION_PRESENTED") {
        setRendererState("RENDERING");
        return;
      }
      if (outcome.status === "CONTINUOUS_SCENE_STATIC_PRESENTED") {
        setRendererState("FALLBACK_REQUIRED");
        return;
      }
      if (
        outcome.status === "CONTINUOUS_SCENE_SAFE_WITHHELD" &&
        (outcome.reason === "WEBGL_INITIALIZATION_FAILED" ||
          outcome.reason === "WEBGL_RUNTIME_FAILED")
      ) {
        setWebglUnavailable(true);
      }
    },
    [],
  );
  const staticSceneSurface = useMemo(
    () =>
      sameLifeSurfaceSelection.status === "STATIC_SELECTED" &&
      staticLifePresence !== null ? (
        <XinmaiSemanticStaticSameLifeSurface
          facts={sameLifeSurfaceSelection.facts}
          lifePresence={staticLifePresence}
          onCommitted={acceptSameLifeSurfaceCommitProof}
        />
      ) : null,
    [
      acceptSameLifeSurfaceCommitProof,
      sameLifeSurfaceSelection,
      staticLifePresence,
    ],
  );
  const routeAdmissionEvidence = useMemo(() => {
    if (continuousSceneSurface === "REALITY") {
      return Object.freeze({
        status: realitySurfaceAdmissionAttempt === undefined
          ? "MISMATCH" as const
          : "CURRENT" as const,
        admissionReferenceId:
          realitySurfaceAdmissionAttempt?.intentReferenceId ??
          `REALITY:${visualContinuity.sourceReferenceId}`,
        revision: realitySurfaceAdmissionAttempt?.intentRevision ?? 0,
      });
    }
    if (continuousSceneSurface === "GRAVITY_CHOICE") {
      return Object.freeze({
        status: gravitySurfaceAdmissionAttempt === undefined
          ? "MISMATCH" as const
          : "CURRENT" as const,
        admissionReferenceId:
          gravitySurfaceAdmissionAttempt?.admissionReferenceId ??
          `GRAVITY:${visualContinuity.sourceReferenceId}`,
        revision: gravitySurfaceAdmissionAttempt?.admissionRevision ?? 0,
      });
    }
    return Object.freeze({
      status: "CURRENT" as const,
      admissionReferenceId:
        `${continuousSceneSurface}:${visualContinuity.sourceReferenceId}`,
      revision: 0,
    });
  }, [
    continuousSceneSurface,
    gravitySurfaceAdmissionAttempt,
    realitySurfaceAdmissionAttempt,
    visualContinuity.sourceReferenceId,
  ]);
  const sceneSemanticProjection = useMemo(() => {
    if (
      (continuousSceneSurface !== "REALITY" &&
        continuousSceneSurface !== "GRAVITY_CHOICE") ||
      sceneSemanticFacts === null ||
      sceneSemanticFacts.consumerSurface !== continuousSceneSurface
    ) {
      return null;
    }
    const sourceEncounterCycleId =
      continuousSceneSurface === "REALITY"
        ? realitySurfaceAdmissionAttempt?.encounterCycleId ?? ""
        : gravitySurfaceAdmissionAttempt?.sourceEncounterCycleId ?? "";
    return resolveXinmaiRealityGravityChoiceSceneSemanticPresentation({
      schemaVersion:
        XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_VERSION,
      lineage: Object.freeze({
        sourceReferenceId: visualContinuity.sourceReferenceId,
        sourceRenderPlanReferenceId,
        identityReferenceId:
          sameLifeSurfaceFacts?.starBeastIdentityReferenceId ?? null,
        bodyReferenceId: sameLifeSurfaceFacts?.bodyReferenceId ?? null,
        routeAdmissionStatus: routeAdmissionEvidence.status,
        routeAdmissionReferenceId:
          routeAdmissionEvidence.admissionReferenceId,
        routeAdmissionRevision: routeAdmissionEvidence.revision,
        sourceEncounterCycleId,
        gravityCycleId:
          gravitySurfaceAdmissionAttempt?.gravityCycleId ?? null,
        gravityObservationReferenceId:
          gravitySurfaceAdmissionAttempt?.gravityObservationReferenceId ??
          null,
      }),
      facts: sceneSemanticFacts,
    });
  }, [
    continuousSceneSurface,
    gravitySurfaceAdmissionAttempt,
    realitySurfaceAdmissionAttempt?.encounterCycleId,
    routeAdmissionEvidence,
    sameLifeSurfaceFacts?.bodyReferenceId,
    sameLifeSurfaceFacts?.starBeastIdentityReferenceId,
    sceneSemanticFacts,
    sourceRenderPlanReferenceId,
    visualContinuity.sourceReferenceId,
  ]);
  const continuousSceneSemanticProjection = useMemo(() => {
    if (
      continuousSceneSurface === "REALITY" ||
      continuousSceneSurface === "GRAVITY_CHOICE"
    ) {
      return sceneSemanticProjection;
    }
    if (
      (continuousSceneSurface === "RETURNING_OWNERSHIP" ||
        continuousSceneSurface === "ARCHIVE") &&
      sameLifeContinuityProjection?.consumerSurface === continuousSceneSurface
    ) {
      return sameLifeContinuityProjection;
    }
    return null;
  }, [
    continuousSceneSurface,
    sameLifeContinuityProjection,
    sceneSemanticProjection,
  ]);
  const continuousSceneNearObject = useMemo<
    XinmaiContinuousSceneNearObjectKind
  >(
    () =>
      continuousSceneSemanticProjection?.status === "PRESENTABLE"
        ? continuousSceneSemanticProjection.nearObjectKind
        : "NONE",
    [continuousSceneSemanticProjection],
  );
  const sceneSemanticMirror = useMemo(
    () =>
      resolveXinmaiRealityGravityChoiceSceneAccessibleSemanticMirror(
        sceneSemanticProjection,
      ),
    [sceneSemanticProjection],
  );
  useEffect(() => {
    onSceneSemanticProjection?.(sceneSemanticProjection);
  }, [onSceneSemanticProjection, sceneSemanticProjection]);
  const hasObservedSemanticProjectionRef = useRef(
    sceneSemanticProjection?.semanticProjectionReferenceId !== undefined &&
      sceneSemanticProjection?.semanticProjectionReferenceId !== null,
  );
  const lastSemanticProjectionReferenceRef = useRef(
    sceneSemanticProjection?.semanticProjectionReferenceId ?? null,
  );
  const [sceneSemanticAnnouncement, setSceneSemanticAnnouncement] =
    useState("");
  useEffect(() => {
    const reference =
      sceneSemanticProjection?.semanticProjectionReferenceId ?? null;
    if (
      reference === null ||
      reference === lastSemanticProjectionReferenceRef.current
    ) {
      return;
    }
    if (!hasObservedSemanticProjectionRef.current) {
      hasObservedSemanticProjectionRef.current = true;
      lastSemanticProjectionReferenceRef.current = reference;
      return;
    }
    lastSemanticProjectionReferenceRef.current = reference;
    setSceneSemanticAnnouncement(
      sceneSemanticMirror.transitionAnnouncement,
    );
  }, [sceneSemanticMirror.transitionAnnouncement, sceneSemanticProjection]);
  const continuousSceneSemanticInput = useMemo(
    () =>
      continuousSceneSurface === "REALITY" ||
      continuousSceneSurface === "GRAVITY_CHOICE"
        ? Object.freeze({ semanticProjection: sceneSemanticProjection })
        : Object.freeze({
            semanticProjection: continuousSceneSemanticProjection,
          }),
    [
      continuousSceneSemanticProjection,
      continuousSceneSurface,
      sceneSemanticProjection,
    ],
  );
  const continuousSceneRegistration = useMemo(
    () =>
      Object.freeze({
        registrationReferenceId:
          `CONTINUOUS_SCENE:${continuousSceneSurface}`,
        priority: 100,
        input: Object.freeze({
          schemaVersion: XINMAI_CONTINUOUS_SCENE_PRESENTATION_VERSION,
          consumerSurface: continuousSceneSurface,
          sourceReferenceId: visualContinuity.sourceReferenceId,
          sourceRenderPlanReferenceId,
          identityReferenceId:
            sameLifeSurfaceFacts?.starBeastIdentityReferenceId ?? null,
          bodyReferenceId:
            sameLifeSurfaceFacts?.bodyReferenceId ?? null,
          routeAdmissionEvidence,
          nearObjectKind: continuousSceneNearObject,
          nearObjectReferenceId:
            continuousSceneSemanticProjection?.status === "PRESENTABLE"
              ? continuousSceneSemanticProjection.nearObjectReferenceId
              : null,
          nativeMotionPreference: reducedMotionRequested
            ? "REDUCED_MOTION" as const
            : "MOTION_ALLOWED" as const,
          qualityTier: "FULL" as const,
          sameLifeSurface: Object.freeze({
            selection: sameLifeSurfaceSelection,
            publicOutcome: sameLifeSurfaceOutcome,
          }),
          ...continuousSceneSemanticInput,
        }),
        runtimeFactory: continuousSceneRuntimeFactory,
        staticSurface: staticSceneSurface,
        canvasClassName: "gy-reality-life-universe__canvas",
        canvasStyle: Object.freeze({
          transformOrigin: `${realitySeedBodyTargetX}% 48%`,
        }),
        canvasAttributes: Object.freeze({
          "data-reality-life-universe-renderer": rendererState,
          "data-reality-arrival-phase": arrivalPhase,
          "data-reality-life-weather-phase": lifeWeatherPhase,
          "data-inner-view-approach-state": innerViewApproachState,
          "data-inner-view-body-anchor": `${realitySeedBodyTargetX}:48`,
          "data-reality-life-weather-source":
            realityPressureConsumer.status === "RESPONDING"
              ? "CURRENT_RECOGNIZED_REALITY_ONLY"
              : "NO_CURRENT_REALITY",
          "data-reality-life-weather-identity": "SAME_CORE_SAME_BODY",
          "data-reality-pressure-flow-side": realityPressureFlowSide,
          "data-choice-life-trace-response-influence":
            choiceLifeTraceResponseInfluence,
          "data-choice-life-trace-outcome-authority": "NONE",
          "data-choice-life-trace-cadence-signature":
            choiceLifeTraceCadenceSignature,
          "data-source-reference-id": visualContinuity.sourceReferenceId,
          "data-genesis-presence-visual-state": "RECOGNIZED",
        }),
        pointerInteraction: "NONE" as const,
        onOutcome: handleContinuousSceneOutcome,
      }),
    [
      arrivalPhase,
      choiceLifeTraceCadenceSignature,
      choiceLifeTraceResponseInfluence,
      continuousSceneNearObject,
      continuousSceneSemanticInput,
      continuousSceneSemanticProjection,
      continuousSceneRuntimeFactory,
      continuousSceneSurface,
      handleContinuousSceneOutcome,
      innerViewApproachState,
      lifeWeatherPhase,
      realityPressureConsumer.status,
      realityPressureFlowSide,
      reducedMotionRequested,
      routeAdmissionEvidence,
      sameLifeSurfaceFacts,
      sameLifeSurfaceOutcome,
      sameLifeSurfaceSelection,
      sourceRenderPlanReferenceId,
      staticSceneSurface,
      visualContinuity.sourceReferenceId,
      realitySeedBodyTargetX,
    ],
  );
  useXinmaiContinuousScenePresentation(continuousSceneRegistration);

  return (
    <>
      {continuousSceneSurface === "REALITY" ||
      continuousSceneSurface === "GRAVITY_CHOICE" ? (
        <>
          <p
            className="gy-same-life-surface__semantic-mirror"
            aria-live="off"
            data-scene-semantic-mirror={sceneSemanticMirror.status}
          >
            {sceneSemanticMirror.summary}
          </p>
          <p
            className="gy-same-life-surface__semantic-mirror"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {sceneSemanticAnnouncement}
          </p>
        </>
      ) : null}
      <p className="gy-same-life-surface__semantic-mirror" aria-live="off">
        {accessibleSemanticMirror.summary}
      </p>
      {lifeMemoryGeometry.historicalReality ||
      lifeMemoryGeometry.choiceLifeTrace ? (
        <svg
          className="gy-reality-life-universe__memory-layer"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-reality-life-memory="PAST_AS_TEXTURE_NOT_CURRENT_EVENT"
          data-reality-history-pressure={
            lifeMemoryGeometry.historicalReality ? "MEMORY_ONLY" : "NONE"
          }
          data-reality-history-crystal="CANONICAL_IMPRINT_RENDERED_BY_UNIQUE_BODY_PRESENTER"
          data-reality-choice-life-trace={
            lifeMemoryGeometry.choiceLifeTrace
              ? "PRE_CRYSTAL_BODY_MEMORY"
              : "NONE"
          }
        >
          {lifeMemoryGeometry.historicalReality ? (
            <path
              className="gy-reality-life-universe__reality-memory"
              d={lifeMemoryGeometry.historicalReality.path}
              fill="none"
              stroke="rgba(185,203,236,0.32)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {lifeMemoryGeometry.choiceLifeTrace &&
          choiceLifeTraceBodyPoint ? (
            <g
              className="gy-reality-life-universe__choice-life-trace"
              data-choice-life-trace-memory="SAME_BODY_FROM_CHOICE"
              data-choice-life-trace-pressure-role="PAST_INFLUENCE_NOT_CURRENT_PRESSURE"
              data-choice-life-trace-crystal-state="NOT_MATERIALIZED"
              data-choice-life-trace-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
              data-choice-life-trace-response-influence={
                choiceLifeTraceResponseInfluence
              }
              data-choice-life-trace-response-order="MEMORY_PULSES_BEFORE_CURRENT_RESPONSE"
              data-choice-life-trace-outcome-authority="NONE"
              data-choice-life-trace-cadence-signature={
                choiceLifeTraceCadenceSignature
              }
            >
              <path
                className="gy-reality-life-universe__choice-life-trace-bed"
                d={choiceLifeTraceBodyPath}
                fill="none"
                stroke="rgba(185,203,236,0.13)"
                strokeWidth="0.48"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="gy-reality-life-universe__choice-life-trace-flow"
                d={choiceLifeTraceBodyPath}
                pathLength="1"
                fill="none"
                stroke="rgba(255,239,190,0.34)"
                strokeWidth="0.22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g className="gy-reality-life-universe__choice-life-trace-memory">
                <path
                  d={`M ${choiceLifeTraceBodyPoint[0] - 0.38} ${choiceLifeTraceBodyPoint[1] + 0.12} Q ${choiceLifeTraceBodyPoint[0]} ${choiceLifeTraceBodyPoint[1] - 0.38} ${choiceLifeTraceBodyPoint[0] + 0.42} ${choiceLifeTraceBodyPoint[1] + 0.08}`}
                  fill="none"
                  stroke="rgba(255,239,190,0.4)"
                  strokeWidth="0.2"
                  strokeLinecap="round"
                />
                <circle
                  cx={choiceLifeTraceBodyPoint[0]}
                  cy={choiceLifeTraceBodyPoint[1]}
                  r="0.14"
                  fill="rgba(255,247,220,0.48)"
                />
              </g>
              {choiceLifeTraceResponseInfluence === "CADENCE_BIAS_ONLY" ? (
                <circle
                  className="gy-reality-life-universe__choice-life-trace-response-echo"
                  cx={choiceLifeTraceBodyPoint[0]}
                  cy={choiceLifeTraceBodyPoint[1]}
                  r="0.54"
                  fill="none"
                  stroke="rgba(255,239,190,0.36)"
                  strokeWidth="0.16"
                />
              ) : null}
            </g>
          ) : null}
        </svg>
      ) : null}
      {selectedPressureSeedContext !== null &&
      realityPressureConsumer.status === "RESPONDING" ? (
        <svg
          className="gy-reality-life-universe__seed-body-response"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-reality-seed-recognition="FRAGMENT_ENTERING_SAME_LIFE"
          data-reality-seed-presentation-state="DISSOLVED_FROM_CARD"
          data-reality-seed-body-target="EXISTING_LIFE_WEATHER_POSITION"
          data-reality-seed-analysis-stage="NOT_STARTED"
          data-reality-seed-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
          data-reality-seed-reference={
            selectedPressureSeedContext.selectedPressureSeedId
          }
          data-reality-seed-pressure-field={
            selectedPressureSeedContext.pressureField ?? "UNSPECIFIED"
          }
          data-reality-seed-flow-side={realityPressureFlowSide}
          data-inner-view-approach-state={innerViewApproachState}
        >
          <path
            className="gy-reality-life-universe__seed-body-response-bed"
            d={realitySeedBodyResponsePath}
            fill="none"
            stroke="rgba(185,203,236,0.16)"
            strokeWidth="0.34"
            strokeLinecap="round"
          />
          <path
            className="gy-reality-life-universe__seed-body-response-flow"
            d={realitySeedBodyResponsePath}
            pathLength="1"
            fill="none"
            stroke="rgba(238,226,198,0.38)"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
          <path
            className="gy-reality-life-universe__seed-body-response-breath"
            d={`M ${realitySeedBodyTargetX - 0.72} 48.12 Q ${realitySeedBodyTargetX} 47.46 ${realitySeedBodyTargetX + 0.74} 48.08`}
            fill="none"
            stroke="rgba(255,239,190,0.42)"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      {selectedPressureSeedContext !== null &&
      innerViewApproachState !== "INACTIVE" &&
      onApproachCurrentWeather ? (
        <button
          type="button"
          className="gy-reality-inner-view-entry"
          style={{
            left: `${realitySeedBodyTargetX}%`,
          }}
          aria-label="开始六维观察"
          data-inner-view-entry="SAME_BODY_LIFE_WEATHER_TRACE"
          data-inner-view-approach-state={innerViewApproachState}
          data-inner-view-entry-visual="HAIRLINE_BREATH_NOT_SECOND_CORE"
          disabled={innerViewApproachState === "BODY_APPROACHED"}
          onClick={onApproachCurrentWeather}
        >
          <span>开始六维观察</span>
        </button>
      ) : null}
    </>
  );
}
