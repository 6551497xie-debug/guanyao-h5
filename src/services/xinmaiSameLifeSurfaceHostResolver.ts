import { createIsolatedWebGLPrototypeRenderPlanReference } from "./isolatedWebGLPrototypeRenderPlanReference";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type { XinmaiCanonicalBodyImprintDecision } from "../types/xinmaiCanonicalBodyImprint";
import {
  XINMAI_SAME_LIFE_SURFACE_PRESENTATION_VERSION,
  type XinmaiSameLifeSurfaceCommitProof,
  type XinmaiSameLifeSurfaceFacts,
  type XinmaiSameLifeSurfaceOutcome,
  type XinmaiSameLifeSurfaceSelection,
  type XinmaiSameLifeSurfaceConsumer,
} from "../types/xinmaiSameLifeSurfacePresentation";

export const XINMAI_SAME_LIFE_SURFACE_PRESENTATION_POLICY =
  "ENABLED" as "ENABLED" | "SAFE_WITHHELD";

const STABLE_NODE_ORDER = Object.freeze([2, 5, 3, 6, 1, 4, 0]);

const sameOrderedReferences = (
  left: readonly string[],
  right: readonly string[],
): boolean =>
  left.length === right.length &&
  left.every((reference, index) => reference === right[index]);

export function resolveXinmaiSameLifeSurfaceFacts(input: Readonly<{
  sourceReferenceId: string;
  renderPlan: PersonalStarBeastRenderPlan | null;
  canonicalBodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
}>): XinmaiSameLifeSurfaceFacts | null {
  if (input.renderPlan === null) return null;
  const decision = input.canonicalBodyImprintDecision;
  if (
    decision.bodyReferenceId === null ||
    decision.identityReferences === null ||
    decision.identityReferences.sourceReferenceId !== input.sourceReferenceId
  ) {
    return null;
  }
  const sorted = [...decision.imprints].sort((left, right) =>
    left.imprintReferenceId.localeCompare(right.imprintReferenceId),
  );
  return Object.freeze({
    schemaVersion: XINMAI_SAME_LIFE_SURFACE_PRESENTATION_VERSION,
    sourceReferenceId: input.sourceReferenceId,
    sourceRenderPlanReferenceId:
      createIsolatedWebGLPrototypeRenderPlanReference(input.renderPlan)
        .referenceId,
    starBeastIdentityReferenceId:
      decision.identityReferences.starBeastIdentityReferenceId,
    mansionCoordinateReferenceId:
      decision.identityReferences.mansionCoordinateReferenceId,
    bodyReferenceId: decision.bodyReferenceId,
    canonicalImprintStatus: decision.status,
    imprints: Object.freeze(
      sorted.map((imprint, index) =>
        Object.freeze({
          imprintReferenceId: imprint.imprintReferenceId,
          crystalReferenceId: imprint.crystalReferenceId,
          bodyReferenceId: imprint.bodyReferenceId,
          deterministicGeometryKey: imprint.deterministicGeometryKey,
          stableNodeIndex: STABLE_NODE_ORDER[index % STABLE_NODE_ORDER.length],
          salience: imprint.salience,
        }),
      ),
    ),
  });
}

export function resolveXinmaiSameLifeSurfaceSelection(input: Readonly<{
  facts: XinmaiSameLifeSurfaceFacts | null;
  nativeReducedMotion: boolean;
  webglUnavailable: boolean;
}>): XinmaiSameLifeSurfaceSelection {
  if (XINMAI_SAME_LIFE_SURFACE_PRESENTATION_POLICY === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      facts: null,
      presenter: null,
      webglContextPolicy: "FORBIDDEN" as const,
      reason: "PRESENTATION_PAUSED" as const,
    });
  }
  if (input.facts === null) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      facts: null,
      presenter: null,
      webglContextPolicy: "FORBIDDEN" as const,
      reason: "CANONICAL_FACTS_UNAVAILABLE" as const,
    });
  }
  if (input.nativeReducedMotion || input.webglUnavailable) {
    return Object.freeze({
      status: "STATIC_SELECTED" as const,
      facts: input.facts,
      presenter: "SEMANTIC_STATIC_SAME_LIFE_BODY" as const,
      webglContextPolicy: "FORBIDDEN" as const,
      reason: input.nativeReducedMotion
        ? "NATIVE_REDUCED_MOTION" as const
        : "WEBGL_UNAVAILABLE" as const,
    });
  }
  return Object.freeze({
    status: "MOTION_SELECTED" as const,
    facts: input.facts,
    presenter: "WEBGL_SAME_LIFE_BODY" as const,
    webglContextPolicy: "REQUIRED" as const,
  });
}

export function commitXinmaiSameLifeSurfaceOutcome(input: Readonly<{
  selection: XinmaiSameLifeSurfaceSelection;
  proof: XinmaiSameLifeSurfaceCommitProof | null;
  consumer: XinmaiSameLifeSurfaceConsumer;
  now?: string;
}>): XinmaiSameLifeSurfaceOutcome {
  if (input.selection.status === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAME_LIFE_SURFACE_SAFE_WITHHELD" as const,
      consumer: input.consumer,
      facts: null,
      proof: null,
      reason: input.selection.reason,
      reportedAt: input.now ?? new Date().toISOString(),
    });
  }
  const proof = input.proof;
  const facts = input.selection.facts;
  const expectedPresenter = input.selection.presenter;
  const expectedContextCount =
    input.selection.status === "MOTION_SELECTED" ? 1 : 0;
  const references = facts.imprints.map(
    (imprint) => imprint.imprintReferenceId,
  );
  if (
    proof === null ||
    proof.presenter !== expectedPresenter ||
    proof.sourceReferenceId !== facts.sourceReferenceId ||
    proof.sourceRenderPlanReferenceId !== facts.sourceRenderPlanReferenceId ||
    proof.bodyReferenceId !== facts.bodyReferenceId ||
    proof.bodyPresenterCount !== 1 ||
    proof.webglContextCount !== expectedContextCount ||
    !sameOrderedReferences(proof.imprintReferenceIds, references)
  ) {
    return Object.freeze({
      status: "SAME_LIFE_SURFACE_SAFE_WITHHELD" as const,
      consumer: input.consumer,
      facts: null,
      proof: null,
      reason: "PRESENTER_COMMIT_MISMATCH" as const,
      reportedAt: input.now ?? new Date().toISOString(),
    });
  }
  return Object.freeze({
    status:
      input.selection.status === "MOTION_SELECTED"
        ? "MOTION_SAME_LIFE_SURFACE_PRESENTED" as const
        : "STATIC_SAME_LIFE_SURFACE_PRESENTED" as const,
    consumer: input.consumer,
    facts,
    proof,
    presentedAt: input.now ?? new Date().toISOString(),
  });
}
