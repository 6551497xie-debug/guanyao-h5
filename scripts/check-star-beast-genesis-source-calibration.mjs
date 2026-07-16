import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastGenesisSourceIdentity.ts",
  service: "src/services/starBeastGenesisSourceCalibration.ts",
  preview: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  protocol:
    "docs/GUANYAO_STAR_BEAST_GENESIS_SOURCE_AND_MANIFESTATION_CALIBRATION_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
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
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "export type StarBeastGenesisSourceIdentity",
    "originCoordinateReference: StarBeastGenesisOriginCoordinateReference",
    "mansionResultReference: StarBeastGenesisMansionResultReference",
    "fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference",
    "motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference",
    "starBeastIdentityReference: StarBeastGenesisIdentityReference",
    "export type GenesisManifestationSequence",
    '"COSMIC_FIELD"',
    '"MANSION_MANIFESTATION"',
    '"COORDINATE_RECOGNITION"',
    '"FOUR_SYMBOL_MANIFESTATION"',
    '"MOTHER_CODE_INFUSION"',
    '"STAR_BEAST_REVEAL"',
    "independentCalculationSources: true",
    "convergeAtStarBeastIdentity: true",
    "manifestationSequenceOnly: true",
    "notCalculationDependency: true",
  ].forEach((marker) =>
    assertIncludes("genesis source identity contract", source.type, marker),
  );

  [
    "mansion:",
    "fourSymbol:",
    "lifeArchetype:",
    "particleDensity",
    "rendererMode",
  ].forEach((marker) =>
    assertExcludes("source identity keeps engine references", source.type, marker),
  );

  [
    "export function calibrateStarBeastGenesisSource",
    "STAR_BEAST_GENESIS_MANIFESTATION_SEQUENCE",
    'sourceEngine: "guanyao_starbeast_engine"',
    'sourceEngine: "guanyao_lunar_mother_code_landing"',
    "starbeastResult.gregorianBirthDate !== motherGregorianDate",
    "sameLunarBirthDate(",
    "fourSymbolDeterminesManifestationForm: true",
    "motherCodeDeterminesLifeForce: true",
    "independentCalculationSources: true",
    "noIdentitySelection: true",
    "noRendererMutation: true",
    "noLifeStateMutation: true",
  ].forEach((marker) =>
    assertIncludes("source calibration service", source.service, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLunarTrigramLanding",
    "resolveLifeArchetypeProfileFromMotherCode",
    "resolveWhiteTigerGenGenesisPrototypeAsset",
    "StarBeastGenesisRendererPrototype",
    "Canvas",
    "localStorage",
    "sessionStorage",
    "fourSymbol =",
    "motherCodeProfile =",
  ].forEach((marker) =>
    assertExcludes("calibration does not calculate or render", source.service, marker),
  );

  [
    "resolveStarbeastFromBirthDate(DEMO_BIRTH)",
    "runMotherCodeLandingEngine(DEMO_BIRTH)",
    "calibrateStarBeastGenesisSource(",
    "sourceIdentity.fourSymbolResultReference.resultReference",
    "sourceIdentity.motherCodeProfileReference.profileReference",
    "resolveLifeArchetypeProfileFromMotherCode(",
  ].forEach((marker) =>
    assertIncludes("isolated preview consumes formal sources", source.preview, marker),
  );

  [
    "const WESTERN_MANSION_REFERENCE",
    "const GEN_ARCHETYPE_REFERENCE",
    "StarbeastDerivationReady",
    'import type { LifeArchetypeProfile',
    'status: "READY"',
    'fourSymbol: "白虎"',
    'code: "GEN"',
    'trigram: "艮"',
  ].forEach((marker) =>
    assertExcludes("preview has no manual identity result", source.preview, marker),
  );

  [
    "正式后台不是一条把四象推到母码的纵向因果链",
    "四象只决定星兽显化形态",
    "母码只决定星兽生命原力",
    "这是用户体验顺序，不是后台计算依赖",
    "P84 艮之白虎 Asset、P85 Genesis Renderer、P86 Cosmic Consciousness 与 P87 Stellar Flesh 全部保留",
    "不得再次以视觉目标反向改写产品架构",
  ].forEach((marker) =>
    assertIncludes("calibration protocol freezes direction", source.protocol, marker),
  );

  assertIncludes(
    "type index exports source identity",
    source.typeIndex,
    "StarBeastGenesisSourceIdentity",
  );
  assertIncludes(
    "source calibration gate registered",
    packageJson.scripts?.["check:star-beast-genesis-source-calibration"] ?? "",
    "node scripts/check-star-beast-genesis-source-calibration.mjs",
  );
  assertIncludes(
    "source calibration gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-genesis-source-calibration",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-star-beast-genesis-source-calibration-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { resolveStarbeastFromBirthDate } from "./src/services/guanyaoStarbeastEngineService.ts";
        export { runMotherCodeLandingEngine } from "./src/services/guanyaoLunarMotherCodeLandingAdapter.ts";
        export { calibrateStarBeastGenesisSource, STAR_BEAST_GENESIS_MANIFESTATION_SEQUENCE } from "./src/services/starBeastGenesisSourceCalibration.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "star-beast-genesis-source-calibration-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    resolveStarbeastFromBirthDate,
    runMotherCodeLandingEngine,
    calibrateStarBeastGenesisSource,
    STAR_BEAST_GENESIS_MANIFESTATION_SEQUENCE,
  } = await import(`file://${modulePath}?t=${Date.now()}`);

  const birth = Object.freeze({
    year: 1979,
    month: 3,
    day: 28,
    hourBranch: "未时",
  });
  const starbeast = resolveStarbeastFromBirthDate(birth);
  const motherCodeLanding = runMotherCodeLandingEngine(birth);
  const originCoordinateReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: "gate:1979-03-28:wei",
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });
  const input = Object.freeze({
    originCoordinateReference,
    starbeastDerivationResultReference: starbeast,
    motherCodeLandingResultReference: motherCodeLanding,
  });
  const before = JSON.stringify(input);
  const available = calibrateStarBeastGenesisSource(input);

  assertEqual("formal starbeast source resolves ready", starbeast.status, "READY");
  assertEqual("formal starbeast source resolves white tiger", starbeast.fourSymbol, "白虎");
  assertEqual("formal mother code source resolves Gen", motherCodeLanding.motherCodeProfile.lowerTrigram, "艮");
  assertEqual("matching independent sources calibrate", available.status, "AVAILABLE");
  if (available.status === "AVAILABLE") {
    assertEqual(
      "mansion reference preserves formal engine object",
      available.sourceIdentity.mansionResultReference.resultReference,
      starbeast,
    );
    assertEqual(
      "four symbol reference preserves formal engine object",
      available.sourceIdentity.fourSymbolResultReference.resultReference,
      starbeast,
    );
    assertEqual(
      "mother code reference preserves formal engine profile",
      available.sourceIdentity.motherCodeProfileReference.profileReference,
      motherCodeLanding.motherCodeProfile,
    );
    assertEqual(
      "source convergence is explicit",
      available.sourceIdentity.sourceBoundary.independentCalculationSources,
      true,
    );
  }
  assertEqual("calibration does not mutate sources", JSON.stringify(input) === before, true);
  assertEqual(
    "manifestation sequence is presentation-only order",
    STAR_BEAST_GENESIS_MANIFESTATION_SEQUENCE.join("→"),
    "COSMIC_FIELD→MANSION_MANIFESTATION→COORDINATE_RECOGNITION→FOUR_SYMBOL_MANIFESTATION→MOTHER_CODE_INFUSION→STAR_BEAST_REVEAL",
  );

  const mismatchedMotherCode = runMotherCodeLandingEngine(
    Object.freeze({ ...birth, day: 29 }),
  );
  const mismatch = calibrateStarBeastGenesisSource(
    Object.freeze({
      ...input,
      motherCodeLandingResultReference: mismatchedMotherCode,
    }),
  );
  assertEqual("different birth coordinates are blocked", mismatch.status, "BLOCKED");
  assertEqual(
    "different birth coordinate reason",
    mismatch.reason,
    "SOURCE_BIRTH_COORDINATE_MISMATCH",
  );

  const unavailable = calibrateStarBeastGenesisSource(
    Object.freeze({
      originCoordinateReference,
      starbeastDerivationResultReference: null,
      motherCodeLandingResultReference: motherCodeLanding,
    }),
  );
  assertEqual("missing formal source stays unavailable", unavailable.status, "UNAVAILABLE");
}

if (failures.length > 0) {
  console.error("\nStar Beast Genesis source calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast Genesis source calibration gate passed.");
