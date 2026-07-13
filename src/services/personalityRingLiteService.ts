import {
  readPersistedPersonalityRingLiteState,
  writePersistedPersonalityRingLiteState,
} from "./guanyaoPersonalityRingLitePersistenceAdapter";

export type PersonalityRingLiteState = {
  version: "1.0";
  updatedAt: string;
  entries: PersonalityRingLiteEntry[];
};

export type PersonalityRingLiteEntry = {
  id: string;
  createdAt: string;
  source: "dynamics";
  mother: {
    motherCodeName?: string;
    lowerTrigram?: string;
  };
  pressure: {
    selectedPressureSeedId?: string;
    surface?: string;
    pressureField?: string;
  };
  hexagram: {
    lowerTrigram?: string;
    upperTrigram?: string;
    hexagramCode?: string;
    hexagramName?: string;
    hexagramTitle?: string;
  };
  transmission: {
    completedNodeCount: 6;
    primaryDimension?: string;
  };
  crystal: {
    title: "本局结晶";
    copy: string;
  };
};

type CrystalEndStateInput = {
  source: "dynamics";
  status: "CRYSTALLIZED";
  createdAt: string;
  mother: PersonalityRingLiteEntry["mother"];
  pressure: PersonalityRingLiteEntry["pressure"];
  hexagram: PersonalityRingLiteEntry["hexagram"];
  transmission: PersonalityRingLiteEntry["transmission"];
  crystal: PersonalityRingLiteEntry["crystal"];
};

function emptyPersonalityRingLiteState(): PersonalityRingLiteState {
  return {
    version: "1.0",
    updatedAt: new Date().toISOString(),
    entries: [],
  };
}

function createEntryId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `ring-${Date.now()}`;
}

function isValidEntry(entry: PersonalityRingLiteEntry): boolean {
  return (
    entry.source === "dynamics" &&
    Boolean(entry.createdAt) &&
    entry.transmission.completedNodeCount === 6 &&
    entry.crystal.title === "本局结晶" &&
    Boolean(entry.crystal.copy)
  );
}

export function readPersonalityRingLite(): PersonalityRingLiteState {
  try {
    const persistedState = readPersistedPersonalityRingLiteState();
    if (!persistedState || typeof persistedState !== "object") {
      return emptyPersonalityRingLiteState();
    }

    const parsed = persistedState as Partial<PersonalityRingLiteState>;
    if (parsed.version !== "1.0" || !Array.isArray(parsed.entries)) {
      return emptyPersonalityRingLiteState();
    }

    return {
      version: "1.0",
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      entries: parsed.entries.filter((entry): entry is PersonalityRingLiteEntry => isValidEntry(entry as PersonalityRingLiteEntry)),
    };
  } catch {
    return emptyPersonalityRingLiteState();
  }
}

export function createPersonalityRingLiteEntryFromCrystal(
  currentCrystalEndState: CrystalEndStateInput | null | undefined,
): PersonalityRingLiteEntry | null {
  if (!currentCrystalEndState || currentCrystalEndState.source !== "dynamics" || currentCrystalEndState.status !== "CRYSTALLIZED") {
    return null;
  }

  const entry: PersonalityRingLiteEntry = {
    id: createEntryId(),
    createdAt: currentCrystalEndState.createdAt,
    source: "dynamics",
    mother: currentCrystalEndState.mother,
    pressure: currentCrystalEndState.pressure,
    hexagram: currentCrystalEndState.hexagram,
    transmission: {
      completedNodeCount: 6,
      primaryDimension: currentCrystalEndState.transmission.primaryDimension,
    },
    crystal: currentCrystalEndState.crystal,
  };

  return isValidEntry(entry) ? entry : null;
}

export function savePersonalityRingLiteEntry(entry: PersonalityRingLiteEntry): PersonalityRingLiteState {
  const current = readPersonalityRingLite();
  if (!isValidEntry(entry)) return current;

  const duplicate = current.entries.some((item) => item.createdAt === entry.createdAt);
  if (duplicate) return current;

  const next: PersonalityRingLiteState = {
    version: "1.0",
    updatedAt: new Date().toISOString(),
    entries: [entry, ...current.entries],
  };

  const writeStatus = writePersistedPersonalityRingLiteState(next);
  return writeStatus === "FAILED" ? current : next;
}
