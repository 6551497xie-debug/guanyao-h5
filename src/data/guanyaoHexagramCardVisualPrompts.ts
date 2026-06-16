export type GuanyaoHexagramCardVisualPrompt = {
  visualFilename: string;
  visualAssetUrl: string;
  visualPositivePrompt: string;
  visualNegativePrompt: string;
};

const sharedNegativePrompt = [
  "no text",
  "no letters",
  "no logo",
  "no watermark",
  "no hexagram symbol",
  "no human figure",
  "no portrait",
  "no tarot character",
  "no landscape photography",
  "no realistic scenery",
  "no decorative particle field",
  "no dense glowing dots",
  "no network lines",
  "no UI text",
].join(", ");

function visual(filename: string, positive: string): GuanyaoHexagramCardVisualPrompt {
  return {
    visualFilename: filename,
    visualAssetUrl: `/hexagram-card-visuals/${filename}`,
    visualPositivePrompt: positive,
    visualNegativePrompt: sharedNegativePrompt,
  };
}

export const guanyaoHexagramCardVisualPrompts: Record<string, GuanyaoHexagramCardVisualPrompt> = {
  "001": visual(
    "001-qian-wei-tian-gaokong.png",
    "dark abstract structural scene, a minimal high platform in vast black negative space, a vertical cold-gold light pillar rising through the center, austere, elevated, solitary, high-res cinematic geometry, no text.",
  ),
  "002": visual(
    "002-kun-wei-di-dadi.png",
    "dark abstract earth strata, massive layered ground bearing pressure, subtle golden light leaking from deep cracks, stable and heavy, not a canyon, not an abyss, strong horizontal weight, no text.",
  ),
  "003": visual(
    "003-shui-lei-tun-potu.png",
    "black soil surface under pressure, a narrow crack opening upward, cold blue and gold light pushing from below, emerging force before breakthrough, no plant, no character, no text.",
  ),
  "004": visual(
    "004-shan-shui-meng-miwu.png",
    "dark abstract mountain mass obscured by layered fog, hidden water below, fragmented cold white light diffused through mist, unclear path, cognitive fog, no traditional ink painting, no text.",
  ),
  "005": visual(
    "005-shui-tian-xu-dengdai.png",
    "dark water plane as a horizontal barrier, a narrow submerged passage not yet opened, distant light separated by vapor, waiting tension, restrained, no moon, no figure, no text.",
  ),
  "006": visual(
    "006-tian-shui-song-zhengming.png",
    "upper cold light pressing downward, lower dark water current pushing upward, a thin bright fissure between opposing forces, tension, boundary, voice opening, no court, no war, no people, no text.",
  ),
  "007": visual(
    "007-di-shui-shi-liezhen.png",
    "dark ground and hidden water plane, a small number of geometric units moving into formation around a clear central position, order emerging from dispersed force, no army, no weapons, no flags, no dense network, no text.",
  ),
  "008": visual(
    "008-shui-di-bi-kaojin.png",
    "few golden water-like paths approaching a low-lit central connection point, paths stop before fully merging, clear boundary, closeness without absorption, large black negative space, no dense dots, no network, no text.",
  ),
  "009": visual(
    "009-feng-tian-xiao-xu-miyun.png",
    "heavy low-pressure cloud dome as a solid dark structure, holding back a narrow vertical cold-gold beam, the light has not reached the lower circular receiving structure, suspended force, no landscape valley, no scenery, no text.",
  ),
  "010": visual(
    "010-tian-ze-lv-bingshang.png",
    "black ice plane with one extremely narrow cold-gold path, subtle pressure cracks along both sides, light from under the ice, cautious step structure, no person, no snow mountain, no lake scenery, no text.",
  ),
};
