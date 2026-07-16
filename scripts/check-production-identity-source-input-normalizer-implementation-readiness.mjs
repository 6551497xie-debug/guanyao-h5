import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceInputNormalizerImplementationReadiness.ts",
  service: "src/services/productionIdentitySourceInputNormalizerImplementationReadiness.ts",
  contractType: "src/types/productionIdentitySourceInputNormalizerContract.ts",
  contractService: "src/services/productionIdentitySourceInputNormalizerContract.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_IMPLEMENTATION_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceInputNormalizerImplementationReadinessInput",
    "export type ProductionIdentitySourceInputNormalizerImplementationReadinessResult",
    "export type ProductionIdentitySourceInputNormalizerImplementationReadinessReference",
    "READY_FOR_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION",
    "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_IMPLEMENTATION_READINESS",
    "FORMAL_INPUT_NORMALIZER_ONLY",
    "implementationNotStarted: true",
    "mayCreateIdentityResult: false",
    "mayBindRealUser: false",
    "mayIntegrateProduct: false",
    "mayIntegrateUi: false",
    "mayIntegrateRenderer: false",
    "mayWriteStorage: false",
    "noRawUserData: true",
    "noIdentityRecalculation: true",
  ].forEach((marker) => assertIncludes("P121 readiness type", source.type, marker));

  [
    "export function resolveProductionIdentitySourceInputNormalizerImplementationReadiness",
    "contract.status === \"UNAVAILABLE\"",
    "contract.status === \"BLOCKED\"",
    "CONTRACT_BOUNDARY_INVALID",
    "IMPLEMENTATION_SCOPE_INVALID",
    "FORMAL_INPUT_NORMALIZER_CONTRACT_READY",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE",
  ].forEach((marker) => assertIncludes("P121 readiness service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "gregorianToLunar",
    "resolveHourBranch",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "createInputNormalizer",
  ].forEach((marker) => assertExcludes("P121 service remains readiness-only", source.service, marker));

  [
    "RC-FORMAL-INPUT-NORMALIZER-IMPLEMENTATION-READINESS-P121",
    "READY_FOR_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION",
    "IMPLEMENTATION_NOT_STARTED",
    "不实现归一化器",
    "不接真实用户",
    "不接 UI",
    "不接 Renderer",
    "不接 Storage",
    "允许进入下一阶段实现评审",
    "FORMAL_INPUT_NORMALIZER_ONLY",
  ].forEach((marker) => assertIncludes("P121 readiness protocol", source.protocol, marker));

  [
    "ProductionIdentitySourceInputNormalizerImplementationReadinessInput",
    "ProductionIdentitySourceInputNormalizerImplementationReadinessResult",
    "ProductionIdentitySourceInputNormalizerImplementationReadinessReference",
    "from \"./productionIdentitySourceInputNormalizerImplementationReadiness\"",
  ].forEach((marker) => assertIncludes("P121 type index export", source.typeIndex, marker));

  assertIncludes(
    "P121 gate registered",
    packageJson.scripts?.["check:production-identity-source-input-normalizer-implementation-readiness"] ?? "",
    "node scripts/check-production-identity-source-input-normalizer-implementation-readiness.mjs",
  );
  assertIncludes(
    "P121 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-input-normalizer-implementation-readiness",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-input-normalizer-readiness-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { resolveProductionIdentitySourceInputNormalizerImplementationReadiness } from "./src/services/productionIdentitySourceInputNormalizerImplementationReadiness.ts";
        export { reviewProductionIdentitySourceInputNormalizerContract } from "./src/services/productionIdentitySourceInputNormalizerContract.ts";
        export { reviewProductionIdentitySourceInputNormalization } from "./src/services/productionIdentitySourceInputNormalizationReview.ts";
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
      sourcefile: "production-identity-source-input-normalizer-readiness-gate-entry.ts",
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
    referenceId: "gate:normalizer-readiness:1979-03-28:wei",
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
  assertEqual("P121 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P121 MotherCode bridge is ready", archetype.status, "READY");
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
      assertEqual("P121 source freezes", freeze.status, "AVAILABLE");
      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P121 source readiness is ready", readiness.status, "READY");
        if (readiness.status === "READY") {
          const adapter = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: readiness }),
          );
          assertEqual("P121 adapter is available", adapter.status, "AVAILABLE");
          if (adapter.status === "AVAILABLE") {
            const consumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: adapter }),
            );
            assertEqual("P121 consumer readiness is ready", consumerReadiness.status, "READY");
            if (consumerReadiness.status === "READY") {
              const consumerContract = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: consumerReadiness }),
              );
              assertEqual("P121 consumer contract is ready", consumerContract.status, "READY");
              if (consumerContract.status === "READY") {
                const authorization = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                  Object.freeze({ contractResult: consumerContract }),
                );
                assertEqual("P121 authorization is granted", authorization.status, "AUTHORIZED");
                if (authorization.status === "AUTHORIZED") {
                  const normalizationReview = runtime.reviewProductionIdentitySourceInputNormalization(
                    Object.freeze({ authorizationResult: authorization }),
                  );
                  assertEqual("P121 normalization review is ready", normalizationReview.status, "READY");
                  if (normalizationReview.status === "READY") {
                    const normalizerContract = runtime.reviewProductionIdentitySourceInputNormalizerContract(
                      Object.freeze({ reviewResult: normalizationReview }),
                    );
                    assertEqual("P121 normalizer contract is ready", normalizerContract.status, "READY");
                    if (normalizerContract.status === "READY") {
                      const input = Object.freeze({ contractResult: normalizerContract });
                      const before = JSON.stringify(input);
                      const review = runtime.resolveProductionIdentitySourceInputNormalizerImplementationReadiness(input);
                      assertEqual("implementation readiness is ready", review.status, "READY");
                      assertEqual(
                        "implementation readiness status",
                        review.readiness,
                        "READY_FOR_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION",
                      );
                      assertEqual(
                        "normalizer contract reference is preserved",
                        review.readinessReference?.contractReference,
                        normalizerContract.contractReference,
                      );
                      assertEqual(
                        "implementation scope is normalizer only",
                        review.readinessReference?.implementationScope.scope,
                        "FORMAL_INPUT_NORMALIZER_ONLY",
                      );
                      assertEqual("implementation has not started", review.boundary.implementationNotStarted, true);
                      assertEqual("readiness does not bind user", review.boundary.noUserInputBinding, true);
                      assertEqual("readiness does not integrate UI", review.boundary.noUiIntegration, true);
                      assertEqual("readiness does not write storage", review.boundary.noStorageWrite, true);
                      assertEqual("readiness does not mutate input", JSON.stringify(input) === before, true);

                      const unavailable = runtime.resolveProductionIdentitySourceInputNormalizerImplementationReadiness(
                        Object.freeze({ contractResult: null }),
                      );
                      assertEqual("missing contract is unavailable", unavailable.status, "UNAVAILABLE");
                      assertEqual("missing contract reason", unavailable.reason, "CONTRACT_RESULT_REQUIRED");

                      const blockedContract = Object.freeze({
                        ...normalizerContract,
                        boundary: Object.freeze({ ...normalizerContract.boundary, noUiIntegration: false }),
                      });
                      const blocked = runtime.resolveProductionIdentitySourceInputNormalizerImplementationReadiness(
                        Object.freeze({ contractResult: blockedContract }),
                      );
                      assertEqual("invalid contract boundary is blocked", blocked.status, "BLOCKED");
                      assertEqual("invalid contract reason", blocked.reason, "CONTRACT_BOUNDARY_INVALID");

                      const reviewUnavailable = runtime.reviewProductionIdentitySourceInputNormalization(
                        Object.freeze({ authorizationResult: null }),
                      );
                      const deferredContract = runtime.reviewProductionIdentitySourceInputNormalizerContract(
                        Object.freeze({ reviewResult: reviewUnavailable }),
                      );
                      const deferred = runtime.resolveProductionIdentitySourceInputNormalizerImplementationReadiness(
                        Object.freeze({ contractResult: deferredContract }),
                      );
                      assertEqual("unavailable contract stays deferred", deferred.status, "UNAVAILABLE");
                      assertEqual("unavailable contract reason", deferred.reason, "CONTRACT_RESULT_UNAVAILABLE");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error("\nProduction Identity Source Input Normalizer Implementation Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Input Normalizer Implementation Readiness gate passed.");
