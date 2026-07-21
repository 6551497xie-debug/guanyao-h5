import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRealityPresenceContinuityBridge.ts",
  service: "src/services/genesisRealityPresenceContinuityBridge.ts",
  genesisPage: "src/pages/GenesisProductionExperiencePage.tsx",
  realityEntry: "src/pages/RealityProductionRouteEntry.tsx",
  realityHost: "src/components/RealityProductionHost.tsx",
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
  else source[name] = fs.readFileSync(filePath, "utf8");
}

if (failures.length === 0) {
  const packageJson = JSON.parse(source.packageManifest);
  [
    "GenesisRealityPresenceContinuityBridge",
    "presenceState",
    "CARRIED_TO_REALITY",
    "REALITY_APPROACHING",
    "noEntityGeneration",
    "noPresenceMutation",
    "noPressureMutation",
    "noGravityMutation",
    "noChoiceMutation",
    "noCrystalMutation",
  ].forEach((marker) => assertIncludes("continuity type", source.type, marker));
  [
    "bridgeGenesisPresenceToReality",
    "activateGenesisRealityPresenceContinuityContext",
    "GENESIS_PRESENCE_NOT_RECOGNIZED",
    "REALITY_ENTRY_CONTEXT_REQUIRED",
    "SOURCE_REFERENCE_MISMATCH",
    "noEngineInvocation",
    "noRendererInvocation",
    "noStorage",
  ].forEach((marker) => assertIncludes("continuity service", source.service, marker));
  [
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("continuity service remains bridge-only", source.service, marker));
  [
    "activateGenesisRealityPresenceContinuityContext",
    "clearGenesisRealityPresenceContinuityContext",
    "presenceVisualRealizationResult",
  ].forEach((marker) => assertIncludes("Genesis activates continuity", source.genesisPage, marker));
  [
    "readGenesisRealityPresenceContinuityContext",
    "GENESIS_PRESENCE_CONTINUITY_NOT_AVAILABLE",
    "genesisPresenceContinuityContextRequired",
  ].forEach((marker) => assertIncludes("Reality guards continuity", source.realityEntry, marker));
  [
    "data-genesis-presence-continuity",
    "data-genesis-presence-arrival",
  ].forEach((marker) => assertIncludes("Reality host consumes continuity", source.realityHost, marker));
  assertIncludes("type index exports continuity", source.typeIndex, "./genesisRealityPresenceContinuityBridge");
  assertIncludes(
    "gate registered",
    packageJson.scripts?.["check-genesis-reality-presence-continuity-bridge"] ?? "",
    "node scripts/check-genesis-reality-presence-continuity-bridge.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-reality-presence-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: 'export * from "./src/services/genesisRealityPresenceContinuityBridge.ts";',
      resolveDir: rootDir,
      sourcefile: "genesis-reality-presence-gate-entry.ts",
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
  const sourceReferenceId = "launch-session:genesis-reality-presence";
  const presence = Object.freeze({
    sourceReferenceId,
    manifestationSourceReferenceId: "manifestation:existing", 
    visualPresenceState: "RECOGNIZED",
    presenceOrigin: "EXISTING_IN_LIFE_COORDINATE",
    appearanceMeaning: "BECOMES_VISIBLE_NOT_GENERATED",
    sourceProvenance: "REAL_USER_SESSION",
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceSourceMutation: true,
    noEngineInvocation: true,
    noRendererParameterMutation: true,
    noTimelineMutation: true,
    noFallback: true,
  });
  const session = Object.freeze({
    phase: "REALITY_ENTRY_ELIGIBLE",
    recognitionConfirmed: true,
    realityEntryConfirmed: true,
  });
  const entryContext = Object.freeze({
    source: "genesis_production_reality_entry_context",
    sourceReferenceId,
    sourceProvenance: "REAL_USER_SESSION",
    eligibility: "ELIGIBLE",
    recognitionRealitySession: session,
  });
  const ready = runtime.bridgeGenesisPresenceToReality({
    presenceRealization: presence,
    realityEntryContext: entryContext,
  });
  assertEqual("recognized Presence bridges", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("continuity state", ready.bridge.continuityState, "CARRIED_TO_REALITY");
    assertEqual("arrival state", ready.bridge.arrivalState, "REALITY_APPROACHING");
    assertEqual("source remains continuous", ready.bridge.sourceReferenceId, sourceReferenceId);
  }
  const dormant = runtime.bridgeGenesisPresenceToReality({
    presenceRealization: Object.freeze({ ...presence, visualPresenceState: "PRESENT" }),
    realityEntryContext: entryContext,
  });
  assertEqual("unrecognized Presence is blocked", dormant.status, "BLOCKED");
  if (dormant.status === "BLOCKED") assertEqual("unrecognized reason", dormant.reason, "GENESIS_PRESENCE_NOT_RECOGNIZED");
  const mismatch = runtime.bridgeGenesisPresenceToReality({
    presenceRealization: presence,
    realityEntryContext: Object.freeze({ ...entryContext, sourceReferenceId: "launch-session:other" }),
  });
  assertEqual("mismatched source is blocked", mismatch.status, "BLOCKED");
  if (mismatch.status === "BLOCKED") assertEqual("mismatch reason", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");
  const context = runtime.activateGenesisRealityPresenceContinuityContext({
    presenceRealization: presence,
    realityEntryContext: entryContext,
  });
  assertEqual("continuity context activates", context?.sourceReferenceId, sourceReferenceId);
  runtime.clearGenesisRealityPresenceContinuityContext();
  assertEqual("continuity context clears", runtime.readGenesisRealityPresenceContinuityContext(), null);
}

if (failures.length > 0) {
  console.error(`FAIL | check-genesis-reality-presence-continuity-bridge | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("PASS | check-genesis-reality-presence-continuity-bridge");
}
