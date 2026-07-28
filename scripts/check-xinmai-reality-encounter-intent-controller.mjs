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

const TWO_HOURS_MS = 2 * 60 * 60 * 1_000;
const initialNow = Date.parse("2026-07-28T08:00:00.000Z");
const NativeDate = globalThis.Date;
let controlledNow = initialNow;
class ControlledDate extends NativeDate {
  constructor(...args) {
    super(...(args.length === 0 ? [controlledNow] : args));
  }

  static now() {
    return controlledNow;
  }
}
globalThis.Date = ControlledDate;

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

const createHostOutcome = (
  admission,
  options = Object.freeze({ staticSurface: false }),
) => {
  const committedAt = new NativeDate(controlledNow).toISOString();
  const staticSurface = options.staticSurface === true;
  const attempt = Object.freeze({
    intentReferenceId: admission.intentReferenceId,
    encounterCycleId: admission.encounterCycleId,
    intentRevision: admission.intentRevision,
    identityReferences: identity,
  });
  const lifeSurfaceOutcome = Object.freeze({
    ...attempt,
    status: "REALITY_LIFE_SURFACE_PRESENTED",
    sourceReferenceId: identity.sourceReferenceId,
    surfaceMode: staticSurface
      ? "SEMANTIC_STATIC_LIFE_UNIVERSE"
      : "WEBGL_LIFE_UNIVERSE",
    presentedAt: committedAt,
  });
  const pressureSurfaceOutcome = Object.freeze({
    ...attempt,
    status: "REALITY_PRESSURE_SURFACE_PRESENTED",
    sourceReferenceId: identity.sourceReferenceId,
    surfaceMode: "SEMANTIC_PRESSURE_CANDIDATE_SURFACE",
    candidateBundleReferenceId: "bundle-a",
    candidateCount: 3,
    presentedAt: committedAt,
  });
  const presentedSurface = staticSurface
    ? "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES"
    : "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES";
  const transaction = Object.freeze({
    schemaVersion:
      "XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_V1",
    source: "xinmai_reality_surface_admission_transaction",
    ...attempt,
    lifeSurfaceOutcome,
    pressureSurfaceOutcome,
    minimumSurface: presentedSurface,
    committedAt,
  });
  return Object.freeze({
    status: "REALITY_MINIMUM_PRESENTED",
    intentReferenceId: admission.intentReferenceId,
    encounterCycleId: admission.encounterCycleId,
    intentRevision: admission.intentRevision,
    sourceReferenceId: identity.sourceReferenceId,
    presentedSurface,
    transaction,
    committedAt,
  });
};

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
    requestedAt: new NativeDate(
      initialNow + 24 * 60 * 60 * 1_000,
    ).toISOString(),
  });
  assertEqual("explicit request creates READY intent", requested.status, "READY");
  assertEqual(
    "request owns no Active claim",
    requested.intent.state,
    "READY_TO_ENTER_REALITY",
  );
  assertEqual("recovery write is confirmed", requested.persistence, "CONFIRMED");
  assertEqual(
    "Controller owns the issued time",
    requested.intent.issuedAt,
    new NativeDate(initialNow).toISOString(),
  );
  assertEqual(
    "producer timestamp cannot extend recovery",
    Date.parse(requested.intent.expiresAt) -
      Date.parse(requested.intent.issuedAt),
    TWO_HOURS_MS,
  );
  const readyRecoverySnapshot = storageValues.get(
    "xinmaiRealityEncounterIntentRecovery",
  );
  assertEqual(
    "READY recovery snapshot is available for TTL boundaries",
    typeof readyRecoverySnapshot,
    "string",
  );

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

  controlledNow = initialNow + TWO_HOURS_MS - 1;
  const beforeBoundaryRuntime = await import(
    `file://${outPath}?before-boundary=${Date.now()}`,
  );
  const beforeBoundary =
    beforeBoundaryRuntime.establishRealityEncounterAdmission({
      intentReferenceId: requested.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "TTL boundary minus one millisecond keeps recovery eligible",
    beforeBoundary.status,
    "RETRY_REQUIRED",
  );
  assertEqual(
    "TTL boundary minus one millisecond is not expired",
    beforeBoundary.reason,
    "RETRY_NOT_AVAILABLE",
  );
  assertEqual(
    "TTL boundary minus one millisecond keeps the same cycle",
    beforeBoundary.intent.encounterCycleId,
    requested.intent.encounterCycleId,
  );
  storageValues.set(
    "xinmaiRealityEncounterIntentRecovery",
    readyRecoverySnapshot,
  );

  controlledNow = initialNow + TWO_HOURS_MS;
  const exactBoundaryRuntime = await import(
    `file://${outPath}?exact-boundary=${Date.now()}`,
  );
  const exactBoundary =
    exactBoundaryRuntime.establishRealityEncounterAdmission({
      intentReferenceId: requested.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "TTL exact boundary is expired",
    exactBoundary.reason,
    "INTENT_EXPIRED",
  );
  assertEqual(
    "TTL expiry keeps the same encounter cycle",
    exactBoundary.intent.encounterCycleId,
    requested.intent.encounterCycleId,
  );
  storageValues.set(
    "xinmaiRealityEncounterIntentRecovery",
    readyRecoverySnapshot,
  );

  controlledNow = initialNow + TWO_HOURS_MS + 1;
  const afterBoundaryRuntime = await import(
    `file://${outPath}?after-boundary=${Date.now()}`,
  );
  const afterBoundary =
    afterBoundaryRuntime.establishRealityEncounterAdmission({
      intentReferenceId: requested.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "TTL boundary plus one millisecond is expired",
    afterBoundary.reason,
    "INTENT_EXPIRED",
  );

  const overlongRecoverySnapshot = JSON.parse(readyRecoverySnapshot);
  overlongRecoverySnapshot.intent.expiresAt = new NativeDate(
    initialNow + 24 * 60 * 60 * 1_000,
  ).toISOString();
  storageValues.set(
    "xinmaiRealityEncounterIntentRecovery",
    JSON.stringify(overlongRecoverySnapshot),
  );
  controlledNow = initialNow + TWO_HOURS_MS;
  const overlongRuntime = await import(
    `file://${outPath}?overlong=${Date.now()}`,
  );
  const overlongRecovery =
    overlongRuntime.establishRealityEncounterAdmission({
      intentReferenceId: requested.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "legacy overlong snapshot cannot exceed the two-hour window",
    overlongRecovery.reason,
    "INTENT_EXPIRED",
  );

  const futureIssuedRecoverySnapshot = JSON.parse(readyRecoverySnapshot);
  futureIssuedRecoverySnapshot.intent.issuedAt = new NativeDate(
    initialNow + 30 * 60 * 1_000,
  ).toISOString();
  futureIssuedRecoverySnapshot.intent.expiresAt = new NativeDate(
    initialNow + 30 * 60 * 1_000 + TWO_HOURS_MS,
  ).toISOString();
  storageValues.set(
    "xinmaiRealityEncounterIntentRecovery",
    JSON.stringify(futureIssuedRecoverySnapshot),
  );
  controlledNow = initialNow;
  const rollbackClockRuntime = await import(
    `file://${outPath}?clock-rollback=${Date.now()}`,
  );
  const rollbackClockRecovery =
    rollbackClockRuntime.establishRealityEncounterAdmission({
      intentReferenceId: requested.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "clock rollback cannot extend recovery",
    rollbackClockRecovery.reason,
    "INTENT_EXPIRED",
  );

  storageValues.set(
    "xinmaiRealityEncounterIntentRecovery",
    readyRecoverySnapshot,
  );
  controlledNow = initialNow;
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

  const staleOutcomeInput = createHostOutcome(admission.admission);
  const staleOutcome = runtime.commitRealityEncounterActive({
    ...staleOutcomeInput,
    intentRevision: admission.intentRevision - 1,
  });
  assertEqual("stale Host outcome is rejected", staleOutcome.status, "REJECTED");

  const {
    transaction: _missingTransaction,
    ...outcomeWithoutTransaction
  } = createHostOutcome(admission.admission);
  const missingTransaction =
    runtime.commitRealityEncounterActive(
      outcomeWithoutTransaction,
    );
  assertEqual(
    "unproven minimum surface cannot commit Active",
    missingTransaction.status,
    "REJECTED",
  );
  assertEqual(
    "unproven minimum surface becomes retryable",
    runtime.readCurrentRealityEncounterIntent().state,
    "FAILED_RETRYABLE",
  );
  const surfaceTransactionRetry =
    runtime.retryRealityEncounterAcceptance({
      intentReferenceId: requested.intent.intentReferenceId,
      identityReferences: identity,
    });
  assertEqual(
    "typed surface transaction retries the same cycle",
    surfaceTransactionRetry.admission.encounterCycleId,
    requested.intent.encounterCycleId,
  );

  const committed = runtime.commitRealityEncounterActive(
    createHostOutcome(surfaceTransactionRetry.admission),
  );
  assertEqual("real minimum surface commits Active", committed.status, "ACTIVE");
  assertEqual(
    "Controller is the single Active authority",
    runtime.readCurrentRealityEncounterIntent().state,
    "ACTIVE_IN_REALITY",
  );
  assertEqual(
    "ACTIVE keeps the original recovery deadline",
    committed.intent.expiresAt,
    requested.intent.expiresAt,
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
    recoveredRuntime.commitRealityEncounterActive(
      createHostOutcome(recoveredAdmission.admission, {
        staticSurface: true,
      }),
    );
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
  controlledNow = initialNow + 60 * 60 * 1_000;
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
  assertEqual(
    "same-cycle retry does not extend TTL",
    retry.intent.expiresAt,
    next.intent.expiresAt,
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
  globalThis.Date = NativeDate;
  fs.rmSync(tempDir, { recursive: true, force: true });
}
