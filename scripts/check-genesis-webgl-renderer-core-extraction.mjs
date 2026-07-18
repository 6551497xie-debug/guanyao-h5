import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = {
  core: "src/renderers/genesisWebGLRendererCore.ts",
  coreType: "src/types/genesisWebGLRendererCore.ts",
  prototype: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  authorization: "src/types/isolatedWebGLRendererPrototypeAuthorization.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(files).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

try {
  [
    "export function createGenesisWebGLRendererCore",
    "export function projectPersonalStarBeastRenderPlanToWebGLScene",
    "FIRST_IMPRESSION_MOTION_CALIBRATION",
    "projectPersonalStarBeastRenderPlanToLifePresence",
    "projectLifePresenceToLifeStarCore",
    'source: "genesis_webgl_renderer_core"',
    "rendererCoreOnly: true",
    "authorizationExternal: true",
    "noSourceSelection: true",
    "noAuthorizationDecision: true",
    'input.canvas.addEventListener("webglcontextlost"',
    "renderer.dispose()",
  ].forEach((marker) => assertIncludes("shared renderer core", source.core, marker));

  [
    "IsolatedWebGLRendererPrototypeAuthorization",
    "REAL_USER_EXPERIENCE",
    "FIXTURE_PREVIEW_ONLY",
    "REAL_USER_SESSION",
    "starBeastSceneModelFixtures",
    "realUserGenesisVisualSourceContext",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("core owns no source or authorization", source.core, marker));
  assertExcludes(
    "core contract does not depend on prototype contract",
    source.coreType,
    "isolatedWebGLRendererPrototype",
  );

  [
    "createGenesisWebGLRendererCore",
    'classification !== "EXPERIMENT"',
    'authorization.productionStatus !== "FORBIDDEN"',
    'authorization.uiIntegrationStatus !== "FORBIDDEN"',
    'authorization.formalUserStatus !== "FORBIDDEN"',
    'return blocked("RENDER_PLAN_NOT_AUTHORIZED")',
  ].forEach((marker) => assertIncludes("prototype facade remains isolated", source.prototype, marker));

  [
    'classification: "EXPERIMENT"',
    'productionStatus: "FORBIDDEN"',
    'formalUserStatus: "FORBIDDEN"',
    "twoPlanValidationRequired: true",
  ].forEach((marker) => assertIncludes("prototype authorization unchanged", source.authorization, marker));

  assertExcludes("production routes remain locked", source.routes, "genesisExperience");
  assertExcludes("app has no production renderer host", source.app, "GenesisProductionRenderer");
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "core extraction gate is registered",
    packageJson.scripts?.["check-genesis-webgl-renderer-core-extraction"] ?? "",
    "node scripts/check-genesis-webgl-renderer-core-extraction.mjs",
  );

  const srcRoot = path.join(rootDir, "src");
  const sources = [];
  const collect = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(file);
      else if (/\.tsx?$/.test(entry.name)) sources.push(file);
    }
  };
  collect(srcRoot);
  const coreConsumers = sources
    .filter((file) => {
      const fileSource = fs.readFileSync(file, "utf8");
      return (
        path.relative(rootDir, file) !== files.core &&
        fileSource.includes("createGenesisWebGLRendererCore") &&
        fileSource.includes("genesisWebGLRendererCore")
      );
    })
    .map((file) => path.relative(rootDir, file))
    .sort();
  assertEqual(
    "only authorized facades consume shared core",
    coreConsumers.join(","),
    [
      "src/prototypes/isolatedWebGLRendererPrototype.ts",
      "src/renderers/genesisProductionRendererHost.ts",
    ].join(","),
  );

  console.log("\n[GENESIS WEBGL RENDERER CORE EXTRACTION] PASS");
} catch (error) {
  console.error("[GENESIS WEBGL RENDERER CORE EXTRACTION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
