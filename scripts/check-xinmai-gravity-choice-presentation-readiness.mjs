import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const rootDir = process.cwd();
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-choice-presentation-readiness-"),
);
const outfile = path.join(tempDir, "readiness.mjs");

await build({
  stdin: {
    contents: `
      export { resolveChoicePresentationReadiness } from "./src/services/xinmaiChoicePresentationReadinessResolver.ts";
      export { resolveChoiceActionRoutes } from "./src/services/xinmaiChoiceActionRouteResolver.ts";
      export { XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE } from "./src/services/xinmaiChoiceActionRouteRuntimePolicy.ts";
    `,
    resolveDir: rootDir,
    sourcefile: "xinmai-choice-presentation-readiness-entry.ts",
    loader: "ts",
  },
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "silent",
});

const {
  XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE,
  resolveChoiceActionRoutes,
  resolveChoicePresentationReadiness,
} = await import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name} | ${actual}`);
};

const identityReferences = Object.freeze({
  sourceReferenceId: "source:choice-presentation",
  starBeastIdentityReferenceId: "starbeast:choice-presentation",
  mansionCoordinateReferenceId: "mansion:choice-presentation",
});
const lineage = Object.freeze({
  sourceEncounterCycleId: "encounter:choice-presentation",
  gravityCycleId: "gravity:choice-presentation",
  gravityObservationReferenceId: "observation:choice-presentation",
});
const request = Object.freeze({
  identityReferences,
  ...lineage,
});
const routeInput = Object.freeze({
  identityReferences,
  ...lineage,
  observationCheckpointRevision: 2,
  observationStatus: "OBSERVATION_RECOGNIZED",
  pressure: Object.freeze({
    selectedPressureSeedId: "ESTABLISHING_POWER_01",
    candidateReferenceId: "candidate:choice-presentation",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
  }),
  motherCode: Object.freeze({
    motherCodeProfileId: "mother-qian-creator",
    motherCodeDefinitionId: "1",
    lowerTrigram: "乾",
  }),
});
const actionRouteResolution = resolveChoiceActionRoutes(routeInput);
assertEqual("typed Action Route resolves", actionRouteResolution.status, "READY");

const baseSummary = Object.freeze({
  state: "NONE",
  request,
  canonicalRevision: 3,
  resolvedAt: "2026-07-30T00:00:00.000Z",
  choiceActionIntention: null,
  livedResponseFact: null,
  crystalEligibility: null,
  formationReceipt: null,
  reason: null,
});
const surfaceAttempt = Object.freeze({
  admissionReferenceId: "admission:choice-presentation",
  gravityCycleId: lineage.gravityCycleId,
  admissionRevision: 1,
  identityReferences,
  selectedPressureSeedId: "ESTABLISHING_POWER_01",
  sourceEncounterCycleId: lineage.sourceEncounterCycleId,
  choiceActionIntentionReferenceId: null,
  gravityObservationReferenceId:
    lineage.gravityObservationReferenceId,
});
const observationDecision = Object.freeze({
  status: "OBSERVATION_RECOGNIZED",
  gravityObservationReferenceId:
    lineage.gravityObservationReferenceId,
  checkpointRevision: 2,
  recognition: "USER_CONFIRMED",
  choiceActionIntention: null,
});
const baseInput = Object.freeze({
  surfaceAttempt,
  observationDecision,
  experienceStage: "ACTION",
  formation: Object.freeze({ source: "dynamics" }),
  assetCandidate: Object.freeze({
    completionState: "READY_TO_CRYSTALLIZE",
    completedNodeCount: 6,
  }),
  actionRouteResolution,
  growthTerminalSummary: baseSummary,
  operationalState: Object.freeze({
    summaryPending: false,
    choiceMutationPending: false,
    recoveryFailure: null,
  }),
});

const ready = resolveChoicePresentationReadiness(baseInput);
if (XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE === "ENABLED") {
  assertEqual(
    "typed facts produce one ready state",
    ready.state,
    "READY_TO_PRESENT",
  );
  assertEqual(
    "ready candidate is the deterministic primary Route",
    ready.actionRouteCandidate.actionRouteReferenceId,
    actionRouteResolution.candidates[0].actionRouteReferenceId,
  );
  assertEqual(
    "ready structure passes shared validator",
    ready.structuralInput.selectedActionRouteReferenceId,
    ready.actionRouteCandidate.actionRouteReferenceId,
  );
} else {
  assertEqual(
    "forward pause withholds new Choice",
    ready.state,
    "SAFE_WITHHELD",
  );
  assertEqual(
    "forward pause has explicit reason",
    ready.reason,
    "ACTION_ROUTE_RUNTIME_PAUSED",
  );
}

const awareness = resolveChoicePresentationReadiness({
  ...baseInput,
  experienceStage: "AWARENESS",
});
assertEqual(
  "stage name follows the current runtime policy",
  awareness.state,
  XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE === "ENABLED"
    ? "READY_TO_PRESENT"
    : "SAFE_WITHHELD",
);

const unrecognized = resolveChoicePresentationReadiness({
  ...baseInput,
  observationDecision: {
    ...observationDecision,
    status: "OBSERVATION_AVAILABLE",
    recognition: null,
  },
});
assertEqual(
  "unrecognized Observation withholds Choice",
  unrecognized.state,
  XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE === "ENABLED"
    ? "WITHHELD"
    : "SAFE_WITHHELD",
);

const survivalResolution = resolveChoiceActionRoutes({
  ...routeInput,
  pressure: {
    ...routeInput.pressure,
    pressureNature: "SURVIVAL",
  },
});
const survival = resolveChoicePresentationReadiness({
  ...baseInput,
  actionRouteResolution: survivalResolution,
});
assertEqual("Survival cannot present Choice", survival.state, "SAFE_WITHHELD");

const choice = Object.freeze({
  schemaVersion: "XINMAI_CHOICE_ACTION_INTENTION_V2",
  choiceActionIntentionReferenceId: "choice:choice-presentation",
  identityReferences,
  ...lineage,
  formationSourceSnapshot: Object.freeze({
    actionRouteReferenceId:
      actionRouteResolution.candidates[0].actionRouteReferenceId,
  }),
  actionRouteSnapshot: Object.freeze({
    ...actionRouteResolution.candidates[0],
    lifecycle: "CONSUMED_BY_CHOICE",
    userExplicitSelection: true,
  }),
});
const committed = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    state: "CHOICE_COMMITTED",
    choiceActionIntention: choice,
  },
});
assertEqual("existing Choice resumes", committed.state, "RESUME_COMMITTED");

const factDecision = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    state: "LIVED_RESPONSE_RECORDED",
    choiceActionIntention: choice,
    livedResponseFact: {
      livedResponseReferenceId: "fact:choice-presentation",
    },
  },
});
assertEqual(
  "higher Growth owns presentation",
  factDecision.state,
  "TERMINAL_BY_GROWTH",
);

const unavailable = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    state: "RECOVERY_UNAVAILABLE",
    reason: "IDB_UNAVAILABLE",
  },
});
assertEqual(
  "unavailable recovery is never NONE",
  unavailable.state,
  "SAFE_WITHHELD",
);

const stale = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    request: {
      ...request,
      identityReferences: {
        ...identityReferences,
        sourceReferenceId: "source:stale",
      },
    },
  },
});
assertEqual("stale identity is safe-withheld", stale.state, "SAFE_WITHHELD");

const pending = resolveChoicePresentationReadiness({
  ...baseInput,
  operationalState: {
    ...baseInput.operationalState,
    summaryPending: true,
  },
});
assertEqual("summary loading is safe-withheld", pending.state, "SAFE_WITHHELD");

const source = fs.readFileSync(
  path.join(
    rootDir,
    "src/services/xinmaiChoicePresentationReadinessResolver.ts",
  ),
  "utf8",
);
for (const forbidden of [
  "prefers-reduced-motion",
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "XINMAI_NEW_CHOICE_PRESENTATION_MUTATIONS_PAUSED",
]) {
  if (source.includes(forbidden)) {
    throw new Error(`resolver forbidden=${forbidden}`);
  }
}

console.log("\n[XINMAI GRAVITY CHOICE PRESENTATION READINESS] PASS");
