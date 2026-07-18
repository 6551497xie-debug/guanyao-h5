import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureSeedPresentation.ts",
  component: "src/components/RealityPressureSeedPresentation.tsx",
  host: "src/components/RealityProductionHost.tsx",
  v1Presentation: "src/components/RealityPressurePresentation.tsx",
  pressureSeedConsumer:
    "src/services/realityProductionPressureSeedConsumer.ts",
  gravity: "src/services/realityProductionGravityConsumer.ts",
  stylesheet: "src/styles/reality-pressure-presentation.css",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

try {
  [
    "RealityPressureSeedPresentationBoundary",
    "RealityPressureSeedPresentationProps",
    "RealityPressureSeedCandidatePresentationProps",
    "session: RealityProductionPressureSeedSession",
    "onRecognize: (candidateReferenceId: string) => void",
    "onRequestNextBundle: () => void",
    "onPause: () => void",
    "noDefaultCandidate: true",
    "noAutomaticSelection: true",
    "noConsumerInvocation: true",
  ].forEach((marker) =>
    assertIncludes("V2 Pressure Seed presentation contract", source.type, marker),
  );

  [
    "RealityPressureSeedPresentation",
    "RealityPressureSeedCandidatePresentation",
    'session.captureState === "SEED_RECOGNIZED"',
    "session.candidateBundle.candidates.map",
    '"PRESSURE_SEED_RECOGNIZE"',
    '"PRESSURE_SEED_REQUEST_NEXT_BUNDLE"',
    '"PRESSURE_SEED_PAUSE"',
    "candidate.surface",
    "candidate.shell",
    "onRecognize(candidate.candidateReferenceId)",
    "onRequestNextBundle",
    "onPause",
    "Gravity 尚未启动",
  ].forEach((marker) =>
    assertIncludes("V2 Pressure Seed presentation implementation", source.component, marker),
  );

  [
    "../services/",
    "initializeRealityProductionPressureSeedConsumer",
    "advanceRealityProductionPressureSeedConsumer",
    "captureRealityPressureSeed",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityProductionGravityConsumer",
    "candidates[0]",
    "selectedCandidate",
    "localStorage",
    "sessionStorage",
    "useState",
    "useEffect",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes(
      "presentation performs no source, selection, Consumer, Gravity, state, navigation, or storage work",
      source.component,
      marker,
    ),
  );

  assertIncludes(
    "Production Host activates the frozen V2 presentation",
    source.host,
    "RealityPressureSeedPresentation",
  );
  assertExcludes(
    "V1 presentation remains isolated",
    source.v1Presentation,
    "RealityPressureSeedPresentation",
  );
  assertExcludes(
    "V2 Consumer remains presentation-neutral",
    source.pressureSeedConsumer,
    "RealityPressureSeedPresentation",
  );
  assertExcludes(
    "Gravity remains presentation-neutral",
    source.gravity,
    "RealityPressureSeedPresentation",
  );
  [
    ".gy-p36__pressure-space",
    ".gy-p36__pressure-head",
    ".gy-p36__signal-list",
    ".gy-p36__gravity-ready",
  ].forEach((marker) =>
    assertIncludes("existing frozen Pressure style is reused", source.stylesheet, marker),
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "V2 Pressure Seed presentation gate is registered",
    packageJson.scripts?.[
      "check-reality-pressure-seed-presentation-contract"
    ] ?? "",
    "node scripts/check-reality-pressure-seed-presentation-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-seed-presentation-"),
  );
  const outPath = path.join(tempDir, "presentation.mjs");
  await build({
    entryPoints: [path.join(rootDir, paths.component)],
    outfile: outPath,
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2020",
    logLevel: "silent",
  });
  const bundle = fs.readFileSync(outPath, "utf8");
  assertIncludes(
    "standalone presentation bundle exports component",
    bundle,
    "RealityPressureSeedPresentation",
  );
  [
    "realityProductionPressureSeedConsumer",
    "realityPressureSeedCaptureAdapter",
    "realityPressureSeedCandidateSource",
    "realityProductionGravityConsumer",
  ].forEach((marker) =>
    assertExcludes("presentation bundle excludes runtime service", bundle, marker),
  );
  assertEqual(
    "Host owns the V2 presentation activation boundary",
    source.host.includes("<RealityPressureSeedPresentation"),
    true,
  );

  console.log("\n[REALITY PRESSURE SEED PRESENTATION CONTRACT] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE SEED PRESENTATION CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
