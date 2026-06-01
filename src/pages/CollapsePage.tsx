import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { getSession } from "../services/sessionService";
import { getCollapseYaoTexts } from "../services/yaoTextService";
import { generateMockAutoYaoPath, getAutoYaoPath, setAutoYaoPath } from "../services/trajectoryService";

export function CollapsePage() {
  const [activeScene, setActiveScene] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [collapseScenes] = useState(() => {
    const session = getSession();
    const currentPath = getAutoYaoPath();
    const autoYaoPath = currentPath.length < 5 ? generateMockAutoYaoPath({ realitySeed: session.realitySeed }) : currentPath;

    return getCollapseYaoTexts({
      selectedFragment: session.selectedFragment,
      realitySeed: session.realitySeed,
      autoYaoPath,
    });
  });

  useEffect(() => {
    const session = getSession();
    const currentPath = getAutoYaoPath();

    if (currentPath.length < 5) {
      setAutoYaoPath(generateMockAutoYaoPath({ realitySeed: session.realitySeed }));
    }

    const timers = [
      window.setTimeout(() => setActiveScene(1), 1600),
      window.setTimeout(() => setIsComplete(true), 3200),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <section className="stage-card">
      <span>自动观影</span>
      <div className="yao-viewer">
        {collapseScenes.map((scene, index) => (
          <article className={`yao-scene ${activeScene === index ? "active" : ""}`} key={scene.title}>
            <h2>{scene.title}</h2>
            <TextLines lines={scene.lines} />
          </article>
        ))}
      </div>
      {isComplete ? (
        <div className="pressure-panel">
          <TextLines lines={["当前轨迹已进入高压。", "完成最后一爻，", "需要你亲手按下最后一个动作。"]} />
          <Link className="primary-action" to="/choice">
            继续进入最后一爻
          </Link>
        </div>
      ) : null}
    </section>
  );
}
