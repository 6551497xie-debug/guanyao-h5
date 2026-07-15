import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastAssetPrototypeReadiness.ts",
  service: "src/services/starBeastAssetPrototypeReadiness.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_ASSET_PROTOTYPE_READINESS_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  lab: "src/pages/StarbeastLab.tsx",
  packageManifest: "package.json",
});
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
const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(absolute.type, "utf8");
  const serviceSource = fs.readFileSync(absolute.service, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(absolute.packageManifest, "utf8"));

  [
    "export type StarBeastAssetPrototypeReadinessInput",
    "assetDefinitionReference: StarBeastAssetDefinition | null",
    "lifeArchetypeProfileReference: LifeArchetypeProfile | null",
    "visualStateCompatibilityReference: StarBeastAssetVisualCompatibilityReference | null",
    "rendererContractReference: StarBeastRendererContractReference | null",
    "export type StarBeastAssetPrototypeReadinessResult",
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    'readiness: "READY_FOR_PROTOTYPE_RENDERER_CONSUMPTION"',
    "noAssetCreation: true",
    "noConsumption: true",
    "noRenderExecution: true",
    "noLifeStateMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("asset readiness type", typeSource, marker));

  [
    "export function resolveStarBeastAssetPrototypeReadiness",
    "input: StarBeastAssetPrototypeReadinessInput",
    "): StarBeastAssetPrototypeReadinessResult",
    '"CORE_BONE"',
    '"STAR_CORE"',
    '"STAR_PATTERN"',
    '"LIGHT_BOUNDARY"',
    '"COSMIC_CONSCIOUSNESS"',
    '"CRYSTAL_IMPRINT"',
    '"ASSET_VISUAL_LAYER_MISSING"',
    '"LIFE_ARCHETYPE_SOURCE_MISMATCH"',
    "assetDefinition.archetype.sourceProfileReference !== lifeArchetypeProfile",
    "assetDefinition.noFourSymbolInference !== true",
    'status: "READY"',
    'readiness: "READY_FOR_PROTOTYPE_RENDERER_CONSUMPTION"',
  ].forEach((marker) => assertIncludes("asset readiness service", serviceSource, marker));

  [
    "starBeastAssetArchitectureMapping",
    "resolveStarBeastAssetDefinition",
    "createQianAssetDefinition",
    "STAR_BEAST_ASSET_QIAN_V1",
    "StarBeastVisualState",
    "StarBeastRenderPlan",
    "resolveStarBeastRenderPlan",
    "adaptStarBeastRenderPlan",
    "requestAnimationFrame",
    "performance.now",
    "getContext(",
    "CanvasRenderingContext",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("readiness neither creates nor consumes", serviceSource, marker));

  [
    "StarBeastAssetPrototypeReadiness",
    "resolveStarBeastAssetPrototypeReadiness",
    "starBeastAssetPrototypeReadiness",
  ].forEach((marker) => assertExcludes("StarbeastLab remains disconnected", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveStarBeastAssetPrototypeReadiness(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("readiness has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-ASSET-PROTOTYPE-READINESS-P78",
    "Asset Prototype Readiness 用于判断星兽资产定义是否具备进入未来原型消费链的资格",
    "Readiness 不等于 Consumption",
    "它不是 Renderer、Asset Production、Memory 或 Growth",
    "输入只保存引用",
    "READY | UNAVAILABLE | BLOCKED",
    "缺少任意一层均返回 `UNAVAILABLE`",
    "禁止 `fourSymbol → Asset`",
    "禁止 `Canvas → Asset`",
    "不调用 Asset Architecture Mapping 重新创建资产",
    "不建立 Star Beast Prototype Consumer",
  ].forEach((marker) => assertIncludes("asset readiness protocol", protocolSource, marker));

  assertIncludes("type index exports readiness input", typeIndexSource, "StarBeastAssetPrototypeReadinessInput");
  assertIncludes("type index exports readiness result", typeIndexSource, "StarBeastAssetPrototypeReadinessResult");
  assertIncludes(
    "asset readiness gate registered",
    packageJson.scripts?.["check:star-beast-asset-prototype-readiness"] ?? "",
    "node scripts/check-star-beast-asset-prototype-readiness.mjs",
  );
  assertIncludes(
    "asset readiness gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-asset-prototype-readiness",
  );

  const readinessModulePath = path.join(os.tmpdir(), `guanyao-star-beast-asset-readiness-${process.pid}.mjs`);
  const mappingModulePath = path.join(os.tmpdir(), `guanyao-star-beast-asset-mapping-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.service],
    outfile: readinessModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  await build({
    entryPoints: [absolute.assetMapping],
    outfile: mappingModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolveStarBeastAssetPrototypeReadiness } = await import(`file://${readinessModulePath}?t=${Date.now()}`);
  const { resolveStarBeastAssetDefinition } = await import(`file://${mappingModulePath}?t=${Date.now()}`);
  const makeArchetype = (code, trigram) => Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: `test:${code}`,
    code,
    trigram,
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: "test-force",
    lifeIntention: "test-intention",
    shadowPattern: "test-shadow",
    awakeningDirection: "test-awakening",
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  });
  const qian = makeArchetype("QIAN", "乾");
  const qianAssetResult = resolveStarBeastAssetDefinition(qian);
  const visualCompatibilityReference = Object.freeze({
    referenceType: "STAR_BEAST_VISUAL_STATE_COMPATIBILITY",
    referenceId: "test:visual-compatibility",
  });
  const rendererContractReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "test:renderer-contract-p40",
  });
  const readyInput = Object.freeze({
    assetDefinitionReference: qianAssetResult.assetDefinition,
    lifeArchetypeProfileReference: qian,
    visualStateCompatibilityReference: visualCompatibilityReference,
    rendererContractReference,
  });
  const readyInputBefore = JSON.stringify(readyInput);
  const readyResult = resolveStarBeastAssetPrototypeReadiness(readyInput);

  assertEqual("complete Qian asset is ready", readyResult.status, "READY");
  assertEqual("ready input reference is preserved", readyResult.input === readyInput, true);
  assertEqual("readiness does not mutate input", JSON.stringify(readyInput), readyInputBefore);
  assertEqual("readiness does not consume", readyResult.boundary.noConsumption, true);
  assertEqual("readiness does not render", readyResult.boundary.noRenderExecution, true);
  assertEqual("readiness does not create asset", readyResult.boundary.noAssetCreation, true);
  assertEqual("readiness does not mutate life state", readyResult.boundary.noLifeStateMutation, true);

  for (const missingKind of qianAssetResult.assetDefinition.visualLayers.map(({ kind }) => kind)) {
    const incompleteDefinition = Object.freeze({
      ...qianAssetResult.assetDefinition,
      visualLayers: Object.freeze(
        qianAssetResult.assetDefinition.visualLayers.filter(({ kind }) => kind !== missingKind),
      ),
    });
    const incompleteResult = resolveStarBeastAssetPrototypeReadiness(
      Object.freeze({ ...readyInput, assetDefinitionReference: incompleteDefinition }),
    );
    assertEqual(`${missingKind} missing is unavailable`, incompleteResult.status, "UNAVAILABLE");
    assertEqual(`${missingKind} is reported missing`, incompleteResult.missingLayers.includes(missingKind), true);
  }

  const kun = makeArchetype("KUN", "坤");
  const wrongSourceDefinition = Object.freeze({
    ...qianAssetResult.assetDefinition,
    archetype: Object.freeze({
      ...qianAssetResult.assetDefinition.archetype,
      sourceProfileReference: kun,
    }),
  });
  const blockedResult = resolveStarBeastAssetPrototypeReadiness(
    Object.freeze({ ...readyInput, assetDefinitionReference: wrongSourceDefinition }),
  );
  assertEqual("wrong source is blocked", blockedResult.status, "BLOCKED");
  assertEqual("wrong source reason is explicit", blockedResult.reason, "LIFE_ARCHETYPE_SOURCE_MISMATCH");

  const unavailableResult = resolveStarBeastAssetPrototypeReadiness(
    Object.freeze({ ...readyInput, assetDefinitionReference: null }),
  );
  assertEqual("missing asset is unavailable", unavailableResult.status, "UNAVAILABLE");
  fs.rmSync(readinessModulePath, { force: true });
  fs.rmSync(mappingModulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast asset prototype readiness | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast asset prototype readiness gate");
