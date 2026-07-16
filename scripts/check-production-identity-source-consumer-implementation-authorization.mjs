import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceConsumerImplementationAuthorization.ts",
  service: "src/services/productionIdentitySourceConsumerImplementationAuthorization.ts",
  contractType: "src/types/productionIdentitySourceConsumerContract.ts",
  contractService: "src/services/productionIdentitySourceConsumerContract.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_AUTHORIZATION_PROTOCOL.md",
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
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
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
    "export type ProductionIdentitySourceConsumerImplementationAuthorizationInput",
    "export type ProductionIdentitySourceConsumerImplementationAuthorizationResult",
    "export type ProductionIdentitySourceConsumerImplementationAuthorizationReference",
    "status: \"AUTHORIZED\"",
    "AUTHORIZED_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_REVIEW",
    "FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_AUTHORIZATION",
    "productConsumptionQualified: true",
    "authorizationOnly: true",
    "noConsumerCreation: true",
    "noRealUserBinding: true",
    "noUiIntegration: true",
    "noProductRuntimeIntegration: true",
    "noRendererIntegration: true",
    "noStorageWrite: true",
    "noSourceMutation: true",
  ].forEach((marker) => assertIncludes("P118 authorization type", source.type, marker));

  [
    "export function reviewProductionIdentitySourceConsumerImplementationAuthorization",
    "contract.status === \"UNAVAILABLE\"",
    "contract.status === \"BLOCKED\"",
    "CONTRACT_BOUNDARY_INVALID",
    "AUTHORIZATION_REFERENCE_INVALID",
    "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY",
    "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE",
  ].forEach((marker) => assertIncludes("P118 authorization service", source.service, marker));

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
  ].forEach((marker) => assertExcludes("P118 service remains authorization-only", source.service, marker));

  [
    "RC-FORMAL-IDENTITY-SOURCE-CONSUMER-IMPLEMENTATION-AUTHORIZATION-REVIEW-P118",
    "AUTHORIZED_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_REVIEW",
    "不接真实用户",
    "不接 UI",
    "不接 Renderer",
    "不接 Storage",
    "不是正式 Consumer 实现",
    "创建正式身份来源 Consumer",
    "真实输入归一化契约",
  ].forEach((marker) => assertIncludes("P118 authorization protocol", source.protocol, marker));

  [
    "ProductionIdentitySourceConsumerImplementationAuthorizationInput",
    "ProductionIdentitySourceConsumerImplementationAuthorizationResult",
    "ProductionIdentitySourceConsumerImplementationAuthorizationReference",
    "from \"./productionIdentitySourceConsumerImplementationAuthorization\"",
  ].forEach((marker) => assertIncludes("P118 type index export", source.typeIndex, marker));

  assertIncludes(
    "P118 gate registered",
    packageJson.scripts?.["check:production-identity-source-consumer-implementation-authorization"] ?? "",
    "node scripts/check-production-identity-source-consumer-implementation-authorization.mjs",
  );
  assertIncludes(
    "P118 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-consumer-implementation-authorization",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-consumer-authorization-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { reviewProductionIdentitySourceConsumerImplementationAuthorization } from "./src/services/productionIdentitySourceConsumerImplementationAuthorization.ts";
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
      sourcefile: "production-identity-source-consumer-authorization-gate-entry.ts",
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
    referenceId: "gate:consumer-authorization:1979-03-28:wei",
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
  assertEqual("P118 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P118 MotherCode bridge is ready", archetype.status, "READY");
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
      assertEqual("P118 source freezes", freeze.status, "AVAILABLE");
      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P118 source readiness is ready", readiness.status, "READY");
        if (readiness.status === "READY") {
          const adapter = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: readiness }),
          );
          assertEqual("P118 adapter is available", adapter.status, "AVAILABLE");
          if (adapter.status === "AVAILABLE") {
            const consumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: adapter }),
            );
            assertEqual("P118 consumer readiness is ready", consumerReadiness.status, "READY");
            if (consumerReadiness.status === "READY") {
              const contract = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: consumerReadiness }),
              );
              assertEqual("P118 contract is ready", contract.status, "READY");
              if (contract.status === "READY") {
                const input = Object.freeze({ contractResult: contract });
                const before = JSON.stringify(input);
                const authorization = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(input);
                assertEqual("authorization is granted", authorization.status, "AUTHORIZED");
                assertEqual(
                  "authorization status",
                  authorization.authorizationStatus,
                  "AUTHORIZED_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_REVIEW",
                );
                assertEqual(
                  "contract reference is preserved",
                  authorization.authorizationReference?.contractReference,
                  contract.contractReference,
                );
                assertEqual(
                  "product consumption is qualified",
                  authorization.authorizationReference?.productConsumptionQualified,
                  true,
                );
                assertEqual("authorization does not create consumer", authorization.boundary.noConsumerCreation, true);
                assertEqual("authorization does not bind real user", authorization.boundary.noRealUserBinding, true);
                assertEqual("authorization does not integrate UI", authorization.boundary.noUiIntegration, true);
                assertEqual("authorization does not mutate input", JSON.stringify(input) === before, true);

                const unavailable = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                  Object.freeze({ contractResult: null }),
                );
                assertEqual("missing contract is unavailable", unavailable.status, "UNAVAILABLE");
                assertEqual("missing contract reason", unavailable.reason, "CONTRACT_RESULT_REQUIRED");

                const blockedContract = Object.freeze({
                  ...contract,
                  boundary: Object.freeze({ ...contract.boundary, noProductIntegration: false }),
                });
                const blocked = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                  Object.freeze({ contractResult: blockedContract }),
                );
                assertEqual("invalid contract boundary is blocked", blocked.status, "BLOCKED");
                assertEqual("invalid contract reason", blocked.reason, "CONTRACT_BOUNDARY_INVALID");

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
                const deferredAuthorization = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                  Object.freeze({ contractResult: deferredContract }),
                );
                assertEqual("unavailable contract stays deferred", deferredAuthorization.status, "UNAVAILABLE");
                assertEqual("unavailable contract reason", deferredAuthorization.reason, "CONTRACT_RESULT_UNAVAILABLE");
              }
            }
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\nProduction Identity Source Consumer Implementation Authorization gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Consumer Implementation Authorization gate passed.");
