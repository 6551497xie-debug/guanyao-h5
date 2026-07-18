import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  canvasHost: "src/components/GenesisProductionRendererCanvasHost.tsx",
  type: "src/types/genesisProductionExperiencePage.ts",
  style: "src/styles/genesis-production-experience.css",
  routeAuthorization: "src/services/genesisProductionRouteAuthorization.ts",
  productionHost: "src/renderers/genesisProductionRendererHost.ts",
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
    "export function GenesisProductionExperiencePage",
    "authorizeGenesisProductionRoute({",
    "GENESIS_PRODUCTION_ROUTE_TARGET",
    "resolveRealGenesisVisualConsumerSource()",
    'routeAuthorization.status !== "READY"',
    'consumerSourceResult.status !== "READY"',
    "consumerSourceResult.consumerSource.sourceReferenceId !==",
    'data-production-genesis-status="SOURCE_NOT_READY"',
    'data-production-genesis-status="AUTHORIZED_PRODUCTION_GENESIS"',
    "GenesisProductionRendererCanvasHost",
    "sourceNotReadyStopsRendering: true",
    "noFixtureFallback: true",
    "noPreviewRuntime: true",
    "noRouteRegistration: true",
  ].forEach((marker) => assertIncludes("production experience page", source.page, marker));

  [
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "genesisPreviewIntegration",
    "genesisPreviewIntegrationFixture",
    "PersonalStarBeastWebGLPrototypeHarness",
    "createIsolatedWebGLRendererPrototype",
    "resolveGenesisVisualConsumerSource",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("page owns no preview, fixture, route, or storage", source.page, marker));

  [
    "export function GenesisProductionRendererCanvasHost",
    "createGenesisProductionRendererHost({",
    "routeAuthorization.productionRendererAuthorization",
    "consumerSourceResult,",
    "controller.renderFrame",
    "window.requestAnimationFrame",
    "new ResizeObserver",
    "controller.resize",
    "window.cancelAnimationFrame",
    "resizeObserver.disconnect()",
    "controller.dispose()",
    "productionRendererHostOnly: true",
    "noRendererCoreInvocation: true",
    "noTimelineMutation: true",
    "noRouteRegistration: true",
  ].forEach((marker) => assertIncludes("production canvas lifecycle host", source.canvasHost, marker));

  [
    "createGenesisWebGLRendererCore",
    "createIsolatedWebGLRendererPrototype",
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "genesisPreviewIntegrationFixture",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("canvas host bypasses no production boundary", source.canvasHost, marker));

  [
    "GenesisProductionCanvasHostState",
    "GenesisProductionCanvasHostBoundary",
    "GenesisProductionRendererCanvasHostProps",
    "GenesisProductionExperiencePageProps",
    "GenesisProductionExperiencePageBoundary",
    "authorizedRouteInputOnly: true",
    "realUserConsumerSourceOnly: true",
    "noFixtureSource: true",
    "noPrototypeAuthorization: true",
    "noEngineInvocation: true",
    "noRouteRegistration: true",
  ].forEach((marker) => assertIncludes("production page contract", source.type, marker));

  ["radial-gradient", "filter:", "animation:", "transition:"].forEach(
    (marker) => assertExcludes("page stylesheet adds layout only", source.style, marker),
  );

  assertIncludes(
    "route guard remains the authorization owner",
    source.routeAuthorization,
    'authorizationState: "AUTHORIZED_PRODUCTION_GENESIS"',
  );
  assertIncludes(
    "production host remains the only core facade",
    source.productionHost,
    "createGenesisWebGLRendererCore({",
  );
  assertIncludes(
    "prototype renderer remains production forbidden",
    source.prototype,
    'authorization.productionStatus !== "FORBIDDEN"',
  );
  assertIncludes(
    "prototype harness remains fixture preview only",
    source.harness,
    'sourceExperienceMode !== "FIXTURE_PREVIEW_ONLY"',
  );

  assertIncludes("formal route target is registered", source.routes, 'genesis: "/genesis"');
  assertExcludes("app does not mount production page", source.app, "GenesisProductionExperiencePage");
  assertExcludes("launch navigation remains unchanged", source.launch, "GenesisProductionExperiencePage");
  assertExcludes("launch does not authorize route", source.launch, "authorizeGenesisProductionRoute");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "production page gate is registered",
    packageJson.scripts?.["check-genesis-production-experience-page"] ?? "",
    "node scripts/check-genesis-production-experience-page.mjs",
  );

  const compileResult = await build({
    entryPoints: [path.join(rootDir, paths.page)],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    write: false,
    metafile: true,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  assertEqual("production page compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  for (const forbiddenInput of [
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype.ts",
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "genesisPreviewIntegration.ts",
    "genesisPreviewIntegrationFixture.ts",
  ]) {
    assertEqual(
      `production page bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  console.log("\n[GENESIS PRODUCTION EXPERIENCE PAGE] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION EXPERIENCE PAGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
