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
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
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

const BIRTH_MANSION_RESULT_REFERENCE = Object.freeze({
  referenceType: "STAR_BEAST_GENESIS_MANSION" as const,
  referenceId: "prototype:birth-mansion:case-a",
  sourceStarbeastDerivationReference:
    PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.mansionSeedReference
      .sourceMansionResultReference.resultReference,
});

const BIRTH_MANSION_IGNITION_RESULT = projectGenesisBirthMansionIgnition(
  Object.freeze({
    timeSequenceRecognitionProjection: TIME_SEQUENCE_RECOGNITION_PROJECTION,
    mansionResultReference: BIRTH_MANSION_RESULT_REFERENCE,
  }),
);

const BIRTH_MANSION_IGNITION_PROJECTION =
  BIRTH_MANSION_IGNITION_RESULT.status === "AVAILABLE"
    ? BIRTH_MANSION_IGNITION_RESULT.projection
    : null;

const FOUR_SYMBOL_RESULT_REFERENCE = Object.freeze({
  referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" as const,
  sourceEngine: "guanyao_starbeast_engine" as const,
  resultReference:
    PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.fourSymbolFieldReference
      .sourceFourSymbolResultReference.resultReference,
});

const FOUR_SYMBOL_ALIGNMENT_RESULT = projectGenesisFourSymbolAlignment(
  Object.freeze({
    birthMansionIgnitionProjection: BIRTH_MANSION_IGNITION_PROJECTION,
    fourSymbolResultReference: FOUR_SYMBOL_RESULT_REFERENCE,
  }),
);

const FOUR_SYMBOL_ALIGNMENT_PROJECTION =
  FOUR_SYMBOL_ALIGNMENT_RESULT.status === "AVAILABLE"
    ? FOUR_SYMBOL_ALIGNMENT_RESULT.projection
    : null;

const MOTHER_CODE_PROFILE_REFERENCE =
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.identitySourceReference
    .lifeArchetypeForce.sourceMotherCodeProfileReference;

const LIFE_ARCHETYPE_PROFILE_REFERENCE =
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.identitySourceReference
    .lifeArchetypeForce.sourceLifeArchetypeProfileReference;

const LIFE_FORCE_INFUSION_RESULT = projectGenesisLifeForceInfusion(
  Object.freeze({
    morphologicalFieldAlignmentProjection: FOUR_SYMBOL_ALIGNMENT_PROJECTION,
    motherCodeProfileReference: MOTHER_CODE_PROFILE_REFERENCE,
    lifeArchetypeProfileReference: LIFE_ARCHETYPE_PROFILE_REFERENCE,
  }),
);

const LIFE_FORCE_INFUSION_PROJECTION =
  LIFE_FORCE_INFUSION_RESULT.status === "AVAILABLE"
    ? LIFE_FORCE_INFUSION_RESULT.projection
    : null;

const PERSONAL_STAR_BEAST_IDENTITY_REFERENCE =
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.identitySourceReference
    .personalStarBeastReference;

const PERSONAL_REVEAL_RESULT = projectGenesisPersonalReveal(
  Object.freeze({
    birthMansionIgnitionProjection: BIRTH_MANSION_IGNITION_PROJECTION,
    morphologicalFieldAlignmentProjection: FOUR_SYMBOL_ALIGNMENT_PROJECTION,
    lifeForceInfusionProjection: LIFE_FORCE_INFUSION_PROJECTION,
    personalStarBeastIdentityReference:
      PERSONAL_STAR_BEAST_IDENTITY_REFERENCE,
  }),
);

const PERSONAL_REVEAL_PROJECTION =
  PERSONAL_REVEAL_RESULT.status === "AVAILABLE"
    ? PERSONAL_REVEAL_RESULT.projection
    : null;

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
  const presentation = PHASE_COPY[phase];
  const plan = useMemo(() => resolvePlan(formalCaseIndex), [formalCaseIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      canvas === null ||
      plan === null ||
      PROTOTYPE_AUTHORIZATION.status !== "AUTHORIZED"
    ) {
      setHarnessState("UNAVAILABLE");
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bounds = canvas.getBoundingClientRect();
    const rendererResult = createIsolatedWebGLRendererPrototype(
      Object.freeze({
        canvas,
        renderPlan: plan,
        authorization: PROTOTYPE_AUTHORIZATION.authorization,
        width: Math.max(1, bounds.width),
        height: Math.max(1, bounds.height),
        pixelRatio: window.devicePixelRatio || 1,
        reducedMotion,
        timeSequenceRecognitionProjection: TIME_SEQUENCE_RECOGNITION_PROJECTION,
        birthMansionIgnitionProjection: BIRTH_MANSION_IGNITION_PROJECTION,
        morphologicalFieldAlignmentProjection: FOUR_SYMBOL_ALIGNMENT_PROJECTION,
        lifeForceInfusionProjection: LIFE_FORCE_INFUSION_PROJECTION,
        personalRevealProjection: PERSONAL_REVEAL_PROJECTION,
      }),
    );

    setPhase("ARRIVAL");
    if (rendererResult.status === "BLOCKED") {
      setHarnessState("UNAVAILABLE");
      return undefined;
    }
    if (rendererResult.status === "FALLBACK_REQUIRED") {
      setHarnessState("FALLBACK");
      const formationTimer = window.setTimeout(() => setPhase("FORMATION"), 1400);
      const presenceTimer = window.setTimeout(() => setPhase("PRESENCE"), 3300);
      return () => {
        window.clearTimeout(formationTimer);
        window.clearTimeout(presenceTimer);
      };
    }

    setHarnessState("RENDERING");
    const controller = rendererResult.controller;
    let animationFrame = 0;
    let activePhase: FirstImpressionPhase = "ARRIVAL";
    const startedAt = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const nextPhase: FirstImpressionPhase =
        elapsed >= 5200
          ? "PRESENCE"
          : elapsed >= 2100
            ? "FORMATION"
            : "ARRIVAL";
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
  }, [plan, replayKey]);

  const revealComplete = phase === "PRESENCE";
  const replay = () => setReplayKey((current) => current + 1);
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
        <p className="gy-p100__prelude">{presentation.prelude}</p>
        <h1>{presentation.title}</h1>
        <p className="gy-p100__note">{presentation.note}</p>
      </section>

      {harnessState === "UNAVAILABLE" ? (
        <p className="gy-p100__unavailable" role="status">
          这束光暂时没有抵达。
        </p>
      ) : null}

      <nav
        className={`gy-p100__actions ${revealComplete ? "is-visible" : ""}`}
        aria-label="显化体验控制"
      >
        <button type="button" onClick={replay}>再看一次</button>
        <button type="button" onClick={revealAnotherLife}>看看另一种生命</button>
      </nav>

      <div className="gy-p100__breath-mark" aria-hidden="true">
        <i />
      </div>
    </main>
  );
}
