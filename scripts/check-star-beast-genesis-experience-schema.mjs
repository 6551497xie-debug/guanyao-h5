import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastGenesisExperience.ts",
  service: "src/services/starBeastGenesisExperienceMapping.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  motherSource: "src/services/motherCodeLifeArchetypeSource.ts",
  starbeastEngine: "src/services/guanyaoStarbeastEngineService.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIENCE_SCHEMA_PROTOCOL.md",
  existingP83: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  preview: "src/pages/StarBeastGenesisPreview.tsx",
  lab: "src/pages/StarbeastLab.tsx",
  launch: "src/pages/LaunchLab.tsx",
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
  const typeSource = fs.readFileSync(absolute.type, "utf8");
  const serviceSource = fs.readFileSync(absolute.service, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const existingP83Source = fs.readFileSync(absolute.existingP83, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const launchSource = fs.readFileSync(absolute.launch, "utf8");
  const packageJson = JSON.parse(
    fs.readFileSync(absolute.packageManifest, "utf8"),
  );

  [
    "export type StarBeastGenesisStage",
    '"COSMIC_ORIGIN"',
    '"ORIGIN_COORDINATE"',
    '"STAR_MANSION_ALIGNMENT"',
    '"FOUR_SYMBOL_FORMATION"',
    '"LIFE_ARCHETYPE_INFUSION"',
    '"STAR_BEAST_REVEAL"',
    "export type StarBeastGenesisExperienceState",
    "originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null",
    "mansionReference: StarBeastGenesisMansionReference | null",
    "fourSymbolReference: StarBeastGenesisFourSymbolReference | null",
    "lifeArchetypeReference: StarBeastGenesisLifeArchetypeReference | null",
    "starBeastAssetReference: StarBeastGenesisAssetReference | null",
    'sourceRole: "MOTHER_CODE_PROFILE_ONLY"',
    "sourceLifeArchetypeProfileReference: LifeArchetypeProfile",
    "sourceStarbeastDerivationReference: StarbeastDerivationReady",
    "sourceAssetDefinitionReference: StarBeastAssetDefinition",
    "presentationSequenceOnly: true",
    "notCausalDerivationSequence: true",
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    "noFourSymbolToLifeArchetypeInference: true",
    "noBirthLocationToStarBeastDerivation: true",
    "noStarBeastGeneration: true",
    "noRendererInvocation: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("genesis experience type", typeSource, marker),
  );

  [
    "export function resolveStarBeastGenesisExperience",
    '"ORIGIN_COORDINATE_REFERENCE_REQUIRED"',
    '"MANSION_REFERENCE_REQUIRED"',
    '"FOUR_SYMBOL_REFERENCE_REQUIRED"',
    '"LIFE_ARCHETYPE_REFERENCE_REQUIRED"',
    '"STAR_BEAST_ASSET_REFERENCE_REQUIRED"',
    "birthLocationExcludedFromStarBeastDerivation !== true",
    "sourceStarbeastDerivationReference.locationIndependent !== true",
    "sourceStarbeastDerivationReference.birthTimeIndependent !== true",
    "fourSymbol.sourceMansionReference !== mansion",
    'lifeArchetype.sourceRole !== "MOTHER_CODE_PROFILE_ONLY"',
    '"mother_code_profile"',
    "sourceAssetDefinitionReference.noFourSymbolInference !== true",
    "sourceProfileReference !==",
    'revealStatus: "READY_FOR_FUTURE_GENESIS_EXPERIENCE_PRESENTATION"',
  ].forEach((marker) =>
    assertIncludes("genesis experience mapping", serviceSource, marker),
  );

  [
    "resolveStarbeastFromBirthDate(",
    "resolveLifeArchetypeProfileFromMotherCode(",
    "resolveStarBeastAssetDefinition(",
    "runGeoChronoMotherFusionEngine(",
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
  ].forEach((marker) =>
    assertExcludes("mapping stays reference-only", serviceSource, marker),
  );

  [
    "StarBeastGenesisExperience",
    "resolveStarBeastGenesisExperience",
    "starBeastGenesisExperience",
  ].forEach((marker) => {
    assertExcludes("StarbeastLab remains disconnected", labSource, marker);
    assertExcludes("LaunchLab remains disconnected", launchSource, marker);
  });

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveStarBeastGenesisExperience(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "mapping consumer stays isolated preview only",
    callSites.join(","),
    [files.preview, files.service].join(","),
  );

  [
    "RC-STAR-BEAST-GENESIS-EXPERIENCE-SCHEMA-P86",
    "P83 已被",
    "不覆盖既有 P83",
    "Presentation Sequence",
    "不是 Causal Derivation Sequence",
    "Shared Temporal Birth Coordinate",
    "Twenty-Eight Mansion",
    "Four Symbol identity reference",
    "Mother Code（卦以八除）",
    "LifeArchetypeProfile",
    "四象不得反推八母码原型",
    "唯一正式来源仍是 `MotherCodeProfile`",
    "出生地点只保留为生命降临地点上下文",
    "不参与二十八宿、四象、星兽身份或母码推导",
    "不复制生日、星宿、四象、母码、原型语义或资产事实",
    "不接 Launch、Gravity、Dynamics 或正式用户流程",
  ].forEach((marker) =>
    assertIncludes("genesis experience protocol", protocolSource, marker),
  );
  assertIncludes(
    "existing P83 remains renderer input contract",
    existingP83Source,
    "RC-STAR-BEAST-PROTOTYPE-RENDERER-INPUT-CONTRACT-P83",
  );

  assertIncludes(
    "type index exports genesis state",
    typeIndexSource,
    "StarBeastGenesisExperienceState",
  );
  assertIncludes(
    "type index exports reveal result",
    typeIndexSource,
    "StarBeastGenesisRevealResult",
  );
  assertIncludes(
    "genesis experience gate registered",
    packageJson.scripts?.["check:star-beast-genesis-experience-schema"] ?? "",
    "node scripts/check-star-beast-genesis-experience-schema.mjs",
  );
  assertIncludes(
    "genesis experience gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-genesis-experience-schema",
  );

  const modulePaths = Object.freeze({
    genesis: path.join(
      os.tmpdir(),
      `guanyao-genesis-experience-${process.pid}.mjs`,
    ),
    asset: path.join(os.tmpdir(), `guanyao-genesis-asset-${process.pid}.mjs`),
  });
  await Promise.all([
    build({
      entryPoints: [absolute.service],
      outfile: modulePaths.genesis,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [absolute.assetMapping],
      outfile: modulePaths.asset,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);
  const { resolveStarBeastGenesisExperience } = await import(
    `file://${modulePaths.genesis}?t=${Date.now()}`
  );
  const { resolveStarBeastAssetDefinition } = await import(
    `file://${modulePaths.asset}?t=${Date.now()}`
  );

  const qianProfile = Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: "test:mother:qian",
    code: "QIAN",
    trigram: "乾",
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: "test-force",
    lifeIntention: "test-intention",
    shadowPattern: "test-shadow",
    awakeningDirection: "test-awakening",
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  });
  const assetDefinition =
    resolveStarBeastAssetDefinition(qianProfile).assetDefinition;
  const originCoordinateReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: "test:temporal-origin",
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });
  const derivationReference = Object.freeze({
    status: "READY",
    protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
    calculationBasis: "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION",
    gregorianBirthDate: "1979-04-15",
    lunarBirthDate: Object.freeze({
      relatedYear: 1979,
      month: 3,
      day: 19,
      isLeapMonth: false,
    }),
    mansionIndex: 6,
    mansion: "箕",
    fourSymbol: "青龙",
    direction: "东",
    symbolicTrigram: "震",
    locationIndependent: true,
    birthTimeIndependent: true,
  });
  const mansionReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_MANSION",
    referenceId: "test:mansion",
    sourceStarbeastDerivationReference: derivationReference,
  });
  const fourSymbolReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL",
    referenceId: "test:four-symbol",
    sourceMansionReference: mansionReference,
  });
  const lifeArchetypeReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_LIFE_ARCHETYPE",
    referenceId: "test:life-archetype",
    sourceRole: "MOTHER_CODE_PROFILE_ONLY",
    sourceLifeArchetypeProfileReference: qianProfile,
  });
  const starBeastAssetReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ASSET",
    referenceId: "test:asset",
    sourceAssetDefinitionReference: assetDefinition,
  });
  const completeInput = Object.freeze({
    originCoordinateReference,
    mansionReference,
    fourSymbolReference,
    lifeArchetypeReference,
    starBeastAssetReference,
  });
  const before = JSON.stringify(completeInput);
  const ready = resolveStarBeastGenesisExperience(completeInput);

  assertEqual("complete independent sources are ready", ready.status, "READY");
  assertEqual("ready reaches reveal stage", ready.experienceState.currentStage, "STAR_BEAST_REVEAL");
  assertEqual("ready preserves origin reference", ready.experienceState.originCoordinateReference === originCoordinateReference, true);
  assertEqual("ready preserves mansion reference", ready.experienceState.mansionReference === mansionReference, true);
  assertEqual("ready preserves four symbol reference", ready.experienceState.fourSymbolReference === fourSymbolReference, true);
  assertEqual("ready preserves life archetype reference", ready.experienceState.lifeArchetypeReference === lifeArchetypeReference, true);
  assertEqual("ready preserves asset reference", ready.experienceState.starBeastAssetReference === starBeastAssetReference, true);
  assertEqual("sequence is presentation only", ready.experienceState.presentationSequenceOnly, true);
  assertEqual("sequence is not causal derivation", ready.experienceState.notCausalDerivationSequence, true);
  assertEqual("mapping forbids four symbol inference", ready.boundary.noFourSymbolToLifeArchetypeInference, true);
  assertEqual("mapping mutates no input", JSON.stringify(completeInput) === before, true);

  const noOrigin = resolveStarBeastGenesisExperience(
    Object.freeze({ ...completeInput, originCoordinateReference: null }),
  );
  assertEqual("missing origin is unavailable", noOrigin.status, "UNAVAILABLE");
  assertEqual("missing origin stays cosmic", noOrigin.experienceState.currentStage, "COSMIC_ORIGIN");

  const noLifeArchetype = resolveStarBeastGenesisExperience(
    Object.freeze({ ...completeInput, lifeArchetypeReference: null }),
  );
  assertEqual("missing archetype is unavailable", noLifeArchetype.status, "UNAVAILABLE");
  assertEqual("missing archetype remains four symbol stage", noLifeArchetype.experienceState.currentStage, "FOUR_SYMBOL_FORMATION");

  const locationLeak = resolveStarBeastGenesisExperience(
    Object.freeze({
      ...completeInput,
      originCoordinateReference: Object.freeze({
        ...originCoordinateReference,
        birthLocationExcludedFromStarBeastDerivation: false,
      }),
    }),
  );
  assertEqual("birth location derivation leak is blocked", locationLeak.status, "BLOCKED");
  assertEqual("birth location leak reason", locationLeak.reason, "ORIGIN_COORDINATE_REFERENCE_INVALID");

  const timeLeakMansion = Object.freeze({
    ...mansionReference,
    sourceStarbeastDerivationReference: Object.freeze({
      ...derivationReference,
      birthTimeIndependent: false,
    }),
  });
  const timeLeak = resolveStarBeastGenesisExperience(
    Object.freeze({
      ...completeInput,
      mansionReference: timeLeakMansion,
      fourSymbolReference: Object.freeze({
        ...fourSymbolReference,
        sourceMansionReference: timeLeakMansion,
      }),
    }),
  );
  assertEqual("birth time leak into mansion is blocked", timeLeak.status, "BLOCKED");
  assertEqual("birth time leak reason", timeLeak.reason, "MANSION_SOURCE_REFERENCE_INVALID");

  const driftedFourSymbol = resolveStarBeastGenesisExperience(
    Object.freeze({
      ...completeInput,
      fourSymbolReference: Object.freeze({
        ...fourSymbolReference,
        sourceMansionReference: Object.freeze({ ...mansionReference }),
      }),
    }),
  );
  assertEqual("four symbol source drift is blocked", driftedFourSymbol.status, "BLOCKED");
  assertEqual("four symbol drift reason", driftedFourSymbol.reason, "FOUR_SYMBOL_SOURCE_REFERENCE_MISMATCH");

  const fourSymbolInferredArchetype = resolveStarBeastGenesisExperience(
    Object.freeze({
      ...completeInput,
      lifeArchetypeReference: Object.freeze({
        ...lifeArchetypeReference,
        sourceRole: "FOUR_SYMBOL_INFERENCE",
      }),
    }),
  );
  assertEqual("four symbol inferred archetype is blocked", fourSymbolInferredArchetype.status, "BLOCKED");
  assertEqual("four symbol inference reason", fourSymbolInferredArchetype.reason, "LIFE_ARCHETYPE_SOURCE_REFERENCE_INVALID");

  const alternateProfile = Object.freeze({
    ...qianProfile,
    sourceMotherCodeId: "test:mother:qian:alternate",
  });
  const assetMismatch = resolveStarBeastGenesisExperience(
    Object.freeze({
      ...completeInput,
      lifeArchetypeReference: Object.freeze({
        ...lifeArchetypeReference,
        sourceLifeArchetypeProfileReference: alternateProfile,
      }),
    }),
  );
  assertEqual("asset archetype reference mismatch is blocked", assetMismatch.status, "BLOCKED");
  assertEqual("asset mismatch reason", assetMismatch.reason, "STAR_BEAST_ASSET_ARCHETYPE_REFERENCE_MISMATCH");

  Object.values(modulePaths).forEach((modulePath) =>
    fs.rmSync(modulePath, { force: true }),
  );
}

if (failures.length > 0) {
  console.error(
    `FAIL | star beast genesis experience schema | count=${failures.length}`,
  );
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast genesis experience schema gate");
