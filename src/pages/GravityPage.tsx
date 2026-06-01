import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { getSession } from "../services/sessionService";
import { getGravityYaoTexts } from "../services/yaoTextService";
import { generateMockAutoYaoPath, getAutoYaoPath, setAutoYaoPath } from "../services/trajectoryService";

export function GravityPage() {
  const navigate = useNavigate();
  const [activeScene, setActiveScene] = useState(0);
  const [gravityScenes] = useState(() => {
    const session = getSession();
    const currentPath = getAutoYaoPath();
    const autoYaoPath = currentPath.length < 5 ? generateMockAutoYaoPath({ realitySeed: session.realitySeed }) : currentPath;

    return getGravityYaoTexts({
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
      window.setTimeout(() => setActiveScene(2), 3200),
      window.setTimeout(() => navigate("/collapse"), 4800),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [navigate]);

  return (
    <section className="stage-card">
      <span>自动观影</span>
      <h2>前三爻自动观影区</h2>
      <div className="yao-viewer">
        {gravityScenes.map((scene, index) => (
          <article className={`yao-scene ${activeScene === index ? "active" : ""}`} key={scene.title}>
            <h3>{scene.title}</h3>
            <TextLines lines={scene.lines} />
          </article>
        ))}
      </div>
    </section>
  );
}
