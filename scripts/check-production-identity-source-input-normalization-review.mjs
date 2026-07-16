import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceInputNormalizationReview.ts",
  service: "src/services/productionIdentitySourceInputNormalizationReview.ts",
  authorizationType: "src/types/productionIdentitySourceConsumerImplementationAuthorization.ts",
  authorizationService: "src/services/productionIdentitySourceConsumerImplementationAuthorization.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZATION_BOUNDARY_PROTOCOL.md",
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
    "export type ProductionIdentitySourceInputNormalizationReviewInput",
    "export type ProductionIdentitySourceInputNormalizationReviewResult",
    "export type ProductionIdentitySourceInputNormalizationReviewReference",
    "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT",
    "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE",
    "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE",
    "BIRTH_LOCATION_CONTEXT_ONLY",
    "locationParticipatesInStarBeastDerivation: false",
    "locationParticipatesInMotherCodeDerivation: false",
    "noRawUserData: true",
    "noCalendarCalculation: true",
    "noHourBranchCalculation: true",
  ].forEach((marker) => assertIncludes("P119 normalization type", source.type, marker));

  [
    "export function reviewProductionIdentitySourceInputNormalization",
    "authorization.status === \"UNAVAILABLE\"",
    "authorization.status === \"BLOCKED\"",
    "AUTHORIZATION_BOUNDARY_INVALID",
    "INPUT_POLICY_REFERENCE_INVALID",
    "READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW",
  ].forEach((marker) => assertIncludes("P119 normalization service", source.service, marker));

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
  ].forEach((marker) => assertExcludes("P119 service remains review-only", source.service, marker));

  [
    "RC-REAL-IDENTITY-INPUT-NORMALIZATION-BOUNDARY-REVIEW-P119",
    "READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW",
    "不接收真实用户数据",
    "不执行归一化",
    "出生地点只表达地点上下文",
    "不参与星兽推导",
    "不参与母码推导",
    "不是表单",
    "不是正式 Consumer 实现",
  ].forEach((marker) => assertIncludes("P119 normalization protocol", source.protocol, marker));

  [
    "ProductionIdentitySourceInputNormalizationReviewInput",
    "ProductionIdentitySourceInputNormalizationReviewResult",
    "ProductionIdentitySourceInputNormalizationReviewReference",
    "from \"./productionIdentitySourceInputNormalizationReview\"",
  ].forEach((marker) => assertIncludes("P119 type index export", source.typeIndex, marker));

  assertIncludes(
    "P119 gate registered",
    packageJson.scripts?.["check:production-identity-source-input-normalization-review"] ?? "",
    "node scripts/check-production-identity-source-input-normalization-review.mjs",
  );
  assertIncludes(
    "P119 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-input-normalization-review",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-input-normalization-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
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
      sourcefile: "production-identity-source-input-normalization-gate-entry.ts",
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
    referenceId: "gate:input-normalization:1979-03-28:wei",
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
  assertEqual("P119 formal sources calibrate", calibration.status, "AVAILABLE");

  if (calibration.status === "AVAILABLE") {
    const archetype = runtime.resolveLifeArchetypeProfileFromMotherCode(
      calibration.sourceIdentity.motherCodeProfileReference.profileReference,
    );
    assertEqual("P119 MotherCode bridge is ready", archetype.status, "READY");
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
      assertEqual("P119 source freezes", freeze.status, "AVAILABLE");
      if (freeze.status === "AVAILABLE") {
        const readiness = runtime.resolveProductionIdentitySourceAdapterReadiness(
          Object.freeze({ sourceTrajectoryReference: freeze.source }),
        );
        assertEqual("P119 source readiness is ready", readiness.status, "READY");
        if (readiness.status === "READY") {
          const adapter = runtime.adaptProductionIdentitySource(
            Object.freeze({ readinessResult: readiness }),
          );
          assertEqual("P119 adapter is available", adapter.status, "AVAILABLE");
          if (adapter.status === "AVAILABLE") {
            const consumerReadiness = runtime.resolveProductionIdentitySourceConsumerReadiness(
              Object.freeze({ adapterResult: adapter }),
            );
            assertEqual("P119 consumer readiness is ready", consumerReadiness.status, "READY");
            if (consumerReadiness.status === "READY") {
              const contract = runtime.reviewProductionIdentitySourceConsumerContract(
                Object.freeze({ readinessResult: consumerReadiness }),
              );
              assertEqual("P119 contract is ready", contract.status, "READY");
              if (contract.status === "READY") {
                const authorization = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                  Object.freeze({ contractResult: contract }),
                );
                assertEqual("P119 authorization is granted", authorization.status, "AUTHORIZED");
                if (authorization.status === "AUTHORIZED") {
                  const input = Object.freeze({ authorizationResult: authorization });
                  const before = JSON.stringify(input);
                  const review = runtime.reviewProductionIdentitySourceInputNormalization(input);
                  assertEqual("normalization review is ready", review.status, "READY");
                  assertEqual(
                    "normalization review status",
                    review.reviewStatus,
                    "READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW",
                  );
                  assertEqual(
                    "authorization reference is preserved",
                    review.normalizationReference?.authorizationReference,
                    authorization.authorizationReference,
                  );
                  assertEqual(
                    "location stays context-only",
                    review.normalizationReference?.policy.locationParticipatesInStarBeastDerivation,
                    false,
                  );
                  assertEqual(
                    "location stays out of MotherCode",
                    review.normalizationReference?.policy.locationParticipatesInMotherCodeDerivation,
                    false,
                  );
                  assertEqual("review does not bind user", review.boundary.noUserInputBinding, true);
                  assertEqual("review does not calculate calendar", review.boundary.noCalendarCalculation, true);
                  assertEqual("review does not persist raw data", review.boundary.noRawUserData, true);
                  assertEqual("review does not mutate input", JSON.stringify(input) === before, true);

                  const unavailable = runtime.reviewProductionIdentitySourceInputNormalization(
                    Object.freeze({ authorizationResult: null }),
                  );
                  assertEqual("missing authorization is unavailable", unavailable.status, "UNAVAILABLE");
                  assertEqual("missing authorization reason", unavailable.reason, "AUTHORIZATION_RESULT_REQUIRED");

                  const blockedAuthorization = Object.freeze({
                    ...authorization,
                    boundary: Object.freeze({ ...authorization.boundary, noUiIntegration: false }),
                  });
                  const blocked = runtime.reviewProductionIdentitySourceInputNormalization(
                    Object.freeze({ authorizationResult: blockedAuthorization }),
                  );
                  assertEqual("invalid authorization boundary is blocked", blocked.status, "BLOCKED");
                  assertEqual("invalid authorization reason", blocked.reason, "AUTHORIZATION_BOUNDARY_INVALID");

                  const contractUnavailable = runtime.reviewProductionIdentitySourceConsumerContract(
                    Object.freeze({ readinessResult: null }),
                  );
                  const deferredAuthorization = runtime.reviewProductionIdentitySourceConsumerImplementationAuthorization(
                    Object.freeze({ contractResult: contractUnavailable }),
                  );
                  const deferred = runtime.reviewProductionIdentitySourceInputNormalization(
                    Object.freeze({ authorizationResult: deferredAuthorization }),
                  );
                  assertEqual("unavailable authorization stays deferred", deferred.status, "UNAVAILABLE");
                  assertEqual("unavailable authorization reason", deferred.reason, "AUTHORIZATION_RESULT_UNAVAILABLE");
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
  console.error("\nProduction Identity Source Input Normalization Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Input Normalization Review gate passed.");
