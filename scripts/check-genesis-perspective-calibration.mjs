import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPerspectiveCalibration.ts",
  service: "src/services/genesisPerspectiveCalibration.ts",
  rendererType: "src/types/isolatedWebGLRendererPrototype.ts",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name} | includes=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]),
);
for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "TAIYIN_MOTHER_COSMOS",
    "MOON_MOTHER_STAR_ORDER_TIME_RESPONSE",
    "TAIYIN_TEMPORAL_MOTHER",
    "COSMIC_ORDER_FIELD",
    "LIFE_RESPONSE_TO_COSMOS",
    "presenceBalance",
    "SYMBOLIC_FORMATION",
    "CHANGE_MEMORY",
    "LIFE_MOVEMENT",
    "lifeAxisStrength",
    "morphologicalTension",
    "memorySedimentation",
    "forceRhythm",
    "innerMotionDifference",
    "formationContinuity",
    "noSemanticMutation",
    "isolatedPrototypeOnly",
  ].forEach((marker) => assertIncludes("P18 perspective type", source.type, marker));

  [
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "SYMBOLIC_FORMATION",
    "CHANGE_MEMORY",
    "LIFE_MOVEMENT",
    "P18_LAYER_OUT_OF_SCOPE",
    "balanceByLayer",
    "PERSPECTIVE_BOUNDARY_INVALID",
    "TAIYIN_MOTHER_COSMOS",
  ].forEach((marker) => assertIncludes("P18 perspective service", source.service, marker));

  [
    "genesisPerspectiveCalibration",
    "perspectiveMoonWeight",
    "perspectiveStarWeight",
    "perspectiveTimeWeight",
    "perspectiveCoreSuppression",
    "perspectiveBackgroundDepth",
    "perspectiveResponseIntensity",
    "perspectiveLifeAxisStrength",
    "perspectiveMorphologicalTension",
    "perspectiveMemorySedimentation",
    "perspectiveForceRhythm",
    "perspectiveInnerMotionDifference",
    "perspectiveFormationContinuity",
  ].forEach((marker) => assertIncludes("P18 renderer weighting", source.renderer, marker));

  [
    "genesisPerspectiveCalibration?: GenesisPerspectiveCalibration | null",
    "genesisPerspectiveCalibration: GenesisPerspectiveCalibration | null",
  ].forEach((marker) => assertIncludes("P18 renderer input boundary", source.rendererType, marker));

  [
    "mapGenesisPerspectiveCalibration",
    "rendererPerspectiveCalibration",
    "genesisPerspectiveCalibration: rendererPerspectiveCalibration",
    "data-genesis-perspective-calibration",
  ].forEach((marker) => assertIncludes("P18 isolated harness", source.harness, marker));

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "localStorage",
    "sessionStorage",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
  ].forEach((marker) => {
    assertExcludes("P18 perspective service boundary", source.service, marker);
    assertExcludes("P18 renderer identity boundary", source.renderer, marker);
  });

  assertIncludes(
    "P18 standalone gate registered",
    packageJson.scripts?.["check-genesis-perspective-calibration"] ?? "",
    "node scripts/check-genesis-perspective-calibration.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-perspective-calibration-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisPerspectiveCalibration } from "./src/services/genesisPerspectiveCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-perspective-calibration-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const realizationFor = (activeVisualLayer, transitionProgress = 0.5) => Object.freeze({
    activeVisualLayer,
    visualExpressionMode:
      activeVisualLayer === "MOON_ORIGIN"
        ? "TAIYIN_MOON_ENTRY"
        : activeVisualLayer === "STAR_RIVER"
          ? "ORDERED_STAR_RIVER"
          : activeVisualLayer === "TIME_RESONANCE"
            ? "TIME_RESONANCE"
            : "SYMBOLIC_FIELD",
    transitionProgress,
    environmentalState: Object.freeze({
      cosmicDepth: "DEEP_LAYERED_COSMOS",
      moonlight: "SOFT_TAIYIN_FIELD",
      stellarOrder: "ORDERED_RELATIONS",
      temporalResponse: "SLOW_DRIFT",
    }),
    focalElementState: Object.freeze({
      focalElement: "MOON_DISC",
      coreLightSuppression: 0.7,
      ambientFocus: 0.5,
    }),
    rendererOnly: true,
    visualStateConsumed: true,
    runtimeConsumed: true,
    timelineConsumed: true,
    identityBlind: true,
    noIdentity: true,
    noEngineInvocation: true,
    noVisualStateMutation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    noLifeFactCopy: true,
    noRendererSemanticCreation: true,
    isolatedPrototypeOnly: true,
  });

  for (const layer of ["MOON_ORIGIN", "STAR_RIVER", "TIME_RESONANCE"]) {
    const result = runtime.mapGenesisPerspectiveCalibration({
      visualRealization: realizationFor(layer),
    });
    assertEqual(`${layer} perspective calibration`, result.status, "READY");
    if (result.status === "READY") {
      assertEqual(`${layer} focal hierarchy`, result.calibration.focalHierarchy, "MOON_MOTHER_STAR_ORDER_TIME_RESPONSE");
      assertEqual(`${layer} remains isolated`, result.calibration.isolatedPrototypeOnly, true);
    }
  }
  for (const [layer, expectedCalibrationLayer] of [
    ["SYMBOL_REVEAL", "SYMBOLIC_FORMATION"],
    ["HEXAGRAM_IMPRINT", "CHANGE_MEMORY"],
    ["LIFE_FORCE", "LIFE_MOVEMENT"],
  ]) {
    const formation = runtime.mapGenesisPerspectiveCalibration({
      visualRealization: realizationFor(layer),
    });
    assertEqual(`${layer} life presence calibration`, formation.status, "READY");
    if (formation.status === "READY") {
      assertEqual(`${layer} calibrated layer`, formation.calibration.activeVisualLayer, expectedCalibrationLayer);
      assertEqual(`${layer} remains isolated`, formation.calibration.isolatedPrototypeOnly, true);
    }
  }
  const outOfScope = runtime.mapGenesisPerspectiveCalibration({
    visualRealization: realizationFor("STAR_BEAST_REVEAL"),
  });
  assertEqual("beast layer remains out of P18-B scope", outOfScope.status, "BLOCKED");
  if (outOfScope.status === "BLOCKED") {
    assertEqual("beast layer block reason", outOfScope.reason, "P18_LAYER_OUT_OF_SCOPE");
  }
  const invalidProgress = runtime.mapGenesisPerspectiveCalibration({
    visualRealization: realizationFor("MOON_ORIGIN", 1.2),
  });
  assertEqual("invalid progress blocked", invalidProgress.status, "BLOCKED");
}

if (failures.length > 0) {
  console.error("\nGenesis perspective calibration gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nGenesis perspective calibration gate passed.");
}
