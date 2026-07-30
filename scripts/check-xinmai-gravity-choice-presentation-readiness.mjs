import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-choice-presentation-readiness-"),
);

for (const sourcePath of [
  "src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts",
  "src/services/xinmaiChoicePresentationReadinessResolver.ts",
]) {
  const source = fs.readFileSync(path.join(rootDir, sourcePath), "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const outputPath = path.join(
    tempRoot,
    sourcePath.replace(/\.ts$/, ".js"),
  );
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, transpiled.outputText);
}

const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
const {
  resolveChoicePresentationReadiness,
} = requireFromTemp(
  "./src/services/xinmaiChoicePresentationReadinessResolver.js",
);
const identityReferences = Object.freeze({
  sourceReferenceId: "source:choice-presentation",
  starBeastIdentityReferenceId: "starbeast:choice-presentation",
  mansionCoordinateReferenceId: "mansion:choice-presentation",
});
const request = Object.freeze({
  identityReferences,
  sourceEncounterCycleId: "encounter:choice-presentation",
  gravityCycleId: "gravity:choice-presentation",
  gravityObservationReferenceId: "observation:choice-presentation",
});
const choice = Object.freeze({
  choiceActionIntentionReferenceId: "choice:choice-presentation",
  identityReferences,
  sourceEncounterCycleId: request.sourceEncounterCycleId,
  gravityCycleId: request.gravityCycleId,
  gravityObservationReferenceId:
    request.gravityObservationReferenceId,
  formationSourceSnapshot: Object.freeze({
    action: Object.freeze({
      actionLine: "先停一下，再回应。",
    }),
  }),
});
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
const baseInput = Object.freeze({
  surfaceAttempt: Object.freeze({
    admissionReferenceId: "admission:choice-presentation",
    gravityCycleId: request.gravityCycleId,
    admissionRevision: 1,
    identityReferences,
    selectedPressureSeedId: "seed:choice-presentation",
    sourceEncounterCycleId: request.sourceEncounterCycleId,
    choiceActionIntentionReferenceId: null,
    gravityObservationReferenceId:
      request.gravityObservationReferenceId,
  }),
  observationDecision: Object.freeze({
    status: "OBSERVATION_RECOGNIZED",
    gravityObservationReferenceId:
      request.gravityObservationReferenceId,
    checkpointRevision: 2,
    recognition: "USER_CONFIRMED",
    choiceActionIntention: null,
  }),
  experienceStage: "ACTION",
  formation: Object.freeze({ source: "dynamics" }),
  assetCandidate: Object.freeze({
    completionState: "READY_TO_CRYSTALLIZE",
    completedNodeCount: 6,
  }),
  revisionAction: Object.freeze({
    layerLabel: "行动",
    yaoName: "五爻 · 觉察",
    actionLine: "先停一下，再回应。",
    sourceReason: "熟悉的回应",
    interventionPotential: 0.8,
    userAgency: 0.8,
  }),
  changeExperienceRoute: Object.freeze({
    dimension: "action",
    unit: Object.freeze({}),
    presentation: Object.freeze({}),
  }),
  migrationImpact: Object.freeze({
    sourceUnit: Object.freeze({
      unitId: "gravity-action-awareness",
      dimension: "action",
      yaoStage: "awareness",
    }),
    dimension: "action",
    yaoStage: "awareness",
    fromModel: "立刻回应",
    toResponse: "先停一下",
    deflectionVector: "立刻回应 → 先停一下",
    beastImpact: Object.freeze({ before: "", after: "", cue: "" }),
    crystalImprint: Object.freeze({
      imprintLine: "先停一下",
      shouldFeedCrystal: true,
      shouldDepositToRingLite: false,
    }),
    impactReadiness: "READY_FOR_CRYSTAL",
    guardrails: Object.freeze({}),
  }),
  growthTerminalSummary: baseSummary,
  operationalState: Object.freeze({
    summaryPending: false,
    choiceMutationPending: false,
    recoveryFailure: null,
  }),
});

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name} | ${actual}`);
};

const ready = resolveChoicePresentationReadiness(baseInput);
assertEqual(
  "new choice presentation is safely paused",
  ready.state,
  "SAFE_WITHHELD",
);
assertEqual(
  "paused presentation exposes a safe reason",
  ready.reason,
  "RUNTIME_RECOVERY_FAILURE",
);

const unrecognized = resolveChoicePresentationReadiness({
  ...baseInput,
  experienceStage: "AWARENESS",
  observationDecision: {
    ...baseInput.observationDecision,
    status: "OBSERVATION_AVAILABLE",
    recognition: null,
  },
});
assertEqual(
  "awareness cannot bypass the pause",
  unrecognized.state,
  "SAFE_WITHHELD",
);

const missingRoute = resolveChoicePresentationReadiness({
  ...baseInput,
  changeExperienceRoute: null,
  migrationImpact: null,
  revisionAction: {
    ...baseInput.revisionAction,
    yaoName: "四爻 · 固化",
  },
});
assertEqual(
  "non-awareness entry cannot bypass the pause",
  missingRoute.state,
  "SAFE_WITHHELD",
);
assertEqual(
  "non-awareness entry keeps the safe pause reason",
  missingRoute.reason,
  "RUNTIME_RECOVERY_FAILURE",
);

const committed = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    state: "CHOICE_COMMITTED",
    choiceActionIntention: choice,
  },
});
assertEqual(
  "canonical choice resumes",
  committed.state,
  "RESUME_COMMITTED",
);

const fact = Object.freeze({
  livedResponseReferenceId: "fact:choice-presentation",
});
const factDecision = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    state: "LIVED_RESPONSE_RECORDED",
    choiceActionIntention: choice,
    livedResponseFact: fact,
  },
});
assertEqual(
  "fact terminates choice presentation",
  factDecision.state,
  "TERMINAL_BY_GROWTH",
);
assertEqual(
  "fact terminal target",
  factDecision.terminalTarget,
  "LIVED_RESPONSE_RETURN",
);

const unavailable = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    state: "RECOVERY_UNAVAILABLE",
    canonicalRevision: null,
    reason: "TRANSACTION_STORAGE_UNAVAILABLE",
  },
});
assertEqual(
  "recovery failure is safe withheld",
  unavailable.state,
  "SAFE_WITHHELD",
);

const stale = resolveChoicePresentationReadiness({
  ...baseInput,
  growthTerminalSummary: {
    ...baseSummary,
    request: {
      ...request,
      gravityObservationReferenceId: "observation:stale",
    },
  },
});
assertEqual("stale lineage is safe withheld", stale.state, "SAFE_WITHHELD");

const summaryPending = resolveChoicePresentationReadiness({
  ...baseInput,
  operationalState: {
    ...baseInput.operationalState,
    summaryPending: true,
  },
});
assertEqual(
  "summary pending cannot flash ready",
  summaryPending.state,
  "SAFE_WITHHELD",
);

console.log("[XINMAI GRAVITY CHOICE PRESENTATION READINESS] PASS");
