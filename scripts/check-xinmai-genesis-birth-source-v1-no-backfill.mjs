import fs from "node:fs";
const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const sessionType = read("src/types/launchLifeSourceSession.ts");
const session = read("src/services/sessionService.ts");
const recovery = read("src/services/xinmaiGenesisBirthSourceRecoveryController.ts");
const adapter = read("src/services/xinmaiGenesisBirthInputDraftPersistenceAdapter.ts");
assert(sessionType.includes('"GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1"') && sessionType.includes('"GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V2"'), "V1/V2 read union missing");
assert(session.includes('value.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1"') && session.includes('value.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V2"'), "V1/V2 persistence validation missing");
assert(recovery.includes("noBackfill: true") && recovery.includes("noStorageWrite: true"), "Recovery can backfill V1");
assert(adapter.includes("nonAuthoritativeDraftOnly") && adapter.includes("cannotFormIdentity") && adapter.includes("noBackfill"), "Draft storage can become identity or backfill");
for (const source of [session, recovery, adapter]) {
  assert(!source.includes("reverseInfer") && !source.includes("inferExactTime"), "V1 direct branch reverse-infers a time");
}
console.log("[XINMAI GENESIS BIRTH SOURCE V1 NO BACKFILL] PASS");
