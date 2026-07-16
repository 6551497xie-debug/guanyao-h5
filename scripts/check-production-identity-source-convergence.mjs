import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceConvergence.ts",
  service: "src/services/productionIdentitySourceConvergence.ts",
  authorizationType: "src/types/productionIdentitySourceConvergenceAuthorization.ts",
  authorizationService: "src/services/productionIdentitySourceConvergenceAuthorization.ts",
  identityType: "src/types/starBeastIdentitySource.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_CONVERGENCE_PROTOCOL.md",
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
const absolute = Object.fromEntries(Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]));

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]));
  const packageJson = JSON.parse(source.packageManifest);
  [
    "export type ProductionIdentitySourceConvergenceInput",
    "ProductionIdentitySourceConvergenceResult",
    "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AVAILABLE",
    "identityConvergence: \"PERFORMED_ISOLATED\"",
    "personalStarBeastCreation: false",
    "identityConvergencePerformed: true",
    "noPersonalStarBeastEntityCreation: true",
  ].forEach((marker) => assertIncludes("P134 convergence type", source.type, marker));
  [
    "export function convergeProductionIdentitySource",
    "resolveLifeArchetypeProfileFromMotherCode",
    "MANSION_SOURCE_INVALID",
    "FOUR_SYMBOL_SOURCE_INVALID",
    "MOTHER_CODE_SOURCE_INVALID",
    "LIFE_ARCHETYPE_PROFILE_NOT_READY",
    "LIFE_ARCHETYPE_SOURCE_INVALID",
    "PERSONAL_STAR_BEAST_IDENTITY_SOURCE",
    "MANSION_SEED_FIELD_FORCE_CONVERGENCE",
  ].forEach((marker) => assertIncludes("P134 convergence service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "localStorage",
    "sessionStorage",
    "document.",
    "createPersonalStarBeast",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P134 convergence remains isolated", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-CONVERGENCE-P134",
    "P133 Convergence Authorization",
    "Mansion Seed + Four Symbol Field + MotherCode",
    "LifeArchetypeProfile",
    "PersonalStarBeastIdentityReference",
    "identityConvergence = PERFORMED_ISOLATED",
    "personalStarBeastCreation = false",
    "不是产品用户对象",
  ].forEach((marker) => assertIncludes("P134 protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceConvergenceInput",
    "ProductionIdentitySourceConvergenceResult",
    "ProductionIdentitySourceConvergenceReference",
    "from \"./productionIdentitySourceConvergence\"",
  ].forEach((marker) => assertIncludes("P134 type index export", source.typeIndex, marker));
  assertIncludes("P134 gate registered", packageJson.scripts?.["check:production-identity-source-convergence"] ?? "", "node scripts/check-production-identity-source-convergence.mjs");
  assertIncludes("P134 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-convergence");

  const modulePath = path.join(os.tmpdir(), `guanyao-p134-convergence-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
      export { reviewProductionIdentitySourceAdapterBridgeImplementationContract } from "./src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts";
      export { reviewProductionIdentitySourceAdapterImplementationAuthorization } from "./src/services/productionIdentitySourceAdapterImplementationAuthorization.ts";
      export { adaptProductionIdentitySourceNormalizedReference } from "./src/services/productionIdentitySourceNormalizedReferenceAdapter.ts";
      export { resolveProductionIdentitySourceEngineConsumerReadiness } from "./src/services/productionIdentitySourceEngineConsumerReadiness.ts";
      export { reviewProductionIdentitySourceEngineConsumerContract } from "./src/services/productionIdentitySourceEngineConsumerContract.ts";
      export { reviewProductionIdentitySourceEngineConsumerAuthorization } from "./src/services/productionIdentitySourceEngineConsumerAuthorization.ts";
      export { consumeProductionIdentitySourceEngine } from "./src/services/productionIdentitySourceEngineConsumption.ts";
      export { resolveProductionIdentitySourceConvergenceReadiness } from "./src/services/productionIdentitySourceConvergenceReadiness.ts";
      export { authorizeProductionIdentitySourceConvergence } from "./src/services/productionIdentitySourceConvergenceAuthorization.ts";
      export { convergeProductionIdentitySource } from "./src/services/productionIdentitySourceConvergence.ts";
    `, resolveDir: rootDir, sourcefile: "p134-convergence-gate-entry.ts", loader: "ts" },
    outfile: modulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const normalization = runtime.normalizeProductionIdentitySourceInput(Object.freeze({
    gregorianBirthDate: Object.freeze({ year: 1979, month: 3, day: 28 }),
    localBirthTime: "13:30",
    birthLocationContext: Object.freeze({ country: "CN", region: "Gansu", city: "Lanzhou" }),
  }));
  const bridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: normalization }));
  const bridgeReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: bridge }));
  const adapterContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: bridgeReadiness }));
  const adapterAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: adapterContract }));
  const adapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: adapterAuthorization, contractResult: adapterContract }));
  const engineReadiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: adapter }));
  const engineContract = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: engineReadiness }));
  const engineAuthorization = runtime.reviewProductionIdentitySourceEngineConsumerAuthorization(Object.freeze({ contractResult: engineContract }));
  const consumption = runtime.consumeProductionIdentitySourceEngine(Object.freeze({ authorizationResult: engineAuthorization, contractResult: engineContract, adapterResult: adapter }));
  const readiness = runtime.resolveProductionIdentitySourceConvergenceReadiness(Object.freeze({ engineConsumptionResult: consumption }));
  const authorization = runtime.authorizeProductionIdentitySourceConvergence(Object.freeze({ readinessResult: readiness }));
  const convergence = runtime.convergeProductionIdentitySource(Object.freeze({ authorizationResult: authorization }));
  assertEqual("P134 convergence is available", convergence.status, "AVAILABLE");
  if (convergence.status === "AVAILABLE") {
    assertEqual("convergence status is exact", convergence.convergenceStatus, "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AVAILABLE");
    assertEqual("identity convergence is isolated", convergence.convergenceReference.identityConvergence, "PERFORMED_ISOLATED");
    assertEqual("personal star beast entity remains absent", convergence.convergenceReference.personalStarBeastCreation, false);
    assertEqual("mansion seed source is present", convergence.convergenceReference.identitySource.mansionSeed.semanticRole, "BIRTH_MANSION_LIFE_SEED");
    assertEqual("four symbol field source is present", convergence.convergenceReference.identitySource.fourSymbolField.semanticRole, "FOUR_SYMBOL_MORPHOLOGICAL_FIELD");
    assertEqual("life archetype force source is present", convergence.convergenceReference.identitySource.lifeArchetypeForce.semanticRole, "LIFE_ARCHETYPE_FORCE");
    assertEqual("identity reference is not an animal", convergence.convergenceReference.personalStarBeastIdentityReference.notFourSymbolAnimal, true);
    assertEqual("identity reference is not an asset", convergence.convergenceReference.personalStarBeastIdentityReference.notGeneratedAsset, true);
    assertEqual("life archetype source is mother code", convergence.convergenceReference.lifeArchetypeProfileReference.source, "mother_code_profile");
    assertEqual("convergence remains reference-only", convergence.convergenceReference.referenceOnly, true);
  }
  const missing = runtime.convergeProductionIdentitySource(Object.freeze({ authorizationResult: null }));
  assertEqual("missing authorization is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing authorization reason", missing.reason, "AUTHORIZATION_RESULT_REQUIRED");
  const blocked = runtime.convergeProductionIdentitySource(Object.freeze({ authorizationResult: Object.freeze({ ...authorization, boundary: Object.freeze({ ...authorization.boundary, noIdentityConvergence: false }) }) }));
  assertEqual("invalid authorization boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid authorization reason", blocked.reason, "AUTHORIZATION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Convergence gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Convergence gate passed.");
