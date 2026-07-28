import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  transaction:
    "src/services/realityExplicitLeaveTerminationTransaction.ts",
  controller:
    "src/services/xinmaiRealityEncounterIntentController.ts",
  activation:
    "src/services/realityRouteActivationSourceContext.ts",
  app: "src/App.tsx",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  routeType: "src/types/realityProductionRouteEntry.ts",
  host: "src/components/RealityProductionHost.tsx",
  presentation:
    "src/components/RealityPressureSeedPresentation.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${name} expected=${expected} actual=${actual}`,
    );
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) {
    throw new Error(`${name} missing=${marker}`);
  }
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) {
    throw new Error(`${name} forbidden=${marker}`);
  }
  console.log(`PASS | ${name}`);
};

const storageValues = new Map();
let removeUnavailable = false;
globalThis.window = {
  sessionStorage: {
    getItem(key) {
      return storageValues.get(key) ?? null;
    },
    setItem(key, value) {
      storageValues.set(key, String(value));
    },
    removeItem(key) {
      if (removeUnavailable) {
        throw new Error("session storage unavailable");
      }
      storageValues.delete(key);
    },
  },
};

const identity = Object.freeze({
  sourceReferenceId: "life-source-explicit-leave",
  starBeastIdentityReferenceId:
    "starbeast-explicit-leave",
  mansionCoordinateReferenceId:
    "mansion-explicit-leave",
});
const sessionBoundary = Object.freeze({
  immutableCarrier: true,
  existingEngineResultsOnly: true,
  noEngineInvocation: true,
});
const lifeSourceSession = Object.freeze({
  schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
  source: "launch_life_source_session",
  sourceKind: "REAL_ENGINE_RESULT",
  sourceReferenceId: identity.sourceReferenceId,
  provenance: Object.freeze({
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId: identity.sourceReferenceId,
    birthSource: "LAUNCH_USER_CONFIRMED",
  }),
  boundary: sessionBoundary,
});
const recognitionRealitySession = Object.freeze({
  sourceReferenceId: identity.sourceReferenceId,
  phase: "REALITY_ENTRY_ELIGIBLE",
  realityEntryConfirmed: true,
});
const realityEntryContext = Object.freeze({
  schemaVersion:
    "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT_V1",
  source: "genesis_production_reality_entry_context",
  sourceReferenceId: identity.sourceReferenceId,
  sourceProvenance: "REAL_USER_SESSION",
  eligibility: "ELIGIBLE",
  recognitionRealitySession,
});

const activateAdmission = (runtime, admission) => {
  const routeAuthorization = Object.freeze({
    status: "READY",
    sourceReferenceId: identity.sourceReferenceId,
    intentReferenceId: admission.intentReferenceId,
    encounterCycleId: admission.encounterCycleId,
    intentRevision: admission.intentRevision,
  });
  const requestDateSource =
    runtime.captureExplicitRealityRequestDateSource({
      sourceReferenceId: identity.sourceReferenceId,
      calendarInstant: new Date("2026-07-29T10:00:00.000Z"),
    });
  return runtime.activateRealityRouteActivationSourceContext({
    routeAuthorization,
    encounterAdmission: admission,
    realityEntryContext,
    lifeSourceSession,
    requestDateSource,
  });
};

const requestAndAdmit = (runtime) => {
  const requested = runtime.requestRealityEncounter({
    origin: "FIRST_ENCOUNTER",
    qualification: "WHISPER_SKIPPED",
    identityReferences: identity,
  });
  const admitted = runtime.establishRealityEncounterAdmission({
    intentReferenceId: requested.intent.intentReferenceId,
    identityReferences: identity,
  });
  return Object.freeze({ requested, admitted });
};

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-explicit-leave-"),
);
const entryPath = path.join(tempDir, "runtime-entry.ts");
const outPath = path.join(tempDir, "explicit-leave.mjs");

try {
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.transaction))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.controller))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.activation))};`,
    ].join("\n"),
    "utf8",
  );
  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(
    `file://${outPath}?t=${Date.now()}`
  );

  const first = requestAndAdmit(runtime);
  assertEqual(
    "first encounter admission is ready",
    first.admitted.status,
    "READY",
  );
  assertEqual(
    "current admission activates the exact source",
    activateAdmission(runtime, first.admitted.admission).status,
    "AVAILABLE",
  );
  const firstRequest =
    runtime.createRealityExplicitLeaveRequestFromIntent(
      runtime.readCurrentRealityEncounterIntent(),
    );
  const firstLeave =
    runtime.executeRealityExplicitLeaveTermination(firstRequest);
  assertEqual(
    "confirmed explicit leave terminates the current encounter",
    firstLeave.status,
    "TERMINATED_AND_LEFT",
  );
  assertEqual(
    "confirmed explicit leave clears Controller authority",
    runtime.readCurrentRealityEncounterIntent(),
    null,
  );
  assertEqual(
    "confirmed explicit leave clears exact Activation",
    runtime.readRealityRouteActivationSourceContext(),
    null,
  );
  assertEqual(
    "confirmed explicit leave clears Recovery",
    storageValues.has("xinmaiRealityEncounterIntentRecovery"),
    false,
  );
  assertEqual(
    "repeated old leave is idempotently inactive",
    runtime.executeRealityExplicitLeaveTermination(firstRequest)
      .status,
    "NO_ACTIVE_ENCOUNTER",
  );

  const second = requestAndAdmit(runtime);
  assertEqual(
    "new user request creates a different cycle",
    second.requested.intent.encounterCycleId ===
      first.requested.intent.encounterCycleId,
    false,
  );
  assertEqual(
    "old-cycle request cannot terminate the new cycle",
    runtime.executeRealityExplicitLeaveTermination(firstRequest)
      .status,
    "STALE_REQUEST_REJECTED",
  );
  assertEqual(
    "old-cycle rejection preserves the new current intent",
    runtime.readCurrentRealityEncounterIntent()
      .encounterCycleId,
    second.requested.intent.encounterCycleId,
  );

  assertEqual(
    "second cycle activates normally",
    activateAdmission(runtime, second.admitted.admission).status,
    "AVAILABLE",
  );
  const secondRequest =
    runtime.createRealityExplicitLeaveRequestFromIntent(
      runtime.readCurrentRealityEncounterIntent(),
    );
  removeUnavailable = true;
  const unavailableLeave =
    runtime.executeRealityExplicitLeaveTermination(secondRequest);
  assertEqual(
    "unconfirmed Recovery clear cannot declare termination",
    unavailableLeave.status,
    "TERMINATION_RETRYABLE",
  );
  assertEqual(
    "unconfirmed termination keeps the same current intent",
    runtime.readCurrentRealityEncounterIntent()
      .encounterCycleId,
    second.requested.intent.encounterCycleId,
  );
  assertEqual(
    "Activation is safely absent before termination retry",
    runtime.readRealityRouteActivationSourceContext(),
    null,
  );
  removeUnavailable = false;
  assertEqual(
    "same-cycle retry completes after Recovery returns",
    runtime.executeRealityExplicitLeaveTermination(secondRequest)
      .status,
    "TERMINATED_AND_LEFT",
  );

  const third = requestAndAdmit(runtime);
  const thirdRequest =
    runtime.createRealityExplicitLeaveRequestFromIntent(
      runtime.readCurrentRealityEncounterIntent(),
    );
  const foreignAdmission = Object.freeze({
    ...third.admitted.admission,
    intentReferenceId: "foreign-intent",
    encounterCycleId: "foreign-cycle",
    intentRevision: 91,
  });
  assertEqual(
    "foreign Activation can be represented for mismatch gate",
    activateAdmission(runtime, foreignAdmission).status,
    "AVAILABLE",
  );
  const mismatch =
    runtime.executeRealityExplicitLeaveTermination(thirdRequest);
  assertEqual(
    "foreign Activation blocks explicit leave",
    mismatch.status,
    "STALE_REQUEST_REJECTED",
  );
  assertEqual(
    "foreign Activation mismatch does not terminate current Intent",
    runtime.readCurrentRealityEncounterIntent()
      .encounterCycleId,
    third.requested.intent.encounterCycleId,
  );
  assertEqual(
    "foreign Activation mismatch is not blanket-cleared",
    runtime.readRealityRouteActivationSourceContext()
      .encounterCycleId,
    "foreign-cycle",
  );

  for (const marker of [
    "routeTransactionOnly: true",
    "currentIntentValidationRequired: true",
    "exactActivationClearRequired: true",
    "confirmedRecoveryClearRequired: true",
    "noPressureSeedWrite: true",
    "noGrowthConsumer: true",
    "noRendererConsumer: true",
  ]) {
    assertIncludes(
      "terminal transaction freezes its narrow boundary",
      source.transaction,
      marker,
    );
  }
  assertIncludes(
    "Controller consumes Recovery clear outcome",
    source.controller,
    'clearResult.status !== "CONFIRMED"',
  );
  assertIncludes(
    "Controller reports retryable Recovery failure",
    source.controller,
    '"TERMINATION_RETRYABLE"',
  );
  assertIncludes(
    "Activation clear distinguishes an absent source",
    source.activation,
    '"ALREADY_ABSENT"',
  );
  assertIncludes(
    "Activation clear distinguishes a mismatch",
    source.activation,
    '"ACTIVATION_ADMISSION_MISMATCH"',
  );
  assertIncludes(
    "App is the one Route Runtime transaction caller",
    source.app,
    "executeRealityExplicitLeaveTermination(request)",
  );
  assertEqual(
    "Runtime has one explicit leave transaction caller",
    [
      source.app,
      source.route,
      source.host,
      source.presentation,
    ].filter((text) =>
      text.includes("executeRealityExplicitLeaveTermination("),
    ).length,
    1,
  );
  assertIncludes(
    "Route exposes a real explicit leave interaction",
    source.route,
    'data-interaction="REALITY_EXPLICIT_LEAVE"',
  );
  assertIncludes(
    "Route passes typed leave request to Host",
    source.route,
    "onExplicitLeaveRequest={requestExplicitLeave}",
  );
  assertIncludes(
    "Host only passes the leave callback",
    source.host,
    "onExplicitLeaveRequest={onExplicitLeaveRequest}",
  );
  assertIncludes(
    "Presentation keeps Pressure pause separate",
    source.presentation,
    'data-interaction="PRESSURE_SEED_PAUSE"',
  );
  assertIncludes(
    "Presentation exposes explicit leave separately",
    source.presentation,
    'data-interaction="REALITY_EXPLICIT_LEAVE"',
  );
  for (const [name, text] of [
    ["Host", source.host],
    ["Presentation", source.presentation],
  ]) {
    assertExcludes(
      `${name} does not terminate Intent directly`,
      text,
      "terminateRealityEncounter",
    );
    assertExcludes(
      `${name} does not access Recovery directly`,
      text,
      "xinmaiRealityEncounterIntentRecoveryAdapter",
    );
    assertExcludes(
      `${name} does not navigate`,
      text,
      "useNavigate",
    );
  }
  for (const marker of [
    "explicitLeaveTransactionRequired: true",
    "routeOwnsExplicitLeaveTransaction: true",
    "noDirectIntentTerminationFromHost: true",
    "explicitLeaveCallbackOnly: true",
  ]) {
    assertIncludes(
      "Route and Host type boundary freezes leave ownership",
      source.routeType,
      marker,
    );
  }
  assertExcludes(
    "Explicit leave transaction writes no selected Pressure",
    source.transaction,
    "writeSelectedPressureSeedContext",
  );
  assertExcludes(
    "Explicit leave transaction invokes no Dynamics",
    source.transaction,
    "dynamics",
  );
  assertExcludes(
    "Explicit leave transaction consumes no Renderer",
    source.transaction,
    "../renderers/",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "explicit leave gate is registered",
    packageJson.scripts?.[
      "check-xinmai-reality-explicit-leave-termination"
    ] ?? "",
    "node scripts/check-xinmai-reality-explicit-leave-termination.mjs",
  );

  console.log(
    "\n[XINMAI REALITY EXPLICIT LEAVE TERMINATION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI REALITY EXPLICIT LEAVE TERMINATION] FAIL",
  );
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
