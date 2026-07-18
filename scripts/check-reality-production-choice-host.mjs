import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  host: "src/components/RealityProductionHost.tsx",
  hostType: "src/types/realityProductionRouteEntry.ts",
  presentation: "src/components/RealityChoicePresentation.tsx",
  presentationType: "src/types/realityChoicePresentation.ts",
  presentationStyles: "src/styles/reality-choice-presentation.css",
  prototypeStyles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  consumer: "src/services/realityProductionChoiceConsumer.ts",
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
    "initializeRealityProductionChoiceConsumer",
    "advanceRealityProductionChoiceConsumer",
    "RealityChoicePresentation",
    'choiceResult?.status === "BLOCKED"',
    'data-production-reality-status="SOURCE_NOT_READY"',
    '"CHOICE_RESPONSE_SPACE"',
    '"CRYSTAL_READY_HOLD"',
    "data-choice-stage={choiceSession?.choiceStageState",
    "choiceSession?.responseGapState",
    "choiceSession?.alternativeResponseState",
    "choiceSession?.crystalReadiness",
    "choiceSession?.interactionAvailability",
    'event: "CHOICE_ACTIVE_RESPONSE"',
  ].forEach((marker) =>
    assertIncludes("Production Reality Host consumes Choice session", source.host, marker),
  );

  [
    "resolveChoiceExperienceUIRuntime",
    "reviewRealityChoiceExperienceArchitecture",
    "resolveCrystalExperienceUIRuntime",
    "GuanyaoRuntimeEngine",
    "ChoicePage",
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
    "productionChoiceConsumerOnly: true",
    "sharedFrozenChoicePresentationOnly: true",
    "explicitChoiceActiveResponseOnly: true",
    "crystalReadinessHoldOnly: true",
    "noBehaviorEngine: true",
    "noRecommendedAction: true",
    "noBestChoice: true",
    "noCrystalExecution: true",
  ].forEach((marker) =>
    assertIncludes("Production Choice Host boundary", source.hostType, marker),
  );

  [
    "export function RealityChoicePresentation",
    'className="gy-p38__choice-space"',
    'data-choice-experience-space-panel="CHOICE_EXPERIENCE_SPACE"',
    "Choice Experience Space回应空间",
    "反应间隙已经打开。",
    "这次回应已经发生。",
    "你不一定必须沿着旧路径回应。除了旧路径，还有其他可能。",
    "Crystal 已准备好；这次变化尚未沉积。",
    "Choice Ready · 不提供唯一答案",
    'data-interaction="CHOICE_ACTIVE_RESPONSE"',
    "主动产生新的回应",
    "Crystal Experience 已准备好。",
  ].forEach((marker) =>
    assertIncludes("shared frozen Choice presentation", source.presentation, marker),
  );

  [
    "useState",
    "useEffect",
    "resolveChoiceExperienceUIRuntime",
    "initializeRealityProductionChoiceConsumer",
    "REAL_USER_SESSION",
    "FIXTURE_PREVIEW_ONLY",
    "fetch(",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("shared Choice presentation remains stateless and source-neutral", source.presentation, marker),
  );

  [
    "sharedFrozenChoicePresentationOnly: true",
    "statelessPresentationOnly: true",
    "explicitActiveResponseCallbackOnly: true",
    "userOwnedResponseOnly: true",
    "noSourceResolution: true",
    "noBehaviorGeneration: true",
    "noRecommendedAction: true",
    "noBestChoice: true",
    "noCrystalExecution: true",
  ].forEach((marker) =>
    assertIncludes("shared Choice presentation contract", source.presentationType, marker),
  );

  [
    "bottom: clamp(68px, 11vh, 116px)",
    "width: min(440px, 80vw)",
    "padding: 18px 20px 19px",
    "border: 1px solid rgba(198, 180, 158, 0.26)",
    "background: rgba(12, 9, 9, 0.74)",
    "backdrop-filter: blur(18px)",
    "font-size: clamp(18px, 3vw, 25px)",
    "transition: background 240ms ease, border-color 240ms ease, color 240ms ease",
    ".gy-p38__crystal-ready",
    "@media (max-width: 560px)",
    ".gy-p38__choice-space { bottom: 66px; width: 80vw; }",
  ].forEach((marker) =>
    assertIncludes("frozen P38 visual calibration is unchanged", source.presentationStyles, marker),
  );

  assertIncludes("Prototype uses shared Choice presentation", source.harness, "<RealityChoicePresentation");
  assertExcludes("Prototype no longer owns duplicate Choice markup", source.harness, 'className="gy-p38__choice-space"');
  assertExcludes("Prototype stylesheet no longer owns duplicate P38 base calibration", source.prototypeStyles, "background: rgba(12, 9, 9, 0.74)");
  assertIncludes("Production Host uses authorized Choice consumer", source.consumer, "confirmedGravitySessionOnly: true");
  assertIncludes("Reality route remains guarded", source.routeEntry, "authorizeRealityProductionRoute({");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Choice Host gate is registered",
    packageJson.scripts?.["check-reality-production-choice-host"] ?? "",
    "node scripts/check-reality-production-choice-host.mjs",
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
  assertEqual("Production Choice Host compiles independently", compileResult.errors.length, 0);
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
    "ChoicePage",
    "guanyaoRuntimeEngine",
    "realityChoiceExperienceArchitecture.ts",
    "crystalExperienceUIRuntime.ts",
    "fixtureGenesisVisualConsumerSource",
  ]) {
    assertEqual(
      `Production Host bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION CHOICE HOST] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION CHOICE HOST] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
