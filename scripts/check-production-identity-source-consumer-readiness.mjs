import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceConsumerReadiness.ts",
  service: "src/services/productionIdentitySourceConsumerReadiness.ts",
  adapterType: "src/types/productionIdentitySourceAdapter.ts",
  adapterService: "src/services/productionIdentitySourceAdapter.ts",
  protocol: "docs/GUANYAO_PRODUCTION_IDENTITY_SOURCE_CONSUMER_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceConsumerReadinessInput",
    "adapterResult: ProductionIdentitySourceAdapterResult | null",
    "export type ProductionIdentitySourceConsumerReadinessReference",
    "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS",
    'status: \"READY\"',
    'status: \"UNAVAILABLE\"',
    'status: \"BLOCKED\"',
    "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW",
    "noConsumerCreation: true",
    "noUserInputBinding: true",
    "noProductIntegration: true",
    "noSceneModelCreation: true",
    "noRendererInvocation: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("P116 consumer readiness contract", source.type, marker),
  );

  [
    "export function resolveProductionIdentitySourceConsumerReadiness",
    "adapterResult.status === \"UNAVAILABLE\"",
    "adapterResult.status === \"BLOCKED\"",
    "ADAPTER_BOUNDARY_INVALID",
    "FORMAL_REFERENCE_INVALID",
    "FORMAL_REFERENCE_DRIFT",
    "adapterReference.identitySourceEntryReference.sourceTrajectoryReference !==",
    "consumerScope: \"FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY\"",
  ].forEach((marker) =>
    assertIncludes("P116 consumer readiness service", source.service, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "starBeastSceneModelFixtures",
    "localStorage",
    "sessionStorage",
    "createSceneModel",
    "createPersonalStarBeast",
    "createRenderer",
  ].forEach((marker) =>
    assertExcludes("P116 service remains readiness-only", source.service, marker),
  );

  [
    "P116 Production Identity Source Consumer Readiness Protocol",
    "RC-PRODUCTION-IDENTITY-SOURCE-CONSUMER-READINESS-P116",
    "P115 Formal Identity Source Adapter",
    "Future Formal Identity Consumer",
    "不是消费者实现",
    "不接用户",
    "不接产品",
    "不创建消费者",
    "不创建正式消费者",
    "不接入 Launch",
  ].forEach((marker) =>
    assertIncludes("P116 consumer readiness protocol", source.protocol, marker),
  );

  [
    "ProductionIdentitySourceConsumerReadinessInput",
    "ProductionIdentitySourceConsumerReadinessResult",
    "ProductionIdentitySourceConsumerReadinessReference",
    "from \"./productionIdentitySourceConsumerReadiness\"",
  ].forEach((marker) => assertIncludes("P116 type index export", source.typeIndex, marker));

  assertIncludes(
    "P116 gate registered",
    packageJson.scripts?.["check:production-identity-source-consumer-readiness"] ?? "",
    "node scripts/check-production-identity-source-consumer-readiness.mjs",
  );
  assertIncludes(
    "P116 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-consumer-readiness",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-consumer-readiness-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { resolveProductionIdentitySourceConsumerReadiness } from "./src/services/productionIdentitySourceConsumerReadiness.ts";
        export { adaptProductionIdentitySource } from "./src/services/productionIdentitySourceAdapter.ts";
        export { resolveProductionIdentitySourceAdapterReadiness } from "./src/services/productionIdentitySourceAdapterReadiness.ts";
        export { resolveStarbeastFromBirthDate } from "./src/services/guanyaoStarbeastEngineService.ts";
        export { runMotherCodeLandingEngine } from "./src/services/guanyaoLunarMotherCodeLandingAdapter.ts";
        export { calibrateStarBeastGenesisSource } from "./src/services/starBeastGenesisSourceCalibration.ts";
        export { resolveLifeArchetypeProfileFromMotherCode } from "./src/services/motherCodeLifeArchetypeSource.ts";
        export { freezeStarMansionLifeTrajectorySource } from "./src/services/starMansionLifeTrajectorySourceFreeze.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "production-identity-source-consumer-readiness-gate-entry.ts",
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
    referenceId: "gate:consumer-readiness:1979-03-28:wei",
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
  assertEqual("P116 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P116 MotherCode bridge is ready", archetype.status, "READY");
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
      assertEqual("P116 source freezes", freeze.status, "AVAILABLE");
      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P116 source readiness is ready", readiness.status, "READY");
        if (readiness.status === "READY") {
          const adapter = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: readiness }),
          );
          assertEqual("P116 adapter is available", adapter.status, "AVAILABLE");
          if (adapter.status === "AVAILABLE") {
            const input = Object.freeze({ adapterResult: adapter });
            const before = JSON.stringify(input);
            const consumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(input);
            assertEqual("consumer readiness is ready", consumerReadiness.status, "READY");
            assertEqual(
              "consumer readiness status",
              consumerReadiness.readiness,
              "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW",
            );
            assertEqual(
              "adapter reference is preserved",
              consumerReadiness.consumerReadinessReference?.adapterReference,
              adapter.adapterReference,
            );
            assertEqual("consumer is not created", consumerReadiness.boundary.noConsumerCreation, true);
            assertEqual("consumer readiness does not bind user", consumerReadiness.boundary.noUserInputBinding, true);
            assertEqual("consumer readiness does not mutate input", JSON.stringify(input), before);

            const unavailable = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: null }),
            );
            assertEqual("missing adapter is unavailable", unavailable.status, "UNAVAILABLE");
            assertEqual("missing adapter reason", unavailable.reason, "ADAPTER_RESULT_REQUIRED");

            const blockedAdapter = Object.freeze({
              ...adapter,
              boundary: Object.freeze({ ...adapter.boundary, noProductIntegration: false }),
            });
            const blocked = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: blockedAdapter }),
            );
            assertEqual("invalid adapter boundary is blocked", blocked.status, "BLOCKED");
            assertEqual("invalid adapter reason", blocked.reason, "ADAPTER_BOUNDARY_INVALID");

            const sourceUnavailable = runtime.resolveProductionIdentitySourceAdapterReadiness(
              Object.freeze({ sourceTrajectoryReference: null }),
            );
            const deferredAdapter = runtime.adaptProductionIdentitySource(
              Object.freeze({ readinessResult: sourceUnavailable }),
            );
            const deferred = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: deferredAdapter }),
            );
            assertEqual("unavailable adapter stays deferred", deferred.status, "UNAVAILABLE");
            assertEqual("unavailable adapter reason", deferred.reason, "ADAPTER_RESULT_UNAVAILABLE");
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\nProduction Identity Source Consumer Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Consumer Readiness gate passed.");
