import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextLines } from "../components/TextLines";
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
    <section className="stage-card">
      <span>01 Identity</span>
      <h2>
        时空引力场已对齐。
        <br />
        哪一幕，正在照见你？
      </h2>
      <article className="slice-card identity-reel" onClick={handleNext}>
        <h3>{currentFragment.text}</h3>
        <TextLines lines={[currentFragment.desc]} />
      </article>
      <div className="action-row">
        <Link className="primary-action" to="/force" onClick={handleConfirm}>
          好像是我
        </Link>
        <button className="secondary-action" type="button" onClick={handleNext}>
          继续寻找
        </button>
      </div>
    </section>
  );
}
