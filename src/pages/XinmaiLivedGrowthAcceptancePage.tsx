import { useMemo, useState } from "react";
import { XinmaiLivedResponseReturnSurface } from "../components/XinmaiLivedResponseReturnSurface";
import { resolveChangeExperienceRuntimeRoute } from "../services/changeExperienceRuntimeRoutingService";
import { resolveChangeExperienceRuntimeSmokeRevisionAction } from "../services/fixtures/changeExperienceRuntimeSmokeFixtures";
import { resolveCurrentHexagramFormation } from "../services/guanyaoCurrentHexagramFormationAdapter";
import { resolveDynamicsMigrationImpact } from "../services/guanyaoDynamicsMigrationImpactAdapter";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { formCrystalFromEligibility } from "../services/xinmaiCrystalFormationConsumer";
import {
  bindChoiceActionIntentionToRealityEncounter,
  commitChoiceActionIntention,
  readOutstandingChoiceActionIntentions,
} from "../services/xinmaiChoiceActionIntentionController";
import { readXinmaiLivedGrowthRecoveryCandidate } from "../services/xinmaiLivedGrowthRecoveryPersistenceAdapter";
import type { ChoiceActionIntention } from "../types/xinmaiChoiceActionIntention";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";

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

export function XinmaiLivedGrowthAcceptancePage() {
  const scenario = useMemo(readScenario, []);
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
  const [intention, setIntention] =
    useState<ChoiceActionIntention | null>(() =>
      readOutstandingChoiceActionIntentions(identityReferences)[0] ?? null,
    );
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const recovery = readXinmaiLivedGrowthRecoveryCandidate();
  const ring = readPersonalityRingLite();
  const matchingReceipts =
    recovery.status === "FOUND"
      ? recovery.envelope.formationReceipts.filter(
          (receipt) =>
            receipt.identityReferences.sourceReferenceId ===
            identityReferences.sourceReferenceId,
        )
      : [];
  const formalEligibility =
    recovery.status === "FOUND"
      ? recovery.envelope.crystalEligibilities.find(
          (eligibility) =>
            eligibility.identityReferences.sourceReferenceId ===
              identityReferences.sourceReferenceId &&
            (eligibility.state === "ELIGIBLE" ||
              eligibility.state === "FORMATION_PENDING"),
        ) ?? null
      : null;

  const prepare = () => {
    const formation = resolveCurrentHexagramFormation(READY_INPUT);
    const action =
      resolveChangeExperienceRuntimeSmokeRevisionAction("action-five");
    const route = resolveChangeExperienceRuntimeRoute(
      action,
      "action-five",
    );
    const migrationImpact = resolveDynamicsMigrationImpact({
      action,
      changeExperienceRoute: route,
    });
    if (!formation || !action || !migrationImpact) {
      setFeedback("验收事实尚未准备完成。");
      return;
    }
    const committed = commitChoiceActionIntention({
      identityReferences,
      sourceEncounterCycleId: `acceptance-source-encounter:${scenario}`,
      gravityCycleId: `acceptance-gravity:${scenario}`,
      gravityObservationReferenceId:
        `acceptance-gravity-observation:${scenario}`,
      actionSummary: action.actionLine,
      formationSourceSnapshot: Object.freeze({
        formation,
        migrationImpact,
        completedNodeCount: 6,
        primaryDimension: "action",
        action,
        assetCompletionState: "READY_TO_CRYSTALLIZE" as const,
      }),
    });
    if (committed.status !== "COMMITTED") {
      setFeedback("行动意愿没有被正式保存。");
      return;
    }
    const bound = bindChoiceActionIntentionToRealityEncounter({
      choiceActionIntentionReferenceId:
        committed.intention.choiceActionIntentionReferenceId,
      targetEncounterCycleId: `acceptance-target-encounter:${scenario}`,
      identityReferences,
    });
    if (!bound) {
      setFeedback("本轮 Reality 来源没有完成绑定。");
      return;
    }
    setFeedback(null);
    setIntention(bound);
    setRevision((current) => current + 1);
  };

  return (
    <main
      data-testid="xinmai-lived-growth-browser-acceptance"
      data-development-only="true"
      data-scenario={scenario}
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
        onClick={() => setRevision((current) => current + 1)}
      >
        刷新权威状态
      </button>
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
            setRevision((current) => current + 1);
          }}
        >
          并发消费正式资格
        </button>
      ) : null}
      {intention ? (
        <XinmaiLivedResponseReturnSurface
          identityReferences={identityReferences}
          intentions={Object.freeze([intention])}
          reducedMotion={reducedMotion}
          onResolved={() => {
            setIntention(null);
            setRevision((current) => current + 1);
          }}
        />
      ) : null}
      {feedback ? <p role="alert">{feedback}</p> : null}
      <section aria-label="权威状态">
        <p data-testid="receipt-count">
          Receipt：{matchingReceipts.length}
        </p>
        <p data-testid="ring-count">Archive：{ring.entries.length}</p>
        <p data-testid="recovery-state">
          Recovery：{recovery.status}
        </p>
      </section>
    </main>
  );
}
