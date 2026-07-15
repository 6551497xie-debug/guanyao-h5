import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastVisualState.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const mappingPath = path.join(rootDir, "src/services/starBeastVisualStateMapping.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const dynamicsVisualPath = path.join(rootDir, "src/types/dynamicsVisualState.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_VISUAL_STATE_SCHEMA_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-visual-state-schema-${process.pid}.mjs`);

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
const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["star beast visual state type", typePath],
  ["type index", typeIndexPath],
  ["star beast visual state mapping", mappingPath],
  ["foundation type", foundationPath],
  ["dynamics visual state", dynamicsVisualPath],
  ["star beast visual state protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const mappingSource = fs.readFileSync(mappingPath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const dynamicsVisualSource = fs.readFileSync(dynamicsVisualPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type StarBeastVisualReferenceKind",
    '"STAR_BEAST_IDENTITY"',
    '"LIFE_ARCHETYPE"',
    '"STAR_BEAST_MEMORY"',
    '"CRYSTAL"',
    "export type StarBeastLifeStateReference",
    'referenceType: "STAR_BEAST_LIFE_STATE"',
    "identityReference: StarBeastIdentityReference",
    "archetypeReference: StarBeastArchetypeReference",
    "journeyState: StarBeastVisualJourneyState",
    "export type StarBeastVisualMappingInput",
    "lifeStateReference: StarBeastLifeStateReference",
    "memoryReference: StarBeastMemoryVisualReference | null",
    "crystalReference: StarBeastCrystalVisualReference | null",
    "export type StarBeastVisualExpression",
    "intensity: number",
    "particleDensity: number",
    "lightFlowDirection:",
    "breathingRhythm:",
    "constellationComplexity: number",
    "expressionParametersOnly: true",
    "notLifeFacts: true",
    "export type StarBeastVisualState",
    'semanticRole: "STAR_BEAST_VISUAL_STATE"',
    "identity: StarBeastIdentityReference",
    "archetype: StarBeastArchetypeReference",
    "manifestationDepth:",
    "energyFlowState:",
    "lightState:",
    "starPatternState:",
    "crystalPresenceState:",
    "presenceState:",
    "expression: StarBeastVisualExpression",
    "sourceReferences: Readonly",
    "visualMappingOnly: true",
    "noLifeStateMutation: true",
    "noRendering: true",
    "noMemoryGrowthInference: true",
  ].forEach((marker) => assertIncludes("star beast visual state type contract", typeSource, marker));

  [
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "hexagram",
    "personality",
    "Persona",
    "userLabel",
    "uiText",
    "Canvas",
    "WebGL",
    "THREE",
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((marker) => assertExcludes("visual schema has no forbidden business or rendering input", typeSource, marker));

  [
    "type StarBeastVisualPhaseProjection",
    "STAR_BEAST_VISUAL_PHASE_PROJECTIONS",
    "Record<StarBeastVisualJourneyState, StarBeastVisualPhaseProjection>",
    "ORIGIN: Object.freeze",
    "PRESSURE: Object.freeze",
    "AWARENESS: Object.freeze",
    "CRYSTAL: Object.freeze",
    'manifestationDepth: "FOUNDATIONAL"',
    'energyFlowState: "RESTRICTED"',
    'lightState: "RETURNING"',
    'starPatternState: "LIFE_TEXTURE_ADDED"',
    "export function mapStarBeastLifeStateToVisualState",
    "input: StarBeastVisualMappingInput",
    "): StarBeastVisualState",
    "STAR_BEAST_VISUAL_PHASE_PROJECTIONS[lifeStateReference.journeyState]",
    "input.crystalReference !== null",
    'lifeStateReference.journeyState === "CRYSTAL"',
    "identity: lifeStateReference.identityReference",
    "archetype: lifeStateReference.archetypeReference",
    "journeyState: lifeStateReference.journeyState",
    "expression: projection.expression",
    "memoryReference: input.memoryReference",
    "crystalReference: input.crystalReference",
    "noLifeStateMutation: true",
    "noRendering: true",
  ].forEach((marker) => assertIncludes("star beast visual mapping contract", mappingSource, marker));

  [
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "hexagram",
    "personality",
    "Persona",
    "userLabel",
    "uiText",
    "Canvas",
    "canvas",
    "WebGL",
    "THREE",
    "three",
    "Image",
    "SVG",
    "requestAnimationFrame",
    "StarBeastGrowth",
    "resolveStarBeastMemoryEligibility(",
    "consumeStarBeastMemoryCandidate(",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "/pages/",
    "/components/",
  ].forEach((marker) => assertExcludes("star beast visual mapping stays semantic-only", mappingSource, marker));

  [
    "StarBeastLifeStateReference",
    "StarBeastVisualExpression",
    "StarBeastVisualMappingInput",
    "StarBeastVisualState",
    'from "./starBeastVisualState"',
  ].forEach((marker) => assertIncludes("type index exports star beast visual schema", typeIndexSource, marker));

  assertExcludes("foundation does not consume visual schema", foundationSource, "StarBeastVisualState");
  assertExcludes("existing dynamics visual state remains independent", dynamicsVisualSource, "StarBeastVisualState");

  const mappingCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("mapStarBeastLifeStateToVisualState("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "visual mapping has no downstream consumer",
    mappingCallSites.join(","),
    "src/services/starBeastVisualStateMapping.ts",
  );

  [
    "RC-STAR-BEAST-VISUAL-STATE-SCHEMA-P39",
    "STAR BEAST VISUAL STATE SCHEMA",
    "Star Beast 不是图片",
    "StarBeastLifeState",
    "StarBeastVisualState",
    "Future Renderer",
    "Visual State 不是生命状态",
    "Origin",
    "Pressure",
    "Awareness",
    "Crystal",
    "Memory Reference 仅作为可选引用被原样保留",
    "不模拟成长",
    "P39 Mapping 函数当前没有下游调用者",
    "P39 `StarBeastVisualState` 输出类型只允许作为 P40 Renderer Input 来源",
    "P40 只建立 Renderer Contract，不实现 Planner 或 Renderer",
    "Canvas、WebGL、Three.js",
    "不修改 P0–P38",
  ].forEach((marker) => assertIncludes("star beast visual state protocol", protocolSource, marker));

  assertIncludes(
    "star beast visual schema gate command is registered",
    packageJson.scripts?.["check:star-beast-visual-state-schema"] ?? "",
    "node scripts/check-star-beast-visual-state-schema.mjs",
  );
  assertIncludes(
    "star beast visual schema gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-visual-state-schema",
  );

  await build({
    entryPoints: [mappingPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { mapStarBeastLifeStateToVisualState } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const identityReference = Object.freeze({ referenceType: "STAR_BEAST_IDENTITY", referenceId: "star-beast-identity:self" });
  const archetypeReference = Object.freeze({ referenceType: "LIFE_ARCHETYPE", referenceId: "life-archetype:origin" });
  const crystalReference = Object.freeze({ referenceType: "CRYSTAL", referenceId: "crystal:life-imprint" });
  const memoryReference = Object.freeze({ referenceType: "STAR_BEAST_MEMORY", referenceId: "future-memory:reserved" });
  const expectedByStage = Object.freeze({
    ORIGIN: Object.freeze({ manifestationDepth: "FOUNDATIONAL", energyFlowState: "RESTING", lightState: "SEED_LIGHT", starPatternState: "BASE_PATTERN", presenceState: "QUIETLY_PRESENT", direction: "INWARD", rhythm: "SLOW" }),
    PRESSURE: Object.freeze({ manifestationDepth: "CONSTRAINED", energyFlowState: "RESTRICTED", lightState: "OCCLUDED", starPatternState: "COMPRESSED_PATTERN", presenceState: "WITHDRAWN_UNDER_PRESSURE", direction: "CONTAINED", rhythm: "HELD" }),
    AWARENESS: Object.freeze({ manifestationDepth: "EMERGING", energyFlowState: "RECOVERING", lightState: "RETURNING", starPatternState: "RECONNECTING_PATTERN", presenceState: "RETURNING_TO_PRESENCE", direction: "OUTWARD", rhythm: "RECOVERING" }),
    CRYSTAL: Object.freeze({ manifestationDepth: "IMPRINTED", energyFlowState: "INTEGRATED", lightState: "CRYSTALLIZED", starPatternState: "LIFE_TEXTURE_ADDED", presenceState: "INTEGRATED_PRESENCE", direction: "RADIAL", rhythm: "RESONANT" }),
  });

  for (const [journeyState, expected] of Object.entries(expectedByStage)) {
    const lifeStateReference = Object.freeze({ referenceType: "STAR_BEAST_LIFE_STATE", referenceId: `life-state:${journeyState.toLowerCase()}`, identityReference, archetypeReference, journeyState });
    const input = Object.freeze({ lifeStateReference, memoryReference: null, crystalReference: journeyState === "CRYSTAL" ? crystalReference : null });
    const snapshot = JSON.stringify(input);
    const visualState = mapStarBeastLifeStateToVisualState(input);
    assertEqual(`${journeyState} manifestation depth`, visualState.manifestationDepth, expected.manifestationDepth);
    assertEqual(`${journeyState} energy flow`, visualState.energyFlowState, expected.energyFlowState);
    assertEqual(`${journeyState} light state`, visualState.lightState, expected.lightState);
    assertEqual(`${journeyState} star pattern`, visualState.starPatternState, expected.starPatternState);
    assertEqual(`${journeyState} presence`, visualState.presenceState, expected.presenceState);
    assertEqual(`${journeyState} light direction`, visualState.expression.lightFlowDirection, expected.direction);
    assertEqual(`${journeyState} breathing rhythm`, visualState.expression.breathingRhythm, expected.rhythm);
    assertEqual(`${journeyState} preserves identity reference`, visualState.identity === identityReference, true);
    assertEqual(`${journeyState} preserves archetype reference`, visualState.archetype === archetypeReference, true);
    assertEqual(`${journeyState} preserves life state reference`, visualState.sourceReferences.lifeStateReference === lifeStateReference, true);
    assertEqual(`${journeyState} expression is parameter-only`, visualState.expression.expressionParametersOnly, true);
    assertEqual(`${journeyState} expression is not life fact`, visualState.expression.notLifeFacts, true);
    assertEqual(`${journeyState} visual state is frozen`, Object.isFrozen(visualState), true);
    assertEqual(`${journeyState} references are frozen`, Object.isFrozen(visualState.sourceReferences), true);
    assertEqual(`${journeyState} expression is frozen`, Object.isFrozen(visualState.expression), true);
    assertEqual(`${journeyState} does not mutate input`, JSON.stringify(input), snapshot);
  }

  const awarenessLifeState = Object.freeze({ referenceType: "STAR_BEAST_LIFE_STATE", referenceId: "life-state:awareness", identityReference, archetypeReference, journeyState: "AWARENESS" });
  const awarenessWithoutMemory = mapStarBeastLifeStateToVisualState(Object.freeze({ lifeStateReference: awarenessLifeState, memoryReference: null, crystalReference: null }));
  const awarenessWithMemory = mapStarBeastLifeStateToVisualState(Object.freeze({ lifeStateReference: awarenessLifeState, memoryReference, crystalReference: null }));
  assertEqual("memory reference is preserved", awarenessWithMemory.sourceReferences.memoryReference === memoryReference, true);
  assertEqual("memory does not change manifestation", awarenessWithMemory.manifestationDepth, awarenessWithoutMemory.manifestationDepth);
  assertEqual("memory does not change energy", awarenessWithMemory.energyFlowState, awarenessWithoutMemory.energyFlowState);
  assertEqual("memory does not change expression", awarenessWithMemory.expression === awarenessWithoutMemory.expression, true);

  const crystalLifeState = Object.freeze({ referenceType: "STAR_BEAST_LIFE_STATE", referenceId: "life-state:crystal", identityReference, archetypeReference, journeyState: "CRYSTAL" });
  const crystalPending = mapStarBeastLifeStateToVisualState(Object.freeze({ lifeStateReference: crystalLifeState, memoryReference: null, crystalReference: null }));
  const crystalPresent = mapStarBeastLifeStateToVisualState(Object.freeze({ lifeStateReference: crystalLifeState, memoryReference: null, crystalReference }));
  assertEqual("crystal phase without reference is pending", crystalPending.crystalPresenceState, "REFERENCE_PENDING");
  assertEqual("crystal reference becomes present", crystalPresent.crystalPresenceState, "PRESENT");
  assertEqual("crystal reference is preserved", crystalPresent.sourceReferences.crystalReference === crystalReference, true);
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[STAR BEAST VISUAL STATE SCHEMA] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST VISUAL STATE SCHEMA] PASS");
