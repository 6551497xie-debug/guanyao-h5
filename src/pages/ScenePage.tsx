// GUANYAO 2.0 = immutable causal engine with layered perceptual enhancement system that improves user understanding without modifying underlying logic.
// GUANYAO 2.0 = closed deterministic causal system with irreversible upstream generation and passive downstream rendering only.
// Data flow is one-way only: Chrono -> Default Reaction -> MotherField -> Behavioral Compression Engine -> Pressure Seed Output -> ScenePage Display.
// Pressure Seed = result of behavioral inertia compression, not a selection outcome.
// ScenePage = DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW.
// Kept dormant for legacy pressure-seed review only. It must never forward users to the old hexagram-stamp path.
// Visible seed labels are neutral presentation indexes only; no semantic category labels are shown on this screen.
import { useNavigate } from "react-router-dom";
import { PressureSeedCrossAxisPage, type PressureSeedCrossAxisSeed } from "./PressureSeedCrossAxisPage";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSession, setMotherCodeResult, setSelectedSceneSeed } from "../services/sessionService";
import { buildSelectedPressureSeedContext } from "../services/guanyaoPressureSeedSceneBindingService";
import { writeSelectedPressureSeedContext } from "../services/guanyaoSelectedPressureSeedContextPersistenceAdapter";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId, SceneSeed } from "../types";
import type { GuanyaoAgeSegment, GuanyaoPressureSeed } from "../types/guanyaoPressureSeed";

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];

function readYuanCodeKey(session: GuanyaoSession): IdentityFragment["yuanCodeKey"] | undefined {
  const candidate =
    session.identityFragment?.yuanCodeKey ??
    session.selectedFragment?.yuanCodeKey ??
    session.yuanCode?.trigramKey ??
    session.chronoCode?.trigramKey ??
    session.chronoPrototypeCard?.trigramId;

  return yuanCodeKeys.includes(candidate as IdentityFragment["yuanCodeKey"])
    ? (candidate as IdentityFragment["yuanCodeKey"])
    : undefined;
}

function readLifeStageId(session: GuanyaoSession): IdentityLifeStageId | undefined {
  const identityLifeStage = session.identityFragment?.lifeStageId ?? session.selectedFragment?.lifeStageId;
  if (identityLifeStage) {
    return identityLifeStage;
  }

  switch (session.chronoProfile?.ageRange) {
    case "18_22":
      return "18_22";
    case "23_31":
      return "23_31";
    case "32_39":
      return "32_42";
    case "40_52":
    case "53_plus":
      return "43_55";
    default:
      return undefined;
  }
}

function readPressureSeedAgeSegment(session: GuanyaoSession): GuanyaoAgeSegment | undefined {
  const lifeStageId = readLifeStageId(session);

  if (lifeStageId === "18_22") return "YOUTH";
  if (lifeStageId === "23_31") return "ESTABLISHING";
  if (lifeStageId === "32_42") return "MID_LIFE";
  if (lifeStageId === "43_55") return "RESTRUCTURING";
  return undefined;
}

function toLegacySceneSeed(
  seed: GuanyaoPressureSeed,
  session: GuanyaoSession,
  seedIndex: SceneSeed["seedIndex"],
): SceneSeed {
  return {
    id: seed.id,
    sourceYuanCodeId: session.yuanCode?.id ?? "r8-pressure-seed",
    yuanCodeKey: readYuanCodeKey(session) ?? "dui",
    lifeStageId: readLifeStageId(session) ?? "32_42",
    sourceIdentityFragmentId: session.identityFragment?.id ?? session.selectedFragment?.id ?? "r8-pressure-seed",
    pressureLayerId: seed.pressureField.toLowerCase(),
    pressureLayerLabel: "现实压力种子",
    seedGroupId: seed.matrixCode,
    seedIndex,
    title: seed.surface,
    seedLine: seed.shell,
    realitySnapshot: seed.surface,
    behaviorInertia: seed.shell,
    gravityHook: seed.mappingHint,
    bodySignalHint: seed.shell,
    thematicField: seed.tags,
    motherCodeBiasTags: [seed.matrixCode],
    yaoCodeBiasTags: [seed.pressureNature],
    intensity: 3,
    forbiddenToneTags: [],
  };
}

export function ScenePage() {
  const navigate = useNavigate();
  const pressureSeedAgeSegment = readPressureSeedAgeSegment(getSession());

  function commitPressureSeed(candidate: PressureSeedCrossAxisSeed | undefined) {
    if (!candidate) return;
    const latestSession = getSession();
    const selectedPressureSeedContext = buildSelectedPressureSeedContext(candidate.seed);
    const legacySceneSeed = toLegacySceneSeed(candidate.seed, latestSession, candidate.seedIndex);

    writeSelectedPressureSeedContext(selectedPressureSeedContext);
    setSelectedSceneSeed(legacySceneSeed);
    setMotherCodeResult(buildMotherCodeResult(getSession()));
    navigate(GUANYAO_ROUTES.dynamics);
  }

  return <PressureSeedCrossAxisPage ageSegment={pressureSeedAgeSegment} onComplete={commitPressureSeed} />;
}
