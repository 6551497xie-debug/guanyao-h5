import { build } from "esbuild";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[life-companion-formal-recovery] ${message}`);
  }
};

const page = read("src/pages/GenesisProductionExperiencePage.tsx");
const resolver = read(
  "src/services/xinmaiLifeCompanionRelationshipLifecycleResolver.ts",
);
const policy = read(
  "src/services/xinmaiLifeCompanionRelationshipFormalRecoveryPolicy.ts",
);
const lifecycleSurface = read(
  "src/components/XinmaiLifeCompanionRelationshipLifecycleSurface.tsx",
);
const activationSurface = read(
  "src/components/XinmaiLifeCompanionRelationshipActivationSurface.tsx",
);

for (const marker of [
  "resolveXinmaiLifeCompanionRelationshipLifecycleIdentity",
  "resolveXinmaiLifeCompanionRelationshipLifecycle",
  "relationshipLifecycleRequestRef",
  'relationshipLifecycleResult.status !== "FIRST_ENCOUNTER_REQUIRED"',
  "XinmaiLifeCompanionRelationshipLifecycleSurface",
]) {
  assert(page.includes(marker), `formal Genesis consumer missing ${marker}`);
}
assert(
  page.indexOf(
    'relationshipLifecycleResult.status !== "FIRST_ENCOUNTER_REQUIRED"',
  ) < page.indexOf("relationshipActivationPrerequisitesReady &&"),
  "canonical lifecycle does not select the surface before First Encounter activation",
);
assert(
  resolver.includes("recoverXinmaiLifeCompanionCanonicalRelationship"),
  "unique lifecycle resolver does not consume canonical recovery",
);
assert(
  !resolver.includes("xinmaiLifeCompanionRelationshipCanonicalStore"),
  "lifecycle resolver bypasses the canonical recovery adapter",
);
assert(
  !resolver.includes("GenesisStarBeastPresenceVisualRealization"),
  "returning recovery still depends on visual realization",
);
assert(
  policy.includes('"ENABLED" as "ENABLED" | "SAFE_WITHHELD"'),
  "formal recovery Candidate policy is not enabled",
);
for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "requestRealityEncounter",
  "createStarBeastRelationshipNamingAsset",
]) {
  assert(!resolver.includes(forbidden), `resolver contains forbidden ${forbidden}`);
  assert(!lifecycleSurface.includes(forbidden), `surface contains forbidden ${forbidden}`);
}
assert(
  lifecycleSurface.includes("不需要重新寻找或再次确认"),
  "returning terminal fact is not explicit",
);
assert(
  lifecycleSurface.includes("读取完成前不会让你重新确认"),
  "retryable recovery can masquerade as a missing relationship",
);
assert(
  activationSurface.includes("executeXinmaiLifeCompanionRelationshipCommand"),
  "existing activation presenter no longer delegates mutation to Authority",
);

const temp = mkdtempSync(resolve(tmpdir(), "xinmai-relationship-lifecycle-"));
const runtimePath = resolve(temp, "runtime.mjs");
await build({
  stdin: {
    contents: `
      export {
        resolveXinmaiLifeCompanionRelationshipLifecycleIdentity,
        mapXinmaiLifeCompanionRecoveryToLifecycle,
      } from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionRelationshipLifecycleResolver.ts"))};
    `,
    resolveDir: process.cwd(),
    sourcefile: "life-companion-formal-recovery-gate.ts",
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

const sourceReferenceId = "genesis-source:formal-recovery";
const consumerSourceResult = {
  status: "READY",
  consumerSource: {
    sourceReferenceId,
    projectionBundle: {
      personalRevealProjection: {
        identityReferenceId: "star-beast:formal-recovery",
      },
      twentyEightMansionCoordinateProjection: {
        birthMansion: {
          coordinateReferenceId: "mansion:formal-recovery",
        },
      },
    },
  },
};
const identity =
  runtime.resolveXinmaiLifeCompanionRelationshipLifecycleIdentity({
    sourceReferenceId,
    consumerSourceResult,
  });
assert(identity.status === "READY", "formal identity references were not resolved");
const mismatch =
  runtime.resolveXinmaiLifeCompanionRelationshipLifecycleIdentity({
    sourceReferenceId: "genesis-source:stale",
    consumerSourceResult,
  });
assert(
  mismatch.status === "BLOCKED" &&
    mismatch.reason === "IDENTITY_REFERENCE_MISMATCH",
  "stale source did not fail closed",
);

const relationship = Object.freeze({ relationshipId: "relationship:one" });
const returning = runtime.mapXinmaiLifeCompanionRecoveryToLifecycle({
  identityReferences: identity.identityReferences,
  recovery: { status: "READY", relationship },
  policyState: "ENABLED",
});
assert(
  returning.status === "RETURNING_COMPANIONSHIP_CONFIRMED" &&
    returning.relationship === relationship,
  "canonical relationship did not select the returning terminal state",
);
const missing = runtime.mapXinmaiLifeCompanionRecoveryToLifecycle({
  identityReferences: identity.identityReferences,
  recovery: {
    status: "NOT_ESTABLISHED",
    reason: "RELATIONSHIP_NOT_FOUND",
    relationship: null,
  },
  policyState: "ENABLED",
});
assert(
  missing.status === "FIRST_ENCOUNTER_REQUIRED",
  "only a genuinely missing relationship may select First Encounter",
);
for (const reason of [
  "STORAGE_UNAVAILABLE",
  "STORAGE_BLOCKED",
  "STORAGE_FAILED",
  "TRANSACTION_ABORTED",
]) {
  const blocked = runtime.mapXinmaiLifeCompanionRecoveryToLifecycle({
    identityReferences: identity.identityReferences,
    recovery: { status: "BLOCKED", reason, relationship: null },
    policyState: "ENABLED",
  });
  assert(
    blocked.status === "RETRYABLE_RECOVERY_BLOCKED" &&
      blocked.retryability === "RETRYABLE",
    `${reason} did not preserve retryability`,
  );
}
const corrupt = runtime.mapXinmaiLifeCompanionRecoveryToLifecycle({
  identityReferences: identity.identityReferences,
  recovery: {
    status: "BLOCKED",
    reason: "RELATIONSHIP_CORRUPTED",
    relationship: null,
  },
  policyState: "ENABLED",
});
assert(
  corrupt.status === "PROTECTIVE_STOP",
  "corrupt evidence did not fail closed",
);
const identityMismatch = runtime.mapXinmaiLifeCompanionRecoveryToLifecycle({
  identityReferences: identity.identityReferences,
  recovery: {
    status: "BLOCKED",
    reason: "IDENTITY_REFERENCE_MISMATCH",
    relationship: null,
  },
  policyState: "ENABLED",
});
assert(
  identityMismatch.status === "PROTECTIVE_STOP" &&
    identityMismatch.reason === "IDENTITY_REFERENCE_MISMATCH",
  "canonical identity mismatch did not preserve its protective cause",
);
const withheld = runtime.mapXinmaiLifeCompanionRecoveryToLifecycle({
  identityReferences: identity.identityReferences,
  recovery: { status: "READY", relationship },
  policyState: "SAFE_WITHHELD",
});
assert(
  withheld.status === "SAFE_WITHHELD" &&
    withheld.relationship === relationship,
  "Counter does not retain the canonical relationship read",
);

console.log(
  "[XINMAI LIFE COMPANION RELATIONSHIP FORMAL RECOVERY LIFECYCLE] PASS",
);
