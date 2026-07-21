import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  coreType: "src/types/genesisWebGLRendererCore.ts",
  core: "src/renderers/genesisWebGLRendererCore.ts",
  productionHost: "src/renderers/genesisProductionRendererHost.ts",
  prototype: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  packageManifest: "package.json",
});

const failures = [];
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  } else console.log(`PASS | ${name}`);
};
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name}`);
};

const sources = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => {
    const absolutePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(absolutePath)) failures.push(`${name} missing=${relativePath}`);
    return [name, fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : ""];
  }),
);

if (failures.length === 0) {
  [
    "twentyEightMansionCoordinateProjection?:",
    "mansionCoordinateField:",
    "birthCoordinateIndex: number",
    "sourceProjectionConsumed: true",
    "noMansionName: true",
  ].forEach((marker) => assertIncludes("renderer contract bridge", sources.coreType, marker));

  [
    "isMansionCoordinateProjectionValid",
    'reason: "MANSION_COORDINATE_PROJECTION_INVALID"',
    "mansionCoordinateProjection",
    "sourceProjectionConsumed: true",
    "noIdentityCalculation: true",
  ].forEach((marker) => assertIncludes("renderer consumes projection", sources.core, marker));

  [
    "SphereGeometry",
    "TorusGeometry",
    "FIRST_IMPRESSION_MOTION_CALIBRATION",
  ].forEach((marker) => assertIncludes("existing renderer remains", sources.core, marker));
  [
    "resolveStarbeastFromBirthDate",
    "GUANYAO_TWENTY_EIGHT_MANSIONS",
    "mansionResult.mansion",
  ].forEach((marker) => assertExcludes("renderer has no engine or mansion name", sources.core, marker));

  [
    "projectionBundle.twentyEightMansionCoordinateProjection",
    'sourceKind !== "REAL_ENGINE_RESULT"',
    "consumerSource.sourceReferenceId",
    'blocked("MANSION_COORDINATE_SOURCE_INVALID")',
  ].forEach((marker) => assertIncludes("production host source guard", sources.productionHost, marker));
  assertIncludes(
    "fixture preview bridge",
    sources.harness,
    "projectionBundle.twentyEightMansionCoordinateProjection",
  );
  assertIncludes(
    "prototype delegates projection",
    sources.prototype,
    "input.twentyEightMansionCoordinateProjection",
  );
  assertExcludes(
    "engine remains unmodified by bridge",
    sources.engine,
    "GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION",
  );

  const packageJson = JSON.parse(sources.packageManifest);
  assertEqual(
    "gate registered",
    packageJson.scripts?.["check-genesis-28-mansion-renderer-consumer-bridge"],
    "node scripts/check-genesis-28-mansion-renderer-consumer-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-genesis-28-mansion-renderer-bridge-"),
  );
  try {
    const outfile = path.join(tempDir, "gate.mjs");
    await build({
      stdin: {
        contents: `
          export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/renderers/genesisWebGLRendererCore.ts";
          export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A, PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B } from "./src/mocks/starBeastSceneModelFixtures.ts";
        `,
        resolveDir: rootDir,
        sourcefile: "genesis-28-mansion-renderer-bridge-gate-entry.ts",
        loader: "ts",
      },
      outfile,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    });
    const runtime = await import(`file://${outfile}?t=${Date.now()}`);

    for (const fixture of [
      runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
      runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
    ]) {
      const visualSource = fixture.visualSourceReference;
      const coordinateProjection =
        visualSource.projectionBundle.twentyEightMansionCoordinateProjection;
      const scene = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
        visualSource.renderPlan,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        coordinateProjection,
      );
      assertEqual(`${fixture.fixtureId} coordinate field count`, scene.mansionCoordinateField.coordinateCount, 28);
      assertEqual(
        `${fixture.fixtureId} active coordinate index`,
        scene.mansionCoordinateField.birthCoordinateIndex,
        coordinateProjection.birthMansion.mansionIndex,
      );
      assertEqual(
        `${fixture.fixtureId} projection reference preserved`,
        scene.mansionCoordinateField.coordinates,
        coordinateProjection.coordinates,
      );
      assertEqual(`${fixture.fixtureId} no mansion name`, scene.mansionCoordinateField.noMansionName, true);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

if (failures.length > 0) {
  console.error("\nGenesis 28 Mansion Renderer Consumer Bridge gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGenesis 28 Mansion Renderer Consumer Bridge gate passed.");
