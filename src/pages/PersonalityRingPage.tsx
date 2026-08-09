import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { readXinmaiCanonicalBodyImprintRecovery } from "../services/xinmaiCanonicalBodyImprintRecoveryAdapter";
import { resolveXinmaiSameLifeAccessibleSemanticMirror } from "../services/xinmaiSameLifeAccessibleSemanticMirror";
import {
  applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy,
  resolveXinmaiReturningSameLifeContinuityPresentation,
} from "../services/xinmaiReturningSameLifeContinuityPresentationResolver";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "../services/isolatedWebGLPrototypeRenderPlanReference";
import { subscribeToXinmaiLivedGrowthRecoveryRevision } from "../services/xinmaiLivedGrowthRecoveryRevisionObserver";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { recoverRealityRecognizedIdentity } from "../services/realityRecognizedIdentityRecoveryAdapter";
import {
  XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
  type XinmaiCanonicalBodyImprintDecision,
} from "../types/xinmaiCanonicalBodyImprint";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import type { XinmaiSameLifeSurfaceOutcome } from "../types/xinmaiSameLifeSurfacePresentation";
import "../styles/reality-pressure-presentation.css";
import "../styles/xinmai-same-life-surface.css";

const RealityLifeUniverseCanvas = lazy(() =>
  import("../components/RealityLifeUniverseCanvas").then((module) => ({
    default: module.RealityLifeUniverseCanvas,
  })),
);

type ArchiveRouteState =
  | Readonly<{
      visualContinuity?: RealityProductionHostProps["visualContinuity"];
      formationReferenceId?: string;
      archiveEntryCreatedAt?: string;
    }>
  | null;

export function PersonalityRingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state as ArchiveRouteState;
  const [legacyHistory] = useState(() => readPersonalityRingLite());
  const [growthRevision, setGrowthRevision] = useState(0);
  const identityRecovery = useMemo(
    () =>
      recoverRealityRecognizedIdentity({
        visualContinuity: routeState?.visualContinuity ?? null,
      }),
    [routeState?.visualContinuity],
  );
  const [bodyImprintDecision, setBodyImprintDecision] =
    useState<XinmaiCanonicalBodyImprintDecision>(
      XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
    );
  const [selectedImprintReferenceId, setSelectedImprintReferenceId] =
    useState<string | null>(null);
  const [sameLifeSurfaceOutcome, setSameLifeSurfaceOutcome] =
    useState<XinmaiSameLifeSurfaceOutcome | null>(null);

  useEffect(
    () =>
      subscribeToXinmaiLivedGrowthRecoveryRevision(() => {
        setGrowthRevision((revision) => revision + 1);
      }),
    [],
  );

  useEffect(() => {
    let disposed = false;
    if (identityRecovery.status !== "READY") {
      setBodyImprintDecision(
        XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
      );
      return () => {
        disposed = true;
      };
    }
    void readXinmaiCanonicalBodyImprintRecovery({
      identityReferences: identityRecovery.identityReferences,
      visualContinuity: identityRecovery.visualContinuity,
      focusedFormationReferenceId:
        routeState?.formationReferenceId ?? null,
    }).then((decision) => {
      if (!disposed) setBodyImprintDecision(decision);
    });
    return () => {
      disposed = true;
    };
  }, [
    growthRevision,
    identityRecovery,
    routeState?.formationReferenceId,
  ]);

  const canonicalImprints =
    bodyImprintDecision.status === "IMPRINT_AVAILABLE"
      ? bodyImprintDecision.imprints
      : Object.freeze([]);
  const selectedImprint =
    canonicalImprints.find(
      (imprint) =>
        imprint.imprintReferenceId === selectedImprintReferenceId,
    ) ?? null;
  const archiveSourceRenderPlanReferenceId = useMemo(
    () =>
      identityRecovery.status === "READY"
        ? createIsolatedWebGLPrototypeRenderPlanReference(
            identityRecovery.visualContinuity.consumerSourceResult
              .consumerSource.renderPlanResult.plan,
          ).referenceId
        : "",
    [identityRecovery],
  );
  const archiveSameLifeContinuityProjection = useMemo(
    () =>
      resolveXinmaiReturningSameLifeContinuityPresentation({
        consumerSurface: "ARCHIVE",
        identityStatus:
          identityRecovery.status === "READY" ? "READY" : "UNAVAILABLE",
        sourceReferenceId:
          identityRecovery.status === "READY"
            ? identityRecovery.identityReferences.sourceReferenceId
            : "",
        sourceRenderPlanReferenceId: archiveSourceRenderPlanReferenceId,
        canonicalBodyImprintDecision: bodyImprintDecision,
        selectedImprintReferenceId,
      }),
    [
      archiveSourceRenderPlanReferenceId,
      bodyImprintDecision,
      identityRecovery,
      selectedImprintReferenceId,
    ],
  );
  const archiveSameLifeSceneProjection = useMemo(
    () =>
      applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy(
        archiveSameLifeContinuityProjection,
      ),
    [archiveSameLifeContinuityProjection],
  );
  const accessibleSemanticMirror = useMemo(
    () =>
      resolveXinmaiSameLifeAccessibleSemanticMirror({
        canonicalDecision: bodyImprintDecision,
        surfaceOutcome: sameLifeSurfaceOutcome,
      }),
    [bodyImprintDecision, sameLifeSurfaceOutcome],
  );

  return (
    <main
      className="gy-same-life-archive"
      aria-label="生命留下的真实成长"
      data-personality-ring-page="CANONICAL_BODY_IMPRINT_WITH_LEGACY_HISTORY"
      data-body-imprint-authority={bodyImprintDecision.status}
      data-body-imprint-recovery-owner="XINMAI_CANONICAL_BODY_IMPRINT_RECOVERY_ADAPTER"
      data-body-imprint-projector="XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_V1"
      data-canonical-body-reference={
        bodyImprintDecision.bodyReferenceId ?? "NONE"
      }
      data-canonical-body-imprint-count={canonicalImprints.length}
      data-personality-ring-source="LEGACY_HISTORY_READ_ONLY"
      data-personality-ring-entry-count={legacyHistory.entries.length}
      data-personality-ring-body-authority="FORBIDDEN"
      data-personality-ring-created-at-role="LEGACY_HISTORY_LABEL_ONLY"
      data-personality-ring-crystal-copy-role="TEXT_ONLY_NO_BODY_AUTHORITY"
      data-archive-mirror-projection-role="ARCHIVE_SYNC_ONLY"
      data-legacy-r7-archive="ISOLATED_OUTSIDE_CANONICAL_BODY"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#020306",
        color: "rgba(255,239,196,0.94)",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {identityRecovery.status === "READY" ? (
          <Suspense fallback={null}>
            <RealityLifeUniverseCanvas
              sameLifeSurfaceConsumer="ARCHIVE"
              visualContinuity={identityRecovery.visualContinuity}
              canonicalBodyImprintDecision={bodyImprintDecision}
              onSameLifeSurfaceOutcome={setSameLifeSurfaceOutcome}
              sameLifeContinuityProjection={
                archiveSameLifeSceneProjection
              }
            />
          </Suspense>
        ) : (
          <span
            data-personality-ring-fallback="CONTINUOUS_SCENE_SAFE_WITHHELD"
          />
        )}
      </div>

      <header
        className="gy-same-life-archive__header"
        style={{
          position: "absolute",
          zIndex: 3,
          top: "max(20px, env(safe-area-inset-top))",
          right: 20,
          left: 20,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            justifySelf: "start",
            border: 0,
            padding: "7px 0",
            background: "transparent",
            color: "rgba(236,222,188,0.78)",
            fontSize: 10,
          }}
        >
          返回
        </button>
        <span style={{ color: "rgba(220,205,169,0.58)", fontSize: 10 }}>
          生命留痕
        </span>
        <span />
      </header>

      <section
        className="gy-same-life-archive__content"
        aria-live="off"
        data-canonical-imprint-presentation={bodyImprintDecision.status}
        style={{
          position: "absolute",
          zIndex: 3,
          right: 26,
          bottom: "max(40px, calc(24px + env(safe-area-inset-bottom)))",
          left: 26,
          display: "grid",
          justifyItems: "center",
          gap: 12,
          textAlign: "center",
          textShadow: "0 0 22px rgba(2,3,6,0.96)",
        }}
      >
        <strong style={{ maxWidth: 320, fontSize: 15, lineHeight: 1.7 }}>
          {bodyImprintDecision.status === "IMPRINT_AVAILABLE"
            ? `同一生命已经留下 ${canonicalImprints.length} 道正式成长留痕。`
            : bodyImprintDecision.status === "NO_CANONICAL_IMPRINT"
              ? legacyHistory.entries.length > 0
                ? "旧的历史记录仍被保留，但不会被冒充为身体留痕。"
                : "真实成长发生后，同一生命会在这里留下痕迹。"
              : "身体留痕暂时无法确认；既有成长资产不会因此丢失。"}
        </strong>

        {accessibleSemanticMirror.items.length > 0 ? (
          <ol
            aria-label="正式身体留痕"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {accessibleSemanticMirror.items.map((item) => {
              const imprint = canonicalImprints.find(
                (candidate) =>
                  candidate.imprintReferenceId === item.imprintReferenceId,
              );
              if (!imprint) return null;
              return <li key={item.imprintReferenceId}>
              <button
                type="button"
                aria-label={item.accessibleName}
                aria-pressed={
                  selectedImprintReferenceId === item.imprintReferenceId
                }
                data-imprint-reference={imprint.imprintReferenceId}
                data-formation-reference={imprint.formationReferenceId}
                onClick={() =>
                  setSelectedImprintReferenceId(
                    imprint.imprintReferenceId,
                  )
                }
                style={{
                  border: "1px solid rgba(232,200,138,0.2)",
                  borderRadius: 999,
                  padding: "7px 10px",
                  background:
                    selectedImprintReferenceId === imprint.imprintReferenceId
                      ? "rgba(232,200,138,0.14)"
                      : "rgba(2,3,6,0.38)",
                  color: "rgba(255,239,196,0.82)",
                  fontSize: 10,
                }}
              >
                {item.visibleLabel}
              </button>
              </li>;
            })}
          </ol>
        ) : null}

        {selectedImprint ? (
          <small
            data-selected-imprint-reference={
              selectedImprint.imprintReferenceId
            }
            data-selected-crystal-reference={
              selectedImprint.crystalReferenceId
            }
            style={{ color: "rgba(220,205,169,0.6)", lineHeight: 1.6 }}
          >
            这道留痕来自一次已经确认的现实回应，并属于同一生命身体。
          </small>
        ) : null}
      </section>
    </main>
  );
}
