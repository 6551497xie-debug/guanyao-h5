import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  host: "src/components/RealityProductionHost.tsx",
  hostType: "src/types/realityProductionRouteEntry.ts",
  presentation: "src/components/RealityGravityPresentation.tsx",
  presentationType: "src/types/realityGravityPresentation.ts",
  presentationStyles: "src/styles/reality-gravity-presentation.css",
  prototypeStyles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  consumer: "src/services/realityProductionGravityConsumer.ts",
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
    "initializeRealityProductionGravityConsumer",
    "advanceRealityProductionGravityConsumer",
    "RealityGravityPresentation",
    'gravityResult?.status === "BLOCKED"',
    'data-production-reality-status="SOURCE_NOT_READY"',
    '"GRAVITY_OBSERVATION"',
    '"CHOICE_READY_HOLD"',
    "data-gravity-stage={gravitySession?.gravityStageState",
    "gravitySession?.automaticResponseState",
    "gravitySession?.patternAwarenessState",
    "gravitySession?.choiceReadiness",
    "gravitySession?.interactionAvailability",
    'event: "GRAVITY_OBSERVATION_CONFIRM"',
  ].forEach((marker) =>
    assertIncludes("Production Reality Host consumes Gravity session", source.host, marker),
  );

  [
    "resolveGravityExperienceUIRuntime",
    "reviewRealityGravityExperienceArchitecture",
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
    assertExcludes("Production Host bypasses no consumer, engine, downstream, prototype, or storage boundary", source.host, marker),
  );

  [
    "productionGravityConsumerOnly: true",
    "sharedFrozenGravityPresentationOnly: true",
    "explicitGravityObservationOnly: true",
    "choiceReadinessHoldOnly: true",
    "noInertiaEngine: true",
    "noChoiceExecution: true",
    "noCrystalExecution: true",
  ].forEach((marker) =>
    assertIncludes("Production Gravity Host boundary", source.hostType, marker),
  );

  [
    "export function RealityGravityPresentation",
    'className="gy-p37__gravity-space"',
    'data-gravity-experience-space-panel="GRAVITY_EXPERIENCE_SPACE"',
    "Gravity Experience Space惯性观察",
    "看见惯性如何带动你。",
    "反应间隙已经打开。",
    "刺激抵达之后，身体、情绪与行动往往先于解释发生。先观察，不急着改变。",
    "新的回应空间已经准备好；Choice 尚未执行。",
    "Gravity Ready · 不生成行为结论",
    'data-interaction="GRAVITY_OBSERVATION_CONFIRM"',
    "确认这份惯性观察",
    "Choice Experience 已准备好。",
  ].forEach((marker) =>
    assertIncludes("shared frozen Gravity presentation", source.presentation, marker),
  );

  [
    "useState",
    "useEffect",
    "resolveGravityExperienceUIRuntime",
    "initializeRealityProductionGravityConsumer",
    "REAL_USER_SESSION",
    "FIXTURE_PREVIEW_ONLY",
    "fetch(",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("shared Gravity presentation remains stateless and source-neutral", source.presentation, marker),
  );

  [
    "sharedFrozenGravityPresentationOnly: true",
    "statelessPresentationOnly: true",
    "explicitConfirmationCallbackOnly: true",
    "noSourceResolution: true",
    "noInertiaCalculation: true",
    "noBehaviorScoring: true",
    "noChoiceExecution: true",
  ].forEach((marker) =>
    assertIncludes("shared Gravity presentation contract", source.presentationType, marker),
  );

  [
    "bottom: clamp(68px, 11vh, 116px)",
    "width: min(440px, 80vw)",
    "padding: 18px 20px 19px",
    "border: 1px solid rgba(183, 171, 199, 0.24)",
    "background: rgba(9, 7, 16, 0.74)",
    "backdrop-filter: blur(18px)",
    "font-size: clamp(18px, 3vw, 25px)",
    "transition: background 240ms ease, border-color 240ms ease, color 240ms ease",
    ".gy-p37__choice-ready",
    "@media (max-width: 560px)",
    ".gy-p37__gravity-space { bottom: 66px; width: 80vw; }",
  ].forEach((marker) =>
    assertIncludes("frozen P37 visual calibration is unchanged", source.presentationStyles, marker),
  );

  assertIncludes("Prototype uses shared Gravity presentation", source.harness, "<RealityGravityPresentation");
  assertExcludes("Prototype no longer owns duplicate Gravity markup", source.harness, 'className="gy-p37__gravity-space"');
  assertExcludes("Prototype stylesheet no longer owns duplicate P37 base calibration", source.prototypeStyles, "background: rgba(9, 7, 16, 0.74)");
  assertIncludes("Production Host uses authorized Gravity consumer", source.consumer, "confirmedPressureSessionOnly: true");
  assertIncludes("Reality route remains guarded", source.routeEntry, "authorizeRealityProductionRoute({");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Gravity Host gate is registered",
    packageJson.scripts?.["check-reality-production-gravity-host"] ?? "",
    "node scripts/check-reality-production-gravity-host.mjs",
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
  assertEqual("Production Gravity Host compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  for (const requiredInput of [
    "RealityPressurePresentation.tsx",
    "realityProductionPressureConsumer.ts",
    "pressureRecognitionUIRuntime.ts",
    "RealityGravityPresentation.tsx",
    "realityProductionGravityConsumer.ts",
    "gravityExperienceUIRuntime.ts",
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
    "realityGravityExperienceArchitecture.ts",
    "choiceExperienceUIRuntime.ts",
    "crystalExperienceUIRuntime.ts",
    "fixtureGenesisVisualConsumerSource",
  ]) {
    assertEqual(
      `Production Host bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION GRAVITY HOST] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION GRAVITY HOST] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
