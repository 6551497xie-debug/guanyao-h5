import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/guanyaoGeoChronoMotherFusion.ts");
const enginePath = path.join(rootDir, "src/services/guanyaoGeoChronoMotherFusionEngine.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const typeSource = fs.readFileSync(typePath, "utf8");
const engineSource = fs.readFileSync(enginePath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

try {
  for (const typeName of [
    "GeoLayerInput",
    "ChronoLayerInput",
    "StarbeastLayerInput",
    "MotherSeed",
    "GeoChronoMotherFusionInput",
    "GeoChronoMotherFusionResult",
  ]) {
    assertIncludes(`neutral types own ${typeName}`, typeSource, `export type ${typeName}`);
    assertExcludes(`engine no longer owns ${typeName}`, engineSource, `export type ${typeName}`);
  }

  assertIncludes(
    "engine consumes neutral fusion types",
    engineSource,
    'from "../types/guanyaoGeoChronoMotherFusion"',
  );
  assertIncludes(
    "engine consumes explicit fusion input",
    engineSource,
    "input: GeoChronoMotherFusionInput",
  );
  assertExcludes("neutral fusion types do not import services", typeSource, 'from "../services/');
  assertIncludes(
    "launch consumes fusion result from neutral types",
    launchSource,
    'from "../types/guanyaoGeoChronoMotherFusion"',
  );
  assertExcludes(
    "launch no longer consumes types from fusion service",
    launchSource,
    'type GeoChronoMotherFusionResult,\n  type GeoDirectionSymbol,\n} from "../services/guanyaoGeoChronoMotherFusionEngine"',
  );

  console.log("\n[MOTHER FUSION TYPE ISOLATION] PASS");
} catch (error) {
  console.error("[MOTHER FUSION TYPE ISOLATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
