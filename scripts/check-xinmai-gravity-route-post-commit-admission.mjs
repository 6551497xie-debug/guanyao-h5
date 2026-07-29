import fs from "node:fs";
import process from "node:process";

const route = fs.readFileSync(
  "src/pages/GravityProductionRouteEntry.tsx",
  "utf8",
);
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};
assert("Production route owns post-commit admission", route.includes("useEffect(() => {") && route.includes("establishGravityRouteAdmission"));
assert("render phase has no admission command", route.lastIndexOf("establishGravityRouteAdmission") > route.indexOf("useEffect(() => {"));
assert("Route consumes typed ticket only", route.includes("gravityRouteTicket") && !route.includes("selectedPressureSeedContext"));
assert("Route uses recognized identity recovery", route.includes("recoverRealityRecognizedIdentity"));
assert("Route cannot submit Active directly", !route.includes('state: "ACTIVE_IN_GRAVITY"'));
assert("Host outcome is the only Active command input", route.includes("commitGravityEntryActive(outcome)"));
assert("direct URL has a recovery path", route.includes("routeTicket = routeState?.gravityRouteTicket ?? null"));
process.exitCode = 0;
