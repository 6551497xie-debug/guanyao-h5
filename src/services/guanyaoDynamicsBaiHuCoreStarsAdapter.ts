import type {
  DynamicsBaiHuCoreStar,
  DynamicsBaiHuCoreStarsAdapterInput,
  DynamicsBaiHuCoreStarsResult,
  DynamicsBaiHuPressureBeastSeed,
} from "../types/dynamicsBaiHuCoreStars";

const BASE_BAIHU_CORE_STARS: readonly DynamicsBaiHuCoreStar[] = Object.freeze([
  [20, 42, 6.2],
  [31, 35, 5.2],
  [44, 31, 5.6],
  [58, 28, 6.8],
  [70, 31, 5.4],
  [79, 36, 5.8],
  [86, 42, 5.2],
]);

function hashBaiHuVisualInput(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function resolvePressureBeastSeed(
  input: DynamicsBaiHuCoreStarsAdapterInput,
  constellationHash: number,
): DynamicsBaiHuPressureBeastSeed {
  return Object.freeze({
    index: constellationHash % 28,
    intensity: Math.max(
      1,
      Math.min(
        7,
        Math.round(input.beastResonance * 7) || ((constellationHash % 7) + 1),
      ),
    ),
    resonance: Math.max(
      1,
      Math.min(
        5,
        Math.round((input.seedIntensity ?? 0.5) * 5) || ((constellationHash % 5) + 1),
      ),
    ),
  } satisfies DynamicsBaiHuPressureBeastSeed);
}

export function resolveDynamicsBaiHuCoreStars(
  input: DynamicsBaiHuCoreStarsAdapterInput,
): DynamicsBaiHuCoreStarsResult {
  const constellationHash = hashBaiHuVisualInput(
    [
      input.seedId,
      input.seedText,
      input.primaryDimension,
      input.beastTone,
      input.currentNode,
      input.runtimePrimarySpaceId,
    ].join("|"),
  );
  const pressureHash = hashBaiHuVisualInput(
    `${input.seedId}|${input.seedText}|${input.selectedPressureSeedSurface}`,
  );
  const pressureBeastSeed = resolvePressureBeastSeed(input, constellationHash);
  const phase = (pressureBeastSeed.index % 7) - 3;
  const lift = (pressureBeastSeed.resonance - 3) * 0.72;
  const stretch = 1 + (pressureBeastSeed.intensity - 4) * 0.012;
  const tailRise = (pressureHash % 4) * 0.8;
  const coreStars = Object.freeze(
    BASE_BAIHU_CORE_STARS.map(([x, y, size], index) => {
      const spineWave = Math.sin((index + phase) * 0.84) * 1.8;
      const tailBias = index >= 5 ? -tailRise * (index - 4) : 0;
      const shoulderBias =
        index === 1 || index === 2
          ? -pressureBeastSeed.intensity * 0.16
          : 0;

      return Object.freeze([
        50 + (x - 50) * stretch,
        y + spineWave + lift + tailBias + shoulderBias,
        size + (index === pressureBeastSeed.index % 7 ? 1.1 : 0),
      ]) as DynamicsBaiHuCoreStar;
    }),
  );

  return Object.freeze({
    semanticRole: "BAIHU_CORE_STARS",
    deterministic: true,
    hashes: Object.freeze({
      constellation: constellationHash,
      pressure: pressureHash,
    }),
    pressureBeastSeed,
    coreStars,
    guardrails: Object.freeze({
      usesRandom: false,
      advancesRuntime: false,
      writesStorage: false,
    }),
  } satisfies DynamicsBaiHuCoreStarsResult);
}
