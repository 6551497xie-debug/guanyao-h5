import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceConsumerContract.ts",
  service: "src/services/productionIdentitySourceConsumerContract.ts",
  readinessType: "src/types/productionIdentitySourceConsumerReadiness.ts",
  readinessService: "src/services/productionIdentitySourceConsumerReadiness.ts",
  protocol: "docs/GUANYAO_PRODUCTION_IDENTITY_SOURCE_CONSUMER_CONTRACT_PROTOCOL.md",
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
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "export type ProductionIdentitySourceConsumerContractInput",
    "export type ProductionIdentitySourceConsumerContractReference",
    "export type ProductionIdentitySourceConsumerContractResult",
    "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT",
    "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE",
    "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY",
    "contractOnly: true",
    "noConsumerCreation: true",
    "noSourceMutation: true",
    "noUserInputBinding: true",
    "noProductIntegration: true",
    "noSceneModelCreation: true",
    "noRendererInvocation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("P117 contract type", source.type, marker));

  [
    "export function reviewProductionIdentitySourceConsumerContract",
    "readiness.status === \"UNAVAILABLE\"",
    "readiness.status === \"BLOCKED\"",
    "READINESS_BOUNDARY_INVALID",
    "CONTRACT_REFERENCE_INVALID",
    "acceptedReferenceType",
    "outputReferenceType",
  ].forEach((marker) => assertIncludes("P117 contract service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "createPersonalStarBeast",
    "createSceneModel",
    "createRenderer",
    "fetch(",
  ].forEach((marker) => assertExcludes("P117 service remains contract-only", source.service, marker));

  [
    "P117 Formal Identity Source Consumer Contract Review Protocol",
    "RC-PRODUCTION-IDENTITY-SOURCE-CONSUMER-CONTRACT-P117",
    "不创建消费者",
    "不接用户",
    "不接产品",
    "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE",
    "不是消费者实现",
    "创建 SceneModel、Asset、RenderPlan 或 Renderer",
  ].forEach((marker) => assertIncludes("P117 contract protocol", source.protocol, marker));

  [
    "ProductionIdentitySourceConsumerContractInput",
    "ProductionIdentitySourceConsumerContractResult",
    "ProductionIdentitySourceConsumerContractReference",
    "from \"./productionIdentitySourceConsumerContract\"",
  ].forEach((marker) => assertIncludes("P117 type index export", source.typeIndex, marker));

  assertIncludes(
    "P117 gate registered",
    packageJson.scripts?.["check:production-identity-source-consumer-contract"] ?? "",
    "node scripts/check-production-identity-source-consumer-contract.mjs",
  );
  assertIncludes(
    "P117 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-consumer-contract",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-consumer-contract-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { reviewProductionIdentitySourceConsumerContract } from "./src/services/productionIdentitySourceConsumerContract.ts";
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
      sourcefile: "production-identity-source-consumer-contract-gate-entry.ts",
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
  const birth = Object.freeze({ year: 1979, month: 3, day: 28, hourBranch: "未时" });
  const starbeast = runtime.resolveStarbeastFromBirthDate(birth);
  const motherCodeLanding = runtime.runMotherCodeLandingEngine(birth);
  const originCoordinateReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: "gate:consumer-contract:1979-03-28:wei",
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
  assertEqual("P117 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P117 MotherCode bridge is ready", archetype.status, "READY");
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
      assertEqual("P117 source freezes", freeze.status, "AVAILABLE");
      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P117 source readiness is ready", readiness.status, "READY");
        if (readiness.status === "READY") {
          const adapter = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: readiness }),
          );
          assertEqual("P117 adapter is available", adapter.status, "AVAILABLE");
          if (adapter.status === "AVAILABLE") {
            const consumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: adapter }),
            );
            assertEqual("P117 consumer readiness is ready", consumerReadiness.status, "READY");
            if (consumerReadiness.status === "READY") {
              const input = Object.freeze({ readinessResult: consumerReadiness });
              const before = JSON.stringify(input);
              const contract = runtime.reviewProductionIdentitySourceConsumerContract(input);
              assertEqual("contract review is ready", contract.status, "READY");
              assertEqual(
                "contract status",
                contract.contractStatus,
                "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY",
              );
              assertEqual(
                "readiness reference is preserved",
                contract.contractReference?.readinessReference,
                consumerReadiness.consumerReadinessReference,
              );
              assertEqual(
                "input reference contract is correct",
                contract.contractReference?.inputContract.acceptedReferenceType,
                "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS",
              );
              assertEqual(
                "output reference contract is correct",
                contract.contractReference?.outputContract.outputReferenceType,
                "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE",
              );
              assertEqual("consumer is not created", contract.boundary.noConsumerCreation, true);
              assertEqual("contract does not bind user", contract.boundary.noUserInputBinding, true);
              assertEqual("contract does not mutate input", JSON.stringify(input), before);

              const unavailable = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: null }),
              );
              assertEqual("missing readiness is unavailable", unavailable.status, "UNAVAILABLE");
              assertEqual("missing readiness reason", unavailable.reason, "READINESS_RESULT_REQUIRED");

              const blockedReadiness = Object.freeze({
                ...consumerReadiness,
                boundary: Object.freeze({ ...consumerReadiness.boundary, noProductIntegration: false }),
              });
              const blocked = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: blockedReadiness }),
              );
              assertEqual("invalid readiness boundary is blocked", blocked.status, "BLOCKED");
              assertEqual("invalid readiness reason", blocked.reason, "READINESS_BOUNDARY_INVALID");

              const sourceUnavailable = runtime.resolveProductionIdentitySourceAdapterReadiness(
                Object.freeze({ sourceTrajectoryReference: null }),
              );
              const deferredAdapter = runtime.adaptProductionIdentitySource(
                Object.freeze({ readinessResult: sourceUnavailable }),
              );
              const deferredConsumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(
                Object.freeze({ adapterResult: deferredAdapter }),
              );
              const deferredContract = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: deferredConsumerReadiness }),
              );
              assertEqual("unavailable readiness stays deferred", deferredContract.status, "UNAVAILABLE");
              assertEqual("unavailable readiness reason", deferredContract.reason, "READINESS_RESULT_UNAVAILABLE");
            }
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\nProduction Identity Source Consumer Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Consumer Contract gate passed.");
