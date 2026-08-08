import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const route = read("src/pages/GenesisProductionRouteEntry.tsx");
const boundary = read("src/types/genesisProductionRouteEntry.ts");
const launch = read("src/pages/LaunchLab.tsx");
const reality = read(
  "src/services/realityRecognizedIdentityRecoveryAdapter.ts",
);

for (const token of [
  "recoverXinmaiGenesisBirthSource",
  'intent: "AUTHORIZE_GENESIS_ROUTE"',
  'recovery.status === "READY" ? recovery.context : null',
  "authorizeGenesisProductionRoute({",
  "data-genesis-source-recovery-status",
]) {
  assert(route.includes(token), `Genesis route cutover missing ${token}`);
}
assert(
  route.indexOf("recoverXinmaiGenesisBirthSource({") <
    route.indexOf("authorizeGenesisProductionRoute({"),
  "Genesis route authorizes before typed source recovery",
);
assert(
  !route.includes("readRealUserGenesisVisualSourceContext"),
  "Genesis route retains memory-only success path",
);
assert(
  boundary.includes("inMemoryRealUserContextOnly: false") &&
    boundary.includes("typedRecoveryOwnerRequired: true"),
  "Genesis route boundary does not require typed recovery",
);
assert(
  launch.includes('intent: "RESTORE_RETURNING_LIFE"') &&
    reality.includes('intent: "RESTORE_RECOGNIZED_REALITY"'),
  "Production recovery consumers are not atomically cut over",
);

console.log("[XINMAI GENESIS BIRTH SOURCE ROUTE RECOVERY CUTOVER] PASS");
