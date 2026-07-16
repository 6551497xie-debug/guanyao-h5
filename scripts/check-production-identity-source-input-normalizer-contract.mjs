import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceInputNormalizerContract.ts",
  service: "src/services/productionIdentitySourceInputNormalizerContract.ts",
  reviewType: "src/types/productionIdentitySourceInputNormalizationReview.ts",
  reviewService: "src/services/productionIdentitySourceInputNormalizationReview.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_CONTRACT_PROTOCOL.md",
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
    "export type ProductionIdentitySourceInputNormalizerContractInput",
    "export type ProductionIdentitySourceInputNormalizerContractResult",
    "export type ProductionIdentitySourceInputNormalizerContractReference",
    "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT",
    "ISO_GREGORIAN_DATE",
    "LOCAL_CLOCK_TIME",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE",
    "missingDate: \"UNAVAILABLE\"",
    "missingTime: \"UNAVAILABLE\"",
    "invalidDate: \"BLOCKED\"",
    "invalidTime: \"BLOCKED\"",
    "contractOnly: true",
    "noRawUserData: true",
    "noCalendarCalculation: true",
    "noHourBranchCalculation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("P120 normalizer contract type", source.type, marker));

  [
    "export function reviewProductionIdentitySourceInputNormalizerContract",
    "review.status === \"UNAVAILABLE\"",
    "review.status === \"BLOCKED\"",
    "REVIEW_BOUNDARY_INVALID",
    "NORMALIZER_POLICY_INVALID",
    "FORMAL_INPUT_NORMALIZER_CONTRACT_READY",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE",
  ].forEach((marker) => assertIncludes("P120 normalizer contract service", source.service, marker));

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
  ].forEach((marker) => assertExcludes("P120 service remains contract-only", source.service, marker));

  [
    "RC-FORMAL-INPUT-NORMALIZER-IMPLEMENTATION-CONTRACT-P120",
    "FORMAL_INPUT_NORMALIZER_CONTRACT_READY",
    "NO_NORMALIZER_IMPLEMENTED",
    "不是归一化器实现",
    "不是表单",
    "不是正式 Consumer",
    "ISO_GREGORIAN_DATE",
    "LOCAL_CLOCK_TIME",
    "地点只作为上下文保留",
    "原始输入不得持久化",
  ].forEach((marker) => assertIncludes("P120 normalizer contract protocol", source.protocol, marker));

  [
    "ProductionIdentitySourceInputNormalizerContractInput",
    "ProductionIdentitySourceInputNormalizerContractResult",
    "ProductionIdentitySourceInputNormalizerContractReference",
    "from \"./productionIdentitySourceInputNormalizerContract\"",
  ].forEach((marker) => assertIncludes("P120 type index export", source.typeIndex, marker));

  assertIncludes(
    "P120 gate registered",
    packageJson.scripts?.["check:production-identity-source-input-normalizer-contract"] ?? "",
    "node scripts/check-production-identity-source-input-normalizer-contract.mjs",
  );
  assertIncludes(
    "P120 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-input-normalizer-contract",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-input-normalizer-contract-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
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
      sourcefile: "production-identity-source-input-normalizer-contract-gate-entry.ts",
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
    referenceId: "gate:normalizer-contract:1979-03-28:wei",
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
  assertEqual("P120 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P120 MotherCode bridge is ready", archetype.status, "READY");
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
      assertEqual("P120 source freezes", freeze.status, "AVAILABLE");
      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P120 source readiness is ready", readiness.status, "READY");
        if (readiness.status === "READY") {
          const adapter = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: readiness }),
          );
          assertEqual("P120 adapter is available", adapter.status, "AVAILABLE");
          if (adapter.status === "AVAILABLE") {
            const consumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: adapter }),
            );
            assertEqual("P120 consumer readiness is ready", consumerReadiness.status, "READY");
            if (consumerReadiness.status === "READY") {
              const consumerContract = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: consumerReadiness }),
              );
              assertEqual("P120 consumer contract is ready", consumerContract.status, "READY");
              if (consumerContract.status === "READY") {
                const authorization = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                  Object.freeze({ contractResult: consumerContract }),
                );
                assertEqual("P120 authorization is granted", authorization.status, "AUTHORIZED");
                if (authorization.status === "AUTHORIZED") {
                  const normalizationReview = runtime.reviewProductionIdentitySourceInputNormalization(
                    Object.freeze({ authorizationResult: authorization }),
                  );
                  assertEqual("P120 normalization review is ready", normalizationReview.status, "READY");
                  if (normalizationReview.status === "READY") {
                    const input = Object.freeze({ reviewResult: normalizationReview });
                    const before = JSON.stringify(input);
                    const contract = runtime.reviewProductionIdentitySourceInputNormalizerContract(input);
                    assertEqual("normalizer contract is ready", contract.status, "READY");
                    assertEqual(
                      "normalizer contract status",
                      contract.contractStatus,
                      "FORMAL_INPUT_NORMALIZER_CONTRACT_READY",
                    );
                    assertEqual(
                      "normalization review reference is preserved",
                      contract.contractReference?.reviewReference,
                      normalizationReview.normalizationReference,
                    );
                    assertEqual(
                      "input shape is frozen",
                      contract.contractReference?.inputContract.acceptedInputShape,
                      "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT",
                    );
                    assertEqual(
                      "output shape is frozen",
                      contract.contractReference?.outputContract.outputReferenceType,
                      "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE",
                    );
                    assertEqual(
                      "missing date is unavailable",
                      contract.contractReference?.errorContract.missingDate,
                      "UNAVAILABLE",
                    );
                    assertEqual(
                      "invalid date is blocked",
                      contract.contractReference?.errorContract.invalidDate,
                      "BLOCKED",
                    );
                    assertEqual("contract does not bind user", contract.boundary.noUserInputBinding, true);
                    assertEqual("contract does not calculate calendar", contract.boundary.noCalendarCalculation, true);
                    assertEqual("contract does not persist raw data", contract.boundary.noRawUserData, true);
                    assertEqual("contract does not mutate input", JSON.stringify(input) === before, true);

                    const unavailable = runtime.reviewProductionIdentitySourceInputNormalizerContract(
                      Object.freeze({ reviewResult: null }),
                    );
                    assertEqual("missing review is unavailable", unavailable.status, "UNAVAILABLE");
                    assertEqual("missing review reason", unavailable.reason, "REVIEW_RESULT_REQUIRED");

                    const blockedReview = Object.freeze({
                      ...normalizationReview,
                      boundary: Object.freeze({ ...normalizationReview.boundary, noCalendarCalculation: false }),
                    });
                    const blocked = runtime.reviewProductionIdentitySourceInputNormalizerContract(
                      Object.freeze({ reviewResult: blockedReview }),
                    );
                    assertEqual("invalid review boundary is blocked", blocked.status, "BLOCKED");
                    assertEqual("invalid review reason", blocked.reason, "REVIEW_BOUNDARY_INVALID");

                    const authorizationUnavailable = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                      Object.freeze({ contractResult: runtime.reviewProductionIdentitySourceConsumerContract(Object.freeze({ readinessResult: null })) }),
                    );
                    const deferredReview = runtime.reviewProductionIdentitySourceInputNormalization(
                      Object.freeze({ authorizationResult: authorizationUnavailable }),
                    );
                    const deferredContract = runtime.reviewProductionIdentitySourceInputNormalizerContract(
                      Object.freeze({ reviewResult: deferredReview }),
                    );
                    assertEqual("unavailable review stays deferred", deferredContract.status, "UNAVAILABLE");
                    assertEqual("unavailable review reason", deferredContract.reason, "REVIEW_RESULT_UNAVAILABLE");
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
  console.error("\nProduction Identity Source Input Normalizer Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Input Normalizer Contract gate passed.");
