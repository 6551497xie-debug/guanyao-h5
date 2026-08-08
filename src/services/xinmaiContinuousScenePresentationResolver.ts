import { XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY } from "./xinmaiContinuousScenePresentationPolicy";
import type {
  XinmaiContinuousSceneDepthPlan,
  XinmaiContinuousSceneInput,
  XinmaiContinuousSceneOutcome,
  XinmaiContinuousScenePlan,
  XinmaiContinuousScenePresenterCommitProof,
  XinmaiContinuousSceneSafeWithheldReason,
} from "../types/xinmaiContinuousScenePresentation";

const hashStableReference = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const scenePlanReference = (input: XinmaiContinuousSceneInput): string =>
  `CONTINUOUS_SCENE:${hashStableReference(
    [
      input.schemaVersion,
      input.consumerSurface,
      input.sourceReferenceId,
      input.sourceRenderPlanReferenceId,
      input.identityReferenceId ?? "NO_IDENTITY",
      input.bodyReferenceId ?? "NO_BODY",
      input.routeAdmissionEvidence.admissionReferenceId,
      String(input.routeAdmissionEvidence.revision),
      input.nearObjectKind,
      input.nearObjectReferenceId ?? "NO_NEAR_OBJECT",
      input.semanticProjection?.semanticProjectionReferenceId ??
        "NO_SEMANTIC_PROJECTION",
    ].join(":"),
  ).toString(36)}`;

const withheld = (
  input: XinmaiContinuousSceneInput,
  reason: XinmaiContinuousSceneSafeWithheldReason,
): XinmaiContinuousScenePlan =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    scenePlanReferenceId:
      input.sourceReferenceId.trim().length > 0 &&
      input.sourceRenderPlanReferenceId.trim().length > 0
        ? scenePlanReference(input)
        : null,
    sourceReferenceId: input.sourceReferenceId.trim() || null,
    sourceRenderPlanReferenceId:
      input.sourceRenderPlanReferenceId.trim() || null,
    consumerSurface: input.consumerSurface,
    reason,
  });

export function resolveXinmaiContinuousScenePresentation(
  input: XinmaiContinuousSceneInput,
): XinmaiContinuousScenePlan {
  if (XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY === "SAFE_WITHHELD") {
    return withheld(input, "PRESENTATION_PAUSED");
  }
  if (input.routeAdmissionEvidence.status !== "CURRENT") {
    return withheld(input, "ROUTE_ADMISSION_NOT_CURRENT");
  }
  if (input.sourceReferenceId.trim().length === 0) {
    return withheld(input, "SOURCE_REFERENCE_MISSING");
  }
  if (input.sourceRenderPlanReferenceId.trim().length === 0) {
    return withheld(input, "RENDER_PLAN_REFERENCE_MISSING");
  }

  const semanticProjectionRequired =
    input.consumerSurface === "REALITY" ||
    input.consumerSurface === "GRAVITY_CHOICE";
  const semanticProjection = input.semanticProjection;
  if (semanticProjectionRequired && semanticProjection === null) {
    return withheld(input, "SEMANTIC_PROJECTION_REQUIRED");
  }
  if (
    semanticProjection !== null &&
    semanticProjection.status === "SAFE_WITHHELD"
  ) {
    return withheld(input, "SEMANTIC_PROJECTION_SAFE_WITHHELD");
  }
  if (
    semanticProjection !== null &&
    semanticProjection.status === "PRESENTABLE" &&
    (semanticProjection.lineage.sourceReferenceId !==
      input.sourceReferenceId ||
      semanticProjection.lineage.sourceRenderPlanReferenceId !==
        input.sourceRenderPlanReferenceId ||
      semanticProjection.lineage.identityReferenceId !==
        input.identityReferenceId ||
      semanticProjection.lineage.bodyReferenceId !==
        input.bodyReferenceId ||
      semanticProjection.lineage.routeAdmissionReferenceId !==
        input.routeAdmissionEvidence.admissionReferenceId ||
      semanticProjection.lineage.routeAdmissionRevision !==
        input.routeAdmissionEvidence.revision)
  ) {
    return withheld(input, "SEMANTIC_PROJECTION_MISMATCH");
  }

  const sameLifeSelection = input.sameLifeSurface?.selection ?? null;
  if (sameLifeSelection?.status === "SAFE_WITHHELD") {
    return withheld(input, "SAME_LIFE_FACTS_UNAVAILABLE");
  }
  if (sameLifeSelection !== null) {
    const facts = sameLifeSelection.facts;
    if (
      facts.sourceReferenceId !== input.sourceReferenceId ||
      facts.sourceRenderPlanReferenceId !== input.sourceRenderPlanReferenceId ||
      input.bodyReferenceId !== facts.bodyReferenceId ||
      input.identityReferenceId !== facts.starBeastIdentityReferenceId
    ) {
      return withheld(input, "IDENTITY_REFERENCE_MISMATCH");
    }
  }

  const sceneReference = scenePlanReference(input);
  const requiresBody = sameLifeSelection !== null;
  const presentableSemanticProjection =
    semanticProjection?.status === "PRESENTABLE"
      ? semanticProjection
      : null;
  const nearObjectKind =
    presentableSemanticProjection?.nearObjectKind ?? input.nearObjectKind;
  const nearObjectReferenceId =
    presentableSemanticProjection?.nearObjectReferenceId ??
    input.nearObjectReferenceId;
  const depth: XinmaiContinuousSceneDepthPlan = Object.freeze({
    far: Object.freeze({
      topologyReferenceId: `FAR:${input.sourceRenderPlanReferenceId}`,
      qualityTier: input.qualityTier,
      environmentFocus: input.consumerSurface,
    }),
    mid: Object.freeze({
      presenterRequirement: requiresBody
        ? "SAME_LIFE_BODY" as const
        : input.consumerSurface === "GENESIS"
          ? "GENESIS_MANIFESTATION" as const
          : "IDENTITY_BLIND_LIFE_FIELD" as const,
      identityReferenceId: input.identityReferenceId,
      bodyReferenceId: input.bodyReferenceId,
      imprintReferenceIds:
        sameLifeSelection?.facts.imprints.map(
          (imprint) => imprint.imprintReferenceId,
        ) ?? Object.freeze([]),
    }),
    near: Object.freeze({
      interactiveObjectKind: nearObjectKind,
      objectReferenceId: nearObjectReferenceId,
      interactiveObjectCount:
        nearObjectKind === "NONE" ? 0 as const : 1 as const,
      hitRegionContract:
        nearObjectKind === "NONE"
          ? "NONE" as const
          : "NATIVE_CONTROL" as const,
    }),
  });

  return Object.freeze({
    status: "PRESENTABLE" as const,
    scenePlanReferenceId: sceneReference,
    sourceReferenceId: input.sourceReferenceId,
    sourceRenderPlanReferenceId: input.sourceRenderPlanReferenceId,
    consumerSurface: input.consumerSurface,
    presentationMode:
      input.nativeMotionPreference === "REDUCED_MOTION" ||
      sameLifeSelection?.status === "STATIC_SELECTED"
        ? "STATIC" as const
        : "MOTION" as const,
    stableVisualSeed: hashStableReference(
      `${input.sourceRenderPlanReferenceId}:${sceneReference}`,
    ),
    depth,
    sameLifeSurfaceSelection: sameLifeSelection,
    semanticProjection: presentableSemanticProjection,
  });
}

export function resolveXinmaiContinuousSceneStaticFallback(
  plan: XinmaiContinuousScenePlan,
): XinmaiContinuousScenePlan {
  if (plan.status !== "PRESENTABLE" || plan.presentationMode === "STATIC") {
    return plan;
  }
  return Object.freeze({
    ...plan,
    presentationMode: "STATIC" as const,
  });
}

const sameOrderedReferences = (
  left: readonly string[],
  right: readonly string[],
): boolean =>
  left.length === right.length &&
  left.every((reference, index) => reference === right[index]);

export function commitXinmaiContinuousSceneOutcome(input: Readonly<{
  plan: XinmaiContinuousScenePlan;
  proof: XinmaiContinuousScenePresenterCommitProof | null;
  sameLifePublicOutcome:
    | XinmaiContinuousSceneInput["sameLifeSurface"] extends infer Surface
      ? Surface extends { publicOutcome: infer Outcome }
        ? Outcome
        : never
      : never
    | null;
  now: string;
}>): XinmaiContinuousSceneOutcome {
  if (input.plan.status === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "CONTINUOUS_SCENE_SAFE_WITHHELD" as const,
      consumerSurface: input.plan.consumerSurface,
      scenePlanReferenceId: input.plan.scenePlanReferenceId,
      reason: input.plan.reason,
      proof: null,
      reportedAt: input.now,
    });
  }

  const proof = input.proof;
  const isMotion = input.plan.presentationMode === "MOTION";
  const expectedContextCount = isMotion ? 1 : 0;
  const expectedRafCount = isMotion ? 1 : 0;
  const sameLifeFacts =
    input.plan.sameLifeSurfaceSelection !== null &&
    input.plan.sameLifeSurfaceSelection.status !== "SAFE_WITHHELD"
      ? input.plan.sameLifeSurfaceSelection.facts
      : null;
  const expectedBodyCount = sameLifeFacts === null ? 0 : 1;
  const expectedImprints =
    sameLifeFacts?.imprints.map(
      (imprint) => imprint.imprintReferenceId,
    ) ?? [];
  const sameLifeOutcome = input.sameLifePublicOutcome;
  const sameLifeProof =
    sameLifeOutcome !== null &&
    sameLifeOutcome.status !== "SAME_LIFE_SURFACE_SAFE_WITHHELD"
      ? sameLifeOutcome.proof
      : null;
  const sameLifeProofMatches =
    expectedBodyCount === 0 ||
    (sameLifeProof !== null &&
      proof?.sameLifeSurfaceCommitProof !== null &&
      proof?.sameLifeSurfaceCommitProof.bodyReferenceId ===
        sameLifeProof.bodyReferenceId &&
      sameOrderedReferences(
        proof.sameLifeSurfaceCommitProof.imprintReferenceIds,
        expectedImprints,
      ));

  if (
    proof === null ||
    proof.scenePlanReferenceId !== input.plan.scenePlanReferenceId ||
    proof.sourceReferenceId !== input.plan.sourceReferenceId ||
    proof.sourceRenderPlanReferenceId !==
      input.plan.sourceRenderPlanReferenceId ||
    proof.sceneHostCount !== 1 ||
    proof.worldPresenterCount !== 1 ||
    proof.worldContextCount !== expectedContextCount ||
    proof.webglContextCount !==
      (proof.presenter === "WEBGL_CONTINUOUS_SCENE" ? expectedContextCount : 0) ||
    proof.rafOwnerCount !== expectedRafCount ||
    proof.bodyPresenterCount !== expectedBodyCount ||
    proof.interactiveNearObjectCount !==
      input.plan.depth.near.interactiveObjectCount ||
    !sameLifeProofMatches
  ) {
    return Object.freeze({
      status: "CONTINUOUS_SCENE_SAFE_WITHHELD" as const,
      consumerSurface: input.plan.consumerSurface,
      scenePlanReferenceId: input.plan.scenePlanReferenceId,
      reason:
        expectedBodyCount === 1 && !sameLifeProofMatches
          ? "SAME_LIFE_PROOF_UNAVAILABLE" as const
          : "PRESENTER_COMMIT_MISMATCH" as const,
      proof: null,
      reportedAt: input.now,
    });
  }

  return Object.freeze({
    status: isMotion
      ? "CONTINUOUS_SCENE_MOTION_PRESENTED" as const
      : "CONTINUOUS_SCENE_STATIC_PRESENTED" as const,
    scenePlanReferenceId: input.plan.scenePlanReferenceId,
    sourceReferenceId: input.plan.sourceReferenceId,
    sourceRenderPlanReferenceId: input.plan.sourceRenderPlanReferenceId,
    consumerSurface: input.plan.consumerSurface,
    proof,
    presentedAt: input.now,
  });
}
