export type HexagramLineKind = "yang" | "yin";

export type GuanyaoHexagramGlyph = {
  code: string;
  linesTopToBottom: HexagramLineKind[];
};

export const guanyaoHexagramGlyphs: Record<string, GuanyaoHexagramGlyph> = {
  "001": {
    code: "001",
    linesTopToBottom: ["yang", "yang", "yang", "yang", "yang", "yang"],
  },
  "002": {
    code: "002",
    linesTopToBottom: ["yin", "yin", "yin", "yin", "yin", "yin"],
  },
  "003": {
    code: "003",
    linesTopToBottom: ["yin", "yang", "yin", "yin", "yin", "yang"],
  },
  "004": {
    code: "004",
    linesTopToBottom: ["yang", "yin", "yin", "yin", "yang", "yin"],
  },
  "005": {
    code: "005",
    linesTopToBottom: ["yin", "yang", "yin", "yang", "yang", "yang"],
  },
  "006": {
    code: "006",
    linesTopToBottom: ["yang", "yang", "yang", "yin", "yang", "yin"],
  },
  "007": {
    code: "007",
    linesTopToBottom: ["yin", "yin", "yin", "yin", "yang", "yin"],
  },
  "008": {
    code: "008",
    linesTopToBottom: ["yin", "yang", "yin", "yin", "yin", "yin"],
  },
  "009": {
    code: "009",
    linesTopToBottom: ["yang", "yang", "yin", "yang", "yang", "yang"],
  },
  "010": {
    code: "010",
    linesTopToBottom: ["yang", "yang", "yang", "yin", "yang", "yang"],
  },
  "058": {
    code: "058",
    linesTopToBottom: ["yin", "yang", "yang", "yin", "yang", "yang"],
  },
};
