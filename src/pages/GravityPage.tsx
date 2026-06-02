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
    yin: "0｜顺着本能收回",
    yang: "1｜迎着压力顶出",
  },
  {
    yin: "0｜让旧习惯接管",
    yang: "1｜打断旧习惯",
  },
  {
    yin: "0｜继续承担代价",
    yang: "1｜撞开眼前代价",
  },
  {
    yin: "0｜守住沉默",
    yang: "1｜撕开压迫",
  },
  {
    yin: "0｜让惯性继续",
    yang: "1｜把原力推到底",
  },
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
      title: "本能反应。",
      lines: ["刚才那一幕还停在你眼前：", sceneSlice.flashLine],
    },
    {
      title: "身体代偿。",
      lines: ["你的身体先有了反应：", `${sceneSlice.bodyReaction}。`, "它比判断更早接管现场。"],
    },
    {
      title: "行为惯性。",
      lines: ["你开始重复那个熟悉动作：", `${sceneSlice.behaviorInertia}。`, "代价正在显形。"],
    },
    {
      title: "高压塌缩。",
      lines: [sceneSlice.gravityHook, "这股重力已经进入高压层。"],
    },
    {
      title: "临界悬停。",
      lines: ["前四层偏转已经把你推到这里。", "现在，这枚现实种子，", "正在要求你给出最后的方向。"],
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
    }, 260);
  }

  const currentScene = ritualScenes[activeScene];
  const currentGateCopy = yaoGateCopy[activeScene];

  return (
    <GuanyaoShell className="gy-gravity-shell" density="compact">
      <div className="gy-gravity-screen" data-intensity="gravity">
        <div className="gy-ritual-layout">
          <div className="gy-five-rings" aria-label="五爻心智重力环">
            {Array.from({ length: 5 }, (_, index) => {
              const lockedBit = interactivePath[index];
              const isCurrent = !isComplete && index === activeScene;
              const isLocked = lockedBit === 0 || lockedBit === 1;
              const state = isLocked ? "locked" : isCurrent ? "current" : "pending";

              return (
                <div className={`gy-ritual-ring gy-ritual-ring--${state} ${index === 4 ? "gy-ritual-ring--pressure" : ""}`} data-yao={index + 1} key={index}>
                  {isLocked ? (
                    <span className={`gy-ritual-trace gy-ritual-trace--${lockedBit === 0 ? "yin" : "yang"}`} aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          {!isComplete ? (
            <article className={`gy-ritual-message gy-text-yao-plane gy-ritual-message--${activeScene + 1} ${completedScene === activeScene ? "is-complete" : ""}`}>
              <YaoTextBlock kicker={`心智重力 0${activeScene + 1}`} title={currentScene.title} lines={currentScene.lines} muted="因果显影完成后，请从底部闸门推进" />
            </article>
          ) : null}
          {isGateVisible && !isComplete ? (
            <div className="gy-binary-gate gyFadeRise" aria-label="心智重力偏转闸门">
              <GuanyaoButton className="gy-binary-gate__button" variant="ghost" onClick={() => handleYaoChoice(0)}>
                {currentGateCopy.yin}
              </GuanyaoButton>
              <GuanyaoButton className="gy-binary-gate__button" variant="gate" onClick={() => handleYaoChoice(1)}>
                {currentGateCopy.yang}
              </GuanyaoButton>
            </div>
          ) : null}
          {isComplete ? (
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
