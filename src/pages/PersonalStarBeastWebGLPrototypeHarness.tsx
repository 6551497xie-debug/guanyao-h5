import { useEffect, useMemo, useRef, useState } from "react";
import {
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
} from "../mocks/starBeastSceneModelFixtures";
import { createIsolatedWebGLRendererPrototype } from "../prototypes/isolatedWebGLRendererPrototype";
import { authorizeIsolatedWebGLRendererPrototype } from "../services/isolatedWebGLRendererPrototypeAuthorizationService";
import { adaptPersonalStarBeastSceneModelToRenderPlan } from "../services/personalStarBeastRenderPlanAdapter";
import { projectGenesisTimeSequenceRecognition } from "../services/genesisTimeSequenceRecognitionProjection";
import { projectGenesisBirthMansionIgnition } from "../services/genesisBirthMansionIgnitionProjection";
import { projectGenesisFourSymbolAlignment } from "../services/genesisFourSymbolAlignmentProjection";
import { projectGenesisLifeForceInfusion } from "../services/genesisLifeForceInfusionProjection";
import { projectGenesisPersonalReveal } from "../services/genesisPersonalRevealProjection";
import { projectGenesisRealityPressure } from "../services/genesisRealityPressureProjection";
import {
  completeGenesisPreviewIntegration,
  initializeGenesisPreviewIntegration,
  startGenesisPreviewIntegration,
} from "../services/genesisPreviewIntegration";
import { createGenesisPreviewIntegrationFixture } from "../services/genesisPreviewIntegrationFixture";
import { mapGenesisRendererVisualRealization } from "../services/genesisRendererVisualRealization";
import { mapGenesisPerspectiveCalibration } from "../services/genesisPerspectiveCalibration";
import { mapGenesisPresenceRecognitionCalibration } from "../services/genesisPresenceRecognitionCalibration";
import { resolveGenesisSpaceUIRuntime } from "../services/genesisSpaceUIRuntime";
import { resolveRecognitionSpaceUIRuntime } from "../services/recognitionSpaceUIRuntime";
import { resolveRealityEntrySpaceUIRuntime } from "../services/realityEntrySpaceUIRuntime";
import { resolvePressureRecognitionUIRuntime } from "../services/pressureRecognitionUIRuntime";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type { GenesisPreviewIntegration } from "../types/genesisPreviewIntegration";
import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type { GenesisSpaceUIRuntime } from "../types/genesisSpaceUIRuntime";
import type { RecognitionSpaceUIRuntime } from "../types/recognitionSpaceUIRuntime";
import type { RealityEntrySpaceUIRuntime } from "../types/realityEntrySpaceUIRuntime";
import type { PressureRecognitionUIRuntime } from "../types/pressureRecognitionUIRuntime";
import "../styles/personal-star-beast-webgl-prototype-harness.css";

type FirstImpressionPhase = "ARRIVAL" | "FORMATION" | "PRESENCE";
type HarnessState = "STARTING" | "RENDERING" | "FALLBACK" | "UNAVAILABLE";

const FORMAL_PLAN_RESULTS = Object.freeze([
  adaptPersonalStarBeastSceneModelToRenderPlan(
    PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.sceneModelReference,
  ),
  adaptPersonalStarBeastSceneModelToRenderPlan(
    PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B.sceneModelReference,
  ),
] as const);

const PROTOTYPE_AUTHORIZATION = authorizeIsolatedWebGLRendererPrototype(
  Object.freeze({
    authorizationReviewReference: Object.freeze({
      referenceType: "ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW",
      protocolId: "RC-EXPLICIT-WEBGL-PROTOTYPE-AUTHORIZATION-REVIEW-P95",
      recommendation:
        "RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION",
      priorExecutionStatus: "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION",
    }),
    explicitAuthorityReference: Object.freeze({
      referenceType: "ISOLATED_WEBGL_PROTOTYPE_EXPLICIT_AUTHORITY",
      authority: "TOTAL_CONTROL_EXPLICIT_DECISION",
      decision: "AUTHORIZE_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE",
      decisionReferenceId:
        "RC-ISOLATED-WEBGL-RENDERER-PROTOTYPE-AUTHORIZATION-P98",
    }),
    renderPlanResults: FORMAL_PLAN_RESULTS,
    prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY",
  }),
);

const LIFE_ARRIVAL_COORDINATE_REFERENCE = Object.freeze({
  referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" as const,
  referenceId: "prototype:life-arrival:shared",
  sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE" as const,
  birthLocationContextOnly: true as const,
  birthLocationExcludedFromStarBeastDerivation: true as const,
});

const TIME_SEQUENCE_RECOGNITION_RESULT = projectGenesisTimeSequenceRecognition(
  Object.freeze({
    originCoordinateReference: LIFE_ARRIVAL_COORDINATE_REFERENCE,
    timeSequenceReference: Object.freeze({
      referenceType: "GENESIS_TIME_SEQUENCE_REFERENCE" as const,
      referenceId: "prototype:time-sequence:arrival",
    }),
  }),
);

const TIME_SEQUENCE_RECOGNITION_PROJECTION =
  TIME_SEQUENCE_RECOGNITION_RESULT.status === "AVAILABLE"
    ? TIME_SEQUENCE_RECOGNITION_RESULT.projection
    : null;

const createGenesisProjectionBundle = (
  fixture: typeof PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
) => {
  const birthMansionResultReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_MANSION" as const,
    referenceId: `prototype:birth-mansion:${fixture.fixtureId}`,
    sourceStarbeastDerivationReference:
      fixture.mansionSeedReference.sourceMansionResultReference.resultReference,
  });
  const birthMansionIgnitionResult = projectGenesisBirthMansionIgnition(
    Object.freeze({
      timeSequenceRecognitionProjection: TIME_SEQUENCE_RECOGNITION_PROJECTION,
      mansionResultReference: birthMansionResultReference,
    }),
  );
  const birthMansionIgnitionProjection =
    birthMansionIgnitionResult.status === "AVAILABLE"
      ? birthMansionIgnitionResult.projection
      : null;

  const fourSymbolResultReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" as const,
    sourceEngine: "guanyao_starbeast_engine" as const,
    resultReference:
      fixture.fourSymbolFieldReference.sourceFourSymbolResultReference
        .resultReference,
  });
  const fourSymbolAlignmentResult = projectGenesisFourSymbolAlignment(
    Object.freeze({
      birthMansionIgnitionProjection,
      fourSymbolResultReference,
    }),
  );
  const morphologicalFieldAlignmentProjection =
    fourSymbolAlignmentResult.status === "AVAILABLE"
      ? fourSymbolAlignmentResult.projection
      : null;

  const motherCodeProfileReference =
    fixture.identitySourceReference.lifeArchetypeForce
      .sourceMotherCodeProfileReference;
  const lifeArchetypeProfileReference =
    fixture.identitySourceReference.lifeArchetypeForce
      .sourceLifeArchetypeProfileReference;
  const lifeForceInfusionResult = projectGenesisLifeForceInfusion(
    Object.freeze({
      morphologicalFieldAlignmentProjection,
      motherCodeProfileReference,
      lifeArchetypeProfileReference,
    }),
  );
  const lifeForceInfusionProjection =
    lifeForceInfusionResult.status === "AVAILABLE"
      ? lifeForceInfusionResult.projection
      : null;

  const personalStarBeastIdentityReference =
    fixture.identitySourceReference.personalStarBeastReference;
  const personalRevealResult = projectGenesisPersonalReveal(
    Object.freeze({
      birthMansionIgnitionProjection,
      morphologicalFieldAlignmentProjection,
      lifeForceInfusionProjection,
      personalStarBeastIdentityReference,
    }),
  );
  const personalRevealProjection =
    personalRevealResult.status === "AVAILABLE"
      ? personalRevealResult.projection
      : null;

  const realityPressureReference = Object.freeze({
    referenceType: "GENESIS_REALITY_PRESSURE_REFERENCE" as const,
    referenceId: `prototype:reality-pressure:${fixture.fixtureId}`,
    sourceRole: "REALITY_PRESSURE_ENGINE_REFERENCE" as const,
    pressureReferenceOnly: true as const,
    noRawPressureCopy: true as const,
  });
  const realityPressureResult = projectGenesisRealityPressure(
    Object.freeze({
      personalRevealProjection,
      realityPressureReference,
    }),
  );
  const realityPressureProjection =
    realityPressureResult.status === "AVAILABLE"
      ? realityPressureResult.projection
      : null;

  return Object.freeze({
    timeSequenceRecognitionProjection: TIME_SEQUENCE_RECOGNITION_PROJECTION,
    birthMansionIgnitionProjection,
    morphologicalFieldAlignmentProjection,
    lifeForceInfusionProjection,
    personalRevealProjection,
    realityPressureProjection,
  });
};

const FORMAL_PROJECTION_BUNDLES = Object.freeze([
  createGenesisProjectionBundle(PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A),
  createGenesisProjectionBundle(PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B),
]);

const PHASE_COPY: Readonly<
  Record<
    FirstImpressionPhase,
    Readonly<{ prelude: string; title: string; note: string }>
  >
> = Object.freeze({
  ARRIVAL: Object.freeze({
    prelude: "在你看见它以前",
    title: "它已经沿着时间，向你走来。",
    note: "",
  }),
  FORMATION: Object.freeze({
    prelude: "星辰正在聚成一种存在",
    title: "先别急着认出它。",
    note: "让它慢慢靠近。",
  }),
  PRESENCE: Object.freeze({
    prelude: "你的生命显化",
    title: "原来，它一直在这里。",
    note: "它不是答案。它会陪你经历，你正在成为谁。",
  }),
});

const GENESIS_PREVIEW_STAGES: ReadonlyArray<{
  stage: GenesisRuntimeStage;
  symbol: string;
  title: string;
  note: string;
}> = Object.freeze([
  { stage: "MOON_ORIGIN", symbol: "月", title: "太阴入口", note: "进入太阴之境。" },
  { stage: "STAR_RIVER", symbol: "星", title: "星河秩序", note: "星辰开始显出关系。" },
  { stage: "TIME_RESONANCE", symbol: "时", title: "生命时序", note: "把时间交给星河。" },
  { stage: "SYMBOL_REVEAL", symbol: "象", title: "形态显影", note: "星辰关系形成生命姿态。" },
  { stage: "HEXAGRAM_IMPRINT", symbol: "卦", title: "变化印记", note: "变化留下连续的痕迹。" },
  { stage: "LIFE_FORCE", symbol: "力", title: "生命原力", note: "生命开始以自己的方式运行。" },
  { stage: "STAR_BEAST_REVEAL", symbol: "兽", title: "个人星兽归来", note: "它不是生成，只是终于被看见。" },
  { stage: "COMPLETION", symbol: "认领", title: "认领停驻", note: "停在这里，看见它与你的关系。" },
]);

const phaseForGenesisStage = (stage: GenesisRuntimeStage): FirstImpressionPhase => {
  if (stage === "MOON_ORIGIN") {
    return "ARRIVAL";
  }
  if (
    stage === "STAR_RIVER" ||
    stage === "TIME_RESONANCE" ||
    stage === "SYMBOL_REVEAL" ||
    stage === "HEXAGRAM_IMPRINT" ||
    stage === "LIFE_FORCE"
  ) {
    return "FORMATION";
  }
  return "PRESENCE";
};

const createPreviewIntegration = (
  stage: GenesisRuntimeStage,
): GenesisPreviewIntegration | null => {
  const input = createGenesisPreviewIntegrationFixture(stage);
  const initialized = initializeGenesisPreviewIntegration(input);
  if (initialized.status !== "READY") return null;
  if (stage === "COMPLETION") {
    const completed = completeGenesisPreviewIntegration(initialized.integration);
    return completed.status === "READY" ? completed.integration : null;
  }
  const started = startGenesisPreviewIntegration(initialized.integration);
  return started.status === "READY" ? started.integration : null;
};

const resolvePlan = (index: number): PersonalStarBeastRenderPlan | null => {
  const result = FORMAL_PLAN_RESULTS[index];
  return result?.status === "PLANNED" ? result.plan : null;
};

export function PersonalStarBeastWebGLPrototypeHarness() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formalCaseIndex, setFormalCaseIndex] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [phase, setPhase] = useState<FirstImpressionPhase>("ARRIVAL");
  const [harnessState, setHarnessState] = useState<HarnessState>("STARTING");
  const [previewStageIndex, setPreviewStageIndex] = useState(0);
  const [timeDelivered, setTimeDelivered] = useState(false);
  const [recognitionEntered, setRecognitionEntered] = useState(false);
  const [recognitionConfirmed, setRecognitionConfirmed] = useState(false);
  const [realityEntryConfirmed, setRealityEntryConfirmed] = useState(false);
  const [pressureObservationConfirmed, setPressureObservationConfirmed] =
    useState(false);
  const [previewIntegration, setPreviewIntegration] =
    useState<GenesisPreviewIntegration | null>(() =>
      createPreviewIntegration(GENESIS_PREVIEW_STAGES[0].stage),
    );
  const presentation = PHASE_COPY[phase];
  const plan = useMemo(() => resolvePlan(formalCaseIndex), [formalCaseIndex]);
  const projectionBundle = FORMAL_PROJECTION_BUNDLES[formalCaseIndex];
  const previewStage = GENESIS_PREVIEW_STAGES[previewStageIndex];
  const isCompletionStage = previewStage.stage === "COMPLETION";
  const rendererVisualRealization = useMemo(() => {
    const result = mapGenesisRendererVisualRealization({
      rendererConsumerContract: previewIntegration?.rendererConsumerState ?? null,
    });
    return result.status === "READY" ? result.realization : null;
  }, [previewIntegration]);
  const rendererPerspectiveCalibration = useMemo(() => {
    const result = mapGenesisPerspectiveCalibration({
      visualRealization: rendererVisualRealization,
    });
    return result.status === "READY" ? result.calibration : null;
  }, [rendererVisualRealization]);
  const rendererPresenceRecognitionCalibration = useMemo(() => {
    const result = mapGenesisPresenceRecognitionCalibration({
      perspectiveCalibration: rendererPerspectiveCalibration,
    });
    return result.status === "READY" ? result.calibration : null;
  }, [rendererPerspectiveCalibration]);
  const genesisSpaceUIRuntime = useMemo<GenesisSpaceUIRuntime | null>(() => {
    const result = resolveGenesisSpaceUIRuntime({
      currentGenesisStage: previewStage.stage,
      previewLifecycle: previewIntegration?.previewLifecycle ?? "INITIALIZED",
      timeDelivered,
      recognitionEntered,
      visualStateAvailable: rendererVisualRealization !== null,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  }, [
    previewStage.stage,
    previewIntegration?.previewLifecycle,
    timeDelivered,
    recognitionEntered,
    rendererVisualRealization,
  ]);
  const recognitionSpaceUIRuntime = useMemo<RecognitionSpaceUIRuntime | null>(() => {
    const result = resolveRecognitionSpaceUIRuntime({
      genesisCompleted: isCompletionStage,
      presenceAvailable: rendererPresenceRecognitionCalibration !== null,
      recognitionConfirmed,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  }, [isCompletionStage, rendererPresenceRecognitionCalibration, recognitionConfirmed]);
  const realityEntrySpaceUIRuntime = useMemo<RealityEntrySpaceUIRuntime | null>(() => {
    const result = resolveRealityEntrySpaceUIRuntime({
      recognitionConfirmed,
      presenceAvailable: rendererPresenceRecognitionCalibration !== null,
      realityEntryConfirmed,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  }, [recognitionConfirmed, rendererPresenceRecognitionCalibration, realityEntryConfirmed]);
  const realityReady = realityEntrySpaceUIRuntime?.realityReadiness === "READY";
  const pressureRecognitionUIRuntime = useMemo<PressureRecognitionUIRuntime | null>(() => {
    const result = resolvePressureRecognitionUIRuntime({
      realityReady,
      pressureObservationConfirmed,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  }, [pressureObservationConfirmed, realityReady]);
  const experiencePresentation = pressureObservationConfirmed
    ? Object.freeze({
        prelude: "压力观察",
        title: "现实正在作用于你。",
        note: "Gravity 已准备好；惯性观察尚未开始。",
      })
    : recognitionConfirmed
    ? Object.freeze({
        prelude: "现实入口",
        title: "带着这份看见，进入下一段。",
        note: realityEntryConfirmed
          ? "入口已经打开，压力体验尚未开始。"
          : "入口已经准备好，现实体验尚未开始。",
      })
    : recognitionEntered
    ? Object.freeze({
        prelude: "生命认领",
        title: "它已经在这里。",
        note: "先看见它，再进入下一段现实。",
      })
    : presentation;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      canvas === null ||
      plan === null ||
      projectionBundle === undefined ||
      PROTOTYPE_AUTHORIZATION.status !== "AUTHORIZED"
    ) {
      setHarnessState("UNAVAILABLE");
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bounds = canvas.getBoundingClientRect();
    // Legacy P104 gate marker only. Runtime consumption is case-specific via projectionBundle.
    // birthMansionIgnitionProjection: BIRTH_MANSION_IGNITION_PROJECTION
    const rendererResult = createIsolatedWebGLRendererPrototype(
      Object.freeze({
        canvas,
        renderPlan: plan,
        authorization: PROTOTYPE_AUTHORIZATION.authorization,
        width: Math.max(1, bounds.width),
        height: Math.max(1, bounds.height),
        pixelRatio: window.devicePixelRatio || 1,
        reducedMotion,
        timeSequenceRecognitionProjection:
          projectionBundle.timeSequenceRecognitionProjection,
        birthMansionIgnitionProjection:
          projectionBundle.birthMansionIgnitionProjection,
        morphologicalFieldAlignmentProjection:
          projectionBundle.morphologicalFieldAlignmentProjection,
        lifeForceInfusionProjection:
          projectionBundle.lifeForceInfusionProjection,
        personalRevealProjection: projectionBundle.personalRevealProjection,
        realityPressureProjection: projectionBundle.realityPressureProjection,
        genesisVisualRealization: rendererVisualRealization,
        genesisPerspectiveCalibration: rendererPerspectiveCalibration,
        genesisPresenceRecognitionCalibration:
          rendererPresenceRecognitionCalibration,
      }),
    );

    const stagePhase = phaseForGenesisStage(previewStage.stage);
    setPhase(stagePhase);
    if (rendererResult.status === "BLOCKED") {
      setHarnessState("UNAVAILABLE");
      return undefined;
    }
    if (rendererResult.status === "FALLBACK_REQUIRED") {
      setHarnessState("FALLBACK");
      return undefined;
    }

    setHarnessState("RENDERING");
    const controller = rendererResult.controller;
    let animationFrame = 0;
    let activePhase: FirstImpressionPhase = stagePhase;
    const startedAt = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const nextPhase = stagePhase;
      if (nextPhase !== activePhase) {
        activePhase = nextPhase;
        setPhase(nextPhase);
      }
      controller.renderFrame(elapsed);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      controller.resize(
        Math.max(1, entry.contentRect.width),
        Math.max(1, entry.contentRect.height),
        window.devicePixelRatio || 1,
      );
    });
    resizeObserver.observe(canvas);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controller.dispose();
    };
  }, [
    plan,
    previewStage.stage,
    projectionBundle,
    rendererVisualRealization,
    rendererPerspectiveCalibration,
    rendererPresenceRecognitionCalibration,
    replayKey,
  ]);

  useEffect(() => {
    if (
      genesisSpaceUIRuntime === null ||
      genesisSpaceUIRuntime.interactionAvailability !== "NONE" ||
      previewStage.stage === "TIME_RESONANCE" ||
      previewStage.stage === "COMPLETION"
    ) {
      return undefined;
    }
    const delay = previewStage.stage === "MOON_ORIGIN" ? 2200 : 1800;
    const timeout = window.setTimeout(() => {
      const nextIndex = previewStageIndex + 1;
      const nextStage = GENESIS_PREVIEW_STAGES[nextIndex];
      if (!nextStage) return;
      setPreviewStageIndex(nextIndex);
      setPreviewIntegration(createPreviewIntegration(nextStage.stage));
      setPhase(phaseForGenesisStage(nextStage.stage));
      setReplayKey((current) => current + 1);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [genesisSpaceUIRuntime, previewStage.stage, previewStageIndex]);

  const revealComplete = recognitionEntered;
  const replay = () => {
    setPhase(phaseForGenesisStage(previewStage.stage));
    setReplayKey((current) => current + 1);
  };
  const restartGenesisPreview = () => {
    setPreviewStageIndex(0);
    setTimeDelivered(false);
    setRecognitionEntered(false);
    setRecognitionConfirmed(false);
    setRealityEntryConfirmed(false);
    setPressureObservationConfirmed(false);
    setPreviewIntegration(
      createPreviewIntegration(GENESIS_PREVIEW_STAGES[0].stage),
    );
    replay();
  };
  const advanceGenesisPreview = () => {
    if (
      isCompletionStage ||
      genesisSpaceUIRuntime?.interactionAvailability !== "TIME_DELIVERY"
    ) {
      return;
    }
    const nextIndex = previewStageIndex + 1;
    const nextStage = GENESIS_PREVIEW_STAGES[nextIndex];
    if (!nextStage) return;
    setTimeDelivered(true);
    setPreviewStageIndex(nextIndex);
    setPreviewIntegration(createPreviewIntegration(nextStage.stage));
    replay();
  };
  const enterRecognition = () => {
    if (genesisSpaceUIRuntime?.interactionAvailability !== "RECOGNITION_ENTRY") {
      return;
    }
    setRecognitionEntered(true);
    setRecognitionConfirmed(false);
    setRealityEntryConfirmed(false);
    setPressureObservationConfirmed(false);
  };
  const confirmRecognition = () => {
    if (
      recognitionSpaceUIRuntime?.interactionAvailability !== "RECOGNITION_CONFIRM"
    ) {
      return;
    }
    setRecognitionConfirmed(true);
  };
  const enterReality = () => {
    if (
      realityEntrySpaceUIRuntime?.interactionAvailability !== "ENTER_REALITY"
    ) {
      return;
    }
    setRealityEntryConfirmed(true);
    setPressureObservationConfirmed(false);
  };
  const confirmPressureObservation = () => {
    if (
      pressureRecognitionUIRuntime?.interactionAvailability !==
      "PRESSURE_OBSERVATION_CONFIRM"
    ) {
      return;
    }
    setPressureObservationConfirmed(true);
  };
  const revealAnotherLife = () => {
    setFormalCaseIndex((current) => (current === 0 ? 1 : 0));
    setReplayKey((current) => current + 1);
  };

  return (
    <main
      className={`gy-p100 gy-p100--${phase.toLowerCase()}`}
      data-prototype-scope="ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY"
      data-harness-state={harnessState}
      data-first-impression-phase={phase}
      data-genesis-preview-mode="ISOLATED_GENESIS_PREVIEW"
      data-genesis-stage={previewStage.stage}
      data-genesis-lifecycle={previewIntegration?.previewLifecycle ?? "UNAVAILABLE"}
      data-genesis-visual-realization={rendererVisualRealization?.activeVisualLayer ?? "UNAVAILABLE"}
      data-genesis-perspective-calibration={
        rendererPerspectiveCalibration?.activeVisualLayer ?? "UNAVAILABLE"
      }
      data-genesis-presence-recognition-calibration={
        rendererPresenceRecognitionCalibration?.activeLayer ?? "UNAVAILABLE"
      }
      data-genesis-space="GENESIS_SPACE"
      data-genesis-ui-runtime-stage={
        genesisSpaceUIRuntime?.currentGenesisStage ?? "UNAVAILABLE"
      }
      data-genesis-ui-interaction={
        genesisSpaceUIRuntime?.interactionAvailability ?? "NONE"
      }
      data-genesis-ui-runtime-state={
        genesisSpaceUIRuntime?.runtimePresentationState ?? "UNAVAILABLE"
      }
      data-genesis-recognition-entry={
        genesisSpaceUIRuntime?.recognitionEntryState ?? "NOT_READY"
      }
      data-recognition-space={recognitionEntered ? "RECOGNITION_SPACE" : "NOT_ENTERED"}
      data-recognition-state={
        recognitionSpaceUIRuntime?.recognitionState ?? "NOT_READY"
      }
      data-reality-entry-availability={
        recognitionSpaceUIRuntime?.realityEntryAvailability ?? "NOT_READY"
      }
      data-recognition-interaction={
        recognitionSpaceUIRuntime?.interactionAvailability ?? "NONE"
      }
      data-reality-entry-space={
        recognitionConfirmed ? "REALITY_ENTRY_SPACE" : "NOT_ENTERED"
      }
      data-reality-entry-state={
        realityEntrySpaceUIRuntime?.entryState ?? "NOT_READY"
      }
      data-reality-readiness={
        realityEntrySpaceUIRuntime?.realityReadiness ?? "NOT_READY"
      }
      data-pressure-readiness={
        realityEntrySpaceUIRuntime?.pressureReadiness ?? "NOT_READY"
      }
      data-reality-entry-interaction={
        realityEntrySpaceUIRuntime?.interactionAvailability ?? "NONE"
      }
      data-pressure-space={realityEntryConfirmed ? "PRESSURE_SPACE" : "NOT_ENTERED"}
      data-pressure-stage={
        pressureRecognitionUIRuntime?.pressureStageState ?? "NOT_READY"
      }
      data-pressure-observation-state={
        pressureRecognitionUIRuntime?.observationState ?? "WAITING_FOR_REALITY"
      }
      data-pressure-tension-awareness={
        pressureRecognitionUIRuntime?.tensionAwareness ?? "UNSEEN"
      }
      data-gravity-readiness={
        pressureRecognitionUIRuntime?.gravityReadiness ?? "NOT_READY"
      }
      data-pressure-interaction={
        pressureRecognitionUIRuntime?.interactionAvailability ?? "NONE"
      }
    >
      <div className="gy-p100__cosmic-depth" aria-hidden="true" />
      <canvas ref={canvasRef} className="gy-p100__canvas" aria-hidden="true" />
      <div className="gy-p100__life-halo" aria-hidden="true" />
      <div className="gy-p100__veil" aria-hidden="true" />

      {harnessState === "FALLBACK" ? (
        <div className="gy-p100__static-presence" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : null}

      <header className="gy-p100__brand" aria-label="观爻">
        <span>观爻</span>
        <i />
      </header>

      <section className="gy-p100__words" aria-live="polite">
        <p className="gy-p100__prelude">{experiencePresentation.prelude}</p>
        <h1>{experiencePresentation.title}</h1>
        <p className="gy-p100__note">{experiencePresentation.note}</p>
      </section>

      {harnessState === "UNAVAILABLE" ? (
        <p className="gy-p100__unavailable" role="status">
          这束光暂时没有抵达。
        </p>
      ) : null}

      <section
        className="gy-p100__runtime-panel gy-p33__runtime-panel"
        aria-label="Genesis生命显化"
      >
        <div className="gy-p100__runtime-panel-head">
          <span>生命显化空间</span>
          <strong>{previewStage.symbol}</strong>
        </div>
        <h2>{previewStage.title}</h2>
        <p>{previewStage.note}</p>
        <div className="gy-p100__runtime-progress" aria-label="Genesis阶段进度">
          {GENESIS_PREVIEW_STAGES.map((item, index) => (
            <i
              key={item.stage}
              className={index <= previewStageIndex ? "is-active" : ""}
              aria-hidden="true"
            />
          ))}
        </div>
        <small>
          {previewStageIndex + 1} / {GENESIS_PREVIEW_STAGES.length} · {previewIntegration?.previewLifecycle ?? "UNAVAILABLE"}
        </small>
        {genesisSpaceUIRuntime?.interactionAvailability === "TIME_DELIVERY" ? (
          <button type="button" onClick={advanceGenesisPreview}>
            把时间交给星河
          </button>
        ) : null}
        {genesisSpaceUIRuntime?.interactionAvailability === "RECOGNITION_ENTRY" ? (
          <button type="button" onClick={enterRecognition}>
            进入生命认领
          </button>
        ) : null}
        {genesisSpaceUIRuntime?.recognitionEntryState === "RECOGNITION_ENTERED" ? (
          <p className="gy-p33__recognition-status" role="status">
            生命认领已停驻。
          </p>
        ) : null}
        {genesisSpaceUIRuntime?.interactionAvailability === "NONE" &&
        previewStage.stage !== "COMPLETION" ? (
          <p className="gy-p33__interaction-hint" role="status">
            让这一层自己发生。
          </p>
        ) : null}
      </section>

      {recognitionEntered && !recognitionConfirmed ? (
        <section
          className="gy-p34__recognition-space"
          aria-label="Recognition Space生命认领"
          data-recognition-space-panel="RECOGNITION_SPACE"
        >
          <div className="gy-p34__recognition-head">
            <span>生命认领空间</span>
            <strong>{recognitionConfirmed ? "准备" : "相遇"}</strong>
          </div>
          <h2>{recognitionConfirmed ? "这份看见，随你进入下一段。" : "它仍然在这里。"}</h2>
          <p>
            {recognitionConfirmed
              ? "Reality Entry 已准备好；这里不解释，也不替你决定。"
              : "不领取结果，不解释命运，只让这份生命存在被看见。"}
          </p>
          <small>Genesis 已完成 · 生命存在持续停驻</small>
          {recognitionSpaceUIRuntime?.interactionAvailability ===
          "RECOGNITION_CONFIRM" ? (
            <button
              type="button"
              data-interaction="RECOGNITION_CONFIRM"
              onClick={confirmRecognition}
            >
              带着这份看见进入现实准备
            </button>
          ) : null}
          {recognitionSpaceUIRuntime?.realityEntryAvailability === "READY" ? (
            <p className="gy-p34__reality-ready" role="status">
              Reality Entry 已准备好。
            </p>
          ) : null}
        </section>
      ) : null}

      {recognitionConfirmed && !realityEntryConfirmed ? (
        <section
          className="gy-p35__reality-entry-space"
          aria-label="Reality Entry Space现实入口"
          data-reality-entry-space-panel="REALITY_ENTRY_SPACE"
        >
          <div className="gy-p35__reality-entry-head">
            <span>现实入口</span>
            <strong>{realityEntryConfirmed ? "已打开" : "过渡"}</strong>
          </div>
          <h2>
            {realityEntryConfirmed
              ? "入口已经打开。"
              : "带着这份看见，进入你的现实。"}
          </h2>
          <p>
            {realityEntryConfirmed
              ? "Pressure Experience 已准备好；压力识别尚未开始。"
              : "不是测试，也不是分析。先让陪伴继续，再靠近现实。"}
          </p>
          <small>Recognition 已确认 · 不反向解释生命</small>
          {realityEntrySpaceUIRuntime?.interactionAvailability ===
          "ENTER_REALITY" ? (
            <button
              type="button"
              data-interaction="ENTER_REALITY"
              onClick={enterReality}
            >
              进入现实观察
            </button>
          ) : null}
          {realityEntrySpaceUIRuntime?.pressureReadiness === "READY" ? (
            <p className="gy-p35__pressure-ready" role="status">
              Pressure Experience 已准备好。
            </p>
          ) : null}
        </section>
      ) : null}

      {realityEntryConfirmed ? (
        <section
          className="gy-p36__pressure-space"
          aria-label="Pressure Recognition Space现实作用观察"
          data-pressure-recognition-space-panel="PRESSURE_RECOGNITION_SPACE"
        >
          <div className="gy-p36__pressure-head">
            <span>现实作用观察</span>
            <strong>
              {pressureObservationConfirmed ? "已看见" : "观察"}
            </strong>
          </div>
          <h2>
            {pressureObservationConfirmed
              ? "张力已经被看见。"
              : "先看见，什么正在作用于你。"}
          </h2>
          <p>
            {pressureObservationConfirmed
              ? "接下来观察：我如何回应这些作用。Gravity 尚未执行。"
              : "不急着解释，也不急着判断。先让现实信号与内在张力浮现。"}
          </p>
          <div className="gy-p36__signal-list" aria-label="现实信号观察范围">
            <span>外部变化</span>
            <span>内在张力</span>
            <span>尚未命名的拉扯</span>
          </div>
          <small>Reality Ready · 不生成压力结论</small>
          {pressureRecognitionUIRuntime?.interactionAvailability ===
          "PRESSURE_OBSERVATION_CONFIRM" ? (
            <button
              type="button"
              data-interaction="PRESSURE_OBSERVATION_CONFIRM"
              onClick={confirmPressureObservation}
            >
              确认这份观察
            </button>
          ) : null}
          {pressureRecognitionUIRuntime?.gravityReadiness === "READY" ? (
            <p className="gy-p36__gravity-ready" role="status">
              Gravity Experience 已准备好。
            </p>
          ) : null}
        </section>
      ) : null}

      <nav
        className={`gy-p100__actions ${revealComplete ? "is-visible" : ""}`}
        aria-label="显化体验控制"
      >
        <button type="button" onClick={restartGenesisPreview}>重新开始Genesis</button>
        <button type="button" onClick={replay}>再看一次</button>
        <span hidden aria-hidden="true">看看另一种生命</span>
      </nav>

      <div className="gy-p100__breath-mark" aria-hidden="true">
        <i />
      </div>
    </main>
  );
}
