import { readFileSync } from "node:fs";
const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(`[six-dimension-reflection-reset] ${message}`); };
const page = read("src/pages/GravityPage.tsx");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const resolver = read("src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts");

assert(page.includes("key={sequentialCurrentSpaceId}") && page.includes("currentDimensionId={activeConfig.id}") && page.includes("currentDimensionStep={activeDimensionStep}"), "presenter is not remounted and identified per canonical dimension");
assert(page.includes('>("OBSERVING");') && page.includes("useState(false);") && !page.includes("initialInnerViewRelation={innerViewRelation}"), "local state can inherit a prior dimension");
assert(guide.includes("setSelectedResponse(null)") && guide.includes("[dimensionId, dimensionStep]") && guide.includes('data-xinmai-authority-boundary="FINAL_ACKNOWLEDGEMENT_ONLY"'), "semantic choice state does not reset per dimension or obscures the authority boundary");
assert(page.slice(page.indexOf("async function continueObservation("), page.indexOf("function handleLifeCoreApproach()")).includes("if (!innerViewRelationEstablished) return false;") && page.includes("return onNodeBloom(response);"), "final explicit continuation is not the sole item commit path");
for (const dimension of ["body", "emotion", "thought", "action", "memory", "goal"]) assert(resolver.includes(`${dimension}: Object.freeze({`), `missing ${dimension} grammar`);
assert(!guide.includes("第一次靠近") && !guide.includes("第二次靠近") && !guide.includes("第三次靠近") && !guide.includes("旧的保护仍在"), "obsolete repeated choreography remains exposed");
console.log("[XINMAI SIX-DIMENSION PER-DIMENSION REFLECTION RESET] PASS");
