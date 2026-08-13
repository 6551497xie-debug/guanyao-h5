export const XINMAI_OVERVIEW_EFFECT_ENTRY_SCENE_VERSION =
  "XINMAI_OVERVIEW_EFFECT_ENTRY_SCENE_V2" as const;

export type XinmaiOverviewEffectEntrySceneInput = Readonly<{
  width: number;
  height: number;
  seconds: number;
  engagement: number;
  reducedMotion: boolean;
}>;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smooth = (from: number, to: number, value: number) => {
  const progress = clamp01((value - from) / Math.max(0.0001, to - from));
  return progress * progress * (3 - 2 * progress);
};

const drawDepthDust = (
  context: CanvasRenderingContext2D,
  input: XinmaiOverviewEffectEntrySceneInput,
) => {
  const { width, height, seconds, reducedMotion } = input;
  const shortEdge = Math.min(width, height);
  const layers = [
    { count: 34, radius: 0.52, alpha: 0.16, drift: 0.7 },
    { count: 22, radius: 0.86, alpha: 0.24, drift: 1.5 },
    { count: 12, radius: 1.25, alpha: 0.32, drift: 2.5 },
  ] as const;

  layers.forEach((layer, layerIndex) => {
    for (let index = 0; index < layer.count; index += 1) {
      const seed = index + layerIndex * 97;
      const baseX = ((seed * 73 + 19) % 997) / 997;
      const baseY = ((seed * 151 + 43) % 991) / 991;
      const movement = reducedMotion
        ? 0
        : Math.sin(seconds * (0.018 + layerIndex * 0.012) + seed * 0.61) *
          layer.drift;
      const x = baseX * width + movement;
      const y = baseY * height + movement * 0.42;
      const pulse = reducedMotion
        ? 0.86
        : 0.72 + Math.sin(seconds * 0.28 + seed) * 0.18;
      context.fillStyle = `rgba(188,211,226,${(
        layer.alpha * pulse
      ).toFixed(3)})`;
      context.beginPath();
      context.arc(x, y, layer.radius * (shortEdge / 390), 0, Math.PI * 2);
      context.fill();
    }
  });
};

const drawSunlight = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  const sunlight = context.createRadialGradient(
    width * 0.02,
    height * 0.04,
    0,
    width * 0.02,
    height * 0.04,
    Math.max(width, height) * 0.78,
  );
  sunlight.addColorStop(0, "rgba(255,238,193,0.17)");
  sunlight.addColorStop(0.22, "rgba(183,205,217,0.055)");
  sunlight.addColorStop(0.66, "rgba(62,91,119,0.018)");
  sunlight.addColorStop(1, "rgba(2,3,6,0)");
  context.fillStyle = sunlight;
  context.fillRect(0, 0, width, height);
};

const drawEarth = (
  context: CanvasRenderingContext2D,
  input: XinmaiOverviewEffectEntrySceneInput,
) => {
  const { width, height, engagement, seconds, reducedMotion } = input;
  const shortEdge = Math.min(width, height);
  const radius = Math.max(48, Math.min(86, shortEdge * 0.19));
  const x = width * 0.72;
  const y = height * 0.355;
  const breath = reducedMotion ? 1 : 1 + Math.sin(seconds * 0.14) * 0.003;

  context.save();
  context.translate(x, y);
  context.scale(breath, breath);

  const atmosphere = context.createRadialGradient(
    -radius * 0.26,
    -radius * 0.3,
    radius * 0.54,
    0,
    0,
    radius * 1.26,
  );
  atmosphere.addColorStop(0, "rgba(125,190,209,0.18)");
  atmosphere.addColorStop(0.76, "rgba(81,141,166,0.08)");
  atmosphere.addColorStop(1, "rgba(81,141,166,0)");
  context.fillStyle = atmosphere;
  context.beginPath();
  context.arc(0, 0, radius * 1.26, 0, Math.PI * 2);
  context.fill();

  const globe = context.createRadialGradient(
    -radius * 0.42,
    -radius * 0.42,
    radius * 0.1,
    radius * 0.16,
    radius * 0.18,
    radius * 1.1,
  );
  globe.addColorStop(0, "rgba(172,216,220,0.96)");
  globe.addColorStop(0.34, "rgba(66,125,151,0.94)");
  globe.addColorStop(0.72, "rgba(22,55,79,0.98)");
  globe.addColorStop(1, "rgba(4,11,23,1)");
  context.fillStyle = globe;
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();

  context.save();
  context.beginPath();
  context.arc(0, 0, radius * 0.985, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = "rgba(109,140,105,0.28)";
  context.beginPath();
  context.ellipse(-radius * 0.24, -radius * 0.12, radius * 0.34, radius * 0.18, -0.38, 0, Math.PI * 2);
  context.ellipse(radius * 0.12, radius * 0.18, radius * 0.27, radius * 0.14, 0.56, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(205,230,232,0.16)";
  context.lineWidth = Math.max(0.7, radius * 0.012);
  for (let band = -1; band <= 1; band += 1) {
    context.beginPath();
    context.ellipse(0, band * radius * 0.24, radius * 0.92, radius * 0.18, -0.08, 0.12, Math.PI * 0.94);
    context.stroke();
  }
  const night = context.createLinearGradient(-radius, -radius, radius, radius);
  night.addColorStop(0, "rgba(1,4,12,0)");
  night.addColorStop(0.48, "rgba(1,4,12,0.08)");
  night.addColorStop(0.7, "rgba(1,4,12,0.64)");
  night.addColorStop(1, "rgba(1,4,12,0.96)");
  context.fillStyle = night;
  context.fillRect(-radius, -radius, radius * 2, radius * 2);
  context.restore();

  context.strokeStyle = "rgba(180,222,230,0.32)";
  context.lineWidth = Math.max(0.8, radius * 0.012);
  context.beginPath();
  context.arc(0, 0, radius, -2.5, 0.64);
  context.stroke();

  if (engagement > 0.001) {
    const anchorProgress = smooth(0.05, 0.72, engagement);
    const anchorX = -radius * 0.34;
    const anchorY = radius * 0.2;
    const pulse = reducedMotion
      ? 1
      : 0.82 + Math.sin(seconds * 1.1) * 0.18;
    context.fillStyle = `rgba(255,221,152,${(0.82 * anchorProgress).toFixed(3)})`;
    context.shadowColor = "rgba(255,218,139,0.7)";
    context.shadowBlur = 12 * pulse;
    context.beginPath();
    context.arc(anchorX, anchorY, 2.1 + pulse * 0.8, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
  }

  context.restore();
};

const drawMoon = (
  context: CanvasRenderingContext2D,
  input: XinmaiOverviewEffectEntrySceneInput,
) => {
  const { width, height } = input;
  const shortEdge = Math.min(width, height);
  const radius = Math.max(12, Math.min(20, shortEdge * 0.045));
  const x = width * 0.26;
  const y = height * 0.255;
  const moon = context.createRadialGradient(
    x - radius * 0.34,
    y - radius * 0.38,
    radius * 0.08,
    x,
    y,
    radius * 1.1,
  );
  moon.addColorStop(0, "rgba(245,242,223,0.92)");
  moon.addColorStop(0.56, "rgba(170,180,188,0.82)");
  moon.addColorStop(1, "rgba(48,58,73,0.9)");
  context.fillStyle = moon;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(10,18,31,0.36)";
  context.beginPath();
  context.arc(x + radius * 0.42, y + radius * 0.08, radius * 0.92, 0, Math.PI * 2);
  context.fill();
};

const drawStarBeastSignal = (
  context: CanvasRenderingContext2D,
  input: XinmaiOverviewEffectEntrySceneInput,
) => {
  const { width, height, engagement, seconds, reducedMotion } = input;
  const x = width * 0.18;
  const y = height * 0.405;
  const shortEdge = Math.min(width, height);
  const scale = Math.max(0.82, shortEdge / 390);
  const awake = 0.92 + smooth(0.12, 0.9, engagement) * 0.08;
  const breath = reducedMotion ? 1 : 0.82 + Math.sin(seconds * 0.86) * 0.18;

  const presence = context.createRadialGradient(x, y, 0, x, y, 72 * scale);
  presence.addColorStop(0, `rgba(169,235,226,${(0.34 * awake * breath).toFixed(3)})`);
  presence.addColorStop(0.28, `rgba(107,187,189,${(0.14 * awake).toFixed(3)})`);
  presence.addColorStop(0.62, `rgba(66,121,143,${(0.055 * awake).toFixed(3)})`);
  presence.addColorStop(1, "rgba(40,83,104,0)");
  context.fillStyle = presence;
  context.beginPath();
  context.arc(x, y, 72 * scale, 0, Math.PI * 2);
  context.fill();

  context.save();
  context.shadowColor = "rgba(154,235,224,0.92)";
  context.shadowBlur = 16 * scale * breath;
  context.fillStyle = `rgba(221,255,246,${(0.82 * awake).toFixed(3)})`;
  context.beginPath();
  context.arc(x, y, (2.25 + breath * 0.9) * scale, 0, Math.PI * 2);
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = `rgba(155,226,219,${(0.34 * breath).toFixed(3)})`;
  context.lineWidth = 0.8;
  context.beginPath();
  context.arc(x, y, (10 + breath * 5) * scale, 0, Math.PI * 2);
  context.stroke();
  context.restore();

  const nodes = [
    [-31, 11], [-19, -15], [0, -28], [22, -11], [34, 17], [9, 29], [-17, 24],
  ] as const;
  context.strokeStyle = `rgba(151,218,214,${(0.28 * awake).toFixed(3)})`;
  context.lineWidth = 0.8;
  context.beginPath();
  nodes.forEach(([nodeX, nodeY], index) => {
    const px = x + nodeX * scale;
    const py = y + nodeY * scale;
    if (index === 0) context.moveTo(px, py);
    else context.lineTo(px, py);
  });
  context.stroke();

  nodes.forEach(([nodeX, nodeY], index) => {
    const pulse = reducedMotion
      ? 1
      : 0.72 + Math.sin(seconds * 0.7 + index * 0.88) * 0.22;
    context.fillStyle = `rgba(190,236,229,${(0.48 * awake * pulse).toFixed(3)})`;
    context.beginPath();
    context.arc(
      x + nodeX * scale,
      y + nodeY * scale,
      (index === 2 ? 1.7 : 1.05) * scale,
      0,
      Math.PI * 2,
    );
    context.fill();
  });

  if (engagement > 0.001) {
    const response = smooth(0.28, 1, engagement);
    context.strokeStyle = `rgba(134,205,206,${(0.17 * response).toFixed(3)})`;
    context.setLineDash([3, 11]);
    context.beginPath();
    context.moveTo(x + 28 * scale, y - 2 * scale);
    context.bezierCurveTo(
      width * 0.36,
      height * 0.49,
      width * 0.48,
      height * 0.39,
      width * 0.57,
      height * 0.38,
    );
    context.stroke();
    context.setLineDash([]);
  }
};

export function drawXinmaiOverviewEffectEntryScene(
  context: CanvasRenderingContext2D,
  input: XinmaiOverviewEffectEntrySceneInput,
) {
  if (input.width <= 0 || input.height <= 0) return;
  context.save();
  drawSunlight(context, input.width, input.height);
  drawDepthDust(context, input);
  drawMoon(context, input);
  drawEarth(context, input);
  drawStarBeastSignal(context, input);
  context.restore();
}
