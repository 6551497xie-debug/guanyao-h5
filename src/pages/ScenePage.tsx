import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getSessionForceId, pickSceneSlicesForForce } from "../services/sceneService";
import { getSession, setSelectedSceneSlice, updateSession } from "../services/sessionService";

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const forceId = getSessionForceId(session) ?? "";
  const sceneSlices = useMemo(() => pickSceneSlicesForForce(forceId), [forceId]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const currentScene = sceneSlices[activeIndex % sceneSlices.length];

  function handleNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % sceneSlices.length);
  }

  function handleConfirm() {
    setSelectedSceneSlice(currentScene);
    updateSession({
      autoYaoPath: [],
      interactiveYaoPath: [],
      sixthYaoChoice: null,
      finalChoiceCode: "",
      choiceHistory: [],
    });
    setIsLocked(true);
  }

  function handleStartYao() {
    navigate("/gravity");
  }

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen" data-intensity="quiet">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText as="span" size="eyebrow" tone="gold">
            03 Scene
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            哪一幕，正在发生？
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gyFadeRise">
          {isLocked ? (
            <GuanyaoText as="span" size="eyebrow" tone="gold">
              现实引力已捕获。
            </GuanyaoText>
          ) : null}
          {isLocked ? (
            <div className="gy-front-lines">
              {currentScene.fixedLines.map((line) => (
                <GuanyaoText key={line} size="body" tone="muted">
                  {line}
                </GuanyaoText>
              ))}
              <GuanyaoText size="body" tone="gold">
                {currentScene.gravityHook}
              </GuanyaoText>
            </div>
          ) : (
            <GuanyaoText as="p" size="title">
              {currentScene.flashLine}
            </GuanyaoText>
          )}
          {isLocked ? (
            <div className="gy-front-lines">
              <GuanyaoText size="body" tone="muted">
                行为黑洞装填完毕。
              </GuanyaoText>
            </div>
          ) : null}
        </article>
        {!isLocked ? (
          <div className="gy-front-actions">
            <GuanyaoButton variant="secondary" onClick={handleNext}>
              还不是我
            </GuanyaoButton>
            <GuanyaoButton variant="primary" onClick={handleConfirm}>
              拦截 —— 正在发生
            </GuanyaoButton>
          </div>
        ) : null}
        {isLocked ? (
          <div className="gy-front-actions gyFadeRise">
            <GuanyaoButton variant="gate" onClick={handleStartYao}>
              以此起爻
            </GuanyaoButton>
          </div>
        ) : null}
      </section>
    </GuanyaoShell>
  );
}
