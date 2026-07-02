import type { GuanyaoStarBeastName } from "./types";

export type BeastPersonaInput = {
  starBeastName: GuanyaoStarBeastName;
  state: "storm" | "fed" | "stabilized" | "resonating" | "exhausted";
};

export type BeastPersonaOutput = {
  narration: string;
  bubble?: string;
};

const beastStateLanguage: Record<GuanyaoStarBeastName, Record<BeastPersonaInput["state"], BeastPersonaOutput>> = {
  青龙: {
    storm: { narration: "青龙的光路轻轻绷紧，像一阵风正在寻找出口。" },
    fed: { narration: "青龙吸入星尘，身侧的光线重新伸展开。" },
    stabilized: { narration: "青龙的鳞光渐渐均匀，风场安静下来。", bubble: "可以重新开始。" },
    resonating: { narration: "青龙沿着星路抬头，远处的光点一枚枚回应。" },
    exhausted: { narration: "青龙伏低身体，把最后一点光护在身下。" },
  },
  白虎: {
    storm: { narration: "白虎发出一声低低的鸣动，瞳孔收缩，身上的金色星路泛起紫色杂讯。" },
    fed: { narration: "白虎缓慢闭上双眼，吸入星尘，伏下前爪。七个本命光点像心脏一样重新搏动。" },
    stabilized: { narration: "白虎的肩背重新挺起，晶体般的光纹沿着脊骨一寸寸亮起。", bubble: "这一次，我们站住了。" },
    resonating: { narration: "白虎向前踏出一步，爪下的星尘向其余维度散开。" },
    exhausted: { narration: "白虎的光纹暗了一瞬，仍然守在那颗种子前面。" },
  },
  朱雀: {
    storm: { narration: "朱雀的羽光出现轻微颤动，像一句话还没找到出口。" },
    fed: { narration: "朱雀低头啄起星尘，胸口的红金光慢慢回暖。" },
    stabilized: { narration: "朱雀展开半边光翼，温热的粒子沿着边缘流动。", bubble: "说出来，也可以。" },
    resonating: { narration: "朱雀的尾羽划过星场，把沉默的地方一点点照亮。" },
    exhausted: { narration: "朱雀收起翅膀，把火光压得很低，却没有熄灭。" },
  },
  玄武: {
    storm: { narration: "玄武的背甲沉入暗处，星尘像水一样在边缘回旋。" },
    fed: { narration: "玄武慢慢吸入光点，厚重的背甲泛起安静的纹路。" },
    stabilized: { narration: "玄武停在原地，四周的星流逐渐沉降。", bubble: "慢慢来。" },
    resonating: { narration: "玄武周围的水光向外扩散，其余维度随之安定。" },
    exhausted: { narration: "玄武把自己沉得更低，替你托住那一小片暗流。" },
  },
};

export function generateBeastPersonaLanguage(input: BeastPersonaInput): BeastPersonaOutput {
  return beastStateLanguage[input.starBeastName]?.[input.state] ?? beastStateLanguage.白虎.stabilized;
}
