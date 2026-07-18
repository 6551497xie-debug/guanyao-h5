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
  typeIndex: "src/types/index.ts",
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
    "GenesisRendererVisualRealization",
    "activeVisualLayer",
    "visualExpressionMode",
    "environmentalState",
    "focalElementState",
    "rendererOnly: true",
    "visualStateConsumed: true",
    "runtimeConsumed: true",
    "timelineConsumed: true",
    "identityBlind: true",
    "isolatedPrototypeOnly: true",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
  ].forEach((marker) => assertIncludes("P17-A realization type", source.type, marker));

  [
    "mapGenesisRendererVisualRealization",
    "GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY",
    "TAIYIN_MOON_ENTRY",
    "ORDERED_STAR_RIVER",
    "TIME_RESONANCE",
    "MOON_DISC",
    "STELLAR_RELATIONS",
    "TIME_ALIGNMENT",
    "P17_A_LAYER_OUT_OF_SCOPE",
    "CONSUMER_BOUNDARY_INVALID",
    "TRANSITION_PROGRESS_INVALID",
  ].forEach((marker) => assertIncludes("P17-A realization service", source.service, marker));

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) => assertExcludes("P17-A realization remains expression-only", source.service, marker));

  [
    "GenesisRendererVisualRealization",
    "GenesisRendererVisualRealizationInput",
    "GenesisRendererVisualRealizationResult",
    "GenesisRendererVisualRealizationBoundary",
    "from \"./genesisRendererVisualRealization\"",
  ].forEach((marker) => assertIncludes("P17-A type index export", source.typeIndex, marker));

  [
    "genesisVisualRealization",
    "activeVisualLayer",
    "isMoonOrigin",
    "isStarRiver",
    "isTimeResonance",
    "cosmicParticleCount",
    "structureOpacityScale",
    "coreRadius",
    "coreLight.intensity",
    "cosmicField.rotation.z",
  ].forEach((marker) => assertIncludes("P17-A renderer realization", source.renderer, marker));

  [
    "mapGenesisRendererVisualRealization",
    "rendererVisualRealization",
    "genesisVisualRealization: rendererVisualRealization",
    "ISOLATED_GENESIS_PREVIEW",
  ].forEach((marker) => assertIncludes("P17-A isolated harness consumption", source.harness, marker));

  assertIncludes(
    "P17-A standalone gate registered",
    packageJson.scripts?.["check-genesis-renderer-visual-realization"] ?? "",
    "node scripts/check-genesis-renderer-visual-realization.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-renderer-visual-realization-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisRendererVisualRealization } from "./src/services/genesisRendererVisualRealization.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-renderer-visual-realization-gate-entry.ts",
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
    noRendererInvocation: true,
  });
  const contractFor = (stage, renderIntent) => Object.freeze({
    runtimeStage: stage,
    visualStateReference: Object.freeze({
      stage,
      referenceType: "MOON_ORIGIN_VISUAL_STATE",
      state: referenceState,
    }),
    timelineState: Object.freeze({
      stage,
      stageDuration: "DEEPLY_HELD",
      transitionDuration: "LONG",
      rhythmProfile: "DEEP",
      transitionEasing: "QUIET_DISSOLVE",
      userPauseWindow: "OBSERVATION_WINDOW",
    }),
    renderIntent,
    transitionProgress: 0.5,
  });

  for (const [stage, mode, focal] of [
    ["MOON_ORIGIN", "TAIYIN_MOON_ENTRY", "MOON_DISC"],
    ["STAR_RIVER", "ORDERED_STAR_RIVER", "STELLAR_RELATIONS"],
    ["TIME_RESONANCE", "TIME_RESONANCE", "TIME_ALIGNMENT"],
  ]) {
    const result = runtime.mapGenesisRendererVisualRealization({
      rendererConsumerContract: contractFor(stage, mode === "TAIYIN_MOON_ENTRY" ? "TAIYIN_ENTRY" : mode === "ORDERED_STAR_RIVER" ? "STELLAR_ORDER" : "TIME_RESPONSE"),
    });
    assertEqual(`${stage} realization is ready`, result.status, "READY");
    if (result.status === "READY") {
      assertEqual(`${stage} mode`, result.realization.visualExpressionMode, mode);
      assertEqual(`${stage} focal`, result.realization.focalElementState.focalElement, focal);
    }
  }
  const outOfScope = runtime.mapGenesisRendererVisualRealization({
    rendererConsumerContract: contractFor("SYMBOL_REVEAL", "SYMBOLIC_FIELD"),
  });
  assertEqual("later layers stay out of P17-A", outOfScope.status, "BLOCKED");
  if (outOfScope.status === "BLOCKED") {
    assertEqual("later layer reason", outOfScope.reason, "P17_A_LAYER_OUT_OF_SCOPE");
  }
  const invalidProgress = runtime.mapGenesisRendererVisualRealization({
    rendererConsumerContract: Object.freeze({
      ...contractFor("MOON_ORIGIN", "TAIYIN_ENTRY"),
      transitionProgress: 1.5,
    }),
  });
  assertEqual("invalid progress is blocked", invalidProgress.status, "BLOCKED");
  if (invalidProgress.status === "BLOCKED") {
    assertEqual("invalid progress reason", invalidProgress.reason, "TRANSITION_PROGRESS_INVALID");
  }
}

if (failures.length > 0) {
  console.error("\nGenesis renderer visual realization gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nGenesis renderer visual realization gate passed.");
}
