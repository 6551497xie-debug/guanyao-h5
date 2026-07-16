import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  trajectoryType: "src/types/starMansionLifeTrajectory.ts",
  identityType: "src/types/starBeastIdentitySource.ts",
  service: "src/services/starMansionLifeTrajectorySourceFreeze.ts",
  sourceProtocol:
    "docs/GUANYAO_STAR_MANSION_LIFE_TRAJECTORY_SOURCE_FREEZE_PROTOCOL.md",
  experimentProtocol:
    "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIMENT_STATUS_PROTOCOL.md",
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

  const trajectoryStages = [
    "COSMIC_SKY",
    "TWENTY_EIGHT_MANSION_REVEAL",
    "LIFE_ARRIVAL_COORDINATE",
    "TIME_SEQUENCE_ALIGNMENT",
    "BIRTH_MANSION_IGNITION",
    "FOUR_SYMBOL_ALIGNMENT",
    "MOTHER_CODE_INFUSION",
    "PERSONAL_STAR_BEAST_REVEAL",
    "REALITY_PRESSURE",
    "GRAVITY_SIX_SPACE_EXPERIENCE",
    "CHOICE_PERSONA_MIGRATION",
    "CRYSTAL_IMPRINT",
  ];

  [
    "export type StarMansionLifeTrajectoryStage",
    "export type StarMansionLifeTrajectoryPath",
    "export type StarMansionLifeTrajectorySourceFreezeInput",
    "originCoordinateReference:",
    "mansionResultReference:",
    "fourSymbolResultReference:",
    "motherCodeProfileReference:",
    "lifeArchetypeProfileReference:",
    "presentationTrajectoryNotCalculationDependency: true",
    "noGravityInvocation: true",
    "noChoiceOrMigrationExecution: true",
    "noCrystalCreation: true",
  ].forEach((marker) =>
    assertIncludes("trajectory source contract", source.trajectoryType, marker),
  );
  trajectoryStages.forEach((stage) =>
    assertIncludes("twelve-stage trajectory", source.trajectoryType, `\"${stage}\"`),
  );

  [
    "BIRTH_MANSION_LIFE_SEED",
    "FOUR_SYMBOL_MORPHOLOGICAL_FIELD",
    "LIFE_ARCHETYPE_FORCE",
    "MANSION_SEED_FIELD_FORCE_CONVERGENCE",
    "independentSourcesBeforeConvergence: true",
    "mansionDoesNotInferFourSymbolField: true",
    "fourSymbolDoesNotInferLifeArchetypeForce: true",
    "motherCodeDoesNotChangeMansionSource: true",
    "noPersonalStarBeastEntityCreation: true",
    "noRendererAssetCreation: true",
  ].forEach((marker) =>
    assertIncludes("identity source boundary", source.identityType, marker),
  );
  [
    "animalModel",
    "canvas",
    "particleDensity",
    "StarBeastState",
    "CrystalState",
  ].forEach((marker) =>
    assertExcludes("identity source contains references only", source.identityType, marker),
  );

  [
    "export const STAR_MANSION_LIFE_TRAJECTORY_PATH",
    "export function freezeStarMansionLifeTrajectorySource",
    'sourceEngine !== "guanyao_starbeast_engine"',
    'sourceEngine !== "guanyao_lunar_mother_code_landing"',
    "fourSymbol.resultReference !== mansion.resultReference",
    "lifeArchetype.sourceMotherCodeId !==",
    "motherCode.profileReference.motherCodeId",
    "createIdentitySource(input)",
    "sourceFreezeOnly: true",
    "noEngineMutation: true",
    "noRendererMutation: true",
    "noUIIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("source freeze service", source.service, marker),
  );
  trajectoryStages.forEach((stage) =>
    assertIncludes("service keeps full trajectory", source.service, `\"${stage}\"`),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "calibrateStarBeastGenesisSource",
    "render(",
    "getContext(",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("freeze service does not calculate render or persist", source.service, marker),
  );

  [
    "最高体验链固定为完整十二阶段",
    "本命星宿：生命种子",
    "四象：生命形态场",
    "MotherCodeProfile",
    "LifeArchetypeProfile",
    "MansionSeed",
    "FourSymbolField",
    "LifeArchetypeForce",
    "PersonalStarBeastIdentityReference",
    "体验语义，不是新的计算依赖",
  ].forEach((marker) =>
    assertIncludes("source freeze protocol", source.sourceProtocol, marker),
  );
  [
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
    "PERSONAL_STAR_BEAST_SOURCE_VALIDATION",
    "P84 `StarBeastGenesisPrototypeAsset`",
    "P85 `Genesis Renderer Slice`",
    "P86 `Cosmic Consciousness`",
    "P87 `Stellar Flesh`",
    "白虎不是 Personal Star Beast",
    "不能直接作为正式 Renderer",
  ].forEach((marker) =>
    assertIncludes("experiment status protocol", source.experimentProtocol, marker),
  );

  assertIncludes(
    "type index exports identity source",
    source.typeIndex,
    "StarBeastIdentitySource",
  );
  assertIncludes(
    "type index exports trajectory source",
    source.typeIndex,
    "StarMansionLifeTrajectorySource",
  );
  assertIncludes(
    "source freeze gate registered",
    packageJson.scripts?.["check:star-mansion-life-trajectory-source-freeze"] ?? "",
    "node scripts/check-star-mansion-life-trajectory-source-freeze.mjs",
  );
  assertIncludes(
    "source freeze gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-mansion-life-trajectory-source-freeze",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-star-mansion-life-trajectory-source-freeze-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { resolveStarbeastFromBirthDate } from "./src/services/guanyaoStarbeastEngineService.ts";
        export { runMotherCodeLandingEngine } from "./src/services/guanyaoLunarMotherCodeLandingAdapter.ts";
        export { calibrateStarBeastGenesisSource } from "./src/services/starBeastGenesisSourceCalibration.ts";
        export { resolveLifeArchetypeProfileFromMotherCode } from "./src/services/motherCodeLifeArchetypeSource.ts";
        export { freezeStarMansionLifeTrajectorySource, STAR_MANSION_LIFE_TRAJECTORY_PATH } from "./src/services/starMansionLifeTrajectorySourceFreeze.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "star-mansion-life-trajectory-source-freeze-gate-entry.ts",
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
  const birth = Object.freeze({
    year: 1979,
    month: 3,
    day: 28,
    hourBranch: "未时",
  });
  const starbeast = runtime.resolveStarbeastFromBirthDate(birth);
  const motherCodeLanding = runtime.runMotherCodeLandingEngine(birth);
  const originCoordinateReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: "gate:1979-03-28:wei",
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });
  const calibration = runtime.calibrateStarBeastGenesisSource(
    Object.freeze({
      originCoordinateReference,
      starbeastDerivationResultReference: starbeast,
      motherCodeLandingResultReference: motherCodeLanding,
    }),
  );
  assertEqual("formal P88 calibration is available", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const lifeArchetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("formal MotherCode bridge is ready", lifeArchetype.status, "READY");

    if (lifeArchetype.status === "READY") {
      const input = Object.freeze({
        originCoordinateReference:
          calibration.sourceIdentity.originCoordinateReference,
        mansionResultReference:
          calibration.sourceIdentity.mansionResultReference,
        fourSymbolResultReference:
          calibration.sourceIdentity.fourSymbolResultReference,
        motherCodeProfileReference:
          calibration.sourceIdentity.motherCodeProfileReference,
        lifeArchetypeProfileReference: lifeArchetype.lifeArchetypeProfile,
      });
      const before = JSON.stringify(input);
      const available = runtime.freezeStarMansionLifeTrajectorySource(input);
      assertEqual("formal references freeze", available.status, "AVAILABLE");
      if (available.status === "AVAILABLE") {
        assertEqual(
          "trajectory keeps all twelve stages",
          available.source.trajectoryPath.join("→"),
          trajectoryStages.join("→"),
        );
        assertEqual(
          "mansion result object is preserved",
          available.source.mansionResultReference.resultReference,
          starbeast,
        );
        assertEqual(
          "four symbol result object is preserved",
          available.source.fourSymbolResultReference.resultReference,
          starbeast,
        );
        assertEqual(
          "MotherCode profile object is preserved",
          available.source.motherCodeProfileReference.profileReference,
          motherCodeLanding.motherCodeProfile,
        );
        assertEqual(
          "LifeArchetype profile object is preserved",
          available.source.lifeArchetypeProfileReference,
          lifeArchetype.lifeArchetypeProfile,
        );
        assertEqual(
          "personal star beast stays identity reference",
          available.source.starBeastIdentitySource.personalStarBeastReference.notGeneratedAsset,
          true,
        );
      }
      assertEqual("source freeze does not mutate input", JSON.stringify(input), before);
      assertEqual(
        "exported trajectory path is exact",
        runtime.STAR_MANSION_LIFE_TRAJECTORY_PATH.join("→"),
        trajectoryStages.join("→"),
      );

      const mismatchedArchetype = Object.freeze({
        ...lifeArchetype.lifeArchetypeProfile,
        sourceMotherCodeId: "mother-code:mismatch",
      });
      const mismatch = runtime.freezeStarMansionLifeTrajectorySource(
        Object.freeze({
          ...input,
          lifeArchetypeProfileReference: mismatchedArchetype,
        }),
      );
      assertEqual("MotherCode bridge mismatch is blocked", mismatch.status, "BLOCKED");
      assertEqual(
        "MotherCode bridge mismatch reason",
        mismatch.reason,
        "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH",
      );

      const otherStarbeast = runtime.resolveStarbeastFromBirthDate(
        Object.freeze({ ...birth, day: 29 }),
      );
      const sourceMismatch = runtime.freezeStarMansionLifeTrajectorySource(
        Object.freeze({
          ...input,
          fourSymbolResultReference: Object.freeze({
            referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
            sourceEngine: "guanyao_starbeast_engine",
            resultReference: otherStarbeast,
          }),
        }),
      );
      assertEqual("independent engine object mismatch is blocked", sourceMismatch.status, "BLOCKED");
      assertEqual(
        "independent engine object mismatch reason",
        sourceMismatch.reason,
        "MANSION_FOUR_SYMBOL_SOURCE_MISMATCH",
      );

      const unavailable = runtime.freezeStarMansionLifeTrajectorySource(
        Object.freeze({ ...input, mansionResultReference: null }),
      );
      assertEqual("missing source remains unavailable", unavailable.status, "UNAVAILABLE");
      assertEqual(
        "missing source reason",
        unavailable.reason,
        "MANSION_RESULT_REFERENCE_REQUIRED",
      );
    }
  }
}

if (failures.length > 0) {
  console.error("\nStar Mansion Life Trajectory source freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Mansion Life Trajectory source freeze gate passed.");
