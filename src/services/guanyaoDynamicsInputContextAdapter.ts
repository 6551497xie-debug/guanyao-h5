import {
  GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
  readPersistedMotherCodeProfile,
} from "./guanyaoMotherCodeProfilePersistenceAdapter";
import {
  GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
  readPersistedOriginMotherContext,
} from "./guanyaoOriginMotherContextPersistenceAdapter";
import {
  GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  readPersistedPersonaOutputSnapshot,
} from "./guanyaoPersonaSnapshotPersistenceAdapter";
import {
  GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION,
  readPersistedSelectedPressureSeedContext,
} from "./guanyaoSelectedPressureSeedContextPersistenceAdapter";
import type {
  DynamicsHandoffState,
  DynamicsInputContext,
  DynamicsMotherHandoff,
  StoredMotherCodeProfile,
  StoredOriginMotherContext,
  StoredPersonaOutputSnapshot,
  StoredSelectedPressureSeedContext,
} from "../types/gravityRuntimeInput";

export type DynamicsInputContextAdapterInput = Readonly<{
  handoffState?: unknown;
  primaryPetalFixture?: StoredSelectedPressureSeedContext | null;
  smokeFixture?: Readonly<{
    motherCodeProfile: StoredMotherCodeProfile;
    personaOutputSnapshot: StoredPersonaOutputSnapshot;
  }> | null;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readCompatibleRecord<T extends object>(value: unknown, schemaVersion: string): T | null {
  if (!isRecord(value)) return null;
  if (value.schemaVersion !== undefined && value.schemaVersion !== schemaVersion) return null;
  return value as T;
}

function resolveHandoffState(value: unknown): DynamicsHandoffState | null {
  if (!isRecord(value)) return null;

  const selectedPressureSeedContext = readCompatibleRecord<StoredSelectedPressureSeedContext>(
    value.selectedPressureSeedContext,
    GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION,
  );
  const motherCandidate = isRecord(value.mother) ? value.mother : null;
  const motherCodeProfile = readCompatibleRecord<StoredMotherCodeProfile>(
    motherCandidate?.motherCodeProfile,
    GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
  );
  const originMotherContext = readCompatibleRecord<StoredOriginMotherContext>(
    motherCandidate?.originMotherContext,
    GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
  );
  const personaOutputSnapshot = readCompatibleRecord<StoredPersonaOutputSnapshot>(
    motherCandidate?.personaOutputSnapshot,
    GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  );
  const mother: DynamicsMotherHandoff | null =
    motherCodeProfile && originMotherContext && personaOutputSnapshot
      ? { motherCodeProfile, originMotherContext, personaOutputSnapshot }
      : null;

  return { selectedPressureSeedContext, mother };
}

export function resolveDynamicsInputContext(
  input: DynamicsInputContextAdapterInput,
): DynamicsInputContext {
  const handoffState = resolveHandoffState(input.handoffState);

  return {
    selectedPressureSeedContext:
      input.primaryPetalFixture ??
      handoffState?.selectedPressureSeedContext ??
      readCompatibleRecord<StoredSelectedPressureSeedContext>(
        readPersistedSelectedPressureSeedContext(),
        GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION,
      ),
    motherCodeProfile:
      input.smokeFixture?.motherCodeProfile ??
      handoffState?.mother?.motherCodeProfile ??
      readCompatibleRecord<StoredMotherCodeProfile>(
        readPersistedMotherCodeProfile(),
        GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
      ),
    originMotherContext:
      handoffState?.mother?.originMotherContext ??
      readCompatibleRecord<StoredOriginMotherContext>(
        readPersistedOriginMotherContext(),
        GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
      ),
    personaOutputSnapshot:
      input.smokeFixture?.personaOutputSnapshot ??
      handoffState?.mother?.personaOutputSnapshot ??
      readCompatibleRecord<StoredPersonaOutputSnapshot>(
        readPersistedPersonaOutputSnapshot(),
        GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
      ),
  };
}
