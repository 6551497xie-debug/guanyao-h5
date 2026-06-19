// GUANYAO 2.0 = single axis-based interaction grammar system. 本屏角色：tap confirmation only（UI 决策层）。
//   场屏统一为 axis drag（纵=modulation / 横=progression）；tap 仅在本 UI 层用于选择/确认，不驱动场态。
// GUANYAO 2.0 = multi-page decision system with independent UI states and explicit user-driven navigation.
// Pressure Seed = simple decision interface for selecting one of three behavioral options and confirming selection.
// 锁定：纯 UI 决策流（点选→高亮→确认→跳转）；无 field/inertia/collapse/物理；轴线仅为视觉进度/对齐装饰。
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSession, setMotherCodeResult, setSelectedSceneSeed } from "../services/sessionService";
import {
  buildSelectedPressureSeedContext,
  getPressureSeedSceneTriplet,
  type GuanyaoPressureSeedTriplet,
} from "../services/guanyaoPressureSeedSceneBindingService";
import {
  buildTripleForceLandingResult,
  getTripleForceFrontStage,
} from "../services/guanyaoTripleForceLandingService";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId, SceneSeed } from "../types";
import type { GuanyaoAgeSegment, GuanyaoPressureSeed } from "../types/guanyaoPressureSeed";

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];

const optionLabels = [
  "Option 1｜原力（流动）",
  "Option 2｜保护（缓和）",
  "Option 3｜误用（转身离开）",
] as const;

type PressureSeedCandidate = {
  id: string;
  surface: string;
  shell: string;
  seed: GuanyaoPressureSeed;
  seedIndex: SceneSeed["seedIndex"];
};

function readYuanCodeKey(session: GuanyaoSession): IdentityFragment["yuanCodeKey"] | undefined {
  const candidate =
    session.identityFragment?.yuanCodeKey ??
    session.selectedFragment?.yuanCodeKey ??
    session.yuanCode?.trigramKey ??
    session.chronoCode?.trigramKey ??
    session.chronoPrototypeCard?.trigramId;

  return yuanCodeKeys.includes(candidate as IdentityFragment["yuanCodeKey"])
    ? (candidate as IdentityFragment["yuanCodeKey"])
    : undefined;
}

function readLifeStageId(session: GuanyaoSession): IdentityLifeStageId | undefined {
  const identityLifeStage = session.identityFragment?.lifeStageId ?? session.selectedFragment?.lifeStageId;
  if (identityLifeStage) {
    return identityLifeStage;
  }

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
      return undefined;
  }
}

function readPressureSeedAgeSegment(session: GuanyaoSession): GuanyaoAgeSegment | undefined {
  const lifeStageId = readLifeStageId(session);

  if (lifeStageId === "18_22") return "YOUTH";
  if (lifeStageId === "23_31") return "ESTABLISHING";
  if (lifeStageId === "32_42") return "MID_LIFE";
  if (lifeStageId === "43_55") return "RESTRUCTURING";
  return undefined;
}

function buildPressureSeedCandidatesFromTriplet(pressureSeedTriplet: GuanyaoPressureSeedTriplet): PressureSeedCandidate[] {
  return pressureSeedTriplet.frontStage
    .map((frontStageSeed, index) => {
      const seed = pressureSeedTriplet.seeds.find((candidate) => candidate.id === frontStageSeed.id) ?? pressureSeedTriplet.seeds[index];

      return {
        id: frontStageSeed.id,
        surface: frontStageSeed.surface,
        shell: frontStageSeed.shell,
        seed,
        seedIndex: (index + 1) as SceneSeed["seedIndex"],
      };
    })
    .filter((candidate): candidate is PressureSeedCandidate => Boolean(candidate.seed));
}

function toLegacySceneSeed(
  seed: GuanyaoPressureSeed,
  session: GuanyaoSession,
  seedIndex: SceneSeed["seedIndex"],
): SceneSeed {
  return {
    id: seed.id,
    sourceYuanCodeId: session.yuanCode?.id ?? "r8-pressure-seed",
    yuanCodeKey: readYuanCodeKey(session) ?? "dui",
    lifeStageId: readLifeStageId(session) ?? "32_42",
    sourceIdentityFragmentId: session.identityFragment?.id ?? session.selectedFragment?.id ?? "r8-pressure-seed",
    pressureLayerId: seed.pressureField.toLowerCase(),
    pressureLayerLabel: "现实压力种子",
    seedGroupId: seed.matrixCode,
    seedIndex,
    title: seed.surface,
    seedLine: seed.shell,
    realitySnapshot: seed.surface,
    behaviorInertia: seed.shell,
    gravityHook: seed.mappingHint,
    bodySignalHint: seed.shell,
    thematicField: seed.tags,
    motherCodeBiasTags: [seed.matrixCode],
    yaoCodeBiasTags: [seed.pressureNature],
    intensity: 3,
    forbiddenToneTags: [],
  };
}

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const pressureSeedCandidates = useMemo(() => {
    const pressureSeedTriplet = getPressureSeedSceneTriplet({
      ageSegment: readPressureSeedAgeSegment(session),
    });

    return buildPressureSeedCandidatesFromTriplet(pressureSeedTriplet);
  }, [session]);
  const visiblePressureSeeds = pressureSeedCandidates.slice(0, 3);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | undefined>();
  const selectedCandidate = visiblePressureSeeds.find((candidate) => candidate.id === selectedCandidateId);
  const selectedIndex = visiblePressureSeeds.findIndex((candidate) => candidate.id === selectedCandidate?.id);

  function onOptionClick(candidate: PressureSeedCandidate) {
    setSelectedCandidateId(candidate.id);
  }

  function onConfirmClick(candidate: PressureSeedCandidate | undefined) {
    if (!candidate) return;

    const selectedPressureSeedContext = buildSelectedPressureSeedContext(candidate.seed);
    const tripleForceLandingResult = buildTripleForceLandingResult(selectedPressureSeedContext);
    const tripleForceFrontStage = getTripleForceFrontStage(tripleForceLandingResult);
    const legacySceneSeed = toLegacySceneSeed(candidate.seed, getSession(), candidate.seedIndex);

    window.localStorage.setItem("guanyao:selectedPressureSeedContext", JSON.stringify(selectedPressureSeedContext));
    window.localStorage.setItem("guanyao:tripleForceLandingResult", JSON.stringify(tripleForceLandingResult));
    window.localStorage.setItem("guanyao:tripleForceFrontStage", JSON.stringify(tripleForceFrontStage));
    window.localStorage.setItem("guanyao:selectedPressureSeedId", candidate.seed.id);
    window.localStorage.setItem("guanyao:selectedPressureSliceId", candidate.seed.id);
    window.localStorage.setItem("guanyao:selectedPressureSliceText", candidate.seed.surface);
    setSelectedSceneSeed(legacySceneSeed);
    setMotherCodeResult(buildMotherCodeResult(getSession()));
    navigate(GUANYAO_ROUTES.pressureExposure);
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "min(100%, 520px)",
        margin: "0 auto",
        boxSizing: "border-box",
        padding: "48px 20px calc(44px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        background:
          "radial-gradient(circle at 50% 20%, rgba(0,184,212,0.08), transparent 36%), linear-gradient(180deg, #050607 0%, #020303 100%)",
        color: "rgba(246,243,236,0.88)",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <header style={{ display: "grid", gap: 10 }}>
        <span
          style={{
            color: "rgba(246,243,236,0.48)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 12,
            letterSpacing: "0.16em",
          }}
        >
          03｜当前压力
        </span>
        <h1
          style={{
            margin: 0,
            color: "rgba(246,243,236,0.9)",
            fontSize: "clamp(30px, 8vw, 42px)",
            lineHeight: 1.12,
            fontWeight: 380,
            letterSpacing: "0.04em",
          }}
        >
          此刻，什么正在压住你？
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(246,243,236,0.62)",
            fontSize: 15,
            lineHeight: 1.68,
            letterSpacing: "0.04em",
          }}
        >
          不用犹豫。
          <br />
          选那个让你停了一下的。
        </p>
      </header>

      <section
        aria-label="当前压力种子选项"
        style={{
          display: "grid",
          gap: 12,
          padding: "14px 0",
          borderTop: "1px solid rgba(246,243,236,0.12)",
          borderBottom: "1px solid rgba(246,243,236,0.08)",
        }}
      >
        {visiblePressureSeeds.map((candidate, index) => {
          const isSelected = candidate.id === selectedCandidate?.id;

          return (
            <button
              key={candidate.id}
              type="button"
              onClick={() => onOptionClick(candidate)}
              style={{
                width: "100%",
                minHeight: 118,
                padding: "15px 2px 15px 0",
                border: 0,
                borderTop: "1px solid rgba(246,243,236,0.08)",
                borderBottom: isSelected ? "1px solid rgba(0,184,212,0.34)" : "1px solid rgba(246,243,236,0.07)",
                background: isSelected ? "linear-gradient(90deg, rgba(0,184,212,0.08), transparent 70%)" : "transparent",
                color: "inherit",
                display: "grid",
                gap: 8,
                textAlign: "left",
                opacity: isSelected ? 1 : 0.62,
                cursor: "pointer",
                transition: "border-color 180ms ease, background 180ms ease, opacity 180ms ease",
              }}
            >
              <span
                style={{
                  color: isSelected ? "rgba(0,184,212,0.82)" : "rgba(246,243,236,0.42)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                {optionLabels[index] ?? `Option ${index + 1}`}
              </span>
              <strong
                style={{
                  color: isSelected ? "rgba(246,243,236,0.94)" : "rgba(246,243,236,0.74)",
                  fontSize: 20,
                  lineHeight: 1.28,
                  fontWeight: 360,
                }}
              >
                {candidate.surface}
              </strong>
              <span
                style={{
                  color: "rgba(246,243,236,0.48)",
                  fontSize: 13,
                  lineHeight: 1.58,
                }}
              >
                - {candidate.shell}
              </span>
            </button>
          );
        })}
      </section>

      <div
        aria-hidden="true"
        style={{ position: "relative", height: 22, margin: "2px 0" }}
      >
        <span style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(246,243,236,0.16)" }} />
        {visiblePressureSeeds.map((candidate, i) => {
          const reached = selectedIndex >= 0 && i <= selectedIndex;
          const isCurrent = i === selectedIndex;
          const x = visiblePressureSeeds.length > 1 ? (i / (visiblePressureSeeds.length - 1)) * 100 : 50;
          return (
            <span
              key={candidate.id}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: "50%",
                width: isCurrent ? 9 : 7,
                height: isCurrent ? 9 : 7,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                background: isCurrent ? "#00b8d4" : reached ? "rgba(0,184,212,0.5)" : "rgba(246,243,236,0.26)",
                boxShadow: isCurrent ? "0 0 12px rgba(0,184,212,0.55)" : "none",
                transition: "background 180ms ease",
              }}
            />
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selectedCandidate}
        onClick={() => onConfirmClick(selectedCandidate)}
        style={{
          width: "100%",
          minHeight: 48,
          border: "1px solid rgba(0,184,212,0.34)",
          background: selectedCandidate ? "rgba(0,184,212,0.08)" : "rgba(246,243,236,0.04)",
          color: selectedCandidate ? "rgba(246,243,236,0.86)" : "rgba(246,243,236,0.36)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          letterSpacing: "0.12em",
          cursor: selectedCandidate ? "pointer" : "default",
        }}
      >
        确认这一粒压力种子
      </button>
    </main>
  );
}
