import { useState } from "react";
import "../styles/guanyaoVisualTokens.css";
import {
  GyAxisLineV2,
  GyCardShellV2,
  GyCausalRailV2,
  GySignalDotV2,
} from "../components/visual-system";
import type { GyAxisLineV2State } from "../components/visual-system";

// ─── 纯视觉实验室，不读取任何业务数据 ───────────────────────────
// 不写 LocalStorage，不触发真实事件，不接主链路。

const AXIS_STATES: GyAxisLineV2State[] = ["idle", "active", "tense", "break", "rebound"];
const AXIS_PROGRESS: number[] = [0, 0.35, 0.7, 1];

const DOT_ROWS: Array<{ label: string; variant: "slider" | "tick" | "burst"; active: boolean; tone: "base" | "active" | "break" }> = [
  { label: "idle  · slider", variant: "slider", active: false, tone: "base" },
  { label: "hover · slider", variant: "slider", active: false, tone: "active" },
  { label: "active · slider", variant: "slider", active: true, tone: "active" },
  { label: "locked · tick", variant: "tick", active: false, tone: "base" },
  { label: "broken · burst", variant: "burst", active: true, tone: "break" },
];

const CARD_TONES: Array<{ tone: "void" | "gold"; label: string; sublabel: string }> = [
  { tone: "void", label: "母码卡壳", sublabel: "MOTHER CODE · VOID" },
  { tone: "gold", label: "卦码卡壳", sublabel: "HEXAGRAM · GOLD" },
];

const CAUSAL_STEPS = [
  { id: "see", label: "见自己", state: "locked" as const },
  { id: "change", label: "观变化", state: "active" as const },
  { id: "pattern", label: "循规律", state: "idle" as const },
  { id: "break", label: "破心结", state: "idle" as const },
];

const ROOT: React.CSSProperties = {
  minHeight: "100dvh",
  background: "var(--gy-void, #000)",
  color: "var(--gy-text, rgba(246,243,236,0.72))",
  fontFamily: "var(--gy-font-mono, monospace)",
  padding: "0 clamp(16px, 5vw, 40px) 60px",
  overflowX: "hidden",
};

const SECTION: React.CSSProperties = {
  borderTop: "var(--gy-hairline, 1px) solid var(--gy-line-dim, rgba(228,231,234,0.28))",
  paddingTop: 28,
  marginTop: 40,
};

const LABEL: React.CSSProperties = {
  fontSize: "var(--gy-size-label, 11px)",
  letterSpacing: "var(--gy-tracking-mono, 0.16em)",
  color: "var(--gy-text-dim, rgba(246,243,236,0.46))",
  marginBottom: 6,
  marginTop: 0,
};

const SUBLABEL: React.CSSProperties = {
  fontSize: "var(--gy-size-micro, 10px)",
  letterSpacing: "var(--gy-tracking-mono, 0.16em)",
  color: "var(--gy-text-dim, rgba(246,243,236,0.28))",
  marginBottom: 0,
  marginTop: 0,
};

const SECTION_TITLE: React.CSSProperties = {
  fontSize: "var(--gy-size-label, 11px)",
  letterSpacing: "var(--gy-tracking-wide, 0.15em)",
  color: "var(--gy-active, #00b8d4)",
  marginBottom: 20,
  marginTop: 0,
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p style={SECTION_TITLE}>{children}</p>;
}

function Row({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>
      {children}
    </div>
  );
}

function Cell({ children, label, sublabel }: { children: React.ReactNode; label?: string; sublabel?: string }) {
  return (
    <div style={{ minWidth: 120, flex: "1 1 120px" }}>
      {label && <p style={LABEL}>{label}</p>}
      {children}
      {sublabel && <p style={SUBLABEL}>{sublabel}</p>}
    </div>
  );
}

// ─── Card Shell 翻面演示 ──────────────────────────────────────────
function CardDemo({ tone, label, sublabel }: { tone: "void" | "gold"; label: string; sublabel: string }) {
  const [face, setFace] = useState<"A" | "B">("A");
  return (
    <Cell label={label} sublabel={sublabel}>
      <GyCardShellV2
        tone={tone}
        face={face}
        onFlip={(next) => setFace(next)}
        edgeHairline
        front={
          <div style={{ display: "grid", placeItems: "center", height: "100%", gap: 8 }}>
            <span style={{ ...LABEL, textAlign: "center" }}>{label}</span>
            <span style={{ ...SUBLABEL, textAlign: "center" }}>A 面 · 无卦符</span>
            <span style={{ ...SUBLABEL, textAlign: "center", marginTop: 4, color: "var(--gy-text-dim)" }}>点击翻面</span>
          </div>
        }
        back={
          <div style={{ display: "grid", placeItems: "center", height: "100%", gap: 8 }}>
            <span style={{ ...LABEL, textAlign: "center" }}>B 面</span>
            <span style={{ fontSize: 22, letterSpacing: 4, color: "var(--gy-break, #c7a96b)", lineHeight: 1.6 }}>
              ䷀
            </span>
            <span style={{ ...SUBLABEL, textAlign: "center" }}>固定六爻卦形</span>
          </div>
        }
        style={{ maxWidth: 160 }}
      />
      <p style={{ ...SUBLABEL, marginTop: 8 }}>这是视觉壳，不接真实数据</p>
    </Cell>
  );
}

export function VisualSystemLabPage() {
  return (
    <div style={ROOT}>

      {/* ── Header ── */}
      <div style={{ paddingTop: 48, paddingBottom: 8 }}>
        <p style={{ ...LABEL, color: "var(--gy-active, #00b8d4)", marginBottom: 4 }}>
          R8 VISUAL SYSTEM LAB
        </p>
        <p style={{ margin: 0, fontSize: "var(--gy-size-display, 32px)", letterSpacing: "var(--gy-tracking-wide, 0.15em)", color: "var(--gy-text-strong, rgba(246,243,236,0.92))", fontWeight: 300 }}>
          GUANYAO 2.0
        </p>
        <p style={{ ...SUBLABEL, marginTop: 6 }}>1PX AXIS TESTBED · DEV ONLY · NOT LINKED TO MAIN FLOW</p>
      </div>

      {/* ══ 1. AXIS LINE ══ */}
      <div style={SECTION}>
        <SectionTitle>01 · AXIS LINE — 1PX 生命线</SectionTitle>
        <div style={{ display: "grid", gap: 24 }}>
          {AXIS_STATES.map((s) => (
            <div key={s}>
              <p style={LABEL}>state: {s}</p>
              <GyAxisLineV2 state={s} progress={s === "active" ? 0.6 : s === "tense" ? 0.85 : 0} />
            </div>
          ))}
          <div>
            <p style={LABEL}>progress 样例：0 / 0.35 / 0.7 / 1</p>
            <div style={{ display: "grid", gap: 12 }}>
              {AXIS_PROGRESS.map((p) => (
                <div key={p}>
                  <p style={SUBLABEL}>progress={p}</p>
                  <GyAxisLineV2 state="active" progress={p} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={LABEL}>tone: break（冷金）</p>
            <GyAxisLineV2 state="break" tone="break" />
          </div>
        </div>
      </div>

      {/* ══ 2. SIGNAL DOT ══ */}
      <div style={SECTION}>
        <SectionTitle>02 · SIGNAL DOT — 信号点</SectionTitle>
        <p style={{ ...SUBLABEL, marginBottom: 16 }}>不是 radio，不是 checkbox，不是 tag。是信号节点。</p>
        <Row gap={24}>
          {DOT_ROWS.map((d) => (
            <Cell key={d.label} label={d.label}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 32 }}>
                <GySignalDotV2 variant={d.variant} tone={d.tone} active={d.active} glow={d.active} />
                <span style={{ ...SUBLABEL }}>{d.variant}</span>
              </div>
            </Cell>
          ))}
        </Row>
        <div style={{ marginTop: 24 }}>
          <p style={LABEL}>组合：三点轨道</p>
          <div style={{ display: "flex", alignItems: "center", gap: 0, width: "84%", maxWidth: 420, margin: "0 auto" }}>
            <GySignalDotV2 variant="tick" tone="break" active />
            <div style={{ flex: 1, height: 1, background: "var(--gy-active, #00b8d4)" }} />
            <GySignalDotV2 variant="slider" tone="active" active />
            <div style={{ flex: 1, height: 1, background: "var(--gy-line-dim, rgba(228,231,234,0.28))" }} />
            <GySignalDotV2 variant="tick" tone="base" active={false} />
          </div>
        </div>
      </div>

      {/* ══ 3. CAUSAL RAIL ══ */}
      <div style={SECTION}>
        <SectionTitle>03 · CAUSAL RAIL — 因果轨道壳</SectionTitle>
        <p style={{ ...SUBLABEL, marginBottom: 16 }}>只展示视觉，不触发业务，不绑定真实手势。</p>

        <div style={{ display: "grid", gap: 24 }}>
          {/* 步骤节点组合展示 */}
          <div>
            <p style={LABEL}>四段视觉链节点</p>
            <div style={{ display: "flex", alignItems: "center", gap: 0, width: "84%", maxWidth: 420, margin: "0 auto" }}>
              {CAUSAL_STEPS.map((step, i) => (
                <div key={step.id} style={{ display: "contents" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <GySignalDotV2
                      variant={step.state === "active" ? "slider" : "tick"}
                      tone={step.state === "active" ? "active" : step.state === "locked" ? "break" : "base"}
                      active={step.state === "active" || step.state === "locked"}
                      glow={step.state === "active"}
                    />
                    <span style={{ ...SUBLABEL, whiteSpace: "nowrap" }}>{step.label}</span>
                  </div>
                  {i < CAUSAL_STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: i === 0 ? "var(--gy-break, #c7a96b)" : "var(--gy-line-dim, rgba(228,231,234,0.28))" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* mode: advance */}
          <div>
            <p style={LABEL}>mode: advance（右滑推进·冷蓝）</p>
            <GyCausalRailV2
              mode="advance"
              statusLabel="右滑推进"
              hint="→ 推进"
              onProgress={() => {}}
              onTrigger={() => {}}
            />
          </div>

          {/* mode: break */}
          <div>
            <p style={LABEL}>mode: break（左滑崩断·冷金）</p>
            <GyCausalRailV2
              mode="break"
              statusLabel="左滑崩断"
              hint="← 崩断"
              onProgress={() => {}}
              onTrigger={() => {}}
            />
          </div>

          {/* disabled */}
          <div>
            <p style={LABEL}>disabled 态</p>
            <GyCausalRailV2 mode="advance" disabled statusLabel="已锁定" />
          </div>
        </div>
      </div>

      {/* ══ 4. CARD SHELL ══ */}
      <div style={SECTION}>
        <SectionTitle>04 · CARD SHELL — 卡片壳</SectionTitle>
        <p style={{ ...SUBLABEL, marginBottom: 16 }}>
          A 面禁卦符 · B 面允许固定六爻卦形 · 点击卡片翻面 · 不接真实数据
        </p>
        <Row gap={24}>
          {CARD_TONES.map((c) => (
            <CardDemo key={c.tone} tone={c.tone} label={c.label} sublabel={c.sublabel} />
          ))}
        </Row>
      </div>

      {/* ══ 5. STAGE PHASES ══ */}
      <div style={SECTION}>
        <SectionTitle>05 · STAGE PHASES — 舞台相位</SectionTitle>
        <p style={{ ...SUBLABEL, marginBottom: 16 }}>GyVisualStageV2 的 phase 概念展示（标签态，canvas 未激活）</p>
        <div style={{ display: "grid", gap: 12 }}>
          {(["idle", "ignite", "split", "measure", "break", "settle"] as const).map((phase) => (
            <div
              key={phase}
              style={{
                position: "relative",
                height: 48,
                border: "var(--gy-hairline, 1px) solid var(--gy-line-dim, rgba(228,231,234,0.18))",
                display: "flex",
                alignItems: "center",
                paddingLeft: 16,
                gap: 16,
              }}
            >
              <GyAxisLineV2
                state={
                  phase === "ignite" ? "active" :
                  phase === "split" ? "tense" :
                  phase === "break" ? "break" :
                  phase === "settle" ? "rebound" :
                  "idle"
                }
                progress={
                  phase === "ignite" ? 0.4 :
                  phase === "split" ? 0.65 :
                  phase === "measure" ? 0.82 :
                  phase === "break" ? 0 :
                  phase === "settle" ? 1 :
                  0
                }
                style={{ position: "absolute", inset: 0, width: "100%" }}
              />
              <span style={{ ...SUBLABEL, position: "relative", zIndex: 1 }}>phase: {phase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ marginTop: 48, paddingTop: 16, borderTop: "var(--gy-hairline, 1px) solid var(--gy-line-dim, rgba(228,231,234,0.18))" }}>
        <p style={SUBLABEL}>DEV ONLY · R8-VISUAL-SYSTEM-LAB-P1 · NOT LINKED TO MAIN FLOW · NOT FOR PRODUCTION</p>
      </div>
    </div>
  );
}
