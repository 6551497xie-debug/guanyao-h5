import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceAdapter.ts",
  service: "src/services/productionIdentitySourceAdapter.ts",
  readinessType: "src/types/productionIdentitySourceAdapterReadiness.ts",
  readinessService: "src/services/productionIdentitySourceAdapterReadiness.ts",
  protocol: "docs/GUANYAO_PRODUCTION_IDENTITY_SOURCE_ADAPTER_PROTOCOL.md",
  readinessProtocol:
    "docs/GUANYAO_PRODUCTION_IDENTITY_SOURCE_ADAPTER_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceAdapterInput",
    "readinessResult: ProductionIdentitySourceAdapterReadinessResult | null",
    "export type ProductionIdentitySourceAdapterFormalReference",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_ENTRY",
    'status: \"AVAILABLE\"',
    'status: \"UNAVAILABLE\"',
    'status: \"BLOCKED\"',
    "FORMAL_IDENTITY_SOURCE_ADAPTER_READY",
    "noUserInputBinding: true",
    "noProductIntegration: true",
    "noSceneModelCreation: true",
    "noRendererInvocation: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("P115 adapter contract", source.type, marker),
  );

  [
    "export function adaptProductionIdentitySource",
    "readiness.status === \"UNAVAILABLE\"",
    "readiness.status === \"BLOCKED\"",
    "READINESS_BOUNDARY_INVALID",
    "IDENTITY_ENTRY_REFERENCE_INVALID",
    "SOURCE_ENTRY_REFERENCE_DRIFT",
    "entry.sourceTrajectoryReference !==",
    "entry.identitySourceReference !==",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_ENTRY",
  ].forEach((marker) =>
    assertIncludes("P115 adapter service", source.service, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "productionIdentitySourceAdapterReadiness",
    "starBeastSceneModelFixtures",
    "localStorage",
    "sessionStorage",
    "createSceneModel",
    "createPersonalStarBeast",
  ].forEach((marker) =>
    assertExcludes("P115 adapter remains reference-only", source.service, marker),
  );

  [
    "P115 Formal Identity Source Adapter Protocol",
    "RC-PRODUCTION-IDENTITY-SOURCE-ADAPTER-P115",
    "不接用户",
    "不接产品",
    "P114 Production Identity Source Adapter Readiness",
    "Future Product Identity Consumer",
    "不复制任何生命事实",
    "不重新计算任何来源",
    "不创建 PersonalStarBeast",
    "不接入 Launch",
  ].forEach((marker) =>
    assertIncludes("P115 adapter protocol", source.protocol, marker),
  );

  [
    "ProductionIdentitySourceAdapterInput",
    "ProductionIdentitySourceAdapterResult",
    "ProductionIdentitySourceAdapterFormalReference",
    "from \"./productionIdentitySourceAdapter\"",
  ].forEach((marker) => assertIncludes("P115 type index export", source.typeIndex, marker));

  assertIncludes(
    "P115 gate registered",
    packageJson.scripts?.["check:production-identity-source-adapter"] ?? "",
    "node scripts/check-production-identity-source-adapter.mjs",
  );
  assertIncludes(
    "P115 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-adapter",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-adapter-${process.pid}.mjs`,
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
        export { adaptProductionIdentitySource } from "./src/services/productionIdentitySourceAdapter.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "production-identity-source-adapter-gate-entry.ts",
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
    referenceId: "gate:formal-adapter:1979-03-28:wei",
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
  assertEqual("P115 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P115 MotherCode bridge is ready", archetype.status, "READY");

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
      assertEqual("P115 source freezes", freeze.status, "AVAILABLE");

      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P115 readiness is ready", readiness.status, "READY");

        if (readiness.status === "READY") {
          const input = Object.freeze({ readinessResult: readiness });
          const before = JSON.stringify(input);
          const adapted = runtime.adaptProductionIdentitySource(input);
          assertEqual("formal adapter is available", adapted.status, "AVAILABLE");
          assertEqual(
            "formal adapter status",
            adapted.adapterStatus,
            "FORMAL_IDENTITY_SOURCE_ADAPTER_READY",
          );
          assertEqual(
            "identity entry is preserved",
            adapted.adapterReference?.identitySourceEntryReference,
            readiness.identitySourceEntryReference,
          );
          assertEqual("adapter does not bind user input", adapted.boundary.noUserInputBinding, true);
          assertEqual("adapter does not integrate product", adapted.boundary.noProductIntegration, true);
          assertEqual("adapter does not mutate input", JSON.stringify(input), before);

          const unavailable = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: null }),
          );
          assertEqual("missing readiness is unavailable", unavailable.status, "UNAVAILABLE");
          assertEqual("missing readiness reason", unavailable.reason, "READINESS_RESULT_REQUIRED");

          const blockedReadiness = Object.freeze({
            ...readiness,
            boundary: Object.freeze({ ...readiness.boundary, noProductIntegration: false }),
          });
          const blocked = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: blockedReadiness }),
          );
          assertEqual("invalid readiness boundary is blocked", blocked.status, "BLOCKED");
          assertEqual("invalid readiness reason", blocked.reason, "READINESS_BOUNDARY_INVALID");

          const sourceUnavailable = runtime.resolveProductionIdentitySourceAdapterReadiness(
            Object.freeze({ sourceTrajectoryReference: null }),
          );
          const deferred = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: sourceUnavailable }),
          );
          assertEqual("unavailable readiness stays deferred", deferred.status, "UNAVAILABLE");
          assertEqual("unavailable readiness reason", deferred.reason, "SOURCE_READINESS_UNAVAILABLE");
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\nProduction Identity Source Adapter gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Adapter gate passed.");
