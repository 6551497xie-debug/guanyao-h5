import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, "src/services/motherCodeLifeArchetypeSource.ts");
const schemaTypePath = path.join(rootDir, "src/types/originalSelfLifeSchema.ts");
const motherTypePath = path.join(rootDir, "src/types/guanyaoCausalEngine.ts");
const motherRegistryPath = path.join(rootDir, "src/data/guanyaoMotherCodeRegistry.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempSourceModulePath = path.join(os.tmpdir(), `guanyao-mother-code-life-archetype-source-${process.pid}.mjs`);
const tempRegistryModulePath = path.join(os.tmpdir(), `guanyao-mother-code-registry-${process.pid}.mjs`);

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
  ["mother code life archetype source", sourcePath],
  ["life schema type", schemaTypePath],
  ["mother code type", motherTypePath],
  ["mother code registry", motherRegistryPath],
  ["foundation type", foundationTypePath],
  ["source protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = fs.readFileSync(sourcePath, "utf8");
  const schemaTypeSource = fs.readFileSync(schemaTypePath, "utf8");
  const motherTypeSource = fs.readFileSync(motherTypePath, "utf8");
  const motherRegistrySource = fs.readFileSync(motherRegistryPath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type MotherCodeLifeArchetypeSourceNotReadyReason",
    "export type MotherCodeLifeArchetypeSourceResult",
    "export function resolveLifeArchetypeProfileFromMotherCode",
    "motherCodeProfile: MotherCodeProfile",
    'source: "mother_code_profile"',
    '"MOTHER_CODE_TRIGRAM_MISSING"',
    '"MOTHER_CODE_LIFE_SEMANTICS_MISSING"',
    '乾: Object.freeze({ code: "QIAN", trigram: "乾" })',
    '坤: Object.freeze({ code: "KUN", trigram: "坤" })',
    '震: Object.freeze({ code: "ZHEN", trigram: "震" })',
    '巽: Object.freeze({ code: "XUN", trigram: "巽" })',
    '坎: Object.freeze({ code: "KAN", trigram: "坎" })',
    '离: Object.freeze({ code: "LI", trigram: "离" })',
    '艮: Object.freeze({ code: "GEN", trigram: "艮" })',
    '兑: Object.freeze({ code: "DUI", trigram: "兑" })',
    "originalForce: motherCodeProfile.baseForce",
    "lifeIntention: personalityAsset",
    "shadowPattern: shadowInertia",
    "awakeningDirection: unlockPotential",
    "sourceMotherCodeId: motherCodeProfile.motherCodeId",
    ") satisfies LifeArchetypeProfile",
  ].forEach((marker) => assertIncludes("mother code life archetype source contract", source, marker));

  [
    "fourSymbol",
    "StarBeast",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "guanyaoMotherCodeRegistry",
    "getMotherCodeDefinition",
    "toMotherCodeProfile",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "Crystal",
    "Dynamics",
  ].forEach((marker) => assertExcludes("mother code life archetype source stays semantic-only", source, marker));

  [
    'source: "mother_code_profile"',
    "sourceMotherCodeId: string",
    "originalForce: string",
    "lifeIntention: string",
    "shadowPattern: string",
    "awakeningDirection: string",
  ].forEach((marker) => assertIncludes("life archetype profile source fields", schemaTypeSource, marker));

  [
    "baseForce: string",
    "lowerTrigram?: Trigram",
    "shadowInertia?: string",
    "unlockPotential?: string",
    "personalityAsset?: string",
  ].forEach((marker) => assertIncludes("existing mother code profile source fields", motherTypeSource, marker));

  [
    "baseForce: definition.baseDrive",
    "shadowInertia: definition.shadowInertia",
    "unlockPotential: definition.unlockPotential",
    "personalityAsset: definition.personalityAsset",
  ].forEach((marker) => assertIncludes("mother code registry preserves semantic source", motherRegistrySource, marker));

  assertIncludes("foundation keeps existing life archetype state", foundationTypeSource, "export type LifeArchetypeState");
  assertExcludes("foundation does not consume mother source bridge", foundationTypeSource, "MotherCodeLifeArchetypeSource");

  const sourceCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeArchetypeProfileFromMotherCode"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "source bridge is only consumed by schema entry, isolated genesis previews, scene model fixtures, and formal identity convergence",
    sourceCallSites.join(","),
    [
      "src/mocks/starBeastSceneModelFixtures.ts",
      "src/pages/StarBeastGenesisPreview.tsx",
      "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
      "src/services/motherCodeLifeArchetypeSource.ts",
      "src/services/originalSelfLifeSchemaEntry.ts",
      "src/services/productionIdentitySourceConvergence.ts",
    ].sort().join(","),
  );

  [
    "RC-MOTHER-CODE-LIFE-ARCHETYPE-SOURCE-P13",
    "MotherCodeProfile",
    "resolveLifeArchetypeProfileFromMotherCode",
    "LifeArchetypeProfile",
    "StarBeast / fourSymbol",
    "反推 LifeArchetypeProfile",
    "baseForce         → originalForce",
    "personalityAsset  → lifeIntention",
    "shadowInertia     → shadowPattern",
    "unlockPotential   → awakeningDirection",
    "MOTHER_CODE_TRIGRAM_MISSING",
    "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    "P13 不修改",
  ].forEach((marker) => assertIncludes("mother code life archetype source protocol", protocolSource, marker));

  assertIncludes(
    "source gate command is registered",
    packageJson.scripts?.["check:mother-code-life-archetype-source"] ?? "",
    "node scripts/check-mother-code-life-archetype-source.mjs",
  );
  assertIncludes(
    "source gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:mother-code-life-archetype-source",
  );

  await Promise.all([
    build({
      entryPoints: [sourcePath],
      outfile: tempSourceModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [motherRegistryPath],
      outfile: tempRegistryModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const { resolveLifeArchetypeProfileFromMotherCode } = await import(
    `file://${tempSourceModulePath}?t=${Date.now()}`
  );
  const { guanyaoMotherCodeRegistry, toMotherCodeProfile } = await import(
    `file://${tempRegistryModulePath}?t=${Date.now()}`
  );

  const expectedCodes = ["QIAN", "KUN", "ZHEN", "XUN", "KAN", "LI", "GEN", "DUI"];
  const resolvedCodes = [];

  for (const definition of guanyaoMotherCodeRegistry) {
    const motherCodeProfile = toMotherCodeProfile(definition);
    const snapshot = JSON.stringify(motherCodeProfile);
    const result = resolveLifeArchetypeProfileFromMotherCode(motherCodeProfile);
    assertEqual(`${definition.trigram} source is ready`, result.status, "READY");
    assertEqual(`${definition.trigram} source identity`, result.source, "mother_code_profile");
    assertEqual(`${definition.trigram} keeps mother profile reference`, result.motherCodeProfile === motherCodeProfile, true);
    assertEqual(`${definition.trigram} keeps trigram`, result.lifeArchetypeProfile?.trigram, definition.trigram);
    assertEqual(`${definition.trigram} keeps original force`, result.lifeArchetypeProfile?.originalForce, motherCodeProfile.baseForce);
    assertEqual(`${definition.trigram} keeps life intention`, result.lifeArchetypeProfile?.lifeIntention, motherCodeProfile.personalityAsset);
    assertEqual(`${definition.trigram} keeps shadow pattern`, result.lifeArchetypeProfile?.shadowPattern, motherCodeProfile.shadowInertia);
    assertEqual(`${definition.trigram} keeps awakening direction`, result.lifeArchetypeProfile?.awakeningDirection, motherCodeProfile.unlockPotential);
    assertEqual(`${definition.trigram} result is frozen`, Object.isFrozen(result), true);
    assertEqual(`${definition.trigram} profile is frozen`, Object.isFrozen(result.lifeArchetypeProfile), true);
    assertEqual(`${definition.trigram} input is not mutated`, JSON.stringify(motherCodeProfile), snapshot);
    resolvedCodes.push(result.lifeArchetypeProfile?.code);
  }

  assertEqual("all eight mother codes are covered", resolvedCodes.join(" → "), expectedCodes.join(" → "));

  const completeProfile = toMotherCodeProfile(guanyaoMotherCodeRegistry[0]);
  const missingTrigram = resolveLifeArchetypeProfileFromMotherCode({
    ...completeProfile,
    lowerTrigram: undefined,
  });
  assertEqual("missing trigram is not ready", missingTrigram.status, "NOT_READY");
  assertEqual("missing trigram reason", missingTrigram.reason, "MOTHER_CODE_TRIGRAM_MISSING");

  const missingSemantics = resolveLifeArchetypeProfileFromMotherCode({
    ...completeProfile,
    unlockPotential: undefined,
  });
  assertEqual("missing semantics is not ready", missingSemantics.status, "NOT_READY");
  assertEqual("missing semantics reason", missingSemantics.reason, "MOTHER_CODE_LIFE_SEMANTICS_MISSING");
}

fs.rmSync(tempSourceModulePath, { force: true });
fs.rmSync(tempRegistryModulePath, { force: true });

if (failures.length > 0) {
  console.error("[MOTHER CODE LIFE ARCHETYPE SOURCE] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[MOTHER CODE LIFE ARCHETYPE SOURCE] PASS");
