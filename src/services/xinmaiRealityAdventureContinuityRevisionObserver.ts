const CHANNEL_NAME =
  "xinmai-reality-adventure-continuity-revision-v1";

export type RealityAdventureContinuityRevisionNotice = Readonly<{
  source: "xinmai_reality_adventure_continuity_revision_observer";
  encounterCycleId: string;
  canonicalRevision: number;
  fencingToken: number;
  emittedAt: string;
}>;

type Listener = (notice: RealityAdventureContinuityRevisionNotice) => void;

const listeners = new Set<Listener>();
let channel: BroadcastChannel | null = null;

const isNotice = (
  value: unknown,
): value is RealityAdventureContinuityRevisionNotice => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<RealityAdventureContinuityRevisionNotice>;
  return (
    candidate.source ===
      "xinmai_reality_adventure_continuity_revision_observer" &&
    typeof candidate.encounterCycleId === "string" &&
    candidate.encounterCycleId.trim().length > 0 &&
    Number.isInteger(candidate.canonicalRevision) &&
    Number(candidate.canonicalRevision) > 0 &&
    Number.isInteger(candidate.fencingToken) &&
    Number(candidate.fencingToken) > 0 &&
    typeof candidate.emittedAt === "string"
  );
};

const notifyLocal = (
  notice: RealityAdventureContinuityRevisionNotice,
): void => {
  listeners.forEach((listener) => listener(notice));
};

const getChannel = (): BroadcastChannel | null => {
  if (
    channel !== null ||
    typeof BroadcastChannel === "undefined"
  ) {
    return channel;
  }
  channel = new BroadcastChannel(CHANNEL_NAME);
  channel.addEventListener("message", (event: MessageEvent<unknown>) => {
    if (isNotice(event.data)) notifyLocal(event.data);
  });
  return channel;
};

export function publishRealityAdventureContinuityRevision(input: Readonly<{
  encounterCycleId: string;
  canonicalRevision: number;
  fencingToken: number;
}>): void {
  const notice = Object.freeze({
    source:
      "xinmai_reality_adventure_continuity_revision_observer" as const,
    encounterCycleId: input.encounterCycleId,
    canonicalRevision: input.canonicalRevision,
    fencingToken: input.fencingToken,
    emittedAt: new Date().toISOString(),
  });
  notifyLocal(notice);
  getChannel()?.postMessage(notice);
}

export function subscribeToRealityAdventureContinuityRevision(
  listener: Listener,
): () => void {
  listeners.add(listener);
  getChannel();
  return () => {
    listeners.delete(listener);
  };
}

export const REALITY_ADVENTURE_CONTINUITY_REVISION_OBSERVER_BOUNDARY =
  Object.freeze({
    notificationOnly: true as const,
    rereadRequired: true as const,
    noAuthority: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noDomAuthority: true as const,
  });
