import type { FlowStep } from "../types/session";

export const flowSteps: FlowStep[] = [
  { code: "00", key: "launch", path: "/", title: "Launch 启动舱门" },
  { code: "00-Fix", key: "chrono", path: "/chrono", title: "Chrono 时序确认" },
  { code: "01", key: "identity", path: "/identity", title: "Pressure Exposure 压力显影确认" },
  { code: "02", key: "force", path: "/force", title: "MotherCode 母码显影" },
  { code: "03", key: "scene", path: "/scene", title: "Pressure Seed 现实压力种子" },
  { code: "03-G", key: "gua-field", path: "/gua-field", title: "Mother Card 母码压印" },
  { code: "04", key: "gravity", path: "/gravity", title: "Dynamics 人格行为动力学演化" },
  { code: "05", key: "choice", path: "/choice", title: "Breach Scan 破口阵列扫描" },
  { code: "06", key: "migration", path: "/migration", title: "Yao Device 爻器激活" },
  { code: "07", key: "archive", path: "/archive", title: "Archive 人格资产库" },
];
