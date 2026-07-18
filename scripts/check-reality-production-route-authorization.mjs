import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityProductionRouteAuthorization.ts",
  service: "src/services/realityProductionRouteAuthorization.ts",
  entryType: "src/types/genesisProductionRecognitionRealityEntry.ts",
  entryService: "src/services/genesisProductionRecognitionRealityEntry.ts",
  pressureType: "src/types/realityPressureRecognitionArchitecture.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  dynamics: "src/pages/GravityPage.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-reality-production-route-auth-"),
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
    "export type RealityProductionRouteActivationAuthorization",
    "export type RealityProductionSourceContext",
    'status: "READY"',
    'status: "SOURCE_NOT_READY"',
    'status: "BLOCKED"',
    'authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE"',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    'sourceProvenance: "REAL_USER_SESSION"',
    'realityEntryEligibility: "ELIGIBLE"',
    'pressureRecognitionState: "NOT_STARTED"',
    "RealityExperienceArchitectureReference",
    "noPressureExecution: true",
    "noRouteRegistration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("Reality route/source contract", source.type, marker),
  );

  [
    "StarbeastDerivationReady",
    "LunarMotherCodeLandingResult",
    "SelectedPressureSeedContext",
    "RenderPlan",
    "SceneModel",
    "ProjectionBundle",
    "UserData",
  ].forEach((marker) =>
    assertExcludes("contract carries no engine, visual, fixture, or user data", source.type, marker),
  );

  [
    "export function authorizeRealityProductionRoute",
    'REALITY_PRODUCTION_ROUTE_TARGET = "/reality"',
    "readGenesisProductionRealityEntryContext()",
    'entryContext.sourceProvenance !== "REAL_USER_SESSION"',
    'entryContext.eligibility !== "ELIGIBLE"',
    'session.phase !== "REALITY_ENTRY_ELIGIBLE"',
    'session.recognitionConfirmed !== true',
    'session.realityEntryConfirmed !== true',
    'return sourceNotReady(null, "SOURCE_REFERENCE_REQUIRED")',
    '"REALITY_ENTRY_CONTEXT_NOT_AVAILABLE"',
    '"SOURCE_REFERENCE_MISMATCH"',
    'authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE"',
    'pressureRecognitionState: "NOT_STARTED"',
  ].forEach((marker) =>
    assertIncludes("Reality production route guard", source.service, marker),
  );

  [
    "GuanyaoRuntimeEngine",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "reviewRealityPressureRecognitionArchitecture",
    "resolvePressureRecognitionUIRuntime",
    "resolveGravityExperienceUIRuntime",
    "createGenesisWebGLRendererCore",
    "isolatedWebGLRendererPrototype",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
    "resolveDynamicsInputContext",
  ].forEach((marker) =>
    assertExcludes("guard starts no engine, Reality runtime, renderer, route, storage, or legacy flow", source.service, marker),
  );

  assertExcludes("Reality route remains unregistered", source.routes, 'reality: "/reality"');
  assertExcludes("App mounts no Reality production host", source.app, "RealityProduction");
  assertIncludes("legacy dynamics remains isolated", source.dynamics, "LEGACY_DYNAMICS_FLOW_ISOLATED");
  assertIncludes("entry bridge still forbids route activation", source.entryType, "noRealityRouteActivation: true");
  assertIncludes("pressure architecture remains review only", source.pressureType, "noProductionIntegration: true");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Reality production authorization gate is registered",
    packageJson.scripts?.["check-reality-production-route-authorization"] ?? "",
    "node scripts/check-reality-production-route-authorization.mjs",
  );

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.entryService))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/realityPressureRecognitionArchitecture.ts"))};`,
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

  runtime.clearGenesisProductionRealityEntryContext();
  const sourceReferenceId = "launch:real-user:002.6p";

  const missingReference = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId: null,
  });
  assertEqual("missing reference returns SOURCE_NOT_READY", missingReference.status, "SOURCE_NOT_READY");
  assertEqual("missing reference creates no source context", missingReference.sourceContext, null);

  const missingContext = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId,
  });
  assertEqual("missing entry context returns SOURCE_NOT_READY", missingContext.status, "SOURCE_NOT_READY");
  assertEqual("missing context reason is explicit", missingContext.guardReason, "REALITY_ENTRY_CONTEXT_NOT_AVAILABLE");

  const wrongRoute = runtime.authorizeRealityProductionRoute({
    routeTarget: "/dynamics",
    sourceReferenceId,
  });
  assertEqual("legacy Dynamics route is blocked", wrongRoute.status, "BLOCKED");
  assertEqual("wrong route creates no source context", wrongRoute.sourceContext, null);

  for (const forbiddenReference of [
    "fixture:case-a",
    "prototype:reality",
    "default:reality",
    "referenceOnly:reality",
  ]) {
    const result = runtime.authorizeRealityProductionRoute({
      routeTarget: "/reality",
      sourceReferenceId: forbiddenReference,
    });
    assertEqual(`${forbiddenReference} is blocked`, result.status, "BLOCKED");
    assertEqual(`${forbiddenReference} creates no source context`, result.sourceContext, null);
  }

  const completionRuntime = {
    currentStage: "COMPLETION",
    runtimeStatus: "RECOGNITION_HOLD",
    interactionAvailability: "RECOGNITION_HOLD",
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceProvenance: "REAL_USER_SESSION",
    sourceReferenceId,
  };
  const recognition = runtime.initializeGenesisProductionRecognitionRealityEntry(completionRuntime);
  const recognized = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognition.session,
    "RECOGNITION_CONFIRM",
  );
  const eligible = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognized.session,
    "ENTER_REALITY",
  );
  const entryContext = runtime.activateGenesisProductionRealityEntryContext(eligible.session);
  assertEqual("eligible Genesis session activates entry context", entryContext.eligibility, "ELIGIBLE");

  const mismatch = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId: "launch:other-session",
  });
  assertEqual("mismatched reference returns SOURCE_NOT_READY", mismatch.status, "SOURCE_NOT_READY");
  assertEqual("mismatched reference reason is explicit", mismatch.guardReason, "SOURCE_REFERENCE_MISMATCH");

  const ready = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId,
  });
  assertEqual("eligible real session is authorized", ready.status, "READY");
  assertEqual("authorization targets production Reality source", ready.authorizationState, "AUTHORIZED_PRODUCTION_REALITY_SOURCE");
  assertEqual("source provenance is real session", ready.sourceContext.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("source mode is real user", ready.sourceContext.sourceExperienceMode, "REAL_USER_EXPERIENCE");
  assertEqual("source reference remains continuous", ready.sourceContext.sourceReferenceId, sourceReferenceId);
  assertEqual("Genesis completion reference remains continuous", ready.sourceContext.genesisCompletionReference.sourceReferenceId, sourceReferenceId);
  assertEqual("recognition reference remains continuous", ready.sourceContext.recognitionConfirmationReference.sourceReferenceId, sourceReferenceId);
  assertEqual("Pressure remains not started", ready.sourceContext.pressureRecognitionState, "NOT_STARTED");
  assertEqual("source context is immutable", Object.isFrozen(ready.sourceContext), true);

  const architectureReview = runtime.reviewRealityPressureRecognitionArchitecture({
    realityExperienceArchitectureReference:
      ready.sourceContext.realityExperienceArchitectureReference,
  });
  assertEqual("source context matches frozen Reality entry reference", architectureReview.status, "READY");

  for (const forbiddenOutputKey of [
    "selectedPressureSeedContext",
    "pressureResult",
    "gravityResult",
    "choiceResult",
    "crystalResult",
    "renderPlan",
  ]) {
    assertEqual(
      `source context excludes ${forbiddenOutputKey}`,
      Object.prototype.hasOwnProperty.call(ready.sourceContext, forbiddenOutputKey),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION ROUTE AUTHORIZATION] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION ROUTE AUTHORIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
