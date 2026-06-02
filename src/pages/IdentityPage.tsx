import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { identityFragments } from "../data/identityFragments";
import { updateSession } from "../services/sessionService";

export function IdentityPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentFragment = identityFragments[activeIndex];

  function handleNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % identityFragments.length);
  }

  function handleConfirm() {
    updateSession({
      selectedFragment: currentFragment,
      autoYaoPath: [],
      sixthYaoChoice: null,
      finalChoiceCode: "",
      choiceHistory: [],
    });
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % identityFragments.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen" data-intensity="quiet">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText as="span" size="eyebrow" tone="gold">
            01 Identity
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            时空引力场已对齐。
          </GuanyaoText>
          <GuanyaoText size="body" tone="muted">
            哪一幕，正在照见你？
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gyFadeRise" data-clickable="true" onClick={handleNext}>
          <GuanyaoText as="h3" size="title">
            {currentFragment.text}
          </GuanyaoText>
          <GuanyaoText size="body" tone="muted">
            {currentFragment.desc}
          </GuanyaoText>
        </article>
        <div className="gy-front-actions">
          <Link to="/force" onClick={handleConfirm}>
            <GuanyaoButton as="span" variant="primary">
              好像是我
            </GuanyaoButton>
          </Link>
          <GuanyaoButton variant="secondary" onClick={handleNext}>
            继续寻找
          </GuanyaoButton>
        </div>
      </section>
    </GuanyaoShell>
  );
}
