// ─────────────────────────────────────────────────────────────────────────────
// 观爻 1.0 · ENTRY MODEL —— /launch-lab
//
// Before birth time is locked, this is a public celestial clock: 28 equal
// coordinates, four neutral regions and seven moving luminaries. The entrance
// light remains as one identity-blind carrier while time flows into it;
// personal mansion, Four-Symbol seal and mother code may only appear after the
// time coordinate has been confirmed.
// ─────────────────────────────────────────────────────────────────────────────

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { EntryCardRendererOptions } from "../components/entry/EntryCardRenderer";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import {
  getFourBeastTrigramVisualGrammar,
  type FourBeastTrigramVisualGrammarItem,
} from "../data/fourBeastTrigramVisualGrammar";
import type { PressureSeedCrossAxisSeed } from "./PressureSeedCrossAxisPage";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getEntryUserType } from "../runtime/entry/entryDecision";
import { getNodeTransitionLerp } from "../runtime/node/perception/nodeTransitionLerp";
import { resolveStarbeastRenderState } from "../runtime/starbeast/starbeastRenderState";
import { getPressureSeedSceneTriplet } from "../services/guanyaoPressureSeedSceneBindingService";
import type { GeoChronoMotherFusionResult } from "../types/guanyaoGeoChronoMotherFusion";
import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { LaunchOriginMotherInput } from "../types/guanyaoLaunchOriginMother";
import type { FourSymbol } from "../types/guanyaoStarbeast";
import type { DynamicsMotherHandoff } from "../types/gravityRuntimeInput";
import { buildDynamicsMotherHandoff } from "../services/guanyaoDynamicsMotherHandoffAdapter";
import {
  resolveLaunchOriginMother,
  resolveLaunchOriginMotherSourceResults,
} from "../services/guanyaoLaunchOriginMotherInputAdapter";
import { createLaunchLifeSourceSession } from "../services/launchLifeSourceSession";
import { resolveLaunchGenesisProductionRouteHandoff } from "../services/launchGenesisProductionRouteHandoff";
import { resolveLaunchLifeVisualSource } from "../services/launchLifeVisualSourceResolver";
import {
  activateRealUserGenesisVisualSourceContext,
  clearRealUserGenesisVisualSourceContext,
} from "../services/realUserGenesisVisualSourceContext";
import {
  clearStarBeastRelationshipNamingAsset,
  createStarBeastRelationshipNamingAsset,
  deleteStarBeastRelationshipNamingAsset,
  hasPersistedRecognizedLifeIdentity,
  persistLaunchLifeSourceSession,
  readPersistedGenesisVisualContinuity,
  readStarBeastRelationshipNamingAsset,
  renameStarBeastRelationshipNamingAsset,
  restorePersistedRealUserGenesisVisualSourceContext,
} from "../services/sessionService";
import {
  STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS,
  type StarBeastRelationshipNamingReadResult,
} from "../types/starBeastRelationshipNamingAsset";
import {
  resolveLifeWhisperRealityEntryIntent,
  resolveRelationshipNameDeletePresentation,
} from "../services/xinmaiRelationshipNamingPresentationState";
import { resolveLifeWhisperVisualOutcomeTransition } from "../services/xinmaiLifeWhisperVisualOutcomeTransition";
import { recoverRealityRecognizedIdentity } from "../services/realityRecognizedIdentityRecoveryAdapter";
import { requestRealityEncounter } from "../services/xinmaiRealityEncounterIntentController";
import type {
  LifeWhisperRelationshipFact,
  LifeWhisperRelationshipResponsePhase,
  LifeWhisperSurfaceVisualResponseOutcome,
  LifeWhisperUnavailableContinuation,
} from "../types/xinmaiLifeWhisperRelationship";
import type {
  RealityExplicitLeaveNavigationDeliveryTicket,
  ReturningLifeWorldDeliveryOutcome,
} from "../types/realityExplicitLeaveNavigationDelivery";
import {
  projectReturningLifeWorldDeliveryOutcomes,
  projectReturningLifeWorldSurfaceReady,
} from "../services/realityExplicitLeaveNavigationDeliveryRuntimePort";
import { resolveDynamicsInputContext } from "../services/guanyaoDynamicsInputContextAdapter";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { XinmaiLivedResponseReturnSurface } from "../components/XinmaiLivedResponseReturnSurface";
import {
  readOpenXinmaiLivedGrowthReturnItems,
  type XinmaiLivedGrowthReturnItem,
} from "../services/xinmaiChoiceActionIntentionController";
import { subscribeToXinmaiLivedGrowthRecoveryRevision } from "../services/xinmaiLivedGrowthRecoveryRevisionObserver";
import { writeMotherCodeProfile } from "../services/guanyaoMotherCodeProfilePersistenceAdapter";
import { writeOriginMotherContext } from "../services/guanyaoOriginMotherContextPersistenceAdapter";
import { writePersonaOutputSnapshot } from "../services/guanyaoPersonaSnapshotPersistenceAdapter";
import { resolveBirthCalendarFromGregorianDate } from "../services/guanyaoBirthCalendarService";
import {
  drawLifeUniverseDeepSpace2D,
  drawLifeUniverseCore2D,
  LIFE_UNIVERSE_STAR_FIELD,
  projectLifeUniverseStarToViewport,
  resolveLifeUniverseCrystalImprintGeometry,
  resolveLifeUniverseCrystalSourceSlot,
  resolveLifeUniverseCoreFrame,
} from "../renderers/lifeUniverseStarField";

const RealityLifeUniverseCanvas = lazy(() =>
  import("../components/RealityLifeUniverseCanvas").then((module) => ({
    default: module.RealityLifeUniverseCanvas,
  })),
);

const SANS = "-apple-system, system-ui, sans-serif";
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

const MANSION_COORDINATES = Object.freeze(
  Array.from({ length: 28 }, (_, index) => Object.freeze({ index })),
);

const CFG = {
  moonReleaseSeconds: 1.65,
  convergeMs: 2.4,
  starfield: 420,
  firstPresenceSeconds: 2.1,
};

const RETURNING_LIFE_WHISPER_OUTCOME_WATCHDOG_MS = 6_000;

// The existing origin adapter still accepts a geo compatibility field. The
// production flow no longer asks for birthplace, so never fabricate a place.
const UNCOLLECTED_BIRTH_CONTEXT = Object.freeze({
  province: "未采集",
  city: "未采集",
});

const COLOR = {
  bg: "#020306",
  warm: "#E8C88A",
  warmBright: "#FFF3D0",
  field: "185,203,236", // 同一星河 = 冷银蓝（阴·散光）
  nebula: "37,48,72",
  text: "#F4ECD8",
};

// Visual tone only; user-facing meaning remains pressure transformation.
const PAL = {
  coolWhite: [185, 203, 236] as [number, number, number],
  gold: [232, 200, 138] as [number, number, number],
  cream: [255, 243, 208] as [number, number, number],
};
function mixRGB(a: [number, number, number], b: [number, number, number], t: number) {
  return `${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))}`;
}

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smooth(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

// TAIYIN_PRESENT / QUIET_ROUND_MOON: the first visible face of the life light
// carries the order of time. It never leaves the shared universe anchor; the
// time surface simply becomes legible when the user enters their birth time.
function drawTaiyinMoonEntrance(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  universeSeconds: number,
  revealProgress: number,
  releaseProgress: number,
) {
  const reveal = clamp(revealProgress, 0, 1);
  const release = clamp(releaseProgress, 0, 1);
  if (reveal <= 0.001) return;

  const coreFrame = resolveLifeUniverseCoreFrame(width, height, universeSeconds);
  const breath = 1 + Math.sin(universeSeconds * 0.58) * 0.018;
  const moonRadius = clamp(width * 0.045, 15, 18) * breath;
  const diskAlpha = reveal * (1 - smooth(0.16, 0.78, release));

  ctx.save();
  ctx.translate(coreFrame.x, coreFrame.y);

  if (release > 0.001) {
    const wave = smooth(0, 1, release);
    const orbitRadius = lerp(moonRadius * 1.45, Math.min(width * 0.43, 168), wave);
    ctx.save();
    ctx.scale(1, 0.44);
    const releaseHalo = ctx.createRadialGradient(0, 0, moonRadius, 0, 0, orbitRadius);
    releaseHalo.addColorStop(0, `rgba(239,244,246,${(0.12 * (1 - wave)).toFixed(3)})`);
    releaseHalo.addColorStop(0.68, `rgba(185,203,236,${(0.08 * (1 - Math.abs(wave - 0.58))).toFixed(3)})`);
    releaseHalo.addColorStop(1, "rgba(147,172,211,0)");
    ctx.fillStyle = releaseHalo;
    ctx.beginPath();
    ctx.arc(0, 0, orbitRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(208,220,237,${(0.18 * Math.sin(Math.PI * wave)).toFixed(3)})`;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(0, 0, orbitRadius * 0.92, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  const haloRadius = moonRadius * (3.5 + release * 1.4);
  const halo = ctx.createRadialGradient(0, 0, moonRadius * 0.25, 0, 0, haloRadius);
  halo.addColorStop(0, `rgba(255,249,231,${(0.2 * diskAlpha).toFixed(3)})`);
  halo.addColorStop(0.34, `rgba(221,229,239,${(0.105 * diskAlpha).toFixed(3)})`);
  halo.addColorStop(1, "rgba(185,203,236,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
  ctx.fill();

  if (diskAlpha > 0.001) {
    const moon = ctx.createRadialGradient(
      -moonRadius * 0.3,
      -moonRadius * 0.34,
      moonRadius * 0.1,
      moonRadius * 0.08,
      moonRadius * 0.12,
      moonRadius * 1.12,
    );
    moon.addColorStop(0, `rgba(255,252,239,${(0.98 * diskAlpha).toFixed(3)})`);
    moon.addColorStop(0.56, `rgba(232,233,223,${(0.94 * diskAlpha).toFixed(3)})`);
    moon.addColorStop(1, `rgba(174,187,203,${(0.82 * diskAlpha).toFixed(3)})`);
    ctx.fillStyle = moon;
    ctx.shadowColor = `rgba(238,236,215,${(0.42 * diskAlpha).toFixed(3)})`;
    ctx.shadowBlur = moonRadius * 0.8;
    ctx.beginPath();
    ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    const quietShade = ctx.createLinearGradient(-moonRadius, 0, moonRadius, 0);
    quietShade.addColorStop(0, "rgba(84,101,126,0)");
    quietShade.addColorStop(0.72, "rgba(84,101,126,0)");
    quietShade.addColorStop(1, `rgba(84,101,126,${(0.14 * diskAlpha).toFixed(3)})`);
    ctx.shadowBlur = 0;
    ctx.fillStyle = quietShade;
    ctx.beginPath();
    ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// TIME_RECEIVING_CORE: the entrance light does not cut to a calculator. Its
// exact anchor, scale and breath continue while year / month / day / hour make
// the surrounding time surface legible. The invariant seed remains visible
// beneath every lunar phase so time changes state, never identity.
function drawTimeReceivingLifeCore(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  universeSeconds: number,
  alpha = 1,
  lunarDay = 15,
  phaseStrength = 1,
) {
  const reveal = clamp(alpha, 0, 1);
  if (reveal <= 0.001) return;

  const normalizedLunarDay = clamp(lunarDay, 1, 30);
  const phaseAngle =
    ((normalizedLunarDay - 1) / 29.5) * Math.PI * 2;
  const illumination = 0.5 - Math.cos(phaseAngle) * 0.5;
  const waxing = normalizedLunarDay <= 15;
  const coreFrame = resolveLifeUniverseCoreFrame(width, height, universeSeconds);
  const breath = 1 + Math.sin(universeSeconds * 0.58) * 0.018;
  const coreRadius = clamp(width * 0.045, 15, 18) * breath;
  const haloRadius = coreRadius * 4.4;

  ctx.save();
  ctx.translate(coreFrame.x, coreFrame.y);
  const halo = ctx.createRadialGradient(0, 0, coreRadius * 0.18, 0, 0, haloRadius);
  halo.addColorStop(
    0,
    `rgba(255,252,239,${((0.17 + illumination * 0.09) * reveal).toFixed(3)})`,
  );
  halo.addColorStop(
    0.32,
    `rgba(221,229,239,${((0.09 + illumination * 0.04) * reveal).toFixed(3)})`,
  );
  halo.addColorStop(1, "rgba(147,172,211,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
  ctx.fill();

  const core = ctx.createRadialGradient(
    -coreRadius * 0.28,
    -coreRadius * 0.32,
    coreRadius * 0.08,
    0,
    0,
    coreRadius,
  );
  core.addColorStop(0, `rgba(255,254,246,${(0.98 * reveal).toFixed(3)})`);
  core.addColorStop(0.48, `rgba(236,241,243,${(0.94 * reveal).toFixed(3)})`);
  core.addColorStop(1, `rgba(185,203,236,${(0.74 * reveal).toFixed(3)})`);
  ctx.fillStyle = core;
  ctx.shadowColor = `rgba(225,235,244,${(0.5 * reveal).toFixed(3)})`;
  ctx.shadowBlur = coreRadius * 1.1;
  ctx.beginPath();
  ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
  ctx.fill();

  const shadowStrength =
    (1 - illumination) * clamp(phaseStrength, 0, 1);
  if (shadowStrength > 0.012) {
    const terminatorOffset =
      (waxing ? -1 : 1) *
      coreRadius *
      (0.08 + illumination * 1.7);
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius * 1.01, 0, Math.PI * 2);
    ctx.clip();
    const terminator = ctx.createRadialGradient(
      terminatorOffset - coreRadius * 0.22,
      -coreRadius * 0.2,
      coreRadius * 0.12,
      terminatorOffset,
      0,
      coreRadius * 1.06,
    );
    terminator.addColorStop(
      0,
      `rgba(5,10,19,${(shadowStrength * reveal * 0.98).toFixed(3)})`,
    );
    terminator.addColorStop(
      0.78,
      `rgba(8,15,27,${(shadowStrength * reveal * 0.94).toFixed(3)})`,
    );
    terminator.addColorStop(
      1,
      `rgba(22,31,46,${(shadowStrength * reveal * 0.72).toFixed(3)})`,
    );
    ctx.fillStyle = terminator;
    ctx.beginPath();
    ctx.arc(
      terminatorOffset,
      0,
      coreRadius * 1.06,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.restore();
  }

  const identitySeedRadius = Math.max(1.8, coreRadius * 0.14);
  const identitySeed = ctx.createRadialGradient(
    -identitySeedRadius * 0.28,
    -identitySeedRadius * 0.32,
    0,
    0,
    0,
    identitySeedRadius * 1.9,
  );
  identitySeed.addColorStop(
    0,
    `rgba(255,253,241,${(0.98 * reveal).toFixed(3)})`,
  );
  identitySeed.addColorStop(
    0.42,
    `rgba(255,244,214,${(0.82 * reveal).toFixed(3)})`,
  );
  identitySeed.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = identitySeed;
  ctx.shadowColor = `rgba(255,244,214,${(0.34 * reveal).toFixed(3)})`;
  ctx.shadowBlur = identitySeedRadius * 2.8;
  ctx.beginPath();
  ctx.arc(0, 0, identitySeedRadius * 1.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(255,252,239,${(0.42 * reveal).toFixed(3)})`;
  ctx.lineWidth = 0.75;
  ctx.beginPath();
  ctx.arc(0, 0, coreRadius * 1.16, -1.04, 0.42);
  ctx.stroke();
  ctx.restore();
}
function lerpAngle(a: number, b: number, t: number) {
  const delta = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + delta * clamp(t, 0, 1);
}

const TRIGRAM_LINE_PATTERN: Record<string, readonly [boolean, boolean, boolean]> = {
  乾: [true, true, true],
  兑: [true, true, false],
  离: [true, false, true],
  震: [true, false, false],
  巽: [false, true, true],
  坎: [false, true, false],
  艮: [false, false, true],
  坤: [false, false, false],
};

function drawTrigramForceMark(
  ctx: CanvasRenderingContext2D,
  trigram: string,
  x: number,
  y: number,
  width: number,
  alpha: number,
) {
  const pattern = TRIGRAM_LINE_PATTERN[trigram] ?? TRIGRAM_LINE_PATTERN.坤!;
  const lineGap = Math.max(5, width * 0.2);
  const segmentGap = Math.max(4, width * 0.16);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(1.1, width * 0.055);
  ctx.strokeStyle = `rgba(216,197,142,${alpha.toFixed(3)})`;
  pattern.slice().reverse().forEach((solid, row) => {
    const yy = y + (row - 1) * lineGap;
    ctx.beginPath();
    if (solid) {
      ctx.moveTo(x - width / 2, yy);
      ctx.lineTo(x + width / 2, yy);
    } else {
      ctx.moveTo(x - width / 2, yy);
      ctx.lineTo(x - segmentGap / 2, yy);
      ctx.moveTo(x + segmentGap / 2, yy);
      ctx.lineTo(x + width / 2, yy);
    }
    ctx.stroke();
  });
  ctx.restore();
}

type FieldStar = { x: number; y: number; r: number; ph: number; sp: number; vx: number; vy: number };
type TextStar = { tx: number; ty: number; ox: number; oy: number; ph: number; sp: number; line: number };
type LaunchState =
  | "starfield_idle"
  | "28_lunar_assembly"
  | "beast_formation"
  | "beast_approach"
  | "recognition_ready"
  | "starbeast_sandify"
  | "axis_emergence"
  | "time_calibration"
  | "geo_bind"
  | "display_lock"
  | "mother_code_reveal"
  | "entry_pre_collapse"
  | "entry_light_convergence"
  | "pressure_seed_axis"
  | "entry_static_render";

const STATE = {
  STARFIELD_IDLE: "starfield_idle",
  ASSEMBLY: "28_lunar_assembly",
  FORMATION: "beast_formation",
  APPROACH: "beast_approach",
  READY: "recognition_ready",
  STARBEAST_SANDIFY: "starbeast_sandify",
  AXIS_EMERGENCE: "axis_emergence",
  TIME_CALIBRATION: "time_calibration",
  GEO_BIND: "geo_bind",
  DISPLAY_LOCK: "display_lock",
  MOTHER_CODE_REVEAL: "mother_code_reveal",
  ENTRY_PRE_COLLAPSE: "entry_pre_collapse",
  ENTRY_LIGHT_CONVERGENCE: "entry_light_convergence",
  PRESSURE_SEED_AXIS: "pressure_seed_axis",
  ENTRY_STATIC_RENDER: "entry_static_render",
} as const;

const TOP_LINES = ["日月运行，", "星辰有序。"];
const CTA_LINES = ["那个被现实遮住的你，", "仍在这里。"];
const ENTRY_ACTION_LINE = "进入我的生命世界";
const ENTRY_TRANSITION_LINE = "去看见，那个一直存在的自己。";
const BEAST_COLLAPSE_VISUAL_EVENT = "BEAST_COLLAPSE_VISUAL_EVENT";
const NODE1_MIRROR_ACTIVATED_EVENT = "NODE1_MIRROR_ACTIVATED";
const Node1State = {
  mirrorActivated: true,
  reflectionMode: "ACTIVE",
  starbeastSync: true,
} as const;
const ENTRY_HANDOFF_DELAY_MS = 700;
const NODE_TRANSITION_LERP_START_MS = 760;
const NODE_TRANSITION_LERP_DURATION_MS = 900;
const RAIL_COMMIT_THRESHOLD = 0.58;
const ORIGIN_RAIL_COLS = 4;
const PERIOD_LABELS = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"] as const;
const LUNAR_MONTH_LABELS = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"] as const;
const LUNAR_DAY_LABELS = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
] as const;
const CHRONO_DIMS = ["year", "month", "day", "hour"] as const;
type ChronoDim = (typeof CHRONO_DIMS)[number];
type GeoDim = "province" | "city";
type ChronoCoords = { year: number; month: number; day: number; hour: number };
type EntryTransitionSnapshot = EntryCardRendererOptions["snapshot"];
type LaunchInteractionState =
  | "ENTRY"
  | "PRESSURE_CANVAS_ACTIVE"
  | "SEED_SELECTED"
  | "SNAPSHOT_GENERATED"
  | "GENESIS_HANDOFF";
type SceneState = "ENTRY" | "NODE_1" | "NODE_2" | "HANDOFF";
type EntryHandoffMode = "NEW_USER" | "OLD_USER";
const SCENE_ORDER = ["ENTRY", "NODE_1", "NODE_2", "HANDOFF"] as const;
const timeline: Record<SceneState, number> = {
  ENTRY: 0,
  NODE_1: 1,
  NODE_2: 2,
  HANDOFF: 3,
};
const DEBUG_TIMELINE =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
  new URLSearchParams(window.location.search).get("debugTimeline") === "1";
const SNAPSHOT_MODE = DEBUG_TIMELINE;
const snapshotTargets: SceneState[] = [...SCENE_ORDER];
// Production URLs: /launch-lab?entryUser=new, /launch-lab?entryUser=old
// Debug URL: /launch-lab?entryUser=new&debugTimeline=1
const GEO_DIMS = ["province"] as const;
const AXIS_COPY: Record<EntryHandoffMode, {
  dimLabel: Record<ChronoDim, string>;
  dimStageLabel: Record<ChronoDim, string>;
  geoLabel: Record<GeoDim, string>;
  kicker: string;
  topPrimary: string;
  topSecondary: string;
  bodyPrimary: string;
  bodySecondary: string;
  actionPrimary: string;
  actionConfirm: string;
  lockText: string;
}> = {
  NEW_USER: {
    dimLabel: { year: "年份", month: "月份", day: "日期", hour: "时辰" },
    dimStageLabel: { year: "年份锁定", month: "月份对齐", day: "日期落点", hour: "时辰显影" },
    geoLabel: { province: "出生省份", city: "出生城市" },
    kicker: "生命坐标",
    topPrimary: "时间坐标正在归档",
    topSecondary: "时间定宿，也让母码落位",
    bodyPrimary: "让星河记住你的出生时间",
    bodySecondary: "",
    actionPrimary: "",
    actionConfirm: "轻触星河，确认生命坐标",
    lockText: "时间已定 · 母码资产显化",
  },
  OLD_USER: {
    dimLabel: { year: "压力种子", month: "压力层级", day: "压力刻度", hour: "压力锚点" },
    dimStageLabel: { year: "压力种子", month: "压力层级", day: "压力刻度", hour: "压力锚点" },
    geoLabel: { province: "压力坐标", city: "轴心坐标" },
    kicker: "当前压力聚合",
    topPrimary: "压力正在聚合",
    topSecondary: "正在聚合你的当前压力",
    bodyPrimary: "当前状态正在形成可选择的现实压力",
    bodySecondary: "压力会被压入既有轴心",
    actionPrimary: "上下调频，找到当前压力方位",
    actionConfirm: "右滑固定方位，进入压力种子",
    lockText: "压力已入轴",
  },
};
function toStarbeastEntryState(state: LaunchState): Parameters<typeof resolveStarbeastRenderState>[0] {
  if (
    state === STATE.STARFIELD_IDLE ||
    state === STATE.ASSEMBLY ||
    state === STATE.FORMATION ||
    state === STATE.APPROACH ||
    state === STATE.READY ||
    state === STATE.STARBEAST_SANDIFY
  ) {
    return state;
  }

  return "BEAST_COLLAPSE_TRIGGERED";
}

function getEntryUserTypePreviewOverride(): EntryHandoffMode | undefined {
  if (typeof window === "undefined") return undefined;

  const previewUser = new URLSearchParams(window.location.search).get("entryUser");
  if (previewUser === "new") return "NEW_USER";
  if (previewUser === "old") return "OLD_USER";

  return undefined;
}

function getReturningLifeStatePreviewOverride() {
  if (
    typeof window === "undefined" ||
    (window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1")
  ) {
    return undefined;
  }

  const previewState = new URLSearchParams(window.location.search).get(
    "returnState",
  );
  if (previewState === "identity") return "IDENTITY_ONLY";
  if (previewState === "reality") return "REALITY_ONLY";
  if (previewState === "crystal") return "CRYSTAL_ONLY";
  if (previewState === "complete") return "REALITY_AND_CRYSTAL";

  return undefined;
}
const PROVINCE_OPTIONS = [
  "北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北",
  "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "香港", "澳门", "台湾",
];
const CITY_OPTIONS_BY_PROVINCE: Record<string, string[]> = {
  北京: ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "通州区", "昌平区", "大兴区", "顺义区"],
  天津: ["和平区", "河西区", "南开区", "河北区", "河东区", "红桥区", "滨海新区", "西青区", "津南区", "北辰区"],
  河北: ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"],
  山西: ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
  内蒙古: ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟"],
  辽宁: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦"],
  吉林: ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边"],
  黑龙江: ["哈尔滨", "齐齐哈尔", "牡丹江", "佳木斯", "大庆", "鸡西", "双鸭山", "伊春", "七台河", "黑河"],
  上海: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "浦东新区", "闵行区", "宝山区"],
  江苏: ["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江"],
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
  安徽: ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
  江西: ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"],
  山东: ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "临沂"],
  河南: ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "南阳"],
  湖北: ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁"],
  湖南: ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州"],
  广东: ["广州", "深圳", "珠海", "汕头", "佛山", "韶关", "湛江", "肇庆", "江门", "茂名", "惠州", "东莞"],
  广西: ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州"],
  海南: ["海口", "三亚", "三沙", "儋州", "五指山", "琼海", "文昌", "万宁", "东方"],
  重庆: ["渝中区", "江北区", "南岸区", "沙坪坝区", "九龙坡区", "渝北区", "巴南区", "北碚区", "涪陵区", "万州区"],
  四川: ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "宜宾"],
  贵州: ["贵阳", "六盘水", "遵义", "安顺", "毕节", "铜仁", "黔西南", "黔东南", "黔南"],
  云南: ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄", "红河", "大理"],
  西藏: ["拉萨", "日喀则", "昌都", "林芝", "山南", "那曲", "阿里"],
  陕西: ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"],
  甘肃: ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "张掖", "平凉", "酒泉", "庆阳"],
  青海: ["西宁", "海东", "海北", "黄南", "海南州", "果洛", "玉树", "海西"],
  宁夏: ["银川", "石嘴山", "吴忠", "固原", "中卫"],
  新疆: ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "昌吉", "博尔塔拉", "巴音郭楞", "阿克苏", "喀什", "伊犁"],
  香港: ["中西区", "湾仔区", "东区", "南区", "油尖旺区", "深水埗区", "九龙城区", "观塘区", "荃湾区", "元朗区"],
  澳门: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "路氹填海区"],
  台湾: ["台北", "新北", "桃园", "台中", "台南", "高雄", "基隆", "新竹", "嘉义", "宜兰", "花莲", "台东"],
};
const DEFAULT_PROVINCE_INDEX = PROVINCE_OPTIONS.indexOf("广东");
const DEFAULT_CITY_INDEX = CITY_OPTIONS_BY_PROVINCE["广东"]?.indexOf("广州") ?? 0;
const FOUR_BEAST_VISUAL_COPY: Record<FourSymbol, {
  axis: string;
  mark: string;
}> = {
  青龙: { axis: "东方木位", mark: "青" },
  朱雀: { axis: "南方火位", mark: "朱" },
  白虎: { axis: "西方金位", mark: "白" },
  玄武: { axis: "北方水位", mark: "玄" },
};

function pad2(v: number) {
  return String(v).padStart(2, "0");
}

function hourToPeriodIndex(hour: number) {
  return Math.floor((((hour + 1) % 24) + 24) % 24 / 2);
}

function hourToPeriodRange(hour: number) {
  const periodIndex = hourToPeriodIndex(hour);
  const start = (periodIndex * 2 + 23) % 24;
  const end = (start + 2) % 24;
  return `${pad2(start)}:00-${pad2(end)}:00`;
}

function hourToPeriodLabel(hour: number) {
  return PERIOD_LABELS[hourToPeriodIndex(hour)] ?? "子时";
}

function formatLunarBirthDate(
  relatedYear: number,
  month: number,
  day: number,
  isLeapMonth: boolean,
  hour: number,
) {
  const monthLabel = LUNAR_MONTH_LABELS[month - 1] ?? `${month}月`;
  const dayLabel = LUNAR_DAY_LABELS[day - 1] ?? `${day}日`;
  return `阴历：${relatedYear}年${isLeapMonth ? "闰" : ""}${monthLabel}${dayLabel} · ${hourToPeriodLabel(hour)}`;
}

function computeNodeTransitionProgress(node1ElapsedMs: number): number {
  return clamp(
    (node1ElapsedMs - NODE_TRANSITION_LERP_START_MS) / NODE_TRANSITION_LERP_DURATION_MS,
    0,
    1
  );
}

function dimRange(coords: ChronoCoords, dim: ChronoDim) {
  if (dim === "year") return { min: 1940, max: 2026 };
  if (dim === "month") return { min: 1, max: 12 };
  if (dim === "day") return { min: 1, max: new Date(coords.year, coords.month, 0).getDate() };
  return { min: 0, max: 23 };
}

function dimValue(coords: ChronoCoords, dim: ChronoDim) {
  return coords[dim];
}

function makeAudio() {
  let ctx: AudioContext | null = null;
  function ensure() {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function tone(freq: number, dur: number, gain: number, type: OscillatorType = "sine") {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  function gather() {
    [196, 261.6, 392].forEach((f, i) => tone(f, 2.4, 0.05 - i * 0.01));
  }
  function form() {
    tone(392, 1.6, 0.07);
    tone(523.25, 2.0, 0.05);
    tone(784, 1.6, 0.03, "triangle");
  }
  function tick() {
    tone(880 + Math.random() * 220, 0.12, 0.025);
  }
  return { ensure, gather, form, tick };
}

function buildDeterministicPressureSeedCandidate(excludeSeedIds: string[] = []): PressureSeedCrossAxisSeed | undefined {
  return buildDeterministicPressureSeedCandidates(excludeSeedIds)[0];
}

function buildDeterministicPressureSeedCandidates(excludeSeedIds: string[] = []): PressureSeedCrossAxisSeed[] {
  const triplet = getPressureSeedSceneTriplet({ excludeSeedIds });
  return triplet.seeds.slice(0, 3).map((seed, index) => ({
    id: seed.id,
    num: pad2(index + 1),
    main: seed.surface,
    sub: seed.shell,
    seed,
    seedIndex: (index + 1) as PressureSeedCrossAxisSeed["seedIndex"],
  }));
}

function drawCanvasWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 2,
) {
  let line = "";
  let yy = y;
  let lines = 0;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = ch;
      yy += lineHeight;
      lines += 1;
      if (lines >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line, x, yy);
}

function resolveFourBeastGrammar(
  result: GeoChronoMotherFusionResult,
): FourBeastTrigramVisualGrammarItem | undefined {
  try {
    return getFourBeastTrigramVisualGrammar(result.starbeast.fourSymbol, result.mother.trigram);
  } catch {
    return undefined;
  }
}

function fourBeastGrammarShortLine(grammar?: FourBeastTrigramVisualGrammarItem) {
  if (!grammar) return "";
  const motionTail = grammar.motion.split("/").pop()?.trim() ?? grammar.motion;
  return motionTail.replace(/[。.]$/, "");
}

type MotherCardDisplayCopy = {
  oneLine: string;
  transform: string;
  tags: [string, string, string];
  archetype: string;
  inertia: string;
  cost: string;
  direction: string;
};

const MOTHER_CARD_DISPLAY_COPY: Record<string, MotherCardDisplayCopy> = {
  乾: {
    oneLine: "你会先抬高目标，再试图掌控局面。",
    transform: "把控制欲升级为真正的控制能力。",
    tags: ["开创", "掌控", "定局"],
    archetype: "你会先看见局面需要方向，并本能地想把盘面立起来。",
    inertia: "压力越近，你越容易接管、收紧、一个人硬扛。",
    cost: "它能让局面启动，也可能让所有责任都压回你身上。",
    direction: "当这股力量被校准，它会成为定方向、立边界、推进秩序的能力。",
  },
  坤: {
    oneLine: "你会先接住别人，再慢慢感到自己被压住。",
    transform: "把无边界承受升级为有边界托底。",
    tags: ["承载", "边界", "托底"],
    archetype: "你不是只会承受，而是会先让人和局面稳定下来。",
    inertia: "压力越近，你越容易先让步、先接住、先把自己放到后面。",
    cost: "它能稳定局面，也可能让你的边界被长期消耗。",
    direction: "当这股力量被校准，它会成为既能托底、也能守住自身的能力。",
  },
  震: {
    oneLine: "你会先动起来，用行动冲破停滞。",
    transform: "把行动冲动升级为行动前的思考力。",
    tags: ["启动", "破局", "校准"],
    archetype: "你不是只想快，而是会用行动把停住的局面打开。",
    inertia: "压力越近，你越容易先冲出去，用动作压住不安。",
    cost: "它能带来突破，也可能让节奏失控、方向变乱。",
    direction: "当这股力量被校准，它会成为判断之后再启动的破局力。",
  },
  巽: {
    oneLine: "你会先观察缝隙，再寻找进入现实的路径。",
    transform: "把反复权衡升级为谋而后动的判断力。",
    tags: ["渗透", "判断", "入局"],
    archetype: "你不是回避进入，而是会先找出最小阻力的入口。",
    inertia: "压力越近，你越容易反复观察、权衡、绕行。",
    cost: "它能避开硬碰硬，也可能让真正的进入一再推迟。",
    direction: "当这股力量被校准，它会成为识别缝隙并及时入局的能力。",
  },
  坎: {
    oneLine: "你会先感到危险，再逼自己穿过困局。",
    transform: "把反复深陷升级为穿越困局的耐力。",
    tags: ["深潜", "承压", "穿越"],
    archetype: "你不是沉在问题里，而是会先感到深处的风险。",
    inertia: "压力越近，你越容易陷入、复盘、反复确认危险。",
    cost: "它能保留警觉，也可能让你在困局里停留太久。",
    direction: "当这股力量被校准，它会成为穿过困局并保留判断的耐力。",
  },
  离: {
    oneLine: "你会先看见问题，也会忍不住证明自己看得对。",
    transform: "把反复证明升级为照见真相的勇气。",
    tags: ["照见", "辨明", "显化"],
    archetype: "你不是只想表现，而是会先把模糊的问题照出来。",
    inertia: "压力越近，你越容易证明、解释、让自己更亮。",
    cost: "它能让真相显影，也可能让你被外部目光牵住。",
    direction: "当这股力量被校准，它会成为看见本质并清楚表达的能力。",
  },
  艮: {
    oneLine: "你会先稳住边界，再判断是否前进。",
    transform: "把过度防御性升级为及时止损的预见性。",
    tags: ["止住", "边界", "预判"],
    archetype: "你不是单纯停住，而是在风险靠近时先建立边界。",
    inertia: "压力越近，你越容易收紧、观察、隔开，把自己放进安全距离。",
    cost: "它保护你不被冲垮，也可能让机会在迟疑中错过。",
    direction: "当这股力量被校准，它会成为及时止损和提前预判的能力。",
  },
  兑: {
    oneLine: "你会先缓和冲突，再寻找可以转圜的出口。",
    transform: "把回避冲突升级为化解冲突的沟通力。",
    tags: ["转圜", "沟通", "化解"],
    archetype: "你不是只想缓和，而是会寻找关系重新流动的出口。",
    inertia: "压力越近，你越容易避重就轻、先让气氛松下来。",
    cost: "它能降低冲突，也可能让真正的问题被延后处理。",
    direction: "当这股力量被校准，它会成为说清问题并化解僵局的沟通力。",
  },
};

function motherCardDisplayCopy(trigram: string, definition: { assetSummary: string; baseDrive: string; shadowInertia: string; personalityAsset: string }) {
  return MOTHER_CARD_DISPLAY_COPY[trigram] ?? {
    oneLine: definition.baseDrive,
    transform: definition.assetSummary,
    tags: ["识别", "定界", "转化"] as [string, string, string],
    archetype: definition.baseDrive,
    inertia: definition.shadowInertia,
    cost: "它保护你维持稳定，也可能让新的动作被推迟。",
    direction: definition.personalityAsset || definition.assetSummary,
  };
}

type FourBeastLitePoint = {
  x: number;
  y: number;
  power?: number;
};

type FourBeastLiteShape = {
  points: FourBeastLitePoint[];
  edges: Array<[number, number]>;
};

function fourBeastLiteShape(beast: FourSymbol): FourBeastLiteShape {
  if (beast === "青龙") {
    return {
      points: [
        { x: 0.13, y: 0.6, power: 0.72 },
        { x: 0.26, y: 0.44, power: 0.8 },
        { x: 0.4, y: 0.5, power: 0.72 },
        { x: 0.54, y: 0.34, power: 0.9 },
        { x: 0.68, y: 0.4, power: 0.78 },
        { x: 0.82, y: 0.28, power: 0.96 },
        { x: 0.9, y: 0.5, power: 0.68 },
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    };
  }
  if (beast === "朱雀") {
    return {
      points: [
        { x: 0.5, y: 0.24, power: 0.98 },
        { x: 0.38, y: 0.46, power: 0.84 },
        { x: 0.2, y: 0.35, power: 0.76 },
        { x: 0.14, y: 0.62, power: 0.66 },
        { x: 0.62, y: 0.46, power: 0.84 },
        { x: 0.8, y: 0.35, power: 0.76 },
        { x: 0.86, y: 0.62, power: 0.66 },
      ],
      edges: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [1, 4]],
    };
  }
  if (beast === "白虎") {
    return {
      points: [
        { x: 0.18, y: 0.5, power: 0.9 },
        { x: 0.32, y: 0.38, power: 0.82 },
        { x: 0.5, y: 0.42, power: 0.94 },
        { x: 0.68, y: 0.48, power: 0.78 },
        { x: 0.82, y: 0.42, power: 0.72 },
        { x: 0.42, y: 0.67, power: 0.7 },
        { x: 0.65, y: 0.69, power: 0.68 },
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [3, 6], [5, 6]],
    };
  }
  return {
    points: [
      { x: 0.28, y: 0.5, power: 0.78 },
      { x: 0.38, y: 0.32, power: 0.86 },
      { x: 0.58, y: 0.3, power: 0.92 },
      { x: 0.74, y: 0.46, power: 0.78 },
      { x: 0.62, y: 0.64, power: 0.82 },
      { x: 0.4, y: 0.66, power: 0.72 },
      { x: 0.2, y: 0.72, power: 0.66 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6]],
  };
}

function drawFourBeastLiteStar(
  ctx: CanvasRenderingContext2D,
  beast: FourSymbol,
  trigram: string | undefined,
  x: number,
  y: number,
  w: number,
  h: number,
  alpha = 1,
) {
  const shape = fourBeastLiteShape(beast);
  const sx = (v: number) => x + v * w;
  const sy = (v: number) => y + v * h;
  const points = shape.points.map((p) => ({ x: sx(p.x), y: sy(p.y), power: p.power ?? 0.75 }));
  const gold = "232,200,138";
  const white = "255,247,228";
  const seed = beast === "青龙" ? 13 : beast === "朱雀" ? 29 : beast === "白虎" ? 47 : 61;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const glow = ctx.createRadialGradient(x + w * 0.5, y + h * 0.48, 0, x + w * 0.5, y + h * 0.48, Math.max(w, h) * 0.66);
  glow.addColorStop(0, "rgba(255,247,228,0.09)");
  glow.addColorStop(0.45, "rgba(232,200,138,0.035)");
  glow.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(x - w * 0.08, y - h * 0.08, w * 1.16, h * 1.16);

  for (let i = 0; i < 30; i++) {
    const a = (i * 2.399 + seed) % (Math.PI * 2);
    const band = i % points.length;
    const p = points[band];
    const q = points[(band + 2) % points.length];
    const mix = 0.24 + ((i * 37 + seed) % 53) / 100;
    const px = lerp(p.x, q.x, mix) + Math.cos(a) * w * (0.018 + (i % 5) * 0.004);
    const py = lerp(p.y, q.y, mix) + Math.sin(a) * h * (0.018 + (i % 4) * 0.004);
    const dot = 0.45 + (i % 4) * 0.18;
    ctx.fillStyle = `rgba(${i % 3 === 0 ? gold : white},${(0.06 + (i % 5) * 0.012).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(px, py, dot, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(255,247,228,0.18)";
  ctx.lineWidth = 0.75;
  ctx.shadowColor = "rgba(232,200,138,0.16)";
  ctx.shadowBlur = 8;
  for (const [from, to] of shape.edges) {
    const p = points[from];
    const q = points[to];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(232,200,138,0.12)";
  ctx.lineWidth = 1;
  ctx.shadowColor = "rgba(232,200,138,0.18)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  if (beast === "青龙") {
    ctx.moveTo(sx(0.08), sy(0.64));
    ctx.bezierCurveTo(sx(0.24), sy(0.3), sx(0.52), sy(0.56), sx(0.84), sy(0.24));
    ctx.bezierCurveTo(sx(0.96), sy(0.12), sx(0.98), sy(0.34), sx(0.9), sy(0.5));
  } else if (beast === "朱雀") {
    ctx.moveTo(sx(0.5), sy(0.26));
    ctx.bezierCurveTo(sx(0.26), sy(0.18), sx(0.08), sy(0.34), sx(0.12), sy(0.66));
    ctx.moveTo(sx(0.5), sy(0.26));
    ctx.bezierCurveTo(sx(0.74), sy(0.18), sx(0.92), sy(0.34), sx(0.88), sy(0.66));
    if (trigram === "艮") {
      ctx.moveTo(sx(0.26), sy(0.72));
      ctx.lineTo(sx(0.74), sy(0.72));
    }
  } else if (beast === "白虎") {
    ctx.moveTo(sx(0.12), sy(0.54));
    ctx.bezierCurveTo(sx(0.3), sy(0.24), sx(0.72), sy(0.38), sx(0.9), sy(0.42));
    ctx.bezierCurveTo(sx(0.68), sy(0.72), sx(0.34), sy(0.72), sx(0.18), sy(0.54));
    for (let i = 0; i < 3; i++) {
      const cx = sx(0.7 + i * 0.055);
      ctx.moveTo(cx, sy(0.58));
      ctx.lineTo(cx + w * 0.055, sy(0.66 + i * 0.018));
    }
  } else {
    ctx.ellipse(sx(0.5), sy(0.49), w * 0.28, h * 0.2, -0.04, 0, Math.PI * 2);
    ctx.moveTo(sx(0.22), sy(0.72));
    ctx.bezierCurveTo(sx(0.4), sy(0.8), sx(0.7), sy(0.78), sx(0.86), sy(0.64));
    ctx.moveTo(sx(0.22), sy(0.72));
    ctx.bezierCurveTo(sx(0.1), sy(0.62), sx(0.2), sy(0.42), sx(0.34), sy(0.48));
  }
  ctx.stroke();

  points.forEach((p, i) => {
    const r = 1.7 + p.power * 1.8 + (i === 0 ? 0.8 : 0);
    ctx.fillStyle = `rgba(${i % 2 === 0 ? white : gold},${(0.58 + p.power * 0.32).toFixed(3)})`;
    ctx.shadowColor = `rgba(${white},${(0.2 + p.power * 0.28).toFixed(3)})`;
    ctx.shadowBlur = 7 + p.power * 8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(${gold},0.16)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 2.25, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawFourBeastOriginMarker(
  ctx: CanvasRenderingContext2D,
  beast: FourSymbol,
  trigram: string,
  province: string,
  grammarLine: string,
  x: number,
  y: number,
  w: number,
  h: number,
  alpha = 1,
) {
  const copy = FOUR_BEAST_VISUAL_COPY[beast];
  const cx = x + w * 0.5;
  const cy = y + h * 0.38;
  const radius = Math.min(w, h) * 0.42;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.45);
  glow.addColorStop(0, "rgba(232,200,138,0.105)");
  glow.addColorStop(0.58, "rgba(232,200,138,0.036)");
  glow.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
  ctx.fill();

  drawFourBeastLiteStar(ctx, beast, trigram, cx - radius * 1.02, cy - radius * 0.74, radius * 2.04, radius * 1.48, 0.96);

  ctx.fillStyle = "rgba(232,200,138,0.54)";
  ctx.font = `700 ${Math.min(12, Math.max(9, w * 0.052))}px ${MONO}`;
  ctx.fillText(`${beast} × ${trigram}`, cx, cy + radius * 0.9);
  ctx.fillStyle = "rgba(232,200,138,0.42)";
  ctx.font = `600 ${Math.min(9.5, Math.max(7.8, w * 0.04))}px ${MONO}`;
  ctx.fillText(grammarLine || `${copy.axis} · ${province}`, cx, cy + radius * 1.12);
  ctx.fillText(`${copy.axis} · ${province}`, cx, cy + radius * 1.34);

  ctx.restore();
}

function drawFourBeastCardWatermark(
  ctx: CanvasRenderingContext2D,
  beast: FourSymbol,
  cardX: number,
  cardY: number,
  cardW: number,
  cardH: number,
) {
  const copy = FOUR_BEAST_VISUAL_COPY[beast];
  const visualX = cardX + cardW * 0.17;
  const visualY = cardY + cardH * 0.28;
  const visualW = cardW * 0.66;
  const visualH = cardH * 0.32;
  const cx = visualX + visualW * 0.5;
  const cy = visualY + visualH * 0.52;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect?.(visualX, visualY, visualW, visualH, 18);
  if (!ctx.roundRect) ctx.rect(visualX, visualY, visualW, visualH);
  ctx.clip();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.58;
  drawFourBeastLiteStar(ctx, beast, undefined, visualX + visualW * 0.12, visualY + visualH * 0.16, visualW * 0.76, visualH * 0.6, 0.24);
  ctx.fillStyle = "rgba(232,200,138,0.16)";
  ctx.font = `700 ${Math.min(14, cardW * 0.04)}px ${MONO}`;
  ctx.fillText(copy.mark, cx, cy + visualH * 0.3);
  ctx.restore();
}

export type LaunchLabProps = Readonly<{
  explicitLeaveNavigationDeliveryTicket?:
    | RealityExplicitLeaveNavigationDeliveryTicket
    | null;
  onExplicitLeaveNavigationDeliveryOutcome?: (
    outcome: ReturningLifeWorldDeliveryOutcome,
  ) => void;
}>;

export function LaunchLab({
  explicitLeaveNavigationDeliveryTicket = null,
  onExplicitLeaveNavigationDeliveryOutcome,
}: LaunchLabProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const lastExplicitLeaveDeliveryOutcomeKeyRef =
    useRef<string | null>(null);
  const [returningLifeContext] = useState(() => {
    const forcedEntry = getEntryUserTypePreviewOverride();
    if (
      forcedEntry === "NEW_USER" ||
      !hasPersistedRecognizedLifeIdentity()
    ) {
      return null;
    }
    return restorePersistedRealUserGenesisVisualSourceContext();
  });
  const hasReturningLifeIdentity = returningLifeContext !== null;
  const [returningVisualContinuity] = useState(() =>
    hasReturningLifeIdentity ? readPersistedGenesisVisualContinuity() : null,
  );
  const [returningRelationshipNaming, setReturningRelationshipNaming] =
    useState<StarBeastRelationshipNamingReadResult>(() =>
      hasReturningLifeIdentity
        ? readStarBeastRelationshipNamingAsset()
        : {
            status: "UNAVAILABLE",
            reason: "RECOGNIZED_IDENTITY_REQUIRED",
            asset: null,
          },
    );
  const [returningRelationshipNameDraft, setReturningRelationshipNameDraft] =
    useState("");
  const [returningRelationshipNameEditing, setReturningRelationshipNameEditing] =
    useState(false);
  const [
    returningRelationshipNamePersistence,
    setReturningRelationshipNamePersistence,
  ] = useState<"PERSISTED" | "CURRENT_CYCLE_ONLY" | null>(null);
  const [
    returningRelationshipNameFeedback,
    setReturningRelationshipNameFeedback,
  ] = useState<"DELETE_UNCONFIRMED" | null>(null);
  const [returningLifeWhisperText, setReturningLifeWhisperText] = useState("");
  const [returningLifeWhisperFact, setReturningLifeWhisperFact] =
    useState<LifeWhisperRelationshipFact>("NONE");
  const returningLifeWhisperFactRef =
    useRef<LifeWhisperRelationshipFact>("NONE");
  const [
    returningLifeWhisperResponsePhase,
    setReturningLifeWhisperResponsePhase,
  ] = useState<LifeWhisperRelationshipResponsePhase>("DORMANT");
  const returningLifeWhisperResponsePhaseRef =
    useRef<LifeWhisperRelationshipResponsePhase>("DORMANT");
  const [
    returningLifeWhisperResponseCycleId,
    setReturningLifeWhisperResponseCycleId,
  ] = useState<string | null>(null);
  const returningLifeWhisperResponseCycleIdRef = useRef<string | null>(
    null,
  );
  const returningLifeWhisperResponseCycleSequenceRef = useRef(0);
  const returningLifeWhisperOutcomeWatchdogRef =
    useRef<number | null>(null);
  const [
    returningLifeWhisperUnavailableContinuation,
    setReturningLifeWhisperUnavailableContinuation,
  ] = useState<LifeWhisperUnavailableContinuation>("NONE");
  const [
    returningLifeWhisperUnavailableReason,
    setReturningLifeWhisperUnavailableReason,
  ] = useState<
    Extract<
      LifeWhisperSurfaceVisualResponseOutcome,
      { status: "VISUAL_RESPONSE_UNAVAILABLE" }
    >["reason"] | null
  >(null);
  const [
    returningLifeWhisperSettlementAuthority,
    setReturningLifeWhisperSettlementAuthority,
  ] = useState<
    "MOTION_VISUAL_OUTCOME" | "STATIC_VISUAL_OUTCOME" | null
  >(null);
  const [returningDynamicsInput] = useState(() =>
    hasReturningLifeIdentity ? resolveDynamicsInputContext({}) : null,
  );
  const [returningLifeArchive, setReturningLifeArchive] = useState(() =>
    hasReturningLifeIdentity ? readPersonalityRingLite() : null,
  );
  const [returningGrowthSurfaceRevision, setReturningGrowthSurfaceRevision] =
    useState(0);
  useEffect(
    () =>
      subscribeToXinmaiLivedGrowthRecoveryRevision(() => {
        setReturningGrowthSurfaceRevision((revision) => revision + 1);
      }),
    [],
  );
  const returningStatePreview = getReturningLifeStatePreviewOverride();
  const returningVisualReady =
    returningLifeContext !== null &&
    returningVisualContinuity !== null &&
    returningVisualContinuity.sourceReferenceId ===
      returningLifeContext.sourceReferenceId;
  useEffect(() => {
    const ticket = explicitLeaveNavigationDeliveryTicket;
    const report = onExplicitLeaveNavigationDeliveryOutcome;
    if (ticket === null || report === undefined) return;
    const outcomeKey = `${ticket.deliveryReferenceId}:${ticket.deliveryAttempt}`;
    if (
      lastExplicitLeaveDeliveryOutcomeKeyRef.current ===
      outcomeKey
    ) {
      return;
    }
    lastExplicitLeaveDeliveryOutcomeKeyRef.current = outcomeKey;
    const reportProjectedOutcome = (
      outcome: ReturningLifeWorldDeliveryOutcome,
    ) => {
      for (const projectedOutcome of projectReturningLifeWorldDeliveryOutcomes(
        ticket,
        outcome,
      )) {
        report(projectedOutcome);
      }
    };
    if (location.pathname !== ticket.targetRoute) {
      reportProjectedOutcome(
        Object.freeze({
          status: "LIFE_WORLD_DELIVERY_REJECTED" as const,
          deliveryReferenceId: ticket.deliveryReferenceId,
          deliveryAttempt: ticket.deliveryAttempt,
          reason: "ROUTE_TARGET_MISMATCH" as const,
        }),
      );
      return;
    }
    if (returningVisualContinuity === null) {
      reportProjectedOutcome(
        Object.freeze({
          status: "LIFE_WORLD_DELIVERY_UNAVAILABLE" as const,
          deliveryReferenceId: ticket.deliveryReferenceId,
          deliveryAttempt: ticket.deliveryAttempt,
          reason:
            "RETURNING_VISUAL_CONTINUITY_UNAVAILABLE" as const,
        }),
      );
      return;
    }
    const identityRecovery = recoverRealityRecognizedIdentity({
      visualContinuity: returningVisualContinuity,
    });
    if (identityRecovery.status !== "READY") {
      reportProjectedOutcome(
        Object.freeze({
          status: "LIFE_WORLD_DELIVERY_UNAVAILABLE" as const,
          deliveryReferenceId: ticket.deliveryReferenceId,
          deliveryAttempt: ticket.deliveryAttempt,
          reason: "RETURNING_IDENTITY_UNAVAILABLE" as const,
        }),
      );
      return;
    }
    const identity = identityRecovery.identityReferences;
    const mismatchReason =
      identity.sourceReferenceId !== ticket.sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH" as const
        : identity.starBeastIdentityReferenceId !==
            ticket.starBeastIdentityReferenceId
          ? "STARBEAST_IDENTITY_MISMATCH" as const
          : identity.mansionCoordinateReferenceId !==
              ticket.mansionCoordinateReferenceId
            ? "MANSION_COORDINATE_MISMATCH" as const
            : null;
    if (mismatchReason !== null) {
      reportProjectedOutcome(
        Object.freeze({
          status: "LIFE_WORLD_DELIVERY_REJECTED" as const,
          deliveryReferenceId: ticket.deliveryReferenceId,
          deliveryAttempt: ticket.deliveryAttempt,
          reason: mismatchReason,
        }),
      );
      return;
    }
    if (
      !projectReturningLifeWorldSurfaceReady(
        returningVisualReady,
        ticket,
      )
    ) {
      reportProjectedOutcome(
        Object.freeze({
          status: "LIFE_WORLD_DELIVERY_UNAVAILABLE" as const,
          deliveryReferenceId: ticket.deliveryReferenceId,
          deliveryAttempt: ticket.deliveryAttempt,
          reason: "RETURNING_LIFE_SURFACE_NOT_COMMITTED" as const,
        }),
      );
      return;
    }
    reportProjectedOutcome(
      Object.freeze({
        status: "LIFE_WORLD_DELIVERED" as const,
        deliveryReferenceId: ticket.deliveryReferenceId,
        deliveryAttempt: ticket.deliveryAttempt,
        targetRoute: ticket.targetRoute,
        sourceReferenceId: identity.sourceReferenceId,
        starBeastIdentityReferenceId:
          identity.starBeastIdentityReferenceId,
        mansionCoordinateReferenceId:
          identity.mansionCoordinateReferenceId,
        presentedAt: new Date().toISOString(),
        authority: "RETURNING_LIFE_WORLD_POST_COMMIT" as const,
      }),
    );
  }, [
    explicitLeaveNavigationDeliveryTicket,
    location.pathname,
    onExplicitLeaveNavigationDeliveryOutcome,
    returningVisualContinuity,
    returningVisualReady,
  ]);
  // A persisted result is not yet a returning entrance. The returning path is
  // only valid when that exact life can also be restored visually.
  const returningLifeIdentity = returningVisualReady;
  const returningRecognizedIdentity =
    returningVisualContinuity === null
      ? null
      : recoverRealityRecognizedIdentity({
          visualContinuity: returningVisualContinuity,
        });
  const [
    returningLivedGrowthReturnItems,
    setReturningLivedGrowthReturnItems,
  ] = useState<readonly XinmaiLivedGrowthReturnItem[]>(() =>
    Object.freeze([]),
  );
  useEffect(() => {
    let cancelled = false;
    if (returningRecognizedIdentity?.status !== "READY") {
      setReturningLivedGrowthReturnItems(Object.freeze([]));
      return () => {
        cancelled = true;
      };
    }
    void readOpenXinmaiLivedGrowthReturnItems(
      returningRecognizedIdentity.identityReferences,
    ).then((items) => {
      if (!cancelled) setReturningLivedGrowthReturnItems(items);
    });
    return () => {
      cancelled = true;
    };
  }, [
    returningRecognizedIdentity,
    returningGrowthSurfaceRevision,
  ]);
  const returningLivedResponseActive =
    returningLivedGrowthReturnItems.length > 0;
  const returningLifeWhisperEntryReady =
    returningVisualReady && !returningLivedResponseActive;
  const returningLifeWhisperRealityIntentReady =
    !returningLivedResponseActive &&
    resolveLifeWhisperRealityEntryIntent({
      lifeWhisperFact: returningLifeWhisperFact,
      lifeWhisperResponsePhase: returningLifeWhisperResponsePhase,
      unavailableContinuation:
        returningLifeWhisperUnavailableContinuation,
    });
  const returningRealityContext =
    returningStatePreview === "IDENTITY_ONLY" ||
    returningStatePreview === "CRYSTAL_ONLY"
      ? null
      : returningDynamicsInput?.selectedPressureSeedContext ?? null;
  const returningCrystalVisible =
    returningStatePreview !== "IDENTITY_ONLY" &&
    returningStatePreview !== "REALITY_ONLY";
  const returningLatestImprint =
    (returningCrystalVisible ? returningLifeArchive?.entries : null)
      ?.slice()
      .sort(
        (left, right) =>
          Date.parse(right.createdAt) - Date.parse(left.createdAt),
      )[0] ?? null;
  const returningLatestImprintSourceDimension =
    returningLatestImprint?.transmission.primaryDimension
      ?.trim()
      .toLowerCase() ?? "unknown";
  const returningLatestImprintSourceSlot =
    resolveLifeUniverseCrystalSourceSlot(
      returningLatestImprintSourceDimension,
    );
  const returningLatestImprintGeometry = useMemo(() => {
    if (
      !returningVisualReady ||
      returningVisualContinuity === null ||
      returningLatestImprint === null
    ) {
      return null;
    }
    const projectionBundle =
      returningVisualContinuity.consumerSourceResult.consumerSource
        .projectionBundle;
    const morphology =
      projectionBundle.morphologicalFieldAlignmentProjection
        .morphologicalFieldExpression;
    return resolveLifeUniverseCrystalImprintGeometry({
      identityKey: `${returningVisualContinuity.sourceReferenceId}:${returningLatestImprint.crystal.copy}`,
      birthMansionIndex:
        projectionBundle.twentyEightMansionCoordinateProjection.birthMansion
          .mansionIndex,
      normalizedOrbitPositions:
        projectionBundle.twentyEightMansionCoordinateProjection.coordinates.map(
          (coordinate) => coordinate.normalizedOrbitPosition,
        ),
      envelopeScale: morphology.envelopeScale,
      postureBias: morphology.postureBias,
      sourceSlot: returningLatestImprintSourceSlot,
    });
  }, [
    returningLatestImprint,
    returningLatestImprintSourceSlot,
    returningVisualContinuity,
    returningVisualReady,
  ]);
  const returningLatestImprintBodyPath = returningLatestImprintGeometry
    ? `M ${returningLatestImprintGeometry.target[0]} ${returningLatestImprintGeometry.target[1]} L ${returningLatestImprintGeometry.stem[0]} ${returningLatestImprintGeometry.stem[1]} L ${returningLatestImprintGeometry.branchTarget[0]} ${returningLatestImprintGeometry.branchTarget[1]}`
    : "";
  const returningLatestImprintBodyPoint =
    returningLatestImprintGeometry?.branchTarget ?? null;
  const returningHasReality = returningRealityContext !== null;
  const returningHasCrystal = returningLatestImprintGeometry !== null;
  const returningTemporalState =
    returningHasReality && returningHasCrystal
      ? "REALITY_AND_CRYSTAL"
      : returningHasReality
        ? "REALITY_ONLY"
        : returningHasCrystal
          ? "CRYSTAL_ONLY"
          : "IDENTITY_ONLY";
  const returningExperienceCopy =
    returningTemporalState === "REALITY_AND_CRYSTAL"
      ? "现实经过，变化也留在它的生命纹路里。"
      : returningTemporalState === "REALITY_ONLY"
        ? "最近的现实，仍在它的呼吸里。"
        : returningTemporalState === "CRYSTAL_ONLY"
          ? "那次变化，仍在它的生命纹路里。"
          : null;
  useEffect(
    () => () => {
      if (returningLifeWhisperOutcomeWatchdogRef.current !== null) {
        window.clearTimeout(
          returningLifeWhisperOutcomeWatchdogRef.current,
        );
        returningLifeWhisperOutcomeWatchdogRef.current = null;
      }
      returningLifeWhisperResponseCycleIdRef.current = null;
    },
    [],
  );
  const [interactionState, setInteractionState] = useState<LaunchInteractionState>("ENTRY");
  const interactionStateRef = useRef<LaunchInteractionState>("ENTRY");
  const [scene, setScene] = useState<SceneState>("ENTRY");
  const [clickFlash, setClickFlash] = useState(false);
  const [snapshotIndex, setSnapshotIndex] = useState(0);
  const sceneRef = useRef<SceneState>("ENTRY");
  const sceneEnteredAtRef = useRef(0);
  const pendingSceneTimerRef = useRef<number | null>(null);
  const timelineRunIdRef = useRef(0);
  const nodeTimelineStartedAtRef = useRef(0);
  const entryHandoffRef = useRef<((mode: EntryHandoffMode) => void) | null>(null);
  const dynamicsMotherHandoffRef = useRef<DynamicsMotherHandoff | null>(null);
  const showInternalNodeCopy = DEBUG_TIMELINE;
  const collapsePhase = "none";
  const isProductionCollapse = false;
  const visualLayerClass = useCallback(
    (targetScene: SceneState, extra = "") => `gy-timeline-layer ${extra} ${scene === targetScene ? "on" : "off"}`,
    [scene],
  );

  const setSceneState = useCallback((nextScene: SceneState) => {
    const currentScene = sceneRef.current;
    if (!DEBUG_TIMELINE) {
      const requiredHoldMs =
        currentScene === "NODE_1" && nextScene === "NODE_2"
          ? 1200
          : currentScene === "NODE_2" && nextScene === "HANDOFF"
            ? 700
            : currentScene === "HANDOFF" && nextScene === "ENTRY"
              ? 500
              : 0;
      const requiredTimelineMs =
        nodeTimelineStartedAtRef.current > 0
          ? nextScene === "NODE_2"
            ? 1200
            : nextScene === "HANDOFF"
              ? 1900
              : nextScene === "ENTRY" && currentScene === "HANDOFF"
                ? 2400
                : 0
          : 0;
      const remainingTimelineMs = requiredTimelineMs > 0
        ? requiredTimelineMs - (performance.now() - nodeTimelineStartedAtRef.current)
        : 0;

      if (requiredHoldMs > 0 || remainingTimelineMs > 0) {
        const remainingMs = Math.max(
          requiredHoldMs > 0 ? requiredHoldMs - (performance.now() - sceneEnteredAtRef.current) : 0,
          remainingTimelineMs
        );
        if (remainingMs > 0) {
          if (pendingSceneTimerRef.current !== null) window.clearTimeout(pendingSceneTimerRef.current);
          pendingSceneTimerRef.current = window.setTimeout(() => {
            pendingSceneTimerRef.current = null;
            setSceneState(nextScene);
          }, remainingMs);
          return;
        }
      }
    }

    if (pendingSceneTimerRef.current !== null) {
      window.clearTimeout(pendingSceneTimerRef.current);
      pendingSceneTimerRef.current = null;
    }
    sceneRef.current = nextScene;
    sceneEnteredAtRef.current = performance.now();
    setScene(nextScene);
  }, []);

  const goNext = useCallback((current: SceneState) => {
    if (!DEBUG_TIMELINE && nodeTimelineStartedAtRef.current > 0) {
      const requiredTimelineMs = current === "NODE_1" ? 1200 : current === "NODE_2" ? 1900 : 0;
      const remainingMs = requiredTimelineMs - (performance.now() - nodeTimelineStartedAtRef.current);
      if (remainingMs > 0) {
        if (pendingSceneTimerRef.current !== null) window.clearTimeout(pendingSceneTimerRef.current);
        pendingSceneTimerRef.current = window.setTimeout(() => {
          pendingSceneTimerRef.current = null;
          goNext(current);
        }, remainingMs);
        return;
      }
    }

    const idx = SCENE_ORDER.indexOf(current);
    const next = SCENE_ORDER[idx + 1];
    if (next) setSceneState(next);
  }, [setSceneState]);

  const debugGoTo = useCallback((target: SceneState) => {
    const targetIndex = snapshotTargets.indexOf(target);
    if (targetIndex >= 0) setSnapshotIndex(targetIndex);
    setSceneState(target);
  }, [setSceneState]);

  const nextSnapshot = useCallback(() => {
    setSnapshotIndex((prev) => {
      const next = prev + 1;
      if (next >= snapshotTargets.length) return prev;
      setSceneState(snapshotTargets[next]!);
      return next;
    });
  }, [setSceneState]);

  const setLaunchInteractionState = useCallback((nextState: LaunchInteractionState) => {
    interactionStateRef.current = nextState;
    setInteractionState(nextState);
  }, []);

  const enterNext = useCallback(() => {
    if (sceneRef.current !== "HANDOFF") return;
    entryHandoffRef.current?.(getEntryUserTypePreviewOverride() ?? getEntryUserType());
  }, []);

  const triggerClickFlash = useCallback(() => {
    setClickFlash(true);
    window.setTimeout(() => setClickFlash(false), 180);
  }, []);

  const commitPressureSeedCapture = useCallback(
    (candidate: PressureSeedCrossAxisSeed | undefined) => {
      if (!candidate) return;
      setLaunchInteractionState("SEED_SELECTED");
      setLaunchInteractionState("SNAPSHOT_GENERATED");
    },
    [setLaunchInteractionState],
  );

  useEffect(() => {
    if (!SNAPSHOT_MODE) return undefined;
    sceneRef.current = scene;
    return undefined;
  }, [scene]);

  useEffect(() => {
    if (scene !== "NODE_1") return undefined;
    if (DEBUG_TIMELINE) return undefined;

    const startedAt = sceneEnteredAtRef.current;
    const runId = timelineRunIdRef.current;
    const advanceAfterHold = () => {
      if (timelineRunIdRef.current !== runId) return;
      if (sceneRef.current !== "NODE_1" || sceneEnteredAtRef.current !== startedAt) return;
      const remainingMs = 1200 - (performance.now() - startedAt);
      if (remainingMs > 0) {
        timer = window.setTimeout(advanceAfterHold, remainingMs);
        return;
      }
      goNext("NODE_1");
    };
    let timer = window.setTimeout(advanceAfterHold, 1200);

    return () => window.clearTimeout(timer);
  }, [goNext, scene]);

  useEffect(() => {
    if (scene !== "NODE_2") return undefined;
    if (DEBUG_TIMELINE) return undefined;

    const startedAt = sceneEnteredAtRef.current;
    const runId = timelineRunIdRef.current;
    const advanceAfterHold = () => {
      if (timelineRunIdRef.current !== runId) return;
      if (sceneRef.current !== "NODE_2" || sceneEnteredAtRef.current !== startedAt) return;
      const remainingMs = 700 - (performance.now() - startedAt);
      if (remainingMs > 0) {
        timer = window.setTimeout(advanceAfterHold, remainingMs);
        return;
      }
      goNext("NODE_2");
    };
    let timer = window.setTimeout(advanceAfterHold, 700);

    return () => window.clearTimeout(timer);
  }, [goNext, scene]);

  useEffect(() => {
    if (scene !== "HANDOFF") return undefined;
    if (DEBUG_TIMELINE) return undefined;

    const startedAt = sceneEnteredAtRef.current;
    const runId = timelineRunIdRef.current;
    const advanceAfterHold = () => {
      if (timelineRunIdRef.current !== runId) return;
      if (sceneRef.current !== "HANDOFF" || sceneEnteredAtRef.current !== startedAt) return;
      const remainingMs = 500 - (performance.now() - startedAt);
      if (remainingMs > 0) {
        timer = window.setTimeout(advanceAfterHold, remainingMs);
        return;
      }
      enterNext();
    };
    let timer = window.setTimeout(advanceAfterHold, 500);

    return () => window.clearTimeout(timer);
  }, [enterNext, scene]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();

    const m = {
      w: 0,
      h: 0,
      state: STATE.STARFIELD_IDLE as LaunchState,
      t: 0,
      pulsed: false,
      moonReleaseStarted: false,
      moonReleaseT: 0,
      chaos: MANSION_COORDINATES.map((_, index) => ({
        ph: LIFE_UNIVERSE_STAR_FIELD[index]!.phase,
        sp: LIFE_UNIVERSE_STAR_FIELD[index]!.speed,
      })),
      presentDone: false,
      field: [] as FieldStar[],
      textStars: [] as TextStar[],
      entryTransitionSnapshot: null as EntryTransitionSnapshot | null,
      pressureCanvasOpened: false,
      entryCardSide: "front" as "front" | "back",
      entryCardFlipTo: "front" as "front" | "back",
      entryCardFlipT: 1,
      motherCardFace: "front" as "front" | "back",
      motherCardFlipPulse: 0,
      originLockPulse: 0,
      afterForm: 0,
      formed: false,
      phaseX: 3,
      precisionY: 10,
      dwellT: 0,
      coords: { year: 1995, month: 6, day: 2, hour: 17 } as ChronoCoords,
      chronoStep: 0,
      lunarDayTarget: 15,
      lunarDayVisual: 15,
      lunarDateLabel: "",
      geo: { provinceIndex: DEFAULT_PROVINCE_INDEX >= 0 ? DEFAULT_PROVINCE_INDEX : 0, cityIndex: DEFAULT_CITY_INDEX >= 0 ? DEFAULT_CITY_INDEX : 0 },
      geoStep: 0,
      lifeSourceSession: null as LaunchLifeSourceSession | null,
      lifeBeastMansionIndex: null as number | null,
      lifeBeastGroupStart: null as number | null,
      originMotherContextPersistenceAttempted: false,
      dialFloat: 1995,
      railProgress: 0,
      clutched: false,
      handoffStarted: false,
      genesisContinuityStarted: false,
      verticalTuned: false,
      verticalDragMoved: false,
      dragging: false,
      dragAxis: null as null | "x" | "y",
      lastX: 0,
      lastY: 0,
      node1State: null as null | typeof Node1State,
      node1T: 0,
      pendingAxisMode: "NEW_USER" as EntryHandoffMode,
      pressureSeeds: buildDeterministicPressureSeedCandidates(),
      pressureSeedIndex: 1,
      pressureSeedExcludedIds: [] as string[],
      pressureSeedCoordinateIndex: 10,
      pressureSeedRound: 0,
      pressureSeedLocked: false,
      pressureSeedGroupPulse: 0,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    if (returningLifeIdentity && returningLifeContext !== null) {
      const returningMansionIndex =
        returningLifeContext.lifeSourceSession.starbeastDerivationResult
          .mansionIndex;
      m.lifeSourceSession = returningLifeContext.lifeSourceSession;
      m.lifeBeastMansionIndex = returningMansionIndex;
      m.lifeBeastGroupStart = Math.floor(returningMansionIndex / 7) * 7;
    }
    entryHandoffRef.current = (mode: EntryHandoffMode) => {
      setSceneState("ENTRY");
      m.node1State = null;
      m.node1T = 0;
      m.pendingAxisMode = mode;
      dynamicsMotherHandoffRef.current = null;
      if (mode === "OLD_USER") {
        openPressureSeedAxis();
        return;
      }
      resetOriginTuningFlow();
      m.state = STATE.STARBEAST_SANDIFY;
      m.t = 0;
      audio.form();
      vibrate([0, 18, 24]);
    };
    LIFE_UNIVERSE_STAR_FIELD.slice(0, CFG.starfield).forEach((star) => {
      const projected = projectLifeUniverseStarToViewport(star, 1, 1, 0);
      m.field.push({
        x: projected.x,
        y: projected.y,
        r: star.radius,
        ph: star.phase,
        sp: star.speed,
        vx: 0,
        vy: 0,
      });
    });

    function vibrate(p: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
    }
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.w = rect.width;
      m.h = rect.height;
      buildTextStars();
    }

    function buildTextStars() {
      if (!m.w || !m.h) return;
      const size = Math.min(18, m.w * 0.046);
      const bottomCopyX = m.w / 2;
      const lines: Array<{ text: string; y: number; weight: number; x?: number; align?: CanvasTextAlign }> = [
        { text: TOP_LINES[0], y: m.h * 0.16, weight: 650 },
        { text: TOP_LINES[1], y: m.h * 0.205, weight: 650 },
        { text: CTA_LINES[0], x: bottomCopyX, y: m.h * 0.78, weight: 650, align: "center" },
        { text: CTA_LINES[1], x: bottomCopyX, y: m.h * 0.825, weight: 650, align: "center" },
        { text: ENTRY_ACTION_LINE, x: bottomCopyX, y: m.h * 0.89, weight: 620, align: "center" },
      ];
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(m.w));
      off.height = Math.max(1, Math.floor(m.h));
      const o = off.getContext("2d");
      if (!o) return;
      o.textAlign = "center";
      o.textBaseline = "middle";
      const gap = 5;
      const stars: TextStar[] = [];
      lines.forEach((line, li) => {
        o.clearRect(0, 0, off.width, off.height);
        o.textAlign = line.align ?? "center";
        o.fillStyle = "#fff";
        o.font = `${line.weight} ${size}px ${SANS}`;
        o.fillText(line.text, line.x ?? m.w / 2, line.y);
        const data = o.getImageData(0, 0, off.width, off.height).data;
        for (let y = 0; y < off.height; y += gap) {
          for (let x = 0; x < off.width; x += gap) {
            if (data[(y * off.width + x) * 4 + 3]! > 128) {
              const sourceIndex = MANSION_COORDINATES.length + (stars.length % Math.max(1, m.field.length - MANSION_COORDINATES.length));
              const source = m.field[sourceIndex] ?? m.field[stars.length % m.field.length];
              const sourceUniverseStar = LIFE_UNIVERSE_STAR_FIELD[sourceIndex]
                ?? LIFE_UNIVERSE_STAR_FIELD[stars.length % LIFE_UNIVERSE_STAR_FIELD.length];
              const sourcePoint = sourceUniverseStar
                ? projectLifeUniverseStarToViewport(
                    sourceUniverseStar,
                    m.w,
                    m.h,
                    performance.now() / 1000,
                  )
                : null;
              stars.push({
                tx: x,
                ty: y,
                ox: sourcePoint?.x ?? (source ? source.x * m.w : m.w / 2),
                oy: sourcePoint?.y ?? (source ? source.y * m.h : m.h * 0.48),
                ph: source?.ph ?? 0,
                sp: source?.sp ?? 0.8,
                line: li,
              });
            }
          }
        }
      });
      m.textStars = stars;
    }

    function nodeConv(i: number) {
      const lifeBeastSlot = lifeBeastSlotForMansion(i);
      if (lifeBeastSlot < 0) return 0;
      if (m.state === STATE.FORMATION) {
        const start = 0.08 + lifeBeastSlot * 0.075;
        return smooth(start, start + 0.72, m.t);
      }
      if (
        m.state === STATE.APPROACH ||
        m.state === STATE.READY ||
        m.state === STATE.STARBEAST_SANDIFY ||
        isAxisState()
      ) {
        return 1;
      }
      return 0;
    }
    function isAxisState() {
      return m.state === STATE.AXIS_EMERGENCE ||
        m.state === STATE.TIME_CALIBRATION ||
        m.state === STATE.GEO_BIND ||
        m.state === STATE.DISPLAY_LOCK;
    }
    function isMotherCodeRevealState() {
      return m.state === STATE.MOTHER_CODE_REVEAL;
    }
    function isConvergenceState() {
      return m.state === STATE.ENTRY_PRE_COLLAPSE || m.state === STATE.ENTRY_LIGHT_CONVERGENCE;
    }
    function isEntryStaticState() {
      return m.state === STATE.ENTRY_STATIC_RENDER;
    }
    function axisMetrics() {
      const cols = ORIGIN_RAIL_COLS;
      const rows = 21;
      const cw = Math.min(m.w, 440);
      const cl = (m.w - cw) / 2;
      const railX0 = cl + cw * 0.06;
      const railX1 = cl + cw * 0.92;
      const axisX = cl + cw * 0.74;
      const axisTop = m.h * 0.3;
      const axisBottom = m.h * 0.84;
      const railY = m.h * 0.78;
      return { cols, rows, cl, cw, railX0, railX1, axisX, axisTop, axisBottom, railY };
    }
    function timeWheelMetrics() {
      const width = Math.min(m.w - 24, 408);
      const left = (m.w - width) / 2;
      const columnWidth = width / CHRONO_DIMS.length;
      const top = m.h * 0.655;
      const height = Math.min(154, m.h * 0.205);
      const centerY = top + height * 0.57;
      return { width, left, columnWidth, top, height, centerY };
    }
    function timeWheelIndexAt(x: number, y: number) {
      const wheel = timeWheelMetrics();
      if (
        x < wheel.left ||
        x > wheel.left + wheel.width ||
        y < wheel.top - 10 ||
        y > wheel.top + wheel.height + 10
      ) {
        return null;
      }
      return clamp(
        Math.floor((x - wheel.left) / wheel.columnWidth),
        0,
        CHRONO_DIMS.length - 1,
      );
    }
    function timeWheelValueLabel(dim: ChronoDim, value: number) {
      const rounded = Math.round(value);
      if (dim === "year") return String(rounded);
      if (dim === "month" || dim === "day") return pad2(rounded);
      return `${pad2(clamp(rounded, 0, 23))}:00`;
    }
    function timeWheelValueStep(dim: ChronoDim) {
      void dim;
      return 1;
    }
    function syncLunarTimeProjection() {
      const calendar = resolveBirthCalendarFromGregorianDate({
        year: m.coords.year,
        month: m.coords.month,
        day: m.coords.day,
      });
      if (calendar.status !== "READY") {
        m.lunarDateLabel = "农历日期正在换算";
        return;
      }
      m.lunarDayTarget = calendar.lunarBirthDate.day;
      m.lunarDateLabel = formatLunarBirthDate(
        calendar.lunarBirthDate.relatedYear,
        calendar.lunarBirthDate.month,
        calendar.lunarBirthDate.day,
        calendar.lunarBirthDate.isLeapMonth,
        m.coords.hour,
      );
    }
    function axisPoint(col: number, row: number) {
      const g = axisMetrics();
      return {
        x: lerp(g.railX0, g.railX1, col / (g.cols - 1)),
        y: lerp(g.axisTop, g.axisBottom, row / (g.rows - 1)),
      };
    }
    function railPoint(col: number) {
      const g = axisMetrics();
      return { x: lerp(g.railX0, g.railX1, col / (g.cols - 1)), y: g.railY };
    }
    function tunePoint(row: number) {
      const g = axisMetrics();
      return { x: g.axisX, y: lerp(g.axisTop, g.axisBottom, row / (g.rows - 1)) };
    }
    function activeDim(): ChronoDim {
      return CHRONO_DIMS[m.chronoStep] ?? "hour";
    }
    function setDimValue(dim: ChronoDim, value: number) {
      void dim;
      const { min, max } = dimRange(m.coords, dim);
      const v = Math.round(clamp(value, min, max));
      m.coords[dim] = v;
      if (dim === "month") {
        const dayMax = dimRange(m.coords, "day").max;
        m.coords.day = Math.min(m.coords.day, dayMax);
      }
      if (dim !== "hour") {
        m.lifeBeastMansionIndex = null;
        m.lifeBeastGroupStart = null;
      }
      syncLunarTimeProjection();
    }
    function dimText(dim: ChronoDim, value: number) {
      const v = Math.round(value);
      const copy = AXIS_COPY[m.pendingAxisMode].dimLabel;
      if (dim === "year") return `${copy.year} ${String(v).slice(-2)}`;
      if (dim === "month") return `${copy.month} ${pad2(v)}`;
      if (dim === "day") return `${copy.day} ${pad2(v)}`;
      return `${copy.hour} ${hourToPeriodLabel(clamp(v, 0, 23))}`;
    }
    function originTuningCenterValue(dim: ChronoDim, value: number, isGeoStage: boolean, geoDim: GeoDim) {
      if (isGeoStage) {
        const index = Math.round(clamp(value, 0, Math.max(0, geoOptions(geoDim).length - 1)));
        return geoOptions(geoDim)[index] ?? currentProvinceName();
      }

      const v = Math.round(value);
      if (dim === "year") return String(v);
      if (dim === "month" || dim === "day") return pad2(v);
      return `${pad2(clamp(v, 0, 23))}:00`;
    }
    function activeGeoDim(): GeoDim {
      return GEO_DIMS[m.geoStep] ?? "province";
    }
    function geoOptions(dim: GeoDim) {
      if (dim === "province") return PROVINCE_OPTIONS;
      const province = PROVINCE_OPTIONS[m.geo.provinceIndex] ?? "广东";
      return CITY_OPTIONS_BY_PROVINCE[province] ?? ["广州"];
    }
    function geoRange(dim: GeoDim) {
      return { min: 0, max: Math.max(0, geoOptions(dim).length - 1) };
    }
    function geoValue(dim: GeoDim) {
      return dim === "province" ? m.geo.provinceIndex : m.geo.cityIndex;
    }
    function setGeoValue(dim: GeoDim, value: number) {
      const { min, max } = geoRange(dim);
      const v = Math.round(clamp(value, min, max));
      if (dim === "province") {
        const changed = m.geo.provinceIndex !== v;
        m.geo.provinceIndex = v;
        if (changed) m.geo.cityIndex = 0;
      } else {
        m.geo.cityIndex = v;
      }
    }
    function geoText(dim: GeoDim, value: number) {
      const index = Math.round(clamp(value, 0, Math.max(0, geoOptions(dim).length - 1)));
      const copy = AXIS_COPY[m.pendingAxisMode].geoLabel;
      return dim === "province" ? `${copy.province} ${pad2(index + 1)}` : `${copy.city} ${pad2(index + 1)}`;
    }
    function currentProvinceName() {
      return PROVINCE_OPTIONS[m.geo.provinceIndex] ?? "广东";
    }
    function currentCityName() {
      const province = currentProvinceName();
      return (CITY_OPTIONS_BY_PROVINCE[province] ?? ["广州"])[m.geo.cityIndex] ?? "广州";
    }
    function originCoordinateSummary() {
      return `出生 ${m.coords.year}年 · ${pad2(m.coords.month)}月 · ${pad2(m.coords.day)}日 · ${hourToPeriodLabel(m.coords.hour)}`;
    }
    function buildLaunchOriginMotherInput(): LaunchOriginMotherInput {
      return {
        birth: {
          year: m.coords.year,
          month: m.coords.month,
          day: m.coords.day,
          hourBranch: hourToPeriodLabel(m.coords.hour),
        },
        periodIndex: hourToPeriodIndex(m.coords.hour),
        geo: UNCOLLECTED_BIRTH_CONTEXT,
        starbeast: {
          nodeCount: MANSION_COORDINATES.length,
          primaryNodeIndex: Math.max(0, Math.min(MANSION_COORDINATES.length - 1, Math.round((m.precisionY / 20) * (MANSION_COORDINATES.length - 1)))),
          originLightTrace: "28光兽入口",
        },
      };
    }
    function activeLifeBeastMansionIndices() {
      if (m.lifeBeastGroupStart === null) return [];
      return Array.from({ length: 7 }, (_, index) => m.lifeBeastGroupStart! + index);
    }
    function lifeBeastSlotForMansion(mansionIndex: number) {
      if (m.lifeBeastGroupStart === null) return -1;
      const slot = mansionIndex - m.lifeBeastGroupStart;
      return slot >= 0 && slot < 7 ? slot : -1;
    }
    function resolveOriginMotherCode(): GeoChronoMotherFusionResult {
      return m.lifeSourceSession?.originMotherResult
        ?? resolveLaunchOriginMother(buildLaunchOriginMotherInput());
    }
    function captureLaunchLifeSourceSession(): LaunchLifeSourceSession {
      if (m.lifeSourceSession) return m.lifeSourceSession;

      const launchInput = buildLaunchOriginMotherInput();
      const sourceResults = resolveLaunchOriginMotherSourceResults(launchInput);
      const mansionIndex = sourceResults.starbeastDerivationResult.mansionIndex;
      m.lifeBeastMansionIndex = mansionIndex;
      m.lifeBeastGroupStart = Math.floor(mansionIndex / 7) * 7;
      const sessionResult = createLaunchLifeSourceSession({
        sourceReferenceId: [
          "launch",
          `${launchInput.birth.year}-${pad2(launchInput.birth.month)}-${pad2(launchInput.birth.day)}`,
          launchInput.birth.hourBranch,
        ].join(":"),
        birthCoordinate: launchInput.birth,
        ...sourceResults,
      });

      if (sessionResult.status !== "AVAILABLE") {
        throw new Error(`LAUNCH_LIFE_SOURCE_SESSION_BLOCKED:${sessionResult.reason}`);
      }

      const visualSourceResult = resolveLaunchLifeVisualSource(sessionResult.session);
      if (visualSourceResult.status !== "AVAILABLE") {
        throw new Error(
          `LAUNCH_LIFE_VISUAL_SOURCE_BLOCKED:${visualSourceResult.reason}`,
        );
      }

      const visualContextResult = activateRealUserGenesisVisualSourceContext({
        lifeSourceSession: sessionResult.session,
        visualSourceAdapterInput: visualSourceResult.input,
        visualSource: visualSourceResult.visualSource,
      });
      if (visualContextResult.status !== "AVAILABLE") {
        throw new Error(
          `REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_BLOCKED:${visualContextResult.reason}`,
        );
      }

      persistLaunchLifeSourceSession(sessionResult.session);
      m.lifeSourceSession = sessionResult.session;
      return sessionResult.session;
    }
    function persistOriginMotherContext(reveal: GeoChronoMotherFusionResult) {
      if (m.pendingAxisMode !== "NEW_USER" || m.originMotherContextPersistenceAttempted) return;

      const motherHandoff = buildDynamicsMotherHandoff(reveal);

      try {
        dynamicsMotherHandoffRef.current = Object.freeze({
          motherCodeProfile: writeMotherCodeProfile(motherHandoff.motherCodeProfile),
          originMotherContext: writeOriginMotherContext({
            ...motherHandoff.originMotherContext,
            lifeSourceSession: m.lifeSourceSession,
          }),
          personaOutputSnapshot: writePersonaOutputSnapshot(motherHandoff.personaOutputSnapshot),
        });
        m.originMotherContextPersistenceAttempted = true;
      } catch (error) {
        console.warn("[LaunchLab] failed to persist launch mother assets", error);
      }
    }
    function enterProductionGenesis() {
      const lifeSourceSession = captureLaunchLifeSourceSession();
      const handoff = resolveLaunchGenesisProductionRouteHandoff({
        lifeSourceSession,
      });
      if (handoff.status !== "READY") {
        throw new Error(
          `LAUNCH_GENESIS_PRODUCTION_HANDOFF_BLOCKED:${handoff.guardReason}`,
        );
      }
      setLaunchInteractionState("GENESIS_HANDOFF");
      navigate(handoff.routeTarget);
    }
    function beginProductionGenesisContinuity() {
      if (m.genesisContinuityStarted) return;
      const lifeSourceSession = captureLaunchLifeSourceSession();
      persistOriginMotherContext(lifeSourceSession.originMotherResult);
      m.genesisContinuityStarted = true;
      m.railProgress = 1;
      m.phaseX = ORIGIN_RAIL_COLS - 1;
      m.clutched = true;
      m.state = STATE.DISPLAY_LOCK;
      m.t = 0;
      audio.form();
      vibrate([0, 18, 24]);
      window.setTimeout(() => enterProductionGenesis(), CFG.firstPresenceSeconds * 1000);
    }
    function buildEntryTransitionSnapshot(): EntryTransitionSnapshot {
      return {
        chrono: "光痕已显现",
        direction: "光兽汇聚",
        trigram: "镜面可进入",
        cacheStatus: "missing",
        entryCode: "光痕",
        entrySource: "镜面",
      } as unknown as EntryTransitionSnapshot;
    }
    function blockLegacyEntryExecution() {
      return;
    }
    function syncDialToCurrent() {
      const rangeOwner = m.state === STATE.GEO_BIND ? activeGeoDim() : activeDim();
      m.dialFloat = m.state === STATE.GEO_BIND
        ? geoValue(rangeOwner as GeoDim)
        : dimValue(m.coords, rangeOwner as ChronoDim);
      const { min, max } = m.state === STATE.GEO_BIND
        ? geoRange(rangeOwner as GeoDim)
        : dimRange(m.coords, rangeOwner as ChronoDim);
      const frac = max > min ? (m.dialFloat - min) / (max - min) : 0;
      m.precisionY = max > min ? Math.round((1 - frac) * 20) : 10;
    }
    function resetOriginTuningFlow() {
      m.chronoStep = 0;
      m.geoStep = 0;
      m.lifeSourceSession = null;
      m.lifeBeastMansionIndex = null;
      m.lifeBeastGroupStart = null;
      clearRealUserGenesisVisualSourceContext();
      m.originMotherContextPersistenceAttempted = false;
      dynamicsMotherHandoffRef.current = null;
      m.railProgress = 0;
      m.phaseX = 0;
      m.dragging = false;
      m.dragAxis = null;
      m.clutched = false;
      m.verticalTuned = false;
      m.verticalDragMoved = false;
      m.lunarDayTarget = 15;
      m.lunarDayVisual = 15;
      m.lunarDateLabel = "";
    }
    function resetAxisStepProgress() {
      m.railProgress = 0;
      m.phaseX = 0;
      m.dragging = false;
      m.dragAxis = null;
      m.clutched = false;
      m.verticalDragMoved = false;
      m.dwellT = 0;
    }
    function enterTimeInjectionFromMoon() {
      // One entrance gesture has one semantic result: the Moon releases time
      // and the same universe becomes the birth-time coordinate. The former
      // 28-mansion/recognition replay is intentionally outside this path.
      m.pendingAxisMode = "NEW_USER";
      resetOriginTuningFlow();
      syncDialToCurrent();
      syncLunarTimeProjection();
      m.state = STATE.TIME_CALIBRATION;
      m.t = 0;
      m.dwellT = 0;
      audio.form();
      vibrate([0, 18, 24]);
    }
    function triggerEntryTransition() {
      if (m.handoffStarted) return;
      m.handoffStarted = true;
      window.setTimeout(() => {
        if (m.pendingAxisMode === "OLD_USER") {
          m.railProgress = 0;
          m.phaseX = 0;
          m.dragging = false;
          m.dragAxis = null;
          m.clutched = false;
          m.pressureSeedIndex = 1;
          m.state = STATE.PRESSURE_SEED_AXIS;
          m.t = 0;
          return;
        }
        m.railProgress = 0;
        m.phaseX = 0;
        m.dragging = false;
        m.dragAxis = null;
        m.clutched = false;
        openMotherCodeReveal();
      }, ENTRY_HANDOFF_DELAY_MS);
    }
    function openMotherCodeReveal() {
      const originMother = captureLaunchLifeSourceSession().originMotherResult;
      persistOriginMotherContext(originMother);
      m.railProgress = 0;
      m.phaseX = 0;
      m.dragging = false;
      m.dragAxis = null;
      m.clutched = false;
      m.motherCardFace = "front";
      m.motherCardFlipPulse = 0;
      m.state = STATE.MOTHER_CODE_REVEAL;
      m.t = 0;
      audio.form();
      vibrate([0, 12, 18]);
    }
    function openRealityPressureEntry() {
      m.railProgress = 0;
      m.phaseX = 0;
      m.dragging = false;
      m.dragAxis = null;
      m.clutched = false;
      m.state = STATE.ENTRY_STATIC_RENDER;
      m.t = 0;
      audio.form();
      vibrate([0, 12, 18]);
    }
    function emitBeastCollapseVisualEvent() {
      window.dispatchEvent(new CustomEvent(BEAST_COLLAPSE_VISUAL_EVENT));
    }
    function emitNode1MirrorActivatedEvent() {
      window.dispatchEvent(new CustomEvent(NODE1_MIRROR_ACTIVATED_EVENT));
    }
    function activateNode1Mirror() {
      if (m.node1State?.mirrorActivated) return;
      timelineRunIdRef.current += 1;
      nodeTimelineStartedAtRef.current = performance.now();
      m.node1State = Node1State;
      m.node1T = 0;
      setSceneState("NODE_1");
      console.log(NODE1_MIRROR_ACTIVATED_EVENT);
      audio.form();
      vibrate([0, 18, 24]);
    }
    function routeEntryFromBeastCollapseEvent() {
      const type = getEntryUserTypePreviewOverride() ?? getEntryUserType();
      const routeMode = type === "NEW_USER" ? "ORIGINAL_COORDINATE_LOADING" : "PRESSURE_SEED_LOADING";

      console.log("ENTRY_DECISION", type);
      console.log("ROUTE_MODE", routeMode);

      m.pendingAxisMode = type;
      if (type === "NEW_USER") resetOriginTuningFlow();
      m.state = STATE.STARBEAST_SANDIFY;
      m.t = 0;
      audio.form();
      vibrate([0, 18, 24]);
    }
    function completeEntryCanvasHandoff() {
      if (m.handoffStarted) return;
      m.railProgress = 1;
      m.phaseX = ORIGIN_RAIL_COLS - 1;
      m.clutched = true;
      m.entryTransitionSnapshot = m.entryTransitionSnapshot ?? buildEntryTransitionSnapshot();
      m.state = STATE.DISPLAY_LOCK;
      m.t = 0;
      audio.form();
      vibrate([0, 18, 24]);
      blockLegacyEntryExecution();
      triggerEntryTransition();
    }
    function openPressureSeedAxis() {
      m.railProgress = 0;
      m.phaseX = 0;
      m.dragging = false;
      m.dragAxis = null;
      m.clutched = false;
      m.pressureSeedExcludedIds = [];
      m.pressureSeeds = buildDeterministicPressureSeedCandidates();
      m.pressureSeedIndex = 1;
      m.pressureSeedCoordinateIndex = 10;
      m.pressureSeedRound = 0;
      m.pressureSeedLocked = false;
      m.railProgress = 0.5;
      m.pressureSeedGroupPulse = 0;
      m.state = STATE.PRESSURE_SEED_AXIS;
      m.t = 0;
      audio.form();
      vibrate([0, 12, 18]);
    }
    function loadPressureSeedTriplet(nextCoordinateIndex: number) {
      const currentIds = m.pressureSeeds.map((seed) => seed.id);
      const excluded = Array.from(new Set([...m.pressureSeedExcludedIds, ...currentIds]));
      let nextSeeds = buildDeterministicPressureSeedCandidates(excluded);
      const sameGroup = nextSeeds.map((seed) => seed.id).join("|") === currentIds.join("|");
      if (sameGroup && excluded.length > 0) {
        nextSeeds = buildDeterministicPressureSeedCandidates();
        m.pressureSeedExcludedIds = [];
        m.pressureSeedRound += 1;
      } else {
        m.pressureSeedExcludedIds = excluded;
      }
      if (nextSeeds.length > 0) {
        m.pressureSeeds = nextSeeds;
        m.pressureSeedIndex = Math.min(1, nextSeeds.length - 1);
        m.pressureSeedCoordinateIndex = clamp(nextCoordinateIndex, 0, 20);
        m.pressureSeedLocked = false;
        m.railProgress = 0.5;
        m.phaseX = 0;
        m.pressureSeedGroupPulse = 1;
        audio.tick();
        vibrate(10);
      }
    }
    function enterFocusedPressureSeed() {
      if (!m.pressureSeedLocked) return;
      const selected = m.pressureSeeds[m.pressureSeedIndex] ?? m.pressureSeeds[0] ?? buildDeterministicPressureSeedCandidate();
      commitPressureSeedCapture(selected);
    }
    function commitCurrentDim() {
      if (m.clutched) return;
      if (m.state === STATE.GEO_BIND) {
        const geoDim = activeGeoDim();
        setGeoValue(geoDim, m.dialFloat);
        if (m.pendingAxisMode === "NEW_USER") {
          m.originLockPulse = 1;
          if (m.geoStep < GEO_DIMS.length - 1) {
            m.geoStep += 1;
            resetAxisStepProgress();
            syncDialToCurrent();
            audio.tick();
            vibrate(8);
            return;
          }
          if (DEBUG_TIMELINE) {
            openMotherCodeReveal();
            return;
          }
          beginProductionGenesisContinuity();
          return;
        }
        completeEntryCanvasHandoff();
        return;
      }

      const dim = activeDim();
      setDimValue(dim, m.dialFloat);
      if (m.pendingAxisMode === "NEW_USER") {
        m.originLockPulse = 1;
        // The four familiar wheels form one birth-time input. Confirmation
        // accepts the complete value at once; there is no staged lesson or
        // year → month → day → hour checkpoint sequence.
        captureLaunchLifeSourceSession();
        if (DEBUG_TIMELINE) {
          openMotherCodeReveal();
          return;
        }
        beginProductionGenesisContinuity();
        return;
      }
      completeEntryCanvasHandoff();
    }
    function nodePos(i: number) {
      const universeSeconds = performance.now() / 1000;
      const coreFrame = resolveLifeUniverseCoreFrame(
        m.w,
        m.h,
        universeSeconds,
      );
      const orbitAngle =
        (i / MANSION_COORDINATES.length) * Math.PI * 2 -
        Math.PI / 2;
      const orbitRadiusX = Math.min(m.w * 0.43, 168);
      const orbitRadiusY = Math.min(m.w * 0.19, 74);
      const mansionGroup = Math.floor(i / 7);
      const mansionSlot = i % 7;
      const entranceOrderPhase =
        universeSeconds * 0.075 +
        mansionGroup * 0.72 +
        mansionSlot * 0.18;
      const entranceDepthBreath =
        Math.sin(
          universeSeconds * 0.09 +
            mansionGroup * 0.86 +
            mansionSlot * 0.14,
        ) * 0.035;
      const orbitDepth =
        0.5 +
        Math.sin(orbitAngle) * 0.18 +
        (m.state === STATE.STARFIELD_IDLE ? entranceDepthBreath : 0);
      const mansionMotion = m.chaos[i]!;
      const orderedEntrance = m.state === STATE.STARFIELD_IDLE;
      const driftX = orderedEntrance
        ? Math.sin(entranceOrderPhase) * (1.6 + orbitDepth * 2.2)
        : Math.sin(
            universeSeconds * (0.09 + mansionMotion.sp * 0.018) +
              mansionMotion.ph,
          ) *
          (1.8 + orbitDepth * 2.6);
      const driftY = orderedEntrance
        ? Math.cos(entranceOrderPhase * 0.84) *
          (1.05 + orbitDepth * 1.65)
        : Math.cos(
            universeSeconds * (0.075 + mansionMotion.sp * 0.015) +
              mansionMotion.ph * 0.83,
          ) *
          (1.2 + orbitDepth * 1.9);
      const orbitX =
        coreFrame.x + Math.cos(orbitAngle) * orbitRadiusX + driftX;
      const orbitY =
        coreFrame.y + Math.sin(orbitAngle) * orbitRadiusY + driftY;
      const lifeBeastSlot = lifeBeastSlotForMansion(i);
      const activeMansion = lifeBeastSlot >= 0;
      const conv = activeMansion ? nodeConv(i) : 0;

      let manifestedX = orbitX;
      let manifestedY = orbitY;
      let perspective = orbitDepth;

      const topologyToAxis =
        m.state === STATE.STARBEAST_SANDIFY
          ? smooth(0.04, 1.1, m.t)
          : m.state === STATE.DISPLAY_LOCK && m.pendingAxisMode === "NEW_USER"
            ? 0
          : isAxisState() &&
              !(
                m.state === STATE.TIME_CALIBRATION &&
                m.pendingAxisMode === "NEW_USER"
              )
            ? 1
            : 0;
      if (topologyToAxis > 0) {
        const g = axisMetrics();
        const axisY = lerp(g.axisTop, g.axisBottom, i / (MANSION_COORDINATES.length - 1));
        manifestedX = lerp(manifestedX, g.axisX, topologyToAxis);
        manifestedY = lerp(manifestedY, axisY, topologyToAxis);
        perspective = lerp(perspective, 0.72, topologyToAxis);
      }

      return {
        x: manifestedX,
        y: manifestedY,
        conv: activeMansion ? conv : 1,
        p: perspective,
      };
    }

    function isPointNearSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
      const dx = bx - ax;
      const dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      if (lenSq <= 0.0001) return Math.hypot(px - ax, py - ay);
      const t = clamp(((px - ax) * dx + (py - ay) * dy) / lenSq, 0, 1);
      return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
    }

    function isLifeMapHit(x: number, y: number) {
      const pos = MANSION_COORDINATES.map((_, i) => nodePos(i));
      const activeMansions = activeLifeBeastMansionIndices();
      if (activeMansions.length === 0) {
        const coreFrame = resolveLifeUniverseCoreFrame(
          m.w,
          m.h,
          performance.now() / 1000,
        );
        const orbitRadiusX = Math.min(m.w * 0.48, 188);
        const orbitRadiusY = Math.max(118, Math.min(m.h * 0.2, 168));
        const orbitHit =
          ((x - coreFrame.x) * (x - coreFrame.x)) / (orbitRadiusX * orbitRadiusX) +
          ((y - coreFrame.y) * (y - coreFrame.y)) / (orbitRadiusY * orbitRadiusY) <= 1;
        const ctaHit =
          Math.abs(x - m.w / 2) <= Math.min(170, m.w * 0.42) &&
          Math.abs(y - m.h * 0.82) <= Math.min(92, m.h * 0.12);
        return orbitHit || ctaHit;
      }
      const nodeHit = activeMansions.some((mansionIndex) => {
        const point = pos[mansionIndex]!;
        return Math.hypot(x - point.x, y - point.y) <= Math.max(22, point.p * 28);
      });
      if (nodeHit) return true;
      const edgeHit = activeMansions.slice(0, -1).some((mansionIndex, index) => {
        const pa = pos[mansionIndex]!;
        const pb = pos[activeMansions[index + 1]!]!;
        return isPointNearSegment(x, y, pa.x, pa.y, pb.x, pb.y) <= 18;
      });
      if (edgeHit) return true;

      const activePoints = activeMansions.map((mansionIndex) => pos[mansionIndex]!);
      const minX = Math.min(...activePoints.map((p) => p.x));
      const maxX = Math.max(...activePoints.map((p) => p.x));
      const minY = Math.min(...activePoints.map((p) => p.y));
      const maxY = Math.max(...activePoints.map((p) => p.y));
      const padX = Math.max(92, m.w * 0.18);
      const padY = Math.max(106, m.h * 0.15);
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const rx = Math.max((maxX - minX) / 2 + padX, m.w * 0.3);
      const ry = Math.max((maxY - minY) / 2 + padY, m.h * 0.28);
      const ellipticalHit = ((x - cx) * (x - cx)) / (rx * rx) + ((y - cy) * (y - cy)) / (ry * ry) <= 1;
      if (ellipticalHit) return true;

      const ctaY = m.h * 0.82;
      const ctaHit =
        Math.abs(x - m.w / 2) <= Math.min(170, m.w * 0.42) &&
        Math.abs(y - ctaY) <= Math.min(76, m.h * 0.095);
      if (ctaHit) return true;

      return x >= minX - padX && x <= maxX + padX && y >= minY - padY && y <= maxY + padY;
    }

    function step(dt: number) {
      m.t += dt;
      if (
        m.pendingAxisMode === "NEW_USER" &&
        (m.state === STATE.TIME_CALIBRATION ||
          m.state === STATE.DISPLAY_LOCK)
      ) {
        const phaseEase = 1 - Math.exp(-dt * 0.82);
        m.lunarDayVisual +=
          (m.lunarDayTarget - m.lunarDayVisual) * phaseEase;
      }
      if (m.state === STATE.STARFIELD_IDLE && m.moonReleaseStarted) {
        m.moonReleaseT += dt;
      }
      if (m.node1State?.mirrorActivated) {
        m.node1T += dt;
      }
      if (m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY) {
        m.afterForm += dt;
      }
      if (m.entryCardFlipT < 1) {
        const prev = m.entryCardFlipT;
        m.entryCardFlipT = Math.min(1, m.entryCardFlipT + dt * 2.6);
        if (prev < 0.5 && m.entryCardFlipT >= 0.5) m.entryCardSide = m.entryCardFlipTo;
      }
      if (m.pressureSeedGroupPulse > 0) {
        m.pressureSeedGroupPulse = Math.max(0, m.pressureSeedGroupPulse - dt * 3.4);
      }
      if (m.originLockPulse > 0) {
        m.originLockPulse = Math.max(0, m.originLockPulse - dt * 1.5);
      }
      if (m.motherCardFlipPulse > 0) {
        m.motherCardFlipPulse = Math.max(0, m.motherCardFlipPulse - dt * 5.2);
      }
      switch (m.state) {
        case STATE.STARFIELD_IDLE: {
          if (!m.pulsed && m.t > 0.16) {
            m.pulsed = true;
            vibrate([0, 12, 60]);
          }
          if (m.moonReleaseStarted && m.moonReleaseT >= CFG.moonReleaseSeconds) {
            if (!returningLifeIdentity) {
              enterTimeInjectionFromMoon();
            }
          }
          break;
        }
        case STATE.ASSEMBLY: {
          if (m.t >= CFG.convergeMs) {
            m.state = STATE.FORMATION;
            m.t = 0;
            if (!m.formed) {
              m.formed = true;
              audio.form();
              vibrate([0, 22, 40]);
            }
          }
          break;
        }
        case STATE.FORMATION: {
          if (m.t >= 1.4) {
            m.state = STATE.APPROACH;
            m.t = 0;
          }
          break;
        }
        case STATE.APPROACH: {
          if (m.t >= 2.8) {
            m.state = STATE.READY;
            m.t = 0;
            m.presentDone = true;
          }
          break;
        }
        case STATE.READY: {
          break;
        }
        case STATE.STARBEAST_SANDIFY: {
          if (m.t >= 1.18) {
            syncDialToCurrent();
            m.state = STATE.TIME_CALIBRATION;
            m.t = 0;
            m.dwellT = 0;
          }
          break;
        }
        case STATE.AXIS_EMERGENCE: {
          if (m.t >= 1.35) {
            syncDialToCurrent();
            m.state = STATE.TIME_CALIBRATION;
            m.t = 0;
            m.dwellT = 0;
          }
          break;
        }
        case STATE.TIME_CALIBRATION: {
          if (!m.dragging && m.railProgress > 0) m.railProgress += (0 - m.railProgress) * Math.min(1, dt * 12);
          if (!m.dragging) m.clutched = false;
          break;
        }
        case STATE.GEO_BIND:
          break;
        case STATE.DISPLAY_LOCK: {
          break;
        }
        case STATE.ENTRY_PRE_COLLAPSE: {
          if (m.t >= 0.55) {
            m.state = STATE.ENTRY_LIGHT_CONVERGENCE;
            m.t = 0;
            audio.form();
            vibrate([0, 12, 18]);
          }
          break;
        }
        case STATE.ENTRY_LIGHT_CONVERGENCE: {
          if (m.t >= 1.05) {
            if (!m.entryTransitionSnapshot) {
              m.entryTransitionSnapshot = buildEntryTransitionSnapshot();
            }
            m.state = STATE.ENTRY_STATIC_RENDER;
            m.t = 0;
          }
          break;
        }
        case STATE.PRESSURE_SEED_AXIS: {
          break;
        }
        case STATE.ENTRY_STATIC_RENDER: {
          break;
        }
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      const now = performance.now() / 1000;
      const lifeUniverseGravity = m.lifeSourceSession === null
        ? 0
        : m.state === STATE.ENTRY_PRE_COLLAPSE
          ? 0.12 + smooth(0, 0.55, m.t) * 0.12
          : m.state === STATE.ENTRY_LIGHT_CONVERGENCE
            ? 0.24 + smooth(0, 1.05, m.t) * 0.14
            : 0.22;
      drawLifeUniverseDeepSpace2D(
        ctx,
        m.w,
        m.h,
        now,
        1,
        lifeUniverseGravity,
      );
      const currentScene = sceneRef.current;
      const entryVisualCopyActive = currentScene === "ENTRY";
      const entryState = toStarbeastEntryState(m.state);
      const starbeastState = resolveStarbeastRenderState(entryState);
      const convergenceActive = isConvergenceState();
      const entryStaticActive = isEntryStaticState();
      const axisActive = m.state === STATE.STARBEAST_SANDIFY || isAxisState() || convergenceActive;
      const nodeRuntimeActive = Boolean(m.node1State?.mirrorActivated) && (currentScene === "NODE_1" || currentScene === "NODE_2");
      const enter = m.state === STATE.STARBEAST_SANDIFY
        ? smooth(0.08, 1.1, m.t)
        : isAxisState() || convergenceActive || entryStaticActive
          ? 1
          : 0;
      const entryCelestialState =
        m.state === STATE.ASSEMBLY ||
        m.state === STATE.FORMATION ||
        m.state === STATE.APPROACH ||
        m.state === STATE.READY;
      const originIdentityLocked =
        m.lifeSourceSession !== null &&
        m.lifeBeastMansionIndex !== null &&
        m.lifeBeastGroupStart !== null;
      const originPresenceArrivalActive =
        originIdentityLocked &&
        m.pendingAxisMode === "NEW_USER" &&
        m.state === STATE.DISPLAY_LOCK;
      const sectorReveal = m.state === STATE.ASSEMBLY
        ? smooth(0.08, 1.05, m.t)
        : entryCelestialState
          ? 1
          : 0;
      const luminaryReveal = m.state === STATE.ASSEMBLY
        ? smooth(0.42, 1.58, m.t)
        : entryCelestialState
          ? 1
          : 0;
      const alignmentProgress = !originIdentityLocked
        ? 0
        : m.state === STATE.FORMATION
        ? smooth(0.04, 0.66, m.t)
        : m.state === STATE.APPROACH || m.state === STATE.READY
          ? 1
          : 0;
      const aggregationProgress = !originIdentityLocked
        ? 0
        : m.state === STATE.FORMATION
        ? smooth(0.58, 1.34, m.t)
        : m.state === STATE.APPROACH || m.state === STATE.READY
          ? 1
          : 0;
      const lifeFormationProgress = !originIdentityLocked
        ? 0
        : m.state === STATE.APPROACH
        ? smooth(0.34, 2.48, m.t)
        : m.state === STATE.READY
          ? 1
          : 0;

      // The identity core is deliberately absent from the Moon entrance. In
      // time calibration the neutral carrier is drawn separately at the same
      // anchor; identity only appears after time establishes the coordinate.
      const dedicatedCoreActive =
        (m.state === STATE.TIME_CALIBRATION || m.state === STATE.DISPLAY_LOCK) &&
        m.pendingAxisMode === "NEW_USER";
      if (m.state !== STATE.STARFIELD_IDLE && !dedicatedCoreActive) {
        const persistentCoreAlpha = !originIdentityLocked
          ? 0.026 + smooth(0.04, 1.8, m.t) * 0.014
          : m.state === STATE.ASSEMBLY
            ? 0.038
            : m.state === STATE.FORMATION
              ? 0.045 + alignmentProgress * 0.025
              : m.state === STATE.APPROACH
                ? 0.075 + lifeFormationProgress * 0.265
                : m.state === STATE.READY
                  ? 0.34
                  : 0.72;
        drawLifeUniverseCore2D(
          ctx,
          m.w,
          m.h,
          now,
          persistentCoreAlpha,
          !originIdentityLocked
            ? 0.34
            : entryCelestialState
              ? 0.36 + lifeFormationProgress * 0.46
              : 1,
        );
      }

      if (m.state === STATE.STARFIELD_IDLE) {
        const moonReleaseProgress = smooth(0, CFG.moonReleaseSeconds, m.moonReleaseT);
        const cosmicOrderPresence =
          smooth(0.3, 1.9, m.t) *
          (1 - smooth(0.04, 0.74, m.moonReleaseT));
        if (cosmicOrderPresence > 0.001) {
          ctx.save();
          ctx.globalCompositeOperation = "screen";

          // A distant directional wash suggests the movement of heaven
          // without introducing a second celestial body or identity light.
          const heavenGlow = ctx.createRadialGradient(
            m.w * 0.84,
            m.h * 0.14,
            0,
            m.w * 0.84,
            m.h * 0.14,
            Math.max(m.w, m.h) * 0.34,
          );
          heavenGlow.addColorStop(
            0,
            `rgba(179,198,226,${(cosmicOrderPresence * 0.052).toFixed(3)})`,
          );
          heavenGlow.addColorStop(
            0.34,
            `rgba(124,151,191,${(cosmicOrderPresence * 0.022).toFixed(3)})`,
          );
          heavenGlow.addColorStop(1, "rgba(72,94,134,0)");
          ctx.fillStyle = heavenGlow;
          ctx.fillRect(0, 0, m.w, m.h);

          // Long, incomplete traces establish celestial time. Their slow dash
          // drift is perceived as order, not as an orbit around the life core.
          ctx.lineCap = "round";
          for (let traceIndex = 0; traceIndex < 3; traceIndex += 1) {
            ctx.strokeStyle = `rgba(146,169,207,${(
              cosmicOrderPresence * (0.11 - traceIndex * 0.035)
            ).toFixed(3)})`;
            ctx.lineWidth = 0.68 + traceIndex * 0.06;
            ctx.setLineDash([
              7.5 - traceIndex * 1.2,
              29 + traceIndex * 4,
            ]);
            ctx.lineDashOffset =
              -now * (1.25 + traceIndex * 0.18) -
              traceIndex * 7;
            const traceStart = {
              x: m.w * (0.98 + traceIndex * 0.035),
              y: m.h * (0.11 + traceIndex * 0.055),
            };
            const traceControlA = {
              x: m.w * (0.77 - traceIndex * 0.035),
              y: m.h * (0.2 + traceIndex * 0.04),
            };
            const traceControlB = {
              x: m.w * (0.43 - traceIndex * 0.025),
              y: m.h * (0.47 + traceIndex * 0.035),
            };
            const traceEnd = {
              x: m.w * (-0.04 - traceIndex * 0.035),
              y: m.h * (0.59 + traceIndex * 0.055),
            };
            ctx.beginPath();
            ctx.moveTo(traceStart.x, traceStart.y);
            ctx.bezierCurveTo(
              traceControlA.x,
              traceControlA.y,
              traceControlB.x,
              traceControlB.y,
              traceEnd.x,
              traceEnd.y,
            );
            ctx.stroke();

            const timeFlow =
              (now * (0.012 + traceIndex * 0.0015) +
                traceIndex * 0.29) %
              1;
            const inverseFlow = 1 - timeFlow;
            const timeX =
              inverseFlow * inverseFlow * inverseFlow * traceStart.x +
              3 *
                inverseFlow *
                inverseFlow *
                timeFlow *
                traceControlA.x +
              3 *
                inverseFlow *
                timeFlow *
                timeFlow *
                traceControlB.x +
              timeFlow * timeFlow * timeFlow * traceEnd.x;
            const timeY =
              inverseFlow * inverseFlow * inverseFlow * traceStart.y +
              3 *
                inverseFlow *
                inverseFlow *
                timeFlow *
                traceControlA.y +
              3 *
                inverseFlow *
                timeFlow *
                timeFlow *
                traceControlB.y +
              timeFlow * timeFlow * timeFlow * traceEnd.y;
            ctx.fillStyle = `rgba(190,208,232,${(
              cosmicOrderPresence * (0.16 - traceIndex * 0.035)
            ).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(
              timeX,
              timeY,
              0.72 - traceIndex * 0.08,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.setLineDash([]);
          ctx.restore();
        }
        const firstFrameMansions = MANSION_COORDINATES.map((_, mansionIndex) =>
          nodePos(mansionIndex),
        );
        ctx.save();
        ctx.lineCap = "round";
        for (let mansionGroup = 0; mansionGroup < 4; mansionGroup += 1) {
          const groupStart = mansionGroup * 7;
          ctx.strokeStyle = `rgba(171,192,222,${(
            0.026 + mansionGroup * 0.004
          ).toFixed(3)})`;
          ctx.lineWidth = 0.54;
          ctx.beginPath();
          for (let groupIndex = 0; groupIndex < 7; groupIndex += 1) {
            const point = firstFrameMansions[groupStart + groupIndex]!;
            if (groupIndex === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
          ctx.stroke();

          const groupFlow =
            (now * (0.045 + mansionGroup * 0.004) +
              mansionGroup * 0.21) %
            1;
          const segmentPosition = groupFlow * 6;
          const segmentIndex = Math.min(5, Math.floor(segmentPosition));
          const segmentProgress = segmentPosition - segmentIndex;
          const segmentStart =
            firstFrameMansions[groupStart + segmentIndex]!;
          const segmentEnd =
            firstFrameMansions[groupStart + segmentIndex + 1]!;
          ctx.fillStyle = "rgba(220,230,242,0.34)";
          ctx.shadowColor = "rgba(185,203,236,0.32)";
          ctx.shadowBlur = 7;
          ctx.beginPath();
          ctx.arc(
            lerp(segmentStart.x, segmentEnd.x, segmentProgress),
            lerp(segmentStart.y, segmentEnd.y, segmentProgress),
            0.92,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.restore();
        MANSION_COORDINATES.forEach((_, mansionIndex) => {
          const point = firstFrameMansions[mansionIndex]!;
          const mansionGroup = Math.floor(mansionIndex / 7);
          const mansionSlot = mansionIndex % 7;
          const groupFlow =
            (now * (0.045 + mansionGroup * 0.004) +
              mansionGroup * 0.21) %
            1;
          const slotProgress = mansionSlot / 6;
          const orderedDistance = Math.abs(slotProgress - groupFlow);
          const orderedPulse = Math.exp(
            -Math.pow(orderedDistance / 0.17, 2),
          );
          const groupBreath =
            0.82 +
            Math.sin(now * 0.28 + mansionGroup * 0.78) * 0.075;
          const pulse = groupBreath + orderedPulse * 0.22;
          const mansionDepth = clamp((point.p - 0.32) / 0.36, 0, 1);
          const releaseLight = Math.sin(Math.PI * moonReleaseProgress) * 0.32;
          const pointAlpha =
            (0.14 + mansionDepth * 0.38) * pulse + releaseLight;
          ctx.fillStyle = `rgba(205,216,233,${pointAlpha.toFixed(3)})`;
          ctx.shadowColor = `rgba(205,216,233,${(0.1 + mansionDepth * 0.24 + releaseLight * 0.5).toFixed(3)})`;
          ctx.shadowBlur = mansionDepth * 5 + releaseLight * 8;
          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            0.72 + mansionDepth * 1.2 + releaseLight * 1.8,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        });
        ctx.shadowBlur = 0;

        if (returningLifeIdentity) {
          drawLifeUniverseCore2D(
            ctx,
            m.w,
            m.h,
            now,
            smooth(0.72, 1.65, m.t) *
              (1 - smooth(0.04, 0.74, m.moonReleaseT)),
          );
        } else {
          drawTaiyinMoonEntrance(
            ctx,
            m.w,
            m.h,
            now,
            smooth(0.72, 1.65, m.t),
            moonReleaseProgress,
          );
          if (m.moonReleaseStarted) {
            drawTimeReceivingLifeCore(
              ctx,
              m.w,
              m.h,
              now,
              smooth(0.12, 0.58, m.moonReleaseT),
              m.lunarDayVisual,
              0,
            );
          }
        }

        const topLineStarts = [1.7, 2.05];
        const topGather = 0.82;
        m.textStars.forEach((s, i) => {
          if (s.line > 1) return;
          const t0 = topLineStarts[s.line]!;
          const stagger = ((i % 19) / 19) * 0.35;
          const e = smooth(t0 + stagger, t0 + topGather + stagger, m.t);
          if (e <= 0.001) return;
          const x = lerp(s.ox, s.tx, e);
          const y = lerp(s.oy, s.ty, e);
          const tw = 0.65 + 0.35 * Math.sin(now * s.sp + s.ph);
          const solid = smooth(t0 + topGather - 0.1, t0 + topGather + 0.65, m.t);
          const a = e * 0.85 * tw * (1 - solid * 0.55);
          ctx.fillStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.cream, e)},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        });

        if (entryVisualCopyActive) {
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const mainSize = Math.min(18, m.w * 0.046);
          const worldSize = Math.min(14, m.w * 0.036);
          const titleAlpha = smooth(2.2, 2.95, m.t);
          if (titleAlpha > 0.001) {
            ctx.fillStyle = `rgba(255,247,228,${(titleAlpha * 0.46).toFixed(3)})`;
            ctx.font = `580 ${worldSize}px ${SANS}`;
            ctx.fillText(TOP_LINES[0], m.w / 2, m.h * 0.16);
            ctx.fillText(TOP_LINES[1], m.w / 2, m.h * 0.205);
          }
          const relationCopyAlpha =
            smooth(3.15, 3.9, m.t) *
            (1 - smooth(0, 0.38, m.moonReleaseT));
          if (relationCopyAlpha > 0.001) {
            ctx.fillStyle = `rgba(255,247,228,${(relationCopyAlpha * 0.92).toFixed(3)})`;
            ctx.font = `650 ${mainSize}px ${SANS}`;
            ctx.fillText(
              returningLifeIdentity ? "你的生命仍在这里，" : CTA_LINES[0],
              m.w / 2,
              m.h * 0.78,
            );
            ctx.fillText(
              returningLifeIdentity ? "等你继续同行。" : CTA_LINES[1],
              m.w / 2,
              m.h * 0.825,
            );
          }

          const actionCopyAlpha =
            smooth(4.2, 4.85, m.t) *
            (1 - smooth(0, 0.38, m.moonReleaseT));
          if (actionCopyAlpha > 0.001) {
            ctx.fillStyle = `rgba(255,247,228,${(actionCopyAlpha * 0.82).toFixed(3)})`;
            ctx.font = `620 ${Math.min(13, m.w * 0.033)}px ${SANS}`;
            ctx.fillText(
              returningLifeIdentity
                ? "轻触星河，回到我的生命世界"
                : ENTRY_ACTION_LINE,
              m.w / 2,
              m.h * 0.89,
            );

            ctx.fillStyle = `rgba(232,200,138,${(actionCopyAlpha * 0.42).toFixed(3)})`;
            ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
            ctx.fillText("星脉之境 · XINMAI", m.w / 2, m.h * 0.94);
          }

          if (!returningLifeIdentity && m.moonReleaseStarted) {
            const transitionAlpha =
              smooth(0.38, 0.82, m.moonReleaseT) *
              (1 - smooth(1.38, CFG.moonReleaseSeconds, m.moonReleaseT));
            if (transitionAlpha > 0.001) {
              ctx.fillStyle = `rgba(255,247,228,${(transitionAlpha * 0.74).toFixed(3)})`;
              ctx.font = `580 ${Math.min(14, m.w * 0.036)}px ${SANS}`;
              ctx.fillText(
                ENTRY_TRANSITION_LINE,
                m.w / 2,
                m.h * 0.825,
              );
            }
          }
          ctx.restore();
        }
        return;
      }

      // All four time phases have entered the same light. Before navigation,
      // let the existing 28-mansion field answer that light so Genesis receives
      // an already-living universe instead of starting a second star scene.
      // The birth mansion is only recognized inside this field: no new point,
      // animal silhouette or coordinate scaffold is introduced here.
      if (
        m.state === STATE.DISPLAY_LOCK &&
        m.pendingAxisMode === "NEW_USER"
      ) {
        const handoffCore = resolveLifeUniverseCoreFrame(m.w, m.h, now);
        const receive = smooth(0, 0.72, m.t);
        const settle = smooth(0.58, CFG.firstPresenceSeconds, m.t);
        drawTimeReceivingLifeCore(
          ctx,
          m.w,
          m.h,
          now,
          0.96 + receive * 0.04,
          m.lunarDayVisual,
          1 - settle,
        );

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        for (let phaseIndex = 0; phaseIndex < 4; phaseIndex += 1) {
          const phaseDelay = phaseIndex * 0.075;
          const phaseProgress = smooth(
            phaseDelay,
            0.7 + phaseDelay,
            m.t,
          );
          const startX =
            handoffCore.x +
            (phaseIndex - 1.5) * Math.min(31, m.w * 0.082);
          const startY =
            handoffCore.y -
            Math.min(92, m.h * 0.13) -
            Math.abs(phaseIndex - 1.5) * 7;
          const particleX = lerp(startX, handoffCore.x, phaseProgress);
          const particleY = lerp(startY, handoffCore.y, phaseProgress);
          const particleAlpha =
            (1 - smooth(0.84, 1, phaseProgress)) *
            (0.18 + phaseIndex * 0.045);
          ctx.fillStyle = `rgba(222,231,241,${particleAlpha.toFixed(3)})`;
          ctx.shadowColor = `rgba(222,231,241,${(particleAlpha * 0.72).toFixed(3)})`;
          ctx.shadowBlur = 6 + phaseProgress * 9;
          ctx.beginPath();
          ctx.arc(
            particleX,
            particleY,
            0.9 + phaseProgress * 0.85,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        const birthMansionIndex = m.lifeBeastMansionIndex;
        const birthRecognition = smooth(1.14, 1.92, m.t);
        ctx.save();
        MANSION_COORDINATES.forEach((_, mansionIndex) => {
          const mansionGroup = Math.floor(mansionIndex / 7);
          const mansionSlot = mansionIndex % 7;
          const responseDelay = mansionGroup * 0.045 + mansionSlot * 0.026;
          const response = smooth(
            0.28 + responseDelay,
            1.14 + responseDelay,
            m.t,
          );
          if (response <= 0.001) return;

          const point = nodePos(mansionIndex);
          const isBirthMansion = mansionIndex === birthMansionIndex;
          const depthAlpha = 0.54 + point.p * 0.34;
          const pointAlpha = Math.min(
            0.74,
            response *
              depthAlpha *
              (isBirthMansion
                ? 0.42 + birthRecognition * 0.48
                : 0.4),
          );
          const pointRadius =
            0.84 +
            point.p * 0.62 +
            (isBirthMansion ? birthRecognition * 0.58 : 0);

          ctx.fillStyle = isBirthMansion
            ? `rgba(241,230,202,${pointAlpha.toFixed(3)})`
            : `rgba(213,225,241,${pointAlpha.toFixed(3)})`;
          ctx.shadowColor = isBirthMansion
            ? `rgba(232,207,153,${(pointAlpha * 0.48).toFixed(3)})`
            : `rgba(185,203,236,${(pointAlpha * 0.28).toFixed(3)})`;
          ctx.shadowBlur =
            2.5 + response * 3 + (isBirthMansion ? birthRecognition * 5 : 0);
          ctx.beginPath();
          ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        const responseAlpha =
          smooth(0.38, 0.62, m.t) *
          (1 - smooth(0.78, CFG.firstPresenceSeconds, m.t));
        if (responseAlpha > 0.001) {
          ctx.strokeStyle = `rgba(222,231,241,${(responseAlpha * 0.26).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(
            handoffCore.x,
            handoffCore.y,
            handoffCore.coreRadius * (1.5 + settle * 1.35),
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
        ctx.restore();
        return;
      }

      const pos = MANSION_COORDINATES.map((_, i) => nodePos(i));
      const activeMansions = activeLifeBeastMansionIndices();
      const activeMansionSet = new Set(activeMansions);
      const birthMansionIndex = m.lifeBeastMansionIndex;
      const activeSectorIndex = birthMansionIndex === null
        ? null
        : Math.floor(birthMansionIndex / 7);
      const topologyToAxis =
        m.state === STATE.STARBEAST_SANDIFY
          ? smooth(0.04, 1.1, m.t)
          : originPresenceArrivalActive
            ? 1
          : isAxisState()
            ? 1
            : 0;
      const nodeFade = nodeRuntimeActive ? 1 - smooth(0, 0.36, m.node1T) : 1;
      const structureAlpha = (originIdentityLocked ? (
        m.state === STATE.STARBEAST_SANDIFY
          ? 1 - smooth(0.64, 1.12, m.t)
          : isAxisState()
            ? 0
            : aggregationProgress
      ) : 0) * nodeFade;
      const celestialCoreFrame = resolveLifeUniverseCoreFrame(m.w, m.h, now);
      const orbitRadiusX = Math.min(m.w * 0.43, 168);
      const orbitRadiusY = Math.min(m.w * 0.19, 74);
      const orbitPhase = now * 0.025;

      // Four Symbols are four regions of the same coordinate shell. They stay
      // on the 28-mansion plane and are differentiated by flow cadence, never
      // by moving seven points toward a second foreground object.
      if (sectorReveal > 0.001 && topologyToAxis < 0.98) {
        const sectorRadiusX = orbitRadiusX * 0.89;
        const sectorRadiusY = orbitRadiusY * 0.84;
        ctx.save();
        ctx.lineCap = "round";
        for (let sectorIndex = 0; sectorIndex < 4; sectorIndex += 1) {
          const startAngle =
            -Math.PI / 2 + orbitPhase + sectorIndex * (Math.PI / 2);
          const endAngle = startAngle + Math.PI / 2;
          const activeSector =
            sectorIndex === activeSectorIndex && alignmentProgress > 0.001;
          const activeWarmth = activeSector ? aggregationProgress : 0;
          const sectorAlpha =
            sectorReveal *
            (activeSector
              ? 0.16 + alignmentProgress * 0.035 + activeWarmth * 0.07
              : 0.13);

          if (activeWarmth > 0.001) {
            ctx.setLineDash([]);
            ctx.strokeStyle = `rgba(216,197,142,${(activeWarmth * 0.035).toFixed(3)})`;
            ctx.lineWidth = 9;
            ctx.beginPath();
            ctx.ellipse(
              celestialCoreFrame.x,
              celestialCoreFrame.y,
              sectorRadiusX,
              sectorRadiusY,
              0,
              startAngle + 0.06,
              endAngle - 0.06,
            );
            ctx.stroke();
          }

          ctx.setLineDash([3 + sectorIndex * 0.8, 8 - sectorIndex * 0.55]);
          ctx.lineDashOffset = -now * (1.8 + sectorIndex * 0.48);
          ctx.strokeStyle = activeWarmth > 0.12
            ? `rgba(198,186,151,${sectorAlpha.toFixed(3)})`
            : `rgba(147,172,211,${sectorAlpha.toFixed(3)})`;
          ctx.lineWidth = activeSector ? 1.1 : 0.78;
          ctx.beginPath();
          ctx.ellipse(
            celestialCoreFrame.x,
            celestialCoreFrame.y,
            sectorRadiusX,
            sectorRadiusY,
            0,
            startAngle + 0.045,
            endAngle - 0.045,
          );
          ctx.stroke();

          ctx.setLineDash([]);
          ctx.strokeStyle = `rgba(147,172,211,${(sectorReveal * 0.14).toFixed(3)})`;
          ctx.lineWidth = 0.72;
          ctx.beginPath();
          ctx.moveTo(
            celestialCoreFrame.x + Math.cos(startAngle) * orbitRadiusX * 0.81,
            celestialCoreFrame.y + Math.sin(startAngle) * orbitRadiusY * 0.81,
          );
          ctx.lineTo(
            celestialCoreFrame.x + Math.cos(startAngle) * orbitRadiusX * 0.985,
            celestialCoreFrame.y + Math.sin(startAngle) * orbitRadiusY * 0.985,
          );
          ctx.stroke();

          const sectorMidAngle = (startAngle + endAngle) / 2;
          ctx.strokeStyle = activeWarmth > 0.12
            ? `rgba(216,197,142,${(sectorReveal * (0.16 + activeWarmth * 0.1)).toFixed(3)})`
            : `rgba(147,172,211,${(sectorReveal * 0.15).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(
            celestialCoreFrame.x + Math.cos(sectorMidAngle) * orbitRadiusX * 0.81,
            celestialCoreFrame.y + Math.sin(sectorMidAngle) * orbitRadiusY * 0.81,
          );
          ctx.lineTo(
            celestialCoreFrame.x + Math.cos(sectorMidAngle) * orbitRadiusX * 0.9,
            celestialCoreFrame.y + Math.sin(sectorMidAngle) * orbitRadiusY * 0.9,
          );
          ctx.stroke();

          const sectorFlow = (now * (0.028 + sectorIndex * 0.004) + sectorIndex * 0.19) % 1;
          const sectorFlowAngle = startAngle + sectorFlow * (Math.PI / 2);
          ctx.fillStyle = activeWarmth > 0.12
            ? `rgba(216,197,142,${(sectorReveal * 0.32).toFixed(3)})`
            : `rgba(147,172,211,${(sectorReveal * 0.25).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(
            celestialCoreFrame.x + Math.cos(sectorFlowAngle) * sectorRadiusX,
            celestialCoreFrame.y + Math.sin(sectorFlowAngle) * sectorRadiusY,
            activeSector ? 1.05 : 0.82,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Seven Luminaries are moving indicators, not seven life sources. One
      // pointer resolves into the real birth mansion; the other six continue
      // to traverse the same celestial clock.
      if (luminaryReveal > 0.001 && topologyToAxis < 0.98) {
        const luminaryCadences = [0.37, 0.31, 0.27, 0.23, 0.2, 0.17, 0.145];
        const luminaryLaneScale = 0.73;
        const selectedLuminary = birthMansionIndex === null
          ? null
          : birthMansionIndex % 7;
        const birthAngle =
          -Math.PI / 2 +
          orbitPhase +
          ((birthMansionIndex ?? 0) / MANSION_COORDINATES.length) * Math.PI * 2;
        ctx.save();
        ctx.setLineDash([1.5, 8]);
        ctx.lineDashOffset = -now * 1.4;
        ctx.strokeStyle = `rgba(185,203,236,${(luminaryReveal * 0.085).toFixed(3)})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(
          celestialCoreFrame.x,
          celestialCoreFrame.y,
          orbitRadiusX * luminaryLaneScale,
          orbitRadiusY * luminaryLaneScale,
          0,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
        ctx.setLineDash([]);
        luminaryCadences.forEach((cadence, luminaryIndex) => {
          const freeAngle =
            -Math.PI / 2 +
            orbitPhase +
            now * 0.052 +
            luminaryIndex * (Math.PI * 2 / 7) +
            Math.sin(now * cadence + luminaryIndex * 0.83) * 0.11;
          const selected = selectedLuminary !== null && luminaryIndex === selectedLuminary;
          const angle = selected
            ? lerpAngle(freeAngle, birthAngle, alignmentProgress)
            : freeAngle;
          const laneScale = selected
            ? lerp(luminaryLaneScale, 1, alignmentProgress)
            : luminaryLaneScale;
          const x = celestialCoreFrame.x + Math.cos(angle) * orbitRadiusX * laneScale;
          const y = celestialCoreFrame.y + Math.sin(angle) * orbitRadiusY * laneScale;
          const selectedWarmth = selected ? alignmentProgress : 0;
          const pointerAlpha =
            luminaryReveal * (selected ? 0.58 + alignmentProgress * 0.25 : 0.48);
          ctx.strokeStyle = selectedWarmth > 0.08
            ? `rgba(232,200,138,${(pointerAlpha * 0.52).toFixed(3)})`
            : `rgba(185,203,236,${(pointerAlpha * 0.42).toFixed(3)})`;
          ctx.lineWidth = selected ? 0.95 : 0.68;
          ctx.beginPath();
          ctx.ellipse(
            celestialCoreFrame.x,
            celestialCoreFrame.y,
            orbitRadiusX * laneScale,
            orbitRadiusY * laneScale,
            0,
            angle - (selected ? 0.12 : 0.075),
            angle,
          );
          ctx.stroke();

          const stemInnerScale = Math.max(0.1, laneScale - 0.032);
          const stemOuterScale = Math.min(1.02, laneScale + (selected ? 0.052 : 0.038));
          ctx.beginPath();
          ctx.moveTo(
            celestialCoreFrame.x + Math.cos(angle) * orbitRadiusX * stemInnerScale,
            celestialCoreFrame.y + Math.sin(angle) * orbitRadiusY * stemInnerScale,
          );
          ctx.lineTo(
            celestialCoreFrame.x + Math.cos(angle) * orbitRadiusX * stemOuterScale,
            celestialCoreFrame.y + Math.sin(angle) * orbitRadiusY * stemOuterScale,
          );
          ctx.stroke();

          if (selected && alignmentProgress > 0.02 && alignmentProgress < 0.98) {
            const targetX = celestialCoreFrame.x + Math.cos(birthAngle) * orbitRadiusX;
            const targetY = celestialCoreFrame.y + Math.sin(birthAngle) * orbitRadiusY;
            ctx.setLineDash([2, 5]);
            ctx.strokeStyle = `rgba(232,200,138,${(
              pointerAlpha * (1 - alignmentProgress) * 0.34
            ).toFixed(3)})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          ctx.fillStyle = selectedWarmth > 0.08
            ? `rgba(232,200,138,${pointerAlpha.toFixed(3)})`
            : `rgba(185,203,236,${pointerAlpha.toFixed(3)})`;
          ctx.shadowColor = selectedWarmth > 0.08
            ? "rgba(232,200,138,0.38)"
            : "rgba(185,203,236,0.18)";
          ctx.shadowBlur = selected ? 5 : 1.5;
          ctx.beginPath();
          ctx.arc(x, y, selected ? 1.95 : 1.15 + (luminaryIndex % 3) * 0.12, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // The complete 28-mansion orbit remains visible while the selected seven
      // become recognizable. During handoff the same path turns edge-on.
      if (topologyToAxis < 0.98) {
        const continuousTimeField =
          m.pendingAxisMode === "NEW_USER" &&
          m.state === STATE.TIME_CALIBRATION;
        if (continuousTimeField) {
          ctx.save();
          ctx.lineCap = "round";
          for (let mansionGroup = 0; mansionGroup < 4; mansionGroup += 1) {
            const groupStart = mansionGroup * 7;
            ctx.strokeStyle = `rgba(147,172,211,${(
              (0.06 + mansionGroup * 0.007) * nodeFade
            ).toFixed(3)})`;
            ctx.lineWidth = 0.66;
            ctx.beginPath();
            for (let groupIndex = 0; groupIndex < 7; groupIndex += 1) {
              const point = pos[groupStart + groupIndex]!;
              if (groupIndex === 0) ctx.moveTo(point.x, point.y);
              else ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();

            const groupFlow =
              (now * (0.045 + mansionGroup * 0.004) +
                mansionGroup * 0.21) %
              1;
            const segmentPosition = groupFlow * 6;
            const segmentIndex = Math.min(
              5,
              Math.floor(segmentPosition),
            );
            const segmentProgress = segmentPosition - segmentIndex;
            const segmentStart = pos[groupStart + segmentIndex]!;
            const segmentEnd = pos[groupStart + segmentIndex + 1]!;
            ctx.fillStyle = "rgba(220,230,242,0.32)";
            ctx.shadowColor = "rgba(185,203,236,0.3)";
            ctx.shadowBlur = 7;
            ctx.beginPath();
            ctx.arc(
              lerp(segmentStart.x, segmentEnd.x, segmentProgress),
              lerp(segmentStart.y, segmentEnd.y, segmentProgress),
              0.9,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.restore();
        } else {
          ctx.strokeStyle = `rgba(147,172,211,${(
            0.14 *
            (1 - topologyToAxis) *
            nodeFade
          ).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          pos.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          });
          ctx.closePath();
          ctx.stroke();
        }
      }

      // The active seven remain at their original mansion coordinates. Their
      // sequential links and inward current reveal a collective posture
      // without constructing a second animal-shaped constellation.
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(232,200,138,0.3)";
      ctx.shadowBlur = 5;
      if (structureAlpha > 0.001) {
        const activePoints = activeMansions.map((mansionIndex) => pos[mansionIndex]!);
        const sectorCentroid = activePoints.reduce(
          (centroid, point) => ({
            x: centroid.x + point.x / activePoints.length,
            y: centroid.y + point.y / activePoints.length,
          }),
          { x: 0, y: 0 },
        );
        const radialX = sectorCentroid.x - celestialCoreFrame.x;
        const radialY = sectorCentroid.y - celestialCoreFrame.y;
        const radialLength = Math.max(1, Math.hypot(radialX, radialY));
        const tangentX = -radialY / radialLength;
        const tangentY = radialX / radialLength;
        const quadrantFlowBias = [-11, 8, -6, 12][activeSectorIndex ?? 0] ?? 0;
        const forceFocus = {
          x:
            sectorCentroid.x +
            (radialX / radialLength) * 10 +
            tangentX * quadrantFlowBias,
          y:
            sectorCentroid.y +
            (radialY / radialLength) * 10 +
            tangentY * quadrantFlowBias,
        };
        activeMansions.slice(0, -1).forEach((mansionIndex, activeIndex) => {
          const pa = pos[mansionIndex]!;
          const pb = pos[activeMansions[activeIndex + 1]!]!;
          const localReveal = Math.min(pa.conv, pb.conv) * structureAlpha;
          if (localReveal < 0.04) return;
          ctx.strokeStyle = `rgba(232,200,138,${(0.18 + localReveal * 0.42).toFixed(3)})`;
          ctx.lineWidth = 0.8 + localReveal * 0.65;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        });
        const forceStart = activePoints[0]!;
        const forceEnd = activePoints[activePoints.length - 1]!;
        ctx.strokeStyle = `rgba(232,200,138,${(structureAlpha * 0.18).toFixed(3)})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(forceStart.x, forceStart.y);
        ctx.quadraticCurveTo(forceFocus.x, forceFocus.y, forceEnd.x, forceEnd.y);
        ctx.stroke();
        for (let forceIndex = 0; forceIndex < 4; forceIndex += 1) {
          const flow = (now * 0.1 + forceIndex / 4) % 1;
          const inverseFlow = 1 - flow;
          const flowX =
            inverseFlow * inverseFlow * forceStart.x +
            2 * inverseFlow * flow * forceFocus.x +
            flow * flow * forceEnd.x;
          const flowY =
            inverseFlow * inverseFlow * forceStart.y +
            2 * inverseFlow * flow * forceFocus.y +
            flow * flow * forceEnd.y;
          ctx.fillStyle = `rgba(232,200,138,${(structureAlpha * 0.26).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(flowX, flowY, 0.72, 0, Math.PI * 2);
          ctx.fill();
        }
        activePoints.forEach((point, activeIndex) => {
          const localReveal = point.conv * structureAlpha;
          if (localReveal < 0.08) return;
          ctx.strokeStyle = `rgba(232,200,138,${(localReveal * 0.115).toFixed(3)})`;
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(sectorCentroid.x, sectorCentroid.y);
          ctx.stroke();

          const flow = (now * 0.18 + activeIndex * 0.13) % 1;
          const flowX = lerp(point.x, sectorCentroid.x, flow);
          const flowY = lerp(point.y, sectorCentroid.y, flow);
          ctx.fillStyle = `rgba(232,200,138,${(localReveal * 0.24).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(flowX, flowY, 0.75, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      ctx.shadowBlur = 0;

      // All 28 points survive the entire transformation. Hierarchy comes from
      // real group membership and the birth mansion, never from random size.
      if (!originPresenceArrivalActive) {
        pos.forEach((p, i) => {
          const ch = m.chaos[i]!;
          const tw = 0.7 + 0.3 * Math.sin(now * (1 + ch.sp) + ch.ph);
          const active = activeMansionSet.has(i);
          const birth = i === birthMansionIndex;
          const activeReveal = active ? p.conv * structureAlpha : 0;
          const birthReveal = birth ? alignmentProgress : 0;
          const pointAlpha = birth
            ? 0.2 + birthReveal * 0.76
            : active
              ? 0.18 + activeReveal * 0.64
              : 0.18 + topologyToAxis * 0.12;
          const pointRadius = birth
            ? 1.2 + birthReveal * 3
            : active
              ? 1.2 + activeReveal * 1.6
              : 1.2;
          ctx.globalAlpha = clamp(pointAlpha * tw * nodeFade, 0, 1);
          ctx.fillStyle = birthReveal > 0.06
            ? "rgb(255,247,228)"
            : activeReveal > 0.04
              ? "rgb(232,200,138)"
              : "rgb(185,203,236)";
          ctx.shadowColor = birthReveal > 0.06
            ? "rgba(255,247,228,0.82)"
            : activeReveal > 0.04
              ? "rgba(232,200,138,0.62)"
              : "rgba(185,203,236,0.24)";
          ctx.shadowBlur = birthReveal > 0.06 ? 18 : activeReveal > 0.04 ? 8 : 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pointRadius * (0.78 + p.p * 0.34), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        });
      }

      // 成命：the selected mansion carries the gathered quadrant force into
      // the already-present latent core. The core brightens; it is never
      // replaced by a new object.
      if (
        lifeFormationProgress > 0.001 &&
        entryCelestialState &&
        birthMansionIndex !== null
      ) {
        const birthPoint = pos[birthMansionIndex]!;
        const lifeGradient = ctx.createLinearGradient(
          birthPoint.x,
          birthPoint.y,
          celestialCoreFrame.x,
          celestialCoreFrame.y,
        );
        lifeGradient.addColorStop(0, `rgba(255,247,228,${(lifeFormationProgress * 0.34).toFixed(3)})`);
        lifeGradient.addColorStop(1, `rgba(232,200,138,${(lifeFormationProgress * 0.16).toFixed(3)})`);
        ctx.strokeStyle = lifeGradient;
        ctx.lineWidth = 0.8 + lifeFormationProgress * 0.45;
        ctx.beginPath();
        ctx.moveTo(birthPoint.x, birthPoint.y);
        ctx.lineTo(celestialCoreFrame.x, celestialCoreFrame.y);
        ctx.stroke();
        for (let pulseIndex = 0; pulseIndex < 3; pulseIndex += 1) {
          const pulse = (now * 0.21 + pulseIndex / 3) % 1;
          ctx.fillStyle = `rgba(255,247,228,${(lifeFormationProgress * (0.22 + pulse * 0.14)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(
            lerp(birthPoint.x, celestialCoreFrame.x, pulse),
            lerp(birthPoint.y, celestialCoreFrame.y, pulse),
            0.75 + lifeFormationProgress * 0.45,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }

      // Confirmation does not create a second constellation. The same 28
      // coordinates fold back from the time axis into their mother-force
      // orbit, while the same birth coordinate remains tethered to the same
      // life core. Copy and controls stay out of this visual handoff frame.
      if (
        m.state === STATE.DISPLAY_LOCK &&
        m.pendingAxisMode === "NEW_USER" &&
        m.lifeSourceSession &&
        birthMansionIndex !== null
      ) {
        const motherCoreFrame = resolveLifeUniverseCoreFrame(m.w, m.h, now);
        const originIdentity = m.lifeSourceSession.originMotherResult;
        const fourSymbol = originIdentity.starbeast.fourSymbol;
        const direction = fourSymbol === "青龙"
          ? { x: 0.86, y: -0.28 }
          : fourSymbol === "朱雀"
            ? { x: 0.18, y: -0.92 }
            : fourSymbol === "白虎"
              ? { x: -0.9, y: 0.08 }
              : { x: 0.12, y: 0.94 };
        const directionLength = Math.max(0.001, Math.hypot(direction.x, direction.y));
        const directionX = direction.x / directionLength;
        const directionY = direction.y / directionLength;
        const tangentX = -directionY;
        const tangentY = directionX;
        const forceOrder = "乾兑离震巽坎艮坤";
        const forceSeed = Math.max(0, forceOrder.indexOf(originIdentity.mother.trigram));
        const identitySeed = birthMansionIndex * 0.37 + forceSeed * 0.61;
        const firstBreathStart = 0.62 + (forceSeed % 3) * 0.045;
        const firstBreathDuration = 2.72 + (forceSeed % 4) * 0.09;
        const firstBreathPhase = clamp((m.t - firstBreathStart) / firstBreathDuration, 0, 1);
        const inhaleRatio = 0.42 + (forceSeed % 3) * 0.035;
        const firstBreath = firstBreathPhase <= inhaleRatio
          ? smooth(0, inhaleRatio, firstBreathPhase)
          : 1 - smooth(inhaleRatio, 1, firstBreathPhase);
        const settledRhythm =
          smooth(3.45, 4.35, m.t) *
          Math.sin((now + identitySeed * 0.11) * Math.PI * 2 / (4.8 + forceSeed * 0.13)) *
          0.14;
        const breathMotion = firstBreath * 0.92 + settledRhythm;
        const fieldReveal = smooth(0.72, 2.35, m.t);
        const bodyReveal = smooth(1.95, 3.95, m.t);
        const skeletonReach = (0.88 + (forceSeed % 4) * 0.055) * Math.min(1, m.w / 355);
        ctx.save();

        // Direction is felt as a quiet spatial bias, never drawn as a Four-
        // Symbol badge, orbit or rotating diagram.
        ctx.save();
        ctx.translate(motherCoreFrame.x, motherCoreFrame.y);
        ctx.rotate(Math.atan2(directionY, directionX));
        ctx.scale(1.55 + breathMotion * 0.08, 0.62 + breathMotion * 0.035);
        const presenceFieldRadius = Math.min(104, m.w * 0.29) * fieldReveal;
        const presenceField = ctx.createRadialGradient(
          presenceFieldRadius * 0.12,
          0,
          0,
          presenceFieldRadius * 0.12,
          0,
          Math.max(1, presenceFieldRadius),
        );
        presenceField.addColorStop(0, `rgba(255,247,228,${(fieldReveal * 0.12).toFixed(3)})`);
        presenceField.addColorStop(0.42, `rgba(185,203,236,${(fieldReveal * 0.075).toFixed(3)})`);
        presenceField.addColorStop(1, "rgba(147,172,211,0)");
        ctx.fillStyle = presenceField;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(1, presenceFieldRadius), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const longitudinal = [0, 18, 33, 49, 26, 42, 58];
        const lateral = [0, -10, 7, -8, 17, 23, -19];
        const presencePoints = longitudinal.map((forward, pointIndex) => {
          const pointReveal = smooth(
            1.02 + pointIndex * 0.17,
            1.92 + pointIndex * 0.18,
            m.t,
          );
          const postureBias = 1 + breathMotion * (0.028 + pointIndex * 0.0035);
          const forwardDistance = forward * skeletonReach * postureBias;
          const lateralDistance = lateral[pointIndex]! * skeletonReach * (0.82 + (forceSeed % 3) * 0.05);
          return {
            x: motherCoreFrame.x +
              (directionX * forwardDistance + tangentX * lateralDistance) * pointReveal,
            y: motherCoreFrame.y +
              (directionY * forwardDistance + tangentY * lateralDistance) * pointReveal,
            reveal: pointReveal,
          };
        });

        // Body matter grows out from the core and settles around the seven
        // bones. It trembles with breath but never follows a circular path.
        for (let bodyIndex = 0; bodyIndex < 35; bodyIndex += 1) {
          const bone = presencePoints[bodyIndex % presencePoints.length]!;
          const settle = smooth(
            1.9 + (bodyIndex % 7) * 0.09,
            3.45 + (bodyIndex % 5) * 0.075,
            m.t,
          );
          const spread = 3.5 + (bodyIndex % 6) * 1.15;
          const offsetPhase = bodyIndex * 2.17 + identitySeed;
          const offsetX =
            (Math.cos(offsetPhase) * tangentX + Math.sin(offsetPhase * 0.63) * directionX * 0.42) *
            spread;
          const offsetY =
            (Math.cos(offsetPhase) * tangentY + Math.sin(offsetPhase * 0.63) * directionY * 0.42) *
            spread;
          const stillDrift = Math.sin(now * 0.29 + bodyIndex * 0.71) * 0.42 * bodyReveal;
          const x = lerp(motherCoreFrame.x, bone.x + offsetX, settle) + tangentX * stillDrift;
          const y = lerp(motherCoreFrame.y, bone.y + offsetY, settle) + tangentY * stillDrift;
          const alpha = bodyReveal * settle * (0.1 + (bodyIndex % 5) * 0.026);
          ctx.fillStyle = `rgba(185,203,236,${alpha.toFixed(3)})`;
          ctx.shadowColor = `rgba(185,203,236,${(alpha * 0.68).toFixed(3)})`;
          ctx.shadowBlur = 2.4 + breathMotion * 2.2;
          ctx.beginPath();
          ctx.arc(x, y, 0.58 + (bodyIndex % 4) * 0.19, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Skeleton is presence, not a line drawing. One slow conduction passes
        // through seven luminous joints and then stops; it does not loop.
        const conductionPosition = smooth(1.06, 3.12, m.t) * (presencePoints.length - 1);
        presencePoints.forEach((point, pointIndex) => {
          if (point.reveal <= 0.01) return;
          const conduction = Math.exp(-Math.abs(pointIndex - conductionPosition) * 1.35);
          const alpha = point.reveal * (0.22 + conduction * 0.54);
          ctx.fillStyle = `rgba(255,247,228,${alpha.toFixed(3)})`;
          ctx.shadowColor = `rgba(255,247,228,${(0.14 + conduction * 0.5).toFixed(3)})`;
          ctx.shadowBlur = 3 + conduction * 11;
          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            pointIndex === 0 ? 2.2 : 1.15 + conduction * 0.9,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        });
        ctx.shadowBlur = 0;

        // Counter the shared ambient breath during the opening hush, then let
        // this identity-specific first breath control the apparent scale.
        const desiredCoreScale = 0.86 + firstBreath * 0.16 + settledRhythm * 0.055;
        drawLifeUniverseCore2D(
          ctx,
          m.w,
          m.h,
          now,
          0.72 + firstBreath * 0.18,
          desiredCoreScale / Math.max(0.001, motherCoreFrame.breath),
        );
        ctx.restore();
        return;
      }

      if (nodeRuntimeActive) {
        const node1ElapsedMs = m.node1T * 1000;
        const progress = computeNodeTransitionProgress(node1ElapsedMs);
        const lerp = getNodeTransitionLerp(progress);
        const mirrorIn = smooth(0, 0.28, m.node1T);
        const centerX = m.w / 2;
        const centerY = m.h * 0.48;
        const splitHint = lerp.starfieldFragmentation;
        const directionalHint = lerp.directionalLightShift;

        ctx.fillStyle = `rgba(2,3,6,${(0.18 + mirrorIn * 0.34 + splitHint * 0.08).toFixed(3)})`;
        ctx.fillRect(0, 0, m.w, m.h);

        const glowX = centerX + directionalHint * m.w * 0.08;
        const glow = ctx.createRadialGradient(glowX, centerY, 0, glowX, centerY, Math.min(m.w, m.h) * (0.32 + splitHint * 0.04));
        glow.addColorStop(0, `rgba(255,247,228,${(0.12 + mirrorIn * 0.32).toFixed(3)})`);
        glow.addColorStop(0.45, `rgba(232,200,138,${(0.08 + mirrorIn * 0.18 + directionalHint * 0.08).toFixed(3)})`);
        glow.addColorStop(1, "rgba(232,200,138,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(glowX, centerY, Math.min(m.w, m.h) * (0.32 + splitHint * 0.04), 0, Math.PI * 2);
        ctx.fill();

        if (currentScene === "NODE_2") {
          const splitLineAlpha = Math.max(smooth(1.2, 1.45, m.node1T), 0.18) * lerp.starfieldFragmentation * 0.34;
          const splitOffset = Math.min(18, m.w * 0.04);
          ctx.strokeStyle = `rgba(232,200,138,${splitLineAlpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX - splitOffset, m.h * 0.36);
          ctx.lineTo(centerX - splitOffset * 1.8, m.h * 0.62);
          ctx.moveTo(centerX + splitOffset, m.h * 0.36);
          ctx.lineTo(centerX + splitOffset * 1.8, m.h * 0.62);
          ctx.stroke();
        }
        return;
      }

      if (axisActive) {
        const axisSeed =
          m.state === STATE.STARBEAST_SANDIFY
            ? smooth(0.42, 1.02, m.t)
            : m.state === STATE.AXIS_EMERGENCE
              ? smooth(0, 1.25, m.t)
              : 1;
        const axisGrow =
          m.state === STATE.STARBEAST_SANDIFY
            ? smooth(0.58, 1.12, m.t)
            : m.state === STATE.AXIS_EMERGENCE
            ? smooth(0.25, 1.25, m.t)
            : isAxisState() || convergenceActive
              ? 1
              : 0;
        const warmAxisRgb = "232,200,138";
        const starWhiteRgb = "255,247,228";
        const g = axisMetrics();
        const isGeoStage = m.state === STATE.GEO_BIND;
        const originMother = originIdentityLocked ? resolveOriginMotherCode() : null;
        const dim = activeDim();
        const geoDim = activeGeoDim();
        const isNewOriginAxis = m.pendingAxisMode === "NEW_USER" && (m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND);
        const isTimeReceivingStage = isNewOriginAxis && m.state === STATE.TIME_CALIBRATION;
        const coordinateAxisRgb = isNewOriginAxis ? "185,203,236" : warmAxisRgb;
        const coordinateTextRgb = isNewOriginAxis ? "205,216,233" : warmAxisRgb;
        const originStepIndex = isGeoStage ? CHRONO_DIMS.length : m.chronoStep;
        const lockPulse = smooth(0, 1, m.originLockPulse);
        const range = isGeoStage ? geoRange(geoDim) : dimRange(m.coords, dim);
        const dialFrac = range.max > range.min ? (m.dialFloat - range.min) / (range.max - range.min) : 0;
        m.precisionY = range.max > range.min ? Math.round((1 - clamp(dialFrac, 0, 1)) * 20) : 10;
        const railCursor = { x: lerp(g.railX0, g.railX1, m.railProgress), y: g.railY };
        const tuneCursor = tunePoint(m.precisionY);
        const originCoreFrame = resolveLifeUniverseCoreFrame(m.w, m.h, now);
        const originX = originCoreFrame.x;
        const originY = originCoreFrame.y;
        const originPulse = 0.72 + (originCoreFrame.breath - 1) * 1.5;
        const originEmission = Math.max(axisSeed, axisGrow) * originPulse;
        const guideCycle = (now * 0.34) % 1;
        const guideStage = guideCycle < 0.54 ? "y" : "x";
        const guideProgress = guideStage === "y"
          ? guideCycle / 0.54
          : (guideCycle - 0.54) / 0.46;
        const comet = (pos: number, head: number, width = 0.12) => {
          const d = Math.abs(pos - head);
          return Math.max(0, 1 - d / width);
        };
        ctx.save();
        ctx.globalAlpha = Math.min(1, originEmission);
        const originGlowRadius = Math.min(m.w, m.h) * (isTimeReceivingStage ? 0.28 : 0.22);
        const originGlow = ctx.createRadialGradient(originX, originY, 0, originX, originY, originGlowRadius);
        originGlow.addColorStop(0, `rgba(255,247,228,${isTimeReceivingStage ? "0.28" : "0.22"})`);
        originGlow.addColorStop(0.48, `rgba(${coordinateAxisRgb},${isTimeReceivingStage ? "0.11" : "0.08"})`);
        originGlow.addColorStop(1, `rgba(${coordinateAxisRgb},0)`);
        ctx.fillStyle = originGlow;
        ctx.beginPath();
        ctx.arc(originX, originY, originGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        if (isTimeReceivingStage) {
          const timeWheel = timeWheelMetrics();
          const timeIngressPoint = (
            progress: number,
            sourceColumn: number,
            laneJitter: number,
            depthLayer: number,
          ) => {
            const t = clamp(progress, 0, 1);
            const it = 1 - t;
            const sourceX =
              timeWheel.left +
              timeWheel.columnWidth * (sourceColumn + 0.5) +
              laneJitter * timeWheel.columnWidth * 0.34;
            const p0 = {
              x: sourceX,
              y: timeWheel.centerY - depthLayer * 4,
            };
            const p1 = {
              x: originX + (sourceX - originX) * 0.42,
              y: originY + m.h * (0.15 + depthLayer * 0.008),
            };
            const p2 = {
              x: originX + (sourceX - originX) * 0.1,
              y: originY + m.h * 0.045,
            };
            return {
              x:
                it * it * it * p0.x +
                3 * it * it * t * p1.x +
                3 * it * t * t * p2.x +
                t * t * t * originX,
              y:
                it * it * it * p0.y +
                3 * it * it * t * p1.y +
                3 * it * t * t * p2.y +
                t * t * t * originY,
            };
          };

          const intakeBottomY = timeWheel.top + timeWheel.height * 0.16;
          const intakeVeil = ctx.createLinearGradient(
            0,
            originY,
            0,
            intakeBottomY,
          );
          intakeVeil.addColorStop(0, `rgba(${starWhiteRgb},0.042)`);
          intakeVeil.addColorStop(0.18, `rgba(${starWhiteRgb},0.016)`);
          intakeVeil.addColorStop(0.62, `rgba(${coordinateAxisRgb},0.005)`);
          intakeVeil.addColorStop(1, `rgba(${coordinateAxisRgb},0)`);
          ctx.save();
          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = intakeVeil;
          ctx.beginPath();
          ctx.moveTo(originX - 4, originY);
          ctx.bezierCurveTo(
            originX - m.w * 0.025,
            originY + m.h * 0.045,
            timeWheel.left + timeWheel.width * 0.22,
            intakeBottomY - m.h * 0.055,
            timeWheel.left + timeWheel.width * 0.08,
            intakeBottomY,
          );
          ctx.lineTo(timeWheel.left + timeWheel.width * 0.92, intakeBottomY);
          ctx.bezierCurveTo(
            timeWheel.left + timeWheel.width * 0.78,
            intakeBottomY - m.h * 0.055,
            originX + m.w * 0.025,
            originY + m.h * 0.045,
            originX + 4,
            originY,
          );
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          // The four familiar time wheels feed one existing light. Sparse
          // particles rise from the selected values and disappear into the
          // core; no axis, beam or second source is introduced.
          for (let flowIndex = 0; flowIndex < 36; flowIndex += 1) {
            const depthLayer = flowIndex % 3;
            const sourceColumn = flowIndex % CHRONO_DIMS.length;
            const laneSeed = ((flowIndex * 17) % 29) / 28 - 0.5;
            const speed = 0.014 + depthLayer * 0.005;
            const flow =
              (now * speed + flowIndex / 36 + m.chronoStep * 0.025) % 1;
            const easedFlow = flow * flow * (3 - 2 * flow);
            const point = timeIngressPoint(
              easedFlow,
              sourceColumn,
              laneSeed,
              depthLayer,
            );
            const intakeFade =
              smooth(0.02, 0.16, flow) *
              (1 - smooth(0.78, 1, flow));
            const coreProximity = smooth(0.42, 0.96, flow);
            const alpha =
              intakeFade *
              (0.16 + depthLayer * 0.115 + coreProximity * 0.42);
            const radius =
              (0.55 + depthLayer * 0.42) *
              (0.84 + coreProximity * 0.78);
            ctx.fillStyle = `rgba(${depthLayer === 2 ? starWhiteRgb : coordinateAxisRgb},${alpha.toFixed(3)})`;
            ctx.shadowColor = `rgba(${coordinateAxisRgb},${(
              0.08 +
              depthLayer * 0.08 +
              coreProximity * 0.34
            ).toFixed(3)})`;
            ctx.shadowBlur = 2 + depthLayer * 2.8 + coreProximity * 8.5;
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0;

          drawTimeReceivingLifeCore(
            ctx,
            m.w,
            m.h,
            now,
            0.96 + lockPulse * 0.04,
            m.lunarDayVisual,
          );
          if (lockPulse > 0.02) {
            const responseProgress = 1 - lockPulse;
            ctx.strokeStyle = `rgba(${starWhiteRgb},${(
              lockPulse * 0.32
            ).toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(
              originX,
              originY,
              originCoreFrame.coreRadius *
                (1.35 + responseProgress * 1.9),
              0,
              Math.PI * 2,
            );
            ctx.stroke();
          }
        } else {
          ctx.strokeStyle = `rgba(${coordinateAxisRgb},${(0.08 + originEmission * 0.24).toFixed(3)})`;
          ctx.lineWidth = 1;
          [0, 1, 2, 3].forEach((col) => {
            const target = railPoint(col);
            const headX = lerp(originX, target.x, axisGrow);
            const headY = lerp(originY, target.y, axisGrow);
            ctx.beginPath();
            ctx.moveTo(originX, originY);
            ctx.lineTo(headX, headY);
            ctx.stroke();
          });
          [2, 8, 14, 20].forEach((row) => {
            const target = tunePoint(row);
            const headX = lerp(originX, target.x, axisGrow);
            const headY = lerp(originY, target.y, axisGrow);
            ctx.beginPath();
            ctx.moveTo(originX, originY);
            ctx.lineTo(headX, headY);
            ctx.stroke();
          });
          ctx.globalAlpha = axisSeed;
          pos.forEach((p, i) => {
            const residueTarget = i % 2 === 0
              ? railPoint(i % g.cols)
              : tunePoint(i % 21);
            const settle = smooth(0.1 + (i / pos.length) * 0.45, 1.0, axisSeed);
            const x = lerp(p.x, residueTarget.x, settle);
            const y = lerp(p.y, residueTarget.y, settle);
            ctx.fillStyle = `rgba(${coordinateAxisRgb},${(0.18 + axisSeed * 0.38).toFixed(3)})`;
            ctx.shadowColor = `rgba(${coordinateAxisRgb},0.32)`;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(x, y, i % 9 === 0 ? 2.2 : 1.25, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.shadowBlur = 0;
          ctx.globalAlpha = axisGrow;
          ctx.strokeStyle = `rgba(${coordinateAxisRgb},${0.18 + axisGrow * 0.58})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(g.railX0, g.railY);
          ctx.lineTo(g.railX1, g.railY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(g.axisX, g.axisTop);
          ctx.lineTo(g.axisX, g.axisBottom);
          ctx.stroke();
        }
        if (!isTimeReceivingStage) {
          ctx.globalAlpha = axisGrow;
          for (let col = 0; col < g.cols; col++) {
          const p = railPoint(col);
          const posOnAxis = col / (g.cols - 1);
          const completed = isNewOriginAxis && col < originStepIndex;
          const current = isNewOriginAxis && col === originStepIndex;
          const next = isNewOriginAxis && col === originStepIndex + 1;
          const lit = isNewOriginAxis
            ? completed || current || Math.abs(p.x - railCursor.x) < 5
            : col <= m.phaseX || Math.abs(p.x - railCursor.x) < 5;
          const sweep = guideStage === "x" ? comet(posOnAxis, guideProgress, 0.16) : 0;
          const dragGlow = m.dragAxis === "x" ? comet(posOnAxis, m.railProgress, 0.18) : 0;
          const flow = Math.max(sweep, dragGlow);
          const baseAlpha = isTimeReceivingStage
            ? current
              ? 0.42 + lockPulse * 0.12
              : completed
                ? 0.26
                : next
                  ? 0.15
                  : 0.08
            : isNewOriginAxis
            ? current
              ? 0.76 + lockPulse * 0.18
              : completed
                ? 0.46
                : next
                  ? 0.26
                  : 0.14
            : lit
              ? 0.58
              : 0.2;
          const radius = isTimeReceivingStage
            ? current
              ? 2.1 + lockPulse * 0.6 + flow * 0.45
              : completed
                ? 1.5 + flow * 0.35
                : 0.8 + flow * 0.55
            : isNewOriginAxis
            ? current
              ? 3.0 + lockPulse * 1.2 + flow * 1.0
              : completed
                ? 2.15 + flow * 0.7
                : 1.15 + flow * 1.0
            : lit
              ? 2.35 + flow * 1.2
              : 1.25 + flow * 1.25;
          ctx.fillStyle = `rgba(${starWhiteRgb},${Math.min(0.98, baseAlpha + flow * 0.34).toFixed(3)})`;
          ctx.shadowColor = `rgba(${starWhiteRgb},${(0.14 + flow * 0.62 + (current ? 0.2 + lockPulse * 0.26 : 0)).toFixed(3)})`;
          ctx.shadowBlur = isTimeReceivingStage
            ? current ? 5 + lockPulse * 5 + flow * 5 : 1 + flow * 4
            : current ? 12 + lockPulse * 14 + flow * 12 : lit ? 7 + flow * 12 : 2 + flow * 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          }
          ctx.shadowBlur = 0;
          for (let row = 0; row < g.rows; row++) {
          const p = tunePoint(row);
          if (row % 2 !== 0 && row !== m.precisionY) continue;
          const posOnAxis = row / (g.rows - 1);
          const sweep = guideStage === "y" ? comet(posOnAxis, guideProgress, 0.11) : 0;
          const dragGlow = m.dragAxis === "y" ? comet(posOnAxis, m.precisionY / (g.rows - 1), 0.13) : 0;
          const flow = Math.max(sweep, dragGlow);
          const selected = row === m.precisionY;
          ctx.fillStyle = `rgba(${starWhiteRgb},${(isTimeReceivingStage
            ? selected ? 0.38 + flow * 0.18 : 0.08 + flow * 0.24
            : selected ? 0.72 + flow * 0.26 : 0.16 + flow * 0.58).toFixed(3)})`;
          ctx.shadowColor = `rgba(${starWhiteRgb},${(0.1 + flow * 0.68).toFixed(3)})`;
          ctx.shadowBlur = isTimeReceivingStage
            ? selected ? 4 + flow * 5 : 1 + flow * 4
            : selected ? 10 + flow * 12 : 2 + flow * 12;
          ctx.beginPath();
          ctx.arc(
            p.x,
            p.y,
            isTimeReceivingStage
              ? row === m.precisionY ? 2.05 + flow * 0.5 : 0.72 + flow * 0.55
              : row === m.precisionY ? 3.1 + flow * 1.1 : 1.0 + flow * 1.2,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          }
          ctx.shadowColor = `rgba(${starWhiteRgb},0.92)`;
          ctx.shadowBlur = 18;
          ctx.fillStyle = `rgba(${starWhiteRgb},0.98)`;
          ctx.beginPath();
          ctx.arc(tuneCursor.x, tuneCursor.y, m.state === STATE.DISPLAY_LOCK ? 5.2 : 4.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(railCursor.x, railCursor.y, m.state === STATE.DISPLAY_LOCK ? 5.2 : 4.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        if (isTimeReceivingStage) {
          const axisCopy = AXIS_COPY.NEW_USER;
          const wheel = timeWheelMetrics();
          const wheelLabels = ["年", "月", "日", "时"] as const;
          const birthKeyReveal = smooth(0.18, 0.86, m.t);

          ctx.globalAlpha = birthKeyReveal;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(255,247,228,0.86)";
          ctx.font = `650 ${Math.min(17, m.w * 0.043)}px ${SANS}`;
          ctx.fillText(
            axisCopy.bodyPrimary,
            m.w / 2,
            m.h * 0.13,
          );
          ctx.fillStyle = `rgba(${coordinateTextRgb},0.72)`;
          ctx.font = `540 ${Math.min(11, m.w * 0.028)}px ${SANS}`;
          ctx.fillText(
            m.lunarDateLabel,
            m.w / 2,
            m.h * 0.185,
          );

          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(${coordinateTextRgb},0.42)`;
          ctx.font = `560 ${Math.min(10, m.w * 0.025)}px ${SANS}`;
          ctx.fillText(
            "按公历输入",
            m.w / 2,
            wheel.top - 14,
          );

          const selectionBand = ctx.createLinearGradient(
            wheel.left,
            0,
            wheel.left + wheel.width,
            0,
          );
          selectionBand.addColorStop(0, `rgba(${coordinateAxisRgb},0)`);
          selectionBand.addColorStop(0.16, `rgba(${coordinateAxisRgb},0.025)`);
          selectionBand.addColorStop(0.5, `rgba(${starWhiteRgb},0.055)`);
          selectionBand.addColorStop(0.84, `rgba(${coordinateAxisRgb},0.025)`);
          selectionBand.addColorStop(1, `rgba(${coordinateAxisRgb},0)`);
          ctx.fillStyle = selectionBand;
          ctx.fillRect(
            wheel.left,
            wheel.centerY - 29,
            wheel.width,
            58,
          );

          CHRONO_DIMS.forEach((wheelDim, wheelIndex) => {
            const columnX = wheel.left + wheel.columnWidth * wheelIndex;
            const panelInset = 3;
            const isActiveWheel = wheelIndex === m.chronoStep;
            const selectedValue = dimValue(m.coords, wheelDim);
            const wheelRange = dimRange(m.coords, wheelDim);
            const valueStep = timeWheelValueStep(wheelDim);
            const previousValue = clamp(
              selectedValue - valueStep,
              wheelRange.min,
              wheelRange.max,
            );
            const nextValue = clamp(
              selectedValue + valueStep,
              wheelRange.min,
              wheelRange.max,
            );

            ctx.save();
            ctx.beginPath();
            ctx.rect(
              columnX + panelInset,
              wheel.top,
              wheel.columnWidth - panelInset * 2,
              wheel.height,
            );
            ctx.clip();

            const panel = ctx.createLinearGradient(
              0,
              wheel.top,
              0,
              wheel.top + wheel.height,
            );
            panel.addColorStop(0, "rgba(3,6,12,0.08)");
            panel.addColorStop(
              0.5,
              `rgba(9,14,24,${isActiveWheel ? "0.18" : "0.1"})`,
            );
            panel.addColorStop(1, "rgba(3,6,12,0.08)");
            ctx.fillStyle = panel;
            ctx.fillRect(
              columnX + panelInset,
              wheel.top,
              wheel.columnWidth - panelInset * 2,
              wheel.height,
            );

            const columnCenterX = columnX + wheel.columnWidth / 2;
            ctx.textAlign = "center";
            ctx.fillStyle = `rgba(${coordinateTextRgb},${isActiveWheel ? "0.68" : "0.46"})`;
            ctx.font = `620 ${Math.min(12, m.w * 0.029)}px ${SANS}`;
            ctx.fillText(
              wheelLabels[wheelIndex]!,
              columnCenterX,
              wheel.top + 17,
            );

            const neighborOffset = Math.min(39, wheel.height * 0.255);
            ctx.font = `520 ${Math.min(14, m.w * 0.035)}px ${MONO}`;
            ctx.fillStyle = `rgba(${coordinateTextRgb},0.14)`;
            if (previousValue !== selectedValue) {
              ctx.fillText(
                timeWheelValueLabel(wheelDim, previousValue),
                columnCenterX,
                wheel.centerY - neighborOffset,
              );
            }
            if (nextValue !== selectedValue) {
              ctx.fillText(
                timeWheelValueLabel(wheelDim, nextValue),
                columnCenterX,
                wheel.centerY + neighborOffset,
              );
            }

            const selectionGlow = ctx.createRadialGradient(
              columnCenterX,
              wheel.centerY,
              0,
              columnCenterX,
              wheel.centerY,
              wheel.columnWidth * 0.62,
            );
            selectionGlow.addColorStop(
              0,
              `rgba(${starWhiteRgb},${isActiveWheel ? "0.06" : "0.025"})`,
            );
            selectionGlow.addColorStop(1, `rgba(${starWhiteRgb},0)`);
            ctx.fillStyle = selectionGlow;
            ctx.fillRect(
              columnX,
              wheel.centerY - neighborOffset,
              wheel.columnWidth,
              neighborOffset * 2,
            );

            ctx.fillStyle = `rgba(${starWhiteRgb},${isActiveWheel ? "0.96" : "0.82"})`;
            ctx.shadowColor = `rgba(${coordinateAxisRgb},${isActiveWheel ? "0.3" : "0.1"})`;
            ctx.shadowBlur = isActiveWheel ? 10 : 3;
            const valueSize = wheelDim === "hour"
              ? Math.min(22, m.w * 0.052)
              : wheelDim === "year"
                ? Math.min(24, m.w * 0.058)
                : Math.min(27, m.w * 0.064);
            ctx.font = `560 ${valueSize}px ${MONO}`;
            ctx.fillText(
              timeWheelValueLabel(wheelDim, selectedValue),
              columnCenterX,
              wheel.centerY,
            );
            ctx.restore();
          });

          ctx.shadowBlur = 0;
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(${coordinateTextRgb},0.78)`;
          ctx.font = `620 ${Math.min(12, m.w * 0.031)}px ${SANS}`;
          ctx.fillText(
            axisCopy.actionConfirm,
            m.w / 2,
            m.h * 0.92,
          );
          ctx.restore();
          return;
        }
        if (m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND || m.state === STATE.DISPLAY_LOCK) {
          ctx.textAlign = "left";
          const finalLocked = m.state === STATE.DISPLAY_LOCK;
          const axisCopy = AXIS_COPY[m.pendingAxisMode];
          const isNewOriginFlow = m.pendingAxisMode === "NEW_USER" && !finalLocked;
          const originLockFeedback = isNewOriginFlow && lockPulse > 0.08;
          ctx.fillStyle = "rgba(255,247,228,0.82)";
          ctx.font = `650 ${Math.min(16, m.w * 0.041)}px ${SANS}`;
          ctx.fillText(isNewOriginFlow ? axisCopy.bodyPrimary : axisCopy.topPrimary, g.railX0, m.h * 0.15);
          ctx.fillStyle = `rgba(${coordinateTextRgb},0.72)`;
          ctx.font = `620 ${Math.min(13, m.w * 0.033)}px ${SANS}`;
          ctx.fillText(isNewOriginFlow ? axisCopy.bodySecondary : axisCopy.topSecondary, g.railX0, m.h * 0.195);
          if (isNewOriginFlow) {
            ctx.fillStyle = `rgba(${coordinateTextRgb},0.68)`;
            ctx.font = `600 ${Math.min(10.5, m.w * 0.027)}px ${MONO}`;
            ctx.fillText(originCoordinateSummary(), g.railX0, m.h * 0.245);
          }
          ctx.fillStyle = `rgba(${coordinateTextRgb},0.82)`;
          ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
          if (!isNewOriginFlow) {
            ctx.fillText(finalLocked ? "［ 光痕 ］" : isGeoStage ? `［ ${axisCopy.geoLabel[geoDim]} ］` : `［ ${axisCopy.dimStageLabel[dim]} ］`, g.railX0, m.h * 0.34);
          }
          if (originMother && !finalLocked) {
            ctx.fillStyle = "rgba(232,200,138,0.5)";
            ctx.font = `600 ${Math.min(9.5, m.w * 0.024)}px ${MONO}`;
            if (isNewOriginFlow) {
              ctx.fillText(
                !isGeoStage && dim === "hour"
                  ? `母码时序：${hourToPeriodLabel(Math.round(m.dialFloat))}`
                  : isGeoStage
                  ? `出生地点背景：${originMother.geo.province} / ${originMother.geo.city}`
                  : `已锁定：${originCoordinateSummary()}`,
                g.railX0,
                m.h * 0.282
              );
              if (isGeoStage) {
                ctx.fillText("星宿与母码保持不变", g.railX0, m.h * 0.308);
              }
            } else {
              ctx.fillText(`时序填装：卦符显影 ${originMother.chrono.lockPoint} · ${originMother.mother.definition.trigramSymbol}${originMother.mother.trigram}`, g.railX0, m.h * 0.252);
              ctx.fillText(`方位填装：四象兽归位 ${originMother.starbeast.fourSymbol} · ${originMother.geo.province}/${originMother.geo.city}`, g.railX0, m.h * 0.282);
            }
          }
          if (originMother && isNewOriginFlow && isGeoStage) {
            const placeX = g.railX0 + (g.railX1 - g.railX0) * 0.77;
            const placeY = m.h * 0.225;
            ctx.save();
            ctx.strokeStyle = "rgba(147,172,211,0.18)";
            ctx.fillStyle = "rgba(185,203,236,0.72)";
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.ellipse(placeX, placeY, 34, 13, -0.08, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(placeX - 43, placeY);
            ctx.lineTo(placeX + 43, placeY);
            ctx.moveTo(placeX, placeY - 25);
            ctx.lineTo(placeX, placeY + 25);
            ctx.stroke();
            ctx.shadowColor = "rgba(185,203,236,0.48)";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(placeX, placeY, 2.4 + lockPulse * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          const activePhaseLabel = dim === "year"
            ? "年"
            : dim === "month"
              ? "月"
              : dim === "day"
                ? "日"
                : "时";
          const timeValueX = originX + Math.min(58, m.w * 0.165);
          const timeValueY = originY - Math.min(68, m.h * 0.09);
          if (isTimeReceivingStage) {
            ctx.fillStyle = `rgba(${coordinateTextRgb},0.44)`;
            ctx.font = `600 ${Math.min(9.5, m.w * 0.024)}px ${MONO}`;
            ctx.textAlign = "left";
            ctx.fillText(activePhaseLabel, timeValueX, timeValueY - 17);
          }
          ctx.fillStyle = isTimeReceivingStage
            ? `rgba(${coordinateTextRgb},0.82)`
            : "rgba(255,247,228,0.96)";
          const valueSize = isTimeReceivingStage
            ? Math.min(22, m.w * 0.057)
            : finalLocked
            ? Math.min(28, m.w * 0.062)
            : !isGeoStage && dim === "hour"
              ? Math.min(36, m.w * 0.082)
              : Math.min(48, m.w * 0.11);
          ctx.font = `700 ${valueSize}px ${MONO}`;
          ctx.shadowColor = `rgba(${starWhiteRgb},${(originLockFeedback ? 0.34 + lockPulse * 0.32 : 0).toFixed(3)})`;
          ctx.shadowBlur = originLockFeedback ? 8 + lockPulse * 12 : 0;
          ctx.fillText(
            finalLocked
              ? "光兽正在靠近"
              : isNewOriginFlow
                ? originTuningCenterValue(dim, m.dialFloat, isGeoStage, geoDim)
                : isGeoStage
                  ? geoText(geoDim, m.dialFloat)
                  : dimText(dim, m.dialFloat),
            isTimeReceivingStage ? timeValueX : g.railX0,
            isTimeReceivingStage ? timeValueY : m.h * 0.47
          );
          ctx.shadowBlur = 0;
          if (!isNewOriginFlow) {
            ctx.font = `700 ${Math.min(16, m.w * 0.04)}px ${MONO}`;
            ctx.fillStyle = "rgba(232,200,138,0.82)";
            ctx.fillText(axisCopy.bodyPrimary, g.railX0, m.h * 0.58);
            ctx.fillStyle = "rgba(232,200,138,0.74)";
            ctx.fillText(axisCopy.bodySecondary, g.railX0, m.h * 0.63);
          }
          ctx.fillStyle = `rgba(${coordinateTextRgb},0.58)`;
          ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
          const injectionHint = isNewOriginFlow
            ? axisCopy.actionPrimary
            : m.state === STATE.DISPLAY_LOCK
              ? axisCopy.lockText
              : axisCopy.actionPrimary;
          const railHint = finalLocked
            ? axisCopy.lockText
            : axisCopy.actionConfirm;
          if (isTimeReceivingStage) {
            ctx.textAlign = "left";
            ctx.fillText(injectionHint, g.railX0, m.h * 0.74);
            ctx.fillStyle = `rgba(${coordinateTextRgb},0.76)`;
            ctx.font = `620 ${Math.min(12, m.w * 0.031)}px ${SANS}`;
            ctx.textAlign = "center";
            ctx.fillText(axisCopy.actionConfirm, m.w / 2, m.h * 0.9);
          } else {
            ctx.fillText(injectionHint, g.railX0, g.railY - 18);
            ctx.fillStyle = `rgba(${coordinateTextRgb},0.72)`;
            ctx.font = `600 ${Math.min(11, m.w * 0.028)}px ${MONO}`;
            ctx.textAlign = "right";
            ctx.fillText(
              isNewOriginFlow
                ? railHint
                : m.state === STATE.DISPLAY_LOCK
                  ? "镜面"
                  : "光痕",
              g.railX1,
              g.railY - 18,
            );
          }
        }

        if (convergenceActive) {
          const freeze = m.state === STATE.ENTRY_PRE_COLLAPSE ? smooth(0, 0.55, m.t) : 1;
          const converge = m.state === STATE.ENTRY_LIGHT_CONVERGENCE ? smooth(0, 0.95, m.t) : 0;
          const convergenceCoreFrame = resolveLifeUniverseCoreFrame(m.w, m.h, now);
          const centerX = convergenceCoreFrame.x;
          const centerY = convergenceCoreFrame.y;
          ctx.fillStyle = `rgba(0,0,0,${(0.1 + freeze * 0.18 + converge * 0.22).toFixed(3)})`;
          ctx.fillRect(0, 0, m.w, m.h);
          for (let i = 0; i < MANSION_COORDINATES.length; i++) {
            const from = i % 2 === 0
              ? railPoint(i % 7)
              : tunePoint(Math.min(20, 2 + Math.floor(i / 7) * 5));
            const ring = (i % 7) / 7;
            const targetX = centerX + Math.cos(ring * Math.PI * 2 + i * 0.47) * (8 + (i % 3) * 4);
            const targetY = centerY + Math.sin(ring * Math.PI * 2 + i * 0.47) * (8 + (i % 4) * 3);
            const x = lerp(from.x, targetX, converge);
            const y = lerp(from.y, targetY, converge);
            const alpha = 0.2 + freeze * 0.32 + converge * 0.42;
            ctx.fillStyle = `rgba(${starWhiteRgb},${alpha.toFixed(3)})`;
            ctx.shadowColor = `rgba(${starWhiteRgb},${(0.18 + converge * 0.55).toFixed(3)})`;
            ctx.shadowBlur = 5 + converge * 16;
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + converge * 1.7, 0, Math.PI * 2);
            ctx.fill();
          }
          drawLifeUniverseCore2D(
            ctx,
            m.w,
            m.h,
            now,
            0.18 + converge * 0.55,
          );
          ctx.shadowBlur = 0;
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(255,247,228,${(0.18 + converge * 0.55).toFixed(3)})`;
          ctx.font = `650 ${Math.min(14, m.w * 0.036)}px ${SANS}`;
          ctx.fillText(m.pendingAxisMode === "OLD_USER" ? "压力正在聚合。" : "坐标正在成形。", centerX, centerY + 82);
          if (m.pendingAxisMode === "OLD_USER") {
            ctx.fillStyle = `rgba(232,200,138,${(0.12 + converge * 0.38).toFixed(3)})`;
            ctx.font = `600 ${Math.min(12, m.w * 0.031)}px ${SANS}`;
            ctx.fillText("压力压入轴心。", centerX, centerY + 108);
          }
        }
        ctx.restore();
      }

      if (m.state === STATE.PRESSURE_SEED_AXIS) {
        ctx.save();
        const g = axisMetrics();
        const inT = smooth(0, 0.55, m.t);
        const centerX = g.axisX;
        const centerY = m.h * 0.5;
        const seedY = [m.h * 0.36, centerY, m.h * 0.64];
        const selected = clamp(m.pressureSeedIndex, 0, 2);
        const selectedSeed = m.pressureSeeds[selected] ?? m.pressureSeeds[0];
        const pulse = 0.72 + Math.sin(now * 2.3) * 0.1;
        const groupPulse = smooth(0, 1, m.pressureSeedGroupPulse);
        const coordY = lerp(g.axisTop, g.axisBottom, m.pressureSeedCoordinateIndex / 20);
        const railStops = [0.18, 0.5, 0.82];
        const railPoints = railStops.map((stop) => ({ x: lerp(g.railX0, g.railX1, stop), y: g.railY }));

        ctx.globalAlpha = inT;
        const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(m.w, m.h) * 0.34);
        glow.addColorStop(0, `rgba(255,247,228,${(0.13 + pulse * 0.11).toFixed(3)})`);
        glow.addColorStop(0.48, "rgba(232,200,138,0.08)");
        glow.addColorStop(1, "rgba(232,200,138,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.min(m.w, m.h) * 0.34, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(232,200,138,0.48)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(g.axisX, g.axisTop);
        ctx.lineTo(g.axisX, g.axisBottom);
        ctx.stroke();
        for (let row = 0; row <= 20; row++) {
          const y = lerp(g.axisTop, g.axisBottom, row / 20);
          const activeCoord = row === m.pressureSeedCoordinateIndex;
          ctx.fillStyle = activeCoord ? "rgba(255,247,228,0.92)" : "rgba(232,200,138,0.24)";
          ctx.shadowColor = activeCoord ? "rgba(255,247,228,0.7)" : "rgba(232,200,138,0.2)";
          ctx.shadowBlur = activeCoord ? 13 + groupPulse * 8 : 3;
          ctx.beginPath();
          ctx.arc(g.axisX, y, activeCoord ? 3.8 + groupPulse * 1.2 : row % 2 === 0 ? 1.45 : 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255,247,228,${(0.1 + groupPulse * 0.42).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(g.axisX - 10, coordY);
        ctx.lineTo(g.axisX + 10, coordY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(g.railX0, g.railY);
        ctx.lineTo(g.railX1, g.railY);
        ctx.stroke();

        railPoints.forEach((railPoint, index) => {
          const seedLineY = seedY[index] ?? centerY;
          const active = index === selected;
          const locked = active && m.pressureSeedLocked;
          ctx.strokeStyle = locked
            ? "rgba(255,247,228,0.34)"
            : active
              ? "rgba(232,200,138,0.24)"
              : "rgba(232,200,138,0.1)";
          ctx.lineWidth = locked ? 1.2 : 0.7;
          ctx.beginPath();
          ctx.moveTo(railPoint.x, railPoint.y - 8);
          ctx.lineTo(g.axisX, seedLineY);
          ctx.stroke();
        });

        railPoints.forEach((p, index) => {
          const active = index === selected;
          const locked = active && m.pressureSeedLocked;
          if (locked) {
            const lockRing = 0.5 + 0.5 * Math.sin(now * 18);
            ctx.strokeStyle = `rgba(255,247,228,${(0.22 + lockRing * 0.34).toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 10 + lockRing * 4, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = locked ? "rgba(255,247,228,0.98)" : active ? "rgba(255,247,228,0.78)" : "rgba(232,200,138,0.28)";
          ctx.shadowColor = locked ? "rgba(255,247,228,0.86)" : active ? "rgba(255,247,228,0.42)" : "rgba(232,200,138,0.2)";
          ctx.shadowBlur = locked ? 18 : active ? 10 : 4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, locked ? 5.2 : active ? 4.2 : 2.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.textAlign = "center";
          ctx.fillStyle = locked ? "rgba(255,247,228,0.8)" : "rgba(232,200,138,0.46)";
          ctx.font = `600 ${Math.min(10, m.w * 0.026)}px ${MONO}`;
          ctx.fillText(pad2(index + 1), p.x, p.y + 22);
        });
        ctx.shadowBlur = 0;

        m.pressureSeeds.forEach((seed, index) => {
          const y = seedY[index] ?? centerY;
          const active = index === selected;
          const confirmed = active && m.pressureSeedLocked;
          const x = active ? g.railX0 : g.railX0 + 16;
          const dotX = g.axisX;
          const seedPulse = groupPulse * (index === 1 ? 0.18 : 0.12);
          if (confirmed) {
            const hitW = Math.min(m.w * 0.72, g.railX1 - g.railX0 + 22);
            const hitX = g.railX0 - 10;
            const hitY = y - 56;
            ctx.fillStyle = "rgba(255,247,228,0.048)";
            ctx.strokeStyle = "rgba(232,200,138,0.22)";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.roundRect?.(hitX, hitY, hitW, 112, 14);
            if (!ctx.roundRect) {
              ctx.rect(hitX, hitY, hitW, 112);
            }
            ctx.fill();
            ctx.stroke();
          }
          ctx.fillStyle = active ? "rgba(255,247,228,0.96)" : `rgba(232,200,138,${(0.38 + seedPulse).toFixed(3)})`;
          ctx.shadowColor = active ? "rgba(255,247,228,0.82)" : "rgba(232,200,138,0.28)";
          ctx.shadowBlur = confirmed ? 24 : active ? 16 + groupPulse * 10 : 6 + groupPulse * 5;
          ctx.beginPath();
          ctx.arc(dotX, y, confirmed ? 8.2 : active ? 5.4 : 3.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";
          ctx.fillStyle = confirmed ? "rgba(255,247,228,0.86)" : active ? "rgba(232,200,138,0.9)" : "rgba(232,200,138,0.42)";
          ctx.font = `650 ${active ? Math.min(12, m.w * 0.031) : Math.min(10, m.w * 0.027)}px ${MONO}`;
          ctx.fillText(active ? confirmed ? "上码来源已锁定 · 点击进入" : "选择这颗现实压力" : `压力 ${index + 1}`, x, y - (active ? confirmed ? 38 : 44 : 18));
          ctx.fillStyle = confirmed ? "rgba(255,247,228,0.98)" : active ? "rgba(255,247,228,0.92)" : "rgba(255,247,228,0.48)";
          ctx.shadowColor = confirmed ? "rgba(255,247,228,0.44)" : "rgba(255,247,228,0)";
          ctx.shadowBlur = confirmed ? 10 : 0;
          ctx.font = `680 ${active ? Math.min(17, m.w * 0.042) : Math.min(12, m.w * 0.032)}px ${SANS}`;
          drawCanvasWrappedText(ctx, seed.main, x, y - (active ? confirmed ? 14 : 20 : 2), active ? m.w * 0.68 : m.w * 0.5, active ? confirmed ? 22 : 24 : 17, active ? 2 : 1);
          if (active) {
            ctx.fillStyle = confirmed ? "rgba(255,247,228,0.86)" : "rgba(232,200,138,0.66)";
            ctx.shadowColor = confirmed ? "rgba(232,200,138,0.34)" : "rgba(255,247,228,0)";
            ctx.shadowBlur = confirmed ? 8 : 0;
            ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${SANS}`;
            drawCanvasWrappedText(ctx, seed.sub, x, y + (confirmed ? 28 : 34), m.w * 0.66, confirmed ? 16 : 18, 2);
          }
          ctx.shadowBlur = 0;
        });

        const railCursor = { x: lerp(g.railX0, g.railX1, m.railProgress), y: g.railY };
        ctx.shadowColor = m.pressureSeedLocked ? "rgba(255,247,228,0.78)" : "rgba(232,200,138,0.42)";
        ctx.shadowBlur = m.pressureSeedLocked ? 16 : 9;
        ctx.fillStyle = m.pressureSeedLocked ? "rgba(255,247,228,0.96)" : "rgba(232,200,138,0.72)";
        ctx.beginPath();
        ctx.arc(railCursor.x, railCursor.y, m.pressureSeedLocked ? 4.8 : 3.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(232,200,138,0.76)";
        ctx.font = `650 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText("现实上码取样", g.railX0, m.h * 0.12);
        ctx.fillStyle = "rgba(255,247,228,0.96)";
        ctx.font = `760 ${Math.min(28, m.w * 0.072)}px ${SANS}`;
        ctx.fillText("这一刻，什么正在压住你？", g.railX0, m.h * 0.19);
        ctx.fillStyle = "rgba(232,200,138,0.72)";
        ctx.font = `650 ${Math.min(13, m.w * 0.034)}px ${SANS}`;
        ctx.fillText("纵轴 21 个星光坐标，每格调取三粒。", g.railX0, m.h * 0.245);
        ctx.fillStyle = "rgba(232,200,138,0.54)";
        ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText(`当前坐标 ${pad2(m.pressureSeedCoordinateIndex + 1)} / 21 · 第 ${m.pressureSeedRound + 1} 轮`, g.railX0, m.h * 0.295);
        ctx.fillText(m.pressureSeedLocked ? "这颗压力将形成上码" : "选择一颗现实压力", g.railX0, g.railY + 30);
        ctx.textAlign = "right";
        ctx.fillStyle = "rgba(232,200,138,0.72)";
        ctx.fillText(m.pressureSeedLocked ? "已锁定" : "三选一", g.railX1, g.railY - 18);
        ctx.restore();
        return;
      }

      if (isMotherCodeRevealState()) {
        ctx.save();
        const g = axisMetrics();
        const reveal = resolveOriginMotherCode();
        const profile = reveal.mother.profile;
        const definition = reveal.mother.definition;
        const displayCopy = motherCardDisplayCopy(reveal.mother.trigram, definition);
        const inT = smooth(0, 0.6, m.t);
        const pulse = 0.72 + Math.sin(now * 2.1) * 0.1;
        const centerX = m.w / 2;
        const centerY = m.h * 0.52;

        ctx.globalAlpha = inT;
        const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(m.w, m.h) * 0.36);
        glow.addColorStop(0, `rgba(255,247,228,${(0.14 + inT * 0.18 * pulse).toFixed(3)})`);
        glow.addColorStop(0.48, `rgba(232,200,138,${(0.07 + inT * 0.12).toFixed(3)})`);
        glow.addColorStop(1, "rgba(232,200,138,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.min(m.w, m.h) * 0.36, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(232,200,138,0.24)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(g.railX0, g.railY);
        ctx.lineTo(g.railX1, g.railY);
        ctx.stroke();
        for (let col = 0; col < g.cols; col++) {
          const p = railPoint(col);
          const lit = col / (g.cols - 1) <= m.railProgress;
          ctx.fillStyle = `rgba(255,247,228,${lit ? "0.82" : "0.22"})`;
          ctx.shadowColor = "rgba(255,247,228,0.34)";
          ctx.shadowBlur = lit ? 10 : 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, lit ? 2.4 : 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
        const railCursor = { x: lerp(g.railX0, g.railX1, m.railProgress), y: g.railY };
        ctx.shadowColor = "rgba(255,247,228,0.72)";
        ctx.shadowBlur = 14;
        ctx.fillStyle = "rgba(255,247,228,0.94)";
        ctx.beginPath();
        ctx.arc(railCursor.x, railCursor.y, 4.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "rgba(232,200,138,0.76)";
        ctx.font = `650 ${Math.min(11, m.w * 0.028)}px ${MONO}`;
        ctx.fillText("星脉之境第一份生命资产", g.railX0, m.h * 0.115);
        ctx.fillStyle = "rgba(255,247,228,0.96)";
        ctx.font = `760 ${Math.min(30, m.w * 0.074)}px ${SANS}`;
        ctx.fillText("母码资产已生成", g.railX0, m.h * 0.19);
        ctx.fillStyle = "rgba(232,200,138,0.58)";
        ctx.font = `620 ${Math.min(12, m.w * 0.031)}px ${SANS}`;
        ctx.fillText("时间同时定宿、落母码，四象在资产中第一次显影", g.railX0, m.h * 0.248);

        const cardW = Math.min(g.railX1 - g.railX0, Math.min(326, m.w * 0.84));
        const cardH = Math.min(360, m.h * 0.425, cardW * 1.12);
        const cardX = centerX - cardW / 2;
        const cardY = m.h * 0.235;
        const cardPad = Math.min(22, cardW * 0.06);
        const flipPulse = smooth(0, 1, m.motherCardFlipPulse);
        const cardScale = 1 + flipPulse * 0.012;
        ctx.save();
        ctx.translate(cardX + cardW / 2, cardY + cardH / 2);
        ctx.scale(cardScale, cardScale);
        ctx.translate(-(cardX + cardW / 2), -(cardY + cardH / 2));
        const cardBg = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
        cardBg.addColorStop(0, "rgba(255,247,228,0.064)");
        cardBg.addColorStop(0.44, "rgba(232,200,138,0.032)");
        cardBg.addColorStop(1, "rgba(255,247,228,0.044)");
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = "rgba(232,200,138,0.34)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.roundRect?.(cardX, cardY, cardW, cardH, 20);
        if (!ctx.roundRect) ctx.rect(cardX, cardY, cardW, cardH);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,247,228,0.08)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.roundRect?.(cardX + 7, cardY + 7, cardW - 14, cardH - 14, 16);
        if (!ctx.roundRect) ctx.rect(cardX + 7, cardY + 7, cardW - 14, cardH - 14);
        ctx.stroke();
        if (m.motherCardFace === "front") {
          const [trigramName, roleName] = profile.motherCodeName.split("｜");
          drawFourBeastCardWatermark(
            ctx,
            reveal.starbeast.fourSymbol,
            cardX,
            cardY,
            cardW,
            cardH,
          );
          const assetBadgeW = Math.min(62, Math.max(48, cardW * 0.18));
          ctx.fillStyle = "rgba(232,200,138,0.07)";
          ctx.strokeStyle = "rgba(232,200,138,0.2)";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.roundRect?.(cardX + cardPad - 2, cardY + 12, assetBadgeW, 22, 11);
          if (!ctx.roundRect) ctx.rect(cardX + cardPad - 2, cardY + 12, assetBadgeW, 22);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "rgba(232,200,138,0.44)";
          ctx.font = `600 ${Math.min(9, cardW * 0.027)}px ${MONO}`;
          ctx.fillText("8 母码｜下码", cardX + cardPad + 7, cardY + 26);
          ctx.textAlign = "right";
          ctx.fillStyle = "rgba(232,200,138,0.5)";
          ctx.fillText(
            `${reveal.starbeast.fourSymbol}七宿印`,
            cardX + cardW - cardPad,
            cardY + 26,
          );
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(255,247,228,0.96)";
          ctx.font = `800 ${Math.min(28, cardW * 0.082)}px ${SANS}`;
          ctx.fillText(`${trigramName || reveal.mother.trigram}  ${definition.trigramSymbol}`, cardX + cardW / 2, cardY + cardH * 0.165);
          ctx.fillStyle = "rgba(232,200,138,0.74)";
          ctx.font = `650 ${Math.min(15, cardW * 0.044)}px ${SANS}`;
          ctx.fillText(roleName || profile.motherCodeTitle || definition.motherCodeTitle, cardX + cardW / 2, cardY + cardH * 0.235);
          const badgeX = cardX + cardW / 2;
          const badgeY = cardY + cardH * 0.405;
          const badgeR = Math.min(cardW * 0.22, cardH * 0.15);
          ctx.strokeStyle = "rgba(232,200,138,0.2)";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = "rgba(255,247,228,0.08)";
          ctx.beginPath();
          ctx.arc(badgeX, badgeY, badgeR * 0.68, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(badgeX - badgeR * 0.72, badgeY);
          ctx.lineTo(badgeX + badgeR * 0.72, badgeY);
          ctx.stroke();
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(255,247,228,0.2)";
          ctx.font = `780 ${Math.min(70, cardW * 0.205)}px ${SANS}`;
          ctx.fillText(definition.trigramSymbol, badgeX, badgeY + badgeR * 0.2);
          ctx.textAlign = "left";
          ctx.fillStyle = "rgba(255,247,228,0.9)";
          ctx.font = `720 ${Math.min(15.5, cardW * 0.046)}px ${SANS}`;
          drawCanvasWrappedText(ctx, displayCopy.oneLine, cardX + cardPad, cardY + cardH * 0.625, cardW - cardPad * 2, 20, 2);
          let tagX = cardX + cardPad;
          const tagY = cardY + cardH - 35;
          displayCopy.tags.forEach((tag) => {
            const tagW = Math.min(86, Math.max(48, ctx.measureText(tag).width + 20));
            ctx.fillStyle = "rgba(232,200,138,0.075)";
            ctx.strokeStyle = "rgba(232,200,138,0.2)";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.roundRect?.(tagX, tagY - 16, tagW, 24, 12);
            if (!ctx.roundRect) ctx.rect(tagX, tagY - 16, tagW, 24);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "rgba(232,200,138,0.7)";
            ctx.font = `650 ${Math.min(10.5, cardW * 0.031)}px ${MONO}`;
            ctx.fillText(tag, tagX + 10, tagY);
            tagX += tagW + 8;
          });
        } else {
          const decodeX = cardX + cardPad;
          let decodeY = cardY + 32;
          const sectionGap = Math.min(62, cardH * 0.168);
          const drawDecodeBlock = (label: string, text: string, maxLines = 2) => {
            ctx.fillStyle = "rgba(232,200,138,0.62)";
            ctx.font = `650 ${Math.min(10, cardW * 0.03)}px ${MONO}`;
            ctx.fillText(label, decodeX, decodeY);
            ctx.fillStyle = "rgba(255,247,228,0.88)";
            ctx.font = `650 ${Math.min(11.2, cardW * 0.034)}px ${SANS}`;
            drawCanvasWrappedText(ctx, text, decodeX, decodeY + 20, cardW - cardPad * 2, 15, maxLines);
            decodeY += sectionGap;
          };
          ctx.fillStyle = "rgba(232,200,138,0.72)";
          ctx.font = `650 ${Math.min(10, cardW * 0.03)}px ${MONO}`;
          ctx.fillText("人格原型解码", decodeX, decodeY);
          decodeY += 36;
          drawDecodeBlock("原型识别", displayCopy.archetype, 2);
          drawDecodeBlock("惯性反应", displayCopy.inertia, 2);
          drawDecodeBlock("行为代价", displayCopy.cost, 2);
          drawDecodeBlock("转化方向", displayCopy.direction, 2);
          ctx.fillStyle = "rgba(232,200,138,0.48)";
          ctx.font = `600 ${Math.min(9.5, cardW * 0.029)}px ${MONO}`;
          ctx.fillText("母码来源：农历时序 · 出生宿形成四象印", cardX + cardPad, cardY + cardH - 33);
          ctx.fillStyle = "rgba(232,200,138,0.56)";
          ctx.fillText(`母码原型为主体 · ${reveal.starbeast.fourSymbol}为本命盖印`, cardX + cardPad, cardY + cardH - 15);
        }
        ctx.restore();

        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(232,200,138,0.38)";
        ctx.font = `600 ${Math.min(9.5, m.w * 0.024)}px ${MONO}`;
        ctx.fillText(m.motherCardFace === "front" ? "轻触查看背面" : "轻触返回正面", centerX, cardY + cardH + 17);

        ctx.fillStyle = "rgba(232,200,138,0.52)";
        ctx.font = `600 ${Math.min(11, m.w * 0.028)}px ${MONO}`;
        ctx.textAlign = "left";
        ctx.fillText("确认本命底座，再进入这一局现实压力", g.railX0, g.railY + 30);
        ctx.textAlign = "right";
        ctx.fillStyle = "rgba(232,200,138,0.72)";
        ctx.fillText("现实压力", g.railX1, g.railY - 18);
        ctx.restore();
        return;
      }

      if (entryStaticActive) {
        ctx.save();
        const g = axisMetrics();
        const centerX = m.w / 2;
        const centerY = m.h * 0.48;
        const inT = smooth(0, 0.6, m.t);
        const pulse = 0.72 + Math.sin(now * 2.1) * 0.1;
        const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(m.w, m.h) * 0.34);
        glow.addColorStop(0, `rgba(255,247,228,${(0.14 + inT * 0.16 * pulse).toFixed(3)})`);
        glow.addColorStop(0.46, `rgba(232,200,138,${(0.07 + inT * 0.09).toFixed(3)})`);
        glow.addColorStop(1, "rgba(232,200,138,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.min(m.w, m.h) * 0.34, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = inT;
        ctx.strokeStyle = "rgba(232,200,138,0.34)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(g.railX0, g.railY);
        ctx.lineTo(g.railX1, g.railY);
        ctx.stroke();
        for (let col = 0; col < g.cols; col++) {
          const p = railPoint(col);
          const lit = col / (g.cols - 1) <= m.railProgress;
          ctx.fillStyle = `rgba(255,247,228,${lit ? "0.82" : "0.26"})`;
          ctx.shadowColor = "rgba(255,247,228,0.36)";
          ctx.shadowBlur = lit ? 10 : 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, lit ? 2.4 : 1.35, 0, Math.PI * 2);
          ctx.fill();
        }
        const railCursor = { x: lerp(g.railX0, g.railX1, m.railProgress), y: g.railY };
        ctx.shadowColor = "rgba(255,247,228,0.78)";
        ctx.shadowBlur = 16;
        ctx.fillStyle = "rgba(255,247,228,0.96)";
        ctx.beginPath();
        ctx.arc(railCursor.x, railCursor.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "rgba(232,200,138,0.76)";
        ctx.font = `650 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText("现实上码入口", g.railX0, m.h * 0.18);
        ctx.fillStyle = "rgba(255,247,228,0.96)";
        ctx.font = `760 ${Math.min(34, m.w * 0.082)}px ${SANS}`;
        ctx.fillText("现实压力形成上码", g.railX0, m.h * 0.3);
        ctx.fillStyle = "rgba(232,200,138,0.82)";
        ctx.font = `650 ${Math.min(15, m.w * 0.038)}px ${SANS}`;
        ctx.fillText("母码仍是下码", g.railX0, m.h * 0.4);
        ctx.fillText("二者相遇，才形成本局卦码。", g.railX0, m.h * 0.445);
        ctx.fillStyle = "rgba(232,200,138,0.52)";
        ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText("右滑选择现实压力", g.railX0, g.railY + 30);
        ctx.textAlign = "right";
        ctx.fillStyle = "rgba(232,200,138,0.72)";
        ctx.fillText("上码来源", g.railX1, g.railY - 18);
        ctx.restore();
        return;
      }

      if (entryVisualCopyActive && !nodeRuntimeActive && (m.state === STATE.ASSEMBLY || m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY)) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const worldSize = Math.min(14, m.w * 0.036);
        ctx.fillStyle = "rgba(255,247,228,0.46)";
        ctx.font = `580 ${worldSize}px ${SANS}`;
        ctx.fillText(TOP_LINES[0], m.w / 2, m.h * 0.16);
        ctx.fillText(TOP_LINES[1], m.w / 2, m.h * 0.205);
        ctx.restore();
      }

      // Text resolves after the entry form stabilizes.
      if (entryVisualCopyActive && !nodeRuntimeActive && (m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY)) {
        const cx = m.w / 2;
        const lineStarts = [0.2, 0.36, 0.35, 0.56, 0.82];
        const gather = 0.78;
        m.textStars.forEach((s, i) => {
          if (s.line < 2) return;
          const t0 = lineStarts[s.line]!;
          const stagger = ((i % 19) / 19) * 0.38;
          const e = smooth(t0 + stagger, t0 + gather + stagger, m.afterForm);
          if (e <= 0.001) return;
          const x = lerp(s.ox, s.tx, e);
          const y = lerp(s.oy, s.ty, e);
          const tw = 0.65 + 0.35 * Math.sin(now * s.sp + s.ph);
          const solid = smooth(t0 + gather - 0.1, t0 + gather + 0.8, m.afterForm);
          const a = e * 0.85 * tw * (1 - solid * 0.55) * (1 - enter);
          ctx.fillStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.cream, e)},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const subtitleSize = Math.min(18, m.w * 0.046);
        const actionSize = Math.min(13, m.w * 0.033);
        const bottomCopyX = m.w / 2;
        [
          { text: CTA_LINES[0], y: 0.78, start: lineStarts[2]!, weight: 650, size: subtitleSize, alpha: 0.92 },
          { text: CTA_LINES[1], y: 0.825, start: lineStarts[3]!, weight: 650, size: subtitleSize, alpha: 0.92 },
          { text: ENTRY_ACTION_LINE, y: 0.89, start: lineStarts[4]!, weight: 620, size: actionSize, alpha: 0.82 },
        ].forEach((line) => {
          const solid = smooth(line.start + gather - 0.1, line.start + gather + 0.8, m.afterForm);
          if (solid <= 0.001) return;
          ctx.font = `${line.weight} ${line.size}px ${SANS}`;
          ctx.fillStyle = `rgba(255,247,228,${(solid * line.alpha * (1 - enter)).toFixed(3)})`;
          ctx.textAlign = "center";
          ctx.fillText(line.text, bottomCopyX, m.h * line.y);
        });
        const ctaSolid = smooth(lineStarts[2]! + gather - 0.1, lineStarts[2]! + gather + 0.8, m.afterForm);
        if (ctaSolid > 0.001) {
          ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
          ctx.fillStyle = `rgba(232,200,138,${(ctaSolid * 0.42 * (1 - enter)).toFixed(3)})`;
          ctx.textAlign = "center";
          ctx.fillText("星脉之境 · XINMAI", cx, m.h * 0.94);
        }
        ctx.textBaseline = "alphabetic";
        }

    }

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const STEP = 1 / 60;
    function frame(t: number) {
      let dt = (t - last) / 1000;
      last = t;
      m.fpsAcc += dt;
      m.fpsN += 1;
      if (m.fpsAcc >= 0.5) {
        m.fps = m.fpsN / m.fpsAcc;
        m.fpsAcc = 0;
        m.fpsN = 0;
      }
      dt = Math.min(0.1, dt);
      acc += dt;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx);
      raf = requestAnimationFrame(frame);
    }

    function onDown(e: PointerEvent) {
      audio.ensure();
      canvasRef.current?.setPointerCapture?.(e.pointerId);
      const r = canvas!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (m.state === STATE.STARFIELD_IDLE) {
        if (returningLifeIdentity) return;
        if (!m.moonReleaseStarted && isLifeMapHit(x, y)) {
          m.moonReleaseStarted = true;
          m.moonReleaseT = 0;
          audio.gather();
          vibrate([0, 12, 28]);
        }
        return;
      }
      if (m.state === STATE.ENTRY_STATIC_RENDER) {
        m.dragging = true;
        const g = axisMetrics();
        const onHorizontal = Math.abs(y - g.railY) < 48 && x >= g.railX0 - 16 && x <= g.railX1 + 16;
        m.dragAxis = onHorizontal ? "x" : null;
        m.lastX = x;
        m.lastY = y;
        if (m.dragAxis === "x") {
          m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          if (m.railProgress >= RAIL_COMMIT_THRESHOLD) {
            openPressureSeedAxis();
            m.dragging = false;
            m.dragAxis = null;
          }
        }
        return;
      }
      if (m.state === STATE.MOTHER_CODE_REVEAL) {
        m.dragging = true;
        const g = axisMetrics();
        const onHorizontal = Math.abs(y - g.railY) < 48 && x >= g.railX0 - 16 && x <= g.railX1 + 16;
        m.dragAxis = onHorizontal ? "x" : null;
        m.lastX = x;
        m.lastY = y;
        if (m.dragAxis === "x") {
          m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          if (m.railProgress >= RAIL_COMMIT_THRESHOLD) {
            openRealityPressureEntry();
            m.dragging = false;
            m.dragAxis = null;
          }
        }
        return;
      }
      if (m.state === STATE.PRESSURE_SEED_AXIS) {
        m.dragging = true;
        const g = axisMetrics();
        if (isPressureSeedCenterHit(x, y)) {
          enterFocusedPressureSeed();
          m.dragging = false;
          m.dragAxis = null;
          return;
        }
        const onHorizontal = Math.abs(y - g.railY) < 48 && x >= g.railX0 - 16 && x <= g.railX1 + 16;
        const onVertical = Math.abs(x - g.axisX) < 58 && y >= g.axisTop - 18 && y <= g.axisBottom + 18;
        m.dragAxis = onHorizontal ? "x" : onVertical ? "y" : null;
        m.lastX = x;
        m.lastY = y;
        if (m.dragAxis === "x") {
          const railStops = [0.18, 0.5, 0.82];
          const progress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          const nearestIndex = railStops.reduce((best, stop, index) =>
            Math.abs(stop - progress) < Math.abs(railStops[best]! - progress) ? index : best, 0);
          m.railProgress = railStops[nearestIndex]!;
          m.pressureSeedIndex = nearestIndex;
          m.pressureSeedLocked = true;
          audio.tick();
          vibrate(8);
        }
        return;
      }
      const beastClickReady =
        m.state === STATE.FORMATION ||
        m.state === STATE.APPROACH ||
        m.state === STATE.READY;
      if (beastClickReady && isLifeMapHit(x, y)) {
        triggerClickFlash();
        if (DEBUG_TIMELINE) emitNode1MirrorActivatedEvent();
        else routeEntryFromBeastCollapseEvent();
        return;
      }
      if (m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND) {
        m.dragging = true;
        m.lastX = x;
        m.lastY = y;
        const timeReceiving =
          m.state === STATE.TIME_CALIBRATION &&
          m.pendingAxisMode === "NEW_USER";
        if (timeReceiving) {
          const wheelIndex = timeWheelIndexAt(x, y);
          if (wheelIndex === null) {
            m.dragAxis = null;
          } else {
            m.chronoStep = wheelIndex;
            syncDialToCurrent();
            m.dragAxis = "y";
            m.verticalDragMoved = false;
          }
          m.dwellT = 0;
          return;
        }

        const g = axisMetrics();
        const onVertical =
          Math.abs(x - g.axisX) < 52 &&
          y >= g.axisTop - 18 &&
          y <= g.axisBottom + 18;
        const onHorizontal =
          Math.abs(y - g.railY) < 42 &&
          x >= g.railX0 - 12 &&
          x <= g.railX1 + 12;
        m.dragAxis = onVertical ? "y" : onHorizontal ? "x" : null;
        if (m.dragAxis === "x") {
          m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          m.phaseX = Math.round(m.railProgress * (g.cols - 1));
        }
        if (m.dragAxis === "y") {
          m.verticalDragMoved = false;
          const isGeoStage = m.state === STATE.GEO_BIND;
          const dim = activeDim();
          const geoDim = activeGeoDim();
          const { min, max } = isGeoStage ? geoRange(geoDim) : dimRange(m.coords, dim);
          const frac = 1 - clamp((y - g.axisTop) / (g.axisBottom - g.axisTop), 0, 1);
          m.dialFloat = min + frac * (max - min);
          if (isGeoStage) setGeoValue(geoDim, m.dialFloat);
          else setDimValue(dim, m.dialFloat);
          m.precisionY = max > min ? Math.round((1 - frac) * 20) : 10;
        }
        m.dwellT = 0;
      }
    }
    function isPressureSeedCenterHit(x: number, y: number) {
      if (m.state !== STATE.PRESSURE_SEED_AXIS || !m.pressureSeedLocked) return false;
      const g = axisMetrics();
      const seedY = [m.h * 0.36, m.h * 0.5, m.h * 0.64];
      const selectedSeedY = seedY[m.pressureSeedIndex] ?? seedY[1]!;
      return Math.abs(y - selectedSeedY) < 108 && x >= g.railX0 - 36 && x <= g.railX1 + 44;
    }
    function isMotherCodeCardHit(x: number, y: number) {
      if (m.state !== STATE.MOTHER_CODE_REVEAL) return false;
      const g = axisMetrics();
      const cardW = Math.min(g.railX1 - g.railX0, Math.min(326, m.w * 0.84));
      const cardH = Math.min(360, m.h * 0.425, cardW * 1.12);
      const cardX = m.w / 2 - cardW / 2;
      const cardY = m.h * 0.235;
      return x >= cardX && x <= cardX + cardW && y >= cardY && y <= cardY + cardH;
    }
    function flipMotherCodeCard() {
      m.motherCardFace = m.motherCardFace === "front" ? "back" : "front";
      m.motherCardFlipPulse = 1;
      audio.tick();
      vibrate(8);
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || (
        m.state !== STATE.TIME_CALIBRATION &&
        m.state !== STATE.GEO_BIND &&
        m.state !== STATE.MOTHER_CODE_REVEAL &&
        m.state !== STATE.ENTRY_STATIC_RENDER &&
        m.state !== STATE.PRESSURE_SEED_AXIS
      )) return;
      const r = canvas!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = x - m.lastX;
      const dy = y - m.lastY;
      if (m.state === STATE.ENTRY_STATIC_RENDER) {
        if (m.dragAxis === null && Math.hypot(dx, dy) > 10) {
          m.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : null;
        }
        if (m.dragAxis === "x") {
          const g = axisMetrics();
          m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          m.lastX = x;
          if (m.railProgress >= RAIL_COMMIT_THRESHOLD) {
            openPressureSeedAxis();
            m.dragging = false;
            m.dragAxis = null;
          }
          audio.tick();
          vibrate(6);
        }
        return;
      }
      if (m.state === STATE.MOTHER_CODE_REVEAL) {
        if (m.dragAxis === null && Math.hypot(dx, dy) > 10) {
          m.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : null;
        }
        if (m.dragAxis === "x") {
          const g = axisMetrics();
          m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          m.lastX = x;
          if (m.railProgress >= RAIL_COMMIT_THRESHOLD) {
            openRealityPressureEntry();
            m.dragging = false;
            m.dragAxis = null;
          }
          audio.tick();
          vibrate(6);
        }
        return;
      }
      if (m.state === STATE.PRESSURE_SEED_AXIS) {
        if (m.dragAxis === null && Math.hypot(dx, dy) > 10) {
          m.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
        }
        if (m.dragAxis === "x") {
          const g = axisMetrics();
          const railStops = [0.18, 0.5, 0.82];
          const progress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          const nearestIndex = railStops.reduce((best, stop, index) =>
            Math.abs(stop - progress) < Math.abs(railStops[best]! - progress) ? index : best, 0);
          m.railProgress = railStops[nearestIndex]!;
          if (nearestIndex !== m.pressureSeedIndex || !m.pressureSeedLocked) {
            m.pressureSeedIndex = nearestIndex;
            m.pressureSeedLocked = true;
            audio.tick();
            vibrate(8);
          }
          m.lastX = x;
        }
        if (m.dragAxis === "y") {
          const g = axisMetrics();
          const nextCoordinateIndex = Math.round(clamp((y - g.axisTop) / (g.axisBottom - g.axisTop), 0, 1) * 20);
          if (nextCoordinateIndex !== m.pressureSeedCoordinateIndex) {
            loadPressureSeedTriplet(nextCoordinateIndex);
          }
          m.lastY = y;
          m.lastX = x;
        }
        return;
      }
      const timeWheelStage =
        m.state === STATE.TIME_CALIBRATION &&
        m.pendingAxisMode === "NEW_USER";
      if (timeWheelStage) {
        if (m.dragAxis === "y") {
          const dim = activeDim();
          const { min, max } = dimRange(m.coords, dim);
          const stepDistance = Math.min(38, m.h * 0.052);
          const valueStep = timeWheelValueStep(dim);
          const previousRounded = Math.round(m.dialFloat);
          m.dialFloat = clamp(
            m.dialFloat -
              (dy / Math.max(24, stepDistance)) * valueStep,
            min,
            max,
          );
          setDimValue(dim, m.dialFloat);
          const nextRounded = Math.round(m.dialFloat);
          if (nextRounded !== previousRounded) {
            m.originLockPulse = 1;
            audio.tick();
            vibrate(4);
          }
          if (Math.abs(y - m.lastY) > 2) {
            m.verticalDragMoved = true;
            m.verticalTuned = true;
          }
          m.lastY = y;
          m.lastX = x;
          m.dwellT = 0;
        }
        return;
      }
      if (m.dragAxis === null && Math.hypot(dx, dy) > 10) {
        m.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      }
      if (m.dragAxis === "x") {
        const g = axisMetrics();
        m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
        m.phaseX = Math.round(m.railProgress * (g.cols - 1));
        m.lastX = x;
        m.dwellT = 0;
        if (m.railProgress >= RAIL_COMMIT_THRESHOLD) {
          commitCurrentDim();
          m.dragging = false;
          m.dragAxis = null;
        }
        audio.tick();
        vibrate(6);
      }
      if (m.dragAxis === "y") {
        const isGeoStage = m.state === STATE.GEO_BIND;
        const dim = activeDim();
        const geoDim = activeGeoDim();
        const { min, max } = isGeoStage ? geoRange(geoDim) : dimRange(m.coords, dim);
        const g = axisMetrics();
        const frac = 1 - clamp((y - g.axisTop) / (g.axisBottom - g.axisTop), 0, 1);
        m.dialFloat = min + frac * (max - min);
        if (isGeoStage) setGeoValue(geoDim, m.dialFloat);
        else setDimValue(dim, m.dialFloat);
        m.precisionY = max > min ? Math.round((1 - frac) * 20) : 10;
        if (Math.abs(y - m.lastY) > 2) {
          m.verticalDragMoved = true;
          m.verticalTuned = true;
        }
        m.lastY = y;
        m.dwellT = 0;
        audio.tick();
        vibrate(4);
      }
    }
    function onUp(e?: PointerEvent) {
      try {
        if (e) canvasRef.current?.releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore pointer capture release differences across browsers
      }
      const rect = e ? canvas!.getBoundingClientRect() : null;
      const upX = e && rect ? e.clientX - rect.left : 0;
      const upY = e && rect ? e.clientY - rect.top : 0;
      const tapTravel = e ? Math.hypot(upX - m.lastX, upY - m.lastY) : Infinity;
      if (
        e &&
        m.state === STATE.TIME_CALIBRATION &&
        m.pendingAxisMode === "NEW_USER" &&
        m.dragAxis === null &&
        tapTravel < 12 &&
        timeWheelIndexAt(upX, upY) === null
      ) {
        commitCurrentDim();
        m.dragging = false;
        m.dragAxis = null;
        return;
      }
      if (e && m.state === STATE.MOTHER_CODE_REVEAL && m.dragAxis === null && tapTravel < 12 && isMotherCodeCardHit(upX, upY)) {
        flipMotherCodeCard();
        m.dragging = false;
        m.dragAxis = null;
        return;
      }
      if (e && isPressureSeedCenterHit(upX, upY)) {
        enterFocusedPressureSeed();
        m.dragging = false;
        m.dragAxis = null;
        return;
      }
      const shouldCommitOnRelease =
        m.dragAxis === "x" &&
        m.railProgress >= RAIL_COMMIT_THRESHOLD &&
        (m.state === STATE.TIME_CALIBRATION ||
          m.state === STATE.GEO_BIND ||
          m.state === STATE.MOTHER_CODE_REVEAL ||
          m.state === STATE.ENTRY_STATIC_RENDER) &&
        !m.clutched;
      if (shouldCommitOnRelease) {
        if (m.state === STATE.ENTRY_STATIC_RENDER) openPressureSeedAxis();
        else if (m.state === STATE.MOTHER_CODE_REVEAL) openRealityPressureEntry();
        else commitCurrentDim();
      }
      m.dragging = false;
      if (m.dragAxis === "y" && m.verticalDragMoved) m.verticalTuned = true;
      m.dragAxis = null;
      m.dwellT = 0;
      if ((m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND) && !m.clutched) {
        m.railProgress = 0;
        m.phaseX = 0;
      }
      m.clutched = false;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener(BEAST_COLLAPSE_VISUAL_EVENT, routeEntryFromBeastCollapseEvent);
    window.addEventListener(NODE1_MIRROR_ACTIVATED_EVENT, activateNode1Mirror);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener(BEAST_COLLAPSE_VISUAL_EVENT, routeEntryFromBeastCollapseEvent);
      window.removeEventListener(NODE1_MIRROR_ACTIVATED_EVENT, activateNode1Mirror);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      entryHandoffRef.current = null;
    };
  }, [
    commitPressureSeedCapture,
    navigate,
    returningHasCrystal,
    returningLatestImprint,
    returningLatestImprintSourceSlot,
    returningLifeContext,
    returningLifeIdentity,
    returningRealityContext,
    returningVisualContinuity,
    setLaunchInteractionState,
    setSceneState,
    triggerClickFlash,
  ]);

  const beginReturningRelationshipNameEdit = () => {
    setReturningRelationshipNameFeedback(null);
    setReturningRelationshipNameDraft(
      returningRelationshipNaming.status === "AVAILABLE"
        ? returningRelationshipNaming.asset.relationshipName ?? ""
        : "",
    );
    setReturningRelationshipNameEditing(true);
  };

  const saveReturningRelationshipName = () => {
    const relationshipName = returningRelationshipNameDraft.trim();
    if (!returningVisualReady || relationshipName.length === 0) return;
    setReturningRelationshipNameFeedback(null);
    const result =
      returningRelationshipNaming.status === "AVAILABLE"
        ? renameStarBeastRelationshipNamingAsset({ relationshipName })
        : createStarBeastRelationshipNamingAsset({ relationshipName });
    setReturningRelationshipNameDraft("");
    setReturningRelationshipNameEditing(false);
    if (result.status === "READY") {
      setReturningRelationshipNaming({
        status: "AVAILABLE",
        asset: result.asset,
      });
      setReturningRelationshipNamePersistence(result.persistence);
      return;
    }
    setReturningRelationshipNaming({ status: "UNNAMED", asset: null });
    setReturningRelationshipNamePersistence(null);
  };

  const clearReturningRelationshipName = () => {
    if (!returningVisualReady) return;
    setReturningRelationshipNameFeedback(null);
    const result = clearStarBeastRelationshipNamingAsset();
    setReturningRelationshipNameEditing(false);
    setReturningRelationshipNameDraft("");
    if (result.status === "READY") {
      setReturningRelationshipNaming({
        status: "CLEARED",
        asset: result.asset,
      });
      setReturningRelationshipNamePersistence(result.persistence);
      return;
    }
    setReturningRelationshipNaming({ status: "UNNAMED", asset: null });
    setReturningRelationshipNamePersistence(null);
  };

  const deleteReturningRelationshipName = () => {
    if (!returningVisualReady) return;
    const deleteResult = deleteStarBeastRelationshipNamingAsset();
    const presentation = resolveRelationshipNameDeletePresentation({
      lastConfirmedRelationshipNaming: returningRelationshipNaming,
      deleteOutcome: deleteResult.outcome,
    });
    setReturningRelationshipNaming(presentation.relationshipNaming);
    setReturningRelationshipNamePersistence(null);
    setReturningRelationshipNameFeedback(presentation.feedback);
    if (presentation.feedback === "DELETE_UNCONFIRMED") {
      setReturningRelationshipNameEditing(true);
      setReturningRelationshipNameDraft(
        returningRelationshipNaming.status === "AVAILABLE"
          ? returningRelationshipNaming.asset.relationshipName ?? ""
          : "",
      );
      return;
    }
    setReturningRelationshipNameEditing(false);
    setReturningRelationshipNameDraft("");
  };

  const clearReturningLifeWhisperOutcomeWatchdog = () => {
    if (returningLifeWhisperOutcomeWatchdogRef.current !== null) {
      window.clearTimeout(
        returningLifeWhisperOutcomeWatchdogRef.current,
      );
      returningLifeWhisperOutcomeWatchdogRef.current = null;
    }
  };

  const beginReturningLifeWhisperResponseCycle = () => {
    clearReturningLifeWhisperOutcomeWatchdog();
    returningLifeWhisperResponseCycleSequenceRef.current += 1;
    const responseCycleId = `returning-life-whisper-cycle-${returningLifeWhisperResponseCycleSequenceRef.current}`;
    returningLifeWhisperResponseCycleIdRef.current = responseCycleId;
    returningLifeWhisperResponsePhaseRef.current = "RESPONDING";
    setReturningLifeWhisperResponseCycleId(responseCycleId);
    setReturningLifeWhisperResponsePhase("RESPONDING");
    setReturningLifeWhisperUnavailableContinuation("NONE");
    setReturningLifeWhisperUnavailableReason(null);
    setReturningLifeWhisperSettlementAuthority(null);
    returningLifeWhisperOutcomeWatchdogRef.current = window.setTimeout(
      () => {
        returningLifeWhisperOutcomeWatchdogRef.current = null;
        if (
          returningLifeWhisperResponseCycleIdRef.current !==
            responseCycleId ||
          returningLifeWhisperFactRef.current !==
            "WHISPER_SUBMITTED" ||
          returningLifeWhisperResponsePhaseRef.current !==
            "RESPONDING"
        ) {
          return;
        }
        returningLifeWhisperResponsePhaseRef.current = "UNAVAILABLE";
        setReturningLifeWhisperResponsePhase("UNAVAILABLE");
        setReturningLifeWhisperUnavailableReason(
          "OUTCOME_WATCHDOG_EXPIRED",
        );
      },
      RETURNING_LIFE_WHISPER_OUTCOME_WATCHDOG_MS,
    );
  };

  const submitReturningLifeWhisper = () => {
    if (
      !returningLifeWhisperEntryReady ||
      returningLifeWhisperFact !== "NONE" ||
      returningLifeWhisperText.trim().length === 0
    ) {
      return;
    }
    setReturningLifeWhisperText("");
    returningLifeWhisperFactRef.current = "WHISPER_SUBMITTED";
    setReturningLifeWhisperFact("WHISPER_SUBMITTED");
    beginReturningLifeWhisperResponseCycle();
  };

  const skipReturningLifeWhisper = () => {
    if (
      !returningLifeWhisperEntryReady ||
      returningLifeWhisperFact !== "NONE"
    ) {
      return;
    }
    clearReturningLifeWhisperOutcomeWatchdog();
    setReturningLifeWhisperText("");
    returningLifeWhisperFactRef.current = "WHISPER_SKIPPED";
    returningLifeWhisperResponsePhaseRef.current = "SKIPPED";
    returningLifeWhisperResponseCycleIdRef.current = null;
    setReturningLifeWhisperFact("WHISPER_SKIPPED");
    setReturningLifeWhisperResponsePhase("SKIPPED");
    setReturningLifeWhisperResponseCycleId(null);
    setReturningLifeWhisperUnavailableContinuation("NONE");
    setReturningLifeWhisperUnavailableReason(null);
    setReturningLifeWhisperSettlementAuthority(null);
  };

  const handleReturningLifeWhisperVisualResponseOutcome = (
    outcome: LifeWhisperSurfaceVisualResponseOutcome,
  ) => {
    if (returningVisualContinuity === null) {
      return;
    }
    const transition = resolveLifeWhisperVisualOutcomeTransition({
      expectedSourceReferenceId:
        returningVisualContinuity.sourceReferenceId,
      currentResponseCycleId:
        returningLifeWhisperResponseCycleIdRef.current,
      lifeWhisperFact: returningLifeWhisperFactRef.current,
      lifeWhisperResponsePhase:
        returningLifeWhisperResponsePhaseRef.current,
      outcome,
    });
    if (transition.action === "SETTLE") {
      clearReturningLifeWhisperOutcomeWatchdog();
      returningLifeWhisperResponsePhaseRef.current = "SETTLED";
      setReturningLifeWhisperResponsePhase("SETTLED");
      setReturningLifeWhisperUnavailableReason(null);
      setReturningLifeWhisperSettlementAuthority(
        transition.authority,
      );
      return;
    }
    if (transition.action === "MARK_UNAVAILABLE") {
      clearReturningLifeWhisperOutcomeWatchdog();
      returningLifeWhisperResponsePhaseRef.current = "UNAVAILABLE";
      setReturningLifeWhisperResponsePhase("UNAVAILABLE");
      setReturningLifeWhisperUnavailableReason(transition.reason);
      setReturningLifeWhisperSettlementAuthority(null);
    }
  };

  const retryReturningLifeWhisperResponse = () => {
    if (
      returningLifeWhisperFactRef.current !== "WHISPER_SUBMITTED" ||
      returningLifeWhisperResponsePhaseRef.current !== "UNAVAILABLE"
    ) {
      return;
    }
    beginReturningLifeWhisperResponseCycle();
  };

  const continueReturningLifeWithoutConfirmedResponse = () => {
    if (
      returningLifeWhisperFactRef.current !== "WHISPER_SUBMITTED" ||
      returningLifeWhisperResponsePhaseRef.current !== "UNAVAILABLE"
    ) {
      return;
    }
    setReturningLifeWhisperUnavailableContinuation(
      "CONTINUE_WITHOUT_CONFIRMED_RESPONSE",
    );
  };

  const enterReturningNewReality = () => {
    if (
      !returningLifeWhisperRealityIntentReady ||
      !returningVisualReady ||
      returningVisualContinuity === null
    ) {
      return;
    }
    clearReturningLifeWhisperOutcomeWatchdog();
    returningLifeWhisperResponseCycleIdRef.current = null;
    setReturningLifeWhisperText("");
    const identityRecovery = recoverRealityRecognizedIdentity({
      visualContinuity: returningVisualContinuity,
    });
    const qualification =
      returningLifeWhisperFactRef.current === "WHISPER_SKIPPED"
        ? "WHISPER_SKIPPED" as const
        : returningLifeWhisperResponsePhaseRef.current === "SETTLED"
          ? "WHISPER_RESPONSE_SETTLED" as const
          : returningLifeWhisperUnavailableContinuation ===
              "CONTINUE_WITHOUT_CONFIRMED_RESPONSE"
            ? "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED" as const
            : null;
    const intentResult =
      identityRecovery.status === "READY" &&
      qualification !== null
        ? requestRealityEncounter({
            origin: "RETURNING_LIFE_WORLD",
            qualification,
            identityReferences:
              identityRecovery.identityReferences,
          })
        : null;
    if (intentResult?.status !== "READY") {
      return;
    }
    navigate(GUANYAO_ROUTES.reality, {
      replace: true,
      state: {
        intentReferenceId:
          intentResult.intent.intentReferenceId,
        visualContinuity: returningVisualContinuity,
        returningLifeMemory: {
          historicalRealityMemoryKey:
            returningRealityContext?.selectedPressureSeedId?.trim() ||
            returningRealityContext?.surface?.trim() ||
            null,
          latestCrystalMemoryKey: returningLatestImprint
            ? `${returningVisualContinuity.sourceReferenceId}:${returningLatestImprint.crystal.copy}`
            : null,
          latestCrystalSourceSlot: returningHasCrystal
            ? returningLatestImprintSourceSlot
            : null,
        },
        returningEntry: "SAME_LIFE_NEW_REALITY",
      },
    });
  };

  return (
    <GyMobilePreviewFrame background="#020306">
      <div
        className={`light-beast-hitbox scene-${scene.toLowerCase()}${SNAPSHOT_MODE ? " snapshot-mode" : ""}`}
        data-production-collapse={isProductionCollapse ? "true" : "false"}
        data-collapse-phase={collapsePhase}
        data-returning-life-world={
          returningVisualReady ? "SAME_RECOGNIZED_LIFE" : "NOT_ACTIVE"
        }
        data-returning-life-reality-state={
          !returningVisualReady
            ? "NOT_ACTIVE"
            : returningHasReality
              ? "RECENT_REALITY_CARRIED"
              : "STEADY_WITHOUT_RECENT_REALITY"
        }
        data-returning-life-crystal-trace={
          !returningVisualReady
            ? "NOT_ACTIVE"
            : returningHasCrystal
              ? "LATEST_IMPRINT_ATTACHED"
              : "NO_IMPRINT_YET"
        }
        data-returning-life-crystal-source-continuity={
          !returningVisualReady
            ? "NOT_ACTIVE"
            : returningHasCrystal
              ? "SAME_SOURCE_POSITION_SAME_GEOMETRY"
              : "NO_IMPRINT_YET"
        }
        data-returning-life-crystal-source-dimension={
          returningHasCrystal
            ? returningLatestImprintSourceDimension
            : "NONE"
        }
        data-returning-life-crystal-source-slot={
          returningHasCrystal ? returningLatestImprintSourceSlot : "NONE"
        }
        data-returning-life-temporal-state={
          returningVisualReady ? returningTemporalState : "NOT_ACTIVE"
        }
        data-returning-life-whisper-entry={
          returningLifeWhisperEntryReady ? "READY" : "NOT_ACTIVE"
        }
        data-returning-life-whisper-fact={
          returningVisualReady ? returningLifeWhisperFact : "NOT_ACTIVE"
        }
        data-returning-life-whisper-response-phase={
          returningVisualReady
            ? returningLifeWhisperResponsePhase
            : "NOT_ACTIVE"
        }
        data-returning-life-whisper-response-authority={
          returningVisualReady
            ? returningLifeWhisperSettlementAuthority ??
              (returningLifeWhisperResponsePhase === "UNAVAILABLE"
                ? "VISUAL_OUTCOME_UNAVAILABLE"
                : "AWAITING_VISUAL_OUTCOME")
            : "NOT_ACTIVE"
        }
        data-returning-life-whisper-response-cycle={
          returningLifeWhisperResponseCycleId === null
            ? "NONE"
            : "CURRENT_CYCLE"
        }
        data-returning-life-whisper-unavailable-reason={
          returningLifeWhisperUnavailableReason ?? "NONE"
        }
        data-returning-life-whisper-unavailable-continuation={
          returningLifeWhisperUnavailableContinuation
        }
        data-returning-reality-intent={
          returningVisualReady
            ? returningLifeWhisperRealityIntentReady
              ? "READY"
              : "AWAITING_RELATIONSHIP"
            : "NOT_ACTIVE"
        }
        data-returning-life-whisper-raw-text-persistence="NONE"
        data-returning-historical-reality-consumption={
          returningVisualReady && returningHasReality ? "MEMORY_ONLY" : "NONE"
        }
        data-returning-relationship-name-state={
          returningVisualReady
            ? returningRelationshipNaming.status
            : "NOT_ACTIVE"
        }
        data-returning-relationship-name-feedback={
          returningVisualReady
            ? returningRelationshipNameFeedback ?? "NONE"
            : "NOT_ACTIVE"
        }
        data-returning-life-priority="IDENTITY_THEN_STATE_THEN_EXPERIENCE_THEN_IMPRINT"
        data-reality-pressure-visual-state={
          returningVisualReady
            ? returningHasReality
              ? "PRESSURE_PAUSED"
              : "PRESSURE_OBSERVING"
            : undefined
        }
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <span
          data-entry-consumer={
            returningLifeIdentity
              ? "RETURNING_LIFE_WORLD"
              : "NEW_LIFE_CALL"
          }
          data-returning-entry-readiness={
            returningLifeIdentity
              ? "IDENTITY_AND_VISUAL_READY"
              : hasReturningLifeIdentity
                ? "VISUAL_CONTINUITY_REQUIRED"
                : "NEW_LIFE_JOURNEY"
          }
          aria-hidden="true"
          style={{ display: "none" }}
        />
        {returningVisualReady && returningVisualContinuity ? (
          <div
            className="gy-returning-life-world"
            data-returning-life-presence="SETTLED_COMPANION"
          >
            <Suspense fallback={null}>
              <RealityLifeUniverseCanvas
                visualContinuity={returningVisualContinuity}
                historicalRealityMemoryKey={
                  returningRealityContext?.selectedPressureSeedId?.trim() ||
                  returningRealityContext?.surface?.trim() ||
                  null
                }
                lifeWhisperRelationshipVisualFact={{
                  lifeWhisperFact: returningLifeWhisperFact,
                  lifeWhisperResponsePhase:
                    returningLifeWhisperResponsePhase,
                  responseCycleId:
                    returningLifeWhisperResponseCycleId,
                }}
                onLifeWhisperVisualResponseOutcome={
                  handleReturningLifeWhisperVisualResponseOutcome
                }
              />
            </Suspense>
            {returningLatestImprintGeometry &&
            returningLatestImprintBodyPoint ? (
              <svg
                className="gy-returning-life-world__imprint"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                data-returning-life-imprint="LATEST_CRYSTAL_ON_SAME_BODY"
                data-returning-life-imprint-temporal-continuity="ARCHIVE_MEMORY_RESTORED_ON_SAME_BODY"
                data-returning-life-imprint-source="ARCHIVED_USER_RECOGNIZED_RESPONSE"
                data-returning-life-imprint-direction="SAME_RESPONSE_POSITION_INTO_SAME_BODY"
                data-returning-life-imprint-form="LIFE_TEXTURE_NOT_COLLECTIBLE"
                data-returning-life-imprint-status="REMEMBERED_NOT_CURRENT_EVENT"
                data-returning-life-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
              >
                <path
                  d={returningLatestImprintBodyPath}
                  fill="none"
                  stroke="rgba(232,200,138,0.08)"
                  strokeWidth="1.08"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="blur(1.1px)"
                />
                <path
                  className="gy-returning-life-world__imprint-flow"
                  d={returningLatestImprintBodyPath}
                  fill="none"
                  stroke="rgba(255,239,190,0.28)"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  className="gy-returning-life-world__imprint-origin"
                  cx={returningLatestImprintGeometry.target[0]}
                  cy={returningLatestImprintGeometry.target[1]}
                  r="0.34"
                  fill="rgba(255,247,220,0.06)"
                  stroke="rgba(255,239,190,0.2)"
                  strokeWidth="0.14"
                />
                <g className="gy-returning-life-world__imprint-trace">
                  <path
                    d={`M ${returningLatestImprintBodyPoint[0] - 0.62} ${returningLatestImprintBodyPoint[1] + 0.08} L ${returningLatestImprintBodyPoint[0] - 0.14} ${returningLatestImprintBodyPoint[1] - 0.46} L ${returningLatestImprintBodyPoint[0] + 0.5} ${returningLatestImprintBodyPoint[1] - 0.12} M ${returningLatestImprintBodyPoint[0] - 0.14} ${returningLatestImprintBodyPoint[1] - 0.46} L ${returningLatestImprintBodyPoint[0] - 0.08} ${returningLatestImprintBodyPoint[1] + 0.58}`}
                    fill="none"
                    stroke="rgba(255,239,190,0.48)"
                    strokeWidth="0.24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx={returningLatestImprintBodyPoint[0]}
                    cy={returningLatestImprintBodyPoint[1]}
                    r="0.17"
                    fill="rgba(255,247,220,0.5)"
                  />
                </g>
              </svg>
            ) : null}
          </div>
        ) : null}
        <canvas
          ref={canvasRef}
          className="light-field"
          data-launch-interaction-state={interactionState}
          data-launch-scene={scene}
          data-launch-timeline={timeline[scene]}
          data-snapshot-index={snapshotIndex}
          style={{
            position: "relative",
            zIndex: returningVisualReady ? 2 : 0,
            width: "100%",
            height: "100%",
            display: "block",
            opacity: returningVisualReady ? 0 : 1,
            touchAction: "none",
            cursor: scene === "ENTRY" ? "pointer" : "default",
          }}
        />
        {returningVisualReady ? (
          <section
            className="gy-returning-life-world__copy"
            aria-label="回到我的生命世界"
          >
            <div className="gy-returning-life-world__cosmos-copy">
              <span>日月运行，</span>
              <span>星辰有序。</span>
            </div>
            <div className="gy-returning-life-world__relationship-copy">
              {returningRelationshipNaming.status === "AVAILABLE" ? (
                <small className="gy-returning-life-world__relationship-name">
                  你仍可以叫它
                  <b>
                    {
                      returningRelationshipNaming.asset
                        .relationshipName
                    }
                  </b>
                </small>
              ) : null}
              <strong>你的生命仍在这里，</strong>
              <strong>等你继续同行。</strong>
              {returningExperienceCopy ? (
                <small>{returningExperienceCopy}</small>
              ) : null}
              {returningLivedResponseActive &&
              returningRecognizedIdentity?.status === "READY" ? (
                <XinmaiLivedResponseReturnSurface
                  identityReferences={
                    returningRecognizedIdentity.identityReferences
                  }
                  returnItems={returningLivedGrowthReturnItems}
                  onResolved={() => {
                    setReturningLifeArchive(readPersonalityRingLite());
                    setReturningGrowthSurfaceRevision(
                      (revision) => revision + 1,
                    );
                  }}
                />
              ) : null}
              {!returningLivedResponseActive ? (
              <div
                className="gy-returning-life-world__whisper"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => event.stopPropagation()}
              >
                {returningLifeWhisperFact === "NONE" ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitReturningLifeWhisper();
                    }}
                  >
                    <label htmlFor="xinmai-returning-life-whisper">
                      告诉它，此刻什么正在靠近你
                    </label>
                    <textarea
                      id="xinmai-returning-life-whisper"
                      value={returningLifeWhisperText}
                      rows={1}
                      maxLength={120}
                      autoComplete="off"
                      placeholder="一句话，一个词，都可以"
                      aria-describedby="xinmai-returning-life-whisper-guidance"
                      onChange={(event) =>
                        setReturningLifeWhisperText(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (
                          !event.nativeEvent.isComposing &&
                          event.key === "Enter" &&
                          (event.metaKey || event.ctrlKey)
                        ) {
                          event.preventDefault();
                          submitReturningLifeWhisper();
                        }
                      }}
                    />
                    <small id="xinmai-returning-life-whisper-guidance">
                      只留在此刻，不会恢复成下一次现实
                    </small>
                    <div>
                      <button
                        type="button"
                        data-interaction="WHISPER_SKIPPED"
                        onClick={skipReturningLifeWhisper}
                      >
                        暂时不说
                      </button>
                      <button
                        type="submit"
                        data-interaction="WHISPER_SUBMITTED"
                        disabled={
                          returningLifeWhisperText.trim().length === 0
                        }
                      >
                        留给它
                      </button>
                    </div>
                  </form>
                ) : (
                  <div
                    className="gy-returning-life-world__whisper-settled"
                    role="status"
                    aria-live="polite"
                  >
                    <p>
                      {returningLifeWhisperFact === "WHISPER_SKIPPED"
                        ? "此刻不说，也可以。"
                        : returningLifeWhisperResponsePhase === "SETTLED"
                          ? "它听见了。这句话只留在此刻。"
                          : returningLifeWhisperResponsePhase ===
                              "UNAVAILABLE"
                            ? "这一次，它的回应没有完整显现。"
                          : "它正在听。"}
                    </p>
                    {returningLifeWhisperResponsePhase ===
                    "UNAVAILABLE" ? (
                      <div>
                        <button
                          type="button"
                          data-interaction="RETRY_STARBEAST_RESPONSE"
                          onClick={retryReturningLifeWhisperResponse}
                        >
                          再靠近一次
                        </button>
                        {returningLifeWhisperUnavailableContinuation ===
                        "NONE" ? (
                          <button
                            type="button"
                            data-interaction="CONTINUE_WITHOUT_CONFIRMED_RESPONSE"
                            onClick={
                              continueReturningLifeWithoutConfirmedResponse
                            }
                          >
                            这一次先继续同行
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                    {returningLifeWhisperRealityIntentReady ? (
                      <button
                        type="button"
                        data-interaction="RETURNING_REALITY_INTENT"
                        onClick={enterReturningNewReality}
                      >
                        和它一起进入新的现实
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
              ) : null}
              {returningRelationshipNaming.status !== "UNAVAILABLE" ? (
                <div
                  className="gy-returning-life-world__relationship-name-controls"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  {returningRelationshipNameEditing ? (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveReturningRelationshipName();
                      }}
                    >
                      <label htmlFor="xinmai-returning-relationship-name">
                        你们之间的称呼
                      </label>
                      <input
                        id="xinmai-returning-relationship-name"
                        type="text"
                        value={returningRelationshipNameDraft}
                        maxLength={
                          STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS *
                          2
                        }
                        autoComplete="off"
                        onChange={(event) =>
                          setReturningRelationshipNameDraft(
                            Array.from(event.target.value)
                              .slice(
                                0,
                                STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS,
                              )
                              .join(""),
                          )
                        }
                      />
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setReturningRelationshipNameFeedback(null);
                            setReturningRelationshipNameEditing(false)
                          }}
                        >
                          保持现在
                        </button>
                        <button
                          type="submit"
                          disabled={
                            returningRelationshipNameDraft.trim()
                              .length === 0
                          }
                        >
                          留下称呼
                        </button>
                      </div>
                      {returningRelationshipNaming.status ===
                      "AVAILABLE" ? (
                        <div>
                          <button
                            type="button"
                            onClick={clearReturningRelationshipName}
                          >
                            清空称呼
                          </button>
                          <button
                            type="button"
                            onClick={deleteReturningRelationshipName}
                          >
                            删除称呼记录
                          </button>
                        </div>
                      ) : null}
                      {returningRelationshipNameFeedback ===
                      "DELETE_UNCONFIRMED" ? (
                        <p role="status">
                          这个称呼还没有被删除，你可以稍后再试。
                        </p>
                      ) : null}
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={beginReturningRelationshipNameEdit}
                    >
                      {returningRelationshipNaming.status === "AVAILABLE"
                        ? "调整称呼"
                        : "给它一个称呼"}
                    </button>
                  )}
                  {returningRelationshipNamePersistence ===
                  "CURRENT_CYCLE_ONLY" ? (
                    <small>这个称呼暂时只留在此刻。</small>
                  ) : null}
                </div>
              ) : null}
              <em>星脉之境 · XINMAI</em>
            </div>
          </section>
        ) : null}
        <div className="visual-stage" aria-hidden="true">
          <div className={visualLayerClass("ENTRY", "entry-layer")} />
          <div className={visualLayerClass("NODE_1", "node1-layer")}>
            {showInternalNodeCopy ? "Node 1：镜面已激活" : null}
          </div>
          <div className={visualLayerClass("NODE_2", "node2-layer")}>
            {showInternalNodeCopy ? "Node 2：结构开始分离" : null}
          </div>
          <div className={visualLayerClass("HANDOFF", "handoff-layer")}>
            {showInternalNodeCopy ? (
              <>
                <span>结构已稳定</span>
                <small>进入你的当前状态</small>
              </>
            ) : null}
          </div>
        </div>
        {clickFlash && (
          <div
            className="click-flash"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "rgba(255,255,255,0.04)",
              animation: "guanyao-entry-click-flash 180ms ease forwards",
            }}
          />
        )}
        {SNAPSHOT_MODE && (
          <div className="snapshot-panel">
            <div className="snapshot-panel-note" aria-hidden="true">
              <strong>内部节点调试</strong>
              <span>生产路径请使用 /launch-lab?entryUser=new 或 /launch-lab?entryUser=old；四态预览追加 returnState=identity / reality / crystal / complete</span>
            </div>
            {snapshotTargets.map((target) => (
              <button key={target} type="button" onClick={() => debugGoTo(target)}>
                {target}
              </button>
            ))}
            <button type="button" onClick={nextSnapshot}>
              NEXT SNAPSHOT
            </button>
          </div>
        )}
        <style>{`
          .gy-returning-life-world {
            position: absolute;
            z-index: 0;
            inset: 0;
            overflow: hidden;
            background: #020306;
            isolation: isolate;
            pointer-events: none;
          }
          .gy-returning-life-world__imprint {
            position: absolute;
            z-index: 2;
            inset: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
            opacity: 0.34;
            transform-origin: 50% 48%;
            animation: gy-returning-life-imprint-breath 9.6s ease-in-out infinite;
            pointer-events: none;
          }
          .gy-returning-life-world__imprint-flow {
            opacity: 0.52;
          }
          .gy-returning-life-world__imprint-origin {
            opacity: 0.22;
          }
          .gy-returning-life-world__imprint-trace {
            transform-box: fill-box;
            transform-origin: center;
            animation: gy-returning-life-imprint-remember 8.8s ease-in-out infinite alternate;
          }
          [data-returning-life-temporal-state="REALITY_AND_CRYSTAL"]
            .gy-returning-life-world__imprint {
            opacity: 0.26;
          }
          .gy-returning-life-world__copy {
            position: absolute;
            z-index: 3;
            inset: 0;
            color: rgba(255, 247, 228, 0.94);
            font-family: ${SANS};
            pointer-events: none;
            text-shadow: 0 0 22px rgba(2, 3, 6, 0.92);
          }
          .gy-returning-life-world__cosmos-copy {
            position: absolute;
            top: 14.5%;
            right: 0;
            left: 0;
            display: grid;
            justify-items: center;
            gap: 5px;
            color: rgba(255, 247, 228, 0.46);
            font-size: min(14px, 3.6vw);
            font-weight: 580;
            line-height: 1.35;
          }
          .gy-returning-life-world__relationship-copy {
            position: absolute;
            right: 8%;
            bottom: 4.6%;
            left: 8%;
            display: grid;
            justify-items: center;
            text-align: center;
          }
          .gy-returning-life-world__relationship-copy strong {
            font-size: min(18px, 4.6vw);
            font-style: normal;
            font-weight: 650;
            line-height: 1.7;
          }
          .gy-returning-life-world__relationship-copy small {
            margin-top: 8px;
            color: rgba(232, 200, 138, 0.52);
            font-size: min(10px, 2.55vw);
            font-weight: 500;
            letter-spacing: 0.04em;
          }
          .gy-returning-life-world__relationship-copy
            .gy-returning-life-world__relationship-name {
            display: flex;
            align-items: baseline;
            gap: 0.55em;
            margin: 0 0 7px;
            color: rgba(201, 218, 216, 0.56);
            font-family: ${SANS};
            font-size: min(10px, 2.55vw);
          }
          .gy-returning-life-world__relationship-name b {
            color: rgba(255, 247, 228, 0.86);
            font-family: ${MONO};
            font-size: min(12px, 3vw);
            font-weight: 520;
            letter-spacing: 0.12em;
          }
          .gy-returning-life-world__whisper {
            display: grid;
            justify-items: center;
            width: min(78vw, 310px);
            margin-top: 14px;
            pointer-events: auto;
          }
          .gy-returning-life-world__whisper form {
            display: grid;
            justify-items: stretch;
            gap: 7px;
            width: 100%;
            padding: 10px 13px;
            border: 1px solid rgba(190, 220, 220, 0.14);
            border-radius: 16px;
            background: rgba(2, 6, 10, 0.76);
            backdrop-filter: blur(10px);
          }
          .gy-returning-life-world__whisper label {
            color: rgba(255, 247, 228, 0.78);
            font-size: min(12px, 3vw);
            font-weight: 590;
            letter-spacing: 0.03em;
          }
          .gy-returning-life-world__whisper textarea {
            box-sizing: border-box;
            width: 100%;
            min-height: 38px;
            max-height: 76px;
            resize: vertical;
            padding: 8px 3px 6px;
            border: 0;
            border-bottom: 1px solid rgba(190, 220, 220, 0.24);
            border-radius: 0;
            outline: none;
            color: rgba(255, 247, 228, 0.9);
            background: transparent;
            font: 500 min(12px, 3vw) ${SANS};
            line-height: 1.5;
            text-align: center;
          }
          .gy-returning-life-world__whisper textarea::placeholder {
            color: rgba(201, 218, 216, 0.34);
          }
          .gy-returning-life-world__whisper form > small {
            margin: 0;
            color: rgba(201, 218, 216, 0.42);
            font-size: min(9px, 2.25vw);
            line-height: 1.45;
          }
          .gy-returning-life-world__whisper form > div {
            display: flex;
            justify-content: center;
            gap: 18px;
          }
          .gy-returning-life-world__whisper button {
            min-height: 32px;
            padding: 5px 9px;
            border: 0;
            color: rgba(232, 220, 190, 0.7);
            background: transparent;
            font: 560 min(10px, 2.55vw) ${SANS};
            letter-spacing: 0.07em;
          }
          .gy-returning-life-world__whisper button:disabled {
            opacity: 0.34;
          }
          .gy-returning-life-world__whisper textarea:focus-visible,
          .gy-returning-life-world__whisper button:focus-visible {
            outline: 1px solid rgba(190, 220, 220, 0.42);
            outline-offset: 2px;
          }
          .gy-returning-life-world__whisper-settled {
            display: grid;
            justify-items: center;
            gap: 8px;
          }
          .gy-returning-life-world__whisper-settled p {
            margin: 0;
            color: rgba(201, 218, 216, 0.6);
            font-size: min(11px, 2.8vw);
            line-height: 1.6;
          }
          .gy-returning-life-world__whisper-settled > div {
            display: flex;
            justify-content: center;
            gap: 12px;
          }
          .gy-returning-life-world__whisper-settled button {
            color: rgba(255, 239, 190, 0.76);
          }
          .gy-returning-life-world__relationship-name-controls {
            display: grid;
            justify-items: center;
            gap: 6px;
            margin-top: 7px;
            pointer-events: auto;
          }
          .gy-returning-life-world__relationship-name-controls > button,
          .gy-returning-life-world__relationship-name-controls form button {
            min-height: 30px;
            padding: 4px 8px;
            border: 0;
            color: rgba(201, 218, 216, 0.54);
            background: transparent;
            font: 500 min(10px, 2.55vw) ${SANS};
            letter-spacing: 0.08em;
          }
          .gy-returning-life-world__relationship-name-controls form {
            display: grid;
            justify-items: center;
            gap: 5px;
            width: min(72vw, 286px);
            padding: 8px 12px;
            border: 1px solid rgba(190, 220, 220, 0.12);
            border-radius: 14px;
            background: rgba(2, 6, 10, 0.72);
          }
          .gy-returning-life-world__relationship-name-controls form label {
            color: rgba(201, 218, 216, 0.58);
            font-size: min(10px, 2.55vw);
          }
          .gy-returning-life-world__relationship-name-controls form input {
            box-sizing: border-box;
            width: 100%;
            min-height: 34px;
            padding: 5px 4px;
            border: 0;
            border-bottom: 1px solid rgba(190, 220, 220, 0.28);
            border-radius: 0;
            outline: none;
            color: rgba(255, 247, 228, 0.88);
            background: transparent;
            font: 500 min(12px, 3vw) ${SANS};
            letter-spacing: 0.08em;
            text-align: center;
          }
          .gy-returning-life-world__relationship-name-controls
            form
            button:focus-visible,
          .gy-returning-life-world__relationship-name-controls
            form
            input:focus-visible,
          .gy-returning-life-world__relationship-name-controls
            > button:focus-visible {
            outline: 1px solid rgba(190, 220, 220, 0.4);
            outline-offset: 2px;
          }
          .gy-returning-life-world__relationship-name-controls form div {
            display: flex;
            justify-content: center;
            gap: 10px;
          }
          .gy-returning-life-world__relationship-name-controls form p {
            margin: 1px 0 0;
            color: rgba(201, 218, 216, 0.46);
            font-size: min(9px, 2.3vw);
            line-height: 1.55;
          }
          .gy-returning-life-world__relationship-name-controls
            > small {
            margin: 0;
            color: rgba(201, 218, 216, 0.38);
            font-size: min(9px, 2.3vw);
          }
          .gy-returning-life-world__relationship-copy em {
            margin-top: 18px;
            color: rgba(232, 200, 138, 0.42);
            font-family: ${MONO};
            font-size: min(11px, 2.8vw);
            font-style: normal;
          }
          @keyframes gy-returning-life-imprint-breath {
            0%, 100% {
              transform: scale(0.998);
            }
            52% {
              transform: scale(1.002);
            }
          }
          @keyframes gy-returning-life-imprint-remember {
            from {
              opacity: 0.42;
              transform: scale(0.998);
            }
            to {
              opacity: 0.58;
              transform: scale(1.002);
            }
          }
          .visual-stage {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          .light-field {
            transform-origin: center center;
            transition:
              transform 520ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 520ms ease;
            will-change: transform, filter;
          }
          .gy-timeline-layer {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: rgba(255,247,228,0.94);
            font-family: ${SANS};
            font-weight: 700;
            font-size: min(20px, 5vw);
            text-align: center;
            letter-spacing: 0;
            opacity: 0;
            transform: translateY(6px) scale(0.99);
            filter: blur(0.8px);
            transition:
              opacity 420ms ease,
              transform 520ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 520ms ease,
              letter-spacing 520ms ease;
            will-change: opacity, transform, filter;
          }
          .gy-timeline-layer.on {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          .gy-timeline-layer.off {
            opacity: 0;
            transform: translateY(6px) scale(0.99);
            filter: blur(0.8px);
          }
          .snapshot-mode .gy-timeline-layer,
          .snapshot-mode .light-field {
            transition: none;
          }
          .entry-layer {
            opacity: 0;
          }
          .node1-layer,
          .node2-layer,
          .handoff-layer {
            top: auto;
            bottom: 18%;
            height: 18%;
            color: rgba(232,200,138,0.9);
          }
          .node1-layer.on {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
          .node1-layer.off {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
            filter: blur(2px);
          }
          .node2-layer.off {
            opacity: 0;
            transform: scale(1.025) translateY(-8px) skewX(-0.6deg);
            filter: blur(1.5px);
            letter-spacing: 0.02em;
          }
          .node2-layer.on {
            opacity: 1;
            transform: scale(1) translateY(0) skewX(0);
            filter: blur(0);
            letter-spacing: 0.04em;
          }
          .handoff-layer small {
            display: block;
            margin-top: 10px;
            color: rgba(232,200,138,0.78);
            font-size: min(14px, 3.6vw);
            font-weight: 600;
          }
          .snapshot-panel {
            position: fixed;
            left: 20px;
            bottom: 20px;
            z-index: 99999;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
            opacity: 0.8;
            pointer-events: auto;
            background: rgba(0,0,0,0.4);
            padding: 8px;
            border-radius: 6px;
          }
          .snapshot-panel-note {
            flex-basis: 100%;
            display: grid;
            gap: 2px;
            max-width: min(310px, calc(100vw - 56px));
            padding: 0 2px 4px;
            color: rgba(255,247,228,0.82);
            font-family: ${SANS};
            font-size: 11px;
            line-height: 1.35;
          }
          .snapshot-panel-note strong {
            color: rgba(232,200,138,0.94);
            font-size: 12px;
            letter-spacing: 0;
          }
          .snapshot-panel-note span {
            color: rgba(255,247,228,0.62);
          }
          .snapshot-panel button {
            border: 1px solid rgba(232,200,138,0.42);
            background: rgba(2,3,6,0.72);
            color: rgba(255,247,228,0.92);
            font-family: ${MONO};
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
          }
          @keyframes guanyao-entry-click-flash {
            from { opacity: 0.2; }
            to { opacity: 0; }
          }
        `}</style>
      </div>
    </GyMobilePreviewFrame>
  );
}
