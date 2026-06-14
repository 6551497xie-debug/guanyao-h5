import { useEffect, useMemo, useState } from "react";
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
  const firstLine = useMemo(() => "让你停在原地的，\n不是现实，\n是你的惯性反应。", []);
  const secondLine = "进舱，解构你的行为惯性。";
  const [typedText, setTypedText] = useState("");
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showRail, setShowRail] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "collapse" | "black" | "logo">("idle");

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => {
      let index = 0;
      const typingTimer = window.setInterval(() => {
        index += 1;
        setTypedText(firstLine.slice(0, index));

        if (index >= firstLine.length) {
          window.clearInterval(typingTimer);
          timers.push(window.setTimeout(() => setShowSecondLine(true), 500));
          timers.push(window.setTimeout(() => setShowRail(true), 680));
        }
      }, 46);
      timers.push(typingTimer);
    }, 300));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [firstLine]);

  function handleEnterCabin() {
    window.navigator.vibrate?.(18);
    setTransitionPhase("collapse");
    window.setTimeout(() => setTransitionPhase("black"), 260);
    window.setTimeout(() => setTransitionPhase("logo"), 560);
    window.setTimeout(() => navigate("/mother-code"), 1060);
  }

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "min(100%, 520px)",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: "10dvh 28px calc(5dvh + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 26,
        background: "#000",
        color: "#f5f5f5",
        overflow: "hidden",
        opacity: transitionPhase === "collapse" ? 0.72 : 1,
        transform: transitionPhase === "collapse" ? "scale(0.985)" : "scale(1)",
        filter: transitionPhase === "collapse" ? "contrast(1.35) brightness(0.72)" : "none",
        transition: "opacity 260ms ease, transform 260ms ease, filter 260ms ease",
      }}
    >
      <div
        style={{
          display: "grid",
          alignContent: "center",
          minHeight: "58dvh",
          gap: 28,
        }}
      >
        <p
          style={{
            margin: 0,
            minHeight: "8.4em",
            whiteSpace: "pre-line",
            color: "rgba(246, 243, 236, 0.86)",
            fontSize: "clamp(24px, 6vw, 34px)",
            lineHeight: 1.62,
            letterSpacing: "0.06em",
            fontWeight: 300,
          }}
        >
          {typedText}
          {typedText && typedText.length < firstLine.length ? (
            <span style={{ color: "rgba(0,184,212,0.82)" }}>｜</span>
          ) : null}
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(246, 243, 236, 0.7)",
            fontSize: "clamp(16px, 4.1vw, 22px)",
            lineHeight: 1.5,
            letterSpacing: "0.06em",
            fontWeight: 300,
            opacity: showSecondLine ? 1 : 0,
            transform: showSecondLine ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 500ms ease, transform 500ms ease",
          }}
        >
          {secondLine}
        </p>
      </div>
      <div
        style={{
          opacity: showRail && transitionPhase === "idle" ? 1 : 0,
          transform: showRail && transitionPhase === "idle" ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 520ms ease, transform 520ms ease",
        }}
      >
        <CausalRail rightHint="右滑进舱" onRight={handleEnterCabin} disabled={!showRail || transitionPhase !== "idle"} />
      </div>
      {transitionPhase === "black" || transitionPhase === "logo" ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "#000",
            zIndex: 20,
          }}
        >
          <div
            style={{
              opacity: transitionPhase === "logo" ? 1 : 0,
              filter: "drop-shadow(0 0 22px rgba(0,184,212,0.55))",
              transition: "opacity 500ms ease",
            }}
          >
            <LaunchLogoMark />
          </div>
        </div>
      ) : null}
    </main>
  );
}

export function LaunchPage() {
  return <LaunchSafeEntry />;
}
