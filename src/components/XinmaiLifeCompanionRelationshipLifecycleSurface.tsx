import type { XinmaiLifeCompanionRelationshipLifecycleResult } from "../services/xinmaiLifeCompanionRelationshipLifecycleResolver";

export function XinmaiLifeCompanionRelationshipLifecycleSurface({
  state,
  onRetry,
}: Readonly<{
  state:
    | Readonly<{ status: "RESOLVING_IDENTITY" | "RECOVERING_RELATIONSHIP" }>
    | XinmaiLifeCompanionRelationshipLifecycleResult;
  onRetry: () => void;
}>) {
  return (
    <section
      className="gy-genesis-production-experience__relationship-activation"
      data-life-companion-lifecycle={state.status}
      aria-label="生命伙伴关系状态"
    >
      {state.status === "RETURNING_COMPANIONSHIP_CONFIRMED" ? (
        <div role="status" aria-live="polite">
          <p>你们已经确认从这里开始同行。</p>
          <strong>同行关系已经恢复，不需要重新寻找或再次确认。</strong>
          <p>之后的表达、称呼和现实旅程仍由你另行决定。</p>
        </div>
      ) : state.status === "RETRYABLE_RECOVERY_BLOCKED" ? (
        <div role="status" aria-live="polite">
          <p>同行关系暂时没有读取完成。</p>
          <p>已有记录不会丢失；读取完成前不会让你重新确认。</p>
          <button type="button" onClick={onRetry}>
            重新读取同行关系
          </button>
        </div>
      ) : state.status === "PROTECTIVE_STOP" ? (
        <div role="status" aria-live="polite">
          <p>这次同行关系暂时无法安全确认。</p>
          <p>已有身份与关系记录保持不变；这里不会重新建立关系。</p>
        </div>
      ) : state.status === "SAFE_WITHHELD" ? (
        <div role="status" aria-live="polite">
          <p>同行关系记录仍被保留。</p>
          <p>本次新的关系体验暂时停用；这里不会重新确认或进入下一阶段。</p>
        </div>
      ) : (
        <p role="status" aria-live="polite" aria-busy="true">
          {state.status === "RESOLVING_IDENTITY"
            ? "正在确认这次生命身份。"
            : "正在读取已经建立的同行关系。"}
        </p>
      )}
    </section>
  );
}
