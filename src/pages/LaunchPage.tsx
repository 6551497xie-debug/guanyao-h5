import { useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";

function LaunchSafeEntry() {
  const navigate = useNavigate();

  function handleEnterGuanyao() {
    window.navigator.vibrate?.(18);
    navigate("/mother-code");
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "min(100%, 520px)",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: "12dvh 28px calc(5dvh + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 32,
        background: "#000",
        color: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <section
        aria-label="观爻入口"
        style={{
          display: "grid",
          alignContent: "center",
          minHeight: "62dvh",
          gap: 34,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "rgba(246, 243, 236, 0.9)",
            fontSize: "clamp(27px, 7vw, 40px)",
            lineHeight: 1.54,
            letterSpacing: "0.04em",
            fontWeight: 300,
            whiteSpace: "pre-line",
          }}
        >
          {"困住你的，\n不是现实，\n是你的惯性反应。"}
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(246, 243, 236, 0.66)",
            fontSize: "clamp(15px, 4vw, 20px)",
            lineHeight: 1.7,
            letterSpacing: "0.08em",
            fontWeight: 300,
          }}
        >
          见自己 · 观变化 · 寻规律 · 破心结
        </p>
      </section>
      <CausalRail rightHint="右滑，进入观爻" onRight={handleEnterGuanyao} />
    </main>
  );
}

export function LaunchPage() {
  return <LaunchSafeEntry />;
}
