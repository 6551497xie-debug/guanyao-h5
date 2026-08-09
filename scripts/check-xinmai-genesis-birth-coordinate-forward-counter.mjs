import fs from "node:fs";
const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const policy = read("src/services/xinmaiGenesisBirthSourceDerivationPolicy.ts");
const controller = read("src/services/xinmaiGenesisBirthSourceDerivationController.ts");
const admission = read("src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts");
const recovery = read("src/services/xinmaiGenesisBirthSourceRecoveryController.ts");
const session = read("src/services/sessionService.ts");
const packageJson = JSON.parse(read("package.json"));
assert(
  policy.includes('"ENABLED"') &&
    policy.includes('"SAFE_WITHHELD"') &&
    policy.includes("XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY"),
  "Forward Counter is not one typed derivation policy switch",
);
assert(
  controller.includes('!== "ENABLED"') &&
    controller.includes('reason: "DERIVATION_POLICY_SAFE_WITHHELD"') &&
    admission.includes("birthSourceDerivationReceipt"),
  "Counter does not withhold new receipt and Identity formation",
);
assert(
  recovery.includes("RECOVERED_LEGACY_SOURCE") &&
    session.includes('"GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1"') &&
    session.includes('"GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V2"'),
  "Counter cannot preserve existing V1/V2 asset recovery",
);
for (const forbidden of ["DEFAULT_DRAFT", '"酉时"', "draft.hourBranch"]) {
  assert(!admission.includes(forbidden), `Counter can revive old source path: ${forbidden}`);
}
assert(
  packageJson.scripts?.["check:xinmai-genesis-birth-coordinate-forward-counter"] ===
    "node scripts/check-xinmai-genesis-birth-coordinate-forward-counter.mjs",
  "Forward-counter gate is not registered",
);
console.log("[XINMAI GENESIS BIRTH COORDINATE FORWARD COUNTER] PASS");
