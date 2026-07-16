import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastGenesisExperiencePresentationReadiness.ts",
  service: "src/services/starBeastGenesisExperiencePresentationReadiness.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIENCE_PRESENTATION_READINESS_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  preview: "src/pages/StarBeastGenesisPreview.tsx",
  lab: "src/pages/StarbeastLab.tsx",
  launch: "src/pages/LaunchLab.tsx",
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
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const launchSource = fs.readFileSync(absolute.launch, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(absolute.packageManifest, "utf8"));

  [
    "export type StarBeastGenesisExperiencePresentationReadinessInput",
    "genesisRevealResultReference: StarBeastGenesisRevealResult | null",
    "genesisExperienceStateReference: StarBeastGenesisExperienceState | null",
    'scope: "ISOLATED_GENESIS_PREVIEW_ONLY"',
    "humanReviewRequired: true",
    "noAutomaticProductAcceptance: true",
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    'readiness: "READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW"',
    "readinessOnly: true",
    "noPresentationCreation: true",
    "noUIIntegration: true",
    "noLaunchIntegration: true",
    "noRendererInvocation: true",
    "noCanvasConnection: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("presentation readiness type", typeSource, marker));

  [
    "export function resolveStarBeastGenesisExperiencePresentationReadiness",
    'reveal.status === "UNAVAILABLE"',
    'reveal.status === "BLOCKED"',
    '"GENESIS_EXPERIENCE_STATE_REFERENCE_MISMATCH"',
    '"GENESIS_REVEAL_BOUNDARY_INVALID"',
    '"PREVIEW_SCOPE_REFERENCE_INVALID"',
    '"MANUAL_ACCEPTANCE_REFERENCE_INVALID"',
    '"READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW"',
  ].forEach((marker) => assertIncludes("presentation readiness service", serviceSource, marker));

  [
    "resolveStarBeastGenesisExperience(",
    "resolveStarbeastFromBirthDate(",
    "resolveStarBeastAssetDefinition(",
    "requestAnimationFrame",
    "getContext(",
    "CanvasRenderingContext",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("readiness stays judgment-only", serviceSource, marker));

  ["StarBeastGenesisExperiencePresentationReadiness", "resolveStarBeastGenesisExperiencePresentationReadiness"].forEach((marker) => {
    assertExcludes("StarbeastLab remains disconnected", labSource, marker);
    assertExcludes("LaunchLab remains disconnected", launchSource, marker);
  });

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveStarBeastGenesisExperiencePresentationReadiness(")) callSites.push(path.relative(rootDir, entryPath));
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "readiness consumer stays isolated preview only",
    callSites.join(","),
    [files.preview, files.service].join(","),
  );

  [
    "RC-STAR-BEAST-GENESIS-EXPERIENCE-PRESENTATION-READINESS-P87",
    "Readiness 不是 Presentation",
    "P87 READY 不会创建页面",
    "ISOLATED_GENESIS_PREVIEW_ONLY",
    "人工验收",
    "禁止自动转为产品验收",
    "READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW",
    "不反向调用 P86",
    "P88 才允许",
  ].forEach((marker) => assertIncludes("presentation readiness protocol", protocolSource, marker));

  assertIncludes("type index exports readiness input", typeIndexSource, "StarBeastGenesisExperiencePresentationReadinessInput");
  assertIncludes("type index exports readiness result", typeIndexSource, "StarBeastGenesisExperiencePresentationReadinessResult");
  assertIncludes(
    "presentation readiness gate registered",
    packageJson.scripts?.["check:star-beast-genesis-experience-presentation-readiness"] ?? "",
    "node scripts/check-star-beast-genesis-experience-presentation-readiness.mjs",
  );
  assertIncludes(
    "presentation readiness participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-genesis-experience-presentation-readiness",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-presentation-readiness-${process.pid}.mjs`);
  await build({ entryPoints: [absolute.service], outfile: modulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastGenesisExperiencePresentationReadiness } = await import(`file://${modulePath}?t=${Date.now()}`);

  const state = Object.freeze({
    semanticRole: "STAR_BEAST_GENESIS_EXPERIENCE_STATE",
    currentStage: "STAR_BEAST_REVEAL",
    originCoordinateReference: Object.freeze({ referenceType: "ORIGIN" }),
    mansionReference: Object.freeze({ referenceType: "MANSION" }),
    fourSymbolReference: Object.freeze({ referenceType: "FOUR_SYMBOL" }),
    lifeArchetypeReference: Object.freeze({ referenceType: "LIFE_ARCHETYPE" }),
    starBeastAssetReference: Object.freeze({ referenceType: "ASSET" }),
    presentationSequenceOnly: true,
    notCausalDerivationSequence: true,
  });
  const revealBoundary = Object.freeze({
    experienceSchemaOnly: true,
    referenceOnly: true,
    noFourSymbolToLifeArchetypeInference: true,
    noBirthLocationToStarBeastDerivation: true,
    noStarBeastGeneration: true,
    noAssetMutation: true,
    noLifeStateMutation: true,
    noRendererInvocation: true,
    noCanvasConnection: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
  const readyReveal = Object.freeze({
    status: "READY",
    revealStatus: "READY_FOR_FUTURE_GENESIS_EXPERIENCE_PRESENTATION",
    source: "star_beast_genesis_experience_mapping",
    input: Object.freeze({}),
    experienceState: state,
    boundary: revealBoundary,
  });
  const previewScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_PREVIEW_SCOPE",
    referenceId: "test:isolated-preview",
    scope: "ISOLATED_GENESIS_PREVIEW_ONLY",
  });
  const manualAcceptanceReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_MANUAL_ACCEPTANCE",
    referenceId: "test:manual-acceptance",
    humanReviewRequired: true,
    noAutomaticProductAcceptance: true,
  });
  const readyInput = Object.freeze({
    genesisRevealResultReference: readyReveal,
    genesisExperienceStateReference: state,
    previewScopeReference,
    manualAcceptanceReference,
  });
  const before = JSON.stringify(readyInput);
  const ready = resolveStarBeastGenesisExperiencePresentationReadiness(readyInput);

  assertEqual("valid P86 reveal is ready", ready.status, "READY");
  assertEqual("ready only opens isolated preview", ready.readiness, "READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW");
  assertEqual("ready preserves reveal", ready.genesisRevealResultReference === readyReveal, true);
  assertEqual("ready preserves state", ready.genesisExperienceStateReference === state, true);
  assertEqual("ready requires manual acceptance", ready.manualAcceptanceReference === manualAcceptanceReference, true);
  assertEqual("readiness creates no presentation", ready.boundary.noPresentationCreation, true);
  assertEqual("readiness mutates no input", JSON.stringify(readyInput) === before, true);

  const unavailableReveal = Object.freeze({ status: "UNAVAILABLE", reason: "MANSION_REFERENCE_REQUIRED" });
  const unavailable = resolveStarBeastGenesisExperiencePresentationReadiness(Object.freeze({ ...readyInput, genesisRevealResultReference: unavailableReveal }));
  assertEqual("P86 unavailable stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P86 unavailable reason preserved", unavailable.sourceUnavailableReason, unavailableReveal.reason);

  const blockedReveal = Object.freeze({ status: "BLOCKED", reason: "FOUR_SYMBOL_SOURCE_REFERENCE_MISMATCH" });
  const blocked = resolveStarBeastGenesisExperiencePresentationReadiness(Object.freeze({ ...readyInput, genesisRevealResultReference: blockedReveal }));
  assertEqual("P86 blocked stays blocked", blocked.status, "BLOCKED");
  assertEqual("P86 blocked reason preserved", blocked.sourceBlockedReason, blockedReveal.reason);

  const driftedState = resolveStarBeastGenesisExperiencePresentationReadiness(Object.freeze({ ...readyInput, genesisExperienceStateReference: Object.freeze({ ...state }) }));
  assertEqual("state reference drift is blocked", driftedState.status, "BLOCKED");

  const invalidScope = resolveStarBeastGenesisExperiencePresentationReadiness(Object.freeze({ ...readyInput, previewScopeReference: Object.freeze({ ...previewScopeReference, scope: "PRODUCT_FLOW" }) }));
  assertEqual("product scope is blocked", invalidScope.status, "BLOCKED");

  const automaticAcceptance = resolveStarBeastGenesisExperiencePresentationReadiness(Object.freeze({ ...readyInput, manualAcceptanceReference: Object.freeze({ ...manualAcceptanceReference, noAutomaticProductAcceptance: false }) }));
  assertEqual("automatic acceptance is blocked", automaticAcceptance.status, "BLOCKED");

  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast genesis experience presentation readiness | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast genesis experience presentation readiness gate");
