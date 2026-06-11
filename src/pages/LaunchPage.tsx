import { useNavigate } from "react-router-dom";
import { GravityWave } from "../components/GravityWave";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
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
    navigate(GUANYAO_ROUTES.motherCode);
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
            <GuanyaoText size="body" tone="muted">
              [嗒、嗒、嗒……]
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              这里没有玄学预测。
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              也没有心理安慰。
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              它不安慰你。
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              它只剥离你的借口。
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              照出你正被哪一种旧习惯拖住。
            </GuanyaoText>
          </div>
          <div className="gy-front-actions">
            <GuanyaoButton className="gy-front-gate" variant="ghost" onClick={handleOpenSandbox}>
              <span>沿线右滑，开始一次观爻。</span>
            </GuanyaoButton>
          </div>
          <GuanyaoText className="gy-launch-subgate-note" size="eyebrow" tone="faint">
            {hasChronoPrototype() ? "时序底色已存在。本次观爻可以直接开始。" : "首次进入，需要先完成时序装填。系统将用它校准你的入局底色。"}
          </GuanyaoText>
          <GuanyaoText className="gy-launch-subgate-note" size="eyebrow" tone="faint">
            GY_SANDBOX_PROTOCOL_INITIALIZED
          </GuanyaoText>
        </div>
      </section>
    </GuanyaoShell>
  );
}
