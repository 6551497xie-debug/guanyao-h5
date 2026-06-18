import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GyCausalRail, GyLogoMark, GyStage, GySystemReadout, GyTypewriterReadout } from "../components/visual/GyVisualChain";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getSession } from "../services/sessionService";

const USE_R7_SAFE_LAUNCH = true;
type LaunchIntroPhase =
  | "lineIdle"
  | "lineScanning"
  | "lineCollapsing"
  | "logoTyping"
  | "logoLocked"
  | "typingText"
  | "ready"
  | "exiting";
const launchCopy = `这里没有命运解释。
也没有情绪安慰。

它只接入现实压力，
让一条旧反应显形。`;

const typingDelayFor = (char: string) => {
  if (char === "\n") return 260;
  if ("。，、".includes(char)) return 150;
  return 58;
};

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
  const [phase, setPhase] = useState<LaunchIntroPhase>("lineIdle");
  const [visibleChars, setVisibleChars] = useState(0);
  const launchTimerRef = useRef<number | null>(null);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase("lineScanning"), 620),
      window.setTimeout(() => setPhase("lineCollapsing"), 1620),
      window.setTimeout(() => setPhase("logoTyping"), 1980),
      window.setTimeout(() => setPhase("logoLocked"), 3000),
      window.setTimeout(() => setPhase("typingText"), 3700),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (launchTimerRef.current) {
        window.clearTimeout(launchTimerRef.current);
      }
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "typingText") return;

    setVisibleChars(0);
    let nextIndex = 0;

    const typeNext = () => {
      nextIndex += 1;
      setVisibleChars(nextIndex);

      if (nextIndex >= launchCopy.length) {
        typingTimerRef.current = window.setTimeout(() => setPhase("ready"), 260);
        return;
      }

      typingTimerRef.current = window.setTimeout(typeNext, typingDelayFor(launchCopy[nextIndex - 1]));
    };

    typingTimerRef.current = window.setTimeout(typeNext, 120);

    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [phase]);

  function handleIgnite() {
    if (phase !== "ready") return;

    setPhase("exiting");
    launchTimerRef.current = window.setTimeout(() => {
      navigate("/mother-code");
    }, 460);
  }

  return (
    <GyStage className={`gy-launch-stage is-${phase}`} variant="void">
      <GySystemReadout code="00｜带压入局" status="GY_SANDBOX_PROTOCOL_INITIALIZED" />

      <div className="gy-launch-line-mother" aria-hidden="true" />

      <div
        className={`gy-launch-logo-field${
          phase === "logoTyping" || phase === "logoLocked" || phase === "typingText" || phase === "ready" || phase === "exiting"
            ? " is-typing"
            : ""
        }`}
        aria-hidden="true"
      >
        <GyLogoMark active={phase === "logoTyping" || phase === "logoLocked" || phase === "typingText" || phase === "ready" || phase === "exiting"} />
      </div>

      <GyTypewriterReadout className="gy-launch-assertion" aria-label="观爻沙盒启动断言">
        <p>
          {launchCopy.slice(0, visibleChars).split("\n").map((line, index, lines) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
          {phase === "typingText" ? <i className="gy-launch-type-cursor" aria-hidden="true" /> : null}
        </p>
      </GyTypewriterReadout>

      <div className={`gy-launch-bottom-rail${phase === "ready" || phase === "exiting" ? " is-unlocked" : ""}`}>
        <GyCausalRail
          active={phase === "exiting"}
          disabled={phase !== "ready"}
          hint={phase === "exiting" ? "进入时序装填" : "初始坐标待填装"}
          label={phase === "exiting" ? "初始坐标接入中" : "沿线右滑 · 启动观爻沙盒"}
          onClick={handleIgnite}
        />
      </div>

      <span className="gy-launch-system-status">{phase === "exiting" ? "SANDBOX_AXIS_ACTIVE" : "SANDBOX_AXIS_STANDBY"}</span>
    </GyStage>
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
