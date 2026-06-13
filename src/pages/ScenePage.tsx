import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSession, setMotherCodeResult, setSelectedSceneSeed } from "../services/sessionService";
import {
  buildSelectedPressureSeedContext,
  getPressureSeedSceneTriplet,
} from "../services/guanyaoPressureSeedSceneBindingService";
import {
  buildTripleForceLandingResult,
  getTripleForceFrontStage,
} from "../services/guanyaoTripleForceLandingService";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId, SceneSeed } from "../types";
import type { GuanyaoPressureSeed } from "../types/guanyaoPressureSeed";

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];

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

function buildPressureSeedCandidates(session: GuanyaoSession): PressureSeedCandidate[] {
  const lifeStageId = readLifeStageId(session);
  const pressureSeedTriplet = getPressureSeedSceneTriplet({
    ageSegment:
      lifeStageId === "18_22"
        ? "YOUTH"
        : lifeStageId === "23_31"
          ? "ESTABLISHING"
          : lifeStageId === "32_42"
            ? "MID_LIFE"
            : lifeStageId === "43_55"
              ? "RESTRUCTURING"
              : undefined,
  });

  return pressureSeedTriplet.frontStage.map((frontStageSeed, index) => {
    const seed = pressureSeedTriplet.seeds.find((candidate) => candidate.id === frontStageSeed.id) ?? pressureSeedTriplet.seeds[index];

    return {
      id: frontStageSeed.id,
      surface: frontStageSeed.surface,
      shell: frontStageSeed.shell,
      seed,
      seedIndex: (index + 1) as SceneSeed["seedIndex"],
    };
  }).filter((candidate): candidate is PressureSeedCandidate => Boolean(candidate.seed));
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
  const pressureSeedCandidates = useMemo(() => buildPressureSeedCandidates(session), [session]);
  const [isIntercepted, setIsIntercepted] = useState(false);

  function handlePressurizeSeed(candidate: PressureSeedCandidate) {
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
          03｜现实压力种子
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
          现实压力种子
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
          选择一个正在发生的现实压力。
          <br />
          系统会把它压入本局压力场。
        </p>
      </header>

      <section
        aria-label="现实压力种子候选"
        style={{
          display: "grid",
          gap: 12,
          padding: "14px 0",
          borderTop: "1px solid rgba(246,243,236,0.12)",
          borderBottom: "1px solid rgba(246,243,236,0.08)",
        }}
      >
        <span
          style={{
            color: isIntercepted ? "rgba(0,184,212,0.68)" : "rgba(246,243,236,0.38)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 11,
            letterSpacing: "0.13em",
          }}
        >
          {isIntercepted ? "点击种子，直接填装。" : "现实压力种子池扫描中。"}
        </span>

        <div
          style={{
            display: "grid",
            gap: 10,
            paddingBottom: 12,
          }}
        >
          {pressureSeedCandidates.map((candidate) => {
            return (
              <button
                key={candidate.id}
                type="button"
                disabled={!isIntercepted}
                onClick={() => handlePressurizeSeed(candidate)}
                style={{
                  width: "100%",
                  minHeight: 118,
                  padding: "15px 2px 15px 0",
                  border: 0,
                  borderTop: "1px solid rgba(246,243,236,0.08)",
                  borderBottom: isIntercepted ? "1px solid rgba(0,184,212,0.18)" : "1px solid rgba(246,243,236,0.07)",
                  background: isIntercepted ? "linear-gradient(90deg, rgba(0,184,212,0.045), transparent 68%)" : "transparent",
                  color: "inherit",
                  display: "grid",
                  gap: 8,
                  textAlign: "left",
                  opacity: isIntercepted ? 1 : 0.58,
                  cursor: isIntercepted ? "pointer" : "default",
                  transition: "border-color 180ms ease, background 180ms ease, opacity 180ms ease",
                }}
              >
                <span
                  style={{
                    color: isIntercepted ? "rgba(0,184,212,0.78)" : "rgba(246,243,236,0.4)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                  }}
                >
                  现实压力种子
                </span>
                <strong
                  style={{
                    color: isIntercepted ? "rgba(246,243,236,0.92)" : "rgba(246,243,236,0.74)",
                    fontSize: 19,
                    lineHeight: 1.28,
                    fontWeight: 360,
                  }}
                >
                  {candidate.surface}
                </strong>
                <span
                  style={{
                    color: "rgba(246,243,236,0.6)",
                    fontSize: 14,
                    lineHeight: 1.58,
                  }}
                >
                  {candidate.shell}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {isIntercepted ? (
        <p
          style={{
            margin: 0,
            color: "rgba(246,243,236,0.46)",
            fontSize: 13,
            lineHeight: 1.6,
            textAlign: "center",
            letterSpacing: "0.06em",
          }}
        >
          点击种子，直接填装。
        </p>
      ) : (
        <CausalRail
          statusLabel="拦截这一幕"
          rightHint="右滑拦截现实压力切片"
          onRight={() => setIsIntercepted(true)}
        />
      )}
    </main>
  );
}
