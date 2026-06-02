import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { buildFinalChoiceCode, setSixthYaoChoice } from "../services/trajectoryService";

export function ChoicePage() {
  const navigate = useNavigate();
  const [isSettling, setIsSettling] = useState(false);

  useEffect(() => {
    if (!isSettling) {
      return;
    }

    const settleTimer = window.setTimeout(() => {
      navigate("/migration");
    }, 1200);

    return () => window.clearTimeout(settleTimer);
  }, [isSettling, navigate]);

  function handleChoice(choice: 0 | 1) {
    setSixthYaoChoice(choice);
    buildFinalChoiceCode();
    setIsSettling(true);
  }

  return (
    <GuanyaoShell className="gy-delivery-shell" density="compact">
      <section className="gy-delivery-stage gy-delivery-stage--pressure gyFadeRise">
        {isSettling ? (
          <div className="gy-choice-settle gyBreath">
            <GuanyaoText as="h2" size="title">
              最后一爻已落下。
            </GuanyaoText>
            <GuanyaoText size="body" tone="gold">
              人格迁移正在定格。
            </GuanyaoText>
          </div>
        ) : (
          <>
            <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
              最后一爻
            </GuanyaoText>
            <div className="gy-delivery-copy">
              {["前五爻已经走完。", "那不是选择，", "是惯性替你完成的轨迹。", "现在，", "只剩你亲手按下最后一个动作。"].map((line) => (
                <GuanyaoText key={line} size="body" tone="muted">
                  {line}
                </GuanyaoText>
              ))}
            </div>
            <div className="gy-delivery-actions">
              <GuanyaoButton variant="ghost" onClick={() => handleChoice(1)}>
                继续沿着惯性走
              </GuanyaoButton>
              <GuanyaoButton variant="gate" onClick={() => handleChoice(0)}>
                做一次反本能操作
              </GuanyaoButton>
            </div>
          </>
        )}
      </section>
    </GuanyaoShell>
  );
}
