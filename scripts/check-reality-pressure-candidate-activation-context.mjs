import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureCandidateActivationContext.ts",
  service: "src/services/realityPressureCandidateActivationContext.ts",
  matrix: "src/data/guanyaoPressureSeedMatrix.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
  host: "src/components/RealityProductionHost.tsx",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  gravity: "src/services/realityProductionGravityConsumer.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
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
    "createRealityPressureCandidateActivationContext",
    'sourceMode: "REAL_USER_EXPERIENCE"',
    'activationBoundary: "REALITY_ROUTE_ACTIVATION"',
    "contextReferenceId:",
    "candidateCursor: null",
    "excludedCandidateIds",
    "noPressureInference: true",
    "noCandidateSelection: true",
    "Object.freeze",
  ].forEach((marker) => assertIncludes("activation context implementation", source.service, marker));

  [
    "new Date",
    "Date.now",
    "resolveRealityPressureSeedCandidateSource",
    "getPressureSeedSceneCandidateAtMatrixSlot",
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "SelectedPressureSeedContext",
    "initializeRealityProductionPressureSeedConsumer",
    "initializeRealityProductionGravityConsumer",
    "resolveGravity",
    "pressureConfidence",
    "pressureIntensity",
    "Math.random",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("activation creates no date, Seed, selection, Gravity, UI, or storage side effect", source.service, marker),
  );
  assertExcludes("Matrix remains unchanged", source.matrix, "CandidateActivationContext");
  assertExcludes("Candidate Source remains unchanged", source.candidateSource, "CandidateActivationContext");
  assertExcludes("Reality Host remains unchanged", source.host, "CandidateActivationContext");
  assertExcludes(
    "Reality Route cannot create Candidate Activation directly",
    source.route,
    "createRealityPressureCandidateActivationContext",
  );
  assertIncludes(
    "Reality Route uses the dedicated activation bridge",
    source.route,
    "bridgeRealityRouteToPressureCandidateActivation",
  );
  assertExcludes("Gravity remains unchanged", source.gravity, "CandidateActivationContext");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "activation context gate is registered",
    packageJson.scripts?.["check-reality-pressure-candidate-activation-context"] ?? "",
    "node scripts/check-reality-pressure-candidate-activation-context.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-activation-context-"));
  const outPath = path.join(tempDir, "activation-context.mjs");
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
  const create = runtime.createRealityPressureCandidateActivationContext;
  const sourceReferenceId = "launch:real-user:work-003s";
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
    boundary: Object.freeze({
      immutableCarrier: true,
      existingEngineResultsOnly: true,
      noEngineInvocation: true,
    }),
  });
  const routeAuthorization = Object.freeze({
    status: "READY",
    authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE",
    routeTarget: "/reality",
    sourceReferenceId,
    sourceContext: Object.freeze({
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId,
      realityEntryEligibility: "ELIGIBLE",
    }),
  });
  const requestDateSource = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_REQUEST_DATE_SOURCE_V1",
    source: "reality_pressure_explicit_request_date_source",
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceProvenance: "EXPLICIT_CALLER_PROVIDED",
    sourceReferenceId,
    asOfDate: "2026-07-19",
    captureBoundary: "REALITY_ROUTE_ACTIVATION",
  });

  const ready = create({ routeAuthorization, lifeSourceSession, requestDateSource });
  assertEqual("valid real sources create context", ready.status, "READY");
  assertEqual("source reference remains continuous", ready.context.sourceReferenceId, sourceReferenceId);
  assertEqual("context reference is deterministic", ready.context.contextReferenceId, `reality-pressure-candidate-activation:${sourceReferenceId}:2026-07-19`);
  assertEqual("source mode is real user", ready.context.sourceMode, "REAL_USER_EXPERIENCE");
  assertEqual("activation boundary is explicit", ready.context.activationBoundary, "REALITY_ROUTE_ACTIVATION");
  assertEqual("candidate cursor starts empty", ready.context.candidateCursor, null);
  assertEqual("candidate exclusions start empty", ready.context.excludedCandidateIds.length, 0);
  assertEqual("context is immutable", Object.isFrozen(ready.context), true);
  assertEqual("date source is immutable", Object.isFrozen(ready.context.requestDateSource), true);
  assertEqual("provenance is immutable", Object.isFrozen(ready.context.provenance), true);
  assertEqual("empty Candidate history is immutable", Object.isFrozen(ready.context.excludedCandidateIds), true);

  for (const forbiddenKey of [
    "pressureSeed",
    "selectedPressureSeedContext",
    "gravityReadiness",
    "pressureResult",
    "matchingScore",
    "confidence",
    "defaultPressureField",
  ]) {
    assertEqual(`context excludes ${forbiddenKey}`, forbiddenKey in ready.context, false);
  }

  const noSource = create({ routeAuthorization, lifeSourceSession: undefined, requestDateSource });
  assertEqual("missing Life Source cannot create context", noSource.status, "SOURCE_NOT_READY");
  assertEqual("missing Life Source reason is explicit", noSource.reason, "REAL_LIFE_SOURCE_SESSION_REQUIRED");

  const noDate = create({ routeAuthorization, lifeSourceSession, requestDateSource: undefined });
  assertEqual("missing date cannot create context", noDate.status, "SOURCE_NOT_READY");
  assertEqual("date requirement is explicit", noDate.reason, "EXPLICIT_REQUEST_DATE_REQUIRED");

  const invalidDate = create({
    routeAuthorization,
    lifeSourceSession,
    requestDateSource: Object.freeze({ ...requestDateSource, asOfDate: "2026-02-30" }),
  });
  assertEqual("invalid explicit date is blocked", invalidDate.status, "BLOCKED");
  assertEqual("invalid date reason is explicit", invalidDate.reason, "REQUEST_DATE_INVALID");

  const fixtureReference = "fixture:case-a";
  const fixture = create({
    routeAuthorization: Object.freeze({
      ...routeAuthorization,
      sourceReferenceId: fixtureReference,
      sourceContext: Object.freeze({ ...routeAuthorization.sourceContext, sourceReferenceId: fixtureReference }),
    }),
    lifeSourceSession: Object.freeze({
      ...lifeSourceSession,
      sourceReferenceId: fixtureReference,
      provenance: Object.freeze({ ...lifeSourceSession.provenance, sourceReferenceId: fixtureReference }),
    }),
    requestDateSource: Object.freeze({ ...requestDateSource, sourceReferenceId: fixtureReference }),
  });
  assertEqual("fixture cannot enter activation context", fixture.status, "BLOCKED");
  assertEqual("fixture block reason is explicit", fixture.reason, "FORBIDDEN_SOURCE_REFERENCE");

  const mismatch = create({
    routeAuthorization,
    lifeSourceSession,
    requestDateSource: Object.freeze({ ...requestDateSource, sourceReferenceId: "launch:other-user" }),
  });
  assertEqual("source mismatch is blocked", mismatch.status, "BLOCKED");
  assertEqual("source mismatch reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY PRESSURE CANDIDATE ACTIVATION CONTEXT] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CANDIDATE ACTIVATION CONTEXT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
