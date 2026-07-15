import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeMotion.ts",
  service: "src/services/starBeastPrototypeMotionAdapter.ts",
  frameSampler: "src/services/starBeastPrototypeFrameSampler.ts",
  lab: "src/pages/StarbeastLab.tsx",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_MOTION_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});

const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(absolute.type, "utf8");
  const serviceSource = fs.readFileSync(absolute.service, "utf8");
  const frameSamplerSource = fs.readFileSync(absolute.frameSampler, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(absolute.packageManifest, "utf8"));

  [
    "export type StarBeastPrototypeMotionProfile",
    'semanticRole: "STAR_BEAST_PROTOTYPE_MOTION_PROFILE"',
    "sourceProjectionReference: StarBeastPrototypeRenderProjection",
    "breathing: Readonly<",
    "tail: Readonly<",
    "stardust: Readonly<",
    "crystalPulse: Readonly<",
    "boundaryShimmer: Readonly<",
    "normalizedMotion: true",
    "prototypeOnly: true",
    "noLifeStateMutation: true",
    "noBusinessInference: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("prototype motion type", typeSource, marker));

  [
    'from "../types/starBeastRendererPrototypeAdapter"',
    "export function adaptStarBeastPrototypeProjectionToMotion",
    "projection: StarBeastPrototypeRenderProjection",
    "): StarBeastPrototypeMotionProfile",
    "sourceProjectionReference: projection",
    "projection.layers.starCore",
    "projection.layers.starPattern",
    "projection.layers.boundaryLight",
    "projection.layers.internalStardust",
    "projection.layers.crystalNodes",
    "Object.freeze({",
  ].forEach((marker) => assertIncludes("projection drives motion", serviceSource, marker));

  [
    "MotherCode",
    "motherCode",
    "Hexagram",
    "hexagram",
    "LifeArchetype",
    "lifeArchetype",
    "fourSymbol",
    "FourSymbol",
    "UserProfile",
    "userProfile",
    "StarBeastIdentity",
    "identityReference",
    "StarBeastVisualState",
    "StarBeastRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "requestAnimationFrame",
    "getContext(",
    "CanvasRenderingContext",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("motion adapter stays projection-only", serviceSource, marker));

  [
    "adaptStarBeastPrototypeProjectionToMotion(",
    "motionProfile: PROTOTYPE_MOTION",
  ].forEach((marker) => assertIncludes("StarbeastLab consumes motion", labSource, marker));

  [
    "motionProfile.breathing",
    "motionProfile.tail",
    "motionProfile.stardust",
    "motionProfile.crystalPulse",
    "motionProfile.boundaryShimmer",
  ].forEach((marker) => assertIncludes("P80 frame sampler consumes motion channels", frameSamplerSource, marker));

  ["localStorage", "sessionStorage", 'from "three"', "WebGLRenderingContext"].forEach(
    (marker) => assertExcludes("StarbeastLab keeps P79 isolated", labSource, marker),
  );

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("adaptStarBeastPrototypeProjectionToMotion(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "motion adapter has one isolated consumer",
    callSites.sort().join(","),
    [files.service, files.lab].sort().join(","),
  );

  [
    "RC-STAR-BEAST-PROTOTYPE-MOTION-P79",
    "P77 Prototype Render Projection",
    "P79 Prototype Motion Adapter",
    "P79 Prototype Motion Profile",
    "StarbeastLab Canvas",
    "不是生命状态",
    "不生成新的生命事实",
    "唯一允许的页面消费者是 `src/pages/StarbeastLab.tsx`",
    "不接 LaunchLab、Gravity、Dynamics、Crystal UI、Storage 或正式 Renderer Runtime",
  ].forEach((marker) => assertIncludes("prototype motion protocol", protocolSource, marker));

  assertIncludes("type index exports motion profile", typeIndexSource, "StarBeastPrototypeMotionProfile");
  assertIncludes(
    "motion gate command registered",
    packageJson.scripts?.["check:star-beast-prototype-motion"] ?? "",
    "node scripts/check-star-beast-prototype-motion.mjs",
  );
  assertIncludes(
    "motion gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-motion",
  );

  const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-prototype-motion-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.service],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { adaptStarBeastPrototypeProjectionToMotion } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );
  const makeProjection = (crystalVisible) => Object.freeze({
    layers: Object.freeze({
      starCore: Object.freeze({ intensity: 0.8, pulseRate: 0.7 }),
      starPattern: Object.freeze({ complexity: 0.6 }),
      boundaryLight: Object.freeze({ opacity: 0.7 }),
      internalStardust: Object.freeze({ density: 0.65, driftRate: 0.55 }),
      crystalNodes: Object.freeze({
        visible: crystalVisible,
        count: crystalVisible ? 4 : 0,
        intensity: crystalVisible ? 0.75 : 0,
      }),
    }),
  });
  const availableProjection = makeProjection(true);
  const availableMotion = adaptStarBeastPrototypeProjectionToMotion(availableProjection);
  const absentMotion = adaptStarBeastPrototypeProjectionToMotion(makeProjection(false));

  assertEqual("projection reference is preserved", availableMotion.sourceProjectionReference === availableProjection, true);
  assertEqual("Crystal pulse follows existing nodes", availableMotion.crystalPulse.enabled, true);
  assertEqual("Crystal pulse stays disabled without nodes", absentMotion.crystalPulse.enabled, false);
  assertEqual(
    "motion profile is immutable",
    Object.isFrozen(availableMotion) &&
      Object.isFrozen(availableMotion.breathing) &&
      Object.isFrozen(availableMotion.tail) &&
      Object.isFrozen(availableMotion.stardust) &&
      Object.isFrozen(availableMotion.crystalPulse) &&
      Object.isFrozen(availableMotion.boundaryShimmer),
    true,
  );
  assertEqual("motion does not mutate life state", availableMotion.noLifeStateMutation, true);
  assertEqual("motion values remain finite", [
    availableMotion.breathing.amplitude,
    availableMotion.breathing.frequencyHz,
    availableMotion.tail.amplitude,
    availableMotion.tail.frequencyHz,
    availableMotion.stardust.driftRate,
    availableMotion.stardust.orbitAmplitude,
    availableMotion.crystalPulse.amplitude,
    availableMotion.crystalPulse.frequencyHz,
    availableMotion.boundaryShimmer.amplitude,
    availableMotion.boundaryShimmer.frequencyHz,
  ].every(Number.isFinite), true);
  fs.rmSync(tempModulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast prototype motion | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype motion gate");
