import { XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_PRESENTATION_POLICY } from "./xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy";
import type {
  XinmaiGravityChoiceSceneSemanticFacts,
  XinmaiRealityGravityChoicePhysicalPlan,
  XinmaiRealityGravityChoiceSceneSemanticInput,
  XinmaiRealityGravityChoiceSceneSemanticProjection,
  XinmaiRealityGravityChoiceSceneSemanticSafeWithheldReason,
  XinmaiRealityGravityChoiceSceneSemanticStage,
  XinmaiRealitySceneSemanticFacts,
} from "../types/xinmaiRealityGravityChoiceSceneSemanticPresentation";

const hashStableReference = (value: string): string => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
};

const semanticReference = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  stage: XinmaiRealityGravityChoiceSceneSemanticStage | "SAFE_WITHHELD",
  nearReferenceId: string | null,
): string =>
  `XINMAI_SCENE_SEMANTIC:${hashStableReference([
    input.schemaVersion,
    input.facts.consumerSurface,
    stage,
    input.lineage.sourceReferenceId,
    input.lineage.sourceRenderPlanReferenceId,
    input.lineage.identityReferenceId ?? "NO_IDENTITY",
    input.lineage.bodyReferenceId ?? "NO_BODY",
    input.lineage.routeAdmissionReferenceId,
    String(input.lineage.routeAdmissionRevision),
    input.lineage.sourceEncounterCycleId,
    input.lineage.gravityCycleId ?? "NO_GRAVITY",
    input.lineage.gravityObservationReferenceId ?? "NO_OBSERVATION",
    nearReferenceId ?? "NO_NEAR",
  ].join(":"))}`;

const withheld = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  reason: XinmaiRealityGravityChoiceSceneSemanticSafeWithheldReason,
): XinmaiRealityGravityChoiceSceneSemanticProjection =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    semanticProjectionReferenceId:
      input.lineage.sourceReferenceId.trim().length > 0 &&
      input.lineage.sourceRenderPlanReferenceId.trim().length > 0
        ? semanticReference(input, "SAFE_WITHHELD", null)
        : null,
    consumerSurface: input.facts.consumerSurface,
    reason,
  });

const physicalPlanFor = (
  stage: XinmaiRealityGravityChoiceSceneSemanticStage,
): XinmaiRealityGravityChoicePhysicalPlan => {
  switch (stage) {
    case "REALITY_APPROACHING":
      return Object.freeze({
        farFocus: "REALITY_APPROACH" as const,
        midResponse: "SAME_LIFE_STABLE" as const,
        nearEmphasis: "PRESSURE_CANDIDATE" as const,
        forceField: "NONE" as const,
        transitionMeaning: "NO_AUTHORITY_CHANGE" as const,
      });
    case "PRESSURE_RECOGNIZED":
      return Object.freeze({
        farFocus: "REALITY_APPROACH" as const,
        midResponse: "VEIL_REVEALED" as const,
        nearEmphasis: "RECOGNIZED_PRESSURE" as const,
        forceField: "NONE" as const,
        transitionMeaning: "USER_RECOGNITION_REFLECTED" as const,
      });
    case "GRAVITY_OBSERVING":
      return Object.freeze({
        farFocus: "GRAVITY_CONTRACTION" as const,
        midResponse: "LOCAL_CONTRACTION" as const,
        nearEmphasis: "OBSERVATION_PATH" as const,
        forceField: "OBSERVATION_ATTRACTOR" as const,
        transitionMeaning: "NO_AUTHORITY_CHANGE" as const,
      });
    case "GRAVITY_RECOGNIZED":
      return Object.freeze({
        farFocus: "GRAVITY_CONTRACTION" as const,
        midResponse: "PROTECTIVE_PATH_VISIBLE" as const,
        nearEmphasis: "OBSERVATION_PATH" as const,
        forceField: "OBSERVATION_ATTRACTOR" as const,
        transitionMeaning: "OBSERVATION_REFLECTED" as const,
      });
    case "CHOICE_READY":
      return Object.freeze({
        farFocus: "GRAVITY_CONTRACTION" as const,
        midResponse: "PROTECTIVE_PATH_VISIBLE" as const,
        nearEmphasis: "COMPARABLE_CHOICE_FIELD" as const,
        forceField: "PROTECTION_BENEFIT_COST_BALANCE" as const,
        transitionMeaning: "CHOICE_AVAILABLE_NOT_SELECTED" as const,
      });
    case "CHOICE_COMMITTED":
      return Object.freeze({
        farFocus: "REAL_LIFE_OPENING" as const,
        midResponse: "CHOICE_TRACE_HELD" as const,
        nearEmphasis: "COMMITTED_CHOICE_TRACE" as const,
        forceField: "COMMITTED_DIRECTION_WITHOUT_COMPLETION" as const,
        transitionMeaning: "CHOICE_COMMITTED_NOT_LIVED" as const,
      });
  }
};

const presented = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  stage: XinmaiRealityGravityChoiceSceneSemanticStage,
  nearObjectKind: "NONE" | "REALITY_WEATHER_NODE" | "GRAVITY_OBSERVATION" | "CHOICE_ACTION",
  nearObjectReferenceId: string | null,
): XinmaiRealityGravityChoiceSceneSemanticProjection =>
  Object.freeze({
    status: "PRESENTABLE" as const,
    semanticProjectionReferenceId: semanticReference(
      input,
      stage,
      nearObjectReferenceId,
    ),
    semanticStage: stage,
    lineage: input.lineage,
    nearObjectKind,
    nearObjectReferenceId,
    physicalPlan: physicalPlanFor(stage),
  });

const resolveReality = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  facts: XinmaiRealitySceneSemanticFacts,
): XinmaiRealityGravityChoiceSceneSemanticProjection => {
  if (input.lineage.gravityCycleId !== null) {
    return withheld(input, "SOURCE_OR_IDENTITY_MISMATCH");
  }
  if (facts.captureState !== "SEED_RECOGNIZED") {
    if (
      facts.selectedPressureSeedId !== null ||
      facts.recognitionReceiptReferenceId !== null ||
      facts.recognitionReceiptRevision !== null ||
      facts.recognitionCanonicalRevision !== null
    ) {
      return withheld(input, "PRESSURE_RECOGNITION_LINEAGE_MISMATCH");
    }
    return presented(input, "REALITY_APPROACHING", "NONE", null);
  }
  if (
    facts.selectedPressureSeedId === null ||
    facts.recognitionReceiptReferenceId === null ||
    facts.recognitionReceiptRevision === null ||
    facts.recognitionCanonicalRevision === null ||
    facts.recognitionReceiptLifecycle !== "RECOGNIZED"
  ) {
    return withheld(input, "PRESSURE_RECOGNITION_PROOF_MISSING");
  }
  if (facts.recognitionCanonicalRevision < facts.recognitionReceiptRevision) {
    return withheld(input, "PRESSURE_RECOGNITION_LINEAGE_MISMATCH");
  }
  const nearReference =
    `${facts.recognitionReceiptReferenceId}:` +
    `${facts.recognitionReceiptRevision}:` +
    `${facts.selectedPressureSeedId}`;
  return presented(
    input,
    "PRESSURE_RECOGNIZED",
    "REALITY_WEATHER_NODE",
    nearReference,
  );
};

const gravityLineageMatches = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  facts: XinmaiGravityChoiceSceneSemanticFacts,
): boolean =>
  input.lineage.gravityCycleId === facts.gravityCycleId &&
  input.lineage.sourceEncounterCycleId === facts.sourceEncounterCycleId &&
  input.lineage.gravityObservationReferenceId ===
    facts.gravityObservationReferenceId &&
  input.lineage.routeAdmissionReferenceId ===
    facts.gravityAdmissionReferenceId &&
  input.lineage.routeAdmissionRevision === facts.gravityAdmissionRevision &&
  facts.observationDecision.gravityObservationReferenceId ===
    facts.gravityObservationReferenceId;

const choiceLineageMatches = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  facts: XinmaiGravityChoiceSceneSemanticFacts,
): boolean => {
  const lineage = facts.choiceDecision.lineage;
  return lineage !== null &&
    lineage.identityReferences.sourceReferenceId ===
      input.lineage.sourceReferenceId &&
    lineage.identityReferences.starBeastIdentityReferenceId ===
      input.lineage.identityReferenceId &&
    lineage.sourceEncounterCycleId === facts.sourceEncounterCycleId &&
    lineage.gravityCycleId === facts.gravityCycleId &&
    lineage.gravityObservationReferenceId ===
      facts.gravityObservationReferenceId &&
    lineage.observationCheckpointRevision ===
      facts.observationDecision.checkpointRevision;
};

const resolveGravity = (
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
  facts: XinmaiGravityChoiceSceneSemanticFacts,
): XinmaiRealityGravityChoiceSceneSemanticProjection => {
  if (!gravityLineageMatches(input, facts)) {
    return withheld(input, "GRAVITY_ADMISSION_MISMATCH");
  }
  const observation = facts.observationDecision;
  if (observation.status === "BLOCKED" || observation.status === "SAFE_WITHHELD") {
    return withheld(input, "OBSERVATION_PROOF_MISSING");
  }
  if (facts.choiceDecision.state === "TERMINAL_BY_GROWTH") {
    return withheld(input, "TERMINAL_GROWTH_OWNS_PRESENTATION");
  }
  if (facts.choiceDecision.state === "SAFE_WITHHELD") {
    return withheld(input, "CHOICE_READINESS_SAFE_WITHHELD");
  }
  if (facts.choiceDecision.state === "RESUME_COMMITTED") {
    if (!choiceLineageMatches(input, facts)) {
      return withheld(input, "CHOICE_LINEAGE_MISMATCH");
    }
    const intention = facts.choiceDecision.choiceActionIntention;
    if (
      intention.gravityCycleId !== facts.gravityCycleId ||
      intention.gravityObservationReferenceId !==
        facts.gravityObservationReferenceId ||
      intention.sourceEncounterCycleId !== facts.sourceEncounterCycleId
    ) {
      return withheld(input, "CHOICE_LINEAGE_MISMATCH");
    }
    return presented(
      input,
      "CHOICE_COMMITTED",
      "CHOICE_ACTION",
      intention.choiceActionIntentionReferenceId,
    );
  }
  if (facts.choiceDecision.state === "READY_TO_PRESENT") {
    const actionRouteCandidate =
      facts.choiceDecision.actionRouteCandidate;
    if (!choiceLineageMatches(input, facts)) {
      return withheld(input, "CHOICE_LINEAGE_MISMATCH");
    }
    if (
      facts.actionRouteResolution.status !== "READY" ||
      !facts.actionRouteResolution.candidates.some(
        (candidate) =>
          candidate.actionRouteReferenceId ===
          actionRouteCandidate.actionRouteReferenceId,
      )
    ) {
      return withheld(input, "ACTION_ROUTE_MISSING_OR_MISMATCH");
    }
    return presented(
      input,
      "CHOICE_READY",
      "CHOICE_ACTION",
      actionRouteCandidate.actionRouteReferenceId,
    );
  }
  if (
    observation.status === "OBSERVATION_RECOGNIZED" ||
    observation.status === "CHOICE_COMMITTED"
  ) {
    return presented(
      input,
      "GRAVITY_RECOGNIZED",
      "GRAVITY_OBSERVATION",
      `${observation.gravityObservationReferenceId}:${observation.checkpointRevision}`,
    );
  }
  if (
    observation.status === "OBSERVATION_AVAILABLE" ||
    observation.status === "SURFACE_REQUIRED"
  ) {
    return presented(
      input,
      "GRAVITY_OBSERVING",
      "GRAVITY_OBSERVATION",
      observation.gravityObservationReferenceId,
    );
  }
  return withheld(input, "OBSERVATION_LINEAGE_MISMATCH");
};

export function resolveXinmaiRealityGravityChoiceSceneSemanticPresentation(
  input: XinmaiRealityGravityChoiceSceneSemanticInput,
): XinmaiRealityGravityChoiceSceneSemanticProjection {
  if (
    XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_PRESENTATION_POLICY ===
    "SAFE_WITHHELD"
  ) {
    return withheld(input, "PRESENTATION_PAUSED");
  }
  if (input.lineage.routeAdmissionStatus !== "CURRENT") {
    return withheld(input, "ROUTE_ADMISSION_NOT_CURRENT");
  }
  if (
    input.lineage.sourceReferenceId.trim().length === 0 ||
    input.lineage.sourceRenderPlanReferenceId.trim().length === 0 ||
    input.lineage.identityReferenceId === null
  ) {
    return withheld(input, "SOURCE_OR_IDENTITY_MISMATCH");
  }
  if (input.facts.consumerSurface === "REALITY") {
    return resolveReality(input, input.facts);
  }
  if (input.facts.consumerSurface === "GRAVITY_CHOICE") {
    return resolveGravity(input, input.facts);
  }
  return withheld(input, "CONSUMER_SURFACE_UNSUPPORTED");
}

export const XinmaiRealityGravityChoiceSceneSemanticResolver = Object.freeze({
  resolve: resolveXinmaiRealityGravityChoiceSceneSemanticPresentation,
  pure: true as const,
  readOnly: true as const,
  noStorageRead: true as const,
  noStorageWrite: true as const,
  noDomInput: true as const,
  noTimerInput: true as const,
  noControllerCall: true as const,
  noAuthorityWriteback: true as const,
});
