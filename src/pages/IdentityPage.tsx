import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { identityFragments } from "../data/identityFragments";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getDemoPressureExposureOptions } from "../services/guanyaoInteractionService";
import {
  buildSelectedPressureSeedContext,
  getPressureSeedSceneTriplet,
  type GuanyaoSelectedPressureSeedContext,
} from "../services/guanyaoPressureSeedSceneBindingService";
import {
  buildTripleForceLandingResult,
  getTripleForceFrontStage,
  type GuanyaoTripleForceFrontStage,
} from "../services/guanyaoTripleForceLandingService";
import { getSession, updateSession } from "../services/sessionService";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId } from "../types";

const SELECTED_PRESSURE_EXPOSURE_KEY = "guanyao:selectedPressureExposureId";
const USE_PRESSURE_EXPOSURE_SAFE_SHELL = true;

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];

function readYuanCodeKey(session: GuanyaoSession): IdentityFragment["yuanCodeKey"] | null {
  const candidate =
    session.yuanCode?.trigramKey ??
    session.chronoCode?.trigramKey ??
    session.chronoPrototypeCard?.trigramId;

  return yuanCodeKeys.includes(candidate as IdentityFragment["yuanCodeKey"])
    ? (candidate as IdentityFragment["yuanCodeKey"])
    : null;
}

function readLifeStageId(session: GuanyaoSession): IdentityLifeStageId | null {
  switch (session.chronoProfile?.ageRange) {
    case "18_22":
      return "18_22";
    case "23_31":
      return "23_31";
    case "32_39":
      return "32_42";
    case "40_52":
    case "53_plus":
      return "43_55";
    default:
      return null;
  }
}

function readIdentityPool(session: GuanyaoSession) {
  const yuanCodeKey = readYuanCodeKey(session);
  const lifeStageId = readLifeStageId(session);

  if (yuanCodeKey && lifeStageId) {
    const matchedFragments = identityFragments.filter(
      (fragment) => fragment.yuanCodeKey === yuanCodeKey && fragment.lifeStageId === lifeStageId,
    );

    if (matchedFragments.length > 0) {
      return matchedFragments;
    }
  }

  console.warn("Identity fallback: missing yuanCode or lifeStage, using the first available fragment group.");
  const fallbackKey = identityFragments[0]?.yuanCodeKey;
  const fallbackStage = identityFragments[0]?.lifeStageId;

  return identityFragments.filter(
    (fragment) => fragment.yuanCodeKey === fallbackKey && fragment.lifeStageId === fallbackStage,
  );
}

function readJsonFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function isTripleForceFrontStage(value: GuanyaoTripleForceFrontStage | null): value is GuanyaoTripleForceFrontStage {
  return Boolean(
    value &&
      Array.isArray(value.ritualLines) &&
      value.ritualLines.length > 0 &&
      Array.isArray(value.readouts) &&
      value.readouts.length > 0 &&
      value.readouts.every((readout) => readout.label && readout.frontStageLine),
  );
}

function buildFallbackTripleForceFrontStage(): GuanyaoTripleForceFrontStage {
  const triplet = getPressureSeedSceneTriplet();
  const seed = triplet.seeds[0];

  if (!seed) {
    return {
      selectedPressureSeedId: "pressure-seed-pending",
      ritualLines: ["现实种子已冻结。", "压力读数正在成形。", "卦场落位中。", "因果入口已打开。"],
      readouts: [
        { label: "现实种子", frontStageLine: "现实种子已冻结。" },
        { label: "压力读数", frontStageLine: "压力读数正在成形。" },
        { label: "卦场落位", frontStageLine: "卦场落位中，因果入口正在打开。" },
      ],
    };
  }

  // Fallback only: used when the user enters pressure exposure without a selected pressure seed.
  const selectedContext = buildSelectedPressureSeedContext(seed);
  const tripleForceResult = buildTripleForceLandingResult(selectedContext);

  return getTripleForceFrontStage(tripleForceResult);
}

function formatTripleForceReadout(line: string): string {
  if (line.includes("压力读数正在成形")) return "压力读数已捕获。";
  if (line.includes("卦场落位中")) return "卦场开始落位。";
  return line;
}

function PressureExposureSafeShell() {
  const navigate = useNavigate();
  const tripleForceFrontStage = useMemo(() => {
    const storedFrontStage = readJsonFromStorage<GuanyaoTripleForceFrontStage>("guanyao:tripleForceFrontStage");
    if (isTripleForceFrontStage(storedFrontStage)) {
      return storedFrontStage;
    }

    const selectedContext = readJsonFromStorage<GuanyaoSelectedPressureSeedContext>("guanyao:selectedPressureSeedContext");
    if (selectedContext) {
      const tripleForceResult = buildTripleForceLandingResult(selectedContext);
      const rebuiltFrontStage = getTripleForceFrontStage(tripleForceResult);

      if (isTripleForceFrontStage(rebuiltFrontStage)) {
        return rebuiltFrontStage;
      }
    }

    return buildFallbackTripleForceFrontStage();
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "50px 20px calc(42px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        background: "#050607",
        color: "#f5f5f5",
        overflowX: "hidden",
      }}
    >
      <span
        style={{
          color: "rgba(0, 184, 212, 0.78)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          letterSpacing: "0.16em",
        }}
      >
        04｜压力显影
      </span>
      <section
        style={{
          display: "grid",
          gap: 12,
          padding: "16px 0",
          borderTop: "1px solid rgba(0,184,212,0.2)",
          borderBottom: "1px solid rgba(85,85,85,0.46)",
        }}
      >
        <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 17, lineHeight: 1.65 }}>
          压力种子，装填完毕。
        </p>
        <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.72 }}>
          它不是一个事件。
          <br />
          它是一股正在牵引你的现实压力。
        </p>
        <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 16, lineHeight: 1.65 }}>
          三力已落位，因果链正在收紧。
        </p>
      </section>

      <section
        aria-label="三力碰撞显影区"
        style={{
          display: "grid",
          gap: 18,
          padding: "20px 0",
          borderTop: "1px solid rgba(85,85,85,0.42)",
          borderBottom: "1px solid rgba(85,85,85,0.3)",
          background:
            "linear-gradient(90deg, rgba(0,184,212,0.055), transparent 72%), radial-gradient(circle at 50% 28%, rgba(0,184,212,0.075), transparent 58%)",
        }}
      >
        <span
          style={{
            color: "rgba(0,184,212,0.78)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
          }}
        >
          [ 三力落位 ]
        </span>

        <div style={{ display: "grid", gap: 14 }}>
          {tripleForceFrontStage.readouts.map((readout, index) => (
            <div key={readout.label} style={{ display: "grid", gap: 7 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(245,245,245,0.48)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.11em",
                }}
              >
                <span>{readout.label}</span>
                <span>{String(index + 1).padStart(2, "0")} / 03</span>
              </div>
              <div style={{ position: "relative", height: 1, background: "rgba(246,243,236,0.18)" }}>
                <span
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: `${((index + 1) / tripleForceFrontStage.readouts.length) * 100}%`,
                    background: "rgba(0,184,212,0.82)",
                    boxShadow: "0 0 12px rgba(0,184,212,0.35)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: `${((index + 1) / tripleForceFrontStage.readouts.length) * 100}%`,
                    width: 7,
                    height: 7,
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    background: "rgba(0,184,212,0.95)",
                    boxShadow: "0 0 14px rgba(0,184,212,0.45)",
                  }}
                />
              </div>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 13, lineHeight: 1.62 }}>
                {formatTripleForceReadout(readout.frontStageLine)}
              </p>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, color: "rgba(245,245,245,0.58)", fontSize: 14, lineHeight: 1.62 }}>
          三力已落位，因果链正在收紧。
        </p>
      </section>

      <span
        style={{
          color: "rgba(245,245,245,0.34)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 11,
          letterSpacing: "0.13em",
        }}
      >
        TRIPLE_FORCE_LANDING
      </span>

      <CausalRail
        statusLabel="三力已落位，因果链正在收紧"
        rightHint="右滑进入五爻传动"
        onRight={() => navigate(GUANYAO_ROUTES.dynamics)}
      />
    </main>
  );
}

export function IdentityPage() {
  if (USE_PRESSURE_EXPOSURE_SAFE_SHELL) {
    return <PressureExposureSafeShell />;
  }

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShifting, setIsShifting] = useState(false);
  const [motionPhase, setMotionPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [selectedExposureId, setSelectedExposureId] = useState(() => {
    return window.localStorage.getItem(SELECTED_PRESSURE_EXPOSURE_KEY) ?? "hide-collapse";
  });
  const shiftTimerRef = useRef<number | null>(null);
  const motionTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const session = getSession();
  const pressureExposureOptions = useMemo(() => getDemoPressureExposureOptions(), []);
  const selectedExposure =
    pressureExposureOptions.find((option) => option.id === selectedExposureId) ??
    pressureExposureOptions.find((option) => option.id === "hide-collapse") ??
    pressureExposureOptions[0];
  const fragmentPool = useMemo(() => readIdentityPool(session), [session]);
  const currentFragment = fragmentPool[activeIndex % fragmentPool.length] ?? identityFragments[0];
  const sliceIndex = (activeIndex % fragmentPool.length) + 1;
  const sliceTotal = fragmentPool.length;
  const sliceProgress = sliceTotal > 1 ? ((sliceIndex - 1) / (sliceTotal - 1)) * 100 : 50;
  const sliceMarks = Array.from({ length: sliceTotal }, (_, index) =>
    sliceTotal > 1 ? (index / (sliceTotal - 1)) * 100 : 50,
  );
  const fragmentCopy = {
    title: currentFragment.fragmentLine,
    lines: currentFragment.systemPerspective,
  };
  const dissectionLines = [
    currentFragment.shadowInertia,
    currentFragment.misrecognitionPattern,
  ].filter(Boolean);

  useEffect(() => {
    document.body.classList.add("gy-identity-r2-mode");
    return () => {
      document.body.classList.remove("gy-identity-r2-mode");
      if (shiftTimerRef.current) {
        window.clearTimeout(shiftTimerRef.current);
      }
      if (motionTimerRef.current) {
        window.clearTimeout(motionTimerRef.current);
      }
      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  function handleNext() {
    if (motionTimerRef.current) {
      window.clearTimeout(motionTimerRef.current);
    }
    if (enterTimerRef.current) {
      window.clearTimeout(enterTimerRef.current);
    }
    setIsShifting(true);
    setMotionPhase("exit");
    if (shiftTimerRef.current) {
      window.clearTimeout(shiftTimerRef.current);
    }
    shiftTimerRef.current = window.setTimeout(() => setIsShifting(false), 300);
    motionTimerRef.current = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % fragmentPool.length);
      setMotionPhase("enter");
      enterTimerRef.current = window.setTimeout(() => setMotionPhase("idle"), 90);
      navigator.vibrate?.(10);
    }, 120);
  }

  function handleConfirm() {
    window.localStorage.setItem(SELECTED_PRESSURE_EXPOSURE_KEY, selectedExposure?.id ?? "hide-collapse");
    updateSession({
      identityFragment: currentFragment,
      selectedFragment: currentFragment,
      autoYaoPath: [],
      sixthYaoChoice: null,
      finalChoiceCode: "",
      choiceHistory: [],
    });
  }

  function handleSelectExposure(optionId: string, shouldContinue = false) {
    setSelectedExposureId(optionId);
    window.localStorage.setItem(SELECTED_PRESSURE_EXPOSURE_KEY, optionId);
    if (shouldContinue) {
      navigate(GUANYAO_ROUTES.dynamics);
    }
  }

  return (
    <GuanyaoShell className="gy-identity-shell" density="compact">
      <section className="gy-front-screen gy-front-instrument gy-identity-screen gy-identity-r2" data-intensity="quiet">
        <header className="gy-identity-r2-header gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 02 / PRESSURE_EXPOSURE
          </GuanyaoText>
          <GuanyaoText className="gy-identity-r2-status" as="span" size="eyebrow" tone="faint">
            压力显影确认
          </GuanyaoText>
        </header>

          <main className={`gy-identity-dual-cabin gyFadeRise${isShifting ? " is-shifting" : ""}`}>
          <aside
            className="gy-identity-slice-rail"
            aria-label="压力显影候选滑轨"
            style={{ "--gy-slice-progress": `${sliceProgress}%` } as CSSProperties}
          >
            <div className="gy-identity-slice-meta">
              <span>SLICE_{String(sliceIndex).padStart(2, "0")}</span>
              <span>TOTAL_{String(sliceTotal).padStart(2, "0")}</span>
            </div>
            <div className="gy-identity-vertical-track" aria-hidden="true">
              {sliceMarks.map((mark, index) => (
                <span
                  className="gy-identity-track-mark"
                  key={`slice-mark-${index}`}
                  style={{ "--gy-slice-mark": `${mark}%` } as CSSProperties}
                />
              ))}
              <span className={`gy-identity-track-point${isShifting ? " is-shifting" : ""}`} />
            </div>
          </aside>

          <section className={`gy-identity-data-flow is-${motionPhase}`} aria-label="压力显影数据流">
            <div className="gy-identity-fragment-core">
              <GuanyaoText className="gy-identity-r2-label" as="span" size="eyebrow" tone="faint">
                压力显影候选
              </GuanyaoText>
              <GuanyaoText className="gy-identity-r2-fragment" as="h2" size="title">
                {selectedExposure?.sentence ?? fragmentCopy.title}
              </GuanyaoText>
            </div>

            <div className="gy-identity-r2-void" aria-hidden="true" />

            <div className="gy-identity-r2-dissection">
              <GuanyaoText as="p" size="body" tone="muted">
                这个压力正在把你照向哪一种旧反应？
              </GuanyaoText>
              <div className="gy-identity-exposure-options" aria-label="压力显影候选">
                {pressureExposureOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    data-active={option.id === selectedExposure?.id}
                    onClick={() => handleSelectExposure(option.id, true)}
                  >
                    <span>{option.label}</span>
                    <strong>{option.sentence}</strong>
                  </button>
                ))}
              </div>
              {dissectionLines.map((line) => (
                <GuanyaoText key={line} as="p" size="body" tone="muted">
                  {line}
                </GuanyaoText>
              ))}
            </div>
          </section>
        </main>

        <footer className="gy-identity-action-zone gyFadeRise">
          <div className="gy-identity-binary-rail" aria-label="压力显影二元拨码闸门">
            <button className="gy-identity-binary-action gy-identity-binary-action--drift" type="button" onClick={handleNext}>
              <span>0 · 换一个显影</span>
            </button>
            <span className="gy-identity-binary-pointer" aria-hidden="true" />
            <Link className="gy-identity-binary-action gy-identity-binary-action--claim" to={GUANYAO_ROUTES.dynamics} onClick={handleConfirm}>
              <span>1 · 进入人格行为动力学演化</span>
            </Link>
          </div>
          <p className="gy-identity-binary-hint">
            这个压力正在把你照向哪一种旧反应
          </p>
        </footer>
      </section>
    </GuanyaoShell>
  );
}
