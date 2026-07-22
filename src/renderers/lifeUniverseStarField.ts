const LIFE_UNIVERSE_SEED = "GUANYAO:SINGLE_LIFE_UNIVERSE:1";

const hashSeed = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const createSeededRandom = (seed: number): (() => number) => {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
};

export const LIFE_UNIVERSE_STAR_COUNT = 420;

// The life core is an identity, not a stage decoration. Every production
// surface consumes this anchor, proportion, temperature, and absolute breath.
// A stage may only change how strongly or how closely the core is observed.
export const LIFE_UNIVERSE_CORE_IDENTITY = Object.freeze({
  anchorX: 0.5,
  anchorY: 0.48,
  breathPeriodSeconds: 3,
  breathingAmplitude: 0.08,
  coreRadiusViewportWidth: 24 / 390,
  minimumCoreRadius: 18,
  maximumCoreRadius: 28,
  surfaceToCoreRatio: 1.18,
  haloToCoreRatio: 3.25,
  coreRgb: "255,247,228",
  haloRgb: "232,200,138",
  threeColor: 0xfff7e4,
});

const random = createSeededRandom(hashSeed(LIFE_UNIVERSE_SEED));

// One immutable topology is consumed by the entrance, Launch, Genesis, and
// Reality renderers. Stages may change visibility and focus, never positions.
export const LIFE_UNIVERSE_STAR_FIELD = Object.freeze(
  Array.from({ length: LIFE_UNIVERSE_STAR_COUNT }, (_, index) => {
    const angle = random() * Math.PI * 2;
    // A deep field occupies the whole observable frame. Square-root radial
    // distribution prevents both a hollow centre and an artificial star ring.
    const radius = 0.12 + Math.sqrt(random()) * 4;
    return Object.freeze({
      index,
      x: Math.cos(angle) * radius,
      // Deep-space stars surround the observer instead of forming a second
      // flattened "galaxy ring" behind the 28-mansion foreground orbit.
      y: Math.sin(angle) * radius * 0.9,
      z: (random() - 0.5) * 3.4,
      phase: random() * Math.PI * 2,
      speed: 0.55 + random() * 0.9,
      radius: 0.45 + random() * 1.0,
    });
  }),
);

export const projectLifeUniverseStarToViewport = (
  star: (typeof LIFE_UNIVERSE_STAR_FIELD)[number],
  width: number,
  height: number,
  universeSeconds: number,
) => {
  const rotation = universeSeconds * 0.004;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const rotatedX = star.x * cos - star.y * sin;
  const rotatedY = star.x * sin + star.y * cos;
  const depth = (star.z + 1.7) / 3.4;
  const perspectiveScale = 0.82 + depth * 0.28;
  return Object.freeze({
    x: width * (0.5 + (rotatedX * perspectiveScale) / 8.2),
    y: height * (0.48 - (rotatedY * perspectiveScale) / 7.5),
    depth,
  });
};

// Deep space is the persistent environment, never a black page decoration.
// The first 28 indices are reserved by Launch as mansion motion identities;
// the remaining immutable stars form the same far/mid field on every 2D
// production surface.
export const drawLifeUniverseDeepSpace2D = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  universeSeconds: number,
  visibility = 1,
) => {
  const visible = Math.min(1, Math.max(0, visibility));
  context.save();
  context.fillStyle = "#02040a";
  context.fillRect(0, 0, width, height);

  const centralDepth = context.createRadialGradient(
    width * 0.5,
    height * 0.46,
    0,
    width * 0.5,
    height * 0.46,
    Math.max(width, height) * 0.74,
  );
  centralDepth.addColorStop(0, `rgba(24,34,58,${(visible * 0.14).toFixed(3)})`);
  centralDepth.addColorStop(0.52, `rgba(12,18,34,${(visible * 0.065).toFixed(3)})`);
  centralDepth.addColorStop(1, "rgba(2,4,10,0)");
  context.fillStyle = centralDepth;
  context.fillRect(0, 0, width, height);

  const lateralDepth = context.createRadialGradient(
    width * 0.18,
    height * 0.2,
    0,
    width * 0.18,
    height * 0.2,
    Math.max(width, height) * 0.62,
  );
  lateralDepth.addColorStop(0, `rgba(31,27,52,${(visible * 0.075).toFixed(3)})`);
  lateralDepth.addColorStop(1, "rgba(2,4,10,0)");
  context.fillStyle = lateralDepth;
  context.fillRect(0, 0, width, height);

  LIFE_UNIVERSE_STAR_FIELD.forEach((star, index) => {
    if (index < 28) return;
    const point = projectLifeUniverseStarToViewport(
      star,
      width,
      height,
      universeSeconds,
    );
    const depth = point.depth;
    const twinkle =
      0.9 +
      Math.sin(
        universeSeconds * (0.16 + star.speed * 0.12) + star.phase,
      ) *
        (0.035 + depth * 0.055);
    const opacity =
      visible * (0.075 + depth * 0.17) * Math.max(0.74, twinkle);
    const radius = Math.max(
      0.38,
      star.radius * (0.42 + depth * 0.52),
    );
    context.fillStyle = `rgba(185,203,236,${opacity.toFixed(3)})`;
    context.shadowColor = "rgba(185,203,236,0.16)";
    context.shadowBlur = depth > 0.78 ? 2.4 : 0;
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fill();
  });
  context.shadowBlur = 0;
  context.restore();
};

export const resolveLifeUniverseCoreFrame = (
  width: number,
  height: number,
  universeSeconds: number,
  apparentScale = 1,
) => {
  const identity = LIFE_UNIVERSE_CORE_IDENTITY;
  const breath =
    1 +
    Math.sin(
      (universeSeconds / identity.breathPeriodSeconds) * Math.PI * 2,
    ) *
      identity.breathingAmplitude;
  const baseCoreRadius = Math.min(
    identity.maximumCoreRadius,
    Math.max(
      identity.minimumCoreRadius,
      width * identity.coreRadiusViewportWidth,
    ),
  );
  const coreRadius = baseCoreRadius * Math.max(0, apparentScale) * breath;
  return {
    x: width * identity.anchorX,
    y: height * identity.anchorY,
    breath,
    coreRadius,
    surfaceRadius: coreRadius * identity.surfaceToCoreRatio,
    haloRadius: coreRadius * identity.haloToCoreRatio,
  };
};

export const drawLifeUniverseCore2D = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  universeSeconds: number,
  opacity: number,
  apparentScale = 1,
) => {
  const identity = LIFE_UNIVERSE_CORE_IDENTITY;
  const frame = resolveLifeUniverseCoreFrame(
    width,
    height,
    universeSeconds,
    apparentScale,
  );
  const visibleOpacity = Math.min(1, Math.max(0, opacity));
  if (visibleOpacity <= 0) return frame;

  const glow = context.createRadialGradient(
    frame.x,
    frame.y,
    0,
    frame.x,
    frame.y,
    frame.haloRadius,
  );
  glow.addColorStop(
    0,
    `rgba(${identity.coreRgb},${(visibleOpacity * 0.92).toFixed(3)})`,
  );
  glow.addColorStop(
    1 / identity.haloToCoreRatio,
    `rgba(${identity.haloRgb},${(visibleOpacity * 0.2).toFixed(3)})`,
  );
  glow.addColorStop(1, `rgba(${identity.haloRgb},0)`);

  context.save();
  context.fillStyle = glow;
  context.beginPath();
  context.arc(frame.x, frame.y, frame.haloRadius, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = `rgba(${identity.coreRgb},${(visibleOpacity * 0.92).toFixed(3)})`;
  context.beginPath();
  context.arc(frame.x, frame.y, frame.coreRadius, 0, Math.PI * 2);
  context.fill();
  context.restore();
  return frame;
};
