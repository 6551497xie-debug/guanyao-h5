import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/genesisProductionRealityRouteHandoff.ts",
  service: "src/services/genesisProductionRealityRouteHandoff.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  pageType: "src/types/genesisProductionExperiencePage.ts",
  entryService: "src/services/genesisProductionRecognitionRealityEntry.ts",
  realityEntry: "src/pages/RealityProductionRouteEntry.tsx",
  routes: "src/routes/guanyaoRoutes.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-reality-explicit-handoff-"),
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
    "GenesisProductionRealityRouteHandoffBoundary",
    "GenesisProductionRealityRouteHandoffInput",
    "GenesisProductionRealityRouteHandoffResult",
    'status: "READY"',
    'status: "SOURCE_NOT_READY"',
    'status: "BLOCKED"',
    'routeTarget: "/reality"',
    'navigationMode: "EXPLICIT_USER_CONFIRMED"',
    "eligibleRealityEntryContextRequired: true",
    "sourceReferenceExcludedFromUrl: true",
    "noAutomaticNavigation: true",
    "noPressureExecution: true",
    "noRouterInvocation: true",
  ].forEach((marker) =>
    assertIncludes("explicit Reality handoff contract", source.type, marker),
  );

  [
    "export function resolveGenesisProductionRealityRouteHandoff",
    "REALITY_PRODUCTION_ROUTE_TARGET",
    'context.sourceProvenance !== "REAL_USER_SESSION"',
    'context.eligibility !== "ELIGIBLE"',
    'session.phase !== "REALITY_ENTRY_ELIGIBLE"',
    'session.recognitionConfirmed !== true',
    'session.realityEntryConfirmed !== true',
    '"REALITY_ENTRY_CONTEXT_REQUIRED"',
    '"REALITY_ENTRY_CONTEXT_INVALID"',
    '"SOURCE_REFERENCE_MISMATCH"',
    'navigationMode: "EXPLICIT_USER_CONFIRMED"',
  ].forEach((marker) =>
    assertIncludes("explicit Reality handoff resolver", source.service, marker),
  );

  [
    "react-router-dom",
    "useNavigate",
    "navigate(",
    "resolvePressureRecognitionUIRuntime",
    "reviewRealityPressureRecognitionArchitecture",
    "GuanyaoRuntimeEngine",
    "GravityPage",
    "isolatedWebGLRendererPrototype",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("handoff resolver owns no router, Reality runtime, engine, legacy flow, or storage", source.service, marker),
  );

  [
    "useNavigate",
    "advanceGenesisProductionRecognitionRealityEntry",
    "activateGenesisProductionRealityEntryContext",
    "resolveGenesisProductionRealityRouteHandoff",
    'handoff.status === "READY"',
    "navigate(handoff.routeTarget)",
  ].forEach((marker) =>
    assertIncludes("Genesis page performs explicit authorized handoff", source.page, marker),
  );
  assertExcludes("Genesis page does not hardcode Reality URL", source.page, 'navigate("/reality"');
  assertExcludes("Genesis page does not put source in navigation state", source.page, "state: { sourceReferenceId");
  assertExcludes("Genesis page does not put source in URL", source.page, "URLSearchParams");

  const activationIndex = source.page.indexOf(
    "activateGenesisProductionRealityEntryContext(result.session)",
  );
  const resolutionIndex = source.page.indexOf(
    "resolveGenesisProductionRealityRouteHandoff({",
  );
  const navigationIndex = source.page.indexOf("navigate(handoff.routeTarget)");
  assertEqual("entry context activation exists", activationIndex >= 0, true);
  assertEqual("handoff resolution follows context activation", resolutionIndex > activationIndex, true);
  assertEqual("navigation follows READY handoff resolution", navigationIndex > resolutionIndex, true);
  assertEqual(
    "Genesis page has one navigation invocation",
    (source.page.match(/navigate\(/g) ?? []).length,
    1,
  );

  [
    "productionRealityRouteHandoffOnly: true",
    "realityEntryContextRequiredBeforeNavigation: true",
    "explicitUserConfirmedRealityNavigationOnly: true",
    "sourceReferenceExcludedFromUrl: true",
    "noAutomaticRealityNavigation: true",
  ].forEach((marker) =>
    assertIncludes("Genesis production page handoff boundary", source.pageType, marker),
  );

  assertIncludes("Reality route remains guarded", source.realityEntry, "authorizeRealityProductionRoute({");
  assertIncludes("formal Reality target remains exact", source.routes, 'reality: "/reality"');

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "explicit Reality handoff gate is registered",
    packageJson.scripts?.["check-genesis-reality-explicit-route-handoff"] ?? "",
    "node scripts/check-genesis-reality-explicit-route-handoff.mjs",
  );

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.entryService))};`,
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
  const sourceReferenceId = "launch:real-user:002.6r";

  const missingContext = runtime.resolveGenesisProductionRealityRouteHandoff({
    entryContext: null,
    sourceReferenceId,
  });
  assertEqual("missing context stops navigation", missingContext.status, "SOURCE_NOT_READY");
  assertEqual("missing context has no target", missingContext.routeTarget, null);

  const forbidden = runtime.resolveGenesisProductionRealityRouteHandoff({
    entryContext: null,
    sourceReferenceId: "fixture:case-a",
  });
  assertEqual("fixture handoff is blocked", forbidden.status, "BLOCKED");
  assertEqual("fixture handoff has no target", forbidden.routeTarget, null);

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
  const context = runtime.activateGenesisProductionRealityEntryContext(eligible.session);

  const mismatch = runtime.resolveGenesisProductionRealityRouteHandoff({
    entryContext: context,
    sourceReferenceId: "launch:other-session",
  });
  assertEqual("cross-session handoff stops navigation", mismatch.status, "SOURCE_NOT_READY");
  assertEqual("cross-session handoff reason is explicit", mismatch.guardReason, "SOURCE_REFERENCE_MISMATCH");

  const ready = runtime.resolveGenesisProductionRealityRouteHandoff({
    entryContext: context,
    sourceReferenceId,
  });
  assertEqual("eligible explicit handoff is ready", ready.status, "READY");
  assertEqual("handoff targets exact Reality route", ready.routeTarget, "/reality");
  assertEqual("handoff is explicitly user confirmed", ready.navigationMode, "EXPLICIT_USER_CONFIRMED");
  assertEqual("handoff keeps source continuity", ready.sourceReferenceId, sourceReferenceId);
  assertEqual("handoff result is immutable", Object.isFrozen(ready), true);

  console.log("\n[GENESIS REALITY EXPLICIT ROUTE HANDOFF] PASS");
} catch (error) {
  console.error("[GENESIS REALITY EXPLICIT ROUTE HANDOFF] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
