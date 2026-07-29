import fs from "node:fs";
import process from "node:process";

const adapter = fs.readFileSync(
  "src/services/xinmaiGravityEntryRecoveryAdapter.ts",
  "utf8",
);
const controller = fs.readFileSync(
  "src/services/xinmaiGravityEntryAdmissionController.ts",
  "utf8",
);
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};
assert("single Gravity recovery key", (adapter.match(/xinmaiRealityToGravityCutoverRecovery/g) ?? []).length === 1);
assert("recovery TTL is two hours", adapter.includes("2 * 60 * 60 * 1_000") && controller.includes("2 * 60 * 60 * 1_000"));
assert("Recovery Adapter is the only sessionStorage owner", adapter.includes("window.sessionStorage"));
assert("Controller has no direct sessionStorage access", !controller.includes("sessionStorage"));
assert("read-after-write confirmation is required", adapter.includes("storage.getItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY)"));
assert("Reality supersession has a typed query", adapter.includes("readRealitySupersessionProof"));
assert("expiry does not create a new cycle", !adapter.includes("randomUUID"));
process.exitCode = 0;
