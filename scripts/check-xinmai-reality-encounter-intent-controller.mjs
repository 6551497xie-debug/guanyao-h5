import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const controllerPath = path.join(
  rootDir,
  "src/services/xinmaiRealityEncounterIntentController.ts",
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-intent-controller-"),
);
const outPath = path.join(tempDir, "controller.mjs");

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

const storageValues = new Map();
globalThis.window = {
  sessionStorage: {
    getItem(key) {
      return storageValues.get(key) ?? null;
    },
    setItem(key, value) {
      storageValues.set(key, String(value));
    },
    removeItem(key) {
      storageValues.delete(key);
    },
  },
};

const identity = Object.freeze({
  sourceReferenceId: "life-source-a",
  starBeastIdentityReferenceId: "starbeast-a",
  mansionCoordinateReferenceId: "mansion-a",
});

try {
  await build({
    entryPoints: [controllerPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);

  const requested = runtime.requestRealityEncounter({
    origin: "FIRST_ENCOUNTER",
    qualification: "WHISPER_SKIPPED",
    identityReferences: identity,
  });
  assertEqual("explicit request creates READY intent", requested.status, "READY");
  assertEqual(
    "request owns no Active claim",
    requested.intent.state,
    "READY_TO_ENTER_REALITY",
  );
  assertEqual("recovery write is confirmed", requested.persistence, "CONFIRMED");

  const repeated = runtime.requestRealityEncounter({
    origin: "FIRST_ENCOUNTER",
    qualification: "WHISPER_SKIPPED",
    identityReferences: identity,
  });
  assertEqual(
    "duplicate user request keeps the same cycle",
    repeated.intent.encounterCycleId,
    requested.intent.encounterCycleId,
  );

  const admission = runtime.establishRealityEncounterAdmission({
    intentReferenceId: requested.intent.intentReferenceId,
    identityReferences: identity,
  });
  assertEqual("Route admission starts acceptance", admission.status, "READY");
  assertEqual(
    "Route admission is not Active",
    admission.intent.state,
    "ACCEPTING_REALITY",
  );

  const staleOutcome = runtime.commitRealityEncounterActive({
    status: "REALITY_MINIMUM_PRESENTED",
    intentReferenceId: admission.intent.intentReferenceId,
    encounterCycleId: admission.intent.encounterCycleId,
    intentRevision: admission.intentRevision - 1,
    sourceReferenceId: identity.sourceReferenceId,
    presentedSurface: "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES",
    committedAt: new Date().toISOString(),
  });
  assertEqual("stale Host outcome is rejected", staleOutcome.status, "REJECTED");

  const committed = runtime.commitRealityEncounterActive({
    status: "REALITY_MINIMUM_PRESENTED",
    intentReferenceId: admission.admission.intentReferenceId,
    encounterCycleId: admission.admission.encounterCycleId,
    intentRevision: admission.admission.intentRevision,
    sourceReferenceId: identity.sourceReferenceId,
    presentedSurface: "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES",
    committedAt: new Date().toISOString(),
  });
  assertEqual("real minimum surface commits Active", committed.status, "ACTIVE");
  assertEqual(
    "Controller is the single Active authority",
    runtime.readCurrentRealityEncounterIntent().state,
    "ACTIVE_IN_REALITY",
  );

  const recoveredRuntime = await import(
    `file://${outPath}?reload=${Date.now()}`
  );
  const recoveredAdmission =
    recoveredRuntime.establishRealityEncounterAdmission({
      intentReferenceId: committed.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "Active refresh is recovered through the Controller",
    recoveredAdmission.status,
    "READY",
  );
  assertEqual(
    "Active refresh preserves the encounter cycle",
    recoveredAdmission.admission.encounterCycleId,
    requested.intent.encounterCycleId,
  );
  const recoveredActive =
    recoveredRuntime.commitRealityEncounterActive({
      status: "REALITY_MINIMUM_PRESENTED",
      intentReferenceId:
        recoveredAdmission.admission.intentReferenceId,
      encounterCycleId:
        recoveredAdmission.admission.encounterCycleId,
      intentRevision:
        recoveredAdmission.admission.intentRevision,
      sourceReferenceId: identity.sourceReferenceId,
      presentedSurface:
        "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES",
      committedAt: new Date().toISOString(),
    });
  assertEqual(
    "Recovered static minimum surface recommits Active",
    recoveredActive.status,
    "ACTIVE",
  );

  const terminal =
    recoveredRuntime.terminateRealityEncounter("ENCOUNTER_COMPLETED");
  assertEqual("formal Reality handoff terminates entry cycle", terminal.status, "TERMINATED");
  assertEqual(
    "terminal cycle leaves no current intent",
    recoveredRuntime.readCurrentRealityEncounterIntent(),
    null,
  );

  const next = recoveredRuntime.requestRealityEncounter({
    origin: "CHOICE_CONTINUATION",
    qualification: "LIVED_RESPONSE_CONTINUATION",
    identityReferences: identity,
  });
  assertEqual("Choice creates a new eligible encounter", next.status, "READY");
  assertEqual(
    "Choice does not reuse the completed cycle",
    next.intent.encounterCycleId === requested.intent.encounterCycleId,
    false,
  );
  const nextAdmission =
    recoveredRuntime.establishRealityEncounterAdmission({
    intentReferenceId: next.intent.intentReferenceId,
    identityReferences: identity,
  });
  const failed =
    recoveredRuntime.failRealityEncounterAcceptance({
    intentReferenceId: nextAdmission.admission.intentReferenceId,
    encounterCycleId: nextAdmission.admission.encounterCycleId,
    intentRevision: nextAdmission.admission.intentRevision,
    stage: "ROUTE_LOAD",
    reason: "ROUTE_LOAD_UNAVAILABLE",
  });
  assertEqual("Active-before failure stays retryable", failed.status, "FAILED_RETRYABLE");
  const retryRuntime = await import(
    `file://${outPath}?retry=${Date.now()}`
  );
  const interruptedRecovery =
    retryRuntime.establishRealityEncounterAdmission({
      intentReferenceId: failed.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "Incomplete refresh requires truthful retry",
    interruptedRecovery.status,
    "RETRY_REQUIRED",
  );
  assertEqual(
    "Incomplete refresh keeps the same cycle",
    interruptedRecovery.intent.encounterCycleId,
    next.intent.encounterCycleId,
  );
  const retry = retryRuntime.retryRealityEncounterAcceptance({
    intentReferenceId: failed.intent.intentReferenceId,
    identityReferences: identity,
  });
  assertEqual("same-cycle retry is admitted", retry.status, "READY");
  assertEqual(
    "same-cycle retry preserves encounter id",
    retry.admission.encounterCycleId,
    next.intent.encounterCycleId,
  );
  assertEqual(
    "same-cycle retry advances revision",
    retry.admission.intentRevision > nextAdmission.admission.intentRevision,
    true,
  );

  const identityMismatch =
    retryRuntime.establishRealityEncounterAdmission({
    intentReferenceId: retry.admission.intentReferenceId,
    identityReferences: {
      ...identity,
      mansionCoordinateReferenceId: "mansion-other",
    },
  });
  assertEqual("identity mismatch cannot consume intent", identityMismatch.status, "BLOCKED");

  for (const forbidden of [
    "lifeWhisperText",
    "relationshipName",
    "pressureSeedId",
    "selectedPressureSeedContext",
    "sixDimension",
    "gravityState",
    "choiceResult",
    "crystal",
    "archiveEntry",
  ]) {
    assertEqual(
      `Intent excludes ${forbidden}`,
      Object.prototype.hasOwnProperty.call(retry.intent, forbidden),
      false,
    );
  }

  console.log("\n[XINMAI REALITY ENCOUNTER INTENT CONTROLLER] PASS");
} catch (error) {
  console.error("[XINMAI REALITY ENCOUNTER INTENT CONTROLLER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
