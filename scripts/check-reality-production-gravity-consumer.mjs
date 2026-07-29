import fs from "node:fs";
import process from "node:process";

const app = fs.readFileSync("src/App.tsx", "utf8");
const realityHost = fs.readFileSync(
  "src/components/RealityProductionHost.tsx",
  "utf8",
);
const legacyConsumer = fs.readFileSync(
  "src/services/realityProductionGravityConsumer.ts",
  "utf8",
);
const legacyType = fs.readFileSync(
  "src/types/realityProductionGravityConsumer.ts",
  "utf8",
);
const productionController = fs.readFileSync(
  "src/services/xinmaiGravityEntryAdmissionController.ts",
  "utf8",
);
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};

assert("V1 Gravity consumer remains present as a dormant contract", legacyConsumer.includes("initializeRealityProductionGravityConsumer"));
assert("V1 contract remains no-UI", legacyType.includes("noUiIntegration: true"));
assert("Reality Host does not activate V1 Gravity consumer", !realityHost.includes("initializeRealityProductionGravityConsumer") && !realityHost.includes("advanceRealityProductionGravityConsumer"));
assert("App mounts the typed production Gravity route", app.includes("GravityProductionRouteEntry"));
assert("new Gravity authority is the unique Controller", productionController.includes("RealityToGravityEntryAdmissionController"));
assert("new Controller does not invoke V1 consumer", !productionController.includes("realityProductionGravityConsumer"));
assert("Pressure recognition does not directly activate Gravity", realityHost.includes("onRequestGravityTransfer") && realityHost.includes("CURRENT_LIFE_WEATHER_BODY_APPROACHED"));

console.log("\n[REALITY PRODUCTION GRAVITY CONSUMER] PASS");
process.exitCode = 0;
