import type { FlowStep } from "../types/session";

export const flowSteps: FlowStep[] = [
  { code: "00", key: "launch", path: "/", title: "Launch 启动舱门" },
  { code: "00-Fix", key: "chrono", path: "/chrono", title: "Chrono 时序装填" },
  { code: "01", key: "identity", path: "/identity", title: "Mother Scan 卦码线索捕获" },
  { code: "02", key: "force", path: "/force", title: "Mother Lock 卦码驱动锁定" },
  { code: "03", key: "scene", path: "/scene", title: "Evidence 现实触发证据接入" },
  { code: "03-G", key: "gua-field", path: "/gua-field", title: "Mother 卦码显影" },
  { code: "04", key: "gravity", path: "/gravity", title: "Yao Implement 前五爻惯性链" },
  { code: "05", key: "collapse", path: "/collapse", title: "Collapse 高压临界停留" },
  { code: "06", key: "choice", path: "/choice", title: "Choice 第六爻反本能偏转" },
  { code: "07", key: "migration", path: "/migration", title: "Repair Card 行为沙漏沉积" },
  { code: "08", key: "archive", path: "/archive", title: "Archive 行为修复资产库" },
];
