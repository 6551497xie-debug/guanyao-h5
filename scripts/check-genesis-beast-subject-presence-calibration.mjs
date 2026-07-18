import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPerspectiveCalibration.ts",
  service: "src/services/genesisPerspectiveCalibration.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
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
    "BEAST_SUBJECT_FORMATION",
    "PRESENCE_RECOGNITION",
    "subjectAxisStrength",
    "bodyCohesion",
    "presenceBreath",
    "subjectForeground",
    "completionStillness",
    "recognitionStability",
    "noSemanticMutation",
    "isolatedPrototypeOnly",
  ].forEach((marker) => assertIncludes("P18-C subject contract", source.type, marker));

  [
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "BEAST_SUBJECT_FORMATION",
    "PRESENCE_RECOGNITION",
    "P18_LAYER_OUT_OF_SCOPE",
    "balanceByLayer",
  ].forEach((marker) => assertIncludes("P18-C subject mapping", source.service, marker));

  [
    "perspectiveSubjectAxisStrength",
    "perspectiveBodyCohesion",
    "perspectivePresenceBreath",
    "perspectiveSubjectForeground",
    "perspectiveCompletionStillness",
    "perspectiveRecognitionStability",
    "subjectForegroundScale",
    "structureGroup.position.z",
    "bodyFieldPositions",
    "bodyFieldMaterial",
    "bodyField.visible",
    "isStarBeastReveal",
    "isCompletion",
  ].forEach((marker) => assertIncludes("P18-C renderer projection", source.renderer, marker));

  [
    "IdentitySource",
    "Birth Data",
    "MotherCode",
    "LifeArchetype",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
    "AnimalType",
    "CreatureClass",
  ].forEach((marker) => assertExcludes("P18-C renderer boundary", source.renderer, marker));

  assertIncludes(
    "P18-C standalone gate registered",
    packageJson.scripts?.["check-genesis-beast-subject-presence-calibration"] ?? "",
    "node scripts/check-genesis-beast-subject-presence-calibration.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-beast-subject-presence-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisPerspectiveCalibration } from "./src/services/genesisPerspectiveCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-beast-subject-presence-gate-entry.ts",
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
    visualExpressionMode:
      activeVisualLayer === "STAR_BEAST_REVEAL" ? "LIFE_PRESENCE" : "RECOGNITION_HOLD",
    transitionProgress: 0.82,
    environmentalState: Object.freeze({
      cosmicDepth: "LIFE_PRESENCE_SPACE",
      moonlight: "MOONLIGHT_STABLE",
      stellarOrder: "LIFE_PRESENCE_RELATIONS",
      temporalResponse: "LIFE_PRESENCE_BREATH",
    }),
    focalElementState: Object.freeze({
      focalElement: activeVisualLayer === "STAR_BEAST_REVEAL" ? "LIFE_PRESENCE" : "RECOGNITION_HOLD",
      coreLightSuppression: 0.32,
      ambientFocus: 0.96,
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
    ["STAR_BEAST_REVEAL", "BEAST_SUBJECT_FORMATION"],
    ["COMPLETION", "PRESENCE_RECOGNITION"],
  ]) {
    const result = runtime.mapGenesisPerspectiveCalibration({
      visualRealization: realizationFor(stage),
    });
    assertEqual(`${stage} subject calibration ready`, result.status, "READY");
    if (result.status === "READY") {
      assertEqual(`${stage} calibrated subject layer`, result.calibration.activeVisualLayer, expectedLayer);
      assertEqual(`${stage} remains identity blind`, result.calibration.noIdentity, true);
      assertEqual(`${stage} remains isolated`, result.calibration.isolatedPrototypeOnly, true);
    }
  }
}

if (failures.length > 0) {
  console.error("\nGenesis beast subject presence calibration gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nGenesis beast subject presence calibration gate passed.");
}
