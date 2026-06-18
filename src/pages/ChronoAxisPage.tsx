// ═══════════════════════════════════════════════════════════════════
// 观爻 SANDBOX · Chrono = LOGO collapse 后的残留信息解码层
//
// Chrono 不是仪式系统、不是第二屏系统、不是单轴调频器。
// Chrono = LOGO collapse 之后的「残留读取层」—— 只读，不运行。
//
// 铁律（去仪式化降级）：
//   - 无 state machine / 无 rAF 循环 / 无 entry flow 节奏系统
//   - 无 blackout / typing / stamp / axis / gesture / collapse
//   - 无蓝色余波扩散 / 无 radial 呼吸场 / 无 axis 抽出动画
//   - 无上下滑动调频 / 无 axis 拖动 / 无时间 scrub
//   - 仅静态展示 collapse 后数据；唯一交互 = 轻触进入业务层
//
// 系统结构：
//   Launch（唯一仪式系统）→ LOGO collapse → Chrono（残留读取层）→ mother-code
// ═══════════════════════════════════════════════════════════════════

import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AUTO_ADVANCE_MS = 2800; // 残留读取展示后自动进入业务层（无点击门）

// collapse 结果快照（只读输入）
type CollapseSnapshot = {
  logoState: "collapsed";
  timestamp: number;
};

// 残留坐标（collapse 后的入局底色，与下游业务默认一致）
const RESIDUAL_DATE   = "1995 / 06 / 02";
const RESIDUAL_PERIOD = "17:00 - 19:00";
const RESIDUAL_GEO    = "中国 / 广东省 / 广州市";

const mono = '"SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace';

export function ChronoAxisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromCollapse = (location.state as { source?: string } | null)?.source === "logo-collapse";

  // 自动进入业务层（单跳转，无第二层点击屏）；轻触可提前跳过
  useEffect(() => {
    if (!fromCollapse) return;
    const id = window.setTimeout(() => navigate("/mother-code"), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [fromCollapse, navigate]);

  // 无 LOGO 来源 → 不是残留场，退回首页（LOGO 与 Chrono 完全解耦的唯一接口 = 来源标记）
  if (!fromCollapse) return <Navigate to="/" replace />;

  // 只读快照（不参与 LOGO/collapse 逻辑，仅承接结果时间戳）
  const snapshot: CollapseSnapshot = { logoState: "collapsed", timestamp: Date.now() };

  // 自动进入；轻触仅作为提前跳过（非必需）
  function handleContinue() {
    navigate("/mother-code");
  }

  return (
    <div
      onClick={handleContinue}
      style={{
        position:       "fixed",
        inset:          0,
        // 极低对比冷蓝静态背景（alpha ≤ 0.03），无动画、无呼吸场
        background:     "radial-gradient(circle at 50% 42%, rgba(0,184,212,0.03), rgba(0,0,0,1) 60%), #000000",
        color:          "#ECEFF2",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            18,
        padding:        "0 24px",
        cursor:         "pointer",
        userSelect:     "none",
      }}
    >
      {/* 顶部铭牌（静态结构行，承接首页） */}
      <span
        style={{
          position:      "absolute",
          top:           20,
          left:          0,
          right:         0,
          textAlign:     "center",
          fontFamily:    mono,
          fontSize:      11,
          letterSpacing: "0.04em",
          color:         "#333333",
        }}
      >
        GUANYAO SANDBOX  |  SYSTEM: 01_CHRONO  |  观爻
      </span>

      {/* 残留读取标签 */}
      <span
        style={{
          fontFamily:    mono,
          fontSize:      11,
          letterSpacing: "0.18em",
          color:         "rgba(0,184,212,0.6)",
        }}
      >
        RESIDUAL READOUT
      </span>

      {/* 时间数据（静态，无 scrub） */}
      <div
        style={{
          fontFamily:    mono,
          fontSize:      "clamp(26px, 8vw, 34px)",
          letterSpacing: "0.06em",
          color:         "rgba(236,239,242,0.92)",
          lineHeight:    1.3,
          textAlign:     "center",
        }}
      >
        {RESIDUAL_DATE}
      </div>
      <div
        style={{
          fontFamily:    mono,
          fontSize:      "clamp(18px, 5.6vw, 22px)",
          letterSpacing: "0.08em",
          color:         "rgba(0,184,212,0.9)",
        }}
      >
        {RESIDUAL_PERIOD}
      </div>

      {/* 地点 */}
      <div
        style={{
          fontFamily:    mono,
          fontSize:      12,
          letterSpacing: "0.1em",
          color:         "rgba(236,239,242,0.5)",
        }}
      >
        {RESIDUAL_GEO}
      </div>

      {/* 快照状态（只读） */}
      <span
        style={{
          fontFamily:    mono,
          fontSize:      10,
          letterSpacing: "0.12em",
          color:         "rgba(236,239,242,0.22)",
        }}
      >
        LOGO_STATE: {snapshot.logoState}
      </span>

      {/* 唯一交互提示 */}
      <span
        style={{
          position:      "absolute",
          bottom:        "calc(7dvh + env(safe-area-inset-bottom))",
          left:          0,
          right:         0,
          textAlign:     "center",
          fontFamily:    mono,
          fontSize:      11,
          letterSpacing: "0.14em",
          color:         "rgba(120,130,135,0.55)",
        }}
      >
解码残留坐标 · 自动进入
      </span>
    </div>
  );
}
