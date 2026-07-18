import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRendererVisualRealization.ts",
  service: "src/services/genesisRendererVisualRealization.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  previousGate: "scripts/check-genesis-renderer-visual-realization.mjs",
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
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "SYMBOLIC_FIELD",
    "CHANGE_IMPRINT",
    "LIFE_FORCE_MOTION",
    "MORPHOLOGICAL_RELATIONS",
    "CHANGE_SEDIMENTATION",
    "FORCE_RESPONSIVE",
    "SYMBOLIC_AGGREGATION",
    "LIFE_FORCE_AWAKENING",
  ].forEach((marker) => assertIncludes("P17-B realization type", source.type, marker));

  [
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "SYMBOLIC_FIELD",
    "CHANGE_IMPRINT",
    "LIFE_FORCE_MOTION",
    "P17_C_LAYER_OUT_OF_SCOPE",
  ].forEach((marker) => assertIncludes("P17-B realization service", source.service, marker));

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
  ].forEach((marker) => assertExcludes("P17-B remains expression-only", source.service, marker));

  [
    "isSymbolReveal",
    "isHexagramImprint",
    "isLifeForce",
    "structureOpacityScale",
    "symbolicFieldScale",
    "changeImprintScale",
    "lifeForceScale",
    "imprintTraceGroup",
  ].forEach((marker) => assertIncludes("P17-B renderer realization", source.renderer, marker));

  assertIncludes(
    "P17-B standalone gate registered",
    packageJson.scripts?.["check-genesis-renderer-symbol-force-realization"] ?? "",
    "node scripts/check-genesis-renderer-symbol-force-realization.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-renderer-symbol-force-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisRendererVisualRealization } from "./src/services/genesisRendererVisualRealization.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-renderer-symbol-force-gate-entry.ts",
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
  const referenceState = Object.freeze({
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });
  const contractFor = (stage, renderIntent) => Object.freeze({
    runtimeStage: stage,
    visualStateReference: Object.freeze({
      stage,
      referenceType: `${stage}_VISUAL_STATE`,
      state: referenceState,
    }),
    timelineState: Object.freeze({
      stage,
      stageDuration: "FLOW_HELD",
      transitionDuration: "LONG",
      rhythmProfile: "FLOW",
      transitionEasing: "QUIET_DISSOLVE",
      userPauseWindow: "OBSERVATION_WINDOW",
    }),
    renderIntent,
    transitionProgress: 0.5,
  });

  for (const [stage, intent, mode, focal] of [
    ["SYMBOL_REVEAL", "SYMBOLIC_FIELD", "SYMBOLIC_FIELD", "SYMBOLIC_FIELD"],
    ["HEXAGRAM_IMPRINT", "CHANGE_IMPRINT", "CHANGE_IMPRINT", "CHANGE_IMPRINT"],
    ["LIFE_FORCE", "LIFE_FORCE_MOTION", "LIFE_FORCE_MOTION", "LIFE_FORCE"],
  ]) {
    const result = runtime.mapGenesisRendererVisualRealization({
      rendererConsumerContract: contractFor(stage, intent),
    });
    assertEqual(`${stage} realization is ready`, result.status, "READY");
    if (result.status === "READY") {
      assertEqual(`${stage} expression mode`, result.realization.visualExpressionMode, mode);
      assertEqual(`${stage} focal element`, result.realization.focalElementState.focalElement, focal);
      assertEqual(`${stage} isolated boundary`, result.realization.isolatedPrototypeOnly, true);
    }
  }

  for (const [stage, intent] of [
    ["MOON_ORIGIN", "TAIYIN_ENTRY"],
    ["STAR_RIVER", "STELLAR_ORDER"],
    ["TIME_RESONANCE", "TIME_RESPONSE"],
  ]) {
    const result = runtime.mapGenesisRendererVisualRealization({
      rendererConsumerContract: contractFor(stage, intent),
    });
    assertEqual(`${stage} P17-A compatibility`, result.status, "READY");
  }

  const beast = runtime.mapGenesisRendererVisualRealization({
    rendererConsumerContract: contractFor("UNKNOWN", "RECOGNITION_HOLD"),
  });
  assertEqual("兽层 remains outside P17-B", beast.status, "BLOCKED");
  if (beast.status === "BLOCKED") {
    assertEqual("later layer boundary reason", beast.reason, "P17_C_LAYER_OUT_OF_SCOPE");
  }
}

if (failures.length > 0) {
  console.error("\nGenesis renderer symbol/force realization gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nGenesis renderer symbol/force realization gate passed.");
}
