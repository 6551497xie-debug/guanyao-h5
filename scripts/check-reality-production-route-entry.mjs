import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  entry: "src/pages/RealityProductionRouteEntry.tsx",
  host: "src/components/RealityProductionHost.tsx",
  entryType: "src/types/realityProductionRouteEntry.ts",
  authorization: "src/services/realityProductionRouteAuthorization.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  shell: "src/components/AppShell.tsx",
  genesisPage: "src/pages/GenesisProductionExperiencePage.tsx",
  dynamics: "src/pages/GravityPage.tsx",
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
    "export function RealityProductionRouteEntry",
    "readGenesisProductionRealityEntryContext()",
    "authorizeRealityProductionRoute({",
    "REALITY_PRODUCTION_ROUTE_TARGET",
    'authorization.status !== "READY"',
    'data-production-reality-status="SOURCE_NOT_READY"',
    "RealityProductionHost",
    "routeAuthorization={authorization}",
    'navigate("/launch-lab", { replace: true })',
    "返回出生信息",
    "sourceReferenceExcludedFromUrl: true",
    "noPressureExecution: true",
    "noStorageRead: true",
  ].forEach((marker) =>
    assertIncludes("guarded Reality production route entry", source.entry, marker),
  );

  [
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "PersonalStarBeastWebGLPrototypeHarness",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolvePressureRecognitionUIRuntime",
    "reviewRealityPressureRecognitionArchitecture",
    "GuanyaoRuntimeEngine",
    "GravityPage",
    "useSearchParams",
    "location.search",
    "URLSearchParams",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("route entry owns no fixture, engine, Pressure runtime, legacy route, URL source, or storage", source.entry, marker),
  );

  [
    "export function RealityProductionHost",
    'data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"',
    'data-reality-production-host-state="ENTRY_READY"',
    "data-source-reference-id={sourceContext.sourceReferenceId}",
    "data-pressure-recognition-state={sourceContext.pressureRecognitionState}",
    '<p role="status">REALITY_ENTRY_READY</p>',
    "authorizedRealitySourceOnly: true",
    "pressureRecognitionNotStarted: true",
    "noLegacyDynamicsRuntime: true",
    "noRendererInvocation: true",
  ].forEach((marker) =>
    assertIncludes("Reality production host boundary", source.host, marker),
  );

  [
    "resolvePressureRecognitionUIRuntime",
    "resolveGravityExperienceUIRuntime",
    "resolveChoiceExperienceUIRuntime",
    "resolveCrystalExperienceUIRuntime",
    "GuanyaoRuntimeEngine",
    "GravityPage",
    "isolatedWebGLRendererPrototype",
    "GenesisProductionRendererCanvasHost",
    "useEffect",
    "useState",
    "useNavigate",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("host starts no Reality stage, renderer, legacy runtime, navigation, or storage", source.host, marker),
  );

  [
    "productionRouteEntryOnly: true",
    "exactRealityRouteOnly: true",
    "inMemoryRealityEntryContextOnly: true",
    "routeAuthorizationRequired: true",
    "sourceNotReadyRecoveryRequired: true",
    "sourceReferenceExcludedFromUrl: true",
    "productionRealityHostOnly: true",
    "entryReadyPresentationOnly: true",
    "noPressureExecution: true",
    "noGenesisNavigationMutation: true",
  ].forEach((marker) =>
    assertIncludes("Reality route and host contract", source.entryType, marker),
  );

  assertIncludes("formal Reality route target exists", source.routes, 'reality: "/reality"');
  assertIncludes("App lazily imports guarded Reality route", source.app, 'import("./pages/RealityProductionRouteEntry")');
  assertIncludes("App gives Reality route a loading boundary", source.app, "<Suspense fallback={null}>");
  assertIncludes("App registers exact Reality route", source.app, "path={GUANYAO_ROUTES.reality}");
  assertIncludes("App renders guarded Reality entry", source.app, "<RealityProductionRouteEntry />");
  assertIncludes("Reality receives fullscreen shell", source.shell, 'location.pathname === "/reality"');
  assertIncludes("Genesis resolves explicit Reality handoff", source.genesisPage, "resolveGenesisProductionRealityRouteHandoff");
  assertIncludes("Genesis navigates only to the authorized handoff target", source.genesisPage, "navigate(handoff.routeTarget)");
  assertExcludes("Genesis does not hardcode Reality navigation", source.genesisPage, 'navigate("/reality"');
  assertIncludes("legacy Dynamics remains isolated", source.dynamics, "LEGACY_DYNAMICS_FLOW_ISOLATED");
  assertIncludes("route entry uses formal authorization", source.authorization, "authorizeRealityProductionRoute");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Reality route entry gate is registered",
    packageJson.scripts?.["check-reality-production-route-entry"] ?? "",
    "node scripts/check-reality-production-route-entry.mjs",
  );

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
  assertEqual("Reality route entry compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  for (const forbiddenInput of [
    "GravityPage",
    "guanyaoRuntimeEngine",
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype.ts",
    "pressureRecognitionUIRuntime.ts",
    "gravityExperienceUIRuntime.ts",
    "choiceExperienceUIRuntime.ts",
    "crystalExperienceUIRuntime.ts",
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
  ]) {
    assertEqual(
      `Reality route bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION ROUTE ENTRY] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION ROUTE ENTRY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
