import type { CSSProperties } from "react";
import type { StarbeastFeedback, StarFlowerGrowthState } from "../../services/guanyaoCosmicBotanicsRuntimeEngine";

type StarFlowerComponentProps = {
  toneColor: string;
  starbeast: StarbeastFeedback;
  growthState: StarFlowerGrowthState;
  readiness: number;
};

export function QingLongStarFlowerComponent({ toneColor, starbeast, growthState, readiness }: StarFlowerComponentProps) {
  const length = starbeast.energyRing * (0.64 + readiness * 0.18);
  const pulse = growthState === "blooming" || growthState === "rebirth" ? 1 : 0.72;

  return (
    <div
      aria-label="青龙星花"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: starbeast.energyRing,
        height: starbeast.energyRing,
        transform: `translate(-50%, -50%) rotate(${-18 + readiness * 28}deg)`,
        pointerEvents: "none",
        transition: "width 360ms ease, height 360ms ease, transform 360ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: length,
          height: 1,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent, rgba(${toneColor},${0.24 + starbeast.glowIntensity * 0.5}), transparent)`,
          boxShadow: `0 0 ${18 + starbeast.glowIntensity * 42}px rgba(${toneColor},${0.18 + starbeast.glowIntensity * 0.25})`,
        }}
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: `${20 + index * 15}%`,
            top: `${62 - Math.sin(index + readiness) * 22}%`,
            width: 5 + index,
            height: 5 + index,
            borderRadius: 999,
            background: `rgba(${toneColor},${0.42 + pulse * 0.36})`,
            boxShadow: `0 0 ${10 + index * 3}px rgba(${toneColor},${0.2 + starbeast.glowIntensity * 0.3})`,
            transition: "left 360ms ease, top 360ms ease, opacity 360ms ease",
          }}
        />
      ))}
    </div>
  );
}

export function BaiHuStarFlowerComponent({ toneColor, starbeast, growthState, readiness }: StarFlowerComponentProps) {
  const slash = starbeast.energyRing * (0.5 + readiness * 0.24);
  const guarded = growthState === "unstable" || starbeast.postureShift === "guarding";

  return (
    <div
      aria-label="白虎星花"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: starbeast.energyRing,
        height: starbeast.energyRing,
        transform: `translate(-50%, -50%) skew(${guarded ? -5 : -2}deg)`,
        pointerEvents: "none",
        transition: "width 360ms ease, height 360ms ease, transform 360ms ease",
      }}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: `${22 + index * 12}%`,
            top: `${28 + index * 10}%`,
            width: slash,
            height: 1,
            transform: `rotate(${-34 + index * 4}deg)`,
            transformOrigin: "left center",
            background: `rgba(${toneColor},${0.22 + starbeast.glowIntensity * 0.46})`,
            boxShadow: `0 0 ${guarded ? 28 : 16}px rgba(${toneColor},${0.18 + starbeast.glowIntensity * 0.28})`,
            opacity: 0.68 + readiness * 0.3,
            transition: "width 360ms ease, opacity 360ms ease, box-shadow 360ms ease",
          }}
        />
      ))}
      <span
        style={{
          position: "absolute",
          right: "22%",
          top: "28%",
          width: 9 + readiness * 10,
          height: 9 + readiness * 10,
          borderRadius: 999,
          background: `rgba(${toneColor},${0.38 + starbeast.glowIntensity * 0.4})`,
          boxShadow: `0 0 ${20 + starbeast.glowIntensity * 38}px rgba(${toneColor},0.38)`,
          transition: "width 360ms ease, height 360ms ease, box-shadow 360ms ease",
        }}
      />
    </div>
  );
}

export function ZhuQueStarFlowerComponent({ toneColor, starbeast, growthState, readiness }: StarFlowerComponentProps) {
  const expanded = growthState === "blooming" || growthState === "rebirth";

  return (
    <div
      aria-label="朱雀星花"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: starbeast.energyRing,
        height: starbeast.energyRing,
        transform: `translate(-50%, -50%) scale(${expanded ? 1.06 : 0.98})`,
        pointerEvents: "none",
        transition: "width 360ms ease, height 360ms ease, transform 360ms ease",
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
        const radius = 24 + readiness * 26;
        return (
          <span
            key={index}
            style={{
              position: "absolute",
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              width: 4 + readiness * 6,
              height: 18 + readiness * 18,
              borderRadius: "999px 999px 40% 40%",
              transform: `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`,
              background: `linear-gradient(180deg, rgba(${toneColor},${0.56 + starbeast.glowIntensity * 0.3}), transparent)`,
              boxShadow: `0 0 ${14 + starbeast.glowIntensity * 36}px rgba(${toneColor},0.28)`,
              transition: "left 360ms ease, top 360ms ease, width 360ms ease, height 360ms ease",
            }}
          />
        );
      })}
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 16 + readiness * 16,
          height: 16 + readiness * 16,
          borderRadius: 999,
          transform: "translate(-50%, -50%)",
          background: `rgba(${toneColor},${0.38 + starbeast.glowIntensity * 0.38})`,
          boxShadow: `0 0 ${24 + starbeast.glowIntensity * 52}px rgba(${toneColor},0.36)`,
        }}
      />
    </div>
  );
}

export function XuanWuStarFlowerComponent({ toneColor, starbeast, growthState, readiness }: StarFlowerComponentProps) {
  const deep = growthState === "collapse" || growthState === "rebirth";
  const ringStyle = (scale: number, alpha: number): CSSProperties => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    width: starbeast.energyRing * scale,
    height: starbeast.energyRing * scale,
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    border: `1px solid rgba(${toneColor},${alpha})`,
    boxShadow: `0 0 ${12 + starbeast.glowIntensity * 28}px rgba(${toneColor},${alpha * 0.48})`,
    transition: "width 360ms ease, height 360ms ease, border-color 360ms ease",
  });

  return (
    <div
      aria-label="玄武星花"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: starbeast.energyRing,
        height: starbeast.energyRing,
        transform: `translate(-50%, -50%) scale(${deep ? 1.04 : 0.98})`,
        pointerEvents: "none",
        transition: "width 360ms ease, height 360ms ease, transform 360ms ease",
      }}
    >
      <span style={ringStyle(1.08, 0.12 + starbeast.glowIntensity * 0.22)} />
      <span style={ringStyle(0.78, 0.18 + starbeast.glowIntensity * 0.24)} />
      <span style={ringStyle(0.42, 0.22 + starbeast.glowIntensity * 0.28)} />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 7 + readiness * 13,
          height: 7 + readiness * 13,
          borderRadius: 999,
          transform: "translate(-50%, -50%)",
          background: `rgba(${toneColor},${0.42 + starbeast.glowIntensity * 0.36})`,
          boxShadow: `0 0 ${18 + starbeast.glowIntensity * 42}px rgba(${toneColor},0.32)`,
          transition: "width 360ms ease, height 360ms ease, box-shadow 360ms ease",
        }}
      />
    </div>
  );
}
