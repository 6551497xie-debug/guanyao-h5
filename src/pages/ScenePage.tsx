import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { sceneSeeds } from "../data/sceneSeeds";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getDemoPressureSeed } from "../services/guanyaoInteractionService";
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

const USE_PRESSURE_SLICE_ENTRY = true;

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

function PressureSliceEntry() {
  const navigate = useNavigate();
  const fallbackPressureSeed = getDemoPressureSeed();
  const sliceCandidates = sceneSeeds.slice(0, 3).map((seed, index) => ({
    id: seed.id,
    label: ["A", "B", "C"][index] ?? String(index + 1),
    title: seed.title,
    line: seed.seedLine,
    sceneSeed: seed,
  }));
  const slices =
    sliceCandidates.length === 3
      ? sliceCandidates
      : [
          {
            id: "pressure-slice-a",
            label: "A",
            title: "合作项目压力",
            line: fallbackPressureSeed.text,
            sceneSeed: null,
          },
          {
            id: "pressure-slice-b",
            label: "B",
            title: "关系责任回流",
            line: "别人还没有开口，你已经开始替整件事寻找出口。",
            sceneSeed: null,
          },
          {
            id: "pressure-slice-c",
            label: "C",
            title: "评价场逼近",
            line: "你知道自己很吃力，但更怕别人看出你正在撑不住。",
            sceneSeed: null,
          },
        ];
  const [selectedSliceId, setSelectedSliceId] = useState(slices[0].id);

  function handleConfirmSlice() {
    const selectedSlice = slices.find((slice) => slice.id === selectedSliceId) ?? slices[0];

    if (selectedSlice.sceneSeed) {
      setSelectedSceneSeed(selectedSlice.sceneSeed);
    }

    window.localStorage.setItem("guanyao:selectedPressureSliceId", selectedSlice.id);
    window.localStorage.setItem("guanyao:selectedPressureSliceText", selectedSlice.line);
    setMotherCodeResult(buildMotherCodeResult(getSession()));
    navigate(GUANYAO_ROUTES.pressureExposure);
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "48px 20px calc(42px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "#050607",
        color: "#f5f5f5",
        overflowX: "hidden",
      }}
    >
      <span
        style={{
          color: "rgba(199,169,107,0.7)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          letterSpacing: "0.16em",
        }}
      >
        03｜现实压力切片
      </span>
      <span
        style={{
          color: "rgba(245,245,245,0.44)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        母码已嵌入。
      </span>
      <h1
        style={{
          margin: "2px 0 0",
          color: "rgba(245,245,245,0.88)",
          fontSize: "clamp(26px, 8vw, 38px)",
          lineHeight: 1.15,
          fontWeight: 420,
          letterSpacing: "0.02em",
        }}
      >
        哪一幕，正在发生？
      </h1>

      <section
        aria-label="现实压力切片"
        style={{
          display: "grid",
          gap: 10,
          marginTop: 6,
          padding: "12px 0",
          borderTop: "1px solid rgba(85,85,85,0.58)",
          borderBottom: "1px solid rgba(85,85,85,0.36)",
        }}
      >
        {slices.map((slice) => {
          const isSelected = slice.id === selectedSliceId;

          return (
            <button
              key={slice.id}
              type="button"
              onClick={() => setSelectedSliceId(slice.id)}
              style={{
                width: "100%",
                padding: "14px 0",
                border: 0,
                borderTop: "1px solid rgba(85,85,85,0.38)",
                borderBottom: isSelected ? "1px solid rgba(199,169,107,0.48)" : "1px solid rgba(85,85,85,0.24)",
                background: isSelected ? "rgba(199,169,107,0.055)" : "transparent",
                color: "inherit",
                textAlign: "left",
                display: "grid",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: isSelected ? "rgba(199,169,107,0.78)" : "rgba(245,245,245,0.34)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                现实压力切片 {slice.label}
              </span>
              <strong
                style={{
                  color: isSelected ? "rgba(245,245,245,0.86)" : "rgba(245,245,245,0.62)",
                  fontSize: 16,
                  lineHeight: 1.35,
                  fontWeight: 380,
                }}
              >
                {slice.title}
              </strong>
              <span
                style={{
                  color: isSelected ? "rgba(245,245,245,0.72)" : "rgba(245,245,245,0.48)",
                  fontSize: 14,
                  lineHeight: 1.58,
                }}
              >
                {slice.line}
              </span>
            </button>
          );
        })}
      </section>

      <button
        type="button"
        onClick={handleConfirmSlice}
        style={{
          width: "100%",
          minHeight: 52,
          marginTop: "auto",
          border: "1px solid rgba(199,169,107,0.52)",
          borderRadius: 0,
          background: "transparent",
          color: "rgba(245,245,245,0.9)",
          fontSize: 15,
          letterSpacing: "0.04em",
        }}
      >
        拦截这一幕，选择现实压力种子
      </button>
    </main>
  );
}

export function ScenePage() {
  if (USE_PRESSURE_SLICE_ENTRY) {
    return <PressureSliceEntry />;
  }

  const navigate = useNavigate();
  const session = getSession();
  const demoPressureSeed = getDemoPressureSeed();
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
  const sceneTitle = "哪一幕，正在发生？";
  const sceneStatus = "母码已嵌入。";
  const sceneGateLabel = "拦截这一幕，选择现实压力种子";
  const sceneGateNote = flowState === "selected" ? "当前切片已认领。" : demoPressureSeed.text;

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

  function handleConfirmPressureSeed() {
    const defaultSeed = seedGroup.seeds[0];
    if (defaultSeed) {
      handleSelectSeed(defaultSeed);
    }
    setMotherCodeResult(buildMotherCodeResult(getSession()));
    navigate(GUANYAO_ROUTES.pressureExposure);
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
            03｜现实压力切片
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
              {flowState === "selected" ? "现实压力切片｜已认领" : "现实压力切片｜滚动认领"}
            </GuanyaoText>
            {seedGroup.seeds.map((seed) => {
              const isSelectedSeed = flowState === "selected" && seed.id === selectedSeedId;
              const isMutedSeed = flowState === "selected" && seed.id !== selectedSeedId;
              const sliceLabel = ["A", "B", "C"][seed.seedIndex - 1] ?? String(seed.seedIndex);

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
                  onClick={() => handleSelectSeed(seed)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleSelectSeed(seed);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <GuanyaoText className="gy-scene-seed-index" as="span" size="eyebrow" tone="faint">
                    现实压力切片 {sliceLabel}｜{seed.title}
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
          <button
            className={`gy-scene-rail-action${flowState === "selected" ? " gy-scene-rail-action--locked" : ""}`}
            type="button"
            onClick={flowState === "selected" ? handleStartYao : handleConfirmPressureSeed}
          >
            {sceneGateLabel}
          </button>
        </div>
      </section>
    </GuanyaoShell>
  );
}
