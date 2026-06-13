import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";
import { sceneSeeds } from "../data/sceneSeeds";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSceneSeedGroup } from "../services/sceneSeedService";
import { getSession, setMotherCodeResult, setSelectedSceneSeed } from "../services/sessionService";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId, SceneSeed } from "../types";

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];
const requiredSceneSeedIndexes: SceneSeed["seedIndex"][] = [1, 2, 3];

type PressureSeedCandidate = {
  id: string;
  title: string;
  line: string;
  sceneSeed: SceneSeed;
};

type SceneMomentGroup = {
  seedGroupId: string;
  pressureLayerId: string;
  pressureLayerLabel: string;
  seeds: SceneSeed[];
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

function buildPressureSeedCandidates(session: GuanyaoSession): PressureSeedCandidate[] {
  const yuanCodeKey = readYuanCodeKey(session);
  const lifeStageId = readLifeStageId(session);
  const identityFragmentId = session.identityFragment?.id ?? session.selectedFragment?.id;
  const seedGroupResult = getSceneSeedGroup({
    yuanCodeKey,
    lifeStageId,
    identityFragmentId,
  });
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
  const fallbackGroups = collectSceneMomentGroups(sceneSeeds);
  const [visibleGroup] = dedupeSceneMomentGroups([
    ...(primaryGroup ? [primaryGroup] : []),
    ...exactGroups,
    ...yuanLifeStageGroups,
    ...yuanGroups,
    ...fallbackGroups,
  ]);
  const visibleSeeds = visibleGroup?.seeds ?? seedGroupResult.seeds;

  return visibleSeeds.map((seed) => ({
    id: seed.id,
    title: seed.title,
    line: seed.seedLine,
    sceneSeed: seed,
  }));
}

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const pressureSeedCandidates = useMemo(() => buildPressureSeedCandidates(session), [session]);
  const [selectedSeedId, setSelectedSeedId] = useState<string | null>(null);
  const selectedCandidate = pressureSeedCandidates.find((candidate) => candidate.id === selectedSeedId) ?? null;

  function handlePressurizeSeed() {
    if (!selectedCandidate) {
      return;
    }

    setSelectedSceneSeed(selectedCandidate.sceneSeed);
    window.localStorage.setItem("guanyao:selectedPressureSliceId", selectedCandidate.id);
    window.localStorage.setItem("guanyao:selectedPressureSliceText", selectedCandidate.line);
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
            color: selectedCandidate ? "rgba(0,184,212,0.68)" : "rgba(246,243,236,0.38)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 11,
            letterSpacing: "0.13em",
          }}
        >
          {selectedCandidate ? "现实压力种子已选中，等待压入压力场。" : "现实压力种子待压入。"}
        </span>

        <div
          style={{
            display: "grid",
            gap: 10,
            paddingBottom: 12,
          }}
        >
          {pressureSeedCandidates.map((candidate) => {
            const isSelected = selectedSeedId === candidate.id;

            return (
              <button
                key={candidate.id}
                type="button"
                onClick={() => setSelectedSeedId(candidate.id)}
                style={{
                  width: "100%",
                  minHeight: 118,
                  padding: "15px 2px 15px 0",
                  border: 0,
                  borderTop: "1px solid rgba(246,243,236,0.08)",
                  borderBottom: isSelected ? "1px solid rgba(0,184,212,0.56)" : "1px solid rgba(246,243,236,0.07)",
                  background: isSelected ? "linear-gradient(90deg, rgba(0,184,212,0.08), transparent 68%)" : "transparent",
                  color: "inherit",
                  display: "grid",
                  gap: 8,
                  textAlign: "left",
                  opacity: isSelected ? 1 : 0.68,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: isSelected ? "rgba(0,184,212,0.78)" : "rgba(246,243,236,0.4)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                  }}
                >
                  现实压力种子
                </span>
                <strong
                  style={{
                    color: isSelected ? "rgba(246,243,236,0.92)" : "rgba(246,243,236,0.74)",
                    fontSize: 19,
                    lineHeight: 1.28,
                    fontWeight: 360,
                  }}
                >
                  {candidate.title}
                </strong>
                <span
                  style={{
                    color: "rgba(246,243,236,0.6)",
                    fontSize: 14,
                    lineHeight: 1.58,
                  }}
                >
                  {candidate.line}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <CausalRail
        statusLabel={selectedCandidate ? "现实压力种子已选中，等待压入压力场。" : "请选择一个现实压力种子"}
        rightHint="右滑压入现实压力种子"
        onRight={handlePressurizeSeed}
        disabled={!selectedCandidate}
      />
    </main>
  );
}
