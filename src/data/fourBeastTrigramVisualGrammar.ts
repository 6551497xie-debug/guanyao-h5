import type { Trigram } from "../types/guanyaoCausalEngine";

export type FourBeastName = "青龙" | "朱雀" | "白虎" | "玄武";
export type TrigramName = Trigram;

export type FourBeastTrigramVisualGrammarItem = {
  beast: FourBeastName;
  trigram: TrigramName;
  key: string;
  beastBase: string;
  posture: string;
  motion: string;
  expression: string;
  direction: string;
  structureLine: string;
  lightField: string;
  temperament: string;
  avoid: string[];
};

type FourBeastBaseGrammar = {
  beastBase: string;
  posture: string;
  motionBase: string;
  directionBase: string;
  structureBase: string;
  lightBase: string;
  avoid: string[];
};

type TrigramMotionGrammar = {
  posture: string;
  motion: string;
  expression: string;
  direction: string;
  structureLine: string;
  lightField: string;
};

type MotherCodeTemperamentGrammar = {
  temperament: string;
};

export const FOUR_BEAST_BASE_GRAMMAR: Record<FourBeastName, FourBeastBaseGrammar> = {
  青龙: {
    beastBase: "东方生发底形：长线游动、盘绕伸展、由低处向外打开。",
    posture: "身体拉长，脊线有连续弧度，像一条正在舒展的光脉。",
    motionBase: "伸展、盘绕、长线游动。",
    directionBase: "从左下向右上生发，允许轻微绕行。",
    structureBase: "连续曲线、长尾线、渐开的枝状线。",
    lightBase: "冷金中带微青的生发光，不使用鲜艳绿色。",
    avoid: ["不要画成固定飞龙头像", "不要变成强游戏角色", "不要用高饱和绿色"],
  },
  朱雀: {
    beastBase: "南方显照底形：展翼、上升、火光张开。",
    posture: "双翼展开，中心轻盈上提，像光被热流托起。",
    motionBase: "展开、升腾、显照。",
    directionBase: "从中心向上方和两侧打开。",
    structureBase: "羽状线、扇形线、上升火痕。",
    lightBase: "冷金中带微暖火光，不使用红色大面积火焰。",
    avoid: ["不要画成凤凰插画", "不要做火焰特效主角", "不要压过母码文字"],
  },
  白虎: {
    beastBase: "西方收束底形：伏击、斩断、爪痕与刃线。",
    posture: "身体低伏，肩背收紧，前爪形成短促切线。",
    motionBase: "收束、压低、斩断。",
    directionBase: "从右侧向中心切入，动作短而准。",
    structureBase: "斜切线、爪痕线、短刃线。",
    lightBase: "冷金中带银白锋面，不使用血色或攻击性插画。",
    avoid: ["不要画成猛兽攻击画面", "不要制造暴力感", "不要用红色爪痕"],
  },
  玄武: {
    beastBase: "北方深藏底形：承压、盘守、壳与水纹。",
    posture: "核心下沉，外圈守住，像结构在深处承压。",
    motionBase: "下潜、盘守、缓慢承压。",
    directionBase: "从外圈向下方和内核沉入。",
    structureBase: "壳形弧线、环线、水纹线。",
    lightBase: "冷金中带暗水光，不使用大面积蓝色旧页感。",
    avoid: ["不要画成乌龟吉祥物", "不要变成蓝色旧视觉", "不要让形体过重"],
  },
};

export const TRIGRAM_MOTION_GRAMMAR: Record<TrigramName, TrigramMotionGrammar> = {
  乾: {
    posture: "抬头、张开前势，重心向上。",
    motion: "主动启动，先定方向再向前推进。",
    expression: "清醒、坚决、带一点掌控感。",
    direction: "向上、向前、向外开局。",
    structureLine: "主轴明确，线条偏直，外缘有开局射线。",
    lightField: "中心高亮，外扩有秩序。",
  },
  坤: {
    posture: "身体铺开，底盘稳定，重心向下。",
    motion: "托住、承载、缓慢铺展。",
    expression: "稳定、包容、不过度外放。",
    direction: "向下、向内、向四周托底。",
    structureLine: "低位宽线、层叠地平线、柔和包络线。",
    lightField: "低亮度宽域光，边界柔和。",
  },
  震: {
    posture: "前身骤起，局部有启动张力。",
    motion: "震动、弹起、破开停滞。",
    expression: "警醒、迅速、有行动冲动。",
    direction: "从内核向外突然脉冲。",
    structureLine: "短促折线、脉冲线、断续闪线。",
    lightField: "闪烁脉冲光，明暗变化快但不刺眼。",
  },
  巽: {
    posture: "身体偏斜，形体从缝隙进入。",
    motion: "渗透、绕行、轻微旋入。",
    expression: "观察、试探、敏锐。",
    direction: "沿侧向缝隙进入，再向内转。",
    structureLine: "细长风线、斜向穿行线、轻旋线。",
    lightField: "细雾状光，边缘有流动感。",
  },
  坎: {
    posture: "核心下陷，外圈收紧。",
    motion: "下沉、回旋、穿过深处。",
    expression: "沉着、警觉、带深水压力。",
    direction: "向下、向内、再从暗处穿出。",
    structureLine: "内旋线、下坠线、深层环线。",
    lightField: "深处微光，中心暗、边缘有反照。",
  },
  离: {
    posture: "胸口或中心打开，轮廓清晰显影。",
    motion: "照亮、显现、把隐藏结构推出。",
    expression: "明亮、锐利、正在看见。",
    direction: "从中心向外照射，并让轮廓浮现。",
    structureLine: "清晰轮廓线、双层光边、显影线。",
    lightField: "中心明亮，边缘像被照见。",
  },
  艮: {
    posture: "身体停住，前缘形成边界。",
    motion: "止住、定格、建立阻隔。",
    expression: "克制、防守、判断边界。",
    direction: "向前停止，向内收住。",
    structureLine: "边界线、山形折线、止损屏障。",
    lightField: "静态凝光，低频闪动，边界更亮。",
  },
  兑: {
    posture: "嘴部或前端松动，尾部形成回环。",
    motion: "转开、沟通、从僵点处流动。",
    expression: "缓和、灵活、带转化意图。",
    direction: "从冲突点侧向转出，再回到中心。",
    structureLine: "弧形交换线、回环线、双向连接线。",
    lightField: "柔亮交换光，局部连接点更亮。",
  },
};

export const MOTHER_CODE_TEMPERAMENT_GRAMMAR: Record<TrigramName, MotherCodeTemperamentGrammar> = {
  乾: { temperament: "创世者：定向、开局、把控制欲转为控制能力。" },
  坤: { temperament: "承载者：托底、稳定、把无边界承受转为有边界托底。" },
  震: { temperament: "行动者：启动、破局、把行动冲动转为行动前判断。" },
  巽: { temperament: "渗透者：观察、绕行、把反复权衡转为谋而后动。" },
  坎: { temperament: "深陷者：复盘、穿越、把反复深陷转为穿越困局。" },
  离: { temperament: "照见者：显影、表达、把证明欲转为本质表达。" },
  艮: { temperament: "停滞者：止损、边界、把过度防御转为预见止损。" },
  兑: { temperament: "转化者：松动、沟通、把回避冲突转为化解僵局。" },
};

export const FOUR_BEAST_NAMES: FourBeastName[] = ["青龙", "朱雀", "白虎", "玄武"];
export const TRIGRAM_NAMES: TrigramName[] = ["乾", "坤", "震", "巽", "坎", "离", "艮", "兑"];

export const FOUR_BEAST_TRIGRAM_VISUAL_GRAMMAR: FourBeastTrigramVisualGrammarItem[] =
  FOUR_BEAST_NAMES.flatMap((beast) =>
    TRIGRAM_NAMES.map((trigram) => {
      const beastGrammar = FOUR_BEAST_BASE_GRAMMAR[beast];
      const trigramGrammar = TRIGRAM_MOTION_GRAMMAR[trigram];
      const temperamentGrammar = MOTHER_CODE_TEMPERAMENT_GRAMMAR[trigram];

      return {
        beast,
        trigram,
        key: `${beast}-${trigram}`,
        beastBase: beastGrammar.beastBase,
        posture: `${beastGrammar.posture} ${trigramGrammar.posture}`,
        motion: `${beastGrammar.motionBase} / ${trigramGrammar.motion}`,
        expression: trigramGrammar.expression,
        direction: `${beastGrammar.directionBase} ${trigramGrammar.direction}`,
        structureLine: `${beastGrammar.structureBase} ${trigramGrammar.structureLine}`,
        lightField: `${beastGrammar.lightBase} ${trigramGrammar.lightField}`,
        temperament: temperamentGrammar.temperament,
        avoid: [
          ...beastGrammar.avoid,
          "不要新增正式插画语义",
          "不要让八卦动作覆盖四象兽底形",
          "不要让母码气质变成额外世界观",
        ],
      };
    }),
  );

export function getFourBeastTrigramVisualGrammar(
  beast: FourBeastName,
  trigram: TrigramName,
): FourBeastTrigramVisualGrammarItem {
  return FOUR_BEAST_TRIGRAM_VISUAL_GRAMMAR.find((item) => item.beast === beast && item.trigram === trigram) ??
    FOUR_BEAST_TRIGRAM_VISUAL_GRAMMAR[0]!;
}
