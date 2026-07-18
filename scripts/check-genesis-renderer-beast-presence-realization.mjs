import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRendererVisualRealization.ts",
  service: "src/services/genesisRendererVisualRealization.ts",
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
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "LIFE_PRESENCE",
    "RECOGNITION_HOLD",
    "LIFE_PRESENCE_SPACE",
    "STABLE_COSMOS",
    "LIFE_PRESENCE_RELATIONS",
    "STABLE_RELATIONS",
    "LIFE_PRESENCE_BREATH",
    "RECOGNITION_HOLD",
  ].forEach((marker) => assertIncludes("P17-C realization type", source.type, marker));

  [
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "LIFE_PRESENCE",
    "RECOGNITION_HOLD",
    "genesisLayerOnly",
    "P17_C_LAYER_OUT_OF_SCOPE",
  ].forEach((marker) => assertIncludes("P17-C realization service", source.service, marker));

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
    "AnimalType",
    "CreatureClass",
  ].forEach((marker) => {
    assertExcludes("P17-C identity and animal boundary", source.service, marker);
    assertExcludes("P17-C renderer identity and animal boundary", source.renderer, marker);
  });

  [
    "isStarBeastReveal",
    "isCompletion",
    "isPresenceStage",
    "presenceRotation",
    "presenceScale",
    "coreStageOpacity",
  ].forEach((marker) => assertIncludes("P17-C renderer realization", source.renderer, marker));

  [
    "data-genesis-preview-mode=\"ISOLATED_GENESIS_PREVIEW\"",
    "genesisVisualRealization: rendererVisualRealization",
  ].forEach((marker) => assertIncludes("P17-C isolated harness", source.harness, marker));

  assertIncludes(
    "P17-C standalone gate registered",
    packageJson.scripts?.["check-genesis-renderer-beast-presence-realization"] ?? "",
    "node scripts/check-genesis-renderer-beast-presence-realization.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-renderer-beast-presence-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisRendererVisualRealization } from "./src/services/genesisRendererVisualRealization.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-renderer-beast-presence-gate-entry.ts",
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
  const visualReferenceState = Object.freeze({
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });
  const completionReferenceState = Object.freeze({
    runtimeBoundary: Object.freeze({
      genesisLayerOnly: true,
      noIdentityMutation: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noVisualStateMutation: true,
      noRealityCalculation: true,
      noCrystal: true,
      noStorage: true,
    }),
  });
  const contractFor = (stage, renderIntent, state) => Object.freeze({
    runtimeStage: stage,
    visualStateReference: Object.freeze({
      stage,
      referenceType: `${stage}_REFERENCE`,
      state,
    }),
    timelineState: Object.freeze({
      stage,
      stageDuration: "DEEP_HOLD",
      transitionDuration: "LONG",
      rhythmProfile: "DEEP",
      transitionEasing: "QUIET_DISSOLVE",
      userPauseWindow: "OBSERVATION_WINDOW",
    }),
    renderIntent,
    transitionProgress: 0.72,
  });

  const reveal = runtime.mapGenesisRendererVisualRealization({
    rendererConsumerContract: contractFor(
      "STAR_BEAST_REVEAL",
      "LIFE_PRESENCE",
      visualReferenceState,
    ),
  });
  assertEqual("兽层 realization is ready", reveal.status, "READY");
  if (reveal.status === "READY") {
    assertEqual("兽层 expression mode", reveal.realization.visualExpressionMode, "LIFE_PRESENCE");
    assertEqual("兽层 focal element", reveal.realization.focalElementState.focalElement, "LIFE_PRESENCE");
    assertEqual("兽层 remains isolated", reveal.realization.isolatedPrototypeOnly, true);
  }

  const completion = runtime.mapGenesisRendererVisualRealization({
    rendererConsumerContract: contractFor(
      "COMPLETION",
      "RECOGNITION_HOLD",
      completionReferenceState,
    ),
  });
  assertEqual("Completion realization is ready", completion.status, "READY");
  if (completion.status === "READY") {
    assertEqual("Completion expression mode", completion.realization.visualExpressionMode, "RECOGNITION_HOLD");
    assertEqual("Completion focal element", completion.realization.focalElementState.focalElement, "RECOGNITION_HOLD");
    assertEqual("Completion remains isolated", completion.realization.isolatedPrototypeOnly, true);
  }

  for (const [stage, intent] of [
    ["SYMBOL_REVEAL", "SYMBOLIC_FIELD"],
    ["HEXAGRAM_IMPRINT", "CHANGE_IMPRINT"],
    ["LIFE_FORCE", "LIFE_FORCE_MOTION"],
  ]) {
    const continuity = runtime.mapGenesisRendererVisualRealization({
      rendererConsumerContract: contractFor(stage, intent, visualReferenceState),
    });
    assertEqual(`${stage} continuity remains ready`, continuity.status, "READY");
  }
}

if (failures.length > 0) {
  console.error("\nGenesis renderer beast presence realization gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nGenesis renderer beast presence realization gate passed.");
}
