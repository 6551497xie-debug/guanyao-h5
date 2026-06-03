import type { FlowStep } from "../types/session";

export const flowSteps: FlowStep[] = [
  { code: "00", key: "launch", path: "/", title: "Launch 启动舱门" },
  { code: "00-Fix", key: "chrono", path: "/chrono", title: "Chrono 时序校准" },
  { code: "01", key: "identity", path: "/identity", title: "Identity 人格映照碎片" },
  { code: "02", key: "force", path: "/force", title: "Force 原力定格" },
  { code: "03", key: "scene", path: "/scene", title: "Scene 现实场景切片" },
  { code: "04", key: "gravity", path: "/gravity", title: "Gravity 1-3爻自动观影" },
  { code: "05", key: "collapse", path: "/collapse", title: "Collapse 4-5爻自动观影与高压停滞" },
  { code: "06", key: "choice", path: "/choice", title: "Choice 第六爻唯一手动抉择" },
  { code: "07", key: "migration", path: "/migration", title: "Migration 成果卡" },
  { code: "08", key: "archive", path: "/archive", title: "Archive 人格档案与三幕式90天剧本" },
];
