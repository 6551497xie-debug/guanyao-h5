import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getSession } from "../services/sessionService";

const USE_R7_SAFE_LAUNCH = true;

function hasChronoPrototype() {
  const session = getSession();
  const profile = session.chronoProfile;

  return Boolean(
    profile &&
      (session.chronoHash || profile.chronoHash) &&
      (session.chronoPrototypeCard || profile.chronoPrototypeCard),
  );
}

function LaunchSafeEntry() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "72px 20px calc(40px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 18,
        background: "radial-gradient(circle at 50% 0%, rgba(70, 120, 255, 0.14), transparent 42%), #050607",
        color: "#f5f5f5",
        overflowX: "hidden",
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.26em",
          color: "rgba(120, 220, 255, 0.78)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        00｜带压入局
      </span>
      <h1
        style={{
          margin: 0,
          fontSize: "clamp(32px, 9vw, 48px)",
          lineHeight: 1.08,
          letterSpacing: "-0.04em",
          fontWeight: 500,
        }}
      >
        观爻 SANDBOX
      </h1>
      <p
        style={{
          margin: "0 0 2px",
          maxWidth: 360,
          color: "rgba(245, 245, 245, 0.46)",
          fontSize: 14,
          lineHeight: 1.6,
          letterSpacing: "0.08em",
        }}
      >
        「咔、咔、咔……」
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          margin: "2px 0 4px",
          padding: "15px 0",
          borderTop: "1px solid rgba(199, 169, 107, 0.38)",
          borderBottom: "1px solid rgba(85, 85, 85, 0.58)",
          display: "grid",
          gap: 8,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(245, 245, 245, 0.72)",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          这里没有玄学预测。
          <br />
          也没有心理安慰。
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(245, 245, 245, 0.76)",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          它只剥离你的借口。
          <br />
          照出你正被哪一种旧习惯卡住。
        </p>
        <span
          style={{
            color: "rgba(245, 245, 245, 0.42)",
            fontSize: 11,
            lineHeight: 1.5,
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            letterSpacing: "0.13em",
          }}
        >
          GY_SANDBOX_PROTOCOL_INITIALIZED
        </span>
      </div>
      <button
        type="button"
        onClick={() => navigate("/mother-code")}
        style={{
          width: "100%",
          minHeight: 52,
          marginTop: 14,
          border: "1px solid rgba(120, 220, 255, 0.38)",
          borderRadius: 999,
          background: "rgba(120, 220, 255, 0.12)",
          color: "#ffffff",
          fontSize: 15,
          letterSpacing: "0.04em",
        }}
      >
        沿线右滑，填装初始坐标
      </button>
    </main>
  );
}

export function LaunchPage() {
  if (USE_R7_SAFE_LAUNCH) {
    return <LaunchSafeEntry />;
  }

  const navigate = useNavigate();

  function handleOpenSandbox() {
    navigate(GUANYAO_ROUTES.motherCode);
  }

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-launch-screen" data-intensity="quiet">
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
