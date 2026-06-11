import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildFinalChoiceCode, setSixthYaoChoice } from "../services/trajectoryService";

const breachEchoes = ["主破口｜沾泥处", "备选破口｜受伤处", "备选破口｜待机处"];

export function ChoicePage() {
  const navigate = useNavigate();
  const [isSettling, setIsSettling] = useState(false);

  useEffect(() => {
    if (!isSettling) {
      return;
    }

    const settleTimer = window.setTimeout(() => {
      navigate(GUANYAO_ROUTES.yaoDevice);
    }, 1200);

    return () => window.clearTimeout(settleTimer);
  }, [isSettling, navigate]);

  function handleChoice(choice: 0 | 1) {
    setSixthYaoChoice(choice);
    buildFinalChoiceCode();
    setIsSettling(true);
  }

  return (
    <GuanyaoShell className="gy-choice-r1-shell" density="compact">
      <section className="gy-choice-r1-screen gyFadeRise" aria-label="破口阵列扫描">
        {isSettling ? (
          <div className="gy-choice-r1-settle gyBreath">
            <GuanyaoText as="span" size="eyebrow" tone="gold">
              GY / 06 / REPAIR_COMMITTED
            </GuanyaoText>
            <GuanyaoText as="span" size="eyebrow" tone="faint">
              器法生成中
            </GuanyaoText>
            <GuanyaoText as="h2" size="title">
              下刀位置已提交
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              系统正在把本次破口选择写入爻器。
            </GuanyaoText>
          </div>
        ) : (
          <>
            <header className="gy-choice-r1-header">
              <GuanyaoText as="span" size="eyebrow" tone="gold">
                GY / 06 / REPAIR_WINDOW
              </GuanyaoText>
              <GuanyaoText as="span" size="eyebrow" tone="faint">
                本局破口已扫描完成。系统建议你先从这里下刀。
              </GuanyaoText>
              <GuanyaoText as="span" size="eyebrow" tone="faint">
                主破口已显影 ｜ 备选破口待确认
              </GuanyaoText>
              <GuanyaoText as="h1" size="title">
                破口阵列扫描
              </GuanyaoText>
              <GuanyaoText size="body" tone="muted">
                你不是在选择答案，而是在确认本局从哪里下刀。
              </GuanyaoText>
              <GuanyaoText className="gy-choice-r2-assertion" size="body" tone="muted">
                破口不是你的失败。它是旧习惯最容易被切开的地方。
              </GuanyaoText>
            </header>

            <div className="gy-choice-r1-echo" aria-label="破口阵列">
              {breachEchoes.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <main className="gy-choice-r1-main">
              <button className="gy-choice-r1-path gy-choice-r1-path--inertia" type="button" onClick={() => handleChoice(1)}>
                <span>0 · 暂不破局</span>
                <strong>封存本局</strong>
                <em>这不是失败，只是暂时不在这一刀上动手。</em>
              </button>

              <div className="gy-choice-r1-split" aria-hidden="true">
                <span />
              </div>

              <button className="gy-choice-r1-path gy-choice-r1-path--deflect" type="button" onClick={() => handleChoice(0)}>
                <span>1 · 从主破口下刀</span>
                <strong>你已经陷入，却还在用“我能推进”维持体面</strong>
                <em>不是改变整个人生，只是在这个破口上切开一次旧反应。</em>
              </button>
            </main>

            <footer className="gy-choice-r2-console" aria-label="破口二元操作台">
              <div className="gy-choice-r2-console-labels">
                <button type="button" onClick={() => handleChoice(1)}>
                  0 · 暂不破局，封存本局
                </button>
                <button type="button" onClick={() => handleChoice(0)}>
                  1 · 从主破口下刀
                </button>
              </div>
              <div className="gy-choice-r2-rail">
                <button className="gy-choice-r2-rail-hit gy-choice-r2-rail-hit--left" type="button" aria-label="暂不破局，封存本局" onClick={() => handleChoice(1)} />
                <span className="gy-choice-r2-pointer" aria-hidden="true" />
                <button className="gy-choice-r2-rail-hit gy-choice-r2-rail-hit--right" type="button" aria-label="从主破口下刀" onClick={() => handleChoice(0)} />
              </div>
              <button className="gy-choice-r2-gesture" type="button" onClick={() => handleChoice(0)}>
                🔒 ➔ 沿线右滑 · 从主破口下刀
              </button>
            </footer>
          </>
        )}
      </section>
    </GuanyaoShell>
  );
}
