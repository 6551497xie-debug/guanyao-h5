import { getMotherCodeDefinitionByTrigram, toMotherCodeProfile } from "../data/guanyaoMotherCodeRegistry";
import { resolveLifeArchetypeProfileFromMotherCode } from "../services/motherCodeLifeArchetypeSource";
import { resolveLunarTrigramLanding } from "../services/guanyaoLunarTrigramLandingResolver";
import { resolveStarbeastFromBirthDate } from "../services/guanyaoStarbeastEngineService";
import { resolveStarBeastAssetDefinition } from "../services/starBeastAssetArchitectureMapping";
import { resolveStarBeastGenesisExperience } from "../services/starBeastGenesisExperienceMapping";
import { resolveStarBeastGenesisExperiencePresentationReadiness } from "../services/starBeastGenesisExperiencePresentationReadiness";
import type { StarBeastGenesisStage } from "../types/starBeastGenesisExperience";
import "../styles/starbeast-genesis-preview.css";

const DEMO_BIRTH = Object.freeze({
  year: 1979,
  month: 4,
  day: 15,
  hourBranch: "未时" as const,
});

const STAGE_COPY: ReadonlyArray<{
  stage: StarBeastGenesisStage;
  index: string;
  title: string;
  note: string;
}> = Object.freeze([
  { stage: "COSMIC_ORIGIN", index: "01", title: "宇宙来源", note: "生命还没有名字，光已经在时间里出发。" },
  { stage: "ORIGIN_COORDINATE", index: "02", title: "降临坐标", note: "日期与时序成为两条独立的生命坐标。" },
  { stage: "STAR_MANSION_ALIGNMENT", index: "03", title: "星宿定位", note: "出生日期落入二十八宿的星图秩序。" },
  { stage: "FOUR_SYMBOL_FORMATION", index: "04", title: "四象聚合", note: "星宿汇入四象，显出星兽的身份方向。" },
  { stage: "LIFE_ARCHETYPE_INFUSION", index: "05", title: "原力注入", note: "母码带来的生命倾向进入星兽的结构。" },
  { stage: "STAR_BEAST_REVEAL", index: "06", title: "星兽显化", note: "它不是刚刚生成，只是终于被你看见。" },
]);

function buildGenesisPreviewModel() {
  const starbeast = resolveStarbeastFromBirthDate(DEMO_BIRTH);
  if (starbeast.status !== "READY") return null;

  const trigramLanding = resolveLunarTrigramLanding(DEMO_BIRTH);
  const motherDefinition = getMotherCodeDefinitionByTrigram(
    trigramLanding.fieldMapping.trigram,
  );
  if (!motherDefinition) return null;

  const motherProfile = toMotherCodeProfile(motherDefinition);
  const archetypeSource = resolveLifeArchetypeProfileFromMotherCode(motherProfile);
  if (archetypeSource.status !== "READY") return null;

  const assetResult = resolveStarBeastAssetDefinition(
    archetypeSource.lifeArchetypeProfile,
  );
  if (assetResult.status !== "AVAILABLE") return null;

  const originCoordinateReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" as const,
    referenceId: "preview:1979-04-15:wei",
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE" as const,
    birthLocationContextOnly: true as const,
    birthLocationExcludedFromStarBeastDerivation: true as const,
  });
  const mansionReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_MANSION" as const,
    referenceId: `preview:mansion:${starbeast.mansion}`,
    sourceStarbeastDerivationReference: starbeast,
  });
  const fourSymbolReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL" as const,
    referenceId: `preview:four-symbol:${starbeast.fourSymbol}`,
    sourceMansionReference: mansionReference,
  });
  const lifeArchetypeReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_LIFE_ARCHETYPE" as const,
    referenceId: `preview:life-archetype:${archetypeSource.lifeArchetypeProfile.code}`,
    sourceRole: "MOTHER_CODE_PROFILE_ONLY" as const,
    sourceLifeArchetypeProfileReference: archetypeSource.lifeArchetypeProfile,
  });
  const starBeastAssetReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ASSET" as const,
    referenceId: `preview:asset:${assetResult.assetDefinition.assetDefinitionId}`,
    sourceAssetDefinitionReference: assetResult.assetDefinition,
  });
  const reveal = resolveStarBeastGenesisExperience(
    Object.freeze({
      originCoordinateReference,
      mansionReference,
      fourSymbolReference,
      lifeArchetypeReference,
      starBeastAssetReference,
    }),
  );
  if (reveal.status !== "READY") return null;

  const readiness =
    resolveStarBeastGenesisExperiencePresentationReadiness(
      Object.freeze({
        genesisRevealResultReference: reveal,
        genesisExperienceStateReference: reveal.experienceState,
        previewScopeReference: Object.freeze({
          referenceType: "STAR_BEAST_GENESIS_PREVIEW_SCOPE" as const,
          referenceId: "preview:genesis:manual-review",
          scope: "ISOLATED_GENESIS_PREVIEW_ONLY" as const,
        }),
        manualAcceptanceReference: Object.freeze({
          referenceType: "STAR_BEAST_GENESIS_MANUAL_ACCEPTANCE" as const,
          referenceId: "preview:human-review:pending",
          humanReviewRequired: true as const,
          noAutomaticProductAcceptance: true as const,
        }),
      }),
    );
  if (readiness.status !== "READY") return null;

  return Object.freeze({
    starbeast,
    trigramLanding,
    motherProfile,
    lifeArchetype: archetypeSource.lifeArchetypeProfile,
    asset: assetResult.assetDefinition,
    reveal,
    readiness,
  });
}

const PREVIEW_MODEL = buildGenesisPreviewModel();

function CosmicBeastMark() {
  return (
    <div className="gy-genesis-beast" aria-hidden="true">
      <div className="gy-genesis-beast__orbit gy-genesis-beast__orbit--outer" />
      <div className="gy-genesis-beast__orbit gy-genesis-beast__orbit--inner" />
      <svg viewBox="0 0 520 360" className="gy-genesis-beast__constellation">
        <defs>
          <linearGradient id="genesis-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#806d49" stopOpacity="0.2" />
            <stop offset="0.45" stopColor="#f2d394" stopOpacity="0.92" />
            <stop offset="1" stopColor="#8da6c4" stopOpacity="0.28" />
          </linearGradient>
          <radialGradient id="genesis-core">
            <stop offset="0" stopColor="#fff7dc" />
            <stop offset="0.25" stopColor="#e7c67f" />
            <stop offset="1" stopColor="#b18846" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className="gy-genesis-beast__boundary" d="M84 208 C115 126 184 92 264 104 C326 69 411 96 449 158 C473 198 450 248 397 261 C340 301 242 307 171 274 C116 272 72 248 84 208 Z" />
        <path className="gy-genesis-beast__line" d="M102 219 L151 165 L215 190 L270 130 L333 172 L401 137 L433 206 L372 254 L294 229 L224 273 L154 239 Z" />
        <path className="gy-genesis-beast__line gy-genesis-beast__line--soft" d="M151 165 L224 273 M215 190 L333 172 M270 130 L294 229 M333 172 L372 254" />
        {[
          [102, 219, 6], [151, 165, 8], [215, 190, 6], [270, 130, 11],
          [333, 172, 7], [401, 137, 6], [433, 206, 9], [372, 254, 6],
          [294, 229, 7], [224, 273, 6], [154, 239, 5],
        ].map(([cx, cy, r], index) => (
          <circle key={index} cx={cx} cy={cy} r={r} className="gy-genesis-beast__star" />
        ))}
        <circle cx="270" cy="130" r="54" fill="url(#genesis-core)" className="gy-genesis-beast__core" />
      </svg>
      <span className="gy-genesis-beast__dust gy-genesis-beast__dust--one" />
      <span className="gy-genesis-beast__dust gy-genesis-beast__dust--two" />
      <span className="gy-genesis-beast__dust gy-genesis-beast__dust--three" />
    </div>
  );
}

export function StarBeastGenesisPreview() {
  if (!PREVIEW_MODEL) {
    return (
      <main className="gy-genesis-preview gy-genesis-preview--error">
        <p>Genesis Preview 暂不可用。</p>
      </main>
    );
  }

  const { starbeast, trigramLanding, motherProfile, lifeArchetype } =
    PREVIEW_MODEL;
  const stageValue: Record<StarBeastGenesisStage, string> = {
    COSMIC_ORIGIN: "一束尚未命名的生命之光",
    ORIGIN_COORDINATE: `${DEMO_BIRTH.year}.${String(DEMO_BIRTH.month).padStart(2, "0")}.${String(DEMO_BIRTH.day).padStart(2, "0")} · ${DEMO_BIRTH.hourBranch}`,
    STAR_MANSION_ALIGNMENT: `${starbeast.mansion}宿 · 二十八宿第 ${starbeast.mansionIndex + 1} 位`,
    FOUR_SYMBOL_FORMATION: `${starbeast.direction}方 · ${starbeast.fourSymbol}`,
    LIFE_ARCHETYPE_INFUSION: `${trigramLanding.fieldMapping.trigram}${trigramLanding.fieldMapping.trigramSymbol} · ${lifeArchetype.originalForce}`,
    STAR_BEAST_REVEAL: `${starbeast.fourSymbol} · ${motherProfile.motherCodeTitle ?? motherProfile.motherCodeName}`,
  };

  return (
    <main
      className="gy-genesis-preview"
      data-preview-scope="ISOLATED_GENESIS_PREVIEW_ONLY"
      data-readiness="READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW"
      data-manual-acceptance="required"
    >
      <div className="gy-genesis-preview__stars" aria-hidden="true" />
      <header className="gy-genesis-preview__header">
        <span className="gy-genesis-preview__eyebrow">GUANYAO · GENESIS EXPERIENCE / P88</span>
        <span className="gy-genesis-preview__status">人工验收中</span>
      </header>

      <section className="gy-genesis-preview__hero">
        <div className="gy-genesis-preview__copy">
          <p className="gy-genesis-preview__kicker">星兽不是生成，是显化。</p>
          <h1>原来，它一直在那里。</h1>
          <p className="gy-genesis-preview__lead">
            一束来自时间的光，经过星宿、四象与母码原力，终于显出它陪你来到世界时的形状。
          </p>
          <div className="gy-genesis-preview__identity">
            <span>{starbeast.mansion}宿</span>
            <i />
            <span>{starbeast.fourSymbol}</span>
            <i />
            <span>{lifeArchetype.trigram} · {motherProfile.motherCodeTitle}</span>
          </div>
        </div>
        <div className="gy-genesis-preview__visual">
          <CosmicBeastMark />
          <p className="gy-genesis-preview__beast-name">{starbeast.fourSymbol}</p>
          <p className="gy-genesis-preview__beast-note">本我生命显化 · 非最终视觉资产</p>
        </div>
      </section>

      <section className="gy-genesis-preview__journey" aria-label="星兽显化六阶段">
        <div className="gy-genesis-preview__journey-head">
          <p>一次被看见的过程</p>
          <span>体验顺序，不是因果推导顺序</span>
        </div>
        <div className="gy-genesis-preview__stages">
          {STAGE_COPY.map((item) => (
            <article className="gy-genesis-preview__stage" key={item.stage} data-stage={item.stage}>
              <span className="gy-genesis-preview__stage-index">{item.index}</span>
              <div>
                <h2>{item.title}</h2>
                <strong>{stageValue[item.stage]}</strong>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="gy-genesis-preview__footer">
        <p>这不是命运结论，也不是人格标签。</p>
        <strong>这是你与自己的第一次重逢。</strong>
        <span>ISOLATED PREVIEW · 等待人工验收 · 不进入正式流程</span>
      </footer>
    </main>
  );
}
