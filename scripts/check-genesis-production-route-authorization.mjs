import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/genesisProductionRouteAuthorization.ts",
  service: "src/services/genesisProductionRouteAuthorization.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  core: "src/renderers/genesisWebGLRendererCore.ts",
  prototype: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-production-route-auth-"),
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
    "export type GenesisProductionRouteActivationAuthorization",
    'status: "READY"',
    'status: "SOURCE_NOT_READY"',
    'status: "BLOCKED"',
    'routeTarget: GenesisProductionRouteTarget',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    "sourceReferenceId:",
    'authorizationState: "AUTHORIZED_PRODUCTION_GENESIS"',
    "guardReason:",
    "productionRendererAuthorization:",
    "noEngineResult: true",
    "noUserData: true",
    "noRenderPlan: true",
    "noFixtureSource: true",
    "noRendererInvocation: true",
    "noRouteRegistration: true",
  ].forEach((marker) => assertIncludes("route authorization contract", source.type, marker));

  [
    "StarbeastDerivationReady",
    "LunarMotherCodeLandingResult",
    "PersonalStarBeastRenderPlan",
    "SelectedPressureSeedContext",
    "PersonalStarBeastSceneModelFixture",
  ].forEach((marker) => assertExcludes("authorization contract carries no life or fixture data", source.type, marker));

  [
    "export function authorizeGenesisProductionRoute",
    'GENESIS_PRODUCTION_ROUTE_TARGET = "/genesis"',
    "readRealUserGenesisVisualSourceContext()",
    'context.sourceMode !== "REAL_USER_EXPERIENCE"',
    'context.lifeSourceSession.sourceKind !== "REAL_ENGINE_RESULT"',
    'context.visualSourceAdapterInput.sourceKind !== "REAL_ENGINE_RESULT"',
    'context.visualSource.provenance.sourceKind !== "REAL_ENGINE_RESULT"',
    'return sourceNotReady(null, "SOURCE_REFERENCE_REQUIRED")',
    '"SOURCE_CONTEXT_NOT_AVAILABLE"',
    '"SOURCE_PROVENANCE_INVALID"',
    '"SOURCE_SESSION_REFERENCE_MISMATCH"',
    '"SOURCE_REFERENCE_MISMATCH"',
    'authorizationState: "AUTHORIZED_PRODUCTION_GENESIS"',
    'authorizedTarget: "GENESIS_PRODUCTION_RENDERER_HOST"',
  ].forEach((marker) => assertIncludes("production route guard", source.service, marker));

  [
    "createGenesisProductionRendererHost",
    "createGenesisWebGLRendererCore",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "adaptRealLifeVisualSource",
    "starBeastSceneModelFixtures",
    "fixtureGenesisVisualConsumerSource",
    "isolatedWebGLRendererPrototype",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("guard starts no engine, renderer, route, or fixture", source.service, marker));

  assertIncludes(
    "prototype harness remains fixture preview only",
    source.harness,
    'sourceExperienceMode !== "FIXTURE_PREVIEW_ONLY"',
  );
  assertIncludes(
    "prototype renderer remains production forbidden",
    source.prototype,
    'authorization.productionStatus !== "FORBIDDEN"',
  );
  assertExcludes("formal route is not registered", source.routes, 'genesis: "/genesis"');
  assertExcludes("app has no production page", source.app, "GenesisProductionExperience");
  assertExcludes("launch navigation remains unchanged", source.launch, "authorizeGenesisProductionRoute");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "route authorization gate is registered",
    packageJson.scripts?.["check-genesis-production-route-authorization"] ?? "",
    "node scripts/check-genesis-production-route-authorization.mjs",
  );

  const entryPath = path.join(tempDir, "route-auth-entry.ts");
  const outPath = path.join(tempDir, "route-auth-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeSourceSession.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeVisualSourceResolver.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/realUserGenesisVisualSourceContext.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisProductionRouteAuthorization.ts"))};`,
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

  runtime.clearRealUserGenesisVisualSourceContext();
  const sourceReferenceId = "launch:1979-04-15:子时:甘肃:兰州";
  const missingReference = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId: null,
  });
  assertEqual("missing reference returns SOURCE_NOT_READY", missingReference.status, "SOURCE_NOT_READY");
  assertEqual("missing reference has no host authorization", missingReference.productionRendererAuthorization, null);

  const missingContext = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  assertEqual("missing context returns SOURCE_NOT_READY", missingContext.status, "SOURCE_NOT_READY");
  assertEqual("missing context reason", missingContext.guardReason, "SOURCE_CONTEXT_NOT_AVAILABLE");

  const wrongRoute = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis-preview",
    sourceReferenceId,
  });
  assertEqual("wrong route is blocked", wrongRoute.status, "BLOCKED");
  assertEqual("wrong route has no host authorization", wrongRoute.productionRendererAuthorization, null);

  for (const forbiddenReference of [
    "fixture:case-a",
    "prototype:case-b",
    "default:source",
    "referenceOnly:source",
  ]) {
    const forbidden = runtime.authorizeGenesisProductionRoute({
      routeTarget: "/genesis",
      sourceReferenceId: forbiddenReference,
    });
    assertEqual(`${forbiddenReference} is blocked`, forbidden.status, "BLOCKED");
    assertEqual(`${forbiddenReference} has no host authorization`, forbidden.productionRendererAuthorization, null);
  }

  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 6, originLightTrace: "28光兽入口" },
  });
  const sessionResult = runtime.createLaunchLifeSourceSession({
    sourceReferenceId,
    birthCoordinate: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    ...originResults,
  });
  assertEqual("real session is available", sessionResult.status, "AVAILABLE");
  const visualResult = runtime.resolveLaunchLifeVisualSource(sessionResult.session);
  assertEqual("real visual source is available", visualResult.status, "AVAILABLE");
  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real context is available", activation.status, "AVAILABLE");

  const mismatched = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId: "launch:other-session",
  });
  assertEqual("mismatched source returns SOURCE_NOT_READY", mismatched.status, "SOURCE_NOT_READY");
  assertEqual("mismatched source reason", mismatched.guardReason, "SOURCE_REFERENCE_MISMATCH");

  const ready = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  assertEqual("real user session is authorized", ready.status, "READY");
  assertEqual("authorization state is production Genesis", ready.authorizationState, "AUTHORIZED_PRODUCTION_GENESIS");
  assertEqual("route target is exact", ready.routeTarget, "/genesis");
  assertEqual("source mode is real user", ready.sourceExperienceMode, "REAL_USER_EXPERIENCE");
  assertEqual("provenance is real session", ready.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("source reference remains continuous", ready.sourceReferenceId, sourceReferenceId);
  assertEqual("host authorization is emitted", ready.productionRendererAuthorization.authorizedTarget, "GENESIS_PRODUCTION_RENDERER_HOST");
  assertEqual("host authorization binds same source", ready.productionRendererAuthorization.authorizedSourceReferenceId, sourceReferenceId);
  assertEqual("prototype authorization is not accepted", ready.productionRendererAuthorization.prototypeAuthorizationStatus, "NOT_ACCEPTED");
  assertEqual("fixture source is forbidden", ready.productionRendererAuthorization.fixtureSourceStatus, "FORBIDDEN");

  for (const forbiddenOutputKey of [
    "lifeSourceSession",
    "visualSource",
    "renderPlan",
    "engineResult",
    "userData",
  ]) {
    assertEqual(
      `authorization output excludes ${forbiddenOutputKey}`,
      Object.prototype.hasOwnProperty.call(ready, forbiddenOutputKey),
      false,
    );
  }

  console.log("\n[GENESIS PRODUCTION ROUTE AUTHORIZATION] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION ROUTE AUTHORIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
