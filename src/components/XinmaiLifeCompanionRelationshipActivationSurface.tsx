import { useEffect, useState } from "react";
import { recoverXinmaiLifeCompanionCanonicalRelationship } from "../services/xinmaiLifeCompanionCanonicalRecoveryAdapter";
import { executeXinmaiLifeCompanionRelationshipCommand } from "../services/xinmaiLifeCompanionRelationshipAuthorityController";
import type { XinmaiLifeCompanionFirstEncounterVisualOutcomeResult } from "../services/xinmaiLifeCompanionFirstEncounterVisualOutcomeAdapter";
import type { XinmaiLifeCompanionRecognizedIdentityResult } from "../services/xinmaiLifeCompanionRecognizedIdentityAdapter";
import type { XinmaiLifeCompanionRelationshipCommandResult } from "../types/xinmaiLifeCompanionRelationshipCanonical";

type SurfaceState =
  | "RECOVERING"
  | "READY_TO_CONFIRM"
  | "COMMITTING"
  | "COMPANIONSHIP_CONFIRMED"
  | "RETRYABLE_FAILURE"
  | "PROTECTIVE_STOP";

export function XinmaiLifeCompanionRelationshipActivationSurface({
  identityResult,
  visualOutcomeResult,
}: Readonly<{
  identityResult: XinmaiLifeCompanionRecognizedIdentityResult;
  visualOutcomeResult: XinmaiLifeCompanionFirstEncounterVisualOutcomeResult;
}>) {
  const [surfaceState, setSurfaceState] =
    useState<SurfaceState>("RECOVERING");
  const [commandResult, setCommandResult] =
    useState<XinmaiLifeCompanionRelationshipCommandResult | null>(null);

  useEffect(() => {
    let active = true;
    setCommandResult(null);
    if (identityResult.status !== "READY") {
      setSurfaceState("PROTECTIVE_STOP");
      return () => {
        active = false;
      };
    }
    setSurfaceState("RECOVERING");
    void recoverXinmaiLifeCompanionCanonicalRelationship(
      identityResult.identityReferences,
    ).then((result) => {
      if (!active) return;
      setSurfaceState(
        result.status === "READY"
          ? "COMPANIONSHIP_CONFIRMED"
          : result.status === "NOT_ESTABLISHED" &&
              visualOutcomeResult.status === "READY"
            ? "READY_TO_CONFIRM"
            : result.status === "BLOCKED" &&
                (result.reason === "STORAGE_UNAVAILABLE" ||
                  result.reason === "STORAGE_BLOCKED" ||
                  result.reason === "STORAGE_FAILED" ||
                  result.reason === "TRANSACTION_ABORTED")
              ? "RETRYABLE_FAILURE"
              : "PROTECTIVE_STOP",
      );
    });
    return () => {
      active = false;
    };
  }, [identityResult, visualOutcomeResult.status]);

  const confirmCompanionship = async () => {
    if (
      surfaceState !== "READY_TO_CONFIRM" &&
      surfaceState !== "RETRYABLE_FAILURE"
    ) {
      return;
    }
    if (
      identityResult.status !== "READY" ||
      visualOutcomeResult.status !== "READY"
    ) {
      setSurfaceState("PROTECTIVE_STOP");
      return;
    }
    setSurfaceState("COMMITTING");
    const result = await executeXinmaiLifeCompanionRelationshipCommand({
      type: "CONFIRM_COMPANIONSHIP",
      identityReferences: identityResult.identityReferences,
      responseCycleReferenceId:
        visualOutcomeResult.responseCycleReferenceId,
      visualOutcomeReferenceId:
        visualOutcomeResult.visualOutcomeReferenceId,
      visualOutcome: visualOutcomeResult.visualOutcome,
    });
    setCommandResult(result);
    setSurfaceState(
      result.status === "COMMITTED" || result.status === "ALREADY_COMMITTED"
        ? "COMPANIONSHIP_CONFIRMED"
        : result.retryability === "RETRYABLE"
          ? "RETRYABLE_FAILURE"
          : "PROTECTIVE_STOP",
    );
  };

  return (
    <section
      className="gy-genesis-production-experience__relationship-activation"
      data-life-companion-relationship={surfaceState}
      data-life-companion-command={commandResult?.status ?? "NONE"}
      aria-label="确认生命伙伴关系"
    >
      {surfaceState === "COMPANIONSHIP_CONFIRMED" ? (
        <div role="status" aria-live="polite">
          <p>你已经认出彼此，也确认从这里开始同行。</p>
          <strong>你们的关系已经安全保存。</strong>
          <p>这一阶段已经完成。之后的表达、称呼和现实旅程不会在这里自动开始。</p>
        </div>
      ) : surfaceState === "PROTECTIVE_STOP" ? (
        <div role="status" aria-live="polite">
          <p>这次关系确认暂时不能安全保存。</p>
          <p>已经认出的生命身份仍然保留；这里不会跳过确认，也不会进入下一阶段。</p>
        </div>
      ) : (
        <>
          <p>你已经认出这个远方生命。现在只需要决定：是否从这里开始同行。</p>
          {surfaceState === "RETRYABLE_FAILURE" ? (
            <p role="status">刚才没有保存成功，你可以再次确认。</p>
          ) : null}
          <button
            type="button"
            className="gy-genesis-production-experience__completion-action"
            data-interaction="CONFIRM_COMPANIONSHIP"
            disabled={
              surfaceState === "RECOVERING" ||
              surfaceState === "COMMITTING"
            }
            aria-busy={surfaceState === "COMMITTING"}
            onClick={() => void confirmCompanionship()}
          >
            {surfaceState === "RECOVERING"
              ? "正在确认已有关系"
              : surfaceState === "COMMITTING"
                ? "正在保存同行关系"
                : "确认同行"}
          </button>
        </>
      )}
    </section>
  );
}
