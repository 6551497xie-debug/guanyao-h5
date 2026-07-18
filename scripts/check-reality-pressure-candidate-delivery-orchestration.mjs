import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureCandidateDeliveryOrchestration.ts",
  service: "src/services/realityPressureCandidateDeliveryOrchestration.ts",
  source: "src/services/realityPressureSeedCandidateSource.ts",
  delivery: "src/services/realityPressureCandidateDeliverySession.ts",
  consumer: "src/services/realityProductionPressureSeedConsumer.ts",
  capture: "src/services/realityPressureSeedCaptureAdapter.ts",
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
    "RealityPressureCandidateDeliveryOrchestrationInitializeInput",
    "RealityPressureCandidateDeliveryOrchestrationAdvanceInput",
    "RealityPressureCandidateDeliveryOrchestrationResult",
    "RealityProductionPressureSeedConsumerInitializeInput",
    "RealityProductionPressureSeedConsumerAdvanceInput",
  ].forEach((marker) => assertIncludes("orchestration type contract", source.type, marker));
  [
    "initializeRealityPressureCandidateDeliveryOrchestration",
    "advanceRealityPressureCandidateDeliveryOrchestration",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityPressureCandidateDeliverySession",
    "advanceRealityPressureCandidateDeliverySession",
    "consumerInputAssemblyOnly: true",
    "noPressureConsumerExecution: true",
    "noCaptureExecution: true",
    "noAutomaticSelection: true",
  ].forEach((marker) => assertIncludes("orchestration continuity", source.service, marker));
  [
    "captureRealityPressureSeed",
    "initializeRealityProductionPressureSeedConsumer",
    "advanceRealityProductionPressureSeedConsumer",
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "buildSelectedPressureSeedContext",
    "Math.random",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("orchestrator performs no consumer, capture, engine, UI, or storage execution", source.service, marker),
  );
  assertExcludes("Capture Adapter remains unchanged", source.capture, "DeliveryOrchestration");
  assertExcludes("Pressure Consumer remains unchanged", source.consumer, "DeliveryOrchestration");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "orchestration gate is registered",
    packageJson.scripts?.["check-reality-pressure-candidate-delivery-orchestration"] ?? "",
    "node scripts/check-reality-pressure-candidate-delivery-orchestration.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-delivery-orchestration-"));
  const entryPath = path.join(tempDir, "entry.ts");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.consumer))};`,
    ].join("\n"),
  );
  const outPath = path.join(tempDir, "orchestration.mjs");
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
  const sourceReferenceId = "launch:real-user:work-003p";
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
  const makeRequestContext = (candidateCursor, excludedCandidateReferenceIds) => {
    const frozenExcluded = Object.freeze([...excludedCandidateReferenceIds]);
    const candidateRequest = Object.freeze({
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceReferenceId,
      candidateCursor,
      excludedCandidateReferenceIds: frozenExcluded,
      ageSegment: "ESTABLISHING",
      ageSegmentRole: "CATALOG_ROUTING_ONLY",
    });
    return Object.freeze({
      schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_V1",
      source: "reality_pressure_candidate_request_context_bridge",
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId,
      asOfDate: "2026-07-19",
      ageAtRequest: 30,
      ageSegment: "ESTABLISHING",
      ageSegmentRole: "CATALOG_ROUTING_ONLY",
      candidateRequest,
      provenance: Object.freeze({
        lifeSource: "LAUNCH_LIFE_SOURCE_SESSION",
        birthSource: "LAUNCH_USER_CONFIRMED",
        ageResolution: "CONFIRMED_BIRTH_COORDINATE_AGE_ROUTING",
        noPressureInference: true,
      }),
      boundary: Object.freeze({}),
    });
  };

  const initialized = runtime.initializeRealityPressureCandidateDeliveryOrchestration({
    routeAuthorization,
    candidateRequestContext: makeRequestContext(null, []),
  });
  assertEqual("real request initializes orchestration", initialized.status, "READY");
  assertEqual("orchestration creates first delivery state", initialized.deliverySession.deliverySequence, 1);
  assertEqual("orchestration emits immutable consumer input", Object.isFrozen(initialized.consumerInput), true);
  const consumerInitialized = runtime.initializeRealityProductionPressureSeedConsumer(initialized.consumerInput);
  assertEqual("assembled initialize input is accepted by consumer", consumerInitialized.status, "READY");

  const nextRequestContext = makeRequestContext(
    initialized.deliverySession.nextCandidateCursor,
    initialized.deliverySession.deliveredCandidateReferenceIds,
  );
  const advanced = runtime.advanceRealityPressureCandidateDeliveryOrchestration({
    deliverySession: initialized.deliverySession,
    pressureSeedSession: consumerInitialized.session,
    candidateRequestContext: nextRequestContext,
  });
  assertEqual("next request advances orchestration", advanced.status, "READY");
  assertEqual("delivery sequence advances to two", advanced.deliverySession.deliverySequence, 2);
  assertEqual("orchestrator only creates next-bundle command", advanced.consumerInput.command.event, "PRESSURE_SEED_REQUEST_NEXT_BUNDLE");
  assertEqual("orchestrator never recognizes a candidate", advanced.consumerInput.command.recognizedCandidateReferenceId, null);
  const consumerAdvanced = runtime.advanceRealityProductionPressureSeedConsumer(advanced.consumerInput);
  assertEqual("assembled advance input is accepted by consumer", consumerAdvanced.status, "READY");
  assertEqual("consumer receives second bundle", consumerAdvanced.session.candidateBundleReferenceId, advanced.candidateSourceContext.bundleReferenceId);

  const staleRequest = makeRequestContext(null, []);
  const stale = runtime.advanceRealityPressureCandidateDeliveryOrchestration({
    deliverySession: advanced.deliverySession,
    pressureSeedSession: consumerAdvanced.session,
    candidateRequestContext: staleRequest,
  });
  assertEqual("stale cursor is blocked before source resolution", stale.status, "BLOCKED");
  assertEqual("stale cursor reason is explicit", stale.reason, "CANDIDATE_CURSOR_MISMATCH");

  console.log("\n[REALITY PRESSURE CANDIDATE DELIVERY ORCHESTRATION] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CANDIDATE DELIVERY ORCHESTRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
