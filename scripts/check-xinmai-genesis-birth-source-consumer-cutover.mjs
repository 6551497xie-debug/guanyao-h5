import fs from "node:fs";
import path from "node:path";
const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const consumers = [
  "src/services/realityRouteActivationSourceContext.ts",
  "src/services/realityPressureCandidateRequestContextBridge.ts",
  "src/services/realityPressureCandidateActivationContext.ts",
  "src/services/gravityProductionRuntimeInputAdapter.ts",
];
for (const file of consumers) {
  const source = read(file);
  assert(source.includes("isTrustedXinmaiLaunchLifeSourceSession"), `V2 receipt session is not consumed by ${file}`);
  assert(!source.includes('session.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1"'), `V1-only branch remains in ${file}`);
}
const sourceFiles = [];
const collect = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(target);
    else if (/\.(ts|tsx)$/.test(entry.name)) sourceFiles.push(target);
  }
};
collect("src");
const allowedV1Owners = new Set([
  "src/types/launchLifeSourceSession.ts",
  "src/services/launchLifeSourceSession.ts",
  "src/services/sessionService.ts",
  "src/services/xinmaiLaunchLifeSourceSessionValidator.ts",
]);
const stale = sourceFiles.filter((file) =>
  !allowedV1Owners.has(file) && read(file).includes("GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1"));
assert(stale.length === 0, `Uncut V1-only consumers: ${stale.join(",")}`);
const validator = read("src/services/xinmaiLaunchLifeSourceSessionValidator.ts");
for (const token of [
  "birthSourceDerivationReceipt",
  "rawInputUserConfirmed",
  "branchAndLunarDeterministicallyDerived",
  "noDirectDerivedValueWrite",
  "derivedHourBranch === session.birthCoordinate.hourBranch",
  "canonicalGregorianBirthDate",
]) assert(validator.includes(token), `V2 consumer proof missing ${token}`);
console.log("[XINMAI GENESIS BIRTH SOURCE CONSUMER CUTOVER] PASS");
