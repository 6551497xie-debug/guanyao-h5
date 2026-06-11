import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildFinalChoiceCode, setSixthYaoChoice } from "../services/trajectoryService";

const gravityEchoes = ["01 身体", "02 旧习惯", "03 关系牵引", "04 高风险窗口", "05 临界停留"];

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
      <section className="gy-choice-r1-screen gyFadeRise" aria-label="第六爻反本能偏转">
        {isSettling ? (
          <div className="gy-choice-r1-settle gyBreath">
            <GuanyaoText as="span" size="eyebrow" tone="gold">
              GY / 06 / REPAIR_COMMITTED
            </GuanyaoText>
            <GuanyaoText as="span" size="eyebrow" tone="faint">
              器法生成中
            </GuanyaoText>
            <GuanyaoText as="h2" size="title">
              第六爻偏转已提交
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              系统正在把本次反本能动作写入器法。
            </GuanyaoText>
          </div>
        ) : (
          <>
            <header className="gy-choice-r1-header">
              <GuanyaoText as="span" size="eyebrow" tone="gold">
                GY / 06 / REPAIR_WINDOW
              </GuanyaoText>
              <GuanyaoText as="span" size="eyebrow" tone="faint">
                前五爻已经走完。系统检测到：你正在回到同一套旧反应。
              </GuanyaoText>
              <GuanyaoText as="span" size="eyebrow" tone="faint">
                序列：0-0-0-0-0 ｜ 修复窗口已打开
              </GuanyaoText>
              <GuanyaoText as="h1" size="title">
                第六爻 ／ 反本能偏转
              </GuanyaoText>
              <GuanyaoText size="body" tone="muted">
                前五爻已经走完。序列：0-0-0-0-0。
              </GuanyaoText>
              <GuanyaoText className="gy-choice-r2-assertion" size="body" tone="muted">
                你不是在选择答案，而是在切断一次延续了几十年的旧反应。
              </GuanyaoText>
            </header>

            <div className="gy-choice-r1-echo" aria-label="前五爻残影">
              {gravityEchoes.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <main className="gy-choice-r1-main">
              <button className="gy-choice-r1-path gy-choice-r1-path--inertia" type="button" onClick={() => handleChoice(1)}>
                <span>0 · 照旧反应</span>
                <strong>继续沿旧惯性滑落</strong>
                <em>这不是错误，只是让熟悉路径继续全量接管。未来结局已由其写就。</em>
              </button>

              <div className="gy-choice-r1-split" aria-hidden="true">
                <span />
              </div>

              <button className="gy-choice-r1-path gy-choice-r1-path--deflect" type="button" onClick={() => handleChoice(0)}>
                <span>1 · 执行器法</span>
                <strong>把最容易拖延的一步，缩到 10 分钟内完成</strong>
                <em>不是改变整个人生，只是在这个窗口里让旧反应偏开一次。</em>
              </button>
            </main>

            <footer className="gy-choice-r2-console" aria-label="第六爻二元偏转操作台">
              <div className="gy-choice-r2-console-labels">
                <button type="button" onClick={() => handleChoice(1)}>
                  0 · 顺从本能下坠
                </button>
                <button type="button" onClick={() => handleChoice(0)}>
                  1 · 使用本局爻器
                </button>
              </div>
              <div className="gy-choice-r2-rail">
                <button className="gy-choice-r2-rail-hit gy-choice-r2-rail-hit--left" type="button" aria-label="顺从本能下坠" onClick={() => handleChoice(1)} />
                <span className="gy-choice-r2-pointer" aria-hidden="true" />
                <button className="gy-choice-r2-rail-hit gy-choice-r2-rail-hit--right" type="button" aria-label="使用本局爻器" onClick={() => handleChoice(0)} />
              </div>
              <button className="gy-choice-r2-gesture" type="button" onClick={() => handleChoice(0)}>
                🔒 ➔ 决绝向右拨动指针 · 强行拉断旧本能铁轨
              </button>
            </footer>
          </>
        )}
      </section>
    </GuanyaoShell>
  );
}
