import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  calibrationType:
    "src/types/genesisLifeArchetypeForceCondensationVisualCalibration.ts",
  calibration:
    "src/services/genesisLifeArchetypeForceCondensationVisualCalibration.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  canvasHost: "src/components/GenesisProductionRendererCanvasHost.tsx",
  productionHost: "src/renderers/genesisProductionRendererHost.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  projection: "src/services/genesisLifeArchetypeProjection.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  starBeast: "src/services/genesisStarBeastManifestationSource.ts",
  packageManifest: "package.json",
});

const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${name} expected=${String(expected)} actual=${String(actual)}`,
    );
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

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-archetype-force-"),
);

try {
  [
    "GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION",
    '"CONDENSING"',
    "forceCondensationExpression",
    "existingLifeArchetypeProjectionOnly: true",
    "noLifeArchetypeCalculation: true",
    "noPersonalityLabel: true",
    "noArchetypeNameDisplay: true",
    "noStarBeastAmplification: true",
  ].forEach((marker) =>
    assertIncludes("archetype force calibration contract", source.calibrationType, marker),
  );
  [
    "FORCE_PROFILE_BY_ARCHETYPE",
    'activeVisualLayer === "LIFE_FORCE"',
    "directionCalibration.noFourSymbolCalculation",
    "projection.provenance.motherCodeProfileReferenceId",
    "生命力量正在凝聚为创造的倾向。",
    "生命力量正在凝聚为守护的边界。",
  ].forEach((marker) =>
    assertIncludes("existing archetype projection drives force calibration", source.calibration, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "Math.random",
    "Date.now",
  ].forEach((marker) =>
    assertExcludes("force calibration has no Engine or fallback", source.calibration, marker),
  );

  [
    "calibrateGenesisLifeArchetypeForceCondensation",
    ".lifeArchetypeProjection",
    'session.currentStage !== "LIFE_FORCE"',
    '"DIRECTION_AWAKENING"',
    '"FORCE_CONDENSING"',
    "archetypeForceCalibrationResult.calibration.responseMessage",
  ].forEach((marker) =>
    assertIncludes("production consumer activates force condensation", source.page, marker),
  );
  [
    "lifeArchetypeForceCondensationVisualCalibration",
    "data-genesis-archetype-force-phase",
  ].forEach((marker) =>
    assertIncludes("canvas host carries force calibration only", source.canvasHost, marker),
  );
  [
    "ARCHETYPE_FORCE_CALIBRATION_INVALID",
    "archetypeForceCalibration.sourceReferenceId",
    "archetypeForceCalibration.noPersonalityLabel",
    "archetypeForceCalibration.noStarBeastGeneration",
  ].forEach((marker) =>
    assertIncludes("production host validates archetype continuity", source.productionHost, marker),
  );
  assertExcludes(
    "production host does not consume archetype source projection",
    source.productionHost,
    "lifeArchetypeProjection",
  );
  [
    "forceCondensationGroup",
    "forceCondensationMaterials",
    "forceCondensationExpression.density",
    "forceCondensationExpression.formAspectRatio",
    "new TorusGeometry",
  ].forEach((marker) =>
    assertIncludes("renderer realizes archetype as abstract force", source.renderer, marker),
  );
  assertExcludes(
    "renderer remains archetype identity blind",
    source.renderer,
    "lifeArchetypeProjection",
  );
  ["创世者", "承载者", "行动者", "渗透者", "深潜者", "照见者", "守望者", "连接者"].forEach(
    (marker) => assertExcludes("renderer has no archetype label", source.renderer, marker),
  );
  assertExcludes(
    "source projection stays free of force visual parameters",
    source.projection,
    "forceCondensationExpression",
  );
  assertExcludes(
    "Engine stays free of force condensation visual calibration",
    source.engine,
    "ForceCondensationVisualCalibration",
  );
  assertExcludes(
    "StarBeast source is not amplified by force condensation",
    source.starBeast,
    "ForceCondensationVisualCalibration",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "archetype force realization gate is registered",
    packageJson.scripts?.[
      "check-genesis-life-archetype-force-condensation-visual-realization"
    ],
    "node scripts/check-genesis-life-archetype-force-condensation-visual-realization.mjs",
  );

  const outPath = path.join(tempDir, "archetype-force-gate.mjs");
  await build({
    stdin: {
      contents: `export { calibrateGenesisLifeArchetypeForceCondensation } from "./src/services/genesisLifeArchetypeForceCondensationVisualCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-archetype-force-gate-entry.ts",
      loader: "ts",
    },
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:archetype-force";
  const directionProjection = Object.freeze({
    semanticRole: "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION",
    sourceReferenceId,
    direction: "东",
  });
  const directionCalibration = Object.freeze({
    semanticRole: "GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION",
    sourceReferenceId,
    direction: "东",
    noFourSymbolCalculation: true,
  });
  const createProjection = (lifeArchetype) =>
    Object.freeze({
      semanticRole: "GENESIS_LIFE_ARCHETYPE_PROJECTION",
      sourceReferenceId,
      fourSymbolDirectionReference: directionProjection,
      lifeArchetype,
      provenance: Object.freeze({
        sourceReferenceId,
        fourSymbolDirectionSourceReferenceId: sourceReferenceId,
        motherCodeProfileReferenceId: "mother-code:real-user",
        lifeArchetypeSource: "mother_code_profile",
      }),
      noLifeArchetypeCalculation: true,
      noFallback: true,
    });

  const codes = ["QIAN", "KUN", "ZHEN", "XUN", "KAN", "LI", "GEN", "DUI"];
  const signatures = new Set();
  for (const code of codes) {
    const result = runtime.calibrateGenesisLifeArchetypeForceCondensation({
      lifeArchetypeProjection: createProjection(code),
      directionFieldCalibration: directionCalibration,
      activeVisualLayer: "LIFE_FORCE",
    });
    assertEqual(`${code} force calibration is available`, result.status, "AVAILABLE");
    assertEqual(`${code} condenses at Life Force layer`, result.calibration.phase, "CONDENSING");
    assertEqual(`${code} keeps MotherCode provenance`, result.calibration.provenance.lifeArchetypeSource, "mother_code_profile");
    assertEqual(`${code} exposes no archetype name`, "archetypeName" in result.calibration, false);
    signatures.add(JSON.stringify(result.calibration.forceCondensationExpression));
  }
  assertEqual("eight archetypes retain eight force expressions", signatures.size, 8);
  const hidden = runtime.calibrateGenesisLifeArchetypeForceCondensation({
    lifeArchetypeProjection: createProjection("QIAN"),
    directionFieldCalibration: directionCalibration,
    activeVisualLayer: "HEXAGRAM_IMPRINT",
  });
  assertEqual("force stays hidden before Direction Awakening", hidden.calibration.phase, "HIDDEN");
  assertEqual("hidden force has zero opacity", hidden.calibration.forceCondensationExpression.ringOpacity, 0);
  const mismatchedDirection = runtime.calibrateGenesisLifeArchetypeForceCondensation({
    lifeArchetypeProjection: createProjection("QIAN"),
    directionFieldCalibration: Object.freeze({
      ...directionCalibration,
      sourceReferenceId: "launch:other-user",
    }),
    activeVisualLayer: "LIFE_FORCE",
  });
  assertEqual("mismatched source cannot condense force", mismatchedDirection.status, "UNAVAILABLE");
  assertEqual("missing archetype cannot produce default force", runtime.calibrateGenesisLifeArchetypeForceCondensation({ lifeArchetypeProjection: null, directionFieldCalibration: directionCalibration, activeVisualLayer: "LIFE_FORCE" }).status, "UNAVAILABLE");

  console.log("\n[GENESIS LIFE ARCHETYPE FORCE CONDENSATION VISUAL REALIZATION] PASS");
} catch (error) {
  console.error("[GENESIS LIFE ARCHETYPE FORCE CONDENSATION VISUAL REALIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
