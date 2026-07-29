import fs from "node:fs";
import process from "node:process";

const app = fs.readFileSync("src/App.tsx", "utf8");
const routes = fs.readFileSync("src/routes/guanyaoRoutes.ts", "utf8");
const launch = fs.readFileSync("src/pages/LaunchLab.tsx", "utf8");
const archive = fs.readFileSync("src/pages/PersonalityRingPage.tsx", "utf8");
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};
assert("/dynamics mounts production admission route", app.includes('path={GUANYAO_ROUTES.dynamics} element={<GravityProductionRouteEntry />}'));
assert("fixture route is DEV-only", app.includes("import.meta.env.DEV") && app.includes('path="/dynamics-dev"'));
assert("Launch direct Dynamics handoff is removed", !launch.includes("navigate(GUANYAO_ROUTES.dynamics"));
assert("Launch does not persist current Gravity seed", !launch.includes("writeSelectedPressureSeedContext"));
assert("Archive direct Dynamics entry is removed", !archive.includes("GUANYAO_ROUTES.dynamics"));
assert("legacy redirects target safe life world", !routes.includes('"/gravity": GUANYAO_ROUTES.dynamics') && routes.includes('"/gravity": "/launch-lab"'));
assert("production route no longer mounts GravityPage directly", !app.includes("element={<GravityPage"));
process.exitCode = 0;
