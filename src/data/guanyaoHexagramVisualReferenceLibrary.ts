export type HexagramVisualTopology =
  | "matrix-wall"
  | "recursive-vortex"
  | "thermal-crack"
  | "floating-vacuum"
  | "sediment-freeze"
  | "lone-ascent"
  | "pressure-structure"
  | "boundary-structure"
  | "gathering-structure";

export type HexagramVisualReferenceRole = "global-style" | "topology" | "composition";

export type HexagramVisualReference = {
  id: string;
  name: string;
  topology: HexagramVisualTopology;
  referenceImagePath: string;
  referenceRole: HexagramVisualReferenceRole;
  usageNote: string;
  doUse: string[];
  doNotUse: string[];
};

const sharedDoNotUse = [
  "text",
  "logo",
  "hexagram symbol",
  "characters",
  "landscape scenery",
  "tarot figure",
];

export const guanyaoHexagramVisualReferenceLibrary: Record<string, HexagramVisualReference> = {
  "001-qian-gaokong-reference-v1": {
    id: "001-qian-gaokong-reference-v1",
    name: "001 乾类高位承压参考",
    topology: "lone-ascent",
    referenceImagePath: "/hexagram-card-visuals/001-qian-wei-tian-gaokong.png",
    referenceRole: "composition",
    usageNote: "只适用于 001 / 乾类 / 上升型 / 高位承压型参考，不得泛化为 002—064 的全局视觉模板。",
    doUse: ["high-position pressure", "qian-specific upward responsibility", "isolated bearing structure", "force not yet distributed"],
    doNotUse: [...sharedDoNotUse, "global template for 002-064", "central light pillar copy", "platform copy", "altar copy", "device structure copy"],
  },
  "sediment-freeze-v1": {
    id: "sediment-freeze-v1",
    name: "沉积冻结型参考",
    topology: "sediment-freeze",
    referenceImagePath: "/hexagram-card-references/global-sediment-ground-v1.png",
    referenceRole: "topology",
    usageNote: "只参考横向承压、厚重沉积和层间光，不画深渊。",
    doUse: ["horizontal weight", "layered compression", "low seam light", "stable overloaded boundary"],
    doNotUse: [...sharedDoNotUse, "abyss", "canyon", "falling scene"],
  },
  "thermal-crack-v1": {
    id: "thermal-crack-v1",
    name: "裂缝突破型参考",
    topology: "thermal-crack",
    referenceImagePath: "/hexagram-card-references/global-thermal-crack-v1.png",
    referenceRole: "topology",
    usageNote: "只参考裂缝、向上顶出的力量和破开前夜。",
    doUse: ["upward pressure", "narrow crack", "cold blue and gold inner light", "pre-breakthrough tension"],
    doNotUse: [...sharedDoNotUse, "plant character", "flower", "explosion"],
  },
  "003-tun-potu-reference-v1": {
    id: "003-tun-potu-reference-v1",
    name: "003 破土本卦参考",
    topology: "thermal-crack",
    referenceImagePath: "/hexagram-card-references/003-tun-potu-reference-v1.png",
    referenceRole: "composition",
    usageNote: "当前 003 候选图转入参考库，只参考裂缝方向、黑土压迫和冷金光克制，不复制文字、卦形或排版。",
    doUse: ["black soil pressure", "upward crack composition", "restrained gold-blue seam light", "text-free bottom visual discipline"],
    doNotUse: [...sharedDoNotUse, "card layout", "old typography", "plant character", "literal copied composition"],
  },
  "floating-vacuum-v1": {
    id: "floating-vacuum-v1",
    name: "漂浮真空型参考",
    topology: "floating-vacuum",
    referenceImagePath: "/hexagram-card-references/global-floating-mist-v1.png",
    referenceRole: "topology",
    usageNote: "只参考漂移、遮蔽、边界可见但路径不明。",
    doUse: ["obscured boundary", "layered fog", "broken light", "unresolved path"],
    doNotUse: [...sharedDoNotUse, "tourist landscape", "ink painting scenery", "fantasy mountain"],
  },
  "004-meng-miwu-reference-pending-v1": {
    id: "004-meng-miwu-reference-pending-v1",
    name: "004 迷雾遮蔽参考 pending",
    topology: "floating-vacuum",
    referenceImagePath: "/hexagram-card-references/004-meng-miwu-reference-v1.png",
    referenceRole: "topology",
    usageNote: "迷雾遮蔽型参考位待补图；用于未明、遮蔽、看不清问题和认知未开，不得用 001 顶替。",
    doUse: ["obscured cognition", "mist boundary", "unresolved question", "soft black negative space"],
    doNotUse: [...sharedDoNotUse, "001 qian high-axis template", "altar", "light pillar", "mountain postcard"],
  },
  "boundary-structure-v1": {
    id: "boundary-structure-v1",
    name: "边界结构型参考",
    topology: "boundary-structure",
    referenceImagePath: "/hexagram-card-references/global-freeze-boundary-v1.png",
    referenceRole: "topology",
    usageNote: "只参考阻隔、窄口、边界和可通过但未完全打开的结构。",
    doUse: ["clear boundary", "narrow passage", "structural tension", "restrained light from seams"],
    doNotUse: [...sharedDoNotUse, "romantic scenery", "battle scene", "court scene"],
  },
  "006-song-zhengming-reference-pending-v1": {
    id: "006-song-zhengming-reference-pending-v1",
    name: "006 对峙边界参考 pending",
    topology: "boundary-structure",
    referenceImagePath: "/hexagram-card-references/006-song-zhengming-reference-v1.png",
    referenceRole: "topology",
    usageNote: "对峙边界型参考位待补图；用于对峙、分裂、边界、张力和立场显现，不得用 001 顶替。",
    doUse: ["opposing forces", "boundary tension", "split pressure", "voice outlet"],
    doNotUse: [...sharedDoNotUse, "001 qian high-axis template", "war scene", "court scene", "human argument"],
  },
  "010-lv-bingshang-reference-v1": {
    id: "010-lv-bingshang-reference-v1",
    name: "010 冰上本卦参考",
    topology: "boundary-structure",
    referenceImagePath: "/hexagram-card-references/010-lv-bingshang-reference-v1.png",
    referenceRole: "composition",
    usageNote: "当前 010 候选图转入临时参考库，只参考极窄路径、黑冰边界和风险分寸，不复制文字、卦形或排版。",
    doUse: ["thin safe path", "black ice boundary", "subtle pressure cracks", "measured forward risk"],
    doNotUse: [...sharedDoNotUse, "card layout", "old typography", "footprint character", "wide road"],
  },
  "gathering-structure-v1": {
    id: "gathering-structure-v1",
    name: "归拢结构型参考",
    topology: "gathering-structure",
    referenceImagePath: "/hexagram-card-references/global-gathering-center-v1.png",
    referenceRole: "topology",
    usageNote: "只参考少量结构单位向中心归拢，不画网络和人群。",
    doUse: ["few structural units", "clear center point", "bounded approach", "ordered gathering"],
    doNotUse: [...sharedDoNotUse, "dense network", "crowd", "army", "flags"],
  },
  "pressure-structure-v1": {
    id: "pressure-structure-v1",
    name: "压住未落型参考",
    topology: "pressure-structure",
    referenceImagePath: "/hexagram-card-references/global-pressure-held-v1.png",
    referenceRole: "topology",
    usageNote: "只参考上方压力、被托住的光和未完成释放。",
    doUse: ["heavy overhead structure", "suspended light", "unreleased force", "large black negative space"],
    doNotUse: [...sharedDoNotUse, "natural cloudscape", "valley", "lightning explosion"],
  },
  "009-xiaoxu-miyun-reference-pending-v1": {
    id: "009-xiaoxu-miyun-reference-pending-v1",
    name: "009 压顶蓄势参考 pending",
    topology: "pressure-structure",
    referenceImagePath: "/hexagram-card-references/009-xiaoxu-miyun-reference-v1.png",
    referenceRole: "topology",
    usageNote: "压顶蓄势型参考位待补图；用于压住未落、蓄势、云层压迫和临界未释放，不得用 001 顶替。",
    doUse: ["overhead pressure", "held unreleased force", "cloud-like compression", "pre-release threshold"],
    doNotUse: [...sharedDoNotUse, "001 qian high-axis template", "natural cloudscape", "valley skylight", "light pillar platform"],
  },
};
