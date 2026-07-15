import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const contractPath = path.join(rootDir, "src/types/starBeastRendererContract.ts");
const visualStatePath = path.join(rootDir, "src/types/starBeastVisualState.ts");
const mappingPath = path.join(rootDir, "src/services/starBeastVisualStateMapping.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const dynamicsVisualPath = path.join(rootDir, "src/types/dynamicsVisualState.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_CONTRACT_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");

const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};
const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["renderer contract", contractPath],
  ["star beast visual state", visualStatePath],
  ["star beast visual mapping", mappingPath],
  ["type index", typeIndexPath],
  ["foundation type", foundationPath],
  ["dynamics visual state", dynamicsVisualPath],
  ["renderer contract protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const contractSource = fs.readFileSync(contractPath, "utf8");
  const visualStateSource = fs.readFileSync(visualStatePath, "utf8");
  const mappingSource = fs.readFileSync(mappingPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const dynamicsVisualSource = fs.readFileSync(dynamicsVisualPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'import type { StarBeastVisualState } from "./starBeastVisualState"',
    "export type StarBeastRenderRequestReference",
    'referenceType: "STAR_BEAST_RENDER_REQUEST"',
    "export type StarBeastRendererCapability",
    '"MANIFESTATION_LAYER"',
    '"ENERGY_FLOW_CHANNEL"',
    '"LIGHT_FLOW_CHANNEL"',
    '"BREATHING_CHANNEL"',
    '"STAR_FIELD_CHANNEL"',
    '"CRYSTAL_PRESENCE_CHANNEL"',
    "export type StarBeastRendererCapabilityDeclaration",
    "consumesVisualStateOnly: true",
    "producesRenderPlanOnly: true",
    "noLifeStateInference: true",
    "noLifeStateMutation: true",
    "noMemoryInference: true",
    "noGrowthInference: true",
    "export type StarBeastRendererInput",
    "visualStateReference: StarBeastVisualState",
    "capabilityDeclaration: StarBeastRendererCapabilityDeclaration",
    "export type StarBeastRenderPlan",
    'semanticRole: "STAR_BEAST_RENDER_PLAN"',
    "sourceVisualStateReference: StarBeastVisualState",
    "manifestation: Readonly",
    "energy: Readonly",
    "light: Readonly",
    "starField: Readonly",
    "crystal: Readonly",
    "rendererNeutral: true",
    "semanticChannelsOnly: true",
    "noPixelOutput: true",
    "noDrawCommands: true",
    "noAssetGeneration: true",
    "export type StarBeastRendererPlanned",
    'status: "PLANNED"',
    "export type StarBeastRendererUnavailableReason",
    '"VISUAL_STATE_REQUIRED"',
    '"CAPABILITY_DECLARATION_REQUIRED"',
    '"RENDERER_CAPABILITY_UNAVAILABLE"',
    "export type StarBeastRendererUnavailable",
    'status: "UNAVAILABLE"',
    "export type StarBeastRendererOutput",
    "export type StarBeastRendererBoundary",
    "rendererImplementationDeferred: true",
    "noCanvasImplementation: true",
    "noWebGLImplementation: true",
    "noThreeJsImplementation: true",
    "noAnimationTimeline: true",
    "noAssetDependency: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("renderer contract type", contractSource, marker));

  [
    "export function",
    "function ",
    "export const",
    "class ",
    "new ",
    "HTMLCanvasElement",
    "CanvasRenderingContext",
    "WebGLRenderingContext",
    'from "three"',
    'from "@react-three',
    'from "react"',
    "requestAnimationFrame",
    "drawImage(",
    "getContext(",
    "shader",
    "textureUrl",
    "assetUrl",
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "hexagram",
    "personality",
    "Persona",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) => assertExcludes("renderer contract stays type-only and renderer-neutral", contractSource, marker));

  const importLines = contractSource
    .split("\n")
    .filter((line) => line.startsWith("import "));
  assertEqual(
    "renderer contract has one type-only dependency",
    importLines.join("\n"),
    'import type { StarBeastVisualState } from "./starBeastVisualState";',
  );

  [
    "StarBeastRenderPlan",
    "StarBeastRendererBoundary",
    "StarBeastRendererCapability",
    "StarBeastRendererInput",
    "StarBeastRendererOutput",
    'from "./starBeastRendererContract"',
  ].forEach((marker) => assertIncludes("type index exports renderer contract", typeIndexSource, marker));

  assertIncludes("P39 owns visual state", visualStateSource, "export type StarBeastVisualState");
  assertExcludes("P39 mapping does not consume renderer contract", mappingSource, "StarBeastRenderPlan");
  assertExcludes("foundation does not consume renderer contract", foundationSource, "StarBeastRenderer");
  assertExcludes("dynamics visual state does not consume renderer contract", dynamicsVisualSource, "StarBeastRenderer");

  const visualStateReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("StarBeastVisualState"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "visual state is only owned by P39 and referenced by P40 contract",
    visualStateReferences.join(","),
    [
      "src/services/starBeastVisualStateMapping.ts",
      "src/types/index.ts",
      "src/types/starBeastRendererContract.ts",
      "src/types/starBeastVisualState.ts",
    ].sort().join(","),
  );

  const mappingCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("mapStarBeastLifeStateToVisualState("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P39 mapping only opens the P77 isolated lab consumer",
    mappingCallSites.join(","),
    [
      "src/pages/StarbeastLab.tsx",
      "src/services/starBeastVisualStateMapping.ts",
    ].sort().join(","),
  );

  [
    "RC-STAR-BEAST-RENDERER-CONTRACT-P40",
    "FUTURE RENDERER CONTRACT",
    "StarBeastVisualState",
    "StarBeastRendererInput",
    "StarBeastRenderPlan",
    "Future Renderer Implementation",
    "P40 不是 Renderer 实现",
    "Visual State 是 Future Renderer 唯一合法的生命表达输入",
    "六类语义能力",
    "Renderer-neutral 的语义计划",
    "noPixelOutput: true",
    "PLANNED",
    "UNAVAILABLE",
    "不实现 PLANNED / UNAVAILABLE Resolver",
    "P39 Mapping 函数当前仍没有下游调用者",
    "P40 Renderer Input / Output Contract 只由 P41 Render Plan Adapter 实现",
    "P41 是具体 `StarBeastRenderPlan` 的唯一正式构造边界",
    "P41 当前没有 Renderer 业务消费者",
    "Canvas、WebGL、Three.js 实现",
    "不修改 P0–P39",
  ].forEach((marker) => assertIncludes("renderer contract protocol", protocolSource, marker));

  assertIncludes(
    "renderer contract gate command is registered",
    packageJson.scripts?.["check:star-beast-renderer-contract"] ?? "",
    "node scripts/check-star-beast-renderer-contract.mjs",
  );
  assertIncludes(
    "renderer contract gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-contract",
  );
}

if (failures.length > 0) {
  console.error("\n[STAR BEAST RENDERER CONTRACT] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST RENDERER CONTRACT] PASS");
