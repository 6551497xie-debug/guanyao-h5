import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSessionForceId, pickSceneSlicesForForce } from "../services/sceneService";
import { getSession, setMotherCodeResult, setSelectedSceneSlice, updateSession } from "../services/sessionService";

export function ScenePage() {
  const navigate = useNavigate();
  const session = getSession();
  const forceId = getSessionForceId(session) ?? "";
  const sceneSlices = useMemo(() => pickSceneSlicesForForce(forceId), [forceId]);
  const displaySceneSlices = useMemo(() => {
    if (forceId) {
      return sceneSlices;
    }

    const fallbackSceneIndex = sceneSlices.findIndex((sceneSlice) => sceneSlice.id === "scene_qian_001");
    if (fallbackSceneIndex < 0) {
      return sceneSlices;
    }

    return [sceneSlices[fallbackSceneIndex], ...sceneSlices.filter((_, index) => index !== fallbackSceneIndex)];
  }, [forceId, sceneSlices]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const currentScene = displaySceneSlices[activeIndex % displaySceneSlices.length];
  const sliceSource = "fallback";
  const flashLineParts = currentScene.flashLine.split(/[，。]/).filter(Boolean);
  const capturedLineGroups = [
    currentScene.fixedLines.slice(0, 2),
    currentScene.fixedLines.slice(2, 4),
    currentScene.fixedLines.slice(4),
  ].filter((group) => group.length > 0);

  useEffect(() => {
    if (isLocked || displaySceneSlices.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % displaySceneSlices.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [displaySceneSlices.length, isLocked]);

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
            {isLocked ? "现实引力已捕获" : "哪一幕　正在发生"}
          </GuanyaoText>
          {!isLocked ? (
            <GuanyaoText className="gy-text-instrument" size="body" tone="faint" data-slice-source={sliceSource}>
              现实种子已抵达
            </GuanyaoText>
          ) : null}
        </div>
        <article className="gy-front-panel gy-scene-slice-panel gy-scene-capture-plane gyFadeRise" key={isLocked ? "locked" : currentScene.id}>
          {isLocked ? (
            <div className="gy-capture-stack">
              {capturedLineGroups.map((group, groupIndex) => (
                <div className="gy-capture-line-group gy-text-slice" key={group.join("")}>
                  {group.map((line) => (
                    <GuanyaoText key={line} size="body" tone={groupIndex === 0 ? "muted" : "faint"}>
                      {line}
                    </GuanyaoText>
                  ))}
                </div>
              ))}
              <GuanyaoText className="gy-capture-hook gy-text-hook" size="body" tone="gold">
                {currentScene.gravityHook}
              </GuanyaoText>
            </div>
          ) : (
            <div className="gy-scene-flashline-group">
              {flashLineParts.map((line) => (
                <GuanyaoText className="gy-scene-flashline" as="p" key={line} size="title">
                  {line}
                </GuanyaoText>
              ))}
            </div>
          )}
        </article>
        {!isLocked ? (
          <div className="gy-front-actions">
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-intercept" variant="ghost" onClick={handleConfirm}>
              拦截 —— 正在发生
            </GuanyaoButton>
          </div>
        ) : null}
        {isLocked ? (
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
