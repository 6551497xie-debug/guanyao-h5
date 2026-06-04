import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getSession } from "../services/sessionService";
import { getCollapseYaoTexts, getGravityYaoTexts } from "../services/yaoTextService";
import { appendInteractiveYaoChoice, generateMockAutoYaoPath, getAutoYaoPath, getInteractiveYaoPath, resetInteractiveYaoPath } from "../services/trajectoryService";
import type { SceneSlice, YaoBit } from "../types";

const yaoGateCopy = [
  {
    yin: "收回本能",
    yang: "顶住压力",
  },
  {
    yin: "延续旧习",
    yang: "打破旧习",
  },
  {
    yin: "继续硬扛",
    yang: "直面代价",
  },
  {
    yin: "守住沉默",
    yang: "撕开压迫",
  },
  {
    yin: "放任惯性",
    yang: "中断轨迹",
  },
] as const;

const yaoIndexReadouts = [
  { label: "本能", value: "20" },
  { label: "习惯", value: "35" },
  { label: "代价", value: "60" },
  { label: "高压", value: "75" },
  { label: "临界", value: "90" },
] as const;

type YaoTextBlockProps = {
  kicker: string;
  title?: string;
  lines: string[];
  muted: string;
};

type YaoRitualScene = {
  title: string;
  lines: string[];
};

function buildYaoRitualCopyFromScene(sceneSlice: SceneSlice): YaoRitualScene[] {
  return [
    {
      title: "本能反应",
      lines: ["你先回到那一幕：", sceneSlice.flashLine, "本能先替你做了第一步。"],
    },
    {
      title: "身体代偿",
      lines: ["身体比判断更早报警：", `${sceneSlice.bodyReaction}。`, "它正在替你承受没有说出口的压力。"],
    },
    {
      title: "行为惯性",
      lines: ["旧习惯接管现场：", `${sceneSlice.behaviorInertia}。`, "代价开始从旁边显形。"],
    },
    {
      title: "高压塌缩",
      lines: [sceneSlice.gravityHook, "高压不是突然来的。", "它是每一次旧反应叠上去的重量。"],
    },
    {
      title: "临界悬停",
      lines: ["你快要把旧轨道误认为安全。", "真正危险的不是这一次压力，", "而是你已经太熟悉如何退回原位。"],
    },
  ];
}

function YaoTextBlock({ kicker, title, lines, muted }: YaoTextBlockProps) {
  return (
    <div className="gy-yao-text-block gyFadeRise">
      <GuanyaoText as="span" size="eyebrow" tone="gold">
        {kicker}
      </GuanyaoText>
      {title ? (
        <GuanyaoText as="h2" size="title">
          {title}
        </GuanyaoText>
      ) : null}
      <div className="gy-yao-lines">
        {lines.map((line) => (
          <GuanyaoText key={line} size="body" tone="muted">
            {line}
          </GuanyaoText>
        ))}
      </div>
      <GuanyaoText className="gy-yao-subline" size="eyebrow" tone="faint">
        {muted}
      </GuanyaoText>
    </div>
  );
}

export function GravityPage() {
  const navigate = useNavigate();
  const [interactivePath, setInteractivePath] = useState<YaoBit[]>(() => getInteractiveYaoPath());
  const [isGateVisible, setIsGateVisible] = useState(false);
  const [completedScene, setCompletedScene] = useState<number | null>(null);
  const [ritualScenes] = useState(() => {
    const session = getSession();
    const currentPath = getAutoYaoPath();
    const autoYaoPath = currentPath.length < 5 ? generateMockAutoYaoPath({ realitySeed: session.realitySeed }) : currentPath;
    const selectedSceneSlice = session.selectedSceneSlice;

    if (selectedSceneSlice) {
      return buildYaoRitualCopyFromScene(selectedSceneSlice);
    }

    const context = {
      selectedFragment: session.selectedFragment,
      realitySeed: session.realitySeed,
      autoYaoPath,
    };

    return [...getGravityYaoTexts(context), ...getCollapseYaoTexts(context)];
  });

  useEffect(() => {
    resetInteractiveYaoPath();
    setInteractivePath([]);
  }, []);

  const activeScene = Math.min(interactivePath.length, 4);
  const isComplete = interactivePath.length >= 5;

  useEffect(() => {
    setIsGateVisible(false);
    if (isComplete) {
      return;
    }

    const timer = window.setTimeout(() => setIsGateVisible(true), 1200);

    return () => window.clearTimeout(timer);
  }, [activeScene, isComplete]);

  function handleYaoChoice(bit: YaoBit) {
    const nextPath = appendInteractiveYaoChoice(bit);
    setInteractivePath(nextPath);
    setCompletedScene(activeScene);
    setIsGateVisible(false);

    window.setTimeout(() => {
      setCompletedScene(null);
    }, 520);
  }

  const currentScene = ritualScenes[activeScene];
  const currentGateCopy = yaoGateCopy[activeScene];

  return (
    <GuanyaoShell className="gy-gravity-shell" density="compact">
      <div className="gy-gravity-screen" data-intensity="gravity">
        <div className="gy-ritual-layout">
          <div className="gy-five-rings" aria-label="五爻仪式环">
            {Array.from({ length: 5 }, (_, index) => {
              const lockedBit = interactivePath[index];
              const isCurrent = !isComplete && index === activeScene;
              const isLocked = lockedBit === 0 || lockedBit === 1;
              const state = isLocked ? "locked" : isCurrent ? "current" : "pending";

              return (
                <div className={`gy-ritual-node gy-ritual-node--${state} ${index === 4 ? "gy-ritual-node--pressure" : ""}`} data-yao={index + 1} key={index}>
                  <span className={`gy-ritual-index-label gy-ritual-index-label--${state}`}>{yaoIndexReadouts[index].label}</span>
                  {isLocked ? <span className={`gy-ritual-pressure-value ${completedScene === index ? "gy-gravity-index-reveal" : ""}`}>{yaoIndexReadouts[index].value}</span> : null}
                  <div className={`gy-ritual-ring gy-ritual-ring--${state} ${index === 4 ? "gy-ritual-ring--pressure" : ""}`} aria-hidden="true">
                    {isLocked ? (
                      <span className={`gy-ritual-trace gy-ritual-trace--${lockedBit === 0 ? "yin" : "yang"}`}>
                        <span />
                        <span />
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          {!isComplete ? (
            <article
              className={`gy-ritual-message gy-text-yao-plane gy-ritual-message--${activeScene + 1} ${activeScene >= 3 ? "gy-ritual-message--pressure" : ""} ${completedScene === activeScene ? "is-complete" : ""}`}
            >
              <YaoTextBlock kicker={`GY / LAYER 0${activeScene + 1}`} title={currentScene.title} lines={currentScene.lines} muted="因果显影完成后，请从底部闸门推进" />
            </article>
          ) : null}
          {isGateVisible && !isComplete ? (
            <div className="gy-binary-gate gyFadeRise" aria-label="二元偏转闸门">
              <GuanyaoButton className="gy-binary-gate__button" variant="ghost" onClick={() => handleYaoChoice(0)}>
                {currentGateCopy.yin}
              </GuanyaoButton>
              <GuanyaoButton className="gy-binary-gate__button" variant="gate" onClick={() => handleYaoChoice(1)}>
                {currentGateCopy.yang}
              </GuanyaoButton>
            </div>
          ) : null}
          {isComplete && completedScene === null ? (
            <div className="gy-pressure-gate gyFadeRise">
              <YaoTextBlock
                kicker="高压停留"
                lines={["当前轨迹已进入高压。", "完成最后一爻，", "需要你亲手按下最后一个动作。"]}
                muted="进入第六爻后，将由你完成选择"
              />
              <GuanyaoButton variant="gate" onClick={() => navigate("/choice")}>
                继续进入最后一爻
              </GuanyaoButton>
            </div>
          ) : null}
        </div>
      </div>
    </GuanyaoShell>
  );
}
