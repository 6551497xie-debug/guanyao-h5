import type { Trigram } from "../types/guanyaoCausalEngine";

export type HexagramMatrixEntry = {
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  code: string;
  name: string;
  title: string;
  titleStatus?: "locked";
};

const lockedHexagramTitles: Record<string, string> = {
  "001": "高空",
  "002": "大地",
  "003": "破土",
  "004": "迷雾",
  "005": "等待",
  "006": "争鸣",
  "007": "孤军",
  "008": "靠岸",
  "009": "密云",
  "010": "冰上",
  "011": "回暖",
  "012": "隔阂",
  "013": "异类",
  "014": "丰收者",
  "015": "隐藏者",
  "016": "狂欢之后",
  "017": "顺流",
  "018": "腐根",
  "019": "悬崖边",
  "020": "旁观者",
  "021": "硬骨",
  "022": "面具",
  "023": "剥落",
  "024": "回环",
  "025": "脱轨",
  "026": "深藏者",
  "027": "养伤者",
  "028": "最后一根",
  "029": "长期踩不到底的人",
  "030": "一直在燃烧的人",
  "031": "触电",
  "032": "磨损者",
  "033": "退场者",
  "034": "巨兽",
  "035": "更高处",
  "036": "暗行者",
  "037": "屋檐下",
  "038": "背对背",
  "039": "上坡",
  "040": "松绑",
  "041": "割舍",
  "042": "寸进",
  "043": "决裂",
  "044": "闯入者",
  "045": "人潮",
  "046": "向光",
  "047": "围墙里的沉默者",
  "048": "深井",
  "049": "焚毁者",
  "050": "炉心",
  "051": "惊醒",
  "052": "停住",
  "053": "迁徙者",
  "054": "错位者",
  "055": "盛宴之后",
  "056": "异乡者",
  "057": "风里的人",
  "058": "静湖",
  "059": "散落者",
  "060": "绳索",
  "061": "最后的相信",
  "062": "越界者",
  "063": "灰烬",
  "064": "黎明之前",
};

const createHexagramMatrixEntry = (
  upperTrigram: Trigram,
  lowerTrigram: Trigram,
  code: string,
  name: string,
): HexagramMatrixEntry => {
  const lockedTitle = lockedHexagramTitles[code];

  return {
    upperTrigram,
    lowerTrigram,
    code,
    name,
    title: lockedTitle ?? "",
    titleStatus: "locked",
  };
};

export const GUANYAO_HEXAGRAM_MATRIX_REGISTRY: Record<string, HexagramMatrixEntry> = {
  "乾-乾": createHexagramMatrixEntry("乾", "乾", "001", "乾为天"),
  "乾-兑": createHexagramMatrixEntry("乾", "兑", "010", "天泽履"),
  "乾-离": createHexagramMatrixEntry("乾", "离", "013", "天火同人"),
  "乾-震": createHexagramMatrixEntry("乾", "震", "025", "天雷无妄"),
  "乾-巽": createHexagramMatrixEntry("乾", "巽", "044", "天风姤"),
  "乾-坎": createHexagramMatrixEntry("乾", "坎", "006", "天水讼"),
  "乾-艮": createHexagramMatrixEntry("乾", "艮", "033", "天山遁"),
  "乾-坤": createHexagramMatrixEntry("乾", "坤", "012", "天地否"),
  "兑-乾": createHexagramMatrixEntry("兑", "乾", "043", "泽天夬"),
  "兑-兑": createHexagramMatrixEntry("兑", "兑", "058", "兑为泽"),
  "兑-离": createHexagramMatrixEntry("兑", "离", "049", "泽火革"),
  "兑-震": createHexagramMatrixEntry("兑", "震", "017", "泽雷随"),
  "兑-巽": createHexagramMatrixEntry("兑", "巽", "028", "泽风大过"),
  "兑-坎": createHexagramMatrixEntry("兑", "坎", "047", "泽水困"),
  "兑-艮": createHexagramMatrixEntry("兑", "艮", "031", "泽山咸"),
  "兑-坤": createHexagramMatrixEntry("兑", "坤", "045", "泽地萃"),
  "离-乾": createHexagramMatrixEntry("离", "乾", "014", "火天大有"),
  "离-兑": createHexagramMatrixEntry("离", "兑", "038", "火泽睽"),
  "离-离": createHexagramMatrixEntry("离", "离", "030", "离为火"),
  "离-震": createHexagramMatrixEntry("离", "震", "021", "火雷噬嗑"),
  "离-巽": createHexagramMatrixEntry("离", "巽", "050", "火风鼎"),
  "离-坎": createHexagramMatrixEntry("离", "坎", "064", "火水未济"),
  "离-艮": createHexagramMatrixEntry("离", "艮", "056", "火山旅"),
  "离-坤": createHexagramMatrixEntry("离", "坤", "035", "火地晋"),
  "震-乾": createHexagramMatrixEntry("震", "乾", "034", "雷天大壮"),
  "震-兑": createHexagramMatrixEntry("震", "兑", "054", "雷泽归妹"),
  "震-离": createHexagramMatrixEntry("震", "离", "055", "雷火丰"),
  "震-震": createHexagramMatrixEntry("震", "震", "051", "震为雷"),
  "震-巽": createHexagramMatrixEntry("震", "巽", "032", "雷风恒"),
  "震-坎": createHexagramMatrixEntry("震", "坎", "040", "雷水解"),
  "震-艮": createHexagramMatrixEntry("震", "艮", "062", "雷山小过"),
  "震-坤": createHexagramMatrixEntry("震", "坤", "016", "雷地豫"),
  "巽-乾": createHexagramMatrixEntry("巽", "乾", "009", "风天小畜"),
  "巽-兑": createHexagramMatrixEntry("巽", "兑", "061", "风泽中孚"),
  "巽-离": createHexagramMatrixEntry("巽", "离", "037", "风火家人"),
  "巽-震": createHexagramMatrixEntry("巽", "震", "042", "风雷益"),
  "巽-巽": createHexagramMatrixEntry("巽", "巽", "057", "巽为风"),
  "巽-坎": createHexagramMatrixEntry("巽", "坎", "059", "风水涣"),
  "巽-艮": createHexagramMatrixEntry("巽", "艮", "053", "风山渐"),
  "巽-坤": createHexagramMatrixEntry("巽", "坤", "020", "风地观"),
  "坎-乾": createHexagramMatrixEntry("坎", "乾", "005", "水天需"),
  "坎-兑": createHexagramMatrixEntry("坎", "兑", "060", "水泽节"),
  "坎-离": createHexagramMatrixEntry("坎", "离", "063", "水火既济"),
  "坎-震": createHexagramMatrixEntry("坎", "震", "003", "水雷屯"),
  "坎-巽": createHexagramMatrixEntry("坎", "巽", "048", "水风井"),
  "坎-坎": createHexagramMatrixEntry("坎", "坎", "029", "坎为水"),
  "坎-艮": createHexagramMatrixEntry("坎", "艮", "039", "水山蹇"),
  "坎-坤": createHexagramMatrixEntry("坎", "坤", "008", "水地比"),
  "艮-乾": createHexagramMatrixEntry("艮", "乾", "026", "山天大畜"),
  "艮-兑": createHexagramMatrixEntry("艮", "兑", "041", "山泽损"),
  "艮-离": createHexagramMatrixEntry("艮", "离", "022", "山火贲"),
  "艮-震": createHexagramMatrixEntry("艮", "震", "027", "山雷颐"),
  "艮-巽": createHexagramMatrixEntry("艮", "巽", "018", "山风蛊"),
  "艮-坎": createHexagramMatrixEntry("艮", "坎", "004", "山水蒙"),
  "艮-艮": createHexagramMatrixEntry("艮", "艮", "052", "艮为山"),
  "艮-坤": createHexagramMatrixEntry("艮", "坤", "023", "山地剥"),
  "坤-乾": createHexagramMatrixEntry("坤", "乾", "011", "地天泰"),
  "坤-兑": createHexagramMatrixEntry("坤", "兑", "019", "地泽临"),
  "坤-离": createHexagramMatrixEntry("坤", "离", "036", "地火明夷"),
  "坤-震": createHexagramMatrixEntry("坤", "震", "024", "地雷复"),
  "坤-巽": createHexagramMatrixEntry("坤", "巽", "046", "地风升"),
  "坤-坎": createHexagramMatrixEntry("坤", "坎", "007", "地水师"),
  "坤-艮": createHexagramMatrixEntry("坤", "艮", "015", "地山谦"),
  "坤-坤": createHexagramMatrixEntry("坤", "坤", "002", "坤为地"),
};

export function auditGuanyaoHexagramMatrixRegistry(): {
  ok: boolean;
  total: number;
  errors: string[];
  lockedTitleCount: number;
  lockedTitleMismatches: Array<{ code: string; expected: string; actual: string }>;
  pendingTitleCount: number;
  pendingTitles: Array<{ key: string; code: string; name: string }>;
} {
  const errors: string[] = [];
  const entries = Object.entries(GUANYAO_HEXAGRAM_MATRIX_REGISTRY);
  const trigrams: Trigram[] = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];
  const codes = new Set<string>();

  if (entries.length !== 64) {
    errors.push(`total expected 64, got ${entries.length}`);
  }

  trigrams.forEach((upperTrigram) => {
    trigrams.forEach((lowerTrigram) => {
      const key = `${upperTrigram}-${lowerTrigram}`;
      const entry = GUANYAO_HEXAGRAM_MATRIX_REGISTRY[key];

      if (!entry) {
        errors.push(`${key} missing`);
        return;
      }

      if (entry.upperTrigram !== upperTrigram) errors.push(`${key} upperTrigram mismatch`);
      if (entry.lowerTrigram !== lowerTrigram) errors.push(`${key} lowerTrigram mismatch`);
      if (!entry.code) errors.push(`${key} code missing`);
      if (!entry.name) errors.push(`${key} name missing`);
      if (!entry.title) errors.push(`${key} title missing`);
      if (codes.has(entry.code)) errors.push(`${entry.code} duplicated`);
      codes.add(entry.code);
    });
  });

  const pendingTitles = entries
    .filter(([, entry]) => entry.titleStatus !== "locked")
    .map(([key, entry]) => ({ key, code: entry.code, name: entry.name }));
  const lockedTitleMismatches = Object.entries(lockedHexagramTitles).flatMap(([code, expected]) => {
    const entry = entries.find(([, candidate]) => candidate.code === code)?.[1];

    if (!entry) return [{ code, expected, actual: "" }];
    if (entry.title !== expected || entry.titleStatus !== "locked") {
      return [{ code, expected, actual: entry.title }];
    }

    return [];
  });

  if (lockedTitleMismatches.length > 0) {
    errors.push(`${lockedTitleMismatches.length} locked title mismatch`);
  }

  return {
    ok: errors.length === 0,
    total: entries.length,
    errors,
    lockedTitleCount: entries.filter(([, entry]) => entry.titleStatus === "locked").length,
    lockedTitleMismatches,
    pendingTitleCount: pendingTitles.length,
    pendingTitles,
  };
}
