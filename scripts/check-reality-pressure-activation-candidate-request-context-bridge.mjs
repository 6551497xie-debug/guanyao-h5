import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureActivationCandidateRequestBridge.ts",
  service: "src/services/realityPressureActivationCandidateRequestBridge.ts",
  activation: "src/services/realityPressureCandidateActivationContext.ts",
  source: "src/services/realityPressureSeedCandidateSource.ts",
  delivery: "src/services/realityPressureCandidateDeliverySession.ts",
  host: "src/components/RealityProductionHost.tsx",
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
    "bridgeRealityPressureActivationCandidateRequestContext",
    "bridgeRealityPressureCandidateRequestContext",
    "activationContext.contextReferenceId",
    "deliverySession?.nextCandidateCursor",
    "deliverySession?.deliveredCandidateReferenceIds",
    "noPressureInference: true",
    "noCandidateSelection: true",
    "noCandidateSourceInvocation: true",
    "noAutomaticSelection: true",
  ].forEach((marker) => assertIncludes("activation request bridge continuity", source.service, marker));
  [
    "resolveRealityPressureSeedCandidateSource",
    "getPressureSeedSceneCandidateAtMatrixSlot",
    "captureRealityPressureSeed",
    "SelectedPressureSeedContext",
    "initializeRealityProductionPressureSeedConsumer",
    "initializeRealityProductionGravityConsumer",
    "new Date",
    "Date.now",
    "Math.random",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("bridge performs no Candidate Source, recognition, Gravity, UI, clock, or storage work", source.service, marker),
  );
  assertExcludes("existing Candidate Source is not duplicated", source.source, "ActivationCandidateRequestBridge");
  assertExcludes("Production Host remains unchanged", source.host, "ActivationCandidateRequestBridge");
  assertExcludes("Gravity remains unchanged", source.gravity, "ActivationCandidateRequestBridge");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "activation request bridge gate is registered",
    packageJson.scripts?.["check-reality-pressure-activation-candidate-request-context-bridge"] ?? "",
    "node scripts/check-reality-pressure-activation-candidate-request-context-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-activation-request-bridge-"));
  const entryPath = path.join(tempDir, "entry.ts");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.activation))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.source))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.delivery))};`,
    ].join("\n"),
  );
  const outPath = path.join(tempDir, "bridge.mjs");
  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:work-003t";
  const lifeSourceSession = Object.freeze({
    schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
    source: "launch_life_source_session",
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
    birthCoordinate: Object.freeze({ year: 1996, month: 7, day: 20 }),
    provenance: Object.freeze({
      sourceKind: "REAL_ENGINE_RESULT",
      sourceReferenceId,
      birthSource: "LAUNCH_USER_CONFIRMED",
    }),
    boundary: Object.freeze({
      immutableCarrier: true,
      existingEngineResultsOnly: true,
      noEngineInvocation: true,
      noStorageWrite: true,
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
  const activation = runtime.createRealityPressureCandidateActivationContext({
    routeAuthorization,
    lifeSourceSession,
    requestDateSource,
  });
  assertEqual("activation prerequisite is ready", activation.status, "READY");

  const initial = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: activation.context,
    deliverySession: null,
  });
  assertEqual("activation creates initial Candidate Request", initial.status, "READY");
  assertEqual("initial request uses empty cursor", initial.context.candidateRequestContext.candidateRequest.candidateCursor, null);
  assertEqual("initial request has empty history", initial.context.candidateRequestContext.candidateRequest.excludedCandidateReferenceIds.length, 0);
  assertEqual("age routes from real Life Session", initial.context.candidateRequestContext.ageSegment, "ESTABLISHING");
  assertEqual("activation reference is traceable", initial.context.activationContextReferenceId, activation.context.contextReferenceId);
  assertEqual("bridge context is immutable", Object.isFrozen(initial.context), true);
  assertEqual("bridge provenance is immutable", Object.isFrozen(initial.context.provenance), true);

  const candidateSource = runtime.resolveRealityPressureSeedCandidateSource(
    initial.context.candidateRequestContext.candidateRequest,
  );
  assertEqual("existing Candidate Source accepts bridged request", candidateSource.status, "READY");
  const delivery = runtime.initializeRealityPressureCandidateDeliverySession({
    candidateSourceResult: candidateSource,
  });
  assertEqual("existing Delivery Session accepts source", delivery.status, "READY");

  const next = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: activation.context,
    deliverySession: delivery.session,
  });
  assertEqual("delivery state creates next Candidate Request", next.status, "READY");
  assertEqual("next cursor comes from Delivery Session", next.context.candidateRequestContext.candidateRequest.candidateCursor, delivery.session.nextCandidateCursor);
  assertEqual("next history comes from Delivery Session", next.context.candidateRequestContext.candidateRequest.excludedCandidateReferenceIds.join(","), delivery.session.deliveredCandidateReferenceIds.join(","));
  assertEqual("bridge never selects a Candidate", next.context.provenance.noCandidateSelection, true);

  const noActivation = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: null,
    deliverySession: null,
  });
  assertEqual("missing activation cannot create request", noActivation.status, "SOURCE_NOT_READY");

  const fixtureActivation = Object.freeze({
    ...activation.context,
    sourceReferenceId: "fixture:case-a",
  });
  const fixture = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: fixtureActivation,
    deliverySession: null,
  });
  assertEqual("fixture activation cannot enter", fixture.status, "SOURCE_NOT_READY");

  const mismatchedDelivery = Object.freeze({
    ...delivery.session,
    sourceReferenceId: "launch:other-user",
  });
  const mismatch = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: activation.context,
    deliverySession: mismatchedDelivery,
  });
  assertEqual("mismatched delivery is blocked", mismatch.status, "BLOCKED");
  assertEqual("delivery mismatch is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY PRESSURE ACTIVATION CANDIDATE REQUEST CONTEXT BRIDGE] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE ACTIVATION CANDIDATE REQUEST CONTEXT BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
