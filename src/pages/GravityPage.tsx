/**
 * GravityPage = passive UI visualization layer for presenting existing causal state transitions
 * without any influence on engine or data flow.
 */
import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  runCosmicBotanicsRuntimeEngine,
  type CosmicPetalState,
} from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import { resolveHexagramAssetCandidate } from "../services/guanyaoHexagramAssetCandidateResolver";
import {
  resolveDynamicsInputReadiness,
  type DynamicsInputReadiness,
} from "../services/guanyaoDynamicsInputReadinessAdapter";
import { resolveCurrentHexagramFormation } from "../services/guanyaoCurrentHexagramFormationAdapter";
import { resolveDynamicsChangeExperienceRuntime } from "../services/guanyaoDynamicsChangeExperienceRuntimeAdapter";
import { resolveDynamicsMotherPresentation } from "../services/guanyaoDynamicsMotherPresentationAdapter";
import { resolveDynamicsExperienceState } from "../services/guanyaoDynamicsExperienceStateAdapter";
import { resolveDynamicsExperienceReadinessPresentation } from "../services/guanyaoDynamicsExperienceReadinessPresentationAdapter";
import { resolveDynamicsValueFlow } from "../services/guanyaoDynamicsValueFlowAdapter";
import { resolveDynamicsVisualState } from "../services/guanyaoDynamicsVisualStateAdapter";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import {
  DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS,
  resolveDynamicsSixSpaceProgress,
} from "../services/guanyaoDynamicsSixSpaceProgressAdapter";
import { resolveDynamicsCurrentHexagramPresentation } from "../services/guanyaoDynamicsCurrentHexagramPresentationAdapter";
import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { SingleModelRevisionAction } from "../types/dynamicsRevisionAction";
import type { DynamicsExperienceState as ExperienceState } from "../types/dynamicsExperiencePresentation";
import type { RealLifeVisualSource } from "../types/realLifeVisualSourceAdapter";
import type { DynamicsVisualState as VisualState } from "../types/dynamicsVisualState";
import type { SelectedPressureSeedContext } from "../types/primaryPetal";
import {
  GuanyaoRuntimeEngine,
  type ExecutionSnapshot,
  type SixSpaceConfig,
  type SixSpaceId,
  type SpatialIntent,
} from "../runtime/guanyaoRuntimeEngine";
import type { ChangeExperiencePresentation } from "../types/changeExperience";
import type { DynamicsInputContext } from "../types/gravityRuntimeInput";
import type {
  GravityEntryVisualContinuity,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravityLifeSurfaceOutcome,
  GravityObservationSurfaceOutcome,
  GravitySurfaceAdmissionAttempt,
} from "../types/xinmaiGravitySurfaceAdmission";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { recoverRealityRecognizedIdentity } from "../services/realityRecognizedIdentityRecoveryAdapter";
import {
  commitChoiceActionIntention,
} from "../services/xinmaiChoiceActionIntentionController";
import { confirmXinmaiChoiceExplicitDeparture } from "../services/xinmaiChoiceReturningProvenanceController";
import { readXinmaiChoiceReturningProvenanceRecovery } from "../services/xinmaiChoiceReturningProvenanceRecoveryAdapter";
import type { XinmaiChoiceReturningProvenanceAdmission } from "../types/xinmaiChoiceReturningProvenance";
import {
  resolveChoicePresentationReadiness,
} from "../services/xinmaiChoicePresentationReadinessResolver";
import type { ChoiceActionIntention } from "../types/xinmaiChoiceActionIntention";
import type {
  ChoiceGrowthTerminalSummary,
} from "../types/xinmaiChoicePresentationReadiness";
import type {
  ChoiceActionRouteCandidate,
  ChoiceActionRouteResolution,
} from "../types/xinmaiChoiceActionRoute";
import type {
  GravityObservationRecognitionOutcome,
  GravityObservationRecognitionProvenance,
  GravityObservationResumeDecision,
} from "../types/xinmaiGravityObservationContinuity";
import { RealityGravityInertiaField } from "../components/RealityGravityInertiaField";
import { XinmaiLifeReflectionGuide } from "../components/XinmaiLifeReflectionGuide";
import {
  LIFE_UNIVERSE_CORE_IDENTITY,
  resolveLifeUniverseCrystalImprintGeometry,
  resolveLifeUniverseCrystalSourceSlot,
} from "../renderers/lifeUniverseStarField";
import { LegacyDynamicsDormant } from "./legacy/LegacyDynamicsDormant";
import "../styles/reality-pressure-presentation.css";

const USE_COSMIC_BOTANICS_SIX_SPACE = true;
const LEGACY_DYNAMICS_FLOW_ISOLATED = true;
const LEGACY_DIRECT_CHOICE_TO_CRYSTAL_FLOW_ISOLATED = true;

function playCrystalUnderstandingTone() {
  try {
    const AudioContextConstructor =
      window.AudioContext ??
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startedAt = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(392, startedAt);
    oscillator.frequency.exponentialRampToValueAtTime(349.23, startedAt + 0.72);
    gain.gain.setValueAtTime(0.0001, startedAt);
    gain.gain.exponentialRampToValueAtTime(0.018, startedAt + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, startedAt + 0.82);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(startedAt);
    oscillator.stop(startedAt + 0.86);
    oscillator.addEventListener("ended", () => {
      context.close().catch(() => {});
    });
  } catch {
    // Sound is an optional single acknowledgement; visual continuity remains
    // complete when audio is unavailable or disabled by the browser.
  }
}

const RealityLifeUniverseCanvas = lazy(() =>
  import("../components/RealityLifeUniverseCanvas").then((module) => ({
    default: module.RealityLifeUniverseCanvas,
  })),
);

export type GravityPageProps = Readonly<{
  dynamicsInputContext: DynamicsInputContext;
  visualContinuity: GravityEntryVisualContinuity | null;
  innerViewEntry:
    | "CURRENT_LIFE_WEATHER_BODY_APPROACHED"
    | null;
  choiceReturn:
    | "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED"
    | null;
  experienceSmokeFixture: string | null;
  surfaceAttempt?: GravitySurfaceAdmissionAttempt;
  observationContinuityDecision: GravityObservationResumeDecision;
  growthTerminalSummary: ChoiceGrowthTerminalSummary;
  actionRouteResolution: ChoiceActionRouteResolution;
  growthSummaryPending: boolean;
  onGrowthTerminalSummaryRefreshRequested: () => Promise<void>;
  onObservationRecognitionRequested: (
    recognition: GravityObservationRecognitionProvenance,
    expectedCheckpointRevision: number,
  ) => Promise<GravityObservationRecognitionOutcome>;
  onLifeSurfaceOutcome?: (
    outcome: GravityLifeSurfaceOutcome,
  ) => void;
  onObservationSurfaceOutcome?: (
    outcome: GravityObservationSurfaceOutcome,
  ) => void;
}>;

const SIX_SPACE_SHORT_LABELS: Record<SixSpaceId, string> = {
  body: "身体",
  emotion: "情绪",
  thought: "思维",
  action: "行动",
  memory: "记忆",
  goal: "动机",
};

function createNodeRunningExecutionSnapshot(context: SelectedPressureSeedContext | null) {
  const seedSnapshot = GuanyaoRuntimeEngine.createSnapshot(context);
  const engineReadySnapshot = GuanyaoRuntimeEngine.run(seedSnapshot, {
    type: "SET_ENGINE_PHASE",
    payload: { enginePhase: "NODE_RUNNING" },
  });

  return GuanyaoRuntimeEngine.run(engineReadySnapshot, {
    type: "SET_UI_PHASE",
    payload: { uiPhase: "NODE_RUNNING" },
  });
}

function completeCurrentSpaceWithExistingEngine(
  snapshot: ExecutionSnapshot,
  context: SpatialIntent["payload"],
) {
  let observedSnapshot = snapshot;

  for (let nodeStep = observedSnapshot.node.current; nodeStep < 6; nodeStep += 1) {
    observedSnapshot = GuanyaoRuntimeEngine.run(observedSnapshot, {
      type: "CORE_STAR_BLOOM",
      payload: context,
    });
  }

  return GuanyaoRuntimeEngine.advance(observedSnapshot);
}

type CosmicNarrativePhase = "field_intro" | "seed_visible" | "beast_guide" | "node_active" | "node_complete";

type ProductRuntimeDefinition = Readonly<{
  officialDefinition: string;
  threeSecondModel: string;
  experienceLoop: readonly string[];
  onboardingFlow: readonly string[];
  userPerception: readonly string[];
  positioning: string;
}>;

const GUANYAO_PRODUCT_RUNTIME_DEFINITION = Object.freeze({
  officialDefinition:
    "观爻让你看见现实如何在同一个生命的六个窗口留下痕迹，以及这些回应如何逐渐形成惯性。",
  threeSecondModel: "现实发生 → 六维生命显影 → 重复回应留下惯性",
  experienceLoop: Object.freeze([
    "现实事实被看见",
    "生命反应逐层显影",
    "保护性回应留下痕迹",
    "相似回应逐渐形成惯性",
    "为新的回应留出间隙",
  ]),
  onboardingFlow: Object.freeze([
    "认出当前压力",
    "先观察一个生命窗口",
    "看见熟悉回应",
    "理解它也许曾经保护自己",
  ]),
  userPerception: Object.freeze([
    "同一个生命仍在",
    "现实影响可以被观察",
    "这些回应也许曾经保护我",
    "惯性可以被看见而不是被定命",
  ]),
  positioning: "六维生命显影与保护性惯性觉察",
} satisfies ProductRuntimeDefinition);

function CosmicPageStarField() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
      {Array.from({ length: 42 }).map((_, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: `${4 + ((index * 19) % 92)}%`,
            top: `${5 + ((index * 31) % 88)}%`,
            width: index % 9 === 0 ? 3 : 2,
            height: index % 9 === 0 ? 3 : 2,
            borderRadius: 999,
            background: index % 6 === 0 ? "rgba(199,169,107,0.5)" : "rgba(245,245,245,0.32)",
            boxShadow: index % 6 === 0 ? "0 0 12px rgba(199,169,107,0.32)" : "0 0 8px rgba(245,245,245,0.18)",
          }}
        />
      ))}
    </div>
  );
}

function CosmicFieldKeyframes() {
  return (
    <style>{`
      @keyframes gy-nebula-drift {
        0%, 100% { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.48; }
        50% { transform: translate3d(1%, 1%, 0) scale(1.04); opacity: 0.68; }
      }
      @keyframes gy-blackhole-spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes gy-stardust-drift {
        0%, 100% { transform: translateX(-2px); opacity: 0.42; }
        50% { transform: translateX(4px); opacity: 0.78; }
      }
      @keyframes gy-starbeast-line {
        0% { stroke-dashoffset: 220; opacity: 0; }
        100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes gy-starbeast-breathe {
        0%, 100% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.72; }
        50% { transform: translate(-50%, calc(-50% - 3px)) scale(1.03); opacity: 0.92; }
      }
      @keyframes gy-starbeast-ripple {
        0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.34; }
        100% { transform: translate(-50%, -50%) scale(1.32); opacity: 0; }
      }
      @keyframes gy-starbeast-dust {
        0%, 100% { transform: translate(-50%, -50%) scale(0.82); opacity: 0.36; }
        50% { transform: translate(calc(-50% + 2px), calc(-50% - 2px)) scale(1.08); opacity: 0.86; }
      }
      @keyframes gy-near-mansion-arrival {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.28); }
        62% { opacity: 1; transform: translate(-50%, -50%) scale(calc(var(--near-mansion-depth, 1) + 0.16)); }
        100% { opacity: 0.92; transform: translate(-50%, -50%) scale(var(--near-mansion-depth, 1)); }
      }
      @keyframes gy-near-mansion-breathe {
        0%, 100% { opacity: 0.74; }
        50% { opacity: 1; }
      }
      @keyframes gy-near-mansion-invitation {
        0%, 70%, 100% { transform: translate(-50%, -50%) scale(0.78); opacity: 0; }
        18% { opacity: 0.3; }
        42% { transform: translate(-50%, -50%) scale(1.48); opacity: 0; }
      }
      [data-life-core-hit-area="TRANSPARENT"]:focus { outline: none; }
      [data-life-core-hit-area="TRANSPARENT"]:focus-visible {
        outline: none;
        background: radial-gradient(
          circle at 50% 50%,
          transparent 0 18px,
          rgba(255,247,220,0.46) 19px,
          transparent 20px
        );
      }
      @keyframes gy-crystal-imprint {
        0% { stroke-dashoffset: 140; opacity: 0; }
        42% { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0.92; }
      }
      @keyframes gy-crystal-imprint-pulse {
        0%, 100% { opacity: 0.52; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.16); }
      }
      @keyframes gy-copy-fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes gy-gravity-continuity-arrival {
        0%, 64% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}</style>
  );
}

function CosmicNebulaScene({ toneColor }: { toneColor: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: "-10%",
        background:
          `radial-gradient(circle at 28% 30%, rgba(${toneColor},0.1), transparent 24%), radial-gradient(circle at 74% 62%, rgba(120,92,150,0.12), transparent 28%), radial-gradient(circle at 50% 50%, rgba(176,210,206,0.08), transparent 34%)`,
        filter: "blur(12px)",
        animation: "gy-nebula-drift 8s ease-in-out infinite",
        pointerEvents: "none",
      }}
    />
  );
}

function CosmicAmbientStars() {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.38, pointerEvents: "none" }}>
      {Array.from({ length: 28 }).map((_, index) => {
        const left = 8 + ((index * 17) % 84);
        const top = 10 + ((index * 29) % 78);
        return (
          <span
            key={index}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: index % 7 === 0 ? 3 : 2,
              height: index % 7 === 0 ? 3 : 2,
              borderRadius: 999,
              background: "rgba(245,245,245,0.62)",
              boxShadow: "0 0 10px rgba(245,245,245,0.36)",
            }}
          />
        );
      })}
    </div>
  );
}

function BlackholeVortexScene({ toneColor, visible, status }: { toneColor: string; visible: boolean; status: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "32%",
        width: "78%",
        minHeight: 108,
        transform: "translateX(-50%)",
        display: visible ? "grid" : "none",
        placeItems: "center",
        color: "rgba(245,245,245,0.86)",
        pointerEvents: "none",
        textAlign: "center",
        animation: "gy-copy-fade-in 360ms ease both",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 124,
          height: 124,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(5,6,7,0.92) 0 27%, rgba(40,22,64,0.72) 44%, rgba(199,169,107,0.1) 58%, transparent 72%)",
          boxShadow: "inset 0 0 32px rgba(5,6,7,0.9), 0 0 38px rgba(80,58,120,0.34)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 148,
          height: 148,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(199,169,107,0.12)",
          borderTopColor: "rgba(176,210,206,0.28)",
          animation: "gy-blackhole-spin 12s linear infinite",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          placeItems: "center",
          gap: 6,
          width: "100%",
          maxWidth: 188,
          color: "rgba(245,245,245,0.82)",
          fontSize: 12,
          lineHeight: 1.46,
          fontWeight: 520,
          textShadow: `0 0 16px rgba(${toneColor},0.18)`,
          animation: "gy-stardust-drift 4s ease-in-out infinite",
        }}
      >
        <span>{status}</span>
      </span>
    </div>
  );
}

function NodeProgressionPanel({
  visible,
  toneColor,
  activeNode,
  phase,
  onApproach,
  onConfirm,
  onSelfName,
  onPause,
  onResume,
  onContinue,
}: {
  visible: boolean;
  toneColor: string;
  activeNode: {
    text: string;
    dimensionInsight?: string;
    dimensionUnderstanding?: string;
  };
  phase:
    | "OBSERVING"
    | "FIRST_APPROACH"
    | "SECOND_APPROACH"
    | "THIRD_APPROACH"
    | "CONFIRMED"
    | "SELF_NAMED"
    | "PAUSED";
  onApproach: () => void;
  onConfirm: () => void;
  onSelfName: () => void;
  onPause: () => void;
  onResume: () => void;
  onContinue: () => void;
}) {
  const [firstPauseInvitationVisible, setFirstPauseInvitationVisible] = useState(false);
  const hasShownFirstPauseInvitationRef = useRef(false);
  const livingSentence = activeNode.dimensionInsight ?? activeNode.text.replace(/\s*\n\s*/g, "");

  useEffect(() => {
    if (!visible) {
      setFirstPauseInvitationVisible(false);
      return undefined;
    }
    if (hasShownFirstPauseInvitationRef.current) return undefined;

    hasShownFirstPauseInvitationRef.current = true;
    setFirstPauseInvitationVisible(true);
    const timer = window.setTimeout(() => {
      setFirstPauseInvitationVisible(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <div
      data-dynamics-node-language="LIFE_UNIVERSE_WHISPER"
      data-dynamics-node-composition="SINGLE_LIVING_SENTENCE"
      data-dynamics-six-dimension-role="LIFE_STATE_REVEAL_NOT_ANALYSIS"
      data-dynamics-evidence-level="SIX_DIMENSION_OBSERVATION"
      data-dynamics-dust-explanation="PROTECTIVE_RESPONSE_CANDIDATE_ONLY"
      data-dynamics-dust-layer="UNRESOLVED"
      data-dynamics-user-confirmation="REQUIRED_BEFORE_DUST_MEANING"
      data-dynamics-inner-view-phase={phase}
      data-dynamics-inner-view-approach-depth={
        phase === "OBSERVING"
          ? 0
          : phase === "FIRST_APPROACH"
            ? 1
            : phase === "SECOND_APPROACH" || phase === "PAUSED"
              ? 2
              : 3
      }
      data-dynamics-choice-gate={
        phase === "CONFIRMED" || phase === "SELF_NAMED"
          ? "RELATION_ESTABLISHED"
          : "WAITING_FOR_USER_RELATION"
      }
      data-dynamics-first-pause-invitation={
        firstPauseInvitationVisible ? "VISIBLE_ONCE" : "DELEGATED_TO_GENESIS_BREATH"
      }
      style={{
        position: "absolute",
        left: 44,
        right: 44,
        bottom: "max(42px, calc(22px + env(safe-area-inset-bottom)))",
        justifyItems: "center",
        gap: 0,
        pointerEvents: "auto",
        padding: 0,
        textAlign: "center",
        textShadow: "0 0 18px rgba(2,3,6,0.96)",
        display: visible ? "grid" : "none",
        animation: "gy-copy-fade-in 520ms ease both",
      }}
    >
      <XinmaiLifeReflectionGuide
        surface="REFLECTION"
        phase={phase}
        observation={livingSentence}
        understanding={activeNode.dimensionUnderstanding}
        onApproach={onApproach}
        onConfirm={onConfirm}
        onSelfName={onSelfName}
        onPause={onPause}
        onResume={onResume}
        onContinue={onContinue}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "50%",
          transform: `translate(-50%, ${firstPauseInvitationVisible ? 0 : 4}px)`,
          width: "100%",
          color: `rgba(${toneColor},0.56)`,
          fontSize: 9.5,
          lineHeight: 1.5,
          letterSpacing: "0.06em",
          opacity: firstPauseInvitationVisible ? 1 : 0,
          transition: "opacity 560ms ease, transform 560ms ease",
        }}
      >
        轻触那颗正在呼吸的星
      </span>
    </div>
  );
}

function SixDimensionGravityField({
  configs,
  activeConfig,
  petalStates,
  toneColor,
  shortPetalNames,
}: {
  configs: SixSpaceConfig[];
  activeConfig: SixSpaceConfig;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  toneColor: string;
  shortPetalNames: string[];
}) {
  const activeDirectionIndex = Math.max(
    0,
    configs.findIndex((config) => config.id === activeConfig.id),
  );
  const observedCount = configs.filter(
    (config) => petalStates[config.id] === "blooming",
  ).length;

  return (
    <div
      aria-hidden="true"
      data-dynamics-six-space-language="GRAVITY_DIRECTIONS"
      data-dynamics-six-space-presentation="OBSERVATION_ENTRANCE"
      data-dynamics-six-space-force-language="GENESIS_WEBGL_STELLAR_SKELETON"
      data-dynamics-six-space-overlay="DIRECTION_LABELS_ONLY"
      data-dynamics-six-space-presentation-mode="ONE_ACTIVE_ENTRANCE_ONLY"
      data-dynamics-six-space-temporal-language="CURRENT_PAST_AFTERGLOW_FUTURE_DEEP_SPACE"
      data-dynamics-six-space-visible-time="CURRENT_ONLY"
      data-dynamics-six-space-past-state="PAST_AFTERGLOW"
      data-dynamics-six-space-future-state="FUTURE_DEEP_SPACE"
      data-dynamics-life-core-anchor="LIFE_UNIVERSE_CORE_IDENTITY"
      data-dynamics-observed-entrance-count={observedCount}
      data-visual-primitive="DIMENSION"
      data-visual-layer="dimension-observation-entrance"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <span
        data-six-space-temporal-state="CURRENT"
        style={{
          position: "absolute",
          left: "50%",
          top: "69%",
          transform: "translate(-50%, -50%)",
          color: `rgba(${toneColor},0.64)`,
          fontSize: 9,
          fontWeight: 540,
          lineHeight: 1,
          textAlign: "center",
          letterSpacing: "0.12em",
          whiteSpace: "nowrap",
          textShadow: `0 0 14px rgba(${toneColor},0.26)`,
        }}
      >
        观察入口 · {shortPetalNames[activeDirectionIndex]}
      </span>
    </div>
  );
}

function LifeCoreInteractionLayer({
  coreStars,
  birthCoreSlot,
  interactive,
  rendererOwnsVisual,
  toneColor,
  reveal,
  nodeCharge,
  coreGlow,
  pressureDepth,
  onCoreStarClick,
}: {
  coreStars: readonly (readonly [number, number, number])[];
  birthCoreSlot: number;
  interactive: boolean;
  rendererOwnsVisual: boolean;
  toneColor: string;
  reveal: number;
  nodeCharge: number;
  coreGlow: number;
  pressureDepth: number;
  onCoreStarClick: () => void;
}) {
  if (rendererOwnsVisual) {
    return interactive ? (
      <span
        role="button"
        aria-label="触碰本命生命星群，观察现实引力如何展开"
        tabIndex={0}
        data-life-core-hit-area="TRANSPARENT"
        data-life-visual-authority="GENESIS_WEBGL"
        data-life-interaction-target="WEBGL_LIFE_BODY"
        data-mansion-near-layer="GENESIS_WEBGL_ACTIVE_SEVEN"
        data-life-core-invitation="GENESIS_WEBGL_BREATH"
        onClick={onCoreStarClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onCoreStarClick();
          }
        }}
        style={{
          position: "absolute",
          left: `${LIFE_UNIVERSE_CORE_IDENTITY.anchorX * 100}%`,
          top: `${LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100}%`,
          width: "min(62vw, 232px)",
          height: "min(28vh, 196px)",
          borderRadius: "46%",
          transform: "translate(-50%, -50%)",
          background: "transparent",
          boxShadow: "none",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      />
    ) : null;
  }

  return (
    <>
      {coreStars.map(([left, top, size], index) => {
        const isBirthCore = index === birthCoreSlot;
        const visualSize =
          size + nodeCharge * 1.2 + pressureDepth * 1.4 +
          (isBirthCore ? 1.8 : 0);
        const radialAngle =
          (Math.atan2(top - 49, left - 50) * 180) / Math.PI;
        const depthScale = 1 + pressureDepth * 0.1 + nodeCharge * 0.04;
        return (
          <span
            key={`core-${index}`}
            role={interactive ? "button" : undefined}
            aria-label={interactive ? `本命七宿星位 ${index + 1}` : undefined}
            tabIndex={interactive ? 0 : undefined}
            data-life-core-hit-area="TRANSPARENT"
            data-mansion-near-layer="ACTIVE_SEVEN_MANSION"
            onClick={interactive ? onCoreStarClick : undefined}
            onKeyDown={(event) => {
              if (!interactive) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onCoreStarClick();
              }
            }}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: 34,
              height: 34,
              borderRadius: 999,
              transform: "translate(-50%, -50%)",
              background: "transparent",
              boxShadow: "none",
              cursor: interactive ? "pointer" : "default",
              pointerEvents: interactive ? "auto" : "none",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 12 + pressureDepth * 7,
                height: 1,
                transform: `translate(-100%, -50%) rotate(${radialAngle}deg)`,
                transformOrigin: "100% 50%",
                background: `linear-gradient(90deg, transparent, rgba(${toneColor},${0.12 + pressureDepth * 0.2}))`,
                opacity: 0.36 + pressureDepth * 0.42,
                pointerEvents: "none",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                "--near-mansion-depth": depthScale,
                position: "absolute",
                left: "50%",
                top: "50%",
                width: visualSize,
                height: visualSize,
                borderRadius: 999,
                background: `radial-gradient(circle, rgba(255,251,238,${0.72 + reveal * 0.24}) 0 34%, rgba(${toneColor},${0.28 + reveal * 0.2}) 44%, transparent 72%)`,
                boxShadow: `0 0 ${8 + reveal * 8 + pressureDepth * 10 + (isBirthCore ? 8 : 0)}px rgba(${toneColor},${coreGlow})`,
                animation: `gy-near-mansion-arrival 760ms ease both ${index * 90}ms, gy-near-mansion-breathe ${3.8 + index * 0.18}s ease-in-out infinite ${760 + index * 90}ms`,
                pointerEvents: "none",
              } as CSSProperties}
            />
            {isBirthCore ? (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: visualSize + 7,
                  height: visualSize + 7,
                  border: `1px solid rgba(${toneColor},0.36)`,
                  borderRadius: 999,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 12px rgba(${toneColor},0.16)`,
                  pointerEvents: "none",
                }}
              />
            ) : null}
            {interactive ? (
              <span
                aria-hidden="true"
                data-life-core-invitation="STAR_BREATH_ONLY"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: visualSize + 9,
                  height: visualSize + 9,
                  border: `1px solid rgba(${toneColor},${isBirthCore ? 0.34 : 0.18})`,
                  borderRadius: 999,
                  transform: "translate(-50%, -50%) scale(0.78)",
                  boxShadow: isBirthCore ? `0 0 14px rgba(${toneColor},0.16)` : "none",
                  opacity: 0,
                  animation: `gy-near-mansion-invitation 4.8s ease-out infinite ${index * 420}ms`,
                  pointerEvents: "none",
                }}
              />
            ) : null}
          </span>
        );
      })}
    </>
  );
}

function LifeConstellationLayer({
  toneColor,
  narrativePhase,
  activeNodeIndex,
  onCoreStarClick,
  visualSource,
  pressureIntensity,
  interactionEnabled = true,
  innerViewRevealDepth = 0,
  crystalImprintActive = false,
  crystalImprintKey = "",
}: {
  toneColor: string;
  narrativePhase: CosmicNarrativePhase;
  activeNodeIndex: number;
  onCoreStarClick: () => void;
  visualSource: RealLifeVisualSource | null;
  pressureIntensity: number;
  interactionEnabled?: boolean;
  innerViewRevealDepth?: number;
  crystalImprintActive?: boolean;
  crystalImprintKey?: string;
}) {
  const reveal = narrativePhase === "field_intro" ? 0.34 : narrativePhase === "seed_visible" ? 0.66 : 1;
  const nodeCharge = Math.min(1, Math.max(0, activeNodeIndex / 6));
  const coreGlow = 0.34 + reveal * 0.28 + nodeCharge * 0.26;
  const coordinateProjection = visualSource?.projectionBundle.twentyEightMansionCoordinateProjection;
  const morphology = visualSource?.projectionBundle.morphologicalFieldAlignmentProjection.morphologicalFieldExpression;
  const lifeArchetype = visualSource?.projectionBundle.lifeArchetypeProjection;
  const birthMansionIndex = coordinateProjection?.birthMansion.mansionIndex ?? null;
  const activeSectorIndex = birthMansionIndex === null ? -1 : Math.floor(birthMansionIndex / 7);
  const activeGroupStart = activeSectorIndex < 0 ? 0 : activeSectorIndex * 7;
  const birthCoreSlot = birthMansionIndex === null ? -1 : birthMansionIndex - activeGroupStart;
  const fourSymbol = visualSource?.provenance.fourSymbol ?? "未定";
  const sourceReferenceId = visualSource?.provenance.sourceReferenceId ?? "IDENTITY_UNAVAILABLE";
  const rendererOwnsLifeVisual = visualSource !== null;
  const envelopeScale = morphology?.envelopeScale ?? 1;
  const postureBias = morphology?.postureBias ?? 0;
  const pressure = Math.max(0, Math.min(1, pressureIntensity));
  const orbitRadiusX = 43 * Math.max(0.88, Math.min(1.08, envelopeScale));
  const orbitRadiusY = 19 + Math.abs(postureBias) * 2.4;
  const coordinatePositions = Array.from({ length: 28 }, (_, index) => {
    const normalizedOrbitPosition = coordinateProjection?.coordinates[index]?.normalizedOrbitPosition ?? index / 28;
    const angle = -Math.PI / 2 + normalizedOrbitPosition * Math.PI * 2;
    return [
      50 + Math.cos(angle) * orbitRadiusX,
      49 + Math.sin(angle) * orbitRadiusY,
    ] as const;
  });
  const activeCoordinateIndices = birthMansionIndex === null
    ? [0, 4, 8, 12, 16, 20, 24]
    : Array.from({ length: 7 }, (_, index) => activeGroupStart + index);
  const coreStars = activeCoordinateIndices.map((coordinateIndex, index) => {
    const [left, top] = coordinatePositions[coordinateIndex]!;
    return [left, top, index === birthCoreSlot ? 7.2 : 4.8] as const;
  });
  const activePath = birthMansionIndex === null
    ? ""
    : coreStars.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const crystalImprintGeometry = resolveLifeUniverseCrystalImprintGeometry({
    identityKey: crystalImprintKey,
    birthMansionIndex,
    normalizedOrbitPositions: coordinateProjection?.coordinates.map(
      (coordinate) => coordinate.normalizedOrbitPosition,
    ) ?? [],
    envelopeScale,
    postureBias,
  });
  const crystalImprintPath = crystalImprintGeometry?.path ?? "";
  const orbitPath = `${coordinatePositions.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ")} Z`;
  const sectorPaths = Array.from({ length: 4 }, (_, sectorIndex) =>
    coordinatePositions
      .slice(sectorIndex * 7, sectorIndex * 7 + 7)
      .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
      .join(" "),
  );
  const fieldDust = coreStars.flatMap(([left, top], coreIndex) =>
    Array.from({ length: 5 }, (_, dustIndex) => {
      const angle = coreIndex * 1.7 + dustIndex * 1.26;
      const distance = 4 + ((coreIndex + dustIndex) % 4) * 2.2;
      return {
        left: left + Math.cos(angle) * distance,
        top: top + Math.sin(angle) * distance * 0.48,
        size: 1 + ((coreIndex + dustIndex) % 3) * 0.34,
        delay: (coreIndex * 5 + dustIndex) * 64,
      };
    }),
  );
  const postureRotate = birthMansionIndex === null
    ? 0
    : pressure * (postureBias < 0 ? -2.4 : 2.4);
  const postureScaleX = birthMansionIndex === null ? 1 : 1 - pressure * 0.035;
  const postureScaleY = birthMansionIndex === null ? 1 : 1 - pressure * 0.09;

  return (
    <div
      role="group"
      aria-label={birthMansionIndex === null
        ? "本命坐标待恢复，当前显示中性二十八宿与七曜。"
        : `${fourSymbol}七宿在当前现实引力下进入六个空间。`}
      data-visual-primitive="BEAST"
      data-visual-layer="origin-life-under-pressure"
      data-life-source-reference={sourceReferenceId}
      data-life-source-status={visualSource ? "REAL_GENESIS_SOURCE" : "IDENTITY_UNAVAILABLE"}
      data-birth-mansion-index={birthMansionIndex ?? "unavailable"}
      data-four-symbol={fourSymbol}
      data-mother-code-id={visualSource?.provenance.motherCodeId ?? "unavailable"}
      data-life-archetype={lifeArchetype?.lifeArchetype ?? "unavailable"}
      data-original-force={lifeArchetype?.originalForce ?? "unavailable"}
      data-four-symbol-field-mode={morphology?.fieldMode ?? "unavailable"}
      data-pressure-effect="POSTURE_ONLY"
      data-inner-view-life-revelation={
        innerViewRevealDepth > 0
          ? `APPROACH_${Math.min(3, innerViewRevealDepth)}`
          : "RESTING"
      }
      data-inner-view-meridian-source="EXISTING_BIRTH_MANSION_BODY_RELATION"
      data-inner-view-meridian-scoring="NONE"
      data-dynamics-core-overlay-copy="NONE"
      data-dynamics-life-visual-authority={rendererOwnsLifeVisual ? "GENESIS_WEBGL" : "DOM_FALLBACK"}
      data-crystal-imprint={
        crystalImprintActive && crystalImprintPath
          ? "ADDITIVE"
          : crystalImprintActive
            ? "PENDING_IDENTITY_SOURCE"
            : "INACTIVE"
      }
      data-crystal-imprint-anchor="LIFE_CORE_TO_ACTIVE_SEVEN_MANSION_BODY"
      data-crystal-imprint-topology="ATTACHED_NO_SECOND_SYMBOL"
      data-base-structure-invariant="true"
      style={{
        position: "absolute",
        left: rendererOwnsLifeVisual ? 0 : "50%",
        top: rendererOwnsLifeVisual ? 0 : "31%",
        right: rendererOwnsLifeVisual ? 0 : undefined,
        bottom: rendererOwnsLifeVisual ? 0 : undefined,
        width: rendererOwnsLifeVisual ? "100%" : 310,
        height: rendererOwnsLifeVisual ? "100%" : 202,
        transform: rendererOwnsLifeVisual
          ? "none"
          : `translate(-50%, -50%) rotate(${postureRotate}deg) scale(${postureScaleX}, ${postureScaleY})`,
        transformOrigin: "50% 50%",
        transition: "transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        opacity: rendererOwnsLifeVisual ? 1 : 0.76 + reveal * 0.22,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {!rendererOwnsLifeVisual ? <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "49%",
          width: 268 + nodeCharge * 24,
          height: 122 + nodeCharge * 16,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          border: `1px solid rgba(${toneColor},${0.08 + reveal * 0.08})`,
          background: `radial-gradient(ellipse, rgba(${toneColor},${0.08 + nodeCharge * 0.08}), rgba(${toneColor},0.025) 48%, transparent 72%)`,
          filter: "blur(2px)",
          animation: "gy-starbeast-breathe 5.2s ease-in-out infinite",
        }}
      /> : null}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
          filter: `drop-shadow(0 0 ${10 + nodeCharge * 14}px rgba(${toneColor},${coreGlow}))`,
        }}
      >
        {!rendererOwnsLifeVisual ? (
          <>
            <path
              d={orbitPath}
              fill="none"
              stroke={`rgba(176,190,206,${0.08 + reveal * 0.05})`}
              strokeWidth="0.34"
              strokeDasharray="0.8 2.8"
            />
            {sectorPaths.map((path, sectorIndex) => (
              <path
                key={`sector-${sectorIndex}`}
                d={path}
                fill="none"
                stroke={sectorIndex === activeSectorIndex
                  ? `rgba(${toneColor},${0.18 + reveal * 0.18})`
                  : "rgba(176,190,206,0.055)"}
                strokeWidth={sectorIndex === activeSectorIndex ? "0.58" : "0.28"}
              />
            ))}
            <path
              d={activePath}
              fill="none"
              stroke={`rgba(${toneColor},${0.18 + reveal * 0.26 + nodeCharge * 0.12})`}
              strokeWidth="0.68"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation:
                  narrativePhase === "seed_visible" || narrativePhase === "beast_guide"
                    ? "gy-starbeast-line 680ms ease-out both"
                    : "none",
              }}
            />
          </>
        ) : null}
        {rendererOwnsLifeVisual && innerViewRevealDepth > 0 ? (
          <g
            className="gy-inner-view-life-meridian"
            data-inner-view-meridian-revelation="SAME_BODY"
            data-inner-view-meridian-depth={Math.min(
              3,
              innerViewRevealDepth,
            )}
          >
            <path
              className="gy-inner-view-life-meridian__breath"
              d={activePath}
              fill="none"
              stroke={`rgba(${toneColor},${0.1 + innerViewRevealDepth * 0.04})`}
              strokeWidth="1.12"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="blur(1.4px)"
            />
            <path
              className="gy-inner-view-life-meridian__flow"
              d={activePath}
              fill="none"
              stroke={`rgba(${toneColor},${0.22 + innerViewRevealDepth * 0.08})`}
              strokeWidth="0.34"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
            />
            {coreStars.map(([x, y], index) => (
              <circle
                key={`inner-view-meridian-${index}`}
                className="gy-inner-view-life-meridian__point"
                cx={x}
                cy={y}
                r={index === birthCoreSlot ? "0.68" : "0.38"}
                fill={
                  index === birthCoreSlot
                    ? "rgba(255,247,220,0.76)"
                    : `rgba(${toneColor},0.38)`
                }
                style={{ animationDelay: `${index * 120}ms` }}
              />
            ))}
          </g>
        ) : null}
        {crystalImprintActive && crystalImprintPath ? (
          <>
            <path
              d={crystalImprintPath}
              fill="none"
              stroke={`rgba(${toneColor},0.18)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="blur(1.2px)"
            />
            <path
              d={crystalImprintPath}
              fill="none"
              stroke="rgba(255,239,190,0.92)"
              strokeWidth="0.66"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="120"
              style={{ animation: "gy-crystal-imprint 1.65s cubic-bezier(0.2, 0.7, 0.2, 1) both" }}
            />
            <circle
              cx={crystalImprintGeometry!.target[0]}
              cy={crystalImprintGeometry!.target[1]}
              r="1.45"
              fill="rgba(255,239,190,0.11)"
              style={{ transformBox: "fill-box", transformOrigin: "center", animation: "gy-crystal-imprint-pulse 2.8s ease-in-out infinite" }}
            />
            <rect
              x={crystalImprintGeometry!.target[0] - 0.52}
              y={crystalImprintGeometry!.target[1] - 0.52}
              width="1.04"
              height="1.04"
              rx="0.12"
              fill="rgba(255,247,220,0.96)"
            />
          </>
        ) : null}
      </svg>

      {!rendererOwnsLifeVisual ? coordinatePositions.map(([left, top], index) => {
        const inActiveSector = activeSectorIndex >= 0 && Math.floor(index / 7) === activeSectorIndex;
        const isBirthCoordinate = index === birthMansionIndex;
        return (
          <span
            key={`mansion-${index}`}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: isBirthCoordinate ? 4.8 : inActiveSector ? 2.7 : 1.6,
              height: isBirthCoordinate ? 4.8 : inActiveSector ? 2.7 : 1.6,
              borderRadius: 999,
              transform: "translate(-50%, -50%)",
              background: isBirthCoordinate
                ? "rgba(255,247,220,0.96)"
                : inActiveSector
                  ? `rgba(${toneColor},${0.48 + reveal * 0.18})`
                  : "rgba(190,202,218,0.24)",
              boxShadow: isBirthCoordinate
                ? `0 0 18px rgba(${toneColor},0.72)`
                : inActiveSector
                  ? `0 0 8px rgba(${toneColor},0.32)`
                  : "0 0 5px rgba(176,190,206,0.12)",
            }}
          />
        );
      }) : null}

      {!rendererOwnsLifeVisual ? fieldDust.map((particle, index) => (
        <span
          key={`field-dust-${index}`}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(255,248,224,${0.08 + reveal * 0.12 + nodeCharge * 0.08})`,
            boxShadow: `0 0 ${4 + nodeCharge * 4}px rgba(${toneColor},${0.1 + nodeCharge * 0.12})`,
            animation: `gy-starbeast-dust 3.4s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      )) : null}

      <LifeCoreInteractionLayer
        coreStars={coreStars}
        birthCoreSlot={birthCoreSlot}
        interactive={interactionEnabled}
        rendererOwnsVisual={rendererOwnsLifeVisual}
        toneColor={toneColor}
        reveal={reveal}
        nodeCharge={nodeCharge}
        coreGlow={coreGlow}
        pressureDepth={pressure}
        onCoreStarClick={onCoreStarClick}
      />

      {!rendererOwnsLifeVisual ? <span
        style={{
          position: "absolute",
          left: "50%",
          top: "49%",
          width: 146 + nodeCharge * 24,
          height: 66 + nodeCharge * 16,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, rgba(${toneColor},${0.09 + reveal * 0.08}), transparent 68%)`,
          filter: "blur(3px)",
          animation: "gy-starbeast-breathe 4.8s ease-in-out infinite",
        }}
      /> : null}

      {!rendererOwnsLifeVisual && (narrativePhase === "node_active" || narrativePhase === "node_complete") ? (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "49%",
            width: 176 + nodeCharge * 24,
            height: 92 + nodeCharge * 14,
            borderRadius: "50%",
            border: `1px solid rgba(${toneColor},${0.18 + nodeCharge * 0.14})`,
            animation: "gy-starbeast-ripple 1.8s ease-out infinite",
          }}
        />
      ) : null}
    </div>
  );
}

function CosmicBotanicsField({
  configs,
  activeDimensionStep,
  pressureSeedSurface,
  petalStates,
  activeNodeIndex,
  narrativePhase,
  onNodeBloom,
  visualSource,
  visualState,
  experienceState,
  innerViewEntryEstablished,
  initialInnerViewRelation,
  onInnerViewRelationEstablished,
}: {
  configs: SixSpaceConfig[];
  activeDimensionStep: number;
  pressureSeedSurface: string;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  activeNodeIndex: number;
  narrativePhase: CosmicNarrativePhase;
  onNodeBloom: () => void;
  visualSource: RealLifeVisualSource | null;
  visualState: VisualState;
  experienceState: ExperienceState;
  innerViewEntryEstablished: boolean;
  initialInnerViewRelation:
    | "AWAITING"
    | "CONFIRMED"
    | "SELF_NAMED";
  onInnerViewRelationEstablished: (
    relation: "CONFIRMED" | "SELF_NAMED",
  ) => Promise<boolean>;
}) {
  const [innerViewPhase, setInnerViewPhase] = useState<
    | "OBSERVING"
    | "FIRST_APPROACH"
    | "SECOND_APPROACH"
    | "THIRD_APPROACH"
    | "CONFIRMED"
    | "SELF_NAMED"
    | "PAUSED"
  >(() =>
    initialInnerViewRelation === "CONFIRMED"
      ? "CONFIRMED"
      : initialInnerViewRelation === "SELF_NAMED"
        ? "SELF_NAMED"
        : innerViewEntryEstablished
          ? "FIRST_APPROACH"
          : "OBSERVING",
  );
  const [innerViewRelationEstablished, setInnerViewRelationEstablished] =
    useState(() => initialInnerViewRelation !== "AWAITING");
  const relationMutationPendingRef = useRef(false);
  const innerViewPhaseBeforePauseRef = useRef<
    "FIRST_APPROACH" | "SECOND_APPROACH" | "THIRD_APPROACH"
  >("FIRST_APPROACH");
  const seedTone = pressureSeedSurface.length % 3;
  const toneColor = visualState.colorTemperature || (seedTone === 0 ? "199,169,107" : seedTone === 1 ? "222,196,154" : "176,210,206");
  const activeConfig = configs[Math.max(0, Math.min(configs.length - 1, activeDimensionStep - 1))] ?? configs[0];
  const activePetalState = activeConfig ? petalStates[activeConfig.id] : "active";
  const showBlackholeStatus = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showPressureText = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showBeastIntro = narrativePhase === "beast_guide";
  const showNodePanel = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const shortPetalNames = configs.map((config) => SIX_SPACE_SHORT_LABELS[config.id] ?? config.name.replace("空间", ""));
  const coreVisible = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const rendererOwnsUniverse = visualSource !== null;
  const pressureLayerOpacity = experienceState.primaryFocus === "PRESSURE_FIELD" ? 1 : experienceState.primaryFocus === "PRESSURE_AND_BEAST" ? 0.74 : 0.24;
  const beastLayerOpacity =
    experienceState.primaryFocus === "BEAST_AND_DIMENSION" || experienceState.primaryFocus === "DIMENSION_FLOW"
      ? 1
      : experienceState.primaryFocus === "PRESSURE_AND_BEAST"
        ? 0.78
        : experienceState.primaryFocus === "CRYSTALLIZATION"
          ? 0.66
          : 0.56;
  const dimensionLayerOpacity = experienceState.primaryFocus === "DIMENSION_FLOW" ? 0.64 : experienceState.primaryFocus === "BEAST_AND_DIMENSION" ? 0.56 : experienceState.primaryFocus === "CRYSTALLIZATION" ? 0.58 : 0.28;
  const particleLayerOpacity = experienceState.primaryFocus === "CRYSTALLIZATION" ? 0.92 : experienceState.primaryFocus === "DIMENSION_FLOW" ? 0.7 : 0.42;

  const innerViewRevealDepth =
    innerViewPhase === "OBSERVING"
      ? 0
      : innerViewPhase === "FIRST_APPROACH"
        ? 1
        : innerViewPhase === "SECOND_APPROACH" ||
            innerViewPhase === "PAUSED"
          ? 2
          : 3;

  function approachLifeState() {
    setInnerViewPhase((currentPhase) => {
      if (currentPhase === "OBSERVING") return "FIRST_APPROACH";
      if (currentPhase === "FIRST_APPROACH") return "SECOND_APPROACH";
      if (currentPhase === "SECOND_APPROACH") return "THIRD_APPROACH";
      return currentPhase;
    });
  }

  useEffect(() => {
    if (initialInnerViewRelation === "AWAITING") return;
    setInnerViewRelationEstablished(true);
    setInnerViewPhase(initialInnerViewRelation);
  }, [initialInnerViewRelation]);

  async function confirmLifeState() {
    if (relationMutationPendingRef.current) return;
    relationMutationPendingRef.current = true;
    const confirmed = await onInnerViewRelationEstablished(
      "CONFIRMED",
    );
    relationMutationPendingRef.current = false;
    if (!confirmed) return;
    setInnerViewRelationEstablished(true);
    setInnerViewPhase("CONFIRMED");
  }

  async function keepOwnUnderstanding() {
    if (relationMutationPendingRef.current) return;
    relationMutationPendingRef.current = true;
    const confirmed = await onInnerViewRelationEstablished(
      "SELF_NAMED",
    );
    relationMutationPendingRef.current = false;
    if (!confirmed) return;
    setInnerViewRelationEstablished(true);
    setInnerViewPhase("SELF_NAMED");
  }

  function pauseInnerView() {
    if (
      innerViewPhase === "FIRST_APPROACH" ||
      innerViewPhase === "SECOND_APPROACH" ||
      innerViewPhase === "THIRD_APPROACH"
    ) {
      innerViewPhaseBeforePauseRef.current = innerViewPhase;
    }
    setInnerViewPhase("PAUSED");
  }

  function resumeInnerView() {
    setInnerViewPhase(innerViewPhaseBeforePauseRef.current);
  }

  function continueObservation() {
    if (!innerViewRelationEstablished) return;
    onNodeBloom();
  }

  function handleLifeCoreApproach() {
    if (!innerViewRelationEstablished) {
      approachLifeState();
      return;
    }
    onNodeBloom();
  }

  return (
    <section
      aria-label="现实进入同一个生命，并从六个窗口显出回应"
      data-experience-layer="pure-visual-projection"
      data-visual-grammar="BEAST_PRESSURE_DIMENSION_PARTICLE"
      data-visual-depth-state={visualState.visualDepthState}
      data-visual-composition={visualState.spatialComposition}
      data-visual-timeline={visualState.timeline.current}
      data-visual-focal-dimension={visualState.focalDimension}
      data-experience-loop="现实事实_六维生命显影_保护回应候选_惯性观察"
      data-experience-stage={experienceState.stage}
      data-experience-focus={experienceState.primaryFocus}
      data-dynamics-six-dimension-role="LIFE_STATE_REVEAL_NOT_PERSONALITY_ANALYSIS"
      data-dynamics-dust-consumption="EXPLANATION_CANDIDATE_NOT_NEW_DUST_STATE"
      data-dynamics-dust-layer-result="NONE"
      data-dynamics-dust-scoring="FORBIDDEN"
      data-dynamics-meridian-inference="FORBIDDEN"
      data-dynamics-inner-view-consumer="EXISTING_SIX_DIMENSION_STATE"
      data-dynamics-inner-view-entry={
        innerViewEntryEstablished
          ? "CURRENT_LIFE_WEATHER_BODY_APPROACHED"
          : "GRAVITY_DIRECT_OBSERVATION"
      }
      data-dynamics-inner-view-sequence="SEE_UNDERSTAND_TRANSFORM"
      data-dynamics-inner-view-relation={
        innerViewRelationEstablished ? "ESTABLISHED" : "AWAITING_USER_APPROACH"
      }
      data-life-universe-continuity="SAME_GENESIS_UNIVERSE"
      data-dynamics-universe-background-authority={rendererOwnsUniverse ? "GENESIS_WEBGL" : "DOM_FALLBACK"}
      data-dynamics-pressure-visual-authority={rendererOwnsUniverse ? "GENESIS_WEBGL_PROJECTION" : "DOM_FALLBACK"}
      style={{
        "--visual-beast-intensity": visualState.primitives.BEAST.intensity,
        "--visual-pressure-intensity": visualState.primitives.PRESSURE.intensity,
        "--visual-dimension-intensity": visualState.primitives.DIMENSION.intensity,
        "--visual-particle-intensity": visualState.primitives.PARTICLE.intensity,
        position: "absolute",
        inset: 0,
        minHeight: "100%",
        border: "none",
        borderRadius: 0,
        overflow: "hidden",
        padding: 0,
        background: rendererOwnsUniverse
          ? "transparent"
          : `radial-gradient(circle at 52% 30%, rgba(80,58,120,${0.05 + visualState.primitives.PRESSURE.intensity * 0.08}), transparent 31%), radial-gradient(circle at 50% 55%, rgba(${toneColor},${0.035 + visualState.primitives.BEAST.coherence * 0.055}), transparent 42%)`,
        boxShadow: !rendererOwnsUniverse &&
          (activePetalState === "blooming" || visualState.primitives.PARTICLE.transitionEnergy > 0)
            ? `inset 0 0 ${34 + visualState.primitives.PARTICLE.transitionEnergy * 22}px rgba(${toneColor},${0.04 + visualState.primitives.BEAST.coherence * 0.045})`
            : "none",
      } as CSSProperties}
    >
      <CosmicFieldKeyframes />
      {!rendererOwnsUniverse ? <div data-visual-primitive="PARTICLE" data-visual-layer="particle-nebula-field" style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.background, pointerEvents: "none", opacity: particleLayerOpacity }}>
        <CosmicNebulaScene toneColor={toneColor} />
        <CosmicAmbientStars />
      </div> : null}

      <div style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.entity, pointerEvents: coreVisible ? "auto" : "none", opacity: beastLayerOpacity }}>
        <LifeConstellationLayer
          toneColor={toneColor}
          narrativePhase={narrativePhase}
          activeNodeIndex={activeNodeIndex}
          onCoreStarClick={handleLifeCoreApproach}
          visualSource={visualSource}
          pressureIntensity={visualState.primitives.PRESSURE.intensity}
          innerViewRevealDepth={innerViewRevealDepth}
        />
      </div>

      <div data-visual-primitive="PRESSURE" data-visual-layer="pressure-blackhole-field" data-pressure-overlay={rendererOwnsUniverse ? "SUPPRESSED_BY_WEBGL_AUTHORITY" : "DOM_FALLBACK"} style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.structural, pointerEvents: "none", opacity: pressureLayerOpacity }}>
        <BlackholeVortexScene toneColor={toneColor} visible={!rendererOwnsUniverse && showBlackholeStatus} status={experienceState.pressureCopy} />
      </div>

      <p
        data-visual-primitive="PRESSURE"
        data-visual-layer="pressure-text-field"
        data-dynamics-evidence-level="USER_RECOGNIZED_REALITY_FACT"
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "43%",
          zIndex: visualState.zDepth.narrative,
          margin: 0,
          color: "rgba(245,245,245,0.78)",
          fontSize: 13,
          lineHeight: 1.52,
          fontWeight: 560,
          textAlign: "center",
          pointerEvents: "none",
          display: showPressureText ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        <span
          style={{
            display: "block",
            marginBottom: 7,
            color: "rgba(220,205,169,0.46)",
            fontSize: 9,
            fontWeight: 480,
            letterSpacing: "0.1em",
          }}
        >
          你认出的现实
        </span>
        <span style={{ display: "block", textWrap: "balance" }}>
          {pressureSeedSurface}
        </span>
      </p>

      <div data-visual-primitive="PARTICLE" data-visual-layer="particle-node-feedback" style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.interaction, pointerEvents: showNodePanel ? "auto" : "none" }}>
        <NodeProgressionPanel
          visible={showNodePanel}
          toneColor={toneColor}
          activeNode={experienceState.nodeCopy}
          phase={innerViewPhase}
          onApproach={approachLifeState}
          onConfirm={confirmLifeState}
          onSelfName={keepOwnUnderstanding}
          onPause={pauseInnerView}
          onResume={resumeInnerView}
          onContinue={continueObservation}
        />
      </div>

      <p
        data-visual-primitive="BEAST"
        data-visual-layer="beast-state-text"
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: "47%",
          zIndex: visualState.zDepth.narrative,
          margin: 0,
          whiteSpace: "pre-line",
          color: `rgba(${toneColor},0.72)`,
          fontSize: 11,
          lineHeight: 1.5,
          pointerEvents: "none",
          display: showBeastIntro ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {experienceState.beastCopy}
      </p>

      <div style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.structural, pointerEvents: "none", opacity: dimensionLayerOpacity }}>
        <SixDimensionGravityField
          configs={configs}
          activeConfig={activeConfig}
          petalStates={petalStates}
          toneColor={toneColor}
          shortPetalNames={shortPetalNames}
        />
      </div>

    </section>
  );
}

function SingleModelRevisionActionFocus({
  actionRoute,
  onConfirm,
  visualSource,
  toneColor,
  innerViewRelation,
}: {
  actionRoute: ChoiceActionRouteCandidate;
  onConfirm: () => void;
  visualSource: RealLifeVisualSource | null;
  toneColor: string;
  innerViewRelation: "AWAITING" | "CONFIRMED" | "SELF_NAMED";
}) {
  const [responseGapPhase, setResponseGapPhase] = useState<
    "MERIDIAN_SETTLING" | "LIFE_PAUSING" | "RESPONSE_GAP_OPEN"
  >("MERIDIAN_SETTLING");
  const [breathHoldState, setBreathHoldState] = useState<
    "RESTING" | "HOLDING" | "RELEASED_EARLY"
  >("RESTING");
  const breathHoldTimerRef = useRef<number | null>(null);
  const breathHoldResetTimerRef = useRef<number | null>(null);
  const breathHoldCompletedRef = useRef(false);
  const responseGapReady = responseGapPhase === "RESPONSE_GAP_OPEN";
  const coreAnchorTop = visualSource
    ? `${LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100}%`
    : "31%";

  useEffect(() => {
    const pauseTimer = window.setTimeout(() => {
      setResponseGapPhase("LIFE_PAUSING");
    }, 1_300);
    const responseGapTimer = window.setTimeout(() => {
      setResponseGapPhase("RESPONSE_GAP_OPEN");
    }, 2800);

    return () => {
      window.clearTimeout(pauseTimer);
      window.clearTimeout(responseGapTimer);
      if (breathHoldTimerRef.current !== null) {
        window.clearTimeout(breathHoldTimerRef.current);
      }
      if (breathHoldResetTimerRef.current !== null) {
        window.clearTimeout(breathHoldResetTimerRef.current);
      }
    };
  }, []);

  function beginBreathHold() {
    if (
      !responseGapReady ||
      innerViewRelation === "AWAITING" ||
      breathHoldState === "HOLDING"
    ) {
      return;
    }
    if (breathHoldResetTimerRef.current !== null) {
      window.clearTimeout(breathHoldResetTimerRef.current);
      breathHoldResetTimerRef.current = null;
    }
    breathHoldCompletedRef.current = false;
    setBreathHoldState("HOLDING");
    breathHoldTimerRef.current = window.setTimeout(() => {
      breathHoldCompletedRef.current = true;
      breathHoldTimerRef.current = null;
      onConfirm();
    }, 1_800);
  }

  function releaseBreathHold() {
    if (breathHoldCompletedRef.current) return;
    if (breathHoldTimerRef.current !== null) {
      window.clearTimeout(breathHoldTimerRef.current);
      breathHoldTimerRef.current = null;
    }
    if (breathHoldState !== "HOLDING") return;
    setBreathHoldState("RELEASED_EARLY");
    breathHoldResetTimerRef.current = window.setTimeout(() => {
      setBreathHoldState("RESTING");
      breathHoldResetTimerRef.current = null;
    }, 720);
  }

  return (
    <section
      aria-label="旧回应启动后，生命停一下"
      className="gy-choice-response-gap"
      data-model-revision-action="pending"
      data-action-route-reference={
        actionRoute.actionRouteReferenceId
      }
      data-action-route-prototype={actionRoute.prototypeId}
      data-action-route-safety={
        actionRoute.safety.safetyLevel
      }
      data-change-experience-presentation="TYPED_ACTION_ROUTE"
      data-choice-response-gap={
        responseGapReady ? "PAUSE_AVAILABLE" : "OLD_PATH_RESTARTING"
      }
      data-choice-transition-phase={responseGapPhase}
      data-choice-transition-source="THIRD_APPROACH_SAME_BODY_MERIDIAN"
      data-choice-breath-hold={breathHoldState}
      data-choice-breath-duration-ms="1800"
      data-choice-embodiment="USER_BODY_STAYS_WITH_LIFE_BODY"
      data-choice-click-confirm="FORBIDDEN"
      data-choice-answer-model="NONE"
      data-choice-life-effect="RESPONSE_ONLY"
      data-choice-old-path="PRESENT_NOT_AUTOMATIC"
      data-choice-memory-influence="PRESENT_NOT_COMMANDING"
      data-choice-new-path="NONE"
      data-choice-life-surface="EXISTING_REALITY_PRESENCE"
      data-choice-crystal-stage="NOT_STARTED"
      data-choice-protective-sequence="UNDERSTAND_THEN_PAUSE_THEN_PARTICIPATE"
      data-choice-inner-view-continuity="SAME_UNDERSTANDING_BECOMES_RESPONSE_GAP"
      data-choice-inner-view-relation={innerViewRelation}
      data-choice-transition-model="RELATION_NOT_MODE_SWITCH"
      data-choice-availability={
        responseGapReady && innerViewRelation !== "AWAITING"
          ? "USER_RESPONSE_AVAILABLE"
          : "WITHHELD_DURING_LIFE_TRANSITION"
      }
      data-choice-life-body-rhythm="OLD_RESPONSE_SLOWS_IN_SAME_BODY"
      data-choice-core-identity="STABLE_THROUGH_PAUSE"
      data-choice-particle-rhythm="SLOW_NOT_FROZEN"
      data-legacy-revision-answer-surface="ISOLATED"
      data-revision-visual-language="SAME_LIFE_RESPONSE_PAUSE"
      data-revision-copy-composition="AWARENESS_NOT_ADVICE"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="gy-choice-response-gap__body-continuity"
        data-choice-body-continuity-layer="EXISTING_BIRTH_MANSION_BODY"
      >
        <LifeConstellationLayer
          toneColor={toneColor}
          narrativePhase="node_complete"
          activeNodeIndex={6}
          onCoreStarClick={() => {}}
          visualSource={visualSource}
          pressureIntensity={0.32}
          interactionEnabled={false}
          innerViewRevealDepth={
            responseGapPhase === "MERIDIAN_SETTLING"
              ? 3
              : responseGapPhase === "LIFE_PAUSING"
                ? 2
                : 1
          }
        />
      </div>

      <div
        aria-hidden="true"
        className="gy-choice-response-gap__stillness"
        style={{
          position: "absolute",
          left: "50%",
          top: coreAnchorTop,
          width: 252,
          height: 196,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(255,239,205,0.09), rgba(199,169,107,0.025) 38%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      <button
        type="button"
        aria-label="按住生命核心，陪它完成一次呼吸"
        className="gy-choice-response-gap__confirm"
        data-revision-claim="LIFE_CORE_TOUCH"
        data-life-core-anchor="LIFE_UNIVERSE_CORE_IDENTITY"
        data-choice-participation="WILLING_TO_PAUSE"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          beginBreathHold();
        }}
        onPointerUp={releaseBreathHold}
        onPointerCancel={releaseBreathHold}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          if (!event.repeat) beginBreathHold();
        }}
        onKeyUp={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          releaseBreathHold();
        }}
        disabled={
          !responseGapReady || innerViewRelation === "AWAITING"
        }
        style={{
          appearance: "none",
          position: "absolute",
          left: `${LIFE_UNIVERSE_CORE_IDENTITY.anchorX * 100}%`,
          top: coreAnchorTop,
          zIndex: 2,
          width: "min(64vw, 236px)",
          height: "min(28vh, 196px)",
          transform: "translate(-50%, -50%)",
          border: 0,
          borderRadius: "48%",
          background: "transparent",
          padding: 0,
          touchAction: "none",
          cursor:
            responseGapReady && innerViewRelation !== "AWAITING"
              ? "pointer"
              : "default",
        }}
      >
        <span
          aria-hidden="true"
          className="gy-choice-response-gap__invitation"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 54,
            height: 32,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse, rgba(255,239,205,0.1), transparent 72%)",
            filter: "blur(3px)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden="true"
          className="gy-choice-breath-hold__ring"
        >
          <svg viewBox="0 0 44 44">
            <circle
              className="gy-choice-breath-hold__track"
              cx="22"
              cy="22"
              r="19"
              pathLength="1"
            />
            <circle
              className="gy-choice-breath-hold__progress"
              cx="22"
              cy="22"
              r="19"
              pathLength="1"
            />
          </svg>
        </span>
      </button>

      <div
        style={{
          position: "absolute",
          zIndex: 3,
          right: 30,
          bottom: "max(54px, calc(32px + env(safe-area-inset-bottom)))",
          left: 30,
          display: "grid",
          justifyItems: "center",
          gap: 10,
          textAlign: "center",
          pointerEvents: "none",
          textShadow: "0 0 20px rgba(2,3,6,0.94)",
        }}
      >
        <span
          data-choice-inner-view-carry="RECOGNIZED_RELATION_REMAINS_PRESENT"
          style={{
            maxWidth: 286,
            color: "rgba(185,203,236,0.38)",
            fontSize: 9,
            lineHeight: 1.55,
            letterSpacing: "0.06em",
            textWrap: "balance",
          }}
        >
          {innerViewRelation === "SELF_NAMED"
            ? "你保留的那份理解，仍和这颗生命在一起。"
            : "你刚刚靠近的那种回应，仍在这颗生命里。"}
        </span>
        <span
          data-choice-protective-understanding="CANDIDATE_NOT_CONCLUSION"
          style={{
            maxWidth: 290,
            color: "rgba(220,205,169,0.56)",
            fontSize: 10.5,
            lineHeight: 1.58,
            textWrap: "balance",
          }}
        >
          {innerViewRelation === "SELF_NAMED"
            ? "它不需要被系统定义，也可能曾经保护过你。"
            : "这种回应，也许曾经帮助你保护自己。"}
        </span>
        <strong
          data-choice-awareness-copy="PAUSE"
          style={{
            maxWidth: 300,
            color: "rgba(245,240,226,0.84)",
            fontSize: 15,
            lineHeight: 1.65,
            fontWeight: 580,
            textWrap: "balance",
          }}
        >
          {responseGapReady
            ? actionRoute.action.visibleAction
            : responseGapPhase === "LIFE_PAUSING"
              ? "熟悉的回应正在启动，而生命停了一下。"
              : "刚刚被看见的流动，仍留在同一身体里。"}
        </strong>
        <span
          style={{
            color: "rgba(199,169,107,0.5)",
            fontSize: 9.5,
            letterSpacing: "0.08em",
            opacity:
              responseGapReady && innerViewRelation !== "AWAITING" ? 1 : 0,
            transition: "opacity 680ms ease",
          }}
        >
          {breathHoldState === "HOLDING"
            ? "保持这一口呼吸 · 确认带着这一步离开"
            : breathHoldState === "RELEASED_EARLY"
              ? "可以慢一点，再陪它停留"
              : "按住生命核心 · 陪它完成一次呼吸"}
        </span>
      </div>
    </section>
  );
}

function TransformationMomentFocus({
  action,
  presentation,
  responseDimension,
  responseTraceIdentityKey,
  onSediment,
  onExplicitDeparture,
  livedResponseRecognitionRequired = false,
  onRecognizeLivedResponse,
  visualSource,
  toneColor,
  innerViewRelation,
}: {
  action: SingleModelRevisionAction;
  presentation?: ChangeExperiencePresentation | null;
  responseDimension: string;
  responseTraceIdentityKey: string | null;
  onSediment?: () => void;
  onExplicitDeparture?: () => void;
  livedResponseRecognitionRequired?: boolean;
  onRecognizeLivedResponse?: () => void;
  visualSource: RealLifeVisualSource | null;
  toneColor: string;
  innerViewRelation: "AWAITING" | "CONFIRMED" | "SELF_NAMED";
}) {
  const hasPresentation = Boolean(presentation);
  const [responseSpaceSettled, setResponseSpaceSettled] =
    useState(false);
  const [responseTracePhase, setResponseTracePhase] = useState<
    "NEW_FLOW" | "LIFE_SETTLING" | "QUIET_TRACE"
  >("NEW_FLOW");
  const coreAnchorTop = visualSource
    ? `${LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100}%`
    : "31%";
  const responseTraceSourceSlot =
    resolveLifeUniverseCrystalSourceSlot(responseDimension);
  const responseTraceGeometry = useMemo(() => {
    if (visualSource === null || responseTraceIdentityKey === null) return null;
    const projectionBundle = visualSource.projectionBundle;
    const coordinateProjection =
      projectionBundle.twentyEightMansionCoordinateProjection;
    const morphology =
      projectionBundle.morphologicalFieldAlignmentProjection
        .morphologicalFieldExpression;
    return resolveLifeUniverseCrystalImprintGeometry({
      identityKey: responseTraceIdentityKey,
      birthMansionIndex: coordinateProjection.birthMansion.mansionIndex,
      normalizedOrbitPositions: coordinateProjection.coordinates.map(
        (coordinate) => coordinate.normalizedOrbitPosition,
      ),
      envelopeScale: morphology.envelopeScale,
      postureBias: morphology.postureBias,
      sourceSlot: responseTraceSourceSlot,
    });
  }, [
    responseDimension,
    responseTraceIdentityKey,
    responseTraceSourceSlot,
    visualSource,
  ]);
  const responseTracePath = responseTraceGeometry
    ? `M ${responseTraceGeometry.target[0]} ${responseTraceGeometry.target[1]} L ${responseTraceGeometry.stem[0]} ${responseTraceGeometry.stem[1]} L ${responseTraceGeometry.branchTarget[0]} ${responseTraceGeometry.branchTarget[1]}`
    : "";
  const responseTracePoint =
    responseTraceGeometry?.branchTarget ?? null;

  useEffect(() => {
    const settleTimer = window.setTimeout(() => {
      setResponseTracePhase("LIFE_SETTLING");
    }, 920);
    const traceTimer = window.setTimeout(() => {
      setResponseTracePhase("QUIET_TRACE");
    }, 2_260);
    const readyTimer = window.setTimeout(() => {
      setResponseSpaceSettled(true);
    }, 3_100);

    return () => {
      window.clearTimeout(settleTimer);
      window.clearTimeout(traceTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  return (
    <section
      aria-label="生命为新的回应留出空间"
      className="gy-choice-response-gap gy-choice-response-gap--held"
      data-transformation-moment="active"
      data-change-experience-presentation={hasPresentation ? "active" : "fallback"}
      data-choice-response-gap="NEW_RESPONSE_POSSIBILITY"
      data-choice-transition-phase="NEW_RESPONSE_SPACE"
      data-choice-transition-source="SAME_MERIDIAN_AFTER_PAUSE"
      data-choice-answer-model="NONE"
      data-choice-life-effect="RESPONSE_ONLY"
      data-choice-old-path="PRESENT_NOT_AUTOMATIC"
      data-choice-memory-influence="PRESENT_NOT_COMMANDING"
      data-choice-new-path="NONE"
      data-choice-life-surface="EXISTING_REALITY_PRESENCE"
      data-choice-crystal-stage="NOT_STARTED"
      data-choice-protective-sequence="UNDERSTAND_THEN_PAUSE_THEN_SPACE"
      data-choice-inner-view-continuity="SAME_UNDERSTANDING_NEW_RESPONSE_SPACE"
      data-choice-inner-view-relation={innerViewRelation}
      data-choice-transition-model="RELATION_NOT_MODE_SWITCH"
      data-choice-rhythm-validation={
        livedResponseRecognitionRequired
          ? "AWAITING_USER_RECOGNITION"
          : "FIRST_RESPONSE_SPACE"
      }
      data-choice-life-body-rhythm="NEW_CADENCE_SAME_BODY"
      data-choice-core-identity="STABLE_THROUGH_RESPONSE"
      data-choice-particle-rhythm="QUIET_REORIENTATION"
      data-choice-growth-claim="NONE"
      data-legacy-direct-choice-to-crystal={
        onSediment ? "AVAILABLE" : "ISOLATED"
      }
      data-choice-return-to-reality={
        onExplicitDeparture
          ? "EXPLICIT_REAL_LIFE_DEPARTURE"
          : "UNAVAILABLE"
      }
      data-choice-lived-response={
        livedResponseRecognitionRequired
          ? "AWAITING_USER_RECOGNITION"
          : "NOT_YET_OBSERVED"
      }
      data-choice-response-trace-phase={responseTracePhase}
      data-choice-response-trace-source={responseDimension}
      data-choice-response-trace-slot={responseTraceSourceSlot}
      data-choice-response-trace-continuity="SAME_SOURCE_POSITION_SAME_BODY"
      data-choice-response-trace-form="MERIDIAN_MEMORY_NOT_OBJECT"
      data-choice-response-trace-sequence="FLOW_THEN_SETTLE_THEN_TRACE"
      data-choice-crystal-materialization="NOT_STARTED"
      data-choice-living-change-judge="USER_NOT_SYSTEM"
      data-choice-crystal-eligibility={
        livedResponseRecognitionRequired
          ? "WITHHELD_UNTIL_USER_RECOGNITION"
          : "WITHHELD_UNTIL_LIVED_RESPONSE"
      }
      data-crystal-sediment-readiness={
        onSediment
          ? responseSpaceSettled
            ? "RESPONSE_LIVED"
            : "RESPONSE_SETTLING"
          : "ISOLATED_UNTIL_RESPONSE_IS_LIVED"
      }
      data-transformation-visual-event="RESPONSE_SPACE_WITHOUT_NEW_PATH"
      data-transformation-copy-composition="AWARENESS_NOT_RESULT"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="gy-choice-response-gap__body-continuity"
        data-choice-body-continuity-layer="EXISTING_BIRTH_MANSION_BODY"
      >
        <LifeConstellationLayer
          toneColor={toneColor}
          narrativePhase="node_complete"
          activeNodeIndex={6}
          onCoreStarClick={() => {}}
          visualSource={visualSource}
          pressureIntensity={0.18}
          interactionEnabled={false}
          innerViewRevealDepth={2}
        />
      </div>

      {responseTraceGeometry && responseTracePoint ? (
        <svg
          className="gy-choice-life-trace"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-choice-life-trace="PRE_CRYSTAL_BODY_MEMORY"
          data-choice-life-trace-location="ACTIVE_RESPONSE_SOURCE_SLOT"
          style={{
            position: "absolute",
            zIndex: 1,
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <path
            className="gy-choice-life-trace__bed"
            d={responseTracePath}
            pathLength="1"
            fill="none"
            stroke="rgba(185,203,236,0.12)"
            strokeWidth="0.48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="gy-choice-life-trace__flow"
            d={responseTracePath}
            pathLength="1"
            fill="none"
            stroke="rgba(255,239,190,0.5)"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g className="gy-choice-life-trace__memory">
            <path
              d={`M ${responseTracePoint[0] - 0.38} ${responseTracePoint[1] + 0.12} Q ${responseTracePoint[0]} ${responseTracePoint[1] - 0.38} ${responseTracePoint[0] + 0.42} ${responseTracePoint[1] + 0.08}`}
              fill="none"
              stroke="rgba(255,239,190,0.54)"
              strokeWidth="0.22"
              strokeLinecap="round"
            />
            <circle
              cx={responseTracePoint[0]}
              cy={responseTracePoint[1]}
              r="0.16"
              fill="rgba(255,247,220,0.64)"
            />
          </g>
        </svg>
      ) : null}

      <div
        aria-hidden="true"
        className="gy-choice-response-gap__stillness"
        style={{
          position: "absolute",
          left: "50%",
          top: coreAnchorTop,
          width: 274,
          height: 212,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(255,246,218,0.1), rgba(199,169,107,0.03) 42%, transparent 72%)",
          filter: "blur(8px)",
        }}
      />

      {onSediment ? (
        <button
          type="button"
          aria-label="让这次回应留在生命里"
          data-crystal-sediment-action="CONFIRM_RESPONSE_LIVED"
          data-crystal-reward-model="NONE"
          onClick={onSediment}
          disabled={!responseSpaceSettled}
          style={{
            appearance: "none",
            position: "absolute",
            left: `${LIFE_UNIVERSE_CORE_IDENTITY.anchorX * 100}%`,
            top: coreAnchorTop,
            zIndex: 2,
            width: "min(64vw, 236px)",
            height: "min(28vh, 196px)",
            transform: "translate(-50%, -50%)",
            border: 0,
            borderRadius: "48%",
            background: "transparent",
            padding: 0,
            cursor: responseSpaceSettled ? "pointer" : "default",
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          zIndex: 2,
          right: 30,
          bottom: "max(62px, calc(38px + env(safe-area-inset-bottom)))",
          left: 30,
          display: "grid",
          justifyItems: "center",
          gap: 9,
          textAlign: "center",
          textShadow: "0 0 20px rgba(2,3,6,0.94)",
        }}
      >
        <strong
          data-choice-awareness-copy="POSSIBILITY"
          style={{
            display: "inline-block",
            maxWidth: 300,
            color: "rgba(245,240,226,0.86)",
            fontSize: 15,
            lineHeight: 1.65,
            fontWeight: 580,
            textWrap: "balance",
          }}
        >
          {livedResponseRecognitionRequired
            ? "回看刚才：你认得出一点不同吗？"
            : "过去仍在，但你已经没有立刻跟随。"}
        </strong>
        <span
          style={{
            display: "block",
            color: "rgba(199,169,107,0.5)",
            fontSize: 9.5,
            letterSpacing: "0.08em",
            pointerEvents: "none",
          }}
        >
          {responseSpaceSettled
            ? livedResponseRecognitionRequired
              ? "这次变化，只能由你认出。"
              : onSediment
              ? "轻触生命核心 · 让这次回应留在生命里"
              : "这里留下了一点未被命名的变化"
            : responseTracePhase === "NEW_FLOW"
              ? "新的流动仍在同一身体里"
              : responseTracePhase === "LIFE_SETTLING"
                ? "生命正在重新找到自己的节律"
                : "一点变化，安静留在刚刚回应的位置"}
        </span>
        {livedResponseRecognitionRequired && onRecognizeLivedResponse ? (
          <button
            type="button"
            aria-label="这一次我没有完全被旧回应接管"
            data-choice-lived-response-action="USER_RECOGNIZES_DIFFERENCE"
            data-choice-system-judgement="NONE"
            data-choice-growth-claim="NONE"
            onClick={onRecognizeLivedResponse}
            disabled={!responseSpaceSettled}
            style={{
              appearance: "none",
              minHeight: 38,
              marginTop: 5,
              border: "1px solid rgba(220,205,169,0.26)",
              borderRadius: 999,
              background: "rgba(199,169,107,0.08)",
              padding: "9px 17px",
              color: "rgba(245,240,226,0.82)",
              fontSize: 10.5,
              lineHeight: 1.4,
              letterSpacing: "0.03em",
              opacity: responseSpaceSettled ? 1 : 0,
              cursor: responseSpaceSettled ? "pointer" : "default",
              transition:
                "opacity 620ms ease, border-color 420ms ease, background 420ms ease",
              pointerEvents: "auto",
            }}
          >
            这一次，我没有完全被旧回应接管
          </button>
        ) : null}
        {!onSediment && onExplicitDeparture ? (
          <button
            type="button"
            aria-label={
              livedResponseRecognitionRequired
                ? "我还没有看见不同继续观察"
                : "带着这一步回到生活"
            }
            data-choice-real-life-departure="USER_EXPLICIT_DEPARTURE"
            data-choice-change-claim="NONE"
            data-choice-crystal-claim="NONE"
            onClick={onExplicitDeparture}
            disabled={!responseSpaceSettled}
            style={{
              appearance: "none",
              minHeight: 36,
              marginTop: 5,
              border: "1px solid rgba(220,205,169,0.18)",
              borderRadius: 999,
              background: "rgba(7,9,13,0.34)",
              padding: "8px 16px",
              color: "rgba(245,240,226,0.68)",
              fontSize: 10.5,
              lineHeight: 1.4,
              letterSpacing: "0.04em",
              opacity: responseSpaceSettled ? 1 : 0,
              cursor: responseSpaceSettled ? "pointer" : "default",
              transition:
                "opacity 620ms ease, border-color 420ms ease, background 420ms ease",
            }}
          >
            {livedResponseRecognitionRequired
              ? "我还没有看见不同，继续观察"
              : "带着这一步，回到生活"}
          </button>
        ) : null}
      </div>
    </section>
  );
}

function DormantRealLifeDepartureFocus() {
  return (
    <section
      aria-label="这一步已经被带回生活"
      data-choice-departure-state="DORMANT_REAL_LIFE"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        display: "grid",
        placeItems: "center",
        padding: 30,
        background:
          "radial-gradient(circle at 50% 42%, rgba(199,169,107,0.08), rgba(3,5,9,0.9) 58%, #030509)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
        <strong style={{ color: "rgba(245,240,226,0.88)", fontSize: 16 }}>
          这一步已经被你带回生活。
        </strong>
        <span style={{ color: "rgba(220,205,169,0.62)", fontSize: 12, lineHeight: 1.8 }}>
          不必证明它，也不必现在完成它。
          <br />
          等你愿意回来时，它会在这里等你。
        </span>
      </div>
    </section>
  );
}

function DepartureReconciliationPendingFocus({
  busy,
  onRetry,
}: Readonly<{
  busy: boolean;
  onRetry: () => void;
}>) {
  return (
    <section
      aria-label="离场事实已经保存，生命周期仍在协调"
      data-choice-departure-state="DEPARTURE_RECONCILIATION_PENDING"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        display: "grid",
        placeItems: "center",
        padding: 30,
        background: "rgba(3,5,9,0.94)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <p role="status" style={{ margin: 0, lineHeight: 1.8 }}>
          离场事实已经保存。生命旅程仍在协调，既有资产不会丢失。
        </p>
        <button type="button" disabled={busy} onClick={onRetry}>
          重试协调
        </button>
      </div>
    </section>
  );
}

/* Legacy page-owned Crystal deposit surface intentionally isolated by the
 * atomic Growth Authority cutover. New Formation is rendered only from a
 * confirmed Formation Receipt in the returning-life surface.
function CurrentCrystalEndStateFocus({
  state,
  visualContinuity,
  visualSource,
}: {
  state: CurrentCrystalEndState;
  visualContinuity: GravityEntryVisualContinuity | null;
  visualSource: RealLifeVisualSource | null;
}) {
  const navigate = useNavigate();
  const crystalPresentation = useMemo(
    () => resolveDynamicsCurrentCrystalPresentation({ currentCrystalEndState: state }),
    [state],
  );
  const crystalImprintLine = crystalPresentation.crystalCopy;
  const [sedimentPhase, setSedimentPhase] = useState<
    "SOURCE_RESPONDING" | "ENTERING_BODY" | "BODY_SETTLED"
  >("SOURCE_RESPONDING");
  const [archiveReady, setArchiveReady] = useState(false);
  const [ringLiteState, setRingLiteState] = useState(() => readPersonalityRingLite());
  const ringPresentation = useMemo(
    () => resolveDynamicsPersonalityRingPresentation({
      state: ringLiteState,
      currentCrystalEndState: state,
    }),
    [ringLiteState, state],
  );
  const coreAnchorTop = visualSource
    ? `${LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100}%`
    : "31%";
  const crystalSourceDimension =
    state.transmission.primaryDimension?.trim().toLowerCase() ?? "unknown";
  const crystalSourceSlot = resolveLifeUniverseCrystalSourceSlot(
    crystalSourceDimension,
  );
  const crystalImprintGeometry = useMemo(() => {
    if (visualSource === null) return null;
    const projectionBundle = visualSource.projectionBundle;
    const coordinateProjection =
      projectionBundle.twentyEightMansionCoordinateProjection;
    const morphology =
      projectionBundle.morphologicalFieldAlignmentProjection
        .morphologicalFieldExpression;
    return resolveLifeUniverseCrystalImprintGeometry({
      identityKey: `${visualSource.provenance.sourceReferenceId}:${crystalImprintLine}`,
      birthMansionIndex: coordinateProjection.birthMansion.mansionIndex,
      normalizedOrbitPositions: coordinateProjection.coordinates.map(
        (coordinate) => coordinate.normalizedOrbitPosition,
      ),
      envelopeScale: morphology.envelopeScale,
      postureBias: morphology.postureBias,
      sourceSlot: crystalSourceSlot,
    });
  }, [crystalImprintLine, crystalSourceSlot, visualSource]);
  const responsePositionToBodyPath = crystalImprintGeometry
    ? `M ${crystalImprintGeometry.target[0]} ${crystalImprintGeometry.target[1]} L ${crystalImprintGeometry.stem[0]} ${crystalImprintGeometry.stem[1]} L ${crystalImprintGeometry.branchTarget[0]} ${crystalImprintGeometry.branchTarget[1]}`
    : "";
  const bodySedimentPoint =
    crystalImprintGeometry?.branchTarget ?? null;
  const bodySedimentSettled = sedimentPhase === "BODY_SETTLED";
  const archiveVisualContinuityReady =
    visualContinuity !== null &&
    visualSource !== null &&
    visualContinuity.sourceReferenceId ===
      visualSource.provenance.sourceReferenceId &&
    visualContinuity.consumerSourceResult.consumerSource.sourceReferenceId ===
      visualSource.provenance.sourceReferenceId &&
    visualContinuity.consumerSourceResult.consumerSource.sourceExperienceMode ===
      "REAL_USER_EXPERIENCE" &&
    visualContinuity.consumerSourceResult.consumerSource.sourceProvenance ===
      "REAL_USER_SESSION";

  useEffect(() => {
    const flowTimer = window.setTimeout(() => {
      setSedimentPhase("ENTERING_BODY");
    }, 620);
    const settleTimer = window.setTimeout(() => {
      setSedimentPhase("BODY_SETTLED");
    }, 2_350);
    const archiveTimer = window.setTimeout(() => {
      setArchiveReady(true);
    }, 4_200);
    return () => {
      window.clearTimeout(flowTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(archiveTimer);
    };
  }, []);

  function saveToPersonalityRingLite() {
    const depositResult = depositDynamicsCurrentCrystalToPersonalityRing({
      currentCrystalEndState: state,
    });
    setRingLiteState(depositResult.state);
    if (depositResult.status === "DEPOSITED" || depositResult.status === "DUPLICATE") {
      navigate(GUANYAO_ROUTES.archive, {
        state:
          archiveVisualContinuityReady && visualContinuity
            ? {
                visualContinuity,
                archiveEntryCreatedAt: depositResult.entry.createdAt,
              }
            : {
                archiveEntryCreatedAt: depositResult.entry.createdAt,
              },
      });
    }
  }

  return (
    <section
      aria-label="本局生命印记"
      data-crystal-view="LIFE_IMPRINT"
      data-crystal-visual-form="SAME_LIFE_IMPRINT"
      data-crystal-materialization="SEDIMENT_NOT_REWARD"
      data-crystal-life-surface="EXISTING_REALITY_PRESENCE"
      data-crystal-source-continuity="CHANGED_POSITION_TO_BODY_IMPRINT"
      data-crystal-source-dimension={crystalSourceDimension}
      data-crystal-source-slot={crystalImprintGeometry?.sourceSlot ?? "unavailable"}
      data-crystal-validation-authority="USER_RECOGNIZED_RESPONSE"
      data-crystal-source-anchor="ACTIVE_SIX_DIMENSION_BODY_POSITION"
      data-crystal-sediment-direction="RESPONSE_POSITION_INTO_EXISTING_BODY"
      data-crystal-sediment-phase={sedimentPhase}
      data-crystal-result-form="LIFE_TEXTURE_NOT_OBJECT"
      data-crystal-archive-gate={
        archiveReady ? "BODY_SEDIMENT_SETTLED" : "WAITING_FOR_BODY_SEDIMENT"
      }
      data-crystal-body-attachment={
        crystalImprintGeometry ? "ATTACHED_TO_EXISTING_BODY" : "PENDING_SOURCE"
      }
      data-crystal-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
      data-crystal-emotional-tone="UNDERSTANDING_NOT_CELEBRATION"
      data-crystal-sound="ONE_RESTRAINED_TONE"
      data-crystal-light-event="ONE_POINT"
      data-crystal-completion-language="NAME_AND_ARCHIVE_ONLY"
      data-crystal-imprint-sequence="BODY_IMPRINT_THEN_ARCHIVE"
      data-crystal-hexagram-identity={crystalPresentation.hexagramTitle}
      data-crystal-archive-identity={state.crystal.copy}
      data-base-structure-invariant="true"
      data-life-source-reference={visualSource?.provenance.sourceReferenceId ?? "IDENTITY_UNAVAILABLE"}
      data-crystal-archive-visual-handoff={
        archiveVisualContinuityReady
          ? "MATCHED_REAL_USER_GENESIS_IDENTITY"
          : "IDENTITY_UNAVAILABLE_NO_VISUAL_HANDOFF"
      }
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <CosmicFieldKeyframes />
      {crystalImprintGeometry && bodySedimentPoint ? (
        <svg
          className="gy-crystal-response-sediment"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-crystal-current-body-imprint={
            bodySedimentSettled
              ? "SETTLED_IN_SAME_BODY"
              : "FLOWING_FROM_RECOGNIZED_RESPONSE_POSITION"
          }
          style={{
            position: "absolute",
            zIndex: 1,
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <path
            d={responsePositionToBodyPath}
            fill="none"
            stroke="rgba(255,239,190,0.1)"
            strokeWidth="1.12"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="blur(1.1px)"
          />
          <path
            className="gy-crystal-response-sediment__flow"
            d={responsePositionToBodyPath}
            pathLength="1"
            fill="none"
            stroke="rgba(255,239,190,0.62)"
            strokeWidth="0.36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            className="gy-crystal-response-sediment__origin"
            cx={crystalImprintGeometry.target[0]}
            cy={crystalImprintGeometry.target[1]}
            r="0.72"
            fill="rgba(255,247,220,0.08)"
            stroke="rgba(255,239,190,0.42)"
            strokeWidth="0.2"
          />
          <g className="gy-crystal-response-sediment__body-trace">
            <path
              d={`M ${bodySedimentPoint[0] - 0.62} ${bodySedimentPoint[1] + 0.08} L ${bodySedimentPoint[0] - 0.14} ${bodySedimentPoint[1] - 0.46} L ${bodySedimentPoint[0] + 0.5} ${bodySedimentPoint[1] - 0.12} M ${bodySedimentPoint[0] - 0.14} ${bodySedimentPoint[1] - 0.46} L ${bodySedimentPoint[0] - 0.08} ${bodySedimentPoint[1] + 0.58}`}
              fill="none"
              stroke="rgba(255,239,190,0.68)"
              strokeWidth="0.26"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={bodySedimentPoint[0]}
              cy={bodySedimentPoint[1]}
              r="0.2"
              fill="rgba(255,247,220,0.72)"
            />
          </g>
        </svg>
      ) : null}
      <div
        aria-hidden="true"
        className="gy-crystal-sediment-field"
        style={{
          position: "absolute",
          left: "50%",
          top: coreAnchorTop,
          width: 318,
          height: 318,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,246,218,0.035), transparent 22%), radial-gradient(ellipse, rgba(199,169,107,0.018), transparent 54%)",
          filter: "blur(5px)",
          opacity: 0.28,
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 2,
          right: 30,
          bottom: "max(52px, calc(30px + env(safe-area-inset-bottom)))",
          left: 30,
          display: "grid",
          justifyItems: "center",
          gap: 18,
          textAlign: "center",
          textShadow: "0 0 20px rgba(2,3,6,0.94)",
        }}
      >
        <strong
          data-crystal-imprint-name="CRYSTAL_IMPRINT_LINE"
          style={{
            maxWidth: 310,
            color: "rgba(245,236,210,0.72)",
            fontSize: 13,
            lineHeight: 1.72,
            fontWeight: 540,
            textWrap: "balance",
            opacity: bodySedimentSettled ? 1 : 0,
            transform: `translateY(${bodySedimentSettled ? 0 : 4}px)`,
            transition:
              "opacity 900ms ease, transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1)",
          }}
        >
          {crystalImprintLine}
        </strong>

        <button
          type="button"
          data-crystal-archive-action="PERSONALITY_RING_DEPOSIT"
          data-crystal-archive-transition="SAME_LIFE_UNIVERSE_TRAJECTORY"
          data-crystal-archive-state={ringPresentation.button.status}
          onClick={saveToPersonalityRingLite}
          disabled={ringPresentation.button.disabled || !archiveReady}
          style={{
            appearance: "none",
            border: 0,
            borderBottom: `1px solid rgba(199,169,107,${ringPresentation.button.disabled || !archiveReady ? 0.1 : 0.24})`,
            padding: "5px 2px 6px",
            background: "transparent",
            color:
              ringPresentation.button.disabled || !archiveReady
                ? "rgba(199,169,107,0)"
                : "rgba(235,215,174,0.54)",
            fontSize: 10,
            lineHeight: 1.4,
            letterSpacing: "0.08em",
            opacity: archiveReady ? 1 : 0,
            pointerEvents: archiveReady ? "auto" : "none",
            cursor:
              ringPresentation.button.disabled || !archiveReady
                ? "default"
                : "pointer",
            transition: "opacity 1000ms ease, color 700ms ease",
          }}
        >
          {ringPresentation.button.label}
        </button>
      </div>
    </section>
  );
}
*/
function HexagramCodeDeliveryShell({
  dynamicsInputContext,
  visualContinuity,
  innerViewEntry,
  choiceReturn,
  experienceSmokeFixture,
  surfaceAttempt,
  observationContinuityDecision,
  growthTerminalSummary,
  actionRouteResolution,
  growthSummaryPending,
  onGrowthTerminalSummaryRefreshRequested,
  onObservationRecognitionRequested,
  onLifeSurfaceOutcome,
  onObservationSurfaceOutcome,
}: GravityPageProps) {
  const navigate = useNavigate();
  const [realUserGenesisVisualSourceContext] = useState(() =>
    readRealUserGenesisVisualSourceContext(),
  );
  const realLifeVisualSource = realUserGenesisVisualSourceContext?.visualSource ?? null;
  const routeInnerViewEntry =
    innerViewEntry === "CURRENT_LIFE_WEATHER_BODY_APPROACHED";
  const choiceActionIntentionContinuation =
    choiceReturn === "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED";
  const arrivalVisualContinuity =
    visualContinuity !== null &&
    realLifeVisualSource !== null &&
    visualContinuity.sourceReferenceId ===
      realLifeVisualSource.provenance.sourceReferenceId
      ? visualContinuity
      : null;
  const [arrivalBridgeActive, setArrivalBridgeActive] = useState(
    () => arrivalVisualContinuity !== null,
  );
  const [gravityEntryContinuityActive, setGravityEntryContinuityActive] =
    useState(() => arrivalVisualContinuity !== null);
  const innerViewBodyContinuityActive =
    routeInnerViewEntry && arrivalVisualContinuity !== null;
  const lifeObservationStageWithheld =
    arrivalBridgeActive ||
    (gravityEntryContinuityActive && !innerViewBodyContinuityActive);
  const [contextWhisperVisible, setContextWhisperVisible] = useState(false);
  const [dynamicsInputReadiness] = useState<DynamicsInputReadiness>(() =>
    resolveDynamicsInputReadiness(dynamicsInputContext),
  );
  const [currentHexagramFormation] = useState<CurrentHexagramFormationResult | null>(() =>
    resolveCurrentHexagramFormation(dynamicsInputReadiness),
  );
  const [executionSnapshot, setExecutionSnapshot] = useState<ExecutionSnapshot>(() =>
    GuanyaoRuntimeEngine.createSnapshot(dynamicsInputContext.selectedPressureSeedContext),
  );
  const [activeDimensionIndex, setActiveDimensionIndex] = useState(0);
  const [completedDimensionIds, setCompletedDimensionIds] = useState<readonly SixSpaceId[]>([]);
  const [
    committedChoiceActionIntention,
    setCommittedChoiceActionIntention,
  ] = useState<ChoiceActionIntention | null>(() =>
    observationContinuityDecision.status === "CHOICE_COMMITTED"
      ? observationContinuityDecision.choiceActionIntention
      : null,
  );
  const [choiceAuthorityFeedback, setChoiceAuthorityFeedback] =
    useState<string | null>(null);
  const [choiceReturningAdmission, setChoiceReturningAdmission] =
    useState<XinmaiChoiceReturningProvenanceAdmission | null>(null);
  const choiceMutationPendingRef = useRef(false);
  const [choiceMutationPending, setChoiceMutationPending] =
    useState(false);
  const [innerViewRelation, setInnerViewRelation] = useState<
    "AWAITING" | "CONFIRMED" | "SELF_NAMED"
  >(() =>
    observationContinuityDecision.status ===
      "OBSERVATION_RECOGNIZED" ||
    observationContinuityDecision.status === "CHOICE_COMMITTED"
      ? observationContinuityDecision.recognition ===
          "USER_SELF_NAMED"
        ? "SELF_NAMED"
        : "CONFIRMED"
      : "AWAITING",
  );
  const recoveredObservationPresentationRef =
    useRef<string | null>(null);
  const dimensionTransitionLockRef = useRef(false);
  const runtimeProjection = GuanyaoRuntimeEngine.project(executionSnapshot);
  const {
    sixSpaceConfigs,
    selectedPressureSeedSurface,
    cosmicSixDimensionState,
    cosmicNarrativePhase,
    pressureSeedContext,
  } = runtimeProjection;
  const cosmicBotanicsRuntime = runCosmicBotanicsRuntimeEngine({
    pressureSeed: selectedPressureSeedSurface,
    sixDimensionState: cosmicSixDimensionState,
  });
  const sixSpaceProgress = resolveDynamicsSixSpaceProgress({
    activeDimensionIndex,
    completedDimensionIds,
    completedNodeNumbers: executionSnapshot.node.completed,
    enginePhase: executionSnapshot.runtime.enginePhase,
    spaceConfigs: sixSpaceConfigs,
    sixDimensionState: cosmicBotanicsRuntime.sixDimensionState,
  });
  const sequentialCurrentSpaceId = sixSpaceProgress.currentSpaceId;
  const completedSixDimensionCount = sixSpaceProgress.completedSpaceCount;
  const visualState = resolveDynamicsVisualState({
    completedNodeCount: executionSnapshot.node.completed.length,
    currentNode: executionSnapshot.node.current,
    seedIntensity: executionSnapshot.seed.intensity,
    beastResonance: executionSnapshot.beast.resonance,
    beastTone: executionSnapshot.beast.tone,
    enginePhase: executionSnapshot.runtime.enginePhase,
    uiPhase: executionSnapshot.runtime.uiPhase,
    runtimePrimaryDimension: runtimeProjection.currentPrimarySpaceId,
    sequentialFocalDimension: sequentialCurrentSpaceId,
  });
  const choiceToneColor =
    visualState.colorTemperature || "199,169,107";
  const experienceState = resolveDynamicsExperienceState({
    completedNodeCount: executionSnapshot.node.completed.length,
    currentNode: executionSnapshot.node.current,
    enginePhase: executionSnapshot.runtime.enginePhase,
    uiPhase: executionSnapshot.runtime.uiPhase,
    focalDimension: visualState.focalDimension,
    timelineCurrent: visualState.timeline.current,
    loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
  });
  const motherPresentation = useMemo(
    () => resolveDynamicsMotherPresentation({ context: dynamicsInputContext }),
    [dynamicsInputContext],
  );
  const motherPersonaSnapshot = motherPresentation.personaSnapshot;
  const motherCodeName = motherPresentation.motherCodeName;
  const experienceReadinessPresentation = resolveDynamicsExperienceReadinessPresentation({
    experienceState,
    inputReadiness: dynamicsInputReadiness,
    motherPresentation,
  });
  const displayExperienceState = experienceReadinessPresentation.experienceState;
  const realityPressureRecoveryVisualState =
    arrivalBridgeActive
      ? "PRESSURE_RECOGNIZED"
      : contextWhisperVisible ||
          (executionSnapshot.runtime.uiPhase !== "NODE_RUNNING" &&
            executionSnapshot.runtime.uiPhase !== "COMPLETE")
        ? "PRESSURE_RECOVERING"
        : "PRESSURE_RECOVERED";
  const currentHexagramPresentation = useMemo(
    () => resolveDynamicsCurrentHexagramPresentation({
      formation: currentHexagramFormation,
      motherPresentation,
    }),
    [currentHexagramFormation, motherPresentation],
  );
  const valueFlow = resolveDynamicsValueFlow({
    seedIntensity: executionSnapshot.seed.intensity,
    hasSeedCategory: Boolean(executionSnapshot.seed.category),
    completedNodeCount: executionSnapshot.node.completed.length,
    nodeLocked: executionSnapshot.node.locked,
    enginePhase: executionSnapshot.runtime.enginePhase,
  });
  const hexagramAssetCandidate = resolveHexagramAssetCandidate({
    personaSnapshot: motherPersonaSnapshot,
    selectedPressureSeedContext: pressureSeedContext,
    currentPrimarySpaceId: sequentialCurrentSpaceId,
    completedNodeCount: completedSixDimensionCount,
    starbeastFeedbackComplete: sixSpaceProgress.starbeastFeedbackComplete,
    pressureSeedFallbackText: selectedPressureSeedSurface,
  });
  const changeExperienceRuntime = useMemo(
    () => resolveDynamicsChangeExperienceRuntime({
      formation: currentHexagramFormation,
      experienceSmokeFixture,
    }),
    [currentHexagramFormation, experienceSmokeFixture],
  );
  const singleModelRevisionAction = changeExperienceRuntime.revisionAction;
  const changeExperienceRoute = changeExperienceRuntime.route;
  const changeExperiencePresentation = changeExperienceRuntime.presentation;
  const crystalMigrationImpact = changeExperienceRuntime.migrationImpact;
  const choiceResponseDimension =
    changeExperienceRoute?.dimension ?? sequentialCurrentSpaceId;
  const choiceResponseTraceIdentityKey =
    realLifeVisualSource !== null && singleModelRevisionAction !== null
      ? [
          realLifeVisualSource.provenance.sourceReferenceId,
          singleModelRevisionAction.yaoName,
          choiceResponseDimension,
          "CHOICE_RESPONSE_TRACE",
        ].join(":")
      : null;
  const choiceResponseTraceSourceSlot =
    resolveLifeUniverseCrystalSourceSlot(choiceResponseDimension);
  const choicePresentationDecision =
    resolveChoicePresentationReadiness({
      surfaceAttempt: surfaceAttempt ?? null,
      observationDecision: observationContinuityDecision,
      experienceStage: displayExperienceState.stage,
      formation: currentHexagramFormation,
      assetCandidate: Object.freeze({
        completionState:
          hexagramAssetCandidate.completionState,
        completedNodeCount:
          hexagramAssetCandidate.completedNodeCount,
      }),
      actionRouteResolution,
      growthTerminalSummary,
      operationalState: Object.freeze({
        summaryPending: growthSummaryPending,
        choiceMutationPending,
        recoveryFailure: null,
      }),
    });
  const choicePresentationReady =
    choicePresentationDecision.state ===
    "READY_TO_PRESENT";

  useEffect(() => {
    if (
      observationContinuityDecision.status ===
        "OBSERVATION_RECOGNIZED" ||
      observationContinuityDecision.status === "CHOICE_COMMITTED"
    ) {
      setInnerViewRelation(
        observationContinuityDecision.recognition ===
          "USER_SELF_NAMED"
          ? "SELF_NAMED"
          : "CONFIRMED",
      );
      if (
        recoveredObservationPresentationRef.current !==
        observationContinuityDecision
          .gravityObservationReferenceId
      ) {
        recoveredObservationPresentationRef.current =
          observationContinuityDecision
            .gravityObservationReferenceId;
        const finalDimension =
          DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS[
            DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.length - 1
          ];
        setActiveDimensionIndex(
          DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.length - 1,
        );
        setCompletedDimensionIds(
          Object.freeze([
            ...DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS,
          ]),
        );
        setExecutionSnapshot(
          completeCurrentSpaceWithExistingEngine(
            createNodeRunningExecutionSnapshot(
              dynamicsInputContext.selectedPressureSeedContext,
            ),
            {
              dimension: finalDimension,
              context: "focus",
              triggerStrength: 1,
            },
          ),
        );
      }
    }
  }, [
    dynamicsInputContext.selectedPressureSeedContext,
    observationContinuityDecision,
  ]);

  useEffect(() => {
    if (
      choicePresentationDecision.state ===
        "RESUME_COMMITTED" ||
      choicePresentationDecision.state ===
        "TERMINAL_BY_GROWTH"
    ) {
      setCommittedChoiceActionIntention(
        choicePresentationDecision.choiceActionIntention,
      );
      setChoiceMutationPending(false);
    }
  }, [
    choicePresentationDecision.state,
    choicePresentationDecision.choiceActionIntention,
  ]);

  useEffect(() => {
    if (
      !growthSummaryPending &&
      growthTerminalSummary.state !== "NONE"
    ) {
      setChoiceMutationPending(false);
    }
  }, [
    growthSummaryPending,
    growthTerminalSummary.state,
  ]);

  useEffect(() => {
    let cancelled = false;
    if (
      committedChoiceActionIntention === null ||
      arrivalVisualContinuity === null
    ) {
      setChoiceReturningAdmission(null);
      return () => {
        cancelled = true;
      };
    }
    const identityRecovery = recoverRealityRecognizedIdentity({
      visualContinuity: arrivalVisualContinuity,
    });
    if (identityRecovery.status !== "READY") {
      setChoiceReturningAdmission(null);
      return () => {
        cancelled = true;
      };
    }
    void readXinmaiChoiceReturningProvenanceRecovery(
      identityRecovery.identityReferences,
    ).then((admissions) => {
      if (cancelled) return;
      setChoiceReturningAdmission(
        admissions.find(
          (admission) =>
            admission.intention?.choiceActionIntentionReferenceId ===
            committedChoiceActionIntention.choiceActionIntentionReferenceId,
        ) ?? null,
      );
    });
    return () => {
      cancelled = true;
    };
  }, [arrivalVisualContinuity, committedChoiceActionIntention]);

  async function handleInnerViewRelationEstablished(
    relation: "CONFIRMED" | "SELF_NAMED",
  ): Promise<boolean> {
    if (
      observationContinuityDecision.status !==
      "OBSERVATION_AVAILABLE"
    ) {
      return (
        observationContinuityDecision.status ===
          "OBSERVATION_RECOGNIZED" ||
        observationContinuityDecision.status === "CHOICE_COMMITTED"
      );
    }
    const result = await onObservationRecognitionRequested(
      relation === "SELF_NAMED"
        ? "USER_SELF_NAMED"
        : "USER_CONFIRMED",
      observationContinuityDecision.checkpointRevision,
    );
    if (
      result.status !== "RECOGNIZED" &&
      result.status !== "ALREADY_RECOGNIZED"
    ) {
      setChoiceAuthorityFeedback(
        "这次看见还没有被完整保存，请稍后再试。",
      );
      return false;
    }
    setChoiceAuthorityFeedback(null);
    setInnerViewRelation(relation);
    return true;
  }

  useEffect(() => {
    if (!arrivalBridgeActive || arrivalVisualContinuity === null) return;
    const timer = window.setTimeout(() => {
      setArrivalBridgeActive(false);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [arrivalBridgeActive, arrivalVisualContinuity]);

  useEffect(() => {
    if (
      !gravityEntryContinuityActive ||
      arrivalVisualContinuity === null
    ) {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setGravityEntryContinuityActive(false);
    }, 4_800);
    return () => window.clearTimeout(timer);
  }, [gravityEntryContinuityActive, arrivalVisualContinuity]);

  useEffect(() => {
    if (arrivalBridgeActive || gravityEntryContinuityActive) {
      setContextWhisperVisible(false);
      return undefined;
    }
    setContextWhisperVisible(true);
    const timer = window.setTimeout(() => {
      setContextWhisperVisible(false);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [arrivalBridgeActive, gravityEntryContinuityActive]);

  useEffect(() => {
    dimensionTransitionLockRef.current = false;
  }, [activeDimensionIndex, executionSnapshot.node.current, executionSnapshot.runtime.enginePhase]);

  async function handleRevisionActionConfirm() {
    if (choiceMutationPendingRef.current) return;
    if (
      choicePresentationDecision.state !==
      "READY_TO_PRESENT"
    ) {
      setChoiceAuthorityFeedback(
        "这次回应还没有被完整保存，请稍后再试。",
      );
      return;
    }
    choiceMutationPendingRef.current = true;
    setChoiceMutationPending(true);
    let awaitingCanonicalSummary = false;
    try {
      const result = await commitChoiceActionIntention(
        choicePresentationDecision.structuralInput,
      );
      if (
        result.status !== "COMMITTED" &&
        result.status !== "ALREADY_COMMITTED"
      ) {
        setChoiceAuthorityFeedback(
          "这次回应还没有被完整保存，请稍后再试。",
        );
        return;
      }
      setChoiceAuthorityFeedback(null);
      setCommittedChoiceActionIntention(result.intention);
      awaitingCanonicalSummary = true;
      await onGrowthTerminalSummaryRefreshRequested();
    } catch {
      awaitingCanonicalSummary = false;
      setChoiceAuthorityFeedback(
        "这次回应还没有被完整保存，请稍后再试。",
      );
    } finally {
      choiceMutationPendingRef.current = false;
      if (!awaitingCanonicalSummary) {
        setChoiceMutationPending(false);
      }
    }
  }

  async function handleChoiceExplicitDeparture() {
    if (
      committedChoiceActionIntention === null ||
      choiceMutationPendingRef.current
    ) return;
    const identityRecovery = recoverRealityRecognizedIdentity({
      visualContinuity: arrivalVisualContinuity,
    });
    if (identityRecovery.status !== "READY") return;
    choiceMutationPendingRef.current = true;
    setChoiceMutationPending(true);
    try {
      const departed = await confirmXinmaiChoiceExplicitDeparture({
        intention: committedChoiceActionIntention,
        expectedIntentionRevision: committedChoiceActionIntention.revision,
        identityReferences: identityRecovery.identityReferences,
      });
      if (
        departed.status !== "DEPARTED" &&
        departed.status !== "ALREADY_DEPARTED" &&
        departed.status !== "DEPARTURE_RECONCILIATION_PENDING"
      ) {
        setChoiceAuthorityFeedback(
          "这一步还没有被完整保存，请稍后再试。",
        );
        return;
      }
      if (departed.status === "DEPARTURE_RECONCILIATION_PENDING") {
        setChoiceAuthorityFeedback(
          "离场事实已保存，生命周期仍在协调。可以安全重试。",
        );
        setChoiceReturningAdmission(
          Object.freeze({
            state: "DEPARTURE_RECONCILIATION_PENDING" as const,
            intention: departed.intention,
            departureReceipt: departed.receipt,
            returnReceipt: null,
            currentFact: null,
            currentEligibility: null,
            formationReceipt: null,
            reason: "DEPARTURE_RECONCILIATION_PENDING" as const,
          }),
        );
        return;
      }
      setChoiceAuthorityFeedback(null);
      setChoiceReturningAdmission(
        Object.freeze({
          state: "DORMANT_DEPARTURE" as const,
          intention: departed.intention,
          departureReceipt: departed.receipt,
          returnReceipt: null,
          currentFact: null,
          currentEligibility: null,
          formationReceipt: null,
          reason: null,
        }),
      );
    } finally {
      choiceMutationPendingRef.current = false;
      setChoiceMutationPending(false);
    }
  }

  function handleSpatialInteraction(eventType: SpatialIntent["type"], context: SpatialIntent["payload"] = {}) {
    if (eventType !== "CORE_STAR_BLOOM") {
      setExecutionSnapshot((current) => GuanyaoRuntimeEngine.run(current, { type: eventType, payload: context }));
      return;
    }

    if (executionSnapshot.runtime.enginePhase === "COMPLETE") return;
    if (dimensionTransitionLockRef.current) return;
    dimensionTransitionLockRef.current = true;

    const completedSpaceSnapshot = completeCurrentSpaceWithExistingEngine(
      executionSnapshot,
      context,
    );

    setCompletedDimensionIds((previous) =>
      previous.includes(sequentialCurrentSpaceId) ? previous : [...previous, sequentialCurrentSpaceId],
    );

    if (activeDimensionIndex < DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.length - 1) {
      setActiveDimensionIndex((previous) => Math.min(DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.length - 1, previous + 1));
      setExecutionSnapshot(createNodeRunningExecutionSnapshot(dynamicsInputContext.selectedPressureSeedContext));
      return;
    }

    setExecutionSnapshot(completedSpaceSnapshot);
  }

  function bloomCosmicNode() {
    handleSpatialInteraction("CORE_STAR_BLOOM", {
      nodeIndex: executionSnapshot.node.current,
      dimension: sequentialCurrentSpaceId,
      context: "focus",
      triggerStrength: 1,
    });
  }

  useEffect(() => {
    const seedTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) => {
        const nextEngine =
          current.runtime.enginePhase === "INIT"
            ? GuanyaoRuntimeEngine.run(current, { type: "SET_ENGINE_PHASE", payload: { enginePhase: "SEED_ACTIVE" } })
            : current;
        return current.runtime.uiPhase === "INIT"
          ? GuanyaoRuntimeEngine.run(nextEngine, { type: "SET_UI_PHASE", payload: { uiPhase: "SEED_ACTIVE" } })
          : nextEngine;
      });
    }, 950);
    const beastTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) =>
        current.runtime.uiPhase === "SEED_ACTIVE" || current.runtime.uiPhase === "INIT"
          ? GuanyaoRuntimeEngine.run(current, { type: "SET_UI_PHASE", payload: { uiPhase: "DIMENSION_LOCKED" } })
          : current,
      );
    }, 2400);
    const nodeTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) => {
        const nextEngine =
          current.runtime.enginePhase === "SEED_ACTIVE" || current.runtime.enginePhase === "INIT"
            ? GuanyaoRuntimeEngine.run(current, { type: "SET_ENGINE_PHASE", payload: { enginePhase: "NODE_RUNNING" } })
            : current;
        return current.runtime.uiPhase === "DIMENSION_LOCKED" || current.runtime.uiPhase === "SEED_ACTIVE" || current.runtime.uiPhase === "INIT"
          ? GuanyaoRuntimeEngine.run(nextEngine, { type: "SET_UI_PHASE", payload: { uiPhase: "NODE_RUNNING" } })
          : nextEngine;
      });
    }, 3600);

    return () => {
      window.clearTimeout(seedTimer);
      window.clearTimeout(beastTimer);
      window.clearTimeout(nodeTimer);
    };
  }, []);

  if (USE_COSMIC_BOTANICS_SIX_SPACE || LEGACY_DYNAMICS_FLOW_ISOLATED) {
    return (
      <main
        data-product-definition={GUANYAO_PRODUCT_RUNTIME_DEFINITION.officialDefinition}
        data-product-model={GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel}
        data-product-positioning={GUANYAO_PRODUCT_RUNTIME_DEFINITION.positioning}
        data-product-onboarding={GUANYAO_PRODUCT_RUNTIME_DEFINITION.onboardingFlow.join("|")}
        data-product-perception={GUANYAO_PRODUCT_RUNTIME_DEFINITION.userPerception.join("|")}
        data-dynamics-mother-context={motherPersonaSnapshot ? "connected" : "missing"}
        data-dynamics-pressure-context={experienceReadinessPresentation.pressureContextMarker}
        data-dynamics-current-hexagram={currentHexagramPresentation ? "connected" : "missing"}
        data-dynamics-mother-code={motherCodeName || "missing"}
        data-dynamics-four-beast={motherPersonaSnapshot?.fourSymbol ?? "missing"}
        data-dynamics-lower-trigram={currentHexagramPresentation?.lowerTrigram ?? "missing"}
        data-dynamics-upper-trigram={currentHexagramPresentation?.upperTrigram ?? "missing"}
        data-dynamics-observation-rhythm="ONE_GESTURE_PER_SPACE"
        data-gravity-inertia-rhythm="REPEATED_PATH_OBSERVATION"
        data-gravity-entry-continuity={
          gravityEntryContinuityActive
            ? "SAME_RESPONSE_BECOMING_TENDENCY"
            : "OBSERVATION_READY"
        }
        data-gravity-observation-reference={
          observationContinuityDecision.gravityObservationReferenceId
        }
        data-gravity-observation-continuity-state={
          observationContinuityDecision.status
        }
        data-gravity-observation-checkpoint-revision={
          observationContinuityDecision.checkpointRevision
        }
        data-gravity-observation-authority="TYPED_RESUME_DECISION_READ_ONLY_MIRROR"
        data-inner-view-entry-continuity={
          innerViewBodyContinuityActive
            ? "SAME_BODY_FROM_CURRENT_LIFE_WEATHER"
            : "DIRECT_GRAVITY_OBSERVATION"
        }
        data-inner-view-first-frame={
          innerViewBodyContinuityActive
            ? "SAME_RESPONSE_POINT_WITH_EXISTING_MERIDIAN"
            : "DIRECT_OBSERVATION"
        }
        data-inner-view-first-depth={
          observationContinuityDecision.status ===
            "CHOICE_COMMITTED"
            ? "CHOICE_COMMITTED"
            : observationContinuityDecision.status ===
                "OBSERVATION_RECOGNIZED"
              ? "RECOGNIZED"
              : innerViewBodyContinuityActive
                ? "FIRST_APPROACH"
                : "OBSERVING"
        }
        data-inner-view-analysis-stage="USER_LED_OBSERVATION_NOT_ANALYSIS"
        data-choice-response-state={
          choicePresentationDecision.state ===
          "RESUME_COMMITTED"
            ? "ACTION_INTENTION_COMMITTED"
            : choicePresentationDecision.state ===
                "READY_TO_PRESENT"
              ? "READY_TO_PRESENT"
              : choicePresentationDecision.state ===
                  "TERMINAL_BY_GROWTH"
                ? "TERMINAL_BY_GROWTH"
                : choicePresentationDecision.state ===
                    "SAFE_WITHHELD"
                  ? "SAFE_WITHHELD"
              : choiceActionIntentionContinuation
                ? "NEW_RESPONSE_POSSIBILITY"
                : "INACTIVE"
        }
        data-choice-presentation-readiness={
          choicePresentationDecision.state
        }
        data-choice-presentation-reason={
          choicePresentationDecision.reason
        }
        data-choice-growth-terminal-summary={
          growthTerminalSummary.state
        }
        data-choice-identity-effect="RESPONSE_ONLY"
        data-choice-body-continuity="SAME_CORE_SAME_BODY"
        data-choice-rhythm-validation={
          choiceActionIntentionContinuation
            ? "NEW_REALITY_RESPONSE_UNDER_OBSERVATION"
            : "NOT_ACTIVE"
        }
        data-choice-growth-claim="NONE"
        data-choice-answer-model="NONE"
        data-choice-protective-sequence="UNDERSTAND_PAUSE_PARTICIPATE"
        data-choice-inner-view-relation={innerViewRelation}
        data-choice-inner-view-continuity="OBSERVE_UNDERSTAND_PAUSE_RESPOND"
        data-choice-reality-continuity="SAME_LIFE_NEW_REALITY"
        data-choice-lived-response={
          choiceActionIntentionContinuation
            ? "AWAITING_USER_RETURN_FACT"
            : "NOT_YET_REPORTED"
        }
        data-choice-living-change-judge="USER_NOT_SYSTEM"
        data-choice-crystal-eligibility={
          "WITHHELD_UNTIL_USER_CONFIRMED_LIVED_RESPONSE"
        }
        data-legacy-direct-choice-to-crystal={
          LEGACY_DIRECT_CHOICE_TO_CRYSTAL_FLOW_ISOLATED
            ? "ISOLATED"
            : "AVAILABLE"
        }
        data-reality-pressure-recovery-state={
          realityPressureRecoveryVisualState
        }
        data-reality-pressure-recovery-meaning="SAME_LIFE_NEW_EQUILIBRIUM"
        data-reality-pressure-memory="EXPERIENCE_RETAINED"
        data-reality-core-identity="STABLE"
        data-choice-crystal-stage={
          "FORMATION_AUTHORITY_OWNED_BY_RETURNING_LIVED_RESPONSE"
        }
        style={{
          height: "100dvh",
          minHeight: "100dvh",
          width: "100%",
          boxSizing: "border-box",
          padding: 0,
          display: "block",
          background:
            "radial-gradient(circle at 50% 36%, rgba(199,169,107,0.04), transparent 34%), #020306",
          color: "#f5f5f5",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {arrivalVisualContinuity ? (
          <div
            className="gy-reality-life-universe"
            data-dynamics-life-universe-background="PERSISTENT"
            data-reality-pressure-visual-state={
              realityPressureRecoveryVisualState
            }
            data-source-reference-id={arrivalVisualContinuity.sourceReferenceId}
            style={{
              position: "absolute",
              zIndex: 0,
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <Suspense fallback={null}>
              <RealityLifeUniverseCanvas
                visualContinuity={arrivalVisualContinuity}
                selectedPressureSeedContext={
                  dynamicsInputContext.selectedPressureSeedContext
                }
                innerViewApproachState={
                  innerViewBodyContinuityActive
                    ? "BODY_APPROACHED"
                    : "INACTIVE"
                }
                gravitySurfaceAdmissionAttempt={surfaceAttempt}
                onGravityLifeSurfaceOutcome={onLifeSurfaceOutcome}
              />
            </Suspense>
            <RealityGravityInertiaField
              repetitionDepth={activeDimensionIndex + 1}
              activeObservation={
                SIX_SPACE_SHORT_LABELS[sequentialCurrentSpaceId]
              }
              visible={
                !arrivalBridgeActive &&
                (surfaceAttempt !== undefined ||
                  (gravityEntryContinuityActive &&
                    !innerViewBodyContinuityActive) ||
                  cosmicNarrativePhase === "node_active" ||
                  cosmicNarrativePhase === "node_complete")
              }
              gravitySurfaceAdmissionAttempt={surfaceAttempt}
              onGravityObservationSurfaceOutcome={
                onObservationSurfaceOutcome
              }
            />
          </div>
        ) : (
          <CosmicPageStarField />
        )}
        {arrivalBridgeActive && arrivalVisualContinuity ? (
          <div
            data-dynamics-arrival-bridge="REALITY_VISUAL_CONTINUITY"
            data-inner-view-arrival={
              innerViewBodyContinuityActive
                ? "SAME_RESPONSE_POINT"
                : "DIRECT_GRAVITY"
            }
            data-inner-view-meridian-stage={
              innerViewBodyContinuityActive
                ? "EXISTING_MERIDIAN_APPROACH"
                : "NOT_ACTIVE"
            }
            data-source-reference-id={arrivalVisualContinuity.sourceReferenceId}
            style={{
              position: "fixed",
              zIndex: 20,
              inset: 0,
              pointerEvents: "none",
              animation:
                "gy-gravity-continuity-arrival 1500ms cubic-bezier(0.22, 0.7, 0.2, 1) both",
            }}
          >
            <div
              className="gy-reality-life-universe__disturbance"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
            <p className="gy-reality-life-universe__continuity-copy">
              {innerViewBodyContinuityActive
                ? "刚才回应的地方，开始显出生命的流动。"
                : "同一束生命光，开始进入现实引力。"}
            </p>
          </div>
        ) : null}

        <section
          data-dynamics-context-whisper="ENTRY_ONLY_THEN_DEEP_SPACE"
          data-dynamics-context-whisper-state={
            contextWhisperVisible ? "VISIBLE" : "DEEP_SPACE"
          }
          style={{
            position: "absolute",
            zIndex: 6,
            top: "max(26px, env(safe-area-inset-top))",
            left: 22,
            right: 22,
            display: "grid",
            justifyItems: "center",
            gap: 7,
            opacity: contextWhisperVisible ? 0.78 : 0,
            transform: `translateY(${contextWhisperVisible ? 0 : -5}px)`,
            transition:
              "opacity 680ms ease, transform 680ms cubic-bezier(0.22, 0.7, 0.2, 1)",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "rgba(220,205,169,0.5)",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
            }}
          >
            {displayExperienceState.loopLabel}
          </span>

          <p style={{ margin: 0, maxWidth: 286, color: "rgba(245,240,226,0.62)", fontSize: 12, lineHeight: 1.55 }}>
            {displayExperienceState.headline}
          </p>
        </section>

        <section
          data-dynamics-visual-stage="FULLSCREEN_LIFE_UNIVERSE"
          data-inner-view-visual-continuity={
            innerViewBodyContinuityActive
              ? "SAME_BODY_REVEALED_AFTER_ARRIVAL_BREATH"
              : "DEFAULT"
          }
          aria-hidden={
            lifeObservationStageWithheld ? "true" : undefined
          }
          style={{
            position: "absolute",
            zIndex: 3,
            inset: 0,
            opacity: lifeObservationStageWithheld ? 0 : 1,
            transition: "opacity 820ms ease",
            pointerEvents: lifeObservationStageWithheld ? "none" : "auto",
          }}
        >
          {choiceReturningAdmission?.state === "DORMANT_DEPARTURE" ? (
            <DormantRealLifeDepartureFocus />
          ) : choiceReturningAdmission?.state ===
            "DEPARTURE_RECONCILIATION_PENDING" ? (
            <DepartureReconciliationPendingFocus
              busy={choiceMutationPending}
              onRetry={() => void handleChoiceExplicitDeparture()}
            />
          ) : choicePresentationDecision.state ===
            "RESUME_COMMITTED" &&
          committedChoiceActionIntention ? (
            <TransformationMomentFocus
              action={
                committedChoiceActionIntention
                  .formationSourceSnapshot.action
              }
              presentation={changeExperiencePresentation}
              responseDimension={
                choiceResponseDimension
              }
              responseTraceIdentityKey={choiceResponseTraceIdentityKey}
              onSediment={undefined}
              onExplicitDeparture={handleChoiceExplicitDeparture}
              livedResponseRecognitionRequired={false}
              onRecognizeLivedResponse={undefined}
              visualSource={realLifeVisualSource}
              toneColor={choiceToneColor}
              innerViewRelation={innerViewRelation}
            />
          ) : choicePresentationReady &&
            choicePresentationDecision.state ===
              "READY_TO_PRESENT" ? (
            <SingleModelRevisionActionFocus
              actionRoute={
                choicePresentationDecision.actionRouteCandidate
              }
              onConfirm={handleRevisionActionConfirm}
              visualSource={realLifeVisualSource}
              toneColor={choiceToneColor}
              innerViewRelation={innerViewRelation}
            />
          ) : (
            <CosmicBotanicsField
              configs={sixSpaceConfigs}
              activeDimensionStep={sixSpaceProgress.currentSpaceStep}
              pressureSeedSurface={selectedPressureSeedSurface}
              petalStates={sixSpaceProgress.petalStates}
              activeNodeIndex={sixSpaceProgress.completedInnerNodeCount}
              narrativePhase={cosmicNarrativePhase}
              onNodeBloom={bloomCosmicNode}
              visualSource={realLifeVisualSource}
              visualState={visualState}
              experienceState={displayExperienceState}
              innerViewEntryEstablished={
                routeInnerViewEntry && arrivalVisualContinuity !== null
              }
              initialInnerViewRelation={innerViewRelation}
              onInnerViewRelationEstablished={
                handleInnerViewRelationEstablished
              }
            />
          )}
        </section>

        <footer
          data-hexagram-asset-candidate-status={hexagramAssetCandidate.status}
          data-hexagram-asset-candidate-state={hexagramAssetCandidate.completionState}
          data-current-crystal-end-state="FORMATION_RECEIPT_REQUIRED"
          data-model-revision-action={
            choicePresentationDecision.state ===
            "READY_TO_PRESENT"
              ? "pending"
              : choicePresentationDecision.state ===
                  "RESUME_COMMITTED"
                ? "response_space_open"
                : choicePresentationDecision.state ===
                    "TERMINAL_BY_GROWTH"
                  ? "terminal_by_growth"
                  : choicePresentationDecision.state ===
                      "SAFE_WITHHELD"
                    ? "safe_withheld"
                  : "inactive"
          }
          data-change-experience-presentation={
            choicePresentationDecision.state ===
            "READY_TO_PRESENT"
              ? choicePresentationDecision
                  .actionRouteCandidate.prototypeId
              : "inactive"
          }
          data-value-flow-behavior={valueFlow.behaviorSignals.join("|") || "NONE"}
          data-value-flow-pressure={valueFlow.pressureState}
          data-value-flow-emotion={valueFlow.emotionalState}
          data-value-flow-asset={valueFlow.assetTrigger}
          data-value-flow-monetization={valueFlow.monetizationEvent}
          style={{
            position: "absolute",
            zIndex: 7,
            right: 22,
            bottom: "max(16px, env(safe-area-inset-bottom))",
            left: 22,
            display: "block",
            color: "rgba(245,245,245,0.38)",
            fontSize: 10,
            lineHeight: 1.55,
            pointerEvents: "none",
            opacity:
              arrivalBridgeActive || gravityEntryContinuityActive ? 0 : 1,
            transition: "opacity 520ms ease",
          }}
        >
          {choicePresentationDecision.state !== "WITHHELD" ? "" : cosmicNarrativePhase === "node_complete" &&
            hexagramAssetCandidate.completionState === "READY_TO_CRYSTALLIZE"
              ? displayExperienceState.crystalCopy
              : ""}
        </footer>
        {choiceAuthorityFeedback ? (
          <p
            role="status"
            style={{
              position: "absolute",
              zIndex: 8,
              right: 24,
              bottom: 24,
              left: 24,
              margin: 0,
              textAlign: "center",
              color: "rgba(245,240,226,0.66)",
              fontSize: 11,
            }}
          >
            {choiceAuthorityFeedback}
          </p>
        ) : null}
      </main>
    );
  }



  // DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW.
  return <LegacyDynamicsDormant branch="six-space-weapon-annular-asset" />;
}

export function GravityPage(props: GravityPageProps) {
  return <HexagramCodeDeliveryShell {...props} />;
}
