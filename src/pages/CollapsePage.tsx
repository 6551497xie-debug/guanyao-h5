import { Link } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { generateMockAutoYaoPath, getAutoYaoPath, getInteractiveYaoPath } from "../services/trajectoryService";
import { getSession } from "../services/sessionService";

export function CollapsePage() {
  const interactivePath = getInteractiveYaoPath();
  const fallbackPath = getAutoYaoPath().length >= 5 ? getAutoYaoPath() : generateMockAutoYaoPath(getSession());
  const isComplete = interactivePath.length >= 5;

  return (
    <GuanyaoShell className="gy-gravity-shell" density="compact">
      <div className="gy-gravity-screen" data-intensity={isComplete ? "pressure" : "gravity"}>
        <div className="gy-ritual-layout">
          <div className="gy-five-rings" aria-label="五爻心智重力环">
            {Array.from({ length: 5 }, (_, index) => {
              const lockedBit = interactivePath[index] ?? fallbackPath[index];
              const isLocked = lockedBit === 0 || lockedBit === 1;

              return (
                <div className={`gy-ritual-ring gy-ritual-ring--${isLocked ? "locked" : "pending"} ${index === 4 ? "gy-ritual-ring--pressure" : ""}`} data-yao={index + 1} key={index}>
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
          <div className="gy-pressure-gate gyFadeRise">
            <div className="gy-yao-text-block">
              <GuanyaoText as="span" size="eyebrow" tone="gold">
                五爻仪式
              </GuanyaoText>
              <GuanyaoText as="h2" size="title">
                五层重力已统一到同一场。
              </GuanyaoText>
              <div className="gy-yao-lines">
                <GuanyaoText size="body" tone="muted">
                  主链路现在从重力场内连续完成五爻。
                </GuanyaoText>
                <GuanyaoText size="body" tone="muted">
                  这里保留为旧路径兼容入口。
                </GuanyaoText>
              </div>
            </div>
            <Link to={isComplete ? "/choice" : "/gravity"}>
              <GuanyaoButton as="span" variant="gate">
                {isComplete ? "继续进入最后一爻" : "进入五爻仪式"}
              </GuanyaoButton>
            </Link>
          </div>
        </div>
      </div>
    </GuanyaoShell>
  );
}
