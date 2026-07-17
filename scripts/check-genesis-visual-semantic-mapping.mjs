import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisVisualSemanticMapping.ts",
  service: "src/services/genesisVisualSemanticMapping.ts",
  protocol: "docs/GUANYAO_GENESIS_VISUAL_SEMANTIC_MAPPING_PROTOCOL.md",
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
const absolute = Object.fromEntries(Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]));

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]));
  const packageJson = JSON.parse(source.packageManifest);
  [
    "GenesisVisualSemanticMapping",
    "semanticLayer",
    "visualIntent",
    "allowedExpression",
    "forbiddenExpression",
    "rendererDirection",
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
  ].forEach((marker) => assertIncludes("P0 mapping type", source.type, marker));
  [
    "export function reviewGenesisVisualSemanticMapping",
    "GENESIS_VISUAL_SEMANTIC_MAPPING_V1",
    "MAPPING_INPUT_REQUIRED",
    "MAPPING_LAYER_ORDER_INVALID",
    "MAPPING_LAYER_DUPLICATED",
    "MAPPING_BOUNDARY_INVALID",
    "ANIMAL_IDENTITY_HARDCODED",
    "noEngineInvocation",
    "noRendererInvocation",
    "noSceneModelInvocation",
    "noRenderPlanInvocation",
  ].forEach((marker) => assertIncludes("P0 mapping service", source.service, marker));
  [
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "buildSceneModel",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P0 mapping remains governance-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-VISUAL-SEMANTIC-MAPPING-PHASE-P0",
    "月｜太阴入口",
    "星｜星河秩序",
    "时｜生命时序共振",
    "象｜四象显影",
    "卦｜变化印记",
    "力｜生命原力",
    "兽｜个人星兽归来",
    "不直接出现动物",
    "禁止青龙、白虎、朱雀、玄武模型",
    "视觉不创造生命",
    "视觉只显化生命",
  ].forEach((marker) => assertIncludes("P0 protocol", source.protocol, marker));
  [
    "GenesisVisualSemanticMapping",
    "GenesisVisualSemanticMappingReviewResult",
    "GenesisVisualSemanticMappingReviewBoundary",
    "from \"./genesisVisualSemanticMapping\"",
  ].forEach((marker) => assertIncludes("P0 type index export", source.typeIndex, marker));
  assertIncludes("P0 gate registered", packageJson.scripts?.["check-genesis-visual-semantic-mapping"] ?? "", "node scripts/check-genesis-visual-semantic-mapping.mjs");
  assertIncludes("P0 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-visual-semantic-mapping");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-visual-semantic-mapping-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { GENESIS_VISUAL_SEMANTIC_MAPPING_V1, reviewGenesisVisualSemanticMapping } from "./src/services/genesisVisualSemanticMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-visual-semantic-mapping-gate-entry.ts",
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
  const ready = runtime.reviewGenesisVisualSemanticMapping(Object.freeze({ mappings: runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1 }));
  assertEqual("seven-layer mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("seven-layer mapping count", ready.mappings.length, 7);
    assertEqual("first layer is MOON", ready.mappings[0].semanticLayer, "MOON");
    assertEqual("last layer is BEAST", ready.mappings[6].semanticLayer, "BEAST");
    assertEqual("mapping is visual-only", ready.boundary.semanticMappingOnly, true);
    assertEqual("engine remains untouched", ready.boundary.engineUntouched, true);
    assertEqual("renderer remains untouched", ready.boundary.rendererUntouched, true);
  }
  const missing = runtime.reviewGenesisVisualSemanticMapping(Object.freeze({ mappings: null }));
  assertEqual("missing mapping input unavailable", missing.status, "UNAVAILABLE");
  const duplicate = runtime.reviewGenesisVisualSemanticMapping(Object.freeze({ mappings: Object.freeze([...runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1.slice(0, 6), runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1[0]]) }));
  assertEqual("duplicate layer blocked", duplicate.status, "BLOCKED");
  assertEqual("duplicate layer reason", duplicate.reason, "MAPPING_LAYER_ORDER_INVALID");
  const animal = Object.freeze({
    ...runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1[0],
    visualIntent: "白虎模型",
  });
  const animalInput = Object.freeze({ mappings: Object.freeze([animal, ...runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1.slice(1)]) });
  const animalResult = runtime.reviewGenesisVisualSemanticMapping(animalInput);
  assertEqual("animal identity is blocked", animalResult.status, "BLOCKED");
  assertEqual("animal identity reason", animalResult.reason, "ANIMAL_IDENTITY_HARDCODED");
  const boundaryResult = runtime.reviewGenesisVisualSemanticMapping(Object.freeze({
    mappings: Object.freeze([
      Object.freeze({ ...runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1[0], identityBlind: false }),
      ...runtime.GENESIS_VISUAL_SEMANTIC_MAPPING_V1.slice(1),
    ]),
  }));
  assertEqual("boundary drift is blocked", boundaryResult.status, "BLOCKED");
  assertEqual("boundary drift reason", boundaryResult.reason, "MAPPING_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis visual semantic mapping gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis visual semantic mapping gate passed.");
