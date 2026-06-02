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
      <section className="gy-front-screen gy-front-instrument gy-identity-screen" data-intensity="quiet">
        <div className="gy-front-copy gy-identity-coord gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 01 / IDENTITY
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="faint">
            时空引力场已对齐
          </GuanyaoText>
          <GuanyaoText size="body" tone="faint">
            哪一幕，正在照见你？
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gy-text-fragment gyFadeRise" data-clickable="true" onClick={handleNext}>
          <GuanyaoText as="h3" size="title">
            {currentFragment.text}
          </GuanyaoText>
          <GuanyaoText size="body" tone="muted">
            {currentFragment.desc}
          </GuanyaoText>
        </article>
        <div className="gy-front-actions">
          <Link to="/force" onClick={handleConfirm}>
            <GuanyaoButton className="gy-identity-gate" as="span" variant="ghost">
              好像是我
            </GuanyaoButton>
          </Link>
          <GuanyaoButton className="gy-identity-gate" variant="ghost" onClick={handleNext}>
            继续寻找
          </GuanyaoButton>
        </div>
      </section>
    </GuanyaoShell>
  );
}
