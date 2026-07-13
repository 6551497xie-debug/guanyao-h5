import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const pageSource = fs.readFileSync(path.join(rootDir, "src/pages/AxisLinePage.tsx"), "utf8");
const systemSource = fs.readFileSync(path.join(rootDir, "src/systems/axisLineSystem.ts"), "utf8");

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

try {
  assertIncludes(
    "axis line emits rebound completion",
    pageSource,
    'emit("REBOUND_COMPLETE", payload)',
  );
  assertIncludes(
    "axis line hands rebound completion to explicit route state",
    pageSource,
    'reboundComplete: payload',
  );
  assertExcludes(
    "axis line does not persist orphaned behavior asset",
    pageSource,
    "guanyao:axisBehaviorAsset",
  );
  assertExcludes(
    "axis line does not compute unused behavior asset",
    pageSource,
    "crystallizeAxisBehaviorAsset(m.run)",
  );
  assertIncludes(
    "behavior asset remains available as an on-demand derivation",
    systemSource,
    "crystallizeAxisBehaviorAsset(axisState: AxisRunState): AxisBehaviorAsset",
  );
  assertExcludes(
    "axis line system stays persistence neutral",
    systemSource,
    "localStorage",
  );

  console.log("\n[AXIS LINE RUNTIME BOUNDARY] PASS");
} catch (error) {
  console.error("[AXIS LINE RUNTIME BOUNDARY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
