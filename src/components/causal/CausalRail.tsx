import { useRef, useState } from "react";

type CausalRailProps = {
  statusLabel?: string;
  leftHint?: string;
  rightHint: string;
  onLeft?: () => void;
  onRight: () => void;
  disabled?: boolean;
};

export function CausalRail({ statusLabel, leftHint, rightHint, onLeft, onRight, disabled = false }: CausalRailProps) {
  const startXRef = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const completionTimerRef = useRef<number | null>(null);
  const suppressNextClickRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const basePoint = onLeft ? 50 : 0;
  const dotPosition = progress >= 0
    ? basePoint + progress * (100 - basePoint)
    : basePoint + progress * basePoint;
  const progressStart = Math.min(basePoint, dotPosition);
  const progressWidth = Math.abs(dotPosition - basePoint);

  function resetProgress() {
    setIsDragging(false);
    setIsCompleting(false);
    setProgress(0);
  }

  function finish(direction: "left" | "right") {
    if (disabled) return;
    if (direction === "left" && !onLeft) return;

    if (completionTimerRef.current) {
      window.clearTimeout(completionTimerRef.current);
    }

    setIsDragging(false);
    setIsCompleting(true);
    setProgress(direction === "left" ? -1 : 1);

    completionTimerRef.current = window.setTimeout(() => {
      if (direction === "left") {
        onLeft?.();
      } else {
        onRight();
      }

      window.setTimeout(resetProgress, 180);
    }, 170);
  }

  function completeRight() {
    finish("right");
  }

  function completeLeft() {
    finish("left");
  }

  function handlePointerMove(clientX: number) {
    const startX = startXRef.current;
    if (startX === null || disabled) return;

    const bounds = railRef.current?.getBoundingClientRect();
    const railWidth = bounds?.width ?? 1;
    const deltaX = clientX - startX;
    const maxRight = onLeft ? railWidth / 2 : railWidth;
    const maxLeft = onLeft ? railWidth / 2 : 0;
    const nextProgress = deltaX >= 0
      ? Math.min(deltaX / Math.max(maxRight, 1), 1)
      : onLeft
        ? Math.max(deltaX / Math.max(maxLeft, 1), -1)
        : 0;

    setProgress(nextProgress);
  }

  function handlePointerUp(clientX: number) {
    const startX = startXRef.current;
    startXRef.current = null;
    setIsDragging(false);

    if (startX === null || disabled) return;

    const deltaX = clientX - startX;

    if (deltaX <= -42 && onLeft) {
      suppressNextClickRef.current = true;
      finish("left");
      return;
    }

    if (deltaX >= 42) {
      suppressNextClickRef.current = true;
      finish("right");
      return;
    }

    setProgress(0);
  }

  function handleClick(clientX: number) {
    if (disabled) return;
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      return;
    }

    const bounds = railRef.current?.getBoundingClientRect();
    const clickX = bounds ? clientX - bounds.left : 0;
    const clickedLeftSide = Boolean(onLeft && bounds && clickX < bounds.width / 2);

    finish(clickedLeftSide ? "left" : "right");
  }

  return (
    <section
      aria-label={statusLabel ?? rightHint}
      style={{
        display: "grid",
        gap: 8,
        marginTop: "auto",
        paddingTop: 6,
        opacity: disabled ? 0.46 : 1,
        pointerEvents: disabled ? "none" : "auto",
        touchAction: "pan-y",
      }}
    >
      {statusLabel ? (
        <p
          style={{
            margin: 0,
            color: "rgba(246,243,236,0.42)",
            fontSize: 12,
            lineHeight: 1.45,
            letterSpacing: "0.08em",
            textAlign: "center",
          }}
        >
          {statusLabel}
        </p>
      ) : null}
      <div
        ref={railRef}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onPointerDown={(event) => {
          startXRef.current = event.clientX;
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => handlePointerMove(event.clientX)}
        onPointerUp={(event) => handlePointerUp(event.clientX)}
        onPointerCancel={() => {
          startXRef.current = null;
          resetProgress();
        }}
        onClick={(event) => handleClick(event.clientX)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") completeLeft();
          if (event.key === "Enter" || event.key === "ArrowRight") completeRight();
        }}
        style={{
          position: "relative",
          minHeight: 46,
          cursor: disabled ? "default" : "pointer",
          outline: 0,
          userSelect: "none",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            background: disabled ? "rgba(246,243,236,0.16)" : "rgba(246,243,236,0.24)",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${progressStart}%`,
            top: "50%",
            width: `${progressWidth}%`,
            height: 1,
            background: disabled ? "rgba(246,243,236,0.12)" : "rgba(0,184,212,0.86)",
            boxShadow: disabled || progressWidth === 0 ? "none" : "0 0 14px rgba(0,184,212,0.38)",
            transition: isDragging ? "none" : "left 170ms ease, width 170ms ease, opacity 170ms ease",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "calc(50% - 4px)",
            left: `calc(${dotPosition}% - 4px)`,
            width: 8,
            height: 8,
            background: disabled ? "rgba(246,243,236,0.28)" : "rgba(0,184,212,0.95)",
            boxShadow: disabled
              ? "none"
              : isCompleting
                ? "0 0 22px rgba(0,184,212,0.72)"
                : "0 0 16px rgba(0,184,212,0.46)",
            transform: `rotate(45deg) scale(${isCompleting ? 1.22 : 1})`,
            transition: isDragging ? "none" : "left 170ms ease, transform 170ms ease, box-shadow 170ms ease",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          justifyContent: leftHint ? "space-between" : "flex-end",
          color: "rgba(246,243,236,0.34)",
          fontSize: 11,
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        {leftHint ? <span>{leftHint}</span> : null}
        <span>{rightHint}</span>
      </div>
    </section>
  );
}
