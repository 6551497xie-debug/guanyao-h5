import { Link } from "react-router-dom";
import { GravityWave } from "../components/GravityWave";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";

export function LaunchPage() {
  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-launch-screen" data-intensity="quiet">
        <div className="gy-launch-core">
          <GravityWave variant="core" />
        </div>
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 00 / LAUNCH
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            观爻 SANDBOX
          </GuanyaoText>
          <div className="gy-front-lines">
            {["你不是被命运困住的。", "你只是被自己的执念与恐惧，", "留在了原地。"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
          <div className="gy-front-actions">
            <Link to="/identity">
              <GuanyaoButton className="gy-front-gate" as="span" variant="ghost">
                开启沙盒
              </GuanyaoButton>
            </Link>
          </div>
          <GuanyaoText className="gy-launch-subgate-note" size="eyebrow" tone="faint">
            照见行为黑洞
          </GuanyaoText>
        </div>
      </section>
    </GuanyaoShell>
  );
}
