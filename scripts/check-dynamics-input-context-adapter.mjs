import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsInputContextAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-input-context-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const storage = new Map();
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
  },
};

try {
  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveDynamicsInputContext } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  storage.set(
    "guanyao:selectedPressureSeedContext",
    JSON.stringify({ selectedPressureSeedId: "persisted-seed" }),
  );
  storage.set(
    "guanyao:motherCodeProfile",
    JSON.stringify({ motherCodeName: "persisted-mother" }),
  );
  storage.set(
    "guanyao:originMotherContext",
    JSON.stringify({ source: "persisted-origin", starbeast: { fourSymbol: "白虎" } }),
  );
  storage.set(
    "guanyao:personaOutputSnapshot",
    JSON.stringify({ motherCode: "persisted-persona" }),
  );

  const persistedInput = resolveDynamicsInputContext({});
  assertEqual(
    "persistence fallback keeps selected pressure seed",
    persistedInput.selectedPressureSeedContext?.selectedPressureSeedId,
    "persisted-seed",
  );
  assertEqual(
    "persistence fallback keeps mother profile",
    persistedInput.motherCodeProfile?.motherCodeName,
    "persisted-mother",
  );
  assertEqual(
    "persistence fallback keeps origin context",
    persistedInput.originMotherContext?.source,
    "persisted-origin",
  );
  assertEqual(
    "persistence fallback keeps persona snapshot",
    persistedInput.personaOutputSnapshot?.motherCode,
    "persisted-persona",
  );

  const handoffState = {
    selectedPressureSeedContext: {
      schemaVersion: "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2",
      selectedPressureSeedId: "route-seed",
    },
    mother: {
      motherCodeProfile: {
        schemaVersion: "GUANYAO_MOTHER_CODE_PROFILE_V2",
        motherCodeName: "route-mother",
      },
      originMotherContext: {
        schemaVersion: "GUANYAO_ORIGIN_MOTHER_CONTEXT_V2",
        source: "route-origin",
      },
      personaOutputSnapshot: {
        schemaVersion: "GUANYAO_PERSONA_SNAPSHOT_V2",
        motherCode: "route-persona",
      },
    },
  };
  const routedInput = resolveDynamicsInputContext({ handoffState });
  assertEqual(
    "route handoff wins selected pressure seed persistence",
    routedInput.selectedPressureSeedContext?.selectedPressureSeedId,
    "route-seed",
  );
  assertEqual(
    "route handoff wins mother profile persistence",
    routedInput.motherCodeProfile?.motherCodeName,
    "route-mother",
  );
  assertEqual(
    "route handoff wins origin context persistence",
    routedInput.originMotherContext?.source,
    "route-origin",
  );
  assertEqual(
    "route handoff wins persona snapshot persistence",
    routedInput.personaOutputSnapshot?.motherCode,
    "route-persona",
  );

  const fixtureInput = resolveDynamicsInputContext({
    handoffState,
    primaryPetalFixture: { selectedPressureSeedId: "fixture-seed" },
    smokeFixture: {
      motherCodeProfile: { motherCodeName: "fixture-mother" },
      personaOutputSnapshot: { motherCode: "fixture-persona" },
    },
  });
  assertEqual(
    "fixture wins routed pressure seed",
    fixtureInput.selectedPressureSeedContext?.selectedPressureSeedId,
    "fixture-seed",
  );
  assertEqual(
    "fixture wins routed mother profile",
    fixtureInput.motherCodeProfile?.motherCodeName,
    "fixture-mother",
  );
  assertEqual(
    "fixture wins routed persona snapshot",
    fixtureInput.personaOutputSnapshot?.motherCode,
    "fixture-persona",
  );
  assertEqual(
    "route origin remains when fixture has no origin override",
    fixtureInput.originMotherContext?.source,
    "route-origin",
  );

  const malformedInput = resolveDynamicsInputContext({
    handoffState: {
      selectedPressureSeedContext: {
        schemaVersion: "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V99",
        selectedPressureSeedId: "future-seed",
      },
      mother: {
        motherCodeProfile: handoffState.mother.motherCodeProfile,
        originMotherContext: handoffState.mother.originMotherContext,
        personaOutputSnapshot: "invalid-persona",
      },
    },
  });
  assertEqual(
    "future pressure schema falls back to persistence",
    malformedInput.selectedPressureSeedContext?.selectedPressureSeedId,
    "persisted-seed",
  );
  assertEqual(
    "partial malformed mother bundle falls back as a unit",
    malformedInput.motherCodeProfile?.motherCodeName,
    "persisted-mother",
  );
  assertEqual(
    "malformed route state cannot replace persisted persona",
    malformedInput.personaOutputSnapshot?.motherCode,
    "persisted-persona",
  );

  storage.clear();
  const emptyInput = resolveDynamicsInputContext({ handoffState: "invalid-state" });
  assertEqual("invalid route without persistence yields no pressure seed", emptyInput.selectedPressureSeedContext, null);
  assertEqual("invalid route without persistence yields no mother profile", emptyInput.motherCodeProfile, null);
  assertEqual("invalid route without persistence yields no origin context", emptyInput.originMotherContext, null);
  assertEqual("invalid route without persistence yields no persona snapshot", emptyInput.personaOutputSnapshot, null);

  assertIncludes("Gravity delegates Dynamics input resolution", gravitySource, "resolveDynamicsInputContext({");
  assertIncludes("Gravity passes unknown route state without casting", gravitySource, "handoffState: location.state");
  assertExcludes("Gravity does not cast route state", gravitySource, "location.state as");
  assertExcludes("Gravity does not read persistence directly", gravitySource, "readPersisted");
  assertIncludes(
    "Dynamics input adapter owns selected pressure persistence fallback",
    adapterSource,
    "readPersistedSelectedPressureSeedContext()",
  );
  assertIncludes(
    "Dynamics input adapter owns mother profile persistence fallback",
    adapterSource,
    "readPersistedMotherCodeProfile()",
  );
  assertIncludes(
    "Dynamics input adapter owns origin context persistence fallback",
    adapterSource,
    "readPersistedOriginMotherContext()",
  );
  assertIncludes(
    "Dynamics input adapter owns persona snapshot persistence fallback",
    adapterSource,
    "readPersistedPersonaOutputSnapshot()",
  );

  console.log("\n[DYNAMICS INPUT CONTEXT ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS INPUT CONTEXT ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  delete globalThis.window;
  fs.rmSync(tempModulePath, { force: true });
}
