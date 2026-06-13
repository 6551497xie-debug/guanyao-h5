import { useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";

function LaunchLogoMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 180 96" style={{ width: 142, height: 76, overflow: "visible" }}>
      {[
        [58, 18, 86, 42],
        [122, 18, 94, 42],
        [42, 78, 84, 44],
        [138, 78, 96, 44],
        [76, 36, 84, 43],
        [104, 36, 96, 43],
        [76, 54, 84, 47],
        [104, 54, 96, 47],
      ].map(([x1, y1, x2, y2], index) => (
        <line
          key={`${x1}-${y1}-${x2}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={index < 4 ? "rgba(246,243,236,0.86)" : "rgba(246,243,236,0.68)"}
          strokeWidth="1.45"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function LaunchSafeEntry() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "min(100%, 520px)",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: "7dvh 28px calc(5dvh + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 26,
        background: "radial-gradient(circle at 50% 28%, rgba(0, 184, 212, 0.08), transparent 44%), #020303",
        color: "#f5f5f5",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
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
      <div style={{ display: "grid", placeItems: "center", minHeight: "18dvh" }}>
        <LaunchLogoMark />
      </div>
      <div
        style={{
          width: "min(84%, 360px)",
          margin: "0 auto",
          padding: "16px 0",
          borderTop: "1px solid rgba(246, 243, 236, 0.14)",
          borderBottom: "1px solid rgba(246, 243, 236, 0.08)",
          display: "grid",
          gap: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(246, 243, 236, 0.74)",
            fontSize: "clamp(18px, 3.7vw, 22px)",
            lineHeight: 1.68,
            letterSpacing: "0.06em",
            fontWeight: 300,
          }}
        >
          这里没有命运解释。
          <br />
          也没有心理安慰。
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(246, 243, 236, 0.76)",
            fontSize: "clamp(18px, 3.7vw, 22px)",
            lineHeight: 1.68,
            letterSpacing: "0.06em",
            fontWeight: 300,
          }}
        >
          它只接入现实压力，
          <br />
          让一条旧反应显形。
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
      <CausalRail statusLabel="沿线右滑 · 进入沙盒" rightHint="右滑进入沙盒" onRight={() => navigate("/mother-code")} />
    </main>
  );
}

export function LaunchPage() {
  return <LaunchSafeEntry />;
}
