import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  visualGrammar: "docs/GUANYAO_VISUAL_MANIFESTATION_GRAMMAR.md",
  sceneModelProtocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_CONTRACT.md",
  authorizationReview:
    "docs/GUANYAO_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW_PROTOCOL.md",
  fixtureProtocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_PROTOCOL.md",
  fixtureType: "src/types/personalStarBeastSceneModelFixture.ts",
  sceneModelType: "src/types/personalStarBeastSceneModel.ts",
  fixtureData: "src/mocks/starBeastSceneModelFixtures.ts",
  validationService:
    "src/services/personalStarBeastSceneModelFixtureValidation.ts",
  motherCodeSourceGate:
    "scripts/check-mother-code-life-archetype-source.mjs",
  foundationFreezeGate:
    "scripts/check-original-self-life-schema-foundation-freeze.mjs",
  manifestationReadinessGate:
    "scripts/check-personal-star-beast-manifestation-readiness.mjs",
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
  if (actual !== expected) {
    failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  } else {
    console.log(`PASS | ${name} | expected=${String(expected)}`);
  }
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

  assertIncludes(
    "P0 formal visual chain remains",
    source.productConstitution,
    "Identity\n↓\nManifestation\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P1 formal identity remains",
    source.lifeConstitution,
    "PersonalStarBeastIdentity",
  );
  assertIncludes(
    "P92 grammar remains identity downstream",
    source.visualGrammar,
    "Identity\n↓\nManifestation Grammar\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P94 keeps renderer neutral scene model",
    source.sceneModelProtocol,
    "RENDERER-NEUTRAL CONTRACT ONLY / NO WEBGL AUTHORIZATION",
  );
  assertIncludes(
    "P95 requires two formal cases",
    source.authorizationReview,
    "Case A｜现有正式来源基线",
  );
  assertIncludes(
    "P95 keeps execution unauthorized",
    source.authorizationReview,
    "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION",
  );

  [
    "export type PersonalStarBeastSceneModelFixture",
    "fixtureId: string",
    "identitySourceReference: StarBeastIdentitySource",
    "mansionSeedReference: StarBeastMansionSeedSource",
    "fourSymbolFieldReference: StarBeastFourSymbolFieldSource",
    "lifeArchetypeReference: StarBeastLifeArchetypeForceSource",
    "sceneModelReference: PersonalStarBeastSceneModel",
    'validationScope: "ISOLATED_PROTOTYPE_ONLY"',
    "export type PersonalStarBeastSceneModelFixtureValidationResult",
    'validation: "SAME_GRAMMAR_DIFFERENT_LIFE_CONFIRMED"',
    "noIdentityFactCopy: true",
    "noRenderPlanCreation: true",
    "noRendererInvocation: true",
    "noWebGLActivation: true",
    "noProductionIntegration: true",
  ].forEach((marker) =>
    assertIncludes("fixture contract", source.fixtureType, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "calibrateStarBeastGenesisSource",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "resolvePersonalStarBeastManifestationReadiness",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURES",
    'referenceId: MANIFESTATION_GRAMMAR_REFERENCE_ID',
    'protocolVersion: "GUANYAO_VISUAL_MANIFESTATION_GRAMMAR_V1"',
    "sourceIdentityReference: identityReference",
    'validationScope: "ISOLATED_PROTOTYPE_ONLY"',
    "rendererNeutral: true",
    "noLifeFactCopy: true",
    "noIdentityCalculation: true",
    "noDrawCommands: true",
    "noRendererInvocation: true",
  ].forEach((marker) =>
    assertIncludes("formal fixture source", source.fixtureData, marker),
  );

  [
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
    "motherCodeId:",
    "lowerTrigram:",
  ].forEach((marker) =>
    assertExcludes("fixture does not hardcode identity facts", source.fixtureData, marker),
  );

  [
    "export function validatePersonalStarBeastSceneModelFixturePair",
    'sourceEngine !==\n      "guanyao_starbeast_engine"',
    'sourceEngine !==\n      "guanyao_lunar_mother_code_landing"',
    "sourceMotherCodeId !==",
    "profileReference\n        .motherCodeId",
    "leftGrammar.referenceId !== rightGrammar.referenceId",
    "leftGrammar.protocolVersion !== rightGrammar.protocolVersion",
    "mansionSeedDifferent",
    "fourSymbolFieldDifferent",
    "lifeArchetypeForceDifferent",
    "sceneModelExpressionReferenceDifferent",
    'validation: "SAME_GRAMMAR_DIFFERENT_LIFE_CONFIRMED"',
    "noRenderPlanCreation: true",
    "noRendererInvocation: true",
    "noWebGLActivation: true",
  ].forEach((marker) =>
    assertIncludes("fixture validation service", source.validationService, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "calibrateStarBeastGenesisSource",
    "createPersonalStarBeast",
    "StarBeastRenderPlan",
    "render(",
    "getContext(",
    "requestAnimationFrame",
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((marker) =>
    assertExcludes("validation remains read-only", source.validationService, marker),
  );

  [
    "GUANYAO Personal Star Beast Scene Model Fixture Protocol V1.0",
    "ISOLATED FORMAL FIXTURES ONLY / RENDERER NOT AUTHORIZED",
    "Fixture 不是视觉结果，不是 Renderer Input，不是 RenderPlan",
    "只固定隔离验证用的时间输入，不固定任何生命结果",
    "Case A｜Formal Identity Baseline A",
    "Case B｜Formal Identity Baseline B",
    "same referenceId",
    "same protocolVersion",
    "each reference points to its own formal identity",
    "同一语法、不同生命",
    "Scene Model → RenderPlan Adapter Review",
    "仍不得直接进入 WebGL 或 Renderer 施工",
  ].forEach((marker) =>
    assertIncludes("fixture protocol", source.fixtureProtocol, marker),
  );

  [
    "PersonalStarBeastSceneModelFixture",
    "PersonalStarBeastSceneModelFixtureValidationResult",
    'from "./personalStarBeastSceneModelFixture"',
  ].forEach((marker) =>
    assertIncludes("type index exports fixture contract", source.typeIndex, marker),
  );

  assertIncludes(
    "P13 bridge allows only the isolated P96 fixture consumer",
    source.motherCodeSourceGate,
    '"src/mocks/starBeastSceneModelFixtures.ts"',
  );
  assertIncludes(
    "P13 bridge allowlist remains explicit",
    source.motherCodeSourceGate,
    "source bridge is only consumed by schema entry and isolated genesis previews plus isolated scene model fixtures",
  );
  assertIncludes(
    "P20 foundation freeze allows only the isolated P96 fixture consumer",
    source.foundationFreezeGate,
    'isolatedSceneModelFixture: "src/mocks/starBeastSceneModelFixtures.ts"',
  );
  assertIncludes(
    "P90 readiness allows only the isolated P96 fixture consumer",
    source.manifestationReadinessGate,
    'isolatedSceneModelFixture: "src/mocks/starBeastSceneModelFixtures.ts"',
  );
  assertIncludes(
    "P20 foundation freeze allowlist remains explicit",
    source.foundationFreezeGate,
    "mother code source is owned by entry and isolated genesis previews plus isolated scene model fixtures",
  );

  [
    "rendererNeutral: true",
    "referenceOnly: true",
    "noIdentityCalculation: true",
    "noDrawCommands: true",
    "noRendererInvocation: true",
  ].forEach((marker) =>
    assertIncludes("P94 scene model boundary remains", source.sceneModelType, marker),
  );

  const dependencies = Object.freeze({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });
  if (!Object.hasOwn(dependencies, "three")) {
    failures.push("P99 authorized Three.js dependency is required");
  } else {
    console.log("PASS | P96 fixtures remain separate from P99 dependency");
  }
  if (Object.hasOwn(dependencies, "@react-three/fiber")) {
    failures.push("React Three Fiber remains outside P99 scope");
  } else {
    console.log("PASS | React Three Fiber remains absent");
  }

  const srcFiles = [];
  const collectSourceFiles = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collectSourceFiles(entryPath);
      else if (/\.tsx?$/.test(entry.name)) srcFiles.push(entryPath);
    }
  };
  collectSourceFiles(path.join(rootDir, "src"));
  const fixtureConsumers = srcFiles
    .filter((filePath) =>
      fs
        .readFileSync(filePath, "utf8")
        .includes('from "../mocks/starBeastSceneModelFixtures"'),
    )
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "fixture has no Production consumer",
    fixtureConsumers.join(","),
    "",
  );

  assertIncludes(
    "P96 gate registered",
    packageJson.scripts?.["check-personal-star-beast-scene-model-fixtures"] ?? "",
    "node scripts/check-personal-star-beast-scene-model-fixtures.mjs",
  );
  assertIncludes(
    "release includes P96 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-personal-star-beast-scene-model-fixtures",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-personal-star-beast-scene-model-fixtures-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export {
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURES,
        } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { validatePersonalStarBeastSceneModelFixturePair } from "./src/services/personalStarBeastSceneModelFixtureValidation.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "personal-star-beast-scene-model-fixtures-gate-entry.ts",
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
  const fixtures = runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURES;
  const before = JSON.stringify(fixtures);
  const validation = runtime.validatePersonalStarBeastSceneModelFixturePair(
    fixtures,
  );
  assertEqual("exactly two fixtures exist", fixtures.length, 2);
  assertEqual("formal fixture pair validates", validation.status, "VALID");
  assertEqual(
    "same grammar different life is confirmed",
    validation.validation,
    "SAME_GRAMMAR_DIFFERENT_LIFE_CONFIRMED",
  );
  assertEqual(
    "fixture validation does not mutate sources",
    JSON.stringify(fixtures) === before,
    true,
  );

  const [caseA, caseB] = fixtures;
  assertEqual(
    "grammar reference id is shared",
    caseA.sceneModelReference.sourceManifestationGrammarReference.referenceId,
    caseB.sceneModelReference.sourceManifestationGrammarReference.referenceId,
  );
  assertEqual(
    "grammar protocol is shared",
    caseA.sceneModelReference.sourceManifestationGrammarReference.protocolVersion,
    caseB.sceneModelReference.sourceManifestationGrammarReference.protocolVersion,
  );
  assertEqual(
    "case A grammar preserves its identity",
    caseA.sceneModelReference.sourceManifestationGrammarReference
      .sourceIdentityReference,
    caseA.identitySourceReference.personalStarBeastReference,
  );
  assertEqual(
    "case B grammar preserves its identity",
    caseB.sceneModelReference.sourceManifestationGrammarReference
      .sourceIdentityReference,
    caseB.identitySourceReference.personalStarBeastReference,
  );
  assertEqual(
    "identity references differ",
    validation.status === "VALID" &&
      validation.difference.identityReferenceDifferent,
    true,
  );
  assertEqual(
    "scene expression references differ",
    validation.status === "VALID" &&
      validation.difference.sceneModelExpressionReferenceDifferent,
    true,
  );
  assertEqual(
    "at least one formal life source differs",
    validation.status === "VALID" &&
      (validation.difference.mansionSeedDifferent ||
        validation.difference.fourSymbolFieldDifferent ||
        validation.difference.lifeArchetypeForceDifferent),
    true,
  );

  const grammarDriftFixture = Object.freeze({
    ...caseB,
    sceneModelReference: Object.freeze({
      ...caseB.sceneModelReference,
      sourceManifestationGrammarReference: Object.freeze({
        ...caseB.sceneModelReference.sourceManifestationGrammarReference,
        referenceId: "fixture:invalid-grammar-drift",
      }),
    }),
  });
  const grammarDrift = runtime.validatePersonalStarBeastSceneModelFixturePair(
    Object.freeze([caseA, grammarDriftFixture]),
  );
  assertEqual("grammar drift is blocked", grammarDrift.status, "BLOCKED");
  assertEqual(
    "grammar drift reason",
    grammarDrift.reason,
    "MANIFESTATION_GRAMMAR_REFERENCE_MISMATCH",
  );

  const copiedIdentityFixture = Object.freeze({
    ...caseA,
    fixtureId: "personal-star-beast-scene-model-case-a-copy",
  });
  const copiedIdentity =
    runtime.validatePersonalStarBeastSceneModelFixturePair(
      Object.freeze([caseA, copiedIdentityFixture]),
    );
  assertEqual("copied identity is blocked", copiedIdentity.status, "BLOCKED");
  assertEqual(
    "copied identity reason",
    copiedIdentity.reason,
    "IDENTITY_REFERENCE_NOT_DISTINCT",
  );

  const reassignedFieldFixture = Object.freeze({
    ...caseB,
    fourSymbolFieldReference: caseA.fourSymbolFieldReference,
  });
  const reassignedField =
    runtime.validatePersonalStarBeastSceneModelFixturePair(
      Object.freeze([caseA, reassignedFieldFixture]),
    );
  assertEqual(
    "manually reassigned field is blocked",
    reassignedField.status,
    "BLOCKED",
  );
  assertEqual(
    "manually reassigned field reason",
    reassignedField.reason,
    "FORMAL_FOUR_SYMBOL_SOURCE_INVALID",
  );

  console.log(
    `INFO | case A formal derivation | mansion=${caseA.mansionSeedReference.sourceMansionResultReference.resultReference.mansion} | field=${caseA.fourSymbolFieldReference.sourceFourSymbolResultReference.resultReference.fourSymbol} | force=${caseA.lifeArchetypeReference.sourceLifeArchetypeProfileReference.code}`,
  );
  console.log(
    `INFO | case B formal derivation | mansion=${caseB.mansionSeedReference.sourceMansionResultReference.resultReference.mansion} | field=${caseB.fourSymbolFieldReference.sourceFourSymbolResultReference.resultReference.fourSymbol} | force=${caseB.lifeArchetypeReference.sourceLifeArchetypeProfileReference.code}`,
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Personal Star Beast Scene Model Fixtures gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Personal Star Beast Scene Model Fixtures gate passed.");
