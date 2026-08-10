import { useCallback, useEffect, useMemo, useState } from "react";
import { resolveCurrentHexagramFormation } from "../services/guanyaoCurrentHexagramFormationAdapter";
import { resolveChoiceActionRoutes } from "../services/xinmaiChoiceActionRouteResolver";
import { createChoiceRouteFormationSourceSnapshot } from "../services/xinmaiChoiceActionRouteGrowthProjection";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { setPersonalityRingLiteAcceptanceWriteFailure } from "../services/guanyaoPersonalityRingLitePersistenceAdapter";
import { formCrystalFromEligibility } from "../services/xinmaiCrystalFormationConsumer";
import {
  commitChoiceActionIntention,
} from "../services/xinmaiChoiceActionIntentionController";
import {
  readChoiceGrowthTerminalSummary,
} from "../services/xinmaiChoiceGrowthTerminalSummaryAdapter";
import { subscribeToXinmaiLivedGrowthRecoveryRevision } from "../services/xinmaiLivedGrowthRecoveryRevisionObserver";
import {
  readXinmaiGravityObservationContinuityState,
  readXinmaiLivedGrowthCanonicalState,
} from "../services/xinmaiLivedGrowthTransactionalStore";
import {
  establishRecognizedGravityObservationForAcceptance,
  simulateXinmaiLivedGrowthLegacyWriterForAcceptance,
} from "../services/xinmaiLivedGrowthAcceptancePersistenceAdapter";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import type { XinmaiLivedGrowthEnvelope } from "../types/xinmaiLivedGrowthRecovery";
import type {
  ChoiceGrowthTerminalSummary,
} from "../types/xinmaiChoicePresentationReadiness";

const READY_INPUT = Object.freeze({
  status: "READY" as const,
  readiness: "READY_FOR_CURRENT_HEXAGRAM" as const,
  hasPressureContext: true as const,
  selectedPressureSeedContext: Object.freeze({
    selectedPressureSeedId: "lived-growth-browser-seed",
    pressureField: "POWER" as const,
    pressureNature: "EVALUATION" as const,
    surface: "现实靠近",
    shell: "担心失败",
    scenarioDomain: "BOSS" as const,
    pressureIntensity: 80,
    primaryRelation: "BOSS" as const,
  }),
  motherCodeProfile: Object.freeze({
    motherCodeId: "mother-dui",
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑" as const,
    baseForce: "连接",
    defaultReactionPattern: "先回应",
    pressureSensitiveZones: ["评价"],
    defenseTendency: "维持连接",
    behaviorBias: "快速回应",
  }),
  motherTrigram: "兑" as const,
});

const readScenario = () =>
  new URLSearchParams(window.location.search).get("scenario")?.trim() ||
  "primary";

type AcceptancePersistenceFault =
  | "NONE"
  | "OPEN_FAILURE"
  | "OPEN_BLOCKED"
  | "TRANSACTION_ABORT"
  | "CONNECTION_CLOSED"
  | "QUOTA"
  | "PROJECTION"
  | "LEGACY_WRITER"
  | "LEGACY_IMPORT"
  | "LEGACY_IMPORT_CONFLICT";

const readPersistenceFault = (): AcceptancePersistenceFault => {
  const fault = new URLSearchParams(window.location.search)
    .get("fault")
    ?.trim()
    .toUpperCase();
  return fault === "OPEN_FAILURE" ||
    fault === "OPEN_BLOCKED" ||
    fault === "TRANSACTION_ABORT" ||
    fault === "CONNECTION_CLOSED" ||
    fault === "QUOTA" ||
    fault === "PROJECTION" ||
    fault === "LEGACY_WRITER" ||
    fault === "LEGACY_IMPORT" ||
    fault === "LEGACY_IMPORT_CONFLICT"
    ? fault
    : "NONE";
};

export function XinmaiLivedGrowthAcceptancePage() {
  const scenario = useMemo(readScenario, []);
  const persistenceFault = useMemo(readPersistenceFault, []);
  const reducedMotion = useMemo(
    () =>
      new URLSearchParams(window.location.search).get("motion") === "reduce",
    [],
  );
  const identityReferences = useMemo<RealityEncounterIdentityReferences>(
    () =>
      Object.freeze({
        sourceReferenceId: `acceptance-source:${scenario}`,
        starBeastIdentityReferenceId: `acceptance-beast:${scenario}`,
        mansionCoordinateReferenceId: `acceptance-mansion:${scenario}`,
      }),
    [scenario],
  );
  const growthSummaryRequest = useMemo(
    () =>
      Object.freeze({
        identityReferences,
        sourceEncounterCycleId:
          `acceptance-source-encounter:${scenario}`,
        gravityCycleId: `acceptance-gravity:${scenario}`,
        gravityObservationReferenceId:
          `acceptance-gravity-observation:${scenario}`,
      }),
    [identityReferences, scenario],
  );
  const [canonicalEnvelope, setCanonicalEnvelope] =
    useState<XinmaiLivedGrowthEnvelope | null>(null);
  const [growthTerminalSummary, setGrowthTerminalSummary] =
    useState<ChoiceGrowthTerminalSummary | null>(null);
  const [observationEvidence, setObservationEvidence] = useState<
    Readonly<{
      checkpoint: string;
      lifecycle: string;
      reference: string;
    }> | null
  >(null);
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  useEffect(() => {
    if (
      persistenceFault === "NONE" ||
      persistenceFault === "LEGACY_WRITER"
    ) {
      return;
    }
    if (persistenceFault === "LEGACY_IMPORT") {
      simulateXinmaiLivedGrowthLegacyWriterForAcceptance();
      return;
    }
    if (persistenceFault === "LEGACY_IMPORT_CONFLICT") {
      simulateXinmaiLivedGrowthLegacyWriterForAcceptance();
      queueMicrotask(() =>
        simulateXinmaiLivedGrowthLegacyWriterForAcceptance(
          "CONFLICT",
        ),
      );
      return;
    }
    if (persistenceFault === "PROJECTION") {
      setPersonalityRingLiteAcceptanceWriteFailure(true);
      return () =>
        setPersonalityRingLiteAcceptanceWriteFailure(false);
    }
    const factory = window.indexedDB;
    const originalOpen = factory.open;
    const originalTransaction = IDBDatabase.prototype.transaction;
    const originalPut = IDBObjectStore.prototype.put;
    if (persistenceFault === "OPEN_FAILURE") {
      factory.open = (() => {
        throw new DOMException(
          "Acceptance open failure",
          "InvalidStateError",
        );
      }) as typeof factory.open;
    } else if (persistenceFault === "OPEN_BLOCKED") {
      factory.open = (() => {
        const request: Partial<IDBOpenDBRequest> = {};
        queueMicrotask(() => {
          const callback = request.onblocked;
          if (callback) {
            callback.call(
              request as IDBOpenDBRequest,
              new Event("blocked") as IDBVersionChangeEvent,
            );
          }
        });
        return request as IDBOpenDBRequest;
      }) as typeof factory.open;
    } else if (persistenceFault === "CONNECTION_CLOSED") {
      IDBDatabase.prototype.transaction = (() => {
        throw new DOMException(
          "Acceptance connection closed",
          "InvalidStateError",
        );
      }) as typeof IDBDatabase.prototype.transaction;
    } else if (persistenceFault === "TRANSACTION_ABORT") {
      IDBDatabase.prototype.transaction = function (
        ...args: Parameters<IDBDatabase["transaction"]>
      ) {
        const transaction = originalTransaction.apply(this, args);
        if (args[1] === "readwrite") {
          queueMicrotask(() => {
            try {
              transaction.abort();
            } catch {
              // The transaction may already have completed.
            }
          });
        }
        return transaction;
      };
    } else if (persistenceFault === "QUOTA") {
      IDBObjectStore.prototype.put = (() => {
        throw new DOMException(
          "Acceptance quota failure",
          "QuotaExceededError",
        );
      }) as typeof IDBObjectStore.prototype.put;
    }
    return () => {
      factory.open = originalOpen;
      IDBDatabase.prototype.transaction = originalTransaction;
      IDBObjectStore.prototype.put = originalPut;
    };
  }, [persistenceFault]);
  const refreshAuthority = useCallback(() => {
    void Promise.all([
      readXinmaiLivedGrowthCanonicalState(),
      readXinmaiGravityObservationContinuityState(
        `CURRENT:${identityReferences.sourceReferenceId}`,
      ),
      readChoiceGrowthTerminalSummary(growthSummaryRequest),
    ]).then(([canonical, observation, terminalSummary]) => {
      setCanonicalEnvelope(
        canonical.status === "FOUND" ? canonical.envelope : null,
      );
      setGrowthTerminalSummary(terminalSummary);
      setObservationEvidence(
        observation.status === "FOUND" &&
          observation.record !== null
          ? Object.freeze({
              checkpoint: observation.record.checkpointState,
              lifecycle: observation.record.lifecycleState,
              reference:
                observation.record.gravityObservationReferenceId,
            })
          : null,
      );
      setRevision((current) => current + 1);
    });
  }, [growthSummaryRequest, identityReferences]);

  useEffect(() => {
    refreshAuthority();
  }, [refreshAuthority]);

  useEffect(
    () =>
      subscribeToXinmaiLivedGrowthRecoveryRevision(() => {
        refreshAuthority();
      }),
    [refreshAuthority],
  );

  const ring = readPersonalityRingLite();
  const matchingReceipts =
    canonicalEnvelope
      ? canonicalEnvelope.formationReceipts.filter(
          (receipt) =>
            receipt.identityReferences.sourceReferenceId ===
            identityReferences.sourceReferenceId,
        )
      : [];
  const matchingFacts =
    canonicalEnvelope
      ? canonicalEnvelope.livedResponseFacts.filter(
          (fact) =>
            fact.identityReferences.sourceReferenceId ===
            identityReferences.sourceReferenceId,
        )
      : [];
  const matchingChoices =
    canonicalEnvelope
      ? canonicalEnvelope.choiceActionIntentions.filter(
          (choice) =>
            choice.identityReferences.sourceReferenceId ===
              identityReferences.sourceReferenceId,
        )
      : [];
  const matchingEligibilities =
    canonicalEnvelope
      ? canonicalEnvelope.crystalEligibilities.filter(
          (eligibility) =>
            eligibility.identityReferences.sourceReferenceId ===
            identityReferences.sourceReferenceId,
        )
      : [];
  const formalEligibility =
    canonicalEnvelope
      ? canonicalEnvelope.crystalEligibilities.find(
          (eligibility) =>
            eligibility.identityReferences.sourceReferenceId ===
              identityReferences.sourceReferenceId &&
            (eligibility.state === "ELIGIBLE" ||
              eligibility.state === "FORMATION_PENDING" ||
              (eligibility.state === "CONSUMED" &&
                matchingReceipts.some(
                  (receipt) =>
                    receipt.crystalEligibilityReferenceId ===
                      eligibility.crystalEligibilityReferenceId &&
                    receipt.projection !== "PROJECTED",
                ))),
        ) ?? null
      : null;

  const prepare = async () => {
    const formation = resolveCurrentHexagramFormation(READY_INPUT);
    const {
      sourceEncounterCycleId,
      gravityCycleId,
      gravityObservationReferenceId,
    } = growthSummaryRequest;
    const observationReady =
      await establishRecognizedGravityObservationForAcceptance({
        identityReferences,
        sourceEncounterCycleId,
        gravityCycleId,
        gravityObservationReferenceId,
      });
    if (!observationReady) {
      setFeedback("验收观察事实没有被正式保存。");
      return;
    }
    const actionRouteResolution = resolveChoiceActionRoutes(
      Object.freeze({
        identityReferences,
        sourceEncounterCycleId,
        gravityCycleId,
        gravityObservationReferenceId,
        observationCheckpointRevision: 2,
        observationStatus: "OBSERVATION_RECOGNIZED" as const,
        pressure: Object.freeze({
          selectedPressureSeedId:
            READY_INPUT.selectedPressureSeedContext
              .selectedPressureSeedId,
          candidateReferenceId:
            `acceptance-pressure-candidate:${scenario}`,
          pressureField:
            READY_INPUT.selectedPressureSeedContext.pressureField,
          pressureNature:
            READY_INPUT.selectedPressureSeedContext.pressureNature,
        }),
        motherCode: Object.freeze({
          motherCodeProfileId:
            READY_INPUT.motherCodeProfile.motherCodeId,
          motherCodeDefinitionId:
            READY_INPUT.motherCodeProfile.motherCodeId,
          lowerTrigram: READY_INPUT.motherTrigram,
        }),
      }),
    );
    if (actionRouteResolution.status !== "READY") {
      setFeedback("验收行动路线尚未准备完成。");
      return;
    }
    const actionRouteCandidate =
      actionRouteResolution.candidates[0] ?? null;
    const formationSourceSnapshot =
      actionRouteCandidate
        ? createChoiceRouteFormationSourceSnapshot({
            candidate: actionRouteCandidate,
            formation,
            completedNodeCount: 6,
            assetCompletionState: "READY_TO_CRYSTALLIZE",
          })
        : null;
    if (!actionRouteCandidate || !formationSourceSnapshot) {
      setFeedback("验收行动路线尚未准备完成。");
      return;
    }
    const committed = await commitChoiceActionIntention({
      identityReferences,
      sourceEncounterCycleId,
      gravityCycleId,
      gravityObservationReferenceId,
      expectedObservationCheckpointRevision: 2,
      observationProof: Object.freeze({
        status: "OBSERVATION_RECOGNIZED" as const,
        gravityObservationReferenceId,
        checkpointRevision: 2,
      }),
      actionRouteResolverInput:
        actionRouteResolution.resolverInput,
      selectedActionRouteReferenceId:
        actionRouteCandidate.actionRouteReferenceId,
      formationSourceSnapshot,
      sixDimensionCompletionReceipt: null,
    });
    if (
      committed.status !== "COMMITTED" &&
      committed.status !== "ALREADY_COMMITTED"
    ) {
      setFeedback("行动意愿没有被正式保存。");
      return;
    }
    setFeedback(null);
    refreshAuthority();
  };

  return (
    <main
      data-testid="xinmai-lived-growth-browser-acceptance"
      data-development-only="true"
      data-scenario={scenario}
      data-persistence-fault={persistenceFault}
      data-motion-presentation={reducedMotion ? "STATIC" : "MOTION_ALLOWED"}
      data-revision={revision}
      style={{
        minHeight: "100dvh",
        boxSizing: "border-box",
        padding: 32,
        display: "grid",
        alignContent: "start",
        justifyItems: "center",
        gap: 20,
        background: "#020306",
        color: "#f3ead8",
      }}
    >
      <h1>真实行动回访验收</h1>
      <p>场景：{scenario}</p>
      <button type="button" onClick={prepare}>
        准备真实行动回访
      </button>
      <button
        type="button"
        onClick={refreshAuthority}
      >
        刷新权威状态
      </button>
      {persistenceFault === "LEGACY_WRITER" ? (
        <button
          type="button"
          onClick={() => {
            const written =
              simulateXinmaiLivedGrowthLegacyWriterForAcceptance();
            setFeedback(
              written
                ? "已模拟旧 V1 写入。"
                : "旧 V1 写入模拟不可用。",
            );
          }}
        >
          模拟旧 V1 写入
        </button>
      ) : null}
      {formalEligibility ? (
        <button
          type="button"
          onClick={async () => {
            const result = await formCrystalFromEligibility({
              crystalEligibilityReferenceId:
                formalEligibility.crystalEligibilityReferenceId,
              expectedEligibilityRevision:
                formalEligibility.eligibilityRevision,
              identityReferences,
            });
            setFeedback(
              result.status === "SAFE_WITHHELD"
                ? `SAFE_WITHHELD：${result.reason}`
                : `Receipt：${result.receipt.formationReferenceId}`,
            );
            refreshAuthority();
          }}
        >
          并发消费正式资格
        </button>
      ) : null}
      {feedback ? <p role="alert">{feedback}</p> : null}
      <section aria-label="权威状态">
        <p data-testid="choice-count">
          Choice：{matchingChoices.length}
        </p>
        <p data-testid="fact-count">Fact：{matchingFacts.length}</p>
        <p data-testid="eligibility-count">
          Eligibility：{matchingEligibilities.length}
        </p>
        <p data-testid="receipt-count">
          Receipt：{matchingReceipts.length}
        </p>
        <p data-testid="ring-count">Archive：{ring.entries.length}</p>
        <p data-testid="projection-state">
          Projection：
          {matchingReceipts[0]?.projection ?? "NONE"}
        </p>
        <p data-testid="recovery-state">
          Recovery：{canonicalEnvelope ? "FOUND" : "SAFE_WITHHELD"}
        </p>
        <p data-testid="choice-terminal-summary">
          Choice Summary：
          {growthTerminalSummary?.state ?? "PENDING"}
        </p>
        <p data-testid="observation-checkpoint">
          Observation：
          {observationEvidence?.checkpoint ?? "NONE"}
        </p>
        <p data-testid="observation-lifecycle">
          Observation Lifecycle：
          {observationEvidence?.lifecycle ?? "NONE"}
        </p>
        <p data-testid="observation-reference">
          Observation Reference：
          {observationEvidence?.reference ?? "NONE"}
        </p>
      </section>
    </main>
  );
}
