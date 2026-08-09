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
    "productionRealityRouteHandoffOnly: true",
    "realityEntryContextRequiredBeforeNavigation: true",
    "explicitUserConfirmedRealityNavigationOnly: true",
    "noAutomaticRealityNavigation: true",
  ].forEach((marker) => assertIncludes("production experience page", source.page, marker));

  [
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "genesisPreviewIntegration",
    "genesisPreviewIntegrationFixture",
    "PersonalStarBeastWebGLPrototypeHarness",
    "createIsolatedWebGLRendererPrototype",
    "resolveGenesisVisualConsumerSource",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("page owns no preview, fixture, source route, or storage", source.page, marker));

  [
    "useNavigate",
    "resolveGenesisProductionRealityRouteHandoff",
    "activateGenesisProductionRealityEntryContext",
    'navigate(handoff.routeTarget, {',
  ].forEach((marker) => assertIncludes("page owns only explicit authorized Reality navigation", source.page, marker));

  [
    "export function GenesisProductionRendererCanvasHost",
    "createXinmaiContinuousSceneGenesisRendererAdapter({",
    "useXinmaiContinuousScenePresentation(sceneRegistration)",
    "const sceneRegistration = useMemo(",
    "routeAuthorization.productionRendererAuthorization",
    "consumerSourceResult,",
    'pointerInteraction: "NONE" as const',
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
    "createGenesisProductionRendererHost",
    "window.requestAnimationFrame",
    "new ResizeObserver",
    "controller.renderFrame",
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

  [
    "radial-gradient(ellipse at 50% 46%",
    "@keyframes gy-genesis-origin-invitation-breathe",
    "@keyframes gy-genesis-origin-identity-reveal",
    "@keyframes gy-genesis-life-whisper-arrive",
    "@media (prefers-reduced-motion: reduce)",
  ].forEach(
    (marker) =>
      assertIncludes(
        "page stylesheet preserves authorized life-space continuity",
        source.style,
        marker,
      ),
  );
  assertExcludes(
    "page stylesheet adds no ungoverned transition",
    source.style,
    "transition:",
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
