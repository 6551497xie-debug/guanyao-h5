import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(
  rootDir,
  "src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts",
);
const controllerPath = path.join(
  rootDir,
  "src/services/xinmaiRealityEncounterIntentController.ts",
);
const routePath = path.join(
  rootDir,
  "src/pages/RealityProductionRouteEntry.tsx",
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-intent-recovery-"),
);
const outPath = path.join(tempDir, "recovery.mjs");

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) {
    throw new Error(`${name} forbidden=${marker}`);
  }
  console.log(`PASS | ${name}`);
};

const values = new Map();
const sessionStorage = {
  getItem(key) {
    return values.get(key) ?? null;
  },
  setItem(key, value) {
    values.set(key, String(value));
  },
  removeItem(key) {
    values.delete(key);
  },
};
globalThis.window = { sessionStorage };

const intent = Object.freeze({
  schemaVersion: "XINMAI_REALITY_ENCOUNTER_INTENT_V1",
  source: "xinmai_reality_encounter_intent_controller",
  intentReferenceId: "intent-a",
  encounterCycleId: "cycle-a",
  sourceReferenceId: "source-a",
  starBeastIdentityReferenceId: "beast-a",
  mansionCoordinateReferenceId: "mansion-a",
  origin: "FIRST_ENCOUNTER",
  qualification: "WHISPER_SKIPPED",
  state: "READY_TO_ENTER_REALITY",
  routeTarget: "/reality",
  issuedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 60_000).toISOString(),
  revision: 1,
  failure: null,
  terminalReason: null,
  provenance: Object.freeze({
    userExplicitRequest: true,
    identityAuthority: "EXISTING_RECOGNIZED_LIFE",
    relationshipAuthority: "EXISTING_RELATIONSHIP_RUNTIME",
    noGrowthAuthority: true,
  }),
});

try {
  await build({
    entryPoints: [adapterPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);

  const write = runtime.writeRealityEncounterRecoveryCandidate(intent);
  assertEqual("Recovery Adapter confirms write", write.status, "CONFIRMED");
  const read = runtime.readRealityEncounterRecoveryCandidate();
  assertEqual("Recovery Adapter returns typed candidate", read.status, "FOUND");
  assertEqual("Recovery candidate preserves cycle", read.snapshot.intent.encounterCycleId, "cycle-a");
  assertEqual("Recovery candidate is not Runtime Active authority", read.snapshot.intent.state, "READY_TO_ENTER_REALITY");

  const wrongClear = runtime.clearRealityEncounterRecoveryCandidate("intent-other");
  assertEqual("wrong intent cannot clear candidate", wrongClear.status, "UNCONFIRMED");
  const clear = runtime.clearRealityEncounterRecoveryCandidate("intent-a");
  assertEqual("matching intent clears candidate", clear.status, "CONFIRMED");
  assertEqual("cleared candidate is absent", runtime.readRealityEncounterRecoveryCandidate().status, "NOT_FOUND");

  values.set("xinmaiRealityEncounterIntentRecovery", "{broken");
  assertEqual("corrupted candidate is rejected", runtime.readRealityEncounterRecoveryCandidate().status, "CORRUPTED");

  values.set(
    "xinmaiRealityEncounterIntentRecovery",
    JSON.stringify({
      schemaVersion: "XINMAI_REALITY_ENCOUNTER_RECOVERY_V1",
      source: "xinmai_reality_encounter_intent_recovery_adapter",
      intent: {
        ...intent,
        lifeWhisperText: "must-not-recover",
      },
      writtenAt: new Date().toISOString(),
    }),
  );
  assertEqual(
    "candidate with hidden relationship payload is rejected",
    runtime.readRealityEncounterRecoveryCandidate().status,
    "CORRUPTED",
  );

  values.set(
    "xinmaiRealityEncounterIntentRecovery",
    JSON.stringify({
      schemaVersion: "XINMAI_REALITY_ENCOUNTER_RECOVERY_V1",
      source: "xinmai_reality_encounter_intent_recovery_adapter",
      intent: {
        ...intent,
        state: "FAILED_RETRYABLE",
        failure: null,
      },
      writtenAt: new Date().toISOString(),
    }),
  );
  assertEqual(
    "candidate with invalid failure semantics is rejected",
    runtime.readRealityEncounterRecoveryCandidate().status,
    "CORRUPTED",
  );

  const controllerSource = fs.readFileSync(controllerPath, "utf8");
  const routeSource = fs.readFileSync(routePath, "utf8");
  assertExcludes("Controller has no direct sessionStorage access", controllerSource, "sessionStorage");
  assertExcludes("Route has no direct sessionStorage access", routeSource, "sessionStorage");
  assertExcludes("Route does not import Recovery Adapter", routeSource, "xinmaiRealityEncounterIntentRecoveryAdapter");

  console.log("\n[XINMAI REALITY ENCOUNTER INTENT RECOVERY] PASS");
} catch (error) {
  console.error("[XINMAI REALITY ENCOUNTER INTENT RECOVERY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
