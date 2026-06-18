import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type GyStageProps = {
  children: ReactNode;
  className?: string;
  variant?: "instrument" | "asset" | "void";
};

export function GyStage({ children, className = "", variant = "instrument" }: GyStageProps) {
  return (
    <main className={`gy-stage gy-stage--${variant}${className ? ` ${className}` : ""}`}>
      {children}
    </main>
  );
}

type GySystemReadoutProps = {
  code: string;
  status: string;
  className?: string;
};

export function GySystemReadout({ code, status, className = "" }: GySystemReadoutProps) {
  return (
    <header className={`gy-system-readout${className ? ` ${className}` : ""}`}>
      <span>{code}</span>
      <span>{status}</span>
    </header>
  );
}

type GyCausalRailProps = {
  label: string;
  hint?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export function GyCausalRail({ label, hint, active = false, disabled = false, className = "", onClick }: GyCausalRailProps) {
  return (
    <button
      className={`gy-causal-rail-vc${active ? " is-active" : ""}${className ? ` ${className}` : ""}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="gy-causal-rail-vc__label">{label}</span>
      <span className="gy-causal-rail-vc__dot" />
      <span className="gy-causal-rail-vc__track" />
      {hint ? <span className="gy-causal-rail-vc__hint">{hint}</span> : null}
    </button>
  );
}

const gyLogoStrokes = [
  { id: "s1", kind: "main", x1: 58, y1: 18, x2: 84, y2: 40 },
  { id: "s2", kind: "main", x1: 122, y1: 18, x2: 96, y2: 40 },
  { id: "s3", kind: "main", x1: 42, y1: 78, x2: 82, y2: 48 },
  { id: "s4", kind: "main", x1: 138, y1: 78, x2: 98, y2: 48 },
  { id: "s5", kind: "cut", x1: 76, y1: 36, x2: 83, y2: 42 },
  { id: "s6", kind: "cut", x1: 104, y1: 36, x2: 97, y2: 42 },
  { id: "s7", kind: "cut", x1: 76, y1: 56, x2: 83, y2: 50 },
  { id: "s8", kind: "cut", x1: 104, y1: 56, x2: 97, y2: 50 },
];

type GyLogoMarkProps = {
  active?: boolean;
  className?: string;
};

export function GyLogoMark({ active = true, className = "" }: GyLogoMarkProps) {
  return (
    <svg className={`gy-logo-mark${active ? " is-active" : ""}${className ? ` ${className}` : ""}`} viewBox="0 0 180 96" aria-hidden="true">
      {gyLogoStrokes.map((stroke) => (
        <line
          key={stroke.id}
          className={`gy-logo-mark__stroke gy-logo-mark__stroke--${stroke.kind} ${stroke.id}`}
          x1={stroke.x1}
          y1={stroke.y1}
          x2={stroke.x2}
          y2={stroke.y2}
        />
      ))}
    </svg>
  );
}

type GyTypewriterReadoutProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function GyTypewriterReadout({ children, className = "", align = "left", ...props }: GyTypewriterReadoutProps) {
  return (
    <div className={`gy-typewriter-readout gy-typewriter-readout--${align}${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </div>
  );
}

type GyPanelProps = {
  children?: ReactNode;
  className?: string;
  status?: string;
  style?: CSSProperties;
};

export function GyInstrumentBox({ children, className = "", status, style }: GyPanelProps) {
  return (
    <section className={`gy-instrument-box-vc${className ? ` ${className}` : ""}`} style={style}>
      {status ? <span className="gy-instrument-box-vc__status">{status}</span> : null}
      {children}
    </section>
  );
}

export function GyGlassSeed({ children, className = "", status, style }: GyPanelProps) {
  return (
    <section className={`gy-glass-seed${className ? ` ${className}` : ""}`} style={style}>
      {status ? <span className="gy-glass-seed__status">{status}</span> : null}
      {children}
    </section>
  );
}

export function GyAssetCard({ children, className = "", status, style }: GyPanelProps) {
  return (
    <article className={`gy-asset-card-vc${className ? ` ${className}` : ""}`} style={style}>
      {status ? <span className="gy-asset-card-vc__status">{status}</span> : null}
      {children}
    </article>
  );
}
