import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastAssetPrototypeConsumption.ts",
  service: "src/services/starBeastAssetPrototypeConsumptionService.ts",
  readinessService: "src/services/starBeastAssetPrototypeReadiness.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_ASSET_PROTOTYPE_CONSUMPTION_PROTOCOL.md",
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
    "export type StarBeastAssetPrototypeConsumptionInput",
    "readinessResultReference: StarBeastAssetPrototypeReadinessResult",
    "assetDefinitionReference: StarBeastAssetDefinition | null",
    "visualStateCompatibilityReference: StarBeastAssetVisualCompatibilityReference | null",
    "rendererContractReference: StarBeastRendererContractReference | null",
    "export type StarBeastAssetPrototypeConsumption",
    'semanticRole: "STAR_BEAST_ASSET_PROTOTYPE_CONSUMPTION"',
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_ADAPTER"',
    "referenceOnly: true",
    "notRendererOutput: true",
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    "noAssetCreation: true",
    "noRenderExecution: true",
    "noCanvasConnection: true",
    "noLifeStateMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("asset prototype consumption type", typeSource, marker));

  [
    "export function consumeStarBeastAssetPrototype",
    "input: StarBeastAssetPrototypeConsumptionInput",
    "): StarBeastAssetPrototypeConsumptionResult",
    'readinessResult.status === "UNAVAILABLE"',
    'readinessResult.status === "BLOCKED"',
    '"ASSET_PROTOTYPE_READINESS_UNAVAILABLE"',
    '"ASSET_PROTOTYPE_READINESS_BLOCKED"',
    '"ASSET_DEFINITION_REFERENCE_MISMATCH"',
    '"VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH"',
    '"RENDERER_CONTRACT_REFERENCE_MISMATCH"',
    'status: "AVAILABLE"',
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_ADAPTER"',
  ].forEach((marker) => assertIncludes("asset prototype consumption service", serviceSource, marker));

  [
    "resolveStarBeastAssetPrototypeReadiness(",
    "resolveStarBeastAssetDefinition(",
    "StarBeastRenderPlan",
    "resolveStarBeastRenderPlan",
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
  ].forEach((marker) => assertExcludes("consumption stays reference-only", serviceSource, marker));

  [
    "StarBeastAssetPrototypeConsumption",
    "consumeStarBeastAssetPrototype",
    "starBeastAssetPrototypeConsumption",
  ].forEach((marker) => assertExcludes("StarbeastLab remains disconnected", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("consumeStarBeastAssetPrototype(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("consumption has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-ASSET-PROTOTYPE-CONSUMPTION-P79",
    "Consumption 不等于 Rendering",
    "只保留上游引用",
    "AVAILABLE | UNAVAILABLE | BLOCKED",
    "P78 `READY` 且全部引用一致，返回 `AVAILABLE`",
    "P78 `UNAVAILABLE`，保持 `UNAVAILABLE`",
    "P78 `BLOCKED`，保持 `BLOCKED`",
    "不反向调用 Readiness",
    "不连接 Canvas、StarbeastLab、UI 或 Storage",
    "不建立实际 Prototype Adapter 消费者",
  ].forEach((marker) => assertIncludes("asset prototype consumption protocol", protocolSource, marker));

  assertIncludes("type index exports consumption input", typeIndexSource, "StarBeastAssetPrototypeConsumptionInput");
  assertIncludes("type index exports consumption result", typeIndexSource, "StarBeastAssetPrototypeConsumptionResult");
  assertIncludes(
    "asset prototype consumption gate registered",
    packageJson.scripts?.["check:star-beast-asset-prototype-consumption"] ?? "",
    "node scripts/check-star-beast-asset-prototype-consumption.mjs",
  );
  assertIncludes(
    "asset prototype consumption gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-asset-prototype-consumption",
  );

  const modulePaths = Object.freeze({
    consumption: path.join(os.tmpdir(), `guanyao-asset-consumption-${process.pid}.mjs`),
    readiness: path.join(os.tmpdir(), `guanyao-asset-readiness-${process.pid}.mjs`),
    mapping: path.join(os.tmpdir(), `guanyao-asset-mapping-${process.pid}.mjs`),
  });
  await Promise.all([
    build({ entryPoints: [absolute.service], outfile: modulePaths.consumption, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.readinessService], outfile: modulePaths.readiness, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.assetMapping], outfile: modulePaths.mapping, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
  ]);
  const { consumeStarBeastAssetPrototype } = await import(`file://${modulePaths.consumption}?t=${Date.now()}`);
  const { resolveStarBeastAssetPrototypeReadiness } = await import(`file://${modulePaths.readiness}?t=${Date.now()}`);
  const { resolveStarBeastAssetDefinition } = await import(`file://${modulePaths.mapping}?t=${Date.now()}`);

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
  const assetDefinition = resolveStarBeastAssetDefinition(qian).assetDefinition;
  const visualStateCompatibilityReference = Object.freeze({
    referenceType: "STAR_BEAST_VISUAL_STATE_COMPATIBILITY",
    referenceId: "test:visual-compatibility",
  });
  const rendererContractReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "test:renderer-contract-p40",
  });
  const readinessInput = Object.freeze({
    assetDefinitionReference: assetDefinition,
    lifeArchetypeProfileReference: qian,
    visualStateCompatibilityReference,
    rendererContractReference,
  });
  const ready = resolveStarBeastAssetPrototypeReadiness(readinessInput);
  const availableInput = Object.freeze({
    readinessResultReference: ready,
    assetDefinitionReference: assetDefinition,
    visualStateCompatibilityReference,
    rendererContractReference,
  });
  const before = JSON.stringify(availableInput);
  const available = consumeStarBeastAssetPrototype(availableInput);

  assertEqual("READY becomes AVAILABLE", available.status, "AVAILABLE");
  assertEqual("consumption preserves readiness reference", available.consumption.sourceReadinessReference === ready, true);
  assertEqual("consumption preserves asset reference", available.consumption.assetDefinitionReference === assetDefinition, true);
  assertEqual("consumption is reference-only", available.consumption.referenceOnly, true);
  assertEqual("consumption does not render", available.consumption.boundary.noRenderExecution, true);
  assertEqual("consumption does not connect Canvas", available.consumption.boundary.noCanvasConnection, true);
  assertEqual("consumption does not mutate input", JSON.stringify(availableInput), before);

  const unavailableReadiness = resolveStarBeastAssetPrototypeReadiness(
    Object.freeze({ ...readinessInput, assetDefinitionReference: null }),
  );
  const unavailable = consumeStarBeastAssetPrototype(
    Object.freeze({ ...availableInput, readinessResultReference: unavailableReadiness }),
  );
  assertEqual("UNAVAILABLE readiness stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable reason is preserved", unavailable.sourceUnavailableReason, "ASSET_DEFINITION_REQUIRED");

  const kun = makeArchetype("KUN", "坤");
  const wrongSourceDefinition = Object.freeze({
    ...assetDefinition,
    archetype: Object.freeze({ ...assetDefinition.archetype, sourceProfileReference: kun }),
  });
  const blockedReadiness = resolveStarBeastAssetPrototypeReadiness(
    Object.freeze({ ...readinessInput, assetDefinitionReference: wrongSourceDefinition }),
  );
  const blocked = consumeStarBeastAssetPrototype(
    Object.freeze({ ...availableInput, readinessResultReference: blockedReadiness }),
  );
  assertEqual("BLOCKED readiness stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked reason is preserved", blocked.sourceBlockedReason, "LIFE_ARCHETYPE_SOURCE_MISMATCH");

  const missingReference = consumeStarBeastAssetPrototype(
    Object.freeze({ ...availableInput, assetDefinitionReference: null }),
  );
  assertEqual("missing READY reference is unavailable", missingReference.status, "UNAVAILABLE");

  const mismatchedReference = consumeStarBeastAssetPrototype(
    Object.freeze({ ...availableInput, assetDefinitionReference: Object.freeze({ ...assetDefinition }) }),
  );
  assertEqual("mismatched READY reference is blocked", mismatchedReference.status, "BLOCKED");
  assertEqual("mismatch reason is explicit", mismatchedReference.reason, "ASSET_DEFINITION_REFERENCE_MISMATCH");

  Object.values(modulePaths).forEach((modulePath) => fs.rmSync(modulePath, { force: true }));
}

if (failures.length > 0) {
  console.error(`FAIL | star beast asset prototype consumption | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast asset prototype consumption gate");
