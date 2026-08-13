import { build } from "esbuild";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[life-companion-atomic-activation] ${message}`);
};

const page = read("src/pages/GenesisProductionExperiencePage.tsx");
const surface = read("src/components/XinmaiLifeCompanionRelationshipActivationSurface.tsx");
const lifecycleResolver = read("src/services/xinmaiLifeCompanionRelationshipLifecycleResolver.ts");
const controller = read("src/services/xinmaiLifeCompanionRelationshipAuthorityController.ts");
const policy = read("src/services/xinmaiLifeCompanionCanonicalMutationPolicy.ts");
const store = read("src/services/xinmaiLifeCompanionRelationshipCanonicalStore.ts");
const types = read("src/types/xinmaiLifeCompanionRelationshipCanonical.ts");

for (const marker of [
  "XinmaiLifeCompanionRelationshipActivationSurface",
  "resolveXinmaiLifeCompanionRecognizedIdentity",
  "resolveXinmaiLifeCompanionFirstEncounterVisualOutcome",
  'data-life-whisper-entry="DEFERRED"',
  'data-relationship-naming-entry="DEFERRED"',
  'data-reality-entry="DEFERRED"',
]) assert(page.includes(marker), `formal consumer missing ${marker}`);

for (const forbidden of [
  "commitXinmaiLifeCompanionFirstEncounter",
  "requestRealityEncounter",
  "createStarBeastRelationshipNamingAsset",
  "persistRecognizedGenesisLifeAssets",
  "确认同行，进入现实",
  "enterReality",
]) assert(!page.includes(forbidden), `legacy/reality consumer remains reachable: ${forbidden}`);

assert(surface.includes(">确认同行<") || surface.includes(': "确认同行"'), "explicit companionship action is missing");
assert(surface.includes("recoverXinmaiLifeCompanionCanonicalRelationship"), "first-confirmation defensive recovery is missing");
assert(lifecycleResolver.includes("recoverXinmaiLifeCompanionCanonicalRelationship"), "formal lifecycle recovery is missing");
assert(page.includes('relationshipLifecycleResult.status !== "FIRST_ENCOUNTER_REQUIRED"'), "formal recovery does not precede First Encounter presentation");
assert(controller.includes("commitXinmaiLifeCompanionCanonicalRelationship"), "controller does not own the canonical write");
assert(policy.includes('"ENABLED" as "ENABLED" | "SAFE_WITHHELD"'), "Candidate mutation is not enabled");
assert(policy.includes("createsRealityIntent: false"), "relationship mutation can create Reality");
assert(policy.includes("writesLifeWhisper: false"), "relationship mutation can write Life Whisper");
assert(policy.includes("writesNaming: false"), "relationship mutation can write Naming");
assert((types.match(/"life-companion-[a-z-]+" as const/g) ?? []).length === 2, "DB topology changed");
for (const forbidden of ["localStorage", "sessionStorage", "deleteObjectStore", "deleteIndex"]) {
  assert(!controller.includes(forbidden), `controller contains ${forbidden}`);
  assert(!store.includes(forbidden), `store contains ${forbidden}`);
}

const temp = mkdtempSync(resolve(tmpdir(), "xinmai-life-companion-activation-"));
const runtimePath = resolve(temp, "runtime.mjs");
await build({
  stdin: {
    contents: `
      export * from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionRecognizedIdentityAdapter.ts"))};
      export * from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionFirstEncounterVisualOutcomeAdapter.ts"))};
    `,
    resolveDir: process.cwd(),
    sourcefile: "life-companion-activation-gate.ts",
    loader: "ts",
  },
  outfile: runtimePath,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "silent",
});
const runtime = await import(`file://${runtimePath}?t=${Date.now()}`);
const sourceReferenceId = "genesis-source:one";
const consumerSourceResult = {
  status: "READY",
  consumerSource: {
    sourceReferenceId,
    projectionBundle: {
      personalRevealProjection: { identityReferenceId: "star-beast:one" },
      twentyEightMansionCoordinateProjection: {
        birthMansion: { coordinateReferenceId: "mansion:one" },
      },
    },
  },
};
const identity = runtime.resolveXinmaiLifeCompanionRecognizedIdentity({
  sourceReferenceId,
  consumerSourceResult,
  presenceVisualRealization: { sourceReferenceId },
});
assert(identity.status === "READY", "recognized identity did not bind exact source refs");
const mismatch = runtime.resolveXinmaiLifeCompanionRecognizedIdentity({
  sourceReferenceId: "genesis-source:other",
  consumerSourceResult,
  presenceVisualRealization: { sourceReferenceId },
});
assert(mismatch.status === "BLOCKED" && mismatch.reason === "IDENTITY_REFERENCE_MISMATCH", "identity mismatch did not fail closed");
const continuity = {
  status: "READY",
  activation: {
    bridgeReferenceId: "bridge:one",
    manifestationSourceReferenceId: "manifestation:one",
  },
};
const motion = runtime.resolveXinmaiLifeCompanionFirstEncounterVisualOutcome({
  recognitionContinuity: continuity,
  presentationMode: "MOTION",
});
const reduced = runtime.resolveXinmaiLifeCompanionFirstEncounterVisualOutcome({
  recognitionContinuity: continuity,
  presentationMode: "REDUCED_MOTION",
});
assert(motion.status === "READY" && motion.visualOutcome === "MOTION_RESPONSE", "motion outcome is not typed");
assert(reduced.status === "READY" && reduced.visualOutcome === "STATIC_RESPONSE", "reduced-motion outcome is not fact-equivalent");
assert(motion.responseCycleReferenceId === reduced.responseCycleReferenceId, "presentation mode changed encounter identity");

console.log("[XINMAI LIFE COMPANION RELATIONSHIP ATOMIC ACTIVATION] PASS");
