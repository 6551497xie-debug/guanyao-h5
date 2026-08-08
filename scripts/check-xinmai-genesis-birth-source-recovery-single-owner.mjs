import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const sourceFiles = [];
const collect = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(target);
    else if (/\.(ts|tsx)$/.test(entry.name)) sourceFiles.push(target);
  }
};
collect("src");

const controllerPath =
  "src/services/xinmaiGenesisBirthSourceRecoveryController.ts";
const controller = read(controllerPath);
const session = read("src/services/sessionService.ts");
const launch = read("src/pages/LaunchLab.tsx");
const reality = read(
  "src/services/realityRecognizedIdentityRecoveryAdapter.ts",
);
const archive = read("src/pages/PersonalityRingPage.tsx");

for (const token of [
  "XinmaiGenesisBirthSourceRecoveryController",
  "recoverXinmaiGenesisBirthSource",
  "singleOwner: true",
  "typedPersistenceOnly: true",
  "noSourceEngineInvocation: true",
  "noSilentPrecedence: true",
  "noBackfill: true",
]) {
  assert(controller.includes(token), `Recovery Owner contract missing ${token}`);
}

const directRestoreCallers = sourceFiles.filter((file) => {
  if (file === "src/services/sessionService.ts") return false;
  const source = read(file);
  return source.includes("restorePersistedRealUserGenesisVisualSourceContext(");
});
assert(
  directRestoreCallers.length === 1 &&
    directRestoreCallers[0] === controllerPath,
  `Recovery restore callers are not single-owner: ${directRestoreCallers.join(",")}`,
);
assert(
  !session
    .slice(session.indexOf("function resolvePersistedGenesisVisualContinuity"))
    .includes("restorePersistedRealUserGenesisVisualSourceContext()"),
  "Persisted continuity read still performs hidden context activation",
);
for (const [label, source] of [
  ["Launch", launch],
  ["Reality", reality],
  ["Archive", archive],
]) {
  assert(
    !source.includes("restorePersistedRealUserGenesisVisualSourceContext"),
    `${label} retains page-local recovery Owner`,
  );
}

console.log("[XINMAI GENESIS BIRTH SOURCE RECOVERY SINGLE OWNER] PASS");
