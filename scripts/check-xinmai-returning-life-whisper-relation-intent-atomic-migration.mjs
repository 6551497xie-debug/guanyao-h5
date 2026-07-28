import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const presentationStatePath = path.join(
  rootDir,
  "src/services/xinmaiRelationshipNamingPresentationState.ts",
);
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const genesisPath = path.join(
  rootDir,
  "src/pages/GenesisProductionExperiencePage.tsx",
);
const realityCanvasPath = path.join(
  rootDir,
  "src/components/RealityLifeUniverseCanvas.tsx",
);
const rendererPath = path.join(
  rootDir,
  "src/renderers/genesisWebGLRendererCore.ts",
);
const tempModulePath = path.join(
  os.tmpdir(),
  `xinmai-returning-life-whisper-${process.pid}.mjs`,
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
  console.log(`PASS | ${name}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
  console.log(`PASS | ${name}`);
};

try {
  await build({
    entryPoints: [presentationStatePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const presentation = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );
  const intentCases = [
    ["undecided return stays in life world", "NONE", "DORMANT", false],
    [
      "submitted return waits for same-life response",
      "WHISPER_SUBMITTED",
      "RESPONDING",
      false,
    ],
    [
      "settled same-life response unlocks Reality intent",
      "WHISPER_SUBMITTED",
      "SETTLED",
      true,
    ],
    [
      "explicit returning silence unlocks Reality intent",
      "WHISPER_SKIPPED",
      "SKIPPED",
      true,
    ],
  ];
  for (const [name, lifeWhisperFact, lifeWhisperResponsePhase, expected] of
    intentCases) {
    assertEqual(
      name,
      presentation.resolveLifeWhisperRealityEntryIntent({
        lifeWhisperFact,
        lifeWhisperResponsePhase,
      }),
      expected,
    );
  }

  const launch = fs.readFileSync(launchPath, "utf8");
  const genesis = fs.readFileSync(genesisPath, "utf8");
  const realityCanvas = fs.readFileSync(realityCanvasPath, "utf8");
  const renderer = fs.readFileSync(rendererPath, "utf8");

  assertIncludes(
    "returning life owns a current-cycle Whisper fact",
    launch,
    "returningLifeWhisperFact",
  );
  assertIncludes(
    "returning life exposes voluntary silence",
    launch,
    'data-interaction="WHISPER_SKIPPED"',
  );
  assertIncludes(
    "returning life exposes one explicit Reality intent",
    launch,
    'data-interaction="RETURNING_REALITY_INTENT"',
  );
  assertIncludes(
    "returning Reality entry remains the existing V2 target",
    launch,
    'returningEntry: "SAME_LIFE_NEW_REALITY"',
  );
  assertIncludes(
    "returning raw text is destroyed before response",
    launch,
    'setReturningLifeWhisperText("");',
  );
  assertExcludes(
    "the old timer no longer directly navigates returning users",
    launch,
    "if (returningLifeIdentity) {\n              navigate(GUANYAO_ROUTES.reality",
  );
  assertIncludes(
    "historical Reality enters the memory-only canvas input",
    launch,
    "historicalRealityMemoryKey={",
  );

  const returningCanvasStart = launch.indexOf(
    "<RealityLifeUniverseCanvas",
    launch.indexOf('className="gy-returning-life-world"'),
  );
  const returningCanvasEnd = launch.indexOf("/>", returningCanvasStart);
  const returningCanvasInvocation = launch.slice(
    returningCanvasStart,
    returningCanvasEnd,
  );
  assertExcludes(
    "historical pressure no longer occupies the current Reality slot",
    returningCanvasInvocation,
    "selectedPressureSeedContext",
  );
  assertIncludes(
    "returning canvas receives explicit typed relationship facts",
    returningCanvasInvocation,
    "lifeWhisperRelationshipVisualFact",
  );
  assertIncludes(
    "Reality canvas accepts the explicit visual fact",
    realityCanvas,
    "lifeWhisperRelationshipVisualFact?: LifeWhisperRelationshipVisualFact",
  );
  assertIncludes(
    "Genesis also supplies the shared explicit visual fact",
    genesis,
    "lifeWhisperRelationshipVisualFact={{",
  );
  assertIncludes(
    "renderer consumes only the explicit visual fact reader",
    renderer,
    "input.readLifeWhisperRelationshipVisualFact?.()",
  );
  assertExcludes(
    "renderer no longer reverse-reads Life Whisper from DOM",
    renderer,
    'closest(\n        "[data-life-whisper-response-phase]"',
  );

  const forbiddenRawTextConsumers = [
    "src/components/RealityProductionHost.tsx",
    "src/pages/RealityProductionRouteEntry.tsx",
    "src/pages/GravityPage.tsx",
    "src/pages/ChoicePage.tsx",
    "src/services/personalityRingLiteService.ts",
  ];
  for (const relativePath of forbiddenRawTextConsumers) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    assertExcludes(
      `${relativePath} does not consume returning raw text`,
      source,
      "returningLifeWhisperText",
    );
  }

  console.log(
    "\n[XINMAI RETURNING LIFE WHISPER RELATION INTENT ATOMIC MIGRATION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI RETURNING LIFE WHISPER RELATION INTENT ATOMIC MIGRATION] FAIL",
  );
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
