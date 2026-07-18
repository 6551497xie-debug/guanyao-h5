import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityRouteCandidateRequestContextBridge.ts",
  service: "src/services/realityRouteCandidateRequestContextBridge.ts",
  sourceContext: "src/services/realityRouteActivationSourceContext.ts",
  activationBridge:
    "src/services/realityRoutePressureCandidateActivationBridge.ts",
  existingRequestBridge:
    "src/services/realityPressureActivationCandidateRequestBridge.ts",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  host: "src/components/RealityProductionHost.tsx",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
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
    "RealityRouteCandidateRequestContextBridgeBoundary",
    "RealityRouteCandidateRequestContextBridgeInput",
    "RealityRouteCandidateRequestContextBridgeResult",
    "routeCandidateActivationToExistingRequestBridgeOnly: true",
    "initialDeliverySessionMustBeNull: true",
    "noCandidateSourceInvocation: true",
    "noCandidateSelection: true",
  ].forEach((marker) =>
    assertIncludes("route candidate request contract", source.type, marker),
  );

  [
    "bridgeRealityRouteCandidateRequestContext",
    "bridgeRealityPressureActivationCandidateRequestContext({",
    "activationContext: activationResult.candidateActivationContext",
    "deliverySession: null",
    'deliveryStateSource: "INITIAL_ACTIVATION"',
    "noCandidateSelection: true",
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("route candidate request implementation", source.service, marker),
  );

  [
    "new Date(",
    "Date.now",
    "resolveLaunchOriginMother",
    "createLaunchLifeSourceSession",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityPressureCandidateDeliveryOrchestration",
    "initializeRealityProductionPressureSeedConsumer",
    "captureRealityPressureSeed",
    "initializeRealityProductionGravityConsumer",
    "localStorage",
    "sessionStorage",
    "useNavigate",
    "react",
  ].forEach((marker) =>
    assertExcludes(
      "bridge performs no clock, Engine, Candidate Source, delivery, Consumer, Gravity, UI, or storage work",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "Reality route invokes candidate request bridge",
    source.route,
    "bridgeRealityRouteCandidateRequestContext({",
  );
  assertIncludes(
    "Reality route requires ready candidate request",
    source.route,
    'candidateRequestResult?.status !== "READY"',
  );
  assertExcludes(
    "Production Host remains unchanged",
    source.host,
    "RealityRouteCandidateRequestContextBridge",
  );
  assertExcludes(
    "Candidate Source remains outside route bridge",
    source.candidateSource,
    "RealityRouteCandidateRequestContextBridge",
  );
  assertExcludes(
    "Pressure Consumer remains outside route bridge",
    source.consumer,
    "RealityRouteCandidateRequestContextBridge",
  );
  assertExcludes(
    "Gravity remains outside route bridge",
    source.gravity,
    "RealityRouteCandidateRequestContextBridge",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "route candidate request gate is registered",
    packageJson.scripts?.[
      "check-reality-route-candidate-request-context-bridge"
    ] ?? "",
    "node scripts/check-reality-route-candidate-request-context-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-route-candidate-request-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "route-candidate-request.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.sourceContext))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.activationBridge))};`,
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
  const sourceReferenceId = "launch:real-user:work-003y";
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
  assertEqual("route candidate activation prerequisite is ready", activationResult.status, "READY");

  const ready = runtime.bridgeRealityRouteCandidateRequestContext({
    routeCandidateActivationResult: activationResult,
  });
  assertEqual("route activation creates initial request", ready.status, "READY");
  assertEqual("source reference remains continuous", ready.sourceReferenceId, sourceReferenceId);
  assertEqual("route activation reference remains traceable", ready.routeActivationContextReferenceId, routeSourceResult.context.contextReferenceId);
  assertEqual("candidate activation reference remains traceable", ready.candidateActivationContextReferenceId, activationResult.candidateActivationContext.contextReferenceId);
  assertEqual("request is initial activation only", ready.candidateRequestContext.deliveryStateSource, "INITIAL_ACTIVATION");
  assertEqual("initial request has empty cursor", ready.candidateRequestContext.candidateRequestContext.candidateRequest.candidateCursor, null);
  assertEqual("initial request has empty exclusions", ready.candidateRequestContext.candidateRequestContext.candidateRequest.excludedCandidateReferenceIds.length, 0);
  assertEqual("age derives from real Life Session", ready.candidateRequestContext.candidateRequestContext.ageAtRequest, 31);
  assertEqual("bridge output is immutable", Object.isFrozen(ready), true);
  assertEqual("bridge provenance is immutable", Object.isFrozen(ready.provenance), true);

  for (const forbiddenKey of [
    "candidateBundle",
    "pressureSeed",
    "selectedPressureSeedContext",
    "consumerInput",
    "deliverySession",
    "gravityReadiness",
  ]) {
    assertEqual(`bridge excludes ${forbiddenKey}`, forbiddenKey in ready, false);
  }

  const notReady = runtime.bridgeRealityRouteCandidateRequestContext({
    routeCandidateActivationResult: Object.freeze({
      status: "SOURCE_NOT_READY",
      sourceReferenceId,
      routeActivationContextReferenceId: null,
    }),
  });
  assertEqual("missing activation is source not ready", notReady.status, "SOURCE_NOT_READY");
  assertEqual("missing activation reason is explicit", notReady.reason, "ROUTE_CANDIDATE_ACTIVATION_NOT_READY");

  console.log("\n[REALITY ROUTE CANDIDATE REQUEST CONTEXT BRIDGE] PASS");
} catch (error) {
  console.error("[REALITY ROUTE CANDIDATE REQUEST CONTEXT BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
