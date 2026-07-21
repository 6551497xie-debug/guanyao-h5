import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/genesisTwentyEightMansionCoordinateProjection.ts",
  service: "src/services/genesisTwentyEightMansionCoordinateProjection.ts",
  adapterType: "src/types/realLifeVisualSourceAdapter.ts",
  adapter: "src/services/realLifeVisualSourceAdapter.ts",
  rendererType: "src/types/genesisWebGLRendererCore.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  alignment: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md",
  checkSpec: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_CHECK_SPEC.md",
  packageManifest: "package.json",
});

const failures = [];
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  } else {
    console.log(`PASS | ${name}`);
  }
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
  Object.entries(paths).map(([name, relativePath]) => {
    const absolutePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(absolutePath)) failures.push(`${name} missing=${relativePath}`);
    return [name, fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : ""];
  }),
);

if (failures.length === 0) {
  [
    "coordinateCount: 28",
    'coordinateSystem: "GENESIS_NORMALIZED_MANSION_ORBIT"',
    "existingMansionResultOnly: true",
    "noMansionCalculation: true",
    "noAstronomicalMeasurementClaim: true",
    "noRendererInputMutation: true",
    "noVisualCalibrationMutation: true",
  ].forEach((marker) => assertIncludes("coordinate contract", sources.type, marker));

  [
    "projectGenesisTwentyEightMansionCoordinates",
    "mansionReference.resultReference",
    "mansionResult.mansionIndex",
    "coordinateIndex / COORDINATE_COUNT",
    "isBirthMansionCoordinate",
  ].forEach((marker) => assertIncludes("existing result projection", sources.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "guanyaoStarbeastEngineService",
    "Date.now",
    "Math.random",
  ].forEach((marker) => assertExcludes("projection has no engine or fallback", sources.service, marker));

  assertIncludes(
    "adapter carries coordinate projection",
    sources.adapterType,
    "twentyEightMansionCoordinateProjection",
  );
  assertIncludes(
    "adapter consumes projection service",
    sources.adapter,
    "projectGenesisTwentyEightMansionCoordinates",
  );
  assertExcludes(
    "renderer input remains unchanged",
    sources.rendererType,
    "TwentyEightMansionCoordinate",
  );
  assertExcludes(
    "renderer implementation remains unchanged",
    sources.renderer,
    "twentyEightMansionCoordinateProjection",
  );
  assertIncludes("world model baseline referenced", sources.alignment, "既有 Mansion Result");
  assertIncludes("alignment check referenced", sources.checkSpec, "二十八宿坐标显化专项检查");

  const packageJson = JSON.parse(sources.packageManifest);
  assertEqual(
    "gate registered",
    packageJson.scripts?.["check-genesis-28-mansion-coordinate-projection"],
    "node scripts/check-genesis-28-mansion-coordinate-projection.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-genesis-28-mansion-coordinate-"),
  );
  try {
    const outfile = path.join(tempDir, "gate.mjs");
    await build({
      stdin: {
        contents: `
          export { projectGenesisTwentyEightMansionCoordinates } from "./src/services/genesisTwentyEightMansionCoordinateProjection.ts";
          export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A, PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B } from "./src/mocks/starBeastSceneModelFixtures.ts";
        `,
        resolveDir: rootDir,
        sourcefile: "genesis-28-mansion-coordinate-gate-entry.ts",
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
      const projection =
        visualSource.projectionBundle.twentyEightMansionCoordinateProjection;
      const active = projection.coordinates.filter(
        (coordinate) => coordinate.isBirthMansionCoordinate,
      );
      assertEqual(`${fixture.fixtureId} coordinate count`, projection.coordinates.length, 28);
      assertEqual(`${fixture.fixtureId} active coordinate count`, active.length, 1);
      assertEqual(
        `${fixture.fixtureId} active mansion index`,
        active[0].coordinateIndex,
        visualSource.sourceIdentity.mansionResultReference.resultReference
          .mansionIndex,
      );
      assertEqual(
        `${fixture.fixtureId} mansion provenance`,
        projection.birthMansion.mansion,
        visualSource.provenance.mansion,
      );
      assertEqual(`${fixture.fixtureId} projection frozen`, Object.isFrozen(projection), true);
      assertEqual(`${fixture.fixtureId} coordinates frozen`, Object.isFrozen(projection.coordinates), true);
      assertEqual(`${fixture.fixtureId} source trace`, projection.sourceReferenceId, fixture.fixtureId);
    }

    const fixtureSource =
      runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.visualSourceReference;
    const invalid = runtime.projectGenesisTwentyEightMansionCoordinates({
      sourceKind: "ISOLATED_FIXTURE_ENGINE_RESULT",
      sourceReferenceId: "invalid-index",
      mansionResultReference: Object.freeze({
        ...fixtureSource.sourceIdentity.mansionResultReference,
        resultReference: Object.freeze({
          ...fixtureSource.sourceIdentity.mansionResultReference
            .resultReference,
          mansionIndex: 28,
        }),
      }),
    });
    assertEqual("invalid mansion index blocked", invalid.status, "BLOCKED");
    assertEqual("invalid mansion index reason", invalid.reason, "MANSION_COORDINATE_INDEX_INVALID");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

if (failures.length > 0) {
  console.error("\nGenesis 28 Mansion Coordinate Projection gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGenesis 28 Mansion Coordinate Projection gate passed.");
