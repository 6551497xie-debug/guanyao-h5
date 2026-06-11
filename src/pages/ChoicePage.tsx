import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getDemoBreachScan } from "../services/guanyaoInteractionService";
import { buildFinalChoiceCode, setSixthYaoChoice } from "../services/trajectoryService";

const SELECTED_BREACH_KEY = "guanyao:selectedBreachId";
const ASSET_STATUS_KEY = "guanyao:assetStatus";

export function ChoicePage() {
  const navigate = useNavigate();
  const [isSettling, setIsSettling] = useState(false);
  const [breachScan] = useState(() => getDemoBreachScan());
  const [selectedBreachId, setSelectedBreachId] = useState(() => {
    return window.localStorage.getItem(SELECTED_BREACH_KEY) ?? getDemoBreachScan().mainBreachId;
  });
  const selectedBreach =
    breachScan.breaches.find((breach) => breach.id === selectedBreachId) ??
    breachScan.breaches.find((breach) => breach.id === breachScan.mainBreachId) ??
    breachScan.breaches[0];

  useEffect(() => {
    if (!isSettling) {
      return;
    }

    const settleTimer = window.setTimeout(() => {
      navigate(GUANYAO_ROUTES.yaoDevice);
    }, 1200);

    return () => window.clearTimeout(settleTimer);
  }, [isSettling, navigate]);

  function handleChoice(choice: 0 | 1, breachId = selectedBreach?.id ?? breachScan.mainBreachId) {
    window.localStorage.setItem(SELECTED_BREACH_KEY, breachId);
    window.localStorage.setItem(ASSET_STATUS_KEY, "activated");
    setSixthYaoChoice(choice);
    buildFinalChoiceCode();
    setIsSettling(true);
  }

  function handleSelectBreach(breachId: string) {
    setSelectedBreachId(breachId);
    window.localStorage.setItem(SELECTED_BREACH_KEY, breachId);
  }

  function handleSeal() {
    window.localStorage.setItem(SELECTED_BREACH_KEY, selectedBreach?.id ?? breachScan.mainBreachId);
    window.localStorage.setItem(ASSET_STATUS_KEY, "sealed");
    navigate(GUANYAO_ROUTES.archive);
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
              {breachScan.breaches.map((breach) => (
                <button
                  key={breach.id}
                  type="button"
                  data-active={breach.id === selectedBreach?.id}
                  onClick={() => handleSelectBreach(breach.id)}
                >
                  <span>{breach.positionLabel}｜{breach.name}</span>
                  <strong>{breach.oldReaction}</strong>
                  <em>{breach.breachSentence}</em>
                </button>
              ))}
            </div>

            <main className="gy-choice-r1-main">
              <button className="gy-choice-r1-path gy-choice-r1-path--inertia" type="button" onClick={handleSeal}>
                <span>0 · 暂不破局</span>
                <strong>封存本局</strong>
                <em>这不是失败，只是暂时不在这一刀上动手。</em>
              </button>

              <div className="gy-choice-r1-split" aria-hidden="true">
                <span />
              </div>

              <button className="gy-choice-r1-path gy-choice-r1-path--deflect" type="button" onClick={() => handleChoice(0)}>
                <span>1 · 从主破口下刀</span>
                <strong>{selectedBreach?.oldReaction}</strong>
                <em>{selectedBreach?.breachSentence}</em>
              </button>
            </main>

            <footer className="gy-choice-r2-console" aria-label="破口二元操作台">
              <div className="gy-choice-r2-console-labels">
                <button type="button" onClick={handleSeal}>
                  0 · 暂不破局，封存本局
                </button>
                <button type="button" onClick={() => handleChoice(0)}>
                  1 · 从主破口下刀
                </button>
              </div>
              <div className="gy-choice-r2-rail">
                <button className="gy-choice-r2-rail-hit gy-choice-r2-rail-hit--left" type="button" aria-label="暂不破局，封存本局" onClick={handleSeal} />
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
