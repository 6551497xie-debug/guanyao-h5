import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const out = path.join(os.tmpdir(), `xinmai-lived-growth-${process.pid}.mjs`);
const entry = `
export * from ${JSON.stringify(path.join(root, "src/services/xinmaiChoiceActionIntentionController.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/xinmaiLivedResponseAuthorityController.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/xinmaiCrystalEligibilityAuthority.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/xinmaiCrystalFormationConsumer.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/guanyaoCurrentHexagramFormationAdapter.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/guanyaoDynamicsMigrationImpactAdapter.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/changeExperienceRuntimeRoutingService.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts"))};
`;

const storage = new Map();
let rejectGrowthWrites = false;
let rejectRingWrites = false;
let lockChain = Promise.resolve();
const serialLocks = {
  request: (_name, _options, callback) => {
    const run = lockChain.then(callback);
    lockChain = run.catch(() => undefined);
    return run;
  },
};
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      if (
        (rejectGrowthWrites && key === "xinmai:lived-growth-authority:v1") ||
        (rejectRingWrites && key === "guanyao:personalityRingLite")
      ) {
        throw new Error("simulated persistence failure");
      }
      storage.set(key, String(value));
    },
  },
};
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: { locks: serialLocks },
});

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  await build({
    stdin: { contents: entry, resolveDir: root, sourcefile: "growth-gate.ts" },
    outfile: out,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const api = await import(`file://${out}?t=${Date.now()}`);
  const readyInput = {
    status: "READY",
    readiness: "READY_FOR_CURRENT_HEXAGRAM",
    hasPressureContext: true,
    selectedPressureSeedContext: {
      selectedPressureSeedId: "seed",
      pressureField: "POWER",
      pressureNature: "EVALUATION",
      surface: "现实靠近",
      shell: "担心失败",
      scenarioDomain: "BOSS",
      pressureIntensity: 80,
      primaryRelation: "BOSS",
    },
    motherCodeProfile: {
      motherCodeId: "mother-dui",
      motherCodeName: "兑｜连接者",
      lowerTrigram: "兑",
      baseForce: "连接",
      defaultReactionPattern: "先回应",
      pressureSensitiveZones: ["评价"],
      defenseTendency: "维持连接",
      behaviorBias: "快速回应",
    },
    motherTrigram: "兑",
  };
  const formation = api.resolveCurrentHexagramFormation(readyInput);
  const action =
    api.resolveChangeExperienceRuntimeSmokeRevisionAction("action-five");
  const route = api.resolveChangeExperienceRuntimeRoute(
    action,
    "action-five",
  );
  const impact = api.resolveDynamicsMigrationImpact({
    action,
    changeExperienceRoute: route,
  });

  const createScenario = (suffix) => {
    const identityReferences = {
      sourceReferenceId: `source:${suffix}`,
      starBeastIdentityReferenceId: `beast:${suffix}`,
      mansionCoordinateReferenceId: `mansion:${suffix}`,
    };
    const committed = api.commitChoiceActionIntention({
      identityReferences,
      sourceEncounterCycleId: `encounter:source:${suffix}`,
      gravityCycleId: `gravity:${suffix}`,
      gravityObservationReferenceId: `gravity-observation:${suffix}`,
      actionSummary: action.actionLine,
      formationSourceSnapshot: {
        formation,
        migrationImpact: impact,
        completedNodeCount: 6,
        primaryDimension: "action",
        action,
        assetCompletionState: "READY_TO_CRYSTALLIZE",
      },
    });
    assert(committed.status === "COMMITTED", `${suffix}: intention not committed`);
    const intention = api.bindChoiceActionIntentionToRealityEncounter({
      choiceActionIntentionReferenceId:
        committed.intention.choiceActionIntentionReferenceId,
      targetEncounterCycleId: `encounter:target:${suffix}`,
      identityReferences,
    });
    assert(intention?.state === "AWAITING_RETURN", `${suffix}: intention not bound`);
    return { identityReferences, intention };
  };

  const confirmScenario = (scenario, outcome, state = "AWAITING_USER_CONFIRMATION") =>
    api.confirmLivedResponseFact({
      candidate: {
        source: "xinmai_lived_response_return_surface",
        candidateReferenceId: `candidate:${scenario.intention.choiceActionIntentionReferenceId}`,
        choiceActionIntentionReferenceId:
          scenario.intention.choiceActionIntentionReferenceId,
        candidateRevision: 1,
        responseOutcome: outcome,
        factualSummary: "我回来确认了实际发生的事实",
        state,
        createdAt: new Date().toISOString(),
      },
      intentionReferenceId:
        scenario.intention.choiceActionIntentionReferenceId,
    });

  const primary = createScenario("primary");
  const fact = confirmScenario(primary, "ATTEMPTED");
  assert(fact.status === "CONFIRMED", "primary: fact not confirmed");
  const eligibility = api.resolveCrystalEligibilityForFact(fact.fact);
  assert(eligibility.status === "ELIGIBLE", "primary: eligibility missing");
  const [formed, concurrentReplay] = await Promise.all([
    api.formCrystalFromEligibility({
      crystalEligibilityReferenceId:
        eligibility.eligibility.crystalEligibilityReferenceId,
      expectedEligibilityRevision:
        eligibility.eligibility.eligibilityRevision,
      identityReferences: primary.identityReferences,
    }),
    api.formCrystalFromEligibility({
      crystalEligibilityReferenceId:
        eligibility.eligibility.crystalEligibilityReferenceId,
      expectedEligibilityRevision:
        eligibility.eligibility.eligibilityRevision,
      identityReferences: primary.identityReferences,
    }),
  ]);
  assert(
    formed.status === "FORMED" &&
      concurrentReplay.status === "ALREADY_FORMED",
    "multi-tab serialized consumer did not produce one formation",
  );
  assert(
    concurrentReplay.receipt.crystalReferenceId ===
      formed.receipt.crystalReferenceId,
    "deterministic Crystal reference changed",
  );

  const rejectedCandidate = createScenario("rejected-candidate");
  const rejected = confirmScenario(
    rejectedCandidate,
    "ATTEMPTED",
    "USER_REJECTED",
  );
  assert(
    rejected.status === "REJECTED" &&
      rejected.reason === "CANDIDATE_NOT_CONFIRMABLE",
    "unconfirmed candidate became a formal fact",
  );
  const aiCandidate = createScenario("ai-candidate");
  const aiRejected = api.confirmLivedResponseFact({
    candidate: {
      source: "ai_generated_candidate",
      candidateReferenceId: "candidate:ai",
      choiceActionIntentionReferenceId:
        aiCandidate.intention.choiceActionIntentionReferenceId,
      candidateRevision: 1,
      responseOutcome: "ATTEMPTED",
      factualSummary: "AI 推测用户已完成",
      state: "AWAITING_USER_CONFIRMATION",
      createdAt: new Date().toISOString(),
    },
    intentionReferenceId:
      aiCandidate.intention.choiceActionIntentionReferenceId,
  });
  assert(
    aiRejected.status === "REJECTED" &&
      aiRejected.reason === "CANDIDATE_NOT_CONFIRMABLE",
    "AI candidate crossed the user confirmation boundary",
  );

  const notAttempted = createScenario("not-attempted");
  const notAttemptedFact = confirmScenario(notAttempted, "NOT_ATTEMPTED");
  assert(notAttemptedFact.status === "CONFIRMED", "no-action fact missing");
  const withheld = api.resolveCrystalEligibilityForFact(notAttemptedFact.fact);
  assert(
    withheld.status === "WITHHELD" &&
      withheld.eligibility.withheldReason === "LIVED_RESPONSE_NOT_ATTEMPTED",
    "no-action response was not safely withheld",
  );
  const withheldFormation = await api.formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      withheld.eligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      withheld.eligibility.eligibilityRevision,
    identityReferences: notAttempted.identityReferences,
  });
  assert(
    withheldFormation.status === "SAFE_WITHHELD",
    "withheld eligibility formed a Crystal",
  );

  const changed = createScenario("changed");
  const changedFact = confirmScenario(changed, "CHANGED_RESPONSE");
  assert(changedFact.status === "CONFIRMED", "changed response fact missing");
  const changedEligibility =
    api.resolveCrystalEligibilityForFact(changedFact.fact);
  assert(
    changedEligibility.status === "ELIGIBLE",
    "changed response was treated as task failure",
  );

  const mismatched = await api.formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      changedEligibility.eligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      changedEligibility.eligibility.eligibilityRevision,
    identityReferences: {
      ...changed.identityReferences,
      starBeastIdentityReferenceId: "beast:other",
    },
  });
  assert(
    mismatched.status === "SAFE_WITHHELD" &&
      mismatched.reason === "PROVENANCE_MISMATCH",
    "identity mismatch crossed the formation boundary",
  );

  const failedPersistence = createScenario("failed-persistence");
  rejectGrowthWrites = true;
  const failedFact = confirmScenario(failedPersistence, "ATTEMPTED");
  rejectGrowthWrites = false;
  assert(
    failedFact.status === "REJECTED" &&
      failedFact.reason === "PERSISTENCE_UNAVAILABLE",
    "unconfirmed fact write was shown as confirmed",
  );

  const noLock = createScenario("no-lock");
  const noLockFact = confirmScenario(noLock, "ATTEMPTED");
  assert(noLockFact.status === "CONFIRMED", "no-lock fact missing");
  const noLockEligibility =
    api.resolveCrystalEligibilityForFact(noLockFact.fact);
  assert(noLockEligibility.status === "ELIGIBLE", "no-lock eligibility missing");
  Object.defineProperty(globalThis.navigator, "locks", {
    configurable: true,
    value: undefined,
  });
  const noLockFormation = await api.formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      noLockEligibility.eligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      noLockEligibility.eligibility.eligibilityRevision,
    identityReferences: noLock.identityReferences,
  });
  assert(
    noLockFormation.status === "SAFE_WITHHELD" &&
      noLockFormation.reason === "FORMATION_LOCK_UNAVAILABLE",
    "missing cross-tab lock did not enter SAFE_WITHHELD",
  );
  Object.defineProperty(globalThis.navigator, "locks", {
    configurable: true,
    value: serialLocks,
  });

  const projectionFailure = createScenario("projection-failure");
  const projectionFact = confirmScenario(projectionFailure, "ATTEMPTED");
  assert(projectionFact.status === "CONFIRMED", "projection fact missing");
  const projectionEligibility =
    api.resolveCrystalEligibilityForFact(projectionFact.fact);
  assert(
    projectionEligibility.status === "ELIGIBLE",
    "projection eligibility missing",
  );
  rejectRingWrites = true;
  const projectionFormed = await api.formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      projectionEligibility.eligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      projectionEligibility.eligibility.eligibilityRevision,
    identityReferences: projectionFailure.identityReferences,
  });
  rejectRingWrites = false;
  assert(
    projectionFormed.status === "FORMED" &&
      projectionFormed.receipt.projection === "RETRYABLE",
    "Archive failure was not retained as a retryable projection",
  );
  const projectionRetried = await api.formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      projectionEligibility.eligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      projectionEligibility.eligibility.eligibilityRevision,
    identityReferences: projectionFailure.identityReferences,
  });
  assert(
    projectionRetried.status === "ALREADY_FORMED" &&
      projectionRetried.receipt.formationReferenceId ===
        projectionFormed.receipt.formationReferenceId &&
      projectionRetried.receipt.projection === "PROJECTED",
    "Archive retry created a second Formation",
  );

  const revoked = createScenario("revoked");
  const revokedFact = confirmScenario(revoked, "ATTEMPTED");
  assert(revokedFact.status === "CONFIRMED", "revocation fact missing");
  const revokedEligibility =
    api.resolveCrystalEligibilityForFact(revokedFact.fact);
  assert(revokedEligibility.status === "ELIGIBLE", "revocation eligibility missing");
  const revocation = api.revokeLivedResponseFact({
    livedResponseReferenceId: revokedFact.fact.livedResponseReferenceId,
    expectedUserConfirmationRevision:
      revokedFact.fact.userConfirmationRevision,
    identityReferences: revoked.identityReferences,
  });
  assert(revocation.status === "REVOKED", "unformed fact was not revoked");
  const revokedFormation = await api.formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      revokedEligibility.eligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      revokedEligibility.eligibility.eligibilityRevision,
    identityReferences: revoked.identityReferences,
  });
  assert(
    revokedFormation.status === "SAFE_WITHHELD",
    "revoked fact still formed a Crystal",
  );
  const formedRevocation = api.revokeLivedResponseFact({
    livedResponseReferenceId: fact.fact.livedResponseReferenceId,
    expectedUserConfirmationRevision: fact.fact.userConfirmationRevision,
    identityReferences: primary.identityReferences,
  });
  assert(
    formedRevocation.status === "REJECTED" &&
      formedRevocation.reason === "FORMATION_ALREADY_CONFIRMED",
    "confirmed Crystal was disguised as deleted",
  );

  const envelope = api.readXinmaiLivedGrowthRecoveryCandidate();
  assert(envelope.status === "FOUND", "growth envelope missing");
  const primaryReceipts = envelope.envelope.formationReceipts.filter(
    (receipt) =>
      receipt.crystalEligibilityReferenceId ===
      eligibility.eligibility.crystalEligibilityReferenceId,
  );
  assert(primaryReceipts.length === 1, "duplicate receipt formed");
  const ringEntries =
    JSON.parse(storage.get("guanyao:personalityRingLite") ?? '{"entries":[]}').entries;
  const crystalReferences = ringEntries.map((entry) => entry.crystalReferenceId);
  assert(
    new Set(crystalReferences).size === crystalReferences.length,
    "Archive projection contains duplicate Crystal references",
  );
  console.log(
    "[XINMAI LIVED GROWTH PRODUCTION BROWSER ACCEPTANCE HARNESS] PASS",
  );
} finally {
  fs.rmSync(out, { force: true });
}
