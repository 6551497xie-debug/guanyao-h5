import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastManifestationReadiness.ts",
  service: "src/services/personalStarBeastManifestationReadiness.ts",
  protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_MANIFESTATION_READINESS_PROTOCOL.md",
  p89Type: "src/types/starMansionLifeTrajectory.ts",
  p89IdentityType: "src/types/starBeastIdentitySource.ts",
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

  [
    "export type PersonalStarBeastManifestationReadinessInput",
    "starMansionLifeTrajectorySourceReference:",
    "starBeastIdentitySourceReference:",
    "originCoordinateReference:",
    "mansionResultReference:",
    "fourSymbolResultReference:",
    "motherCodeProfileReference:",
    "lifeArchetypeProfileReference:",
    "export type PersonalStarBeastManifestationReadinessResult",
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    'readiness: "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN"',
    "noPersonalStarBeastCreation: true",
    "noManifestationDesign: true",
    "noVisualParameterGeneration: true",
    "noRendererInvocation: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("manifestation readiness contract", source.type, marker),
  );

  [
    "export function resolvePersonalStarBeastManifestationReadiness",
    "identitySource !== trajectory.starBeastIdentitySource",
    "originCoordinate !== trajectory.originCoordinateReference",
    "mansion !== trajectory.mansionResultReference",
    "fourSymbol !== trajectory.fourSymbolResultReference",
    "motherCode !== trajectory.motherCodeProfileReference",
    "lifeArchetype !== trajectory.lifeArchetypeProfileReference",
    "mansion.resultReference !== fourSymbol.resultReference",
    "lifeArchetype.sourceMotherCodeId !==",
    "motherCode.profileReference.motherCodeId",
    "MANSION_SEED_FIELD_FORCE_CONVERGENCE",
    "notFourSymbolAnimal !== true",
    "notGeneratedAsset !== true",
    "notLifeState !== true",
    'status: "READY"',
    'readiness: "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN"',
  ].forEach((marker) =>
    assertIncludes("manifestation readiness service", source.service, marker),
  );

  [
    'from "./starMansionLifeTrajectorySourceFreeze"',
    'from "./starBeastGenesisSourceCalibration"',
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "new PersonalStarBeast",
    "createPersonalStarBeast",
    "renderPersonalStarBeast",
    "getContext(",
    "requestAnimationFrame",
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((marker) =>
    assertExcludes("readiness validates references only", source.service, marker),
  );

  [
    "Readiness 不等于 Manifestation",
    "七个输入字段都必须与同一个 P89 Source",
    "字段值看似相同但来自另一对象时",
    "本命星宿结果存在",
    "四象结果存在",
    "LifeArchetypeProfile.sourceMotherCodeId = MotherCodeProfile.motherCodeId",
    "不是四象动物、不是已生成资产、不是 Life State",
    "P84–P87 仍保持 `FOUR_SYMBOL_VISUAL_EXPERIMENT`",
    "不创建 `PersonalStarBeast`",
  ].forEach((marker) =>
    assertIncludes("manifestation readiness protocol", source.protocol, marker),
  );

  assertIncludes(
    "P90 consumes P89 trajectory source",
    source.type,
    'from "./starMansionLifeTrajectory"',
  );
  assertIncludes(
    "P90 consumes P89 identity source",
    source.type,
    'from "./starBeastIdentitySource"',
  );
  assertIncludes(
    "P89 remains reference-only",
    source.p89Type,
    "referenceOnly: true",
  );
  assertIncludes(
    "P89 identity remains entity-free",
    source.p89IdentityType,
    "noPersonalStarBeastEntityCreation: true",
  );
  assertIncludes(
    "type index exports readiness input",
    source.typeIndex,
    "PersonalStarBeastManifestationReadinessInput",
  );
  assertIncludes(
    "type index exports readiness result",
    source.typeIndex,
    "PersonalStarBeastManifestationReadinessResult",
  );
  assertIncludes(
    "P90 gate registered",
    packageJson.scripts?.["check:personal-star-beast-manifestation-readiness"] ?? "",
    "node scripts/check-personal-star-beast-manifestation-readiness.mjs",
  );
  assertIncludes(
    "P90 gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:personal-star-beast-manifestation-readiness",
  );

  const callSites = [];
  const collectCallSites = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collectCallSites(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const fileSource = fs.readFileSync(entryPath, "utf8");
        if (fileSource.includes("resolvePersonalStarBeastManifestationReadiness(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collectCallSites(path.join(rootDir, "src"));
  assertEqual("readiness has no product consumer", callSites.join(","), files.service);

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-personal-star-beast-manifestation-readiness-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { resolveStarbeastFromBirthDate } from "./src/services/guanyaoStarbeastEngineService.ts";
        export { runMotherCodeLandingEngine } from "./src/services/guanyaoLunarMotherCodeLandingAdapter.ts";
        export { calibrateStarBeastGenesisSource } from "./src/services/starBeastGenesisSourceCalibration.ts";
        export { resolveLifeArchetypeProfileFromMotherCode } from "./src/services/motherCodeLifeArchetypeSource.ts";
        export { freezeStarMansionLifeTrajectorySource } from "./src/services/starMansionLifeTrajectorySourceFreeze.ts";
        export { resolvePersonalStarBeastManifestationReadiness } from "./src/services/personalStarBeastManifestationReadiness.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "personal-star-beast-manifestation-readiness-gate-entry.ts",
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
  assertEqual("P88 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("MotherCode bridge is ready", archetype.status, "READY");

    if (archetype.status === "READY") {
      const freeze = runtime.freezeStarMansionLifeTrajectorySource(
        Object.freeze({
          originCoordinateReference:
            calibration.sourceIdentity.originCoordinateReference,
          mansionResultReference:
            calibration.sourceIdentity.mansionResultReference,
          fourSymbolResultReference:
            calibration.sourceIdentity.fourSymbolResultReference,
          motherCodeProfileReference:
            calibration.sourceIdentity.motherCodeProfileReference,
          lifeArchetypeProfileReference: archetype.lifeArchetypeProfile,
        }),
      );
      assertEqual("P89 formal source freezes", freeze.status, "AVAILABLE");

      if (freeze.status === "AVAILABLE") {
        const trajectory = freeze.source;
        const readyInput = Object.freeze({
          starMansionLifeTrajectorySourceReference: trajectory,
          starBeastIdentitySourceReference: trajectory.starBeastIdentitySource,
          originCoordinateReference: trajectory.originCoordinateReference,
          mansionResultReference: trajectory.mansionResultReference,
          fourSymbolResultReference: trajectory.fourSymbolResultReference,
          motherCodeProfileReference: trajectory.motherCodeProfileReference,
          lifeArchetypeProfileReference: trajectory.lifeArchetypeProfileReference,
        });
        const before = JSON.stringify(readyInput);
        const ready = runtime.resolvePersonalStarBeastManifestationReadiness(
          readyInput,
        );
        assertEqual("complete formal source is ready", ready.status, "READY");
        assertEqual(
          "readiness authorizes design only",
          ready.readiness,
          "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN",
        );
        assertEqual(
          "identity reference is preserved",
          ready.personalStarBeastIdentityReference,
          trajectory.starBeastIdentitySource.personalStarBeastReference,
        );
        assertEqual(
          "readiness does not create PersonalStarBeast",
          ready.boundary.noPersonalStarBeastCreation,
          true,
        );
        assertEqual(
          "readiness does not design manifestation",
          ready.boundary.noManifestationDesign,
          true,
        );
        assertEqual(
          "readiness does not invoke renderer",
          ready.boundary.noRendererInvocation,
          true,
        );
        assertEqual(
          "readiness does not mutate formal sources",
          JSON.stringify(readyInput),
          before,
        );

        const unavailable = runtime.resolvePersonalStarBeastManifestationReadiness(
          Object.freeze({ ...readyInput, mansionResultReference: null }),
        );
        assertEqual("missing mansion is unavailable", unavailable.status, "UNAVAILABLE");
        assertEqual(
          "missing mansion reason",
          unavailable.reason,
          "MANSION_RESULT_REFERENCE_REQUIRED",
        );

        const copiedOrigin = runtime.resolvePersonalStarBeastManifestationReadiness(
          Object.freeze({
            ...readyInput,
            originCoordinateReference: Object.freeze({
              ...trajectory.originCoordinateReference,
            }),
          }),
        );
        assertEqual("copied origin reference is blocked", copiedOrigin.status, "BLOCKED");
        assertEqual(
          "copied origin reason",
          copiedOrigin.reason,
          "ORIGIN_COORDINATE_SOURCE_MISMATCH",
        );

        const copiedIdentity = runtime.resolvePersonalStarBeastManifestationReadiness(
          Object.freeze({
            ...readyInput,
            starBeastIdentitySourceReference: Object.freeze({
              ...trajectory.starBeastIdentitySource,
            }),
          }),
        );
        assertEqual("copied identity source is blocked", copiedIdentity.status, "BLOCKED");
        assertEqual(
          "copied identity reason",
          copiedIdentity.reason,
          "STAR_BEAST_IDENTITY_SOURCE_MISMATCH",
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Manifestation Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nPersonal Star Beast Manifestation Readiness gate passed.");
