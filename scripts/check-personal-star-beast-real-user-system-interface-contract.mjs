import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastRealUserSystemInterfaceContract.ts",
  service: "src/services/personalStarBeastRealUserSystemInterfaceContract.ts",
  readinessType: "src/types/personalStarBeastIdentityRealUserStorageImplementationReadiness.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_SYSTEM_INTERFACE_CONTRACT_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name} | includes=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
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
    "PersonalStarBeastRealUserSystemInterfaceContractInput",
    "PersonalStarBeastRealUserSystemInterfaceContractResult",
    "PersonalStarBeastRealUserSystemAuthenticationBoundary",
    "PersonalStarBeastRealUserSystemIdentityBindingBoundary",
    "PersonalStarBeastRealUserSystemStorageBoundary",
    "REAL_USER_SYSTEM_INTERFACE_CONTRACT_FROZEN",
    "AUTHENTICATE",
    "BIND_IDENTITY",
    "SAVE_USER_BOUND_RECORD",
    "mayCalculateLifeIdentity: false",
    "storesReferencesOnly: true",
    "implementationNotStarted: true",
  ].forEach((marker) => assertIncludes("P157 contract type", source.type, marker));
  [
    "export function freezePersonalStarBeastRealUserSystemInterfaceContract",
    "IMPLEMENTATION_READINESS_RESULT_REQUIRED",
    "IMPLEMENTATION_READINESS_RESULT_UNAVAILABLE",
    "IMPLEMENTATION_READINESS_RESULT_BLOCKED",
    "IMPLEMENTATION_READINESS_BOUNDARY_INVALID",
    "INTERFACE_BOUNDARY_INVALID",
    "REAL_USER_SYSTEM_INTERFACE_CONTRACT_FROZEN",
    "AUTHENTICATION_BOUNDARY",
    "IDENTITY_BINDING_BOUNDARY",
    "STORAGE_BOUNDARY",
  ].forEach((marker) => assertIncludes("P157 contract service", source.service, marker));
  [
    "localStorage",
    "sessionStorage",
    "window.",
    "document.",
    "fetch(",
    "signIn(",
    "authenticate(",
    "createAuthenticationAdapter",
    "createStorageAdapter",
    "writeStorage",
    "readStorage",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
  ].forEach((marker) => assertExcludes("P157 remains contract-only", source.service, marker));
  [
    "RC-GUANYAO-PERSONAL-STAR-BEAST-REAL-USER-SYSTEM-INTERFACE-CONTRACT-P157",
    "Authentication Boundary",
    "Identity Binding Boundary",
    "Storage Boundary",
    "你是谁",
    "这个生命身份属于哪个用户",
    "保存什么",
    "不接真实认证 SDK",
    "不绑定真实用户",
    "不读写 Storage",
    "不再建立 P158",
  ].forEach((marker) => assertIncludes("P157 protocol", source.protocol, marker));
  [
    "PersonalStarBeastRealUserSystemInterfaceContractInput",
    "PersonalStarBeastRealUserSystemInterfaceContractResult",
    "PersonalStarBeastRealUserSystemAuthenticationBoundary",
    "PersonalStarBeastRealUserSystemStorageBoundary",
    "from \"./personalStarBeastRealUserSystemInterfaceContract\"",
  ].forEach((marker) => assertIncludes("P157 type index export", source.typeIndex, marker));
  assertIncludes("P157 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-system-interface-contract"] ?? "", "node scripts/check-personal-star-beast-real-user-system-interface-contract.mjs");
  assertIncludes("P157 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-system-interface-contract");

  const modulePath = path.join(os.tmpdir(), `guanyao-p157-real-user-system-interface-contract-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { freezePersonalStarBeastRealUserSystemInterfaceContract } from "./src/services/personalStarBeastRealUserSystemInterfaceContract.ts";`,
      resolveDir: rootDir,
      sourcefile: "p157-interface-contract-gate-entry.ts",
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
  const readinessReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_READINESS",
    referenceId: "p156-gate-readiness-reference",
    readinessScope: "FUTURE_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY",
    implementationScope: Object.freeze({
      scope: "REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY",
      mayCreateAuthenticationAdapter: false,
      mayCreateStorageAdapter: false,
      mayInvokeAuthentication: false,
      mayReadStorage: false,
      mayWriteStorage: false,
      mayBindRealUser: false,
    }),
    readinessOnly: true,
    referenceOnly: true,
    implementationNotStarted: true,
    noUserBinding: true,
    noUIIntegration: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });
  const readyInput = Object.freeze({
    implementationReadinessResult: Object.freeze({
      status: "READY",
      readiness: "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW",
      source: "personal_star_beast_identity_real_user_storage_implementation_readiness",
      input: Object.freeze({ authorizationConsumptionResult: null }),
      readinessReference,
      boundary: Object.freeze({
        readinessOnly: true,
        referenceOnly: true,
        implementationNotStarted: true,
        realAuthenticationPerformed: false,
        storageAdapterCreated: false,
        storageReadPerformed: false,
        storageWritePerformed: false,
        productIntegrationPerformed: false,
        noUserBinding: true,
        noUIIntegration: true,
        noEngineInvocation: true,
        noRendererInvocation: true,
        noLifeStateMutation: true,
      }),
    }),
  });
  const ready = runtime.freezePersonalStarBeastRealUserSystemInterfaceContract(readyInput);
  assertEqual("P157 readiness freezes contract", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P157 contract status", ready.contractStatus, "REAL_USER_SYSTEM_INTERFACE_CONTRACT_FROZEN");
    assertEqual("P157 authentication boundary", ready.contractReference.authenticationBoundary.boundary, "AUTHENTICATION");
    assertEqual("P157 identity binding boundary", ready.contractReference.identityBindingBoundary.boundary, "IDENTITY_BINDING");
    assertEqual("P157 storage boundary", ready.contractReference.storageBoundary.boundary, "STORAGE");
    assertEqual("P157 authentication does not calculate life", ready.contractReference.authenticationBoundary.mayCalculateLifeIdentity, false);
    assertEqual("P157 storage does not calculate life", ready.contractReference.storageBoundary.mayCalculateLifeIdentity, false);
  }
  const declined = runtime.freezePersonalStarBeastRealUserSystemInterfaceContract(Object.freeze({ implementationReadinessResult: Object.freeze({ status: "NOT_AUTHORIZED" }) }));
  assertEqual("P157 declined remains not authorized", declined.status, "NOT_AUTHORIZED");
  const missing = runtime.freezePersonalStarBeastRealUserSystemInterfaceContract(Object.freeze({ implementationReadinessResult: null }));
  assertEqual("P157 missing readiness unavailable", missing.status, "UNAVAILABLE");
  const unavailable = runtime.freezePersonalStarBeastRealUserSystemInterfaceContract(Object.freeze({ implementationReadinessResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("P157 unavailable readiness stays unavailable", unavailable.status, "UNAVAILABLE");
  const blocked = runtime.freezePersonalStarBeastRealUserSystemInterfaceContract(Object.freeze({ implementationReadinessResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("P157 blocked readiness stays blocked", blocked.status, "BLOCKED");
  const tampered = runtime.freezePersonalStarBeastRealUserSystemInterfaceContract(Object.freeze({
    implementationReadinessResult: Object.freeze({
      ...readyInput.implementationReadinessResult,
      readinessReference: Object.freeze({ ...readinessReference, implementationScope: Object.freeze({ ...readinessReference.implementationScope, mayCreateStorageAdapter: true }) }),
    }),
  }));
  assertEqual("P157 boundary drift is blocked", tampered.status, "BLOCKED");
  assertEqual("P157 boundary drift reason", tampered.reason, "INTERFACE_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast real user system interface contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast real user system interface contract gate passed.");
