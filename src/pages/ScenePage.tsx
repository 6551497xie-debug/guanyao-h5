import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { sceneSeeds } from "../data/sceneSeeds";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSceneSeedGroup } from "../services/sceneSeedService";
import { getSession, setMotherCodeResult, setSelectedSceneSeed, updateSession } from "../services/sessionService";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId, SceneSeed } from "../types";

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];

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

type SceneFlowState = "flowing" | "frozen" | "selected";

type SceneSeedSceneGroup = {
  seedGroupId: string;
  pressureLayerId: string;
  pressureLayerLabel: string;
  seeds: SceneSeed[];
};

const requiredSceneSeedIndexes: SceneSeed["seedIndex"][] = [1, 2, 3];

function normalizeSceneSeedGroup(seeds: SceneSeed[]): SceneSeedSceneGroup | null {
  const orderedSeeds = [...seeds].sort((a, b) => a.seedIndex - b.seedIndex).slice(0, 3);
  const [firstSeed] = orderedSeeds;

  if (!firstSeed || orderedSeeds.length !== 3) {
    return null;
  }

  const hasRequiredIndexes = requiredSceneSeedIndexes.every((index) =>
    orderedSeeds.some((seed) => seed.seedIndex === index),
  );
  const hasOneGroup = orderedSeeds.every((seed) => seed.seedGroupId === firstSeed.seedGroupId);
  const hasOnePressureLayer = orderedSeeds.every((seed) => seed.pressureLayerId === firstSeed.pressureLayerId);

  if (!hasRequiredIndexes || !hasOneGroup || !hasOnePressureLayer) {
    return null;
  }

  return {
    seedGroupId: firstSeed.seedGroupId,
    pressureLayerId: firstSeed.pressureLayerId,
    pressureLayerLabel: firstSeed.pressureLayerLabel,
    seeds: orderedSeeds,
  };
}

function collectSceneSeedGroups(candidates: SceneSeed[]): SceneSeedSceneGroup[] {
  const groupIds = [...new Set(candidates.map((seed) => seed.seedGroupId))];

  return groupIds
    .map((groupId) => normalizeSceneSeedGroup(candidates.filter((seed) => seed.seedGroupId === groupId)))
    .filter((group): group is SceneSeedSceneGroup => Boolean(group));
}

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const yuanCodeKey = readYuanCodeKey(session);
  const lifeStageId = readLifeStageId(session);
  const identityFragmentId = session.identityFragment?.id ?? session.selectedFragment?.id;
  const seedGroupFallback = useMemo(
    () =>
      getSceneSeedGroup({
        yuanCodeKey,
        lifeStageId,
        identityFragmentId,
      }),
    [identityFragmentId, lifeStageId, yuanCodeKey],
  );
  const sceneGroups = useMemo(() => {
    const exactGroups = identityFragmentId
      ? collectSceneSeedGroups(sceneSeeds.filter((seed) => seed.sourceIdentityFragmentId === identityFragmentId))
      : [];
    const yuanLifeStageGroups =
      yuanCodeKey && lifeStageId
        ? collectSceneSeedGroups(sceneSeeds.filter((seed) => seed.yuanCodeKey === yuanCodeKey && seed.lifeStageId === lifeStageId))
        : [];
    const yuanGroups = yuanCodeKey
      ? collectSceneSeedGroups(sceneSeeds.filter((seed) => seed.yuanCodeKey === yuanCodeKey))
      : [];
    const fallbackGroup = normalizeSceneSeedGroup(seedGroupFallback.seeds);

    return exactGroups.length > 0
      ? exactGroups
      : yuanLifeStageGroups.length > 0
        ? yuanLifeStageGroups
        : yuanGroups.length > 0
          ? yuanGroups
          : fallbackGroup
            ? [fallbackGroup]
            : [];
  }, [identityFragmentId, lifeStageId, seedGroupFallback.seeds, yuanCodeKey]);
  const [currentSceneGroupIndex, setCurrentSceneGroupIndex] = useState(0);
  const [flowState, setFlowState] = useState<SceneFlowState>("flowing");
  const [selectedSeedId, setSelectedSeedId] = useState<string | null>(null);
  const seedGroup = sceneGroups[currentSceneGroupIndex] ?? sceneGroups[0] ?? seedGroupFallback;
  const selectedSeed = seedGroup.seeds.find((seed) => seed.id === selectedSeedId) ?? null;
  const isLocked = flowState !== "flowing";
  const isSelected = flowState === "selected" && Boolean(selectedSeed);
  const sliceSource = sceneGroups.length > 1 ? "sceneGroupFlow" : seedGroupFallback.matchedBy;
  const sceneGroupOrdinal = sceneGroups.length > 1 ? `第 ${currentSceneGroupIndex + 1} 幕` : "当前这一幕";
  const sceneTitle =
    flowState === "flowing"
      ? "哪一幕　正在发生"
      : flowState === "frozen"
        ? "这一幕已截停"
        : "现实引力已捕获";
  const sceneStatus =
    flowState === "flowing"
      ? "三枚现实种子正在组成同一幕"
      : flowState === "frozen"
        ? "这一幕里的三枚现实入口已冻结"
        : "现实入口已锁定";
  const capturedLineGroups = selectedSeed
    ? [
        ["现实现场", selectedSeed.realitySnapshot],
        ["行为惯性", selectedSeed.behaviorInertia],
        ["重力钩子", selectedSeed.gravityHook],
        selectedSeed.bodySignalHint ? ["身体信号", selectedSeed.bodySignalHint] : null,
      ].filter((group): group is string[] => Boolean(group))
    : [];

  useEffect(() => {
    if (currentSceneGroupIndex >= sceneGroups.length) {
      setCurrentSceneGroupIndex(0);
    }
  }, [currentSceneGroupIndex, sceneGroups.length]);

  useEffect(() => {
    if (flowState !== "flowing" || sceneGroups.length <= 1) {
      return undefined;
    }

    const sceneTimer = window.setInterval(() => {
      setCurrentSceneGroupIndex((currentIndex) => (currentIndex + 1) % sceneGroups.length);
    }, 3000);

    return () => {
      window.clearInterval(sceneTimer);
    };
  }, [flowState, sceneGroups.length]);

  function handleConfirm() {
    setFlowState("frozen");
  }

  function handleSelectSeed(sceneSeed: SceneSeed) {
    setSelectedSceneSeed(sceneSeed);
    updateSession({
      autoYaoPath: [],
      interactiveYaoPath: [],
      sixthYaoChoice: null,
      finalChoiceCode: "",
      choiceHistory: [],
    });
    setSelectedSeedId(sceneSeed.id);
    setFlowState("selected");
  }

  function handleStartYao() {
    setMotherCodeResult(buildMotherCodeResult(getSession()));
    navigate("/gua-field");
  }

  return (
    <GuanyaoShell density="compact">
      <section className={`gy-front-screen gy-front-instrument gy-scene-screen gy-causal-line gy-causal-line-intercept ${isLocked ? "gy-scene-screen--locked" : ""}`} data-intensity="quiet">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 03 / SCENE
          </GuanyaoText>
          <GuanyaoText className={`gy-scene-title ${!isLocked ? "gy-scene-title--flow" : ""}`} as="h2" size="title">
            {sceneTitle}
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" size="body" tone="faint" data-slice-source={sliceSource}>
            {sceneStatus}
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gy-scene-slice-panel gy-scene-capture-plane gyFadeRise">
          <div className={`gy-scene-flashline-group gy-scene-seed-list gy-scene-seed-list--${flowState}`}>
            <GuanyaoText className="gy-scene-seed-group-label" as="span" size="eyebrow" tone="faint">
              {flowState === "flowing"
                ? `${sceneGroupOrdinal}｜现实信号流`
                : flowState === "frozen"
                  ? `${sceneGroupOrdinal}｜点击压住你的入口`
                  : `${sceneGroupOrdinal}｜现实入口已展开`}
            </GuanyaoText>
            {seedGroup.seeds.map((seed) => {
              const isSelectedSeed = flowState === "selected" && seed.id === selectedSeedId;
              const isMutedSeed = flowState === "selected" && seed.id !== selectedSeedId;

              return (
                <div
                  className={[
                    "gy-scene-seed-signal",
                    isSelectedSeed ? "gy-scene-seed-signal--selected" : "",
                    isMutedSeed ? "gy-scene-seed-signal--muted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={seed.id}
                  onClick={flowState === "frozen" ? () => handleSelectSeed(seed) : undefined}
                  onKeyDown={(event) => {
                    if (flowState === "frozen" && (event.key === "Enter" || event.key === " ")) {
                      handleSelectSeed(seed);
                    }
                  }}
                  role={flowState === "frozen" ? "button" : undefined}
                  tabIndex={flowState === "frozen" ? 0 : undefined}
                >
                  <GuanyaoText className="gy-scene-seed-index" as="span" size="eyebrow" tone="faint">
                    {flowState === "flowing" ? "现实信号" : "现实入口"} {String(seed.seedIndex).padStart(2, "0")}｜{seed.title}
                  </GuanyaoText>
                  <GuanyaoText className="gy-scene-flashline" as="span" size="body">
                    {seed.seedLine}
                  </GuanyaoText>
                  {flowState !== "flowing" ? (
                    <span className="gy-scene-seed-tags" aria-hidden="true">
                      {seed.thematicField.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </span>
                  ) : null}
                  {isSelectedSeed ? (
                    <div className="gy-scene-seed-detail gy-capture-stack">
                      {capturedLineGroups.map(([label, line], groupIndex) => (
                        <div className="gy-capture-line-group gy-text-slice" key={label}>
                          <GuanyaoText className="gy-text-instrument" size="body" tone="faint">
                            {label}
                          </GuanyaoText>
                          <GuanyaoText size="body" tone={groupIndex === 2 ? "gold" : "muted"}>
                            {line}
                          </GuanyaoText>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </article>
        {flowState === "flowing" ? (
          <div className="gy-front-actions">
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-intercept" variant="ghost" onClick={handleConfirm}>
              拦截 —— 正在发生
            </GuanyaoButton>
          </div>
        ) : null}
        {isSelected ? (
          <div className="gy-front-actions gyFadeRise">
            <GuanyaoText className="gy-text-instrument" size="body" tone="muted">
              现实种子装填完毕
            </GuanyaoText>
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-primary" variant="ghost" onClick={handleStartYao}>
              以此起爻
            </GuanyaoButton>
          </div>
        ) : null}
      </section>
    </GuanyaoShell>
  );
}
