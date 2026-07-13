import type {
  PrimaryPetalProtocolDimension,
  SelectedPressureSeedContext,
} from "../guanyaoPrimaryPetalResolver";

export const primaryPetalDevFixtures: Readonly<
  Record<PrimaryPetalProtocolDimension, SelectedPressureSeedContext>
> = {
  body: {
    selectedPressureSeedId: "dev-fixture-body",
    surface: "你在这个行业十年了，抬头还是经理。",
    bodySignal: "胸口发闷，肩膀沉重。",
  },
  emotion: {
    selectedPressureSeedId: "dev-fixture-emotion",
    surface: "对方一个眼神，你瞬间被不安接管。",
    emotionalTone: "fear",
  },
  thought: {
    selectedPressureSeedId: "dev-fixture-thought",
    surface: "你还没说完，脑子里已经开始组织下一句解释了。",
    thoughtPattern: "反复解释，用证明换安全。",
  },
  behavior: {
    selectedPressureSeedId: "dev-fixture-behavior",
    surface: "你脑子里想了无数遍，手还在原处。",
    behaviorBlock: "想做，但卡住很久了。",
  },
  memory: {
    selectedPressureSeedId: "dev-fixture-memory",
    surface: "以前也这样过，你还没反应，记忆已经先替你回答了。",
    memoryEcho: "旧经验正在把你拉回过去。",
  },
  motivation: {
    selectedPressureSeedId: "dev-fixture-motivation",
    surface: "你不知道该往哪走，假装不需要，就不怕得不到。",
    motivationLoss: "方向感变得模糊。",
  },
};

export const resolvePrimaryPetalDevFixture = (
  fixtureKey: string | null,
): SelectedPressureSeedContext | null => {
  if (!fixtureKey || !Object.prototype.hasOwnProperty.call(primaryPetalDevFixtures, fixtureKey)) return null;

  return primaryPetalDevFixtures[fixtureKey as PrimaryPetalProtocolDimension];
};
