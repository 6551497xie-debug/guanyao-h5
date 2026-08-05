import { useLayoutEffect, useMemo } from "react";
import { projectXinmaiSameLifeStaticBody } from "../services/xinmaiSameLifeStaticBodyProjector";
import type { PersonalStarBeastLifePresenceProjection } from "../types/personalStarBeastLifePresenceProjection";
import type {
  XinmaiSameLifeSurfaceCommitProof,
  XinmaiSameLifeSurfaceFacts,
} from "../types/xinmaiSameLifeSurfacePresentation";

export function XinmaiSemanticStaticSameLifeSurface({
  facts,
  lifePresence,
  onCommitted,
}: Readonly<{
  facts: XinmaiSameLifeSurfaceFacts;
  lifePresence: PersonalStarBeastLifePresenceProjection;
  onCommitted: (proof: XinmaiSameLifeSurfaceCommitProof) => void;
}>) {
  const projection = useMemo(
    () => projectXinmaiSameLifeStaticBody({ facts, lifePresence }),
    [facts, lifePresence],
  );
  useLayoutEffect(() => {
    onCommitted(
      Object.freeze({
        presenter: "SEMANTIC_STATIC_SAME_LIFE_BODY" as const,
        sourceReferenceId: facts.sourceReferenceId,
        sourceRenderPlanReferenceId: facts.sourceRenderPlanReferenceId,
        bodyReferenceId: facts.bodyReferenceId,
        imprintReferenceIds: Object.freeze(
          facts.imprints.map((imprint) => imprint.imprintReferenceId),
        ),
        bodyPresenterCount: 1 as const,
        webglContextCount: 0 as const,
      }),
    );
  }, [facts, onCommitted]);

  return (
    <svg
      className="gy-same-life-static-body"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g className="gy-same-life-static-body__world">
        <circle cx="16" cy="25" r="0.7" />
        <circle cx="82" cy="18" r="0.45" />
        <circle cx="77" cy="78" r="0.55" />
      </g>
      <g className="gy-same-life-static-body__body">
        <path className="gy-same-life-static-body__spine" d={projection.spinePath} />
        {projection.branchPaths.map((path, index) => (
          <path
            className="gy-same-life-static-body__branch"
            d={path}
            key={`${facts.bodyReferenceId}:branch:${index}`}
          />
        ))}
        {projection.nodePositions.map((node, index) => (
          <circle
            className="gy-same-life-static-body__node"
            cx={node.x}
            cy={node.y}
            r={index === 3 ? 1.25 : 0.72}
            key={`${facts.bodyReferenceId}:node:${index}`}
          />
        ))}
        {projection.imprintNodes.map((imprint) => (
          <g
            className="gy-same-life-static-body__imprint"
            key={imprint.imprintReferenceId}
            transform={`translate(${imprint.x} ${imprint.y}) rotate(${imprint.rotation})`}
          >
            <path className="gy-same-life-static-body__seam" d="M -5 0 L 5 0" />
            <path
              className="gy-same-life-static-body__crystal"
              d="M -1.8 0 L -0.8 -3.6 L 1.5 -2.2 L 2.3 1.2 L 0.2 3.4 L -1.6 2 Z"
            />
            <path className="gy-same-life-static-body__flow" d="M -5 0 L 0 0 L 5 0" />
          </g>
        ))}
      </g>
    </svg>
  );
}
