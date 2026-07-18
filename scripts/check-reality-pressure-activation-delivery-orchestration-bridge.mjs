import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureActivationDeliveryOrchestrationBridge.ts",
  service: "src/services/realityPressureActivationDeliveryOrchestrationBridge.ts",
  activation: "src/services/realityPressureCandidateActivationContext.ts",
  requestBridge: "src/services/realityPressureActivationCandidateRequestBridge.ts",
  orchestration: "src/services/realityPressureCandidateDeliveryOrchestration.ts",
  consumer: "src/services/realityProductionPressureSeedConsumer.ts",
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
    "initializeRealityPressureActivationDeliveryOrchestration",
    "advanceRealityPressureActivationDeliveryOrchestration",
    "initializeRealityPressureCandidateDeliveryOrchestration",
    "advanceRealityPressureCandidateDeliveryOrchestration",
    "activationContextReferenceId",
    "consumerInput",
    "noCandidateSourceDirectInvocation: true",
    "noAutomaticSelection: true",
    "noPressureConsumerExecution: true",
  ].forEach((marker) => assertIncludes("activation delivery bridge continuity", source.service, marker));
  [
    "resolveRealityPressureSeedCandidateSource",
    "getPressureSeedSceneCandidateAtMatrixSlot",
    "captureRealityPressureSeed",
    "initializeRealityProductionPressureSeedConsumer",
    "advanceRealityProductionPressureSeedConsumer",
    "initializeRealityProductionGravityConsumer",
    "SelectedPressureSeedContext",
    "Math.random",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("bridge performs no direct source, recognition, consumer, Gravity, UI, or storage execution", source.service, marker),
  );
  assertExcludes("Pressure Consumer remains unchanged", source.consumer, "ActivationDeliveryOrchestration");
  assertIncludes("Atomic V2 Host uses the existing delivery orchestration bridge", source.host, "ActivationDeliveryOrchestration");
  assertExcludes("Gravity remains unchanged", source.gravity, "ActivationDeliveryOrchestration");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "activation delivery bridge gate is registered",
    packageJson.scripts?.["check-reality-pressure-activation-delivery-orchestration-bridge"] ?? "",
    "node scripts/check-reality-pressure-activation-delivery-orchestration-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-activation-delivery-bridge-"));
  const entryPath = path.join(tempDir, "entry.ts");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.activation))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.requestBridge))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.consumer))};`,
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
  const sourceReferenceId = "launch:real-user:work-003u";
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
  const initialRequest = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: activation.context,
    deliverySession: null,
  });
  assertEqual("initial Activation Request is ready", initialRequest.status, "READY");

  const initialized = runtime.initializeRealityPressureActivationDeliveryOrchestration({
    routeAuthorization,
    activationRequestContext: initialRequest.context,
  });
  assertEqual("Activation Request initializes delivery orchestration", initialized.status, "READY");
  assertEqual("activation reference remains traceable", initialized.activationContextReferenceId, activation.context.contextReferenceId);
  assertEqual("bridge creates first Delivery Session", initialized.deliverySession.deliverySequence, 1);
  assertEqual("bridge output is immutable", Object.isFrozen(initialized), true);
  assertEqual("bridge provenance is immutable", Object.isFrozen(initialized.provenance), true);
  assertEqual("bridge never selects a Candidate", initialized.provenance.noCandidateSelection, true);

  const pressureInitialized = runtime.initializeRealityProductionPressureSeedConsumer(initialized.consumerInput);
  assertEqual("forwarded initialize input is accepted", pressureInitialized.status, "READY");

  const nextRequest = runtime.bridgeRealityPressureActivationCandidateRequestContext({
    activationContext: activation.context,
    deliverySession: initialized.deliverySession,
  });
  const advanced = runtime.advanceRealityPressureActivationDeliveryOrchestration({
    deliverySession: initialized.deliverySession,
    pressureSeedSession: pressureInitialized.session,
    activationRequestContext: nextRequest.context,
  });
  assertEqual("next Activation Request advances delivery", advanced.status, "READY");
  assertEqual("Delivery Session advances to two", advanced.deliverySession.deliverySequence, 2);
  assertEqual("only next-bundle command is forwarded", advanced.consumerInput.command.event, "PRESSURE_SEED_REQUEST_NEXT_BUNDLE");
  assertEqual("no recognition Candidate is forwarded", advanced.consumerInput.command.recognizedCandidateReferenceId, null);
  const pressureAdvanced = runtime.advanceRealityProductionPressureSeedConsumer(advanced.consumerInput);
  assertEqual("forwarded advance input is accepted", pressureAdvanced.status, "READY");

  const wrongRoute = Object.freeze({ ...routeAuthorization, sourceReferenceId: "launch:other-user" });
  const mismatch = runtime.initializeRealityPressureActivationDeliveryOrchestration({
    routeAuthorization: wrongRoute,
    activationRequestContext: initialRequest.context,
  });
  assertEqual("route source mismatch is blocked", mismatch.status, "BLOCKED");
  assertEqual("route mismatch reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY PRESSURE ACTIVATION DELIVERY ORCHESTRATION BRIDGE] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE ACTIVATION DELIVERY ORCHESTRATION BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
