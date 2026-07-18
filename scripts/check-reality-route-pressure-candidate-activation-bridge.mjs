import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityRoutePressureCandidateActivationBridge.ts",
  service: "src/services/realityRoutePressureCandidateActivationBridge.ts",
  sourceContext: "src/services/realityRouteActivationSourceContext.ts",
  candidateActivation:
    "src/services/realityPressureCandidateActivationContext.ts",
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
    "RealityRoutePressureCandidateActivationBridgeBoundary",
    "RealityRoutePressureCandidateActivationBridgeInput",
    "RealityRoutePressureCandidateActivationBridgeResult",
    "routeSourceToExistingCandidateActivationOnly: true",
    "noCandidateSelection: true",
    "noConsumerInvocation: true",
    "noGravityIntegration: true",
  ].forEach((marker) =>
    assertIncludes("route candidate activation bridge contract", source.type, marker),
  );

  [
    "bridgeRealityRouteToPressureCandidateActivation",
    "createRealityPressureCandidateActivationContext({",
    "routeActivationSourceContext",
    "candidateActivationContext: activationResult.context",
    "noCandidateSelection: true",
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("route candidate activation bridge implementation", source.service, marker),
  );

  [
    "new Date(",
    "Date.now",
    "resolveLaunchOriginMother",
    "createLaunchLifeSourceSession",
    "bridgeRealityPressureActivationCandidateRequestContext",
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
      "bridge performs no clock, Engine, request, Candidate Source, delivery, Consumer, Gravity, UI, or storage work",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "Reality route invokes candidate activation bridge",
    source.route,
    "bridgeRealityRouteToPressureCandidateActivation({",
  );
  assertIncludes(
    "Reality route requires ready candidate activation",
    source.route,
    'candidateActivationResult?.status !== "READY"',
  );
  assertExcludes(
    "Production Host remains unchanged",
    source.host,
    "RealityRoutePressureCandidateActivationBridge",
  );
  assertExcludes(
    "Pressure Consumer remains outside bridge",
    source.consumer,
    "RealityRoutePressureCandidateActivationBridge",
  );
  assertExcludes(
    "Gravity remains outside bridge",
    source.gravity,
    "RealityRoutePressureCandidateActivationBridge",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "route candidate activation bridge gate is registered",
    packageJson.scripts?.[
      "check-reality-route-pressure-candidate-activation-bridge"
    ] ?? "",
    "node scripts/check-reality-route-pressure-candidate-activation-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-route-candidate-activation-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "route-candidate-activation.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.sourceContext))};`,
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
  const sourceReferenceId = "launch:real-user:work-003x";
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
  assertEqual("route activation source prerequisite is ready", routeSourceResult.status, "AVAILABLE");

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
  const ready = runtime.bridgeRealityRouteToPressureCandidateActivation({
    routeAuthorization,
    routeActivationSourceContext: routeSourceResult.context,
  });
  assertEqual("authorized route creates candidate activation", ready.status, "READY");
  assertEqual("source reference remains continuous", ready.sourceReferenceId, sourceReferenceId);
  assertEqual("route source reference remains traceable", ready.routeActivationContextReferenceId, routeSourceResult.context.contextReferenceId);
  assertEqual("existing candidate activation is returned", ready.candidateActivationContext.source, "reality_pressure_candidate_activation_context");
  assertEqual("candidate activation uses real mode", ready.candidateActivationContext.sourceMode, "REAL_USER_EXPERIENCE");
  assertEqual("candidate cursor remains empty", ready.candidateActivationContext.candidateCursor, null);
  assertEqual("candidate exclusions remain empty", ready.candidateActivationContext.excludedCandidateIds.length, 0);
  assertEqual("bridge output is immutable", Object.isFrozen(ready), true);
  assertEqual("bridge provenance is immutable", Object.isFrozen(ready.provenance), true);

  for (const forbiddenKey of [
    "candidateBundle",
    "pressureSeed",
    "selectedPressureSeedContext",
    "consumerInput",
    "gravityReadiness",
  ]) {
    assertEqual(`bridge excludes ${forbiddenKey}`, forbiddenKey in ready, false);
  }

  const unauthorized = runtime.bridgeRealityRouteToPressureCandidateActivation({
    routeAuthorization: Object.freeze({
      status: "SOURCE_NOT_READY",
      sourceReferenceId,
    }),
    routeActivationSourceContext: routeSourceResult.context,
  });
  assertEqual("unauthorized route is blocked", unauthorized.status, "SOURCE_NOT_READY");
  assertEqual("authorization failure is explicit", unauthorized.reason, "REALITY_ROUTE_AUTHORIZATION_REQUIRED");

  const mismatch = runtime.bridgeRealityRouteToPressureCandidateActivation({
    routeAuthorization: Object.freeze({
      ...routeAuthorization,
      sourceReferenceId: "launch:other-user",
      sourceContext: Object.freeze({
        ...routeAuthorization.sourceContext,
        sourceReferenceId: "launch:other-user",
      }),
    }),
    routeActivationSourceContext: routeSourceResult.context,
  });
  assertEqual("source mismatch is blocked", mismatch.status, "BLOCKED");
  assertEqual("source mismatch reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY ROUTE PRESSURE CANDIDATE ACTIVATION BRIDGE] PASS");
} catch (error) {
  console.error("[REALITY ROUTE PRESSURE CANDIDATE ACTIVATION BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
