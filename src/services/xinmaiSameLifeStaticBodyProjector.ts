import type { PersonalStarBeastLifePresenceProjection } from "../types/personalStarBeastLifePresenceProjection";
import type { XinmaiSameLifeSurfaceFacts } from "../types/xinmaiSameLifeSurfacePresentation";

export type XinmaiSameLifeStaticBodyProjection = Readonly<{
  spinePath: string;
  branchPaths: readonly string[];
  nodePositions: readonly Readonly<{ x: number; y: number }>[];
  imprintNodes: readonly Readonly<{
    imprintReferenceId: string;
    crystalReferenceId: string;
    x: number;
    y: number;
    rotation: number;
    focused: boolean;
  }>[];
}>;

const hashUnit = (reference: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < reference.length; index += 1) {
    hash ^= reference.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 0xffffffff;
};

export function projectXinmaiSameLifeStaticBody(input: Readonly<{
  lifePresence: PersonalStarBeastLifePresenceProjection;
  facts: XinmaiSameLifeSurfaceFacts;
}>): XinmaiSameLifeStaticBodyProjection {
  const identityUnit = hashUnit(
    `${input.facts.sourceRenderPlanReferenceId}:${input.facts.bodyReferenceId}`,
  );
  const tilt = input.lifePresence.stellarSkeleton.axisAngle * 5.2;
  const bend = input.lifePresence.morphologicalField.bend * 4.2;
  const spread = 13 + input.lifePresence.stellarSkeleton.branchSpread * 7;
  const nodes = Object.freeze(
    Array.from({ length: 7 }, (_, index) => {
      const progress = index / 6;
      const x = 50 + (progress - 0.5) * 24 + tilt * (progress - 0.5);
      const y =
        66 - progress * 31 +
        Math.sin(progress * Math.PI * 1.7 + identityUnit * Math.PI) * bend;
      return Object.freeze({ x, y });
    }),
  );
  const spinePath = nodes
    .map((node, index) => `${index === 0 ? "M" : "L"} ${node.x.toFixed(2)} ${node.y.toFixed(2)}`)
    .join(" ");
  const branchPaths = Object.freeze(
    [1, 2, 3, 4, 5].map((nodeIndex, index) => {
      const node = nodes[nodeIndex];
      const direction = index % 2 === 0 ? -1 : 1;
      const length = spread * (0.62 + index * 0.07);
      const endX = node.x + direction * length;
      const endY = node.y - 4 + Math.sin(identityUnit * 7 + index) * 3;
      return `M ${node.x.toFixed(2)} ${node.y.toFixed(2)} Q ${(
        node.x + direction * length * 0.48
      ).toFixed(2)} ${(node.y - 7).toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`;
    }),
  );
  const imprintNodes = Object.freeze(
    input.facts.imprints.map((imprint) => {
      const node = nodes[imprint.stableNodeIndex % nodes.length];
      return Object.freeze({
        imprintReferenceId: imprint.imprintReferenceId,
        crystalReferenceId: imprint.crystalReferenceId,
        x: node.x,
        y: node.y,
        rotation: -18 + hashUnit(imprint.deterministicGeometryKey) * 36,
        focused: imprint.salience === "CURRENT_FORMATION_FOCUS",
      });
    }),
  );
  return Object.freeze({ spinePath, branchPaths, nodePositions: nodes, imprintNodes });
}
