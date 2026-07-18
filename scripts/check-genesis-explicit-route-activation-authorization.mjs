import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  routeType: "src/types/genesisProductionRouteAuthorization.ts",
  hostType: "src/types/genesisProductionRendererHost.ts",
  guard: "src/services/genesisProductionRouteAuthorization.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  shell: "src/components/AppShell.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(Object.entries(paths).map(([key, file]) => [key, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-route-activation-auth-"));

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
    'authorizationId: "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V2"',
    'authorizedRouteTarget: "/genesis"',
    'routeActivationEligibility: "ELIGIBLE"',
    'routeIntegrationStatus: "AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION"',
    'fixtureSourceStatus: "FORBIDDEN"',
    'prototypeAuthorizationStatus: "NOT_ACCEPTED"',
  ].forEach((marker) => assertIncludes("explicit route activation host contract", source.hostType, marker));
  [
    'authorizedRouteTarget: GENESIS_PRODUCTION_ROUTE_TARGET',
    'routeActivationEligibility: "ELIGIBLE"',
    '"AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION"',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    'sourceProvenance: "REAL_USER_SESSION"',
  ].forEach((marker) => assertIncludes("route guard emits explicit activation authorization", source.guard, marker));
  [
    'authorization.authorizedRouteTarget === "/genesis"',
    'authorization.routeActivationEligibility === "ELIGIBLE"',
    '"AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION"',
  ].forEach((marker) => assertIncludes("production host enforces route activation", source.host, marker));
  for (const text of [source.hostType, source.guard, source.host]) {
    assertExcludes("pending route authorization is retired", text, "FORBIDDEN_PENDING_EXPLICIT_ROUTE_ACTIVATION");
  }

  assertIncludes("guard still owns no route registration", source.routeType, "noRouteRegistration: true");
  assertIncludes("formal route target is registered", source.routes, 'genesis: "/genesis"');
  assertIncludes("App mounts the guarded route entry", source.app, "GenesisProductionRouteEntry");
  assertIncludes("AppShell grants Genesis fullscreen", source.shell, 'location.pathname === "/genesis"');
  assertIncludes("Launch resolves the explicit Genesis handoff", source.launch, "resolveLaunchGenesisProductionRouteHandoff");
  assertIncludes("Launch navigates only to the authorized handoff target", source.launch, "navigate(handoff.routeTarget)");
  assertExcludes("Launch does not hardcode Genesis navigation", source.launch, 'navigate("/genesis"');

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes("explicit activation gate is registered", packageJson.scripts?.["check-genesis-explicit-route-activation-authorization"] ?? "", "node scripts/check-genesis-explicit-route-activation-authorization.mjs");

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(entryPath, `export * from ${JSON.stringify(path.join(rootDir, paths.host))};`);
  await build({ entryPoints: [entryPath], outfile: outPath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const baseAuthorization = {
    classification: "PRODUCTION",
    authorizedRouteTarget: "/genesis",
    routeActivationEligibility: "ELIGIBLE",
    authorizedTarget: "GENESIS_PRODUCTION_RENDERER_HOST",
    authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE",
    authorizedSourceMode: "REAL_USER_EXPERIENCE",
    authorizedSourceProvenance: "REAL_USER_SESSION",
    authorizedSourceReferenceId: "launch:route-activation",
    productionRenderingStatus: "AUTHORIZED",
    formalUserSourceStatus: "AUTHORIZED",
    fixtureSourceStatus: "FORBIDDEN",
    prototypeAuthorizationStatus: "NOT_ACCEPTED",
    routeIntegrationStatus: "AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION",
    fallbackRequired: true,
  };
  const hostInput = { canvas: null, width: 1, height: 1, pixelRatio: 1, reducedMotion: false, consumerSourceResult: null };
  const legacyAttempt = runtime.createGenesisProductionRendererHost({
    ...hostInput,
    authorization: { ...baseAuthorization, authorizationId: "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V1" },
  });
  assertEqual("legacy V1 authorization is rejected", legacyAttempt.reason, "AUTHORIZATION_SCOPE_INVALID");
  const pendingAttempt = runtime.createGenesisProductionRendererHost({
    ...hostInput,
    authorization: { ...baseAuthorization, authorizationId: "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V2", routeIntegrationStatus: "FORBIDDEN_PENDING_EXPLICIT_ROUTE_ACTIVATION" },
  });
  assertEqual("pending route authorization is rejected", pendingAttempt.reason, "AUTHORIZATION_SCOPE_INVALID");
  const explicitAttempt = runtime.createGenesisProductionRendererHost({
    ...hostInput,
    authorization: { ...baseAuthorization, authorizationId: "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V2" },
  });
  assertEqual("explicit authorization reaches source boundary", explicitAttempt.reason, "SOURCE_NOT_READY");

  console.log("\n[GENESIS EXPLICIT ROUTE ACTIVATION AUTHORIZATION] PASS");
} catch (error) {
  console.error("[GENESIS EXPLICIT ROUTE ACTIVATION AUTHORIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
