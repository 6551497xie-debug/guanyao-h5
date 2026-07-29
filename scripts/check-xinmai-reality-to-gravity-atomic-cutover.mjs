import fs from "node:fs";
import process from "node:process";

const read = (file) => fs.readFileSync(file, "utf8");
const transaction = read("src/services/realityToGravityCutoverTransaction.ts");
const route = read("src/pages/RealityProductionRouteEntry.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};

assert("Reality Host produces typed transfer request", host.includes("XINMAI_GRAVITY_ENTRY_TRANSFER_REQUEST_V1"));
assert("fixed timer is removed from Gravity success path", !host.includes("window.setTimeout(() => {\n      onContinueToGravity"));
assert("Route invokes the single cutover transaction", route.includes("executeRealityToGravityCutover(request)"));
assert("Route navigates only after COMMITTED", route.includes('cutover.status === "COMMITTED"'));
assert("old selected seed handoff write is absent", !route.includes("writeSelectedPressureSeedContext"));
assert("old direct Reality termination is absent", !route.includes("terminateRealityEncounter("));
assert("durable envelope precedes target and source commit", transaction.lastIndexOf("writeRealityToGravityCutoverEnvelope") < transaction.lastIndexOf("commitPreparedGravityTransfer") && transaction.lastIndexOf("commitPreparedGravityTransfer") < transaction.lastIndexOf("commitRealityEncounterGravitySupersession"));
assert("transaction does not own navigation", !transaction.includes("navigate("));
process.exitCode = 0;
