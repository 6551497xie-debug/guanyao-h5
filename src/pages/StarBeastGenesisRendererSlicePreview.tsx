import { useMemo, useState } from "react";
import { StarBeastGenesisRendererPrototypeCanvas } from "../components/StarBeastGenesisRendererPrototypeCanvas";
import { runMotherCodeLandingEngine } from "../services/guanyaoLunarMotherCodeLandingAdapter";
import { resolveStarbeastFromBirthDate } from "../services/guanyaoStarbeastEngineService";
import { resolveLifeArchetypeProfileFromMotherCode } from "../services/motherCodeLifeArchetypeSource";
import { resolveStarBeastCosmicConsciousness } from "../services/starBeastCosmicConsciousnessMapping";
import { resolveWhiteTigerGenGenesisPrototypeAsset } from "../services/starBeastGenesisPrototypeAsset";
import {
  resolveStarBeastGenesisRendererPrototype,
  STAR_BEAST_GENESIS_STAGE_ORDER,
} from "../services/starBeastGenesisRendererPrototype";
import { calibrateStarBeastGenesisSource } from "../services/starBeastGenesisSourceCalibration";
import { resolveStarBeastStellarFlesh } from "../services/starBeastStellarFleshMapping";
import type {
  GenesisVisualStage,
  StarBeastGenesisExpressionChannelReference,
  StarBeastGenesisVisualState,
} from "../types/starBeastGenesisVisualState";
import type { StarBeastRendererContractReference } from "../types/starBeastAssetPrototypeReadiness";
import "../styles/starbeast-genesis-renderer-slice.css";

const DEMO_BIRTH = Object.freeze({
  year: 1979,
  month: 3,
  day: 28,
  hourBranch: "未时" as const,
});

const ORIGIN_COORDINATE_REFERENCE = Object.freeze({
  referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" as const,
  referenceId: "prototype:1979-03-28:wei",
  sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE" as const,
  birthLocationContextOnly: true as const,
  birthLocationExcludedFromStarBeastDerivation: true as const,
});

const STARBEAST_DERIVATION_RESULT = resolveStarbeastFromBirthDate(DEMO_BIRTH);
const MOTHER_CODE_LANDING_RESULT = runMotherCodeLandingEngine(DEMO_BIRTH);
const SOURCE_CALIBRATION = calibrateStarBeastGenesisSource(
  Object.freeze({
    originCoordinateReference: ORIGIN_COORDINATE_REFERENCE,
    starbeastDerivationResultReference: STARBEAST_DERIVATION_RESULT,
    motherCodeLandingResultReference: MOTHER_CODE_LANDING_RESULT,
  }),
);

const EXPRESSION_CHANNEL_REFERENCE: StarBeastGenesisExpressionChannelReference =
  Object.freeze({
    referenceType: "P80_EXPRESSION_CHANNEL_CONTRACT",
    referenceId: "STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT",
  });

const RENDERER_CONTRACT_REFERENCE: StarBeastRendererContractReference =
  Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "STAR_BEAST_RENDERER_CONTRACT_V1",
  });

const ASSET_RESULT = (() => {
  if (SOURCE_CALIBRATION.status !== "AVAILABLE") return null;

  const sourceIdentity = SOURCE_CALIBRATION.sourceIdentity;
  const lifeArchetypeSource = resolveLifeArchetypeProfileFromMotherCode(
    sourceIdentity.motherCodeProfileReference.profileReference,
  );
  if (lifeArchetypeSource.status !== "READY") return null;

  return resolveWhiteTigerGenGenesisPrototypeAsset(
    Object.freeze({
      westernMansionReference:
        sourceIdentity.fourSymbolResultReference.resultReference,
      lifeArchetypeProfileReference: lifeArchetypeSource.lifeArchetypeProfile,
    }),
  );
})();

const STAGE_PRESENTATION: Readonly<
  Record<GenesisVisualStage, Readonly<{ index: string; title: string; note: string }>>
> = Object.freeze({
  COSMIC_FIELD: Object.freeze({ index: "01", title: "光在深空里等待", note: "宇宙场" }),
  WESTERN_MANSION_ALIGNMENT: Object.freeze({ index: "02", title: "七宿开始归位", note: "星辰秩序" }),
  WHITE_TIGER_FORMATION: Object.freeze({ index: "03", title: "星辰长出生命结构", note: "白虎成象" }),
  GEN_INFUSION: Object.freeze({ index: "04", title: "一股沉静的力量进入它", note: "内核稳定" }),
  WHITE_TIGER_REVEAL: Object.freeze({ index: "05", title: "它一直在这里", note: "安静 · 守望 · 在场" }),
});

export function StarBeastGenesisRendererSlicePreview() {
  const [stage, setStage] = useState<GenesisVisualStage>("COSMIC_FIELD");
  const model = useMemo(() => {
    if (ASSET_RESULT?.status !== "AVAILABLE") return null;
    const visualState: StarBeastGenesisVisualState = Object.freeze({
      semanticRole: "STAR_BEAST_GENESIS_VISUAL_STATE",
      stage,
      assetReference: ASSET_RESULT.asset,
      expressionChannelReference: EXPRESSION_CHANNEL_REFERENCE,
      rendererContractReference: RENDERER_CONTRACT_REFERENCE,
      isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY",
      referenceOnly: true,
      noCoordinateCopy: true,
      noParticleParameterCopy: true,
      noAnimationParameterCopy: true,
      noLifeFactCopy: true,
    });
    const renderer = resolveStarBeastGenesisRendererPrototype(visualState);
    const consciousness = resolveStarBeastCosmicConsciousness(visualState);
    if (renderer.status !== "AVAILABLE" || consciousness.status !== "AVAILABLE") {
      return null;
    }
    const stellarFlesh = resolveStarBeastStellarFlesh(consciousness.state);
    if (stellarFlesh.status !== "AVAILABLE") return null;
    return Object.freeze({ renderer, consciousness, stellarFlesh });
  }, [stage]);

  if (!model) {
    return <main className="gy-genesis-renderer-slice gy-genesis-renderer-slice--error">Prototype unavailable.</main>;
  }

  const currentIndex = STAR_BEAST_GENESIS_STAGE_ORDER.indexOf(stage);
  const presentation = STAGE_PRESENTATION[stage];
  const advance = () => {
    const next = Math.min(currentIndex + 1, STAR_BEAST_GENESIS_STAGE_ORDER.length - 1);
    setStage(STAR_BEAST_GENESIS_STAGE_ORDER[next]);
  };

  return (
    <main
      className="gy-genesis-renderer-slice"
      data-prototype-scope="ISOLATED_PROTOTYPE_ONLY"
      data-genesis-stage={stage}
      data-consciousness-mode={model.consciousness.state.consciousnessMode}
      data-stellar-flesh-mode={model.stellarFlesh.state.fleshMode}
    >
      <StarBeastGenesisRendererPrototypeCanvas
        input={model.renderer.input}
        consciousnessState={model.consciousness.state}
        stellarFleshState={model.stellarFlesh.state}
      />
      <div className="gy-genesis-renderer-slice__veil" aria-hidden="true" />

      <header className="gy-genesis-renderer-slice__header">
        <span>GUANYAO · GENESIS PROTOTYPE / P85 + P86 + P87</span>
        <span>ISOLATED</span>
      </header>

      <section className="gy-genesis-renderer-slice__copy" aria-live="polite">
        <span className="gy-genesis-renderer-slice__stage-index">{presentation.index}</span>
        <p>{presentation.note}</p>
        <h1>{presentation.title}</h1>
      </section>

      <button
        type="button"
        className="gy-genesis-renderer-slice__advance"
        onClick={advance}
        disabled={currentIndex === STAR_BEAST_GENESIS_STAGE_ORDER.length - 1}
      >
        <span>{currentIndex === STAR_BEAST_GENESIS_STAGE_ORDER.length - 1 ? "显化完成" : "轻触，继续显化"}</span>
      </button>

      <nav className="gy-genesis-renderer-slice__stages" aria-label="Genesis 五阶段">
        {STAR_BEAST_GENESIS_STAGE_ORDER.map((stageOption, index) => (
          <button
            type="button"
            key={stageOption}
            className={index <= currentIndex ? "is-reached" : ""}
            aria-label={`阶段 ${index + 1}`}
            aria-current={stageOption === stage ? "step" : undefined}
            onClick={() => setStage(stageOption)}
          >
            <i />
          </button>
        ))}
      </nav>

      <footer className="gy-genesis-renderer-slice__footer">
        艮之白虎 · 非最终视觉资产 · 等待第一视觉验收
      </footer>
    </main>
  );
}
