import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { sceneSeeds } from "../data/sceneSeeds";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
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

type SceneMomentGroup = {
  seedGroupId: string;
  pressureLayerId: string;
  pressureLayerLabel: string;
  seeds: SceneSeed[];
};

const requiredSceneSeedIndexes: SceneSeed["seedIndex"][] = [1, 2, 3];

function normalizeSceneMomentGroup(seeds: SceneSeed[]): SceneMomentGroup | null {
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

function collectSceneMomentGroups(candidates: SceneSeed[]): SceneMomentGroup[] {
  const groupIds = [...new Set(candidates.map((seed) => seed.seedGroupId))];

  return groupIds
    .map((groupId) => normalizeSceneMomentGroup(candidates.filter((seed) => seed.seedGroupId === groupId)))
    .filter((group): group is SceneMomentGroup => Boolean(group));
}

function dedupeSceneMomentGroups(groups: SceneMomentGroup[]): SceneMomentGroup[] {
  const seenGroupIds = new Set<string>();

  return groups.filter((group) => {
    if (seenGroupIds.has(group.seedGroupId)) {
      return false;
    }

    seenGroupIds.add(group.seedGroupId);
    return true;
  });
}

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const forceName =
    session.forceReading?.archetype ?? session.forceProfile?.archetype ?? session.selectedForceName?.split("·").pop()?.trim() ?? "创世者";
  const yuanCodeKey = readYuanCodeKey(session);
  const lifeStageId = readLifeStageId(session);
  const identityFragmentId = session.identityFragment?.id ?? session.selectedFragment?.id;
  const seedGroupResult = useMemo(
    () =>
      getSceneSeedGroup({
        yuanCodeKey,
        lifeStageId,
        identityFragmentId,
      }),
    [identityFragmentId, lifeStageId, yuanCodeKey],
  );
  const momentGroups = useMemo(() => {
    const primaryGroup = normalizeSceneMomentGroup(seedGroupResult.seeds);
    const exactGroups = identityFragmentId
      ? collectSceneMomentGroups(sceneSeeds.filter((seed) => seed.sourceIdentityFragmentId === identityFragmentId))
      : [];
    const yuanLifeStageGroups =
      yuanCodeKey && lifeStageId
        ? collectSceneMomentGroups(sceneSeeds.filter((seed) => seed.yuanCodeKey === yuanCodeKey && seed.lifeStageId === lifeStageId))
        : [];
    const yuanGroups = yuanCodeKey
      ? collectSceneMomentGroups(sceneSeeds.filter((seed) => seed.yuanCodeKey === yuanCodeKey))
      : [];
    const allGroups = collectSceneMomentGroups(sceneSeeds);
    const orderedGroups = dedupeSceneMomentGroups([
      ...(primaryGroup ? [primaryGroup] : []),
      ...exactGroups,
      ...yuanLifeStageGroups,
      ...yuanGroups,
      ...allGroups,
    ]);

    return orderedGroups.length > 0 ? orderedGroups : primaryGroup ? [primaryGroup] : [];
  }, [identityFragmentId, lifeStageId, seedGroupResult.seeds, yuanCodeKey]);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);
  const [flowState, setFlowState] = useState<SceneFlowState>("flowing");
  const [selectedSeedId, setSelectedSeedId] = useState<string | null>(null);
  const seedGroup = momentGroups[currentMomentIndex] ?? momentGroups[0] ?? seedGroupResult;
  const sliceSource = `${seedGroupResult.matchedBy}:moment-${currentMomentIndex + 1}`;
  const sceneTitle =
    flowState === "flowing"
      ? "现实触发证据接入"
      : flowState === "frozen"
        ? "现实触发证据已暴停"
        : "撞击点已锁定";
  const sceneStatus = `状态：${forceName}卦码驱动已接入反应堆`;
  const sceneGateLabel =
    flowState === "flowing" ? "暴停当前信号流" : flowState === "frozen" ? "锁定撞击点" : "钉入当前触发证据";
  const sceneGateNote =
    flowState === "flowing"
      ? "三联压力信号接入，等待暴停。"
      : flowState === "frozen"
        ? "点击一条压力信号，锁定撞击点。"
        : "现实信号已入沙，等待卦码显影。";

  useEffect(() => {
    document.body.classList.add("gy-scene-r1-mode");
    return () => document.body.classList.remove("gy-scene-r1-mode");
  }, []);

  useEffect(() => {
    if (currentMomentIndex >= momentGroups.length) {
      setCurrentMomentIndex(0);
    }
  }, [currentMomentIndex, momentGroups.length]);

  useEffect(() => {
    if (flowState !== "flowing" || momentGroups.length <= 1) {
      return undefined;
    }

    const momentTimer = window.setInterval(() => {
      setCurrentMomentIndex((currentIndex) => (currentIndex + 1) % momentGroups.length);
    }, 4000);

    return () => {
      window.clearInterval(momentTimer);
    };
  }, [flowState, momentGroups.length]);

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
    navigate(GUANYAO_ROUTES.pressureExposure);
  }

  return (
    <GuanyaoShell density="compact">
      <section
        className={`gy-front-screen gy-front-instrument gy-scene-screen gy-scene-screen--${flowState} gy-causal-line gy-causal-line-intercept`}
        data-intensity="quiet"
      >
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 03 / EVIDENCE
          </GuanyaoText>
          <GuanyaoText className="gy-scene-status-readout" as="span" size="eyebrow" tone="faint" data-slice-source={sliceSource}>
            {sceneStatus}
          </GuanyaoText>
          <GuanyaoText className="gy-scene-title" as="h2" size="title">
            {sceneTitle}
          </GuanyaoText>
        </div>
        <article className="gy-scene-slice-panel gy-scene-capture-plane gyFadeRise">
          <div className={`gy-scene-flashline-group gy-scene-seed-list gy-scene-seed-list--${flowState}`}>
            <GuanyaoText className="gy-scene-seed-group-label" as="span" size="eyebrow" tone="faint">
              {flowState === "flowing"
                ? "现实触发证据｜扫描"
                : flowState === "frozen"
                  ? "现实触发证据｜可锁定"
                  : "现实触发证据｜已钉住"}
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
                    信号流 // {String(seed.seedIndex).padStart(2, "0")}｜{seed.title}
                  </GuanyaoText>
                  <GuanyaoText className="gy-scene-flashline" as="span" size="body">
                    {seed.seedLine}
                  </GuanyaoText>
                </div>
              );
            })}
          </div>
        </article>
        <div className="gy-scene-actions gyFadeRise">
          <GuanyaoText className="gy-scene-gate-note" size="body" tone="muted">
            {sceneGateNote}
          </GuanyaoText>
          {flowState === "flowing" ? (
            <button className="gy-scene-rail-action" type="button" onClick={handleConfirm}>
              {sceneGateLabel}
            </button>
          ) : flowState === "frozen" ? (
            <div className="gy-scene-rail-action gy-scene-rail-action--static" aria-hidden="true">
              {sceneGateLabel}
            </div>
          ) : (
            <button className="gy-scene-rail-action gy-scene-rail-action--locked" type="button" onClick={handleStartYao}>
              {sceneGateLabel}
            </button>
          )}
        </div>
      </section>
    </GuanyaoShell>
  );
}
