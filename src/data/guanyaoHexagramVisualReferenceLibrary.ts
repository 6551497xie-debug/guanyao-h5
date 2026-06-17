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
  "lone-ascent-v1": {
    id: "lone-ascent-v1",
    name: "孤高上升型参考",
    topology: "lone-ascent",
    referenceImagePath: "/hexagram-card-references/global-lone-ascent-v1.png",
    referenceRole: "topology",
    usageNote: "只参考黑场、主结构、光源克制、高位单点承压和负空间，不复制内容。",
    doUse: ["large black negative space", "single dominant height structure", "unsupported top position", "cold restrained pressure light"],
    doNotUse: [...sharedDoNotUse, "altar", "energy reactor", "sci-fi platform", "light pillar launch pad"],
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
};
