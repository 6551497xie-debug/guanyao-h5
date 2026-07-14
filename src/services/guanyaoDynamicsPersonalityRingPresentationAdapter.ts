import type { DynamicsCurrentCrystalEndState } from "./guanyaoDynamicsCrystalRuntimeAdapter";
import type { PersonalityRingLiteState } from "./personalityRingLiteService";

export type DynamicsPersonalityRingButtonState = Readonly<{
  status: "READY_TO_DEPOSIT" | "DEPOSITED";
  disabled: boolean;
  label: "保存入人格年轮" | "已留痕";
}>;

export type DynamicsPersonalityRingConfirmation = Readonly<{
  visible: boolean;
  title: "人格年轮已点亮";
  copy: "这一局，已经成为你人格年轮上的一枚星点。";
  summary: string;
}>;

export type DynamicsPersonalityRingPresentationAdapterInput = Readonly<{
  state: PersonalityRingLiteState;
  currentCrystalEndState: DynamicsCurrentCrystalEndState;
}>;

export type DynamicsPersonalityRingPresentation = Readonly<{
  semanticRole: "PERSONALITY_RING_PRESENTATION";
  isDeposited: boolean;
  entryCount: number;
  recentHexagramTitle: string;
  button: DynamicsPersonalityRingButtonState;
  confirmation: DynamicsPersonalityRingConfirmation;
  guardrails: Readonly<{
    readOnly: true;
    writesStorage: false;
    depositsCrystal: false;
  }>;
}>;

export function resolveDynamicsPersonalityRingPresentation(
  input: DynamicsPersonalityRingPresentationAdapterInput,
): DynamicsPersonalityRingPresentation {
  const { state, currentCrystalEndState } = input;
  const isDeposited = state.entries.some(
    (entry) => entry.createdAt === currentCrystalEndState.createdAt,
  );
  const entryCount = state.entries.length;
  const recentHexagramTitle =
    currentCrystalEndState.hexagram.hexagramName ??
    currentCrystalEndState.hexagram.hexagramTitle ??
    currentCrystalEndState.hexagram.hexagramCode ??
    "本局定位";

  return {
    semanticRole: "PERSONALITY_RING_PRESENTATION",
    isDeposited,
    entryCount,
    recentHexagramTitle,
    button: isDeposited
      ? {
          status: "DEPOSITED",
          disabled: true,
          label: "已留痕",
        }
      : {
          status: "READY_TO_DEPOSIT",
          disabled: false,
          label: "保存入人格年轮",
        },
    confirmation: {
      visible: isDeposited,
      title: "人格年轮已点亮",
      copy: "这一局，已经成为你人格年轮上的一枚星点。",
      summary: `已留痕 · ${entryCount} 枚生命印记 · 供你回望${recentHexagramTitle ? ` · 最近一枚：${recentHexagramTitle}` : ""}`,
    },
    guardrails: {
      readOnly: true,
      writesStorage: false,
      depositsCrystal: false,
    },
  };
}
