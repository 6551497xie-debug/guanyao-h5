import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const context = read("src/services/realUserGenesisVisualSourceContext.ts");
const controller = read(
  "src/services/xinmaiGenesisBirthSourceRecoveryController.ts",
);
const admission = read(
  "src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts",
);

assert(
  context.includes('return blocked("ACTIVE_SOURCE_REFERENCE_CONFLICT")') &&
    context.indexOf('return blocked("ACTIVE_SOURCE_REFERENCE_CONFLICT")') <
      context.indexOf("activeContext = Object.freeze({"),
  "Different source can replace the active context without fencing",
);
for (const token of [
  "activeContext.sourceReferenceId !== sourceReferenceId",
  '"ACTIVE_SOURCE_REFERENCE_CONFLICT"',
  "expectedSourceReferenceId !== sourceReferenceId",
  '"STALE_EXPECTED_REFERENCE"',
]) {
  assert(controller.includes(token), `Recovery fencing missing ${token}`);
}
assert(
  admission.includes("recoverXinmaiGenesisBirthSource({") &&
    admission.includes('proof !== "PRIMARY_AND_ORIGIN_MATCHED"') &&
    !admission.includes("activateRealUserGenesisVisualSourceContext({"),
  "Admission bypasses durable recovery fencing",
);

console.log("[XINMAI GENESIS BIRTH SOURCE ACTIVE CONTEXT FENCING] PASS");
