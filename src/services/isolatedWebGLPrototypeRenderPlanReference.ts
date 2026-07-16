import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type { IsolatedWebGLPrototypeRenderPlanReference } from "../types/isolatedWebGLRendererPrototypeAuthorization";

export function createIsolatedWebGLPrototypeRenderPlanReference(
  plan: PersonalStarBeastRenderPlan,
): IsolatedWebGLPrototypeRenderPlanReference {
  const input = JSON.stringify(plan);
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Object.freeze({
    referenceType: "ISOLATED_WEBGL_PROTOTYPE_RENDER_PLAN",
    referenceId: `isolated-webgl-plan:${(hash >>> 0).toString(36)}`,
    source: "personal_star_beast_scene_model_adapter",
    sourceSemanticRole: plan.semanticRole,
    identityBlind: true,
    rendererNeutral: true,
  });
}
