import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceAdapterReadiness.ts",
  service: "src/services/productionIdentitySourceAdapterReadiness.ts",
  p89Type: "src/types/starMansionLifeTrajectory.ts",
  identityType: "src/types/starBeastIdentitySource.ts",
  p90Type: "src/types/personalStarBeastManifestationReadiness.ts",
  fixture: "src/mocks/starBeastSceneModelFixtures.ts",
  protocol: "docs/GUANYAO_PRODUCTION_IDENTITY_SOURCE_ADAPTER_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceAdapterReadinessInput",
    "sourceTrajectoryReference:",
    "export type ProductionIdentitySourceAdapterReference",
    "PRODUCTION_IDENTITY_SOURCE_ENTRY",
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    'readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER"',
    "noUserInputBinding: true",
    "noProductIntegration: true",
    "noSceneModelCreation: true",
    "noRendererInvocation: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("P114 readiness contract", source.type, marker),
  );

  [
    "export function resolveProductionIdentitySourceAdapterReadiness",
    "trajectory.semanticRole !== \"STAR_MANSION_LIFE_TRAJECTORY_SOURCE\"",
    "trajectory.boundary.sourceFreezeOnly !== true",
    "originCoordinate.birthLocationContextOnly !== true",
    "mansion.sourceEngine !== \"guanyao_starbeast_engine\"",
    "fourSymbol.sourceEngine !== \"guanyao_starbeast_engine\"",
    "motherCode.sourceEngine !== \"guanyao_lunar_mother_code_landing\"",
    "identitySource.semanticRole !== \"STAR_BEAST_IDENTITY_SOURCE\"",
    "identitySource.mansionSeed.sourceMansionResultReference !== mansion",
    "mansion.resultReference !== fourSymbol.resultReference",
    "lifeArchetype.sourceMotherCodeId !==",
    "PERSONAL_IDENTITY_CONVERGENCE_INVALID",
    'readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER"',
  ].forEach((marker) =>
    assertIncludes("P114 readiness service", source.service, marker),
  );

  [
    "P114 Production Identity Source Adapter Readiness Protocol",
    "RC-PRODUCTION-IDENTITY-SOURCE-ADAPTER-READINESS-P114",
    "不接用户",
    "不接产品",
    "P89 StarMansionLifeTrajectorySource",
    "未来正式适配器可读取的入口引用",
    "不创建 Scene Model",
    "不调用 Renderer",
    "不写 Storage",
  ].forEach((marker) =>
    assertIncludes("P114 readiness protocol", source.protocol, marker),
  );

  [
    "from \"../mocks/starBeastSceneModelFixtures\"",
    "from \"react\"",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "localStorage",
    "sessionStorage",
    "requestAnimationFrame",
    "createPersonalStarBeast",
    "createSceneModel",
  ].forEach((marker) =>
    assertExcludes("P114 service remains source-only", source.service, marker),
  );

  [
    "ProductionIdentitySourceAdapterReadinessInput",
    "ProductionIdentitySourceAdapterReadinessResult",
    "ProductionIdentitySourceAdapterReference",
  ].forEach((marker) =>
    assertIncludes("P114 type index export", source.typeIndex, marker),
  );

  assertIncludes("P114 P89 source remains reference-only", source.p89Type, "referenceOnly: true");
  assertIncludes("P114 identity source remains entity-free", source.identityType, "noPersonalStarBeastEntityCreation: true");
  assertIncludes("P114 P90 remains readiness-only", source.p90Type, "noPersonalStarBeastCreation: true");
  assertExcludes("P114 fixture remains isolated", source.service, "starBeastSceneModelFixtures");
  assertIncludes(
    "P114 gate registered",
    packageJson.scripts?.["check:production-identity-source-adapter-readiness"] ?? "",
    "node scripts/check-production-identity-source-adapter-readiness.mjs",
  );
  assertIncludes(
    "P114 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-adapter-readiness",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-adapter-readiness-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { resolveStarbeastFromBirthDate } from "./src/services/guanyaoStarbeastEngineService.ts";
        export { runMotherCodeLandingEngine } from "./src/services/guanyaoLunarMotherCodeLandingAdapter.ts";
        export { calibrateStarBeastGenesisSource } from "./src/services/starBeastGenesisSourceCalibration.ts";
        export { resolveLifeArchetypeProfileFromMotherCode } from "./src/services/motherCodeLifeArchetypeSource.ts";
        export { freezeStarMansionLifeTrajectorySource } from "./src/services/starMansionLifeTrajectorySourceFreeze.ts";
        export { resolveProductionIdentitySourceAdapterReadiness } from "./src/services/productionIdentitySourceAdapterReadiness.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "production-identity-source-adapter-readiness-gate-entry.ts",
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
    referenceId: "gate:production-identity:1979-03-28:wei",
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
          originCoordinateReference: calibration.sourceIdentity.originCoordinateReference,
          mansionResultReference: calibration.sourceIdentity.mansionResultReference,
          fourSymbolResultReference: calibration.sourceIdentity.fourSymbolResultReference,
          motherCodeProfileReference: calibration.sourceIdentity.motherCodeProfileReference,
          lifeArchetypeProfileReference: archetype.lifeArchetypeProfile,
        }),
      );
      assertEqual("P89 formal source freezes", freeze.status, "AVAILABLE");

      if (freeze.status === "AVAILABLE") {
        const input = Object.freeze({ sourceTrajectoryReference: freeze.source });
        const before = JSON.stringify(input);
        const ready = runtime.resolveProductionIdentitySourceAdapterReadiness(input);
        assertEqual("formal source entry is ready", ready.status, "READY");
        assertEqual("readiness authorizes future adapter only", ready.readiness, "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER");
        assertEqual("entry preserves identity reference", ready.identitySourceEntryReference?.personalStarBeastIdentityReference, freeze.source.starBeastIdentitySource.personalStarBeastReference);
        assertEqual("readiness does not bind user input", ready.boundary.noUserInputBinding, true);
        assertEqual("readiness does not integrate product", ready.boundary.noProductIntegration, true);
        assertEqual("readiness does not mutate source", JSON.stringify(input), before);

        const unavailable = runtime.resolveProductionIdentitySourceAdapterReadiness(Object.freeze({ sourceTrajectoryReference: null }));
        assertEqual("missing source is unavailable", unavailable.status, "UNAVAILABLE");
        assertEqual("missing source reason", unavailable.reason, "SOURCE_TRAJECTORY_REFERENCE_REQUIRED");

        const copiedTrajectory = Object.freeze({
          ...freeze.source,
          starBeastIdentitySource: Object.freeze({
            ...freeze.source.starBeastIdentitySource,
            mansionSeed: Object.freeze({
              ...freeze.source.starBeastIdentitySource.mansionSeed,
              sourceMansionResultReference: Object.freeze({
                ...freeze.source.mansionResultReference,
              }),
            }),
          }),
        });
        const blocked = runtime.resolveProductionIdentitySourceAdapterReadiness(Object.freeze({ sourceTrajectoryReference: copiedTrajectory }));
        assertEqual("copied identity source is blocked", blocked.status, "BLOCKED");
        assertEqual("copied identity reason", blocked.reason, "SOURCE_COMPONENT_REFERENCE_MISMATCH");
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\\nProduction Identity Source Adapter Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\\nProduction Identity Source Adapter Readiness gate passed.");
