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
      <section className="gy-delivery-stage gy-delivery-stage--pressure gy-choice-brake-stage gy-causal-line gy-causal-line-brake gyFadeRise">
        {isSettling ? (
          <div className="gy-choice-settle gyBreath">
            <GuanyaoText as="h2" size="title">
              最后一爻已落下
            </GuanyaoText>
            <GuanyaoText size="body" tone="gold">
              爻码卡正在生成
            </GuanyaoText>
          </div>
        ) : (
          <>
            <div className="gy-delivery-copy gy-choice-copy-tight">
              {["最后一爻，由你偏转", "前五爻已经走完", "现在，只剩一次反本能选择", "你可以照旧反应", "也可以让惯性在这里偏开"].map((line) => (
                <GuanyaoText key={line} size="body" tone="muted">
                  {line}
                </GuanyaoText>
              ))}
            </div>
            <div className="gy-delivery-actions">
              <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-final gy-behavior-gate-secondary" variant="ghost" onClick={() => handleChoice(1)}>
                照旧反应
              </GuanyaoButton>
              <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-final gy-behavior-gate-primary" variant="gate" onClick={() => handleChoice(0)}>
                反本能偏转
              </GuanyaoButton>
            </div>
          </>
        )}
      </section>
    </GuanyaoShell>
  );
}
