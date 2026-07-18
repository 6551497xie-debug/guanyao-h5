import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/presenceCarryRealityTransition.ts",
  service: "src/services/presenceCarryRealityTransition.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  styles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
  recognition: "src/services/recognitionSpaceUIRuntime.ts",
  bridge: "src/services/recognitionRealityEntryBridgeFix.ts",
  realityEntry: "src/services/realityEntrySpaceUIRuntime.ts",
  pressure: "src/services/pressureRecognitionUIRuntime.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const source = {};

const assertIncludes = (name, value, marker) => {
  if (value.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, value, marker) => {
  if (value.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};

for (const [name, relative] of Object.entries(files)) {
  const filePath = path.join(rootDir, relative);
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else {
    source[name] = fs.readFileSync(filePath, "utf8");
    console.log(`PASS | ${name} file exists`);
  }
}

if (failures.length === 0) {
  const packageJson = JSON.parse(source.packageManifest);

  [
    "PresenceCarryRealityTransition",
    "recognitionPresenceState",
    "transitionCarryState",
    "realityArrivalState",
    "presenceContinuity",
    "presenceReference",
    "pressureObservationContext",
    "LOW_CONTRAST_CONTINUITY",
    "LOW_CONTRAST_REALITY_ARRIVAL",
    "noGenesisMutation",
    "noVisualStateMutation",
    "noPressureMutation",
    "noStorage",
  ].forEach((marker) => assertIncludes("P45 carry type", source.type, marker));

  [
    "resolvePresenceCarryRealityTransition",
    "RECOGNITION_ENTRY_REQUIRED",
    "RECOGNITION_PRESENCE_REQUIRED",
    "REALITY_ENTRY_CONTEXT_REQUIRED",
    "BRIDGE_CONTINUITY_BROKEN",
    "REALITY_ENTRY_BEFORE_RECOGNITION",
    "PRESSURE_CONTEXT_BEFORE_REALITY",
    "READY_TO_CARRY",
    "CARRYING_PRESENCE",
    "PRESENCE_CONTINUES",
    "PRESSURE_CONTEXT_READY",
    "PRESENCE_IN_REALITY",
  ].forEach((marker) => assertIncludes("P45 carry service", source.service, marker));

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "localStorage",
    "sessionStorage",
    "resetGenesis",
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
  ].forEach((marker) => assertExcludes("P45 carry service remains state-only", source.service, marker));

  [
    "resolvePresenceCarryRealityTransition",
    "data-presence-carry-state",
    "data-presence-carry-continuity",
    "data-presence-carry-arrival",
    "gy-p45__presence-carry",
    "pressureRecognitionUIRuntime",
  ].forEach((marker) => assertIncludes("P45 harness carry consumption", source.harness, marker));

  [
    "gy-p45__presence-carry",
    "data-presence-carry-continuity=\"HELD\"",
    "data-presence-carry-continuity=\"CONTINUOUS\"",
    "data-presence-carry-arrival=\"REALITY_APPROACHING\"",
    "data-presence-carry-arrival=\"PRESSURE_CONTEXT_READY\"",
    "[data-presence-carry-arrival=\"REALITY_PRESENT\"] .gy-p100__cosmic-depth",
  ].forEach((marker) => assertIncludes("P45 spatial carry presentation", source.styles, marker));

  [
    "RecognitionSpaceUIRuntime",
    "RecognitionRealityEntryBridgeFix",
    "RealityEntrySpaceUIRuntime",
    "PressureRecognitionUIRuntime",
  ].forEach((marker) => assertIncludes("P45 upstream state boundary", source.type, marker));

  assertIncludes("P45 type index export", source.typeIndex, "./presenceCarryRealityTransition");
  assertIncludes(
    "P45 gate registered",
    packageJson.scripts?.["check-presence-carry-reality-transition"] ?? "",
    "node scripts/check-presence-carry-reality-transition.mjs",
  );
  assertIncludes(
    "P45 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-presence-carry-reality-transition",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-presence-carry-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: [
        'export { resolvePresenceCarryRealityTransition } from "./src/services/presenceCarryRealityTransition.ts";',
        'export { resolveRecognitionSpaceUIRuntime } from "./src/services/recognitionSpaceUIRuntime.ts";',
        'export { resolveRecognitionRealityEntryBridgeFix } from "./src/services/recognitionRealityEntryBridgeFix.ts";',
        'export { resolveRealityEntrySpaceUIRuntime } from "./src/services/realityEntrySpaceUIRuntime.ts";',
        'export { resolvePressureRecognitionUIRuntime } from "./src/services/pressureRecognitionUIRuntime.ts";',
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "presence-carry-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const recognitionRuntime = (recognitionConfirmed) => {
    const result = runtime.resolveRecognitionSpaceUIRuntime({
      genesisCompleted: true,
      presenceAvailable: true,
      recognitionConfirmed,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  };
  const bridgeFix = (recognitionConfirmed, realityEntryConfirmed) => {
    const result = runtime.resolveRecognitionRealityEntryBridgeFix({
      genesisCompleted: true,
      recognitionConfirmed,
      realityEntryConfirmed,
      sessionContinuityState: "CONTINUOUS",
    });
    return result.status === "READY" ? result.bridge : null;
  };
  const realityRuntime = (realityEntryConfirmed) => {
    const result = runtime.resolveRealityEntrySpaceUIRuntime({
      recognitionConfirmed: true,
      presenceAvailable: true,
      realityEntryConfirmed,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  };
  const pressureRuntime = (pressureObservationConfirmed) => {
    const result = runtime.resolvePressureRecognitionUIRuntime({
      realityReady: true,
      pressureObservationConfirmed,
    });
    return result.status === "READY" ? result.uiRuntime : null;
  };
  const carry = (input) => runtime.resolvePresenceCarryRealityTransition(input);

  const held = carry({
    recognitionSpaceRuntime: recognitionRuntime(false),
    bridgeFix: bridgeFix(false, false),
    realityEntryRuntime: null,
    pressureRuntime: null,
    recognitionEntered: true,
    realityEntryConfirmed: false,
    pressureObservationConfirmed: false,
  });
  assertEqual("P45 Recognition presence held", held.status, "READY");
  if (held.status === "READY") {
    assertEqual("P45 Recognition carry state", held.transition.transitionCarryState, "READY_TO_CARRY");
    assertEqual("P45 Recognition continuity", held.transition.presenceContinuity, "HELD");
  }

  const approaching = carry({
    recognitionSpaceRuntime: recognitionRuntime(true),
    bridgeFix: bridgeFix(true, false),
    realityEntryRuntime: realityRuntime(false),
    pressureRuntime: null,
    recognitionEntered: true,
    realityEntryConfirmed: false,
    pressureObservationConfirmed: false,
  });
  assertEqual("P45 Reality approaching", approaching.status, "READY");
  if (approaching.status === "READY") {
    assertEqual("P45 carry into Reality", approaching.transition.transitionCarryState, "CARRYING_PRESENCE");
    assertEqual("P45 Reality approach state", approaching.transition.realityArrivalState, "REALITY_APPROACHING");
    assertEqual("P45 approaching continuity", approaching.transition.presenceContinuity, "CONTINUOUS");
  }

  const reality = carry({
    recognitionSpaceRuntime: recognitionRuntime(true),
    bridgeFix: bridgeFix(true, true),
    realityEntryRuntime: realityRuntime(true),
    pressureRuntime: pressureRuntime(false),
    recognitionEntered: true,
    realityEntryConfirmed: true,
    pressureObservationConfirmed: false,
  });
  assertEqual("P45 Reality presence", reality.status, "READY");
  if (reality.status === "READY") {
    assertEqual("P45 Reality presence continues", reality.transition.transitionCarryState, "PRESENCE_CONTINUES");
    assertEqual("P45 Reality arrival", reality.transition.realityArrivalState, "REALITY_PRESENT");
    assertEqual("P45 Reality spatial relationship", reality.transition.spatialRelationship, "PRESENCE_IN_REALITY");
  }

  const pressure = carry({
    recognitionSpaceRuntime: recognitionRuntime(true),
    bridgeFix: bridgeFix(true, true),
    realityEntryRuntime: realityRuntime(true),
    pressureRuntime: pressureRuntime(true),
    recognitionEntered: true,
    realityEntryConfirmed: true,
    pressureObservationConfirmed: true,
  });
  assertEqual("P45 Pressure carry context", pressure.status, "READY");
  if (pressure.status === "READY") {
    assertEqual("P45 Pressure context state", pressure.transition.realityArrivalState, "PRESSURE_CONTEXT_READY");
    assertEqual("P45 Pressure continuity", pressure.transition.presenceContinuity, "CONTINUOUS");
  }

  const missingRealityContext = carry({
    recognitionSpaceRuntime: recognitionRuntime(true),
    bridgeFix: bridgeFix(true, true),
    realityEntryRuntime: null,
    pressureRuntime: null,
    recognitionEntered: true,
    realityEntryConfirmed: true,
    pressureObservationConfirmed: false,
  });
  assertEqual("P45 missing Reality context unavailable", missingRealityContext.status, "UNAVAILABLE");
  if (missingRealityContext.status === "UNAVAILABLE") {
    assertEqual("P45 missing Reality context reason", missingRealityContext.reason, "REALITY_ENTRY_CONTEXT_REQUIRED");
  }

  const broken = carry({
    recognitionSpaceRuntime: recognitionRuntime(true),
    bridgeFix: { ...bridgeFix(true, false), bridgeState: "BRIDGE_BROKEN", bridgeIntegrity: "BROKEN" },
    realityEntryRuntime: realityRuntime(false),
    pressureRuntime: null,
    recognitionEntered: true,
    realityEntryConfirmed: false,
    pressureObservationConfirmed: false,
  });
  assertEqual("P45 broken bridge blocked", broken.status, "BLOCKED");
  if (broken.status === "BLOCKED") assertEqual("P45 broken bridge reason", broken.reason, "BRIDGE_CONTINUITY_BROKEN");

  const notEntered = carry({
    recognitionSpaceRuntime: recognitionRuntime(false),
    bridgeFix: bridgeFix(false, false),
    realityEntryRuntime: null,
    pressureRuntime: null,
    recognitionEntered: false,
    realityEntryConfirmed: false,
    pressureObservationConfirmed: false,
  });
  assertEqual("P45 not entered unavailable", notEntered.status, "UNAVAILABLE");
}

if (failures.length > 0) {
  console.error(`FAIL | check-presence-carry-reality-transition | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("PASS | check-presence-carry-reality-transition");
}
