import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
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

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const seedGroup = useMemo(
    () =>
      getSceneSeedGroup({
        yuanCodeKey: readYuanCodeKey(session),
        lifeStageId: readLifeStageId(session),
        identityFragmentId: session.identityFragment?.id ?? session.selectedFragment?.id,
      }),
    [session],
  );
  const [flowState, setFlowState] = useState<SceneFlowState>("flowing");
  const [selectedSeedId, setSelectedSeedId] = useState<string | null>(null);
  const selectedSeed = seedGroup.seeds.find((seed) => seed.id === selectedSeedId) ?? null;
  const isLocked = flowState !== "flowing";
  const isSelected = flowState === "selected" && selectedSeed;
  const sliceSource = seedGroup.matchedBy;
  const sceneTitle =
    flowState === "flowing"
      ? "哪一幕　正在发生"
      : flowState === "frozen"
        ? "现实信号已截停"
        : "现实引力已捕获";
  const sceneStatus =
    flowState === "flowing"
      ? "现实信号流"
      : flowState === "frozen"
        ? "三枚现实种子已冻结"
        : "本次现实种子已锁定";
  const capturedLineGroups = selectedSeed
    ? [
        ["现实现场", selectedSeed.realitySnapshot],
        ["行为惯性", selectedSeed.behaviorInertia],
        ["重力钩子", selectedSeed.gravityHook],
        selectedSeed.bodySignalHint ? ["身体信号", selectedSeed.bodySignalHint] : null,
      ].filter((group): group is string[] => Boolean(group))
    : [];

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
        <article className="gy-front-panel gy-scene-slice-panel gy-scene-capture-plane gyFadeRise" key={flowState}>
          {isSelected ? (
            <div className="gy-capture-stack">
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
          ) : (
            <div className={`gy-scene-flashline-group gy-scene-seed-list gy-scene-seed-list--${flowState}`}>
              {seedGroup.seeds.map((seed) => (
                <div
                  className="gy-scene-seed-signal"
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
                    现实种子 {String(seed.seedIndex).padStart(2, "0")}｜{seed.title}
                  </GuanyaoText>
                  <GuanyaoText className="gy-scene-flashline" as="span" size="body">
                    {seed.seedLine}
                  </GuanyaoText>
                </div>
              ))}
            </div>
          )}
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
