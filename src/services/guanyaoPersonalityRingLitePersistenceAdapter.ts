export const GUANYAO_PERSONALITY_RING_LITE_STORAGE_KEY =
  "guanyao:personalityRingLite";

export type PersonalityRingLitePersistenceWriteStatus =
  | "STORED"
  | "UNAVAILABLE"
  | "FAILED";

let acceptanceWriteFailure = false;
const isDevelopmentAcceptance = (): boolean =>
  import.meta.env?.DEV === true;

export const setPersonalityRingLiteAcceptanceWriteFailure = (
  enabled: boolean,
): void => {
  if (!isDevelopmentAcceptance()) return;
  acceptanceWriteFailure = enabled;
};

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

export function readPersistedPersonalityRingLiteState(): unknown | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_PERSONALITY_RING_LITE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

export function writePersistedPersonalityRingLiteState(
  state: unknown,
): PersonalityRingLitePersistenceWriteStatus {
  if (!canUseStorage()) return "UNAVAILABLE";
  if (isDevelopmentAcceptance() && acceptanceWriteFailure) return "FAILED";

  try {
    window.localStorage.setItem(
      GUANYAO_PERSONALITY_RING_LITE_STORAGE_KEY,
      JSON.stringify(state),
    );
    return "STORED";
  } catch {
    return "FAILED";
  }
}
