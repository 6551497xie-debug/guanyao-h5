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

export const resolveLifeUniverseCrystalImprintGeometry = ({
  identityKey,
  birthMansionIndex,
  normalizedOrbitPositions,
  envelopeScale = 1,
  postureBias = 0,
  sourceSlot = null,
}: {
  identityKey: string;
  birthMansionIndex: number | null;
  normalizedOrbitPositions: readonly number[];
  envelopeScale?: number;
  postureBias?: number;
  sourceSlot?: number | null;
}) => {
  if (birthMansionIndex === null) return null;

  const orbitRadiusX = 43 * Math.max(0.88, Math.min(1.08, envelopeScale));
  const orbitRadiusY = 19 + Math.abs(postureBias) * 2.4;
  const activeGroupStart = Math.floor(birthMansionIndex / 7) * 7;
  const birthCoreSlot = birthMansionIndex - activeGroupStart;
  const activeSevenMansionPositions = Array.from({ length: 7 }, (_, index) => {
    const normalizedOrbitPosition =
      normalizedOrbitPositions[activeGroupStart + index] ??
      (activeGroupStart + index) / 28;
    const angle = -Math.PI / 2 + normalizedOrbitPosition * Math.PI * 2;
    return [
      50 + Math.cos(angle) * orbitRadiusX,
      49 + Math.sin(angle) * orbitRadiusY,
    ] as const;
  });
  const imprintHash = Array.from(identityKey).reduce(
    (sum, character, index) => sum + character.charCodeAt(0) * (index + 1),
    0,
  );
  const imprintDirectionSlot =
    sourceSlot === null
      ? (birthCoreSlot + 2 + (imprintHash % 4)) % 7
      : Math.max(0, Math.min(6, Math.round(sourceSlot)));
  const imprintDirectionMansion = activeSevenMansionPositions[imprintDirectionSlot]!;
  const core = [
    LIFE_UNIVERSE_CORE_IDENTITY.anchorX * 100,
    LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100,
  ] as const;
  const directionX =
    (imprintDirectionMansion[0] - core[0]) / Math.max(1, orbitRadiusX);
  const directionY =
    (imprintDirectionMansion[1] - core[1]) / Math.max(1, orbitRadiusY);
  const directionLength = Math.max(0.001, Math.hypot(directionX, directionY));
  const unitX = directionX / directionLength;
  const unitY = directionY / directionLength;
  const reachX = 10 + (imprintHash % 4);
  const reachY = 5.6 + (imprintHash % 3) * 0.8;
  const source =
    sourceSlot === null
      ? core
      : ([
          core[0] + unitX * reachX * 0.18,
          core[1] + unitY * reachY * 0.18,
        ] as const);
  const stem = [
    core[0] + unitX * reachX * 0.46,
    core[1] + unitY * reachY * 0.46,
  ] as const;
  const target = [
    core[0] + unitX * reachX,
    core[1] + unitY * reachY,
  ] as const;
  const branchReach = 1.5 + (imprintHash % 3) * 0.42;
  const branchTarget = [
    stem[0] - unitY * branchReach,
    stem[1] + unitX * branchReach * 0.62,
  ] as const;

  return Object.freeze({
    core,
    source,
    sourceSlot: imprintDirectionSlot,
    stem,
    target,
    branchTarget,
    path: `M ${source[0]} ${source[1]} L ${stem[0]} ${stem[1]} L ${target[0]} ${target[1]} M ${stem[0]} ${stem[1]} L ${branchTarget[0]} ${branchTarget[1]}`,
  });
};

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
  // The observer remains directed toward the unique life anchor. Slow yaw,
  // pitch and dolly breathing reveal parallax without rotating the universe
  // like a flat plate or turning the entrance into a free-flying camera.
  const cameraYaw = Math.sin(universeSeconds * 0.072) * 0.105;
  const cameraPitch = Math.cos(universeSeconds * 0.061) * 0.078;
  const yawCos = Math.cos(cameraYaw);
  const yawSin = Math.sin(cameraYaw);
  const pitchCos = Math.cos(cameraPitch);
  const pitchSin = Math.sin(cameraPitch);
  const yawX = star.x * yawCos - star.z * yawSin;
  const yawZ = star.x * yawSin + star.z * yawCos;
  const viewY = star.y * pitchCos - yawZ * pitchSin;
  const viewZ = star.y * pitchSin + yawZ * pitchCos;
  const cameraDistance =
    4.95 + Math.sin(universeSeconds * 0.22) * 0.18;
  const depthDistance = Math.max(1.9, cameraDistance - viewZ);
  const perspectiveScale = cameraDistance / depthDistance;
  const depth = Math.min(1, Math.max(0, (viewZ + 2.25) / 4.5));
  const layerIndex = depth < 0.38 ? 0 : depth < 0.76 ? 1 : 2;
  const nearParallax = depth * depth;
  const parallaxX =
    Math.sin(universeSeconds * (0.055 + star.speed * 0.012) + star.phase) *
    width *
    0.008 *
    nearParallax;
  const parallaxY =
    Math.cos(universeSeconds * (0.047 + star.speed * 0.01) + star.phase) *
    height *
    0.006 *
    nearParallax;
  return Object.freeze({
    x: width * (0.5 + (yawX * perspectiveScale) / 7.25) + parallaxX,
    y: height * (0.48 - (viewY * perspectiveScale) / 6.85) + parallaxY,
    depth,
    layerIndex,
    perspectiveScale,
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
  gravityStrength = 0.14,
) => {
  const visible = Math.min(1, Math.max(0, visibility));
  const gravity = Math.min(1, Math.max(0, gravityStrength));
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
  centralDepth.addColorStop(0, `rgba(24,34,58,${(visible * 0.19).toFixed(3)})`);
  centralDepth.addColorStop(0.5, `rgba(12,18,34,${(visible * 0.085).toFixed(3)})`);
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

  const projectedStars = LIFE_UNIVERSE_STAR_FIELD.flatMap((star, index) => {
    if (index < 28) return [];
    return [{
      star,
      point: projectLifeUniverseStarToViewport(
        star,
        width,
        height,
        universeSeconds,
      ),
    }];
  });
  const coreX = width * LIFE_UNIVERSE_CORE_IDENTITY.anchorX;
  const coreY = height * LIFE_UNIVERSE_CORE_IDENTITY.anchorY;
  const layerOpacity = [0.052, 0.125, 0.255] as const;
  const layerRadius = [0.28, 0.68, 1.42] as const;
  const layerColor = ["147,172,211", "185,203,236", "224,230,238"] as const;

  // Far stars, middle stellar matter, then sparse near-lens dust. Drawing the
  // layers separately gives the 2D canvas a real occlusion and focus order.
  for (let layerIndex = 0; layerIndex < 3; layerIndex += 1) {
    projectedStars.forEach(({ star, point }) => {
      if (point.layerIndex !== layerIndex) return;
      const depth = point.depth;
      const dx = point.x - coreX;
      const dy = point.y - coreY;
      const normalizedDistance = Math.hypot(
        dx / Math.max(1, width * 0.52),
        dy / Math.max(1, height * 0.52),
      );
      const gravityInfluence =
        gravity *
        Math.pow(Math.max(0, 1 - normalizedDistance), 2) *
        (0.28 + depth * 0.72);
      const bend =
        gravityInfluence *
        (0.075 + Math.sin(universeSeconds * 0.18 + star.phase) * 0.018);
      const bendCos = Math.cos(bend);
      const bendSin = Math.sin(bend);
      const pull = 1 - gravityInfluence * 0.085;
      const x = coreX + (dx * bendCos - dy * bendSin) * pull;
      const y = coreY + (dx * bendSin + dy * bendCos) * pull;
      const twinkle =
        0.92 +
        Math.sin(
          universeSeconds * (0.12 + star.speed * 0.09) + star.phase,
        ) *
          (0.025 + depth * 0.045);
      const opacity =
        visible *
        (layerOpacity[layerIndex]! + depth * 0.085) *
        Math.max(0.78, twinkle);
      const nearLensDust = layerIndex === 2 && star.index % 5 === 0;
      const radius = Math.max(
        layerIndex === 0 ? 0.32 : 0.44,
        star.radius *
          layerRadius[layerIndex]! *
          point.perspectiveScale *
          (nearLensDust ? 1.45 : layerIndex === 2 ? 0.78 : 1),
      );
      const color = layerColor[layerIndex]!;

      if (gravityInfluence > 0.012 && layerIndex > 0) {
        const distance = Math.max(1, Math.hypot(dx, dy));
        const tangentX = -dy / distance;
        const tangentY = dx / distance;
        const trailLength = gravityInfluence * (8 + layerIndex * 6);
        context.strokeStyle = `rgba(${color},${(
          opacity * gravityInfluence * 0.42
        ).toFixed(3)})`;
        context.lineWidth = Math.max(0.45, radius * 0.42);
        context.beginPath();
        context.moveTo(x - tangentX * trailLength, y - tangentY * trailLength);
        context.lineTo(x, y);
        context.stroke();
      }

      if (nearLensDust) {
        const driftAngle =
          star.phase * 0.34 +
          Math.sin(universeSeconds * 0.045 + star.phase) * 0.18;
        context.save();
        context.translate(x, y);
        context.rotate(driftAngle);
        context.fillStyle = `rgba(${color},${(opacity * 0.09).toFixed(3)})`;
        context.beginPath();
        context.ellipse(
          0,
          0,
          radius * (3.4 + depth * 1.2),
          radius * 1.25,
          0,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.restore();
      }

      context.fillStyle = `rgba(${color},${opacity.toFixed(3)})`;
      context.shadowColor = `rgba(${color},${layerIndex === 2 ? "0.28" : "0.12"})`;
      context.shadowBlur = layerIndex === 2 ? (nearLensDust ? 7.5 : 3.2) : layerIndex === 1 ? 1.2 : 0;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    });
  }
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
