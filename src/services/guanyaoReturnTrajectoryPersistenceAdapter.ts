export const GUANYAO_RETURN_TRAJECTORY_STORAGE_KEY = "guanyao:returnTraj";
export const GUANYAO_RETURN_TRAJECTORY_SCHEMA_VERSION =
  "GUANYAO_RETURN_TRAJECTORY_V2" as const;
export const GUANYAO_RETURN_TRAJECTORY_MAX_POINTS = 14;

const DEFAULT_RETURN_TRAJECTORY = [0.5, 0.62, 0.45, 0.58, 0.5, 0.4] as const;

export type VersionedReturnTrajectory = {
  schemaVersion: typeof GUANYAO_RETURN_TRAJECTORY_SCHEMA_VERSION;
  points: readonly number[];
};

function isTrajectoryPoints(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((point) => typeof point === "number")
  );
}

function normalizeTrajectory(points: readonly number[]): number[] {
  return points.slice(-GUANYAO_RETURN_TRAJECTORY_MAX_POINTS);
}

export function readPersistedReturnTrajectory(): number[] {
  if (typeof window === "undefined") return [...DEFAULT_RETURN_TRAJECTORY];

  try {
    const raw = window.localStorage.getItem(GUANYAO_RETURN_TRAJECTORY_STORAGE_KEY);
    if (!raw) return [...DEFAULT_RETURN_TRAJECTORY];

    const parsed = JSON.parse(raw) as unknown;
    if (isTrajectoryPoints(parsed)) return normalizeTrajectory(parsed);

    if (
      parsed &&
      typeof parsed === "object" &&
      (parsed as Partial<VersionedReturnTrajectory>).schemaVersion ===
        GUANYAO_RETURN_TRAJECTORY_SCHEMA_VERSION &&
      isTrajectoryPoints((parsed as Partial<VersionedReturnTrajectory>).points)
    ) {
      return normalizeTrajectory((parsed as VersionedReturnTrajectory).points);
    }
  } catch {
    // 无效或不可用的持久化数据回退到既有实验默认轨迹。
  }

  return [...DEFAULT_RETURN_TRAJECTORY];
}

export function writeReturnTrajectory(points: readonly number[]): VersionedReturnTrajectory {
  const versionedTrajectory = Object.freeze({
    schemaVersion: GUANYAO_RETURN_TRAJECTORY_SCHEMA_VERSION,
    points: Object.freeze(normalizeTrajectory(points)),
  });

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        GUANYAO_RETURN_TRAJECTORY_STORAGE_KEY,
        JSON.stringify(versionedTrajectory),
      );
    } catch {
      // 保持实验页既有行为：存储不可用时不打断轨迹动画与跳转。
    }
  }

  return versionedTrajectory;
}
