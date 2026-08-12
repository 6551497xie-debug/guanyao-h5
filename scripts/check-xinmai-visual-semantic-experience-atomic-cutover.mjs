import { readFileSync } from "node:fs";
const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(`[visual-semantic-cutover] ${message}`); };
const resolver = read("src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts");
const policy = read("src/services/xinmaiVisualSemanticExperiencePolicy.ts");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const checkpoint = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const journeySemantic = read("src/services/xinmaiJourneySemanticPresentationResolver.ts");
const css = read("src/styles/xinmai-six-dimension-semantic-choreography.css");

for (const copy of ["身体先在哪里发出信号", "紧接着出现的感受", "脑中最先给出了什么判断", "这个判断最先把你推向哪里", "过去也出现过吗", "最怕失去什么"]) assert(resolver.includes(copy), `missing semantic question: ${copy}`);
for (const copy of ["保存这次身体观察", "保存这次情绪观察", "保存这次想法观察", "保存这次行动冲动观察", "保存这次记忆联想观察", "保存这次需要与方向观察"]) assert(resolver.includes(copy), `missing acknowledgement: ${copy}`);
assert(policy.includes("XinmaiVisualSemanticExperiencePolicy =") && policy.includes('"ENABLED"') && policy.includes('"SAFE_WITHHELD"') && guide.includes("grammar.presentationMode") && guide.includes("FINAL_ACKNOWLEDGEMENT_ONLY"), "policy or authority boundary missing");
assert(checkpoint.includes("notAttemptedSemantic") && checkpoint.includes("rejectedRecordSemantic") && journeySemantic.includes("先回到生活") && journeySemantic.includes("返回重新选择") && journeySemantic.includes("结束本轮"), "checkpoint branches do not expose complete actions");
assert(launch.includes("RETURNING_WHISPER_EXAMPLES") && launch.includes("RETURNING_NAME_EXAMPLES") && launch.includes("自己写") && launch.includes("returningWhisperSemantic.secondaryAction") && launch.includes("namingSemantic.secondaryAction"), "optional non-AI templates missing");
assert(css.includes("min-height: 52px") && css.includes("env(safe-area-inset-bottom)") && css.includes("overflow-x: hidden") && css.includes("prefers-reduced-motion: reduce") && css.includes('data-xinmai-visual-semantic-policy="SAFE_STATIC"'), "mobile/accessibility or safe static contract missing");
console.log("[XINMAI VISUAL SEMANTIC EXPERIENCE ATOMIC CUTOVER] PASS");
