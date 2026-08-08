import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const controller = read("src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts");
const resolver = read("src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts");
const packageJson = JSON.parse(read("package.json"));

for (const token of [
  "resolveLaunchOriginMotherSourceResults",
  "createLaunchLifeSourceSession",
  "resolveLaunchLifeVisualSource",
  "persistLaunchLifeSourceSession",
  "writeOriginMotherContext",
  "recoverXinmaiGenesisBirthSource",
  "resolveLaunchGenesisProductionRouteHandoff",
]) {
  assert(controller.includes(token), `Existing admission authority missing: ${token}`);
}
for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "document.",
  "window.",
  "setTimeout",
  "setInterval",
  "requestAnimationFrame",
  "navigate(",
  "getContext(",
]) {
  assert(!controller.includes(forbidden), `Admission controller crosses boundary: ${forbidden}`);
  assert(!resolver.includes(forbidden), `Presentation resolver is not pure: ${forbidden}`);
}
assert(
  controller.includes('status: "SAFE_WITHHELD"') &&
    controller.includes('intent: "CONFIRM_BIRTH_COORDINATE"') &&
    controller.includes("hasTrustedInputSessionBoundary") &&
    controller.includes("Object.isFrozen(session)") &&
    controller.includes('session.status === "CONFIRMING"') &&
    controller.includes("session.validation.status === \"VALID\"") &&
    controller.includes("PERSISTENCE_RECOVERY_MISMATCH") &&
    controller.includes('proof !== "PRIMARY_AND_ORIGIN_MATCHED"') &&
    controller.includes('intent: "AUTHORIZE_GENESIS_ROUTE"') &&
    !controller.includes("activateRealUserGenesisVisualSourceContext({") &&
    controller.includes('handoff.status !== "READY"'),
  "Admission controller can claim success without typed recovery and handoff",
);
assert(
  packageJson.scripts?.["check:xinmai-genesis-birth-coordinate-admission-authority-boundary"] ===
    "node scripts/check-xinmai-genesis-birth-coordinate-admission-authority-boundary.mjs",
  "Admission-boundary gate is not registered",
);

console.log("[XINMAI GENESIS BIRTH COORDINATE ADMISSION AUTHORITY BOUNDARY] PASS");
