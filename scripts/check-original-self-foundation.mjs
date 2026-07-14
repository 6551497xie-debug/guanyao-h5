import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/originalSelf.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_ORIGINAL_SELF_ARCHITECTURE_PROTOCOL.md");
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

for (const [name, filePath] of [
  ["original self type", typePath],
  ["type index", typeIndexPath],
  ["architecture protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const sourceFile = ts.createSourceFile(typePath, typeSource, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);

  if (sourceFile.parseDiagnostics.length > 0) {
    failures.push(`original self type syntax errors=${sourceFile.parseDiagnostics.length}`);
  } else {
    console.log("PASS | original self type syntax");
  }

  [
    "export type OriginalSelfState",
    "export type StarBeastState",
    "export type JourneyState",
    "export type LifeArchetypeState",
    '"ORIGINAL_SELF"',
    '"STAR_BEAST"',
    '"LIFE_ARCHETYPE"',
    '"HEXAGRAM"',
    '"YAO"',
    '"CRYSTAL"',
    'semanticRole: "ORIGINAL_SELF_LIFE_MANIFESTATION"',
    "originalSelfManifestation: true",
    "notRole: true",
    "notPet: true",
    "notPersonalityLabel: true",
    "lifeArchetype: LifeArchetypeState",
    "hexagram: CurrentHexagramProfile | null",
    "yao: YaoTransmissionProfile | null",
    "crystal: CrystalState | null",
    "noMotherCodeMutation: true",
    "noHexagramGeneration: true",
    "noCrystalEngineMutation: true",
    "noStorageWrite: true",
    "noUIContract: true",
    "noAIDependency: true",
  ].forEach((marker) => assertIncludes("foundation type contract", typeSource, marker));

  assertIncludes("foundation reuses current hexagram type", typeSource, "import type { CurrentHexagramProfile, YaoTransmissionProfile }");
  assertIncludes("foundation reuses starbeast types", typeSource, "import type { FourSymbol, TwentyEightMansion }");
  assertIncludes("foundation reuses crystal state", typeSource, 'import type { CrystalState } from "./personaTransmission"');
  assertIncludes("type index exports original self foundation", typeIndexSource, 'from "./originalSelf"');

  ["localStorage", "sessionStorage", "fetch(", 'from "react"', "JSX.", "HTMLElement", "CurrentHexagramProfile {", "CrystalState = Readonly"].forEach(
    (marker) => assertExcludes("foundation stays implementation-neutral", typeSource, marker),
  );

  [
    "Original Self",
    "Star Beast",
    "Life Archetype",
    "Hexagram",
    "Yao",
    "Crystal",
    "Star Beast = 本我生命显化",
    "星兽不是角色、宠物、人格标签",
    "Mother Code",
    "Gravity",
    "Crystal Engine",
    "不反向夺取它们的工程职责",
    "不得修改",
    "UI 与页面",
    "64 卦数据和映射",
    "Storage schema",
    "AI prompt",
    "视觉组件",
  ].forEach((marker) => assertIncludes("foundation protocol contract", protocolSource, marker));

  assertIncludes(
    "foundation gate command is registered",
    packageJson.scripts?.["check:original-self-foundation"] ?? "",
    "node scripts/check-original-self-foundation.mjs",
  );
  assertIncludes(
    "foundation gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-foundation",
  );
}

if (failures.length > 0) {
  console.error("[ORIGINAL SELF FOUNDATION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF FOUNDATION] PASS");
