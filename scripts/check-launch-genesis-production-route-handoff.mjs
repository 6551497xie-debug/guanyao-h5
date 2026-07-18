import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/launchGenesisProductionRouteHandoff.ts",
  service: "src/services/launchGenesisProductionRouteHandoff.ts",
  contextService: "src/services/realUserGenesisVisualSourceContext.ts",
  launch: "src/pages/LaunchLab.tsx",
  genesisEntry: "src/pages/GenesisProductionRouteEntry.tsx",
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
    "LaunchGenesisProductionRouteHandoffBoundary",
    "LaunchGenesisProductionRouteHandoffInput",
    "LaunchGenesisProductionRouteHandoffResult",
    "completedLaunchLifeSourceSessionRequired: true",
    "existingGenesisVisualSourceContextRequired: true",
    "realEngineResultOnly: true",
    "sourceReferenceContinuityRequired: true",
    "noFixtureSource: true",
    "noSourceFallback: true",
    "noEngineInvocation: true",
    "noRouterInvocation: true",
  ].forEach((marker) =>
    assertIncludes("Launch → Genesis handoff contract", source.type, marker),
  );

  [
    "resolveLaunchGenesisProductionRouteHandoff",
    "readRealUserGenesisVisualSourceContext",
    'routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET',
    'navigationMode: "EXPLICIT_LAUNCH_COMPLETION"',
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("Launch → Genesis handoff service", source.service, marker),
  );
  [
    "resolveLaunchOriginMother",
    "createLaunchLifeSourceSession",
    "resolveLaunchLifeVisualSource",
    "activateRealUserGenesisVisualSourceContext",
    "authorizeGenesisProductionRoute",
    "createGenesisProductionRendererHost",
    "navigate(",
    "react",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes(
      "handoff service performs no Engine, Source assembly, authorization, renderer, router, UI, or storage work",
      source.service,
      marker,
    ),
  );

  [
    "resolveLaunchGenesisProductionRouteHandoff({",
    'setLaunchInteractionState("GENESIS_HANDOFF")',
    "navigate(handoff.routeTarget)",
    "captureLaunchLifeSourceSession()",
    "if (DEBUG_TIMELINE)",
    "openMotherCodeReveal()",
  ].forEach((marker) =>
    assertIncludes("Launch owns the explicit production handoff", source.launch, marker),
  );
  assertExcludes(
    "Launch does not hardcode the Genesis route",
    source.launch,
    'navigate("/genesis"',
  );
  assertIncludes(
    "Genesis entry remains formally guarded",
    source.genesisEntry,
    "authorizeGenesisProductionRoute({",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Launch → Genesis handoff gate is registered",
    packageJson.scripts?.[
      "check-launch-genesis-production-route-handoff"
    ] ?? "",
    "node scripts/check-launch-genesis-production-route-handoff.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-launch-genesis-handoff-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "launch-genesis-handoff.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.contextService))};`,
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
  const sourceReferenceId = "launch:1995-06-02:YOU:广东:广州";
  const session = Object.freeze({
    schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
    source: "launch_life_source_session",
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
    provenance: Object.freeze({
      sourceKind: "REAL_ENGINE_RESULT",
      sourceReferenceId,
      birthSource: "LAUNCH_USER_CONFIRMED",
    }),
  });

  const missing = runtime.resolveLaunchGenesisProductionRouteHandoff({
    lifeSourceSession: session,
  });
  assertEqual("missing Context cannot hand off", missing.status, "SOURCE_NOT_READY");
  assertEqual("missing Context reason is explicit", missing.guardReason, "GENESIS_VISUAL_SOURCE_CONTEXT_REQUIRED");

  const visualSourceAdapterInput = Object.freeze({
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
  });
  const visualSource = Object.freeze({
    provenance: Object.freeze({
      sourceKind: "REAL_ENGINE_RESULT",
      sourceReferenceId,
    }),
  });
  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: session,
    visualSourceAdapterInput,
    visualSource,
  });
  assertEqual("real visual Context activates", activation.status, "AVAILABLE");

  const ready = runtime.resolveLaunchGenesisProductionRouteHandoff({
    lifeSourceSession: session,
  });
  assertEqual("real Launch source can hand off", ready.status, "READY");
  assertEqual("handoff targets Genesis", ready.routeTarget, "/genesis");
  assertEqual("handoff is explicit", ready.navigationMode, "EXPLICIT_LAUNCH_COMPLETION");
  assertEqual("source reference remains continuous", ready.sourceReferenceId, sourceReferenceId);
  assertEqual("handoff result is immutable", Object.isFrozen(ready), true);

  const fixture = runtime.resolveLaunchGenesisProductionRouteHandoff({
    lifeSourceSession: Object.freeze({
      ...session,
      sourceReferenceId: "fixture:case-a",
    }),
  });
  assertEqual("Fixture cannot hand off", fixture.status, "BLOCKED");
  assertEqual("Fixture reason is explicit", fixture.guardReason, "FORBIDDEN_SOURCE_REFERENCE");

  console.log("\n[LAUNCH → GENESIS PRODUCTION ROUTE HANDOFF] PASS");
} catch (error) {
  console.error("[LAUNCH → GENESIS PRODUCTION ROUTE HANDOFF] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
