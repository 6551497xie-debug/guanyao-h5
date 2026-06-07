import type { FlowStep } from "../types/session";

export const flowSteps: FlowStep[] = [
  { code: "00", key: "launch", path: "/", title: "Launch 启动舱门" },
  { code: "00-Fix", key: "chrono", path: "/chrono", title: "Chrono 时序装填" },
  { code: "01", key: "identity", path: "/identity", title: "Identity 人格映照碎片" },
  { code: "02", key: "force", path: "/force", title: "Force 原力定格" },
  { code: "03", key: "scene", path: "/scene", title: "Scene 现实压力信号拦截" },
  { code: "03-G", key: "gua-field", path: "/gua-field", title: "Mother 母码压印" },
  { code: "04", key: "gravity", path: "/gravity", title: "Gravity 前五爻传动轴" },
  { code: "05", key: "collapse", path: "/collapse", title: "Collapse 高压临界停留" },
  { code: "06", key: "choice", path: "/choice", title: "Choice 第六爻反本能偏转" },
  { code: "07", key: "migration", path: "/migration", title: "Migration 行为沙漏沉积" },
  { code: "08", key: "archive", path: "/archive", title: "Archive 行为资产库" },
];
