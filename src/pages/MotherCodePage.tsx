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

function compactLabel(value: unknown, fallback: string) {
  if (!value) return fallback;
  const text = Array.isArray(value) ? value.find(Boolean) : String(value);
  if (!text) return fallback;
  return String(text)
    .replace(/[｜|/].*$/, "")
    .replace(/[，。,.、\s].*$/, "")
    .slice(0, 6) || fallback;
}

function getMotherTypeName(motherCode: any) {
  const source = `${motherCode?.name ?? ""}${motherCode?.hexagramName ?? ""}${motherCode?.title ?? ""}`;
  if (source.includes("艮") || source.includes("停")) return "惯性制动型";
  if (source.includes("震") || source.includes("动")) return "压力行动型";
  if (source.includes("乾") || source.includes("创")) return "高压开创型";
  if (source.includes("坤") || source.includes("承")) return "持续承担型";
  if (source.includes("坎") || source.includes("陷") || source.includes("低")) return "深层防御型";
  if (source.includes("离") || source.includes("显")) return "外显燃烧型";
  if (source.includes("巽") || source.includes("渗")) return "柔性适应型";
  if (source.includes("兑") || source.includes("表达")) return "关系外放型";
  if (source.includes("夬") || source.includes("决")) return "临界决断型";
  if (source.includes("噬嗑") || source.includes("硬骨")) return "硬骨咬合型";
  return "行为惯性母型";
}

function getForceLabel(session: any) {
  const force = session.forceReading ?? session.forceProfile;
  return compactLabel(
    session.selectedForceName ??
      force?.archetype ??
      force?.forceName ??
      force?.forceKey,
    "原力牵引",
  );
}

function getMotherSignature(motherCode: any) {
  const source = `${motherCode?.code64 ?? ""}${motherCode?.name ?? ""}${motherCode?.hexagramName ?? ""}${motherCode?.title ?? ""}`;

  if (source.includes("043") || source.includes("夬") || source.includes("决")) {
    return {
      field: "拉扯已经结束，惯性正在把你推向一次明确切断。",
      dimensions: ["逼近临界", "忍到决口", "必须表态", "边界破裂"],
    };
  }

  if (source.includes("052") || source.includes("艮") || source.includes("停")) {
    return {
      field: "你不是冷静下来，而是已经把自己停在不敢往前的位置。",
      dimensions: ["被迫停住", "原地冻结", "收紧动作", "问题逼近"],
    };
  }

  if (source.includes("029") || source.includes("坎") || source.includes("低")) {
    return {
      field: "你不是看不见危险，而是先把自己沉到别人够不到的地方。",
      dimensions: ["压力下沉", "沉默防御", "反复确认", "暗处逼近"],
    };
  }

  if (source.includes("021") || source.includes("噬嗑") || source.includes("硬骨")) {
    return {
      field: "真正卡住你的不是外部压力，而是那块迟迟没有咬开的硬骨。",
      dimensions: ["硬点显形", "迟迟不咬", "必须处理", "阻力成形"],
    };
  }

  return {
    field: "本次行为母型已经形成，惯性正在等待展开。",
    dimensions: ["时序压迫", "惯性接管", "原力牵引", "现实逼近"],
  };
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
  const motherTypeName = getMotherTypeName(motherCode);
  const motherSignature = getMotherSignature(motherCode);
  const dimensionLabels = [
    ["时序惯性", motherSignature.dimensions[0] ?? compactLabel(session.chronoProfile?.pressureField, "时序压迫")],
    ["人格反应", motherSignature.dimensions[1] ?? compactLabel(session.identityFragment?.thematicField ?? session.selectedFragment?.thematicField, "惯性接管")],
    ["原力驱动", motherSignature.dimensions[2] ?? getForceLabel(session)],
    ["现实触发", motherSignature.dimensions[3] ?? compactLabel(session.selectedSceneSeed?.thematicField ?? session.selectedSceneSeed?.title ?? session.realitySeed?.thematicField, "现实逼近")],
  ];
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
            母码已压印
          </GuanyaoText>
          <GuanyaoText className="gy-migration-verdict" size="body" tone="muted">
            这不是最终答案。它只是你本次人格惯性与现实压力相撞后，留下的行为母型。
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
            <GuanyaoText className="gy-mother-type-name" size="body" tone="muted">
              {motherTypeName}
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
              惯性场
            </GuanyaoText>
            <GuanyaoText size="body" tone="muted">
              {motherSignature.field}
            </GuanyaoText>
          </div>

          <div className="gy-mother-dimension-grid">
            {dimensionLabels.map(([label, value]) => (
              <div className="gy-mother-dimension" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <GuanyaoText className="gy-mother-not-fixed" size="eyebrow" tone="faint">
            这不是你是谁，而是你这一次被现实压出来的行为惯性。
          </GuanyaoText>
        </div>

        <details className="gy-mother-source-fold">
          <summary>查看来源痕迹</summary>
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
        </details>

        <div className="gy-delivery-copy gy-delivery-copy--compact gy-result-core-copy gy-mother-record-status">
          <GuanyaoText size="body" tone="muted">
            你的母型已经出现。
            <br />
            但它还没有展开成六爻。
            <br />
            接下来，你会看到这条惯性如何推进、失控、转折，并在第六爻出现一次反本能偏转。
          </GuanyaoText>
        </div>

        <div className="gy-delivery-actions">
          <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-primary" variant="gate" onClick={() => navigate("/gravity")}>
            解锁六爻推演
          </GuanyaoButton>
          <GuanyaoText className="gy-mother-unlock-note" size="eyebrow" tone="faint">
            包含：前五爻惯性推进 / 第六爻反本能选择 / 爻码卡 / 90天行为防御本
          </GuanyaoText>
        </div>
      </section>
    </GuanyaoShell>
  );
}
