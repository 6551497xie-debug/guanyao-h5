import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityRouteActivationSourceContext.ts",
  service: "src/services/realityRouteActivationSourceContext.ts",
  genesisPage: "src/pages/GenesisProductionExperiencePage.tsx",
  realityRoute: "src/pages/RealityProductionRouteEntry.tsx",
  host: "src/components/RealityProductionHost.tsx",
  candidateActivation:
    "src/services/realityPressureCandidateActivationContext.ts",
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
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

try {
  [
    "RealityRouteActivationSourceContext",
    'activationBoundary: "EXPLICIT_ENTER_REALITY"',
    "lifeSourceSession: LaunchLifeSourceSession",
    "requestDateSource: RealityPressureExplicitRequestDateSource",
    "noCandidateActivation: true",
    "noConsumerInvocation: true",
    "noGravityIntegration: true",
  ].forEach((marker) =>
    assertIncludes("route activation source contract", source.type, marker),
  );

  [
    "captureExplicitRealityRequestDateSource",
    "activateRealityRouteActivationSourceContext",
    "readRealityRouteActivationSourceContext",
    "clearRealityRouteActivationSourceContext",
    "requestDateCapturedOnceOnly: true",
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("route activation source implementation", source.service, marker),
  );

  [
    "new Date(",
    "Date.now",
    "resolveLaunchOriginMother",
    "createLaunchLifeSourceSession",
    "createRealityPressureCandidateActivationContext",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityProductionPressureSeedConsumer",
    "initializeRealityProductionGravityConsumer",
    "localStorage",
    "sessionStorage",
    "useNavigate",
    "react",
  ].forEach((marker) =>
    assertExcludes(
      "context performs no clock capture, Engine, Candidate, Consumer, Gravity, UI, or storage work",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "explicit user event captures calendar instant",
    source.genesisPage,
    "calendarInstant: new Date()",
  );
  assertIncludes(
    "explicit user event activates route source",
    source.genesisPage,
    "activateRealityRouteActivationSourceContext({",
  );
  assertIncludes(
    "Reality route requires activation source",
    source.realityRoute,
    "readRealityRouteActivationSourceContext()",
  );
  assertExcludes(
    "Production Host remains outside new source context",
    source.host,
    "RealityRouteActivationSourceContext",
  );
  assertExcludes(
    "Candidate Activation remains unchanged",
    source.candidateActivation,
    "RealityRouteActivationSourceContext",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "route activation source gate is registered",
    packageJson.scripts?.[
      "check-reality-route-activation-source-context"
    ] ?? "",
    "node scripts/check-reality-route-activation-source-context.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-reality-route-activation-source-"),
  );
  const outPath = path.join(tempDir, "route-activation-source.mjs");
  await build({
    entryPoints: [path.join(rootDir, paths.service)],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:work-003w";
  const sessionBoundary = Object.freeze({
    immutableCarrier: true,
    existingEngineResultsOnly: true,
    noEngineInvocation: true,
  });
  const lifeSourceSession = Object.freeze({
    schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
    source: "launch_life_source_session",
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
    provenance: Object.freeze({
      sourceKind: "REAL_ENGINE_RESULT",
      sourceReferenceId,
      birthSource: "LAUNCH_USER_CONFIRMED",
    }),
    boundary: sessionBoundary,
  });
  const recognitionRealitySession = Object.freeze({
    sourceReferenceId,
    phase: "REALITY_ENTRY_ELIGIBLE",
    realityEntryConfirmed: true,
  });
  const realityEntryContext = Object.freeze({
    schemaVersion: "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT_V1",
    source: "genesis_production_reality_entry_context",
    sourceReferenceId,
    sourceProvenance: "REAL_USER_SESSION",
    eligibility: "ELIGIBLE",
    recognitionRealitySession,
  });

  const requestDateSource = runtime.captureExplicitRealityRequestDateSource({
    sourceReferenceId,
    calendarInstant: new Date(2026, 6, 19, 12, 0, 0),
  });
  assertEqual("explicit date source is created", requestDateSource !== null, true);
  assertEqual("explicit date uses local calendar date", requestDateSource.asOfDate, "2026-07-19");
  assertEqual("explicit date source is immutable", Object.isFrozen(requestDateSource), true);

  const ready = runtime.activateRealityRouteActivationSourceContext({
    realityEntryContext,
    lifeSourceSession,
    requestDateSource,
  });
  assertEqual("valid real sources activate context", ready.status, "AVAILABLE");
  assertEqual("source reference remains continuous", ready.context.sourceReferenceId, sourceReferenceId);
  assertEqual("activation boundary is explicit", ready.context.activationBoundary, "EXPLICIT_ENTER_REALITY");
  assertEqual("context is immutable", Object.isFrozen(ready.context), true);
  assertEqual("provenance is immutable", Object.isFrozen(ready.context.provenance), true);
  assertEqual("reader returns active context", runtime.readRealityRouteActivationSourceContext(), ready.context);

  const laterDateSource = runtime.captureExplicitRealityRequestDateSource({
    sourceReferenceId,
    calendarInstant: new Date(2026, 6, 20, 12, 0, 0),
  });
  const repeated = runtime.activateRealityRouteActivationSourceContext({
    realityEntryContext,
    lifeSourceSession,
    requestDateSource: laterDateSource,
  });
  assertEqual("same source captures request date once", repeated.context, ready.context);
  assertEqual("first explicit date remains frozen", repeated.context.requestDateSource.asOfDate, "2026-07-19");

  for (const forbiddenKey of [
    "pressureSeed",
    "candidateBundle",
    "selectedPressureSeedContext",
    "gravityReadiness",
    "consumerInput",
  ]) {
    assertEqual(`context excludes ${forbiddenKey}`, forbiddenKey in ready.context, false);
  }

  runtime.clearRealityRouteActivationSourceContext();
  assertEqual("clear removes in-memory context", runtime.readRealityRouteActivationSourceContext(), null);

  const invalidDate = runtime.activateRealityRouteActivationSourceContext({
    realityEntryContext,
    lifeSourceSession,
    requestDateSource: Object.freeze({
      ...requestDateSource,
      asOfDate: "2026-02-30",
    }),
  });
  assertEqual("invalid explicit date is blocked", invalidDate.status, "BLOCKED");
  assertEqual("invalid date reason is explicit", invalidDate.reason, "EXPLICIT_REQUEST_DATE_INVALID");

  const fixtureReference = "fixture:case-a";
  const fixtureDate = runtime.captureExplicitRealityRequestDateSource({
    sourceReferenceId: fixtureReference,
    calendarInstant: new Date(2026, 6, 19),
  });
  assertEqual("fixture cannot create date source", fixtureDate, null);

  const mismatchDate = runtime.captureExplicitRealityRequestDateSource({
    sourceReferenceId: "launch:other-user",
    calendarInstant: new Date(2026, 6, 19),
  });
  const mismatch = runtime.activateRealityRouteActivationSourceContext({
    realityEntryContext,
    lifeSourceSession,
    requestDateSource: mismatchDate,
  });
  assertEqual("source mismatch is blocked", mismatch.status, "BLOCKED");
  assertEqual("source mismatch reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY ROUTE ACTIVATION SOURCE CONTEXT] PASS");
} catch (error) {
  console.error("[REALITY ROUTE ACTIVATION SOURCE CONTEXT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
