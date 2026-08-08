import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const root = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "xinmai-v3-semantic-"));
const entry = path.join(temp, "entry.ts");
const output = path.join(temp, "bundle.mjs");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  fs.writeFileSync(
    entry,
    `export { resolveXinmaiRealityGravityChoiceSceneSemanticPresentation as resolve } from ${JSON.stringify(path.join(root, "src/services/xinmaiRealityGravityChoiceSceneSemanticResolver.ts"))};\nexport { XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_PRESENTATION_POLICY as policy } from ${JSON.stringify(path.join(root, "src/services/xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts"))};`,
  );
  await build({
    entryPoints: [entry],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { policy, resolve } = await import(`file://${output}?t=${Date.now()}`);
  const identity = {
    sourceReferenceId: "source:v3",
    starBeastIdentityReferenceId: "identity:v3",
    mansionCoordinateReferenceId: "mansion:v3",
  };
  const baseLineage = {
    sourceReferenceId: identity.sourceReferenceId,
    sourceRenderPlanReferenceId: "render:v3",
    identityReferenceId: identity.starBeastIdentityReferenceId,
    bodyReferenceId: "body:v3",
    routeAdmissionStatus: "CURRENT",
    routeAdmissionReferenceId: "admission:v3",
    routeAdmissionRevision: 2,
    sourceEncounterCycleId: "encounter:v3",
    gravityCycleId: null,
    gravityObservationReferenceId: null,
  };
  const reality = (facts) => resolve({
    schemaVersion: "XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_V1",
    lineage: baseLineage,
    facts: { consumerSurface: "REALITY", ...facts },
  });
  const realityApproaching = reality({
    captureState: "OBSERVING_CANDIDATES",
    selectedPressureSeedId: null,
    recognitionReceiptReferenceId: null,
    recognitionReceiptRevision: null,
    recognitionReceiptLifecycle: null,
    recognitionCanonicalRevision: null,
  });
  if (policy === "SAFE_WITHHELD") {
    assert(
      realityApproaching.status === "SAFE_WITHHELD" &&
        realityApproaching.reason === "PRESENTATION_PAUSED",
      "Forward Counter does not safely pause the semantic presentation",
    );
  } else {
    assert(
      realityApproaching.semanticStage === "REALITY_APPROACHING",
      "Reality candidate state is not reflected without claiming recognition",
    );
  const recognized = reality({
    captureState: "SEED_RECOGNIZED",
    selectedPressureSeedId: "pressure:v3",
    recognitionReceiptReferenceId: "receipt:v3",
    recognitionReceiptRevision: 3,
    recognitionReceiptLifecycle: "RECOGNIZED",
    recognitionCanonicalRevision: 3,
  });
  assert(
    recognized.status === "PRESENTABLE" &&
      recognized.semanticStage === "PRESSURE_RECOGNIZED" &&
      recognized.nearObjectKind === "REALITY_WEATHER_NODE",
    "Current recognition proof does not present one Reality node",
  );
  assert(
    reality({
      captureState: "SEED_RECOGNIZED",
      selectedPressureSeedId: "pressure:v3",
      recognitionReceiptReferenceId: null,
      recognitionReceiptRevision: null,
      recognitionReceiptLifecycle: null,
      recognitionCanonicalRevision: null,
    }).reason === "PRESSURE_RECOGNITION_PROOF_MISSING",
    "Missing recognition proof does not safe-withhold",
  );

  const gravityLineage = {
    ...baseLineage,
    gravityCycleId: "gravity:v3",
    gravityObservationReferenceId: "observation:v3",
  };
  const presentationLineage = {
    identityReferences: identity,
    sourceEncounterCycleId: "encounter:v3",
    gravityCycleId: "gravity:v3",
    gravityObservationReferenceId: "observation:v3",
    observationCheckpointRevision: 4,
  };
  const observation = (status) => ({
    status,
    gravityObservationReferenceId: "observation:v3",
    checkpointRevision: status === "SURFACE_REQUIRED" ? 0 : 4,
    recognition:
      status === "OBSERVATION_RECOGNIZED" || status === "CHOICE_COMMITTED"
        ? "USER_CONFIRMED"
        : null,
    choiceActionIntention: null,
  });
  const withheldChoice = {
    state: "WITHHELD",
    reason: "OBSERVATION_NOT_RECOGNIZED",
    lineage: presentationLineage,
    experienceStage: "NODE_RUNNING",
    resolvedAt: "ignored",
    actionRouteCandidate: null,
    formationSourceSnapshot: null,
    structuralInput: null,
    choiceActionIntention: null,
    terminalTarget: null,
    growthReferenceId: null,
  };
  const gravity = (observationDecision, choiceDecision, actionRouteResolution) =>
    resolve({
      schemaVersion: "XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_V1",
      lineage: gravityLineage,
      facts: {
        consumerSurface: "GRAVITY_CHOICE",
        gravityAdmissionReferenceId: "admission:v3",
        gravityAdmissionRevision: 2,
        gravityCycleId: "gravity:v3",
        sourceEncounterCycleId: "encounter:v3",
        gravityObservationReferenceId: "observation:v3",
        observationDecision,
        choiceDecision,
        actionRouteResolution,
      },
    });
  const noRoute = { status: "SAFE_WITHHELD", candidates: [], resolverInput: null, routeSetReferenceId: null, reason: "OBSERVATION_NOT_RECOGNIZED" };
  assert(
    gravity(observation("OBSERVATION_AVAILABLE"), withheldChoice, noRoute).semanticStage === "GRAVITY_OBSERVING",
    "Available observation is not reflected as observing",
  );
  assert(
    gravity(observation("OBSERVATION_RECOGNIZED"), withheldChoice, noRoute).semanticStage === "GRAVITY_RECOGNIZED",
    "Recognized observation is not reflected without claiming Choice",
  );
  const candidate = { actionRouteReferenceId: "route:v3" };
  const readyChoice = {
    ...withheldChoice,
    state: "READY_TO_PRESENT",
    reason: "ALL_TYPED_PREREQUISITES_READY",
    actionRouteCandidate: candidate,
  };
  const readyRoute = { status: "READY", candidates: [candidate], resolverInput: {}, routeSetReferenceId: "route-set:v3", reason: null };
  const choiceReady = gravity(observation("OBSERVATION_RECOGNIZED"), readyChoice, readyRoute);
  assert(
    choiceReady.status === "PRESENTABLE" &&
      choiceReady.semanticStage === "CHOICE_READY" &&
      choiceReady.nearObjectKind === "CHOICE_ACTION" &&
      choiceReady.physicalPlan.forceField === "PROTECTION_BENEFIT_COST_BALANCE",
    "Choice readiness does not produce the bounded comparison field",
  );
  const intention = {
    choiceActionIntentionReferenceId: "choice:v3",
    gravityCycleId: "gravity:v3",
    gravityObservationReferenceId: "observation:v3",
    sourceEncounterCycleId: "encounter:v3",
  };
  const committedChoice = {
    ...withheldChoice,
    state: "RESUME_COMMITTED",
    reason: "CANONICAL_CHOICE_EXISTS",
    choiceActionIntention: intention,
    growthReferenceId: "choice:v3",
  };
  const choiceCommitted = gravity(observation("CHOICE_COMMITTED"), committedChoice, noRoute);
  assert(
    choiceCommitted.status === "PRESENTABLE" &&
      choiceCommitted.semanticStage === "CHOICE_COMMITTED" &&
      choiceCommitted.physicalPlan.transitionMeaning === "CHOICE_COMMITTED_NOT_LIVED",
    "Committed Choice is not held without claiming lived completion",
  );
  const mismatch = gravity(
    observation("OBSERVATION_RECOGNIZED"),
    { ...readyChoice, lineage: { ...presentationLineage, gravityCycleId: "gravity:other" } },
    readyRoute,
  );
  assert(
    mismatch.status === "SAFE_WITHHELD" && mismatch.reason === "CHOICE_LINEAGE_MISMATCH",
    "Choice lineage mismatch is not safe-withheld",
  );
  }
  console.log("[XINMAI REALITY GRAVITY CHOICE SCENE SEMANTIC RESOLVER] PASS");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
