import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSession, setMotherCodeResult } from "../services/sessionService";

function readFragmentText(fragment: any) {
  return fragment?.fragmentLine ?? fragment?.text ?? fragment?.title ?? "未记录";
}

function readForceText(forceResult: any, selectedForceName?: string | null) {
  if (selectedForceName) return selectedForceName;
  if (!forceResult) return "未记录";
  return [forceResult.symbol, forceResult.forceName, forceResult.archetype].filter(Boolean).join(" · ") || forceResult.forceKey || "未记录";
}

export function MotherCodePage() {
  const navigate = useNavigate();
  const session = getSession();
  const motherCode = useMemo(() => {
    const currentMotherCode = session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode ?? buildMotherCodeResult(session);
    setMotherCodeResult(currentMotherCode);
    return currentMotherCode;
  }, [session]);
  const chronoText = session.yuanCode ?? session.chronoCode
    ? `${(session.yuanCode ?? session.chronoCode)?.frontName ?? (session.yuanCode ?? session.chronoCode)?.userFacingName ?? (session.yuanCode ?? session.chronoCode)?.personalitySourceCode}｜${(session.yuanCode ?? session.chronoCode)?.sourceSeal ?? (session.yuanCode ?? session.chronoCode)?.shortSeal}`
    : session.chronoPrototypeCard
    ? `${session.chronoPrototypeCard.trigramSymbol} ${session.chronoPrototypeCard.trigramName}｜${session.chronoPrototypeCard.archetypeName}`
    : session.chronoProfile
      ? `${session.chronoProfile.birthDate}｜${session.chronoProfile.lifeStageLabel}`
      : "未记录";
  const forceText = readForceText(session.forceReading ?? session.forceProfile, session.selectedForceName);
  const sceneText =
    session.selectedSceneSeed?.seedLine ??
    session.realitySeed?.seedLine ??
    session.selectedSceneSlice?.flashLine ??
    session.realitySeed?.title ??
    "未记录";

  return (
    <GuanyaoShell className="gy-delivery-shell" density="compact">
      <section className="gy-delivery-stage gy-causal-line gy-causal-line-press gyFadeRise">
        <div className="gy-result-hero">
          <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
            观爻母码｜64
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            母码已生成
          </GuanyaoText>
          <GuanyaoText className="gy-migration-verdict" size="body" tone="muted">
            母码不是最终结果，而是你的人格源代码与现实种子对撞后形成的行为母型。
          </GuanyaoText>
        </div>

        <div className="gy-result-frame">
          <div className="gy-result-code gy-result-code--primary">
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              母码
            </GuanyaoText>
            <GuanyaoText size="body" tone="gold">
              {motherCode.code64} {motherCode.name}｜{motherCode.title}
            </GuanyaoText>
          </div>
          <div>
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              压印
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              {motherCode.shortSeal}
            </GuanyaoText>
          </div>
          <div>
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              人格场域
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              {motherCode.gravityField}
            </GuanyaoText>
          </div>
        </div>

        <div className="gy-delivery-copy gy-delivery-copy--compact gy-result-core-copy">
          {[
            `时序原型：${chronoText}`,
            `人格映照：${readFragmentText(session.selectedFragment)}`,
            `原力定格：${forceText}`,
            `现实种子：${sceneText}`,
          ].map((line) => (
            <GuanyaoText key={line} size="eyebrow" tone="faint">
              {line}
            </GuanyaoText>
          ))}
        </div>

        <div className="gy-delivery-copy gy-delivery-copy--compact gy-result-core-copy">
          <GuanyaoText size="body" tone="muted">
            本次母码已记录，接下来进入六爻，观察它如何发生变化。
          </GuanyaoText>
          <GuanyaoText size="body" tone="muted">
            六爻闭合后，才会压印成本次爻码卡。
          </GuanyaoText>
        </div>

        <div className="gy-delivery-actions">
          <GuanyaoText className="gy-text-instrument gy-mother-record-status" size="body" tone="muted">
            母码已经停在这里，点击后进入六爻推进。
          </GuanyaoText>
          <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-primary" variant="gate" onClick={() => navigate("/gravity")}>
            继续进入六爻推进
          </GuanyaoButton>
        </div>
      </section>
    </GuanyaoShell>
  );
}
