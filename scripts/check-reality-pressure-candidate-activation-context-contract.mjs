import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureCandidateActivationContext.ts",
  service: "src/services/realityPressureCandidateActivationContextContract.ts",
  routeEntry: "src/pages/RealityProductionRouteEntry.tsx",
  host: "src/components/RealityProductionHost.tsx",
  requestBridge: "src/services/realityPressureCandidateRequestContextBridge.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
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
    "RealityPressureExplicitRequestDateSource",
    "RealityPressureCandidateActivationContext",
    "RealityPressureCandidateActivationContextInput",
    "RealityPressureCandidateActivationContextResult",
    "RealityPressureCandidateActivationContextContract",
    'sourceProvenance: "EXPLICIT_CALLER_PROVIDED"',
    'captureBoundary: "REALITY_ROUTE_ACTIVATION"',
    "lifeSourceSession: LaunchLifeSourceSession",
    "initialCandidateCursor: null",
    "initialExcludedCandidateReferenceIds: readonly []",
  ].forEach((marker) => assertIncludes("activation context type contract", source.type, marker));

  [
    "contractOnly: true",
    "contextImplementationOnly: true",
    "authorizedRealityRouteOnly: true",
    "existingLaunchLifeSourceSessionOnly: true",
    "explicitRequestDateSourceOnly: true",
    "requestDateCapturedOnceOnly: true",
    "sourceReferenceContinuityRequired: true",
    "noImplicitSystemClock: true",
    "noEngineInvocation: true",
    "noCandidateRequestBridgeInvocation: true",
    "noCandidateSourceInvocation: true",
    "noDeliverySessionActivation: true",
    "noPressureConsumerIntegration: true",
    "noUiIntegration: true",
    "noRouteMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("activation context contract boundary", source.service, marker));

  [
    "new Date",
    "Date.now",
    "authorizeRealityProductionRoute",
    "readRealUserGenesisVisualSourceContext",
    "bridgeRealityPressureCandidateRequestContext",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityPressureCandidateDeliverySession",
    "initializeRealityProductionPressureSeedConsumer",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("contract performs no clock, route, source, consumer, UI, or storage work", source.service, marker),
  );

  assertExcludes("Reality Route is not integrated by contract knife", source.routeEntry, "CandidateActivationContext");
  assertExcludes("Production Host is not integrated by contract knife", source.host, "CandidateActivationContext");
  assertExcludes("Request Bridge remains unchanged", source.requestBridge, "CandidateActivationContext");
  assertExcludes("Candidate Source remains unchanged", source.candidateSource, "CandidateActivationContext");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "activation context contract gate is registered",
    packageJson.scripts?.["check-reality-pressure-candidate-activation-context-contract"] ?? "",
    "node scripts/check-reality-pressure-candidate-activation-context-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-activation-context-contract-"));
  const outPath = path.join(tempDir, "contract.mjs");
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
  const contract = runtime.REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_CONTRACT;
  assertEqual("contract targets Reality route", contract.routeTarget, "/reality");
  assertEqual("contract requires real route authorization", contract.requiredRouteAuthorization, "AUTHORIZED_PRODUCTION_REALITY_SOURCE");
  assertEqual("contract requires Launch carrier", contract.requiredLifeSource, "LAUNCH_LIFE_SOURCE_SESSION");
  assertEqual("request date must be explicit", contract.requiredRequestDateProvenance, "EXPLICIT_CALLER_PROVIDED");
  assertEqual("request date is captured at route activation", contract.requestDateCaptureBoundary, "REALITY_ROUTE_ACTIVATION");
  assertEqual("first cursor is empty", contract.initialCandidateCursor, null);
  assertEqual("first delivery history is empty", contract.initialExcludedCandidateReferenceIds.length, 0);
  assertEqual("contract is immutable", Object.isFrozen(contract), true);
  assertEqual("boundary is immutable", Object.isFrozen(contract.boundary), true);
  assertEqual("initial history is immutable", Object.isFrozen(contract.initialExcludedCandidateReferenceIds), true);

  console.log("\n[REALITY PRESSURE CANDIDATE ACTIVATION CONTEXT CONTRACT] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CANDIDATE ACTIVATION CONTEXT CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
