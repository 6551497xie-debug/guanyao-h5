import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const session = read("src/services/sessionService.ts");
const controller = read(
  "src/services/xinmaiGenesisBirthSourceRecoveryController.ts",
);
const types = read("src/types/xinmaiGenesisBirthSourceRecovery.ts");

for (const token of [
  "readPersistedLaunchLifeSourceRecoveryRepresentations",
  'status = "PRIMARY_ONLY"',
  'status = "ORIGIN_MIRROR_ONLY"',
  'status = "MATCHED"',
  'status = "CONFLICT"',
  'status = "INVALID_PRIMARY"',
  'status = "INVALID_ORIGIN_MIRROR"',
  "canonicalPrimary: true",
  "originMirrorCorroborationOnly: true",
  "conflictSafeWithheld: true",
]) {
  assert(session.includes(token), `Persistence reconciliation missing ${token}`);
}
assert(
  !session.includes("sessionValue ?? originLifeSourceSession"),
  "Silent persisted source precedence remains",
);
for (const token of [
  'persistence.status === "CONFLICT"',
  '"PERSISTED_SOURCE_CONFLICT"',
  '"PRIMARY_SOURCE_REQUIRED"',
  '"RECOGNIZED_PROOF_MISMATCH"',
  'proof: "PRIMARY_AND_ORIGIN_MATCHED"',
]) {
  assert(controller.includes(token), `Typed recovery branch missing ${token}`);
}
for (const token of [
  '"PRIMARY_ONLY"',
  '"ORIGIN_MIRROR_ONLY"',
  '"MATCHED"',
  '"CONFLICT"',
  "noBackfill: true",
  "noMutation: true",
]) {
  assert(types.includes(token), `Persistence type contract missing ${token}`);
}

console.log("[XINMAI GENESIS BIRTH SOURCE PERSISTENCE RECONCILIATION] PASS");
