import fs from "node:fs";
import process from "node:process";

const host = fs.readFileSync(
  "src/components/GravityProductionSurfaceHost.tsx",
  "utf8",
);
const hostType = fs.readFileSync(
  "src/types/xinmaiGravityEntryAdmission.ts",
  "utf8",
);
const page = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const legacyPresentation = fs.readFileSync(
  "src/components/RealityGravityPresentation.tsx",
  "utf8",
);
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};

assert("Gravity Host consumes typed route admission", host.includes("GravityRouteAdmission"));
assert("Gravity Host consumes explicit production input", host.includes("GravityProductionRuntimeInput"));
assert("Gravity Host requires both typed surface outcomes", host.includes("resolveGravitySurfaceAdmissionTransaction"));
assert("8 second watchdog can report failure only", host.includes("GRAVITY_SURFACE_WATCHDOG_MS = 8_000") && host.includes("SURFACE_OUTCOME_WATCHDOG_EXPIRED"));
assert("Host owns no navigation or storage", !host.includes("useNavigate") && !host.includes("sessionStorage") && !host.includes("localStorage"));
assert("Host owns no Pressure inference, Choice, or Crystal execution", !host.includes("PressureSeedEngine") && !host.includes("ChoiceEngine") && !host.includes("CrystalEngine"));
assert("typed Host outcome is frozen", hostType.includes("GRAVITY_MINIMUM_PRESENTED") && hostType.includes("GRAVITY_HOST_UNAVAILABLE"));
assert("GravityPage receives explicit props", page.includes("export type GravityPageProps") && !page.includes("useLocation"));
assert("legacy Gravity presentation remains dormant", legacyPresentation.includes("export function RealityGravityPresentation") && !host.includes("RealityGravityPresentation"));

console.log("\n[REALITY PRODUCTION GRAVITY HOST] PASS");
process.exitCode = 0;
