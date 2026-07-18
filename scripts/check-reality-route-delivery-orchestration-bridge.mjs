import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityRouteDeliveryOrchestrationBridge.ts",
  service: "src/services/realityRouteDeliveryOrchestrationBridge.ts",
  sourceContext: "src/services/realityRouteActivationSourceContext.ts",
  activationBridge:
    "src/services/realityRoutePressureCandidateActivationBridge.ts",
  requestBridge: "src/services/realityRouteCandidateRequestContextBridge.ts",
  deliveryBridge:
    "src/services/realityPressureActivationDeliveryOrchestrationBridge.ts",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  host: "src/components/RealityProductionHost.tsx",
  consumer: "src/services/realityProductionPressureSeedConsumer.ts",
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
    "RealityRouteDeliveryOrchestrationBridgeBoundary",
    "RealityRouteDeliveryOrchestrationBridgeInput",
    "RealityRouteDeliveryOrchestrationBridgeResult",
    "routeCandidateRequestToExistingDeliveryBridgeOnly: true",
    "initializeOperationOnly: true",
    "consumerInputForwardingOnly: true",
    "noConsumerInvocation: true",
    "noCandidateSelection: true",
  ].forEach((marker) =>
    assertIncludes("route delivery bridge contract", source.type, marker),
  );

  [
    "bridgeRealityRouteDeliveryOrchestration",
    "initializeRealityPressureActivationDeliveryOrchestration({",
    "activationRequestContext: requestResult.candidateRequestContext",
    'operation: "INITIALIZE"',
    "consumerInput: deliveryResult.consumerInput",
    "consumerNotExecuted: true",
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("route delivery bridge implementation", source.service, marker),
  );

  [
    "new Date(",
    "Date.now",
    "resolveLaunchOriginMother",
    "createLaunchLifeSourceSession",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityProductionPressureSeedConsumer",
    "captureRealityPressureSeed",
    "initializeRealityProductionGravityConsumer",
    "localStorage",
    "sessionStorage",
    "useNavigate",
    "react",
  ].forEach((marker) =>
    assertExcludes(
      "route bridge performs no clock, Engine, direct Candidate Source, Consumer, Gravity, UI, or storage work",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "Reality route invokes delivery bridge",
    source.route,
    "bridgeRealityRouteDeliveryOrchestration({",
  );
  assertIncludes(
    "Reality route requires ready delivery",
    source.route,
    'deliveryResult?.status !== "READY"',
  );
  assertExcludes(
    "Production Host still does not receive route delivery",
    source.host,
    "RealityRouteDeliveryOrchestrationBridge",
  );
  assertExcludes(
    "Pressure Consumer remains unmodified",
    source.consumer,
    "RealityRouteDeliveryOrchestrationBridge",
  );
  assertExcludes(
    "Gravity remains unmodified",
    source.gravity,
    "RealityRouteDeliveryOrchestrationBridge",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "route delivery bridge gate is registered",
    packageJson.scripts?.[
      "check-reality-route-delivery-orchestration-bridge"
    ] ?? "",
    "node scripts/check-reality-route-delivery-orchestration-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-route-delivery-bridge-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "route-delivery-bridge.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.sourceContext))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.activationBridge))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.requestBridge))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
    ].join("\n"),
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
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:work-003z";
  const lifeSourceSession = Object.freeze({
    schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
    source: "launch_life_source_session",
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
    birthCoordinate: Object.freeze({ year: 1995, month: 6, day: 2 }),
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
  const realityEntryContext = Object.freeze({
    schemaVersion: "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT_V1",
    source: "genesis_production_reality_entry_context",
    sourceReferenceId,
    sourceProvenance: "REAL_USER_SESSION",
    eligibility: "ELIGIBLE",
    recognitionRealitySession: Object.freeze({
      sourceReferenceId,
      phase: "REALITY_ENTRY_ELIGIBLE",
      realityEntryConfirmed: true,
    }),
  });
  const requestDateSource = runtime.captureExplicitRealityRequestDateSource({
    sourceReferenceId,
    calendarInstant: new Date(2026, 6, 19, 12, 0, 0),
  });
  const routeSourceResult = runtime.activateRealityRouteActivationSourceContext({
    realityEntryContext,
    lifeSourceSession,
    requestDateSource,
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
  const activationResult =
    runtime.bridgeRealityRouteToPressureCandidateActivation({
      routeAuthorization,
      routeActivationSourceContext: routeSourceResult.context,
    });
  const candidateRequestResult =
    runtime.bridgeRealityRouteCandidateRequestContext({
      routeCandidateActivationResult: activationResult,
    });
  assertEqual("route candidate request prerequisite is ready", candidateRequestResult.status, "READY");

  const ready = runtime.bridgeRealityRouteDeliveryOrchestration({
    routeAuthorization,
    routeCandidateRequestResult: candidateRequestResult,
  });
  assertEqual("real route request initializes delivery", ready.status, "READY");
  assertEqual("operation remains initialize", ready.operation, "INITIALIZE");
  assertEqual("source reference remains continuous", ready.sourceReferenceId, sourceReferenceId);
  assertEqual("delivery session is created", ready.deliverySession.deliverySequence, 1);
  assertEqual("delivery contains three candidate references", ready.deliverySession.deliveredCandidateReferenceIds.length, 3);
  assertEqual("consumer input is initialization input", "routeAuthorization" in ready.consumerInput, true);
  assertEqual("bridge output is immutable", Object.isFrozen(ready), true);
  assertEqual("bridge provenance is immutable", Object.isFrozen(ready.provenance), true);
  assertEqual("bridge never selects Candidate", "selectedCandidateReferenceId" in ready, false);
  assertEqual("consumer remains unexecuted", ready.provenance.consumerNotExecuted, true);

  const unauthorized = runtime.bridgeRealityRouteDeliveryOrchestration({
    routeAuthorization: Object.freeze({
      status: "SOURCE_NOT_READY",
      sourceReferenceId,
    }),
    routeCandidateRequestResult: candidateRequestResult,
  });
  assertEqual("unauthorized route cannot initialize delivery", unauthorized.status, "SOURCE_NOT_READY");
  assertEqual("authorization failure is explicit", unauthorized.reason, "REALITY_ROUTE_AUTHORIZATION_REQUIRED");

  const mismatch = runtime.bridgeRealityRouteDeliveryOrchestration({
    routeAuthorization: Object.freeze({
      ...routeAuthorization,
      sourceReferenceId: "launch:other-user",
      sourceContext: Object.freeze({
        ...routeAuthorization.sourceContext,
        sourceReferenceId: "launch:other-user",
      }),
    }),
    routeCandidateRequestResult: candidateRequestResult,
  });
  assertEqual("source mismatch is blocked", mismatch.status, "BLOCKED");
  assertEqual("source mismatch reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY ROUTE DELIVERY ORCHESTRATION BRIDGE] PASS");
} catch (error) {
  console.error("[REALITY ROUTE DELIVERY ORCHESTRATION BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
