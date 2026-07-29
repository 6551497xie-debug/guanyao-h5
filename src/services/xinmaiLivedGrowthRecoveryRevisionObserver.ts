import {
  XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  isXinmaiLivedGrowthLegacyStorageEvent,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";

const XINMAI_LIVED_GROWTH_REVISION_CHANNEL =
  "xinmai-lived-growth-canonical-revision:v1";
const XINMAI_LIVED_GROWTH_REVISION_EVENT =
  "xinmai-lived-growth-canonical-revision";

export const notifyXinmaiLivedGrowthCanonicalRevision = (
  revision: number,
): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(XINMAI_LIVED_GROWTH_REVISION_EVENT, {
      detail: Object.freeze({ revision }),
    }),
  );
  if (typeof BroadcastChannel === "undefined") return;
  try {
    const channel = new BroadcastChannel(
      XINMAI_LIVED_GROWTH_REVISION_CHANNEL,
    );
    channel.postMessage(Object.freeze({ revision }));
    channel.close();
  } catch {
    // Notification is best-effort. Canonical recovery remains authoritative.
  }
};

export const subscribeToXinmaiLivedGrowthRecoveryRevision = (
  onRevisionChanged: () => void,
): (() => void) => {
  if (typeof window === "undefined" || !window.addEventListener) {
    return () => undefined;
  }
  const onStorage = (event: StorageEvent) => {
    if (isXinmaiLivedGrowthLegacyStorageEvent(event)) {
      onRevisionChanged();
    }
  };
  const onCanonicalRevision = () => onRevisionChanged();
  const onFocus = () => onRevisionChanged();
  const onVisibility = () => {
    if (document.visibilityState === "visible") onRevisionChanged();
  };
  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(
        XINMAI_LIVED_GROWTH_REVISION_CHANNEL,
      );
      channel.onmessage = () => onRevisionChanged();
    } catch {
      channel = null;
    }
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(
    XINMAI_LIVED_GROWTH_REVISION_EVENT,
    onCanonicalRevision,
  );
  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onVisibility);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(
      XINMAI_LIVED_GROWTH_REVISION_EVENT,
      onCanonicalRevision,
    );
    window.removeEventListener("focus", onFocus);
    document.removeEventListener("visibilitychange", onVisibility);
    channel?.close();
  };
};

export const XinmaiLivedGrowthRecoveryRevisionObserver = Object.freeze({
  legacyStorageKey: XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  channelName: XINMAI_LIVED_GROWTH_REVISION_CHANNEL,
  subscribe: subscribeToXinmaiLivedGrowthRecoveryRevision,
  notify: notifyXinmaiLivedGrowthCanonicalRevision,
  readOnly: true as const,
});
