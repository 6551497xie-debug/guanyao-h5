import type { CSSProperties } from "react";

type GuanyaoHexagramVisualPlaceholderProps = {
  code: string;
  visualStructure: string;
};

const coldGold = "rgba(229,196,126,0.74)";
const dimGold = "rgba(229,196,126,0.28)";
const coldBlue = "rgba(0,184,212,0.22)";

function layerStyle(top: string, height: string, opacity: number): CSSProperties {
  return {
    position: "absolute",
    left: "8%",
    right: "8%",
    top,
    height,
    borderRadius: 999,
    background: `linear-gradient(90deg, rgba(229,196,126,0.04), rgba(229,196,126,${opacity}), rgba(229,196,126,0.04))`,
  };
}

function fractureStyle(left: string, top: string, height: string, rotate: number): CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width: 2,
    height,
    transform: `rotate(${rotate}deg)`,
    transformOrigin: "top",
    background: "linear-gradient(180deg, rgba(246,232,188,0.72), rgba(0,184,212,0.12), transparent)",
    boxShadow: "0 0 20px rgba(229,196,126,0.28)",
  };
}

function nodeStyle(left: string, top: string, size = 8, opacity = 0.65): CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width: size,
    height: size,
    borderRadius: 999,
    background: `rgba(229,196,126,${opacity})`,
    boxShadow: "0 0 22px rgba(229,196,126,0.32)",
  };
}

function VisualSkeleton({ code }: { code: string }) {
  switch (code) {
    case "001":
      return (
        <>
          <span style={{ position: "absolute", left: "49%", top: "-10%", width: 4, height: "78%", background: "linear-gradient(180deg, rgba(246,232,188,0.9), rgba(229,196,126,0.16), transparent)", boxShadow: "0 0 34px rgba(229,196,126,0.46)" }} />
          <span style={{ position: "absolute", left: "36%", right: "36%", bottom: "24%", height: 10, background: "rgba(229,196,126,0.52)", boxShadow: "0 0 22px rgba(229,196,126,0.34)" }} />
          <span style={{ position: "absolute", left: "41%", right: "41%", bottom: "19%", height: 30, borderLeft: "1px solid rgba(246,232,188,0.16)", borderRight: "1px solid rgba(246,232,188,0.16)" }} />
        </>
      );
    case "002":
      return (
        <>
          <span style={{ position: "absolute", left: "16%", right: "16%", top: "13%", height: 46, borderRadius: "0 0 12px 12px", background: "linear-gradient(180deg, rgba(246,232,188,0.12), rgba(246,232,188,0.02))", borderBottom: "1px solid rgba(229,196,126,0.2)" }} />
          <span style={layerStyle("45%", "4px", 0.34)} />
          <span style={layerStyle("55%", "5px", 0.24)} />
          <span style={layerStyle("66%", "6px", 0.2)} />
          <span style={layerStyle("78%", "8px", 0.16)} />
          <span style={{ position: "absolute", left: "18%", right: "18%", bottom: "25%", height: 1, background: "rgba(0,184,212,0.18)", boxShadow: "0 0 20px rgba(0,184,212,0.24)" }} />
        </>
      );
    case "003":
      return (
        <>
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "52%", background: "linear-gradient(180deg, rgba(20,18,15,0.2), rgba(8,7,6,0.94))", borderTop: "1px solid rgba(229,196,126,0.12)" }} />
          <span style={fractureStyle("49%", "39%", "45%", -8)} />
          <span style={fractureStyle("52%", "45%", "34%", 12)} />
          <span style={{ position: "absolute", left: "38%", right: "37%", bottom: "12%", height: "42%", background: "radial-gradient(ellipse at center, rgba(0,184,212,0.26), rgba(229,196,126,0.16), transparent 70%)", filter: "blur(2px)" }} />
        </>
      );
    case "004":
      return (
        <>
          <span style={{ position: "absolute", left: "16%", right: "12%", bottom: "32%", height: "34%", clipPath: "polygon(5% 100%, 35% 24%, 52% 58%, 70% 18%, 96% 100%)", background: "linear-gradient(180deg, rgba(246,232,188,0.16), rgba(246,232,188,0.04))" }} />
          <span style={{ position: "absolute", left: "-14%", right: "-14%", top: "26%", height: 36, borderRadius: 999, background: "rgba(246,240,221,0.08)", filter: "blur(10px)" }} />
          <span style={{ position: "absolute", left: "-12%", right: "-12%", top: "48%", height: 32, borderRadius: 999, background: "rgba(246,240,221,0.07)", filter: "blur(9px)" }} />
          <span style={{ position: "absolute", left: 0, right: 0, bottom: "13%", height: 20, background: "linear-gradient(90deg, transparent, rgba(0,184,212,0.18), transparent)" }} />
        </>
      );
    case "005":
      return (
        <>
          <span style={{ position: "absolute", left: "7%", right: "7%", top: "44%", height: 2, background: "rgba(246,232,188,0.28)", boxShadow: "0 0 18px rgba(0,184,212,0.26)" }} />
          <span style={{ position: "absolute", left: "30%", right: "30%", top: "45%", bottom: "14%", clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)", background: "linear-gradient(180deg, rgba(0,184,212,0.13), rgba(229,196,126,0.16), transparent)", borderLeft: "1px solid rgba(229,196,126,0.12)", borderRight: "1px solid rgba(229,196,126,0.12)" }} />
          <span style={{ position: "absolute", left: "38%", right: "38%", top: "14%", height: 24, borderRadius: 999, background: "rgba(229,196,126,0.18)", filter: "blur(7px)" }} />
        </>
      );
    case "006":
      return (
        <>
          <span style={{ position: "absolute", left: "28%", right: "28%", top: 0, height: "42%", clipPath: "polygon(0 0, 100% 0, 57% 100%, 43% 100%)", background: "linear-gradient(180deg, rgba(246,232,188,0.42), rgba(229,196,126,0.08))" }} />
          <span style={{ position: "absolute", left: 0, right: 0, bottom: "10%", height: "34%", background: "radial-gradient(ellipse at 50% 100%, rgba(0,184,212,0.24), rgba(0,0,0,0) 68%)" }} />
          <span style={fractureStyle("50%", "33%", "44%", 0)} />
          <span style={{ position: "absolute", left: "21%", right: "21%", top: "49%", height: 1, background: "rgba(246,232,188,0.26)" }} />
        </>
      );
    case "007":
      return (
        <>
          <span style={nodeStyle("48%", "43%", 13, 0.82)} />
          <span style={nodeStyle("28%", "35%", 8, 0.42)} />
          <span style={nodeStyle("66%", "36%", 8, 0.42)} />
          <span style={nodeStyle("24%", "61%", 8, 0.4)} />
          <span style={nodeStyle("70%", "62%", 8, 0.4)} />
          <span style={{ position: "absolute", left: "31%", right: "31%", top: "47%", height: 1, background: "rgba(229,196,126,0.22)" }} />
          <span style={{ position: "absolute", left: "50%", top: "38%", bottom: "31%", width: 1, background: "rgba(229,196,126,0.16)" }} />
          <span style={{ position: "absolute", left: "38%", right: "38%", bottom: "19%", height: 14, borderTop: "1px solid rgba(229,196,126,0.18)" }} />
        </>
      );
    case "008":
      return (
        <>
          <span style={nodeStyle("48%", "48%", 12, 0.84)} />
          <span style={{ position: "absolute", left: "28%", top: "32%", width: "46%", height: "46%", border: "1px solid rgba(0,184,212,0.18)", borderRadius: "50%" }} />
          <span style={{ position: "absolute", left: "36%", top: "40%", width: "30%", height: "30%", border: "1px solid rgba(229,196,126,0.16)", borderRadius: "50%" }} />
          <span style={{ position: "absolute", left: "17%", right: "55%", top: "53%", height: 1, transform: "rotate(10deg)", background: "rgba(229,196,126,0.28)" }} />
          <span style={{ position: "absolute", left: "56%", right: "18%", top: "41%", height: 1, transform: "rotate(-18deg)", background: "rgba(229,196,126,0.24)" }} />
          <span style={{ position: "absolute", left: "50%", right: "30%", bottom: "20%", height: 1, transform: "rotate(36deg)", background: "rgba(229,196,126,0.22)" }} />
        </>
      );
    case "009":
      return (
        <>
          <span style={{ position: "absolute", left: "-7%", right: "-7%", top: "18%", height: "32%", borderRadius: "0 0 50% 50%", background: "linear-gradient(180deg, rgba(246,240,221,0.13), rgba(229,196,126,0.04))", borderBottom: "1px solid rgba(229,196,126,0.18)" }} />
          <span style={{ position: "absolute", left: "49%", top: "26%", width: 3, height: "34%", background: "linear-gradient(180deg, rgba(246,232,188,0.48), rgba(229,196,126,0.06))", boxShadow: "0 0 20px rgba(229,196,126,0.22)" }} />
          <span style={{ position: "absolute", left: "39%", right: "39%", bottom: "17%", height: 30, border: "1px solid rgba(229,196,126,0.16)", borderRadius: "50%" }} />
        </>
      );
    case "010":
      return (
        <>
          <span style={{ position: "absolute", inset: "18% 8% 14%", background: "linear-gradient(145deg, rgba(246,240,221,0.025), rgba(0,184,212,0.045))", borderTop: "1px solid rgba(246,232,188,0.11)" }} />
          <span style={{ position: "absolute", left: "45%", top: "16%", width: 20, height: "72%", transform: "rotate(9deg)", background: "linear-gradient(180deg, rgba(246,232,188,0.52), rgba(229,196,126,0.12), rgba(246,232,188,0.5))", boxShadow: "0 0 24px rgba(229,196,126,0.24)" }} />
          <span style={fractureStyle("31%", "42%", "30%", -44)} />
          <span style={fractureStyle("65%", "38%", "34%", 38)} />
          <span style={fractureStyle("23%", "62%", "18%", -68)} />
        </>
      );
    default:
      return <span style={{ position: "absolute", left: "16%", right: "16%", top: "50%", height: 1, background: dimGold }} />;
  }
}

export function GuanyaoHexagramVisualPlaceholder({ code, visualStructure }: GuanyaoHexagramVisualPlaceholderProps) {
  return (
    <div
      aria-label={`${visualStructure} 无字主视觉占位`}
      style={{
        position: "relative",
        minHeight: 0,
        border: "1px solid rgba(229,196,126,0.16)",
        background:
          `radial-gradient(circle at 50% 52%, ${coldBlue}, transparent 32%), radial-gradient(circle at 50% 18%, rgba(229,196,126,0.13), transparent 26%), linear-gradient(145deg, rgba(246,232,188,0.045), rgba(255,255,255,0.012)), #070706`,
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, transparent 0 42%, rgba(0,0,0,0.34) 100%)",
          pointerEvents: "none",
        }}
      />
      <VisualSkeleton code={code} />
      <span
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${dimGold}, transparent)`,
          opacity: 0.58,
        }}
      />
    </div>
  );
}
