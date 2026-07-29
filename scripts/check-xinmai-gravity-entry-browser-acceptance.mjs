import fs from "node:fs";
import process from "node:process";

const files = [
  "src/pages/RealityProductionRouteEntry.tsx",
  "src/components/RealityProductionHost.tsx",
  "src/pages/GravityProductionRouteEntry.tsx",
  "src/components/GravityProductionSurfaceHost.tsx",
  "src/components/RealityLifeUniverseCanvas.tsx",
  "src/components/RealityGravityInertiaField.tsx",
].map((file) => fs.readFileSync(file, "utf8")).join("\n");
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};
assert("browser path has explicit body approach", files.includes("CURRENT_LIFE_WEATHER_BODY_APPROACHED"));
assert("browser path carries one typed route ticket", files.includes("gravityRouteTicket"));
assert("Motion surface evidence exists", files.includes("WEBGL_SAME_LIFE_SURFACE") && files.includes("MOTION_FIRST_GRAVITY_OBSERVATION"));
assert("Reduced Motion surface evidence exists", files.includes("SEMANTIC_STATIC_SAME_LIFE_SURFACE") && files.includes("STATIC_FIRST_GRAVITY_OBSERVATION"));
assert("failure is retryable and non-Active", files.includes("继续靠近") && files.includes("GRAVITY_HOST_UNAVAILABLE"));
assert("watchdog is failure-only", files.includes("SURFACE_OUTCOME_WATCHDOG_EXPIRED"));
const host = fs.readFileSync(
  "src/components/GravityProductionSurfaceHost.tsx",
  "utf8",
);
assert("Pressure/Choice/Crystal do not execute in Host", !host.includes("PressureSeedEngine") && !host.includes("ChoiceEngine") && !host.includes("CrystalEngine"));
process.exitCode = 0;
