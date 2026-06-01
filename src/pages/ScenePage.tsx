import { useState } from "react";
import { Link } from "react-router-dom";
import { sceneFragments } from "../data/sceneFragments";
import { updateSession } from "../services/sessionService";

export function ScenePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentScene = sceneFragments[activeIndex];

  function handleNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % sceneFragments.length);
  }

  function handleConfirm() {
    updateSession({
      realitySeed: currentScene,
      sceneText: currentScene.lines.join("\n"),
      autoYaoPath: [],
      sixthYaoChoice: null,
      finalChoiceCode: "",
      choiceHistory: [],
    });
  }

  return (
    <section className="stage-card">
      <span>03 Scene</span>
      <h2>哪一幕，正在发生？</h2>
      <article className="slice-card">
        <h3>{currentScene.title}</h3>
        {currentScene.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </article>
      <div className="action-row">
        <button className="secondary-action" type="button" onClick={handleNext}>
          还不是我
        </button>
        <Link className="primary-action" to="/gravity" onClick={handleConfirm}>
          正在发生
        </Link>
      </div>
    </section>
  );
}
