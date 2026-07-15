import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const capabilityTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererBackendCapability.ts",
);
const capabilityServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererBackendCapabilityService.ts",
);
const candidateTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationCandidate.ts",
);
const candidateServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationCandidateService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_CAPABILITY_SCHEMA_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-backend-capability-${process.pid}.mjs`,
);

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
  if (actual !== expected) {
    failures.push(`${name} expected=${expected} actual=${actual}`);
  } else {
    console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
  }
};

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["backend capability type", capabilityTypePath],
  ["backend capability service", capabilityServicePath],
  ["implementation candidate type", candidateTypePath],
  ["implementation candidate service", candidateServicePath],
  ["type index", typeIndexPath],
  ["backend capability protocol", protocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const capabilityTypeSource = fs.readFileSync(capabilityTypePath, "utf8");
  const capabilityServiceSource = fs.readFileSync(capabilityServicePath, "utf8");
  const candidateTypeSource = fs.readFileSync(candidateTypePath, "utf8");
  const candidateServiceSource = fs.readFileSync(candidateServicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const typeScriptSourcePaths = collectTypeScriptSourcePaths(
    path.join(rootDir, "src"),
  );

  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = typeScriptSourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  [
    "export type StarBeastRendererBackendCapabilityReference",
    'referenceType: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION"',
    "export type StarBeastRendererBackendCapability =",
    '"SEMANTIC_RENDER_PLAN_INPUT"',
    '"MANIFESTATION_CHANNEL_PROJECTION"',
    '"ENERGY_CHANNEL_PROJECTION"',
    '"LIGHT_CHANNEL_PROJECTION"',
    '"STAR_FIELD_CHANNEL_PROJECTION"',
    '"CRYSTAL_CHANNEL_PROJECTION"',
    '"REDUCED_MOTION_FALLBACK"',
    '"STATIC_FRAME_FALLBACK"',
    "export type StarBeastRendererBackendCapabilityDeclarationInput",
    "export type StarBeastRendererBackendCapabilityDeclaration",
    'semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION"',
    "consumesSemanticRenderPlanOnly: true",
    "rendererNeutral: true",
    "backendUnspecified: true",
    "noBackendSelection: true",
    "noDeviceDetection: true",
    "noRuntimeProbe: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noStorageWrite: true",
    "export type StarBeastRendererBackendCapabilityResult",
  ].forEach((marker) =>
    assertIncludes("backend capability type contract", capabilityTypeSource, marker),
  );

  [
    "export const STAR_BEAST_REQUIRED_BACKEND_CAPABILITIES",
    "export function resolveStarBeastRendererBackendCapabilityDeclaration",
    "input.declarationReference === null",
    '"BACKEND_CAPABILITY_DECLARATION_REFERENCE_REQUIRED"',
    "STAR_BEAST_REQUIRED_BACKEND_CAPABILITIES.every",
    "input.capabilities.includes(capability)",
    '"BACKEND_CAPABILITY_SET_INCOMPLETE"',
    'semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION"',
    "declarationReference: input.declarationReference",
    "capabilities: Object.freeze([...input.capabilities])",
    "backendUnspecified: true",
    "noBackendSelection: true",
    "noDeviceDetection: true",
    "noRuntimeProbe: true",
    "noRenderExecution: true",
    'status: "AVAILABLE"',
  ].forEach((marker) =>
    assertIncludes("backend capability service contract", capabilityServiceSource, marker),
  );

  [
    "HTMLCanvasElement",
    "CanvasRenderingContext",
    "WebGLRenderingContext",
    "navigator.",
    "window.",
    "document.",
    "requestAnimationFrame",
    "drawImage(",
    "getContext(",
    'from "three"',
    'from "@react-three',
    'from "react"',
    "/pages/",
    "/components/",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "shader",
    "textureUrl",
    "assetUrl",
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "personality",
    "Persona",
  ].forEach((marker) =>
    assertExcludes("capability schema has no implementation dependency", capabilityServiceSource, marker),
  );

  assertIncludes(
    "P46 imports the formal P47 reference",
    candidateTypeSource,
    'from "./starBeastRendererBackendCapability"',
  );
  assertExcludes(
    "P46 no longer owns the backend reference",
    candidateTypeSource,
    "export type StarBeastRendererBackendCapabilityReference",
  );
  assertExcludes(
    "P46 does not invoke P47",
    candidateServiceSource,
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
  );

  [
    "StarBeastRendererBackendCapability",
    "StarBeastRendererBackendCapabilityDeclaration",
    "StarBeastRendererBackendCapabilityReference",
    "StarBeastRendererBackendCapabilityResult",
    'from "./starBeastRendererBackendCapability"',
  ].forEach((marker) =>
    assertIncludes("type index exports backend capability schema", typeIndexSource, marker),
  );

  assertCallSites(
    "P47 resolver has no downstream consumer",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    ["src/services/starBeastRendererBackendCapabilityService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-BACKEND-CAPABILITY-SCHEMA-P47",
    "BACKEND CAPABILITY SCHEMA",
    "Schema 唯一所有权",
    "P46 只保存 P47 声明引用",
    "BACKEND_CAPABILITY_DECLARATION_REFERENCE_REQUIRED",
    "BACKEND_CAPABILITY_SET_INCOMPLETE",
    "P46 只从 P47 导入 Reference",
    "不选择后端、不探测设备、不执行渲染",
    "Declaration 与 Candidate 的正式组合留给未来独立协议",
  ].forEach((marker) =>
    assertIncludes("backend capability protocol", protocolSource, marker),
  );

  [
    "P47 Backend Capability Schema Extension",
    "P46 只导入 Reference，不调用 P47 Resolver",
    "resolveStarBeastRendererBackendCapabilityDeclaration",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P47", freezeProtocolSource, marker),
  );

  assertIncludes(
    "backend capability gate command is registered",
    packageJson.scripts?.["check:star-beast-renderer-backend-capability-schema"] ?? "",
    "node scripts/check-star-beast-renderer-backend-capability-schema.mjs",
  );
  assertIncludes(
    "backend capability gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-backend-capability-schema",
  );

  await build({
    entryPoints: [capabilityServicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStarBeastRendererBackendCapabilityDeclaration } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const declarationReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION",
    referenceId: "renderer-backend-capability:abstract-provider",
  });
  const fullCapabilities = Object.freeze([
    "SEMANTIC_RENDER_PLAN_INPUT",
    "MANIFESTATION_CHANNEL_PROJECTION",
    "ENERGY_CHANNEL_PROJECTION",
    "LIGHT_CHANNEL_PROJECTION",
    "STAR_FIELD_CHANNEL_PROJECTION",
    "CRYSTAL_CHANNEL_PROJECTION",
    "REDUCED_MOTION_FALLBACK",
    "STATIC_FRAME_FALLBACK",
  ]);
  const availableInput = Object.freeze({
    declarationReference,
    capabilities: fullCapabilities,
  });
  const availableSnapshot = JSON.stringify(availableInput);
  const available = resolveStarBeastRendererBackendCapabilityDeclaration(availableInput);

  assertEqual("complete capability set is available", available.status, "AVAILABLE");
  assertEqual(
    "declaration preserves reference",
    available.declaration.declarationReference === declarationReference,
    true,
  );
  assertEqual("declaration remains backend unspecified", available.declaration.backendUnspecified, true);
  assertEqual("declaration does not select backend", available.declaration.noBackendSelection, true);
  assertEqual("declaration does not detect devices", available.declaration.noDeviceDetection, true);
  assertEqual("declaration does not execute render", available.declaration.noRenderExecution, true);
  assertEqual("declaration is frozen", Object.isFrozen(available.declaration), true);
  assertEqual("capability list is frozen", Object.isFrozen(available.declaration.capabilities), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual(
    "resolver does not mutate input",
    JSON.stringify(availableInput),
    availableSnapshot,
  );

  const missingReference = resolveStarBeastRendererBackendCapabilityDeclaration(
    Object.freeze({ ...availableInput, declarationReference: null }),
  );
  assertEqual("missing reference is unavailable", missingReference.status, "UNAVAILABLE");
  assertEqual(
    "missing reference reason is stable",
    missingReference.reason,
    "BACKEND_CAPABILITY_DECLARATION_REFERENCE_REQUIRED",
  );
  assertEqual("missing reference creates no declaration", "declaration" in missingReference, false);

  const incomplete = resolveStarBeastRendererBackendCapabilityDeclaration(
    Object.freeze({
      ...availableInput,
      capabilities: Object.freeze(fullCapabilities.slice(0, -1)),
    }),
  );
  assertEqual("incomplete capability set is unavailable", incomplete.status, "UNAVAILABLE");
  assertEqual(
    "incomplete capability reason is stable",
    incomplete.reason,
    "BACKEND_CAPABILITY_SET_INCOMPLETE",
  );
  assertEqual("incomplete capability creates no declaration", "declaration" in incomplete, false);
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Temporary gate output is best-effort cleanup only.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer backend capability schema gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer backend capability schema gate passed.");
