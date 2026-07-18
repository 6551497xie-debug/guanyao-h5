import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPerspectiveCalibration.ts",
  service: "src/services/genesisPerspectiveCalibration.ts",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (source.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]),
);
for (const [name, filePath] of Object.entries(absolute)) {
  if (fs.existsSync(filePath)) console.log(`PASS | ${name} file exists`);
  else failures.push(`${name} missing=${filePath}`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);
  [
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
  ].forEach((marker) => assertIncludes("P18-B perspective contract", source.type, marker));
  [
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "SYMBOLIC_FORMATION",
    "CHANGE_MEMORY",
    "LIFE_MOVEMENT",
    "balanceByLayer",
    "P18_LAYER_OUT_OF_SCOPE",
  ].forEach((marker) => assertIncludes("P18-B perspective mapping", source.service, marker));
  [
    "perspectiveLifeAxisStrength",
    "perspectiveMorphologicalTension",
    "perspectiveMemorySedimentation",
    "perspectiveForceRhythm",
    "perspectiveInnerMotionDifference",
    "perspectiveFormationContinuity",
    "imprintTraceGroup",
    "structureGroup",
  ].forEach((marker) => assertIncludes("P18-B renderer projection", source.renderer, marker));
  [
    "IdentitySource",
    "Birth Data",
    "MotherCode",
    "LifeArchetype",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
  ].forEach((marker) => assertExcludes("P18-B renderer boundary", source.renderer, marker));
  assertIncludes(
    "P18-B standalone gate registered",
    packageJson.scripts?.["check-genesis-life-presence-calibration"] ?? "",
    "node scripts/check-genesis-life-presence-calibration.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-life-presence-calibration-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisPerspectiveCalibration } from "./src/services/genesisPerspectiveCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-life-presence-calibration-gate-entry.ts",
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
  const realizationFor = (activeVisualLayer) => Object.freeze({
    activeVisualLayer,
    visualExpressionMode: "SYMBOLIC_FIELD",
    transitionProgress: 0.72,
    environmentalState: Object.freeze({
      cosmicDepth: "DEEP_LAYERED_COSMOS",
      moonlight: "SOFT_TAIYIN_FIELD",
      stellarOrder: "ORDERED_RELATIONS",
      temporalResponse: "SLOW_DRIFT",
    }),
    focalElementState: Object.freeze({
      focalElement: "SYMBOLIC_FIELD",
      coreLightSuppression: 0.4,
      ambientFocus: 0.86,
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
  for (const [stage, expectedLayer] of [
    ["SYMBOL_REVEAL", "SYMBOLIC_FORMATION"],
    ["HEXAGRAM_IMPRINT", "CHANGE_MEMORY"],
    ["LIFE_FORCE", "LIFE_MOVEMENT"],
  ]) {
    const result = runtime.mapGenesisPerspectiveCalibration({
      visualRealization: realizationFor(stage),
    });
    assertEqual(`${stage} life formation ready`, result.status, "READY");
    if (result.status === "READY") {
      assertEqual(`${stage} calibration layer`, result.calibration.activeVisualLayer, expectedLayer);
      assertEqual(`${stage} stays isolated`, result.calibration.isolatedPrototypeOnly, true);
    }
  }
  const beast = runtime.mapGenesisPerspectiveCalibration({
    visualRealization: realizationFor("STAR_BEAST_REVEAL"),
  });
  assertEqual("beast layer not entered", beast.status, "BLOCKED");
}

if (failures.length > 0) {
  console.error("\nGenesis life presence calibration gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nGenesis life presence calibration gate passed.");
}
