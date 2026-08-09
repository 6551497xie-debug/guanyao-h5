import fs from "node:fs";
import path from "node:path";
const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const controllerPath = "src/services/xinmaiGenesisBirthSourceDerivationController.ts";
const controller = read(controllerPath);
const core = read("src/services/xinmaiBirthTimeDerivationService.ts");
const types = read("src/types/xinmaiGenesisBirthSourceDerivation.ts");
const resolver = read("src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts");
const admission = read("src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts");
const controls = read("src/components/XinmaiGenesisBirthCoordinateControls.tsx");
const normalizer = read("src/services/productionIdentitySourceInputNormalizer.ts");
for (const token of [
  "deriveXinmaiGenesisBirthSource",
  "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION",
  "USER_GREGORIAN_DATE_UNCHANGED",
  "XINMAI_LOCAL_CIVIL_HOUR_BRANCH_V1",
  "23:00_TO_00:59",
]) assert(controller.includes(token) || core.includes(token) || types.includes(token) || resolver.includes(token), `Derivation contract missing ${token}`);
assert(normalizer.includes("deriveXinmaiHourBranchFromExactLocalTime"), "Reference normalizer does not reuse pure core");
assert(!controls.includes("hourBranch: event.target.value") && !controls.includes("出生时辰</span>"), "UI directly writes derived branch");
assert(admission.includes("birthSourceDerivationReceipt") && !admission.includes("draft.hourBranch"), "Admission bypasses typed receipt");
const sourceFiles = [];
const collect = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(target);
    else if (/\.(ts|tsx)$/.test(entry.name)) sourceFiles.push(target);
  }
};
collect("src");
const producers = sourceFiles.filter((file) => read(file).includes("deriveXinmaiGenesisBirthSource("));
assert(producers.length === 2 && producers.includes(controllerPath) && producers.includes("src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts"), `Unexpected receipt producers: ${producers.join(",")}`);
console.log("[XINMAI GENESIS BIRTH SOURCE DERIVATION SINGLE OWNER] PASS");
