import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/launchLifeSourceSession.ts");
const sessionPath = path.join(rootDir, "src/services/launchLifeSourceSession.ts");
const originAdapterPath = path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const typeSource = fs.readFileSync(typePath, "utf8");
const sessionSource = fs.readFileSync(sessionPath, "utf8");
const originAdapterSource = fs.readFileSync(originAdapterPath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-launch-life-source-session-"));

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const bundleAndImport = async (entryPath, outputName) => {
  const outfile = path.join(tempDir, outputName);
  await build({
    entryPoints: [entryPath],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  return import(`file://${outfile}?t=${Date.now()}`);
};

try {
  assertIncludes("session carries real source kind", typeSource, 'sourceKind: "REAL_ENGINE_RESULT"');
  assertIncludes("session carries starbeast result", typeSource, "starbeastDerivationResult: StarbeastDerivationReady");
  assertIncludes("session carries mother code result", typeSource, "motherCodeLandingResult: LunarMotherCodeLandingResult");
  assertIncludes("session carries origin mother result", typeSource, "originMotherResult: GeoChronoMotherFusionResult");
  assertIncludes("session declares immutable carrier", typeSource, "immutableCarrier: true");
  assertIncludes("session declares existing results only", typeSource, "existingEngineResultsOnly: true");
  assertIncludes("session forbids visual adapter invocation", typeSource, "noVisualAdapterInvocation: true");
  assertIncludes("session service clones engine results", sessionSource, "const sourceSnapshot = structuredClone({");
  assertIncludes("session service deep freezes snapshot graph", sessionSource, "freezeResultGraph(session)");

  [
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "resolveLaunchStarbeastDerivationSource",
    "runGeoChronoMotherFusionEngine",
    "adaptRealLifeVisualSource",
    'from "../runtime/',
    'from "../components/',
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((forbidden) =>
    assertExcludes("session remains a source-only carrier", sessionSource, forbidden),
  );

  assertIncludes("origin adapter owns starbeast engine result acquisition", originAdapterSource, "resolveLaunchStarbeastDerivationSource");
  assertIncludes("origin adapter owns mother code engine result acquisition", originAdapterSource, "runMotherCodeLandingEngine");
  assertIncludes("origin adapter exposes complete source result set", originAdapterSource, "resolveLaunchOriginMotherSourceResults");
  assertIncludes("launch stores one session slot", launchSource, "lifeSourceSession: null as LaunchLifeSourceSession | null");
  assertIncludes("launch captures session at confirmed reveal", launchSource, "captureLaunchLifeSourceSession().originMotherResult");
  assertIncludes("launch reuses captured origin result", launchSource, "m.lifeSourceSession?.originMotherResult");
  assertIncludes("launch invalidates session when tuning resets", launchSource, "m.lifeSourceSession = null");
  assertExcludes("launch does not invoke visual source adapter", launchSource, "adaptRealLifeVisualSource");

  const [originModule, sessionModule] = await Promise.all([
    bundleAndImport(originAdapterPath, "origin-adapter.mjs"),
    bundleAndImport(sessionPath, "life-source-session.mjs"),
  ]);
  const { resolveLaunchOriginMotherSourceResults } = originModule;
  const { createLaunchLifeSourceSession } = sessionModule;

  const launchInput = {
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: {
      nodeCount: 28,
      primaryNodeIndex: 6,
      originLightTrace: "28光兽入口",
    },
  };
  const inputSnapshot = JSON.stringify(launchInput);
  const sourceResults = resolveLaunchOriginMotherSourceResults(launchInput);
  const result = createLaunchLifeSourceSession({
    sourceReferenceId: "launch:1979-04-15:子时:甘肃:兰州",
    birthCoordinate: launchInput.birth,
    ...sourceResults,
  });

  assertEqual("session is available", result.status, "AVAILABLE");
  if (result.status !== "AVAILABLE") throw new Error(`unexpected blocked session=${result.reason}`);

  const { session } = result;
  assertEqual("session provenance is real engine", session.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("session keeps mansion source", session.starbeastDerivationResult.mansion, "箕");
  assertEqual("session keeps four symbol source", session.starbeastDerivationResult.fourSymbol, "青龙");
  assertEqual("session keeps mother trigram source", session.motherCodeLandingResult.fieldMapping.trigram, "兑");
  assertEqual("session keeps origin mother trigram", session.originMotherResult.mother.trigram, "兑");
  assertEqual(
    "four symbol continuity",
    session.originMotherResult.starbeast.fourSymbol,
    session.starbeastDerivationResult.fourSymbol,
  );
  assertEqual(
    "mother code continuity",
    session.originMotherResult.mother.profile.motherCodeId,
    session.motherCodeLandingResult.motherCodeProfile.motherCodeId,
  );
  assertEqual("session is frozen", Object.isFrozen(session), true);
  assertEqual("birth coordinate is frozen", Object.isFrozen(session.birthCoordinate), true);
  assertEqual("starbeast result is frozen", Object.isFrozen(session.starbeastDerivationResult), true);
  assertEqual("mother result is frozen", Object.isFrozen(session.motherCodeLandingResult), true);
  assertEqual("origin result is frozen", Object.isFrozen(session.originMotherResult), true);
  assertEqual("session owns a separate starbeast snapshot", session.starbeastDerivationResult === sourceResults.starbeastDerivationResult, false);
  assertEqual("session owns a separate mother snapshot", session.motherCodeLandingResult === sourceResults.motherCodeLandingResult, false);
  assertEqual("session owns a separate origin snapshot", session.originMotherResult === sourceResults.originMotherResult, false);
  assertEqual("engine starbeast result remains untouched", Object.isFrozen(sourceResults.starbeastDerivationResult), false);
  assertEqual("engine mother result remains untouched", Object.isFrozen(sourceResults.motherCodeLandingResult), false);
  assertEqual("engine origin result remains untouched", Object.isFrozen(sourceResults.originMotherResult), false);
  assertEqual("session creation preserves values", JSON.stringify(launchInput), inputSnapshot);

  const missingReference = createLaunchLifeSourceSession({
    sourceReferenceId: "  ",
    birthCoordinate: launchInput.birth,
    ...sourceResults,
  });
  assertEqual("missing source reference is blocked", missingReference.status, "BLOCKED");
  if (missingReference.status === "BLOCKED") {
    assertEqual("missing reference reason", missingReference.reason, "SOURCE_REFERENCE_ID_REQUIRED");
  }

  const mismatchedFourSymbol = createLaunchLifeSourceSession({
    sourceReferenceId: "launch:mismatch",
    birthCoordinate: launchInput.birth,
    ...sourceResults,
    originMotherResult: {
      ...sourceResults.originMotherResult,
      starbeast: {
        ...sourceResults.originMotherResult.starbeast,
        fourSymbol: "白虎",
      },
    },
  });
  assertEqual("discontinuous four symbol is blocked", mismatchedFourSymbol.status, "BLOCKED");
  if (mismatchedFourSymbol.status === "BLOCKED") {
    assertEqual("four symbol mismatch reason", mismatchedFourSymbol.reason, "FOUR_SYMBOL_SOURCE_MISMATCH");
  }

  console.log("\n[LAUNCH LIFE SOURCE SESSION] PASS");
} catch (error) {
  console.error("[LAUNCH LIFE SOURCE SESSION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
