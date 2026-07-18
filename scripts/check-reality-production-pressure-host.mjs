import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  host: "src/components/RealityProductionHost.tsx",
  hostType: "src/types/realityProductionRouteEntry.ts",
  presentation: "src/components/RealityPressurePresentation.tsx",
  presentationType: "src/types/realityPressurePresentation.ts",
  presentationStyles: "src/styles/reality-pressure-presentation.css",
  prototypeStyles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  consumer: "src/services/realityProductionPressureConsumer.ts",
  routeEntry: "src/pages/RealityProductionRouteEntry.tsx",
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
    "initializeRealityProductionPressureConsumer",
    "advanceRealityProductionPressureConsumer",
    "initializeRealityProductionGravityConsumer",
    "RealityGravityPresentation",
    "RealityPressurePresentation",
    'pressureResult.status !== "READY"',
    'data-production-reality-status="SOURCE_NOT_READY"',
    '"PRESSURE_OBSERVATION"',
    '"GRAVITY_OBSERVATION"',
    '"CHOICE_RESPONSE_SPACE"',
    '"CRYSTAL_READY_HOLD"',
    "data-pressure-recognition-state={pressureSession.pressureStageState}",
    "data-pressure-observation-state={pressureSession.observationState}",
    "data-pressure-tension-awareness={pressureSession.tensionAwareness}",
    "data-gravity-readiness={pressureSession.gravityReadiness}",
    'event: "PRESSURE_OBSERVATION_CONFIRM"',
  ].forEach((marker) =>
    assertIncludes("Production Reality Host consumes Pressure session", source.host, marker),
  );

  [
    "resolvePressureRecognitionUIRuntime",
    "resolveGravityExperienceUIRuntime",
    "resolveChoiceExperienceUIRuntime",
    "resolveCrystalExperienceUIRuntime",
    "GuanyaoRuntimeEngine",
    "GravityPage",
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype",
    "SelectedPressureSeedContext",
    "localStorage",
    "sessionStorage",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("Production Host bypasses no consumer or downstream boundary", source.host, marker),
  );

  [
    "productionPressureConsumerOnly: true",
    "sharedFrozenPressurePresentationOnly: true",
    "explicitPressureObservationOnly: true",
    "productionGravityConsumerOnly: true",
    "sharedFrozenGravityPresentationOnly: true",
    "productionChoiceConsumerOnly: true",
    "sharedFrozenChoicePresentationOnly: true",
    "crystalReadinessHoldOnly: true",
    "noPressureEngine: true",
    "noPressureSeedMatching: true",
    "noPressureResult: true",
    "noInertiaEngine: true",
    "noBehaviorEngine: true",
    "noCrystalExecution: true",
  ].forEach((marker) =>
    assertIncludes("Production Pressure Host boundary", source.hostType, marker),
  );

  [
    "export function RealityPressurePresentation",
    'className="gy-p36__pressure-space"',
    'data-pressure-recognition-space-panel="PRESSURE_RECOGNITION_SPACE"',
    "Pressure Recognition Space现实作用观察",
    "先看见，什么正在作用于你。",
    "张力已经被看见。",
    "不急着解释，也不急着判断。先让现实信号与内在张力浮现。",
    "接下来观察：我如何回应这些作用。Gravity 尚未执行。",
    "Reality Ready · 不生成压力结论",
    'data-interaction="PRESSURE_OBSERVATION_CONFIRM"',
    "确认这份观察",
    "Gravity Experience 已准备好。",
  ].forEach((marker) =>
    assertIncludes("shared frozen Pressure presentation", source.presentation, marker),
  );

  [
    "useState",
    "useEffect",
    "resolvePressureRecognitionUIRuntime",
    "initializeRealityProductionPressureConsumer",
    "REAL_USER_SESSION",
    "FIXTURE_PREVIEW_ONLY",
    "fetch(",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("shared Pressure presentation remains stateless and source-neutral", source.presentation, marker),
  );

  [
    "sharedFrozenPressurePresentationOnly: true",
    "statelessPresentationOnly: true",
    "explicitConfirmationCallbackOnly: true",
    "noSourceResolution: true",
    "noPressureCalculation: true",
    "noPressureSeedMatching: true",
    "noGravityExecution: true",
  ].forEach((marker) =>
    assertIncludes("shared Pressure presentation contract", source.presentationType, marker),
  );

  [
    "bottom: clamp(68px, 11vh, 116px)",
    "width: min(440px, 80vw)",
    "padding: 18px 20px 19px",
    "border: 1px solid rgba(169, 182, 209, 0.24)",
    "background: rgba(7, 9, 16, 0.72)",
    "backdrop-filter: blur(18px)",
    "font-size: clamp(18px, 3vw, 25px)",
    "transition: background 240ms ease, border-color 240ms ease, color 240ms ease",
    ".gy-p36__gravity-ready",
    "@media (max-width: 560px)",
    ".gy-p36__pressure-space { bottom: 66px; width: 80vw; }",
  ].forEach((marker) =>
    assertIncludes("frozen P36 visual calibration is unchanged", source.presentationStyles, marker),
  );

  assertIncludes("Prototype uses shared Pressure presentation", source.harness, "<RealityPressurePresentation");
  assertExcludes("Prototype no longer owns duplicate Pressure markup", source.harness, 'className="gy-p36__pressure-space"');
  assertExcludes("Prototype stylesheet no longer owns duplicate P36 base calibration", source.prototypeStyles, "background: rgba(7, 9, 16, 0.72)");
  assertIncludes("Production Host uses authorized consumer", source.consumer, "authorizedRealitySourceOnly: true");
  assertIncludes("Reality route remains guarded", source.routeEntry, "authorizeRealityProductionRoute({");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Pressure Host gate is registered",
    packageJson.scripts?.["check-reality-production-pressure-host"] ?? "",
    "node scripts/check-reality-production-pressure-host.mjs",
  );

  const compileResult = await build({
    entryPoints: [path.join(rootDir, paths.host)],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    write: false,
    metafile: true,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  assertEqual("Production Pressure Host compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  for (const requiredInput of [
    "RealityPressurePresentation.tsx",
    "realityProductionPressureConsumer.ts",
    "pressureRecognitionUIRuntime.ts",
    "RealityGravityPresentation.tsx",
    "realityProductionGravityConsumer.ts",
    "gravityExperienceUIRuntime.ts",
    "RealityChoicePresentation.tsx",
    "realityProductionChoiceConsumer.ts",
    "choiceExperienceUIRuntime.ts",
  ]) {
    assertEqual(
      `Production Host bundle includes ${requiredInput}`,
      bundleInputs.some((input) => input.includes(requiredInput)),
      true,
    );
  }
  for (const forbiddenInput of [
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype.ts",
    "GravityPage",
    "guanyaoRuntimeEngine",
    "crystalExperienceUIRuntime.ts",
    "fixtureGenesisVisualConsumerSource",
  ]) {
    assertEqual(
      `Production Host bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION PRESSURE HOST] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION PRESSURE HOST] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
