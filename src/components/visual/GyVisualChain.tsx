import { useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode } from "react";

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
  direction?: "right" | "left" | "both";
  active?: boolean;
  disabled?: boolean;
  locked?: boolean;
  className?: string;
  onComplete?: () => void;
  onClick?: () => void;
};

const COMPLETE_THRESHOLD = 0.72;
const COMPLETE_ANIMATION_MS = 360;

export function GyCausalRail({
  label,
  hint,
  direction = "right",
  active = false,
  disabled = false,
  locked = false,
  className = "",
  onComplete,
  onClick,
}: GyCausalRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const didCompleteRef = useRef(false);
  const completeTimerRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(direction === "both" ? 0.5 : 0);
  const [completed, setCompleted] = useState(false);
  const completeHandler = onComplete ?? onClick;

  useEffect(() => {
    didCompleteRef.current = false;
    if (completeTimerRef.current) {
      window.clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
    setCompleted(false);
    setIsDragging(false);
    setProgress(direction === "both" ? 0.5 : 0);
  }, [disabled, direction, completeHandler]);

  useEffect(() => {
    return () => {
      if (completeTimerRef.current) {
        window.clearTimeout(completeTimerRef.current);
      }
    };
  }, []);

  function triggerComplete() {
    if (disabled || didCompleteRef.current) {
      return;
    }

    didCompleteRef.current = true;
    setCompleted(true);
    setProgress(1);
    completeTimerRef.current = window.setTimeout(() => {
      completeTimerRef.current = null;
      completeHandler?.();
    }, COMPLETE_ANIMATION_MS);
  }

  function readPointerProgress(event: PointerEvent<HTMLDivElement>) {
    const bounds = railRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width <= 0) {
      return direction === "both" ? 0.5 : 0;
    }

    const rawProgress = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));

    if (direction === "left") {
      return 1 - rawProgress;
    }

    if (direction === "both") {
      return Math.abs(rawProgress - 0.5) * 2;
    }

    return rawProgress;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }

    setIsDragging(true);
    railRef.current?.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging || disabled) {
      return;
    }

    setProgress(readPointerProgress(event));
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }

    const nextProgress = readPointerProgress(event);
    setIsDragging(false);
    setProgress(nextProgress);
    railRef.current?.releasePointerCapture(event.pointerId);

    if (nextProgress >= COMPLETE_THRESHOLD) {
      triggerComplete();
    }
  }

  return (
    <div
      aria-disabled={disabled}
      className={`gy-causal-rail-vc${active ? " is-active" : ""}${locked ? " is-locked" : ""}${completed ? " is-completed" : ""}${className ? ` ${className}` : ""}`}
      data-direction={direction}
      data-disabled={disabled}
      onClick={triggerComplete}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerComplete();
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={railRef}
      role="button"
      style={{ "--gy-rail-progress": `${Math.round(progress * 100)}%` } as CSSProperties}
      tabIndex={disabled ? -1 : 0}
    >
      <div className="gy-causal-rail-vc__label">{label}</div>
      <div className="gy-causal-rail-vc__track">
        <span className="gy-causal-rail-vc__progress" />
        <span className="gy-causal-rail-vc__dot" />
      </div>
      {hint ? <div className="gy-causal-rail-vc__hint">{hint}</div> : null}
    </div>
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
