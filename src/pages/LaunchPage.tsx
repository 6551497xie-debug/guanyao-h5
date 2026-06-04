import { useNavigate } from "react-router-dom";
import { GravityWave } from "../components/GravityWave";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getSession } from "../services/sessionService";

function hasChronoPrototype() {
  const session = getSession();
  const profile = session.chronoProfile;

  return Boolean(
    profile &&
      (session.chronoHash || profile.chronoHash) &&
      (session.chronoPrototypeCard || profile.chronoPrototypeCard),
  );
}

export function LaunchPage() {
  const navigate = useNavigate();

  function handleOpenSandbox() {
    navigate(hasChronoPrototype() ? "/identity" : "/chrono");
  }

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
          <GuanyaoText className="gy-launch-nameplate" as="h2" size="title">
            观爻 SANDBOX
          </GuanyaoText>
          <div className="gy-front-lines gy-launch-verdict">
            {["你不是被命运困住", "你只是被自己的执念与恐惧", "留在了原地"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
          <div className="gy-front-actions">
            <GuanyaoButton className="gy-front-gate" variant="ghost" onClick={handleOpenSandbox}>
              开启沙盒
            </GuanyaoButton>
          </div>
          <GuanyaoText className="gy-launch-subgate-note" size="eyebrow" tone="faint">
            照见行为因果
          </GuanyaoText>
        </div>
      </section>
    </GuanyaoShell>
  );
}
