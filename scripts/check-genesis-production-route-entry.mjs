import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  entry: "src/pages/GenesisProductionRouteEntry.tsx",
  entryType: "src/types/genesisProductionRouteEntry.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  shell: "src/components/AppShell.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(Object.entries(paths).map(([key, file]) => [key, fs.readFileSync(path.join(rootDir, file), "utf8")]));

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
    "export function GenesisProductionRouteEntry",
    "readRealUserGenesisVisualSourceContext()",
    "authorizeGenesisProductionRoute({",
    "GENESIS_PRODUCTION_ROUTE_TARGET",
    'authorization.status !== "READY"',
    'data-production-genesis-status="SOURCE_NOT_READY"',
    "GenesisProductionExperiencePage",
    "sourceReferenceId={authorization.sourceReferenceId}",
    'navigate("/launch-lab", { replace: true })',
    "返回出生信息",
    "sourceReferenceExcludedFromUrl: true",
    "noFixtureSource: true",
    "noEngineInvocation: true",
    "noStorageRead: true",
  ].forEach((marker) => assertIncludes("production route entry", source.entry, marker));

  [
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "createIsolatedWebGLRendererPrototype",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "adaptRealLifeVisualSource",
    "useSearchParams",
    "location.search",
    "URLSearchParams",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("route entry owns no fixture, engine, URL source, or storage", source.entry, marker));

  [
    "productionRouteEntryOnly: true",
    "exactGenesisRouteOnly: true",
    "inMemoryRealUserContextOnly: true",
    "routeAuthorizationRequired: true",
    "sourceNotReadyRecoveryRequired: true",
    "sourceReferenceExcludedFromUrl: true",
    "noLaunchNavigationMutation: true",
  ].forEach((marker) => assertIncludes("route entry contract", source.entryType, marker));

  assertIncludes("route constant is formal", source.routes, 'genesis: "/genesis"');
  assertIncludes("App lazily imports guarded route entry", source.app, 'import("./pages/GenesisProductionRouteEntry")');
  assertIncludes("App gives route entry a loading boundary", source.app, "<Suspense fallback={null}>");
  assertIncludes("App registers exact formal route", source.app, "path={GUANYAO_ROUTES.genesis}");
  assertIncludes("App renders guarded route entry", source.app, "<GenesisProductionRouteEntry />");
  assertIncludes("Genesis receives fullscreen shell", source.shell, 'location.pathname === "/genesis"');
  assertIncludes("Launch resolves the guarded Genesis handoff", source.launch, "resolveLaunchGenesisProductionRouteHandoff");
  assertIncludes("Launch navigates only to the guarded target", source.launch, "navigate(handoff.routeTarget)");
  assertExcludes("Launch does not hardcode Genesis navigation", source.launch, 'navigate("/genesis"');

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes("route entry gate is registered", packageJson.scripts?.["check-genesis-production-route-entry"] ?? "", "node scripts/check-genesis-production-route-entry.mjs");

  const compileResult = await build({
    entryPoints: [path.join(rootDir, paths.entry)],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    write: false,
    metafile: true,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  assertEqual("route entry compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  for (const forbiddenInput of [
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype.ts",
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "genesisPreviewIntegrationFixture.ts",
  ]) {
    assertEqual(`route entry bundle excludes ${forbiddenInput}`, bundleInputs.some((input) => input.includes(forbiddenInput)), false);
  }

  console.log("\n[GENESIS PRODUCTION ROUTE ENTRY] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION ROUTE ENTRY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
